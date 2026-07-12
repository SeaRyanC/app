import { render } from 'preact';
import { useState, useEffect, useRef, useCallback, useMemo } from 'preact/hooks';
import type { MeshData } from './stl-parser.js';
import { parseSTL } from './stl-parser.js';
import {
  projectForView,
  indicatorPositionInView,
  indicatorOrientation,
  screenToPlaneValue,
  nextAxis,
  planeLabel,
  clamp,
} from './geometry.js';
import type { BBox3, CutPlane, ViewDir } from './geometry.js';
import { computeSection } from './section.js';
import type { SectionResult } from './section.js';
import { generateSectionPDF } from './pdf.js';
import { makeTorus, makeSteppedShaft, makeMountingPlate } from './demo-models.js';
import { computeSnapPoints, findNearestSnap, findCircleAtPoint, findContourAtPoint } from './measure.js';
import type { SnapPoint } from './measure.js';

declare const __VERSION__: string;
declare const __COMMIT_HASH__: string;
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : '1.0.0';
const COMMIT_HASH = typeof __COMMIT_HASH__ !== 'undefined' ? __COMMIT_HASH__ : 'dev';

// ─── Viewport helpers ─────────────────────────────────────────────────────

interface ViewState {
  zoom: number;   // canvas pixels per model unit
  panX: number;   // canvas pixel offset
  panY: number;
}

function modelToCanvas(
  mx: number, my: number,
  vs: ViewState, cx: number, cy: number
): [number, number] {
  return [
    mx * vs.zoom + cx + vs.panX,
    my * vs.zoom + cy + vs.panY,
  ];
}

function canvasToModel(
  sx: number, sy: number,
  vs: ViewState, cx: number, cy: number
): [number, number] {
  return [
    (sx - cx - vs.panX) / vs.zoom,
    (sy - cy - vs.panY) / vs.zoom,
  ];
}

/** Compute initial zoom to fit the model bbox in the canvas with a margin */
function fitZoom(modelW: number, modelH: number, canvasW: number, canvasH: number): number {
  if (modelW === 0 || modelH === 0) return 1;
  const margin = 0.85; // use 85% of the canvas
  return Math.min((canvasW * margin) / modelW, (canvasH * margin) / modelH);
}

// ─── ModelPane ────────────────────────────────────────────────────────────

interface ModelPaneProps {
  label: string;
  dir: ViewDir;
  mesh: MeshData;
  plane: CutPlane | null;
  onSetPlane: (axis: CutPlane['axis'], value: number) => void;
  onCyclePlane: () => void;
  maxModelDim: number;  // shared initial zoom basis (max of bbox size.x/y/z)
  showHint: boolean;    // whether to show the mouse-usage hint overlay
}

const INDICATOR_COLOR = '#f78166';
const INDICATOR_HIT = 10; // px tolerance for clicking indicator

function ModelPane({ label, dir, mesh, plane, onSetPlane, onCyclePlane, maxModelDim, showHint }: ModelPaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bbox: BBox3 = mesh.bbox;

  // View state (zoom + pan)
  const [vs, setVs] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 });
  const vsRef = useRef(vs);
  vsRef.current = vs;

  // Drag state (right-click pan or indicator drag)
  const dragRef = useRef<{
    type: 'pan' | 'indicator';
    startX: number;
    startY: number;
    startPanX?: number;
    startPanY?: number;
    startPlaneVal?: number;
  } | null>(null);

  // Keep track of canvas size
  const sizeRef = useRef({ w: 0, h: 0 });

  // ── Determine 2D "center" of model in this view
  const modelCenter = useMemo(() => projectForView(bbox.center, dir), [bbox, dir]);

  // ── Pre-project, shade, and sort all triangles; render to OffscreenCanvas.
  //    Rebuilt only when the mesh or view direction changes.
  //    Pan/zoom frames just blit this cached image with drawImage (fast GPU op).
  interface ShadedPrerender {
    canvas: OffscreenCanvas;
    ocCx: number;   // model-center x in offscreen pixel coords
    ocCy: number;   // model-center y in offscreen pixel coords
    scale: number;  // offscreen pixels per model unit
  }

  const shadedPrerender = useMemo((): ShadedPrerender | null => {
    const { verts, count } = mesh;
    if (count === 0) return null;

    // Normalised light direction in world space (from upper-right, roughly)
    const lvx = 0.5, lvy = 0.5, lvz = 1.2;
    const ll = Math.sqrt(lvx*lvx + lvy*lvy + lvz*lvz);
    const lx = lvx/ll, ly = lvy/ll, lz = lvz/ll;

    // Unit vector from model toward viewer for each orthographic view:
    //   front = looking along -Y → viewer at +Y
    //   side  = looking along -X → viewer at +X
    //   top   = looking along -Z → viewer at +Z
    const vdx = dir === 'side'  ? 1 : 0;
    const vdy = dir === 'front' ? 1 : 0;
    const vdz = dir === 'top'   ? 1 : 0;

    const mcx = bbox.center.x, mcy = bbox.center.y, mcz = bbox.center.z;

    // Each entry: [ax,ay, bx,by, cx,cy, depth, r,g,b]
    type TriEntry = [number,number,number,number,number,number,number,number,number,number];
    const tris: TriEntry[] = [];

    for (let i = 0; i < count; i++) {
      const o = i * 9;
      const ax3 = verts[o],   ay3 = verts[o+1], az3 = verts[o+2];
      const bx3 = verts[o+3], by3 = verts[o+4], bz3 = verts[o+5];
      const cx3 = verts[o+6], cy3 = verts[o+7], cz3 = verts[o+8];

      // Face normal via cross product (B-A) × (C-A)
      const ex = bx3-ax3, ey = by3-ay3, ez = bz3-az3;
      const fx = cx3-ax3, fy = cy3-ay3, fz = cz3-az3;
      let nx = ey*fz - ez*fy, ny = ez*fx - ex*fz, nz = ex*fy - ey*fx;
      const nl = Math.sqrt(nx*nx + ny*ny + nz*nz);
      if (nl < 1e-12) continue;
      nx /= nl; ny /= nl; nz /= nl;

      // Two-sided: ensure normal points toward the viewer
      if (nx*vdx + ny*vdy + nz*vdz < 0) { nx=-nx; ny=-ny; nz=-nz; }

      // Diffuse (Lambertian) intensity with ambient term
      const diff = Math.max(0, nx*lx + ny*ly + nz*lz);
      const t = 0.2 + 0.8 * diff;

      // Steel-blue palette: dark→light as t goes 0→1
      const r = Math.round(55  + 145 * t);
      const g = Math.round(70  + 110 * t);
      const b = Math.round(90  + 100 * t);

      // 2D projection (model-centre relative) and depth for painter's sort
      let pax: number, pay: number, pbx: number, pby: number, pcx: number, pcy: number, depth: number;
      switch (dir) {
        case 'front':
          pax = ax3-mcx; pay = mcz-az3;
          pbx = bx3-mcx; pby = mcz-bz3;
          pcx = cx3-mcx; pcy = mcz-cz3;
          depth = (ay3+by3+cy3)/3;   // sort by Y ascending (low Y = far)
          break;
        case 'side':
          pax = ay3-mcy; pay = mcz-az3;
          pbx = by3-mcy; pby = mcz-bz3;
          pcx = cy3-mcy; pcy = mcz-cz3;
          depth = (ax3+bx3+cx3)/3;   // sort by X ascending (low X = far)
          break;
        default: // top
          pax = ax3-mcx; pay = ay3-mcy;
          pbx = bx3-mcx; pby = by3-mcy;
          pcx = cx3-mcx; pcy = cy3-mcy;
          depth = (az3+bz3+cz3)/3;   // sort by Z ascending (low Z = far)
      }

      tris.push([pax, pay, pbx, pby, pcx, pcy, depth, r, g, b]);
    }

    // Painter's algorithm: back-to-front (ascending depth = furthest first)
    tris.sort((a, b) => a[6] - b[6]);

    // Offscreen canvas: cap at OC_MAX_PX on the longest axis; at most OC_MAX_SCALE px/unit.
    // Higher values give sharper results at high zoom but cost more memory and render time.
    const OC_MAX_PX = 2048;
    const OC_MAX_SCALE = 8;
    const OC_PAD = 24; // extra pixels so triangles at the model edge aren't clipped
    const modelW = dir === 'side' ? bbox.size.y : bbox.size.x;
    const modelH = dir === 'top'  ? bbox.size.y : bbox.size.z;
    const maxDim = Math.max(modelW, modelH, 1);
    const ocScale = Math.min(OC_MAX_SCALE, OC_MAX_PX / maxDim);
    const ocW = Math.ceil(modelW * ocScale) + OC_PAD * 2;
    const ocH = Math.ceil(modelH * ocScale) + OC_PAD * 2;
    const ocCx = ocW / 2, ocCy = ocH / 2;

    const oc = new OffscreenCanvas(ocW, ocH);
    const ctx2 = oc.getContext('2d')!;

    for (const [ax, ay, bx, by, cx, cy, , r, g, b] of tris) {
      const color = `rgb(${r},${g},${b})`;
      ctx2.fillStyle = color;
      ctx2.strokeStyle = color;
      ctx2.lineWidth = 0.5;
      ctx2.beginPath();
      ctx2.moveTo(ocCx + ax * ocScale, ocCy + ay * ocScale);
      ctx2.lineTo(ocCx + bx * ocScale, ocCy + by * ocScale);
      ctx2.lineTo(ocCx + cx * ocScale, ocCy + cy * ocScale);
      ctx2.closePath();
      ctx2.fill();
      ctx2.stroke(); // thin same-colour stroke closes sub-pixel seams
    }

    return { canvas: oc, ocCx, ocCy, scale: ocScale };
  }, [mesh, bbox, dir]);

  // ── Initialize zoom to fit on first render / when model changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.offsetWidth;
    const h = rect.height || canvas.offsetHeight;
    const z = fitZoom(maxModelDim, maxModelDim, w, h);
    setVs({ zoom: z, panX: 0, panY: 0 });
  }, [mesh, maxModelDim]);

  // ── Helpers: canvas centre
  const centre = (): [number, number] => {
    const c = canvasRef.current;
    return c ? [c.width / 2, c.height / 2] : [200, 200];
  };

  // ── Hit-test: is screen point (sx, sy) on the indicator?
  const hitIndicator = useCallback((sx: number, sy: number): boolean => {
    if (!plane) return false;
    const orient = indicatorOrientation(plane, dir);
    if (!orient) return false;
    const pos = indicatorPositionInView(plane, dir);
    if (pos === null) return false;
    const [cx, cy] = centre();
    const currentVs = vsRef.current;
    const screenLinePos = orient === 'horizontal'
      ? modelToCanvas(0, pos - modelCenter.y, currentVs, cx, cy)[1]
      : modelToCanvas(pos - modelCenter.x, 0, currentVs, cx, cy)[0];

    if (orient === 'horizontal') {
      return Math.abs(sy - screenLinePos) <= INDICATOR_HIT;
    } else {
      return Math.abs(sx - screenLinePos) <= INDICATOR_HIT;
    }
  }, [plane, dir, modelCenter]);

  // ── Canvas event handlers
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const currentVs = vsRef.current;
    const [cx, cy] = centre();
    const [modelX, modelY] = canvasToModel(mx, my, currentVs, cx, cy);
    const newZoom = clamp(currentVs.zoom * factor, 0.01, 500);
    const newPanX = mx - cx - modelX * newZoom;
    const newPanY = my - cy - modelY * newZoom;
    const next = { zoom: newZoom, panX: newPanX, panY: newPanY };
    vsRef.current = next;
    setVs(next);
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (e.button === 2) {
      // Right-click drag = pan
      dragRef.current = {
        type: 'pan',
        startX: e.clientX,
        startY: e.clientY,
        startPanX: vsRef.current.panX,
        startPanY: vsRef.current.panY,
      };
      return;
    }

    if (e.button === 0) {
      if (plane && hitIndicator(sx, sy)) {
        // Left drag on indicator = move plane
        dragRef.current = {
          type: 'indicator',
          startX: sx,
          startY: sy,
          startPlaneVal: plane.value,
        };
      } else {
        // Left click in empty area = place new plane
        const currentVs = vsRef.current;
        const [cx, cy] = centre();
        const [mx, my] = canvasToModel(sx, sy, currentVs, cx, cy);
        // Adjust for modelCenter offset
        const modelMx = mx + modelCenter.x;
        const modelMy = my + modelCenter.y;
        const axisToUse: CutPlane['axis'] = plane?.axis ?? 'z';
        const newVal = screenToPlaneValue(modelMx, modelMy, { axis: axisToUse, value: 0 }, dir);
        if (newVal !== null) {
          onSetPlane(axisToUse, newVal);
        }
      }
    }
  }, [plane, hitIndicator, dir, modelCenter, onSetPlane]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const drag = dragRef.current;
    if (!drag) return;

    if (drag.type === 'pan') {
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      const next = {
        zoom: vsRef.current.zoom,
        panX: drag.startPanX! + dx,
        panY: drag.startPanY! + dy,
      };
      vsRef.current = next;
      setVs(next);
    } else if (drag.type === 'indicator' && plane) {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const currentVs = vsRef.current;
      const [cx, cy] = centre();
      const [mx, my] = canvasToModel(sx, sy, currentVs, cx, cy);
      const modelMx = mx + modelCenter.x;
      const modelMy = my + modelCenter.y;
      const newVal = screenToPlaneValue(modelMx, modelMy, plane, dir);
      if (newVal !== null) {
        onSetPlane(plane.axis, newVal);
      }
    }
  }, [plane, dir, modelCenter, onSetPlane]);

  const handleMouseUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    dragRef.current = null;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    if (plane && hitIndicator(sx, sy)) {
      onCyclePlane();
    }
  }, [plane, hitIndicator, onCyclePlane]);

  // ── Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    // Sync canvas size to container
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      sizeRef.current = { w: cw, h: ch };
    }

    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    if (mesh.count === 0) return;

    // ── Blit the pre-rendered Phong-shaded OffscreenCanvas.
    //    The offscreen canvas is in model-centre coords at `scale` px/unit.
    //    Map it so that model (0,0) lands at canvas (cx+panX, cy+panY),
    //    and one model unit covers vs.zoom canvas pixels.
    if (shadedPrerender) {
      const { canvas: oc, ocCx, ocCy, scale: ocScale } = shadedPrerender;
      const ratio = vs.zoom / ocScale;
      ctx.drawImage(
        oc,
        cx + vs.panX - ocCx * ratio,
        cy + vs.panY - ocCy * ratio,
        oc.width  * ratio,
        oc.height * ratio
      );
    }

    // ── Draw origin cross (pixel coords)
    const [ox, oy] = modelToCanvas(-modelCenter.x, -modelCenter.y, vs, cx, cy);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ox, 0); ctx.lineTo(ox, H);
    ctx.moveTo(0, oy); ctx.lineTo(W, oy);
    ctx.stroke();
    ctx.setLineDash([]);

    // ── Draw indicator
    if (plane) {
      const orient = indicatorOrientation(plane, dir);
      const pos = indicatorPositionInView(plane, dir);

      if (orient && pos !== null) {
        // pos is in model-view coords (view-center is modelCenter)
        const [lx, ly] = modelToCanvas(
          orient === 'vertical' ? pos - modelCenter.x : 0,
          orient === 'horizontal' ? pos - modelCenter.y : 0,
          vs, cx, cy
        );

        ctx.save();
        ctx.strokeStyle = INDICATOR_COLOR;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        if (orient === 'horizontal') {
          ctx.moveTo(0, ly);
          ctx.lineTo(W, ly);
        } else {
          ctx.moveTo(lx, 0);
          ctx.lineTo(lx, H);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Small label
        ctx.fillStyle = INDICATOR_COLOR;
        ctx.font = '10px monospace';
        ctx.fillText(planeLabel(plane), 4, orient === 'horizontal' ? ly - 4 : Math.min(ly + 40, H - 10));
        ctx.restore();
      }
    }
  }, [mesh, shadedPrerender, plane, vs, dir, modelCenter]);

  return (
    <div class="pane" ref={containerRef} style={{ cursor: 'crosshair' }}>
      <span class="pane-label">{label}</span>
      {plane && <span class="plane-badge">{plane.axis.toUpperCase()}</span>}
      <canvas
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        style={{ cursor: 'crosshair' }}
      />
      {showHint && (
        <div class="hint">
          Scroll: zoom &nbsp;·&nbsp; Right-drag: pan
          <br />
          Click: set plane &nbsp;·&nbsp; Drag indicator: move
          <br />
          Right-click indicator: cycle axis
        </div>
      )}
    </div>
  );
}

// ─── OutputPane ───────────────────────────────────────────────────────────

interface OutputPaneProps {
  section: SectionResult | null;
  plane: CutPlane | null;
}

type MeasureTool = 'ruler' | 'diameter' | 'autodim';

interface RulerState {
  stage: 'empty' | 'pt1_placed' | 'complete';
  pt1: [number, number] | null;
  pt2: [number, number] | null;
  hoverPt: [number, number] | null;
}

interface DiameterState {
  cx: number;
  cy: number;
  r: number;
}

interface AutodimState {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

const EMPTY_RULER_STATE: RulerState = { stage: 'empty', pt1: null, pt2: null, hoverPt: null };

const MEASURE_COLOR = '#e06c75';
const DIM_COLOR = '#61afef';
const SNAP_COLOR = '#98c379';
const RULER_HIT_PX = 12; // px tolerance for grabbing an existing ruler endpoint
const SNAP_RADIUS_PX = 10; // px tolerance for snapping to contour geometry

/** Draw a small pill-shaped label (white text on a dark rounded background). */
function drawMeasureLabel(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.save();
  ctx.font = '11px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const padX = 5, padY = 3;
  const w = ctx.measureText(text).width + padX * 2;
  const h = 14 + padY;
  ctx.fillStyle = 'rgba(20,20,20,0.85)';
  ctx.fillRect(x - w / 2, y - h / 2, w, h);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawDimTick(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
  const len = 5;
  const dx = Math.cos(angle) * len, dy = Math.sin(angle) * len;
  ctx.beginPath();
  ctx.moveTo(x - dx, y - dy);
  ctx.lineTo(x + dx, y + dy);
  ctx.stroke();
}

function OutputPane({ section, plane }: OutputPaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // View state
  const [vs, setVs] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 });
  const vsRef = useRef(vs);
  vsRef.current = vs;

  const panDragRef = useRef<{ startX: number; startY: number; startPanX: number; startPanY: number } | null>(null);
  const rulerDragRef = useRef<'pt1' | 'pt2' | null>(null);

  // Measurement tool state
  const [activeTool, setActiveTool] = useState<MeasureTool | null>(null);
  const [rulerState, setRulerState] = useState<RulerState>(EMPTY_RULER_STATE);
  const [diameterState, setDiameterState] = useState<DiameterState | null>(null);
  const [autodimState, setAutodimState] = useState<AutodimState | null>(null);
  const [snapHover, setSnapHover] = useState<SnapPoint | null>(null);

  const snapPoints = useMemo(() => {
    if (!section?.contours) return [];
    return computeSnapPoints(section.contours);
  }, [section]);

  const toggleTool = useCallback((tool: MeasureTool) => {
    setActiveTool(t => (t === tool ? null : tool));
    setRulerState(EMPTY_RULER_STATE);
    setDiameterState(null);
    setAutodimState(null);
    setSnapHover(null);
  }, []);

  const centre = (): [number, number] => {
    const c = canvasRef.current;
    return c ? [c.width / 2, c.height / 2] : [200, 200];
  };

  // Auto-fit whenever section changes
  useEffect(() => {
    if (!section?.bounds) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { minX, minY, maxX, maxY } = section.bounds;
    const secW = maxX - minX, secH = maxY - minY;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.offsetWidth;
    const h = rect.height || canvas.offsetHeight;
    const z = fitZoom(secW, secH, w, h);
    const next = { zoom: z, panX: 0, panY: 0 };
    vsRef.current = next;
    setVs(next);
    setActiveTool(null);
    setRulerState(EMPTY_RULER_STATE);
    setDiameterState(null);
    setAutodimState(null);
    setSnapHover(null);
  }, [section]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    const currentVs = vsRef.current;
    const [cx, cy] = centre();
    const [modelX, modelY] = canvasToModel(mx, my, currentVs, cx, cy);
    const newZoom = clamp(currentVs.zoom * factor, 0.01, 500);
    const next = {
      zoom: newZoom,
      panX: mx - cx - modelX * newZoom,
      panY: my - cy - modelY * newZoom,
    };
    vsRef.current = next;
    setVs(next);
  }, []);

  /** Resolve a raw section-space point to its snapped position (unless a modifier key disables snapping). */
  const resolveSnap = useCallback((modelX: number, modelY: number, e: MouseEvent, currentVs: ViewState): [number, number] => {
    if (e.shiftKey || e.ctrlKey || e.altKey) return [modelX, modelY];
    const snapRadiusMM = SNAP_RADIUS_PX / currentVs.zoom;
    const snap = findNearestSnap(modelX, modelY, snapPoints, snapRadiusMM);
    return snap ? [snap.x, snap.y] : [modelX, modelY];
  }, [snapPoints]);

  const updateSnapHover = useCallback((modelX: number, modelY: number, e: MouseEvent, currentVs: ViewState) => {
    if (e.shiftKey || e.ctrlKey || e.altKey) { setSnapHover(null); return; }
    const snapRadiusMM = SNAP_RADIUS_PX / currentVs.zoom;
    setSnapHover(findNearestSnap(modelX, modelY, snapPoints, snapRadiusMM));
  }, [snapPoints]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (e.button === 2) {
      panDragRef.current = {
        startX: e.clientX, startY: e.clientY,
        startPanX: vsRef.current.panX, startPanY: vsRef.current.panY,
      };
      return;
    }

    if (e.button !== 0 || !activeTool || !section?.bounds) return;

    const currentVs = vsRef.current;
    const [cx, cy] = centre();
    const [mx, my] = canvasToModel(sx, sy, currentVs, cx, cy);
    const secCx = (section.bounds.minX + section.bounds.maxX) / 2;
    const secCy = (section.bounds.minY + section.bounds.maxY) / 2;
    const modelX = mx + secCx, modelY = my + secCy;

    if (activeTool === 'ruler') {
      if (rulerState.stage === 'complete') {
        const p1c = rulerState.pt1 ? modelToCanvas(rulerState.pt1[0] - secCx, rulerState.pt1[1] - secCy, currentVs, cx, cy) : null;
        const p2c = rulerState.pt2 ? modelToCanvas(rulerState.pt2[0] - secCx, rulerState.pt2[1] - secCy, currentVs, cx, cy) : null;
        const hitP1 = p1c !== null && Math.hypot(sx - p1c[0], sy - p1c[1]) <= RULER_HIT_PX;
        const hitP2 = p2c !== null && Math.hypot(sx - p2c[0], sy - p2c[1]) <= RULER_HIT_PX;
        if (hitP1) { rulerDragRef.current = 'pt1'; return; }
        if (hitP2) { rulerDragRef.current = 'pt2'; return; }
        setRulerState(EMPTY_RULER_STATE);
        return;
      }
      const snapped = resolveSnap(modelX, modelY, e, currentVs);
      if (rulerState.stage === 'empty') {
        setRulerState({ stage: 'pt1_placed', pt1: snapped, pt2: null, hoverPt: snapped });
      } else {
        setRulerState(rs => ({ ...rs, stage: 'complete', pt2: snapped }));
      }
      return;
    }

    if (activeTool === 'diameter') {
      const fit = findCircleAtPoint(modelX, modelY, section.contours);
      setDiameterState(fit ? { cx: fit.cx, cy: fit.cy, r: fit.r } : null);
      return;
    }

    if (activeTool === 'autodim') {
      const idx = findContourAtPoint(modelX, modelY, section.contours);
      if (idx < 0) { setAutodimState(null); return; }
      const c = section.contours[idx];
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const p of c) {
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
      }
      setAutodimState({ minX, minY, maxX, maxY });
    }
  }, [activeTool, section, rulerState, resolveSnap]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const pan = panDragRef.current;
    if (pan) {
      const next = {
        zoom: vsRef.current.zoom,
        panX: pan.startPanX + (e.clientX - pan.startX),
        panY: pan.startPanY + (e.clientY - pan.startY),
      };
      vsRef.current = next;
      setVs(next);
    }

    if (!activeTool || !section?.bounds) return;

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const currentVs = vsRef.current;
    const [cx, cy] = centre();
    const [mx, my] = canvasToModel(sx, sy, currentVs, cx, cy);
    const secCx = (section.bounds.minX + section.bounds.maxX) / 2;
    const secCy = (section.bounds.minY + section.bounds.maxY) / 2;
    const modelX = mx + secCx, modelY = my + secCy;

    if (activeTool === 'ruler' && rulerDragRef.current) {
      const which = rulerDragRef.current;
      const snapped = resolveSnap(modelX, modelY, e, currentVs);
      setRulerState(rs => ({ ...rs, [which]: snapped }));
      updateSnapHover(modelX, modelY, e, currentVs);
      return;
    }

    if (activeTool === 'ruler' && rulerState.stage === 'pt1_placed') {
      const snapped = resolveSnap(modelX, modelY, e, currentVs);
      setRulerState(rs => ({ ...rs, hoverPt: snapped }));
    }

    updateSnapHover(modelX, modelY, e, currentVs);
  }, [activeTool, section, rulerState.stage, resolveSnap, updateSnapHover]);

  const handleMouseUp = useCallback(() => {
    panDragRef.current = null;
    rulerDragRef.current = null;
  }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    if (activeTool === 'ruler') setRulerState(EMPTY_RULER_STATE);
    else if (activeTool === 'diameter') setDiameterState(null);
    else if (activeTool === 'autodim') setAutodimState(null);
  }, [activeTool]);

  // Draw section + measurement overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = containerRef.current;
    if (!container) return;

    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    if (!section || !section.bounds || section.contours.length === 0) return;

    const { bounds, contours } = section;
    const secCx = (bounds.minX + bounds.maxX) / 2;
    const secCy = (bounds.minY + bounds.maxY) / 2;
    const toCanvas = (mx: number, my: number): [number, number] =>
      modelToCanvas(mx - secCx, my - secCy, vs, cx, cy);

    // White paper background (section area)
    const bMinX = toCanvas(bounds.minX, bounds.minY);
    const bMaxX = toCanvas(bounds.maxX, bounds.maxY);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bMinX[0], bMinX[1], bMaxX[0] - bMinX[0], bMaxX[1] - bMinX[1]);

    // Draw contours with even-odd fill
    ctx.beginPath();
    for (const contour of contours) {
      if (contour.length < 2) continue;
      const [fx, fy] = toCanvas(contour[0].x, contour[0].y);
      ctx.moveTo(fx, fy);
      for (let i = 1; i < contour.length; i++) {
        const [lx, ly] = toCanvas(contour[i].x, contour[i].y);
        ctx.lineTo(lx, ly);
      }
      ctx.closePath();
    }

    ctx.fillStyle = '#d2d2d2';
    ctx.fill('evenodd');

    // Outlines
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(1.5, vs.zoom * 0.03);
    ctx.stroke();

    // Scale bar (if we know we're at mm scale)
    drawScaleBar(ctx, vs.zoom, W, H);

    // ── Measurement tool overlays ──────────────────────────────────────
    if (activeTool === 'ruler') {
      const drawDot = (p: [number, number]) => {
        const [sx, sy] = toCanvas(p[0], p[1]);
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = MEASURE_COLOR;
        ctx.stroke();
      };
      const drawMeasureLine = (p1: [number, number], p2: [number, number]) => {
        const [x1, y1] = toCanvas(p1[0], p1[1]);
        const [x2, y2] = toCanvas(p2[0], p2[1]);
        ctx.save();
        ctx.strokeStyle = MEASURE_COLOR;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
        const dist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
        drawMeasureLabel(ctx, `${dist.toFixed(1)} mm`, (x1 + x2) / 2, (y1 + y2) / 2);
      };

      if (rulerState.pt1) drawDot(rulerState.pt1);
      if (rulerState.pt2) drawDot(rulerState.pt2);

      if (rulerState.stage === 'pt1_placed' && rulerState.pt1 && rulerState.hoverPt) {
        drawMeasureLine(rulerState.pt1, rulerState.hoverPt);
      } else if (rulerState.stage === 'complete' && rulerState.pt1 && rulerState.pt2) {
        drawMeasureLine(rulerState.pt1, rulerState.pt2);
      }
    }

    if (activeTool === 'diameter' && diameterState) {
      const { cx: dcx, cy: dcy, r } = diameterState;
      const [ccx, ccy] = toCanvas(dcx, dcy);
      const rc = r * vs.zoom;

      ctx.save();
      ctx.strokeStyle = MEASURE_COLOR;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.arc(ccx, ccy, rc, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ccx - rc, ccy);
      ctx.lineTo(ccx + rc, ccy);
      ctx.stroke();
      ctx.restore();

      const label = `⌀${(r * 2).toFixed(2)}`;
      drawMeasureLabel(ctx, label, ccx, rc > 30 ? ccy : ccy - rc - 14);
    }

    if (activeTool === 'autodim' && autodimState) {
      const { minX, minY, maxX, maxY } = autodimState;
      const offsetMM = 8;

      ctx.save();
      ctx.strokeStyle = DIM_COLOR;
      ctx.lineWidth = 1.2;

      // Top horizontal dimension: width, offset above the contour
      const dimY = minY - offsetMM;
      const [tl0x, tl0y] = toCanvas(minX, minY);
      const [tl1x, tl1y] = toCanvas(minX, dimY);
      const [tr0x, tr0y] = toCanvas(maxX, minY);
      const [tr1x, tr1y] = toCanvas(maxX, dimY);
      ctx.beginPath();
      ctx.moveTo(tl0x, tl0y); ctx.lineTo(tl1x, tl1y); // left extension line
      ctx.moveTo(tr0x, tr0y); ctx.lineTo(tr1x, tr1y); // right extension line
      ctx.moveTo(tl1x, tl1y); ctx.lineTo(tr1x, tr1y); // dimension line
      ctx.stroke();
      drawDimTick(ctx, tl1x, tl1y, Math.PI / 4);
      drawDimTick(ctx, tr1x, tr1y, Math.PI / 4);
      drawMeasureLabel(ctx, `${(maxX - minX).toFixed(1)} mm`, (tl1x + tr1x) / 2, tl1y - 12);

      // Right vertical dimension: height, offset right of the contour
      const dimX = maxX + offsetMM;
      const [rt0x, rt0y] = toCanvas(maxX, minY);
      const [rt1x, rt1y] = toCanvas(dimX, minY);
      const [rb0x, rb0y] = toCanvas(maxX, maxY);
      const [rb1x, rb1y] = toCanvas(dimX, maxY);
      ctx.beginPath();
      ctx.moveTo(rt0x, rt0y); ctx.lineTo(rt1x, rt1y); // top extension line
      ctx.moveTo(rb0x, rb0y); ctx.lineTo(rb1x, rb1y); // bottom extension line
      ctx.moveTo(rt1x, rt1y); ctx.lineTo(rb1x, rb1y); // dimension line
      ctx.stroke();
      drawDimTick(ctx, rt1x, rt1y, Math.PI / 4);
      drawDimTick(ctx, rb1x, rb1y, Math.PI / 4);
      ctx.restore();
      drawMeasureLabel(ctx, `${(maxY - minY).toFixed(1)} mm`, rt1x + 24, (rt1y + rb1y) / 2);
    }

    // Snap indicator crosshair
    if (activeTool && snapHover) {
      const [scx, scy] = toCanvas(snapHover.x, snapHover.y);
      ctx.save();
      ctx.strokeStyle = SNAP_COLOR;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(scx - 6, scy); ctx.lineTo(scx + 6, scy);
      ctx.moveTo(scx, scy - 6); ctx.lineTo(scx, scy + 6);
      ctx.stroke();
      ctx.restore();
    }
  }, [section, vs, activeTool, rulerState, diameterState, autodimState, snapHover]);

  const handlePrint = useCallback(() => {
    if (!section || !plane) return;
    const blob = generateSectionPDF(section, plane);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `section-${plane.axis}=${plane.value.toFixed(1)}mm.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, [section, plane]);

  const hasSection = section && section.contours.length > 0;

  return (
    <div class="pane">
      <div class="section-toolbar">
        <button
          class={`tool-btn${activeTool === 'ruler' ? ' active' : ''}`}
          onClick={() => toggleTool('ruler')}
          title="Distance Ruler (click twice to measure)"
        >📏 Ruler</button>
        <button
          class={`tool-btn${activeTool === 'diameter' ? ' active' : ''}`}
          onClick={() => toggleTool('diameter')}
          title="Diameter / Circle Detector"
        >⊙ Diameter</button>
        <button
          class={`tool-btn${activeTool === 'autodim' ? ' active' : ''}`}
          onClick={() => toggleTool('autodim')}
          title="Auto Dimensions"
        >⬛ Auto-Dim</button>
      </div>
      <div class="section-canvas-wrap" ref={containerRef}>
        <span class="pane-label">Section Output</span>
        <canvas
          ref={canvasRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
          style={{ cursor: activeTool ? 'crosshair' : 'default' }}
        />
        {!hasSection && (
          <div class="no-section">
            <p>Click in a view pane to create a<br />cutting plane</p>
          </div>
        )}
        <div class="output-controls">
          <button class="btn" disabled={!hasSection} onClick={handlePrint}>
            🖨 Print PDF
          </button>
        </div>
      </div>
    </div>
  );
}


function drawScaleBar(ctx: CanvasRenderingContext2D, zoom: number, W: number, H: number) {
  // Choose a nice round scale bar length in mm
  const candidates = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  const targetPx = W * 0.12; // target 12% of canvas width
  let bestMm = 10;
  for (const c of candidates) {
    if (c * zoom <= targetPx) bestMm = c;
  }
  const barPx = bestMm * zoom;
  if (barPx < 5) return;

  const x = W - 12 - barPx;
  const y = H - 20;

  ctx.save();
  ctx.strokeStyle = '#333';
  ctx.fillStyle = '#333';
  ctx.lineWidth = 2;
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';

  ctx.beginPath();
  ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4);
  ctx.moveTo(x, y); ctx.lineTo(x + barPx, y);
  ctx.moveTo(x + barPx, y - 4); ctx.lineTo(x + barPx, y + 4);
  ctx.stroke();

  ctx.fillText(`${bestMm} mm`, x + barPx / 2, y - 7);
  ctx.restore();
}

// ─── DropZone ─────────────────────────────────────────────────────────────

interface DropZoneProps {
  onLoad: (mesh: MeshData) => void;
}

function DropZone({ onLoad }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadBuffer = useCallback((buf: ArrayBuffer) => {
    setError(null);
    setLoading(true);
    // Defer to a fresh task so the loading spinner has a chance to paint
    // before the (synchronous, potentially slow) parse runs.
    setTimeout(() => {
      try {
        const mesh = parseSTL(buf);
        if (mesh.count === 0) {
          setError('No triangles found in STL file.');
          setLoading(false);
          return;
        }
        onLoad(mesh);
      } catch (e) {
        setError(`Failed to parse STL: ${e instanceof Error ? e.message : String(e)}`);
        setLoading(false);
      }
    }, 10);
  }, [onLoad]);

  const handleFile = useCallback((file: File) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = () => loadBuffer(reader.result as ArrayBuffer);
    reader.onerror = () => setError('Could not read file.');
    reader.readAsArrayBuffer(file);
  }, [loadBuffer]);

  const handleDemo = useCallback((maker: () => ArrayBuffer) => {
    loadBuffer(maker());
  }, [loadBuffer]);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleClick = useCallback(() => inputRef.current?.click(), []);

  const handleInputChange = useCallback((e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) handleFile(file);
    input.value = '';
  }, [handleFile]);

  // Paste: handle paste event for files
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) { handleFile(file); return; }
        }
      }
    };
    window.addEventListener('paste', handler);
    return () => window.removeEventListener('paste', handler);
  }, [handleFile]);

  if (loading) {
    return (
      <div class="drop-zone-container">
        <div class="loading-screen">
          <div class="spinner" />
          <p>Parsing model…</p>
        </div>
      </div>
    );
  }

  return (
    <div class="drop-zone-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          class={`drop-zone${dragging ? ' dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <div class="drop-zone-icon">📐</div>
          <h2>Open an STL file</h2>
          <p>Drag & drop, click to browse, or paste</p>
          {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
          <input
            ref={inputRef}
            type="file"
            accept=".stl"
            style={{ display: 'none' }}
            onChange={handleInputChange}
          />
        </div>
        <div class="demo-models">
          <span class="demo-label">Try a demo:</span>
          <button class="btn btn-secondary btn-sm" onClick={() => handleDemo(makeTorus)}>🔵 Torus</button>
          <button class="btn btn-secondary btn-sm" onClick={() => handleDemo(makeSteppedShaft)}>⚙ Stepped Shaft</button>
          <button class="btn btn-secondary btn-sm" onClick={() => handleDemo(makeMountingPlate)}>🔩 Mounting Plate</button>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer class="footer">
      <span>A vibe-coded micro-app via&nbsp;
        <a href="https://searyanc.dev" target="_blank" rel="noopener noreferrer">SeaRyanC</a>
      </span>
      <span>·</span>
      <a
        href="https://github.com/SeaRyanC/app/tree/main/stl2pdf"
        target="_blank"
        rel="noopener noreferrer"
        title="Source on GitHub"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07
            -.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08
            -.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09
            2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
            0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
            .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
      <span>·</span>
      <span>v{VERSION}+{COMMIT_HASH}</span>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

function App() {
  const [mesh, setMesh] = useState<MeshData | null>(null);
  const [plane, setPlane] = useState<CutPlane | null>(null);

  const handleLoad = useCallback((m: MeshData) => {
    setMesh(m);
    setPlane(null);
  }, []);

  const handleSetPlane = useCallback((axis: CutPlane['axis'], value: number) => {
    setPlane({ axis, value });
  }, []);

  const handleCyclePlane = useCallback(() => {
    setPlane(p => {
      if (!p) return p;
      return { ...p, axis: nextAxis(p.axis) };
    });
  }, []);

  // Compute section – memoized; fast due to Float32Array + per-triangle quick reject
  const section: SectionResult | null = useMemo(() => {
    if (!mesh || !plane) return null;
    return computeSection(mesh, plane);
  }, [mesh, plane]);

  // Shared initial-zoom basis for all three model panes, so they all start
  // at the same visual scale regardless of view direction.
  const maxModelDim = useMemo(() => {
    if (!mesh) return 1;
    const { size } = mesh.bbox;
    return Math.max(size.x, size.y, size.z);
  }, [mesh]);

  return (
    <div id="app">
      <div class="header">
        <h1>📐 STL2PDF – Cross-Section Viewer</h1>
        {mesh && (
          <button class="btn btn-secondary" onClick={() => { setMesh(null); setPlane(null); }}>
            Load another file
          </button>
        )}
      </div>

      {!mesh && <DropZone onLoad={handleLoad} />}

      {mesh && (
        <div class="pane-grid">
          <ModelPane
            label="Front (XZ)"
            dir="front"
            mesh={mesh}
            plane={plane}
            onSetPlane={handleSetPlane}
            onCyclePlane={handleCyclePlane}
            maxModelDim={maxModelDim}
            showHint={false}
          />
          <ModelPane
            label="Side (YZ)"
            dir="side"
            mesh={mesh}
            plane={plane}
            onSetPlane={handleSetPlane}
            onCyclePlane={handleCyclePlane}
            maxModelDim={maxModelDim}
            showHint={false}
          />
          <ModelPane
            label="Top (XY)"
            dir="top"
            mesh={mesh}
            plane={plane}
            onSetPlane={handleSetPlane}
            onCyclePlane={handleCyclePlane}
            maxModelDim={maxModelDim}
            showHint={true}
          />
          <OutputPane section={section} plane={plane} />
        </div>
      )}

      <Footer />
    </div>
  );
}

render(<App />, document.getElementById('app')!);

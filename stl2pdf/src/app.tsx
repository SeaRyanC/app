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
}

const INDICATOR_COLOR = '#f78166';
const INDICATOR_HIT = 10; // px tolerance for clicking indicator

function ModelPane({ label, dir, mesh, plane, onSetPlane, onCyclePlane }: ModelPaneProps) {
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

  // ── Compute 2D bounding extent for auto-fit
  const modelExtent = useMemo((): { w: number; h: number } => {
    switch (dir) {
      case 'front': return { w: bbox.size.x, h: bbox.size.z };
      case 'side':  return { w: bbox.size.y, h: bbox.size.z };
      case 'top':   return { w: bbox.size.x, h: bbox.size.y };
    }
  }, [bbox, dir]);

  // ── Pre-project all triangles into a Path2D in view-centred model coords.
  //    Rebuilt only when the mesh or view direction changes; reused on every
  //    pan/zoom frame by applying a canvas transform instead of re-projecting.
  const wirePath = useMemo((): Path2D => {
    const path = new Path2D();
    const { verts, count } = mesh;
    const mcx = bbox.center.x, mcy = bbox.center.y, mcz = bbox.center.z;
    for (let i = 0; i < count; i++) {
      const b = i * 9;
      let pax: number, pay: number, pbx: number, pby: number, pcx: number, pcy: number;
      switch (dir) {
        case 'front': // project(v)=(v.x, -v.z), center=(mcx, -mcz)
          pax = verts[b]   - mcx; pay = -(verts[b+2]) + mcz;
          pbx = verts[b+3] - mcx; pby = -(verts[b+5]) + mcz;
          pcx = verts[b+6] - mcx; pcy = -(verts[b+8]) + mcz;
          break;
        case 'side': // project(v)=(v.y, -v.z), center=(mcy, -mcz)
          pax = verts[b+1] - mcy; pay = -(verts[b+2]) + mcz;
          pbx = verts[b+4] - mcy; pby = -(verts[b+5]) + mcz;
          pcx = verts[b+7] - mcy; pcy = -(verts[b+8]) + mcz;
          break;
        default: // top: project(v)=(v.x, v.y), center=(mcx, mcy)
          pax = verts[b]   - mcx; pay = verts[b+1] - mcy;
          pbx = verts[b+3] - mcx; pby = verts[b+4] - mcy;
          pcx = verts[b+6] - mcx; pcy = verts[b+7] - mcy;
          break;
      }
      path.moveTo(pax, pay);
      path.lineTo(pbx, pby);
      path.lineTo(pcx, pcy);
      path.closePath();
    }
    return path;
  }, [mesh, bbox, dir]);

  // ── Initialize zoom to fit on first render / when model changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.offsetWidth;
    const h = rect.height || canvas.offsetHeight;
    const z = fitZoom(modelExtent.w, modelExtent.h, w, h);
    setVs({ zoom: z, panX: 0, panY: 0 });
  }, [mesh, modelExtent]);

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

    // ── Draw wireframe using the cached Path2D.
    //    Apply a canvas transform instead of re-projecting every vertex each frame;
    //    the browser can GPU-cache the path and render it with a single matrix multiply.
    ctx.save();
    ctx.strokeStyle = 'rgba(100, 160, 220, 0.25)';
    ctx.lineWidth = 0.5;
    ctx.setTransform(vs.zoom, 0, 0, vs.zoom, cx + vs.panX, cy + vs.panY);
    ctx.stroke(wirePath);
    ctx.restore(); // resets transform to identity

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
  }, [mesh, wirePath, plane, vs, dir, modelCenter]);

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
      <div class="hint">
        Scroll: zoom &nbsp;·&nbsp; Right-drag: pan
        <br />
        Click: set plane &nbsp;·&nbsp; Drag indicator: move
        <br />
        Right-click indicator: cycle axis
      </div>
    </div>
  );
}

// ─── OutputPane ───────────────────────────────────────────────────────────

interface OutputPaneProps {
  section: SectionResult | null;
  plane: CutPlane | null;
}

function OutputPane({ section, plane }: OutputPaneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // View state
  const [vs, setVs] = useState<ViewState>({ zoom: 1, panX: 0, panY: 0 });
  const vsRef = useRef(vs);
  vsRef.current = vs;

  const dragRef = useRef<{ startX: number; startY: number; startPanX: number; startPanY: number } | null>(null);

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

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button === 2) {
      dragRef.current = {
        startX: e.clientX, startY: e.clientY,
        startPanX: vsRef.current.panX, startPanY: vsRef.current.panY,
      };
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = {
      zoom: vsRef.current.zoom,
      panX: drag.startPanX + (e.clientX - drag.startX),
      panY: drag.startPanY + (e.clientY - drag.startY),
    };
    vsRef.current = next;
    setVs(next);
  }, []);

  const handleMouseUp = useCallback(() => { dragRef.current = null; }, []);

  const handleContextMenu = useCallback((e: MouseEvent) => { e.preventDefault(); }, []);

  // Draw section
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

    // White paper background (section area)
    const bMinX = modelToCanvas(bounds.minX - secCx, bounds.minY - secCy, vs, cx, cy);
    const bMaxX = modelToCanvas(bounds.maxX - secCx, bounds.maxY - secCy, vs, cx, cy);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bMinX[0], bMinX[1], bMaxX[0] - bMinX[0], bMaxX[1] - bMinX[1]);

    // Draw contours with even-odd fill
    ctx.beginPath();
    for (const contour of contours) {
      if (contour.length < 2) continue;
      const [fx, fy] = modelToCanvas(contour[0].x - secCx, contour[0].y - secCy, vs, cx, cy);
      ctx.moveTo(fx, fy);
      for (let i = 1; i < contour.length; i++) {
        const [lx, ly] = modelToCanvas(contour[i].x - secCx, contour[i].y - secCy, vs, cx, cy);
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
  }, [section, vs]);

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
    <div class="pane" ref={containerRef}>
      <span class="pane-label">Section Output</span>
      <canvas
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        style={{ cursor: 'default' }}
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
  const inputRef = useRef<HTMLInputElement>(null);

  const loadBuffer = useCallback((buf: ArrayBuffer) => {
    try {
      const mesh = parseSTL(buf);
      if (mesh.count === 0) {
        setError('No triangles found in STL file.');
        return;
      }
      onLoad(mesh);
    } catch (e) {
      setError(`Failed to parse STL: ${e instanceof Error ? e.message : String(e)}`);
    }
  }, [onLoad]);

  const handleFile = useCallback((file: File) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = () => loadBuffer(reader.result as ArrayBuffer);
    reader.onerror = () => setError('Could not read file.');
    reader.readAsArrayBuffer(file);
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

  return (
    <div class="drop-zone-container">
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
          />
          <ModelPane
            label="Side (YZ)"
            dir="side"
            mesh={mesh}
            plane={plane}
            onSetPlane={handleSetPlane}
            onCyclePlane={handleCyclePlane}
          />
          <ModelPane
            label="Top (XY)"
            dir="top"
            mesh={mesh}
            plane={plane}
            onSetPlane={handleSetPlane}
            onCyclePlane={handleCyclePlane}
          />
          <OutputPane section={section} plane={plane} />
        </div>
      )}

      <Footer />
    </div>
  );
}

render(<App />, document.getElementById('app')!);

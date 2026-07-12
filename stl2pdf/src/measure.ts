/**
 * Measurement utilities for the Section Output pane: snapping to contour
 * geometry, point-in-polygon / contour-nesting tests, and circle/arc
 * detection (Kasa least-squares fit) used by the Diameter and Auto-Dim tools.
 */
import type { Vec2 } from './geometry.js';

export interface SnapPoint { x: number; y: number; }

const EPS = 1e-9;

function pointsClose(a: Vec2, b: Vec2, eps = 1e-6): boolean {
  return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps;
}

/** Returns the contour's vertex count, excluding a duplicated closing point. */
function effectiveLength(contour: Vec2[]): number {
  const n = contour.length;
  if (n > 1 && pointsClose(contour[0], contour[n - 1])) return n - 1;
  return n;
}

// ─── Snapping ───────────────────────────────────────────────────────────────

/** Extract snap points: all contour vertices + edge midpoints. */
export function computeSnapPoints(contours: Vec2[][]): SnapPoint[] {
  const out: SnapPoint[] = [];
  for (const contour of contours) {
    const n = effectiveLength(contour);
    if (n < 2) continue;
    for (let i = 0; i < n; i++) {
      const p = contour[i];
      const q = contour[(i + 1) % n];
      out.push({ x: p.x, y: p.y });
      out.push({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
    }
  }
  return out;
}

/**
 * Find nearest snap point to (mx, my) in model/section coords.
 * snapRadiusMM: snap threshold in model mm units.
 * Returns null if no snap point within radius.
 */
export function findNearestSnap(
  mx: number, my: number,
  snapPoints: SnapPoint[],
  snapRadiusMM: number
): SnapPoint | null {
  let best: SnapPoint | null = null;
  let bestDist = snapRadiusMM;
  for (const p of snapPoints) {
    const d = Math.hypot(p.x - mx, p.y - my);
    if (d <= bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return best;
}

// ─── Point-in-polygon / contour nesting ────────────────────────────────────

function onSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): boolean {
  const cross = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1);
  if (Math.abs(cross) > 1e-6) return false;
  const dot = (px - x1) * (x2 - x1) + (py - y1) * (y2 - y1);
  if (dot < 0) return false;
  const lenSq = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  return dot <= lenSq;
}

/**
 * Test if point (px, py) is inside a closed polygon using ray casting.
 * Returns true if inside (or on boundary).
 */
export function pointInPolygon(px: number, py: number, poly: Vec2[]): boolean {
  const n = effectiveLength(poly);
  if (n < 3) return false;

  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;

    if (onSegment(px, py, xi, yi, xj, yj)) return true;

    const intersect = (yi > py) !== (yj > py) &&
      px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function polygonArea(poly: Vec2[]): number {
  const n = effectiveLength(poly);
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum += poly[i].x * poly[j].y - poly[j].x * poly[i].y;
  }
  return sum / 2;
}

/**
 * Find the innermost contour (by even-odd nesting level) that contains point
 * (px, py). Approximated as the smallest-area contour among all contours
 * that geometrically contain the point.
 * Returns the contour index, or -1 if not inside any.
 */
export function findContourAtPoint(
  px: number, py: number,
  contours: Vec2[][]
): number {
  let bestIdx = -1;
  let bestArea = Infinity;
  for (let i = 0; i < contours.length; i++) {
    const c = contours[i];
    if (!pointInPolygon(px, py, c)) continue;
    const area = Math.abs(polygonArea(c));
    if (area < bestArea) {
      bestArea = area;
      bestIdx = i;
    }
  }
  return bestIdx;
}

// ─── Circle fitting (Kasa algebraic method) ────────────────────────────────

export interface CircleFit {
  cx: number; cy: number; r: number; rmsError: number;
}

/** Solve a 3x3 linear system [A|b] via Gaussian elimination with partial pivoting. */
function solve3x3(rows: [number, number, number, number][]): [number, number, number] | null {
  const A = rows.map(row => row.slice()) as [number, number, number, number][];

  for (let col = 0; col < 3; col++) {
    let pivotRow = col;
    let pivotVal = Math.abs(A[col][col]);
    for (let r = col + 1; r < 3; r++) {
      if (Math.abs(A[r][col]) > pivotVal) {
        pivotVal = Math.abs(A[r][col]);
        pivotRow = r;
      }
    }
    if (pivotVal < 1e-12) return null;
    if (pivotRow !== col) {
      const tmp = A[col]; A[col] = A[pivotRow]; A[pivotRow] = tmp;
    }
    for (let r = col + 1; r < 3; r++) {
      const factor = A[r][col] / A[col][col];
      for (let c = col; c < 4; c++) A[r][c] -= factor * A[col][c];
    }
  }

  const x: [number, number, number] = [0, 0, 0];
  for (let row = 2; row >= 0; row--) {
    let sum = A[row][3];
    for (let c = row + 1; c < 3; c++) sum -= A[row][c] * x[c];
    x[row] = sum / A[row][row];
  }
  return x;
}

/**
 * Fit a circle to a set of points using the Kasa algebraic method.
 * Returns { cx, cy, r, rmsError } or null if not enough points.
 */
export function fitCircle(pts: Vec2[]): CircleFit | null {
  const n = pts.length;
  if (n < 3) return null;

  let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
  let sxxx = 0, syyy = 0, sxyy = 0, sxxy = 0;

  for (const p of pts) {
    const x = p.x, y = p.y;
    const xx = x * x, yy = y * y;
    sx += x; sy += y;
    sxx += xx; syy += yy; sxy += x * y;
    sxxx += xx * x; syyy += yy * y;
    sxyy += x * yy; sxxy += xx * y;
  }

  const sol = solve3x3([
    [sxx, sxy, sx, sxxx + sxyy],
    [sxy, syy, sy, sxxy + syyy],
    [sx, sy, n, sxx + syy],
  ]);
  if (!sol) return null;

  const [D, E, F] = sol;
  const cx = D / 2, cy = E / 2;
  const r2 = cx * cx + cy * cy + F;
  if (!(r2 > 0)) return null;
  const r = Math.sqrt(r2);

  let se = 0;
  for (const p of pts) {
    const d = Math.hypot(p.x - cx, p.y - cy) - r;
    se += d * d;
  }
  const rmsError = Math.sqrt(se / n);

  return { cx, cy, r, rmsError };
}

/** Angular span of points around a center (cx, cy). Returns value in [0, 2π]. */
export function angularSpan(pts: Vec2[], cx: number, cy: number): number {
  if (pts.length === 0) return 0;
  const angles = pts.map(p => Math.atan2(p.y - cy, p.x - cx));
  angles.sort((a, b) => a - b);

  let maxGap = 0;
  for (let i = 0; i < angles.length; i++) {
    const a0 = angles[i];
    const a1 = i + 1 < angles.length ? angles[i + 1] : angles[0] + 2 * Math.PI;
    const gap = a1 - a0;
    if (gap > maxGap) maxGap = gap;
  }
  const span = 2 * Math.PI - maxGap;
  return Math.max(0, Math.min(2 * Math.PI, span));
}

/**
 * Detect the best arc near point (px, py) in the given contour.
 * Tries windows of increasing size centered on the closest contour vertex,
 * fits a circle to each, and scores by (angularSpan/π) * (1 - rmsError/r).
 * Returns null if no good circle is found.
 */
export function detectArc(
  px: number, py: number,
  contour: Vec2[]
): CircleFit | null {
  const n = effectiveLength(contour);
  if (n < 5) return null;
  const pts = contour.slice(0, n);

  let closestIdx = 0;
  let closestDist = Infinity;
  for (let i = 0; i < n; i++) {
    const d = Math.hypot(pts[i].x - px, pts[i].y - py);
    if (d < closestDist) {
      closestDist = d;
      closestIdx = i;
    }
  }

  let bestFit: CircleFit | null = null;
  let bestQuality = -Infinity;
  let bestSpan = 0;

  const maxHalf = Math.floor(n / 2);
  for (let half = 2; half <= maxHalf; half++) {
    const window: Vec2[] = [];
    for (let k = -half; k <= half; k++) {
      window.push(pts[((closestIdx + k) % n + n) % n]);
    }
    const fit = fitCircle(window);
    if (!fit || !(fit.r > EPS)) continue;

    const span = angularSpan(window, fit.cx, fit.cy);
    const quality = (span / Math.PI) * (1 - fit.rmsError / fit.r);
    if (quality > bestQuality) {
      bestQuality = quality;
      bestFit = fit;
      bestSpan = span;
    }
  }

  if (bestFit && bestQuality > 0.3 && bestSpan >= Math.PI / 2) {
    return bestFit;
  }
  return null;
}

/**
 * Find the best circle for the click at (px, py) across all contours.
 * Tries a full-contour fit first (for contours that are themselves
 * near-circular, e.g. a drilled hole), then falls back to local arc
 * detection (for a rounded corner/fillet on a larger contour).
 */
export function findCircleAtPoint(
  px: number, py: number,
  contours: Vec2[][]
): CircleFit | null {
  let bestFull: CircleFit | null = null;
  let bestFullDist = Infinity;

  for (const contour of contours) {
    const n = effectiveLength(contour);
    if (n < 5) continue;
    const pts = contour.slice(0, n);

    const fit = fitCircle(pts);
    if (!fit || !(fit.r > EPS)) continue;
    if (fit.rmsError / fit.r > 0.05) continue; // not circle-like, skip

    let minPtDist = Infinity;
    for (const p of pts) {
      const d = Math.hypot(p.x - px, p.y - py);
      if (d < minPtDist) minPtDist = d;
    }
    const distToCenter = Math.hypot(px - fit.cx, py - fit.cy);
    const distToCircle = Math.abs(distToCenter - fit.r);
    const proximity = Math.min(minPtDist, distToCircle);

    if (proximity < fit.r * 0.5 && proximity < bestFullDist) {
      bestFullDist = proximity;
      bestFull = fit;
    }
  }

  if (bestFull) return bestFull;

  let bestArc: CircleFit | null = null;
  let bestArcDist = Infinity;
  for (const contour of contours) {
    const arc = detectArc(px, py, contour);
    if (!arc) continue;
    const d = Math.hypot(px - arc.cx, py - arc.cy);
    if (d < bestArcDist) {
      bestArcDist = d;
      bestArc = arc;
    }
  }
  return bestArc;
}

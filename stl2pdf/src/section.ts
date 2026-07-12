import type { MeshData } from './stl-parser.js';
import type { Vec2, CutPlane } from './geometry.js';

// ─── Triangle → segment ────────────────────────────────────────────────────

const EPS = 1e-9;

/**
 * Intersect one triangle (addressed by its base offset in the flat verts array)
 * with the plane (axis = value).
 * Returns a [Vec2, Vec2] segment if there is a crossing, otherwise null.
 *
 * Algorithm: classify each vertex as above/on/below the plane.
 * For each directed edge (vi → vj), if vi is "on" the plane we contribute
 * its projection; if the edge straddles the plane we contribute the
 * interpolated intersection point.  This gives at most one contribution per
 * edge and guarantees at most 2 unique points per triangle.
 */
function triangleSegment(
  verts: Float32Array,
  base: number,             // base offset = triIdx * 9
  axis: 'x' | 'y' | 'z',
  value: number
): [Vec2, Vec2] | null {
  // Extract vertex coords directly from flat buffer (cache-friendly)
  const ax = verts[base],   ay = verts[base+1], az = verts[base+2];
  const bx = verts[base+3], by = verts[base+4], bz = verts[base+5];
  const cx = verts[base+6], cy = verts[base+7], cz = verts[base+8];

  // Signed distances from the plane along the cutting axis
  let da: number, db: number, dc: number;
  switch (axis) {
    case 'x': da = ax - value; db = bx - value; dc = cx - value; break;
    case 'y': da = ay - value; db = by - value; dc = cy - value; break;
    default:  da = az - value; db = bz - value; dc = cz - value; break;
  }

  // Quick reject: all vertices on the same side
  if (da > EPS && db > EPS && dc > EPS) return null;
  if (da < -EPS && db < -EPS && dc < -EPS) return null;

  // Project a 3D point to the 2D section coordinate system:
  //   axis='z': looking -Z → (x, y)
  //   axis='x': looking -X → (y, -z)
  //   axis='y': looking -Y → (x, -z)
  const proj2d = (vx: number, vy: number, vz: number): Vec2 => {
    switch (axis) {
      case 'z': return { x: vx, y: vy };
      case 'x': return { x: vy, y: -vz };
      default:  return { x: vx, y: -vz };
    }
  };

  const pts: Vec2[] = [];

  // Process edge A→B
  if (Math.abs(da) <= EPS) {
    pts.push(proj2d(ax, ay, az));
  } else if (da * db < 0) {
    const t = da / (da - db);
    pts.push(proj2d(ax + t*(bx-ax), ay + t*(by-ay), az + t*(bz-az)));
  }
  // Process edge B→C
  if (Math.abs(db) <= EPS) {
    pts.push(proj2d(bx, by, bz));
  } else if (db * dc < 0) {
    const t = db / (db - dc);
    pts.push(proj2d(bx + t*(cx-bx), by + t*(cy-by), bz + t*(cz-bz)));
  }
  // Process edge C→A
  if (Math.abs(dc) <= EPS) {
    pts.push(proj2d(cx, cy, cz));
  } else if (dc * da < 0) {
    const t = dc / (dc - da);
    pts.push(proj2d(cx + t*(ax-cx), cy + t*(ay-cy), cz + t*(az-cz)));
  }

  // Deduplicate (floating-point coincident endpoints from shared edges)
  const unique: Vec2[] = [];
  outer:
  for (const p of pts) {
    for (const q of unique) {
      if (Math.abs(q.x - p.x) < EPS * 100 && Math.abs(q.y - p.y) < EPS * 100) continue outer;
    }
    unique.push(p);
  }

  if (unique.length < 2) return null;
  return [unique[0], unique[1]];
}

// ─── Segment chaining ──────────────────────────────────────────────────────

const CHAIN_PREC = 6; // decimal places for endpoint keys

/**
 * Round to CHAIN_PREC decimal places and normalize -0 to 0.
 * Without this, a coordinate that's a hair below zero (e.g. -3e-15, common
 * where a revolved surface's 0/2π seam doesn't land on an exact float) would
 * key as "-0.000000" while its counterpart on the other side of the seam
 * keys as "0.000000", silently breaking the contour chain into fragments.
 */
function roundCoord(n: number): number {
  const r = Math.round(n * 10 ** CHAIN_PREC) / 10 ** CHAIN_PREC;
  return r === 0 ? 0 : r;
}

function ptKey(v: Vec2): string {
  return `${roundCoord(v.x).toFixed(CHAIN_PREC)},${roundCoord(v.y).toFixed(CHAIN_PREC)}`;
}

/**
 * Build closed contour loops from an unordered list of line segments.
 * Assumes each endpoint connects to exactly two segments (valid closed mesh).
 */
function buildContours(segments: [Vec2, Vec2][]): Vec2[][] {
  if (segments.length === 0) return [];

  // Map endpoint key → { neighbor point, segment index }
  const adj = new Map<string, { v: Vec2; idx: number }[]>();

  for (let i = 0; i < segments.length; i++) {
    const [a, b] = segments[i];
    const ka = ptKey(a), kb = ptKey(b);
    if (!adj.has(ka)) adj.set(ka, []);
    if (!adj.has(kb)) adj.set(kb, []);
    adj.get(ka)!.push({ v: b, idx: i });
    adj.get(kb)!.push({ v: a, idx: i });
  }

  const usedSeg = new Set<number>();
  const contours: Vec2[][] = [];

  for (let si = 0; si < segments.length; si++) {
    if (usedSeg.has(si)) continue;
    usedSeg.add(si);

    const contour: Vec2[] = [segments[si][0], segments[si][1]];
    let curKey = ptKey(segments[si][1]);

    // Walk the chain until we can't continue or we close the loop
    while (true) {
      const neighbors = adj.get(curKey);
      if (!neighbors) break;

      let advanced = false;
      for (const { v, idx } of neighbors) {
        if (!usedSeg.has(idx)) {
          usedSeg.add(idx);
          contour.push(v);
          curKey = ptKey(v);
          advanced = true;
          break;
        }
      }

      if (!advanced) break;
      if (curKey === ptKey(contour[0])) break; // loop closed
    }

    if (contour.length >= 3) {
      contours.push(contour);
    }
  }

  return contours;
}

// ─── Public API ────────────────────────────────────────────────────────────

export interface SectionResult {
  /** Closed contour loops (in section 2D space, mm units) */
  contours: Vec2[][];
  /** Bounding box of all contour points */
  bounds: { minX: number; minY: number; maxX: number; maxY: number } | null;
}

/**
 * Slice a triangle mesh with a plane (axis = value) and return the
 * closed 2D contours of the cross-section.
 *
 * Uses precomputed per-triangle bounding intervals to skip triangles that
 * cannot possibly intersect the plane before running the full intersection test.
 */
export function computeSection(
  mesh: MeshData,
  plane: CutPlane
): SectionResult {
  const { axis, value } = plane;
  const { verts, count } = mesh;

  // Select precomputed per-triangle bounds for the cutting axis
  let triMin: Float32Array, triMax: Float32Array;
  switch (axis) {
    case 'x': triMin = mesh.triMinX; triMax = mesh.triMaxX; break;
    case 'y': triMin = mesh.triMinY; triMax = mesh.triMaxY; break;
    default:  triMin = mesh.triMinZ; triMax = mesh.triMaxZ; break;
  }

  const segments: [Vec2, Vec2][] = [];

  for (let i = 0; i < count; i++) {
    // Bounding-interval quick reject: skip triangles that don't straddle the plane.
    // This eliminates the vast majority of triangles without touching the vertex data.
    if (triMax[i] < value - EPS || triMin[i] > value + EPS) continue;

    const seg = triangleSegment(verts, i * 9, axis, value);
    if (seg) segments.push(seg);
  }

  const contours = buildContours(segments);

  if (contours.length === 0) return { contours: [], bounds: null };

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const c of contours) {
    for (const p of c) {
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
  }

  return { contours, bounds: { minX, minY, maxX, maxY } };
}

import type { Vec3, Triangle } from './stl-parser.js';
import type { Vec2, CutPlane } from './geometry.js';

// ─── Triangle → segment ────────────────────────────────────────────────────

const EPS = 1e-9;

function lerp3(a: Vec3, b: Vec3, t: number): Vec3 {
  return {
    x: a.x + t * (b.x - a.x),
    y: a.y + t * (b.y - a.y),
    z: a.z + t * (b.z - a.z),
  };
}

function coordOf(v: Vec3, axis: 'x' | 'y' | 'z'): number {
  return v[axis];
}

function projectToSection(v: Vec3, axis: 'x' | 'y' | 'z'): Vec2 {
  // We look "into" the plane from the positive axis direction.
  // z-plane: looking down (-Z), see XY → (x, y)
  // x-plane: looking left (-X), see YZ → (y, -z) so z is up
  // y-plane: looking back (-Y), see XZ → (x, -z) so z is up
  switch (axis) {
    case 'z': return { x: v.x, y: v.y };
    case 'x': return { x: v.y, y: -v.z };
    case 'y': return { x: v.x, y: -v.z };
  }
}

/**
 * Intersect one triangle with the plane (axis = value).
 * Returns a [Vec2, Vec2] segment if there is a crossing, otherwise null.
 *
 * Algorithm: classify each vertex as above/on/below the plane.
 * For each directed edge (vi → vj), if vi is "on" the plane we contribute
 * its projection; if the edge straddles the plane we contribute the
 * interpolated intersection point.  This gives at most one contribution per
 * edge and guarantees at most 2 unique points per triangle.
 */
function triangleSegment(
  tri: Triangle,
  axis: 'x' | 'y' | 'z',
  value: number
): [Vec2, Vec2] | null {
  const verts = [tri.a, tri.b, tri.c] as const;
  const d = verts.map(v => coordOf(v, axis) - value) as [number, number, number];

  // Quick reject: all on same side
  const allPos = d[0] > EPS && d[1] > EPS && d[2] > EPS;
  const allNeg = d[0] < -EPS && d[1] < -EPS && d[2] < -EPS;
  if (allPos || allNeg) return null;

  const pts: Vec2[] = [];

  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3;
    const di = d[i], dj = d[j];
    const vi = verts[i], vj = verts[j];

    if (Math.abs(di) <= EPS) {
      // Vertex i is on the plane – add it once (only from edge i→j, not j→k)
      pts.push(projectToSection(vi, axis));
    } else if (di * dj < 0) {
      // Edge straddles the plane
      const t = di / (di - dj);
      pts.push(projectToSection(lerp3(vi, vj, t), axis));
    }
    // If dj ≈ 0 it will be added when we process edge j→k
  }

  // Deduplicate (floating-point identical points from coincident edges)
  const unique: Vec2[] = [];
  outer:
  for (const p of pts) {
    for (const q of unique) {
      if (Math.abs(q.x - p.x) < EPS * 100 && Math.abs(q.y - p.y) < EPS * 100) {
        continue outer;
      }
    }
    unique.push(p);
  }

  if (unique.length < 2) return null;
  return [unique[0], unique[1]];
}

// ─── Segment chaining ──────────────────────────────────────────────────────

const CHAIN_PREC = 6; // decimal places for endpoint keys

function ptKey(v: Vec2): string {
  return `${v.x.toFixed(CHAIN_PREC)},${v.y.toFixed(CHAIN_PREC)}`;
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
 */
export function computeSection(
  triangles: Triangle[],
  plane: CutPlane
): SectionResult {
  const { axis, value } = plane;
  const segments: [Vec2, Vec2][] = [];

  for (const tri of triangles) {
    const seg = triangleSegment(tri, axis, value);
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

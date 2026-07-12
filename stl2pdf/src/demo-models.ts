/**
 * Procedural demo STL models, generated entirely in-browser so users can try
 * the app without needing to find or upload an STL file of their own.
 *
 * Each generator returns a binary STL ArrayBuffer built directly from a list
 * of triangles (three 3D vertices each); normals are recomputed on write.
 */

type P3 = [number, number, number];
type Tri = [P3, P3, P3];

// ─── Binary STL writer ─────────────────────────────────────────────────────

/** Cross-product based face normal for a triangle, normalized to unit length. */
function faceNormal(a: P3, b: P3, c: P3): P3 {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  let nx = uy * vz - uz * vy;
  let ny = uz * vx - ux * vz;
  let nz = ux * vy - uy * vx;
  const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
  nx /= len; ny /= len; nz /= len;
  return [nx, ny, nz];
}

/** Serialize a list of triangles into a binary STL ArrayBuffer. */
function trianglesToBinarySTL(tris: Tri[]): ArrayBuffer {
  const count = tris.length;
  const buffer = new ArrayBuffer(84 + count * 50);
  const view = new DataView(buffer);
  view.setUint32(80, count, true);

  let off = 84;
  for (const [a, b, c] of tris) {
    const [nx, ny, nz] = faceNormal(a, b, c);
    view.setFloat32(off, nx, true); off += 4;
    view.setFloat32(off, ny, true); off += 4;
    view.setFloat32(off, nz, true); off += 4;
    view.setFloat32(off, a[0], true); off += 4;
    view.setFloat32(off, a[1], true); off += 4;
    view.setFloat32(off, a[2], true); off += 4;
    view.setFloat32(off, b[0], true); off += 4;
    view.setFloat32(off, b[1], true); off += 4;
    view.setFloat32(off, b[2], true); off += 4;
    view.setFloat32(off, c[0], true); off += 4;
    view.setFloat32(off, c[1], true); off += 4;
    view.setFloat32(off, c[2], true); off += 4;
    view.setUint16(off, 0, true); off += 2;
  }
  return buffer;
}

/** Push both triangles of a quad (p1,p2,p3,p4 in order around the perimeter). */
function addQuad(tris: Tri[], p1: P3, p2: P3, p3: P3, p4: P3): void {
  tris.push([p1, p2, p3]);
  tris.push([p1, p3, p4]);
}

// ─── Torus ──────────────────────────────────────────────────────────────────

function torusPoint(a: number, b: number, R: number, r: number): P3 {
  const rad = R + r * Math.cos(b);
  return [rad * Math.cos(a), rad * Math.sin(a), r * Math.sin(b)];
}

/** Torus: major radius R=22mm, minor radius r=8mm, 36 major x 18 minor segments. */
export function makeTorus(): ArrayBuffer {
  const R = 22, r = 8;
  const NS = 36, NT = 18;
  const tris: Tri[] = [];

  // Half-segment phase offsets so the natural symmetry planes (x=0, y=0, z=0
  // through the torus center) cut through the middle of triangles rather
  // than running exactly along a row of shared mesh vertices/edges — the
  // latter is a degenerate case for plane-slicing (many coincident edges).
  const aPhase = Math.PI / NS;
  const bPhase = Math.PI / NT;

  for (let i = 0; i < NS; i++) {
    const a0 = (i / NS) * 2 * Math.PI + aPhase;
    const a1 = ((i + 1) / NS) * 2 * Math.PI + aPhase;
    for (let j = 0; j < NT; j++) {
      const b0 = (j / NT) * 2 * Math.PI + bPhase;
      const b1 = ((j + 1) / NT) * 2 * Math.PI + bPhase;

      const p00 = torusPoint(a0, b0, R, r);
      const p10 = torusPoint(a1, b0, R, r);
      const p11 = torusPoint(a1, b1, R, r);
      const p01 = torusPoint(a0, b1, R, r);

      addQuad(tris, p00, p10, p11, p01);
    }
  }

  return trianglesToBinarySTL(tris);
}

// ─── Stepped shaft ──────────────────────────────────────────────────────────

// Half-segment angular phase offset applied consistently to every circular
// tessellation below. Without it, an N-gon approximation of a circle has
// vertex rows sitting exactly on axis-aligned planes (e.g. x=0/y=0 for
// N divisible by 4), which is a degenerate case for plane-slicing (many
// coincident edges lying exactly in the cutting plane). Offsetting by half
// a segment moves those planes through the middle of a triangle instead.
function anglePhase(N: number): number {
  return Math.PI / N;
}

/** Cylindrical wall from z0 to z1 with the given radius, N angular segments. */
function addCylinderWall(tris: Tri[], cx: number, cy: number, r: number, z0: number, z1: number, N: number): void {
  const phase = anglePhase(N);
  for (let i = 0; i < N; i++) {
    const t0 = (i / N) * 2 * Math.PI + phase;
    const t1 = ((i + 1) / N) * 2 * Math.PI + phase;
    const p0b: P3 = [cx + r * Math.cos(t0), cy + r * Math.sin(t0), z0];
    const p1b: P3 = [cx + r * Math.cos(t1), cy + r * Math.sin(t1), z0];
    const p0t: P3 = [cx + r * Math.cos(t0), cy + r * Math.sin(t0), z1];
    const p1t: P3 = [cx + r * Math.cos(t1), cy + r * Math.sin(t1), z1];
    addQuad(tris, p0b, p1b, p1t, p0t);
  }
}

/** Full disc cap at height z, N angular segments (triangle fan from center). */
function addDiskCap(tris: Tri[], cx: number, cy: number, r: number, z: number, N: number): void {
  const center: P3 = [cx, cy, z];
  const phase = anglePhase(N);
  for (let i = 0; i < N; i++) {
    const t0 = (i / N) * 2 * Math.PI + phase;
    const t1 = ((i + 1) / N) * 2 * Math.PI + phase;
    const p0: P3 = [cx + r * Math.cos(t0), cy + r * Math.sin(t0), z];
    const p1: P3 = [cx + r * Math.cos(t1), cy + r * Math.sin(t1), z];
    tris.push([center, p0, p1]);
  }
}

/** Flat annular ring (step shoulder) at height z, between rInner and rOuter. */
function addAnnularCap(tris: Tri[], cx: number, cy: number, rOuter: number, rInner: number, z: number, N: number): void {
  const phase = anglePhase(N);
  for (let i = 0; i < N; i++) {
    const t0 = (i / N) * 2 * Math.PI + phase;
    const t1 = ((i + 1) / N) * 2 * Math.PI + phase;
    const o0: P3 = [cx + rOuter * Math.cos(t0), cy + rOuter * Math.sin(t0), z];
    const o1: P3 = [cx + rOuter * Math.cos(t1), cy + rOuter * Math.sin(t1), z];
    const i0: P3 = [cx + rInner * Math.cos(t0), cy + rInner * Math.sin(t0), z];
    const i1: P3 = [cx + rInner * Math.cos(t1), cy + rInner * Math.sin(t1), z];
    addQuad(tris, o0, o1, i1, i0);
  }
}

/**
 * A solid shaft made of 3 stacked cylinders of decreasing radius:
 *   bottom  D40 (r=20)  z=0..12
 *   middle  D28 (r=14)  z=12..30
 *   top     D18 (r=9)   z=30..44
 * Step shoulders (annular caps) join each diameter change.
 */
export function makeSteppedShaft(): ArrayBuffer {
  const N = 32;
  const tris: Tri[] = [];

  const rBottom = 20, rMiddle = 14, rTop = 9;
  const zBottom0 = 0, zBottom1 = 12;
  const zMiddle1 = 30;
  const zTop1 = 44;

  // Bottom cylinder
  addCylinderWall(tris, 0, 0, rBottom, zBottom0, zBottom1, N);
  addDiskCap(tris, 0, 0, rBottom, zBottom0, N); // bottom face
  addAnnularCap(tris, 0, 0, rBottom, rMiddle, zBottom1, N); // step shoulder

  // Middle cylinder
  addCylinderWall(tris, 0, 0, rMiddle, zBottom1, zMiddle1, N);
  addAnnularCap(tris, 0, 0, rMiddle, rTop, zMiddle1, N); // step shoulder

  // Top cylinder
  addCylinderWall(tris, 0, 0, rTop, zMiddle1, zTop1, N);
  addDiskCap(tris, 0, 0, rTop, zTop1, N); // top face

  return trianglesToBinarySTL(tris);
}

// ─── Mounting plate ─────────────────────────────────────────────────────────

/**
 * An 80x60x10mm rectangular plate (centered at x=40, y=30) with a 12.5mm
 * radius cylindrical wall (no caps) punched through the middle. The cylinder
 * wall alone (combined with even-odd fill in the section viewer) produces a
 * plate-with-hole appearance without needing boolean CSG.
 */
export function makeMountingPlate(): ArrayBuffer {
  const W = 80, D = 60, H = 10;
  const tris: Tri[] = [];

  // 8 box corners
  const b000: P3 = [0, 0, 0], b100: P3 = [W, 0, 0], b110: P3 = [W, D, 0], b010: P3 = [0, D, 0];
  const b001: P3 = [0, 0, H], b101: P3 = [W, 0, H], b111: P3 = [W, D, H], b011: P3 = [0, D, H];

  addQuad(tris, b000, b100, b110, b010); // bottom (z=0)
  addQuad(tris, b001, b011, b111, b101); // top (z=H)
  addQuad(tris, b000, b010, b011, b001); // left (x=0)
  addQuad(tris, b100, b101, b111, b110); // right (x=W)
  addQuad(tris, b000, b001, b101, b100); // front (y=0)
  addQuad(tris, b010, b110, b111, b011); // back (y=D)

  // Cylindrical wall only (no caps) — creates a hole via even-odd fill
  addCylinderWall(tris, 40, 30, 12.5, 0, H, 32);

  return trianglesToBinarySTL(tris);
}

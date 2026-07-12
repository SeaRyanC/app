/** Raw 3-component vector */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Axis-aligned bounding box */
export interface BBox3 {
  min: Vec3;
  max: Vec3;
  center: Vec3;
  size: Vec3;
}

/**
 * Packed triangle mesh with precomputed spatial data.
 *
 * `verts` is a flat Float32Array with 9 values per triangle:
 *   [a.x, a.y, a.z,  b.x, b.y, b.z,  c.x, c.y, c.z, ...]
 *
 * The per-triangle min/max arrays enable O(1) bounding-interval rejection
 * when computing cross-sections, avoiding the full intersection test for
 * the large majority of triangles that don't straddle the cut plane.
 */
export interface MeshData {
  /** Flat vertex buffer – 9 floats per triangle */
  verts: Float32Array;
  /** Number of triangles */
  count: number;
  /** Per-triangle axis-aligned bounds for section-plane quick-reject */
  triMinX: Float32Array; triMaxX: Float32Array;
  triMinY: Float32Array; triMaxY: Float32Array;
  triMinZ: Float32Array; triMaxZ: Float32Array;
  /** Pre-computed overall bounding box */
  bbox: BBox3;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function makeBBox(
  minX: number, minY: number, minZ: number,
  maxX: number, maxY: number, maxZ: number
): BBox3 {
  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
    center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2, z: (minZ + maxZ) / 2 },
    size: { x: maxX - minX, y: maxY - minY, z: maxZ - minZ },
  };
}

/** Attach precomputed min/max arrays and bbox to a pre-filled verts Float32Array. */
function buildMeshData(verts: Float32Array, count: number): MeshData {
  const triMinX = new Float32Array(count), triMaxX = new Float32Array(count);
  const triMinY = new Float32Array(count), triMaxY = new Float32Array(count);
  const triMinZ = new Float32Array(count), triMaxZ = new Float32Array(count);
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (let i = 0; i < count; i++) {
    const b = i * 9;
    const ax = verts[b],   ay = verts[b+1], az = verts[b+2];
    const bx = verts[b+3], by = verts[b+4], bz = verts[b+5];
    const cx = verts[b+6], cy = verts[b+7], cz = verts[b+8];

    const miX = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx);
    const maX = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx);
    const miY = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy);
    const maY = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);
    const miZ = az < bz ? (az < cz ? az : cz) : (bz < cz ? bz : cz);
    const maZ = az > bz ? (az > cz ? az : cz) : (bz > cz ? bz : cz);

    triMinX[i] = miX; triMaxX[i] = maX;
    triMinY[i] = miY; triMaxY[i] = maY;
    triMinZ[i] = miZ; triMaxZ[i] = maZ;

    if (miX < minX) minX = miX; if (maX > maxX) maxX = maX;
    if (miY < minY) minY = miY; if (maY > maxY) maxY = maY;
    if (miZ < minZ) minZ = miZ; if (maZ > maxZ) maxZ = maZ;
  }

  const bbox = makeBBox(minX, minY, minZ, maxX, maxY, maxZ);
  return { verts, count, triMinX, triMaxX, triMinY, triMaxY, triMinZ, triMaxZ, bbox };
}

// ─── Binary STL ────────────────────────────────────────────────────────────

function parseBinarySTL(buffer: ArrayBuffer, triangleCount: number): MeshData {
  const view = new DataView(buffer);
  const verts = new Float32Array(triangleCount * 9);
  const triMinX = new Float32Array(triangleCount), triMaxX = new Float32Array(triangleCount);
  const triMinY = new Float32Array(triangleCount), triMaxY = new Float32Array(triangleCount);
  const triMinZ = new Float32Array(triangleCount), triMaxZ = new Float32Array(triangleCount);
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  let off = 84; // 80-byte header + 4-byte count
  for (let i = 0; i < triangleCount; i++) {
    off += 12; // skip normal
    const ax = view.getFloat32(off, true); off += 4;
    const ay = view.getFloat32(off, true); off += 4;
    const az = view.getFloat32(off, true); off += 4;
    const bx = view.getFloat32(off, true); off += 4;
    const by = view.getFloat32(off, true); off += 4;
    const bz = view.getFloat32(off, true); off += 4;
    const cx = view.getFloat32(off, true); off += 4;
    const cy = view.getFloat32(off, true); off += 4;
    const cz = view.getFloat32(off, true); off += 4;
    off += 2; // attribute byte count

    const b9 = i * 9;
    verts[b9]   = ax; verts[b9+1] = ay; verts[b9+2] = az;
    verts[b9+3] = bx; verts[b9+4] = by; verts[b9+5] = bz;
    verts[b9+6] = cx; verts[b9+7] = cy; verts[b9+8] = cz;

    const miX = ax < bx ? (ax < cx ? ax : cx) : (bx < cx ? bx : cx);
    const maX = ax > bx ? (ax > cx ? ax : cx) : (bx > cx ? bx : cx);
    const miY = ay < by ? (ay < cy ? ay : cy) : (by < cy ? by : cy);
    const maY = ay > by ? (ay > cy ? ay : cy) : (by > cy ? by : cy);
    const miZ = az < bz ? (az < cz ? az : cz) : (bz < cz ? bz : cz);
    const maZ = az > bz ? (az > cz ? az : cz) : (bz > cz ? bz : cz);

    triMinX[i] = miX; triMaxX[i] = maX;
    triMinY[i] = miY; triMaxY[i] = maY;
    triMinZ[i] = miZ; triMaxZ[i] = maZ;

    if (miX < minX) minX = miX; if (maX > maxX) maxX = maX;
    if (miY < minY) minY = miY; if (maY > maxY) maxY = maY;
    if (miZ < minZ) minZ = miZ; if (maZ > maxZ) maxZ = maZ;
  }

  const bbox = makeBBox(minX, minY, minZ, maxX, maxY, maxZ);
  return {
    verts, count: triangleCount,
    triMinX, triMaxX, triMinY, triMaxY, triMinZ, triMaxZ,
    bbox,
  };
}

// ─── ASCII STL ─────────────────────────────────────────────────────────────

function parseAsciiSTL(text: string): MeshData {
  // Collect raw floats first, then build MeshData
  const raw: number[] = [];
  const facetRe = /facet\s+normal[^\n]*\n\s*outer\s+loop\s*\n([\s\S]*?)endloop/gi;
  const vertRe = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/gi;

  let fm: RegExpExecArray | null;
  while ((fm = facetRe.exec(text)) !== null) {
    const inner = fm[1];
    vertRe.lastIndex = 0;
    const pts: number[][] = [];
    let vm: RegExpExecArray | null;
    while ((vm = vertRe.exec(inner)) !== null) {
      pts.push([parseFloat(vm[1]), parseFloat(vm[2]), parseFloat(vm[3])]);
    }
    if (pts.length === 3) {
      raw.push(
        pts[0][0], pts[0][1], pts[0][2],
        pts[1][0], pts[1][1], pts[1][2],
        pts[2][0], pts[2][1], pts[2][2]
      );
    }
  }

  const count = raw.length / 9;
  return buildMeshData(new Float32Array(raw), count);
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Parse a binary or ASCII STL file from an ArrayBuffer.
 * Returns a MeshData with a flat Float32Array vertex buffer and
 * precomputed per-triangle bounding intervals for fast section slicing.
 */
export function parseSTL(buffer: ArrayBuffer): MeshData {
  const view = new DataView(buffer);

  // Heuristic: try to detect binary STL
  // Binary STL: 80-byte header, then uint32 triangle count, then 50 bytes per triangle
  if (buffer.byteLength > 84) {
    const count = view.getUint32(80, true);
    const expected = 84 + count * 50;
    // Allow ±4 bytes slack for files with trailing data
    if (count > 0 && Math.abs(expected - buffer.byteLength) <= 4) {
      const result = parseBinarySTL(buffer, count);
      if (result.count > 0) return result;
    }
  }

  // Try ASCII
  const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (/solid\s/i.test(text.slice(0, 256))) {
    const result = parseAsciiSTL(text);
    if (result.count > 0) return result;
  }

  // Last resort: force binary
  const count = view.getUint32(80, true);
  return parseBinarySTL(buffer, count);
}

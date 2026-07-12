/** Raw 3-component vector */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** A single STL triangle (normal is ignored – we recompute as needed) */
export interface Triangle {
  a: Vec3;
  b: Vec3;
  c: Vec3;
}

// ─── Binary STL ────────────────────────────────────────────────────────────

function readF32(view: DataView, offset: number): number {
  return view.getFloat32(offset, true);
}

function readVec3(view: DataView, offset: number): Vec3 {
  return {
    x: readF32(view, offset),
    y: readF32(view, offset + 4),
    z: readF32(view, offset + 8),
  };
}

function parseBinarySTL(view: DataView, triangleCount: number): Triangle[] {
  const tris: Triangle[] = [];
  let off = 84; // 80-byte header + 4-byte count
  for (let i = 0; i < triangleCount; i++) {
    off += 12; // skip normal
    const a = readVec3(view, off); off += 12;
    const b = readVec3(view, off); off += 12;
    const c = readVec3(view, off); off += 12;
    off += 2;  // attribute byte count
    tris.push({ a, b, c });
  }
  return tris;
}

// ─── ASCII STL ─────────────────────────────────────────────────────────────

function parseAsciiSTL(text: string): Triangle[] {
  const tris: Triangle[] = [];
  // Match each facet block
  const facetRe = /facet\s+normal[^\n]*\n\s*outer\s+loop\s*\n([\s\S]*?)endloop/gi;
  const vertRe = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/gi;

  let fm: RegExpExecArray | null;
  while ((fm = facetRe.exec(text)) !== null) {
    const verts: Vec3[] = [];
    let vm: RegExpExecArray | null;
    const inner = fm[1];
    vertRe.lastIndex = 0;
    while ((vm = vertRe.exec(inner)) !== null) {
      verts.push({
        x: parseFloat(vm[1]),
        y: parseFloat(vm[2]),
        z: parseFloat(vm[3]),
      });
    }
    if (verts.length === 3) {
      tris.push({ a: verts[0], b: verts[1], c: verts[2] });
    }
  }
  return tris;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Parse a binary or ASCII STL file from an ArrayBuffer.
 * Returns an array of triangles (vertices in model coordinates).
 */
export function parseSTL(buffer: ArrayBuffer): Triangle[] {
  const view = new DataView(buffer);

  // Heuristic: try to detect binary STL
  // Binary STL: 80-byte header, then uint32 triangle count, then 50 bytes per triangle
  if (buffer.byteLength > 84) {
    const count = view.getUint32(80, true);
    const expected = 84 + count * 50;
    // Allow ±4 bytes slack for files with trailing data
    if (count > 0 && Math.abs(expected - buffer.byteLength) <= 4) {
      const result = parseBinarySTL(view, count);
      if (result.length > 0) return result;
    }
  }

  // Try ASCII
  const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  if (/solid\s/i.test(text.slice(0, 256))) {
    const result = parseAsciiSTL(text);
    if (result.length > 0) return result;
  }

  // Last resort: force binary
  const count = view.getUint32(80, true);
  return parseBinarySTL(view, count);
}

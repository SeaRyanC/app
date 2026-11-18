import type { Mesh } from './model.ts';

/** Encodes a mesh as binary STL (units are whatever the model uses, i.e. mm). */
export function meshToStl(mesh: Mesh): ArrayBuffer {
  const n = mesh.triangleCount;
  const buf = new ArrayBuffer(84 + n * 50);
  const view = new DataView(buf);
  const header = 'PVC parametric vase';
  for (let i = 0; i < header.length; i++) view.setUint8(i, header.charCodeAt(i));
  view.setUint32(80, n, true);
  const p = mesh.positions;
  let o = 84;
  for (let t = 0; t < n; t++) {
    const b = t * 9;
    const ux = p[b + 3]! - p[b]!, uy = p[b + 4]! - p[b + 1]!, uz = p[b + 5]! - p[b + 2]!;
    const vx = p[b + 6]! - p[b]!, vy = p[b + 7]! - p[b + 1]!, vz = p[b + 8]! - p[b + 2]!;
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len; ny /= len; nz /= len;
    view.setFloat32(o, nx, true); view.setFloat32(o + 4, ny, true); view.setFloat32(o + 8, nz, true);
    for (let i = 0; i < 9; i++) view.setFloat32(o + 12 + i * 4, p[b + i]!, true);
    o += 50;
  }
  return buf;
}

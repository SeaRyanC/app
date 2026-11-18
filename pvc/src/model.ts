export interface Params {
  zMin: number;
  zMax: number;
  zStep: number;
  thetaStepDeg: number;
}

export interface VaseFunctions {
  diameter: (z: number, theta: number) => number;
  thickness: (z: number, theta: number) => number;
}

export interface Mesh {
  /** Flat xyz triples, one per triangle corner (non-indexed). */
  positions: Float32Array;
  triangleCount: number;
}

export const MAX_TRIANGLES = 2_000_000;

export const DEFAULT_CODE = `// z is the height in mm, theta is the angle in degrees (0..360).
// diameter() is the inner diameter at the wall's midpoint line;
// thickness() extends the wall outward from there.

function bulge(z) {
  return 1 + 0.5 * Math.sin(z / 30 * Math.PI);
}

function ripple(z, theta) {
  return 4 * Math.sin(5 * radians(theta) + z / 8);
}

function radians(deg) {
  return deg * Math.PI / 180;
}

function diameter(z, theta) {
  return 40 * bulge(z) + ripple(z, theta);
}

function thickness(z, theta) {
  return 2 + 0.5 * Math.cos(3 * radians(theta));
}
`;

const MATH_PRELUDE = '"use strict";\nconst {' +
  Object.getOwnPropertyNames(Math).filter(k => k !== 'constructor' && /^[A-Za-z_$][\w$]*$/.test(k)).join(',') +
  '} = Math;\n';

export class UserCodeError extends Error {}

function describe(e: unknown): string {
  return e instanceof Error ? `${e.name}: ${e.message}` : String(e);
}

/** Compiles user code that defines `diameter` and `thickness` functions. */
export function compileUserCode(code: string): VaseFunctions {
  let result: { diameter?: unknown; thickness?: unknown };
  try {
    const factory = new Function(
      MATH_PRELUDE + code + '\n;return { diameter: typeof diameter === "undefined" ? undefined : diameter, thickness: typeof thickness === "undefined" ? undefined : thickness };'
    );
    result = factory() as typeof result;
  } catch (e) {
    throw new UserCodeError(describe(e));
  }
  if (typeof result.diameter !== 'function') throw new UserCodeError('Your code must define a function named diameter(z, theta).');
  if (typeof result.thickness !== 'function') throw new UserCodeError('Your code must define a function named thickness(z, theta).');
  return { diameter: result.diameter as VaseFunctions['diameter'], thickness: result.thickness as VaseFunctions['thickness'] };
}

export function validateParams(p: Params): string | undefined {
  const all = [p.zMin, p.zMax, p.zStep, p.thetaStepDeg];
  if (!all.every(Number.isFinite)) return 'All parameters must be numbers.';
  if (p.zMax <= p.zMin) return 'Z max must be greater than Z min.';
  if (p.zStep <= 0) return 'Z step must be positive.';
  if (p.thetaStepDeg <= 0 || p.thetaStepDeg > 180) return 'Theta step must be between 0 and 180 degrees.';
  return undefined;
}

export function layerHeights(p: Params): number[] {
  const n = Math.max(1, Math.ceil((p.zMax - p.zMin) / p.zStep - 1e-9));
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(p.zMin + i * p.zStep);
  out.push(p.zMax);
  return out;
}

export function thetaCount(p: Params): number {
  return Math.max(3, Math.ceil(360 / p.thetaStepDeg - 1e-9));
}

/**
 * Builds a closed solid: inner wall, outer wall (inner radius + thickness),
 * and rings closing the top and bottom (an open tube).
 */
export function buildMesh(fns: VaseFunctions, p: Params): Mesh {
  const err = validateParams(p);
  if (err) throw new UserCodeError(err);

  const zs = layerHeights(p);
  const nT = thetaCount(p);
  const nZ = zs.length;
  const triangleCount = (nZ - 1) * nT * 4 + nT * 4;
  if (triangleCount > MAX_TRIANGLES) {
    throw new UserCodeError(`Mesh would have ${triangleCount.toLocaleString()} triangles (limit ${MAX_TRIANGLES.toLocaleString()}). Increase the z step or theta step.`);
  }

  const inner = new Float32Array(nZ * nT * 3);
  const outer = new Float32Array(nZ * nT * 3);
  for (let k = 0; k < nZ; k++) {
    const z = zs[k] as number;
    for (let i = 0; i < nT; i++) {
      const theta = (i / nT) * 360;
      const ctx = `at z=${z}, theta=${theta.toFixed(4)}`;
      let d: unknown, t: unknown;
      try {
        d = fns.diameter(z, theta);
        t = fns.thickness(z, theta);
      } catch (e) {
        throw new UserCodeError(`${describe(e)} (${ctx})`);
      }
      if (typeof d !== 'number' || !Number.isFinite(d)) throw new UserCodeError(`diameter() returned ${String(d)} ${ctx}; expected a finite number.`);
      if (typeof t !== 'number' || !Number.isFinite(t)) throw new UserCodeError(`thickness() returned ${String(t)} ${ctx}; expected a finite number.`);
      if (d <= 0) throw new UserCodeError(`diameter() returned ${d} ${ctx}; it must be positive.`);
      if (t <= 0) throw new UserCodeError(`thickness() returned ${t} ${ctx}; it must be positive.`);
      const r0 = d / 2;
      const r1 = r0 + t;
      const rad = (theta * Math.PI) / 180;
      const c = Math.cos(rad), s = Math.sin(rad);
      const o = (k * nT + i) * 3;
      inner.set([r0 * c, r0 * s, z], o);
      outer.set([r1 * c, r1 * s, z], o);
    }
  }

  const positions = new Float32Array(triangleCount * 9);
  let w = 0;
  const push = (src: Float32Array, idx: number) => {
    positions[w++] = src[idx * 3] as number;
    positions[w++] = src[idx * 3 + 1] as number;
    positions[w++] = src[idx * 3 + 2] as number;
  };
  const at = (k: number, i: number) => k * nT + (i % nT);

  // Counter-clockwise winding seen from outside the solid.
  for (let k = 0; k < nZ - 1; k++) {
    for (let i = 0; i < nT; i++) {
      const a = at(k, i), b = at(k, i + 1), c = at(k + 1, i), d = at(k + 1, i + 1);
      // outer wall faces outward
      push(outer, a); push(outer, b); push(outer, d);
      push(outer, a); push(outer, d); push(outer, c);
      // inner wall faces toward the axis
      push(inner, a); push(inner, d); push(inner, b);
      push(inner, a); push(inner, c); push(inner, d);
    }
  }
  const top = nZ - 1;
  for (let i = 0; i < nT; i++) {
    const a = at(top, i), b = at(top, i + 1);
    push(inner, a); push(outer, a); push(outer, b);
    push(inner, a); push(outer, b); push(inner, b);
    const a0 = at(0, i), b0 = at(0, i + 1);
    push(inner, a0); push(outer, b0); push(outer, a0);
    push(inner, a0); push(inner, b0); push(outer, b0);
  }

  return { positions, triangleCount };
}

export function meshBounds(m: Mesh): { min: [number, number, number]; max: [number, number, number] } {
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < m.positions.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      const v = m.positions[i + j] as number;
      if (v < min[j]!) min[j] = v;
      if (v > max[j]!) max[j] = v;
    }
  }
  return { min, max };
}


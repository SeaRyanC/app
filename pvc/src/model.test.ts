import { buildMesh, compileUserCode, DEFAULT_CODE, UserCodeError, type Params, type Mesh } from './model.ts';
import { meshToStl } from './stl.ts';

const params: Params = { zMin: 0, zMax: 10, zStep: 2, thetaStepDeg: 30 };

/** Counts directed edges; a closed, consistently oriented mesh pairs every edge with its reverse. */
function edgeBalance(mesh: Mesh): number {
  const key = (i: number) => Array.from(mesh.positions.slice(i * 3, i * 3 + 3), v => v.toFixed(3)).join(',');
  const counts = new Map<string, number>();
  const bump = (a: string, b: string, d: number) => {
    const k = a < b ? `${a}|${b}` : `${b}|${a}`;
    counts.set(k, (counts.get(k) ?? 0) + (a < b ? d : -d));
  };
  for (let t = 0; t < mesh.triangleCount; t++) {
    const v = [key(t * 3), key(t * 3 + 1), key(t * 3 + 2)] as [string, string, string];
    bump(v[0], v[1], 1); bump(v[1], v[2], 1); bump(v[2], v[0], 1);
  }
  return [...counts.values()].filter(c => c !== 0).length;
}

describe('buildMesh', () => {
  it('produces a watertight, consistently oriented solid', () => {
    const mesh = buildMesh(compileUserCode(DEFAULT_CODE), params);
    expect(edgeBalance(mesh)).toBe(0);
  });

  it('exports an STL whose size matches its triangle count', () => {
    const mesh = buildMesh(compileUserCode(DEFAULT_CODE), params);
    expect(meshToStl(mesh).byteLength).toBe(84 + mesh.triangleCount * 50);
  });
});

describe('user code errors', () => {
  it('reports syntax errors', () => {
    expect(() => compileUserCode('function diameter( {')).toThrow(UserCodeError);
  });

  it('reports missing functions', () => {
    expect(() => compileUserCode('function diameter() { return 1; }')).toThrow(/thickness/);
  });

  it('reports runtime throws with position', () => {
    const fns = compileUserCode('function diameter() { throw new Error("boom"); }\nfunction thickness() { return 1; }');
    expect(() => buildMesh(fns, params)).toThrow(/boom.*z=0/);
  });

  it('rejects non-finite and non-positive results', () => {
    expect(() => buildMesh(compileUserCode('const diameter = () => NaN; const thickness = () => 1;'), params)).toThrow(/diameter/);
    expect(() => buildMesh(compileUserCode('const diameter = () => 10; const thickness = () => 0;'), params)).toThrow(/thickness/);
  });
});

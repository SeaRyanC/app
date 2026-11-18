"use strict";
(() => {
  // src/model.ts
  var MAX_TRIANGLES = 2e6;
  var MATH_PRELUDE = '"use strict";\nconst {' + Object.getOwnPropertyNames(Math).filter((k) => k !== "constructor" && /^[A-Za-z_$][\w$]*$/.test(k)).join(",") + "} = Math;\n";
  var UserCodeError = class extends Error {
  };
  function describe(e) {
    return e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  }
  function compileUserCode(code) {
    let result;
    try {
      const factory = new Function(
        MATH_PRELUDE + code + '\n;return { diameter: typeof diameter === "undefined" ? undefined : diameter, thickness: typeof thickness === "undefined" ? undefined : thickness };'
      );
      result = factory();
    } catch (e) {
      throw new UserCodeError(describe(e));
    }
    if (typeof result.diameter !== "function") throw new UserCodeError("Your code must define a function named diameter(z, theta).");
    if (typeof result.thickness !== "function") throw new UserCodeError("Your code must define a function named thickness(z, theta).");
    return { diameter: result.diameter, thickness: result.thickness };
  }
  function validateParams(p) {
    const all = [p.zMin, p.zMax, p.zStep, p.thetaStepDeg];
    if (!all.every(Number.isFinite)) return "All parameters must be numbers.";
    if (p.zMax <= p.zMin) return "Z max must be greater than Z min.";
    if (p.zStep <= 0) return "Z step must be positive.";
    if (p.thetaStepDeg <= 0 || p.thetaStepDeg > 180) return "Theta step must be between 0 and 180 degrees.";
    return void 0;
  }
  function layerHeights(p) {
    const n = Math.max(1, Math.ceil((p.zMax - p.zMin) / p.zStep - 1e-9));
    const out = [];
    for (let i = 0; i < n; i++) out.push(p.zMin + i * p.zStep);
    out.push(p.zMax);
    return out;
  }
  function thetaCount(p) {
    return Math.max(3, Math.ceil(360 / p.thetaStepDeg - 1e-9));
  }
  function buildMesh(fns, p) {
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
      const z = zs[k];
      for (let i = 0; i < nT; i++) {
        const theta = i / nT * 360;
        const ctx = `at z=${z}, theta=${theta.toFixed(4)}`;
        let d, t;
        try {
          d = fns.diameter(z, theta);
          t = fns.thickness(z, theta);
        } catch (e) {
          throw new UserCodeError(`${describe(e)} (${ctx})`);
        }
        if (typeof d !== "number" || !Number.isFinite(d)) throw new UserCodeError(`diameter() returned ${String(d)} ${ctx}; expected a finite number.`);
        if (typeof t !== "number" || !Number.isFinite(t)) throw new UserCodeError(`thickness() returned ${String(t)} ${ctx}; expected a finite number.`);
        if (d <= 0) throw new UserCodeError(`diameter() returned ${d} ${ctx}; it must be positive.`);
        if (t <= 0) throw new UserCodeError(`thickness() returned ${t} ${ctx}; it must be positive.`);
        const r0 = d / 2;
        const r1 = r0 + t;
        const rad = theta * Math.PI / 180;
        const c = Math.cos(rad), s = Math.sin(rad);
        const o = (k * nT + i) * 3;
        inner.set([r0 * c, r0 * s, z], o);
        outer.set([r1 * c, r1 * s, z], o);
      }
    }
    const positions = new Float32Array(triangleCount * 9);
    let w = 0;
    const push = (src, idx) => {
      positions[w++] = src[idx * 3];
      positions[w++] = src[idx * 3 + 1];
      positions[w++] = src[idx * 3 + 2];
    };
    const at = (k, i) => k * nT + i % nT;
    for (let k = 0; k < nZ - 1; k++) {
      for (let i = 0; i < nT; i++) {
        const a = at(k, i), b = at(k, i + 1), c = at(k + 1, i), d = at(k + 1, i + 1);
        push(outer, a);
        push(outer, b);
        push(outer, d);
        push(outer, a);
        push(outer, d);
        push(outer, c);
        push(inner, a);
        push(inner, d);
        push(inner, b);
        push(inner, a);
        push(inner, c);
        push(inner, d);
      }
    }
    const top = nZ - 1;
    for (let i = 0; i < nT; i++) {
      const a = at(top, i), b = at(top, i + 1);
      push(inner, a);
      push(outer, a);
      push(outer, b);
      push(inner, a);
      push(outer, b);
      push(inner, b);
      const a0 = at(0, i), b0 = at(0, i + 1);
      push(inner, a0);
      push(outer, b0);
      push(outer, a0);
      push(inner, a0);
      push(inner, b0);
      push(outer, b0);
    }
    return { positions, triangleCount };
  }

  // src/worker.ts
  self.onmessage = (e) => {
    let res;
    try {
      res = { mesh: buildMesh(compileUserCode(e.data.code), e.data.params) };
    } catch (err) {
      res = { error: err instanceof UserCodeError ? err.message : `Unexpected error: ${String(err)}` };
    }
    if ("mesh" in res) self.postMessage(res, [res.mesh.positions.buffer]);
    else self.postMessage(res);
  };
})();
//# sourceMappingURL=worker.js.map

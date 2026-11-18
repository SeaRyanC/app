import { meshBounds, type Mesh } from './model.ts';

const VERT = `#version 300 es
in vec3 aPos;
uniform mat4 uMvp;
uniform mat4 uView;
out vec3 vViewPos;
out float vZ;
void main() {
  vec4 v = uView * vec4(aPos, 1.0);
  vViewPos = v.xyz;
  vZ = aPos.z;
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec3 vViewPos;
in float vZ;
uniform vec2 uZRange;
out vec4 outColor;
void main() {
  vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
  float key = max(dot(n, normalize(vec3(0.4, 0.6, 1.0))), 0.0);
  float fill = max(dot(n, normalize(vec3(-0.6, -0.2, 0.5))), 0.0);
  float t = clamp((vZ - uZRange.x) / max(uZRange.y - uZRange.x, 1e-6), 0.0, 1.0);
  vec3 base = mix(vec3(0.25, 0.55, 0.85), vec3(0.9, 0.55, 0.35), t);
  vec3 c = base * (0.25 + 0.7 * key + 0.25 * fill);
  outColor = vec4(c, 1.0);
}`;

type Mat4 = Float32Array;

function perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect; m[5] = f; m[10] = (far + near) / (near - far); m[11] = -1; m[14] = (2 * far * near) / (near - far);
  return m;
}

function lookAt(eye: number[], target: number[], up: number[]): Mat4 {
  const [ex, ey, ez] = eye as [number, number, number];
  let zx = ex - target[0]!, zy = ey - target[1]!, zz = ez - target[2]!;
  let l = Math.hypot(zx, zy, zz); zx /= l; zy /= l; zz /= l;
  let xx = up[1]! * zz - up[2]! * zy, xy = up[2]! * zx - up[0]! * zz, xz = up[0]! * zy - up[1]! * zx;
  l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  const m = new Float32Array(16);
  m[0] = xx; m[1] = yx; m[2] = zx;
  m[4] = xy; m[5] = yy; m[6] = zy;
  m[8] = xz; m[9] = yz; m[10] = zz;
  m[12] = -(xx * ex + xy * ey + xz * ez);
  m[13] = -(yx * ex + yy * ey + yz * ez);
  m[14] = -(zx * ex + zy * ey + zz * ez);
  m[15] = 1;
  return m;
}

function mul(a: Mat4, b: Mat4): Mat4 {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r]! * b[c * 4 + k]!;
    o[c * 4 + r] = s;
  }
  return o;
}

/** WebGL2 mesh viewer with orbit (left drag), pan (right/shift drag) and zoom (wheel / pinch). */
export class Viewer {
  private gl: WebGL2RenderingContext;
  private prog: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private buf: WebGLBuffer;
  private count = 0;
  private zRange: [number, number] = [0, 1];
  private yaw = -0.8;
  private pitch = 0.5;
  private dist = 200;
  private target = [0, 0, 0];
  private raf = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private ro: ResizeObserver;

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2', { antialias: true });
    if (!gl) throw new Error('WebGL2 is not available in this browser.');
    this.gl = gl;
    this.prog = this.makeProgram();
    this.vao = gl.createVertexArray()!;
    this.buf = gl.createBuffer()!;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    const loc = gl.getAttribLocation(this.prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
    gl.enable(gl.DEPTH_TEST);

    canvas.addEventListener('pointerdown', this.onDown);
    canvas.addEventListener('pointermove', this.onMove);
    canvas.addEventListener('pointerup', this.onUp);
    canvas.addEventListener('pointercancel', this.onUp);
    canvas.addEventListener('wheel', this.onWheel, { passive: false });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    this.ro = new ResizeObserver(() => this.draw());
    this.ro.observe(canvas);
  }

  private makeProgram(): WebGLProgram {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader error');
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link error');
    return p;
  }

  setMesh(mesh: Mesh, fit: boolean) {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
    this.count = mesh.triangleCount * 3;
    const { min, max } = meshBounds(mesh);
    this.zRange = [min[2], max[2]];
    if (fit) {
      this.target = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
      const size = Math.hypot(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
      this.dist = Math.max(size, 1) * 1.1;
    }
    this.draw();
  }

  private onDown = (e: PointerEvent) => {
    this.canvas.setPointerCapture(e.pointerId);
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };
  private onUp = (e: PointerEvent) => { this.pointers.delete(e.pointerId); };
  private onMove = (e: PointerEvent) => {
    const prev = this.pointers.get(e.pointerId);
    if (!prev) return;
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    if (this.pointers.size === 2) {
      const other = [...this.pointers.entries()].find(([id]) => id !== e.pointerId)![1];
      const before = Math.hypot(prev.x - other.x, prev.y - other.y);
      const after = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      if (after > 0) this.dist *= before / after;
    } else if (e.buttons & 2 || e.buttons & 4 || e.shiftKey) {
      const k = this.dist * 0.0015;
      const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
      // camera right = (-sy, cy, 0) in the horizontal plane; camera up ~ z
      this.target = [
        this.target[0]! + (sy * dx) * k,
        this.target[1]! + (-cy * dx) * k,
        this.target[2]! + dy * k
      ];
    } else {
      this.yaw -= dx * 0.01;
      this.pitch = Math.max(-1.55, Math.min(1.55, this.pitch + dy * 0.01));
    }
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    this.draw();
  };
  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.dist *= Math.exp(e.deltaY * 0.001);
    this.draw();
  };

  draw() {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => this.render());
  }

  private render() {
    const gl = this.gl;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0.09, 0.1, 0.12, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!this.count) return;

    const cp = Math.cos(this.pitch);
    const eye = [
      this.target[0]! + this.dist * cp * Math.cos(this.yaw),
      this.target[1]! + this.dist * cp * Math.sin(this.yaw),
      this.target[2]! + this.dist * Math.sin(this.pitch)
    ];
    const view = lookAt(eye, this.target, [0, 0, 1]);
    const proj = perspective(Math.PI / 4, w / h, this.dist / 100, this.dist * 20);
    gl.useProgram(this.prog);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.prog, 'uMvp'), false, mul(proj, view));
    gl.uniformMatrix4fv(gl.getUniformLocation(this.prog, 'uView'), false, view);
    gl.uniform2f(gl.getUniformLocation(this.prog, 'uZRange'), this.zRange[0], this.zRange[1]);
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLES, 0, this.count);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
  }
}

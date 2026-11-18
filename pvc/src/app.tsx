import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { buildMesh, compileUserCode, DEFAULT_CODE, layerHeights, thetaCount, UserCodeError, validateParams, type Mesh, type Params } from './model.ts';
import { meshToStl } from './stl.ts';
import { Viewer } from './viewer.ts';

const STORAGE_KEY = 'pvc:state:v1';

interface State {
  code: string;
  zMin: string;
  zMax: string;
  zStep: string;
  thetaStep: string;
}

const DEFAULTS: State = { code: DEFAULT_CODE, zMin: '0', zMax: '100', zStep: '1', thetaStep: '5' };

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<State>;
      const pick = (k: keyof State) => (typeof p[k] === 'string' ? (p[k] as string) : DEFAULTS[k]);
      return { code: pick('code'), zMin: pick('zMin'), zMax: pick('zMax'), zStep: pick('zStep'), thetaStep: pick('thetaStep') };
    }
  } catch { /* corrupt or unavailable storage: fall back to defaults */ }
  return DEFAULTS;
}

function toParams(s: State): Params {
  return { zMin: parseFloat(s.zMin), zMax: parseFloat(s.zMax), zStep: parseFloat(s.zStep), thetaStepDeg: parseFloat(s.thetaStep) };
}

export function App() {
  const [state, setState] = useState<State>(loadState);
  const [error, setError] = useState<string | undefined>();
  const [info, setInfo] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const [glError, setGlError] = useState<string | undefined>();

  useEffect(() => {
    try {
      viewerRef.current = new Viewer(canvasRef.current!);
    } catch (e) {
      setGlError(e instanceof Error ? e.message : String(e));
    }
    return () => viewerRef.current?.dispose();
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage full or disabled */ }
    const handle = setTimeout(() => {
      try {
        const params = toParams(state);
        const paramError = validateParams(params);
        if (paramError) throw new UserCodeError(paramError);
        const mesh = buildMesh(compileUserCode(state.code), params);
        const first = meshRef.current === null;
        meshRef.current = mesh;
        viewerRef.current?.setMesh(mesh, first);
        setError(undefined);
        setInfo(`${layerHeights(params).length} layers × ${thetaCount(params)} angles · ${mesh.triangleCount.toLocaleString()} triangles`);
      } catch (e) {
        setError(e instanceof UserCodeError ? e.message : `Unexpected error: ${String(e)}`);
      }
    }, 300);
    return () => clearTimeout(handle);
  }, [state]);

  const set = (k: keyof State) => (e: Event) => {
    const v = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    setState(s => ({ ...s, [k]: v }));
  };

  const exportStl = () => {
    if (!meshRef.current) return;
    const url = URL.createObjectURL(new Blob([meshToStl(meshRef.current)], { type: 'model/stl' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vase.stl';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const field = (k: keyof State, label: string, step: string) => (
    <label class="field">
      <span>{label}</span>
      <input type="number" step={step} value={state[k]} onInput={set(k)} />
    </label>
  );

  const stale = useMemo(() => error !== undefined && meshRef.current !== null, [error]);

  return (
    <div class="layout">
      <header class="topbar">
        <h1>PVC <small>Parametric Vase Creator</small></h1>
        <button class="primary" onClick={exportStl} disabled={!meshRef.current}>Export STL</button>
      </header>
      <main class="main">
        <section class="panel">
          <div class="fields">
            {field('zMin', 'Z min (mm)', 'any')}
            {field('zMax', 'Z max (mm)', 'any')}
            {field('zStep', 'Z step (mm)', 'any')}
            {field('thetaStep', 'Theta step (°)', 'any')}
          </div>
          <textarea
            class="code"
            spellcheck={false}
            value={state.code}
            onInput={set('code')}
            aria-label="Vase function JavaScript"
          />
          <div class="actions">
            <button onClick={() => setState(DEFAULTS)}>Reset to example</button>
            <span class="info">{info}</span>
          </div>
          {error && <pre class="error" role="alert">{error}{stale ? '\n(Preview shows the last valid shape.)' : ''}</pre>}
        </section>
        <section class="preview">
          <canvas ref={canvasRef} />
          {glError && <div class="gl-error">{glError}</div>}
          <div class="hint">Drag to orbit · right-drag or Shift-drag to pan · scroll to zoom</div>
        </section>
      </main>
      <footer class="app-footer">
        <span>A vibe-coded micro-app via <a href="https://searyanc.dev" target="_blank" rel="noopener noreferrer">SeaRyanC</a></span>
        <a class="github-link" href="https://github.com/SeaRyanC/app/tree/main/pvc" target="_blank" rel="noopener noreferrer" title="View source on GitHub" aria-label="View source on GitHub">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
        </a>
        <span class="version">v{__VERSION__}+{__COMMIT__}</span>
      </footer>
    </div>
  );
}

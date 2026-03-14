import { useState, useRef, useEffect, useCallback } from 'preact/hooks';
import { generatePDF, type PaperSize } from './pdf-generator';

const VERSION = '1.0.0';
const COMMIT_HASH = 'dev';

/** Resolution of the exported crop image (px). 600 px ≈ 300 DPI at 2″. */
const EXPORT_SIZE = 600;
/** Display size of the crop canvas in CSS pixels. */
const CANVAS_CSS = 360;

/**
 * Render the US-passport face guide inside the crop square.
 * Guide proportions follow US Department of State specifications:
 *   – Head (chin to top of hair): 1″–1⅜″ in a 2″ frame → 50 %–69 %
 *   – Eyes roughly at 56 %–69 % from the bottom of the frame
 */
function drawFaceGuide(ctx: CanvasRenderingContext2D, size: number): void {
  const cx = size / 2;

  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);

  // Head oval – centred vertically at ~47 % from top (slightly above centre)
  const headCY = size * 0.47;
  const headRX = size * 0.22; // horizontal radius
  const headRY = size * 0.30; // vertical radius (covers ~60 % of frame height)
  ctx.beginPath();
  ctx.ellipse(cx, headCY, headRX, headRY, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Chin line – roughly at 72 % from top
  const chinY = size * 0.77;
  ctx.beginPath();
  ctx.moveTo(cx - headRX * 0.6, chinY);
  ctx.lineTo(cx + headRX * 0.6, chinY);
  ctx.stroke();

  // Eye line – roughly at 44 % from top (i.e. 56 % from bottom)
  const eyeY = size * 0.40;
  ctx.beginPath();
  ctx.moveTo(cx - headRX * 0.75, eyeY);
  ctx.lineTo(cx + headRX * 0.75, eyeY);
  ctx.stroke();

  ctx.restore();
}

/**
 * Render the crop overlay (darkened border + guide) and the image itself.
 */
function paint(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  scale: number,
  offsetX: number,
  offsetY: number,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Draw the image
  const iw = img.naturalWidth * scale;
  const ih = img.naturalHeight * scale;
  ctx.drawImage(img, offsetX, offsetY, iw, ih);

  // Draw the face guide overlay
  drawFaceGuide(ctx, w);

  // Thin border around the crop area
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.strokeRect(0, 0, w, h);
}

/**
 * Export the currently-cropped region to a PNG data-URL at print resolution.
 */
function exportCrop(
  img: HTMLImageElement,
  scale: number,
  offsetX: number,
  offsetY: number,
  canvasCss: number,
): string {
  const offscreen = document.createElement('canvas');
  offscreen.width = EXPORT_SIZE;
  offscreen.height = EXPORT_SIZE;
  const ctx = offscreen.getContext('2d')!;

  // The display canvas is `canvasCss` CSS px wide but backed by a
  // CANVAS_CSS-resolution bitmap.  The export canvas is EXPORT_SIZE px.
  const ratio = EXPORT_SIZE / canvasCss;
  const iw = img.naturalWidth * scale * ratio;
  const ih = img.naturalHeight * scale * ratio;
  ctx.drawImage(img, offsetX * ratio, offsetY * ratio, iw, ih);

  return offscreen.toDataURL('image/png');
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function ImageInput({ onImage }: { onImage: (img: HTMLImageElement) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => onImage(img);
      img.src = url;
    },
    [onImage],
  );

  // Paste handler
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) loadFile(file);
          e.preventDefault();
          return;
        }
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
  }, [loadFile]);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) loadFile(file);
  };

  const onDragOver = (e: DragEvent) => e.preventDefault();

  const onChange = () => {
    const file = inputRef.current?.files?.[0];
    if (file) loadFile(file);
  };

  return (
    <div class="drop-zone" onDrop={onDrop} onDragOver={onDragOver}>
      <p>Drag &amp; drop a photo here, paste from clipboard, or</p>
      <button type="button" onClick={() => inputRef.current?.click()}>
        Choose file
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </div>
  );
}

function CropEditor({
  img,
  onExport,
}: {
  img: HTMLImageElement;
  onExport: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State: scale + offset (in canvas-bitmap-pixel space)
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Fit image into the canvas on first load
  useEffect(() => {
    const fitScale =
      CANVAS_CSS / Math.min(img.naturalWidth, img.naturalHeight);
    setScale(fitScale);
    // Centre the image
    setOffset({
      x: (CANVAS_CSS - img.naturalWidth * fitScale) / 2,
      y: (CANVAS_CSS - img.naturalHeight * fitScale) / 2,
    });
  }, [img]);

  // Repaint whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paint(canvas, img, scale, offset.x, offset.y);
  }, [img, scale, offset]);

  // --- Mouse / touch handlers ---
  const onPointerDown = (e: PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
    setScale((s) => s * factor);

    // Zoom towards the centre of the canvas
    const cx = CANVAS_CSS / 2;
    const cy = CANVAS_CSS / 2;
    setOffset((prev) => ({
      x: cx + (prev.x - cx) * factor,
      y: cy + (prev.y - cy) * factor,
    }));
  };

  const handleExport = () => {
    const dataUrl = exportCrop(img, scale, offset.x, offset.y, CANVAS_CSS);
    onExport(dataUrl);
  };

  // Immediately provide export helper to parent on every render
  // (the parent can call handleExport via a ref if desired)

  return (
    <div class="crop-section">
      <div class="crop-wrapper">
        <canvas
          ref={canvasRef}
          width={CANVAS_CSS}
          height={CANVAS_CSS}
          class="crop-canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onWheel={onWheel}
        />
        <p class="hint">Drag to pan · scroll to zoom</p>
      </div>
      <div class="export-controls">
        <button type="button" class="primary" onClick={handleExport}>
          Use this crop ✓
        </button>
      </div>
    </div>
  );
}

function PreviewAndGenerate({
  croppedUrl,
  onReset,
}: {
  croppedUrl: string;
  onReset: () => void;
}) {
  const [paperSize, setPaperSize] = useState<PaperSize>('4x6');
  const [busy, setBusy] = useState(false);

  const handleGenerate = async () => {
    setBusy(true);
    try {
      const blob = await generatePDF(croppedUrl, paperSize);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Something went wrong generating the PDF. See console for details.');
    } finally {
      setBusy(false);
    }
  };

  const copyLabel: Record<PaperSize, string> = {
    '3x5': '2 photos',
    '4x6': '2 photos',
    '8x10': '4 photos',
  };

  return (
    <div class="preview-section">
      <h2>Cropped Preview</h2>
      <img src={croppedUrl} alt="Cropped passport photo" class="preview-img" />

      <div class="paper-picker">
        <label>Paper size</label>
        <div class="paper-options">
          {(['3x5', '4x6', '8x10'] as PaperSize[]).map((sz) => (
            <button
              key={sz}
              type="button"
              class={sz === paperSize ? 'selected' : ''}
              onClick={() => setPaperSize(sz)}
            >
              {sz}″ — {copyLabel[sz]}
            </button>
          ))}
        </div>
      </div>

      <div class="action-row">
        <button
          type="button"
          class="primary"
          disabled={busy}
          onClick={handleGenerate}
        >
          {busy ? 'Generating…' : 'Generate PDF'}
        </button>
        <button type="button" onClick={onReset}>
          Start over
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer class="footer">
      <span>A vibe-coded micro-app via </span>
      <a
        href="https://searyanc.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        SeaRyanC
      </a>
      <a
        href="https://github.com/SeaRyanC/app/tree/main/ppg"
        class="github-link"
        target="_blank"
        rel="noopener noreferrer"
        title="View source on GitHub"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </a>
      <span class="version">
        v{VERSION}+{COMMIT_HASH}
      </span>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// App root
// ---------------------------------------------------------------------------

export function App() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);

  const reset = () => {
    setImg(null);
    setCroppedUrl(null);
  };

  return (
    <div class="app-container">
      <h1>📷 Passport Photo Generator</h1>
      <p class="subtitle">
        Create print-ready 2″×2″ US passport photos on standard photo paper
      </p>

      {!img && <ImageInput onImage={setImg} />}

      {img && !croppedUrl && (
        <CropEditor img={img} onExport={setCroppedUrl} />
      )}

      {croppedUrl && (
        <PreviewAndGenerate croppedUrl={croppedUrl} onReset={reset} />
      )}

      <Footer />
    </div>
  );
}

import { render } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { analyzeRegionShape, createRegion, RegionCandidate } from './regions.js';
import { getFloodFillCandidates, FloodFillResult, getMostCommonPerimeterColor, findTransparentPixels } from './floodFill.js';
import { inferGrid, assignGridPositions, generateOutput, Grid } from './grid.js';
import { kMeansCluster, RGB } from './colors.js';
import { AppState, loadState, saveState, getDefaultState } from './state.js';

// Get version and commit hash from the build
declare const __VERSION__: string;
declare const __COMMIT_HASH__: string;

const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : '0.1.0';
const COMMIT_HASH = typeof __COMMIT_HASH__ !== 'undefined' ? __COMMIT_HASH__ : 'dev';

function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [tool, setTool] = useState<'add' | 'delete'>('add');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [candidateModal, setCandidateModal] = useState<{
    result: FloodFillResult;
    candidates: RegionCandidate[];
  } | null>(null);
  const [grid, setGrid] = useState<Grid | null>(null);
  const [outputImageData, setOutputImageData] = useState<ImageData | null>(null);
  const [outputZoom, setOutputZoom] = useState(4);
  
  const inputCanvasRef = useRef<HTMLCanvasElement>(null);
  const outputCanvasRef = useRef<HTMLCanvasElement>(null);

  // Load image from state
  useEffect(() => {
    if (state.imageDataUrl && !image) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = state.imageDataUrl;
    }
  }, [state.imageDataUrl, image]);

  // Get image data when image loads
  useEffect(() => {
    if (image && inputCanvasRef.current) {
      const canvas = inputCanvasRef.current;
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      setImageData(ctx.getImageData(0, 0, image.width, image.height));
    }
  }, [image]);

  // Save state on change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Infer grid when regions change
  useEffect(() => {
    if (imageData && state.regions.length >= 4) {
      const result = inferGrid(state.regions, imageData.width, imageData.height);
      if (result.grid && result.confidence > 0.3) {
        setGrid(result.grid);
        // Assign grid positions to regions
        const updated = assignGridPositions(state.regions, result.grid);
        if (JSON.stringify(updated) !== JSON.stringify(state.regions)) {
          setState(s => ({ ...s, regions: updated }));
        }
      }
    } else {
      setGrid(null);
    }
  }, [state.regions, imageData]);

  // Generate output when grid or settings change
  useEffect(() => {
    if (!imageData || !grid) {
      setOutputImageData(null);
      return;
    }

    // Calculate transparency pixels if enabled
    let transparentPixels: Set<string> | null = null;
    if (state.inferTransparency) {
      const perimeterColor = getMostCommonPerimeterColor(imageData);
      transparentPixels = findTransparentPixels(imageData, perimeterColor, state.transparencyThreshold);
    }

    // Calculate color centroids if color limiting is enabled
    let colorCentroids: RGB[] | null = null;
    if (state.maxColors && state.maxColors > 0) {
      const allColors: RGB[] = [];
      for (let y = 0; y < imageData.height; y += 4) {
        for (let x = 0; x < imageData.width; x += 4) {
          const idx = (y * imageData.width + x) * 4;
          allColors.push({
            r: imageData.data[idx],
            g: imageData.data[idx + 1],
            b: imageData.data[idx + 2]
          });
        }
      }
      colorCentroids = kMeansCluster(allColors, state.maxColors);
    }

    const output = generateOutput(imageData, grid, state.regions, transparentPixels, colorCentroids);
    setOutputImageData(output);
  }, [imageData, grid, state.regions, state.inferTransparency, state.transparencyThreshold, state.maxColors]);

  // Render input canvas with regions
  useEffect(() => {
    if (!inputCanvasRef.current || !image) return;
    
    const canvas = inputCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Draw image
    ctx.drawImage(image, 0, 0);
    
    // Draw grid overlay if available
    if (grid) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x <= grid.width; x++) {
        const px = grid.offsetX + x * grid.pitchX - grid.pitchX / 2;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= grid.height; y++) {
        const py = grid.offsetY + y * grid.pitchY - grid.pitchY / 2;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(canvas.width, py);
        ctx.stroke();
      }
    }
    
    // Draw region outlines
    for (const region of state.regions) {
      const isHovered = region.id === hoveredRegion;
      ctx.strokeStyle = isHovered ? 'rgba(255, 200, 100, 0.9)' : 'rgba(100, 200, 255, 0.6)';
      ctx.lineWidth = isHovered ? 2 : 1;
      
      // Draw outline around region bounds
      const { minX, minY, maxX, maxY } = region.bounds;
      ctx.strokeRect(minX - 1, minY - 1, maxX - minX + 3, maxY - minY + 3);
    }
  }, [image, grid, state.regions, hoveredRegion]);

  // Render output canvas
  useEffect(() => {
    if (!outputCanvasRef.current || !outputImageData) return;
    
    const canvas = outputCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = outputImageData.width * outputZoom;
    canvas.height = outputImageData.height * outputZoom;
    
    // Draw checkerboard for transparency
    const checkSize = outputZoom / 2;
    for (let y = 0; y < canvas.height; y += checkSize) {
      for (let x = 0; x < canvas.width; x += checkSize) {
        const isLight = ((x / checkSize) + (y / checkSize)) % 2 === 0;
        ctx.fillStyle = isLight ? '#444' : '#666';
        ctx.fillRect(x, y, checkSize, checkSize);
      }
    }
    
    // Draw output image scaled up
    ctx.imageSmoothingEnabled = false;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = outputImageData.width;
    tempCanvas.height = outputImageData.height;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.putImageData(outputImageData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= outputImageData.width; x++) {
      ctx.beginPath();
      ctx.moveTo(x * outputZoom, 0);
      ctx.lineTo(x * outputZoom, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= outputImageData.height; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * outputZoom);
      ctx.lineTo(canvas.width, y * outputZoom);
      ctx.stroke();
    }
  }, [outputImageData, outputZoom]);

  const handleImageLoad = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setState(s => ({ ...s, imageDataUrl: dataUrl, regions: [] }));
        setGrid(null);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          handleImageLoad(file);
          break;
        }
      }
    }
  }, [handleImageLoad]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageLoad(file);
    }
  }, [handleImageLoad]);

  const handleCanvasClick = useCallback((e: MouseEvent) => {
    if (!imageData || !inputCanvasRef.current) return;
    
    const rect = inputCanvasRef.current.getBoundingClientRect();
    const scaleX = imageData.width / rect.width;
    const scaleY = imageData.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    
    if (tool === 'delete') {
      // Find region containing this point
      for (const region of state.regions) {
        if (region.pixels.has(`${x},${y}`)) {
          setState(s => ({
            ...s,
            regions: s.regions.filter(r => r.id !== region.id)
          }));
          return;
        }
      }
    } else {
      // Add mode - flood fill
      const candidates = getFloodFillCandidates(imageData, x, y);
      
      // Pick the best candidate (medium threshold usually works best)
      const result = candidates[1] || candidates[0];
      
      // Analyze shape candidates
      const shapeCandidates = analyzeRegionShape(result);
      
      if (shapeCandidates.length === 0) return;
      
      // If one candidate is clearly the best (score > 0.8 and 20% better than second)
      if (shapeCandidates[0].score > 0.8 && 
          (shapeCandidates.length === 1 || shapeCandidates[0].score > shapeCandidates[1].score * 1.2)) {
        // Auto-select
        const region = createRegion(result, shapeCandidates[0].gridWidth, shapeCandidates[0].gridHeight);
        setState(s => ({ ...s, regions: [...s.regions, region] }));
      } else {
        // Show modal for user selection
        setCandidateModal({ result, candidates: shapeCandidates });
      }
    }
  }, [imageData, tool, state.regions]);

  const handleCanvasMouseMove = useCallback((e: MouseEvent) => {
    if (!imageData || !inputCanvasRef.current) return;
    
    const rect = inputCanvasRef.current.getBoundingClientRect();
    const scaleX = imageData.width / rect.width;
    const scaleY = imageData.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    
    // Find region at this point
    for (const region of state.regions) {
      if (region.pixels.has(`${x},${y}`)) {
        setHoveredRegion(region.id);
        return;
      }
    }
    setHoveredRegion(null);
  }, [imageData, state.regions]);

  const handleSelectCandidate = useCallback((candidate: RegionCandidate) => {
    if (!candidateModal) return;
    
    const region = createRegion(candidateModal.result, candidate.gridWidth, candidate.gridHeight);
    setState(s => ({ ...s, regions: [...s.regions, region] }));
    setCandidateModal(null);
  }, [candidateModal]);

  const handleCopyOutput = useCallback(async () => {
    if (!outputCanvasRef.current) return;
    
    try {
      const blob = await new Promise<Blob>((resolve, reject) => {
        outputCanvasRef.current!.toBlob(blob => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/png');
      });
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
    } catch (e) {
      console.error('Failed to copy:', e);
    }
  }, []);

  const handleDownloadOutput = useCallback(() => {
    if (!outputCanvasRef.current || !outputImageData) return;
    
    // Create actual size canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = outputImageData.width;
    tempCanvas.height = outputImageData.height;
    const ctx = tempCanvas.getContext('2d')!;
    ctx.putImageData(outputImageData, 0, 0);
    
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  }, [outputImageData]);

  const handleClear = useCallback(() => {
    setState(getDefaultState());
    setImage(null);
    setImageData(null);
    setGrid(null);
    setOutputImageData(null);
  }, []);

  return (
    <>
      <header class="header">
        <h1>🎨 Pix - Pixel Image Extractor</h1>
        <div class="toolbar">
          <button
            class={`btn btn-icon ${tool === 'add' ? 'active' : ''}`}
            onClick={() => setTool('add')}
            title="Add Region"
          >
            ➕
          </button>
          <button
            class={`btn btn-icon ${tool === 'delete' ? 'active' : ''}`}
            onClick={() => setTool('delete')}
            title="Delete Region"
          >
            🗑️
          </button>
          <button class="btn btn-danger" onClick={handleClear} disabled={!state.imageDataUrl}>
            Clear
          </button>
        </div>
      </header>
      
      <main class="main-container">
        <section class="panel input-panel">
          <div class="panel-header">
            <h2>Input Image</h2>
            <span class="text-muted">{state.regions.length} regions</span>
          </div>
          
          {!image ? (
            <div
              class="drop-zone"
              onDrop={handleDrop as unknown as (e: Event) => void}
              onDragOver={(e) => { e.preventDefault(); (e.currentTarget as HTMLElement).classList.add('dragover'); }}
              onDragLeave={(e) => (e.currentTarget as HTMLElement).classList.remove('dragover')}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleImageLoad(file);
                };
                input.click();
              }}
            >
              <div class="drop-zone-icon">📁</div>
              <p>Drop an image, paste, or click to upload</p>
            </div>
          ) : (
            <div class="canvas-container">
              <canvas
                ref={inputCanvasRef}
                onClick={handleCanvasClick as unknown as (e: Event) => void}
                onMouseMove={handleCanvasMouseMove as unknown as (e: Event) => void}
                style={{ cursor: tool === 'delete' ? 'pointer' : 'crosshair' }}
              />
            </div>
          )}
          
          <div class="settings-panel">
            <h3>Settings</h3>
            <div class="setting-row">
              <label>Infer Transparency</label>
              <input
                type="checkbox"
                checked={state.inferTransparency}
                onChange={(e) => setState(s => ({ ...s, inferTransparency: (e.target as HTMLInputElement).checked }))}
              />
            </div>
            {state.inferTransparency && (
              <div class="setting-row">
                <label>Threshold</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={state.transparencyThreshold}
                  onChange={(e) => setState(s => ({ ...s, transparencyThreshold: parseInt((e.target as HTMLInputElement).value) }))}
                />
                <span>{state.transparencyThreshold}</span>
              </div>
            )}
            <div class="setting-row">
              <label>Max Colors</label>
              <input
                type="number"
                min="0"
                max="256"
                value={state.maxColors || ''}
                placeholder="None"
                onChange={(e) => {
                  const val = parseInt((e.target as HTMLInputElement).value);
                  setState(s => ({ ...s, maxColors: isNaN(val) || val <= 0 ? null : val }));
                }}
              />
            </div>
          </div>
        </section>
        
        <section class="panel">
          <div class="panel-header">
            <h2>Output Preview</h2>
            <div class="zoom-controls">
              <button class="btn btn-secondary btn-icon" onClick={() => setOutputZoom(z => Math.max(1, z - 1))}>-</button>
              <span class="zoom-level">{outputZoom}x</span>
              <button class="btn btn-secondary btn-icon" onClick={() => setOutputZoom(z => Math.min(16, z + 1))}>+</button>
            </div>
          </div>
          
          {outputImageData ? (
            <>
              <div class="canvas-container">
                <canvas ref={outputCanvasRef} class="output-canvas" />
              </div>
              <div class="toolbar" style={{ marginTop: '1rem' }}>
                <button class="btn" onClick={handleCopyOutput}>
                  📋 Copy
                </button>
                <button class="btn" onClick={handleDownloadOutput}>
                  💾 Download PNG
                </button>
              </div>
            </>
          ) : (
            <div class="drop-zone" style={{ cursor: 'default' }}>
              <p>Add at least 4 regions to generate output</p>
              <p class="text-muted">
                {state.regions.length === 0 
                  ? 'Click on the input image to start adding regions'
                  : `${4 - state.regions.length} more needed`}
              </p>
            </div>
          )}
        </section>
      </main>
      
      {candidateModal && (
        <div class="modal-overlay" onClick={() => setCandidateModal(null)}>
          <div class="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Select Region Shape</h2>
            <p>Choose the shape that best matches this region:</p>
            <div class="modal-candidates">
              {candidateModal.candidates.map((candidate, i) => (
                <div
                  key={i}
                  class="candidate"
                  onClick={() => handleSelectCandidate(candidate)}
                >
                  <div class="candidate-preview">
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${candidate.gridWidth}, 20px)`,
                      gap: '2px'
                    }}>
                      {Array.from({ length: candidate.gridWidth * candidate.gridHeight }).map((_, j) => (
                        <div key={j} style={{
                          width: '20px',
                          height: '20px',
                          backgroundColor: `rgb(${candidateModal.result.color.r}, ${candidateModal.result.color.g}, ${candidateModal.result.color.b})`,
                          borderRadius: '2px'
                        }} />
                      ))}
                    </div>
                  </div>
                  <span class="candidate-label">
                    {candidate.gridWidth}×{candidate.gridHeight} ({Math.round(candidate.score * 100)}%)
                  </span>
                </div>
              ))}
            </div>
            <div class="modal-actions">
              <button class="btn btn-secondary" onClick={() => setCandidateModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer class="footer">
        <span>
          A vibe-coded micro-app via{' '}
          <a href="https://searyanc.dev" target="_blank" rel="noopener noreferrer">
            SeaRyanC
          </a>
        </span>
        <a
          href="https://github.com/SeaRyanC/app/tree/main/pix"
          target="_blank"
          rel="noopener noreferrer"
          title="View source on GitHub"
        >
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <span style={{ fontSize: '0.75rem' }}>v{VERSION}+{COMMIT_HASH}</span>
      </footer>
    </>
  );
}

render(<App />, document.getElementById('app')!);

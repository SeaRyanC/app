import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';
import { themeNames, getThemeWords } from './words';
import { generateGrid, pickWords, gridSizeForWordCount } from './grid';
import { generatePDF } from './pdf';
import type { Grid } from './grid';
import type { PaperSize } from './pdf';

const VERSION = '1.0.0';
const COMMIT_HASH = 'dev';

const WORD_COUNT_OPTIONS = [6, 8, 10, 12, 15, 20, 25];
const PUZZLE_COUNT_OPTIONS = [1, 2, 3, 4, 5, 10];

// ── Preview Grid Component ──────────────────────────────────────────────────

function GridPreview({ grid }: { grid: Grid }) {
  const cellPx = Math.min(28, Math.floor(320 / grid.size));

  return (
    <div class="grid-preview">
      <div
        class="grid-table"
        style={{
          gridTemplateColumns: `repeat(${grid.size}, ${cellPx}px)`,
          gridTemplateRows: `repeat(${grid.size}, ${cellPx}px)`,
        }}
      >
        {grid.cells.map((row, r) =>
          row.map((ch, c) => (
            <div
              key={`${r}-${c}`}
              class="grid-cell"
              style={{ width: `${cellPx}px`, height: `${cellPx}px`, fontSize: `${Math.max(8, cellPx * 0.55)}px` }}
            >
              {ch}
            </div>
          )),
        )}
      </div>
    </div>
  );
}

// ── Word List Component ─────────────────────────────────────────────────────

function WordList({ words }: { words: string[] }) {
  const sorted = useMemo(() => [...words].sort(), [words]);
  return (
    <div class="word-list">
      <h3>Words to find:</h3>
      <div class="word-chips">
        {sorted.map(w => (
          <span key={w} class="word-chip">{w}</span>
        ))}
      </div>
    </div>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────

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
        href="https://github.com/SeaRyanC/app/tree/main/wsg"
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

// ── Main App ────────────────────────────────────────────────────────────────

export function App() {
  const [theme, setTheme] = useState(themeNames[0]!);
  const [wordCount, setWordCount] = useState(10);
  const [puzzleCount, setPuzzleCount] = useState(1);
  const [paperSize, setPaperSize] = useState<PaperSize>('letter');
  const [busy, setBusy] = useState(false);

  // Preview grid state
  const [previewGrid, setPreviewGrid] = useState<Grid | null>(null);
  const [previewWords, setPreviewWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Regenerate preview when settings change
  const regeneratePreview = useCallback(() => {
    setError(null);
    const pool = getThemeWords(theme);
    const words = pickWords(pool, wordCount);
    const grid = generateGrid(words);
    if (grid) {
      setPreviewGrid(grid);
      setPreviewWords(grid.placedWords.map(pw => pw.word));
    } else {
      setPreviewGrid(null);
      setPreviewWords([]);
      setError('Could not generate a valid grid. Try fewer words or a different theme.');
    }
  }, [theme, wordCount]);

  // Auto-regenerate on settings change
  useEffect(() => {
    regeneratePreview();
  }, [regeneratePreview]);

  const handleGeneratePDF = async () => {
    setBusy(true);
    setError(null);
    try {
      const pool = getThemeWords(theme);
      const grids: Grid[] = [];

      for (let i = 0; i < puzzleCount; i++) {
        const words = i === 0 && previewGrid
          ? previewGrid.placedWords.map(pw => pw.word)
          : pickWords(pool, wordCount);
        const grid = i === 0 && previewGrid
          ? previewGrid
          : generateGrid(words);
        if (!grid) {
          setError(`Failed to generate puzzle ${i + 1}. Try fewer words.`);
          setBusy(false);
          return;
        }
        grids.push(grid);
      }

      const themeLabel = theme === 'Random' ? 'Word Search' : `${theme} Word Search`;
      const blob = await generatePDF(grids, themeLabel, paperSize);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('PDF generation failed', err);
      setError('Something went wrong generating the PDF.');
    } finally {
      setBusy(false);
    }
  };

  const gridSize = gridSizeForWordCount(wordCount);

  return (
    <div class="app-container">
      <h1>🔍 Word Search Generator</h1>
      <p class="subtitle">Create printable word search puzzles for kids</p>

      {/* Settings */}
      <div class="settings-panel">
        <div class="setting-group">
          <label for="theme-select">Theme</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme((e.target as HTMLSelectElement).value)}
          >
            {themeNames.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div class="setting-group">
          <label for="word-count">Words ({gridSize}×{gridSize} grid)</label>
          <select
            id="word-count"
            value={wordCount}
            onChange={(e) => setWordCount(Number((e.target as HTMLSelectElement).value))}
          >
            {WORD_COUNT_OPTIONS.map(n => (
              <option key={n} value={n}>{n} words</option>
            ))}
          </select>
        </div>

        <div class="setting-group">
          <label for="puzzle-count">Puzzles</label>
          <select
            id="puzzle-count"
            value={puzzleCount}
            onChange={(e) => setPuzzleCount(Number((e.target as HTMLSelectElement).value))}
          >
            {PUZZLE_COUNT_OPTIONS.map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'puzzle' : 'puzzles'}</option>
            ))}
          </select>
        </div>

        <div class="setting-group">
          <label>Paper size</label>
          <div class="paper-options">
            <button
              type="button"
              class={paperSize === 'letter' ? 'selected' : ''}
              onClick={() => setPaperSize('letter')}
            >
              US Letter
            </button>
            <button
              type="button"
              class={paperSize === 'a4' ? 'selected' : ''}
              onClick={() => setPaperSize('a4')}
            >
              A4
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && <div class="error-msg">{error}</div>}

      {/* Preview */}
      {previewGrid && (
        <div class="preview-section">
          <div class="preview-header">
            <h2>Preview</h2>
            <button type="button" class="refresh-btn" onClick={regeneratePreview} title="Generate new puzzle">
              ↻ New puzzle
            </button>
          </div>
          <GridPreview grid={previewGrid} />
          <WordList words={previewWords} />
        </div>
      )}

      {/* Generate */}
      <div class="action-row">
        <button
          type="button"
          class="primary generate-btn"
          disabled={busy || !previewGrid}
          onClick={handleGeneratePDF}
        >
          {busy ? 'Generating…' : `Generate PDF (${puzzleCount} ${puzzleCount === 1 ? 'puzzle' : 'puzzles'})`}
        </button>
      </div>

      <Footer />
    </div>
  );
}

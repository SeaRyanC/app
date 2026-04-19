/**
 * Word search grid generation.
 *
 * Guarantees:
 *  - All requested words are placed
 *  - No swear words appear in any row, column, or diagonal (in either direction)
 *  - Filler letter distribution approximates English
 */

// ── Swear-word filter ──────────────────────────────────────────────────────────

const BANNED_WORDS: string[] = [
  "ASS", "ASSES", "DAMN", "DAMNS", "HELL", "HELLS",
  "SHIT", "SHITS", "PISS", "PISSED", "FUCK", "FUCKS",
  "CRAP", "CRAPS", "DICK", "DICKS", "COCK", "COCKS",
  "BITCH", "SLUT", "SLUTS", "WHORE", "CUNT", "CUNTS",
  "TIT", "TITS", "FAG", "FAGS", "BUTT", "BUTTS",
  "BOOB", "BOOBS", "POOP", "POOPS", "PEE", "PEES",
  "ARSE", "ARSES", "WANK", "WANKS", "TWAT", "TWATS",
  "NUDE", "NUDES", "PORN", "SEX", "SEXY", "SUCK",
  "SUCKS", "NUT", "NUTS", "KILL", "KILLS", "DRUG",
  "DRUGS", "ANAL", "RAPE", "RAPES",
];

// ── English letter frequencies ─────────────────────────────────────────────────

const LETTER_FREQ: [string, number][] = [
  ["E", 12.7], ["T", 9.1], ["A", 8.2], ["O", 7.5], ["I", 7.0],
  ["N", 6.7], ["S", 6.3], ["H", 6.1], ["R", 6.0], ["D", 4.3],
  ["L", 4.0], ["C", 2.8], ["U", 2.8], ["M", 2.4], ["W", 2.4],
  ["F", 2.2], ["G", 2.0], ["Y", 2.0], ["P", 1.9], ["B", 1.5],
  ["V", 1.0], ["K", 0.8], ["J", 0.15], ["X", 0.15], ["Q", 0.10],
  ["Z", 0.07],
];

function buildWeightedAlphabet(): string {
  let s = "";
  for (const [ch, freq] of LETTER_FREQ) {
    const count = Math.max(1, Math.round(freq * 10));
    s += ch.repeat(count);
  }
  return s;
}

const WEIGHTED = buildWeightedAlphabet();

function randomLetter(): string {
  return WEIGHTED[Math.floor(Math.random() * WEIGHTED.length)]!;
}

// ── Difficulty levels ──────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy (→ ↓)',
  medium: 'Medium (→ ↓ ← ↑)',
  hard: 'Hard (+ diagonals)',
  expert: 'Expert (+ reverse diagonals)',
};

type Direction = { dx: number; dy: number };

const DIRECTIONS_BY_DIFFICULTY: Record<Difficulty, Direction[]> = {
  easy: [
    { dx: 1, dy: 0 },   // right
    { dx: 0, dy: 1 },   // down
  ],
  medium: [
    { dx: 1, dy: 0 },   // right
    { dx: 0, dy: 1 },   // down
    { dx: -1, dy: 0 },  // left
    { dx: 0, dy: -1 },  // up
  ],
  hard: [
    { dx: 1, dy: 0 },   // right
    { dx: 0, dy: 1 },   // down
    { dx: -1, dy: 0 },  // left
    { dx: 0, dy: -1 },  // up
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: -1, dy: 1 },  // diagonal down-left
  ],
  expert: [
    { dx: 1, dy: 0 },   // right
    { dx: 0, dy: 1 },   // down
    { dx: -1, dy: 0 },  // left
    { dx: 0, dy: -1 },  // up
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: -1, dy: 1 },  // diagonal down-left
    { dx: -1, dy: -1 }, // diagonal up-left
    { dx: 1, dy: -1 },  // diagonal up-right
  ],
};

// ── Grid helpers ───────────────────────────────────────────────────────────────

export interface PlacedWord {
  word: string;
  row: number;
  col: number;
  dx: number;
  dy: number;
}

export interface Grid {
  size: number;
  cells: string[][];
  placedWords: PlacedWord[];
}

function makeEmptyGrid(size: number): string[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => ""));
}

function canPlace(grid: string[][], word: string, row: number, col: number, dir: Direction, size: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const r = row + dir.dy * i;
    const c = col + dir.dx * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    const existing = grid[r]![c]!;
    if (existing !== "" && existing !== word[i]) return false;
  }
  return true;
}

function placeWord(grid: string[][], word: string, row: number, col: number, dir: Direction): void {
  for (let i = 0; i < word.length; i++) {
    const r = row + dir.dy * i;
    const c = col + dir.dx * i;
    grid[r]![c] = word[i]!;
  }
}

// ── Swear-word scanning ────────────────────────────────────────────────────────

function extractLines(grid: string[][], size: number): string[] {
  const lines: string[] = [];

  // Rows (left-to-right)
  for (let r = 0; r < size; r++) {
    lines.push(grid[r]!.join(""));
  }

  // Columns (top-to-bottom)
  for (let c = 0; c < size; c++) {
    let s = "";
    for (let r = 0; r < size; r++) s += grid[r]![c]!;
    lines.push(s);
  }

  // Diagonals ↘
  for (let start = -(size - 1); start < size; start++) {
    let s = "";
    for (let i = 0; i < size; i++) {
      const r = i;
      const c = start + i;
      if (c >= 0 && c < size) s += grid[r]![c]!;
    }
    if (s.length >= 3) lines.push(s);
  }

  // Diagonals ↙
  for (let start = 0; start < 2 * size - 1; start++) {
    let s = "";
    for (let i = 0; i < size; i++) {
      const r = i;
      const c = start - i;
      if (c >= 0 && c < size) s += grid[r]![c]!;
    }
    if (s.length >= 3) lines.push(s);
  }

  return lines;
}

function containsBannedWord(grid: string[][], size: number): boolean {
  const lines = extractLines(grid, size);
  for (const line of lines) {
    const reversed = line.split("").reverse().join("");
    for (const bad of BANNED_WORDS) {
      if (line.includes(bad) || reversed.includes(bad)) return true;
    }
  }
  return false;
}

// ── Grid size calculation ──────────────────────────────────────────────────────

/** Compute a grid size that fits the word count comfortably. */
export function gridSizeForWordCount(wordCount: number): number {
  // Rough heuristic: each word needs some space; grid should be at least
  // as large as the longest word and scale with word count.
  if (wordCount <= 6) return 8;
  if (wordCount <= 10) return 10;
  if (wordCount <= 15) return 12;
  if (wordCount <= 20) return 14;
  if (wordCount <= 25) return 16;
  return 18;
}

// ── Placement helpers ──────────────────────────────────────────────────────────

/** Fisher-Yates shuffle (in place). */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/**
 * Find all valid positions for a word on the grid, returned in random order.
 */
function findAllValidPositions(
  grid: string[][],
  word: string,
  dirs: Direction[],
  size: number,
): { row: number; col: number; dir: Direction }[] {
  const positions: { row: number; col: number; dir: Direction }[] = [];
  for (const dir of dirs) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (canPlace(grid, word, row, col, dir, size)) {
          positions.push({ row, col, dir });
        }
      }
    }
  }
  return shuffle(positions);
}

// ── Main generation ────────────────────────────────────────────────────────────

/** Maximum grid dimension. */
const MAX_GRID_SIZE = 24;

/**
 * Attempt to place all words on a grid of the given size.
 * Returns the filled cells and placed-word metadata, or null if placement failed.
 */
function tryPlaceWords(
  words: string[],
  size: number,
  allowedDirs: Direction[],
): { cells: string[][]; placed: PlacedWord[] } | null {
  const cells = makeEmptyGrid(size);
  const placed: PlacedWord[] = [];

  // Sort words longest-first; shuffle equal-length words for variety
  const sorted = [...words].sort((a, b) => b.length - a.length || Math.random() - 0.5);

  for (const word of sorted) {
    let wordPlaced = false;

    // Fast path: try random positions first
    const dirs = shuffle([...allowedDirs]);
    for (let tries = 0; tries < 200 && !wordPlaced; tries++) {
      const dir = dirs[tries % dirs.length]!;
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlace(cells, word, row, col, dir, size)) {
        placeWord(cells, word, row, col, dir);
        placed.push({ word, row, col, dx: dir.dx, dy: dir.dy });
        wordPlaced = true;
      }
    }

    // Exhaustive fallback: enumerate every valid position so we never
    // miss a placement that actually exists.
    if (!wordPlaced) {
      const allPositions = findAllValidPositions(cells, word, allowedDirs, size);
      if (allPositions.length > 0) {
        const { row, col, dir } = allPositions[0]!;
        placeWord(cells, word, row, col, dir);
        placed.push({ word, row, col, dx: dir.dx, dy: dir.dy });
        wordPlaced = true;
      }
    }

    if (!wordPlaced) return null;
  }

  return { cells, placed };
}

/**
 * Generate a complete word search grid.
 *
 * @param words      List of words to place (already upper-cased).
 * @param difficulty Difficulty level controlling allowed directions.
 * @returns          A filled Grid, or null if placement failed after retries.
 */
export function generateGrid(words: string[], difficulty: Difficulty = 'expert'): Grid | null {
  if (words.length === 0) return null;

  const longest = Math.max(...words.map(w => w.length));
  const baseSize = Math.max(gridSizeForWordCount(words.length), longest + 1);
  const allowedDirs = DIRECTIONS_BY_DIFFICULTY[difficulty];

  // Try progressively larger grids if placement keeps failing
  for (let size = baseSize; size <= MAX_GRID_SIZE; size += 2) {
    for (let attempt = 0; attempt < 50; attempt++) {
      const result = tryPlaceWords(words, size, allowedDirs);
      if (!result) continue;

      const { cells, placed } = result;

      // Fill blanks with random English-weighted letters, avoiding swear words
      let clean = false;
      for (let fillAttempt = 0; fillAttempt < 20; fillAttempt++) {
        const filled = cells.map(row => row.map(c => c || randomLetter()));
        if (!containsBannedWord(filled, size)) {
          // Copy filled values back
          for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
              cells[r]![c] = filled[r]![c]!;
            }
          }
          clean = true;
          break;
        }
      }

      if (!clean) continue;

      return { size, cells, placedWords: placed };
    }
  }

  return null;
}

/**
 * Pick N random words from a pool, ensuring they fit the grid.
 * Filters out words that are too long for a sensible grid, and
 * words that contain a banned substring (or whose banned word is
 * a substring of them), e.g. DONUT contains NUT.
 *
 * @param exclude  Optional set of words to skip (e.g. words already used in
 *                 earlier puzzles). When the pool minus exclusions is too
 *                 small, excluded words are allowed as a fallback so we
 *                 always return the requested count when possible.
 */
export function pickWords(pool: string[], count: number, exclude?: Set<string>): string[] {
  const maxLen = 12;
  const eligible = pool.filter(w => {
    if (w.length < 3 || w.length > maxLen) return false;
    const upper = w.toUpperCase();
    for (const bad of BANNED_WORDS) {
      if (upper.includes(bad) || bad.includes(upper)) return false;
    }
    return true;
  });
  const shuffled = shuffle([...eligible]);

  // Partition into preferred (not excluded) and fallback (excluded)
  const preferred: string[] = [];
  const fallback: string[] = [];
  const seen = new Set<string>();
  for (const w of shuffled) {
    if (seen.has(w)) continue;
    seen.add(w);
    if (exclude?.has(w)) {
      fallback.push(w);
    } else {
      preferred.push(w);
    }
  }

  // Take from preferred first, then fall back to excluded words if needed
  const result = preferred.slice(0, count);
  if (result.length < count) {
    result.push(...fallback.slice(0, count - result.length));
  }
  return result;
}

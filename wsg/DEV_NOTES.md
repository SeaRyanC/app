# WSG Dev Notes

## PDF generation
- Uses `pdfkit-browserify` + `blob-stream`, same stack as PPG and LMM apps.
- Needs the same polyfills (Buffer, process, process.nextTick).
- Each puzzle generates 1 page (no answer key).

## Grid generation
- Words placed longest-first for better packing; equal-length words are shuffled for variety between attempts.
- Direction set controlled by difficulty level (easy: 2 dirs, up to expert: all 8).
- Placement uses a two-phase approach: first 200 random position attempts (fast path), then an exhaustive search of all valid positions (guarantees placement if one exists).
- If all words cannot be placed at the heuristic grid size, the algorithm retries with progressively larger grids (up to 24×24).
- Swear-word scanning checks all rows, columns, and diagonals in both reading directions.
- English letter frequencies used for filler to produce natural-looking grids.
- Up to 50 placement attempts × 20 fill attempts per grid size, with grid-size escalation.
- Word pool filtering removes words that contain banned substrings (e.g. DONUT contains NUT).

## Difficulty levels
| Level  | Directions                         |
|--------|------------------------------------|
| Easy   | → ↓                               |
| Medium | → ↓ ← ↑                           |
| Hard   | → ↓ ← ↑ ↘ ↙                       |
| Expert | → ↓ ← ↑ ↘ ↙ ↖ ↗ (all 8)          |

## Grid sizing heuristic
| Word count | Grid size |
|-----------|-----------|
| ≤ 6       | 8×8       |
| ≤ 10      | 10×10     |
| ≤ 15      | 12×12     |
| ≤ 20      | 14×14     |
| ≤ 25      | 16×16     |
| > 25      | 18×18     |

Grid is also at least `longestWord + 1` cells in each dimension.

## Word pools
- 20 themes, each with 120–150 words.
- All words are 3–12 characters, uppercased at runtime.
- "Random" theme is the union of all theme pools, deduplicated.

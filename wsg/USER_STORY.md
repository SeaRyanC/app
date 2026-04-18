# WSG – Word Search Generator: User Stories

## Theme Selection
- The user can choose from **20 themed word pools**: Animals, Plants, Ocean, Space, Food, Colors, Weather, Sports, Music, School, Dinosaurs, Seasons, Bugs, Vehicles, Fantasy, Geography, Clothing, Pets, Nature, and Camping.
- Each theme contains a hardcoded pool of roughly 120–150 kid-appropriate words.
- A **"Random"** theme draws from the combined pool of all themes.

## Word Count
- The user selects a word count from a preset list (6, 8, 10, 12, 15, 20, or 25 words).
- The grid size is automatically derived from the word count (e.g. 8×8 for 6 words, up to 18×18 for 25+ words).
- The word count and resulting grid dimensions are displayed together so the user knows what to expect.

## Live Preview
- A **live preview** of a representative word search grid is displayed as the user adjusts settings.
- The preview updates automatically when the theme or word count changes.
- A **"New puzzle"** button lets the user regenerate the preview with different words from the same theme without changing settings.
- Below the grid, the words to find are listed alphabetically.

## Puzzle Count
- The user can select a number of puzzles to generate (1, 2, 3, 4, 5, or 10).
- Only the first puzzle is shown in preview; the remaining puzzles are generated at PDF time with freshly picked words and grids.

## Grid Generation
- Words are placed in all 8 directions: horizontal, vertical, and both diagonals, in either forward or reverse.
- Empty cells are filled with random letters following an **English letter frequency distribution** (more Es and Ts, fewer Qs and Zs).
- The grid is guaranteed **not to contain any swear words or inappropriate language** in any row, column, or diagonal reading direction.

## PDF Output
- The user can select **US Letter** or **A4** paper size.
- Clicking **"Generate PDF"** creates a multi-page PDF:
  - Each puzzle occupies one page showing the grid and the alphabetized word list.
  - Each puzzle is followed by an **answer key page** with the solution words highlighted.
- The PDF opens in a new tab or triggers a download.

## Footer
- A footer displays "A vibe-coded micro-app via SeaRyanC" (linked to https://searyanc.dev), a GitHub icon linking to the app's source, and the current version + commit hash.

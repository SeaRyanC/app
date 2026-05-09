# LLL Dev Notes

## PDF Generation

- `drawCell` uses `doc.save()` / `doc.rect().clip()` / `doc.restore()` to prevent text from visually overflowing cell bounds. Do NOT use `ellipsis: true` with `lineBreak: false` — they conflict in pdfkit-browserify.
- Summary columns (IF/OF/Off) use `summaryColW = 36` to accommodate "Off" at max font size (16pt).
- Page 2 "Position" column uses `posColW = max(65, USABLE_W * 0.08)` to fit the full "Position" header label.
- The OF rows on page 2 render as `OF_CAPACITY` (3) separate rows, each showing one OF player per inning in batting order, rather than combining all OF players into a single cell.
- Bench output on page 2 mirrors OF layout: render one `B` row per simultaneous bench slot in batting order instead of joining all benched names into one cell.

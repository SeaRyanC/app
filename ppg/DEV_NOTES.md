# PPG Dev Notes

## PDF generation
- Uses `pdfkit-browserify` + `blob-stream`, same stack as the LMM app.
- Needs the same polyfills (Buffer, process, process.nextTick).
- The cropped image is drawn onto a canvas at export time, converted to a PNG data URL, then embedded in the PDF via `doc.image()`.

## Crop math
- The crop editor keeps track of `scale` (zoom) and `offset` (pan) for the image.
- At PDF-export time, the visible portion of the image inside the crop square is rendered to an off-screen canvas at 600×600 px (300 DPI for a 2″ photo).

## Paper layouts (all dimensions in inches)
| Paper | Photo copies | Columns × Rows |
|-------|-------------|-----------------|
| 3×5   | 2           | 1 × 2           |
| 4×6   | 2           | 1 × 2           |
| 8×10  | 4           | 2 × 2           |

Each photo is centred within its own equal-sized cell on the page (cell = page ÷ grid), so there is even padding around every image rather than photos butting up against each other.

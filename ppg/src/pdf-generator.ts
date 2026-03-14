import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';

/** Points per inch */
const PPI = 72;

/** Photo size: 2 inches square */
const PHOTO_INCHES = 2;
const PHOTO_PTS = PHOTO_INCHES * PPI; // 144

export type PaperSize = '3x5' | '4x6' | '8x10';

interface PaperLayout {
  /** Paper width in points */
  width: number;
  /** Paper height in points */
  height: number;
  /** How many columns of photos */
  cols: number;
  /** How many rows of photos */
  rows: number;
}

const layouts: Record<PaperSize, PaperLayout> = {
  '3x5': { width: 3 * PPI, height: 5 * PPI, cols: 1, rows: 2 },
  '4x6': { width: 4 * PPI, height: 6 * PPI, cols: 1, rows: 2 },
  '8x10': { width: 8 * PPI, height: 10 * PPI, cols: 2, rows: 2 },
};

/**
 * Length (in points) of the small tick marks drawn at each photo corner.
 */
const CUT_MARK_LEN = 8;

/**
 * Generate a PDF containing passport photos laid out on the chosen paper size.
 *
 * @param imageDataUrl  A data-URL (PNG) of the cropped 2×2″ photo
 * @param paperSize     Which paper size to target
 * @returns             A Blob containing the PDF
 */
export async function generatePDF(
  imageDataUrl: string,
  paperSize: PaperSize,
): Promise<Blob> {
  const layout = layouts[paperSize];

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: [layout.width, layout.height],
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      autoFirstPage: false,
    });

    const stream = doc.pipe(blobStream());

    doc.addPage();

    // Place each photo centred within its own equal-sized cell on the page
    const cellW = layout.width / layout.cols;
    const cellH = layout.height / layout.rows;

    // Collect photo positions for cut marks
    const photos: { x: number; y: number }[] = [];

    // Draw each photo cell
    for (let r = 0; r < layout.rows; r++) {
      for (let c = 0; c < layout.cols; c++) {
        const x = c * cellW + (cellW - PHOTO_PTS) / 2;
        const y = r * cellH + (cellH - PHOTO_PTS) / 2;

        // Embed the image
        doc.image(imageDataUrl, x, y, {
          width: PHOTO_PTS,
          height: PHOTO_PTS,
        });

        photos.push({ x, y });
      }
    }

    // Draw cut marks around every photo
    drawCutMarks(doc, layout, photos);

    doc.end();

    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      resolve(blob);
    });
    stream.on('error', reject);
  });
}

/**
 * Draw corner-tick cut marks around each photo.
 */
function drawCutMarks(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
  layout: PaperLayout,
  photos: { x: number; y: number }[],
): void {
  doc.strokeColor('#888888').lineWidth(0.5);

  for (const { x, y } of photos) {
    // Four corners of this photo
    const corners = [
      { cx: x, cy: y },                             // top-left
      { cx: x + PHOTO_PTS, cy: y },                 // top-right
      { cx: x, cy: y + PHOTO_PTS },                 // bottom-left
      { cx: x + PHOTO_PTS, cy: y + PHOTO_PTS },     // bottom-right
    ];

    for (const { cx, cy } of corners) {
      // Horizontal ticks
      if (cx - CUT_MARK_LEN >= 0) {
        doc.moveTo(cx - CUT_MARK_LEN, cy).lineTo(cx, cy).stroke();
      }
      if (cx + CUT_MARK_LEN <= layout.width) {
        doc.moveTo(cx, cy).lineTo(cx + CUT_MARK_LEN, cy).stroke();
      }

      // Vertical ticks
      if (cy - CUT_MARK_LEN >= 0) {
        doc.moveTo(cx, cy - CUT_MARK_LEN).lineTo(cx, cy).stroke();
      }
      if (cy + CUT_MARK_LEN <= layout.height) {
        doc.moveTo(cx, cy).lineTo(cx, cy + CUT_MARK_LEN).stroke();
      }
    }
  }
}

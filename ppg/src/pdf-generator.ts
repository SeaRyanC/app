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
  '4x6': { width: 4 * PPI, height: 6 * PPI, cols: 2, rows: 1 },
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

    // Centre the grid of photos on the page
    const gridW = layout.cols * PHOTO_PTS;
    const gridH = layout.rows * PHOTO_PTS;
    const originX = (layout.width - gridW) / 2;
    const originY = (layout.height - gridH) / 2;

    // Draw each photo cell
    for (let r = 0; r < layout.rows; r++) {
      for (let c = 0; c < layout.cols; c++) {
        const x = originX + c * PHOTO_PTS;
        const y = originY + r * PHOTO_PTS;

        // Embed the image
        doc.image(imageDataUrl, x, y, {
          width: PHOTO_PTS,
          height: PHOTO_PTS,
        });
      }
    }

    // Draw cut marks around every photo cell
    drawCutMarks(doc, layout, originX, originY);

    doc.end();

    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      resolve(blob);
    });
    stream.on('error', reject);
  });
}

/**
 * Draw corner-tick cut marks for each photo boundary.
 */
function drawCutMarks(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doc: any,
  layout: PaperLayout,
  originX: number,
  originY: number,
): void {
  doc.strokeColor('#888888').lineWidth(0.5);

  // We need marks at every grid intersection, including the outer edges.
  for (let r = 0; r <= layout.rows; r++) {
    for (let c = 0; c <= layout.cols; c++) {
      const x = originX + c * PHOTO_PTS;
      const y = originY + r * PHOTO_PTS;

      // Horizontal ticks
      // tick going left
      if (c > 0 || originX >= CUT_MARK_LEN) {
        doc.moveTo(x - CUT_MARK_LEN, y).lineTo(x, y).stroke();
      }
      // tick going right
      if (c < layout.cols || layout.width - x >= CUT_MARK_LEN) {
        doc.moveTo(x, y).lineTo(x + CUT_MARK_LEN, y).stroke();
      }

      // Vertical ticks
      // tick going up
      if (r > 0 || originY >= CUT_MARK_LEN) {
        doc.moveTo(x, y - CUT_MARK_LEN).lineTo(x, y).stroke();
      }
      // tick going down
      if (r < layout.rows || layout.height - y >= CUT_MARK_LEN) {
        doc.moveTo(x, y).lineTo(x, y + CUT_MARK_LEN).stroke();
      }
    }
  }
}

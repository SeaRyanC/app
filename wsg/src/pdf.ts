/**
 * PDF generation for word search puzzles.
 * Produces one page per puzzle with grid + word list.
 */

import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';
import type { Grid } from './grid';

export type PaperSize = 'letter' | 'a4';

interface PaperDimensions {
  width: number;   // in points (72 pt = 1 inch)
  height: number;
}

const PAPER: Record<PaperSize, PaperDimensions> = {
  letter: { width: 612, height: 792 },   // 8.5 × 11 inches
  a4: { width: 595.28, height: 841.89 }, // 210 × 297 mm
};

export function generatePDF(
  grids: Grid[],
  title: string,
  paperSize: PaperSize,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const paper = PAPER[paperSize];
      const doc = new PDFDocument({
        size: [paper.width, paper.height],
        margin: 36,
        autoFirstPage: false,
      });
      const stream = doc.pipe(blobStream());

      for (let gi = 0; gi < grids.length; gi++) {
        const grid = grids[gi]!;
        doc.addPage({ size: [paper.width, paper.height], margin: 36 });

        const margin = 36;
        const usableWidth = paper.width - margin * 2;
        const usableHeight = paper.height - margin * 2;

        // Title
        doc.fontSize(18).font('Helvetica-Bold');
        doc.text(`${title}`, margin, margin, { width: usableWidth, align: 'center' });
        const titleBottom = margin + 28;

        // Puzzle number (if multiple)
        let headerBottom = titleBottom;
        if (grids.length > 1) {
          doc.fontSize(10).font('Helvetica');
          doc.text(`Puzzle ${gi + 1} of ${grids.length}`, margin, titleBottom, {
            width: usableWidth,
            align: 'center',
          });
          headerBottom = titleBottom + 16;
        }

        // Grid area
        const gridTop = headerBottom + 12;
        const wordListHeight = 100; // reserve space for word list at bottom
        const maxGridHeight = usableHeight - (gridTop - margin) - wordListHeight - 12;
        const maxGridWidth = usableWidth;
        const cellSize = Math.min(
          Math.floor(maxGridWidth / grid.size),
          Math.floor(maxGridHeight / grid.size),
        );
        const gridPixels = cellSize * grid.size;
        const gridLeft = margin + (usableWidth - gridPixels) / 2;

        // Draw grid
        doc.fontSize(Math.max(8, cellSize * 0.55)).font('Courier');

        for (let r = 0; r < grid.size; r++) {
          for (let c = 0; c < grid.size; c++) {
            const x = gridLeft + c * cellSize;
            const y = gridTop + r * cellSize;
            const letter = grid.cells[r]![c]!;

            // Light grid lines
            doc.rect(x, y, cellSize, cellSize)
              .lineWidth(0.25)
              .stroke('#cccccc');

            // Letter centered in cell
            const textWidth = doc.widthOfString(letter);
            const textHeight = doc.currentLineHeight();
            doc.fillColor('#222222').text(
              letter,
              x + (cellSize - textWidth) / 2,
              y + (cellSize - textHeight) / 2,
              { lineBreak: false },
            );
          }
        }

        // Word list below grid
        const listTop = gridTop + gridPixels + 16;
        doc.fontSize(9).font('Helvetica');
        doc.fillColor('#444444');
        doc.text('Find these words:', margin, listTop, { width: usableWidth });

        const wordsPerRow = Math.max(1, Math.floor(usableWidth / 120));
        const colWidth = usableWidth / wordsPerRow;
        const wordsSorted = [...grid.placedWords].sort((a, b) => a.word.localeCompare(b.word));
        let currentRow = 0;
        let currentCol = 0;

        doc.fontSize(9).font('Helvetica');
        const wordListStart = listTop + 14;
        for (const pw of wordsSorted) {
          const x = margin + currentCol * colWidth;
          const y = wordListStart + currentRow * 13;
          doc.fillColor('#222222').text(pw.word, x, y, { lineBreak: false });
          currentCol++;
          if (currentCol >= wordsPerRow) {
            currentCol = 0;
            currentRow++;
          }
        }
      }

      doc.end();
      stream.on('finish', () => {
        resolve(stream.toBlob('application/pdf'));
      });
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

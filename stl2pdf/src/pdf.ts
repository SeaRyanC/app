import { jsPDF } from 'jspdf';
import type { SectionResult } from './section.js';
import type { CutPlane } from './geometry.js';

// Letter dimensions in mm
const LETTER_W = 215.9;
const LETTER_H = 279.4;
const MARGIN = 12;
// Reserve vertical space below the drawable area for the footer text and
// the physical calibration bar.
const FOOTER_RESERVE = 15;

interface Orientation {
  pageW: number;
  pageH: number;
  availW: number;
  availH: number;
  scale: number;
  isLandscape: boolean;
}

function computeOrientation(pageW: number, pageH: number, secW: number, secH: number, isLandscape: boolean): Orientation {
  const availW = pageW - 2 * MARGIN;
  const availH = pageH - 2 * MARGIN - FOOTER_RESERVE;
  // Never scale up — 1.0 means true 1mm = 1mm.
  const scale = Math.min(1.0, availW / secW, availH / secH);
  return { pageW, pageH, availW, availH, scale, isLandscape };
}

/**
 * Generate a to-scale (1:1 mm) PDF of a cross-section.
 *
 * The best-fitting orientation (portrait or landscape) is chosen. If the
 * section fits at true 1:1 scale on a single page in that orientation, one
 * page is produced. Otherwise the section is tiled across multiple 1:1-scale
 * pages so the drawing is never shrunk — each tile can be taped together
 * with its neighbors to reconstruct the full-size drawing.
 */
export function generateSectionPDF(section: SectionResult, plane: CutPlane): Blob {
  const { contours, bounds } = section;

  if (!bounds || contours.length === 0) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [LETTER_W, LETTER_H] });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('No cross-section found at this plane.', LETTER_W / 2, LETTER_H / 2, { align: 'center' });
    return doc.output('blob');
  }

  const secW = bounds.maxX - bounds.minX;
  const secH = bounds.maxY - bounds.minY;

  const portrait = computeOrientation(LETTER_W, LETTER_H, secW, secH, false);
  const landscape = computeOrientation(LETTER_H, LETTER_W, secW, secH, true);

  // Choose the orientation with the larger (closer to 1:1) scale; tie-break portrait.
  const best = landscape.scale > portrait.scale ? landscape : portrait;

  const doc = new jsPDF({
    orientation: best.isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [LETTER_W, LETTER_H],
  });

  if (best.scale >= 0.9999) {
    drawPageTile(doc, section, plane, best, 0, 0, 1, 1);
  } else {
    const colCount = Math.max(1, Math.ceil(secW / best.availW));
    const rowCount = Math.max(1, Math.ceil(secH / best.availH));
    let first = true;
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (!first) {
          doc.addPage([LETTER_W, LETTER_H], best.isLandscape ? 'landscape' : 'portrait');
        }
        first = false;
        drawPageTile(doc, section, plane, best, col, row, colCount, rowCount);
      }
    }
  }

  return doc.output('blob');
}

function drawPageTile(
  doc: jsPDF,
  section: SectionResult,
  plane: CutPlane,
  orient: Orientation,
  col: number, row: number,
  colCount: number, rowCount: number
): void {
  const { contours, bounds } = section;
  if (!bounds) return;
  const { availW, availH, scale } = orient;
  const secW = bounds.maxX - bounds.minX;
  const secH = bounds.maxY - bounds.minY;

  const tiled = scale < 0.9999;

  // Section-coord origin mapped to page (MARGIN, MARGIN):
  //  - single page: center the section within the available area
  //  - tiled: MARGIN-offset slice of the full section, per tile
  const originX = tiled ? MARGIN - col * availW : MARGIN + (availW - secW) / 2;
  const originY = tiled ? MARGIN - row * availH : MARGIN + (availH - secH) / 2;

  const px = (sx: number): number => originX + (sx - bounds.minX);
  const py = (sy: number): number => originY + (sy - bounds.minY);

  // ── Border box around the drawable area
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.1);
  doc.rect(MARGIN, MARGIN, availW, availH, 'S');

  // ── Clip drawing to this tile's page area, then draw only the contours
  //    that could possibly intersect it.
  const tileMinX = bounds.minX + col * availW;
  const tileMaxX = tileMinX + availW;
  const tileMinY = bounds.minY + row * availH;
  const tileMaxY = tileMinY + availH;

  doc.saveGraphicsState();
  doc.rect(MARGIN, MARGIN, availW, availH);
  doc.clip();
  doc.discardPath();

  doc.setFillColor(210, 210, 210);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);

  let drewAny = false;
  for (const contour of contours) {
    if (contour.length < 2) continue;

    let cMinX = Infinity, cMinY = Infinity, cMaxX = -Infinity, cMaxY = -Infinity;
    for (const p of contour) {
      if (p.x < cMinX) cMinX = p.x;
      if (p.y < cMinY) cMinY = p.y;
      if (p.x > cMaxX) cMaxX = p.x;
      if (p.y > cMaxY) cMaxY = p.y;
    }
    if (cMaxX < tileMinX || cMinX > tileMaxX || cMaxY < tileMinY || cMinY > tileMaxY) continue;

    drewAny = true;
    doc.moveTo(px(contour[0].x), py(contour[0].y));
    for (let i = 1; i < contour.length; i++) {
      doc.lineTo(px(contour[i].x), py(contour[i].y));
    }
    doc.close();
  }
  if (drewAny) doc.fillStrokeEvenOdd();

  doc.restoreGraphicsState();

  drawFooter(doc, plane, orient, secW, secH, col, row, colCount, rowCount);
}

/** Draw the footer label and a physical 25.4mm calibration bar. */
function drawFooter(
  doc: jsPDF,
  plane: CutPlane,
  orient: Orientation,
  secW: number, secH: number,
  col: number, row: number,
  colCount: number, rowCount: number
): void {
  const { pageW, pageH } = orient;
  const axisName = plane.axis.toUpperCase();

  let labelText = `Section at ${axisName} = ${plane.value.toFixed(2)} mm   |   `
    + `Width: ${secW.toFixed(1)} mm   Height: ${secH.toFixed(1)} mm   |   Scale: 1:1`;
  if (colCount * rowCount > 1) {
    labelText += `   |   Page ${col + 1}/${row + 1} of ${colCount * rowCount}`;
  }

  const textY = pageH - MARGIN - 3;
  const textX = pageW / 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  const textWidth = doc.getTextWidth(labelText);
  doc.text(labelText, textX, textY, { align: 'center' });

  // ── Calibration bar: a physical 25.4mm reference, placed to the left of
  //    the footer text so the printout can be verified for true 1:1 scale.
  const barMM = 25.4;
  const gap = 6;
  let barRightX = textX - textWidth / 2 - gap;
  let barLeftX = barRightX - barMM;
  if (barLeftX < MARGIN) {
    barLeftX = MARGIN;
    barRightX = barLeftX + barMM;
  }
  const barY = textY - 6;
  const tick = 1.5;

  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.5); // visually prominent (~2px) reference line
  doc.line(barLeftX, barY, barRightX, barY);
  doc.line(barLeftX, barY - tick, barLeftX, barY + tick);
  doc.line(barRightX, barY - tick, barRightX, barY + tick);

  doc.setFontSize(6);
  doc.setTextColor(20, 20, 20);
  doc.text('25.4mm', (barLeftX + barRightX) / 2, barY - tick - 1, { align: 'center' });
}

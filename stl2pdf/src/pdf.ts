import { jsPDF } from 'jspdf';
import type { SectionResult } from './section.js';
import type { CutPlane } from './geometry.js';

// Letter size in mm
const PAGE_W_MM = 215.9;
const PAGE_H_MM = 279.4;
const MARGIN_MM = 12;

/**
 * Generate an 8.5×11" PDF with a to-scale cross-section.
 * The cross-section is drawn at 1 mm = 1 mm (STL units assumed to be mm).
 * The section is centered on the page; if it's larger than the printable area
 * it is uniformly scaled down to fit.
 */
export function generateSectionPDF(section: SectionResult, plane: CutPlane): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const { contours, bounds } = section;

  if (!bounds || contours.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('No cross-section found at this plane.', PAGE_W_MM / 2, PAGE_H_MM / 2, {
      align: 'center',
    });
    return doc.output('blob');
  }

  const secW = bounds.maxX - bounds.minX;
  const secH = bounds.maxY - bounds.minY;

  const availW = PAGE_W_MM - 2 * MARGIN_MM;
  const availH = PAGE_H_MM - 2 * MARGIN_MM;

  // Scale factor: 1.0 means 1:1 (1 mm in STL = 1 mm on paper).
  // Scale down only if the section is larger than the available area.
  const scale = Math.min(1.0, availW / secW, availH / secH);

  const drawW = secW * scale;
  const drawH = secH * scale;

  // Top-left corner of the centred section on the page
  const originX = MARGIN_MM + (availW - drawW) / 2;
  const originY = MARGIN_MM + (availH - drawH) / 2;

  // Helper: convert section coords (mm) → page coords (mm)
  const px = (sx: number): number => originX + (sx - bounds.minX) * scale;
  const py = (sy: number): number => originY + (sy - bounds.minY) * scale;

  // ── Draw white background for the section area
  doc.setFillColor(255, 255, 255);
  doc.rect(originX, originY, drawW, drawH, 'F');

  // ── Fill interior (even-odd) with light gray, then stroke outlines.
  //    Use the jsPDF chaining API: moveTo → lineTo → close → fillStrokeEvenOdd.
  doc.setFillColor(210, 210, 210);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);

  for (const contour of contours) {
    if (contour.length < 2) continue;
    doc.moveTo(px(contour[0].x), py(contour[0].y));
    for (let i = 1; i < contour.length; i++) {
      doc.lineTo(px(contour[i].x), py(contour[i].y));
    }
    doc.close();
  }
  doc.fillStrokeEvenOdd();

  // ── Dimension labels
  const axisName = plane.axis.toUpperCase();
  const labelText = `Section at ${axisName} = ${plane.value.toFixed(2)} mm   |   `
    + `Width: ${secW.toFixed(1)} mm   Height: ${secH.toFixed(1)} mm`
    + (scale < 0.9999 ? `   |   Scale: 1:${(1 / scale).toFixed(2)}` : '   |   Scale: 1:1');

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(labelText, PAGE_W_MM / 2, PAGE_H_MM - MARGIN_MM / 2, { align: 'center' });

  // ── Border box around printable area
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.1);
  doc.rect(MARGIN_MM, MARGIN_MM, availW, availH, 'S');

  return doc.output('blob');
}

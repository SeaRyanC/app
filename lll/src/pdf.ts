/**
 * PDF generation for the Little League Lineup.
 * Produces a single landscape US Letter PDF with two side-by-side tables:
 *   Left  — Player × Inning table (with IF/OF/Off summary columns)
 *   Right — Position × Inning table (infield, OF, Off)
 */

import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';
import type { Schedule, Position } from './scheduler.js';
import { INFIELD_POSITIONS, OUTFIELD_POSITIONS } from './scheduler.js';

// US Letter landscape: 11 × 8.5 inches at 72 pt/in
const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const MARGIN = 36;
const USABLE_W = PAGE_WIDTH - MARGIN * 2;
const USABLE_H = PAGE_HEIGHT - MARGIN * 2;
const TABLE_GAP = 16; // gap between the two side-by-side tables

export interface LineupPDFData {
    players: string[];  // in batting order
    schedule: Schedule;
    numInnings: number;
}

export function printLineupPDF(data: LineupPDFData): void {
    generateLineupPDF(data)
        .then(blob => {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        })
        .catch(err => {
            console.error('PDF generation failed', err);
        });
}

function generateLineupPDF(data: LineupPDFData): Promise<Blob> {
    return new Promise((resolve, reject) => {
        try {
            const { players, schedule, numInnings } = data;
            const innings = Array.from({ length: numInnings }, (_, i) => i);

            const doc = new PDFDocument({
                size: [PAGE_WIDTH, PAGE_HEIGHT],
                margin: MARGIN,
                autoFirstPage: false,
            });
            const stream = doc.pipe(blobStream());

            // ── Single page: left = Player × Inning, right = Position × Inning ──
            doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT], margin: MARGIN });

            // ── Left table: Player × Inning ──────────────────────────────────────
            // Column layout:  # | playerName | inn1 … innN | IF | OF | Off
            const batColW = 18;
            const summaryColW = 26;
            const numSummaryCols = 3;

            // Position table (right): pos col + N inning cols
            interface PosRowDef { label: string; pos: Position; index: number; }
            const posRowDefs: PosRowDef[] = [
                ...(['P', 'C', '1B', '2B', '3B', 'SS'] as Position[])
                    .map(p => ({ label: p, pos: p, index: 0 })),
                { label: 'OF', pos: 'OF' as Position, index: 0 },
                { label: 'OF', pos: 'OF' as Position, index: 1 },
                { label: 'OF', pos: 'OF' as Position, index: 2 },
                { label: 'Off', pos: 'Off' as Position, index: 0 },
            ];

            const posLabelColW = 32;

            // Solve for a shared inning column width that fills the usable width:
            //   leftFixedW  = batColW + nameColW + numSummaryCols * summaryColW
            //   rightFixedW = posLabelColW
            //   totalFixed  = leftFixedW + rightFixedW + TABLE_GAP
            //   sharedInnW  = (USABLE_W - totalFixed) / (2 * numInnings)
            // nameColW is the larger of a minimum or 14 % of usable width, capped at 90.
            const nameColW = Math.min(90, Math.max(55, USABLE_W * 0.14));
            const leftFixedW = batColW + nameColW + numSummaryCols * summaryColW;
            const rightFixedW = posLabelColW;
            const sharedInnW = (USABLE_W - leftFixedW - rightFixedW - TABLE_GAP) / (2 * numInnings);

            // Row geometry — both tables share the same rowH / fontSize
            const rowCount = Math.max(players.length, posRowDefs.length) + 1; // +1 header
            const rowH = USABLE_H / rowCount;
            const fontSize = Math.min(14, rowH * 0.55);

            // Left table origin
            const leftX = MARGIN;
            const batX = leftX;
            const nameX = leftX + batColW;
            const colX = (col: number): number => nameX + nameColW + col * sharedInnW;
            const summaryX = (idx: number): number =>
                nameX + nameColW + numInnings * sharedInnW + idx * summaryColW;
            const leftTableW = batColW + nameColW + numInnings * sharedInnW + numSummaryCols * summaryColW;

            // Right table origin
            const rightX = leftX + leftTableW + TABLE_GAP;
            const posColX2 = (col: number): number => rightX + posLabelColW + col * sharedInnW;

            const tableTop = MARGIN;

            // ── Left header ──
            let y = tableTop;
            doc.fontSize(fontSize).font('Helvetica-Bold').fillColor('#333333');
            drawCell(doc, '#', batX, y, batColW, rowH, 'center');
            drawCell(doc, 'Player', nameX, y, nameColW, rowH, 'left');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX(i), y, sharedInnW, rowH, 'center');
            }
            drawCell(doc, 'IF', summaryX(0), y, summaryColW, rowH, 'center');
            drawCell(doc, 'OF', summaryX(1), y, summaryColW, rowH, 'center');
            drawCell(doc, 'Off', summaryX(2), y, summaryColW, rowH, 'center');

            // ── Right header ──
            drawCell(doc, 'Pos', rightX, y, posLabelColW, rowH, 'left');
            for (const i of innings) {
                drawCell(doc, String(i + 1), posColX2(i), y, sharedInnW, rowH, 'center');
            }
            y += rowH;

            // ── Left data rows ──
            doc.font('Helvetica');
            players.forEach((player, idx) => {
                let ifCount = 0, ofCount = 0, offCount = 0;
                for (const i of innings) {
                    const pos = schedule[i]?.[player];
                    if (pos && INFIELD_POSITIONS.has(pos)) ifCount++;
                    else if (pos && OUTFIELD_POSITIONS.has(pos)) ofCount++;
                    else if (pos && pos === 'Off') offCount++;
                }

                if (idx % 2 === 1) {
                    doc.rect(batX, y, leftTableW, rowH).fillColor('#f0f0f0').fill();
                }
                doc.fillColor('#111111');
                drawCell(doc, String(idx + 1), batX, y, batColW, rowH, 'center');
                drawCell(doc, player, nameX, y, nameColW, rowH, 'left');
                for (const i of innings) {
                    const pos = schedule[i]?.[player] ?? '—';
                    drawCell(doc, pos, colX(i), y, sharedInnW, rowH, 'center');
                }
                doc.fillColor('#333366');
                drawCell(doc, String(ifCount), summaryX(0), y, summaryColW, rowH, 'center');
                drawCell(doc, String(ofCount), summaryX(1), y, summaryColW, rowH, 'center');
                drawCell(doc, String(offCount), summaryX(2), y, summaryColW, rowH, 'center');
                y += rowH;
            });

            // ── Right data rows (reset y to after header) ──
            const rightTableW = posLabelColW + numInnings * sharedInnW;
            let y2 = tableTop + rowH;
            doc.font('Helvetica').fillColor('#111111');
            posRowDefs.forEach((rowDef, rowIdx) => {
                if (rowIdx % 2 === 1) {
                    doc.rect(rightX, y2, rightTableW, rowH).fillColor('#f0f0f0').fill();
                }
                doc.fillColor('#111111');
                drawCell(doc, rowDef.label, rightX, y2, posLabelColW, rowH, 'left');
                for (const i of innings) {
                    const inningData = schedule[i];
                    const names = inningData
                        ? Object.entries(inningData)
                            .filter(([, p]) => p === rowDef.pos)
                            .map(([n]) => n)
                        : [];
                    const name = names[rowDef.index] ?? '—';
                    drawCell(doc, name, posColX2(i), y2, sharedInnW, rowH, 'center');
                }
                y2 += rowH;
            });

            doc.end();
            stream.on('finish', () => resolve(stream.toBlob('application/pdf')));
            stream.on('error', reject);
        } catch (err) {
            reject(err);
        }
    });
}

function drawCell(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc: any,
    text: string,
    x: number,
    y: number,
    w: number,
    h: number,
    align: 'left' | 'center',
): void {
    doc.rect(x, y, w, h).lineWidth(0.4).strokeColor('#cccccc').stroke();

    const pad = 3;
    const textW = w - pad * 2;
    const textH = doc.currentLineHeight();
    const ty = y + (h - textH) / 2;
    doc.text(text, x + pad, ty, {
        width: textW,
        align,
        lineBreak: false,
        ellipsis: true,
    });
}

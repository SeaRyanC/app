/**
 * PDF generation for the Little League Lineup.
 * Produces a two-page landscape US Letter PDF:
 *   Page 1 — Player × Inning table (with IF/OF/Off summary columns)
 *   Page 2 — Position × Inning table (infield, OF, Off)
 */

import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';
import type { Schedule } from './scheduler.js';
import { FIELD_POSITIONS, INFIELD_POSITIONS, OUTFIELD_POSITIONS } from './scheduler.js';

// US Letter landscape: 11 × 8.5 inches at 72 pt/in
const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const MARGIN = 72;
const USABLE_W = PAGE_WIDTH - MARGIN * 2;
const USABLE_H = PAGE_HEIGHT - MARGIN * 2;

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

            // ── Page 1: Player × Inning ──────────────────────────────────────────
            doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT], margin: MARGIN });

            const tableTop = MARGIN;

            // Column layout:  # | playerName | inn1 … innN | IF | OF | Off
            const batColW = 18;
            const summaryColW = 28;
            const numSummaryCols = 3;
            const nameColW = Math.min(110, Math.max(60, USABLE_W * 0.13));
            const availForInnings = USABLE_W - batColW - nameColW - summaryColW * numSummaryCols;
            const innColW = availForInnings / numInnings;
            const rowCount = players.length + 1; // +1 header
            const tableH = USABLE_H - (tableTop - MARGIN);
            const rowH = Math.min(32, tableH / rowCount);
            const fontSize = Math.min(16, rowH * 0.55);

            const batX = MARGIN;
            const nameX = MARGIN + batColW;
            const colX = (col: number): number => nameX + nameColW + (col) * innColW;
            const summaryX = (idx: number): number =>
                nameX + nameColW + numInnings * innColW + idx * summaryColW;

            // Header row
            let y = tableTop;
            doc.fontSize(fontSize).font('Helvetica-Bold').fillColor('#333333');
            drawCell(doc, '#', batX, y, batColW, rowH, 'center');
            drawCell(doc, 'Player', nameX, y, nameColW, rowH, 'left');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX(i), y, innColW, rowH, 'center');
            }
            drawCell(doc, 'IF', summaryX(0), y, summaryColW, rowH, 'center');
            drawCell(doc, 'OF', summaryX(1), y, summaryColW, rowH, 'center');
            drawCell(doc, 'Off', summaryX(2), y, summaryColW, rowH, 'center');
            y += rowH;

            // Player rows (in batting order)
            doc.font('Helvetica');
            players.forEach((player, idx) => {
                let ifCount = 0, ofCount = 0, offCount = 0;
                for (const i of innings) {
                    const pos = schedule[i]?.[player];
                    if (pos && INFIELD_POSITIONS.has(pos)) ifCount++;
                    else if (pos && OUTFIELD_POSITIONS.has(pos)) ofCount++;
                    else if (pos && pos === 'Off') offCount++;
                }

                doc.fillColor('#111111');
                drawCell(doc, String(idx + 1), batX, y, batColW, rowH, 'center');
                drawCell(doc, player, nameX, y, nameColW, rowH, 'left');
                for (const i of innings) {
                    const pos = schedule[i]?.[player] ?? '—';
                    drawCell(doc, pos, colX(i), y, innColW, rowH, 'center');
                }
                doc.fillColor('#333366');
                drawCell(doc, String(ifCount), summaryX(0), y, summaryColW, rowH, 'center');
                drawCell(doc, String(ofCount), summaryX(1), y, summaryColW, rowH, 'center');
                drawCell(doc, String(offCount), summaryX(2), y, summaryColW, rowH, 'center');
                y += rowH;
            });

            // ── Page 2: Position × Inning ────────────────────────────────────────
            doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT], margin: MARGIN });

            // Rows: all field positions + Off bench
            const posRows = [...FIELD_POSITIONS, 'Off' as const];
            const tableTop2 = MARGIN;
            const posColW = Math.min(50, USABLE_W * 0.08);
            const innColW2 = (USABLE_W - posColW) / numInnings;
            const rowCount2 = posRows.length + 1;
            const rowH2 = Math.min(40, (USABLE_H - (tableTop2 - MARGIN)) / rowCount2);
            const fontSize2 = Math.min(16, rowH2 * 0.55);
            const colX2 = (col: number): number =>
                MARGIN + posColW + col * innColW2;

            let y2 = tableTop2;
            doc.fontSize(fontSize2).font('Helvetica-Bold').fillColor('#333333');
            drawCell(doc, 'Position', MARGIN, y2, posColW, rowH2, 'left');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX2(i), y2, innColW2, rowH2, 'center');
            }
            y2 += rowH2;

            doc.font('Helvetica').fillColor('#111111');
            for (const pos of posRows) {
                drawCell(doc, pos, MARGIN, y2, posColW, rowH2, 'left');
                for (const i of innings) {
                    const inningData = schedule[i];
                    // OF can have multiple players; others have at most one
                    const names = inningData
                        ? Object.entries(inningData)
                            .filter(([, p]) => p === pos)
                            .map(([n]) => n)
                            .join(', ')
                        : '—';
                    drawCell(doc, names || '—', colX2(i), y2, innColW2, rowH2, 'center');
                }
                y2 += rowH2;
            }

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

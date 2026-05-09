/**
 * PDF generation for the Little League Lineup.
 * Produces a two-page landscape US Letter PDF:
 *   Page 1 — Player × Inning table (with IF/OF/Off summary columns)
 *   Page 2 — Position × Inning table (infield, OF slots, bench slots)
 */

import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';
import type { Schedule } from './scheduler.js';
import { FIELD_POSITIONS, INFIELD_POSITIONS, OUTFIELD_POSITIONS, OF_CAPACITY } from './scheduler.js';

// US Letter landscape: 11 × 8.5 inches at 72 pt/in
const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const MARGIN = 72;
const USABLE_W = PAGE_WIDTH - MARGIN * 2;
const USABLE_H = PAGE_HEIGHT - MARGIN * 2;
const SMALL_PADDING = 8;

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
            const summaryColW = 36;
            const numSummaryCols = 3;
            const nameColW = Math.min(110, Math.max(60, USABLE_W * 0.13));
            const availForInnings = USABLE_W - batColW - nameColW - summaryColW * numSummaryCols;
            const innColW = availForInnings / numInnings;
            const rowCount = players.length + 1; // +1 header
            const tableH = USABLE_H - (tableTop - MARGIN);
            const rowH = Math.min(32, tableH / rowCount);
            const fontSize = Math.min(16, rowH * 0.55);

            const nameX = MARGIN + batColW;
            const colX = (col: number): number => nameX + nameColW + (col) * innColW;
            const summaryX = (idx: number): number =>
                nameX + nameColW + numInnings * innColW + idx * summaryColW;

            // Header row
            let y = tableTop;
            doc.fontSize(fontSize).font('Helvetica-Bold').fillColor('#333333');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX(i), y, innColW, rowH, 'center');
            }
            drawCell(doc, 'IF', summaryX(0), y, summaryColW, rowH, 'center');
            drawCell(doc, 'OF', summaryX(1), y, summaryColW, rowH, 'center');
            drawCell(doc, 'B', summaryX(2), y, summaryColW, rowH, 'center');
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
                // Background for alternating rows
                if (idx % 2 === 1) {
                    doc.rect(nameX, y, USABLE_W - batColW, rowH).fill('#e8e8e8');
                }

                doc.fillColor('#000000');
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

            const benchPlayersByInning = innings.map(i => {
                const inningData = schedule[i];
                return inningData
                    ? players.filter(player => inningData[player] === 'Off')
                    : [];
            });
            const benchRowCount = Math.max(1, ...benchPlayersByInning.map(benchPlayers => benchPlayers.length));

            // ── Page 2: Position × Inning ────────────────────────────────────────
            doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT], margin: MARGIN });

            // Rows: infield positions + one row per OF slot + one row per bench slot
            const infieldRows = FIELD_POSITIONS.filter(p => p !== 'OF');
            const tableTop2 = MARGIN;
            const posColW = Math.max(65, USABLE_W * 0.08);
            const innColW2 = (USABLE_W - posColW) / numInnings;
            const rowCount2 = infieldRows.length + OF_CAPACITY + benchRowCount + 1; // +1 header
            const rowH2 = Math.min(40, (USABLE_H - (tableTop2 - MARGIN)) / rowCount2);
            const fontSize2 = Math.min(16, rowH2 * 0.55);
            const colX2 = (col: number): number =>
                MARGIN + posColW + col * innColW2;

            let y2 = tableTop2;
            doc.fontSize(fontSize2).font('Helvetica-Bold').fillColor('#333333');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX2(i), y2, innColW2, rowH2, 'center');
            }
            y2 += rowH2;

            doc.font('Helvetica').fillColor('#111111');
            // Infield positions — one row each
            for (const pos of infieldRows) {
                drawCell(doc, pos, MARGIN, y2, posColW, rowH2, 'center');
                for (const i of innings) {
                    const inningData = schedule[i];
                    const name = inningData
                        ? Object.entries(inningData).find(([, p]) => p === pos)?.[0]
                        : undefined;
                    drawCell(doc, name ?? '—', colX2(i), y2, innColW2, rowH2, 'center');
                }
                y2 += rowH2;
            }
            // OF — one row per slot, in batting order
            for (let slot = 0; slot < OF_CAPACITY; slot++) {
                drawCell(doc, 'OF', MARGIN, y2, posColW, rowH2, 'center');
                for (const i of innings) {
                    const inningData = schedule[i];
                    const ofPlayers = inningData
                        ? players.filter(p => inningData[p] === 'OF')
                        : [];
                    drawCell(doc, ofPlayers[slot] ?? '—', colX2(i), y2, innColW2, rowH2, 'center');
                }
                y2 += rowH2;
            }
            // Bench — one row per slot, in batting order
            for (let slot = 0; slot < benchRowCount; slot++) {
                drawCell(doc, 'B', MARGIN, y2, posColW, rowH2, 'center');
                for (const i of innings) {
                    drawCell(doc, benchPlayersByInning[i]?.[slot] ?? '—', colX2(i), y2, innColW2, rowH2, 'center');
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

    const textW = w;
    const textH = doc.currentLineHeight();
    const ty = y + (h - textH) / 2;
    doc.save();
    doc.rect(x, y, w, h).clip();
    if (align === 'center') {
        doc.text(text, x, ty, {
            width: w,
            align,
            lineBreak: false,
        });
    } else /* left */ {
        doc.text(text, x + SMALL_PADDING, ty, {
            width: textW,
            align,
            lineBreak: false,
        });
    }
    doc.restore();
}

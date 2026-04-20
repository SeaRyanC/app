/**
 * PDF generation for the Little League Lineup.
 * Produces a two-page landscape US Letter PDF:
 *   Page 1 — Player × Inning table (with IF/OF/Off summary columns)
 *   Page 2 — Position × Inning table
 */

import PDFDocument from 'pdfkit-browserify';
import blobStream from 'blob-stream';
import type { Schedule } from './scheduler.js';
import { FIELD_POSITIONS, INFIELD_POSITIONS, OUTFIELD_POSITIONS } from './scheduler.js';

// US Letter landscape: 11 × 8.5 inches at 72 pt/in
const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const MARGIN = 36;
const USABLE_W = PAGE_WIDTH - MARGIN * 2;
const USABLE_H = PAGE_HEIGHT - MARGIN * 2;

export interface LineupPDFData {
    players: string[];
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

            doc.fontSize(14).font('Helvetica-Bold');
            doc.text('⚾ Little League Lineup — By Player', MARGIN, MARGIN, {
                width: USABLE_W,
                align: 'center',
            });

            const titleH = 22;
            const tableTop = MARGIN + titleH + 4;

            // Column layout:  playerName | inn1 … innN | IF | OF | Off
            const summaryColW = 28;
            const numSummaryCols = 3;
            const nameColW = Math.min(110, Math.max(60, USABLE_W * 0.14));
            const availForInnings = USABLE_W - nameColW - summaryColW * numSummaryCols;
            const innColW = availForInnings / numInnings;
            const rowCount = players.length + 1; // +1 header
            const tableH = USABLE_H - (tableTop - MARGIN);
            const rowH = Math.min(20, tableH / rowCount);
            const fontSize = Math.min(9, rowH * 0.6);

            const colX = (col: number): number => {
                if (col === 0) return MARGIN;
                return MARGIN + nameColW + (col - 1) * innColW;
            };
            const summaryX = (idx: number): number =>
                MARGIN + nameColW + numInnings * innColW + idx * summaryColW;

            // Header row
            let y = tableTop;
            doc.fontSize(fontSize).font('Helvetica-Bold').fillColor('#333333');
            drawCell(doc, 'Player', MARGIN, y, nameColW, rowH, 'left');
            for (const i of innings) {
                drawCell(doc, String(i + 1), colX(i + 1), y, innColW, rowH, 'center');
            }
            drawCell(doc, 'IF', summaryX(0), y, summaryColW, rowH, 'center');
            drawCell(doc, 'OF', summaryX(1), y, summaryColW, rowH, 'center');
            drawCell(doc, 'Off', summaryX(2), y, summaryColW, rowH, 'center');
            y += rowH;

            // Player rows
            doc.font('Helvetica');
            for (const player of players) {
                let ifCount = 0, ofCount = 0, offCount = 0;
                for (const i of innings) {
                    const pos = schedule[i]?.[player];
                    if (pos && INFIELD_POSITIONS.has(pos)) ifCount++;
                    else if (pos && OUTFIELD_POSITIONS.has(pos)) ofCount++;
                    else if (pos === 'Off') offCount++;
                }

                doc.fillColor('#111111');
                drawCell(doc, player, MARGIN, y, nameColW, rowH, 'left');
                for (const i of innings) {
                    const pos = schedule[i]?.[player] ?? '—';
                    const isOff = pos === 'Off';
                    if (isOff) {
                        doc.rect(colX(i + 1), y, innColW, rowH).fillColor('#f0f0f0').fill();
                        doc.fillColor('#888888');
                        drawCell(doc, pos, colX(i + 1), y, innColW, rowH, 'center');
                        doc.fillColor('#111111');
                    } else {
                        drawCell(doc, pos, colX(i + 1), y, innColW, rowH, 'center');
                    }
                }
                doc.fillColor('#333366');
                drawCell(doc, String(ifCount), summaryX(0), y, summaryColW, rowH, 'center');
                drawCell(doc, String(ofCount), summaryX(1), y, summaryColW, rowH, 'center');
                drawCell(doc, String(offCount), summaryX(2), y, summaryColW, rowH, 'center');
                y += rowH;
            }

            // ── Page 2: Position × Inning ────────────────────────────────────────
            doc.addPage({ size: [PAGE_WIDTH, PAGE_HEIGHT], margin: MARGIN });

            doc.fontSize(14).font('Helvetica-Bold').fillColor('#111111');
            doc.text('⚾ Little League Lineup — By Position', MARGIN, MARGIN, {
                width: USABLE_W,
                align: 'center',
            });

            const tableTop2 = MARGIN + titleH + 4;
            const posColW = Math.min(50, USABLE_W * 0.08);
            const innColW2 = (USABLE_W - posColW) / numInnings;
            const rowCount2 = FIELD_POSITIONS.length + 1;
            const rowH2 = Math.min(24, (USABLE_H - (tableTop2 - MARGIN)) / rowCount2);
            const fontSize2 = Math.min(9, rowH2 * 0.6);
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
            for (const pos of FIELD_POSITIONS) {
                drawCell(doc, pos, MARGIN, y2, posColW, rowH2, 'left');
                for (const i of innings) {
                    const inningData = schedule[i];
                    const name = inningData
                        ? (Object.entries(inningData).find(([, p]) => p === pos)?.[0] ?? '—')
                        : '—';
                    drawCell(doc, name, colX2(i), y2, innColW2, rowH2, 'center');
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

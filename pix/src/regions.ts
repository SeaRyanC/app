/**
 * Region detection and shape analysis
 */

import { RGB, medianColor } from './colors.js';
import { FloodFillResult, getPixel } from './floodFill.js';

/**
 * Minimum fill ratio for a cell to be considered "filled" in the shape mask.
 * A cell is filled if more than this fraction of its area has flood-fill pixels.
 */
const CELL_FILL_THRESHOLD = 0.5;

export interface Region {
  id: string;
  pixels: Set<string>;
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  color: RGB;
  gridX: number;
  gridY: number;
  gridWidth: number;
  gridHeight: number;
  /** 
   * Shape mask: a 2D boolean array [row][col] indicating which cells within the
   * gridWidth × gridHeight rectangle are actually filled. If a cell is false,
   * it should not contribute to output pixels.
   * Row-major: shapeMask[y][x] where 0 <= y < gridHeight and 0 <= x < gridWidth.
   */
  shapeMask: boolean[][];
  /**
   * Cell colors: a 2D array of RGB values for each cell in the shape.
   * cellColors[y][x] contains the sampled color for that specific cell.
   * Only valid when shapeMask[y][x] is true.
   */
  cellColors: (RGB | null)[][];
}

export interface RegionCandidate {
  gridWidth: number;
  gridHeight: number;
  score: number;
  previewPixels: Array<{ x: number; y: number }>;
  /** 
   * Shape mask: a 2D boolean array [row][col] indicating which cells are filled.
   * Row-major: shapeMask[y][x] where 0 <= y < gridHeight and 0 <= x < gridWidth.
   */
  shapeMask: boolean[][];
  /**
   * Cell colors: a 2D array of RGB values for each filled cell.
   * cellColors[y][x] contains the sampled color for that cell.
   */
  cellColors: (RGB | null)[][];
}

/**
 * Analyze a flood fill result and determine possible grid shapes
 */
export function analyzeRegionShape(result: FloodFillResult, imageData: ImageData): RegionCandidate[] {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const aspectRatio = width / height;
  const pixelCount = pixels.size;
  
  // Calculate fill density
  const area = width * height;
  const density = pixelCount / area;

  const candidates: RegionCandidate[] = [];

  // Generate candidate shapes based on aspect ratio
  // For a roughly square region, candidates are 1x1, 2x2, 3x3, 4x4
  // For elongated regions, consider the aspect ratio
  
  const possibleShapes: Array<[number, number]> = [];
  
  if (aspectRatio >= 0.7 && aspectRatio <= 1.4) {
    // Roughly square
    possibleShapes.push([1, 1], [2, 2], [3, 3], [4, 4]);
  } else if (aspectRatio > 1.4) {
    // Wider than tall
    const ratio = Math.round(aspectRatio);
    possibleShapes.push([1, 1]);
    for (let w = 2; w <= Math.min(8, ratio + 2); w++) {
      for (let h = 1; h <= Math.min(4, w); h++) {
        if (Math.abs(w / h - aspectRatio) < 1) {
          possibleShapes.push([w, h]);
        }
      }
    }
  } else {
    // Taller than wide
    const ratio = Math.round(1 / aspectRatio);
    possibleShapes.push([1, 1]);
    for (let h = 2; h <= Math.min(8, ratio + 2); h++) {
      for (let w = 1; w <= Math.min(4, h); w++) {
        if (Math.abs(w / h - aspectRatio) < 1) {
          possibleShapes.push([w, h]);
        }
      }
    }
  }

  // Score each candidate shape
  for (const [gw, gh] of possibleShapes) {
    const expectedAspect = gw / gh;
    const aspectScore = 1 - Math.abs(aspectRatio - expectedAspect) / Math.max(aspectRatio, expectedAspect);
    
    // Check if density is consistent with a solid block
    const densityScore = density > 0.5 ? 1 : density * 2;
    
    // Calculate shape mask and cell colors
    const { shapeMask, cellColors, filledCellCount } = computeShapeMaskAndColors(result, imageData, gw, gh);
    
    // Score based on how well the shape mask matches expectations
    const expectedFilledCells = gw * gh;
    const fillRatio = filledCellCount / expectedFilledCells;
    
    // Check rectangularity - now we use the shape mask
    const rectangularityScore = calculateRectangularityWithMask(result, gw, gh, shapeMask);
    
    const score = (aspectScore * 0.4 + densityScore * 0.3 + rectangularityScore * 0.3) * fillRatio;

    // Generate preview pixels for this candidate
    const previewPixels: Array<{ x: number; y: number }> = [];
    const cellW = width / gw;
    const cellH = height / gh;
    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        previewPixels.push({
          x: bounds.minX + Math.floor(cellW * (gx + 0.5)),
          y: bounds.minY + Math.floor(cellH * (gy + 0.5))
        });
      }
    }

    candidates.push({
      gridWidth: gw,
      gridHeight: gh,
      score,
      previewPixels,
      shapeMask,
      cellColors
    });
  }

  // Sort by score descending and take top 4 unique shapes
  candidates.sort((a, b) => b.score - a.score);
  const unique: RegionCandidate[] = [];
  const seen = new Set<string>();
  for (const c of candidates) {
    const key = `${c.gridWidth}x${c.gridHeight}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(c);
      if (unique.length >= 4) break;
    }
  }

  return unique;
}

/**
 * Calculate rectangularity considering the shape mask
 */
function calculateRectangularityWithMask(result: FloodFillResult, gw: number, gh: number, shapeMask: boolean[][]): number {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const cellW = width / gw;
  const cellH = height / gh;
  
  let totalExpectedPixels = 0;
  let actualFilledPixels = 0;

  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      // Only consider cells that are in the shape mask
      if (!shapeMask[gy][gx]) continue;
      
      const cellMinX = Math.floor(bounds.minX + cellW * gx);
      const cellMaxX = Math.floor(bounds.minX + cellW * (gx + 1));
      const cellMinY = Math.floor(bounds.minY + cellH * gy);
      const cellMaxY = Math.floor(bounds.minY + cellH * (gy + 1));
      
      let cellPixels = 0;
      const cellArea = (cellMaxX - cellMinX) * (cellMaxY - cellMinY);
      
      for (let y = cellMinY; y < cellMaxY; y++) {
        for (let x = cellMinX; x < cellMaxX; x++) {
          if (pixels.has(`${x},${y}`)) {
            cellPixels++;
          }
        }
      }
      
      totalExpectedPixels += cellArea;
      actualFilledPixels += cellPixels;
    }
  }

  if (totalExpectedPixels === 0) return 0;
  return actualFilledPixels / totalExpectedPixels;
}

/**
 * Compute shape mask and per-cell colors for a given grid size
 * A cell is considered "filled" if more than 50% of its pixels are in the flood fill result
 */
function computeShapeMaskAndColors(
  result: FloodFillResult,
  imageData: ImageData,
  gw: number,
  gh: number
): { shapeMask: boolean[][]; cellColors: (RGB | null)[][]; filledCellCount: number } {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const cellW = width / gw;
  const cellH = height / gh;
  
  const shapeMask: boolean[][] = [];
  const cellColors: (RGB | null)[][] = [];
  let filledCellCount = 0;

  for (let gy = 0; gy < gh; gy++) {
    shapeMask[gy] = [];
    cellColors[gy] = [];
    
    for (let gx = 0; gx < gw; gx++) {
      const cellMinX = Math.floor(bounds.minX + cellW * gx);
      const cellMaxX = Math.floor(bounds.minX + cellW * (gx + 1));
      const cellMinY = Math.floor(bounds.minY + cellH * gy);
      const cellMaxY = Math.floor(bounds.minY + cellH * (gy + 1));
      
      let cellPixels = 0;
      const cellArea = (cellMaxX - cellMinX) * (cellMaxY - cellMinY);
      const colorSamples: RGB[] = [];
      
      for (let y = cellMinY; y < cellMaxY; y++) {
        for (let x = cellMinX; x < cellMaxX; x++) {
          if (pixels.has(`${x},${y}`)) {
            cellPixels++;
            // Sample the color from the image
            colorSamples.push(getPixel(imageData, x, y));
          }
        }
      }
      
      // Cell is filled if more than CELL_FILL_THRESHOLD of its area has flood-fill pixels
      const isFilled = cellPixels > cellArea * CELL_FILL_THRESHOLD;
      shapeMask[gy][gx] = isFilled;
      
      if (isFilled) {
        filledCellCount++;
        // Use median color of the filled pixels in this cell
        cellColors[gy][gx] = colorSamples.length > 0 ? medianColor(colorSamples) : null;
      } else {
        cellColors[gy][gx] = null;
      }
    }
  }

  return { shapeMask, cellColors, filledCellCount };
}

/**
 * Create a region from a flood fill result and chosen candidate
 */
export function createRegion(
  result: FloodFillResult,
  candidate: RegionCandidate
): Region {
  return {
    id: crypto.randomUUID(),
    pixels: result.pixels,
    bounds: result.bounds,
    color: result.color,
    gridX: 0, // Will be set by grid inference
    gridY: 0,
    gridWidth: candidate.gridWidth,
    gridHeight: candidate.gridHeight,
    shapeMask: candidate.shapeMask,
    cellColors: candidate.cellColors
  };
}

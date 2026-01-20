/**
 * Region detection and shape analysis
 */

import { RGB } from './colors.js';
import { FloodFillResult } from './floodFill.js';

export interface Region {
  id: string;
  pixels: Set<string>;
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  color: RGB;
  gridX: number;
  gridY: number;
  gridWidth: number;
  gridHeight: number;
}

export interface RegionCandidate {
  gridWidth: number;
  gridHeight: number;
  score: number;
  previewPixels: Array<{ x: number; y: number }>;
}

/**
 * Analyze a flood fill result and determine possible grid shapes
 */
export function analyzeRegionShape(result: FloodFillResult): RegionCandidate[] {
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
    
    // Check rectangularity
    const rectangularityScore = calculateRectangularity(result, gw, gh);
    
    const score = (aspectScore * 0.4 + densityScore * 0.3 + rectangularityScore * 0.3);

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
      previewPixels
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
 * Calculate how rectangular a region is for a given grid shape
 */
function calculateRectangularity(result: FloodFillResult, gw: number, gh: number): number {
  const { bounds, pixels } = result;
  const width = bounds.maxX - bounds.minX + 1;
  const height = bounds.maxY - bounds.minY + 1;
  const cellW = width / gw;
  const cellH = height / gh;
  
  let totalExpectedPixels = 0;
  let actualFilledPixels = 0;

  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
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
      
      if (cellPixels > cellArea * 0.5) {
        totalExpectedPixels += cellArea;
        actualFilledPixels += cellPixels;
      }
    }
  }

  if (totalExpectedPixels === 0) return 0;
  return actualFilledPixels / totalExpectedPixels;
}

/**
 * Create a region from a flood fill result and chosen shape
 */
export function createRegion(
  result: FloodFillResult,
  gridWidth: number,
  gridHeight: number
): Region {
  return {
    id: crypto.randomUUID(),
    pixels: result.pixels,
    bounds: result.bounds,
    color: result.color,
    gridX: 0, // Will be set by grid inference
    gridY: 0,
    gridWidth,
    gridHeight
  };
}

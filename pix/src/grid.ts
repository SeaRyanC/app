/**
 * Grid inference from known regions
 * 
 * Uses a nonuniform grid that interpolates/extrapolates pixel locations
 * based on existing centroids from known regions, rather than assuming
 * uniform spacing throughout the image.
 */

import { Region } from './regions.js';
import { RGB } from './colors.js';
import { getPixel } from './floodFill.js';

export interface Grid {
  // Pixel pitch (average size of one output pixel in input image coordinates)
  // Used for fallback and as a reference scale
  pitchX: number;
  pitchY: number;
  // Offset (position of first pixel center in input image)
  offsetX: number;
  offsetY: number;
  // Output dimensions
  width: number;
  height: number;
  // Nonuniform grid mappings: maps grid coordinate to pixel center coordinate
  // xPositions[i] = pixel X coordinate of the center of cell at grid column i
  // yPositions[i] = pixel Y coordinate of the center of cell at grid row i
  xPositions: number[];
  yPositions: number[];
}

export interface GridInferenceResult {
  grid: Grid | null;
  confidence: number;
}

/**
 * A control point mapping grid coordinate to pixel coordinate
 */
interface ControlPoint {
  gridPos: number;
  pixelPos: number;
}

/**
 * Build an array of pixel positions for each grid coordinate using
 * linear interpolation/extrapolation from control points.
 */
function buildNonuniformPositions(
  controlPoints: ControlPoint[],
  gridSize: number,
  fallbackPitch: number,
  fallbackOffset: number
): number[] {
  if (controlPoints.length === 0) {
    // Fallback to uniform grid
    const positions: number[] = [];
    for (let i = 0; i < gridSize; i++) {
      positions.push(fallbackOffset + i * fallbackPitch);
    }
    return positions;
  }

  // Sort control points by grid position
  const sorted = [...controlPoints].sort((a, b) => a.gridPos - b.gridPos);

  // Remove duplicates by averaging pixel positions for same grid position
  const merged: ControlPoint[] = [];
  for (const cp of sorted) {
    if (merged.length > 0 && Math.abs(merged[merged.length - 1].gridPos - cp.gridPos) < 0.5) {
      // Average with existing point
      const last = merged[merged.length - 1];
      last.pixelPos = (last.pixelPos + cp.pixelPos) / 2;
      last.gridPos = (last.gridPos + cp.gridPos) / 2;
    } else {
      merged.push({ ...cp });
    }
  }

  const positions: number[] = [];
  
  for (let i = 0; i < gridSize; i++) {
    const gridPos = i;
    
    // Find surrounding control points
    let lower: ControlPoint | null = null;
    let upper: ControlPoint | null = null;
    
    for (const cp of merged) {
      if (cp.gridPos <= gridPos) {
        if (!lower || cp.gridPos > lower.gridPos) {
          lower = cp;
        }
      }
      if (cp.gridPos >= gridPos) {
        if (!upper || cp.gridPos < upper.gridPos) {
          upper = cp;
        }
      }
    }

    if (lower && upper && lower !== upper) {
      // Interpolate between two points
      const t = (gridPos - lower.gridPos) / (upper.gridPos - lower.gridPos);
      positions.push(lower.pixelPos + t * (upper.pixelPos - lower.pixelPos));
    } else if (lower && upper && lower === upper) {
      // Exact match
      positions.push(lower.pixelPos);
    } else if (lower) {
      // Extrapolate beyond the highest control point
      // Use the local pitch derived from the two highest points, or fallback
      const secondLower = merged.filter(cp => cp.gridPos < lower!.gridPos).pop();
      if (secondLower) {
        const localPitch = (lower.pixelPos - secondLower.pixelPos) / (lower.gridPos - secondLower.gridPos);
        positions.push(lower.pixelPos + (gridPos - lower.gridPos) * localPitch);
      } else {
        positions.push(lower.pixelPos + (gridPos - lower.gridPos) * fallbackPitch);
      }
    } else if (upper) {
      // Extrapolate below the lowest control point
      // Use the local pitch derived from the two lowest points, or fallback
      const secondUpper = merged.filter(cp => cp.gridPos > upper!.gridPos)[0];
      if (secondUpper) {
        const localPitch = (secondUpper.pixelPos - upper.pixelPos) / (secondUpper.gridPos - upper.gridPos);
        positions.push(upper.pixelPos + (gridPos - upper.gridPos) * localPitch);
      } else {
        positions.push(upper.pixelPos + (gridPos - upper.gridPos) * fallbackPitch);
      }
    } else {
      // No control points at all (shouldn't happen)
      positions.push(fallbackOffset + gridPos * fallbackPitch);
    }
  }

  return positions;
}

/**
 * Infer grid parameters from known regions using nonuniform interpolation
 */
export function inferGrid(
  regions: Region[],
  imageWidth: number,
  imageHeight: number
): GridInferenceResult {
  if (regions.length < 4) {
    return { grid: null, confidence: 0 };
  }

  // Calculate pitch estimates from each region
  const pitchSamples: { x: number; y: number }[] = [];
  
  for (const region of regions) {
    const pixelWidth = region.bounds.maxX - region.bounds.minX + 1;
    const pixelHeight = region.bounds.maxY - region.bounds.minY + 1;
    const estimatedPitchX = pixelWidth / region.gridWidth;
    const estimatedPitchY = pixelHeight / region.gridHeight;
    pitchSamples.push({ x: estimatedPitchX, y: estimatedPitchY });
  }

  // Calculate median pitch as fallback and for dimension calculation
  pitchSamples.sort((a, b) => a.x - b.x);
  const medianPitchX = pitchSamples[Math.floor(pitchSamples.length / 2)].x;
  
  pitchSamples.sort((a, b) => a.y - b.y);
  const medianPitchY = pitchSamples[Math.floor(pitchSamples.length / 2)].y;

  // Calculate initial grid positions for all regions using median pitch
  // This gives us a consistent coordinate system to assign grid positions
  const offsetXCandidates: number[] = [];
  const offsetYCandidates: number[] = [];
  
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    const offX = centerX % medianPitchX;
    const offY = centerY % medianPitchY;
    
    offsetXCandidates.push(offX);
    offsetYCandidates.push(offY);
  }

  offsetXCandidates.sort((a, b) => a - b);
  offsetYCandidates.sort((a, b) => a - b);
  const offsetX = offsetXCandidates[Math.floor(offsetXCandidates.length / 2)];
  const offsetY = offsetYCandidates[Math.floor(offsetYCandidates.length / 2)];

  // Calculate output dimensions
  const width = Math.ceil(imageWidth / medianPitchX);
  const height = Math.ceil(imageHeight / medianPitchY);

  // Assign grid positions to regions and collect control points
  const xControlPoints: ControlPoint[] = [];
  const yControlPoints: ControlPoint[] = [];

  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    // Calculate grid position based on median pitch/offset
    const gridX = Math.round((centerX - offsetX) / medianPitchX);
    const gridY = Math.round((centerY - offsetY) / medianPitchY);

    // For multi-cell regions, add control points for each cell's center
    const regionPitchX = (region.bounds.maxX - region.bounds.minX + 1) / region.gridWidth;
    const regionPitchY = (region.bounds.maxY - region.bounds.minY + 1) / region.gridHeight;
    
    for (let dx = 0; dx < region.gridWidth; dx++) {
      const cellCenterX = region.bounds.minX + (dx + 0.5) * regionPitchX;
      xControlPoints.push({
        gridPos: gridX + dx,
        pixelPos: cellCenterX
      });
    }
    
    for (let dy = 0; dy < region.gridHeight; dy++) {
      const cellCenterY = region.bounds.minY + (dy + 0.5) * regionPitchY;
      yControlPoints.push({
        gridPos: gridY + dy,
        pixelPos: cellCenterY
      });
    }
  }

  // Build nonuniform position arrays
  const xPositions = buildNonuniformPositions(xControlPoints, width, medianPitchX, offsetX);
  const yPositions = buildNonuniformPositions(yControlPoints, height, medianPitchY, offsetY);

  // Calculate confidence based on how well regions align to the interpolated grid
  let alignmentError = 0;
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    const gridX = Math.round((centerX - offsetX) / medianPitchX);
    const gridY = Math.round((centerY - offsetY) / medianPitchY);
    
    // Use interpolated positions for expected location
    const expectedX = xPositions[Math.max(0, Math.min(gridX, width - 1))] ?? (offsetX + gridX * medianPitchX);
    const expectedY = yPositions[Math.max(0, Math.min(gridY, height - 1))] ?? (offsetY + gridY * medianPitchY);
    
    alignmentError += Math.sqrt(
      Math.pow(centerX - expectedX, 2) + Math.pow(centerY - expectedY, 2)
    );
  }
  
  const avgError = alignmentError / regions.length;
  const maxAllowedError = Math.max(medianPitchX, medianPitchY) * 0.3;
  const confidence = Math.max(0, 1 - avgError / maxAllowedError);

  return {
    grid: {
      pitchX: medianPitchX,
      pitchY: medianPitchY,
      offsetX,
      offsetY,
      width,
      height,
      xPositions,
      yPositions
    },
    confidence
  };
}

/**
 * Assign grid positions to regions based on inferred grid
 */
export function assignGridPositions(regions: Region[], grid: Grid): Region[] {
  return regions.map(region => {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    const gridX = Math.round((centerX - grid.offsetX) / grid.pitchX);
    const gridY = Math.round((centerY - grid.offsetY) / grid.pitchY);

    return {
      ...region,
      gridX,
      gridY
    };
  });
}

/**
 * Get the pixel center coordinate for a grid position using interpolated positions
 */
function getPixelCenter(grid: Grid, gridX: number, gridY: number): { x: number; y: number } {
  // Use interpolated positions if available, otherwise fall back to uniform grid
  const x = grid.xPositions?.[gridX] ?? (grid.offsetX + gridX * grid.pitchX);
  const y = grid.yPositions?.[gridY] ?? (grid.offsetY + gridY * grid.pitchY);
  return { x, y };
}

/**
 * Get the local pitch at a grid position (for sampling)
 */
function getLocalPitch(grid: Grid, gridX: number, gridY: number): { pitchX: number; pitchY: number } {
  let pitchX = grid.pitchX;
  let pitchY = grid.pitchY;
  
  // Calculate local pitch from neighboring positions if available
  if (grid.xPositions && gridX < grid.xPositions.length - 1 && gridX >= 0) {
    const nextX = grid.xPositions[gridX + 1];
    const currX = grid.xPositions[gridX];
    if (nextX !== undefined && currX !== undefined) {
      pitchX = nextX - currX;
    }
  }
  
  if (grid.yPositions && gridY < grid.yPositions.length - 1 && gridY >= 0) {
    const nextY = grid.yPositions[gridY + 1];
    const currY = grid.yPositions[gridY];
    if (nextY !== undefined && currY !== undefined) {
      pitchY = nextY - currY;
    }
  }
  
  return { pitchX: Math.abs(pitchX), pitchY: Math.abs(pitchY) };
}

/**
 * Calculate the pixel position for a grid line (the boundary between cells)
 * @param positions The array of cell center positions (xPositions or yPositions)
 * @param index The grid line index (0 to size, where size is width or height)
 * @param size The total number of cells (width or height)
 * @param fallbackOffset The fallback offset if positions are not available
 * @param fallbackPitch The fallback pitch if positions are not available
 * @returns The pixel coordinate for the grid line
 */
export function getGridLinePosition(
  positions: number[] | undefined,
  index: number,
  size: number,
  fallbackOffset: number,
  fallbackPitch: number
): number {
  if (index === 0) {
    // First edge: half pitch before first cell center
    const firstCenter = positions?.[0] ?? fallbackOffset;
    const localPitch = positions && positions.length > 1
      ? (positions[1] - positions[0])
      : fallbackPitch;
    return firstCenter - localPitch / 2;
  } else if (index === size) {
    // Last edge: half pitch after last cell center
    const lastCenter = positions?.[size - 1] ?? (fallbackOffset + (size - 1) * fallbackPitch);
    const localPitch = positions && positions.length > 1
      ? (positions[size - 1] - positions[size - 2])
      : fallbackPitch;
    return lastCenter + localPitch / 2;
  } else {
    // Between cells: average of adjacent cell centers
    const prevCenter = positions?.[index - 1] ?? (fallbackOffset + (index - 1) * fallbackPitch);
    const currCenter = positions?.[index] ?? (fallbackOffset + index * fallbackPitch);
    return (prevCenter + currCenter) / 2;
  }
}

/**
 * Sample the color at a grid position using center-weighted average
 */
export function sampleGridPixel(
  imageData: ImageData,
  grid: Grid,
  gridX: number,
  gridY: number
): RGB {
  const { x: centerX, y: centerY } = getPixelCenter(grid, gridX, gridY);
  const { pitchX, pitchY } = getLocalPitch(grid, gridX, gridY);
  
  const halfPitchX = pitchX / 2;
  const halfPitchY = pitchY / 2;
  
  const colors: Array<{ color: RGB; weight: number }> = [];
  
  // Sample points within the pixel area with center weighting
  const sampleRadius = Math.min(pitchX, pitchY) * 0.4;
  
  for (let dy = -halfPitchY; dy <= halfPitchY; dy += pitchY / 4) {
    for (let dx = -halfPitchX; dx <= halfPitchX; dx += pitchX / 4) {
      const x = Math.round(centerX + dx);
      const y = Math.round(centerY + dy);
      
      if (x < 0 || x >= imageData.width || y < 0 || y >= imageData.height) {
        continue;
      }
      
      const dist = Math.sqrt(dx * dx + dy * dy);
      const weight = Math.max(0, 1 - dist / sampleRadius);
      
      colors.push({
        color: getPixel(imageData, x, y),
        weight
      });
    }
  }
  
  if (colors.length === 0) {
    return { r: 0, g: 0, b: 0 };
  }
  
  // Weighted average
  let totalWeight = 0;
  let r = 0, g = 0, b = 0;
  
  for (const { color, weight } of colors) {
    totalWeight += weight;
    r += color.r * weight;
    g += color.g * weight;
    b += color.b * weight;
  }
  
  return {
    r: Math.round(r / totalWeight),
    g: Math.round(g / totalWeight),
    b: Math.round(b / totalWeight)
  };
}

/**
 * Generate output image from grid and known regions
 */
export function generateOutput(
  imageData: ImageData,
  grid: Grid,
  regions: Region[],
  transparentPixels: Set<string> | null,
  colorCentroids: RGB[] | null
): ImageData {
  const output = new ImageData(grid.width, grid.height);
  
  // Create a map of known region colors, respecting shape masks
  const regionMap = new Map<string, RGB>();
  for (const region of regions) {
    for (let dy = 0; dy < region.gridHeight; dy++) {
      for (let dx = 0; dx < region.gridWidth; dx++) {
        // Only include cells that are filled according to the shape mask
        if (region.shapeMask && region.shapeMask[dy] && !region.shapeMask[dy][dx]) {
          continue;
        }
        const key = `${region.gridX + dx},${region.gridY + dy}`;
        // Use per-cell color if available, otherwise fall back to region color
        const cellColor = region.cellColors?.[dy]?.[dx] ?? region.color;
        regionMap.set(key, cellColor);
      }
    }
  }
  
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const key = `${x},${y}`;
      let color: RGB;
      
      if (regionMap.has(key)) {
        color = regionMap.get(key)!;
      } else {
        color = sampleGridPixel(imageData, grid, x, y);
      }
      
      // Apply color clustering if enabled
      if (colorCentroids) {
        color = findNearestCentroid(color, colorCentroids);
      }
      
      const idx = (y * grid.width + x) * 4;
      output.data[idx] = color.r;
      output.data[idx + 1] = color.g;
      output.data[idx + 2] = color.b;
      
      // Check transparency using interpolated grid positions
      const { x: centerX, y: centerY } = getPixelCenter(grid, x, y);
      const isTransparent = transparentPixels?.has(`${Math.round(centerX)},${Math.round(centerY)}`);
      output.data[idx + 3] = isTransparent ? 0 : 255;
    }
  }
  
  return output;
}

function findNearestCentroid(color: RGB, centroids: RGB[]): RGB {
  let minDist = Infinity;
  let nearest = color;
  
  for (const c of centroids) {
    const dist = Math.sqrt(
      Math.pow(color.r - c.r, 2) +
      Math.pow(color.g - c.g, 2) +
      Math.pow(color.b - c.b, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = c;
    }
  }
  
  return nearest;
}

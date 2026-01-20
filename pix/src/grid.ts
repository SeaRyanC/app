/**
 * Grid inference from known regions
 */

import { Region } from './regions.js';
import { RGB } from './colors.js';
import { getPixel } from './floodFill.js';

export interface Grid {
  // Pixel pitch (size of one output pixel in input image coordinates)
  pitchX: number;
  pitchY: number;
  // Offset (position of first pixel center in input image)
  offsetX: number;
  offsetY: number;
  // Output dimensions
  width: number;
  height: number;
}

export interface GridInferenceResult {
  grid: Grid | null;
  confidence: number;
}

/**
 * Infer grid parameters from known regions
 */
export function inferGrid(
  regions: Region[],
  imageWidth: number,
  imageHeight: number
): GridInferenceResult {
  if (regions.length < 4) {
    return { grid: null, confidence: 0 };
  }

  // Collect all region centers and their presumed grid positions
  const samples: Array<{
    centerX: number;
    centerY: number;
    gridWidth: number;
    gridHeight: number;
  }> = [];

  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    const pixelWidth = region.bounds.maxX - region.bounds.minX + 1;
    const pixelHeight = region.bounds.maxY - region.bounds.minY + 1;
    
    samples.push({
      centerX,
      centerY,
      gridWidth: region.gridWidth,
      gridHeight: region.gridHeight
    });

    // Estimate pitch from region size
    const estimatedPitchX = pixelWidth / region.gridWidth;
    const estimatedPitchY = pixelHeight / region.gridHeight;
    
    // Store pitch estimate
    samples[samples.length - 1] = {
      ...samples[samples.length - 1],
      estimatedPitchX,
      estimatedPitchY
    } as typeof samples[0] & { estimatedPitchX: number; estimatedPitchY: number };
  }

  // Calculate median pitch from all regions
  const pitchSamples = samples.map(s => {
    const es = s as typeof s & { estimatedPitchX: number; estimatedPitchY: number };
    return { x: es.estimatedPitchX, y: es.estimatedPitchY };
  }).filter(p => p.x && p.y);

  if (pitchSamples.length === 0) {
    return { grid: null, confidence: 0 };
  }

  pitchSamples.sort((a, b) => a.x - b.x);
  const medianPitchX = pitchSamples[Math.floor(pitchSamples.length / 2)].x;
  
  pitchSamples.sort((a, b) => a.y - b.y);
  const medianPitchY = pitchSamples[Math.floor(pitchSamples.length / 2)].y;

  // Find the offset by analyzing where pixel centers should be
  // Calculate what grid position would put a pixel at this center
  // offset = center - gridPos * pitch
  // We need to find offset such that floor((center - offset) / pitch) gives integer grid positions
  
  const offsetXCandidates: number[] = [];
  const offsetYCandidates: number[] = [];
  
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    // Offset should position the center within a pixel cell
    const offX = centerX % medianPitchX;
    const offY = centerY % medianPitchY;
    
    offsetXCandidates.push(offX);
    offsetYCandidates.push(offY);
  }

  // Use median offset
  offsetXCandidates.sort((a, b) => a - b);
  offsetYCandidates.sort((a, b) => a - b);
  const offsetX = offsetXCandidates[Math.floor(offsetXCandidates.length / 2)];
  const offsetY = offsetYCandidates[Math.floor(offsetYCandidates.length / 2)];

  // Calculate output dimensions
  const width = Math.ceil(imageWidth / medianPitchX);
  const height = Math.ceil(imageHeight / medianPitchY);

  // Calculate confidence based on how well regions align to the grid
  let alignmentError = 0;
  for (const region of regions) {
    const centerX = (region.bounds.minX + region.bounds.maxX) / 2;
    const centerY = (region.bounds.minY + region.bounds.maxY) / 2;
    
    const gridX = Math.round((centerX - offsetX) / medianPitchX);
    const gridY = Math.round((centerY - offsetY) / medianPitchY);
    
    const expectedX = offsetX + gridX * medianPitchX;
    const expectedY = offsetY + gridY * medianPitchY;
    
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
      height
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
 * Sample the color at a grid position using center-weighted average
 */
export function sampleGridPixel(
  imageData: ImageData,
  grid: Grid,
  gridX: number,
  gridY: number
): RGB {
  const centerX = grid.offsetX + gridX * grid.pitchX;
  const centerY = grid.offsetY + gridY * grid.pitchY;
  
  const halfPitchX = grid.pitchX / 2;
  const halfPitchY = grid.pitchY / 2;
  
  const colors: Array<{ color: RGB; weight: number }> = [];
  
  // Sample points within the pixel area with center weighting
  const sampleRadius = Math.min(grid.pitchX, grid.pitchY) * 0.4;
  
  for (let dy = -halfPitchY; dy <= halfPitchY; dy += grid.pitchY / 4) {
    for (let dx = -halfPitchX; dx <= halfPitchX; dx += grid.pitchX / 4) {
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
  
  // Create a map of known region colors
  const regionMap = new Map<string, RGB>();
  for (const region of regions) {
    for (let dy = 0; dy < region.gridHeight; dy++) {
      for (let dx = 0; dx < region.gridWidth; dx++) {
        const key = `${region.gridX + dx},${region.gridY + dy}`;
        regionMap.set(key, region.color);
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
      
      // Check transparency
      const centerX = Math.round(grid.offsetX + x * grid.pitchX);
      const centerY = Math.round(grid.offsetY + y * grid.pitchY);
      const isTransparent = transparentPixels?.has(`${centerX},${centerY}`);
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

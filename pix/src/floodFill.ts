/**
 * Flood fill algorithm with color thresholding
 */

import { RGB, colorsMatch, medianColor } from './colors.js';

export interface Point {
  x: number;
  y: number;
}

export interface FloodFillResult {
  pixels: Set<string>;
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  color: RGB;
}

/**
 * Get pixel from ImageData
 */
export function getPixel(imageData: ImageData, x: number, y: number): RGB {
  const idx = (y * imageData.width + x) * 4;
  return {
    r: imageData.data[idx],
    g: imageData.data[idx + 1],
    b: imageData.data[idx + 2]
  };
}

/**
 * Get alpha from ImageData
 */
export function getAlpha(imageData: ImageData, x: number, y: number): number {
  const idx = (y * imageData.width + x) * 4;
  return imageData.data[idx + 3];
}

/**
 * Perform flood fill from a starting point with given color threshold
 */
export function floodFill(
  imageData: ImageData,
  startX: number,
  startY: number,
  threshold: number
): FloodFillResult {
  const width = imageData.width;
  const height = imageData.height;
  const startColor = getPixel(imageData, startX, startY);
  
  const visited = new Set<string>();
  const pixels = new Set<string>();
  const stack: Point[] = [{ x: startX, y: startY }];
  
  let minX = startX, maxX = startX, minY = startY, maxY = startY;
  const colorSamples: RGB[] = [];

  while (stack.length > 0) {
    const { x, y } = stack.pop()!;
    const key = `${x},${y}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    
    const pixel = getPixel(imageData, x, y);
    if (!colorsMatch(pixel, startColor, threshold)) continue;
    
    pixels.add(key);
    colorSamples.push(pixel);
    
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    
    // Add neighbors
    stack.push({ x: x - 1, y });
    stack.push({ x: x + 1, y });
    stack.push({ x, y: y - 1 });
    stack.push({ x, y: y + 1 });
  }

  return {
    pixels,
    bounds: { minX, minY, maxX, maxY },
    color: medianColor(colorSamples)
  };
}

/**
 * Get multiple flood fill candidates with different thresholds
 */
export function getFloodFillCandidates(
  imageData: ImageData,
  startX: number,
  startY: number,
  thresholds: number[] = [5, 10, 15, 25]
): FloodFillResult[] {
  return thresholds.map(threshold => 
    floodFill(imageData, startX, startY, threshold)
  );
}

/**
 * Find perimeter pixels of the image
 */
export function getPerimeterPixels(imageData: ImageData): RGB[] {
  const width = imageData.width;
  const height = imageData.height;
  const perimeter: RGB[] = [];

  // Top and bottom edges
  for (let x = 0; x < width; x++) {
    perimeter.push(getPixel(imageData, x, 0));
    perimeter.push(getPixel(imageData, x, height - 1));
  }

  // Left and right edges (excluding corners already counted)
  for (let y = 1; y < height - 1; y++) {
    perimeter.push(getPixel(imageData, 0, y));
    perimeter.push(getPixel(imageData, width - 1, y));
  }

  return perimeter;
}

/**
 * Find the most common color on the perimeter
 */
export function getMostCommonPerimeterColor(imageData: ImageData, bucketSize = 10): RGB {
  const perimeter = getPerimeterPixels(imageData);
  const buckets = new Map<string, RGB[]>();

  for (const color of perimeter) {
    // Bucket colors to find most common
    const key = `${Math.floor(color.r / bucketSize)},${Math.floor(color.g / bucketSize)},${Math.floor(color.b / bucketSize)}`;
    if (!buckets.has(key)) {
      buckets.set(key, []);
    }
    buckets.get(key)!.push(color);
  }

  let maxCount = 0;
  let maxColors: RGB[] = [];
  for (const colors of buckets.values()) {
    if (colors.length > maxCount) {
      maxCount = colors.length;
      maxColors = colors;
    }
  }

  return medianColor(maxColors);
}

/**
 * Find all pixels connected to edge with "same" color as perimeter
 */
export function findTransparentPixels(
  imageData: ImageData,
  perimeterColor: RGB,
  threshold: number
): Set<string> {
  const width = imageData.width;
  const height = imageData.height;
  const visited = new Set<string>();
  const transparent = new Set<string>();
  const stack: Point[] = [];

  // Start from all edge pixels
  for (let x = 0; x < width; x++) {
    stack.push({ x, y: 0 });
    stack.push({ x, y: height - 1 });
  }
  for (let y = 0; y < height; y++) {
    stack.push({ x: 0, y });
    stack.push({ x: width - 1, y });
  }

  while (stack.length > 0) {
    const { x, y } = stack.pop()!;
    const key = `${x},${y}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    
    const pixel = getPixel(imageData, x, y);
    if (!colorsMatch(pixel, perimeterColor, threshold)) continue;
    
    transparent.add(key);
    
    stack.push({ x: x - 1, y });
    stack.push({ x: x + 1, y });
    stack.push({ x, y: y - 1 });
    stack.push({ x, y: y + 1 });
  }

  return transparent;
}

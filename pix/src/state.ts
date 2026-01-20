/**
 * State management and localStorage persistence
 */

import { Region } from './regions.js';

export interface AppState {
  imageDataUrl: string | null;
  regions: Region[];
  inferTransparency: boolean;
  transparencyThreshold: number;
  maxColors: number | null;
  version: string;
}

const STORAGE_KEY = 'pix-app-state';
const STATE_VERSION = '1';

export function getDefaultState(): AppState {
  return {
    imageDataUrl: null,
    regions: [],
    inferTransparency: false,
    transparencyThreshold: 10,
    maxColors: null,
    version: STATE_VERSION
  };
}

export function saveState(state: AppState): void {
  try {
    const serialized: SerializedState = {
      ...state,
      regions: state.regions.map(r => ({
        ...r,
        pixels: Array.from(r.pixels)
      }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

interface SerializedRegion extends Omit<Region, 'pixels'> {
  pixels: string[];
}

interface SerializedState extends Omit<AppState, 'regions'> {
  regions: SerializedRegion[];
}

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultState();
    
    const parsed = JSON.parse(stored) as SerializedState;
    
    // Version check
    if (parsed.version !== STATE_VERSION) {
      return getDefaultState();
    }
    
    return {
      ...parsed,
      regions: parsed.regions.map(r => ({
        ...r,
        pixels: new Set(r.pixels)
      }))
    };
  } catch (e) {
    console.error('Failed to load state:', e);
    return getDefaultState();
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

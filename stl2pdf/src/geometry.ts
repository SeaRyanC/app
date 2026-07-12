import type { Vec3, BBox3 } from './stl-parser.js';

export type { Vec3, BBox3 };

export interface Vec2 {
  x: number;
  y: number;
}

export type PlaneAxis = 'x' | 'y' | 'z';

export interface CutPlane {
  axis: PlaneAxis;
  value: number;
}

// ─── View projections ──────────────────────────────────────────────────────
// Convention: Z is up in model space.
//   Front view  → looking along -Y: project to (model_x,  -model_z)
//   Side view   → looking along -X: project to (model_y,  -model_z)
//   Top view    → looking along -Z: project to (model_x,   model_y)

export type ViewDir = 'front' | 'side' | 'top';

export function projectForView(v: Vec3, dir: ViewDir): Vec2 {
  switch (dir) {
    case 'front': return { x: v.x, y: -v.z };
    case 'side':  return { x: v.y, y: -v.z };
    case 'top':   return { x: v.x, y:  v.y };
  }
}

/**
 * Given a 2D view-space click (mx, my), return the model coordinate along the
 * axis that is "moved by dragging the indicator" in this view.
 *
 * For a z=const plane: the z value is encoded in my (front/side) or not applicable (top).
 * For a x=const plane: the x value is encoded in mx (front) or my (top).
 * For a y=const plane: the y value is encoded in mx (side) or my (top).
 */
export function indicatorPositionInView(plane: CutPlane, dir: ViewDir): number | null {
  switch (plane.axis) {
    case 'z':
      if (dir === 'front' || dir === 'side') return -plane.value; // model_z → -screen_y
      return null;
    case 'x':
      if (dir === 'front') return plane.value; // model_x → screen_x
      if (dir === 'top')   return plane.value; // model_x → screen_x
      return null;
    case 'y':
      if (dir === 'side') return plane.value; // model_y → screen_x
      if (dir === 'top')  return plane.value;  // top view: view_y = model_y directly
      return null;
  }
}

/** Returns 'horizontal' or 'vertical' for the indicator in this view, or null if not visible. */
export function indicatorOrientation(plane: CutPlane, dir: ViewDir): 'horizontal' | 'vertical' | null {
  switch (plane.axis) {
    case 'z':
      if (dir === 'front' || dir === 'side') return 'horizontal';
      return null;
    case 'x':
      if (dir === 'front') return 'vertical';
      if (dir === 'top')   return 'vertical';
      return null;
    case 'y':
      if (dir === 'side') return 'vertical';
      if (dir === 'top')  return 'horizontal';
      return null;
  }
}

/**
 * Given a screen-space click position (view 2D coords) and a view direction,
 * return the updated plane value.  Returns null if this view/axis combo
 * doesn't give enough information.
 */
export function screenToPlaneValue(mx: number, my: number, plane: CutPlane, dir: ViewDir): number | null {
  switch (plane.axis) {
    case 'z':
      if (dir === 'front' || dir === 'side') return -my; // my = -model_z
      return null;
    case 'x':
      if (dir === 'front' || dir === 'top') return mx;
      return null;
    case 'y':
      if (dir === 'side') return mx;
      if (dir === 'top')  return my;  // top view: view_y = model_y directly
      return null;
  }
}

/** Cycle through plane axes: z → x → y → z */
export function nextAxis(axis: PlaneAxis): PlaneAxis {
  switch (axis) {
    case 'z': return 'x';
    case 'x': return 'y';
    case 'y': return 'z';
  }
}

/** Human-readable label for a plane */
export function planeLabel(plane: CutPlane): string {
  return `${plane.axis.toUpperCase()} = ${plane.value.toFixed(2)} mm`;
}

/** Clamp a value between min and max */
export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

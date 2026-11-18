# PVC User Stories

1. **Define a vase with functions.** I write JavaScript that defines `diameter(z, theta)` (inner diameter at the wall midpoint) and `thickness(z, theta)` (wall thickness, extending outward). `z` is in mm; `theta` is in radians, 0..2π. I can define any helper functions or constants, and `Math` members (`sin`, `PI`, …) are available unqualified.
2. **Control sampling.** I set z min, z max, z step (mm) and theta step (degrees). The last layer always lands exactly on z max; theta is divided evenly so the seam closes.
3. **Persistence.** My code and parameters are saved to localStorage on every edit and restored on load. "Reset to example" restores the defaults.
4. **Graceful errors.** Syntax errors, missing functions, exceptions, non-finite or non-positive results, invalid parameters and oversized meshes are shown inline with the z/theta where they occurred. The preview keeps the last valid shape and the app never crashes.
5. **Preview.** A WebGL2 preview shows the vase with orbit (drag), pan (right-drag / Shift-drag), and zoom (wheel / pinch). The first valid shape frames the camera; later edits keep the camera.
6. **Export.** "Export STL" downloads a binary STL (mm) of a closed solid: outer wall, inner wall, top rim, and a solid floor one z step thick.

## Notes
- Mesh is capped at 2,000,000 triangles.
- Code runs on the main thread; an infinite loop in user code will freeze the tab.

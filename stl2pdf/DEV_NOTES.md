# Dev Notes

## Cross-section chaining and exact-zero / coincident-plane edge cases (v2.0.0)

While adding the procedural demo models (`demo-models.ts`), two related edge cases in the
cross-sectioning pipeline surfaced and were addressed:

1. **`section.ts` `ptKey()` and negative zero.** The contour-chaining adjacency map keys
   points by `x.toFixed(6)` / `y.toFixed(6)`. A coordinate that is mathematically zero but
   computed via `Math.cos`/`Math.sin` at a wraparound seam (e.g. `Math.sin(2*Math.PI)`) can
   evaluate to a tiny negative float like `-3.4e-15`. `(-3.4e-15).toFixed(6)` yields
   `"-0.000000"` while the corresponding `0` yields `"0.000000"` — different string keys,
   so two points that are the *same* vertex fail to chain together and a closed loop gets
   fragmented into many tiny segments. Fixed with a `roundCoord()` helper that rounds to
   6 decimals and explicitly normalizes `-0` to `0` before stringifying.

2. **Tessellation grid lines landing exactly on natural cutting planes.** Independently of
   (1), if a circular/toroidal mesh's angular tessellation grid happens to place vertex rows
   *exactly* on an axis-aligned symmetry plane (e.g. a cylinder with `N` divisible by 4 has
   grid lines exactly at 0°/90°/180°/270°, which is exactly where an `x=0` or `y=0` cut
   through the center lands), the cut plane runs along a whole row of shared mesh edges
   instead of through the middle of triangles. This is a genuinely degenerate case for a
   triangle-by-triangle plane-slice algorithm and produced badly fragmented contours,
   independent of the `-0` rounding issue above. Fixed by giving every circular
   tessellation in `demo-models.ts` a half-segment angular phase offset (`Math.PI / N`),
   so natural symmetry planes always cut through triangle interiors. This does not change
   triangle counts or the physical shape, only the tessellation's rotational starting
   phase.

**Still-open, out-of-scope limitation:** cutting exactly through a face that is *coplanar*
with the cut plane (e.g. slicing the stepped-shaft demo at exactly `z=12` or `z=30`, its
step-shoulder heights, or the mounting-plate demo at exactly `z=0`/`z=10`, its top/bottom
faces) still produces fragmented/degenerate contours. This is a general limitation of the
naive triangle-slice algorithm when an entire flat face lies in the cutting plane — it is
not specific to the new demo models and would equally affect any uploaded STL with a flat
feature at the exact slice height. Not fixed here; would require face-aware handling in
`section.ts` (out of scope for this change, and not required to click into by the normal
click-to-slice UI since users very rarely land on an exact integer boundary height).

## PDF printing philosophy change (v2.0.0)

`pdf.ts` no longer scales sections down to fit one page. It always draws at true 1:1 mm
scale, picking whichever page orientation (portrait/landscape) fits best; sections that
don't fit on one page are tiled across a grid of 1:1-scale pages instead. This was an
explicit requirement change, not a bug fix — keep this in mind if extending PDF output
further (e.g. any future "fit to page" toggle should be additive, not a replacement of the
default 1:1 tiling behavior).

## `build.js` does not copy `index.html` / `style.css`

Unlike `dev.js`, `build.js` only bundles `src/app.tsx` via esbuild — it does not copy
`index.html` or `style.css` into `docs/stl2pdf/`. This is a pre-existing gap (also present
in at least the `pix` app) and was not fixed as part of this change since it's outside this
app's scope; when `style.css` changes, remember to manually copy both files into
`docs/stl2pdf/` (or fix `build.js` in a future dedicated pass).

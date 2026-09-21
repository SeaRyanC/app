# Dev notes

- `npm run local` is currently broken: esbuild's `--servedir=. --outdir=../docs/bus` combination
  fails because esbuild requires the outdir to live inside the serve dir. To preview locally for
  now, run `npm run bundle` then serve `../docs/bus` with any static file server (e.g.
  `npx serve ../docs/bus`). A proper fix would follow the `pix/dev.js` pattern (esbuild `context()`
  + `ctx.serve({ servedir: '../docs/bus' })`, copying `index.html`/`style.css` into `docs/bus` on
  each build) instead of the plain CLI `--servedir` flag.
- Station connectors (`BeltOverlay` in `src/app.tsx`) measure pixel positions via
  `ResizeObserver` against `.station-port-anchor` / `.lane-spine-anchor` elements, not React state.
  Any layout change to station/lane markup should keep those anchor elements present and
  positioned correctly, or connector lines will silently stop tracking.
- `standardRecipe()` (first non-alternate recipe from `recipesForMaterial`) is the single source
  of "what inputs should this station default to" -- there is intentionally no recipe-selection UI
  anymore; the recipe is only used to pre-check bus-input lanes on station creation and to show a
  read-only reference list in the station popup.
- Recipe materials must not be limited to Factorio's `item` and `fluid` prototype collections.
  Ammo, capsules, modules, tools, and other craftable prototype categories can appear as recipe
  inputs; `scripts/generate-data.ts` adds every recipe-referenced prototype to the catalog before
  building recipes, preventing ingredients from being silently discarded.

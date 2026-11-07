# Dev notes

- `npm run local` runs `scripts/dev.ts`, which uses an esbuild context and serves `../docs/bus`
  on the development server (normally `http://localhost:8000`). It copies the static assets before
  starting and watches the source bundle through esbuild's development context.
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
- `scripts/copy-assets.ts` is the single publishing path for `index.html`, `style.css`, and every
  generated material icon. Both `npm run bundle` and `npm run local` call it so paths such as
  `icons/productivity-module.png` are available from `docs/bus`.
- Connector paths are generated from the station toward the lane for rendering. `flowDirection`
  selects the origin edge, normal/counterflow classification, elbow direction, lane extents, and
  chevron direction; keep those calculations shared between collapsed and uncollapsed rendering.
  Horizontal connector chevrons remain station-to-lane for outputs and lane-to-station for inputs,
  independent of the selected vertical flow direction.
- Collapsed lane columns are absolutely positioned within `.lane-column-group` and must explicitly
  use `width: 100%`; otherwise the normal lane column's `width: 0` flex sizing places their spine
  anchors at the group edge instead of its center.
- Collapse view adds `.collapsed` to `.bus-columns` and hides only the opposite-side
  `.station-spacer` elements, so each station bay compacts independently while visible station
  port anchors remain available for `BeltOverlay` measurement.
- Lane spine ranges are the union of measured normal and counterflow connector endpoints. Each
  direction gets its own segment, both anchored at the producing station when present, so
  independent bay compaction remains correct even when opposite-side stations share a row or
  move a counterflow endpoint across the origin's physical position.
- Material drops are accepted by both the empty lane field and existing lane columns. Lane-column
  drop targets still reorder dragged lanes, while material drops always create a new lane.
- Collapsed lane spine chevrons are built as directional physical segments from their measured
  origin endpoint to each side of the measured destinations. This avoids using logical station
  indices for arrow direction after left/right station-bay compaction inverts the on-screen order.
- Connector elbows use the same measured physical direction as their lane spine endpoints. Their
  logical flow/counterflow direction is only a tie-breaker when compaction places endpoints on one
  row, so the quarter-turn remains attached to the correct side of the compacted lane.
- An origin output can branch to inputs on both physical sides. Its primary elbow remains the lane
  range anchor, while the opposite branch renders a second curve from the same horizontal tap.
- Each output branch is styled from its physical lane direction rather than the shared logical
  connector flag, so an upward normal branch is green even when its sibling branch is counterflow.
- Lane spine segments are anchored independently at the output elbow for their physical direction;
  a branch running upward starts at the top/upward elbow endpoint rather than the opposite branch's
  lower endpoint.
- Lane hover is mutually exclusive with station hover. Normal lane columns and collapsed shared-lane
  icons both call the same hover callback, so a lane hover can highlight every connector using that
  lane even when the shared columns overlap.

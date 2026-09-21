# Factorio Bus Planner

## Planning a bus

- As a Factorio player, I can search the complete bundled Factorio item and fluid catalog, including Space Age and installed expansion materials.
- As a player, I can drag an item into the center of the field to create a lane.
- As a player, I can drag an item below the field to add a station to a single master list of stations.
- As a player, I can reorder lanes by dragging them, and reorder stations by dragging them or by pressing the ▲/▼ buttons on a station to nudge it one position at a time.
- As a player, I can flip which side (left or right of the bus) a station taps from with one click, without needing to drag it between separate areas.
- As a player, I can see a lane originate at its lowest producing station and see counterflow sections as dashed lines.
- As a player, I can see station input belts span the field to their selected lanes without changing unrelated lane geometry.
- As a player, I can distinguish separate tap lines when a station consumes multiple planned lanes; taps from one station are spread into their own vertically-offset rows, ordered so nearer lanes get the innermost rows to minimize crossings.
- As a player, each station connection connects to its lane with one smooth, correctly oriented quarter-turn, with outputs curving up into the flow and inputs curving down out of it.
- As a player, a station with one connected lane still has a visible rounded turn into that lane.
- As a player, when a tap's horizontal run has to cross a lane spine it isn't connecting to, that crossing is drawn as a small schematic "hop" so it never reads as a connection.
- As a player, I can see a station connect to an existing lane for its own material, without duplicate output taps.
- As a player, I can check any existing lane as an input consumed by a station.
- As a player, I can represent on-site intermediate production by leaving its lane unchecked.
- As a player, stations and lanes show only their icon on the canvas; the material name appears as a tooltip on hover so the layout stays uncluttered.
- As a player, the station side-bays are narrow, since they only need to fit an icon and small controls.

## Configuring a station

- As a player, when I create a station, the lanes matching its item's standard (non-alternate) recipe inputs are pre-checked automatically.
- As a player, I can open a station's detail popup to see its standard recipe's inputs (as icons and names) for reference, and to check or uncheck any lane as a bus input -- there is no separate recipe-selection step.
- As a player, I can select a station and press Delete or Backspace to dismantle it.
- As a player, checking a lane as an input does not silently create lanes that are not already in the plan.
- As a player, fluids behave like item lanes and can be connected to stations.

## Saving and sharing

- As a player, my current plan is restored from localStorage after a refresh.
- As a player, I can undo and redo edits.
- As a player, I can copy a URL that contains the complete current plan and open it on another device.
- As a player, I can reset the plan.
- As a player, the undo/redo/share/reset controls live above the material catalog, not in a separate page header.

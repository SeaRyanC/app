# Factorio Bus Planner

## Planning a bus

- As a Factorio player, I can search the complete bundled Factorio item and fluid catalog, including Space Age and installed expansion materials.
- As a player, I can drag an item into the center of the field to create a lane.
- As a player, I can drag an item below the field to add a station to a single master list of stations.
- As a player, I can reorder lanes by dragging them, and reorder stations by dragging them or by pressing the ▲/▼ buttons on a station to nudge it one position at a time.
- As a player, I can flip which side (left or right of the bus) a station taps from with one click, without needing to drag it between separate areas.
- As a player, I can access the collapse and flow-direction toggles in the same compact row as the field section label, without redundant panel titles.
- As a player, I can toggle lane flow between bottom → top and top → bottom, with the selected direction applied in both normal and collapsed views.
- As a player, I can see a lane originate at the producing station nearest the selected flow edge and see counterflow sections as dashed lines.
- As a player, I can see slim, continuous, unshadowed V chevrons with a small gap between neighboring Vs on each lane and horizontal station tap, showing whether material flows in the selected lane direction, toward a station, or counterflows against it.
- As a player, when a lane has no producing station in the plan, I can see it enter from the selected flow's starting edge.
- As a player, I can see a lane stop at its farthest connected tap in the selected flow direction instead of continuing indefinitely beyond the factory plan.
- As a player, I can scroll vertically through a long planner without disconnecting lane spines or station taps.
- As a player, I can see station input belts span the field to their selected lanes without changing unrelated lane geometry.
- As a player, I can distinguish separate tap lines when a station consumes multiple planned lanes; taps from one station are spread into their own vertically-offset rows, with equal-flow inputs assigned to minimize every rendered lane/tap crossing, including crossings where a lane would pass beneath another tap.
- As a player, when equal-flow input orders have the same crossing count, I can see the station-nearest lane take the lowest available input row, with farther lanes ordered above it.
- As a player, when equal-cost counterflow inputs share a station, I can see the station-nearest lane take the highest available counterflow row, with farther lanes ordered below it.
- As a player, when a station's output only feeds counterflow, I can see that output use the outer horizontal tap row so it does not compete with the station's normal taps.
- As a player, I can see a regular station output use the flow-side tap row, keeping it clear of terminal input lanes that share its vertical column.
- As a player, when a station consumes both counterflow and regular lanes, I can see its counterflow inputs use the opposite-side tap rows from its regular inputs.
- As a player, each station connection connects to its lane with one smooth, correctly oriented quarter-turn: regular outputs curve in the selected flow direction, regular inputs curve against it, and counterflow taps reverse those directions.
- As a player, a station with one connected lane still has a visible rounded turn into that lane.
- As a player, when a tap's horizontal run has to cross a lane spine it isn't connecting to, that crossing is drawn as a small schematic "hop" so it never reads as a connection.
- As a player, I can see a station connect to an existing lane for its own material, without duplicate output taps.
- As a player, I can check any existing lane as an input consumed by a station.
- As a player, I can hover a station to trace each of its input from its originating output tap through that station in a thick, distinct resource color, without highlighting the lane beyond that station.
- As a player, I can represent on-site intermediate production by leaving its lane unchecked.
- As a player, stations and lanes show only their icon on the canvas; the material name appears as a tooltip on hover so the layout stays uncluttered.
- As a player with a wide display or many lanes, I can use the full page width without an arbitrary planner width cap.
- As a player, the station side-bays are narrow, since they only need to fit an icon and small controls.
- As a player, I can remove an accidentally added lane from its header, which also removes that lane from every station's bus-input selection.
- As a player with a dense plan, I can enable read-only collapse view to assign a lane used on only one side to the nearest compatible column on that side, working from the outer edges inward.
- As a player using collapse view, I can see the left and right station bays compact independently without blank rows for stations assigned to the opposite side.
- As a player using collapse view, I can see lanes fed from the selected flow edge remain in separate columns when they overlap at that edge.
- As a player using collapse view, I can identify every lane in a shared column from its icon directly above that lane's highest elbow.
- As a player using collapse view, I can share a column between a lane's final input and the lane produced by that same station, since their elbows occupy opposite sides of the station row.
- As a player in collapse view, I cannot drag, add, remove, reorder, or otherwise edit the plan until I return to the normal view.

## Configuring a station

- As a player, when I create a station, the lanes matching its item's standard (non-alternate) recipe inputs are pre-checked automatically.
- As a player, I can open a station's detail popup to see its standard recipe's inputs (as icons and names) for reference, and to check or uncheck any lane as a bus input -- there is no separate recipe-selection step.
- As a player, I can select a station and press Delete or Backspace to dismantle it.
- As a player, checking a lane as an input does not silently create lanes that are not already in the plan.
- As a player, fluids behave like item lanes and can be connected to stations.

## Saving and sharing

- As a player, my current plan is restored from localStorage after a refresh.
- As a player, I can undo and redo edits.
- As a player, I can copy a URL that contains the complete current plan and selected flow direction and open it on another device.
- As a player, I can reset the plan.
- As a player, the undo/redo/share/reset controls live above the material catalog, not in a separate page header.

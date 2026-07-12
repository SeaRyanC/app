# STL2PDF User Stories

## Core use cases

### US-01 – Load an STL file
As a user, I want to open an STL file by dragging it onto the page, clicking a browse button, or pasting from the clipboard, so that I can inspect the model without sending it to any server.

The app accepts both binary and ASCII STL formats. An error message is shown if the file cannot be parsed.

### US-02 – Orthographic three-view display
As a user, I want to see the model in three orthographic views — Front (XZ), Side (YZ), and Top (XY) — with Z pointing up, so I can understand the model's shape from multiple directions.

Each view renders the model with Lambertian (diffuse + ambient) shading using an orthographic projection. Face normals are computed per-triangle and a fixed world-space light gives a steel-blue appearance. The model is automatically fitted to the pane on load.

### US-03 – Zoom and pan in every pane
As a user, I want to scroll to zoom and right-click-drag to pan in any of the four panes, so I can examine any part of the model or section in detail.

### US-04 – Place a cutting plane
As a user, I want to click anywhere in the Front or Side views to immediately create a horizontal cutting plane (z = const), so I can slice the model at any height and see the cross-section.

A dashed orange indicator line shows where the plane intersects each view. The Section Output pane is updated instantly.

### US-05 – Move the cutting plane by dragging
As a user, I want to drag the indicator bar up or down with the left mouse button to reposition the cutting plane, so I can quickly adjust the slice height without clicking.

### US-06 – Cycle plane orientation
As a user, I want to right-click the indicator bar to cycle the cutting plane orientation through horizontal (Z = const), vertical-X (X = const), and vertical-Y (Y = const), so I can take cross-sections in all three principal directions.

### US-07 – Section view display
As a user, I want the Section Output pane to show the cross-section with interior material shaded light gray, empty space white, and the cross-section outline in a thick black pen, so the section is easy to read engineering-drawing style.

### US-08 – Even-odd fill for hollow parts
The section fill uses the even-odd rule so that through-holes (inner loops) appear correctly as white (empty) surrounded by gray (material).

### US-09 – Print to PDF
As a user, I want to click "Print PDF" to download a Letter-size PDF of the cross-section drawn at true 1 : 1 millimetre scale (assuming the STL is in millimetres), so I can print it and use it as an accurate reference drawing — no scale ratio math needed.

The app automatically picks whichever page orientation (portrait or landscape) fits the section best. If the section is small enough, it is drawn on a single page. If it is larger than one sheet, the drawing is **never scaled down** — instead it is tiled across as many 1 : 1 scale pages as needed (in a column/row grid), each labelled "Page col/row of total", so the printed pieces can be taped together and still measure true to size. Every page includes a plane label (axis and position), section width/height in mm, the current scale factor, and a 25.4 mm calibration bar with tick marks so the print can be spot-checked with a ruler even if the printer's own scaling is off.

### US-10 – Load another file
As a user, I want a "Load another file" button to reset the app and load a different model without refreshing the page.

### US-11 – Try a demo model
As a user without an STL file handy, I want to click a demo button ("🔵 Torus", "⚙ Stepped Shaft", or "🔩 Mounting Plate") on the drop-zone screen to instantly load a procedurally generated sample model, so I can try out the viewer, sectioning, and measurement tools without needing to find or create my own STL file.

- **Torus**: a ring shape (major radius 22 mm, minor radius 8 mm) — good for exploring circular cross-sections at any cutting angle.
- **Stepped Shaft**: three stacked cylinders of decreasing diameter (a common turned-part shape) — good for testing diameter measurement at different heights.
- **Mounting Plate**: an 80 × 60 × 10 mm plate with a round mounting hole — good for testing the even-odd hole rendering and auto-dimensioning.

### US-12 – Loading feedback while parsing
As a user, I want to see a spinner and "Parsing model…" message immediately after choosing a file or demo model, so I know the app is working and the page hasn't frozen, even while a large STL is being parsed.

If parsing fails, the spinner disappears and the existing error message is shown instead.

### US-13 – Consistent initial zoom across views
As a user, I want the Front, Side, and Top views to all start at the same zoom level (based on the model's largest overall dimension, not each view's own footprint), so the same real-world distance looks the same size in every pane and I can visually compare proportions between views at a glance.

### US-14 – Measure a distance with the Ruler tool
As a user, I want to click the "📏 Ruler" tool in the Section Output toolbar, then click two points on the cross-section, so I can measure the straight-line distance between them in millimetres.

Clicks snap to nearby contour vertices and edge midpoints for precision (hold Shift, Ctrl, or Alt to temporarily disable snapping). Once both points are placed, either endpoint can be dragged to adjust it, and the live distance is shown as a label at the midpoint of a dashed measurement line. Right-clicking (or clicking elsewhere while both points are placed) clears the measurement and starts over.

### US-15 – Measure a diameter with the Diameter tool
As a user, I want to click the "⊙ Diameter" tool and then click on or near a circular feature (a hole, boss, or curved edge) in the cross-section, so the app automatically fits a circle to that feature and shows me its diameter.

The tool tries fitting the whole contour as a circle first, then falls back to detecting the best-fitting circular arc near the click point if the contour isn't a full circle. The fitted circle, a diameter line, and a "⌀" label are drawn on the section. Right-clicking clears the measurement.

### US-16 – Auto-dimension a feature with the Auto-Dim tool
As a user, I want to click the "⬛ Auto-Dim" tool and then click inside any closed region of the cross-section, so the app automatically finds that region's bounding box and draws width and height dimension lines around it, without me having to click multiple points.

A horizontal dimension line with end ticks and a width label appears above the region, and a vertical dimension line with end ticks and a height label appears to its right. Right-clicking clears the dimensions.

### US-17 – Only one measurement tool active at a time
As a user, I want the Ruler, Diameter, and Auto-Dim tools to be mutually exclusive — clicking a tool button activates it and deactivates whichever tool was previously active, and clicking the active tool's button again turns it off — so the section view doesn't get cluttered with overlapping measurement modes and clicks are never ambiguous about which tool they apply to.

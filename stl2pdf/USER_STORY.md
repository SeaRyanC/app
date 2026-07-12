# STL2PDF User Stories

## Core use cases

### US-01 – Load an STL file
As a user, I want to open an STL file by dragging it onto the page, clicking a browse button, or pasting from the clipboard, so that I can inspect the model without sending it to any server.

The app accepts both binary and ASCII STL formats. An error message is shown if the file cannot be parsed.

### US-02 – Orthographic three-view display
As a user, I want to see the model in three orthographic views — Front (XZ), Side (YZ), and Top (XY) — with Z pointing up, so I can understand the model's shape from multiple directions.

Each view renders the model as a wireframe. The model is automatically fitted to the pane on load.

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
As a user, I want to click "Print PDF" to download an 8.5 × 11" PDF of the cross-section drawn at true 1 : 1 millimetre scale (assuming the STL is in millimetres), so I can print it and use it as a reference drawing.

If the section is larger than the printable area, it is uniformly scaled down to fit, and the resulting scale ratio is noted on the sheet. The PDF includes the plane label (axis and position), section width/height in mm, and a scale bar.

### US-10 – Load another file
As a user, I want a "Load another file" button to reset the app and load a different model without refreshing the page.

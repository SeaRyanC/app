# PPG – Passport Photo Generator: User Stories

## Image Input
- The user can load an image by **dragging** a file onto the drop zone, **pasting** from the clipboard, or using a standard **file picker** button.
- Accepted formats include JPEG, PNG, and WebP.
- Once an image is loaded, it appears in the crop editor immediately.

## Crop Editor
- The crop area is a fixed **square** (representing the 2″×2″ passport photo).
- Inside the square, a **US Passport face-proportion guide** (oval head outline, eye-line, and chin-line) is drawn as a semi-transparent overlay with **text labels** ("eyes", "chin") so the user can line up the subject's face.
- The user can **pan** (drag) and **zoom** (mouse wheel, pinch gesture, or trackpad) the image behind the crop frame to position the face correctly.
- On touch devices, a **two-finger pinch gesture** zooms in/out while simultaneously panning to the pinch midpoint, making it comfortable to use on phones and tablets.
- A **preview thumbnail** of the cropped result is shown next to the editor.

## Preview & Navigation
- After cropping, the user sees a preview of the cropped photo and can choose a paper size.
- A **"← Back to crop"** button returns the user to the crop editor with the same image, allowing re-adjustment without re-uploading.
- A **"Start over"** button returns all the way to the image input step.

## Paper Size Selection
- The user picks from three standard photo-print paper sizes:
  - **3×5″** – produces **2 copies** of the passport photo
  - **4×6″** – produces **2 copies** of the passport photo
  - **8×10″** – produces **4 copies** (2 columns × 2 rows) of the passport photo

## PDF Generation
- Clicking **"Generate PDF"** creates a PDF at the selected paper size containing the cropped 2″×2″ photo repeated the appropriate number of times.
- Each photo is **centred within its own equal-sized cell** on the page, producing even padding around every image.
- **Cut lines** are drawn around each photo so the user knows exactly where to trim.
- The PDF opens in a new tab or triggers a download so the user can print it directly.

## Footer
- A footer displays "A vibe-coded micro-app via SeaRyanC" (linked to https://searyanc.dev), a GitHub icon linking to the app's source, and the current version + commit hash.

# Pixel Image Extractor

## Overview and Problem Statement

The user has an image that is roughly drawn in the style of pixel art, but not quite aligned to a proper rectangular grid.
The image is NOT rendered at pixel resolution - we likely have something like a 1024x1024 image for a pixel art that's going to be in the range of 16x16 to 128x128. We'll call the small format "output pixels" throughout the document.
Some pixels, as represented in the input image are a little too fat or too skinny, some parts of the image are noise, some pixels are a bit misshapen, but in general there is enough rectangular pattern in the image that we can extract out a solid pixel-perfect image.
You cannot assume that the input image is using a "standard" upscaling - its pixels might be 27x27, for example, not necessarily 16x16 or 32x32.
Nor are the pixels in the image necessarily perfectly aligned to the grid.
Colors in the image are also not going to be perfect. In general you will want to use the median color from any given region to represent it in the output image.

## Principles

Use the ICtCp *and* CIEDE2000 perceptual color algorithms; never use RGB distance.

## Solution

Automated pixelization analysis is not quite going to cut it. Instead, the user will build up the image through a verb we'll call *adding regions*.

The user will start by clicking somewhere on the input image. Starting from this point, do a thresholded flood fill algorithm to find all connected pixels from that point which are "the same" color. Use both color distance algorithms and multiple color thresholds in order to collect different possible candidate regions.

At this point, we need to determine the "output shape" of the region -- e.g. we might be looking at a block that is 120x480 with a ragged edge, but the true output shape is a 1x4 rectangle. Or we might have a shape that resembles a Tetris piece (when looking at matching colors). A square-shaped region might be a 1x1 pixel block, 2x2, 3x3, etc (for a SOLID square block, assume 4x4 is the largest we might encounter).  Look at the aspect ratio of the region, and iterate through which four look most plausible. If one answer is by far the most plausible, just choose it and add it to the list of Known Regions.

If more than one looks plausible, show the user a modal dialog with a zoomed-in subsection of the image and renderings of the top candidate region shapes (up to 4). The user can select one or cancel and try again.

Known Regions are subtly outlined in the input image area, and their pixels appear in the Output preview.

Once four or more Known Regions are identified, it's time to Infer the rest of the grid. Using the coordinates of the known regions, infer the pixel pitch, offset, rotation, scale, etc of the implied pixel grid of the image. Use a center-weighted average of each pixel when determining the output pixel's color. Overlay this inferred grid on the preview image so the user can tell if it's correct or not.

The user can still add more Known Regions to improve grid alignment if needed, or delete mis-aligned Known Regions.

## Stories

I can provide an input image through pasting, drag-drop, or file upload.

I can clear out the input image.

Reloading the browser does not lose ANY work (use localstorage).

I see the input image on the left and the output image on the right. The output image is scaled up without any smoothing/interpolation so its edges are nice and crisp. Faint and thin lines overlay the pixel grid of the image.

The output image can be copied to clipboard, or downloaded in PNG format.

I can delete a region by clicking on the "delete" tool and then clicking on a region.

The region I would act on is highlighted as I hover over it.

The "transparent" regions of the output preview show a grey/lighter-grey checkerboard pattern; wit hfour checkerboard cells = one output pixel.

I can select a maximum number of colors to use in the output image. This is done through clustering analysis, not the median cut algorithm.

I can enable "infer transparency", which assumes that any pixel connected to the edge of the image via a set of pixels which are "the same" color, and which are the same color as the most common color on the perimeter of the image, should instead be treated as transparent. "the same" threshold is configurable.

Regions support non-rectangular shapes (shape masks). When adding a region, the candidate shape previews accurately show which cells within the bounding rectangle are filled based on the flood-fill pixel coverage, with per-cell color sampling. Non-filled cells within a region's bounding rectangle are displayed with a dashed outline. In the output, only filled cells contribute their color; unfilled cells within a region are sampled from the inferred grid instead.
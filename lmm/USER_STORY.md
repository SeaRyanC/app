# LMM - Label Mail Merge

## Overview

A single-page web application for creating printable labels from CSV/TSV data using a mail merge approach. The app generates PDF files compatible with standard label sheets.

## User Stories

### Data Input
- As a user, I can paste CSV or TSV address data directly into the app
- As a user, the app automatically detects whether my data uses comma or tab delimiters
- As a user, headers are auto-detected based on common column names (FirstName, Address, City, etc.)
- As a user, I see the app pre-populated with sample data to understand how it works
- As a user, my input data is saved to localStorage and persists across page refreshes

### Template Design
- As a user, I can design a label template using placeholders like `<<FieldName>>`
- As a user, I see clickable buttons for available placeholders that insert them into my template
- As a user, I am warned if I use a placeholder that doesn't match any column in my data
- As a user, I can format labels with Markdown: **bold**, *italic*, and ~underline~ text (or ~~underline~~)
- As a user, I see a live preview of how my label will look with actual data

### Paper Format Selection
- As a user, I can choose from 30+ paper formats including Avery templates and generic layouts
- As a user, I can search for formats by name, code, or description
- As a user, I can select formats for both US Letter (8.5x11) and A4 paper sizes
- As a user, I see the selected format details including labels per sheet and label dimensions

### PDF Options
- As a user, I can enable cut marks to help with manual cutting
- As a user, I can enable label borders to test printer alignment
- As a user, I can adjust the font size (6-72pt)
- As a user, I can adjust the label padding
- As a user, I can set horizontal alignment (left, center, right)
- As a user, I can set vertical alignment (top, middle, bottom)
- As a user, all my option settings are saved and persist across sessions

### PDF Generation
- As a user, I can click a button to generate and download a PDF of my labels
- As a user, I see how many labels and pages will be generated before creating the PDF
- As a user, the generated PDF is formatted correctly for printing on the selected label sheets
- As a user, I receive clear error messages if something goes wrong during generation

# Label Mail Merge - User Stories

## Core Functionality

### Data Import
- I can paste CSV or TSV data into the app and it automatically detects the delimiter
- Headers are auto-detected based on common field names (name, address, city, etc.)
- If no headers are detected, columns are named Column1, Column2, etc.
- I see a badge showing whether headers were detected and how many records exist

### Template Design
- I can create a label template using placeholders like `<<FieldName>>`
- Available placeholders are shown as clickable buttons below the data input
- Clicking a placeholder button inserts it into my template
- I can use Markdown formatting: `**bold**`, `*italic*`, `~~underline~~`
- Unknown placeholders trigger a warning message

### Paper Format Selection
- I can search through 30+ paper formats including Avery templates (US Letter and A4)
- I can search by format name, description, or product number
- The selected format shows dimensions and labels per sheet
- Generic grid layouts are available for common configurations

### PDF Generation
- I can generate a PDF file with all my labels laid out correctly
- Labels are paginated automatically when they exceed one page
- The PDF downloads automatically when generated

### Configuration Options
- I can enable cut marks around label boundaries
- I can enable border lines for testing alignment
- I can adjust font size (6-72pt)
- I can adjust label padding (0-50pt)
- I can set horizontal alignment (left, center, right)
- I can set vertical alignment (top, middle, bottom)

### Preview
- I see a live preview of what my label will look like
- The preview uses the second data row (or first if only one exists)
- Markdown formatting is rendered in the preview

### Persistence
- All my settings are saved to localStorage
- Reloading the page restores my previous data, template, and settings
- I never lose work due to accidental page refresh

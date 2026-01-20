# CSI - Category Spending Insights

## Overview

A browser-based expense tracker that displays spending data as a pivot table organized by category and month.

## User Stories

### Data Input
- As a user, I can paste TSV (tab-separated values) transaction data into a text area
- As a user, I see the app pre-populated with sample synthetic data to understand how it works
- As a user, my data is automatically saved to localStorage and persists across page refreshes

### Column Detection
- As a user, the app automatically detects standard column names (Date, Merchant, Category, Account, Amount, etc.)
- As a user, the app recognizes common synonyms for columns (e.g., "vendor" for "merchant", "payee" for "merchant")
- As a user, I can have a "FixedCategory" column that overrides the regular Category

### Date Parsing
- As a user, my dates are parsed correctly in ISO format (YYYY-MM-DD)
- As a user, my dates are parsed correctly in US format (MM/DD/YYYY)
- As a user, my dates are parsed correctly in European format (DD/MM/YYYY) when unambiguous

### Amount Handling
- As a user, the app automatically detects whether negative or positive amounts represent expenses
- As a user, amounts are displayed as currency with proper formatting

### Pivot Table View
- As a user, I see my spending organized in a pivot table with categories as rows and months as columns
- As a user, I see totals, means, and medians for each category row
- As a user, I see column totals at the bottom of the pivot table
- As a user, I can select different years to view if my data spans multiple years

### Transaction Drill-Down
- As a user, I can click on any cell in the pivot table to see the individual transactions
- As a user, I can sort the transaction list by any column (date, merchant, amount, etc.)
- As a user, I see visual feedback when hovering over clickable cells

### Display
- As a user, empty cells don't show $0 for cleaner readability
- As a user, long text values are truncated with ellipsis and show full text on hover

## CSI - Category Spending Insights

A simple expense tracker and pivot table viewer. Paste your transaction data in TSV format (tab-separated values) to get a monthly breakdown by spending category.

The app automatically detects common column names (Date, Merchant, Category, Amount, etc.) and handles different date formats (ISO, US MM/DD/YYYY, European DD/MM/YYYY). It also detects whether negative or positive amounts represent expenses. Click on any cell in the pivot table to drill down into the individual transactions for that category and month.

Data is persisted in localStorage, so you won't lose your work when refreshing the page. The app comes pre-populated with sample data to demonstrate its features.

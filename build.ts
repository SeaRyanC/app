#!/usr/bin/env npx tsx
/**
 * Build script that regenerates /docs/index.html based on README.md files from each app.
 * Run this script after modifying any app's README.md.
 */

import * as fs from 'fs';
import * as path from 'path';

const rootDir = path.dirname(new URL(import.meta.url).pathname);
const docsDir = path.join(rootDir, 'docs');

// Find all app directories (those with a README.md and package.json)
function findApps(): { name: string; readme: string; description: string }[] {
  const apps: { name: string; readme: string; description: string }[] = [];
  
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'docs' || entry.name === 'node_modules') continue;
    
    const appDir = path.join(rootDir, entry.name);
    const readmePath = path.join(appDir, 'README.md');
    const packagePath = path.join(appDir, 'package.json');
    
    if (fs.existsSync(readmePath) && fs.existsSync(packagePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');
      // Extract first paragraph after the ## heading as description
      const lines = readme.split('\n');
      let description = '';
      let foundHeading = false;
      for (const line of lines) {
        if (line.startsWith('## ')) {
          foundHeading = true;
          continue;
        }
        if (foundHeading && line.trim()) {
          description = line.trim();
          break;
        }
      }
      apps.push({ name: entry.name, readme, description });
    }
  }
  
  return apps.sort((a, b) => a.name.localeCompare(b.name));
}

function generateIndexHtml(apps: { name: string; readme: string; description: string }[]): string {
  const appCards = apps.map(app => {
    // Get title from README (first ## heading)
    const titleMatch = app.readme.match(/^## (.+)$/m);
    const title = titleMatch ? titleMatch[1] : app.name;
    
    return `    <div class="app-card">
      <h2><a href="${app.name}/">${title}</a></h2>
      <p>${app.description}</p>
    </div>`;
  }).join('\n    \n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SeaRyanC Apps</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      margin: 0;
      padding: 40px 20px;
      background-color: #f5f5f5;
      line-height: 1.6;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      margin-top: 0;
      margin-bottom: 30px;
    }
    .app-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .app-card h2 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    .app-card h2 a {
      color: #007bff;
      text-decoration: none;
    }
    .app-card h2 a:hover {
      text-decoration: underline;
    }
    .app-card p {
      margin: 0;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>SeaRyanC Apps</h1>
    
${appCards}
    
  </div>
</body>
</html>
`;
}

// Main
const apps = findApps();
console.log(`Found ${apps.length} app(s): ${apps.map(a => a.name).join(', ')}`);

const html = generateIndexHtml(apps);
const indexPath = path.join(docsDir, 'index.html');
fs.writeFileSync(indexPath, html);
console.log(`Generated ${indexPath}`);

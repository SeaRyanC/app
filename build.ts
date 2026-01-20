#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface AppInfo {
  name: string;
  dir: string;
  readme: string;
}

function getApps(): AppInfo[] {
  const apps: AppInfo[] = [];
  const rootDir = __dirname;
  
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'docs' || entry.name === 'node_modules') continue;
    
    const appDir = path.join(rootDir, entry.name);
    const readmePath = path.join(appDir, 'README.md');
    
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');
      apps.push({
        name: entry.name,
        dir: entry.name,
        readme: readmeContent
      });
    }
  }
  
  return apps;
}

function readmeToHtml(readme: string): string {
  // Extract content after the first ## heading
  const lines = readme.split('\n');
  let title = '';
  const contentLines: string[] = [];
  let inContent = false;
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (!title) {
        title = line.substring(3).trim();
        inContent = true;
        continue;
      }
    }
    if (inContent) {
      contentLines.push(line);
    }
  }
  
  // Convert paragraphs to HTML
  const content = contentLines.join('\n').trim();
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim());
  const htmlParagraphs = paragraphs.map(p => `<p>${p.replace(/\n/g, ' ').trim()}</p>`).join('\n');
  
  return `<div class="app-card">
<h2><a href="${title.toLowerCase().split(' ')[0]}/">${title}</a></h2>
${htmlParagraphs}
</div>`;
}

function generateIndex(apps: AppInfo[]): string {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SeaRyanC Apps</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #1a1a2e;
      color: #eaeaea;
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
    }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { margin-bottom: 2rem; }
    .app-list { display: grid; gap: 1.5rem; }
    .app-card {
      background: #16213e;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #2a2a4e;
    }
    .app-card h2 { margin: 0 0 0.5rem 0; }
    .app-card h2 a {
      color: #4a9eff;
      text-decoration: none;
    }
    .app-card h2 a:hover { text-decoration: underline; }
    .app-card p { margin: 0.5rem 0; color: #aaa; line-height: 1.6; }
    footer {
      margin-top: 3rem;
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
    footer a { color: #4a9eff; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 SeaRyanC Apps</h1>
    <div class="app-list">
      <!-- APP_LIST_START -->
${apps.map(app => readmeToHtml(app.readme)).join('\n')}
      <!-- APP_LIST_END -->
    </div>
  </div>
  <footer>
    <a href="https://searyanc.dev">SeaRyanC</a> |
    <a href="https://github.com/SeaRyanC/app">GitHub</a>
  </footer>
</body>
</html>`;

  return template;
}

function main() {
  const apps = getApps();
  console.log(`Found ${apps.length} apps: ${apps.map(a => a.name).join(', ')}`);
  
  const indexHtml = generateIndex(apps);
  const outputPath = path.join(__dirname, 'docs', 'index.html');
  
  // Ensure docs directory exists
  const docsDir = path.join(__dirname, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, indexHtml);
  console.log(`Generated ${outputPath}`);
}

main();

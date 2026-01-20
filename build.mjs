#!/usr/bin/env node
/**
 * This script generates /docs/index.html from all app README.md files.
 * Run: node build.mjs
 */

import * as fs from 'fs';
import * as path from 'path';

const rootDir = '.';
const docsDir = path.join(rootDir, 'docs');

// Ensure docs directory exists
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

/**
 * @returns {{ name: string, readme: string }[]}
 */
function getApps() {
  const apps = [];
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('.') || entry.name === 'docs' || entry.name === 'node_modules') continue;
    
    const readmePath = path.join(rootDir, entry.name, 'README.md');
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');
      apps.push({
        name: entry.name,
        readme: readme,
      });
    }
  }
  
  return apps.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * @param {string} markdown
 * @returns {string}
 */
function markdownToHtml(markdown) {
  // Simple markdown to HTML conversion for basic formatting
  return markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<u>$1</u>')
    // Code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[123]>)/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1');
}

/**
 * @param {{ name: string, readme: string }[]} apps
 * @returns {string}
 */
function generateIndexHtml(apps) {
  const appSections = apps.map(app => {
    const html = markdownToHtml(app.readme);
    return `
    <section class="app-section">
      <h2><a href="./${app.name}/">${app.name}</a></h2>
      <div class="app-description">
        ${html}
      </div>
      <a href="./${app.name}/" class="launch-btn">Launch App →</a>
    </section>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SeaRyanC Micro-Apps</title>
  <style>
    * {
      box-sizing: border-box;
    }
    
    :root {
      --primary-color: #4f46e5;
      --primary-hover: #4338ca;
      --bg-color: #f9fafb;
      --card-bg: #ffffff;
      --text-color: #111827;
      --text-secondary: #6b7280;
      --border-color: #e5e7eb;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    
    header {
      background: linear-gradient(135deg, var(--primary-color), #7c3aed);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
    }
    
    header h1 {
      margin: 0;
      font-size: 2.5rem;
    }
    
    header p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
      font-size: 1.1rem;
    }
    
    main {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    
    .app-section {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
      padding: 2rem;
      margin-bottom: 1.5rem;
    }
    
    .app-section h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }
    
    .app-section h2 a {
      color: var(--primary-color);
      text-decoration: none;
    }
    
    .app-section h2 a:hover {
      text-decoration: underline;
    }
    
    .app-description {
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    
    .app-description p {
      margin: 0 0 0.5rem;
    }
    
    .app-description h2,
    .app-description h3 {
      display: none;
    }
    
    .app-description code {
      background: var(--bg-color);
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
      font-size: 0.9em;
    }
    
    .launch-btn {
      display: inline-block;
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    
    .launch-btn:hover {
      background: var(--primary-hover);
    }
    
    footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }
    
    footer a {
      color: var(--primary-color);
      text-decoration: none;
    }
    
    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <header>
    <h1>🚀 SeaRyanC Micro-Apps</h1>
    <p>A collection of vibe-coded micro-applications</p>
  </header>
  
  <main>
    ${appSections}
  </main>
  
  <footer>
    <p>
      Created by <a href="https://searyanc.dev">SeaRyanC</a> |
      <a href="https://github.com/SeaRyanC/app">View on GitHub</a>
    </p>
  </footer>
</body>
</html>`;
}

function main() {
  const apps = getApps();
  console.log(`Found ${apps.length} apps: ${apps.map(a => a.name).join(', ')}`);
  
  const indexHtml = generateIndexHtml(apps);
  const indexPath = path.join(docsDir, 'index.html');
  fs.writeFileSync(indexPath, indexHtml);
  console.log(`Generated ${indexPath}`);
}

main();

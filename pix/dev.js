import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { execSync } from 'child_process';

// Get version from package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;

// Get git commit hash
let commitHash = 'dev';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  // Git not available or not in a git repo
}

const ctx = await esbuild.context({
  entryPoints: ['src/app.tsx'],
  bundle: true,
  outfile: '../docs/pix/app.js',
  format: 'esm',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  sourcemap: true,
  define: {
    '__VERSION__': JSON.stringify(version),
    '__COMMIT_HASH__': JSON.stringify(commitHash)
  }
});

// Copy assets to docs folder
fs.copyFileSync('index.html', '../docs/pix/index.html');
fs.copyFileSync('style.css', '../docs/pix/style.css');

const { host, port } = await ctx.serve({
  servedir: '../docs/pix',
});

console.log(`Development server running at http://${host}:${port}`);
console.log(`Serving pix v${version}+${commitHash}`);
console.log('Press Ctrl+C to stop');

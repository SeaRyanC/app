import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { execSync } from 'child_process';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = pkg.version;

let commitHash = 'dev';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch {
  // Git not available
}

fs.copyFileSync('index.html', '../docs/stl2pdf/index.html');
fs.copyFileSync('style.css', '../docs/stl2pdf/style.css');

const ctx = await esbuild.context({
  entryPoints: ['src/app.tsx'],
  bundle: true,
  outfile: '../docs/stl2pdf/app.js',
  format: 'esm',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  sourcemap: true,
  define: {
    '__VERSION__': JSON.stringify(version),
    '__COMMIT_HASH__': JSON.stringify(commitHash)
  }
});

const { host, port } = await ctx.serve({
  servedir: '../docs/stl2pdf',
});

console.log(`Development server running at http://${host}:${port}`);
console.log(`Serving stl2pdf v${version}+${commitHash}`);
console.log('Press Ctrl+C to stop');

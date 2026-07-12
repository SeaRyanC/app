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

await esbuild.build({
  entryPoints: ['src/app.tsx'],
  bundle: true,
  outfile: '../docs/stl2pdf/app.js',
  format: 'esm',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  define: {
    '__VERSION__': JSON.stringify(version),
    '__COMMIT_HASH__': JSON.stringify(commitHash)
  }
});

console.log(`Built stl2pdf v${version}+${commitHash}`);

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const outdir = '../docs/lmm';

// Get version and commit hash for footer
function getVersionInfo() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const version = packageJson.version;
  let commitHash = 'dev';
  try {
    commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch (e) {
    // Ignore if not in a git repo
  }
  return { version, commitHash };
}

// Ensure output directory exists
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

async function build() {
  try {
    const { version, commitHash } = getVersionInfo();

    // Build the JavaScript bundle
    await esbuild.build({
      entryPoints: ['src/index.tsx'],
      bundle: true,
      outfile: path.join(outdir, 'app.js'),
      format: 'iife',
      target: ['es2022'],
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      jsx: 'automatic',
      jsxImportSource: 'preact',
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.browser': 'true',
        'global': 'window',
        '__APP_VERSION__': JSON.stringify(version),
        '__COMMIT_HASH__': JSON.stringify(commitHash),
      },
      alias: {
        'stream': 'stream-browserify',
        'util': 'util',
        'buffer': 'buffer',
      },
      inject: ['./src/polyfills.js'],
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
    });

    // Copy HTML
    fs.copyFileSync('index.html', path.join(outdir, 'index.html'));

    // Copy CSS
    fs.copyFileSync('style.css', path.join(outdir, 'style.css'));

    console.log('Build complete! Output in', outdir);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();

import { execSync } from 'node:child_process';
import { readFileSync, copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { build, context } from 'esbuild';

const watch = process.argv.includes('--serve');
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string };
let commit = 'dev';
try {
  commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch { /* not a git checkout */ }

const out = '../docs/pvc';
mkdirSync(out, { recursive: true });
copyFileSync('style.css', `${out}/style.css`);
const html = readFileSync('index.html', 'utf8').replace('../docs/pvc/app.js', 'app.js');
writeFileSync(`${out}/index.html`, html);

const options = {
  entryPoints: { app: 'src/index.tsx', worker: 'src/worker.ts' },
  bundle: true,
  outdir: out,
  sourcemap: true,
  minify: !watch,
  jsx: 'automatic' as const,
  jsxImportSource: 'preact',
  define: { __VERSION__: JSON.stringify(pkg.version), __COMMIT__: JSON.stringify(commit) },
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: out });
  console.log(`http://localhost:${port}`);
} else {
  await build(options);
}




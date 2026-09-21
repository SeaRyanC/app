import { copyFileSync } from 'node:fs';
import { context } from 'esbuild';

const docsDir = '../docs/bus';

copyFileSync('index.html', `${docsDir}/index.html`);
copyFileSync('style.css', `${docsDir}/style.css`);

const buildContext = await context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: `${docsDir}/app.js`,
  sourcemap: true,
  jsx: 'automatic',
  jsxImportSource: 'preact',
});

const { host, port } = await buildContext.serve({ servedir: docsDir });
console.log(`Development server running at http://${host ?? 'localhost'}:${port}`);
console.log('Press Ctrl+C to stop');

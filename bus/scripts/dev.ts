import { context } from 'esbuild';
import { copyStaticAssets } from './copy-assets.ts';

const docsDir = '../docs/bus';

await copyStaticAssets();

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

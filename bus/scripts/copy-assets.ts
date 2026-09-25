import { copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = join(import.meta.dirname, '..');
const docsDir = join(appRoot, '..', 'docs', 'bus');

export async function copyStaticAssets(): Promise<void> {
  await mkdir(docsDir, { recursive: true });
  await Promise.all([
    copyFile(join(appRoot, 'index.html'), join(docsDir, 'index.html')),
    copyFile(join(appRoot, 'style.css'), join(docsDir, 'style.css')),
  ]);
  await rm(join(docsDir, 'icons'), { recursive: true, force: true });
  await cp(join(appRoot, 'public', 'icons'), join(docsDir, 'icons'), { recursive: true });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await copyStaticAssets();
}

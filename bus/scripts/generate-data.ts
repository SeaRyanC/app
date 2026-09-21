import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFile as execFileCallback } from 'node:child_process';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';

interface Prototype {
  type?: string;
  name?: string;
  icon?: string;
  icons?: Array<{ icon?: string }>;
  ingredients?: Array<{ type?: string; name?: string; amount?: number; amount_min?: number }>;
  results?: Array<{ type?: string; name?: string; amount?: number; amount_min?: number }>;
  products?: Array<{ type?: string; name?: string; amount?: number; amount_min?: number }>;
}

interface RawData {
  item: Record<string, Prototype>;
  fluid: Record<string, Prototype>;
  recipe: Record<string, Prototype>;
}

interface LocaleData {
  names: Record<string, string>;
}

interface Material {
  id: string;
  name: string;
  kind: 'item' | 'fluid';
  icon: string;
  spaceAge?: boolean;
}

interface Ingredient {
  material: string;
  amount: number;
}

interface Recipe {
  id: string;
  name: string;
  outputs: Ingredient[];
  inputs: Ingredient[];
  alternate?: boolean;
  spaceAge?: boolean;
}

const home = process.env.HOME;
if (!home) throw new Error('HOME is not set');
const execFile = promisify(execFileCallback);

const factorioRoot = join(home, 'Library/Application Support/Steam/steamapps/common/Factorio/factorio.app/Contents');
const scriptOutput = join(home, 'Library/Application Support/factorio/script-output');
const appRoot = join(import.meta.dirname, '..');
const data = JSON.parse(await readFile(join(scriptOutput, 'data-raw-dump.json'), 'utf8')) as RawData;
const locale = JSON.parse(await readFile(join(scriptOutput, 'item-locale.json'), 'utf8')) as LocaleData;
const recipeLocale = JSON.parse(await readFile(join(scriptOutput, 'recipe-locale.json'), 'utf8')) as LocaleData;

await rm(join(appRoot, 'public/icons'), { recursive: true, force: true });
await mkdir(join(appRoot, 'public/icons/fluid'), { recursive: true });

function displayName(id: string): string {
  return locale.names[id] ?? id.replaceAll('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

function isSelectableMaterial(id: string): boolean {
  return !id.startsWith('parameter-') && !['item-unknown', 'no-item', 'empty-module-slot', 'fluid-unknown'].includes(id);
}

function iconSource(prototype: Prototype): string | undefined {
  return prototype.icon ?? prototype.icons?.find(icon => icon.icon)?.icon;
}

function sourcePath(icon: string): string | undefined {
  const match = /^__([^_]+)__\/(.+)$/.exec(icon);
  if (!match) return undefined;
  return join(factorioRoot, 'data', match[1], match[2]);
}

async function copyIcon(id: string, kind: 'item' | 'fluid', prototype: Prototype): Promise<string> {
  const destinationRelative = kind === 'fluid' ? `icons/fluid/${id}.png` : `icons/${id}.png`;
  const destination = join(appRoot, 'public', destinationRelative);
  const renderedSource = join(scriptOutput, kind, `${id}.png`);
  try {
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(renderedSource, destination);
    return destinationRelative;
  } catch {
    // Fall back to the prototype source when Factorio did not render an icon.
  }
  const source = iconSource(prototype);
  if (source) {
    const sourceFile = sourcePath(source);
    if (sourceFile) {
      try {
        await mkdir(dirname(destination), { recursive: true });
        await copyFile(sourceFile, destination);
        const { stdout } = await execFile('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', destination]);
        const dimensions = /pixelWidth:\s+(\d+)[\s\S]*pixelHeight:\s+(\d+)/.exec(stdout);
        if (dimensions && Number(dimensions[1]) > Number(dimensions[2])) {
          const height = Number(dimensions[2]);
          const nativeSize = Math.floor(height / 2);
          const offset = Math.floor(nativeSize / 2);
          await execFile('sips', ['-c', nativeSize.toString(), nativeSize.toString(), '--cropOffset', offset.toString(), offset.toString(), destination]);
          await execFile('sips', ['-z', height.toString(), height.toString(), destination]);
        }
        return destinationRelative;
      } catch {
        // Some prototypes use generated or layered icons that are not standalone files.
      }
    }
  }
  return '';
}

const materials: Material[] = [];
for (const [id, prototype] of Object.entries(data.item)) {
  if (!isSelectableMaterial(id)) continue;
  const icon = await copyIcon(id, 'item', prototype);
  if (!icon) continue;
  const spaceAge = iconSource(prototype)?.startsWith('__space-age__');
  materials.push({ id, name: displayName(id), kind: 'item', icon, ...(spaceAge ? { spaceAge: true } : {}) });
}
for (const [id, prototype] of Object.entries(data.fluid)) {
  if (!isSelectableMaterial(id)) continue;
  const icon = await copyIcon(id, 'fluid', prototype);
  if (!icon) continue;
  const spaceAge = iconSource(prototype)?.startsWith('__space-age__');
  materials.push({ id, name: displayName(id), kind: 'fluid', icon, ...(spaceAge ? { spaceAge: true } : {}) });
}

const materialIds = new Set(materials.map(material => material.id));
const recipeOutputCounts = new Map<string, number>();
for (const prototype of Object.values(data.recipe)) {
  for (const output of (Array.isArray(prototype.results) ? prototype.results : Array.isArray(prototype.products) ? prototype.products : [])) {
    if (output.name && materialIds.has(output.name)) recipeOutputCounts.set(output.name, (recipeOutputCounts.get(output.name) ?? 0) + 1);
  }
}

function ingredientsFrom(entries: Prototype['ingredients'] | Prototype['results'] | Prototype['products']): Ingredient[] {
  return (Array.isArray(entries) ? entries : []).flatMap(entry => {
    if (!entry.name || !materialIds.has(entry.name)) return [];
    return [{ material: entry.name, amount: entry.amount ?? entry.amount_min ?? 1 }];
  });
}

const recipes: Recipe[] = [];
const seenOutputs = new Map<string, number>();
for (const [id, prototype] of Object.entries(data.recipe)) {
  const outputs = ingredientsFrom(prototype.results ?? prototype.products);
  const inputs = ingredientsFrom(prototype.ingredients);
  if (outputs.length === 0 || inputs.length === 0) continue;
  const primaryOutput = outputs[0]?.material;
  const prior = primaryOutput ? (seenOutputs.get(primaryOutput) ?? 0) : 0;
  if (primaryOutput) seenOutputs.set(primaryOutput, prior + 1);
  const recipeName = recipeLocale.names[id] ?? displayName(id);
  const spaceAge = iconSource(data.item[primaryOutput ?? ''] ?? {})?.startsWith('__space-age__');
  recipes.push({
    id,
    name: recipeName,
    outputs,
    inputs,
    ...(prior > 0 ? { alternate: true } : {}),
    ...(spaceAge ? { spaceAge: true } : {})
  });
}

const output = `export interface Material {
  id: string;
  name: string;
  kind: 'item' | 'fluid';
  icon: string;
  spaceAge?: boolean;
}

export interface Ingredient {
  material: string;
  amount: number;
}

export interface Recipe {
  id: string;
  name: string;
  outputs: Ingredient[];
  inputs: Ingredient[];
  alternate?: boolean;
  spaceAge?: boolean;
}

export const materials: Material[] = ${JSON.stringify(materials, null, 2)};

export const recipes: Recipe[] = ${JSON.stringify(recipes, null, 2)};

export const materialById = new Map(materials.map(material => [material.id, material]));

export function recipesForMaterial(materialId: string): Recipe[] {
  return recipes.filter(candidate => candidate.outputs.some(output => output.material === materialId));
}
`;

await writeFile(join(appRoot, 'src/data.ts'), output);
console.log(`Generated ${materials.length} materials, ${recipes.length} recipes, and ${materials.length} icons.`);

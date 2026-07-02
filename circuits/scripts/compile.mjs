import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const artifactsDir = join(root, 'artifacts');
mkdirSync(artifactsDir, { recursive: true });

const wasmPath = join(artifactsDir, 'privacy.wasm');
const r1csPath = join(artifactsDir, 'privacy.r1cs');
const symPath = join(artifactsDir, 'privacy.sym');

const metadata = {
  wasm: wasmPath,
  r1cs: r1csPath,
  sym: symPath,
};
writeFileSync(join(artifactsDir, 'metadata.json'), JSON.stringify(metadata, null, 2));
console.log('Circuit metadata written');

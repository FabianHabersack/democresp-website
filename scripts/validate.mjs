import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../docs');
let checked = 0;
const errors = [];
const htmlFiles = readdirSync(root).filter(file => file.endsWith('.html'));
for (const name of htmlFiles) {
  const file = join(root, name);
  const content = readFileSync(file, 'utf8');
  if (!content.includes('lang="en"')) errors.push(`${name}: missing document language`);
  if ((content.match(/<h1\b/g) || []).length !== 1) errors.push(`${name}: expected one primary heading`);
  const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${name}: duplicate IDs`);
  for (const [, value] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    const [path, hash] = value.split('#');
    let target = resolve(dirname(file), path || name);
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) { errors.push(`${name}: missing ${value}`); continue; }
    if (hash && !readFileSync(target, 'utf8').includes(`id="${hash}"`)) errors.push(`${name}: missing anchor ${value}`);
    checked++;
  }
}
const css = readFileSync(join(root, 'styles.css'), 'utf8');
for (const [, asset] of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)) {
  if (!existsSync(join(root, asset))) errors.push(`styles.css: missing ${asset}`);
  checked++;
}
execFileSync(process.execPath, ['--check', join(root, 'site.js')], { stdio: 'inherit' });
if (readFileSync(join(root, 'CNAME'), 'utf8').trim() !== 'democresp.eu') errors.push('Incorrect custom domain');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${htmlFiles.length} HTML pages, ${checked} local references, JavaScript syntax and custom domain. Static site ready in docs/.`);

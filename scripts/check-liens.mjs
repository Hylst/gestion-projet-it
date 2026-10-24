import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';

const root = process.cwd();
const excluded = new Set(['node_modules', 'dist', '.git', '.worktrees', 'test-results', 'playwright-report', '.superpowers']);
const markdown = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md')) markdown.push(full);
  }
}

walk(root);

const broken = [];
let count = 0;
for (const file of markdown) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().split('#')[0];
    if (!target || target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('#')) continue;
    count++;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) broken.push(`${path.relative(root, file)} -> ${target}`);
  }
}

const app = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');
const routes = [...app.matchAll(/<Route path="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((route) => route !== '*' && !route.includes(':'));

const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const base = 'https://hylst.fr/gestion-projet-it';
const missing = routes.filter((route) => !urls.includes(`${base}${route === '/' ? '/' : route}`));

if (broken.length || missing.length) {
  for (const item of broken) console.error(`lien cassé: ${item}`);
  for (const route of missing) console.error(`route absente du sitemap: ${route}`);
  process.exit(1);
}

console.log(`liens relatifs: ${count}, cassés: 0`);
console.log(`routes: ${routes.length}, sitemap: ${urls.length}`);

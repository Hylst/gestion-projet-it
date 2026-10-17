import { test, expect } from '@playwright/test';

const base = 'http://localhost:4173/gestion-projet-it';
const routes = ['/', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/a-propos'];

test('aucune requete externe, aucune erreur console, toutes les routes au clic puis au rechargement', async ({ page }) => {
  const externals: string[] = [];
  const failures: string[] = [];
  const consoleErrors: string[] = [];
  page.on('request', (r) => { const u = r.url(); if (u.startsWith('http') && !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost')) externals.push(u); });
  page.on('requestfailed', (r) => failures.push(r.url()));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  await page.goto(`${base}/`);
  for (const r of routes) {
    // smoke jalon 0 : navigation directe uniquement (le clic vient en jalon 1 avec la home reel)
    await page.goto(`${base}${r}`);
    await expect(page.locator('#contenu')).toBeVisible();
  }
  expect(externals).toEqual([]);
  expect(failures.filter((u) => !/favicon|manifest|sw\.js/.test(u))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

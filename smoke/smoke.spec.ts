import { test, expect } from '@playwright/test';

const base = 'http://localhost:4173/gestion-projet-it';
const routes = ['/', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/a-propos'];

test('gate jalon 1 : clic accueil vers module 1 et a-propos, rechargement des 8 routes, zero erreur', async ({ page }) => {
  const externals: string[] = [];
  const failures: string[] = [];
  const badStatus: string[] = [];
  const consoleErrors: string[] = [];
  page.on('request', (r) => { const u = r.url(); if (u.startsWith('http') && !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost')) externals.push(u); });
  page.on('requestfailed', (r) => failures.push(r.url()));
  page.on('response', (r) => { if (r.status() >= 400) badStatus.push(`${r.status()} ${r.url()}`); });
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  await page.goto(`${base}/`);
  await page.locator('.module-card .titre', { hasText: 'Cadrer et decouper' }).click();
  await expect(page).toHaveURL(/\/module-1$/);
  await expect(page.locator('#contenu h1')).toHaveText('Cadrer et decouper (WBS)');
  await page.locator('footer a', { hasText: 'A propos' }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(page.locator('#contenu')).toBeVisible();

  for (const r of routes) {
    await page.goto(`${base}${r}`);
    await expect(page.locator('#contenu')).toBeVisible();
  }

  expect(externals).toEqual([]);
  expect(failures.filter((u) => !/favicon|manifest|sw\.js/.test(u))).toEqual([]);
  expect(badStatus.filter((u) => !/favicon|manifest|sw\.js/.test(u))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

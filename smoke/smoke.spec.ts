import { test, expect } from '@playwright/test';

const base = 'http://localhost:4173/gestion-projet-it';
const routes = ['/', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/module-7', '/module-8', '/module-9', '/a-propos', '/glossaire'];

test('gate jalon 1 : clic accueil vers module 1 et a-propos, rechargement des 12 routes, zero erreur', async ({ page }) => {
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
  await page.locator('.module-card .titre', { hasText: 'Cadrer et découper' }).click();
  await expect(page).toHaveURL(/\/module-1$/);
  await expect(page.locator('#contenu h1')).toHaveText('Cadrer et découper (WBS)');
  await page.locator('footer a', { hasText: 'À propos' }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(page.locator('#contenu')).toBeVisible();

  for (const r of routes) {
    await page.goto(`${base}${r}`);
    await expect(page.locator('#contenu')).toBeVisible();
  }

  for (const a of ['manifest.webmanifest', 'sw.js', 'sitemap.xml', 'robots.txt', 'offline.html', 'icon-192.svg', 'icon-512.svg']) {
    const res = await page.request.get(`${base}/${a}`);
    expect(res.status(), a).toBe(200);
  }

  expect(externals).toEqual([]);
  expect(failures).toEqual([]);
  expect(badStatus).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test('labo Eisenhower : depot au clavier et retour du focus', async ({ page }) => {
  await page.goto(`${base}/module-6`);
  const tache = page.getByRole('option', { name: /Corriger le formulaire cassé/ });
  await tache.focus();
  await page.keyboard.press('Enter');
  const placer = page.getByRole('button', { name: 'Placer Corriger le formulaire cassé en Urgent et important' });
  await placer.focus();
  await page.keyboard.press('Enter');
  await expect(tache).toBeFocused();
});

test('module 7 : plan de communication complet', async ({ page }) => {
  await page.goto(`${base}/module-7`);
  const choix = [
    ['Bureau de l’association', 'Point court mensuel et compte rendu'],
    ['Bénévoles', 'Message court et tableau des tâches'],
    ['Financeur fictif', 'Note d’avancement trimestrielle'],
    ['Usagers du quartier', 'Affiche et page d’actualités'],
    ['Mairie fictive', 'Courriel formel aux étapes clés'],
    ['Hébergeur fictif', 'Fiche technique et contact incident'],
  ];
  for (const [partie, canal] of choix) {
    await page.getByRole('group', { name: partie as string }).getByLabel(canal as string).check();
  }
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText('Labo validé : +5 XP (un seul gain).')).toBeVisible();
});

test('module 8 : provisions d alea completes', async ({ page }) => {
  await page.goto(`${base}/module-8`);
  const choix = [
    ['Pages de présentation', 'Provision faible'],
    ['Agenda des activités', 'Provision moyenne'],
    ['Formulaire de contact', 'Provision forte'],
    ['Photos et textes', 'Provision moyenne'],
    ['Mise en ligne', 'Provision forte'],
  ];
  for (const [lot, niveau] of choix) {
    await page.getByRole('group', { name: lot as string }).getByLabel(niveau as string).check();
  }
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText('Labo validé : +5 XP (un seul gain).')).toBeVisible();
});

test('module 9 : leviers d adoption complets', async ({ page }) => {
  await page.goto(`${base}/module-9`);
  const choix = [
    ['Bénévoles peu à l’aise avec le nouvel agenda', 'Formation courte'],
    ['Deux bénévoles motivés peuvent accompagner', 'Relais de proximité'],
    ['Les usagers ignorent la nouvelle page', 'Message répété et simple'],
    ['Le bureau mélange ancien et nouveau processus', 'Message répété et simple'],
    ['Une équipe teste le formulaire et peut montrer le geste', 'Relais de proximité'],
  ];
  for (const [situation, levier] of choix) {
    await page.getByRole('group', { name: situation as string }).getByLabel(levier as string).check();
  }
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText('Labo validé : +5 XP (un seul gain).')).toBeVisible();
});

test('glossaire : definitions et navigation', async ({ page }) => {
  await page.goto(`${base}/glossaire`);
  await expect(page.getByRole('heading', { level: 1, name: 'Glossaire' })).toBeVisible();
  expect(await page.locator('dt').count()).toBeGreaterThanOrEqual(25);
});

test('impression : la fiche reflexe reste visible et le reste est masque', async ({ page }) => {
  await page.goto(`${base}/module-1`);
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.body.classList.add('printing-fiche'));
  try {
    await expect(page.locator('#reflexe')).toBeVisible();
    await expect(page.locator('#fiche')).toBeHidden();
    await expect(page.locator('header.site-header')).toBeHidden();
  } finally {
    await page.evaluate(() => document.body.classList.remove('printing-fiche'));
    await page.emulateMedia({ media: 'screen' });
  }
});

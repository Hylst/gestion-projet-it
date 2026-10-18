import { test, expect } from '@playwright/test';

const base = 'http://localhost:4173/gestion-projet-it';
const routes = ['/', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/module-7', '/module-8', '/module-9', '/a-propos'];

test('gate jalon 1 : clic accueil vers module 1 et a-propos, rechargement des 11 routes, zero erreur', async ({ page }) => {
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
  const tache = page.getByRole('option', { name: /Corriger le formulaire casse/ });
  await tache.focus();
  await page.keyboard.press('Enter');
  const placer = page.getByRole('button', { name: 'Placer Corriger le formulaire casse en Urgent et important' });
  await placer.focus();
  await page.keyboard.press('Enter');
  await expect(tache).toBeFocused();
});

test('module 7 : plan de communication complet', async ({ page }) => {
  await page.goto(`${base}/module-7`);
  const choix = [
    ['Bureau de l association', 'Point court mensuel et compte rendu'],
    ['Benevoles', 'Message court et tableau des taches'],
    ['Financeur fictif', 'Note d avancement trimestrielle'],
    ['Usagers du quartier', 'Affiche et page d actualites'],
    ['Mairie fictive', 'Courriel formel aux etapes cles'],
    ['Hebergeur fictif', 'Fiche technique et contact incident'],
  ];
  for (const [partie, canal] of choix) {
    await page.getByRole('group', { name: partie as string }).getByLabel(canal as string).check();
  }
  await page.getByRole('button', { name: 'Verifier' }).click();
  await expect(page.getByText('Labo valide : +5 XP (un seul gain).')).toBeVisible();
});

test('module 8 : provisions d alea completes', async ({ page }) => {
  await page.goto(`${base}/module-8`);
  const choix = [
    ['Pages de presentation', 'Provision faible'],
    ['Agenda des activites', 'Provision moyenne'],
    ['Formulaire de contact', 'Provision forte'],
    ['Photos et textes', 'Provision moyenne'],
    ['Mise en ligne', 'Provision forte'],
  ];
  for (const [lot, niveau] of choix) {
    await page.getByRole('group', { name: lot as string }).getByLabel(niveau as string).check();
  }
  await page.getByRole('button', { name: 'Verifier' }).click();
  await expect(page.getByText('Labo valide : +5 XP (un seul gain).')).toBeVisible();
});

test('module 9 : leviers d adoption complets', async ({ page }) => {
  await page.goto(`${base}/module-9`);
  const choix = [
    ['Benevoles peu a l aise avec le nouvel agenda', 'Formation courte'],
    ['Deux benevoles motives peuvent accompagner', 'Relais de proximite'],
    ['Les usagers ignorent la nouvelle page', 'Message repete et simple'],
    ['Le bureau melange ancien et nouveau processus', 'Message repete et simple'],
    ['Une equipe teste le formulaire et peut montrer le geste', 'Relais de proximite'],
  ];
  for (const [situation, levier] of choix) {
    await page.getByRole('group', { name: situation as string }).getByLabel(levier as string).check();
  }
  await page.getByRole('button', { name: 'Verifier' }).click();
  await expect(page.getByText('Labo valide : +5 XP (un seul gain).')).toBeVisible();
});

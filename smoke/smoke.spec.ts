import { test, expect } from '@playwright/test';
import { CRITERES, ETAPES, etatInitialDossier } from '../src/lib/capstone';
import { DOSSIER_STORAGE_KEY } from '../src/lib/capstoneStorage';
import { MODULES } from '../src/modules/index';
import { IA_PAGES } from '../src/ia/pages';

const base = process.env.SMOKE_BASE_URL ?? 'http://localhost:4173/gestion-projet-it';
const routes = ['/', '/ia', '/ia/usages', '/ia/methodes', '/ia/outils-configuration', '/ia/gouvernance', '/dossier-projet', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/module-7', '/module-8', '/module-9', '/a-propos', '/glossaire', '/ressources', '/outils', '/modeles'];
const routeTitres: Record<string, string> = {
  '/': 'Gérer un projet informatique, pas à pas',
  '/dossier-projet': 'Dossier projet',
  '/a-propos': 'À propos du projet',
  '/glossaire': 'Glossaire',
  '/ressources': 'Ressources et outils',
  '/outils': 'Fiches outils',
  '/modeles': 'Journal et modèles',
  ...Object.fromEntries(MODULES.map((m) => [`/${m.slug}`, m.titre])),
  ...Object.fromEntries(IA_PAGES.map((p) => [p.path, p.titre])),
};

test('gate jalon 1 : clic accueil vers module 1 et a-propos, rechargement des 21 routes, zero erreur', async ({ page }) => {
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
    await expect(page.locator('#contenu h1').first()).toHaveText(routeTitres[r] as string);
  }

  for (const a of ['manifest.webmanifest', 'sw.js', 'sitemap.xml', 'robots.txt', 'offline.html', 'icon-192.svg', 'icon-512.svg']) {
    const res = await page.request.get(`${base}/${a}`);
    expect(res.status(), a).toBe(200);
  }
  const swBody = await (await page.request.get(`${base}/sw.js`)).text();
  expect(swBody).toContain("const version = 'gestion-projet-it-v8';");

  expect(externals).toEqual([]);
  expect(failures).toEqual([]);
  expect(badStatus).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test('liens internes : routes, ancres et ids valides', async ({ page }) => {
  const broken: string[] = [];
  const duplicateIds: string[] = [];

  for (const route of routes) {
    await page.goto(`${base}${route}`);
    await expect(page.locator('#contenu')).toBeVisible();
    const ids = await page.locator('[id]').evaluateAll((els) => els.map((el) => el.id));
    const duplicates = [...new Set(ids.filter((id, i) => id && ids.indexOf(id) !== i))];
    if (duplicates.length) duplicateIds.push(`${route}: ${duplicates.join(', ')}`);

    const links = await page.locator('a[href]').evaluateAll((els) => els.map((el) => ({
      href: el.getAttribute('href') ?? '',
      text: (el.textContent ?? '').replace(/\s+/g, ' ').trim(),
    })));

    for (const link of links) {
      if (!link.href || link.href.startsWith('http')) continue;
      if (link.href.startsWith('#')) {
        const id = link.href.slice(1);
        if (!id || !ids.includes(id)) broken.push(`${route} -> ${link.href} (${link.text})`);
        continue;
      }
      const url = new URL(link.href, `${base}${route}`);
      const path = url.pathname.replace('/gestion-projet-it', '') || '/';
      if (!routes.includes(path)) broken.push(`${route} -> ${link.href} (${link.text})`);
    }
  }

  expect(broken).toEqual([]);
  expect(duplicateIds).toEqual([]);
});

test('ressources : liens externes et focus clavier', async ({ page }) => {
  await page.goto(`${base}/ressources`);
  const premier = page.getByRole('link', { name: /Scope management/ });
  await premier.focus();
  await expect(premier).toBeFocused();
  await expect(premier).toHaveAttribute('target', '_blank');
  await expect(premier).toHaveAttribute('rel', 'noopener noreferrer');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});

test('outils : navigation clavier et grille', async ({ page }) => {
  await page.goto(`${base}/outils`);
  const lien = page.getByRole('link', { name: 'Accessibilité et qualité' }).first();
  await lien.focus();
  await expect(lien).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
});

test('module 6 : le lien pré-mortem fonctionne au clavier', async ({ page }) => {
  await page.goto(`${base}/module-6`);
  const lien = page.locator('.sommaire a[href="#pre-mortem"]');
  await lien.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#pre-mortem$/);
  await expect(page.locator('#pre-mortem')).toBeVisible();
});

test('journal : saisie locale et rechargement', async ({ page }) => {
  await page.goto(`${base}/modeles`);
  const decision = page.getByLabel('Décision').first();
  await decision.fill('Décision fictive persistante');
  await expect(page.getByText('Enregistré localement')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Décision').first()).toHaveValue('Décision fictive persistante');
  await expect(page.getByRole('button', { name: 'Imprimer le journal' })).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByRole('button', { name: 'Imprimer le journal' })).toBeHidden();
  await expect(page.locator('nav.sommaire')).toBeHidden();
  await expect(page.getByLabel('Décision').first()).toBeVisible();
  await expect(page.getByRole('table').first()).toBeVisible();
  await page.emulateMedia({ media: 'screen' });
});

test('mode hors ligne : la page modèles reste disponible', async ({ page, context }) => {
  await page.goto(`${base}/`);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await page.goto(`${base}/modeles`);
  await page.waitForLoadState('networkidle');
  await page.getByLabel('Décision').first().fill('Décision hors ligne');
  await context.setOffline(true);
  try {
    await page.reload();
    await expect(page.getByRole('heading', { level: 1, name: 'Journal et modèles' })).toBeVisible();
    await expect(page.getByLabel('Décision').first()).toHaveValue('Décision hors ligne');
  } finally {
    await context.setOffline(false);
  }
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
    const impression = await page.locator('#reflexe').evaluate((el) => {
      const fiche = getComputedStyle(el);
      const enveloppe = getComputedStyle(el.closest('.reveal') as Element);
      return { opacite: fiche.opacity, bordure: enveloppe.borderTopWidth, marge: enveloppe.marginTop, padding: enveloppe.paddingTop };
    });
    expect(impression).toEqual({ opacite: '1', bordure: '0px', marge: '0px', padding: '0px' });
  } finally {
    await page.evaluate(() => document.body.classList.remove('printing-fiche'));
    await page.emulateMedia({ media: 'screen' });
  }
});

test('dossier projet : sauvegarde, synthèse, badge et impression', async ({ page }) => {
  await page.goto(`${base}/dossier-projet`);
  await expect(page.getByRole('heading', { level: 1, name: 'Dossier projet' })).toBeVisible();
  await page.getByLabel('Besoin').fill('Besoin fictif du capstone.');
  await expect(page.getByText('Enregistré localement')).toBeVisible();
  await page.reload();
  await expect(page.getByLabel('Besoin')).toHaveValue('Besoin fictif du capstone.');

  const etat = etatInitialDossier();
  etat.etapeCourante = 5;
  for (const etape of ETAPES) {
    for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse fictive.';
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
  }
  for (const critere of CRITERES) etat.autoEvaluation[critere.id] = 3;
  await page.evaluate(
    ({ cle, valeur }) => localStorage.setItem(cle, valeur),
    { cle: DOSSIER_STORAGE_KEY, valeur: JSON.stringify(etat) },
  );
  await page.reload();
  await page.getByRole('button', { name: 'Voir la synthèse' }).click();
  await expect(page.getByText('Dossier complet', { exact: true })).toBeVisible();
  await expect(page.getByText('18/24')).toBeVisible();

  const telechargement = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter en JSON' }).click();
  const fichier = await telechargement;
  expect(fichier.suggestedFilename()).toBe('gestion-projet-it-dossier-projet.json');

  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.capstone-summary')).toBeVisible();
  await expect(page.locator('.capstone-stepper')).toBeHidden();
  await expect(page.locator('.capstone-summary__actions')).toBeHidden();
});

test('section IA : navigation, recherche, glossaire et impression', async ({ page }) => {
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'IA', exact: true }).click();
  await expect(page).toHaveURL(/\/ia$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Gestion de projet et IA' })).toBeVisible();

  const pages = [
    ['/ia/usages', 'Usages de l’IA par phase de projet'],
    ['/ia/methodes', 'Méthodes et évaluation'],
    ['/ia/outils-configuration', 'Outils, environnement et configuration'],
    ['/ia/gouvernance', 'Gouvernance, risques et qualité'],
  ] as const;
  for (const [path, titre] of pages) {
    await page.goto(`${base}${path}`);
    await expect(page.getByRole('heading', { level: 1, name: titre })).toBeVisible();
  }

  await page.goto(`${base}/ia`);
  await page.getByLabel('Rechercher dans le cours').fill('RAG documentaire');
  const resultat = page.getByRole('button', { name: /Recherche documentaire et RAG/ });
  await expect(resultat).toBeVisible();
  await resultat.click();
  await expect(page).toHaveURL(/\/ia\/methodes$/);
  await expect(page.locator('#contexte')).toBeInViewport();

  await page.goto(`${base}/glossaire`);
  await expect(page.getByText('RAG', { exact: true })).toBeVisible();

  await page.goto(`${base}/ia/outils-configuration`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.ia-checklist')).toBeVisible();
  await expect(page.locator('.ia-sommaire')).toBeHidden();
  await page.emulateMedia({ media: 'screen' });
});

# Menu des 17 sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Afficher les 17 sections du site sur une seule ligne défilante dans le header, avec lien actif visible et sans débordement horizontal du document.

**Architecture:** Header à deux niveaux. La première ligne garde la marque, la recherche et la progression. La seconde est un ruban `overflow-x: auto` contenant une liste `flex-wrap: nowrap` de 17 liens. Un état actif basé sur `useLocation` gère `aria-current`, le centrage du lien actif et les dégradés de bord.

**Tech Stack:** React 19, TypeScript, React Router 7, CSS natif, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-09-menu-17-sections-design.md`

## Global Constraints

- 100 % front, aucune dépendance npm ajoutée, aucune requête externe, aucun cookie, aucune donnée sortante.
- Aucune nouvelle route, aucun changement de sitemap, de service worker ou de stockage.
- Les 31 routes publiques et leurs titres restent inchangés.
- Typographie française stricte : accents, apostrophe `’`, espaces insécables avant `: ; ? !`, aucun tiret cadratin.
- Accessibilité WCAG 2.2 AA : liens natifs, focus visible, `aria-current`, contrastes AA, aucun piège au clavier.
- Le header reste masqué à l'impression.
- Les changements de contenu se limitent aux libellés du menu.
- Les tests existants, le lint, le typecheck, le contrôle des liens, le build et le smoke doivent rester verts.

## Review Focus

1. **Débordement à 320 px** : le ruban doit défiler à l'intérieur du header, sans élargir le document ni créer de `scrollX`.
2. **Route profonde** : `/module-9`, `/ia/gouvernance` et `/cybersecurite/incident` doivent activer la bonne entrée et la rendre visible dans le ruban.
3. **Focus clavier près des bords** : le lien focalisé doit rester visible et son anneau de focus ne doit pas être coupé par le conteneur.
4. **Mouvement réduit** : le centrage du lien actif ne doit pas animer quand `prefers-reduced-motion: reduce` est actif.
5. **Header sticky et ancres** : le header ne doit pas masquer la cible d'un lien de sommaire comme `#quiz`.

---

## Préparation

- [ ] **Step 0.1 : Créer le worktree via Orca**

Run:

```bash
orca worktree create --repo path:D:/0CODE/OpenCode/gestion-projet-it --name menu-17-sections --no-parent --json
```

Expected: un worktree sous `D:/Users/Geoffroy/orca/workspaces/gestion-projet-it/menu-17-sections`.

- [ ] **Step 0.2 : Déplacer la session et les documents de conception**

Copier `docs/superpowers/specs/2026-11-09-menu-17-sections-design.md` et ce plan dans le worktree, puis déplacer la session avec `tools.opencode.session_move` vers le dossier du worktree.

- [ ] **Step 0.3 : Vérifier la base**

Run:

```bash
git status --short --branch
npm ci
```

Expected: branche `menu-17-sections`, aucune modification non suivie en dehors des documents de conception.

---

### Task 1: Ajouter le libellé court des modules

**Files:**
- Modify: `src/modules/index.ts:9-22` (interface `ModuleMeta`)
- Modify: `src/modules/index.ts:24-177` (les 9 objets de `MODULES`)
- Test: `tests/header.test.tsx`

**Interfaces:**
- Produces: `ModuleMeta.navLabel: string`, libellé court utilisé par le header.

- [ ] **Step 1: Écrire le test qui échoue**

Ajouter dans `tests/header.test.tsx` :

```tsx
import { MODULES } from '../src/modules/index';

it('chaque module expose un libellé court pour le menu', () => {
  expect(MODULES.map((m) => m.navLabel)).toEqual([
    'Cadrer et découper',
    'Planifier',
    'Méthodes',
    'Agiles',
    'Outils et CI/CD',
    'Équipe et risques',
    'Parties prenantes',
    'Budget',
    'Changement',
  ]);
});
```

- [ ] **Step 2: Lancer le test pour vérifier l'échec**

Run: `npm test tests/header.test.tsx`

Expected: FAIL, `navLabel` absent ou tableau de `undefined`.

- [ ] **Step 3: Ajouter le champ et les valeurs**

Dans `ModuleMeta`, ajouter `navLabel: string;` après `titre`.

Dans chaque module de `MODULES`, ajouter la valeur correspondante :

| Module | `navLabel` |
| --- | --- |
| 1 | `Cadrer et découper` |
| 2 | `Planifier` |
| 3 | `Méthodes` |
| 4 | `Agiles` |
| 5 | `Outils et CI/CD` |
| 6 | `Équipe et risques` |
| 7 | `Parties prenantes` |
| 8 | `Budget` |
| 9 | `Changement` |

- [ ] **Step 4: Lancer le test pour vérifier le passage**

Run: `npm test tests/header.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/modules/index.ts tests/header.test.tsx
git commit -m "feat(menu): ajoute les libellés courts des modules"
```

---

### Task 2: Construire les 17 liens et l'état actif

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `tests/header.test.tsx`

**Interfaces:**
- Consumes: `MODULES` et `ModuleMeta.navLabel` depuis la Task 1.
- Produces: un header avec `.header-inner` pour la marque et les outils, puis `.header-nav-wrap > nav.header-nav > ul.header-nav-list` avec 17 liens.

- [ ] **Step 1: Écrire les tests qui échouent**

Remplacer le contenu de `tests/header.test.tsx` par les cas suivants, en gardant l'import de `MODULES` :

```tsx
const LIBELLES = [
  'Accueil',
  ...MODULES.map((m) => `Module ${m.num} · ${m.navLabel}`),
  'Dossier projet',
  'IA',
  'Cybersécurité',
  'Fiches outils',
  'Glossaire',
  'Ressources',
  'À propos',
];

it('affiche les 17 entrées dans l ordre', () => {
  const { container } = rendu();
  const liens = Array.from(container.querySelectorAll('.header-nav a'));
  expect(liens).toHaveLength(17);
  expect(liens.map((a) => a.textContent)).toEqual(LIBELLES);
});

it('place le ruban hors de la première ligne', () => {
  const { container } = rendu();
  const header = container.querySelector('header.site-header');
  expect(header?.querySelector('.header-inner nav')).toBeNull();
  expect(header?.querySelector('.header-nav-wrap nav[aria-label="Navigation principale"]')).not.toBeNull();
  expect(header?.querySelector('.header-inner #header-tools')).not.toBeNull();
});

it('marque l entrée active selon la route', () => {
  const cas: Array<[string, string, string]> = [
    ['/', 'Accueil', 'page'],
    ['/module-6', 'Module 6 · Équipe et risques', 'page'],
    ['/ia', 'IA', 'page'],
    ['/ia/usages', 'IA', 'true'],
    ['/cybersecurite', 'Cybersécurité', 'page'],
    ['/cybersecurite/menaces', 'Cybersécurité', 'true'],
    ['/outils', 'Fiches outils', 'page'],
  ];
  for (const [route, libelle, courant] of cas) {
    const { container, unmount } = rendu(route);
    const lien = Array.from(container.querySelectorAll('.header-nav a'))
      .find((a) => a.textContent === libelle);
    expect(lien?.getAttribute('aria-current')).toBe(courant);
    unmount();
  }
});

it('conserve le titre complet des modules en attribut title', () => {
  const { container } = rendu('/module-1');
  const lien = container.querySelector('.header-nav a[href="/module-1"]');
  expect(lien?.getAttribute('title')).toBe('Cadrer et découper (WBS)');
});
```

- [ ] **Step 2: Lancer les tests pour vérifier l'échec**

Run: `npm test tests/header.test.tsx`

Expected: FAIL, le header ne contient pas encore les 17 liens ni `.header-nav`.

- [ ] **Step 3: Implémenter la structure et l'état actif**

Dans `src/components/SiteHeader.tsx`, remplacer `NavLink` par `Link` et `useLocation`.

Définir la liste interne :

```tsx
interface NavItem {
  to: string;
  label: string;
  titre?: string;
  section?: boolean;
}

const LIENS: NavItem[] = [
  { to: '/', label: 'Accueil' },
  ...MODULES.map((m) => ({
    to: `/${m.slug}`,
    label: `Module ${m.num} · ${m.navLabel}`,
    titre: m.titre,
  })),
  { to: '/dossier-projet', label: 'Dossier projet' },
  { to: '/ia', label: 'IA', section: true },
  { to: '/cybersecurite', label: 'Cybersécurité', section: true },
  { to: '/outils', label: 'Fiches outils' },
  { to: '/glossaire', label: 'Glossaire' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/a-propos', label: 'À propos' },
];
```

Calculer l'état :

```tsx
const { pathname } = useLocation();

function estActif(item: NavItem): boolean {
  return item.section
    ? pathname === item.to || pathname.startsWith(`${item.to}/`)
    : pathname === item.to;
}

function courant(item: NavItem): 'page' | 'true' | undefined {
  if (pathname === item.to) return 'page';
  return estActif(item) ? 'true' : undefined;
}
```

Rendre :

```tsx
<header className="site-header" role="banner">
  <div className="header-inner">
    <div className="brand">
      <a className="skip-link" href="#contenu" data-testid="skip">Aller au contenu</a>
      <Link className="brand-link" to="/">
        <span className="logo-mark" aria-hidden="true"><span /></span>
        <strong>Gestion de Projet IT</strong>
        <span className="brand-sub">Méthodologies et Équipes</span>
      </Link>
    </div>
    <div id="header-tools"><SearchBar /> <ProgressHeader /></div>
  </div>
  <div className="header-nav-wrap">
    <nav className="header-nav" aria-label="Navigation principale">
      <ul className="header-nav-list">
        {LIENS.map((item) => (
          <li key={item.to}>
            <Link to={item.to} aria-current={courant(item)} title={item.titre}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</header>
```

Ne pas ajouter d'`aria-label` sur les liens : le texte visible doit rester le nom accessible. Le `title` complet est un complément pour la souris.

- [ ] **Step 4: Lancer les tests pour vérifier le passage**

Run: `npm test tests/header.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.tsx tests/header.test.tsx
git commit -m "feat(menu): affiche les 17 sections et l etat actif"
```

---

### Task 3: Mettre le ruban sur une ligne et corriger le responsive

**Files:**
- Modify: `src/styles/index.css:192-216`
- Modify: `src/styles/editorial.css:65-84`
- Test: `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: `.header-nav-wrap`, `.header-nav`, `.header-nav-list` produits par la Task 2.
- Produces: un ruban `overflow-x: auto`, `flex-wrap: nowrap`, avec scrollbar fine et sans débordement du document.

- [ ] **Step 1: Écrire les tests smoke qui échouent**

Ajouter dans `smoke/smoke.spec.ts` :

```ts
test('menu : 17 entrées sur une ligne et défilement horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`${base}/`);
  await fermerOnboarding(page);

  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  await expect(nav.getByRole('link')).toHaveCount(17);

  const mesures = await nav.evaluate((el) => {
    const liste = el.querySelector('ul') as HTMLElement;
    const premier = el.querySelector('a') as HTMLElement;
    return {
      wrap: getComputedStyle(liste).flexWrap,
      hauteurListe: liste.getBoundingClientRect().height,
      hauteurLien: premier.getBoundingClientRect().height,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    };
  });

  expect(mesures.wrap).toBe('nowrap');
  expect(mesures.hauteurListe).toBeLessThan(mesures.hauteurLien * 1.8);
  expect(mesures.scrollWidth).toBeGreaterThan(mesures.clientWidth);

  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(`${base}/`);
  await fermerOnboarding(page);

  const largeurDocument = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(largeurDocument).toBeLessThanOrEqual(321);

  const mesuresEtroites = await nav.evaluate((el) => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
  }));
  expect(mesuresEtroites.scrollWidth).toBeGreaterThan(mesuresEtroites.clientWidth);
});

test('menu : le header sticky ne masque pas les ancres', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`${base}/module-1`);
  await fermerOnboarding(page);

  await page.locator('nav.sommaire a[href="#quiz"]').click();

  const positions = await page.evaluate(() => {
    const header = document.querySelector('header.site-header') as HTMLElement;
    const cible = document.querySelector('#quiz') as HTMLElement;
    return {
      basHeader: header.getBoundingClientRect().bottom,
      hautCible: cible.getBoundingClientRect().top,
    };
  });

  expect(positions.hautCible).toBeGreaterThanOrEqual(positions.basHeader - 2);
});
```

- [ ] **Step 2: Lancer les tests pour vérifier l'échec**

Run:

```bash
npm run build
npm run smoke -- --grep "menu :"
```

Expected: FAIL, le ruban se replie ou le document déborde à 320 px.

- [ ] **Step 3: Écrire les styles du ruban**

Dans `src/styles/index.css`, remplacer le bloc header actuel par la structure suivante, en conservant les styles de marque et de recherche existants :

```css
.site-header { z-index: 40; background: var(--c-surface); border-bottom: 1px solid var(--c-line); }
.header-inner { max-width: var(--maxw); margin: 0 auto; padding: 0.75rem 1.25rem 0.5rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; }
#header-tools { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-left: auto; }

.header-nav-wrap { max-width: var(--maxw); margin: 0 auto; position: relative; border-top: 1px solid var(--c-line); }
.header-nav {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.35rem 1.25rem 0.45rem;
  scrollbar-width: thin;
  scrollbar-color: var(--c-line) transparent;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}
.header-nav-list { display: flex; flex-wrap: nowrap; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.header-nav a {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  color: var(--c-main-ink);
  text-decoration: none;
  white-space: nowrap;
}
.header-nav a:hover { background: var(--c-bg); }
.header-nav a[aria-current='page'],
.header-nav a[aria-current='true'] { background: var(--c-main); color: #fff; }
.header-nav a:focus-visible { position: relative; z-index: 3; }
.header-nav::-webkit-scrollbar { height: 6px; }
.header-nav::-webkit-scrollbar-track { background: transparent; }
.header-nav::-webkit-scrollbar-thumb { background: var(--c-line); border-radius: 999px; }

@media (prefers-reduced-motion: reduce) {
  .header-nav { scroll-behavior: auto; }
}

@media (min-width: 70rem) {
  .site-header { position: sticky; top: 0; }
  #contenu, main [id] { scroll-margin-top: 8rem; }
  #header-tools { flex-wrap: nowrap; }
  .search { min-width: 0; }
  .search input { width: 10rem; min-width: 0; }
}

@media not all and (min-width: 70rem) {
  #header-tools { width: 100%; margin-left: 0; }
  .search, .search input { width: 100%; }
  .search input { min-width: 0; }
}
```

Dans `src/styles/editorial.css`, mettre à jour les sélecteurs du header :

```css
.header-inner { padding-top: 0.9rem; padding-bottom: 0.55rem; }
.header-nav-wrap { border-top-color: rgba(225, 222, 212, 0.9); }
.header-nav a { border-radius: 999px; font-size: 0.93rem; }
.header-nav a:hover { background: var(--accent-soft); color: var(--accent-ink); }
.header-nav a[aria-current="page"],
.header-nav a[aria-current="true"] { background: var(--c-ink); color: #fff; box-shadow: 0 5px 14px rgba(21, 22, 31, 0.16); }
```

- [ ] **Step 4: Relancer les tests pour vérifier le passage**

Run:

```bash
npm run build
npm run smoke -- --grep "menu :"
```

Expected: PASS pour les deux tests.

- [ ] **Step 5: Commit**

```bash
git add src/styles/index.css src/styles/editorial.css smoke/smoke.spec.ts
git commit -m "feat(menu): met le ruban sur une ligne responsive"
```

---

### Task 4: Centrer le lien actif et afficher les dégradés de bord

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Test: `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: `railRef` sur `nav.header-nav`, `pathname` de `useLocation`.
- Produces: `header-nav-wrap` avec les classes `is-debut` et `is-fin`, et un centrage du lien actif sans défilement de la page.

- [ ] **Step 1: Écrire les tests smoke qui échouent**

Ajouter dans `smoke/smoke.spec.ts` :

```ts
test('menu : lien actif visible sur route profonde, clavier et mouvement réduit', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(`${base}/module-9`);
  await fermerOnboarding(page);

  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  const module9 = nav.getByRole('link', { name: 'Module 9 · Changement' });
  await expect(module9).toHaveAttribute('aria-current', 'page');
  await expect(module9).toBeInViewport();
  expect(await nav.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

  await page.goto(`${base}/ia/gouvernance`);
  await fermerOnboarding(page);
  const ia = nav.getByRole('link', { name: 'IA' });
  await expect(ia).toHaveAttribute('aria-current', 'true');
  await expect(ia).toBeInViewport();

  await page.goto(`${base}/cybersecurite/incident`);
  await fermerOnboarding(page);
  const cyber = nav.getByRole('link', { name: 'Cybersécurité' });
  await expect(cyber).toHaveAttribute('aria-current', 'true');
  await expect(cyber).toBeInViewport();

  const apropos = nav.getByRole('link', { name: 'À propos' });
  await apropos.focus();
  await expect(apropos).toBeInViewport();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/module-9`);
  await fermerOnboarding(page);
  await expect(module9).toBeInViewport();
});
```

- [ ] **Step 2: Lancer le test pour vérifier l'échec**

Run:

```bash
npm run build
npm run smoke -- --grep "lien actif visible"
```

Expected: FAIL, Module 9 ou À propos hors de la vue du ruban.

- [ ] **Step 3: Implémenter le centrage et les dégradés**

Dans `src/components/SiteHeader.tsx`, ajouter `useEffect`, `useRef`, `useState`.

Ajouter la référence et les états :

```tsx
const railRef = useRef<HTMLElement>(null);
const [debut, setDebut] = useState(true);
const [fin, setFin] = useState(true);
```

Ajouter l'effet de mesure des bords :

```tsx
useEffect(() => {
  const rail = railRef.current;
  if (!rail) return;

  const maj = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    setDebut(rail.scrollLeft <= 1);
    setFin(rail.scrollLeft >= max - 1);
  };

  maj();
  rail.addEventListener('scroll', maj, { passive: true });
  window.addEventListener('resize', maj);
  return () => {
    rail.removeEventListener('scroll', maj);
    window.removeEventListener('resize', maj);
  };
}, []);
```

Ajouter l'effet de centrage :

```tsx
useEffect(() => {
  const rail = railRef.current;
  if (!rail || !rail.clientWidth) return;

  const actif = rail.querySelector<HTMLElement>('[aria-current]');
  if (!actif) return;

  const railRect = rail.getBoundingClientRect();
  const actifRect = actif.getBoundingClientRect();
  const marge = 24;
  if (actifRect.left >= railRect.left + marge && actifRect.right <= railRect.right - marge) return;

  const cible = Math.max(
    0,
    rail.scrollLeft + (actifRect.left - railRect.left) - (rail.clientWidth - actif.offsetWidth) / 2,
  );
  const reduire = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const options: ScrollToOptions = { left: cible, behavior: reduire ? 'auto' : 'smooth' };

  if (typeof rail.scrollTo === 'function') rail.scrollTo(options);
  else rail.scrollLeft = cible;
}, [pathname]);
```

Ajouter `ref={railRef}` sur `nav.header-nav` et les classes sur l'enveloppe :

```tsx
<div className={`header-nav-wrap${debut ? ' is-debut' : ''}${fin ? ' is-fin' : ''}`}>
```

Dans `src/styles/index.css`, ajouter les dégradés :

```css
.header-nav-wrap::before,
.header-nav-wrap::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 2.5rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms ease;
}
.header-nav-wrap::before { left: 0; background: linear-gradient(90deg, var(--c-surface), transparent); }
.header-nav-wrap::after { right: 0; background: linear-gradient(270deg, var(--c-surface), transparent); }
.header-nav-wrap:not(.is-debut)::before { opacity: 1; }
.header-nav-wrap:not(.is-fin)::after { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .header-nav-wrap::before,
  .header-nav-wrap::after { transition: none; }
}
```

- [ ] **Step 4: Relancer les tests pour vérifier le passage**

Run:

```bash
npm run build
npm run smoke -- --grep "lien actif visible"
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteHeader.tsx src/styles/index.css smoke/smoke.spec.ts
git commit -m "feat(menu): centre le lien actif et indique les bords"
```

---

### Task 5: Vérifier, documenter et clôturer

**Files:**
- Modify: `docs/superpowers/specs/2026-11-09-menu-17-sections-design.md` (statut)
- Modify: `docs/README.md` (index des specs et plans)
- Modify: `CHANGELOG.md` (entrée non publiée)

- [ ] **Step 1: Mettre à jour la spec et l'index**

Dans la spec, remplacer `Statut : proposé, en attente de validation.` par `Statut : livré le 9 novembre 2026.`

Dans `docs/README.md`, ajouter dans le tableau des specs :

```md
| 2026-11-09 | Menu des 17 sections (`superpowers/specs/2026-11-09-menu-17-sections-design.md`) | Livré | Ruban horizontal, 17 entrées et responsive |
```

Et dans le tableau des plans :

```md
| 2026-11-09 | Plan menu des 17 sections (`superpowers/plans/2026-11-09-menu-17-sections.md`) | Livré | Header à deux niveaux et tests |
```

- [ ] **Step 2: Ajouter l'entrée de changelog**

Sous le titre `# Changelog`, ajouter :

```md
## [Unreleased]

### Menu des 17 sections

- Navigation principale portée à 17 entrées : 9 modules, dossier projet, IA, cybersécurité, fiches outils, glossaire, ressources et à propos.
- Ruban horizontal sur une ligne, défilement tactile et clavier, lien actif ramené dans la vue, dégradés de bord.
- Header à deux niveaux : marque, recherche et progression au-dessus, ruban de section en dessous.
- Aucune route, aucune donnée locale et aucun appel réseau ajoutés.
```

Ne pas modifier la version, le service worker ni le dossier Docker dans ce lot.

- [ ] **Step 3: Lancer les gates complètes**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
npm run smoke
```

Expected: toutes les commandes passent, smoke complet au vert.

- [ ] **Step 4: Vérifier le rendu final**

Run:

```bash
npm run preview
```

Dans un navigateur, vérifier à 1280 px, 768 px et 320 px :

- les 17 entrées sont présentes dans l'ordre ;
- le ruban ne se replie pas ;
- le lien actif est visible sur `/`, `/module-9`, `/ia/gouvernance` et `/cybersecurite/incident` ;
- le document ne défile pas horizontalement à 320 px ;
- le header sticky ne masque pas les ancres de module ;
- le focus clavier reste visible.

- [ ] **Step 5: Commit final**

```bash
git add docs/superpowers/specs/2026-11-09-menu-17-sections-design.md docs/superpowers/plans/2026-11-09-menu-17-sections.md docs/README.md CHANGELOG.md
git commit -m "docs(menu): documente le ruban des 17 sections"
```

---

## Self-Review

- Spec coverage : les 17 entrées, l'ordre, l'état actif, le défilement, les dégradés, le responsive, le sticky, les tests et les non-objectifs sont couverts par les Tasks 1 à 5.
- Type consistency : `navLabel` est défini en Task 1 et consommé en Task 2 ; `railRef`, `debut` et `fin` sont définis et utilisés en Task 4.
- Review Focus : chaque ligne possède un test dans la task qui la concerne (320 px en Task 3, routes profondes et focus en Task 4, mouvement réduit en Task 4, ancres sticky en Task 3).
- Proportion : le plan reste centré sur quatre fichiers de production et deux fichiers de tests, sans nouvelle abstraction.

# Cycle graphismes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recomposer le hero d’accueil en trois panneaux lisibles et ajouter neuf pictos de module sur les cartes et les en-têtes.

**Architecture:** Trois panneaux HTML avec un SVG inline par panneau pour le hero, un composant `ModulePicto` unique pour les neuf pictos, puis intégration dans les cartes de l’accueil et dans `ModuleLayout`. Aucun état, aucune requête, aucun asset externe.

**Tech Stack:** Vite, React 18, TypeScript, Vitest, Testing Library, Playwright, SVG inline.

## Global Constraints

- Aucune dépendance nouvelle, aucune police, aucune image externe.
- Aucun texte de cours modifié. Les seules chaînes visibles ajoutées sont « Module N » sur les cartes et les libellés du hero déjà présents.
- Typographie : apostrophe `’`, NBSP avant `: ; ? !`, aucun tiret cadratin.
- Base de l’application : `/gestion-projet-it/`.
- Tests : 141 existants, 144 après le plan.
- Smoke : 7 tests.
- Lighthouse mobile performance et accessibilité supérieures ou égales à 90.
- Commandes : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- Aucun script temporaire dans `.shots/` ne doit rester au moment du lint : ESLint lint les `.cjs` de ce dossier.
- Aucun commit plateforme ni push sans accord explicite.

---

### Task 1: Composant ModulePicto

**Files:**
- Create: `src/components/ModulePicto.tsx`
- Modify: `src/styles/index.css`
- Test: `tests/pictos.test.tsx`

**Interfaces:**
- Consumes: rien.
- Produces: `ModulePicto(props: { num: number }): JSX.Element | null`, classes `.module-picto`, `.picto-soft`, `.picto-calm`, `.picto-plat`.

- [ ] **Step 1: Écrire le test rouge**

Créer `tests/pictos.test.tsx` :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { ModulePicto } from '../src/components/ModulePicto';

afterEach(cleanup);

describe('pictos de module', () => {
  it('les neuf numéros rendent un picto décoratif', () => {
    for (let num = 1; num <= 9; num += 1) {
      const { container, unmount } = render(<ModulePicto num={num} />);
      const svg = container.querySelector('svg.module-picto');
      expect(svg, `module ${num}`).not.toBeNull();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
      unmount();
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: FAIL, module `../src/components/ModulePicto` introuvable.

- [ ] **Step 3: Écrire le composant minimal**

Créer `src/components/ModulePicto.tsx` :

```tsx
import type { ReactNode } from 'react';

const PICTOGRAMMES: Record<number, ReactNode> = {
  1: (
    <>
      <path d="M12 6v4M6 10h12M6 10v6M12 10v6M18 10v6" />
      <rect x="9" y="2" width="6" height="4" rx="1" className="picto-soft" />
      <rect x="3" y="16" width="6" height="4" rx="1" />
      <rect x="9" y="16" width="6" height="4" rx="1" />
      <rect x="15" y="16" width="6" height="4" rx="1" />
    </>
  ),
  2: (
    <>
      <path d="M4 3v18" />
      <rect x="7" y="5" width="12" height="3.4" rx="1.7" className="picto-calm picto-plat" />
      <rect x="10" y="10.3" width="9" height="3.4" rx="1.7" />
      <rect x="7" y="15.6" width="7" height="3.4" rx="1.7" />
    </>
  ),
  3: (
    <>
      <path d="M3 4l9 15 9-15" />
      <circle cx="7" cy="8" r="2" className="picto-soft" />
      <circle cx="17" cy="8" r="2" />
    </>
  ),
  4: (
    <>
      <rect x="3" y="3" width="5" height="18" rx="1.5" />
      <rect x="9.5" y="3" width="5" height="18" rx="1.5" />
      <rect x="16" y="3" width="5" height="18" rx="1.5" />
      <rect x="10.5" y="6" width="3" height="4" rx="1" className="picto-calm picto-plat" />
      <path d="M4.5 6h2M17.5 6h2M4.5 10h2M11 10h2M17.5 10h2" />
    </>
  ),
  5: (
    <>
      <rect x="2.5" y="9" width="5.5" height="6" rx="1" className="picto-soft" />
      <rect x="16" y="9" width="5.5" height="6" rx="1" />
      <path d="M8 12h7m-3-3 3 3-3 3" />
    </>
  ),
  6: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 3v18M3 12h18" />
      <rect x="3" y="3" width="9" height="9" rx="2" className="picto-calm picto-plat" />
    </>
  ),
  7: (
    <>
      <circle cx="6" cy="6" r="2.5" className="picto-soft" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 7.3l7 0M7.4 8.4l3.2 7.2M16.6 8.4l-3.2 7.2" />
    </>
  ),
  8: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="2.5" className="picto-calm" />
      <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
      <path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
      <path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    </>
  ),
  9: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 3v5h-5z" className="picto-soft" />
    </>
  ),
};

export function ModulePicto(props: { num: number }) {
  const contenu = PICTOGRAMMES[props.num];
  if (!contenu) return null;
  return (
    <svg className="module-picto" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {contenu}
    </svg>
  );
}
```

- [ ] **Step 4: Ajouter les styles globaux**

Dans `src/styles/index.css`, après le bloc `:root` et avant les styles de header, ajouter :

```css
.module-picto {
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: color 0.2s ease;
}
.module-picto .picto-soft { fill: var(--c-soft); }
.module-picto .picto-calm { fill: var(--c-calm); }
.module-picto .picto-plat { stroke: none; }
```

- [ ] **Step 5: Relancer le test**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: PASS, 1 test.

- [ ] **Step 6: Commit**

```bash
git add src/components/ModulePicto.tsx src/styles/index.css tests/pictos.test.tsx
git commit -m "feat: pictos des neuf modules"
```

---

### Task 2: Hero en trois panneaux

**Files:**
- Modify: `src/routes/accueil.tsx:8-51`
- Modify: `src/styles/hero.css:1-14`
- Test: `tests/hero.test.tsx`

**Interfaces:**
- Consumes: rien.
- Produces: `.hero-panels`, `.hero-panel`, `.hero-panel-titre`, `.hero-panel-svg`, `.hero-panel-legende`, `.hero-today`, `.hero-mirror`.

- [ ] **Step 1: Renforcer le test du hero**

Remplacer le test de `tests/hero.test.tsx` par :

```tsx
it('la section hero utilise la classe hero et trois panneaux', () => {
  const { container } = render(
    <ProgressProvider>
      <MemoryRouter>
        <Accueil />
      </MemoryRouter>
    </ProgressProvider>,
  );
  const section = container.querySelector('section.hero');
  expect(section).not.toBeNull();
  expect(section?.querySelector('h1')?.textContent).toContain('Gérer un projet informatique');
  const panneaux = container.querySelectorAll('.hero-panel');
  expect(panneaux).toHaveLength(3);
  expect(
    Array.from(panneaux).map((p) => p.querySelector('.hero-panel-titre')?.textContent),
  ).toEqual(['GANTT', 'Kanban', 'Cycle en V']);
  expect(container.querySelectorAll('.hero-panel-legende')).toHaveLength(3);
  expect(container.querySelectorAll('.hero-panel svg[aria-hidden="true"]')).toHaveLength(3);
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/hero.test.tsx`
Expected: FAIL, 0 panneau au lieu de 3.

- [ ] **Step 3: Remplacer le hero JSX**

Dans `src/routes/accueil.tsx`, remplacer la fonction `Hero` par :

```tsx
function Hero() {
  return (
    <section className="hero reveal visible">
      <p className="kicker">Cours interactif gratuit, sans compte</p>
      <h1>Gérer un projet informatique, pas à pas</h1>
      <p className="accroche">Cadrer, découper, planifier, choisir sa méthode, outiller et animer l’équipe&nbsp;: 9 modules courts avec labos manipulables, exercices corrigés et quiz, sur un fil rouge fictif.</p>
      <div className="hero-panels" role="group" aria-label="Trois vues du cours">
        <div className="hero-panel">
          <p className="hero-panel-titre">GANTT</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <line x1="180" y1="4" x2="180" y2="56" className="hero-today" />
            <g className="gantt-bar"><rect x="10" y="8" width="86" height="8" rx="4" fill="var(--c-main)" /></g>
            <g className="gantt-bar2"><rect x="26" y="22" width="112" height="8" rx="4" fill="var(--c-calm)" /></g>
            <rect x="10" y="36" width="146" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
            <path d="M96 12h10v14h10" fill="none" stroke="var(--c-muted)" strokeWidth="1.2" />
            <circle cx="200" cy="12" r="5" fill="var(--c-main)" />
          </svg>
          <p className="hero-panel-legende">tâches, jalons, chaînes</p>
        </div>
        <div className="hero-panel">
          <p className="hero-panel-titre">Kanban</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <text x="10" y="9" fontSize="8" fill="var(--c-muted)">À faire</text>
            <text x="82" y="9" fontSize="8" fill="var(--c-muted)">En cours</text>
            <text x="154" y="9" fontSize="8" fill="var(--c-muted)">Fini</text>
            <rect x="8" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="80" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="152" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="14" y="20" width="52" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
            <g className="kan-1"><rect x="86" y="20" width="52" height="8" rx="4" fill="var(--c-main)" /></g>
            <g className="kan-2"><rect x="86" y="32" width="52" height="8" rx="4" fill="var(--c-calm)" /></g>
            <rect x="158" y="20" width="52" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
          </svg>
          <p className="hero-panel-legende">limites de WIP</p>
        </div>
        <div className="hero-panel">
          <p className="hero-panel-titre">Cycle en V</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <path className="v-path" d="M24 48 L110 12 L196 48" fill="none" stroke="var(--c-main)" strokeWidth="3" strokeLinecap="round" />
            <line x1="67" y1="30" x2="153" y2="30" className="hero-mirror" />
            <circle cx="67" cy="30" r="4.5" fill="var(--c-soft)" stroke="var(--c-ink)" />
            <circle cx="153" cy="30" r="4.5" fill="var(--c-calm)" stroke="var(--c-ink)" />
          </svg>
          <p className="hero-panel-legende">phases et tests en miroir</p>
        </div>
      </div>
      <p><Link className="btn" to="/module-1">Commencer par le module 1&nbsp;: cadrer et découper</Link></p>
    </section>
  );
}
```

- [ ] **Step 4: Remplacer les styles du hero**

Dans `src/styles/hero.css`, remplacer les règles `.hero` à `.hero-svg` par :

```css
.hero { padding: 2.5rem 0 1rem; }
.hero h1 { font-size: 2.2rem; margin: 0 0 0.5rem; }
.hero .accroche { font-size: 1.15rem; color: var(--c-muted); max-width: 46rem; }
.hero-panels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.9rem; max-width: 46rem; margin: 1.25rem 0; }
.hero-panel { display: grid; grid-template-areas: "titre" "svg" "legende"; gap: 0.35rem; padding: 0.75rem; background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--radius); }
.hero-panel-titre { grid-area: titre; margin: 0; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--c-muted); }
.hero-panel-svg { grid-area: svg; width: 100%; height: auto; display: block; }
.hero-panel-legende { grid-area: legende; margin: 0; font-size: 0.75rem; color: var(--c-muted); }
.hero-today, .hero-mirror { stroke: var(--c-line); stroke-dasharray: 3 4; }
@media (max-width: 680px) {
  .hero-panels { grid-template-columns: 1fr; gap: 0.6rem; }
  .hero-panel { grid-template-areas: "titre legende" "svg svg"; grid-template-columns: auto 1fr; column-gap: 0.5rem; row-gap: 0.3rem; align-items: baseline; }
}
@media (max-width: 480px) {
  .hero h1 { font-size: 2rem; }
  .hero .accroche { font-size: 1rem; }
}
```

Remplacer ensuite les animations par :

```css
.gantt-bar { animation: gantt-slide 6s ease-in-out infinite alternate; }
.gantt-bar2 { animation: gantt-slide 7s 0.8s ease-in-out infinite alternate; }
@keyframes gantt-slide { from { transform: translateX(0); } to { transform: translateX(18px); } }
.kan-1, .kan-2 { animation: kan-fill 8s ease-in-out infinite alternate; }
.kan-2 { transform-origin: center; }
@keyframes kan-fill { 0%, 15% { opacity: 0.15; } 60%, 100% { opacity: 1; } }
.v-path { stroke-dasharray: 220; animation: v-draw 9s ease-in-out infinite alternate; }
@keyframes v-draw { 0%, 10% { stroke-dashoffset: 220; } 70%, 100% { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .gantt-bar, .gantt-bar2, .kan-1, .kan-2, .v-path { animation: none; }
  .v-path { stroke-dashoffset: 0; }
  .kan-1, .kan-2 { opacity: 1; }
}
```

Conserver le reste du fichier, notamment `.modules-grid` et `.module-card`.

- [ ] **Step 5: Relancer le test**

Run: `npx vitest run tests/hero.test.tsx`
Expected: PASS, 1 test.

- [ ] **Step 6: Commit**

```bash
git add src/routes/accueil.tsx src/styles/hero.css tests/hero.test.tsx
git commit -m "feat: hero en trois panneaux"
```

---

### Task 3: Pictos sur les cartes de l’accueil

**Files:**
- Modify: `src/routes/accueil.tsx:68-73`
- Modify: `src/styles/hero.css`
- Test: `tests/pictos.test.tsx`

**Interfaces:**
- Consumes: `ModulePicto` de la Task 1.
- Produces: `.module-card-head`, `.module-kicker`; le grand `.num` disparaît.

- [ ] **Step 1: Ajouter le test des cartes**

Dans `tests/pictos.test.tsx`, ajouter les imports :

```tsx
import { MemoryRouter } from 'react-router-dom';
import Accueil from '../src/routes/accueil';
import { ProgressProvider } from '../src/lib/progress';
```

Puis ajouter ce test dans le `describe` :

```tsx
it('l’accueil affiche neuf pictos et les étiquettes de module', () => {
  const { container } = render(
    <ProgressProvider>
      <MemoryRouter>
        <Accueil />
      </MemoryRouter>
    </ProgressProvider>,
  );
  expect(container.querySelectorAll('.module-card .module-picto')).toHaveLength(9);
  const etiquettes = Array.from(
    container.querySelectorAll('.module-card .module-kicker'),
  ).map((el) => el.textContent);
  expect(etiquettes).toEqual(
    Array.from({ length: 9 }, (_, i) => `Module ${i + 1}`),
  );
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: FAIL, 0 picto dans les cartes.

- [ ] **Step 3: Modifier la carte**

Dans `src/routes/accueil.tsx`, ajouter l’import :

```tsx
import { ModulePicto } from '../components/ModulePicto';
```

Remplacer le contenu de `.module-card` par :

```tsx
<div className="module-card">
  <div className="module-card-head">
    <ModulePicto num={m.num} />
    <span className="module-kicker">Module {m.num}</span>
  </div>
  <Link className="titre" to={`/${m.slug}`}>{m.titre}</Link>
  <p className="resume">{m.resume}</p>
</div>
```

- [ ] **Step 4: Ajouter les styles des cartes**

Dans `src/styles/hero.css`, remplacer `.module-card .num` par :

```css
.module-card-head { display: flex; align-items: center; gap: 0.55rem; }
.module-kicker { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--c-main); }
.module-card:hover .module-picto { color: var(--c-main); }
```

- [ ] **Step 5: Relancer le test**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: PASS, 2 tests.

- [ ] **Step 6: Commit**

```bash
git add src/routes/accueil.tsx src/styles/hero.css tests/pictos.test.tsx
git commit -m "feat: pictos sur les cartes de modules"
```

---

### Task 4: Picto dans l’en-tête de module

**Files:**
- Modify: `src/components/ModuleLayout.tsx:10-21`
- Modify: `src/styles/index.css:206-208`
- Test: `tests/pictos.test.tsx`

**Interfaces:**
- Consumes: `ModulePicto` de la Task 1, `ModuleMeta.num`.
- Produces: `.module-head-row`, `.module-head-texte`.

- [ ] **Step 1: Ajouter le test de l’en-tête**

Dans `tests/pictos.test.tsx`, ajouter l’import :

```tsx
import { M1Page } from '../src/modules/m1-wbs';
```

Puis ajouter ce test dans le `describe` :

```tsx
it('l’en-tête d’un module affiche son picto', () => {
  const { container } = render(
    <ProgressProvider>
      <MemoryRouter>
        <M1Page />
      </MemoryRouter>
    </ProgressProvider>,
  );
  const entete = container.querySelector('.module-head-row');
  expect(entete).not.toBeNull();
  expect(entete?.querySelector('svg.module-picto')).not.toBeNull();
  expect(entete?.querySelector('h1')?.textContent).toContain('Cadrer et découper');
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: FAIL, `.module-head-row` introuvable.

- [ ] **Step 3: Modifier ModuleLayout**

Dans `src/components/ModuleLayout.tsx`, ajouter l’import :

```tsx
import { ModulePicto } from './ModulePicto';
```

Remplacer le contenu du `header` par :

```tsx
<header className="module-head">
  <div className="module-head-row">
    <ModulePicto num={props.meta.num} />
    <div className="module-head-texte">
      <p className="kicker">Module {props.meta.num} - 5&nbsp;minutes de lecture par fiche</p>
      <h1>{props.meta.titre}</h1>
      <p>{props.meta.resume}</p>
    </div>
  </div>
  <nav aria-label="Sommaire du module" className="sommaire">
    <a href="#fiche">Fiche</a>
    <a href="#fil-rouge">Fil rouge</a>
    <a href="#demarche">Démarche</a>
    <a href="#labo">Labo</a>
    <a href="#exercice">Exercice corrigé</a>
    <a href="#quiz">Quiz</a>
    <a href="#reflexe">Fiche réflexe</a>
  </nav>
</header>
```

- [ ] **Step 4: Ajouter les styles de l’en-tête**

Dans `src/styles/index.css`, remplacer :

```css
.module-head > p:not(.kicker) { color: var(--c-muted); max-width: 65ch; }
```

par :

```css
.module-head-row { display: flex; align-items: flex-start; gap: 1rem; }
.module-head-row .module-picto { width: 44px; height: 44px; margin-top: 0.2rem; }
.module-head-texte { min-width: 0; }
.module-head-texte > p:not(.kicker) { color: var(--c-muted); max-width: 65ch; }
@media (max-width: 600px) {
  .module-head-row { gap: 0.75rem; }
  .module-head-row .module-picto { width: 36px; height: 36px; }
}
```

- [ ] **Step 5: Relancer le test**

Run: `npx vitest run tests/pictos.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/ModuleLayout.tsx src/styles/index.css tests/pictos.test.tsx
git commit -m "feat: pictos dans les en-tetes de module"
```

---

### Task 5: Vérification visuelle, responsive et Lighthouse

**Files:**
- Read: `src/routes/accueil.tsx`, `src/components/ModuleLayout.tsx`, `src/styles/hero.css`, `src/styles/index.css`
- Create temporarily: `.shots/graphics-check.cjs` (supprimer après usage)
- Output: captures et JSON dans `.shots/`

**Interfaces:**
- Consumes: le site construit et prévisualisé.
- Produces: preuves de non-régression et captures validées.

- [ ] **Step 1: Passer les gardes complètes**

Run:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Expected: lint et typecheck sans erreur, 144 tests, build réussi.

- [ ] **Step 2: Lancer la prévisualisation**

Vérifier le port puis démarrer :

```bash
netstat -ano | grep ":4173"
MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort > .shots/preview.log 2>&1 &
```

Expected: `http://127.0.0.1:4173/gestion-projet-it/` répond 200.

- [ ] **Step 3: Lancer le smoke**

Run: `npx playwright test smoke/smoke.spec.ts --reporter=line`
Expected: 7 tests passés.

- [ ] **Step 4: Captures et contrôles responsive**

Créer `.shots/graphics-check.cjs` :

```js
const { chromium } = require('@playwright/test');
(async () => {
  const base = 'http://127.0.0.1:4173/gestion-projet-it';
  const browser = await chromium.launch();
  for (const [largeur, nom] of [[1440, '1440'], [736, '736'], [390, '390']]) {
    const page = await browser.newPage({ viewport: { width: largeur, height: 1000 } });
    const erreurs = [];
    page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text()); });
    await page.goto(`${base}/`);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `.shots/graphics-accueil-${nom}.png`, fullPage: true });
    const debordement = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`accueil ${nom}: debordement=${debordement} erreurs=${erreurs.length}`);
    await page.goto(`${base}/module-1`);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `.shots/graphics-module-1-${nom}.png`, fullPage: true });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await page.goto(`${base}/`);
  await page.waitForTimeout(500);
  const animations = await page.evaluate(() => ({
    gantt: getComputedStyle(document.querySelector('.gantt-bar')).animationName,
    v: getComputedStyle(document.querySelector('.v-path')).animationName,
    offset: getComputedStyle(document.querySelector('.v-path')).strokeDashoffset,
  }));
  console.log('reduced motion:', JSON.stringify(animations));
  await browser.close();
})();
```

Run: `node .shots/graphics-check.cjs`
Expected: aucun débordement, 0 erreur console, animations `none`, offset `0px`.

Supprimer ensuite `.shots/graphics-check.cjs`.

- [ ] **Step 5: Lighthouse mobile**

Run:

```bash
npx lighthouse http://127.0.0.1:4173/gestion-projet-it/ --output=json --output-path=.shots/lh-graphics-accueil.json --chrome-flags="--headless=new" --form-factor=mobile --only-categories=performance,accessibility --quiet
npx lighthouse http://127.0.0.1:4173/gestion-projet-it/module-1 --output=json --output-path=.shots/lh-graphics-module-1.json --chrome-flags="--headless=new" --form-factor=mobile --only-categories=performance,accessibility --quiet
```

Expected: performance et accessibilité supérieures ou égales à 90 sur les deux pages. Les erreurs EPERM de nettoyage temporaire de Lighthouse sont bénignes si les JSON sont produits.

- [ ] **Step 6: Contrôle visuel**

Ouvrir les captures 1440, 736 et 390. Vérifier :

- aucun chevauchement entre « Kanban » et « À faire / En cours / Fini » ;
- textes lisibles à 390 px ;
- pas de zone morte sous les panneaux ;
- pictos nets à 30 px sur les cartes et 44 px dans l’en-tête ;
- aucun débordement horizontal à 390 px.

- [ ] **Step 7: Commit des ajustements éventuels**

Si une correction CSS est nécessaire, la faire, relancer les étapes 1 à 5, puis :

```bash
git add src/styles/hero.css src/styles/index.css
git commit -m "fix: ajustements graphismes"
```

Sinon, ne rien committer.

---

### Task 6: Livraison plateforme

**Files:**
- Modify: `docs/superpowers/specs/2026-10-20-cycle-graphismes-design.md` (statut)
- Modify: `docs/superpowers/plans/2026-10-20-cycle-graphismes.md` (cases)
- Modify: `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\` (build)
- Modify: `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md`
- Modify: `D:\0CODE\AntiGravity\Cours_Memos\Docker\hylst_IT_platform_content.md`
- Modify: `D:\0CODE\AntiGravity\Cours_Memos\Docker\todo.md`

**Interfaces:**
- Consumes: build vérifié de la Task 5.
- Produces: version publiée et vérifiée en production.

- [ ] **Step 0: Demander l’accord de déploiement**

Ne pas pousser avant un accord explicite de l’utilisateur. Le reste de la tâche ne démarre qu’après cet accord.

- [ ] **Step 1: Mettre à jour le statut du spec**

Remplacer `Statut : design validé, implémentation à venir.` par
`Statut : design validé et exécuté le 2026-10-20.`

- [ ] **Step 2: Synchroniser le build**

```bash
cd "D:/0CODE/AntiGravity/Cours_Memos/Docker"
rm -rf gestion-projet-it
mkdir gestion-projet-it
cp -r "D:/0CODE/OpenCode/gestion-projet-it/dist/." gestion-projet-it/
diff -rq "D:/0CODE/OpenCode/gestion-projet-it/dist" gestion-projet-it
```

Expected: aucune différence, seul le nouveau build apparaît dans `git status`.

- [ ] **Step 3: Relever les empreintes**

```bash
python - <<'EOF'
from pathlib import Path
import hashlib
for f in ['index.html', 'sw.js', 'manifest.webmanifest', 'sitemap.xml']:
    p = Path('gestion-projet-it') / f
    print(f, hashlib.sha256(p.read_bytes()).hexdigest()[:8])
for p in sorted((Path('gestion-projet-it') / 'assets').iterdir()):
    print(p.name, hashlib.sha256(p.read_bytes()).hexdigest()[:8])
EOF
```

Noter les valeurs pour le changelog et le catalogue.

- [ ] **Step 4: Mettre à jour les docs plateforme**

Dans `changelog.md`, ajouter en tête une entrée `## [2.17.52] - 2026-10-20` avec :

- hero en trois panneaux, libellés HTML, viewBox 220 × 60, empilement 680 px ;
- neuf pictos trait + aplat doux, cartes et en-têtes ;
- 144 tests, 7/7 smoke, Lighthouse mobile ;
- empreintes du build et résultat de la vérification production.

Dans `hylst_IT_platform_content.md`, mettre à jour la ligne Gestion avec le
nouveau build, les 144 tests, les pictos, le hero et les scores Lighthouse.

Dans `todo.md`, remplacer la ligne SW v3 par une ligne « cycle graphismes »
avec le build publié et les vérifications.

- [ ] **Step 5: Committer et pousser le build**

```bash
git add gestion-projet-it changelog.md hylst_IT_platform_content.md todo.md
git commit -m "gestion-projet-it: build cycle graphismes"
git push origin main
```

- [ ] **Step 6: Vérifier la production**

Attendre que le nouveau `index.html` et le nouveau JS soient servis, puis :

```bash
curl -sI https://hylst.fr/gestion-projet-it/manifest.webmanifest | grep -i content-type
cd "D:/0CODE/AntiGravity/Cours_Memos/Docker"
bash scripts/verifier-prod.sh --full gestion-projet-it
```

Expected: manifest en `application/manifest+json`, 12 routes 200, 0 anomalie.

- [ ] **Step 7: Vérifier le hero et les pictos en production**

Avec Playwright, charger l’accueil et module-1 en 1440 et 390, vérifier
trois panneaux, neuf pictos sur l’accueil, un picto dans l’en-tête de
module-1, zéro erreur console, zéro requête externe. Faire une capture
finale et relancer Lighthouse accueil.

- [ ] **Step 8: Compléter les docs de vérification**

Ajouter au changelog les scores et le résultat de production, puis :

```bash
git add changelog.md hylst_IT_platform_content.md todo.md
git commit -m "docs: verification prod cycle graphismes"
git push origin main
```

- [ ] **Step 9: Clore le plan**

Cocher les cases du plan et du spec, mettre à jour le ledger
`.superpowers/sdd/2026-10-20-cycle-graphismes/progress.md`, puis annoncer
le résultat à l’utilisateur.

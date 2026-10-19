# Socle design du site : plan d’implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Styliser le header sticky, poser un rythme typographique homogène, séparer les sections de module, corriger l’accueil et fiabiliser `Reveal`, sans modifier aucun texte.

**Architecture:** Un lot comportemental (Reveal, TDD dans `tests/anim.test.tsx`), puis deux lots de socle CSS et micro-JSX (header, puis rythme et pages), puis une vérification finale avec captures, Lighthouse et resynchronisation du build plateforme. Aucune logique applicative, route ou stockage ne change.

**Tech Stack:** Vite + React 18 + TypeScript, Vitest + Testing Library (jsdom), Playwright (smoke), Lighthouse mobile.

**Spec:** `docs/superpowers/specs/2026-10-19-socle-design-design.md`

## Amendements en exécution

Ces amendements complètent le plan sans réécrire ses étapes.

- Header : point de rupture porté à 70rem, et non 68rem ou 56rem. La disposition sur une rangée et le sticky ne s’appliquent qu’à partir de 70rem ; en dessous, le header reste statique et empilé.
- Ajustements de tenue sur une rangée : recherche de header à `10rem`, écart `0.75rem 1rem`.
- Ancres : `scroll-margin-top: 5.5rem` appliqué dans la Task 2, dans le bloc média du sticky, donc sans décalage sous 70rem ; les ancres sont différées sur mobile.
- Tests : 139 tests après les lots, puis 140 avec le test de non-recéation de l’observateur.
- Smoke : 7 tests avec la garde d’impression de la fiche réflexe.
- Impression : correction `:has(#reflexe)` dans `print.css`, approuvée par l’utilisateur, en exception à la contrainte « `print.css` inchangé ».

## Global Constraints

- Aucun texte visible modifié : `tests/typo.test.tsx` (15 tests) doit rester vert sans édition.
- Aucune nouvelle dépendance, aucun commentaire de code, aucun asset, aucune police nouvelle.
- Périmètre fichiers strict : `src/styles/index.css`, `src/styles/hero.css`, `src/components/SiteHeader.tsx`, `src/components/Reveal.tsx`, `src/lib/anim.ts`, `src/routes/accueil.tsx`, `tests/anim.test.tsx`, `tests/header.test.tsx` (nouveau), `tests/hero.test.tsx` (nouveau).
- Ne pas modifier `public/sw.js`, `public/manifest.webmanifest`, `public/sitemap.xml`, `public/offline.html`, `src/styles/print.css`.
- Commits uniquement avec l’accord explicite de l’utilisateur. Le plan propose un message par lot, mais l’exécutant demande avant de commiter.
- Gates par lot : `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run smoke`.
- Environnement Windows bash : pour le serveur de preview, tuer le port 4173 avant et après (`netstat -ano | grep 4173` puis `taskkill //PID <pid> //F`) ; lancer la preview avec `MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort`.
- Ne pas resynchroniser le dossier plateforme avant la Task 4 et son accord explicite.
- Le dossier `.shots/` reste non suivi (aucun commit de capture).

### Task 1: Reveal robuste (TDD)

**Files:**
- Modify: `src/lib/anim.ts`
- Modify: `src/components/Reveal.tsx`
- Test: `tests/anim.test.tsx`

**Interfaces:**
- Consumes: rien.
- Produces: `useInView(ref, options?: { once?: boolean; threshold?: number; rootMargin?: string }): boolean` ; `Reveal` appelle `useInView(ref, { once: true, threshold: 0.1, rootMargin: '0px 0px 80px 0px' })`.

- [ ] **Step 1 : écrire les tests rouges dans `tests/anim.test.tsx`**

Ajouter, à la suite du test existant `devient visible a l intersection` :

```tsx
  it('devient visible sans IntersectionObserver', () => {
    const original = globalThis.IntersectionObserver;
    Object.defineProperty(globalThis, 'IntersectionObserver', { value: undefined, writable: true });
    try {
      const { getByTestId } = render(<Probe />);
      expect(getByTestId('probe').dataset.seen).toBe('true');
    } finally {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: original, writable: true });
    }
  });

  it('transmet threshold et rootMargin a l observateur', () => {
    const original = globalThis.IntersectionObserver;
    let init: IntersectionObserverInit | undefined;
    class CaptureIO implements IntersectionObserver {
      root = null; rootMargin = ''; scrollMargin = ''; thresholds: number[] = [0];
      constructor(_cb: IntersectionObserverCallback, options?: IntersectionObserverInit) { init = options; }
      observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
    }
    Object.defineProperty(globalThis, 'IntersectionObserver', { value: CaptureIO, writable: true });
    try {
      function ProbeRelance() {
        const ref = React.useRef<HTMLDivElement>(null);
        const seen = useInView(ref, { threshold: 0.1, rootMargin: '0px 0px 80px 0px' });
        return <div ref={ref} data-testid="probe-relance" data-seen={String(seen)} />;
      }
      render(<ProbeRelance />);
      expect(init?.threshold).toBe(0.1);
      expect(init?.rootMargin).toBe('0px 0px 80px 0px');
    } finally {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: original, writable: true });
    }
  });
```

- [ ] **Step 2 : vérifier l’échec**

Run: `npx vitest run tests/anim.test.tsx`
Attendu : FAIL. Le premier test lève `ReferenceError: IntersectionObserver is not defined` (ou voit `false`), le second reçoit `undefined` pour `init` ou `0.2` au lieu de `0.1`.

- [ ] **Step 3 : implémenter `src/lib/anim.ts`**

Remplacer le corps de `useInView` par :

```ts
export type InViewOptions = { once?: boolean; threshold?: number; rootMargin?: string };

export function useInView(ref: InViewRef, options?: InViewOptions): boolean {
  const [visible, setVisible] = React.useState(false);
  const once = options?.once !== false;
  const threshold = options?.threshold ?? 0.2;
  const rootMargin = options?.rootMargin;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) setVisible(false);
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, threshold, rootMargin]);
  return visible;
}
```

Conserver `export type InViewRef` et `useReducedMotion` inchangés.

- [ ] **Step 4 : mettre à jour `src/components/Reveal.tsx`**

Remplacer la ligne d’appel du hook par :

```tsx
  const inView = useInView(ref, { once: true, threshold: 0.1, rootMargin: '0px 0px 80px 0px' });
```

Le reste du fichier ne change pas.

- [ ] **Step 5 : vérifier les tests puis la suite complète**

Run: `npx vitest run tests/anim.test.tsx`
Attendu : PASS (3 tests).
Run: `npm test`
Attendu : 137 tests passent (135 existants + 2 nouveaux), aucune régression typo.

- [ ] **Step 6 : gates du lot**

Run: `npm run lint && npm run typecheck && npm run build`
Attendu : PASS. Puis smoke avec serveur de preview propre :
`MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort` en tâche de fond, puis `npm run smoke` ; attendu : 6 PASS ; tuer le port 4173 ensuite.

- [ ] **Step 7 : demander l’accord puis commiter**

```bash
git add src/lib/anim.ts src/components/Reveal.tsx tests/anim.test.tsx
git commit -m "fix: reveal robuste et declenchement anticipe"
```

Ne commiter qu’après accord explicite de l’utilisateur.

### Task 2: Header sticky

**Files:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/styles/index.css`
- Test: `tests/header.test.tsx` (nouveau)

**Interfaces:**
- Consumes: rien.
- Produces: contrat DOM du header : `header.site-header > .header-inner > (.brand > a.skip-link + a.brand-link, nav[aria-label], #header-tools)` ; `a.brand-link` pointe vers `/` et contient « Gestion de Projet IT ».

- [ ] **Step 1 : écrire le test rouge `tests/header.test.tsx`**

```tsx
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from '../src/components/SiteHeader';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

describe('en-tete', () => {
  it('header-inner, marque cliquable et skip-link hors lien', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <SiteHeader />
        </MemoryRouter>
      </ProgressProvider>,
    );
    const header = container.querySelector('header.site-header');
    expect(header).not.toBeNull();
    const inner = header?.querySelector(':scope > .header-inner');
    expect(inner).not.toBeNull();
    const brand = inner?.querySelector(':scope > .brand');
    expect(brand).not.toBeNull();
    const skip = brand?.querySelector('a.skip-link');
    expect(skip?.getAttribute('href')).toBe('#contenu');
    const marque = brand?.querySelector('a.brand-link');
    expect(marque?.getAttribute('href')).toBe('/');
    expect(marque?.textContent).toContain('Gestion de Projet IT');
    expect(marque?.textContent).toContain('Méthodologies et Équipes');
    expect(marque?.querySelector('.skip-link')).toBeNull();
    expect(inner?.querySelector('nav[aria-label="Navigation principale"]')).not.toBeNull();
    expect(inner?.querySelector(':scope > #header-tools')).not.toBeNull();
  });
});
```

- [ ] **Step 2 : vérifier l’échec**

Run: `npx vitest run tests/header.test.tsx`
Attendu : FAIL sur `header-inner` (null).

- [ ] **Step 3 : implémenter `src/components/SiteHeader.tsx`**

```tsx
import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProgressHeader from './ProgressHeader';

export default function SiteHeader() {
  return (
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
        <nav aria-label="Navigation principale">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/glossaire">Glossaire</NavLink>
        </nav>
        <div id="header-tools"><SearchBar /> <ProgressHeader /></div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4 : vérifier le test**

Run: `npx vitest run tests/header.test.tsx`
Attendu : PASS.

- [ ] **Step 5 : ajouter les règles CSS du header à la fin de `src/styles/index.css`**

```css
.site-header { position: sticky; top: 0; z-index: 40; background: var(--c-surface); border-bottom: 1px solid var(--c-line); }
.header-inner { max-width: var(--maxw); margin: 0 auto; padding: 0.75rem 1.25rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1.5rem; }
.brand { display: flex; align-items: center; gap: 0.6rem; }
.brand-link { display: grid; grid-template-columns: auto auto; align-items: center; column-gap: 0.6rem; text-decoration: none; color: inherit; }
.logo-mark { grid-row: 1 / span 2; display: inline-grid; place-items: center; width: 2rem; height: 2rem; border-radius: 8px; background: linear-gradient(135deg, var(--c-main), var(--c-calm)); }
.logo-mark span { width: 0.6rem; height: 0.6rem; border-radius: 50%; background: #fff; opacity: 0.9; }
.brand strong { grid-column: 2; font-size: 1rem; }
.brand-sub { grid-column: 2; color: var(--c-muted); font-size: 0.75rem; }
.site-header nav { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.site-header nav a { display: inline-flex; align-items: center; min-height: 2rem; padding: 0.4rem 0.7rem; border-radius: 6px; color: var(--c-main-ink); text-decoration: none; }
.site-header nav a:hover { background: var(--c-bg); }
.site-header nav a[aria-current='page'] { background: var(--c-main); color: #fff; }
#header-tools { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
@media (min-width: 56rem) { .site-header nav { margin-left: auto; } }
@media (max-width: 56rem) {
  .site-header nav { width: 100%; }
  #header-tools { width: 100%; }
  .search, .search input { width: 100%; }
  .search input { min-width: 0; }
}
```

- [ ] **Step 6 : gates du lot**

Run: `npm run lint && npm run typecheck && npm test`
Attendu : PASS (137 tests). Puis `npm run build`. Smoke avec serveur propre : tuer le port 4173 s’il est occupé (`netstat -ano | grep 4173` puis `taskkill //PID <pid> //F`), lancer `MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort` en tâche de fond, `npm run smoke` ; attendu : 6 PASS ; tuer le port 4173 ensuite. Vérifier visuellement au premier passage que le lien actif affiche bien le fond `--c-main` (navigation vers À propos).

- [ ] **Step 7 : demander l’accord puis commiter**

```bash
git add src/components/SiteHeader.tsx src/styles/index.css tests/header.test.tsx
git commit -m "fix: styliser le header sticky et la marque"
```

Ne commiter qu’après accord explicite de l’utilisateur.

### Task 3: Rythme, séparateurs, accueil et footer

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/styles/hero.css`
- Modify: `src/routes/accueil.tsx`
- Test: `tests/hero.test.tsx` (nouveau)

**Interfaces:**
- Consumes: rien.
- Produces: `section.hero` présent sur l’accueil ; aucune interface exportée nouvelle.

- [ ] **Step 1 : écrire le test rouge `tests/hero.test.tsx`**

```tsx
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Accueil from '../src/routes/accueil';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

describe('accueil', () => {
  it('la section hero utilise la classe hero', () => {
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
  });
});
```

- [ ] **Step 2 : vérifier l’échec**

Run: `npx vitest run tests/hero.test.tsx`
Attendu : FAIL (`section.hero` null).

- [ ] **Step 3 : modifier `src/routes/accueil.tsx`**

Ligne 10, remplacer :

```tsx
    <section className="reveal visible">
```

par :

```tsx
    <section className="hero reveal visible">
```

Aucun autre changement dans ce fichier.

- [ ] **Step 4 : vérifier le test**

Run: `npx vitest run tests/hero.test.tsx`
Attendu : PASS.

- [ ] **Step 5 : nettoyer `src/styles/hero.css`**

Supprimer la ligne 5 (`.panels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }`).
Remplacer la ligne 6 par :

```css
@media (max-width: 900px) { .modules-grid { grid-template-columns: 1fr !important; } }
```

Aucun autre changement dans ce fichier.

- [ ] **Step 6 : ajouter les règles de rythme à la fin de `src/styles/index.css`**

```css
h1 { font-size: clamp(1.9rem, 1.5rem + 2vw, 2.4rem); }
h2 { font-size: clamp(1.35rem, 1.15rem + 1vw, 1.6rem); margin: 2.2rem 0 0.6rem; }
h3 { font-size: 1.1rem; }
p, ul, ol { margin: 0.55rem 0; }
.kicker { font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--c-main); margin: 0.1rem 0 0.3rem; }
.module-head { margin: 2.25rem 0 1.75rem; }
.module-head h1 { margin: 0.3rem 0 0.5rem; }
.module-head > p:not(.kicker) { color: var(--c-muted); max-width: 65ch; }
.module-page > .reveal + .reveal { margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px solid var(--c-line); }
main [id] { scroll-margin-top: 5rem; }
footer { border-top: 1px solid var(--c-line); margin-top: 3rem; padding-top: 1.25rem; }
footer p { color: var(--c-muted); font-size: 0.85rem; max-width: 75ch; }
footer a { color: var(--c-main); }
```

- [ ] **Step 7 : gates du lot**

Run: `npm run lint && npm run typecheck && npm test`
Attendu : PASS (138 tests). Puis `npm run build`. Smoke avec serveur propre : tuer le port 4173 s’il est occupé (`netstat -ano | grep 4173` puis `taskkill //PID <pid> //F`), lancer `MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort` en tâche de fond, `npm run smoke` ; attendu : 6 PASS ; tuer le port 4173 ensuite.
Contrôle visuel rapide au premier passage : navigation par le sommaire d’un module (l’ancre ne passe pas sous le header), séparateur visible entre les blocs, footer séparé.

- [ ] **Step 8 : demander l’accord puis commiter**

```bash
git add src/styles/index.css src/styles/hero.css src/routes/accueil.tsx tests/hero.test.tsx
git commit -m "fix: rythme typographique des pages et sections"
```

Ne commiter qu’après accord explicite de l’utilisateur.

### Task 4: Vérification finale, captures et build plateforme

**Files:**
- Aucun fichier source modifié (sauf correction urgente, avec accord, dans un commit séparé).
- Produit : captures dans `.shots/` (non suivies) et build resynchronisé.

**Interfaces:**
- Consumes: tout le cycle.
- Produces: rapport d’empreintes pour l’agent plateforme.

- [ ] **Step 1 : gates complètes**

```text
npm run lint
npm run typecheck
npm test
npm run build
```

Attendu : tout PASS, 138 tests.

- [ ] **Step 2 : smoke et captures sur serveur propre**

Tuer le port 4173 s’il est occupé, lancer la preview en tâche de fond :

```bash
MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4173 --strictPort
```

Puis :

```bash
npm run smoke
npx playwright screenshot --viewport-size="1280,900" "http://127.0.0.1:4173/gestion-projet-it/" .shots/apres-accueil.png
npx playwright screenshot --viewport-size="390,844" "http://127.0.0.1:4173/gestion-projet-it/" .shots/apres-accueil-mobile.png
npx playwright screenshot --viewport-size="1280,900" "http://127.0.0.1:4173/gestion-projet-it/module-6" .shots/apres-module-6.png
```

Attendu : smoke 6 PASS ; captures lisibles (header stylé, plus de cartes invisibles, séparateurs visibles). Présenter les captures à l’utilisateur avant de continuer.

- [ ] **Step 3 : Lighthouse mobile**

Toujours sur la preview :

```bash
npx lighthouse "http://127.0.0.1:4173/gestion-projet-it/" --only-categories=performance,accessibility --form-factor=mobile --chrome-flags="--headless" --output=json --output-path=.shots/lh-accueil.json
npx lighthouse "http://127.0.0.1:4173/gestion-projet-it/module-6" --only-categories=performance,accessibility --form-factor=mobile --chrome-flags="--headless" --output=json --output-path=.shots/lh-module-6.json
```

Attendu : performance et accessibilité supérieures ou égales à 90 sur les deux pages. Tuer le port 4173 après coup. Les erreurs EPERM de nettoyage temp Chrome en fin de run sont bénignes.

- [ ] **Step 4 : demander l’accord, puis resynchroniser le dossier plateforme (sans git)**

Après accord explicite :

```bash
rm -rf "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it"
mkdir -p "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it"
cp -r dist/* "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/"
diff -rq dist "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it"
```

Attendu : `diff` sans sortie (contenus identiques).

- [ ] **Step 5 : rapport d’empreintes et résumé**

```bash
sha256sum "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/index.html" "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/sw.js" "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/manifest.webmanifest" "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/offline.html" "D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/sitemap.xml"
```

Résumer : lots passés, tests ajoutés, résultats Lighthouse, empreintes du build, rappel du correctif MIME côté plateforme (`application/manifest+json`). Ne commiter, pousser ni publier sans accord explicite.

## Vérification de fin

1. `tests/typo.test.tsx` vert sans édition (aucun texte touché).
2. `tests/anim.test.tsx` : 3 tests verts (dont fallback et options).
3. `tests/header.test.tsx` et `tests/hero.test.tsx` verts.
4. `npm run lint`, `npm run typecheck`, `npm test` (138), `npm run build`, `npm run smoke` (6) : PASS.
5. Lighthouse mobile supérieur ou égal à 90 (performance et accessibilité) sur l’accueil et le module 6.
6. Captures avant/après présentées ; aucun débordement mobile.
7. Build plateforme identique à `dist/` après synchro, empreintes transmises.

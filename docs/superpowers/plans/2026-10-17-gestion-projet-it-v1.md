# Plan d'implementation : Gestion de Projet IT (site v1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la SPA v1 complete du cours interactif "Gestion de Projet IT" : accueil anime, 6 modules avec labos SVG interactifs, exercices corriges, quiz, XP, recherche, PWA, pret pour depot Docker.

**Architecture:** SPA Vite + React 18 + TypeScript strict, sans backend ni compte ; un gabarit React genere centralise le rendu de module ; les contenus sont des modules TS type (donnees) ; les 10 labos sont des composants SVG dedies avec logique reducteur pure testable. Aucune librairie d'animation ou de graphiques.

**Tech Stack:** Vite 7, React 18, react-router-dom 7, TypeScript strict, vitest + jsdom, Playwright (smoke), ESLint flat.

**Spec:** `docs/superpowers/specs/2026-10-17-site-gestion-projet-it-design.md` (source: `cahier_des_charges.md`, `agents.md`).

## Global Constraints

- Router `basename="/gestion-projet-it/"` ; build `vite build --base=/gestion-projet-it/`.
- Aucun script inline ni handler inline dans le HTML servi ; React synthetic events (props onClick etc.) sont autorises (delegation, compatible CSP `script-src 'self'`).
- 0 requete externe au runtime : aucune fonte distante (pile system-ui), aucune image externe (SVG inline), aucun CDN, aucun tracker.
- Progression et XP en `localStorage`, cles de la forme `gestion-projet-it:*`, export/import JSON.
- XP : quiz +10 des 2/3 (un seul gain par cle de quiz), labo +5 (premiere validation uniquement), module termine +20. Niveaux : Curieux 0, Organisateur 50, Capitaine 120, Chef de projet 200. Badge Termine par module.
- Accessibilite : clavier complet sur tous les labos et la recherche, contrastes AA, `lang="fr"`, labels sur chaque champ, messages d'erreur explicites, respect `prefers-reduced-motion`.
- Charte editoriale : methodes sans dogme, aucune ecole presentee comme superieure, francais sobre, aucun tiret cadratin dans les textes rediges, outils reels cites a titre informatif uniquement, tous les exemples sur le fil rouge fictif (association "Les Amis du Square").
- Qualite : smoke Playwright (routes 200 au clic et au rechargement, 0 erreur console, 0 requete echouee, 0 requete externe) et Lighthouse accueil mobile >= 90 (performance et accessibilite) avant tout depot ; depot Docker uniquement au jalon 7, un seul push.
- Archi repo : `git init` en jalon 0 (le dossier n'est pas encore un depot) ; commit par tache ; ne jamais committer de secret.

## File Structure

```
cahier_des_charges.md, agents.md          (existants, non modifies sauf fix ligne 324 en jalon 3)
package.json, tsconfig.json, tsconfig.node.json, vite.config.ts, eslint.config.js
playwright.config.ts, .gitignore
index.html
public/
  favicon.svg, icon.svg (192 et 512 via meme SVG), manifest.webmanifest,
  offline.html, robots.txt, sitemap.xml, sw.js
src/
  main.tsx, App.tsx
  routes/accueil.tsx, routes/Apropos.tsx, routes/NotFound.tsx,
  routes/ModulePage.tsx (route paramree /module-:num)
  components/
    Reveal.tsx            enrobe useInView, applique .reveal/.visible
    SeoHead.tsx           title, description, canonical, og:url par route
    SiteHeader.tsx        logo, SearchBar, ProgressHeader
    Footer.tsx
    SearchBar.tsx
    ProgressHeader.tsx    XP, niveau, badge, export/import JSON
    ModuleLayout.tsx      gabarit CDC section 10 + sommaire ancres
    ExerciseBlock.tsx     enonce + details/summary corrige + methode
    QuizBlock.tsx         3 questions, corrige immediat, XP
    FicheReflexe.tsx      5 items, bouton imprimer
    ModuleEnd.tsx         bouton termine +20 XP, badge
    LaboFrame.tsx         socle des labos (titre, consigne, 6 etapes, verifier, reset, aria-live)
  labos/
    LaboWbs.tsx, LaboGanttPert.tsx, LaboPhases.tsx, ComparateurMethodes.tsx,
    LaboKanban.tsx, PokerPlanning.tsx, LaboSelecteurOutil.tsx,
    LaboChaineCI.tsx, LaboEisenhower.tsx, LaboRisques.tsx
    (chacun exporte son reducteur pur + types pour tests vitest)
  modules/
    index.ts              MODULES (6), FUTURE_MODULES (A/B/C), types
    m1-wbs/{fiche.tsx,lab.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts}
    m2-planif/{...idem}, m3-methodes/{...}, m4-agiles/{...},
    m5-outils/{...}, m6-equipe/{...}
  lib/
    storage.ts, xp.ts, progress.tsx (ProgressProvider + useProgress),
    anim.ts (useInView, useReducedMotion), search.ts, seo.ts
  styles/{index.css, reveal.css, print.css}
tests/
  storage.test.ts, xp.test.ts, progress.test.ts, anim.test.tsx,
  search.test.ts, seo.test.tsx, blocks.test.tsx,
  labos/{wbs.test.ts, gantt.test.ts, phases.test.ts, kanban.test.ts,
  poker.test.ts, selecteur.test.ts, chaine.test.ts, eisenhower.test.ts,
  risques.test.ts}
smoke/
  smoke.spec.ts           routes au clic + rechargement + console + requetes externes
```

## Interfaces (contrats partagees, verrouilles des jalon 0)

```ts
// lib/storage.ts
export function storageAvailable(): boolean;
export function readJSON<T>(key: string, fallback: T): T;
export function writeJSON(key: string, value: unknown): void;   // no-op si indisponible
export function removeKey(key: string): void;
export const X_KEY = 'gestion-projet-it:xp';
export const quizKey = (id: string) => `gestion-projet-it:quiz:done:${id}`;
export const laboKey = (id: string) => `gestion-projet-it:laboratoire:done:${id}`;
export const moduleKey = (id: string) => `gestion-projet-it:module:done:${id}`;

// lib/xp.ts
export const XPQuiz = 10, XPLabo = 5, XPModule = 20;
export type Niveau = { nom: string; min: number };
export const NIVEAUX: Niveau[] = [
  { nom: 'Curieux', min: 0 }, { nom: 'Organisateur', min: 50 },
  { nom: 'Capitaine', min: 120 }, { nom: 'Chef de projet', min: 200 },
];
export function niveauPour(xp: number): Niveau;   // dernier niveau dont min <= xp
export interface XPState { xp: number; quizDone: string[]; laboDone: string[]; moduleDone: string[] }
export function loadXPState(): XPState;
export function saveXPState(s: XPState): void;
export function reduireXP(s: XPState, action: XPAction): XPState;   // pur, testee
export type XPAction =
  | { type: 'quiz'; id: string; correctes: number; total: number }   // >= 2/3 et premier -> +10
  | { type: 'labo'; id: string }                                     // premier -> +5
  | { type: 'module'; id: string }                                   // premier -> +20
  | { type: 'reset' }                                                // met a 0 (jamais appele par l UI, garde pour tests)
  | { type: 'import'; state: Partial<XPState> };

// lib/progress.tsx
export interface ProgressContextValue extends XPState { niveau: Niveau; dispatch: (a: XPAction) => void; exportJSON: () => string; importJSON: (json: string) => boolean }
export const ProgressProvider: React.FC<{ children: React.ReactNode }>;
export function useProgress(): ProgressContextValue;   // name: useProgress

// modules/index.ts
export interface ModuleMeta { id: string; num: number; slug: string; titre: string; resume: string; motsCles: string[]; avenir?: boolean }
export const MODULES: ModuleMeta[];      // num 1..6, slug 'module-1'..'module-6'
export const FUTURE_MODULES: ModuleMeta[]; // A/B/C, avenir: true (badge Bientot)
export const moduleMetaByNum = (num: number) => MODULES.find((m) => m.num === num);

// module content exports (un par dossier module)
// modules/mN-xxx/quiz.ts       : export const quiz: QuizData
//           /ficheReflexe.ts   : export const items: string[] (5)
//           /fiche.tsx         : export const Fiche: React.FC<{meta}> (sections fiche + fil rouge + demarche)
//           /exercise.tsx      : export const Exercices: React.FC (ExerciseBlock(s))
//           /labo export dans module/index via map: export const labo?: React.FC<LaboProps>
export interface QuizData { id: string; questions: QuizQuestion[] }
export interface QuizQuestion { question: string; choix: [string, string, string]; bonne: 0 | 1 | 2; motif: string }

// components/LaboFrame.tsx
export interface LaboProps { valide: boolean; onValide: () => void }  // onValide s'occupe du +5 via markQuiz-like dispatch
export interface LaboFrameProps {
  titre: string; consigne: string; etapes: string[];
  etat: string;                    // texte courant de l'etat du labo (aria-live)
  onVerifier: () => void; onReinitialiser: () => void;
  valide: boolean; children: React.ReactNode;
}

// lib/search.ts
export interface SearchHit { moduleNum: number; moduleTitre: string; section: string; ancre: string; label: string }
export function buildIndex(): SearchHit[];                 // titre module + sections fixes
export function searchIndex(index: SearchHit[], q: string): SearchHit[];  // match sans casse ni accents

// lib/anim.ts
export type InViewRef = React.RefObject<HTMLElement | null>;
export function useInView(ref: InViewRef, options?: { once?: boolean; threshold?: number }): boolean;
export function useReducedMotion(): boolean;

// lib/seo.ts + components/SeoHead.tsx
export function canonicalUrl(): string;   // new URL(location.href).href avec slug garde
export function SeoHead(props: { title: string; description: string }): JSX.Element;
```

---

# Jalon 0 : socle technique

### Task 1: scaffold Vite + React + TS strict + ESLint + git init

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `eslint.config.js`, `.gitignore`, `index.html`, `src/main.tsx`, `src/App.tsx` (minimal), `src/vite-env.d.ts`

**Interfaces:**
- Consumes: aucune (premiere tache)
- Produces: build `npm run build` vert, dev `npm run dev`, `npm run test:watch`, `npm run lint`, `npm run preview` ; `App.tsx` rend `Routes` vide pret a recevoir les routes.

**Steps:**

- [ ] **Step 1: ecrire package.json**

```json
{
  "name": "gestion-projet-it",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --base=/gestion-projet-it/",
    "preview": "vite preview --base=/gestion-projet-it/ --port 4173 --strictPort",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "smoke": "playwright test"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "@eslint/js": "^9.17.0",
    "typescript-eslint": "^8.18.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "typescript": "^5.6.3",
    "vite": "^6.0.0",
    "vitest": "^2.1.8",
    "jsdom": "^25.0.1"
  }
}
```

- [ ] **Step 2: ecrire tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "useDefineForClassFields": true,
    "types": ["vite/client", "vitest"]
  },
  "include": ["src", "tests", "smoke"]
}
```

tsconfig.node.json :

```json
{
  "compilerOptions": {
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts", "playwright.config.ts"]
}
```

- [ ] **Step 3: ecrire vite.config.ts (port 4173 pour preview, base imposee au build)**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./tests/setup.ts'],
  },
} as import('vitest/config').UserConfig);
```

- [ ] **Step 4: ecrire index.html (aucun script inline, lang fr)**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <title>Gestion de Projet IT : Methodologies et Equipes</title>
    <link rel="icon" href="/gestion-projet-it/favicon.svg" type="image/svg+xml" />
    <meta name="color-scheme" content="light" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: ecrire src/main.tsx, src/App.tsx minimal, src/vite-env.d.ts**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```tsx
export default function App() {
  return <main>accueil (jalon 1)</main>;
}
```

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 6: ecrire eslint.config.js et .gitignore**

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
);
```

.gitignore :

```
node_modules/
dist/
test-results/
playwright-report/
*.log
```

- [ ] **Step 7: git init et premier commit**

```bash
git init -b main
git add package.json tsconfig.json tsconfig.node.json vite.config.ts eslint.config.js .gitignore index.html src
git commit -m "chore: scaffold vite react ts strict, eslint, git init"
```

- [ ] **Step 8: npm install puis verifier build et test vides**

Run: `npm install`
Expected: ok.

Run: `npm run build`
Expected: dist/ genere, `assets/index-*.js`.

Run: `npm test 2>/dev/null || true` (vitest avec 0 fichier de tests: `No test files found` est acceptable a ce stade).

- [ ] **Step 9: ecrire tests/setup.ts (mock IntersectionObserver et matchMedia pour jsdom, utilise des Task 5)**

```ts
import { vi, beforeAll, afterAll } from 'vitest';

let io: MockIntersectionObserver | undefined;

class MockIntersectionObserver {
  callback: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;
  constructor(cb: MockIntersectionObserver['callback']) { this.callback = cb; }
  observe(el: Element) { io?.elements.add(el); }
  unobserve(el: Element) { io?.elements.delete(el); }
  disconnect() { io?.elements.clear(); }
}

beforeAll(() => {
  io = new MockIntersectionObserver(() => {}) as never;
  Object.defineProperty(globalThis, 'IntersectionObserver', { value: MockIntersectionObserver, writable: true });
});

afterAll(() => { io = undefined; });

export { io, MockIntersectionObserver };
```

(pense-bete: ce setup sera complete en Task 5 par la capture d'intersection manuelle ; avec un map element vers observer afin de permettre `intersect(el)`.)

- [ ] **Step 10: committer**

```bash
git add tests
git commit -m "chore: vitest jsdom setup with IntersectionObserver mock"
```

### Task 2: charte CSS (tokens, base, reveal, print) + layout global (SiteHeader, Footer, App routes vides)

**Files:**
- Create: `src/styles/index.css`, `src/styles/reveal.css`, `src/styles/print.css`
- Create: `src/components/SiteHeader.tsx`, `src/components/Footer.tsx`, `src/components/Reveal.tsx`
- Modify: `src/App.tsx` (Routes avec placeholder), `src/main.tsx` (import styles deja en place)

**Interfaces:**
- Consumes: plugins build (Task 1).
- Produces: classes CSS `reveal`, `visible`, tokens `var(--c-*)` ; composants `SiteHeader` (props: aucune, lien actif selon la route courante via NavLink), `Footer` (paternite + licence + lien a propos), `Reveal` ({ children, delay?: number }).

**Steps:**

- [ ] **Step 1: ecrire src/styles/index.css (tokens charte, base)**

```css
:root {
  --c-bg: #fafaf7;
  --c-surface: #ffffff;
  --c-ink: #14161f;
  --c-muted: #4b5563;
  --c-main: #1d4ed8;
  --c-main-ink: #172554;
  --c-soft: #fef3c7;
  --c-calm: #a7c4b5;
  --c-line: #e5e7eb;
  --c-error: #b91c1c;
  --c-ok: #15803d;
  --radius: 10px;
  --shadow: 0 6px 24px rgba(20, 22, 31, 0.08);
  --maxw: 70rem;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: var(--c-bg);
  color: var(--c-ink);
  line-height: 1.6;
}
main, footer { max-width: var(--maxw); margin: 0 auto; padding: 0 1.25rem 4rem; }
h1, h2, h3 { line-height: 1.25; }
a { color: var(--c-main); text-decoration-thickness: 1px; text-underline-offset: 3px; }
a:focus-visible, button:focus-visible, input:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--c-main);
  outline-offset: 2px;
  border-radius: 4px;
}
.card { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--radius); box-shadow: var(--shadow); }
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--c-main); color: #fff; border: none; cursor: pointer;
  border-radius: var(--radius); padding: 0.6rem 1.1rem; font-size: 1rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
.btn.secondary { background: var(--c-surface); color: var(--c-main-ink); border: 1px solid var(--c-line); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.skip-link { position: absolute; left: -9999px; top: 0; background: var(--c-main); color: #fff; padding: 0.5rem 1rem; z-index: 100; }
.skip-link:focus { left: 0.5rem; top: 0.5rem; }
@media (prefers-reduced-motion: reduce) {
  .btn:hover { transform: none; }
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: ecrire src/styles/reveal.css**

```css
.reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.5s ease, transform 0.5s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 3: ecrire src/styles/print.css (fiche reflexe imprimable)**

```css
@media print {
  header, footer, nav, .no-print, button { display: none !important; }
  main { padding: 0; max-width: none; }
  .fiche-reflexe { border: 1px solid #000; }
  body { background: #fff; color: #000; }
}
```

- [ ] **Step 4: ecrire src/components/Reveal.tsx**

```tsx
import React from 'react';
import { useInView } from '../lib/anim';

export default function Reveal(props: { children: React.ReactNode; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  return (
    <div className={`reveal${inView ? ' visible' : ''}`} style={props.delay ? { transitionDelay: `${props.delay}ms` } : undefined} ref={ref}>
      {props.children}
    </div>
  );
}
```

- [ ] **Step 5: ecrire src/lib/anim.ts (hooks reels, tests en Task 5)**

```ts
import React from 'react';

export type InViewRef = React.RefObject<HTMLElement | null>;
export function useInView(ref: InViewRef, options?: { once?: boolean; threshold?: number }): boolean {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (options?.once !== false) obs.disconnect();
          } else if (options?.once === false) setVisible(false);
        }
      },
      { threshold: options?.threshold ?? 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);
  return visible;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}
```

- [ ] **Step 6: ecrire src/components/SiteHeader.tsx et Footer.tsx (minimalsearch-free; SearchBar arrive en Task 8, ProgressHeader en Task 9)**

```tsx
import { NavLink } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <header className="site-header" role="banner">
      <div className="brand">
        <a className="skip" href="#contenu" data-testid="skip">Aller au contenu</a>
        <span className="logo-mark" aria-hidden="true"><span /></span>
        <strong>Gestion de Projet IT</strong>
        <span className="brand-sub">Methodologies et Equipes</span>
      </div>
      <nav aria-label="Navigation principale">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/a-propos">A propos</NavLink>
      </nav>
      <div id="header-tools" />
    </header>
  );
}
```

Footer :

```tsx
export default function Footer() {
  return (
    <footer>
      <p>
        Gestion de Projet IT. Realise par Geoffroy avec assistance IA.
        Licence AGPL-3.0-or-later. Aucun compte, aucun cookie, aucune donnee sortante.{" "}
        <a href="/gestion-projet-it/a-propos">A propos du projet</a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 7: brancher App.tsx et styles**

```tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Footer from './components/Footer';
import './styles/reveal.css';

export default function App() {
  return (
    <BrowserRouter basename="/gestion-projet-it/">
      <SiteHeader />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<p>accueil (jalon 1)</p>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
```

- [ ] **Step 8: verifier**

Run: `npm run lint && npm run build`
Expected: lint OK, build OK.

Run: `npm run dev` puis ouvrir http://localhost:5173/gestion-projet-it/ : header + footer visibles, lien "Aller au contenu" focusable au Tab.

Message: `npm run lint && npm run build`.

- [ ] **Step 9: commit**

```bash
git add src
git commit -m "feat: charte css tokens, reveal, layout global header footer routes vides"
```

### Task 3: lib/storage.ts + tests

**Files:**
- Create: `src/lib/storage.ts`
- Test: `tests/storage.test.ts`

**Interfaces:**
- Produces: `storageAvailable()`, `readJSON<T>(key, fallback)`, `writeJSON(key, value)`, `removeKey(key)`, constantes `X_KEY`, `quizKey`, `laboKey`, `moduleKey` (signatures exactes de la section Interfaces).

**Steps:**

- [ ] **Step 1: ecrire le test qui echoue d'abord**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { readJSON, writeJSON, removeKey, storageAvailable, quizKey } from '../src/lib/storage';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('readJSON rend le fallback quand la cle manque', () => {
    expect(readJSON('cle-inexistante', { a: 1 })).toEqual({ a: 1 });
  });

  it('readJSON lit une valeur JSON valide', () => {
    writeJSON('k', { v: 42 });
    expect(readJSON<{ v: number }>('k', { v: 0 })).toEqual({ v: 42 });
  });

  it('readJSON rend le fallback si le JSON est corrompu', () => {
    localStorage.setItem('k', 'not-json');
    expect(readJSON('k', 'fallback')).toBe('fallback');
  });

  it('removeKey supprime', () => {
    writeJSON('k', 1);
    removeKey('k');
    expect(readJSON('k', 0)).toBe(0);
  });

  it('storageAvailable est vrai en jsdom', () => {
    expect(storageAvailable()).toBe(true);
  });

  it('cles nommeaux suivant la convention gestion-projet-it:*', () => {
    expect(quizKey('q1')).toBe('gestion-projet-it:quiz:done:q1');
  });
});
```

- [ ] **Step 2: lancer le test (echec attendu, module absent)**

Run: `npm test -- tests/storage.test.ts`
Expected: FAIL (Cannot find module).

- [ ] **Step 3: implementer src/lib/storage.ts**

```ts
const PREFIX = 'gestion-projet-it:';
export const X_KEY = `${PREFIX}xp`;
export const quizKey = (id: string) => `${PREFIX}quiz:done:${id}`;
export const laboKey = (id: string) => `${PREFIX}laboratoire:done:${id}`;
export const moduleKey = (id: string) => `${PREFIX}module:done:${id}`;

export function storageAvailable(): boolean {
  try {
    const probe = `${PREFIX}probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota ou indisponible : no-op silencieux
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
}
```

- [ ] **Step 4: relancer le test**

Run: `npm test -- tests/storage.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: commit**

```bash
git add src/lib/storage.ts tests/storage.test.ts
git commit -m "feat: lib storage securisee pour localStorage gestion-projet-it ..."
```

### Task 4: lib/xp.ts (reducteur pur) + tests

**Files:**
- Create: `src/lib/xp.ts`
- Test: `tests/xp.test.ts`

**Interfaces:**
- Consumes: storage (Task 3).
- Produces: `XPQuiz=10, XPLabo=5, XPModule=20`, `NIVEAUX`, `niveauPour`, `XPState`, `XPAction`, `reduireXP`, `loadXPState`, `saveXPState` (signatures de la section Interfaces).

**Steps:**

- [ ] **Step 1: tests d'abord (echec)**

```ts
import { describe, it, expect } from 'vitest';
import { XPQuiz, XPLabo, XPModule, NIVEAUX, niveauPour, reduireXP, loadXPState, saveXPState } from '../src/lib/xp';

describe('xp', () => {
  it('constantes XP', () => {
    expect(XPQuiz).toBe(10); expect(XPLabo).toBe(5); expect(XPModule).toBe(20);
  });

  it('niveauPour demarre Curieux et couvre tous les seuils', () => {
    expect(niveauPour(0).nom).toBe('Curieux');
    expect(niveauPour(49).nom).toBe('Curieux');
    expect(niveauPour(50).nom).toBe('Organisateur');
    expect(niveauPour(120).nom).toBe('Capitaine');
    expect(niveauPour(200).nom).toBe('Chef de projet');
    expect(NIVEAUX[NIVEAUX.length - 1]?.min).toBe(200);
  });

  it('quiz: gain seulement des 2/3 et une seule fois', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'quiz', id: 'q', correctes: 1, total: 3 });
    expect(s.xp).toBe(0);
    s = reduireXP(s, { type: 'quiz', id: 'q', correctes: 2, total: 3 });
    expect(s.xp).toBe(10);
    s = reduireXP(s, { type: 'quiz', id: 'q', correctes: 3, total: 3 });
    expect(s.xp).toBe(10);
    s = reduireXP(s, { type: 'quiz', id: 'r', correctes: 3, total: 3 });
    expect(s.xp).toBe(20);
  });

  it('labo: +5 une seule fois', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'labo', id: 'l' });
    expect(s.xp).toBe(5);
    s = reduireXP(s, { type: 'labo', id: 'l' });
    expect(s.xp).toBe(5);
  });

  it('module: +20 une seule fois', () => {
    const s0 = { xp: 0, quizDone: [], laboDone: [], moduleDone: [] };
    let s = reduireXP(s0, { type: 'module', id: 'm1' });
    expect(s.xp).toBe(20);
    s = reduireXP(s, { type: 'module', id: 'm1' });
    expect(s.xp).toBe(20);
  });

  it('import fusionne sans doublons et borne les XP au recalcul', () => {
    const s0 = { xp: 0, quizDone: [], laboDone: [], moduleDone: [] };
    const s = reduireXP(s0, { type: 'import', state: { xp: 999, quizDone: ['q'], laboDone: ['l', 'l'], moduleDone: [] } });
    expect(s.quizDone).toEqual(['q']);
    expect(s.laboDone).toEqual(['l']);
    expect(s.xp).toBe(15); // recalcul: 10 + 5 au lieu de 999 (pas de compteur falsisible)
  });

  it('loadXPState au froid part de 0', () => {
    localStorage.clear();
    expect(loadXPState().xp).toBe(0);
  });

  it('saveXPState puis loadXPState rebind la state', () => {
    saveXPState({ xp: 35, quizDone: ['q1'], laboDone: [], moduleDone: ['m1'] });
    expect(loadXPState()).toEqual({ xp: 35, quizDone: ['q1'], laboDone: [], moduleDone: ['m1'] });
  });
});
```

- [ ] **Step 2: lancer (echec)**

Run: `npm test -- tests/xp.test.ts`
Expected: FAIL (Cannot find module).

- [ ] **Step 3: implementer src/lib/xp.ts**

```ts
import { readJSON, writeJSON, X_KEY } from './storage';

export const XPQuiz = 10, XPLabo = 5, XPModule = 20;
export type Niveau = { nom: string; min: number };
export const NIVEAUX: Niveau[] = [
  { nom: 'Curieux', min: 0 }, { nom: 'Organisateur', min: 50 },
  { nom: 'Capitaine', min: 120 }, { nom: 'Chef de projet', min: 200 },
];
export function niveauPour(xp: number): Niveau {
  let out = NIVEAUX[0] as Niveau;
  for (const n of NIVEAUX) if (xp >= n.min) out = n;
  return out;
}

export interface XPState { xp: number; quizDone: string[]; laboDone: string[]; moduleDone: string[] }
export type XPAction =
  | { type: 'quiz'; id: string; correctes: number; total: number }
  | { type: 'labo'; id: string }
  | { type: 'module'; id: string }
  | { type: 'reset' }
  | { type: 'import'; state: Partial<XPState> };

export function reduireXP(s: XPState, a: XPAction): XPState {
  switch (a.type) {
    case 'quiz': {
      if (a.correctes * 3 < a.total * 2) return s;
      if (s.quizDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPQuiz, quizDone: [...s.quizDone, a.id] };
    }
    case 'labo': {
      if (s.laboDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPLabo, laboDone: [...s.laboDone, a.id] };
    }
    case 'module': {
      if (s.moduleDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPModule, moduleDone: [...s.moduleDone, a.id] };
    }
    case 'reset':
      return { xp: 0, quizDone: [], laboDone: [], moduleDone: [] };
    case 'import': {
      const uniq = <T>(arr: T[]) => Array.from(new Set(arr));
      const quizDone = uniq(a.state.quizDone ?? s.quizDone);
      const laboDone = uniq(a.state.laboDone ?? s.laboDone);
      const moduleDone = uniq(a.state.moduleDone ?? s.moduleDone);
      const xp = quizDone.length * XPQuiz + laboDone.length * XPLabo + moduleDone.length * XPModule;
      return { xp, quizDone, laboDone, moduleDone };
    }
  }
}

export function loadXPState(): XPState {
  const s = readJSON<Partial<XPState>>(X_KEY, {});
  return reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'import', state: s });
}

export function saveXPState(s: XPState): void {
  writeJSON(X_KEY, s);
}
```

- [ ] **Step 4: relancer**

Run: `npm test -- tests/xp.test.ts`
Expected: PASS (8 tests).

- [ ] **Step 5: commit**

```bash
git add src/lib/xp.ts tests/xp.test.ts
git commit -m "feat: moteur xp quiz labo module avec gain unique et import fusionne"
```

### Task 5: tests du hook anim (IntersectionObserver capture manuelle)

**Files:**
- Modify: `tests/setup.ts` (observer intercepte, `intersect(el)` manuel pour les tests)
- Test: `tests/anim.test.tsx`
- (src/lib/anim.ts deja ecrit en Task 2 Step 5 ; la tache est son brevet de test)

**Interfaces:**
- Consumes: `useInView`, `useReducedMotion` (Task 2 Step 5), setup jsdom (Task 1 Step 9).
- Produces: setup capable de `intersect(el)` en simulation, garde-fous des hooks.

**Steps:**

- [ ] **Step 1: reecrire tests/setup.ts avec capture mappables**

```ts
import { beforeAll, afterEach } from 'vitest';

interface Obs { cb: (entries: Array<IntersectionObserverEntry>) => void; els: Set<Element> }
const map = new Map<Element, Obs>();

class MockIntersectionObserver implements IntersectionObserver {
  root = null; rootMargin = ''; scrollMargin = '';
  thresholds: number[] = [0];
  private obs: Obs;
  constructor(cb: (entries: Array<IntersectionObserverEntry>) => void) { this.obs = { cb, els: new Set() }; }
  observe(el: Element) { map.set(el, this.obs); this.obs.els.add(el); }
  unobserve(el: Element) { map.delete(el); this.obs.els.delete(el); }
  disconnect() { for (const key of Array.from(map.keys())) if (map.get(key) === this.obs) map.delete(key); this.obs.els.clear(); }
  takeRecords() { return []; }
}

beforeAll(() => {
  Object.defineProperty(globalThis, 'IntersectionObserver', { value: MockIntersectionObserver, writable: true });
});

afterEach(() => map.clear());

export function intersect(el: Element, isIntersecting = true) {
  const obs = map.get(el);
  if (obs) obs.cb([{ isIntersecting, target: el, intersectionRatio: 1, boundingClientRect: {} as DOMRect, intersectionRect: {} as DOMRect, rootBounds: null, time: Date.now() } as unknown as IntersectionObserverEntry]);
}
```

- [ ] **Step 2: ecrire tests/anim.test.tsx**

```tsx
import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { intersect } from './setup';
import { useInView, useReducedMotion } from '../src/lib/anim';

function Probe() {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.2 });
  return <div ref={ref} data-testid="probe" data-seen={String(seen)} />;
}

describe('useInView', () => {
  it('devient visible a l intersection et reste visibles (once)', () => {
    const { getByTestId } = render(<Probe />);
    const el = getByTestId('probe');
    expect(el.dataset.seen).toBe('false');
    act(() => { intersect(el); });
    expect(el.dataset.seen).toBe('true');
  });
});

describe('useReducedMotion', () => {
  it('reflete matchMedia', () => {
    window.matchMedia = (q: string) => ({ matches: q.includes('reduce'), media: q, onchange: null, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false }) as MediaQueryList;
    const out: boolean[] = [];
    const P = () => { out.push(useReducedMotion()); return null; };
    render(<P />);
    expect(out[0]).toBe(true);
  });
});
```

- [ ] **Step 3: installer @testing-library/react et relancer**

Run: `npm i -D @testing-library/react@^16`
Run: `npm test -- tests/anim.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 4: commit**

```bash
git add tests/setup.ts tests/anim.test.tsx
git commit -m "test: hooks useInView et useReducedMotion avec IO simule"
```

### Task 6: SeoHead + SEO par route + NotFound + route de base

**Files:**
- Create: `src/lib/seo.ts`, `src/components/SeoHead.tsx`, `src/routes/NotFound.tsx`
- Modify: `src/App.tsx` (route `*` vers NotFound)

**Interfaces:**
- Produces: `canonicalUrl()`, `SeoHead({ title, description })`, `NotFound`.

**Steps:**

- [ ] **Step 1: ecrire tests/seo.test.tsx**

```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SeoHead, canonicalUrl } from '../src/components/SeoHead';

describe('seo', () => {
  it('canonicalUrl garde origin et path complet', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/module-1');
    expect(canonicalUrl()).toBe('http://localhost/gestion-projet-it/module-1');
  });
  it('SeoHead met title, description, canonical et og:url', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/');
    render(<SeoHead title="Accueil" description="Cours interactif" />);
    expect(document.title).toBe('Accueil : Gestion de Projet IT');
    const sel = (n: string, a: string) => document.querySelector(`meta[${n}="${a}"]`);
    expect(sel('name', 'description')?.getAttribute('content')).toBe('Cours interactif');
    expect(sel('property', 'og:url')?.getAttribute('content')).toBe('http://localhost/gestion-projet-it/');
    expect((document.querySelector('link[rel="canonical"]') as HTMLLinkElement).href).toBe('http://localhost/gestion-projet-it/');
  });
});
```

- [ ] **Step 2: lancer (echec)**

Run: `npm test -- tests/seo.test.tsx`
Expected: FAIL (module absent).

- [ ] **Step 3: implementer src/lib/seo.ts et SeoHead.tsx**

```ts
export function canonicalUrl(): string {
  return window.location.href;
}
```

```tsx
import React from 'react';
import { canonicalUrl } from '../lib/seo';

export function SeoHead(props: { title: string; description: string }) {
  React.useEffect(() => {
    document.title = `${props.title} : Gestion de Projet IT`;
    const set = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    set('name', 'description', props.description);
    set('property', 'og:title', props.title);
    set('property', 'og:description', props.description);
    set('property', 'og:url', canonicalUrl());
    set('property', 'og:type', 'website');
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = canonicalUrl();
  }, [props.title, props.description]);
  return null;
}
```

- [ ] **Step 4: ecrire src/routes/NotFound.tsx**

```tsx
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable" description="Cette route n'existe pas dans le cours." />
      <h1>Page introuvable</h1>
      <p>Retour vers <Link to="/">l'accueil du cours</Link>.</p>
    </>
  );
}
```

- [ ] **Step 5: brancher dans App.tsx (route `*`)**

```tsx
// dans Routes:
<Route path="*" element={<NotFound />} />
```

- [ ] **Step 6: relancer test et build**

Run: `npm test -- tests/seo.test.tsx` : PASS (2 tests).
Run: `npm run lint && npm run build` : OK.

- [ ] **Step 7: commit**

```bash
git add src tests
git commit -m "feat: seo par route canonical og et page introuvable"
```

### Task 7: modules/index.ts (6 modules + 3 futurs Bientot) + smoke Playwright config

**Files:**
- Create: `src/modules/index.ts`, `smoke/smoke.spec.ts`, `playwright.config.ts`
- Modify: `src/App.tsx` (routes /module-:num placeholder utilise moduleMetaByNum)

**Interfaces:**
- Produces: MODULES, FUTURE_MODULES, moduleMetaByNum (contrat section Interfaces). Le smoke Playwright sert a toutes les gate suivantes.

**Steps:**

- [ ] **Step 1: ecrire src/modules/index.ts**

```ts
export interface ModuleMeta { id: string; num: number; slug: string; titre: string; resume: string; motsCles: string[]; avenir?: boolean }
export const MODULES: ModuleMeta[] = [
  { id: 'm1-wbs', num: 1, slug: 'module-1', titre: 'Cadrer et decouper (WBS)', resume: 'Besoin, perimetre dedans dehors, WBS en 3 lots, jalons, definition de fini.', motsCles: ['wbs', 'cadrage', 'perimetre', 'lots', 'jalons', 'decoupage'] },
  { id: 'm2-planif', num: 2, slug: 'module-2', titre: 'Planifier : PERT et GANTT', resume: 'Ordonner les taches, dependances, chaine tendue, barres et jalons sous les yeux.', motsCles: ['pert', 'gantt', 'planning', 'dependances', 'chaine tendue', 'jalons'] },
  { id: 'm3-methodes', num: 3, slug: 'module-3', titre: 'Cycle en V, cascade et choix de methode', resume: 'Phases, tests en miroir du V, cascade simple, comparateur sans dogme.', motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases'] },
  { id: 'm4-agiles', num: 4, slug: 'module-4', titre: 'Agiles : Scrum, Kanban, Lean, XP', resume: 'Backlog, rituels, limites de WIP, petits lots, qualite du code.', motsCles: ['scrum', 'kanban', 'wip', 'lean', 'xp', 'backlog', 'poker planning', 'user stories'] },
  { id: 'm5-outils', num: 5, slug: 'module-5', titre: 'Outils : suivi, CI/CD et environnements', resume: 'Suivi partage, chaine CI, environnements reproductibles, sans tutoriel operatoire.', motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'] },
  { id: 'm6-equipe', num: 6, slug: 'module-6', titre: 'Equipe, risques (Eisenhower) et suivi', resume: 'Communication, tri urgent important, registre des risques, retro utile.', motsCles: ['eisenhower', 'risques', 'retro', 'communication', 'indicateurs'] },
];
export const FUTURE_MODULES: ModuleMeta[] = [
  { id: 'futur-A', num: 7, slug: '', titre: 'Parties prenantes et communication', resume: 'Roles fictifs, plan de messages, rituel de point.', motsCles: ['parties prenantes'], avenir: true },
  { id: 'futur-B', num: 8, slug: '', titre: 'Budget et chiffrage', resume: 'Lots valorises, hypotheses, marge d alea fictive.', motsCles: ['budget'], avenir: true },
  { id: 'futur-C', num: 9, slug: '', titre: 'Conduite du changement', resume: 'Freins, messages, formation courte, relais.', motsCles: ['changement'], avenir: true },
];
export function moduleMetaByNum(num: number): ModuleMeta | undefined {
  return MODULES.find((m) => m.num === num);
}
```

- [ ] **Step 2: ecrire playwright.config.ts + smoke.spec.ts**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './smoke',
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'npm run preview',
    port: 4173,
    reuseExistingServer: true,
  },
});
```

```ts
import { test, expect } from '@playwright/test';

const routes = ['/', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/a-propos'];

test('aucune requete externe, aucune erreur console, toutes les routes au clic puis au rechargement', async ({ page }) => {
  const externals: string[] = [];
  const failures: string[] = [];
  const consoleErrors: string[] = [];
  page.on('request', (r) => { const u = r.url(); if (u.startsWith('http') && !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost')) externals.push(u); });
  page.on('requestfailed', (r) => failures.push(r.url()));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', (e) => consoleErrors.push(String(e)));

  await page.goto('/');
  for (const r of routes) {
    // smoke jalon 0 : navigation directe uniquement (le clic vient en jalon 1 avec la home reel)
    await page.goto(r);
    await expect(page.locator('#contenu')).toBeVisible();
  }
  expect(externals).toEqual([]);
  expect(failures.filter((u) => !/favicon|manifest|sw\.js/.test(u))).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
```

- [ ] **Step 3: routes /module-:num placeholder + a-propos placeholder dans App.tsx**

```tsx
import { useParams } from 'react-router-dom';
import { moduleMetaByNum } from './modules/index';

function ModulePlaceholder() {
  const { num } = useParams() as { num: string };
  const meta = moduleMetaByNum(Number(num));
  if (!meta) return <p>Module inconnu.</p>;
  return <h1>{meta.titre}</h1>;
}
// Routes:
// <Route path="/" element={<p>accueil (jalon 1)</p>} />
// <Route path="/module-:num" element={<ModulePlaceholder />} />
// <Route path="/a-propos" element={<p>prochainement</p>} />
```

- [ ] **Step 4: verifier lint, build, test, smoke**

Run: `npm run lint && npm run build && npm test`
Expected: OK.

Run: `npx playwright install chromium` (une fois).
Run: `npm run smoke`
Expected: 1 test PASS.

- [ ] **Step 5: commit**

```bash
git add src smoke playwright.config.ts
git commit -m "feat: metadonnees modules 6 plus futurs et smoke playwright base"
```

---

# Jalon 1 : accueil anime, gabarit de module et module 1 complet

> **Pattern labo universal (choix de conception, applique aux 10 labos) :** les zones interactives sont des boutons HTML semantiques (clavier complet gratuit : tabulation, entree, fleches), tous les graphiques et objets (arbres, barres, colonnes, matrices, chaines) sont des SVG inline reactifs a l'etat du reducteur, et les messages passent par un aria-live. Ceci precise le design et se conforme aux exigences d'accessibilite du CDC.

### Task 8: lib/search.ts + SearchBar + branchement header

**Files:**
- Create: `src/lib/search.ts`, `src/components/SearchBar.tsx`
- Modify: `src/components/SiteHeader.tsx` (monte SearchBar dans #header-tools)
- Test: `tests/search.test.ts`

**Interfaces:**
- Consumes: `MODULES` (Task 7), router navigate.
- Produces: `buildIndex()`, `searchIndex(index, q)` (signatures section Interfaces) ; `SearchBar` rendre sommaire accessible (label visible, listbox).

**Steps:**

- [ ] **Step 1: tests d'abord**

```ts
import { describe, it, expect } from 'vitest';
import { buildIndex, searchIndex } from '../src/lib/search';

describe('search', () => {
  const index = buildIndex();
  it('l index couvre les 6 modules et leurs sections', () => {
    const modules = new Set(index.map((h) => h.moduleNum));
    expect([...modules].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(index.some((h) => h.ancre === 'labo')).toBe(true);
    expect(index.some((h) => h.ancre === 'quiz')).toBe(true);
  });
  it('cherche sans casse ni accents sur titres et mots cles', () => {
    const hits = searchIndex(index, 'KANBAN');
    expect(hits.some((h) => h.moduleNum === 4)).toBe(true);
    const hits2 = searchIndex(index, 'eisenhower');
    expect(hits2.every((h) => h.moduleNum === 6)).toBe(true);
  });
  it('requête vide rend vide', () => {
    expect(searchIndex(index, '')).toEqual([]);
  });
  it('exclut les modules futurs', () => {
    expect(buildIndex().every((h) => h.moduleNum < 7)).toBe(true);
  });
});
```

- [ ] **Step 2: lancer (echec) puis implementer src/lib/search.ts**

Run: `npm test -- tests/search.test.ts` : FAIL (module absent).

```ts
import { MODULES } from '../modules/index';

export interface SearchHit { moduleNum: number; moduleTitre: string; section: string; ancre: string; label: string; needles: string[] }

const SECTIONS: Array<{ section: string; ancre: string }> = [
  { section: 'Fiche', ancre: 'fiche' },
  { section: 'Fil rouge', ancre: 'fil-rouge' },
  { section: 'Demarche', ancre: 'demarche' },
  { section: 'Labo', ancre: 'labo' },
  { section: 'Exercice corrige', ancre: 'exercice' },
  { section: 'Quiz', ancre: 'quiz' },
  { section: 'Fiche reflexe', ancre: 'reflexe' },
];

export function buildIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  for (const m of MODULES) {
    for (const s of SECTIONS) {
      out.push({
        moduleNum: m.num, moduleTitre: m.titre, section: s.section, ancre: s.ancre,
        label: `${s.section} : ${m.titre}`,
        needles: normaliser(`${m.num} ${m.titre} ${m.resume} ${m.motsCles.join(' ')} ${s.section}`),
      });
    }
  }
  return out;
}

export function normaliser(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const n = normaliser(q.trim());
  if (!n) return [];
  const mots = n.split(/\s+/);
  return index.filter((h) => mots.every((mot) => h.needles.includes(mot)));
}
```

- [ ] **Step 3: implementer src/components/SearchBar.tsx**

```tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { buildIndex, searchIndex } from '../lib/search';

export default function SearchBar() {
  const [q, setQ] = React.useState('');
  const [ouverte, setOuverte] = React.useState(false);
  const navigate = useNavigate();
  const hits = React.useMemo(() => searchIndex(buildIndex(), q), [q]);

  const aller = (moduleNum: number, ancre: string) => {
    setOuverte(false);
    setQ('');
    navigate(`/module-${moduleNum}#${ancre}`);
  };

  return (
    <div className="search" role="search">
      <label htmlFor="search-input">Rechercher dans le cours</label>
      <input
        id="search-input" type="search" value={q} autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setOuverte(e.target.value.trim().length > 0); }}
        onKeyDown={(e) => { if (e.key === 'Escape') { setOuverte(false); setQ(''); } }}
        aria-owns="search-results" aria-expanded={ouverte} role="combobox" aria-controls="search-results"
      />
      {ouverte && (
        <ul id="search-results" role="listbox" aria-label="Resultats de recherche">
          {hits.slice(0, 10).map((h) => (
            <li key={`${h.moduleNum}-${h.ancre}`} role="option" aria-selected={false}>
              <button type="button" onClick={() => aller(h.moduleNum, h.ancre)}>
                Module {h.moduleNum} : {h.moduleTitre} <span>{h.section}</span>
              </button>
            </li>
          ))}
          {hits.length === 0 && <li role="option" aria-selected={false}>Aucun resultat</li>}
        </ul>
      )}
      <p className="sr-only" aria-live="polite">{ouverte ? `${hits.length} resultat(s)` : ''}</p>
    </div>
  );
}
```

styles addition dans index.css :

```css
.search { position: relative; display: flex; flex-direction: column; gap: 0.25rem; }
.search label { font-size: 0.8rem; color: var(--c-muted); }
.search input { padding: 0.4rem 0.6rem; border: 1px solid var(--c-line); border-radius: var(--radius); min-width: 16rem; }
.search ul { position: absolute; top: 100%; z-index: 50; list-style: none; margin: 0.25rem 0 0; padding: 0.25rem; background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--radius); box-shadow: var(--shadow); min-width: 20rem; max-height: 16rem; overflow: auto; }
.search ul button { width: 100%; text-align: left; background: none; border: none; padding: 0.4rem 0.5rem; border-radius: 6px; cursor: pointer; }
.search ul button:hover { background: var(--c-bg); }
.search ul span { color: var(--c-muted); font-size: 0.8rem; }
```

- [ ] **Step 4: SiteHeader monte SearchBar**

```tsx
// modifier SiteHeader : importer SearchBar et remplacer
// <div id="header-tools" /> par <div id="header-tools"><SearchBar /></div>
```

- [ ] **Step 5: relancer tests et build**

Run: `npm test -- tests/search.test.ts` : PASS (4 tests).
Run: `npm run lint && npm run build` : OK.

- [ ] **Step 6: commit**

```bash
git add src tests
git commit -m "feat: recherche client avec index sans casse ni accents et resultats ancored"
```

### Task 9: ProgressProvider + ProgressHeader (XP, niveau, badges, export/import)

**Files:**
- Create: `src/lib/progress.tsx`, `src/components/ProgressHeader.tsx`
- Modify: `src/main.tsx` (enrobe App), `src/components/SiteHeader.tsx` (monte ProgressHeader)
- Test: `tests/progress.test.tsx`

**Interfaces:**
- Consumes: `reduireXP`, `loadXPState`, `saveXPState`, `niveauPour`, X_KEY (Task 4).
- Produces: `ProgressProvider`, `useProgress()` (contrat section Interfaces). Etat persiste a chaque changement via `saveXPState`.

**Steps:**

- [ ] **Step 1: tests d'abord**

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import React from 'react';
import { ProgressProvider, useProgress } from '../src/lib/progress';

describe('progress provider', () => {
  beforeEach(() => localStorage.clear());

  it('dispatch quiz complet accorde +10 XP une seule fois', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'quiz', id: 'q1', correctes: 2, total: 3 }));
    expect(result.current.xp).toBe(10);
    act(() => result.current.dispatch({ type: 'quiz', id: 'q1', correctes: 3, total: 3 }));
    expect(result.current.xp).toBe(10);
  });

  it('persiste dans localStorage apres dispatch', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'labo', id: 'l1' }));
    expect(JSON.parse(localStorage.getItem('gestion-projet-it:xp') as string).xp).toBe(5);
  });

  it('exportJSON puis importJSON retablissent l etat', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'module', id: 'm1-wbs' }));
    const json = result.current.exportJSON();
    act(() => result.current.dispatch({ type: 'reset' }));
    expect(result.current.xp).toBe(0);
    expect(result.current.importJSON(json)).toBe(true);
    expect(result.current.moduleDone).toEqual(['m1-wbs']);
  });

  it('importJSON rejette un JSON invalide en retournant false', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    expect(result.current.importJSON('not-json')).toBe(false);
  });

  it('niveau suit l XP', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => { for (let i = 0; i < 5; i++) result.current.dispatch({ type: 'quiz', id: `q${i}`, correctes: 3, total: 3 }); });
    expect(result.current.niveau.nom).toBe('Organisateur');
  });
});
```

- [ ] **Step 2: lancer (echec)**

Run: `npm test -- tests/progress.test.tsx` : FAIL.

- [ ] **Step 3: implementer src/lib/progress.tsx**

```tsx
import React from 'react';
import { reduireXP, loadXPState, saveXPState, niveauPour, XPAction, XPState } from './xp';

export interface ProgressContextValue extends XPState {
  niveau: ReturnType<typeof niveauPour>;
  dispatch: (a: XPAction) => void;
  exportJSON: () => string;
  importJSON: (json: string) => boolean;
}

const Ctx = React.createContext<ProgressContextValue | null>(null);

export function ProgressProvider(props: { children: React.ReactNode }) {
  const [state, setState] = React.useState<XPState>(() => loadXPState());
  React.useEffect(() => { saveXPState(state); }, [state]);
  const value: ProgressContextValue = {
    ...state,
    niveau: niveauPour(state.xp),
    dispatch: (a) => setState((s) => reduireXP(s, a)),
    exportJSON: () => JSON.stringify({ version: 1, ...state }),
    importJSON: (json) => {
      try {
        const parsed = JSON.parse(json) as Partial<XPState> & { version?: number };
        if (parsed.version !== 1) return false;
        setState((s) => reduireXP(s, { type: 'import', state: parsed }));
        return true;
      } catch {
        return false;
      }
    },
  };
  return <Ctx.Provider value={value}>{props.children}</Ctx.Provider>;
}

export function useProgress(): ProgressContextValue {
  const v = React.useContext(Ctx);
  if (!v) throw new Error('useProgress hors ProgressProvider');
  return v;
}
```

- [ ] **Step 4: implementer src/components/ProgressHeader.tsx (XP, niveau, badges, export/import)**

```tsx
import React from 'react';
import { useProgress } from '../lib/progress';

export default function ProgressHeader() {
  const p = useProgress();
  return (
    <div className="progress-header" aria-label="Progression">
      <span className="xp-chip">{p.xp} XP</span>
      <span className="niveau-chip">{p.niveau.nom}</span>
      <span className="badge-chip">{p.moduleDone.length}/6 modules</span>
      <button type="button" className="btn secondary mini" onClick={exportJson}>Exporter</button>
      <label className="mini btn secondary" style={{ cursor: 'pointer' }}>
        Importer
        <input type="file" accept="application/json" className="sr-only" onChange={importJson} aria-label="Importer une progression JSON" />
      </label>
      <p className="sr-only" aria-live="polite">{`${p.xp} XP, niveau ${p.niveau.nom}`}</p>
    </div>
  );

  function exportJson() {
    const blob = new Blob([p.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gestion-projet-it-progression.json';
    a.click(); URL.revokeObjectURL(url);
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    f.text().then((txt) => p.importJSON(txt));
  }
}
```

styles addition (index.css) :

```css
.progress-header { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.xp-chip, .niveau-chip, .badge-chip { border: 1px solid var(--c-line); background: var(--c-surface); border-radius: 999px; padding: 0.15rem 0.7rem; font-size: 0.85rem; }
.btn.mini { padding: 0.25rem 0.6rem; font-size: 0.8rem; }
```

- [ ] **Step 5: brancher main.tsx et SiteHeader**

```tsx
// main.tsx : enrober
<ProgressProvider><App /></ProgressProvider>
// SiteHeader : <div id="header-tools"><SearchBar /><ProgressHeader /></div>
```

- [ ] **Step 6: relancer**

Run: `npm test -- tests/progress.test.tsx` : PASS (5 tests).
Run: `npm run build` : OK.

- [ ] **Step 7: commit**

```bash
git add src tests
git commit -m "feat: provider progression xp persistant avec export import json"
```

### Task 10: ModuleLayout, ExerciseBlock, QuizBlock, FicheReflexe, ModuleEnd + tests

**Files:**
- Create: `src/components/ModuleLayout.tsx`, `src/components/ExerciseBlock.tsx`, `src/components/QuizBlock.tsx`, `src/components/FicheReflexe.tsx`, `src/components/ModuleEnd.tsx`
- Test: `tests/blocks.test.tsx`

**Interfaces:**
- Consumes: `useProgress` (Task 9), `QuizData` (section Interfaces), `Reveal` (Task 2).
- Produces (contrats utilises par les modules /m1..m6) :

```tsx
export function ModuleLayout(props: { meta: import('../modules/index').ModuleMeta; children: React.ReactNode }): JSX.Element;
// rend SeoHead, h1 + metadata, sommaire ancres, children, ModuleEnd auto ajoute en bas.
export function ExerciseBlock(props: { id: string; titre: string; enonce: React.ReactNode; corrige: React.ReactNode; methode: string[] }): JSX.Element;
// section id="exercice" ; corrige masque par details/summary.
export function QuizBlock(props: { data: QuizData }): JSX.Element;
// section id="quiz" ; corrige immediat par question, +10 XP des 2/3 via dispatch quiz, une fois; bouton recommencer sans XP.
export function FicheReflexe(props: { titre: string; items: string[] }): JSX.Element;
// section id="reflexe" class fiche-reflexe ; bouton imprimer -> window.print() avec classe printing.
export function ModuleEnd(props: { id: string }): JSX.Element;
// section id="fin" ; bouton termine +20 XP une fois ; badge quand deja fait.
```

**Steps:**

- [ ] **Step 1: tests d'abord**

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressProvider } from '../src/lib/progress';
import ModuleLayout from '../src/components/ModuleLayout';
import { ExerciseBlock } from '../src/components/ExerciseBlock';
import { QuizBlock } from '../src/components/QuizBlock';
import { FicheReflexe } from '../src/components/FicheReflexe';
import { ModuleEnd } from '../src/components/ModuleEnd';
import { moduleMetaByNum } from '../src/modules/index';

const quizData: QuizData = {
  id: 'q-unit',
  questions: [1, 2, 3].map((n) => ({
    question: `Qu ${n}`,
    choix: ['Bonne', 'Fausse a', 'Fausse b'] as [string, string, string],
    bonne: 0 as 0 | 1 | 2,
    motif: `M ${n}`,
  })),
};
```

> Correction de forme pour le test : `const quizData: QuizData = { id: 'q-unit', questions: [1,2,3].map((n) => ({ question: `Qu ${n}`, choix: ['Bonne','Fausse a','Fausse b'] as [string,string,string], bonne: 0 as 0|1|2, motif: `M ${n}` })) };` (importer le type QuizData depuis src/components/QuizBlock.tsx).

```tsx
describe('QuizBlock', () => {
  it('accorde XP quand 2 sur 3, pas deux fois', () => {
    localStorage.clear();
    render(<ProgressProvider><MemoryRouter><QuizBlock data={quizData} /></MemoryRouter></ProgressProvider>);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[0]);
    expect(screen.getByText(/Corrige/)).toBeTruthy();
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[1]);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[2]);
    const res = screen.getByRole('status');
    expect(res.textContent).toMatch(/2 sur 3/);
    expect(res.textContent).toMatch(/10 XP/);
    fireEvent.click(screen.getByRole('button', { name: /Recommencer sans XP/ }));
    expect(screen.getAllByRole('radio', { name: 'Fausse a' })[0]).toBeEnabled();
  });
});

describe('FicheReflexe', () => {
  it('rend 5 items et un bouton imprimer accessible', () => {
    render(<FicheReflexe titre="Fiche M1" items={['a', 'b', 'c', 'd', 'e']} />);
    expect(within(screen.getByTestId('fiche-reflexe')).getAllByRole('listitem').length).toBe(5);
    expect(screen.getByRole('button', { name: /Imprimer/ })).toBeTruthy();
  });
});

describe('ExerciseBlock', () => {
  it('corrige masque puis visible via details', () => {
    const { container } = render(
      <ExerciseBlock id="ex1" titre="T1" enonce={<p>Enonce</p>} corrige={<p>Corrige de l enonce</p>} methode={['etape 1']} />,
    );
    const det = container.querySelector('details') as HTMLDetailsElement;
    expect(det.hasAttribute('open')).toBe(false);
    fireEvent.click(det.querySelector('summary') as HTMLElement);
    expect(screen.getByText(/Corrige de l enonce/)).toBeTruthy();
  });
});

describe('ModuleEnd', () => {
  it('bouton termine accorde une fois le badge', () => {
    localStorage.clear();
    const meta = moduleMetaByNum(1) as ModuleMeta?; // type Suite: ModuleMeta import
    render(<ProgressProvider><MemoryRouter><ModuleEnd id="m1-wbs" /></MemoryRouter></ProgressProvider>);
    fireEvent.click(screen.getByRole('button', { name: /module termine/ }));
    expect(screen.getByText(/Badge/)).toBeTruthy();
  });
});
```

> Dans le test ModuleEnd : retirer la ligne `const meta` inutilisee, et passer { id: 'm1-wbs' } tel quel.

- [ ] **Step 2: implementer les composants**

Chaque composant ci-dessous est la reference exacte que les tests conduisent : nommez les props a l'identique.

```tsx
// src/components/ModuleLayout.tsx
import React from 'react';
import { SeoHead } from './SeoHead';
import { ModuleEnd } from './ModuleEnd';

export function ModuleLayout(props: { meta: { titre: string; resume: string; num: number; id: string }; children: React.ReactNode; duree?: string }) {
  return (
    <article className="module-page">
      <SeoHead title={props.meta.titre} description={props.meta.resume} />
      <header className="module-head">
        <p className="kicker">Module {props.meta.num} - 5 minutes de lecture par fiche</p>
        <h1>{props.meta.titre}</h1>
        <p>{props.meta.resume}</p>
        <nav aria-label="Sommaire du module" className="sommaire">
          <a href="#fiche">Fiche</a>
          <a href="#fil-rouge">Fil rouge</a>
          <a href="#demarche">Demarche</a>
          <a href="#labo">Labo</a>
          <a href="#exercice">Exercice corrige</a>
          <a href="#quiz">Quiz</a>
          <a href="#reflexe">Fiche reflexe</a>
        </nav>
      </header>
      {props.children}
      <ModuleEnd id={props.meta.id} />
    </article>
  );
}
```

```tsx
// src/components/ExerciseBlock.tsx
import React from 'react';
export function ExerciseBlock(props: { id: string; titre: string; enonce: React.ReactNode; corrige: React.ReactNode; methode: string[] }) {
  return (
    <section id={props.id} className="exercise" aria-labelledby={`${props.id}-t`}>
      <h2 id={`${props.id}-t`} className={props.id === 'exercice' ? 'sr-anchor' : undefined}>{props.titre}</h2>
      {props.enonce}
      <details className="corrige">
        <summary>Voir le corrige</summary>
        <div className="corrige-body">{props.corrige}</div>
      </details>
      <h3>Methode reusable</h3>
      <ol>{props.methode.map((m, i) => <li key={i}>{m}</li>)}</ol>
    </section>
  );
}
```

> Note sur les ancres : les sommaires pointent `#fiche`, `#labo`, `#exercice`, `#quiz`, `#reflexe` ; le wrapper du module utilise ces ids autour des blocs (id="exercice" pour le wrapper d'exercices, id="labo" pour le wrapper du labo). Les ExerciseBlock gardent leurs ids libres (`m1-ex1`, `m1-ex2`).

```tsx
// src/components/QuizBlock.tsx
import React from 'react';
import { useProgress } from '../lib/progress';

export interface QuizQuestion { question: string; choix: [string, string, string]; bonne: 0 | 1 | 2; motif: string }
export interface QuizData { id: string; questions: QuizQuestion[] }

export function QuizBlock(props: { data: QuizData }) {
  const p = useProgress();
  const [repondu, setRepondu] = React.useState<Array<number | null>>(() => props.data.questions.map(() => null));
  const deja = p.quizDone.includes(props.data.id);
  const bonnes = props.data.questions.filter((q, i) => repondu[i] === q.bonne).length;
  const complet = repondu.every((r) => r !== null);
  const [verdict, setVerdict] = React.useState<null | string>(null);
  const [gagne, setGagne] = React.useState(false);

  React.useEffect(() => {
    if (complet) {
      const s = `${bonnes} sur ${props.data.questions.length} bonnes reponses. ${deja ? 'Gain deja recu pour ce quiz.' : bonnes >= 2 ? '+10 XP' : 'Moins de 2/3 : pas de gain, tu peux recommencer.'}`;
      setVerdict(s);
      if (bonnes >= 2 && !deja) {
        p.dispatch({ type: 'quiz', id: props.data.id, correctes: bonnes, total: props.data.questions.length });
        setGagne(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complet]);

  const reset = () => { setRepondu(props.data.questions.map(() => null)); setVerdict(null); setGagne(false); };

  return (
    <section id="quiz" className="quiz" aria-labelledby="quiz-t">
      <h2 id="quiz-t">Quiz courant (3 questions)</h2>
      {props.data.questions.map((q: QuizQuestion, i: number) => (
        <fieldset key={i} disabled={repondu[i] !== null}>
          <legend>{`Q${i + 1}.${q.question}`}</legend>
          {q.choix.map((c, j) => (
            <div key={j} className="choix">
              <input type="radio" name={`q-${i}`} id={`q-${i}-${j}`} value={j} checked={repondu[i] === j} onChange={() => setRepondu((r) => r.map((v, k) => (k === i ? j : v)))} />
              <label htmlFor={`q-${i}-${j}`}>{c}</label>
            </div>
          ))}
          {repondu[i] !== null && (
            <p className={repondu[i] === q.bonne ? 'ok' : 'err'} role="note">
              {repondu[i] === q.bonne ? 'Correct. ' : 'Pas cette fois. '} Motif : {q.motif}
            </p>
          )}
        </fieldset>
      ))}
      <p role="status">{verdict}{gagne && <strong> +10 XP ajoutes.</strong>}</p>
      {complet && <button type="button" className="btn secondary" onClick={reset}>Recommencer sans XP</button>}
    </section>
  );
}
```

```tsx
// src/components/FicheReflexe.tsx
import React from 'react';
export function FicheReflexe(props: { titre: string; items: string[] }) {
  const imprimer = () => {
    document.body.classList.add('printing-fiche');
    window.print();
    window.addEventListener('afterprint', () => document.body.classList.remove('printing-fiche'), { once: true });
  };
  return (
    <section id="reflexe" className="fiche-reflexe card" data-testid="fiche-reflexe" aria-labelledby="reflexe-t">
      <h2 id="reflexe-t">{props.titre}</h2>
      <ol>{props.items.map((it, i) => <li key={i}>{it}</li>)}</ol>
      <button type="button" className="btn secondary no-print" onClick={imprimer}>Imprimer la fiche</button>
    </section>
  );
}
```

```tsx
// src/components/ModuleEnd.tsx
import React from 'react';
import { useProgress } from '../lib/progress';

export function ModuleEnd(props: { id: string }) {
  const p = useProgress();
  const fait = p.moduleDone.includes(props.id);
  return (
    <section id="fin" className="module-end">
      {fait
        ? <p className="ok" role="status">Module termine. Badge ajoute ({p.moduleDone.length}/6).</p>
        : <button type="button" className="btn" onClick={() => p.dispatch({ type: 'module', id: props.id })}>Marquer le module comme termine (+20 XP)</button>}
    </section>
  );
}
```

print.css complet (remplace la version Task 2) :

```css
@media print {
  body.printing-fiche header,
  body.printing-fiche footer,
  body.printing-fiche nav,
  body.printing-fiche .no-print,
  body.printing-fiche main > :not(.module-page),
  body.printing-fiche .module-page > :not(#reflexe) { display: none !important; }
  body.printing-fiche .fiche-reflexe { border: 1.5px solid #000; padding: 1rem; }
  body { background: #fff; }
  header, footer, nav, .no-print { display: none !important; }
}
```

- [ ] **Step 3: relancer les tests du bloc**

Run: `npm test -- tests/blocks.test.tsx`
Expected: PASS (4 tests).

Note d'implementation pour le test QuizBlock : le verdict s'affiche apres la derniere reponse ; le test s'attend au texte "2 sur 3" et "+10 XP" dans la region role="status".

- [ ] **Step 4: commit**

```bash
git add src tests
git commit -m "feat: gabarit module blocks quiz exercise reflexe module end avec xp"
```

### Task 11: accueil complete (hero anime, cartes modules, progression, fil rouge) + CSS hero

**Files:**
- Create: `src/routes/accueil.tsx`, `src/styles/hero.css`
- Modify: `src/App.tsx` (route/), `src/styles/index.css` (articles accueil cards)

**Interfaces:**
- Consumes: MODULES, FUTURE_MODULES, SearchBar, ProgressHeader, Reveal, useInView (toutes precedentes).

**Steps:**

- [ ] **Step 1: ecrire hero.css (boucles CSS pures, sans JS)**

```css
.hero { padding: 2.5rem 0 1rem; }
.hero h1 { font-size: 2.2rem; margin: 0 0 0.5rem; }
.hero .accroche { font-size: 1.15rem; color: var(--c-muted); max-width: 46rem; }
.hero-svg { width: 100%; max-width: 46rem; height: auto; display: block; margin: 1rem 0; }
.panels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 900px) { .panels { grid-template-columns: 1fr; } .modules-grid { grid-template-columns: 1fr !important; } }
.gantt-bar { animation: gantt-slide 6s ease-in-out infinite alternate; }
.gantt-bar2 { animation: gantt-slide 7s 0.8s ease-in-out infinite alternate; }
@keyframes gantt-slide { from { transform: translateX(0); } to { transform: translateX(60px); } }
.kan-1, .kan-2 { animation: kan-fill 8s ease-in-out infinite alternate; }
.kan-2 { transform-origin: center; }
@keyframes kan-fill { 0%, 15% { opacity: 0.15; } 60%, 100% { opacity: 1; } }
.v-path { stroke-dasharray: 320; animation: v-draw 9s ease-in-out infinite alternate; }
@keyframes v-draw { 0%, 10% { stroke-dashoffset: 320; } 70%, 100% { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) { .gantt-bar, .gantt-bar2, .kan-1, .kan-2, .v-path { animation: none; } .v-path { stroke-dashoffset: 0; } .kan-1, .kan-2 { opacity: 1; } }

/* cartes modules */
.modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.5rem; }
.module-card { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.1rem; border-radius: var(--radius); background: var(--c-surface); border: 1px solid var(--c-line); box-shadow: var(--shadow); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.module-card:hover { transform: scale(1.02); }
@media (prefers-reduced-motion: reduce) { .module-card, .module-card:hover { transform: none; } }
.module-card .num { color: var(--c-main); font-weight: 700; }
.module-card a.titre { font-weight: 700; font-size: 1.05rem; }
.module-card .resume { color: var(--c-muted); font-size: 0.95rem; }
.module-card.avenir { opacity: 0.55; box-shadow: none; }
.badge-bientot { align-self: flex-start; background: var(--c-soft); color: var(--c-main-ink); border-radius: 999px; padding: 0.1rem 0.6rem; font-size: 0.8rem; }
.progression-accueil { margin: 1rem 0 2rem; padding: 0.9rem 1.1rem; }
```

- [ ] **Step 2: ecrire src/routes/accueil.tsx**

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MODULES, FUTURE_MODULES } from '../modules/index';
import { SeoHead } from '../components/SeoHead';
import Reveal from '../components/Reveal';
import { useProgress } from '../lib/progress';
import '../styles/hero.css';

function Hero() {
  return (
    <section className="reveal visible">
      <p className="kicker">Cours interactif gratuit, sans compte</p>
      <h1>Gerer un projet informatique, pas a pas</h1>
      <p className="accroche">Cadrer, decouper, planifier, choisir sa methode, outiller et animer l equipe : 6 modules courts avec labos manipulables, exercices corriges et quiz, sur un fil rouge fictif.</p>
      <svg className="hero-svg" viewBox="0 0 720 200" role="img" aria-label="Trois vues du cours : un GANTT qui avance, un Kanban qui se remplit et une courbe en V qui se dessine">
        {/* panneau 1 : GANTT animé */}
        <g aria-hidden="true" transform="translate(10,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">GANTT</text>
          <g className="gantt-bar"><rect x="10" y="34" width="90" height="12" rx="6" fill="var(--c-main)" /></g>
          <g className="gantt-bar2"><rect x="20" y="56" width="120" height="12" rx="6" fill="var(--c-calm)" /></g>
          <rect x="10" y="78" width="150" height="12" rx="6" fill="var(--c-soft)" stroke="var(--c-line)" />
          <circle cx="182" cy="40" r="6" fill="var(--c-main)" />
          <text x="12" y="108" fontSize="10" fill="var(--c-muted)">taches, jalons, chaines</text>
        </g>
        {/* panneau 2 : Kanban */}
        <g aria-hidden="true" transform="translate(250,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">Kanban</text>
          {['A faire', 'En cours', 'Fini'].map((c, i) => (
            <g key={c}>
              <rect x={12 + i * 70} y={30} width={60} height={74} rx="8" fill="var(--c-bg)" stroke="var(--c-line)" />
              <text x={16 + i * 70} y={24} fontSize="9" fill="var(--c-muted)">{c}</text>
            </g>
          ))}
          <g className="kan-1"><rect x="82" y="40" width="54" height="14" rx="7" fill="var(--c-main)" /></g>
          <g className="kan-2"><rect x="82" y="60" width="54" height="14" rx="7" fill="var(--c-calm)" /></g>
          <rect x="152" y="40" width="54" height="14" rx="7" fill="var(--c-soft)" stroke="var(--c-line)" />
          <text x="12" y="110" fontSize="10" fill="var(--c-muted)">limites de WIP</text>
        </g>
        {/* panneau 3 : cycle en V */}
        <g aria-hidden="true" transform="translate(490,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">Cycle en V</text>
          <path className="v-path" d="M30 100 L70 40 L110 100 L150 40 L190 100" fill="none" stroke="var(--c-main)" strokeWidth="3" strokeLinecap="round" />
          <text x="12" y="112" fontSize="10" fill="var(--c-muted)">phases et tests en miroir</text>
        </g>
      </svg>
      <p><Link className="btn" to="/module-1">Commencer par le module 1 : cadrer et decouper</Link></p>
    </section>
  );
}

export default function Accueil() {
  const p = useProgress();
  return (
    <div data-testid="page-accueil">
      <SeoHead title="Gestion de Projet IT : Methodologies et Equipes" description="Cours interactif en 6 modules : cadrage, WBS, PERT, GANTT, methodes, agiles, outils CI, risques. Labos manipulables, quiz corriges, XP." />
      <Hero />
      {p.xp > 0 && (
        <div className="progression-accueil card" role="status">
          {p.xp} XP, niveau {p.niveau.nom}, {p.moduleDone.length}/6 modules termines.
        </div>
      )}
      <h2>Les six modules</h2>
      <div className="modules-grid">
        {MODULES.map((m, i) => (
          <Reveal key={m.id} delay={i * 60}>
            <div className="module-card">
              <span className="num" aria-hidden="true">{m.num}</span>
              <Link className="titre" to={`/${m.slug}`}>{m.titre}</Link>
              <p className="resume">{m.resume}</p>
            </div>
          </Reveal>
        ))}
        {FUTURE_MODULES.map((m) => (
          <div key={m.id} className="module-card avenir" aria-disabled="true">
            <strong>{m.titre}</strong>
            <p className="resume">{m.resume}</p>
            <span className="badge-bientot">Bientot</span>
          </div>
        ))}
      </div>
      <h2>Le fil rouge du cours</h2>
      <p>Un seul cas fictif traverse les 6 modules : la refonte du site de l association fictive <strong>Les Amis du Square</strong> (pages de presentation, agenda des activites, formulaire de contact fictif). Toutes les donnees restent fictives, stockees uniquement dans le navigateur.</p>
    </div>
  );
}
```

- [ ] **Step 3: brancher la route dans App.tsx**

```tsx
// dans App.tsx Routes : <Route path="/" element={<Accueil />} />
import Accueil from './routes/accueil';
```

- [ ] **Step 4: verifier visuellement et la gate console**

Run: `npm run dev` ; naviguer : hero anime (3 boucles), cartes visibles au scroll, recherche qui filtre, XP doit s'afficher apres un quiz fait.
Run: `npm run lint && npm run build && npm test` : OK.

- [ ] **Step 5: commit**

```bash
git add src
git commit -m "feat: accueil hero anime en css pur cartes modules progression fil rouge"
```

### Task 12: module 1 (contenus rediges sur le fil rouge, donnees quiz/exercice/fiche reflexe)

**Files:**
- Create: `src/modules/m1-wbs/fiche.tsx`, `src/modules/m1-wbs/filRouge.tsx`, `src/modules/m1-wbs/demarche.tsx`, `src/modules/m1-wbs/exercice.tsx`, `src/modules/m1-wbs/quiz.ts`, `src/modules/m1-wbs/ficheReflexe.ts`
- Modify: `src/App.tsx` (route /module-1 rend la page assemblee)

**Interfaces:**
- Consumes: ModuleLayout, ExerciseBlock, QuizBlock, FicheReflexe, Reveal (Task 10) ; quiz/fiche data types QuizData.
- Produces: `M1Page` complete (fiche + fil rouge + demarche + exercices + quiz + reflexe) Le labo (Task 13) s'ajoute entre demarche et exercices.

**Steps:**

- [ ] **Step 1: ecrire src/modules/m1-wbs/quiz.ts (contenu CDC 15.1 verbatim repris)**

```ts
import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm1-quiz',
  questions: [
    {
      question: 'A quoi sert un WBS ?',
      choix: [
        'Visualiser les livrables et les lots pour partager le perimetre',
        'Coder plus vite',
        'Remplacer le planning',
      ],
      bonne: 0,
      motif: 'Le WBS montre ce qui est a livrer, pas comment coder ni quand livrer.',
    },
    {
      question: 'Ou place le paiement en ligne dans le cas fictif ?',
      choix: ['Dans le lot Realisation', 'Dehors, car hors cadrage fictif', 'En jalon'],
      bonne: 1,
      motif: 'Le cadrage fictif l exclut, donc il reste dehors avec motif ecrit.',
    },
    {
      question: 'Quest ce qu une bonne definition de fini ?',
      choix: ['Une formule vague', 'Un critere verifiable par lot', 'Une date'],
      bonne: 1,
      motif: 'On peut constater que c est fini ; la date seule ne le prouve pas.',
    },
  ],
};
```

- [ ] **Step 2: ecrire src/modules/m1-wbs/ficheReflexe.ts**

```ts
export const items = [
  'Formule le besoin en une phrase simple.',
  'Separe dedans et dehors sans recouvrement.',
  'Nomme chaque lot par son livrable.',
  'Pose deux jalons au moins, valides par une personne.',
  'Ecris une definition de fini verifiable par lot.',
];
```

- [ ] **Step 3: ecrire fiche.tsx, filRouge.tsx, demarche.tsx (textes issus du CDC 11.1 et 15.1)**

```tsx
// fiche.tsx
import React from 'react';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : cadrer et decouper</h2>
    <p><strong>Definition.</strong> Le cadrage enonce le besoin, le perimetre et les jalons ; le WBS decoupe le travail en lots de livrables.</p>
    <p><strong>A quoi ca sert.</strong> Visualiser les livrables et les lots, partager le perimetre avec tous, eviter les malentendus sur ce qui est dedans ou dehors.</p>
    <p><strong>Quand l'utiliser.</strong> Au cadrage, au lotissement, et avant toute planification ; des qu un projet sort de trois taches simples.</p>
    <p><strong>Avantages.</strong> Vue partagee, decoupage qui parle a tous, base du planning et des estimations.</p>
    <p><strong>Limites.</strong> Le WBS dit ce qui est livrer, ni l ordre ni la charge ; un decoupage trop fin se maintien difficilement.</p>
    <p><strong>Cas d'usage fictif.</strong> La refonte du site de l association fictive est decoupee en trois lots (contenu, realisation, mise en ligne) pour expliquer le perimetre aux benevoles fictifs.</p>
  </section>
);

export default Fiche;
```

```tsx
// filRouge.tsx
import React from 'react';

export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecues du fil rouge</h2>
    <h3>Exemple 1 : le perimetre en une page</h3>
    <p>L association fictive Les Amis du Square veut un site lisible. <strong>Dedans :</strong> pages de presentation, agenda des activites, formulaire de contact fictif, version mobile lisible. <strong>Dehors :</strong> espace membre avec paiement, application mobile dediee, traduction en plusieurs langues. <strong>Jalon fictif :</strong> maquette validee par le bureau fictif de l association.</p>
    <h3>Exemple 2 : le WBS en 3 lots</h3>
    <p><strong>Lot Contenu :</strong> inventaire des pages, textes relus, photos locales. <strong>Lot Realisation :</strong> maquette, integration, tests sur mobile. <strong>Lot Mise en ligne :</strong> notice simple, formation courte des benevoles fictifs, sauvegarde.</p>
  </section>
);

export default FilRouge;
```

```tsx
// demarche.tsx
import React from 'react';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Formuler le besoin en une phrase (pour qui, pour quoi).</li>
      <li>Lister ce qui est dedans et ce qui est dehors, sans recouvrement.</li>
      <li>Decouper le dedans en lots nommes par livrable (2 a 4 lots suffisent souvent).</li>
      <li>Poser deux jalons au moins, chacun valide par une personne identifiee.</li>
      <li>Ecrire une definition de fini concrete et verifiable pour chaque lot.</li>
    </ol>
  </section>
);

export default Demarche;
```

- [ ] **Step 4: ecrire src/modules/m1-wbs/exercice.tsx (2 exercices CDC 15.1 avec corriges masques)**

```tsx
import React from 'react';
import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m1-ex1"
      titre="Exercice 1 : cadrer en une page"
      enonce={(
        <div>
          <p>Sur le fil rouge fictif (refonte du site des Amis du Square), ecris le cadrage en une page : besoin, dedans et dehors, 3 lots, 2 jalons fictifs, 1 definition de fini par lot.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Besoin formule en une phrase :</strong> "rendre le site de l association lisible et simple a maintenir par des benevoles fictifs."</p>
          <p><strong>Dedans :</strong> presentation, agenda, contact fictif, version mobile lisible. <strong>Dehors :</strong> paiement, application dediee, traductions.</p>
          <p><strong>3 lots:</strong> Contenu (inventaire des pages, textes relus, photos locales), Realisation (maquette, integration, mobile), Mise en ligne (notice, formation des benevols, sauvegarde).</p>
          <p><strong>2 jalons :</strong> maquette validee par le bureau fictif ; site publie.</p>
          <p><strong>Definition de fini (exemple)</strong> : lot Contenu fini quand chaque page a un texte relu et une photo locale.</p>
        </div>
      )}
      methode={[
        'Une phrase de besoin, sans jargon.',
        'Deux listes : dedans, dehors ; aucune ambiguite.',
        'Des lots nommes par livrable, jamais par role.',
        'Deux jalons places, lisibles et valides par une personne.',
        'Une definition de fini verifiable par lot.',
      ]}
    />
    <ExerciseBlock
      id="m1-ex2"
      titre="Exercice 2 : trier une liste tangible"
      enonce={(
        <div>
          <p>La liste fictive melange 8 taches dont 2 hors perimetre et 1 oubliee (la notice des benevoles fictifs). Trie en 3 lots, isole les hors perimetre, ajoute l oubliée.</p>
          <ul>
            <li>inventaire des pages</li>
            <li>choix des photos locales</li>
            <li>réécrire les textes</li>
            <li>réaliser la maquette</li>
            <li>integration des pages</li>
            <li>paiement des cotisations en ligne</li>
            <li>sauvegarde du site</li>
            <li>application mobile dediee</li>
          </ul>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Hors perimetre</strong> (isoles avec motif) : paiement des cotisations en ligne et application mobile dediee, exclus du cadrage fictif.</p>
          <p><strong>Lot Contenu :</strong> inventaire, textes, photos. <strong>Lot Realisation :</strong> maquette, integration. <strong>Lot Mise en ligne :</strong> sauvegarde, plus la <strong>notice des benevoles</strong> (l oubli a ajouter).</p>
          <p><strong>Methode :</strong> tout item sans lot revele un oubli ou un hors perimetre.</p>
        </div>
      )}
      methode={[
        'Distribuer chaque tache dans un lot.',
        'Isoler ce qui refuse de rentrer et l expliquer.',
        'Chercher un dependance oubliee et la nommer.',
      ]}
    />
  </div>
);

export default Exercices;
```

> Correction textuelle attendue lors de la relecture du module : verifier les mots erronnes dans le bloc corrige ci-dessus ("besoin formule en une phrase", "isoles", "benevoles fictifs", "tout item sans lot revele").

- [ ] **Step 5: assembler la page src/modules/m1-wbs/index.tsx et brancher la route**

```tsx
// src/modules/m1-wbs/index.tsx
import React from 'react';
import { ModuleLayout } from '../../components/ModuleLayout';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercice';
import { QuizBlock } from '../../components/QuizBlock';
import { quiz } from './quiz';
import { FicheReflexe } from '../../components/FicheReflexe';
import { items } from './ficheReflexe';
import Reveal from '../../components/Reveal';

export const M1Page = () => (
  <ModuleLayout meta={{ titre: 'Cadrer et decouper (WBS)', resume: 'Besoin, perimetre dedans dehors, WBS en 3 lots, jalons, definition de fini.', num: 1, id: 'm1-wbs' }}>
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : cadrer et decouper" items={items} /></Reveal>
  </ModuleLayout>
);

export default M1Page;
```

```tsx
// App.tsx Routes ajoute :
// <Route path="/module-1" element={<M1Page />} />
```

- [ ] **Step 6: verifier content et build**

Run: `npm run lint && npm run build && npm test` : OK.
Run dev : page /module-1 lisible, sommaire ancres fonctionne, quiz accorde +10 XP une fois, fiche reflexe imprime la seule section (print preview).

- [ ] **Step 7: commit**

```bash
git add src
git commit -m "feat: module 1 contenus rediges fil rouge quiz exercices fiche reflexe"
```

### Task 13: LaboWbs complet (SVG interactif, reducteur pur testé, XP) + integration

**Files:**
- Create: `src/labos/LaboWbs.tsx`, `src/components/LaboFrame.tsx`
- Test: `tests/labos/wbs.test.ts`
- Modify: `src/modules/m1-wbs/index.tsx` (labo entre demarche et exercices)

**Interfaces:**
- Consumes: `LaboFrame` (section Interfaces), `useProgress` dispatch labo.
- Produces: `LaboWbs` (props `{ valide: boolean; onValide: () => void }`), et le reducteur exporte :

```ts
export type Lot = 'contenu' | 'realisation' | 'mise-en-ligne' | 'hors';
export const LOT_ATTENDU: Record<string, Lot> = {
  inventaire: 'contenu', textes: 'contenu', photos: 'contenu',
  maquette: 'realisation', integration: 'realisation', tests: 'realisation',
  sauvegarde: 'mise-en-ligne', notice: 'mise-en-ligne',
  paiement: 'hors', application: 'hors',
};
export const CARDS_INITIALES: string[] = ['inventaire', 'textes', 'photos', 'maquette', 'integration', 'tests', 'sauvegarde', 'paiement', 'application'];
export const NOTICE_CACHEE = 'notice';
export type WbsState = { place: Record<string, Lot>; noticeTrouvee: boolean }
export type WbsAction = { type: 'assign'; carte: string; lot: Lot } | { type: 'devine-notice' } | { type: 'reset' }
export function reducerWBS(s: WbsState, a: WbsAction): WbsState
export function verifierWBS(s: WbsState): { ok: boolean; messages: string[] }
// ok = toutes les cartes de CARDS_INITIALES placees au bon lot, notice en mise-en-ligne si trouvee ou ajoutee, aucune carte hors perimetre placee dans un vrai lot.
```

**Etape du CDC 15.1 exposees dans l UI (LaboFrame props `etapes`) :**
1. "L ecran montre 8 cartes fictives et 3 lots vides" (9 cartes au total dont 2 hors perimetre aiser en peint de discriminer et test restent; 8 visibles au depart, la notice n'apparait qu apres l'indice).
2. "Glisser ou deplacer au clavier une carte vers un lot" (fleches puis entree).
3. "Les compteurs par lot se mettent a jour et signalent les lots vides".
4. "Bouton verifier : les hors perimetre attendus restent hors lots".
5. "Aide proposee si oubli (indice : il manque la notice)".
6. "Validation quand les 3 lots sont coherents, +5 XP".

**Steps:**

- [ ] **Step 1: ecrire tests/labos/wbs.test.ts (reducteur pur)**

```ts
import { describe, it, expect } from 'vitest';
import {
  reducerWBS, verifierWBS, LOT_ATTENDU, CARDS_INITIALES, NOTICE_CACHEE, WbsState, WbsAction,
} from '../../src/labos/LaboWbs';

const S0: WbsState = { place: {}, noticeTrouvee: false };

describe('reducerWBS', () => {
  it('assign place une carte dans un lot', () => {
    const s = reducerWBS(S0, { type: 'assign', carte: 'inventaire', lot: 'contenu' });
    expect(s.place.inventaire).toBe('contenu');
  });
  it('assign deplace une carte', () => {
    let s = reducerWBS(S0, { type: 'assign', carte: 'textes', lot: 'realisation' });
    s = reducerWBS(s, { type: 'assign', carte: 'textes', lot: 'contenu' });
    expect(s.place.textes).toBe('contenu');
  });
  it('devine notice ajoute la carte cachee et la place en mise-en-ligne', () => {
    const s = reducerWBS(S0, { type: 'devine-notice' });
    expect(s.noticeTrouvee).toBe(true);
    expect(s.place[NOTICE_CACHEE]).toBe('mise-en-ligne');
  });
  it('reset remet a vide', () => {
    let s = reducerWBS(S0, { type: 'assign', carte: 'photos', lot: 'contenu' });
    s = reducerWBS(s, { type: 'reset' });
    expect(s.place).toEqual({});
  });
});

describe('verifierWBS', () => {
  it('echoue au depart avec messages clairs', () => {
    const r = verifierWBS(S0);
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBeGreaterThan(3);
  });
  it('ok quand tout est au bon lot, notice incluse et hors exclus', () => {
    let s: WbsState = S0;
    for (const [carte, lot] of Object.entries(LOT_ATTENDU)) s = reducerWBS(s, { type: 'assign', carte, lot: cardient as Lot });
    expect(verifierWBS(s).ok).toBe(true);
  });
  it('echoue si une carte hors perimetre est placée dans un lot', () => {
    let s: WbsState = S0;
    for (const [c, l] of Object.entries(LOT_ATTENDU)) s = reducerWBS(s, { type: 'assign', carte: c, lot: l });
    s = reducerWBS(s, { type: 'assign', carte: 'paiement', lot: 'realisation' });
    const r = verifierWBS(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/paiement/);
  });
  it('indice notice : verifier sans notice signale l oubli', () => {
    let s: WbsState = S0;
    for (const [c, l] of Object.entries(LOT_ATTENDU)) if (c !== 'notice' && c !== 'paiement' && c !== 'application') s = reducerWBS(s, { type: 'assign', carte: c, lot: l });
    const r = verifierWBS(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/notice/i);
  });
});
```

> Le 2e test boucle `Object.entries(LOT_ATTENDU)` : corriger la typo `as Lot` ; ecrire `lot: l as Lot`.

- [ ] **Step 2: lancer (echec)**

Run: `npm test -- tests/labos/wbs.test.ts` : FAIL.

- [ ] **Step 3: ecrire src/components/LaboFrame.tsx (socle comun, sert a aux 10)**

```tsx
import React from 'react';

export function LaboFrame(props: {
  titre: string; consigne: string; etapes: string[];
  etape: number;              // etape courante (1..len), pour surbrillance
  etat: string;               // message aria-live
  onVerifier: () => void; onReinitialiser: () => void;
  valide: boolean; children: React.ReactNode;
}) {
  return (
    <div className="labo card" aria-labelledby={`labo-${props.titre}`}>
      <div className="labo-head">
        <h3 id={`labo-${o.titre}`}>{props.titre}</h3>
        <p className="consigne">{props.consigne}</p>
      </div>
      <ol className="etapes">
        {props.etapes.map((e, i) => (
          <li key={i} aria-current={i + 1 === props.etape ? 'step' : undefined} className={i + 1 === props.etape ? 'courante' : ''}>{e}</li>
        ))}
      </ol>
      <div className="labo-body">{props.children}</div>
      <div className="labo-actions">
        <button type="button" className="btn" onClick={props.onVerifier}>{props.valide ? 'Reverifier' : 'Verifier'}</button>
        <button type="button" className="btn secondary" onClick={props.onReinitialiser}>Reinitialiser</button>
        <p className="sr-only" role="status" aria-live="polite">{props.etat}</p>
        {props.valide && <p className="ok" role="status">Labo valide : +5 XP (un seul gain).</p>}
      </div>
    </div>
  );
}
```

styles additions (index.css) :

```css
.labo { padding: 1.2rem; margin: 1rem 0; }
.labo .consigne { color: var(--c-muted); }
.labo .etapes { font-size: 0.9rem; color: var(--c-muted); padding-left: 1.2rem; }
.labo .etapes .courante { color: var(--c-ink); font-weight: 600; }
.labo-actions { display: flex; gap: 0.6rem; align-items: center; margin-top: 0.8rem; }
.ok { color: var(--c-ok); } .err { color: var(--c-error); }
.wbs-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 0.8rem; align-items: start; }
.wbs-cards { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.wbs-card { border: 1px solid var(--c-line); background: var(--c-soft); border-radius: 8px; padding: 0.35rem 0.6rem; cursor: grab; }
.wbs-card.tiree { outline: 2px solid var(--c-main); }
.wbs-lots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
.wbs-lot { border: 1px dashed var(--c-line); border-radius: var(--radius); padding: 0.5rem; min-height: 6rem; }
.wbs-lot.cible { border-color: var(--c-main); }
.wbs-lot ul { list-style: none; margin: 0.3rem 0 0; padding: 0.2rem; min-height: 4rem; }
.wbs-lot li { padding: 0.2rem 0.4rem; border-radius: 6px; }
.wbs-lot li[draggable="true"] { cursor: grab; }
.hors-zone { margin-top: 0.5rem; border: 1px solid var(--c-line); border-radius: var(--radius); padding: 0.5rem; }
```

- [ ] **Step 4: implementer src/labos/LaboWbs.tsx**

```tsx
import React, { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

// ---- logique pure (exportee pour tests) ----
export type Lot = 'contenu' | 'realisation' | 'mise-en-ligne' | 'hors';
export const LOT_ATTENDU: Record<string, Lot> = {
  inventaire: 'contenu', textes: 'contenu', photos: 'contenu',
  maquette: 'realisation', integration: 'realisation', tests: 'realisation',
  sauvegarde: 'mise-en-ligne', notice: 'mise-en-ligne',
  paiement: 'hors', application: 'hors',
};
export const CARDS_INITIALES = ['inventaire', 'textes', 'photos', 'maquette', 'integration', 'tests', 'sauvegarde', 'paiement', 'application'];
export const NOTICE_CACHEE = 'notice';
export const LIBELLE: Record<string, string> = {
  inventaire: 'Inventaire des pages', textes: 'Reecrire les textes', photos: 'Choisir les photos locales',
  maquette: 'Realiser la maquette', integration: 'Integrer les pages', tests: 'Tester sur mobile',
  sauvegarde: 'Sauvegarde du site', notice: 'Notice pour les benevoles', paiement: 'Paiement des cotisations en ligne', application: 'Application mobile dediee',
};
export interface WbsState { place: Record<string, Lot>; noticeTrouvee: boolean }
export type WbsAction = { type: 'assign'; carte: string; lot: Lot } | { type: 'devine-notice' } | { type: 'reset' };

export function reducerWBS(s: WbsState, a: WbsAction): WbsState {
  switch (a.type) {
    case 'assign': return { ...s, place: { ...s.place, [a.carte]: a.lot } };
    case 'devine-notice': return { ...s, noticeTrouvee: true, place: { ...s.place, [NOTICE_CACHEE]: 'mise-en-ligne' } };
    case 'reset': return { place: {}, noticeTrouvee: false };
  }
}

export function verifierWBS(s: WbsState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const carte of [...CARDS_INITIALES, ...(s.noticeTrouvee ? [NOTICE_CACHEE] : [])]) {
    const attendu = LOT_ATTENDU[carte];
    const place = s.place[carte];
    if (attendu === 'hors') {
      if (place && place !== 'hors') messages.push(`« ${LIBELLE[carte]} » doit rester hors perimetre, pas dans un lot.`);
    } else if (place !== attendu) {
      messages.push(place === undefined
        ? (carte === NOTICE_CACHEE ? 'Oubli possible : il manque la notice pour les benevoles (lot Mise en ligne).'
            : `« ${LIBELLE[carte]} » n est pas encore placee (lot attendu : ${lotLisible(attendu)}).`)
        : `« ${LIBELLE[carte]} » attendue dans ${lotLisible(attendu)}, placee dans ${lotLisible(place)}.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

export function lotLisible(l: Lot): string {
  return l === 'contenu' ? 'Contenu' : l === 'realisation' ? 'Realisation' : l === 'mise-en-ligne' ? 'Mise en ligne' : 'Hors perimetre';
}
```

> Correction de ligne dans le bloc ci-dessus : la boucle for du 3e test doit utiliser `lot: l as Lot` (voir ligne du test).

Suite du composant (interaction et SVG) :

```tsx
const COMPTE_ATTENDU: Record<Exclude<Lot, 'hors'>, number> = { contenu: 3, realisation: 3, 'mise-en-ligne': 2 };

type Props = { valide: boolean; onValide: () => void };
export default function LaboWbs(props: Props) {
  const p = useProgress();
  const [state, dispatch] = useReducer(reducerWBS, undefined, () => ({ place: {}, noticeTrouvee: false }));
  const [tiree, setTiree] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [etape, setEtape] = useState(1);
  const copys = [...CARDS_INITIALES, ...(state.noticeTrouvee ? [NOTICE_CACHEE] : [])];

  const verifier = () => {
    const r = verifierWBS(state);
    setMessages(r.messages);
    if (r.messages.length > 2) dispatch({ type: 'devine-notice' });
    if (r.ok) {
      setEtape(6);
      if (!p.laboDone.includes('m1-wbs-labo')) props.onValide();
    } else setEtape(4);
  };

  const etapes = [
    '8 cartes fictives et 3 lots vides sont affiches.',
    'Glisse ou positionne au clavier une carte vers un lot.',
    'Les compteurs par lot se mettent a jour.',
    'Verifier : les hors perimetre restent hors lots.',
    'Aide proposee si un oubli subsiste.',
    'Validation quand les 3 lots sont coherents.',
  ];

  return (
    <LaboFrame
      titre="Labo : decoupage WBS interactif"
      consigne="Place essais 7 taches dedans dans les 3 lots, laisse les 2 hors perimetre dehors, puis verifie."
      etapes={etapes}
      etape={etape}
      etat={messages[messages.length - 1] ?? (tiree ? `Carte ${LIBELLE[tiree]} selectionnee.` : '')}
      onVerifier={verifier}
      onReinitialiser={() => { dispatch({ type: 'reset' }); setMessages([]); setEtape(1); }}
      valide={props.valide || messages.length === 0 && verifierWBS(state).ok}
    >
      <div className="wbs-grid">
        <div>
          <h4>Cartes a placer</h4>
          <div className="wbs-cards" role="listbox" aria-label="Cartes du WBS">
            {copys.map((c) => (
              <button key={c} type="button" role="option" aria-selected={tiree === c}
                className={`wbs-card${tiree === c ? ' tiree' : ''}`}
                onClick={() => setTiree(tiree === c ? null : c)}>
                {LIBELLE[c]}{state.place[c] ? ` (${lotLisible(state.place[c] as Lot)})` : ''}
              </button>
            ))}
          </div>
          {tiree && <div className="hors-zone">
            <button type="button" className="btn secondary" onClick={() => { dispatch({ type: 'assign', carte: tiree, lot: 'hors' }); setTiree(null); }}>
              Deposer « {LIBELLE[tiree]} » hors perimetre
            </button>
          </div>}
        </div>
        <div className="wbs-lots">
          {(['contenu', 'realisation', 'mise-en-ligne'] as const).map((lot) => (
            <div key={lot} className="wbs-lot">
              <h4>{lotLisible(lot)}</h4>
              <p className="compteur">{Object.values(state.place).filter((l) => l === lot).length} carte(s)</p>
              <ul>
                {copys.filter((c) => state.place[c] === lot).map((c) => (
                  <li key={c}><button type="button" className="wbs-card" onClick={() => setTiree(c)}>{LIBELLE[c]}</button></li>
                ))}
              </ul>
              {tiree && <button type="button" className="btn" onClick={() => { dispatch({ type: 'assign', carte: tiree, lot }); setTiree(null); }}>Deposer ici</button>}
            </div>
          ))}
        </div>
      </div>
      {messages.length > 0 && (
        <ul className="messages">{messages.map((m, i) => <li key={i} className="err">{m}</li>)}</ul>
      )}
    </LaboFrame>
  );
}
```

SVG et hybridation : ce labo represente l arbre WBS par la grille HTML interactive ci-dessus (boutons accessibles) ; le dessin SVG du fil rouge n est pas obligatoire ici, mais chaque lot affiche un petit motif SVG (tronc et branches) coherent avec la charte (decor sous les compteurs).

- [ ] **Step 5: brancher le labo dans module 1**

```tsx
// dans m1-wbs/index.tsx ajouter entre Demarche et Exercices :
<Reveal><div id="labo"><LaboWbs valide={p.laboDone.includes('m1-wbs-labo')} onValide={() => p.dispatch({ type: 'labo', id: 'm1-wbs-labo' })} /></div></Reveal>
```

- [ ] **Step 6: verifier tests + build + clavier**

Run: `npm test -- tests/labos/wbs.test.ts` : PASS (9 tests).
Run: `npm run lint && npm run build` : OK.
Run dev : verifier au clavier : Tab jusqu a une carte, Entree pour tirer, Tab jusqu au bouton "Deposer ici", Entree ; l aria-live annonce le message.

- [ ] **Step 7: commit**

```bash
git add src tests
git commit -m "feat: labo wbs interactif clavier svg et xp de premiere validation"
```

### Task 14: gate fin de Jalon 1

**Files:**
- Modify: aucun (gate)

**Steps:**

- [ ] **Step 1: tout au vert**

Run: `npm run lint && npm test && npm run build`
Expected: 0 erreur.

- [ ] **Step 2: smoke Playwright au clic et au rechargement**

Completer smoke.spec.ts avec la navigation au clic depuis l accueil (cartes module 1 et lien a-propos), puis reload direct de chaque route (module-1..6 et a-propos, disponibles au fur et a mesure des jalons), assert `#contenu` visible et title present.

Run: `npm run smoke` : PASS.

- [ ] **Step 3: Lighthouse accueil mobile**

Run: `npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility --form-factor=mobile --channel=mobile --quiet --chrome-flags="--headless"`
Expected: score performence et accessibilite >= 90 chacun.

- [ ] **Step 4: commit gate**

```bash
git add smoke
git commit -m "test: smoke navigation clic et rechargement avec gate jalon 1"
```

---

# Jalon 2 : module 2 (PERT et GANTT) + labo

> Structure de chaque module suivant : identique au module 1 (fiche, fil rouge, demarche, exercices CDC, quiz CDC verbatim, fiche reflexe). Le contenu des quiz et exercices est transcrit exactement depuis la section CDC indiquee. Le site publie un francais correct avec accents (les fichiers CDC sont sans accents pour trancher des fichiers).

### Task 15: module 2 contenus (CDC 15.2)

**Files:**
- Create: `src/modules/m2-planif/{fiche.tsx,filRouge.tsx,demarche.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts,index.tsx}`
- Modify: `src/App.tsx` (route `/module-2`)

**Interfaces:**
- Produces: `M2Page` (composee comme M1Page, + Labo en Task 16) ; quiz id `m2-quiz`.

**Steps:**

- [ ] **Step 1: ecrire quiz.ts (CDC 15.2 verbatim)**

```ts
import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm2-quiz',
  questions: [
    { question: 'A quoi sert un PERT ?', choix: ['Ordonner taches et dependances et lire la chaine tendue', 'Lister les outils', 'Animer une reunion'], bonne: 0, motif: 'Le PERT montre l ordre et ce qui commande la date cible fictive.' },
    { question: 'A quoi sert un GANTT ?', choix: ['Voir qui fait quoi et quand et suivre l avancement', 'Ecrire le code', 'Chiffrer sans hypothese'], bonne: 0, motif: 'Barres, jalons et avancement partages, sans lien direct avec le code.' },
    { question: 'Que faire si une tache de la chaine tendue glisse ?', choix: ['Ne rien changer', 'Ajouter des taches', 'Replanifier et proteger la chaine'], bonne: 2, motif: 'La chaine tendue commande la fin, il faut agir dessus en priorite.' },
  ],
};
```

- [ ] **Step 2: ecrire ficheReflexe.ts**

```ts
export const items = [
  'Relie chaque tache a sa tache predecesseur.',
  'Repere la chaine tendue avant de discuter des delais.',
  'Protege la chaine tendue : reordre, aide, jalon revu.',
  'Deplace une barre a la fois, puis relis les dependances.',
  'Pose un jalon visible pour chaque livraison utile.',
];
```

- [ ] **Step 3: fiche, filRouge, demarche (textes CDC 11.2 et 15.2)**

```tsx
// fiche.tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : planifier avec PERT et GANTT</h2>
    <p><strong>Definition.</strong> PERT : represente les taches et leurs dependances pour lire l ordre et la chaine tendue. GANTT : barres posees dans le temps pour voir qui fait quoi, quand, et suivre l avancement.</p>
    <p><strong>PERT, a quoi ca sert.</strong> Ordonner taches et dependances, lire la chaine tendue. <strong>Quand l utiliser.</strong> Projet avec dependances, besoin d une date cible.</p>
    <p><strong>GANTT, a quoi ca sert.</strong> Voir qui fait quoi et quand, suivre l avancement. <strong>Quand l utiliser.</strong> suivi partage, jalons.</p>
    <p><strong>Avantages.</strong> PERT explique pourquoi la date finit ou elle finit ; GANTT rend le planning lisible et partageable.</p>
    <p><strong>Limites.</strong> Les deux demandent un entretien constant ; un planning n est pas une promesse, c est une hypothese a revoir.</p>
  </section>
);
```

```tsx
// filRouge.tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecus du fil rouge</h2>
    <h3>Exemple 1 : la chaine tendue</h3>
    <p>Contenu relu, puis maquette, puis integration, puis tests, puis mise en ligne. Si la relecture glisse, tout glisse : la chaine tendue est visible du premier coup.</p>
    <h3>Exemple 2 : le GANTT partage</h3>
    <p>5 barres avec responsables fictifs (benevole Contenu, benevole Technique, relecteur fictif), un jalon maquette validee, un jalon site publie. La barre tests ne commence qu apres la fin de l integration fictive.</p>
  </section>
);
```

```tsx
// demarche.tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Recuperer les lots du WBS et les transformer en taches.</li>
      <li>Relier chaque tache a sa predecesseur (vue PERT).</li>
      <li>Repérer la chaine tendue qui commande la fin.</li>
      <li>Poser les barres GANTT et les 2 jalons.</li>
      <li>Apres tout deplacement, relire les dependances et replanifier si besoin.</li>
    </ol>
  </section>
);
```

- [ ] **Step 4: ecrire exercise.tsx (CDC 15.2, 2 exercices avec corriges masques qui passent)**

```tsx
import React from 'react';
import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock id="m2-ex1" titre="Exercice 1 : lire la chaine tendue"
      enonce={<p>Avec 5 taches fictives et leurs dependances donnees (durees fictives fixes pour l exercice), cite la chaine tendue, 2 risques de delai et 1 action.</p>}
      corrige={<div>
        <p><strong>Chaine tendue:</strong> relecture, maquette, integration, tests (suite sans marge fictive).</p>
        <p><strong>2 risques:</strong> relecture tardive ; tests repousses par manque de benevole fictif.</p>
        <p><strong>1 action:</strong> figer la relecture a une date fictive et preparer un benevole de rechange fictif.</p>
      </div>}
      methode={['Suivre les fleches', 'Repere la suite sans marge', 'Imagine 2 retards probables', 'Choisis 1 action qui protege la chaine']} />
    <ExerciseBlock id="m2-ex2" titre="Exercice 2 : lever un conflit dans un GANTT"
      enonce={<p>Lis le GANTT fictif (5 barres, 1 chevauchement interdit entre integration et tests). Propose 1 deplacement qui leve le conflit sans toucher aux jalons fictifs.</p>}
      corrige={<div>
        <p><strong>Deplacement :</strong> decaler les tests apres la fin de l integration fictive, garder les jalons, noter le nouveau flottement de la tache deplacee.</p>
      </div>}
      methode={['Repere le chevauchement', 'Bouge une barre a la fois', 'Relis les dependances', 'Note le nouveau flottement']} />
  </div>
);
export default Exercices;
```

- [ ] **Step 5: ecrire index.tsx et route (meme gabarit que M1, sans labo pour l instant)**

Comme pour `m1-wbs/index.tsx`, avec `meta={{ id: 'm2-planif', num: 2, slug: 'module-2', titre: 'Planifier : PERT et GANTT', resume: 'Ordonner les taches, dependances, chaine tendue, barres et jalons sous les yeux.' }}` et `<Route path="/module-2" element={<M2Page />} />`.

- [ ] **Step 6: verifier build puis commit**

Run: `npm run lint && npm run build` : OK.

```bash
git add src && git commit -m "feat: module 2 contenus CDC 15.2 fiche quiz exercices reflexe"
```

### Task 16: LaboGanttPert complet + integration

**Files:**
- Create: `src/labos/LaboGanttPert.tsx`
- Test: `tests/labos/gantt.test.ts`
- Modify: `src/modules/m2-planif/index.tsx` (labo entre demarche et exercices)

**Interfaces:**

```ts
export const TACHES = ['Contenu relu', 'Maquette', 'Integration', 'Tests', 'Mise en ligne'];
export const DEPENDANCES = [['Contenu relu', 'Maquette'], ['Maquette', 'Integration'], ['Integration', 'Tests'], ['Tests', 'Mise en ligne']]; // [predecesseur, tache]
export const BARRES_INIT: Record<string, { debut: number; fin: number }> = {
  'Contenu relu': { debut: 1, fin: 2 }, 'Maquette': { debut: 3, fin: 4 },
  'Integration': { debut: 5, fin: 6 }, 'Tests': { debut: 5, fin: 6 }, // chevauchement initial voulu
  'Mise en ligne': { debut: 9, fin: 9 },
};
export type GanttState = { barres: Record<string, { debut: number; fin: number }>; vue: 'gantt' | 'pert'; liaisons: Array<[string, string]>; selection?: string };
export type GanttAction =
  | { type: 'deplace'; tache: string; delta: number }   // -1 ou +1 jour, borne 1..10
  | { type: 'liaison'; de: string; vers: string }
  | { type: 'retire-liaison'; de: string; vers: string }
  | { type: 'vue'; v: 'gantt' | 'pert' }
  | { type: 'reset' };
// borne deplacement: si le delta ferait passer debut sous 1 ou fin au dela de 10, l etat est inchange.
export function verifierGantt(barres: Record<string, { debut: number; fin: number }>): { ok: boolean; messages: string[] }  // pour chaque dependance [a, b] : debut(b) > fin(a).
export function verifierPERT(liaisons: Array<[string, string]>): { ok: boolean; chaineTendue?: string[]; messages: string[] }  // ok si les 4 liaisons attendues sont posees.
```

**Etapes CDC 15.2 reservees en LaboFrame etapes :** 1 GANTT affiche ; 2 deplacer une barre (fleches) ; 3 dependances non respectees affichées comme alerte + texte explicatif ; 4 replacer la barre requise apres la precedente ; 5 basculer en vue PERT et relier les noeuds ; 6 chaine tendue surlignee et bouton valider (+5 XP).

**Steps:**

- [ ] **Step 1: ecrire tests/labos/gantt.test.ts (reducteur pur, echec d'abord)**

```ts
import { describe, it, expect } from 'vitest';
import { reduireGantt, initialState, verifierGantt, verifierPERT, BARRES_INIT } from '../../src/labos/LaboGanttPert';

describe('reduireGantt', () => {
  it('deplace une barre +1 et borne a 10', () => {
    let s = initialState('gantt');
    s = reduireGantt(s, { type: 'deplace', tache: 'Contenu relu', delta: 1 });
    expect(s.barres['Contenu relu']).toEqual({ debut: 2, fin: 3 });
    for (let i = 0; i < 20; i++) s = reduireGantt(s, { type: 'deplace', tache: 'Contenu relu', delta: 1 });
    expect(s.barres['Contenu relu'].fin).toBeLessThanOrEqual(10);
  });
  it('deplace la barre Tests pour lever le chevauchement initial', () => {
    let s = initialState('gantt');
    s = reduireGantt(s, { type: 'deplace', tache: 'Tests', delta: 2 });
    expect(s.barres['Tests'].debut).toBe(7);
    expect(verifierGantt(s).ok).toBe(true);
  });
  it("liaison PERT enregistre puis retire", () => {
    let s = initialState('pert');
    s = reduireGantt(s, { type: 'liaison', de: 'Contenu relu', vers: 'Maquette' });
    expect(s.liaisons).toContainEqual(['Contenu relu', 'Maquette']);
    s = reduireGantt(s, { type: 'retire-liaison', de: 'Contenu relu', vers: 'Maquette' });
    expect(s.liaisons).toEqual([]);
  });
});

describe('verifierPERT', () => {
  it('pas de liaisons : pas ok', () => {
    const r = verifierPERT([]);
    expect(r.ok).toBe(false);
  });
  it('liaisons stockats dans l ordre : ok avec chaine tendue surlignee', () => {
    const r = verifierPERT([['Contenu relu', 'Maquette'], ['Maquette', 'Integration'], ['Integration', 'Tests'], ['Tests', 'Mise en ligne']]);
    expect(r.ok).toBe(true);
    expect(r.chaineTendue).toEqual(['Contenu relu', 'Maquette', 'Integration', 'Tests']);
  });
});

describe('BARRES_INIT', () => {
  it('presentation initiale contient le chevauchement Integration/Tests', () => {
    expect(BARRES_INIT['Tests'].debut).toBe(BARRES_INIT['Integration'].debut);
    expect(verifierGantt(BARRES_INIT).ok).toBe(false);
  });
});
```

Convention de nommage dans les deux blocs : `debut` et `fin` sans accent, cest le nommage final du code et des tests.

- [ ] **Step 2: implementer src/labos/LaboGanttPert.tsx**

Forme peers :

```tsx
import React, { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const TACHES = ['Contenu relu', 'Maquette', 'Integration', 'Tests', 'Mise en ligne'];
export const DEPENDANCES: Array<[string, string]> = [
  ['Contenu relu', 'Maquette'], ['Maquette', 'Integration'], ['Integration', 'Tests'], ['Tests', 'Mise en ligne'],
];
export const BARRES_INIT: Record<string, { debut: number; fin: number }> = {
  'Contenu relu': { debut: 1, fin: 2 }, Maquette: { debut: 3, fin: 4 }, Integration: { debut: 5, fin: 6 }, Tests: { debut: 5, fin: 6 }, 'Mise en ligne': { debut: 9, fin: 9 },
};
export type Vue = 'gantt' | 'pert';
export interface GanttState { barres: Record<string, { debut: number; fin: number }>; vue: Vue; liaisons: Array<[string, string]>; selection?: string }
export type GanttAction =
  | { type: 'deplace'; tache: string; delta: number }
  | { type: 'liaison'; de: string; vers: string }
  | { type: 'retire-liaison'; de: string; vers: string }
  | { type: 'vue'; v: Vue }
  | { type: 'reset' };

export function initialState(vue: Vue = 'gantt'): GanttState { return { barres: structuredClone(BARRES_INIT), vue, liaisons: [] }; }

export function reduireGantt(s: GanttState, a: GanttAction): GanttState {
  switch (a.type) {
    case 'deplace': {
      const b = { ...s.barres[a.tache] };
      const dn = b.debut + a.delta, fn = b.fin + a.delta;
      if (dn < 1 || fn > 10) return s;
      return { ...s, barres: { ...s.barres, [a.tache]: { debut: dn, fin: fn } } };
    }
    case 'liaison':
      if (a.de === a.vers) return s;
      if (s.liaisons.some(([x, y]) => x === a.de && y === a.vers)) return s;
      return { ...s, liaisons: [...s.liaisons, [a.de, a.vers]] };
    case 'retire-liaison':
      return { ...s, liaisons: s.liaisons.filter(([x, y]) => !(x === a.de && y === a.vers)) };
    case 'vue': return { ...s, vue: a.v };
    case 'reset': return initialState(s.vue);
  }
}

export function verifierGantt(barres: Record<string, { debut: number; fin: number }>): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const [avant, apres] of DEPENDANCES) {
    if (barres[apres].debut <= barres[avant].fin) {
      messages.push(`« ${apres} » ne doit pas commencer avant la fin de « ${avant} ».`);
    }
  }
  return { ok: messages.length === 0, messages };
}

const LIAISONS_ATTENDUES: Array<[string, string]> = DEPENDANCES;
const CHAINE_TENDUE = ['Contenu relu', 'Maquette', 'Integration', 'Tests'];

export function verifierPERT(liaisons: Array<[string, string]>): { ok: boolean; chaineTendue?: string[]; messages: string[] } {
  const manquantes = LIAISONS_ATTENDUES.filter(([a, b]) => !liaisons.some(([x, y]) => x === a && y === b));
  if (manquantes.length) return { ok: false, messages: manquantes.map(([a, b]) => `Liaison manquante : « ${a} » vers « ${b} ».`) };
  return { ok: true, chaineTendue: CHAINE_TENDUE, messages: [] };
}
```

Composant (vue GANTT : chaque barre est une rangée HTML avec des boutons deplacer gauche et droite accessibles au clavier ; les dependances sont tracees en SVG entre les ranges ; vue PERT : licences posees par clic source puis clic cible, chaine tendue surlignee quand verifierPERT ok) :

```tsx
type Props = { valide: boolean; onValide: () => void };
export default function LaboGanttPert(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduireGantt, undefined, () => initialState('gantt'));
  const [message, setMessage] = useState('');

  const verifier = () => {
    if (s.vue === 'gantt') {
      const r = verifierGantt(s.barres);
      setMessage(r.ok ? 'Le planning regavit les dependances.' : r.messages.join(' '));
      if (r.ok && !p.laboDone.includes('m2-gantt')) props.onValide();
    } else {
      const r = verifierPERT(s.liaisons);
      setMessage(r.ok ? 'La chaine tendue est surlignee.' : r.messages.join(' '));
      if (r.ok && !p.laboDone.includes('m2-gantt')) props.onValide();
    }
  };

  const etapes = ['GANTT a 5 barres affiche', 'Deplacement d une barre', 'Dependance violee expliquee', 'Barre replacée apres la precedente', 'Vue PERT : relier les noeuds', 'Chaine tendue surlignee, Valider'];

  return (
    <LaboFrame titre="Labo : mini GANTT et chaîne PERT" consigne="Ordonne les barres puis relie la chaine PERT." etapes={etapes} etape={s.vue === 'gantt' ? (verifierGantt(s.barres).ok ? 4 : 2) : 5}
      etat={message} onVerifier={verifier} onReinitialiser={() => { dispatch({ type: 'reset' }); setMessage(''); }} valide={props.valide || (s.vue === 'gantt' ? verifierGantt(s.barres).ok : verifierPERT(s.liaisons).ok)}>
      {s.vue === 'gantt' ? (
        <div className="gantt">
          {TACHES.map((t) => (
            <div className="gantt-row" key={t}>
              <span>{t}</span>
              <div className="gantt-grid">
                <button type="button" className="btn mini" aria-label={`Deplacer ${t} a gauche`} onClick={() => dispatch({ type: 'deplace', tache: t, delta: -1 })}>{'<-'}</button>
                <div style={{ gridTemplateColumns: `repeat(10, 1fr)` }} className="gantt-track">
                  <div className="gantt-bar" style={{
                    gridColumnStart: s.barres[t].debut, gridColumnEnd: s.barres[t].fin + 1,
                    background: t === 'Tests' ? 'var(--c-soft)' : 'var(--c-main)',
                  }} />
                </div>
                <button type="button" className="btn mini" aria-label={`Deplacer ${t} a droite`} onClick={() => dispatch({ type: 'deplace', tache: t, delta: 1 })}>{'->'}</button>
              </div>
            </div>
          ))}
          <p className="help">Une barre deplacee repond aux dependances via les fleches gauche et droite (accessibilit clavier).</p>
        </div>
      ) : (
        <div className="pert">
          <ul>{TACHES.map((t) => <li key={t}><strong>{t}</strong></li>)}</ul>
          <p className="help">Reliez les taches dans l ordre ; les liaisons existantes s annulent par le bouton retire.</p>
          {TACHES.slice(0, -1).map((t) => (
            <button key={t} type="button" className="btn mini" onClick={() => dispatch({ type: 'liaison', de: t, vers: TACHES[TACHES.indexOf(t) + 1] })}>
              Relier {t} vers {TACHES[TACHES.indexOf(t) + 1]}
            </button>
          ))}
          {s.liaisons.length > 0 && (
            <button type="button" className="btn secondary mini" onClick={() => { const [x, y] = s.liaisons[s.liaisons.length - 1]; if (x && y) dispatch({ type: 'retire-liaison', de: x, vers: y }); }}>Retirer la derniere liaison</button>
          )}
        </div>
      )}
      <div>
        <button type="button" className="btn secondary" onClick={() => dispatch({ type: 'vue', v: s.vue === 'gantt' ? 'pert' : 'gantt' })}>
          Passer a la vue {s.vue === 'gantt' ? 'PERT' : 'GANTT'}
        </button>
      </div>
      {message && <p role="alert">{message}</p>}
    </LaboFrame>
  );
}
```

Note de nommage : les noms finaux exportes sont `verifierGantt` et `verifierPERT`, employent pour le code et les tests. Si un `verifer` reste dans le fichier source, le corriger avant le commit.

- [ ] **Step 3: styles gantt/pert (index.css additions)**

```css
.gantt-row { display: grid; grid-template-columns: 10rem 1fr; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem; }
.gantt-grid { display: grid; grid-template-columns: auto 1fr auto; gap: 0.4rem; align-items: center; }
.gantt-track { display: grid; height: 1.2rem; background: var(--c-bg); border: 1px solid var(--c-line); border-radius: 6px; overflow: hidden; }
.gantt-bar { height: 100%; border-radius: 6px; transition: all 0.2s ease; }
.pert ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.pert li { border: 1px solid var(--c-line); border-radius: 8px; padding: 0.3rem 0.6rem; }
```

- [ ] **Step 4: integration dans m2 index + parenthesage du labo dans le module page**

Comme en Task 13 pour le module 1 (wrapper `<div id="labo">`), avec `id 'm2-gantt'`.

- [ ] **Step 5: tests et build**

Run: `npm test -- tests/labos/gantt.test.ts` : PASS (6 tests).
Run: `npm run lint && npm run build` : OK.

- [ ] **Step 6: commit**

```bash
git add src tests && git commit -m "feat: labo gantt pert barres dependances chaine tendue y compris"
```

### Task 17: gate fin de Jalon 2

- [ ] **Step 1:** `npm run lint && npm test && npm run build` : OK.
- [ ] **Step 2:** `npm run smoke` : PASS.
- [ ] **Step 3:** Lighthouse accueil mobile >= 90 perf et a11y (commande Task 14).
- [ ] **Step 4:** commit `test: gate jalon 2`.

---

# Jalon 3 : module 3 (methodes) + fix CDC ligne 324 + labs methode

### Task 18: reparer la ligne 324 du CDC (contenu module 3)

**Files:**
- Modify: `cahier_des_charges.md` (ligne 324)

**Steps:**

- [ ] **Step 1: remplacer la phrase corrompue**

Remplacer (dans le corrige exercice 1 du module 3, cas 2) :

avant : `limite : f/Users/Geoffroy/Documents arenaiger d abord par maquette ou lot court.`
apres : `limite : ni l une ni l autre seules sur ce besoin flou, cadrer d abord par maquette ou par lot court.`

> La chaine exacte a retirer contient la fraction `f/Users/...` ; le remplacement ci dessus est la phrase cible finale.

- [ ] **Step 2: verifier que la phrase est lisible et coherent avec le module 3**

Run: `grep -n "arenaiger" cahier_des_charges.md` : aucun resultat.

- [ ] **Step 3: commit**

```bash
git add cahier_des_charges.md && git commit -m "docs: reecriture du corrige module 3 cas 2 ligne 324 corrompue"
```

### Task 19: module 3 contenus (CDC 15.3 et 16)

**Files:**
- Create: `src/modules/m3-methodes/{fiche.tsx,filRouge.tsx,demarche.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts,index.tsx}`
- Modify: `src/App.tsx` (route `/module-3`)

**Steps:**

- [ ] **Step 1: quiz.ts (CDC 15.3 verbatim)**

```ts
export const quiz: QuizData = {
  id: 'm3-quiz',
  questions: [
    { question: 'Quelle est la spécificité du cycle en V ?', choix: ['Tests préparés en face de chaque conception', 'Aucune documentation', 'Livraison sans tests'], bonne: 0, motif: 'La forme en V relie chaque niveau de conception à son niveau de test.' },
    { question: 'Quelle est la spécificité de Waterfall (cascade) ?', choix: ['Phases en suite avec validation par phase', 'Phases toutes en parallèle sans ordre', 'Absence de jalons'], bonne: 0, motif: 'On valide une phase fictive avant de passer à la suivante.' },
    { question: 'Quel est le bon usage de la cascade ?', choix: ['Besoin stable et jalons clairs', 'Besoin flou qui change chaque semaine', 'Aucune contrainte de qualité'], bonne: 0, motif: 'La cascade supporte mal les allers-retours tardifs, elle convient quand le besoin bouge peu.' },
  ],
};
```

- [ ] **Step 2: ficheReflexe.ts**

```ts
export const items = [
  'Décris le besoin : stable ou flou, avant de choisir.',
  'Choisis V si les traces et tests sont attendus.',
  'Choisis la cascade si le besoin est stable et petit.',
  'Valeurs courantes : un lot court avant de figer une phase.',
  'Prevois une parade si le besoin bouge.',
];
```

- [ ] **Step 3: fiche, filRouge, demarche (CDC 15.3/16)**

```tsx
// fiche.tsx (cycle en V + Waterfall/cascade + comparaison sans valeurs)
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : cycle en V, cascade (Waterfall), choisir sa methode</h2>
    <p><strong>Definition cascade (Waterfall).</strong> Phases en suite : besoin, conception, realisation, test, deploiement. Document de fin de phase relu avant la suivante, avancement par jalons.</p>
    <p><strong>Definition cycle en V.</strong> Memes phases avec tests prepares en face de chaque niveau de conception (tests unitaires face au code, tests d integration face a la conception detaillee, tests systeme face a la conception globale, acceptation face au besoin).</p>
    <p><strong>A quoi ca sert.</strong> Cadre l avancement avec jalons verifiables ; le V veut garantir que chaque conception a ses tests prepares a l avance.</p>
    <p><strong>Quand l'utiliser.</strong> Cascade : besoin stable, petit perimetre, jalons simples. Cycle en V : niveau de risque ou de tracabilite plus raisonnable.</p>
    <p><strong>Avantages et limites.</strong> Lisibilite et jalons clairs d un cote ; retours tardifs couteux et besoin flou mal porte de l autre. Aucune ecole superieure a l autre : le comparateur ci dessous montre les trois familles cote a cote.</p>
  </section>
);
```

```tsx
// filRouge.tsx (CDC 15.3)
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecus du fil rouge</h2>
    <h3>Exemple 1 : el virement en cascade.</h3>
    <p>Site des Amis du Square en cascade fictive : besoin fige (3 gabarits fictifs), conception, realisation, tests par vague, deploiement. Chaque fin de phase fictive donne un document relu avant la suivante.</p>
    <h3>Exemple 2 : le site en cycle en V</h3>
    <p>En face de chaque conception, un test prepare a l avance : acceptation face au besoin fictif, systeme face a la conception globale, integration face au detail, unitaire face au code. La recette fictive verifiera chaque niveau.</p>
  </section>
);
```

```tsx
// demarche.tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Décrire le besoin : stable, figé ou flou ?</li>
      <li>Lister contraintes (qualité, traces, deadline, équipe disponible).</li>
      <li>Si le besoin est flou, avancer par maquette ou lot court avant de figer une phase.</li>
      <li>La méthode est choisie et écrite avec son motif et ses limites.</li>
      <li>Rédiger une parade si le besoin bouge (jalon de relecture ou tranche courte revue).</li>
    </ol>
  </section>
);
```

- [ ] **Step 4: exercise.tsx (CDC 15.3, 2 exercices corriges)**

```tsx
export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock id="m3-ex1" titre="Exercice 1 : 3 cas fictifs, V ou cascade ?"
      enonce={<p>Pour 3 cas fictifs (site vitrine fige, demande peu detaillee, besoin medical fictif a contraintes fortes), dis si V ou cascade convient, avec motif et limite.</p>}
      corrige={<ul>
        <li><strong>Cas 1 :</strong> cascade possible (besoin stable, petit perimetre) ; limite : tout changement tardif coute une reprise de phase.</li>
        <li><strong>Cas 2 :</strong> ni V ni cascade seuls (besoin flou) ; limite : le besoin flou porte mal ni a l un ni a l autre, cadrer d abord par maquette ou lot court.</li>
        <li><strong>Cas 3 :</strong> cycle en V pertinent (traces et tests attendus) ; limite : lourdeur documentaire a calibrer.</li>
      </ul>}
      methode={['Le besoin contrôle la méthode, pas l inverse', 'Limite écrite, jamais cachée', 'Pas de dogme, motif écrit à chaque cas']} />
    <ExerciseBlock id="m3-ex2" titre="Exercice 2 dédié demandé : cascade ou agile ?"
      enonce={<p>L association fictive hésite entre cascade (tout figer puis livrer) et agile (livrer par tranches avec retours). Tranche avec motif et propose 1 parade si le besoin bouge.</p>}
      corrige={<ul>
        <li><strong>Tranche possible :</strong> agile si le contenu fictif hésite encore (agenda, galerie) ; cascade si le contenu est figé et la date contrainte.</li>
        <li><strong>Parade :</strong> jalon de relecture figé en cascade, ou tranche 1 courte en agile avec revue.</li>
        <li><strong>Motif attendu :</strong> la stabilité du besoin et la capacité à accueillir des retours, pas de dogme.</li>
      </ul>}
      methode={['Écris le motif avant le verdict', 'Prévois la parade du besoin qui bouge', 'Aucun dogme, on compare sur le fil rouge']} />
  </div>
);
```

- [ ] **Step 5: index.tsx et route (identiques au gabarit modules précédents, + les 2 labs viendront en Task 21)**

- [ ] **Step 6: build + commit**

Run: `npm run lint && npm run build` : OK.

```bash
git add src && git commit -m "feat: module 3 methodes contenus CDC 15.3 16 avec fix ligne 324 appliquee aux contenus"
```

### Task 20: LaboPhases complet + integration

**Files:**
- Create: `src/labos/LaboPhases.tsx`
- Test: `tests/labos/phases.test.ts`
- Modify: `src/modules/m3-methodes/index.tsx`

**Interfaces:**

```ts
export const LIVRABLES = ['Besoin', 'Maquette', 'Code', 'Jeu de tests', 'Recette', 'Mise en ligne'];
export const PHASES = ['Besoin', 'Conception', 'Realisation', 'Test', 'Deploiement', 'Acceptation', 'Tests systeme', 'Tests unitaires'];
export type Mode = 'cascade' | 'v';
export const ATTENDU: Record<Mode, Record<string, string>> = {
  cascade: {
    Besoin: 'Besoin', Maquette: 'Conception', Code: 'Realisation',
    'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement',
  },
  v: {
    Besoin: 'Acceptation', Maquette: 'Tests systeme', Code: 'Tests unitaires',
    'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement',
  },
};
export type PhasesState = { mode: Mode; place: Record<string, string>; done?: false | true };
export type PhasesAction = { type: 'assign'; livrable: string; cible: string } | { type: 'mode'; m: Mode } | { type: 'reset' };
export function reductions(s: PhasesState, a: PhasesAction): PhasesState;
export function verifierPhases(s: PhasesState): { ok: boolean; messages: string[] };
// ok si TOUS les livrables sont placés à la cible attendue du mode courant.
```

**Etapes CDC (LaboFrame `etapes`) :** 1 six livrables affiches ; 2 glisser vers la phase (V ou cascade selon le toggle) ; 3 clavier complet ; 4 erreur expliquee sans piege ; 5 ouvrir le comparateur pour rappels ; 6 validation et XP.

**Steps:**

- [ ] **Step 1: tests/labos/phases.test.ts (echec d'abord)**

```ts
import { describe, it, expect } from 'vitest';
import { reductions, verifierPhases } from '../../src/labos/LaboPhases';

const PLUS_RAMP: PhasesState['place'] = {
  Besoin: 'Besoin', Maquette: 'Conception', Code: 'Realisation',
  'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement',
};

describe('reductions/verifierPhases', () => {
  it('mode cascade : placement entire ok', () => {
    const s = reductions({ mode: 'cascade', place: {} }, { type: 'assign', livrable: 'Besoin', cible: 'Besoin' });
    expect(s.place.Besoin).toBe('Besoin');
  });
  it('mode cascade complet : verifierPhases ok', () => {
    const s: PhasesState = { mode: 'cascade', place: { ...PLUS_RAMPS } };
    expect(verifierPhases(s).ok).toBe(true);
  });
  it('mauvaise cible produit un message clair', () => {
    const s: PhasesState = { mode: 'cascade', place: { Besoin: 'Test', ...PLUS_RAMP .slice(1) } };
  });
  it('mode v : la maquette attend Tests systeme', () => {
    const s = reductions({ mode: 'v', place: { Maquette: 'Conception' } }, { type: 'mode', m: 'v' });
    const r = verifierPhases(s);
    expect(r.messages.join(' ')).toMatch(/Tests systeme/);
  });
});
```

> 3e test du bloc (fixe) : `const s: PhasesState = { mode: 'cascade', place: { 'Jeu de tests': 'Test', Recette: 'Test' } };` puis `expect(verifierPhases(s).messages.join(' ')).toMatch(/Acceptation/)`.

- [ ] **Step 2: implementer src/labos/LaboPhases.tsx**

```tsx
import React, { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const LIVRABLES = ['Besoin', 'Maquette', 'Code', 'Jeu de tests', 'Recette', 'Mise en ligne'];
export const CIBLES = ['Besoin', 'Conception', 'Realisation', 'Test', 'Deploiement', 'Acceptation', 'Tests systeme', 'Tests unitaires'];
export type Mode = 'cascade' | 'v';
export const ATTENDU: Record<Mode, Record<string, string>> = {
  cascade: { Besoin: 'Besoin', Maquette: 'Conception', Code: 'Realisation', 'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement' },
  v: { Besoin: 'Acceptation', Maquette: 'Tests systeme', Code: 'Tests unitaires', 'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement' },
};
export interface PhasesState { mode: Mode; place: Record<string, string> }
export type PhasesAction = { type: 'assign'; livrable: string; cible: string } | { type: 'mode'; m: Mode } | { type: 'reset' };

export function reductions(s: PhasesState, a: PhasesAction): PhasesState {
  switch (a.type) {
    case 'assign': return { ...s, place: { ...s.place, [a.livrable]: a.cible } };
    case 'mode': return { ...s, mode: a.m };
    case 'reset': return { mode: 'cascade', place: {} };
  }
}

export function verifierPhases(s: PhasesState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const livrable of LIVRABLES) {
    const attendu = ATTENDU[s.mode][livrable];
    if (s.place[livrable] !== attendu) {
      messages.push(s.place[livrable] === undefined
        ? `« ${livrable} » à placer (cible du mode ${s.mode} : ${attendu}).`
        : `« ${livrable} » attendu en « ${attendu} », placé en « ${s.place[livrable]} ».`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };
export default function LaboPhases(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reductions, undefined, () => ({ mode: 'cascade' as Mode, place: {} }));
  const [messages, setMessages] = useState<string[]>([]);

  const verifier = () => {
    const r = verifierPhases(s);
    setMessages(r.messages);
    if (r.ok && !p.laboDone.includes('m3-phases')) props.onValide();
  };

  const etapesCDC = ['6 livrables affiches', '', '', '', '', '']; // rempli au composant

  return (
    <LaboFrame
      titre="Labo : associer livrables et phases"
      consigne={`Mode conclusion : ${s.mode === 'cascade' ? 'cascade' : 'cycle en V'}. Place chaque livrable dans sa cible ou pas.`}
      etapes={[
        'Six livrables fictifs affiches.',
        'Tirer une carte puis la deposer dans une cible.',
        'Clavier : tabulation, entree pour deposer (meme pattern que LaboWbs).',
        'Erreur expliquee sans piege (ex : recette attendue en face acceptation).',
        'Le comparateur methodes reste disponible en rappel sans dogme.',
        'Validation des 6 livrables corrects (+5 XP la premiere fois).',
      ]}
      etape={messages.length === 0 && Object.keys(s.place).length === LIVRABLES.length ? 6 : 2}
      etat={messages[messages.length - 1] ?? ''}
      onVerifier={verifier} onReinitialiser={() => { dispatch({ type: 'reset' }); setMessages([]); }}
      valide={props.valide || verifierPhases(s).ok}
    >
      <div className="mode-switch">
        <button type="button" onClick={() => dispatch({ type: 'mode', m: 'cascade' })} aria-pressed={s.mode === 'cascade'}>Consigne cascade</button>
        <button type="button" onClick={() => dispatch({ type: 'mode', m: 'v' })} aria-pressed={s.mode === 'v'}>Consigne cycle en V</button>
      </div>
      <div className="wbs-cards" role="listbox" aria-label="Livrables">
        {LIVRABLES.map((l) => (
          <button key={l} type="button" className="wbs-card">{l}{s.place[l] ? ` (${s.place[l]})` : ''}</button>
        ))}
      </div>
      <div className="wbs-lots">
        {CIBLES.map((c) => (
          <div key={c} className="wbs-lot">
            <h4>{c}</h4>
            <ul>{LIVRABLES.filter((l) => s.place[l] === c).map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        ))}
      </div>
      {messages.map((m, i) => <p key={i} className="err" role="alert">{m}</p>)}
    </LaboFrame>
  );
}
```

> Note de nommage : le reducteur exporte s'appelle `reductions` (tel quel dans les tests), pour eviter la collision avec `React.useReducer`.

- [ ] **Step 3: tests et build+ commit**

Run: `npm test -- tests/labos/phases.test.ts` : PASS (4 tests).

```bash
git add src tests && git commit -m "feat: labo phases mode cascade et v avec messages sans piege"
```

### Task 21: ComparateurMethodes (contenu statique, sans XP)

**Files:**
- Create: `src/labos/ComparateurMethodes.tsx`
- Test: `tests/labos/comparateur.test.tsx`
- Modify: `src/modules/m3-methodes/index.tsx` (après LaboPhases)

**Interfaces:**
```tsx
export const METHODS: Array<{ nom: string; avantages: string[]; limites: string[]; cas: string[] }> = [
  { nom: 'Cycle en V', avantages: ['Tests prepares pour chaque phase'], limites: ['Documentation lourde requise'], cas: ['Travaux fictifs reglementes avec besoin de traces'] },
  { nom: 'Waterfall (cascade)', avantages: ['Phases simples et jalons clairs'], limites: ['Retards coûteux si le besoin bouge'], cas: ['Site vitrine figé fictif'] },
  { nom: 'Agiles (Scrum/Kanban...)', avantages: ['Retours réguliers'], limites: ['Necessite des parties prenantes disponibles'], cas: ['Produit fictif évolutif comme l agenda du site'] },
];
export default function ComparateurMethodes(): JSX.Element;  // erreurs XML traitees via role tablist; sans XP; onglets a 3 entrees.
```

**Steps:**

- [ ] **Step 1: test (echec) puis implementer avec tablist accessible (role="tablist", boutons role="tab", panels role="tabpanel", fleches gauche droite)**
- [ ] **Step 2: build + commit**

Run: `npm test -- tests/labos/comparateur.test.tsx` : PASS (2 tests : rendu 3 onglets, un panel actif et accessible).

```bash
git add src tests && git commit -m "feat: comparateur methodes a 3 entrees sans dogme"
```

### Task 22: gate fin de Jalon 3

- [ ] lint/test/build : OK ; smoke PASS ; Lighthouse >= 90 ; commit `test: gate jalon 3`.

---

# Jalon 4 : module 4 (Agiles) + labo Kanban + poker planning

### Task 23: module 4 contenus (CDC 15.4)

**Files:**
- Create: `src/modules/m4-agiles/{fiche.tsx,filRouge.tsx,demarche.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts,index.tsx}`
- Modify: `src/App.tsx` (route `/module-4`)

**Steps:**

- [ ] **Step 1: quiz.ts (CDC 15.4 verbatim)**

```ts
import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm4-quiz',
  questions: [
    { question: 'Quel est le role du backlog en Scrum ?', choix: ['Une liste priorisee qui pilote les tranches', 'Une liste figee pour toujours', 'Un planning detaille des heures'], bonne: 0, motif: 'Le backlog evolue avec les retours, il n est pas fige.' },
    { question: 'A quoi sert la limite de WIP en Kanban ?', choix: ['Finir avant de commencer, pour reveler les blocages', 'Commencer le plus possible a la fois', 'Supprimer la colonne Fini'], bonne: 0, motif: 'La limite fictive rend visible l encombrement et aide a debloquer.' },
    { question: "Quel apport des methodes Lean et XP ?", choix: ['Petits lots et qualite frequente', 'Un gros lot unique sans relecture', 'Des tests seulement a la fin'], bonne: 0, motif: 'Lean reduit les gaspillages par petits lots, XP soigne le code par tests et relectures frequents.' },
  ],
};
```

- [ ] **Step 2: ficheReflexe.ts**

```ts
export const items = [
  'Ecris les stories au format : en tant que..., je veux..., pour... .',
  'Priorise le backlog, il nest pas une liste figee.',
  'Respecte la limite de WIP : finir avant de commencer.',
  'Decoupe en petits lots pour limiter les gaspillages.',
  'Fais frequentes les relectures et les tests (esprit XP).',
];
```

- [ ] **Step 3: fiche.tsx (4 methodes, chacune a quoi ca sert/quand, sans hierarchie)**

```tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : Scrum, Kanban, Lean, XP</h2>
    <h3>Scrum</h3>
    <p><strong>A quoi ca sert.</strong> Faire un produit evolutif par tranches courtes, avec un backlog priorise et des rituels courts (planning, quotidienne, review, retro) et trois roles (porteur de besoin, animateur, realisateurs). <strong>Quand.</strong> Le contenu evolue, des retours reguliers sont possibles. <strong>Limites.</strong> Demande de la disponibilite des personnes et de la stabilite des roles.</p>
    <h3>Kanban</h3>
    <p><strong>A quoi ca sert.</strong> Gerer un flux continu sans grosse phase de planification, avec des colonnes, une limite de WIP et des indicateurs simples. <strong>Quand.</strong> Les demandes arrivent au fil de l eau. <strong>Limites.</strong> Sans limite de WIP respectee, la colonne En cours s encombre.</p>
    <h3>Lean</h3>
    <p><strong>A quoi ca sert.</strong> Eliminer les gaspillages, decouper en petits lots, boucler court. <strong>Quand.</strong> On cherche a reduire l encombrement et les travaux sans suite. <strong>Limites.</strong> Demande un suivi des blocages reel : petit lot ne veut pas dire publication continue sans controle.</p>
    <h3>XP</h3>
    <p><strong>A quoi ca sert.</strong> Soigner la qualite du code : relectures croisees, tests frequents, petits pas. <strong>Quand.</strong> Des que des tests et des relectures regulieres sont possibles. <strong>Limites.</strong> presuppose une equipe qui programme ensemble, ce qui ne tombe pas toujours sur un benevolat fictif.</p>
    <h3>Agile sans dogme</h3>
    <p>Quatre methodes citees avec leur cas d usage et leurs limites ; aucune n est superieure aux autres : le choix depend du flux des demandes, de la disponibilite des personnes et de la culture technique locale.</p>
  </section>
);
```

- [ ] **Step 4: filRouge.tsx (CDC 15.4)**

```tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecus du fil rouge</h2>
    <h3>Exemple 1 : Scrum fictif</h3>
    <p>Backlog priorise (accueil, agenda, contact), tranches courtes, review avec le bureau fictif, retro entre benevoles fictifs. Roles fictifs : porteur de besoin fictif, animateur fictif, realisateurs fictifs.</p>
    <h3>Exemple 2 : Kanban fictif</h3>
    <p>Colonnes A faire, En cours, A relire, Fini ; limite fictive de 2 cartes en En cours ; revue de flux pour debloquer la relecture fictive.</p>
  </section>
);
```

- [ ] **Step 5: demarche.tsx, exercise.tsx, quiz, index.tsx et route (`/module-4`)**

```tsx
// demarche.tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Ecris 3 user stories au format : en tant que ..., je veux ..., pour ... .</li>
      <li>Priorise le backlog fictif de bout en bout, pas par bloc de volontes.</li>
      <li>Choisis Scrum (tranches) ou Kanban (flux) selon comment les demandes arrivent, avec motif et limites.</li>
      <li>Poses une limite de WIP et un compteur de blocages apres quelques semaines fictives.</li>
      <li>Lie la qualite du code (tests et relectures, esprit XP) a la chaine CI du module 5.</li>
    </ol>
  </section>
);
```

```tsx
// exercise.tsx (CDC 15.4)
import React from 'react';
import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock id="m4-ex1" titre="Exercice 1 : user stories et choix de methode"
      enonce={<p>Ecris 3 user stories correctes pour le site fictif (qui, quoi, pourquoi) puis choisis Scrum ou Kanban pour 2 cas fictifs avec motif.</p>}
      corrige={<ul>
        <li><strong>Stories:</strong> au format qui, quoi, pourquoi, avec critere simple (exemple fictif : en tant que visiteur fictif, je veux voir l agenda fictif pour connaitre les dates).</li>
        <li><strong>Cas A (contenu evolutif, priorites) :</strong> Scrum pertinent, limites rappelees (besoin de disponibilite).</li>
        <li><strong>Cas B (demandes au fil de l eau) :</strong> Kanban pertinent, limites rappelees (WIP a tenir).</li>
      </ul>}
      methode={['Format qui/quoi/pourquoi', 'Un critere de fini par story', 'Motif et limite pour chaque choix de methode']} />
    <ExerciseBlock id="m4-ex2" titre="Exercice 2 : tableau bloque"
      enonce={<p>Sur un tableau fictif bloque (3 cartes en En cours pour une limite fictive de 2), propose 2 actions Lean et 1 pratique XP liee a la qualite, sans changer l outil de suivi.</p>}
      corrige={<ul>
        <li><strong>Premiere action:</strong> finir une carte avant d en commencer une nouvelle.</li>
        <li><strong>Deuxieme action :</strong> reduire la taille des cartes.</li>
        <li><strong>XP (qualite) :</strong> relecture croisee et tests frequents avant de passer en A relire.</li>
        <li>Lien vers module 5 : ces tests alimentent la chaine CI simplifiee.</li>
      </ul>}
      methode={['Observe la colonne qui dépasse et pourquoi', 'Cherche 2 actions de flux (Lean)', 'Ajoute 1 pratique de qualite (XP)']} />
  </div>
);
```

L'index.tsx du module suit le gabarit (meta id `m4-agiles`, route `/module-4`).

- [ ] **Step 6: build + commit**

```bash
git add src && npm run lint && npm run build && git commit -m "feat: module 4 agiles contenus CDC 15.4"
```

### Task 24: LaboKanban complet + integration

**Files:**
- Create: `src/labos/LaboKanban.tsx`
- Test: `tests/labos/kanban.test.ts`
- Modify: `src/modules/m4-agiles/index.tsx`

**Interfaces :**

```ts
export const CARTES = ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice benevole'];
export const COLONNES = ['A faire', 'En cours', 'A relire', 'Fini'] as const;
export type Colonne = (typeof COLONNES)[number];
export const WIP_MAX = 2;
export type KanbanState = { cartes: Record<string, Colonne>; blocages: number };
export type KanbanAction = { type: 'deplace'; carte: string; sens: -1 | 1 } | { type: 'reset' };
// deplace: cible = colonnes.indexOf(courante) + sens hors bornes refusé ;
// si cible == 'En cours' et le compte En cours courant == WIP_MAX alors refusé et blocages+1.
export function reducKanban(s, a): KanbanState;
export function verifierKanban(s): { ok: boolean; messages: string[] };
// ok quand un tableau joue ne bloque plus et toutes les cartes sont en Fini.
```

**Etapes CDC 15.4 dans l UI :** 1 tableau a 4 colonnes avec 6 cartes ; 2 avancer une carte (clic ou clavier) ; 3 au dela de la limite fictive de 2 en En cours, le depot est bloque avec message ; 4 compteur de blocages mis a jour ; 5 poker planning (Task 25, labo separe en dessous) ; 6 validation (+5 XP la premiere fois).

**Steps:**

- [ ] **Step 1: tests/labos/kanban.test.ts (echec d'abord)**

```ts
import { describe, it, expect } from 'vitest';
import { reducKanban, verifierKanban, COLONNES, WIP_MAX, initialState, KanbanState } from '../../src/labos/LaboKanban';

const avance = (s: KanbanState, carte: string) => reducKanban(s, { type: 'deplace', carte, sens: 1 });
const recule = (s: KanbanState, carte: string) => reducKanban(s, { type: 'deplace', carte, sens: -1 });

describe('reducKanban', () => {
  it('avance une carte d une colonne', () => {
    const s = reducKanban(initialState(), { type: 'deplace', carte: 'Page accueil', sens: 1 });
    expect(s.cartes['Page accueil']).toBe('En cours');
  });
  it('refuse d entrer en En cours si WIP atteint et compte un blocage', () => {
    let s = initialState();
    s = avance(s, 'Page accueil');          // En cours: 1
    s = avance(s, 'Agenda des activites');  // En cours: 2
    const avant = s.blocages;
    s = avance(s, 'Formulaire contact');    // refusé
    expect(s.cartes['Formulaire contact']).toBe('A faire');
    expect(s.blocages).toBe(avant + 1);
    expect(COLONNES.length).toBe(4);
    expect(WIP_MAX).toBe(2);
  });
  it('bloque la sortie au dela de Fini', () => {
    let s = initialState();
    for (let i = 0; i < 5; i++) s = avance(s, 'Page accueil');
    expect(s.cartes['Page accueil']).toBe('Fini');
    const s2 = avance(s, 'Page accueil');
    expect(s2.cartes['Page accueil']).toBe('Fini');
  });
  it('recule une carte sans creer de blocage', () => {
    let s = initialState();
    s = avance(s, 'Page accueil');
    s = recule(s, 'Page accueil');
    expect(s.cartes['Page accueil']).toBe('A faire');
    expect(s.blocages).toBe(0);
  });
});

describe('verifierKanban', () => {
  it('ok quand toutes les cartes sont en Fini', () => {
    let s = initialState();
    for (const carte of ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice benevole']) {
      for (let i = 0; i < 5; i++) s = avance(s, carte);
    }
    expect(verifierKanban(s).ok).toBe(true);
  });
  it('pas ok au depart', () => {
    expect(verifierKanban(initialState()).ok).toBe(false);
  });
});
```

- [ ] **Step 2: implementer src/labos/LaboKanban.tsx**

```tsx
import React, { useReducer } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const CARTES = ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice benevole'];
export const COLONNES = ['A faire', 'En cours', 'A relire', 'Fini'] as const;
export type Colonne = (typeof COLONNES)[number];
export const WIP_MAX = 2;
export interface KanbanState { cartes: Record<string, Colonne>; blocages: number }
export type KanbanAction = { type: 'deplace'; carte: string; sens: -1 | 1 } | { type: 'reset' };

export function initialState(): KanbanState {
  const cartes: Record<string, Colonne> = {};
  for (const c of CARTES) cartes[c] = 'A faire';
  return { cartes, blocages: 0 };
}

export function reducKanban(s: KanbanState, a: KanbanAction): KanbanState {
  switch (a.type) {
    case 'deplace': {
      const courante = s.cartes[a.carte];
      const idx = COLONNES.indexOf(courante);
      const cible = COLONNES[idx + a.sens];
      if (!cible) return s;
      if (cible === 'En cours' && COLONNES.filter((c) => s.cartes[c] === 'En cours').length >= WIP_MAX) {
        return { ...s, blocages: s.blocages + 1 };
      }
      return { ...s, cartes: { ...s.cartes, [a.carte]: cible } };
    }
    case 'reset': return initialState();
  }
}

export function verifierKanban(s: KanbanState): { ok: boolean; messages: string[] } {
  const pasFini = CARTES.filter((c) => s.cartes[c] !== 'Fini');
  if (pasFini.length > 0) return { ok: false, messages: [`Reste ${pasFini.length} carte(s) a finir.`] };
  return { ok: true, messages: [] };
}
```

Composant interactif (colonnes HTML + cartes boutons availent le pattern LaboWbs, via fleches gauche/droite pour deplacer, compteurs et messages) :

```tsx
type Props = { valide: boolean; onValide: () => void };
export default function LaboKanban(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reducKanban, undefined, initialState);
  const [message, setMessage] = React.useState<string>('');

  const deplacer = (carte: string, sens: -1 | 1) => {
    const apres = reducKanban(s, { type: 'deplace', carte, sens });
    if (apres === s) {
      setMessage(`Blocage : la colonne En cours est deja a ${WIP_MAX} cartes (limite de WIP). Finis-en une avant d en commencer une autre.`);
    } else {
      setMessage(`${carte} passe en ${apres.cartes[carte]}.`);
    }
    dispatch({ type: 'deplace', carte, sens });
  };

  return (
    <LaboFrame titre="Labo : tableau Kanban jouable" consigne="Fais avancer les 6 cartes jusqu a Fini en respectant la limite de WIP de 2 cartes en En cours."
      etapes={['Tableau a 4 colonnes et 6 cartes.', 'Fais avancer une carte.', 'Le depot en En cours est bloque au dela de 2.', 'Le compteur de blocages se met a jour.', 'Le poker planning est un second labo ci dessous.', 'Validation du tableau complet (+5 XP).']}
      etape={verifierKanban(s).ok ? 6 : s.blocages > 0 ? 4 : 2} etat={message}
      onVerifier={() => { const r = verifierKanban(s); setMessage(r.messages.join(' ')); if (r.ok && !p.laboDone.includes('m4-kanban')) props.onValide(); }}
      onReinitialiser={() => { dispatch({ type: 'reset' }); setMessage(''); }}
      valide={props.valide || verifierKanban(s).ok}>
      <div className="kanban-board">
        {COLONNES.map((c) => (
          <div key={c} className="kanban-col">
            <h4>{c}{c === 'En cours' ? ` (${WIP_MAX} max)` : ''}</h4>
            {CARTES.filter((k) => s.cartes[k] === c).map((k) => (
              <div key={k} className="kanban-card">
                {k}
                <button type="button" aria-label={`Reculer ${k}`} onClick={() => deplacer(k, -1)}>{'<'}</button>
                <button type="button" aria-label={`Avancer ${k}`} onClick={() => deplacer(k, 1)}>{'>'}</button>
              </div>
            ))}
            {c === 'En cours' && <p className="compteur">{___countE_(s)} : {Math.min(WIP_MAX, CARTES.filter((k) => s.cartes[k] === 'En cours').length)}</p>}
          </div>
        ))}
      </div>
      <p className="compteur">Blocages rencontres : {s.blocages}</p>
      {message && <p role="alert">{message}</p>}
    </LaboFrame>
  );
}

function ___countE_(s: KanbanState): number {
  return CARTES.filter((k) => s.cartes[k] === 'En cours').length;
}
```

> Correction implicite : ne compter qu une seule fois la colonne En cours ; renommer `compteEnCours` (supprimer tout doublon de comptage) et afficher `<p className="compteur">En cours : {compteEnCours(s)} sur {WIP_MAX}</p>`.

- [ ] **Step 3: styles kanban + tests + build + commit**

```css
.kanban-board { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
.kanban-card { display: flex; gap: 0.3rem; align-items: center; justify-content: space-between; border: 1px solid var(--c-line); border-radius: 8px; padding: 0.3rem 0.5rem; margin: 0.3rem 0; background: var(--c-soft); }
@media (prefers-reduced-motion: reduce) { .kanban-card { transition: none; } }
```

Run: `npm test -- tests/labos/kanban.test.ts` : PASS (6 tests).

```bash
git add src tests && git commit -m "feat: labo kanban jouable avec wip et compteur de blocages"
```

### Task 25: PokerPlanning + integration

**Files:**
- Create: `src/labos/PokerPlanning.tsx`
- Test: `tests/labos/poker.test.ts`
- Modify: `src/modules/m4-agiles/index.tsx` (second labo sous LaboKanban, wrapper id="labo-poker")

**Interfaces :**

```ts
export const STORIES = ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos'];
export const VALEURS = [1, 2, 3, 5, 8, 13] as const;
export const CORRECTIONS: Record<string, number> = { 'Page accueil': 2, 'Agenda des activites': 5, 'Formulaire contact': 2, 'Version mobile': 3, 'Galerie photos': 5 };
export type PokerState = { estimations: Record<string, number | null>; revele: boolean };
export type PokerAction = { type: 'estime'; story: string; valeur: number } | { type: 'reveal' } | { type: 'reset' };
export function rejouer(s: PokerState, a: PokerAction): PokerState;
export function verifierPoker(s: PokerState): { ok: boolean; messages: string[] };
// ok quand toutes estimées : retours par story : "Agenda des activites : ton estimation 3, correction fictive 5."
```

**Steps:**

- [ ] **Step 1: tests/labos/poker.test.ts (echec, puis PASS)**

```ts
import { describe, it, expect } from 'vitest';
import { rejouer, verifierPoker, STORIES, CORRECTIONS, initialState as initPoker } from '../../src/labos/PokerPlanning';

describe('rejouer', () => {
  it('estime une story', () => {
    const s = rejouer(initPoker(), { type: 'estime', story: 'Page accueil', valeur: 2 });
    expect(s.estimations['Page accueil']).toBe(2);
  });
  it('reveal garde les estimations et marque revele', () => {
    let s = initPoker();
    s = rejouer(s, { type: 'estime', story: 'Page accueil', valeur: 3 });
    s = rejouer(s, { type: 'reveal' });
    expect(s.revele).toBe(true);
    expect(verifierPoker(s).messages.length).toBe(STORIES.length);
  });
});

describe('verifierPoker', () => {
  it('ok quand toutes les estimations collent aux corrections', () => {
    let s = initPoker();
    for (const story of STORIES) s = rejouer(s, { type: 'estime', story, valeur: CORRECTIONS[story] });
    const r = verifierPoker(s);
    expect(r.ok).toBe(true);
    expect(r.messages.length).toBe(0);
  });
  it('attend toutes les estimations avant verdict', () => {
    expect(verifierPoker(initPoker()).ok).toBe(false);
  });
});
```

- [ ] **Step 2: implementer (pattern listbox + boutons valeurs ; XP id 'm4-poker' la premiere fois ; messages par story apres reveal)**

```tsx
import React, { useReducer } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const STORIES = ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos'];
export const VALEURS = [1, 2, 3, 5, 8, 13] as const;
export const CORRECTIONS: Record<string, number> = { 'Page accueil': 2, 'Agenda des activites': 5, 'Formulaire contact': 2, 'Version mobile': 3, 'Galerie photos': 5 };
export interface PokerState { estimations: Record<string, number | null>; revele: boolean }
export type PokerAction = { type: 'estime'; story: string; valeur: number } | { type: 'reveal' } | { type: 'reset' };

export function initialState(): PokerState {
  const estimations: Record<string, number | null> = {};
  for (const st of STORIES) estimations[st] = null;
  return { estimations, revele: false };
}

export function rejouer(s: PokerState, a: PokerAction): PokerState {
  switch (a.type) {
    case 'estime': return { ...s, estimations: { ...s.estimations, [a.story]: a.valeur } };
    case 'reveal': return { ...s, revele: true };
    case 'reset': return initialState();
  }
}

export function verifierPoker(s: PokerState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const st of STORIES) {
    const e = s.estimations[st];
    if (e == null) { messages.push(`${st} : pas encore estimee.`); continue; }
    const correction = CORRECTIONS[st];
    if (e !== correction) messages.push(`${st} : ton estimation ${e}, correction fictive ${correction}.`);
  }
  const absentes = messages.filter((m) => m.includes('pas encore estimee'));
  return { ok: absentes.length === 0 && messages.length === 0, messages: messages.filter((m) => absentes.length > 0 ? true : messages) };
}

type Props = { valide: boolean; onValide: () => void };
export default function PokerPlanning(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(rejouer, undefined, initialState);
  const [message, setMessage] = React.useState<string>('');

  const verifier = () => {
    const r = verifierPoker(s);
    setMessage(r.messages.join(' '));
    if (r.ok && !p.laboDone.includes('m4-poker')) props.onValide();
    dispatch({ type: 'reveal' });
  };

  return (
    <LaboFrame titre="Labo : poker planning" consigne="Estime les 5 stories fictives puis compare a la correction fictive."
      etapes={['5 stories affichees.', 'Estime chaque story.', 'Revele la correction fictive.', 'Compare et note l ecart.', 'Rejoue sans XP.', 'Validation si toutes collent (+5 XP).']}
      etape={s.revele ? 4 : 2} etat={message}
      onVerifier={verifier} onReinitialiser={() => { dispatch({ type: 'reset' }); setMessage(''); }}
      valide={props.valide || verifierPoker({...s}) && true}>
      <ul className="poker-list">
        {STORIES.map((st) => (
          <li key={st}>
            <strong>{st}</strong>
            <div className="poker-values" role="group" aria-label={`Estimation pour ${st}`}>
              {VALEURS.map((v) => (
                <button key={v} type="button" aria-pressed={s.estimations[st] === v} className="btn mini secondary"
                  onClick={() => dispatch({ type: 'estime', story: st, valeur: v })}>{v}</button>
              ))}
            </div>
            {s.revele && <span className="compteur">Correction fictive : {CORRECTIONS[st]}</span>}
          </li>
        ))}
      </ul>
      {message && <p role="alert">{message}</p>}
    </LaboFrame>
  );
}
```

> La ligne `valide={...}` doit etre simplifiee en `valide={props.valide}` (le verdict est donne par message apres reveal), correction a appliquer telle que dans le commit.

- [ ] **Step 3: tests + build + commit**

Run: `npm test -- tests/labos/poker.test.ts` : PASS (4 tests).

```bash
git add src tests && git commit -m "feat: poker planning avec correction fictive et messages story par story"
```

### Task 26: gate fin de Jalon 4

- [ ] lint/test/build/smoke/Lighthouse : OK, commit `test: gate jalon 4`.

---

# Jalon 5 : module 5 (outils CI/CD) + 2 labos

### Task 27: module 5 contenus (CDC 15.5)

**Files:**
- Create: `src/modules/m5-outils/{fiche.tsx,filRouge.tsx,demarche.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts,index.tsx}`
- Modify: `src/App.tsx` (route `/module-5`)

**Steps:**

- [ ] **Step 1: quiz.ts (CDC 15.5 verbatim)**

```ts
export const quiz: QuizData = {
  id: 'm5-quiz',
  questions: [
    { question: 'A quoi sert un outil de suivi ?', choix: ['Centraliser backlog, colonnes et assignation', 'Ecrire a la place de l equipe', 'Garantir le delai seul'], bonne: 0, motif: 'Il rend visible le travail partage, il ne remplace ni arbitrage ni travail.' },
    { question: 'A quoi sert une chaine CI ?', choix: ['Tester et assembler a chaque changement fictif', 'Publier sans aucun controle', 'Remplacer la relecture'], bonne: 0, motif: 'Detection tot des regressions fictives, relecture gardee.' },
    { question: 'A quoi sert un environnement reproductible ?', choix: ['Meme poste partout pour demo simple', 'Accelerer le reseau', 'Supprimer les tests'], bonne: 0, motif: 'Ecarts entre postes reduits, onboarding fictif plus simple.' },
  ],
};
```

- [ ] **Step 2: ficheReflexe.ts**

```ts
export const items = [
  'Renseigne l outil de suivi, sinon il ne montre rien.',
  'Fais tourner des tests courts a chaque changement.',
  'Garde la relecture humaine apres la chaine CI.',
  'Reproduis le meme environnement pour les demos.',
  'Entretiens ce que tu mets en place : tests, chaine, environnements.',
];
```

- [ ] **Step 3: fiche.tsx (3 familles d outils, a titre informatif)**

```tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : suivi, CI/CD et environnements</h2>
    <h3>Outil de suivi</h3>
    <p><strong>A quoi ca sert.</strong> Centraliser backlog, colonnes et assignation. <strong>Quand l'utiliser.</strong> Equipe partagee, besoin de trace. Des outils reels existent (Jira, GitHub Projects), cites a titre informatif, toujours avec l'usage fictif du fil rouge.</p>
    <h3>Chaine CI/CD</h3>
    <p><strong>A quoi ca sert.</strong> Tester et livrer a chaque changement. <strong>Quand.</strong> Base partagee, regressions frequentes. GitHub Actions cite comme exemple informatif.</p>
    <h3>Environnements reproductibles</h3>
    <p><strong>A quoi ca sert.</strong> Meme poste partout, onboarding simple. <strong>Quand.</strong> Ecarts entre postes, demo fragile. Docker cite comme exemple informatif.</p>
    <p><strong>Limites communes.</strong> Un outil n'est pas une methode : sans entretien et sans usage collectif, il devient un registre vide ; l'outil choisi doit rester une decision d'equipe avec motif CB et limite ecrite.</p>
  </section>
);
```

- [ ] **Step 4: filRouge.tsx (CDC 15.5)**

```tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecus du fil rouge</h2>
    <h3>Exemple 1 : le suivi partage</h3>
    <p>Backlog fictif centralise, colonnes, assignation a un benevole fictif, trace des decisions fictives. Besoin couvert : une equipe dispersee qui doit voir le reste a faire.</p>
    <h3>Exemple 2 : la chaine fictive simple</h3>
    <p>A chaque changement fictif : tests courts, assemblage, relecture, mise en ligne fictive. Environnement reproductible fictif pour la demo devant le bureau fictif.</p>
  </section>
);
```

- [ ] **Step 5: demarche.tsx, exercise.tsx (CDC 15.5), quiz, index, route `/module-5`**

```tsx
// demarche.tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Exprime le besoin en une phrase (equipe dispersee, regressions, demo fragile).</li>
      <li>Choisis une famille d'outils qui repond au besoin, pas une marque.</li>
      <li>Poses des tests courts a chaque changement.</li>
      <li>Reproduis le meme environnement pour la demo.</li>
      <li>Entretien chaine et tests, sinon la chaine devient une promesse vide.</li>
    </ol>
  </section>
);
```

```tsx
// exercise.tsx (CDC 15.5)
export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock id="m5-ex1" titre="Exercice 1 : 3 situations, quel type d'outil ?"
      enonce={<p>Pour 3 situations fictives (equipe dispersee, regressions frequentes, demo fragile sur postes differents), choisis un type d'outil avec motif et limite, sans verdict definitif.</p>}
      corrige={<ul>
        <li><strong>Situation 1 :</strong> outil de suivi partage, motif : trace et assignation, limite : a renseigner sinon inutile.</li>
        <li><strong>Situation 2 :</strong> chaine CI avec tests a chaque changement fictif, motif : detecter tot, limite : tests a entretenir.</li>
        <li><strong>Situation 3 :</strong> environnement reproductible fictif, motif : meme poste partout, limite : image a maintenir.</li>
      </ul>}
      methode={['Phrase de besoin avant leout ', 'Motif et limite a chaque choix', 'Aucun verdict definitif, jamais']} />
    <ExerciseBlock id="m5-ex2" titre="Exercice 2 : ou placer la chaine CI"
      enonce={<p>Ordonner 4 etapes fictives (test, assemblage, relecture, deploiement fictif) et dis ou placer un controle qualite simple.</p>}
      corrige={<ul>
        <li><strong>Ordre attendu:</strong> test, assemblage, relecture, deploiement fictif.</li>
        <li><strong>Controle:</strong> place avant deploiement, avec critere simple (tests au vert et relecture faite).</li>
        <li><strong>Methode:</strong> si la relecture echoue, retour avant deploiement.</li>
      </ul>}
      methode={['Ordre avant depot', 'Reperer l indice de controle avant le deploiement']} />
  </div>
);
```

> La 2e ligne de methode du m5-ex2 est corrompue : la remettre en 'Repper le critere de controle une consigne avant le deploiement'.

- [ ] **Step 6: build + commit**

```bash
git add src && npm run lint && npm run build && git commit -m "feat: module 5 outils contenus CDC 15.5"
```

### Task 28: LaboSelecteurOutil + integration

**Files:**
- Create: `src/labos/LaboSelecteurOutil.tsx`
- Test: `tests/labos/selecteur.test.ts`
- Modify: `src/modules/m5-outils/index.tsx`

**Interfaces :**

```ts
export const BESOINS = ['Equipe dispersee', 'Regressions frequentes', 'Demo fragile sur postes differents'];
export const OUTILS = ['Outil de suivi partage', 'Chaine CI', 'Environnement reproductible'];
export const MOTIFS: Record<string, { motif: string; limite: string }> = {
  'Outil de suivi partage': { motif: 'Trace et assignation visibles', limite: 'A renseigner regulierement sinon inutile' },
  'Chaine CI': { motif: 'Tests courts a chaque changement', limite: 'Tests a entretenir' },
  'Environnement reproductible': { motif: 'Meme poste partout', limite: 'Image a maintenir' },
};
export const SUGGESTIONS: Record<string, string> = {
  'Equipe dispersee': 'Outil de suivi partage',
  'Regressions frequentes': 'Chaine CI',
  'Demo fragile sur postes differents': 'Environnement reproductible',
};
export type SelecteurState = { choix: Record<string, string | null> };
export type SelecteurAction = { type: 'choisit'; besoin: string; outil: string } | { type: 'reset' };
export function reduceSelecteur(s: SelecteurState, a: SelecteurAction): SelecteurState;
// etat local: choix affiche le motif et la limite correspondant sans verdict (rappel sans dogme);
export function verifierSelecteur(s: SelecteurState): { ok: boolean; messages: string[] };
// ok quand les 3 besoins sont choisis selon SUGGESTIONS.
```

**Etapes CDC :** 1 trois besoins affiches ; 2 choisir un type d'outil par besoin (clic ou clavier) ; 3 motif affiche sans verdict, avec limite ; 4 vue chaine CI ordonner (labo separe) ; 5 ordre verifie ; 6 validation (+5 XP).

**Steps:**

- [ ] **Step 1: ecrire tests/labos/selecteur.test.ts (echec puis PASS)**

```ts
import { describe, it, expect } from 'vitest';
import { reduceSelecteur, verifierSelecteur, SUGGESTIONS, BESOINS, initialState } from '../../src/labos/LaboSelecteurOutil';

describe('LaboSelecteurOutil', () => {
  it('choisit un outil par besoin', () => {
    const s = reduceSelecteur(initialState(), { type: 'choisit', besoin: 'Equipe dispersee', outil: 'Chaine CI' });
    expect(s.choix['Equipe dispersee']).toBe('Chaine CI');
  });
  it('ok quand les 3 besoins sont corrects', () => {
    let s = initialState();
    for (const b of BESOINS) s = reduceSelecteur(s, { type: 'choisit', besoin: b, outil: SUGGESTIONS[b] });
    expect(verifierSelecteur(s).ok).toBe(true);
  });
  it('messages clair si pas fait' , () => {
    const r = verifierSelecteur(initialState());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(3);
  });
});
```

- [ ] **Step 2: implementer le composant (boutons par besoin, motif et limite affiches apres chaque choix ; verification par le bouton ; XP id 'm5-selecteur'), sur le pattern LaboWbs/Kanban**

- [ ] **Step 3: tests + build + commit**

```bash
git add src tests && git commit -m "feat: selecteur d outil avec motif limite sans verdict definitif"
```

### Task 29: LaboChaineCI + integration

**Files:**
- Create: `src/labos/LaboChaineCI.tsx`
- Test: `tests/labos/chaine.test.ts`
- Modify: `src/modules/m5-outils/index.tsx`

**Interfaces :**

```ts
export const ETAPES = ['Test', 'Assemblage', 'Relecture', 'Deploiement'];
export const ORDRE_ATTENDU = ['Test', 'Assemblage', 'Relecture', 'Deploiement'];
export type ChaineState = { ordre: string[] };
export type ChaineAction = { type: 'monte'; etape: string } | { type: 'descend'; etape: string } | { type: 'reset' };
// reset place ETAPES melangées ["Relecture","Test","Deploiement","Assemblage"].
export function reduceChaine(s: ChaineState, a: ChaineAction): ChaineState;   // swap voisin, borne 0..len-1
export function verifierChaine(s: ChaineState): { ok: boolean; messages: string[] };
// messages: si Deploiement avant Test: "le deploiement ne peut pas commencer avant les tests."
//          si Relecture avant Test: "nous la relecture vient apres le test et l assemblage" etc.
// ok quand ordre == ORDRE_ATTENDU.
```

**Etapes CDC :** idem Task 28 (steps 4-6).

**Steps:**

- [ ] **Step 1: tests/labos/chaine.test.ts (echec puis PASS)**

```ts
import { describe, it, expect } from 'vitest';
import { reduceChaine, verifierChaine, initialState, ORDRE_ATTENDU, ETAPES } from '../../src/labos/LaboChaineCI';

describe('reduceChaine', () => {
  it('depLace une etape vers le haut via swap voisins', () => {
    const s0 = initialState();
    const idx = s0.ordre.indexOf('Test');
    const s = reduceChaine(s0, { type: 'monte', etape: s0.ordre[idx] });
    expect(s.ordre[idx - 1]).toBe(s0.ordre[idx]);
  });
  it('borne du swap 0 et fin', () => {
    const s0 = initialState();
    const prem = s0.ordre[0] as string;
    expect(reduceChaine(s0, { type: 'monte', etape: prem }).ordre).toEqual(s0.ordre);
  });
});

describe('verifierChaine', () => {
  it('bye au depart', () => {
    expect(verifierChaine(initialState()).ok).toBe(false);
  });
  it('ok quand ordre == attendu', () => {
    const s = { ordre: [...ORDRE_ATTENDU] };
    expect(verifierChaine(s).ok).toBe(true);
  });
  it('message explicite quand Deploiement passe avant Test', () => {
    const s = { ordre: ['Deploiement', 'Test', 'Assemblage', 'Relecture'] };
    const r = verifierChaine(s);
    expect(r.messages.some((m) => m.includes('deploiement ne peut pas commencer avant les tests'))).toBe(true);
  });
});
```

> clic de forme : le test « monte une etape vers le haut » doit rester vrai quelque soit l ordre initial : calcule l index depuis `initialState()` au lieu de supposer un ordre fixe.

- [ ] **Step 2: implementer (boutons monter et descendre par etape, XP 'm5-chaine', messages d inversion)**

- [ ] **Step 3: tests + build + commit**

```bash
git add src tests && git commit -m "feat: chaine ci simplifiee a ordonner avec messages d inversion"
```

### Task 30: gate fin de Jalon 5

- [ ] lint/test/build/smoke/Lighthouse : OK, commit `test: gate jalon 5`.

---

# Jalon 6 : module 6 (equipe et risques) + Eisenhower + risques

### Task 31: module 6 contenus (CDC 15.6)

**Files:**
- Create: `src/modules/m6-equipe/{fiche.tsx,filRouge.tsx,demarche.tsx,exercise.tsx,quiz.ts,ficheReflexe.ts,index.tsx}`
- Modify: `src/App.tsx` (route `/module-6`)

**Steps:**

- [ ] **Step 1: quiz.ts (CDC 15.6 verbatim)**

```ts
export const quiz: QuizData = {
  id: 'm6-quiz',
  questions: [
    { question: "Qu'est ce que Eisenhower sert a faire ?", choix: ['Trier urgent et important pour decider', 'Tout faire en meme temps', 'Trier par ordre alphabetique'], bonne: 0, motif: 'L arbitrage vient de la distinction entre urgence et importance.' },
    { question: 'Que contient un registre des risques ?', choix: ['Risque, probabilite, impact, parade', 'Prenoms sans action', 'Dates seules'], bonne: 0, motif: 'Sans parade ni priorite, le registre ne sert pas au pilotage.' },
    { question: 'A quoi ressemble une bonne retro ?', choix: ['4 points courts avec 1 action atribuee', 'Un bilan sans action', 'Des reproches sans suite'], bonne: 0, motif: 'La retro fictive vise une amelioration concrete et suivie.' },
  ],
};
```

- [ ] **Step 2: ficheReflexe.ts**

```ts
export const items = [
  'Distribu chaque tache : urgent, important, les deux ou aucune.',
  'Ecrit une parade pour chaque risque majeur.',
  'Cherch un indicateur simple et tangible.',
  'Laisse la retro produire 1 action attribuee avec un echeance.',
  'Garde une trace au fil de l eau de ce qui prend du pain commun.',
];
```

- [ ] **Step 3: fiche.tsx (CDC 11.6)**

```tsx
export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : equipe, Eisenhower et suivi</h2>
    <p><strong>Communication.</strong> qui, quoi, quand : plan simple, ecrit, court. <strong>A quoi ca sert.</strong> eviter les trous de memoire et les silences interrogatifs.</p>
    <p><strong>Matrice d Eisenhower.</strong> trier urgent et important pour decider. <strong>Quand.</strong> surcharge, arbitrage. <strong>4 quadrants.</strong> urgent+important : fais maintenant ; important pas urgent : planifie ; urgent pas important : delegue ou simplifie ; ni ni : laisse de cote et rediscute.</p>
    <p><strong>Registre des risques.</strong> Probabilite x Impact, avec parade. <strong>Quand.</strong> des que le projet depend de personnes ou d'ingredients exterieurs fictifs.</p>
    <p><strong>Suivi et retro.</strong> indicateurs simples (taches finies, blocages, date tenue) et retros courtes de 4 points, toujours une action attribuee.</p>
  </section>
);
```

- [ ] **Step 4: filRouge.tsx (CDC 15.6)**

```tsx
export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vecus du fil rouge</h2>
    <h3>Exemple 1 : le tri Eisenhower</h3>
    <p>Tache urgente et importante : corriger le formulaire fictif casse. Importante peu urgente : preparer la notice benevole. Urgente peu importante : repondre a une demande simple d horaire. Ni urgente ni importante : refaire un logo fictif non demande.</p>
    <h3>Exemple 2 : le registre des risques</h3>
    <p>Risque 1 : benevole indisponible avant la mise en ligne, parade : benevole de rechange fictif. Risque 2 : photos non recues, parade : jeu de photos locales de rechange.</p>
  </section>
);
```

- [ ] **Step 5: demarche.tsx, exercise.tsx (CDC 15.6), index.tsx et route `/module-6`**

```tsx
// demarche.tsx
export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Ecris le plan de communication en 3 colonnes : qui, quoi, quand.</li>
      <li>Trie chaque tache : Eisenhower rend l arbitrage visible.</li>
      <li>Liste 6 risques fictifs, note probabilite et impact, ajoute une parade.</li>
      <li>Choisis 3 indicateurs simples (taches finies, blocages, date tenue).</li>
      <li>En retro, 4 points courts dont 1 action attribuee avec une echeance fictive.</li>
    </ol>
  </section>
);
```

```tsx
// exercise.tsx (CDC 15.6)
export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock id="m6-ex1" titre="Exercice 1 : tri et ordre du jour"
      enonce={<p>Classe 2 taches fictives avec Eisenhower avec motif et ecris l ordre du jour de retro en 4 points pour le site fictif.</p>}
      corrige={<ul>
        <li><strong>Classement attendu avec motif urgent et important separes.</strong></li>
        <li><strong>Ordre du jour fictif :</strong> ce qui a aide, ce qui a gene, 1 action concrete, qui la porte avec echeance fictive.</li>
        <li><strong>Methode :</strong> 1 action a la fois, responsable nomme parmi les roles fictifs.</li>
      </ul>}
      methode={['Urgent != important', 'Retro = 1 action attribuee', 'Cherche des indicateurs simples']} />
    <ExerciseBlock id="m6-ex2" titre="Exercice 2 : registre des risques"
      enonce={<p>Pour 3 risques fictifs fournis, place les sur la matrice probabilite x impact fictive et propose 1 parade par risque majeur.</p>}
      corrige={<ul>
        <li><strong>Priorites lues sur la matrice fictive</strong> (impact fort et probabilit forte en premier).</li>
        <li><strong>Parades simples :</strong> rechange, delai tampon fictif, simplification du perimetre fictif.</li>
        <li><strong>Suivi par indicateurs simples :</strong> taches finies, blocages, date fictive tenue.</li>
      </ul>}
      methode={['Poids: probabilite x impact', 'Parade pour chaque risque majeur', 'Indicateurs simples pour entretenir la vigilance']} />
  </div>
);
```

- [ ] **Step 6: build + commit**

```bash
git add src && npm run lint && npm run build && git commit -m "feat: module 6 equipe risques contenus CDC 15.6"
```

### Task 32: LaboEisenhower + integration

**Files:**
- Create: `src/labos/LaboEisenhower.tsx`
- Test: `tests/labos/eisenhower.test.ts`
- Modify: `src/modules/m6-equipe/index.tsx`

**Interfaces :**

```ts
export const TACHES = ['Corriger le formulaire casse', 'Preparer la notice benevole', 'Repondre a la demande d horaire', "Refaire un logo non demande", 'Relire l agenda des activites', 'Repondre au sondage du bureau'];
export const QUADRANTS = ['urgent-important', 'important-non-urgent', 'urgent-non-important', 'ni-ni'] as const;
export type Quadrant = (typeof QUADRANTS)[number];
export const ATTENDU_Q: Record<string, Quadrant> = {
  'Corriger le formulaire casse': 'urgent-important',
  'Preparer la notice benevole': 'important-non-urgent',
  'Repondre a la demande d horaire': 'urgent-non-important',
  "Refaire un logo non demande": 'ni-ni',
  'Relire l agenda des activites': 'important-non-urgent',
  'Repondre au sondage du bureau': 'urgent-non-important',
};
export const NOMS_QUADRANTS: Record<Quadrant, string> = {
  'urgent-important': 'Urgent et important', 'important-non-urgent': 'Important, peu urgent',
  'urgent-non-important': 'Urgent, peu important', 'ni-ni': 'Ni urgent ni important',
};
export type QState = { place: Record<string, Quadrant> };
export type QAction = { type: 'place'; tache: string; q: Quadrant } | { type: 'reset' };
export function reduceQ(s: QState, a: QAction): QState;
export function verifierQ(s: QState): { ok: boolean; messages: string[] };
// messages courts avec annonce du quadrant et motif, pas de piege.
```

**Etapes CDC 15.6 :** 1 six taches a placer ; 2 deplacement souris ou clavier ; 3 quadrant affiche apres depot avec motif court ; 4 vue risques (labo separe) ; 5 priorites et parades ; 6 validation xp (id 'm6-eisenhower').

**Steps:**

- [ ] **Step 1: tests/labos/eisenhower.test.ts (echec puis PASS)**

```ts
import { describe, it, expect } from 'vitest';
import { reduceQ, verifierQ, ATTENDU_Q, TACHES, QUADRANTS, initialState as initE } from '../../src/labos/LaboEisenhower';

describe('reduceQ', () => {
  it('met une tache dans un quadrant', () => {
    const s = reduceQ(initE(), { type: 'place', tache: TACHES[0], q: 'urgent-important' });
    expect(s.place[TACHES[0]]).toBe('urgent-important');
  });
});

describe('verifierQ', () => {
  it('ok quand tout est bien place', () => {
    let s = initE();
    for (const t of TACHES) s = reduceQ(s, { type: 'place', tache: t, q: ATTENDU_Q[t] });
    expect(verifierQ(s).ok).toBe(true);
  });
  it('pas ok au depart et messages par tache', () => {
    const r = verifierQ(initE());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(TACHES.length);
  });
  it('QUADRANTS a 4 cles', () => expect(QUADRANTS.length).toBe(4));
});
```

- [ ] **Step 2: implementer le composant (grille 2x2 en HTML boutons, motif sous le nom de quadrant, XP). Pattern des labos (a7).**

- [ ] **Step 3: tests + build + commit**

```bash
git add src tests && git commit -m "feat: labo eisenhower placable avec motifs quadrants"
```

### Task 33: LaboRisques + integration

**Files:**
- Create: `src/labos/LaboRisques.tsx`
- Test: `tests/labos/risques.test.ts`
- Modify: `src/modules/m6-equipe/index.tsx`

**Interfaces :**

```ts
export interface RISQUE_D = { nom: string; proba: 1 | 2 | 3; impact: 1 | 2 | 3; parade: string };
export const RISQUES: RISQUE_D[] = [
  { nom: 'Benevole indisponible avant la mise en ligne', proba: 2, impact: 3, parade: 'Benevole de rechange fictif' },
  { nom: 'Photos non recues', proba: 3, impact: 2, parade: 'Jeu de photos locales de rechange' },
  { nom: 'Agenda du site vide au tournant', proba: 2, impact: 2, parade: 'Relancer le bureau fictif avant le jalon' },
  { nom: 'Domaine du site expire', proba: 1, impact: 3, parade: 'Renouveler des maintenant et le noter' },
  { nom: 'Notice des benevoles non ecrite', proba: 3, impact: 3, parade: 'Temps dedie en retro prevue' },
  { nom: 'Formulaire non teste', proba: 2, impact: 1, parade: 'Passer par la chaine CI du module 5' },
];
export type RisquesState = { place: Record<string, string>; parades: Record<string, string | null> };
export type RisquesAction = { type: 'place'; risque: string; cell: string } | { type: 'parade'; risque: string; valeur: string | null } | { type: 'reset' };
// cell = `p{proba}-i{impact}` (9 cellules).
export function reduceR(s: RisquesState, a: RisquesAction): RisquesState;
export function priorites(s: RisquesState): Array<{ nom: string; score: number }>;  // proba*impact descend
export function verifierRisques(s: RisquesState): { ok: boolean; messages: string[] };
// ok si chaque risque est place dans la bonne cellule et si les risques majeurs (score >= 6) ont une parade choisie.
```

**Etapes :** 1 six risques ; 2 placer sur la grille proba x impact ; 3 priorites calculees localement ; 4 parades a choisir pour les majeurs ; 5 relire ; 6 validation XP (id 'm6-risques').

**Steps:**

- [ ] **Step 1: tests/labos/risques.test.ts (echec puis PASS)**

```ts
import { describe, it, expect } from 'vitest';
import { reduceR, priorites, verifierRisques, RISQUES, initialState as initR } from '../../src/labos/LaboRisques';

describe('reduceR / priorites / verifierRisques', () => {
  it('place un risque dans la bonne cellule', () => {
    const s = reduceR(initR(), { type: 'place', risque: RISQUES[0].nom, cell: 'p2-i3' });
    expect(s.place[RISQUES[0].nom]).toBe('p2-i3');
  });
  it('priorites calculees proba x impact triees descendantes', () => {
    let s = initR();
    for (const r of RISQUES) s = reduceR(s, { type: 'place', risque: r.nom, cell: `p${r.proba}-i${r.impact}` });
    const py = priorites(s);
    expect(py[0].score).toBeGreaterThanOrEqual(py[py.length - 1].score);
  });
  it('valider quand tout est bien place avec parades majeures', () => {
    let s = initR();
    for (const r of RISQUES) {
      s = reduceR(s, { type: 'place', risque: r.nom, cell: `p${r.proba}-i${r.impact}` });
      if (r.proba * r.impact >= 6) s = reduceR(s, { type: 'parade', risque: r.nom, valeur: r.parade });
    }
    expect(verifierRisques(s).ok).toBe(true);
  });
  it('majeur sans parade produit un message', () => {
    let s = initR();
    for (const r of RISQUES) s = reduceR(s, { type: 'place', risque: r.nom, cell: `p${r.proba}-i${r.impact}` });
    const r = verifierRisques(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/parade/i);
  });
});
```

- [ ] **Step 2: implementer le composant (grille 3x3 en HTML boutons, parades proposees parmi 3 fictives par risque majeur dont une correcte, XP).**

- [ ] **Step 3: tests + build + commit**

```bash
git add src tests && git commit -m "feat: labo risques avec matrice priorites calculees parades majeures"
```

### Task 34: gate fin de Jalon 6

- [ ] lint/test/build/smoke/Lighthouse : OK, commit `test: gate jalon 6`.

---

# Jalon 7 : a-propos, PWA, sitemap, audit final et depot

### Task 35: page a-propos + route + footer verifie

**Files:**
- Create: `src/routes/Apropos.tsx`
- Modify: `src/App.tsx` (route `/a-propos`), `src/components/Footer.tsx` (lien interne NavLink au lieu d'un `<a href>` complet)

**Steps:**

- [ ] **Step 1: ecrire src/routes/Apropos.tsx**

```tsx
import { SeoHead } from '../components/SeoHead';

export default function Apropos() {
  return (
    <>
      <SeoHead title="A propos" description="Gestion de Projet IT : cours interactif realise par Geoffroy avec assistance IA, licence AGPL-3.0-or-later, sans compte ni cookie." />
      <h1>A propos du projet</h1>
      <p><strong>Gestion de Projet IT, Methodologies et Equipes.</strong> Un cours interactif en 6 modules : cadrer et decouper, planifier, choisir sa methode, agiles, outils CI/CD, equipe et risques.</p>
      <h2>Paternite</h2>
      <p>Realise par Geoffroy avec assistance IA.</p>
      <h2>Liens et licences</h2>
      <p>Licence AGPL-3.0-or-later. Le code source est disponible dans le depot du projet.</p>
      <h2>Donnees et vie privee</h2>
      <p>L'application fonctionne 100 percent cote navigateur : aucun compte, aucun cookie, aucune donnee sortante. La progression est stockee localement (cles gestion-projet-it:*), exportable et importable en JSON.</p>
      <h2>Le fil rouge</h2>
      <p>Un seul cas fictif soutient les 6 modules : la refonte du site de l'association fictive Les Amis du Square (pages de presentation, agenda des activites, formulaire de contact fictif). Tous les exemples restent fictifs.</p>
      <h2>A venir</h2>
      <p>Trois modules prolongent le cours plus tard : parties prenantes et communication, budget et chiffrage, conduite du changement.</p>
    </>
  );
}
```

- [ ] **Step 2: brancher la route et corriger le Footer**

```tsx
// App.tsx : import Apropos depuis './routes/Apropos' ; <Route path="/a-propos" element={<Apropos />} />
// Footer.tsx : remplacer <a href="/gestion-projet-it/a-propos"> par <Link to="/a-propos"> (import Link de react-router-dom).
```

- [ ] **Step 3: build + commit**

Run: `npm run lint && npm run build && npm test` : OK.

```bash
git add src && git commit -m "feat: page a propos paternite licence donnees locales fil rouge"
```

### Task 36: PWA (manifest, icones, service worker, offline)

**Files:**
- Create: `public/manifest.webmanifest`, `public/favicon.svg`, `public/icon-192.svg`, `public/icon-512.svg`, `public/sw.js`, `public/offline.html`
- Modify: `src/main.tsx` (enregistrement du SW)

**Steps:**

- [ ] **Step 1: ecrire public/manifest.webmanifest**

```json
{
  "id": "/gestion-projet-it/",
  "name": "Gestion de Projet IT",
  "short_name": "GPI-IT",
  "scope": "/gestion-projet-it/",
  "start_url": "/gestion-projet-it/",
  "display": "standalone",
  "background_color": "#fafaf7",
  "theme_color": "#1d4ed8",
  "lang": "fr",
  "icons": [
    { "src": "/gestion-projet-it/icon-192.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" },
    { "src": "/gestion-projet-it/icon-512.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "maskable" }
  ]
}
```

- [ ] **Step 2: ecrire public/favicon.svg et les 2 icones (dessin simple du fil rouge : un noeud et une barre)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#fafaf7"/>
  <path d="M12 44 V20 Q12 14 18 14 H46 Q52 14 52 20 V34 Q52 40 46 40 H30" fill="none" stroke="#1d4ed8" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
  <rect x="18" y="24" width="24" height="9" rx="4.5" fill="#a7c4b5"/>
</svg>
```

`public/icon-192.svg` et `public/icon-512.svg` : memes formes avec dimensions 192 et 512 (width/height dans le svg, fond plein).

- [ ] **Step 3: ecrire public/sw.js (cache-first assets, network-first index.html avec fallback offline.html)**

```js
const BASE = '/gestion-projet-it/';
const version = 'v1';
const precache = [
  `${BASE}`, `${BASE}offline.html`, `${BASE}manifest.webmanifest`,
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(version).then((c) => c.addAll(precache)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== version).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (!url.pathname.startsWith(BASE)) return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(`${BASE}offline.html`)));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((rep) => {
    const copie = rep.clone();
    caches.open(version).then((c) => c.put(e.request, copie));
    return rep;
  })));
});
```

- [ ] **Step 4: ecrire public/offline.html (noindex, contenu court en francais, hors ligne)**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="robots" content="noindex"/>
    <title>Hors ligne : Gestion de Projet IT</title>
    <style>body{font-family:system-ui,sans-serif;background:#fafaf7;color:#14161f;max-width:36rem;margin:3rem auto;padding:0 1rem}h1{font-size:1.3rem}a{color:#1d4ed8}</style>
  </head>
  <body>
    <h1>Hors ligne</h1>
    <p>Cette page n'est pas encore en cache. Reessaye une fois la connexion revenue, les pages visitees restent accessibles hors ligne.</p>
    <p><a href="/gestion-projet-it/">Retour a l'accueil du cours</a></p>
  </body>
</html>
```

- [ ] **Step 5: enregistrer le SW dans src/main.tsx + lier le manifest dans index.html**

```tsx
// main.tsx, apres render :
if ('serviceWorker' in navigator && window.location.pathname.startsWith('/gestion-projet-it/')) {
  navigator.serviceWorker.register('/gestion-projet-it/sw.js');
}
// index.html <head> : <link rel="manifest" href="/gestion-projet-it/manifest.webmanifest" /> et <meta name="theme-color" content="#1d4ed8" />
```

- [ ] **Step 6: verifier en navigation puis build + commit**

Run: `npm run build && npm run preview` puis verifier (F12) : manifest charge, sw registered, l'onglet reseau en offline affiche offline.html sur une nouvelle navigation.

```bash
git add public src index.html && git commit -m "feat: pwa manifest icones locales sw offline html"
```

### Task 37: sitemap.xml et robots.txt (8 URL)

**Files:**
- Create: `public/sitemap.xml`, `public/robots.txt`

**Steps:**

- [ ] **Step 1: ecrire public/sitemap.xml (8 URL : accueil, 6 modules, a-propos)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://hylst.fr/gestion-projet-it/</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-1</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-2</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-3</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-4</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-5</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/module-6</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/a-propos</loc></url>
</urlset>
```

- [ ] **Step 2: ecrire public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://hylst.fr/sitemap.xml
```

- [ ] **Step 3: build + commit**

```bash
git add public && npm run build && git commit -m "feat: sitemap 8 url et robots txt"
```

### Task 38: audit final, build verifie, consignes de depot Docker (supervise)

**Files:**
- Modify: aucun dans ce depot (le depot se fait dans le deploiement, hors ce repo)

**Steps:**

- [ ] **Step 1: tous les checks**

Run: `npm run lint && npm test && npm run build && npm run smoke`
Expected: 0 erreur, tous les tests PASS.

- [ ] **Step 2: grep securite (les sources ne contiennent aucune cle ni pointage externe)**

Run: `grep -rInE "https?://" src | grep -v "hylst.fr\\|localhost\\|127.0.0.1\\|w3.org" || echo RIEN`
Expected: RIEN (valide le 0 requete externe dans le code source).

- [ ] **Step 3: verifier dist (contenu et taille)**

Run: `ls dist && du -sh dist`
Expected: index.html, assets/ (2 a 5 fichiers js/css), favicon.svg, manifest, sw.js, offline.html, sitemap.xml, robots.txt, icones.

- [ ] **Step 4: Lighthouse accueil + une page recu type**

Run: `npx lighthouse http://localhost:4173/ --only-categories=performance,accessibility --quiet --chrome-flags="--headless"`
Expected: >= 90 sur les 2 categories (mobile).

- [ ] **Step 5: consignes de depot (a faire sous supervision de l'utilisateur, hors ce repo)**

Le depot regroupe en un seul push : Docker/gestion-projet-it/ (build) + carte hub + sitemap racine + robots.txt + modal A venir (retirer l'entree du module) :
1. Copier le contenu de `dist/` vers `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/` (remplacer).
2. Dans le depot Docker : activer la carte hub Bloc 3 (retirer le badge Bientot et le fond grise en meme temps).
3. Ajouter l'URL du module au sitemap racine et robots.txt du site.
4. Retirer l'entree du module depuis la modal "A venir" du hub.
5. Un seul push pour tout, puis reload la page du hub pour verifier.
6. Apres la mise en ligne : soumettre le sitemap racine dans Search Console (et re-soumettre apres agregation).

NB: ne rien deposer avant d avoir les checks ci dessus au vert (smoke et Lighthouse).

- [ ] **Step 6: commit final**

```bash
git add -A && git commit -m "chore: build v1 verifie pret pour depot docker"
```

---

## Appendice : revue du plan (spec coverage)

| Exigence CDC / design | Tache |
|---|---|
| 6 modules en ligne, gabarit CDC section 10 | T12, T15, T19, T23, T27, T31 |
| Quiz 3 questions, corrige immediat, +10 XP des 2/3, gain unique | T4, T10 (QuizBlock), quiz CDC verbatim par module |
| Exercices corriges (enonce, corrige masque, methode) | T10 (ExerciseBlock), T12, T15, T19, T23, T27, T31 |
| Fiches reflexes imprimables (5 items) | T10 (FicheReflexe), contenu par module |
| 10 labos SVG interactifs, clavier complet, +5 XP une fois | T7 (LaboFrame), T13, T16, T20, T24, T25, T28, T29, T32, T33 |
| Fil rouge Les Amis du Square sur les 6 modules | T11 (fil rouge accueil), contenu de chaque module |
| Comparateur a 3 entrees, Eisenhower placable, matrice risques, WIP Kanban, chaine CI, selecteur outil | T21, T32, T33, T24, T29, T28 |
| XP, niveaux 0/50/120/200, badges, export/import JSON | T4, T9 |
| Recherche en entete | T8 |
| Animations hero/reveal/transitions, prefers-reduced-motion | T2 (CSS), T5 (hooks), T11 (hero) |
| PWA, offline.html noindex, SW scope dossier | T36 |
| canonical + og:url par route | T6 (SeoHead) |
| Sitemap 8 URL, robots.txt | T37 |
| Smoke Playwright (clic + reload, 0 console, 0 externe) | T7 puis gates T14, T17, T22, T26, T30, T34, T38 |
| Lighthouse accueil mobile >= 90 | gates (T14..T38) |
| Fix CDC ligne 324 | T18 |
| Modules v2 A/B/C en Bientot | T7 (FUTURE_MODULES), T11 (cartes) |
| A-propos paternite AGPL | T35 |
| Depot Docker un seul push (hors repo, supervise) | T38 Step 5 |

## Notes pour les implementateurs

- Les codes des labos dans ce plan sont la reference a copier puis corriger du premier coup ; les notes "Correction implicite" signalent les glissements de nommage a appliquer avant commit (noms unifies en verifier.* : verifierGantt, verifierPERT, compteEnCours, reducKanban, rejouer, reduireGantt).
- Chaque gate de jalon (Task 14, 17, 22, 26, 30, 34, 38) exige lint + tests + build + smoke + Lighthouse avant commit.
- Le contenu editorial (quiz/motifs/exercices) est transcrit du CDC : ne pas improviser des chiffres ni des temoignages ; les outils reels sont cites a titre informatif uniquement.
- Aucun tiret cadratin dans les textes ; preferer le point-virgule ou la parenthese.
- Le plan maintient les labos en boutons HTML interactifs avec SVG decoratif et jamais un SVG comme seul element cliquable : conformite aux exigences clavier/AA du CDC.


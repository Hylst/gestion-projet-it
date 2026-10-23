# Section Gestion de projet et IA - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une section autonome « Gestion de projet et IA » au cours existant, avec un hub et quatre pages thématiques, sans dixième module, sans XP et sans modification de la progression.

**Architecture:** Un registre `src/ia/pages.ts` décrit les cinq routes et leurs sections. Un gabarit `IaLayout` porte le SEO, le sommaire, les encarts, la checklist, les sources et la pagination. Les cinq pages de contenu vivent dans `src/ia/content/` et composent le gabarit. La recherche globale et le glossaire sont étendus sans dupliquer leurs interfaces.

**Tech Stack:** Vite, React 18, TypeScript strict, React Router 7, CSS existant, Vitest, Testing Library, Playwright, Lighthouse.

## Global Constraints

- Worktree : `D:\0CODE\OpenCode\gestion-projet-it\.worktrees\angles-morts`, branche `angles-morts`, HEAD `8e16105`.
- Ne pas créer un nouveau worktree depuis HEAD : le capstone et le lot « angles morts » sont non commités dans ce worktree.
- Ne pas committer, pousser, livrer Docker ni modifier le dépôt `D:\0CODE\AntiGravity\Cours_Memos\Docker` sans accord explicite.
- Ne pas modifier `src/lib/xp.ts`, `src/lib/progress.tsx`, le compteur `0/9`, la clé `gestion-projet-it:xp`, le capstone `/dossier-projet` ni les neuf modules.
- Ne pas modifier les fichiers déjà modifiés par le lot « angles morts » et le capstone hors des points d’intégration listés dans ce plan.
- Aucune dépendance nouvelle, aucun backend, aucun cookie, aucune requête externe, aucune ressource distante, aucun analytics.
- Cinq routes : `/ia`, `/ia/usages`, `/ia/methodes`, `/ia/outils-configuration`, `/ia/gouvernance`.
- Le routeur garde `basename="/gestion-projet-it/"` et le build garde `--base=/gestion-projet-it/`.
- Charte : accents, apostrophe `’`, `&nbsp;` avant `: ; ? !`, guillemets français avec `&nbsp;` à l’intérieur (`«&nbsp;...&nbsp;»`), aucun tiret cadratin dans les textes rédigés.
- Les guillemets des briefs sont des citations éditoriales : dans le JSX, écrire `«&nbsp;` et `&nbsp;»`, ou reformuler sans guillemets. Le test `tests/typo.test.tsx` refuse les espaces simples à l’intérieur des guillemets.
- Sources : uniquement des références officielles et datées, veille arrêtée en octobre 2026, aucun chiffre sans source, aucun conseil juridique personnalisé.
- Le service worker passe en `gestion-projet-it-v5`, le sitemap contient les cinq routes IA, le smoke couvre 18 routes.
- Tests : `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`. Smoke : preview puis `SMOKE_BASE_URL` si le port 4173 est occupé.
- Lighthouse : le CLI peut sortir en code 1 sur Windows (`EPERM` de nettoyage du profil) ; lire les scores dans le JSON produit.
- Aucune étape de commit dans ce plan. Les checkpoints sont les tests, le lint, le typecheck et le build.

## File Structure

Créer :

- `src/ia/pages.ts` : registre typé des cinq pages et de leurs sections.
- `src/ia/sources.ts` : cinq sources officielles datées.
- `src/ia/IaChecklist.tsx` : liste de contrôle accessible.
- `src/ia/IaCallout.tsx` : encart éditorial réutilisable.
- `src/ia/IaLayout.tsx` : gabarit commun (SEO, sommaire, repères, checklist, sources, pagination).
- `src/ia/content/Hub.tsx` : page `/ia`.
- `src/ia/content/Usages.tsx` : page `/ia/usages`.
- `src/ia/content/Methodes.tsx` : page `/ia/methodes`.
- `src/ia/content/OutilsConfiguration.tsx` : page `/ia/outils-configuration`.
- `src/ia/content/Gouvernance.tsx` : page `/ia/gouvernance`.
- `src/styles/ia.css` : styles de la section et de la carte d’accueil.
- `tests/ia.test.tsx` : registre, gabarit, pages, glossaire, sitemap.

Modifier :

- `src/App.tsx` : cinq routes.
- `src/components/SiteHeader.tsx` : lien « IA ».
- `src/routes/accueil.tsx` : section après le capstone, import de `ia.css`.
- `src/lib/search.ts` : index modules + IA, union discriminée.
- `src/components/SearchBar.tsx` : navigation par `path`.
- `src/lib/glossaire.ts` : dix termes IA et lien optionnel.
- `src/routes/Glossaire.tsx` : rendu du lien de section.
- `public/sitemap.xml` : cinq URL.
- `public/sw.js` : version `v5`.
- `smoke/smoke.spec.ts` : 18 routes, version `v5`, parcours IA.
- `tests/search.test.ts` : assertions sur l’union.
- `tests/glossaire.test.ts` : dix termes et liens.
- `tests/header.test.tsx` : lien IA et état actif.
- `tests/typo.test.tsx` : cinq pages dans la vérification de charte.

Ne pas modifier :

- `src/modules/**`, `src/lib/capstone*`, `src/routes/DossierProjet.tsx`, `src/styles/capstone.css`.
- `public/manifest.webmanifest`, les icônes, `offline.html`, `robots.txt`.
- `vite.config.ts`, `package.json`, `tsconfig.json`, `eslint.config.js`, sauf nécessité démontrée par un test.

---

### Task 1: Registre, sources et gabarit

**Files:**
- Create: `src/ia/pages.ts`
- Create: `src/ia/sources.ts`
- Create: `src/ia/IaChecklist.tsx`
- Create: `src/ia/IaCallout.tsx`
- Create: `src/ia/IaLayout.tsx`
- Create: `src/styles/ia.css`
- Create: `tests/ia.test.tsx`

**Interfaces:**
- Produit : `IA_PAGES: readonly IaPageMeta[]`, `SOURCES`, `IaLayout`, `IaChecklist`, `IaCallout`.
- Consomme : `SeoHead`, `react-router-dom`.
- Consommé par : les cinq pages, `src/App.tsx`, `src/lib/search.ts`, `tests/ia.test.tsx`.

- [ ] **Step 1: Écrire le test du registre et du gabarit**

Créer `tests/ia.test.tsx` avec ce contenu initial :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { IA_PAGES, type IaPageMeta } from '../src/ia/pages';
import { SOURCES } from '../src/ia/sources';
import { IaLayout } from '../src/ia/IaLayout';

afterEach(() => {
  cleanup();
  document.title = '';
  document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], link[rel="canonical"]').forEach((el) => el.remove());
});

const rendre = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const page = (slug: string): IaPageMeta => {
  const meta = IA_PAGES.find((candidate) => candidate.slug === slug);
  if (!meta) throw new Error(`Page IA absente\u00A0: ${slug}`);
  return meta;
};

describe('registre IA', () => {
  it('contient cinq pages uniques et completes', () => {
    expect(IA_PAGES).toHaveLength(5);
    expect(new Set(IA_PAGES.map((p) => p.slug)).size).toBe(5);
    expect(new Set(IA_PAGES.map((p) => p.path)).size).toBe(5);
    for (const p of IA_PAGES) {
      expect(p.path.startsWith('/ia')).toBe(true);
      expect(p.description.length).toBeLessThan(160);
      expect(p.sections.length).toBeGreaterThanOrEqual(5);
      expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    }
  });
});

describe('gabarit IA', () => {
  const meta = page('ia');

  it('rend le titre, le sommaire, les ancres et les reperes', () => {
    const { container } = rendre(
      <IaLayout
        meta={meta}
        intro="Introduction de test."
        retenir={['Point un.']}
        checklist={['Item un.']}
        sources={[SOURCES.aiAct, SOURCES.cnil, SOURCES.nist]}
      >
        {meta.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.label}</h2>
            <p>Contenu.</p>
          </section>
        ))}
      </IaLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: meta.titre })).not.toBeNull();
    const nav = screen.getByRole('navigation', { name: 'Sommaire de la page' });
    for (const section of meta.sections) {
      expect(nav.querySelector(`a[href="#${section.id}"]`)?.textContent).toBe(section.label);
      expect(document.getElementById(section.id)).not.toBeNull();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'À retenir' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Checklist' })).not.toBeNull();
    expect(screen.getByText('Veille arrêtée en octobre 2026.')).not.toBeNull();
    const sources = Array.from(container.querySelectorAll('.ia-sources a'));
    expect(sources).toHaveLength(3);
    for (const source of sources) {
      expect(source.getAttribute('target')).toBe('_blank');
      expect(source.getAttribute('rel')).toBe('noopener noreferrer');
    }
    expect(container.querySelectorAll('img, iframe, script, video')).toHaveLength(0);
  });

  it('propose le lien suivant et aucun precedent sur le hub', () => {
    rendre(
      <IaLayout meta={meta} intro="Intro." retenir={['Un.']} checklist={['Un.']} sources={[SOURCES.aiAct]}>
        <section id="pourquoi"><h2>Pourquoi</h2></section>
      </IaLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Navigation dans la section IA' });
    expect(nav.querySelector('a[href="/ia"]')).toBeNull();
    expect(nav.querySelector('a[href="/ia/usages"]')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/pages`, `../src/ia/sources` ou `../src/ia/IaLayout`.

- [ ] **Step 3: Implémenter le registre**

Créer `src/ia/pages.ts` :

```ts
export interface IaPageSection {
  id: string;
  label: string;
}

export interface IaPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
  sections: readonly IaPageSection[];
  motsCles?: readonly string[];
}

export const IA_PAGES: readonly IaPageMeta[] = [
  {
    slug: 'ia',
    path: '/ia',
    titre: 'Gestion de projet et IA',
    titreCourt: 'Introduction',
    description: 'IA et gestion de projet\u00A0: usages par phase, méthodes, outils, configuration et gouvernance, avec des repères concrets pour étudiants et juniors.',
    resume: 'Un panorama raisonné de l’IA comme outil du chef de projet, sans dogme ni recette magique.',
    sections: [
      { id: 'pourquoi', label: 'Pourquoi l’IA entre dans le projet' },
      { id: 'fait-bien', label: 'Ce que l’IA fait bien' },
      { id: 'ne-fait-pas', label: 'Ce qu’elle ne fait pas' },
      { id: 'cinq-questions', label: 'Cinq questions avant de l’utiliser' },
      { id: 'carte-usages', label: 'Carte des usages' },
      { id: 'suite', label: 'La suite de la section' },
    ],
    motsCles: ['intelligence artificielle', 'ia generative', 'assistant', 'prompt', 'limites', 'esprit critique'],
  },
  {
    slug: 'ia/usages',
    path: '/ia/usages',
    titre: 'Usages de l’IA par phase de projet',
    titreCourt: 'Usages',
    description: 'Usages de l’IA en gestion de projet\u00A0: cadrage, planification, exécution, qualité, communication et changement, avec les points de contrôle humains.',
    resume: 'Ce que l’IA peut préparer à chaque phase, et ce qu’il faut vérifier avant de s’en servir.',
    sections: [
      { id: 'cadrage', label: 'Cadrage et besoin' },
      { id: 'planification', label: 'Planification et découpage' },
      { id: 'execution', label: 'Exécution et suivi' },
      { id: 'qualite', label: 'Qualité et tests' },
      { id: 'communication', label: 'Communication et changement' },
      { id: 'humain', label: 'Ce qui reste humain' },
    ],
    motsCles: ['usages', 'cadrage', 'planification', 'qualite', 'tests', 'communication', 'changement', 'human in the loop'],
  },
  {
    slug: 'ia/methodes',
    path: '/ia/methodes',
    titre: 'Méthodes et évaluation',
    titreCourt: 'Méthodes',
    description: 'Méthodes pour utiliser l’IA en projet\u00A0: prompts, contexte, RAG, sorties structurées, évaluation, agents et rituel d’équipe.',
    resume: 'Des gestes reproductibles pour obtenir des sorties utiles, vérifiables et comparables.',
    sections: [
      { id: 'prompt', label: 'Du besoin au prompt' },
      { id: 'contexte', label: 'Recherche documentaire et RAG' },
      { id: 'sortie', label: 'Sorties structurées et vérifiables' },
      { id: 'evaluation', label: 'Évaluation et jeu de test' },
      { id: 'agents', label: 'Agents et automatisations' },
      { id: 'rituel', label: 'Un rituel d’équipe' },
    ],
    motsCles: ['prompt', 'contexte', 'rag', 'evaluation', 'jeu de test', 'agent', 'automatisation', 'human in the loop'],
  },
  {
    slug: 'ia/outils-configuration',
    path: '/ia/outils-configuration',
    titre: 'Outils, environnement et configuration',
    titreCourt: 'Outils',
    description: 'Outils et configuration de l’IA en projet\u00A0: catégories, environnement, paramètres, données, confidentialité et choix raisonné.',
    resume: 'Choisir un outil, régler ce qui compte et organiser un environnement de travail traçable.',
    sections: [
      { id: 'categories', label: 'Catégories d’outils' },
      { id: 'environnement', label: 'Environnement de travail' },
      { id: 'parametres', label: 'Paramètres qui comptent' },
      { id: 'donnees', label: 'Données et confidentialité' },
      { id: 'choisir', label: 'Choisir sans se disperser' },
    ],
    motsCles: ['outils', 'environnement', 'configuration', 'parametres', 'donnees', 'confidentialite', 'local', 'api'],
  },
  {
    slug: 'ia/gouvernance',
    path: '/ia/gouvernance',
    titre: 'Gouvernance, risques et qualité',
    titreCourt: 'Gouvernance',
    description: 'Gouvernance de l’IA en projet\u00A0: cadre, droit, AI Act, risques, sécurité, fournisseurs, preuves et revue.',
    resume: 'Encadrer les usages, tenir les risques et garder des preuves sans alourdir le projet.',
    sections: [
      { id: 'cadre', label: 'Un cadre avant l’outil' },
      { id: 'droit', label: 'Droit, données et AI Act' },
      { id: 'risques', label: 'Risques et qualité' },
      { id: 'propriete', label: 'Sécurité et propriété intellectuelle' },
      { id: 'fournisseurs', label: 'Fournisseurs et dépendance' },
      { id: 'preuves', label: 'Preuves et revue' },
    ],
    motsCles: ['gouvernance', 'risques', 'qualite', 'ai act', 'rgpd', 'donnees personnelles', 'propriete intellectuelle', 'fournisseur', 'audit', 'hallucination'],
  },
];
```

- [ ] **Step 4: Implémenter les sources**

Créer `src/ia/sources.ts` :

```ts
export interface IaSource {
  organisme: string;
  titre: string;
  version: string;
  url: string;
}

export const SOURCES = {
  aiAct: {
    organisme: 'Union européenne',
    titre: 'règlement sur l’intelligence artificielle',
    version: 'Règlement (UE) 2024/1689',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj',
  },
  cnil: {
    organisme: 'CNIL',
    titre: 'intelligence artificielle',
    version: 'page de référence, consultée en octobre 2026',
    url: 'https://www.cnil.fr/fr/intelligence-artificielle',
  },
  nist: {
    organisme: 'NIST',
    titre: 'AI Risk Management Framework',
    version: 'NIST AI 100-1, 2023',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
  },
  iso42001: {
    organisme: 'ISO',
    titre: 'ISO/IEC 42001:2023, systèmes de management de l’IA',
    version: '2023',
    url: 'https://www.iso.org/standard/42001',
  },
  oecd: {
    organisme: 'OCDE',
    titre: 'principes sur l’intelligence artificielle',
    version: 'mis à jour en 2024',
    url: 'https://www.oecd.org/fr/ia/principes/',
  },
} satisfies Record<string, IaSource>;
```

- [ ] **Step 5: Implémenter la checklist et l’encart**

Créer `src/ia/IaChecklist.tsx` :

```tsx
export function IaChecklist({ titre = 'Checklist', items }: { titre?: string; items: readonly string[] }) {
  return (
    <section className="ia-checklist" aria-labelledby="ia-checklist-titre">
      <h2 id="ia-checklist-titre">{titre}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
```

Créer `src/ia/IaCallout.tsx` :

```tsx
import type { ReactNode } from 'react';

export function IaCallout({ titre, variante = 'note', children }: { titre: string; variante?: 'note' | 'fil' | 'limite'; children: ReactNode }) {
  return (
    <aside className={`ia-callout ia-callout--${variante}`} aria-label={titre}>
      <p className="ia-callout-titre">{titre}</p>
      {children}
    </aside>
  );
}
```

- [ ] **Step 6: Implémenter le gabarit**

Créer `src/ia/IaLayout.tsx` :

```tsx
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { IaChecklist } from './IaChecklist';
import { IA_PAGES, type IaPageMeta } from './pages';
import type { IaSource } from './sources';

export interface IaLayoutProps {
  meta: IaPageMeta;
  intro: ReactNode;
  retenir: readonly string[];
  checklist: readonly string[];
  checklistTitre?: string;
  sources: readonly IaSource[];
  children: ReactNode;
}

export function IaLayout({ meta, intro, retenir, checklist, checklistTitre, sources, children }: IaLayoutProps) {
  const index = IA_PAGES.findIndex((page) => page.slug === meta.slug);
  const precedent = index > 0 ? IA_PAGES[index - 1] : undefined;
  const suivant = index >= 0 && index < IA_PAGES.length - 1 ? IA_PAGES[index + 1] : undefined;
  return (
    <article className="ia-page">
      <SeoHead title={meta.titre} description={meta.description} />
      <header className="ia-hero">
        <p className="kicker">Section IA</p>
        <h1>{meta.titre}</h1>
        <p className="accroche">{intro}</p>
        <nav className="ia-sommaire" aria-label="Sommaire de la page">
          {meta.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>{section.label}</a>
          ))}
        </nav>
      </header>
      {children}
      <aside className="ia-callout ia-callout--retenir" aria-labelledby="ia-retenir-titre">
        <h2 id="ia-retenir-titre">À retenir</h2>
        <ul>
          {retenir.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </aside>
      <IaChecklist titre={checklistTitre} items={checklist} />
      <section className="ia-sources" aria-labelledby="ia-sources-titre">
        <h2 id="ia-sources-titre">Sources et veille</h2>
        <p>Veille arrêtée en octobre 2026.</p>
        <ul>
          {sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.organisme}&nbsp;: {source.titre}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>{' '}
              <span>({source.version})</span>
            </li>
          ))}
        </ul>
      </section>
      <nav className="ia-pager" aria-label="Navigation dans la section IA">
        {precedent ? <Link to={precedent.path}>Précédent&nbsp;: {precedent.titreCourt}</Link> : <span aria-hidden="true" />}
        {suivant ? <Link to={suivant.path}>Suivant&nbsp;: {suivant.titreCourt}</Link> : <span aria-hidden="true" />}
      </nav>
    </article>
  );
}
```

- [ ] **Step 7: Ajouter les styles**

Créer `src/styles/ia.css` :

```css
.ia-page { max-width: 52rem; margin: 0 auto; }
.ia-hero { margin-bottom: 1.5rem; }
.ia-hero .kicker { margin-bottom: 0.4rem; }
.ia-hero h1 { margin-top: 0; }
.ia-sommaire { display: flex; flex-wrap: wrap; gap: 0.4rem 0.9rem; margin: 1rem 0 1.5rem; padding: 0.7rem 0.9rem; border: 1px solid var(--c-line); border-radius: var(--radius); background: var(--c-surface); font-size: 0.92rem; }
.ia-sommaire a { color: var(--c-main-ink); }
.ia-page h2 { margin-top: 1.8rem; }
.ia-page section { scroll-margin-top: 5rem; }
.ia-table-wrap { overflow-x: auto; margin: 1rem 0; border: 1px solid var(--c-line); border-radius: var(--radius); }
.ia-table-wrap table { width: 100%; min-width: 38rem; border-collapse: collapse; background: var(--c-surface); font-size: 0.95rem; }
.ia-table-wrap caption { caption-side: top; text-align: left; padding: 0.8rem 0.9rem; font-weight: 700; }
.ia-table-wrap th, .ia-table-wrap td { padding: 0.65rem 0.8rem; border-bottom: 1px solid var(--c-line); vertical-align: top; text-align: left; }
.ia-table-wrap th { background: var(--c-soft); }
.ia-callout { margin: 1.4rem 0; padding: 1rem 1.1rem; border-left: 4px solid var(--c-main); border-radius: 0 var(--radius) var(--radius) 0; background: var(--c-surface); }
.ia-callout--limite { border-left-color: var(--c-warn, #b45309); }
.ia-callout--retenir { border-left-color: var(--c-calm); }
.ia-callout-titre { margin: 0 0 0.3rem; font-weight: 700; }
.ia-callout p:last-child, .ia-callout ul:last-child { margin-bottom: 0; }
.ia-checklist { margin: 1.6rem 0; padding: 1rem 1.1rem; border: 1px solid var(--c-line); border-radius: var(--radius); background: var(--c-surface); }
.ia-checklist ul { margin-bottom: 0; }
.ia-sources { margin-top: 2rem; font-size: 0.92rem; }
.ia-sources ul { padding-left: 1.1rem; }
.ia-pager { display: flex; justify-content: space-between; gap: 1rem; margin: 2rem 0; padding-top: 1rem; border-top: 1px solid var(--c-line); }
.ia-carte { list-style: none; margin: 1rem 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.ia-carte .module-card { padding: 1rem; }
.ia-accueil { margin-top: 2.5rem; }
.ia-accueil .ia-carte { margin-top: 1.2rem; }
@media (max-width: 40rem) {
  .ia-carte { grid-template-columns: 1fr; }
  .ia-pager { flex-direction: column; }
}
@media print {
  .ia-sommaire, .ia-pager { display: none !important; }
  .ia-callout, .ia-checklist { break-inside: avoid; }
}
```

- [ ] **Step 8: Lancer le test et corriger**

Run : `npm test -- tests/ia.test.tsx`

Expected : 3 tests passent.

- [ ] **Step 9: Vérifier le typage et le lint**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 2: Page hub `/ia`

**Files:**
- Create: `src/ia/content/Hub.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : `IaLayout`, `IaCallout`, `IA_PAGES`, `SOURCES`.
- Produit : `export function IaHubPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test de la page hub**

Ajouter en tête de `tests/ia.test.tsx` :

```tsx
import { IaHubPage } from '../src/ia/content/Hub';
```

Ajouter à la fin du fichier :

```tsx
describe('hub IA', () => {
  it('expose les cinq questions et les liens vers les pages', () => {
    rendre(<IaHubPage />);
    expect(document.querySelectorAll('#cinq-questions li')).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Usages de l’IA par phase de projet' })).not.toBeNull();
    expect(screen.getByText('Sur Les Amis du Square, l’IA peut préparer un brouillon de note de cadrage. Le bureau de l’association valide le besoin, le périmètre et les critères de réussite.')).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/content/Hub`.

- [ ] **Step 3: Écrire la page hub**

Créer `src/ia/content/Hub.tsx`. Contenu imposé :

- `meta` = `IA_PAGES[0]` avec garde explicite.
- `intro` : « L’IA ne remplace pas la méthode de projet. Elle change la vitesse à laquelle certaines tâches se font, et donc la manière de les encadrer. Cette section propose des repères pour l’utiliser comme un outil, avec discernement. »
- Section `pourquoi` : trois paragraphes sur les assistants génératifs, les copilotes et les agents ; le glissement « de l’intention à la première matière » ; la phrase « Un outil, pas une méthode. » en gras.
- Encart `IaCallout` titre « Fil rouge », variante `fil`, avec exactement : « Sur Les Amis du Square, l’IA peut préparer un brouillon de note de cadrage. Le bureau de l’association valide le besoin, le périmètre et les critères de réussite. »
- Section `fait-bien` : liste de cinq usages, chacun avec une phrase de limite.
  1. Passer d’une intention à une première matière.
  2. Reformuler, résumer, expliquer à plusieurs niveaux.
  3. Explorer des options et repérer des angles morts.
  4. Accélérer les tâches répétitives et la mise en forme.
  5. Interroger un texte, un cahier des charges ou un jeu de données.
- Section `ne-fait-pas` : liste de cinq points.
  1. Décider à la place du chef de projet.
  2. Garantir un fait, un chiffre ou une source.
  3. Connaître le contexte politique, historique et relationnel.
  4. Porter la responsabilité.
  5. Remplacer l’essai réel, les tests et l’observation.
- Section `cinq-questions` : `<ol>` de cinq `<li>` avec les intitulés exacts :
  1. Quel problème je cherche à résoudre ?
  2. Quelles données puis-je donner ?
  3. Quel niveau de vérification est nécessaire ?
  4. Qui valide et qui assume ?
  5. Comment je saurai que c’est utile ?
  Chaque item contient une phrase d’explication. Dans le JSX, écrire `&nbsp;?` à la fin de chaque question.
- Section `carte-usages` : liste `.ia-carte` avec `IA_PAGES.slice(1)` ; chaque carte utilise `.module-card`, un `span.module-kicker` « Section IA », un `Link.titre` vers `page.path` et `page.resume`. Le libellé du lien est exactement `page.titre`.
- Section `suite` : deux paragraphes qui annoncent les quatre pages et rappellent que la section ne délivre ni certification ni XP.
- `retenir` : quatre phrases.
  1. L’IA produit une proposition, pas une décision.
  2. Le contexte et la vérification comptent plus que la formulation du prompt.
  3. Les données personnelles, secrètes ou clientes ne se donnent pas sans cadre.
  4. Un usage utile a un critère de réussite observable.
- `checklist` : six items.
  1. J’ai écrit le problème et le livrable attendu.
  2. J’ai vérifié les données que je peux utiliser.
  3. J’ai prévu une relecture humaine et une source de vérité.
  4. J’ai testé la réponse sur au moins deux cas.
  5. J’ai noté ce qui a été gagné et ce qui a coûté.
  6. J’ai supprimé les données sensibles de l’historique.
- `sources` : `SOURCES.aiAct`, `SOURCES.cnil`, `SOURCES.nist`, `SOURCES.oecd`, `SOURCES.iso42001`.

Squelette :

```tsx
import { Link } from 'react-router-dom';
import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

const meta = IA_PAGES[0];
if (!meta) throw new Error('Page hub IA absente.');

export function IaHubPage() {
  return (
    <IaLayout
      meta={meta}
      intro="L’IA ne remplace pas la méthode de projet. Elle change la vitesse à laquelle certaines tâches se font, et donc la manière de les encadrer. Cette section propose des repères pour l’utiliser comme un outil, avec discernement."
      retenir={[
        'L’IA produit une proposition, pas une décision.',
        'Le contexte et la vérification comptent plus que la formulation du prompt.',
        'Les données personnelles, secrètes ou clientes ne se donnent pas sans cadre.',
        'Un usage utile a un critère de réussite observable.',
      ]}
      checklist={[
        'J’ai écrit le problème et le livrable attendu.',
        'J’ai vérifié les données que je peux utiliser.',
        'J’ai prévu une relecture humaine et une source de vérité.',
        'J’ai testé la réponse sur au moins deux cas.',
        'J’ai noté ce qui a été gagné et ce qui a coûté.',
        'J’ai supprimé les données sensibles de l’historique.',
      ]}
      sources={[SOURCES.aiAct, SOURCES.cnil, SOURCES.nist, SOURCES.oecd, SOURCES.iso42001]}
    >
      {/* Sections pourquoi, fait-bien, ne-fait-pas, cinq-questions, carte-usages, suite. */}
    </IaLayout>
  );
}
```

- [ ] **Step 4: Lancer le test et corriger**

Run : `npm test -- tests/ia.test.tsx`

Expected : 4 tests passent.

- [ ] **Step 5: Vérifier la charte de la page**

Run : `npm test -- tests/typo.test.tsx`

Expected : la page hub n’est pas encore dans `PAGES`, donc le test passe sans la couvrir. Vérifier manuellement que le texte ne contient ni tiret cadratin, ni espace simple avant `: ; ? !`.

- [ ] **Step 6: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 3: Page usages `/ia/usages`

**Files:**
- Create: `src/ia/content/Usages.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : `IaLayout`, `IaCallout`, `IA_PAGES`, `SOURCES`.
- Produit : `export function IaUsagesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test de la page usages**

Ajouter en tête : `import { IaUsagesPage } from '../src/ia/content/Usages';`

Ajouter à la fin :

```tsx
describe('usages IA', () => {
  it('couvre six phases et le controle humain', () => {
    rendre(<IaUsagesPage />);
    const table = screen.getByRole('table', { name: 'Usages de l’IA par phase de projet' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(6);
    expect(screen.getByText('Faux réalisme')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Ce qui reste humain' })).not.toBeNull();
  });
});
```

Ajouter `within` à l’import Testing Library :

```tsx
import { cleanup, render, screen, within } from '@testing-library/react';
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/content/Usages`.

- [ ] **Step 3: Écrire la page usages**

Créer `src/ia/content/Usages.tsx` avec `meta = IA_PAGES[1]` et garde explicite. Contenu :

- Intro : « L’IA n’a pas le même intérêt à toutes les étapes. Un brouillon utile au cadrage peut devenir un risque en production. Cette page propose des usages par phase, toujours accompagnés d’un point de contrôle. »
- Six sections avec les identifiants du registre : `cadrage`, `planification`, `execution`, `qualite`, `communication`, `humain`.
- Chaque section métier contient deux listes : « Usages utiles » et « Points de contrôle ». Trois items par liste. Les usages sont des propositions de travail, pas des décisions.
- `cadrage` : questions à poser, reformulation du besoin, trame d’entretien ; contrôle par le commanditaire, les parties prenantes et le périmètre écrit.
- `planification` : découpage WBS, recherche d’oublis, scénarios de planning ; contrôle des dépendances, des charges et des hypothèses.
- `execution` : résumé de réunion, ordre du jour, transformation de notes en actions ; contrôle des noms, des dates et des décisions.
- `qualite` : cas de test, cas limites, relecture de spécifications ; contrôle par l’exécution réelle et la comparaison aux critères d’acceptation.
- `communication` : adaptation au public, FAQ, message de changement ; contrôle du ton, des faits et des engagements.
- Table `Usages de l’IA par phase de projet` avec six lignes, colonnes `Phase`, `Usage utile`, `Livrable`, `Point de contrôle`. Envelopper le tableau dans `<div className="ia-table-wrap">` :
  - Cadrage | Clarifier les questions, reformuler le besoin | Note de cadrage | Valider avec le commanditaire
  - Planification | Proposer un découpage, repérer des oublis | WBS, planning | Vérifier dépendances et charges
  - Exécution | Résumer, préparer un ordre du jour | Compte rendu, plan d’action | Relire noms, dates, décisions
  - Qualité | Générer des cas de test, chercher des cas limites | Jeu de test | Exécuter les tests, comparer
  - Communication | Adapter un message au public | Message, FAQ | Valider le ton et les faits
  - Changement | Anticiper les questions, préparer une FAQ | Plan de communication | Rencontrer les personnes clés
- Encart `IaCallout` titre « Faux réalisme », variante `limite` : une réponse fluide peut sembler vraie ; elle ne devient fiable qu’après vérification d’une source, d’un chiffre ou d’un cas réel.
- Section `humain` : liste de quatre responsabilités non délégables : décider, arbitrer, vérifier, porter la relation. Encart `IaCallout` titre « Le point de contrôle », variante `fil`, avec exactement : « Une sortie d’IA sans relecture est un brouillon. Une sortie relue, datée et reliée à une source devient un document de travail. »
- `retenir` :
  1. L’IA prépare des matières à décider, elle ne décide pas.
  2. Chaque phase a un livrable et un point de contrôle.
  3. Une sortie sans source reste une hypothèse.
  4. Le chef de projet garde la responsabilité du périmètre et des engagements.
- `checklist` : sept items, dont « J’ai nommé la phase et le livrable concernés. », « J’ai vérifié les noms, les dates et les chiffres. », « J’ai relié la sortie à une source ou à un cas réel. ».
- `sources` : `SOURCES.cnil`, `SOURCES.nist`, `SOURCES.oecd`.
- `meta` : `IA_PAGES[1]`.

- [ ] **Step 4: Lancer les tests**

Run : `npm test -- tests/ia.test.tsx tests/typo.test.tsx`

Expected : les tests IA passent ; la page usages n’est pas encore dans `PAGES` du test typo.

- [ ] **Step 5: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 4: Page méthodes `/ia/methodes`

**Files:**
- Create: `src/ia/content/Methodes.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : `IaLayout`, `IaCallout`, `IA_PAGES`, `SOURCES`.
- Produit : `export function IaMethodesPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test de la page méthodes**

Ajouter en tête : `import { IaMethodesPage } from '../src/ia/content/Methodes';`

Ajouter à la fin :

```tsx
describe('methodes IA', () => {
  it('distingue le corpus, l agent et la validation', () => {
    rendre(<IaMethodesPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Recherche documentaire et RAG' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Agents et automatisations' })).not.toBeNull();
    expect(screen.getByText(/Un agent sans permission ni supervision est un risque\./)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/content/Methodes`.

- [ ] **Step 3: Écrire la page méthodes**

Créer `src/ia/content/Methodes.tsx` avec `meta = IA_PAGES[2]` et garde explicite. Contenu :

- Intro : « Une sortie utile ne tombe pas d’un prompt miracle. Elle vient d’un besoin clair, d’un contexte choisi, d’un format vérifiable et d’une évaluation honnête. »
- Six sections avec les identifiants du registre : `prompt`, `contexte`, `sortie`, `evaluation`, `agents`, `rituel`.
- `Du besoin au prompt` : structure en sept points (rôle, objectif, contexte, contraintes, format, exemples, critère de réussite) ; itération courte ; versionner les prompts utiles ; éviter les prompts de 2 000 mots quand un exemple suffit.
- `Recherche documentaire et RAG` : expliquer la recherche d’extraits puis l’injection dans le contexte ; exemples de corpus projet (comptes rendus, notes de cadrage, normes internes) ; qualité de la recherche avant qualité de la génération ; afficher la source et la date ; « Un RAG n’est pas une garantie de vérité. ».
- Encart `IaCallout` titre « Fil rouge », variante `fil` : sur Les Amis du Square, un RAG sur les comptes rendus du bureau peut retrouver une décision passée ; la source et la date restent visibles.
- `Sorties structurées et vérifiables` : tableau, JSON, checklist, critères d’acceptation ; séparer les faits, les hypothèses et les propositions ; valider le schéma ; garder une trace de la source.
- `Évaluation et jeu de test` : jeu de 10 à 30 cas représentatifs ; critères exactitude, complétude, format, ton, sécurité ; relecture à l’aveugle ; journal des corrections ; mesurer le temps gagné et le temps de reprise ; ne pas résumer la qualité à une note unique.
- Table `Grille d’évaluation` avec cinq lignes, colonnes `Critère`, `Question`, `Trace attendue`. Envelopper le tableau dans `<div className="ia-table-wrap">` :
  - Exactitude | Le fait est-il vrai et sourcé&nbsp;? | Lien ou extrait vérifiable
  - Complétude | La réponse couvre-t-elle la demande&nbsp;? | Liste des points demandés
  - Format | La sortie respecte-t-elle le schéma&nbsp;? | Validation du format
  - Ton | Le message est-il adapté au public&nbsp;? | Relecture humaine
  - Sécurité | Aucune donnée sensible n’est exposée&nbsp;? | Contrôle des entrées et sorties
- `Agents et automatisations` : définir un agent ; distinguer lecture et écriture ; permissions minimales ; environnement isolé ; journal ; validation humaine avant action irréversible ; phrase exacte en gras ou en paragraphe : « Un agent sans permission ni supervision est un risque. »
- `Un rituel d’équipe` : revue de 30 minutes sur un cas réel ; cinq questions (usage, contexte, sortie, vérification, décision de garder ou arrêter) ; consigner dans le journal de projet ; partager les prompts utiles ; arrêter un usage qui ne tient pas ses promesses.
- `retenir` :
  1. Un prompt se teste et se versionne comme un mode d’emploi.
  2. Le contexte et la source comptent avant la longueur du prompt.
  3. Un jeu de test vaut mieux qu’une impression générale.
  4. Un agent doit avoir des permissions limitées et un contrôle humain.
- `checklist` : huit items, dont « J’ai écrit le besoin, le format et le critère de réussite. », « J’ai choisi les extraits et vérifié leur source. », « J’ai testé au moins cinq cas, dont un cas limite. », « J’ai prévu une validation humaine avant toute action. ».
- `sources` : `SOURCES.nist`, `SOURCES.iso42001`, `SOURCES.oecd`, `SOURCES.cnil`.
- `meta` : `IA_PAGES[2]`.

- [ ] **Step 4: Lancer les tests**

Run : `npm test -- tests/ia.test.tsx tests/typo.test.tsx`

Expected : les tests IA passent.

- [ ] **Step 5: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 5: Page outils et configuration `/ia/outils-configuration`

**Files:**
- Create: `src/ia/content/OutilsConfiguration.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : `IaLayout`, `IaCallout`, `IA_PAGES`, `SOURCES`.
- Produit : `export function IaOutilsPage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test de la page outils**

Ajouter en tête : `import { IaOutilsPage } from '../src/ia/content/OutilsConfiguration';`

Ajouter à la fin :

```tsx
describe('outils IA', () => {
  it('expose les categories, les parametres et la checklist de configuration', () => {
    rendre(<IaOutilsPage />);
    const categories = screen.getByRole('table', { name: 'Catégories d’outils' });
    expect(categories.querySelectorAll('tbody tr')).toHaveLength(6);
    const parametres = screen.getByRole('table', { name: 'Paramètres qui comptent' });
    expect(parametres.querySelectorAll('tbody tr')).toHaveLength(7);
    expect(screen.getByRole('heading', { level: 2, name: 'Checklist de configuration' })).not.toBeNull();
    expect(within(categories).getByText(/Ollama/)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/content/OutilsConfiguration`.

- [ ] **Step 3: Écrire la page outils**

Créer `src/ia/content/OutilsConfiguration.tsx` avec `meta = IA_PAGES[3]` et garde explicite. Contenu :

- Intro : « Le marché change vite et les noms changent. Les catégories, elles, restent utiles pour choisir un outil selon le besoin, les données et le niveau de contrôle attendu. »
- Cinq sections avec les identifiants du registre : `categories`, `environnement`, `parametres`, `donnees`, `choisir`.
- Table `Catégories d’outils` avec six lignes, colonnes `Catégorie`, `À quoi cela sert`, `Exemples datés`. Envelopper le tableau dans `<div className="ia-table-wrap">` :
  - Assistants génératifs | Rédiger, résumer, expliquer, explorer | ChatGPT, Claude, Gemini, Mistral Le Chat
  - Copilotes de code | Compléter, expliquer et relire du code dans l’éditeur | GitHub Copilot, Cursor
  - Recherche et synthèse | Lire des sources, comparer des documents, préparer une revue | NotebookLM, Perplexity
  - Automatisation | Enchaîner des étapes et connecter des outils | n8n, Make
  - Modèles locaux | Faire tourner un modèle sur sa machine, hors ligne | Ollama, LM Studio
  - Plateformes d’entreprise | Industrialiser l’accès, les droits et la journalisation | Azure AI Foundry, AWS Bedrock, Google Vertex AI
- `Environnement de travail` : quatre sous-parties en paragraphes ou `h3` : local, navigateur, API ; espace de travail séparé (dossier projet, prompts, sources, sorties, journal) ; compte, siège et données ; intégration à l’outil de projet (IDE, docs, tickets) sans dispersion.
- Table `Paramètres qui comptent` avec sept lignes, colonnes `Paramètre`, `Ce qu’il change`, `Réglage de départ`. Envelopper le tableau dans `<div className="ia-table-wrap">` :
  - Modèle | Capacité, coût, latence | Choisir le plus simple qui suffit
  - Contexte | Documents visibles en une fois | Fournir les extraits utiles, pas tout
  - Instructions | Comportement durable | Écrire des règles courtes et testées
  - Outils | Actions autorisées | Donner le minimum, révoquer ensuite
  - Rétention | Durée de conservation | Réduire pour les données sensibles
  - Température | Variabilité de la sortie | Basse pour extraire, plus haute pour explorer
  - Journal | Traçabilité | Conserver version, date, source et validation
- Encart `IaCallout` titre « Le bon réglage », variante `note` : « Le bon réglage n’est pas le plus puissant. C’est celui qui rend la sortie vérifiable dans le temps imparti. »
- `Données et confidentialité` : classer public, interne, confidentiel, personnel ; ne jamais coller de secret ; anonymiser ou pseudonymiser ; vérifier la rétention et le partage ; « Un modèle local n’est pas anonyme par nature. » ; vérifier qui administre le compte et où sont les données.
- `Choisir sans se disperser` : cinq critères (usage, données, intégration, coût, sortie) ; test de deux semaines sur un cas réel ; mesurer temps gagné, corrections et incidents ; un outil de référence par besoin ; éviter d’empiler les abonnements.
- `retenir` :
  1. La catégorie d’outil compte plus que le nom du fournisseur.
  2. Le contexte, les permissions et la rétention se règlent avant l’usage.
  3. Un modèle local n’est pas anonyme par nature.
  4. Un outil se choisit avec un cas de test et un critère de sortie.
- `checklist` : huit items, titre `Checklist de configuration`.
  1. Le cas d’usage et le livrable sont écrits.
  2. Le niveau de confidentialité des données est connu.
  3. Le modèle et la version sont notés.
  4. Le contexte et les instructions sont versionnés.
  5. Les outils et permissions sont limités au nécessaire.
  6. La rétention et le partage sont vérifiés.
  7. Un jeu de test de cinq cas existe.
  8. Une personne relit et valide avant diffusion.
- `sources` : `SOURCES.cnil`, `SOURCES.nist`, `SOURCES.iso42001`, `SOURCES.aiAct`.
- `meta` : `IA_PAGES[3]`.

- [ ] **Step 4: Lancer les tests**

Run : `npm test -- tests/ia.test.tsx tests/typo.test.tsx`

Expected : les tests IA passent.

- [ ] **Step 5: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 6: Page gouvernance `/ia/gouvernance`

**Files:**
- Create: `src/ia/content/Gouvernance.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : `IaLayout`, `IaCallout`, `IA_PAGES`, `SOURCES`.
- Produit : `export function IaGouvernancePage(): JSX.Element`.

- [ ] **Step 1: Ajouter le test de la page gouvernance**

Ajouter en tête : `import { IaGouvernancePage } from '../src/ia/content/Gouvernance';`

Ajouter à la fin :

```tsx
describe('gouvernance IA', () => {
  it('couvre le droit, la securite et les fournisseurs', () => {
    rendre(<IaGouvernancePage />);
    expect(screen.getByText(/Ce contenu n’est pas un conseil juridique/)).not.toBeNull();
    expect(screen.getAllByText(/AI Act/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 2, name: 'Sécurité et propriété intellectuelle' })).not.toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : échec de résolution de `../src/ia/content/Gouvernance`.

- [ ] **Step 3: Écrire la page gouvernance**

Créer `src/ia/content/Gouvernance.tsx` avec `meta = IA_PAGES[4]` et garde explicite. Contenu :

- Intro : « Un usage d’IA tient moins à l’outil qu’au cadre qui l’entoure. Rôles, données, vérifications et preuves doivent être décidés avant que l’outil ne devienne une habitude. »
- Six sections avec les identifiants du registre : `cadre`, `droit`, `risques`, `propriete`, `fournisseurs`, `preuves`.
- `Un cadre avant l’outil` : rôles (commanditaire, chef de projet, utilisateurs, référent données et sécurité, juriste) ; politique courte avec usages autorisés et interdits, données, validation, incident ; registre des usages ; formation. Phrase : « Un cadre court et appliqué vaut mieux qu’une charte longue. »
- `Droit, données et AI Act` : principes RGPD (finalité, minimisation, conservation, droits) ; AI Act abordé par les niveaux de risque (pratiques interdites, haut risque, obligations de transparence, risque limité ou minimal) ; distinguer fournisseur et déployeur ; ne pas conclure à la place d’un juriste. Inclure exactement : « Ce contenu n’est pas un conseil juridique. Pour un cas réel, consulter un juriste ou le référent données. »
- `Risques et qualité` : table `Risques et parades` avec cinq lignes, colonnes `Risque`, `Exemple`, `Parade`. Envelopper le tableau dans `<div className="ia-table-wrap">` :
  - Hallucination | Fait inventé | Source obligatoire, relecture
  - Donnée exposée | Note interne dans un prompt | Classification, anonymisation
  - Biais | Réponse qui reproduit un stéréotype | Jeu de test varié, revue
  - Dépendance | Fournisseur qui change | Export, plan de sortie
  - Automatisation excessive | Agent qui agit sans contrôle | Permissions, validation humaine
- `Sécurité et propriété intellectuelle` : conditions du fournisseur, droits sur les sorties, licences de code, information confidentielle ; injection de prompt et fuite de données ; « Ne pas coller de secret. » ; vérifier les droits avant de publier.
- `Fournisseurs et dépendance` : due diligence (usage des données, rétention, localisation, sous-traitants, sécurité, sortie) ; contrat, administrateur, authentification, journaux ; éviter le fournisseur unique ; comparer local et cloud.
- `Preuves et revue` : journal avec cas d’usage, modèle et version, date, données, sortie, vérification, décision ; revue trimestrielle ; registre des incidents ; indicateurs (temps, corrections, incidents, adoption) ; phrase : « Ce qui n’est pas tracé n’est pas gouverné. »
- Encart `IaCallout` titre « Le test de la panne », variante `limite` : « Si l’outil disparaît demain, que reste-t-il&nbsp;? Les sources, les décisions et les compétences de l’équipe. »
- `retenir` :
  1. Un cadre court et appliqué vaut mieux qu’une charte longue.
  2. Les données personnelles et les secrets ne se donnent pas sans base et sans contrôle.
  3. Chaque usage a un risque, une parade et un responsable.
  4. La sortie d’un fournisseur doit rester exportable.
- `checklist` : sept items.
  1. Les rôles et le référent données sont nommés.
  2. Les usages autorisés et interdits sont écrits.
  3. Chaque usage a une base légale et une durée de conservation.
  4. Les fournisseurs et leurs conditions sont revus.
  5. Un registre des usages et des incidents existe.
  6. Les sorties sensibles sont relues et tracées.
  7. Un plan de sortie ou d’export est prévu.
- `sources` : `SOURCES.aiAct`, `SOURCES.cnil`, `SOURCES.nist`, `SOURCES.iso42001`.
- `meta` : `IA_PAGES[4]`.

- [ ] **Step 4: Lancer les tests**

Run : `npm test -- tests/ia.test.tsx tests/typo.test.tsx`

Expected : les tests IA passent.

- [ ] **Step 5: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 7: Routes, header et accueil

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/routes/accueil.tsx`
- Modify: `tests/header.test.tsx`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Consomme : les cinq exports de `src/ia/content/`, `IA_PAGES`.
- Produit : navigation vers les cinq routes et section d’accueil.

- [ ] **Step 1: Ajouter les tests du header**

Dans `tests/header.test.tsx`, ajouter ce cas au tableau `cas` :

```ts
['/ia', 'IA'],
['/ia/usages', 'IA'],
```

Ajouter ce test dans `describe('en-tete', ...)` :

```ts
it('expose le lien IA dans la navigation principale', () => {
  const { container } = rendu();
  const lien = container.querySelector('nav[aria-label="Navigation principale"] a[href="/ia"]');
  expect(lien?.textContent).toBe('IA');
});
```

- [ ] **Step 2: Ajouter le test de l’accueil**

Dans `tests/ia.test.tsx`, ajouter en tête :

```tsx
import Accueil from '../src/routes/accueil';
import { ProgressProvider } from '../src/lib/progress';
```

Ajouter à la fin :

```tsx
describe('accueil IA', () => {
  it('expose la section et les quatre pages', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <Accueil />
        </MemoryRouter>
      </ProgressProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Gestion de projet et IA' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Ouvrir la section IA' })).not.toBeNull();
    for (const page of IA_PAGES.slice(1)) {
      expect(screen.getByRole('link', { name: page.titre })).not.toBeNull();
    }
  });
});
```

- [ ] **Step 3: Lancer les tests pour les voir échouer**

Run : `npm test -- tests/header.test.tsx tests/ia.test.tsx`

Expected : le lien `/ia` est absent et la section d’accueil est absente.

- [ ] **Step 4: Ajouter les routes**

Dans `src/App.tsx`, ajouter les imports :

```tsx
import { IaHubPage } from './ia/content/Hub';
import { IaUsagesPage } from './ia/content/Usages';
import { IaMethodesPage } from './ia/content/Methodes';
import { IaOutilsPage } from './ia/content/OutilsConfiguration';
import { IaGouvernancePage } from './ia/content/Gouvernance';
```

Ajouter les routes après `/dossier-projet` et avant `/module-:num` :

```tsx
<Route path="/ia" element={<IaHubPage />} />
<Route path="/ia/usages" element={<IaUsagesPage />} />
<Route path="/ia/methodes" element={<IaMethodesPage />} />
<Route path="/ia/outils-configuration" element={<IaOutilsPage />} />
<Route path="/ia/gouvernance" element={<IaGouvernancePage />} />
```

- [ ] **Step 5: Ajouter le lien header**

Dans `src/components/SiteHeader.tsx`, ajouter après le lien Accueil :

```tsx
<NavLink to="/ia">IA</NavLink>
```

- [ ] **Step 6: Ajouter la section d’accueil**

Dans `src/routes/accueil.tsx`, ajouter les imports :

```tsx
import { IA_PAGES } from '../ia/pages';
import '../styles/ia.css';
```

Ajouter après la section capstone, avant la fermeture du `div` racine :

```tsx
<section className="ia-accueil" aria-labelledby="ia-accueil-titre">
  <h2 id="ia-accueil-titre">Gestion de projet et IA</h2>
  <p>
    Une section autonome pour situer l’IA dans le travail du chef de projet&nbsp;: usages par phase, méthodes, outils, configuration et gouvernance. Aucun XP, aucune obligation de parcours.
  </p>
  <p><Link className="btn" to="/ia">Ouvrir la section IA</Link></p>
  <div className="ia-carte">
    {IA_PAGES.slice(1).map((page) => (
      <div className="module-card" key={page.slug}>
        <span className="module-kicker">Section IA</span>
        <Link className="titre" to={page.path}>{page.titre}</Link>
        <p className="resume">{page.resume}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 7: Lancer les tests**

Run : `npm test -- tests/header.test.tsx tests/ia.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 8: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur.

---

### Task 8: Recherche globale et glossaire

**Files:**
- Modify: `src/lib/search.ts`
- Modify: `src/components/SearchBar.tsx`
- Modify: `src/lib/glossaire.ts`
- Modify: `src/routes/Glossaire.tsx`
- Modify: `tests/search.test.ts`
- Modify: `tests/glossaire.test.ts`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Produit : `SearchHit` devient une union discriminée `ModuleSearchHit | IaSearchHit`, avec `isModuleHit` et `isIaHit`.
- Produit : `Terme.lien?: { to: string; label: string }`.
- Consomme : `IA_PAGES`.

- [ ] **Step 1: Remplacer le test de recherche**

Remplacer `tests/search.test.ts` par :

```ts
import { describe, it, expect } from 'vitest';
import { buildIndex, isIaHit, isModuleHit, searchIndex } from '../src/lib/search';
import { MODULES } from '../src/modules/index';
import { IA_PAGES } from '../src/ia/pages';

describe('search', () => {
  const index = buildIndex();

  it('l index couvre les 9 modules et leurs sections', () => {
    const modules = new Set(index.filter(isModuleHit).map((h) => h.moduleNum));
    expect([...modules].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(index.some((h) => h.ancre === 'labo')).toBe(true);
    expect(index.some((h) => h.ancre === 'quiz')).toBe(true);
  });

  it('cherche sans casse ni accents sur titres et mots cles', () => {
    const hits = searchIndex(index, 'KANBAN');
    expect(hits.some((h) => isModuleHit(h) && h.moduleNum === 4)).toBe(true);
    const hits2 = searchIndex(index, 'eisenhower');
    expect(hits2.every((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
  });

  it('trouve le module 6 avec une requête sans accent', () => {
    const hits = searchIndex(index, 'equipe');
    expect(hits.some((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
  });

  it('requête vide rend vide', () => {
    expect(searchIndex(index, '')).toEqual([]);
  });

  it('n indexe que les modules en ligne', () => {
    expect(index.filter(isModuleHit).every((h) => h.moduleNum >= 1 && h.moduleNum <= 9)).toBe(true);
  });

  it('trouve les angles morts des modules 3 et 7', () => {
    const m3 = MODULES.find((m) => m.num === 3);
    const m7 = MODULES.find((m) => m.num === 7);
    expect(m3?.resume).toContain('critères d’acceptation');
    expect(m3?.motsCles).toContain('non regression');
    expect(m7?.resume).toContain('clarifier les rôles');
    expect(m7?.motsCles).toContain('raci');
    const m3Hits = searchIndex(index, 'recette');
    expect(m3Hits.some((h) => isModuleHit(h) && h.moduleNum === 3)).toBe(true);
    const m3Regression = searchIndex(index, 'regression');
    expect(m3Regression.some((h) => isModuleHit(h) && h.moduleNum === 3)).toBe(true);
    const m7Hits = searchIndex(index, 'raci');
    expect(m7Hits.some((h) => isModuleHit(h) && h.moduleNum === 7)).toBe(true);
    const m7Gouvernance = searchIndex(index, 'gouvernance');
    expect(m7Gouvernance.some((h) => isModuleHit(h) && h.moduleNum === 7)).toBe(true);
  });

  it('indexe les cinq pages IA et leurs sections', () => {
    const ia = index.filter(isIaHit);
    expect(new Set(ia.map((h) => h.path))).toEqual(new Set(IA_PAGES.map((p) => p.path)));
    for (const page of IA_PAGES) {
      for (const section of page.sections) {
        expect(ia.some((h) => h.path === page.path && h.ancre === section.id)).toBe(true);
      }
    }
  });

  it('trouve un usage IA par un mot de son corpus', () => {
    const hits = searchIndex(index, 'hallucination');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every(isIaHit)).toBe(true);
    expect(hits.some((h) => h.path === '/ia/gouvernance')).toBe(true);
  });
});
```

- [ ] **Step 2: Ajouter le test du glossaire**

Dans `tests/glossaire.test.ts`, ajouter :

```ts
  it('contient les dix termes IA et leurs liens', () => {
    const attendus = [
      'Agent',
      'Contexte',
      'Donnée personnelle',
      'Évaluation',
      'Hallucination',
      'Human-in-the-loop',
      'IA générative',
      'Jeu de test',
      'Prompt',
      'RAG',
    ];
    for (const terme of attendus) {
      const entree = TERMES.find((t) => t.terme === terme);
      expect(entree, terme).toBeDefined();
      expect(entree?.lien?.to.startsWith('/ia')).toBe(true);
      expect(entree?.lien?.label.length).toBeGreaterThan(5);
    }
  });
```

- [ ] **Step 3: Ajouter le test du rendu glossaire**

Dans `tests/ia.test.tsx`, ajouter en tête :

```tsx
import Glossaire from '../src/routes/Glossaire';
```

Ajouter à la fin :

```tsx
describe('glossaire IA', () => {
  it('relie les termes IA a la section', () => {
    rendre(<Glossaire />);
    const rag = screen.getByText('RAG');
    expect(rag.nextElementSibling?.querySelector('a[href="/ia/methodes"]')).not.toBeNull();
  });
});
```

- [ ] **Step 4: Lancer les tests pour les voir échouer**

Run : `npm test -- tests/search.test.ts tests/glossaire.test.ts tests/ia.test.tsx`

Expected : les tests IA de recherche et de glossaire échouent ; les tests modules existants échouent sur `moduleNum` absent de l’union, ce qui est attendu tant que `search.ts` n’est pas adapté.

- [ ] **Step 5: Implémenter l’index union**

Remplacer `src/lib/search.ts` par :

```ts
import { MODULES } from '../modules/index';
import { IA_PAGES } from '../ia/pages';

interface SearchHitBase {
  path: string;
  section: string;
  ancre: string;
  label: string;
  needles: string;
}

export interface ModuleSearchHit extends SearchHitBase {
  type: 'module';
  moduleNum: number;
  moduleTitre: string;
}

export interface IaSearchHit extends SearchHitBase {
  type: 'ia';
  pageTitre: string;
}

export type SearchHit = ModuleSearchHit | IaSearchHit;

export function isModuleHit(hit: SearchHit): hit is ModuleSearchHit {
  return hit.type === 'module';
}

export function isIaHit(hit: SearchHit): hit is IaSearchHit {
  return hit.type === 'ia';
}

const SECTIONS: Array<{ section: string; ancre: string }> = [
  { section: 'Fiche', ancre: 'fiche' },
  { section: 'Fil rouge', ancre: 'fil-rouge' },
  { section: 'Démarche', ancre: 'demarche' },
  { section: 'Labo', ancre: 'labo' },
  { section: 'Exercice corrigé', ancre: 'exercice' },
  { section: 'Quiz', ancre: 'quiz' },
  { section: 'Fiche réflexe', ancre: 'reflexe' },
];

export function normaliser(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function buildIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  for (const m of MODULES) {
    for (const s of SECTIONS) {
      out.push({
        type: 'module',
        path: `/module-${m.num}`,
        moduleNum: m.num,
        moduleTitre: m.titre,
        section: s.section,
        ancre: s.ancre,
        label: `${s.section}\u00A0: ${m.titre}`,
        needles: normaliser(`${m.num} ${m.titre} ${m.resume} ${m.motsCles.join(' ')} ${s.section}`),
      });
    }
  }
  for (const page of IA_PAGES) {
    for (const section of page.sections) {
      out.push({
        type: 'ia',
        path: page.path,
        pageTitre: page.titreCourt,
        section: section.label,
        ancre: section.id,
        label: `${page.titre}\u00A0: ${section.label}`,
        needles: normaliser(`${page.titre} ${page.resume} ${(page.motsCles ?? []).join(' ')} ${section.label}`),
      });
    }
  }
  return out;
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const n = normaliser(q.trim());
  if (!n) return [];
  const mots = n.split(/\s+/);
  return index.filter((h) => mots.every((mot) => h.needles.includes(mot)));
}
```

Ajouter `'hallucination'` au tableau `motsCles` de la page gouvernance dans `src/ia/pages.ts` si ce n’est pas déjà fait.

- [ ] **Step 6: Adapter la barre de recherche**

Dans `src/components/SearchBar.tsx`, remplacer l’import :

```tsx
import { buildIndex, searchIndex, type SearchHit } from '../lib/search';
```

Remplacer `aller` par :

```tsx
  const aller = (hit: SearchHit) => {
    setOuverte(false);
    setActif(-1);
    setQ('');
    navigate(hit.path);
    window.setTimeout(() => {
      document.getElementById(hit.ancre)?.scrollIntoView();
    }, 0);
  };
```

Remplacer l’appel clavier :

```tsx
            aller(h);
```

Remplacer le rendu des résultats par :

```tsx
          {visibles.map((h, i) => (
            <li key={h.type === 'module' ? `m-${h.moduleNum}-${h.ancre}` : `ia-${h.path}-${h.ancre}`} id={`search-opt-${i}`} role="option" aria-selected={i === actif}>
              <button type="button" onClick={() => aller(h)}>
                {h.type === 'module' ? <>Module {h.moduleNum}&nbsp;: {h.moduleTitre}</> : <>{h.pageTitre}</>} <span>{h.section}</span>
              </button>
            </li>
          ))}
```

- [ ] **Step 7: Étendre le glossaire**

Dans `src/lib/glossaire.ts`, ajouter au type :

```ts
  lien?: { to: string; label: string };
```

Ajouter ces dix entrées au tableau `TERMES` (l’ordre du tableau n’a pas d’effet sur l’affichage, qui trie par terme) :

```ts
  { terme: 'Agent', definition: 'Programme qui enchaîne des étapes et peut utiliser des outils pour atteindre un objectif, avec un cadre et des permissions à définir.', lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' } },
  { terme: 'Contexte', definition: 'Ensemble des informations fournies à un modèle pour une tâche\u00A0: consignes, documents, historique et format attendu.', lien: { to: '/ia/usages', label: 'Voir la page Usages' } },
  { terme: 'Donnée personnelle', definition: 'Information qui se rapporte à une personne identifiable, directement ou indirectement\u00A0; son usage demande un cadre.', lien: { to: '/ia/gouvernance', label: 'Voir la page Gouvernance' } },
  { terme: 'Évaluation', definition: 'Mesure de la qualité d’une réponse ou d’un système sur un jeu de cas choisis, avec des critères explicites.', lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' } },
  { terme: 'Hallucination', definition: 'Réponse plausible mais fausse ou non justifiée produite par un modèle, à vérifier avant tout usage.', lien: { to: '/ia/gouvernance', label: 'Voir la page Gouvernance' } },
  { terme: 'Human-in-the-loop', definition: 'Principe qui garde une personne dans la boucle pour valider, corriger ou arrêter une action assistée par IA.', lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' } },
  { terme: 'IA générative', definition: 'Famille de systèmes qui produisent du texte, des images ou du code à partir d’une demande et de données d’entraînement.', lien: { to: '/ia', label: 'Voir l’introduction IA' } },
  { terme: 'Jeu de test', definition: 'Ensemble de cas représentatifs, avec entrées et résultats attendus, utilisé pour vérifier un système.', lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' } },
  { terme: 'Prompt', definition: 'Consigne donnée à un modèle, avec son contexte et le format de réponse souhaité\u00A0; elle se teste et se versionne.', lien: { to: '/ia/outils-configuration', label: 'Voir la page Outils' } },
  { terme: 'RAG', definition: 'Recherche de documents pertinents puis injection de ces extraits dans le contexte du modèle pour répondre avec des sources.', lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' } },
```

- [ ] **Step 8: Rendre le lien de section dans le glossaire**

Dans `src/routes/Glossaire.tsx`, après le bloc `t.module !== undefined`, ajouter :

```tsx
                  {t.lien && (
                    <span> <Link to={t.lien.to}>{t.lien.label}</Link></span>
                  )}
```

- [ ] **Step 9: Lancer les tests**

Run : `npm test -- tests/search.test.ts tests/glossaire.test.ts tests/ia.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 10: Lint et typecheck**

Run : `npm run typecheck && npm run lint`

Expected : aucune erreur. Vérifier que `noUnusedLocals` ne signale pas d’import inutilisé dans `SearchBar`.

---

### Task 9: Sitemap, service worker et smoke

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `public/sw.js`
- Modify: `smoke/smoke.spec.ts`
- Modify: `tests/ia.test.tsx`

**Interfaces:**
- Produit : sitemap à 18 URL, cache `gestion-projet-it-v5`, smoke 18 routes et parcours IA.

- [ ] **Step 1: Ajouter le test du sitemap**

Dans `tests/ia.test.tsx`, ajouter en tête :

```tsx
import { readFileSync } from 'node:fs';
```

Ajouter à la fin :

```tsx
describe('sitemap IA', () => {
  it('contient les cinq routes IA', () => {
    const xml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
    for (const page of IA_PAGES) {
      expect(xml).toContain(`https://hylst.fr/gestion-projet-it${page.path}`);
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/ia.test.tsx`

Expected : le test sitemap échoue sur les cinq URL IA.

- [ ] **Step 3: Ajouter les URL au sitemap**

Dans `public/sitemap.xml`, ajouter avant `</urlset>` :

```xml
  <url><loc>https://hylst.fr/gestion-projet-it/ia</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/ia/usages</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/ia/methodes</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/ia/outils-configuration</loc></url>
  <url><loc>https://hylst.fr/gestion-projet-it/ia/gouvernance</loc></url>
```

- [ ] **Step 4: Passer le service worker en v5**

Dans `public/sw.js`, remplacer :

```js
const version = 'gestion-projet-it-v4';
```

par :

```js
const version = 'gestion-projet-it-v5';
```

- [ ] **Step 5: Étendre le smoke**

Dans `smoke/smoke.spec.ts` :

- Remplacer le tableau `routes` par :

```ts
const routes = ['/', '/ia', '/ia/usages', '/ia/methodes', '/ia/outils-configuration', '/ia/gouvernance', '/dossier-projet', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/module-7', '/module-8', '/module-9', '/a-propos', '/glossaire'];
```

- Remplacer le titre du premier test par :

```ts
test('gate jalon 1 : clic accueil vers module 1 et a-propos, rechargement des 18 routes, zero erreur', async ({ page }) => {
```

- Remplacer l’assertion de version :

```ts
  expect(swBody).toContain("const version = 'gestion-projet-it-v5';");
```

- Ajouter ce test à la fin du fichier :

```ts
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
```

- [ ] **Step 6: Lancer le test sitemap**

Run : `npm test -- tests/ia.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 7: Construire et lancer le smoke**

Run : `npm run build`

Expected : build réussi dans `dist/`.

Lancer un preview sur un port libre :

```bash
npm run preview -- --port 4175 --strictPort
```

Dans un second terminal :

```bash
SMOKE_BASE_URL=http://localhost:4175/gestion-projet-it npm run smoke
```

Expected : 9 tests Playwright passent, dont le parcours IA et les 18 routes.

- [ ] **Step 8: Vérifier les fichiers publics**

Run : `curl -s http://localhost:4175/gestion-projet-it/sw.js | grep "gestion-projet-it-v5"` et `curl -s http://localhost:4175/gestion-projet-it/sitemap.xml | grep "/ia"`

Expected : la version v5 et les cinq URL IA sont présentes.

---

### Task 10: Validation finale

**Files:**
- Aucun fichier de production nouveau.
- Vérifier : `tests/typo.test.tsx`, `tests/header.test.tsx`, `tests/search.test.ts`, `tests/glossaire.test.ts`, `tests/ia.test.tsx`.

- [ ] **Step 1: Ajouter les cinq pages au test de charte**

Dans `tests/typo.test.tsx`, ajouter les imports :

```tsx
import { IaHubPage } from '../src/ia/content/Hub';
import { IaUsagesPage } from '../src/ia/content/Usages';
import { IaMethodesPage } from '../src/ia/content/Methodes';
import { IaOutilsPage } from '../src/ia/content/OutilsConfiguration';
import { IaGouvernancePage } from '../src/ia/content/Gouvernance';
```

Ajouter au tableau `PAGES` :

```tsx
  ['/ia', <IaHubPage />],
  ['/ia/usages', <IaUsagesPage />],
  ['/ia/methodes', <IaMethodesPage />],
  ['/ia/outils-configuration', <IaOutilsPage />],
  ['/ia/gouvernance', <IaGouvernancePage />],
```

- [ ] **Step 2: Vérifier la ponctuation dans le JSX**

Dans `src/ia/content/`, `src/ia/IaLayout.tsx` et `src/routes/accueil.tsx`, vérifier que chaque ponctuation `: ; ? !` utilisée après une espace est rendue avec `&nbsp;` (ou ` ` dans une chaîne JS) et que les guillemets rendus utilisent `«&nbsp;` et `&nbsp;»`. Les titres de questions du hub et l’encart « test de la panne » sont les cas les plus faciles à oublier.

- [ ] **Step 3: Lancer toute la suite**

Run : `npm test`

Expected : tous les tests passent, y compris les cinq pages dans la charte.

- [ ] **Step 4: Vérifier la qualité statique**

Run : `npm run lint && npm run typecheck && npm run build`

Expected : aucune erreur, build réussi.

- [ ] **Step 5: Relancer le smoke complet**

Avec le preview sur 4175 :

```bash
SMOKE_BASE_URL=http://localhost:4175/gestion-projet-it npm run smoke
```

Expected : 9 tests passent, zéro requête externe, zéro erreur console, zéro réponse >= 400.

- [ ] **Step 6: Lighthouse mobile**

Lancer sur l’accueil et `/ia` :

```bash
npx lighthouse http://localhost:4175/gestion-projet-it/ --only-categories=performance,accessibility --output=json --output-path=./lh-ia-accueil.json --chrome-flags="--headless --no-sandbox"
npx lighthouse http://localhost:4175/gestion-projet-it/ia --only-categories=performance,accessibility --output=json --output-path=./lh-ia-hub.json --chrome-flags="--headless --no-sandbox"
```

Expected : performance et accessibilité >= 0,90. Le CLI peut sortir en code 1 sur Windows ; lire les scores dans les JSON. Supprimer les JSON après lecture.

- [ ] **Step 7: Vérifications manuelles**

- 390 px, 768 px et 1440 px : les tableaux défilent horizontalement sans casser la page.
- Clavier : sommaire, liens de sources, checklist et pagination atteignables ; focus visible.
- Recherche : « RAG » propose la section Méthodes et fait défiler jusqu’à la section RAG de `/ia/methodes`.
- Glossaire : « RAG » affiche le lien « Voir la page Méthodes ».
- Impression : seule la checklist et le contenu restent lisibles ; le sommaire et la pagination sont masqués.
- Aucun cookie, aucune requête externe, aucun script inline.
- Le compteur d’accueil reste `0/9` et l’XP ne change pas.

- [ ] **Step 8: Rapport final**

Créer `.superpowers/sdd/2026-10-22-ia-gestion-projet/progress.md` avec :

- les commandes exécutées et leurs résultats ;
- le nombre de tests ;
- les scores Lighthouse ;
- les vérifications manuelles ;
- les écarts éventuels et les décisions prises.

Ne pas copier le build dans le dépôt Docker, ne pas modifier le changelog, ne pas committer.

---

## Definition of Done

- Les cinq routes répondent au clic et au rechargement.
- Les cinq pages sont dans le sitemap et le smoke.
- La recherche trouve au moins un usage IA et navigue vers la bonne ancre.
- Le glossaire contient les dix termes IA avec leurs liens.
- Le header expose « IA » et l’accueil expose la section après le capstone.
- Aucun XP, aucun compteur de module, aucun cookie, aucune requête externe.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` et le smoke passent.
- Lighthouse accueil et `/ia` >= 0,90 en performance et accessibilité.
- Aucun commit, aucune livraison Docker sans accord explicite.

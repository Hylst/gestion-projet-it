# Enrichissements P0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer l’audit éditorial, les guides « erreurs et décision » des neuf modules, la bibliothèque de ressources, la politique de sources et l’audit WCAG du lot.

**Architecture:** Un composant partagé `ModuleGuide` rend les données propres à chaque module depuis `src/modules/mX/guide.ts`. Une route `/ressources` rend une bibliothèque de liens externes qualifiés, sans chargement automatique. Les documents d’audit et de politique restent dans `docs/`.

**Tech Stack:** Vite, React 18, TypeScript, React Router 7, Vitest, Testing Library, Playwright.

## Global Constraints

- Aucun backend, compte, cookie, analytics, requête externe au chargement ou dépendance runtime.
- Aucun XP, aucune clé `gestion-projet-it:xp`, aucun compteur `0/9` modifié.
- Aucun tiret cadratin, apostrophe droite, espace normale avant `: ; ? !`, guillemet non français.
- Aucune école présentée comme supérieure, aucun auteur fictif, aucun chiffre sans source.
- Liens externes ouverts uniquement après action, avec `target="_blank"` et `rel="noopener noreferrer"`.
- Tests avec `fireEvent` et assertions natives ; ne pas ajouter `user-event` ni `jest-dom`.
- Ne pas toucher au dépôt Docker.
- Vérifier `git diff --check` avant chaque commit.

---

## File Structure

**Créer**
- `docs/superpowers/specs/2026-10-24-audit-editorial-modules.md` : matrice d’audit et actions.
- `src/modules/guideTypes.ts` : types des erreurs et décisions.
- `src/components/ModuleGuide.tsx` : rendu accessible partagé.
- `src/modules/guides.ts` : agrégation des neuf guides.
- `src/modules/m1-wbs/guide.ts` … `src/modules/m9-changement/guide.ts` : contenu par module.
- `src/lib/ressources.ts` : données qualifiées des ressources.
- `src/routes/Ressources.tsx` : page bibliothèque.
- `tests/module-guide.test.tsx`, `tests/ressources.test.tsx`.
- `docs/sources.md` : politique de sources et de veille.
- `docs/accessibilite/audit-2026-10-24.md` : rapport WCAG du lot.

**Modifier**
- `src/components/ModuleLayout.tsx` : lien de sommaire vers `#guide`.
- Les neuf `src/modules/mX/index.tsx` : rendu du guide.
- `src/styles/index.css` : styles du guide et de la bibliothèque.
- `src/App.tsx`, `src/components/SiteHeader.tsx`, `src/components/Footer.tsx` : route et navigation.
- `public/sitemap.xml`, `smoke/smoke.spec.ts`, `tests/typo.test.tsx`, `tests/header.test.tsx`.
- `README.md`, `agents.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/README.md`.
- `docs/superpowers/specs/2026-10-23-enrichissements-design.md` : statut du lot.

---

### Task 1: Audit éditorial des neuf modules

**Files:**
- Create: `docs/superpowers/specs/2026-10-24-audit-editorial-modules.md`
- Modify: `docs/README.md`

**Interfaces:**
- Consumes: les neuf modules existants et `docs/superpowers/specs/2026-10-23-enrichissements-design.md`.
- Produces: une matrice qui fixe les trois erreurs, la décision et la ressource retenue par module.

- [ ] **Step 1: Rédiger la matrice**

Créer un tableau avec une ligne par module et les colonnes : sections présentes, manques, doublons, trois erreurs retenues, décision retenue, ressource retenue. Ajouter une section « Actions » avec trois actions maximum par module.

Contenu minimal de la matrice :

| Module | Manques principaux | Erreurs retenues | Décision |
| --- | --- | --- | --- |
| M1 WBS | hiérarchie, dictionnaire, maîtrise du périmètre | WBS confondu avec planning ; paiement ajouté ; notice oubliée | par livrables, phases ou rôles |
| M2 Planification | marges, ressources, calendrier, avancement | tests avant intégration ; jalon transformé en tâche ; barre déplacée sans dépendances | PERT, GANTT ou les deux |
| M3 Méthodes | traçabilité besoin-test, entrée et sortie de phase, défauts | V pour besoin flou ; critères après réalisation ; non-régression oubliée | cascade, V ou tranches |
| M4 Agiles | sprint goal, incrément, mesures de flux, XP détaillé | WIP dépassé ; Scrum sans backlog ; poker comme concours | Scrum ou Kanban |
| M5 Outils | Git, revue de code, secrets, promotion, retour arrière | outil sans mise à jour ; CI rouge ignorée ; Docker sans entretien | outil dédié, tableau ou aucun |
| M6 Équipe et risques | capacité, conflits, propriétaire de risque, déclencheur | urgent confondu avec important ; registre sans propriétaire ; rétro sans action | réduire, transférer ou accepter |
| M7 Parties prenantes | engagement, seuils d’escalade, journal de décisions | financeur mal informé ; deux A dans le RACI ; canaux multiples | RACI, journal ou accord oral |
| M8 Budget | structure de coûts, effort et durée, référence, valeur acquise | chiffre unique ; marge pour un oubli ; total seul | ascendant, analogie ou trois points |
| M9 Changement | impact, segmentation, sponsor, preuve d’usage | annonce sans pratique ; consignes contradictoires ; présents comptés | formation, relais ou message |

- [ ] **Step 2: Vérifier la charte**

Run: `grep -n "—\|TODO\|TBD" docs/superpowers/specs/2026-10-24-audit-editorial-modules.md`
Expected: aucune sortie.

- [ ] **Step 3: Ajouter le document à l’index**

Ajouter une ligne datée `2026-10-24`, statut `Livré`, périmètre « audit éditorial des neuf modules » dans `docs/README.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-10-24-audit-editorial-modules.md docs/README.md
git commit -m "docs: audite les neuf modules"
```

---

### Task 2: Composant de guide partagé

**Files:**
- Create: `src/modules/guideTypes.ts`
- Create: `src/components/ModuleGuide.tsx`
- Create: `tests/module-guide.test.tsx`
- Modify: `src/styles/index.css`

**Interfaces:**
- Consumes: aucun composant existant.
- Produces:
  - `GuideErreur`, `GuideOption`, `GuideDecision`, `ModuleGuideData`.
  - `ModuleGuide({ data, moduleNum })`, avec `data: ModuleGuideData` et `moduleNum: number`.

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModuleGuide } from '../src/components/ModuleGuide';
import type { ModuleGuideData } from '../src/modules/guideTypes';

afterEach(cleanup);

const fixture: ModuleGuideData = {
  erreurs: [
    { titre: 'Erreur A', consequence: 'Conséquence observable A.', correction: 'Correction concrète A.' },
    { titre: 'Erreur B', consequence: 'Conséquence observable B.', correction: 'Correction concrète B.' },
    { titre: 'Erreur C', consequence: 'Conséquence observable C.', correction: 'Correction concrète C.' },
  ],
  decision: {
    question: 'Quelle option choisir ?',
    options: [
      { nom: 'Option A', quand: 'Quand le besoin est stable.', limite: 'Ne couvre pas les retours.' },
      { nom: 'Option B', quand: 'Quand le besoin change.', limite: 'Demande du temps.' },
    ],
    nonUsage: 'Un projet de trois tâches sans décision partagée.',
  },
};

describe('ModuleGuide', () => {
  it('rend trois erreurs, les options et le cas de non-usage', () => {
    const { container } = render(
      <MemoryRouter><ModuleGuide data={fixture} moduleNum={1} /></MemoryRouter>,
    );
    const guide = container.querySelector('#guide') as HTMLElement;
    expect(guide).not.toBeNull();
    expect(within(guide).getAllByRole('listitem')).toHaveLength(3);
    expect(within(guide).getByRole('heading', { level: 2, name: /Erreurs fréquentes/ })).toBeTruthy();
    expect(within(guide).getByRole('heading', { level: 3, name: /Point de décision/ })).toBeTruthy();
    expect(within(guide).getByText('Option A')).toBeTruthy();
    expect(within(guide).getByText(/Un projet de trois tâches/)).toBeTruthy();
    expect(within(guide).getByRole('link', { name: /Ressources du module 1/ }).getAttribute('href')).toBe('/ressources#module-1');
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npm test -- tests/module-guide.test.tsx`
Expected: FAIL, module `ModuleGuide` introuvable.

- [ ] **Step 3: Écrire les types**

```ts
export interface GuideErreur {
  titre: string;
  consequence: string;
  correction: string;
}

export interface GuideOption {
  nom: string;
  quand: string;
  limite: string;
}

export interface GuideDecision {
  question: string;
  options: readonly GuideOption[];
  nonUsage: string;
}

export interface ModuleGuideData {
  erreurs: readonly GuideErreur[];
  decision: GuideDecision;
}
```

- [ ] **Step 4: Écrire le composant**

```tsx
import { Link } from 'react-router-dom';
import type { ModuleGuideData } from '../modules/guideTypes';

export function ModuleGuide({ data, moduleNum }: { data: ModuleGuideData; moduleNum: number }) {
  return (
    <section id="guide" aria-labelledby="guide-t">
      <h2 id="guide-t">Erreurs fréquentes et point de décision</h2>
      <p className="accroche">Des erreurs observables sur le fil rouge, avec leur conséquence et une correction courte.</p>
      <h3>Erreurs fréquentes</h3>
      <ul className="guide-erreurs">
        {data.erreurs.map((erreur) => (
          <li key={erreur.titre} className="guide-erreur card">
            <strong>{erreur.titre}</strong>
            <p><span className="guide-label">Conséquence</span> {erreur.consequence}</p>
            <p><span className="guide-label">Correction</span> {erreur.correction}</p>
          </li>
        ))}
      </ul>
      <h3>Point de décision&nbsp;: {data.decision.question}</h3>
      <div className="guide-options">
        {data.decision.options.map((option) => (
          <article key={option.nom} className="guide-option card">
            <h4>{option.nom}</h4>
            <p><span className="guide-label">Choisir si</span> {option.quand}</p>
            <p><span className="guide-label">Limite</span> {option.limite}</p>
          </article>
        ))}
      </div>
      <p className="guide-non-usage"><strong>Quand s’en passer&nbsp;:</strong> {data.decision.nonUsage}</p>
      <p><Link to={`/ressources#module-${moduleNum}`}>Ressources du module {moduleNum}</Link></p>
    </section>
  );
}
```

- [ ] **Step 5: Ajouter les styles**

```css
.guide-erreurs { list-style: none; padding: 0; display: grid; gap: 0.75rem; }
.guide-erreur { padding: 1rem; }
.guide-erreur p { margin: 0.35rem 0; }
.guide-label { font-weight: 600; color: var(--c-main-ink); }
.guide-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.guide-option { padding: 1rem; }
.guide-option h4 { margin: 0.1rem 0 0.4rem; }
.guide-non-usage { border-left: 4px solid var(--c-soft); padding-left: 0.75rem; }
@media (max-width: 50rem) { .guide-options { grid-template-columns: 1fr; } }
```

- [ ] **Step 6: Lancer le test**

Run: `npm test -- tests/module-guide.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/modules/guideTypes.ts src/components/ModuleGuide.tsx src/styles/index.css tests/module-guide.test.tsx
git commit -m "feat: ajoute le guide partagé des modules"
```

---

### Task 3: Contenu des neuf guides et intégration

**Files:**
- Create: `src/modules/m1-wbs/guide.ts` … `src/modules/m9-changement/guide.ts`
- Create: `src/modules/guides.ts`
- Modify: `src/components/ModuleLayout.tsx`, `src/modules/m1-wbs/index.tsx` … `src/modules/m9-changement/index.tsx`
- Modify: `tests/module-guide.test.tsx`

**Interfaces:**
- Consumes: `ModuleGuideData` et `ModuleGuide`.
- Produces: `GUIDES: Record<string, ModuleGuideData>` avec les neuf identifiants `m1-wbs` à `m9-changement`.

- [ ] **Step 1: Compléter le test avant les données**

Ajouter en tête du test :

```tsx
import { GUIDES } from '../src/modules/guides';
import { M1Page } from '../src/modules/m1-wbs';
import { M2Page } from '../src/modules/m2-planif';
import { M3Page } from '../src/modules/m3-methodes';
import { M4Page } from '../src/modules/m4-agiles';
import { M5Page } from '../src/modules/m5-outils';
import { M6Page } from '../src/modules/m6-equipe';
import { M7Page } from '../src/modules/m7-parties';
import { M8Page } from '../src/modules/m8-budget';
import { M9Page } from '../src/modules/m9-changement';
import { ProgressProvider } from '../src/lib/progress';
```

Ajouter :

```tsx
const PAGES = [
  ['m1-wbs', <M1Page />], ['m2-planif', <M2Page />], ['m3-methodes', <M3Page />],
  ['m4-agiles', <M4Page />], ['m5-outils', <M5Page />], ['m6-equipe', <M6Page />],
  ['m7-parties', <M7Page />], ['m8-budget', <M8Page />], ['m9-changement', <M9Page />],
] as const;

it('couvre les neuf modules avec trois erreurs et deux ou trois options', () => {
  expect(Object.keys(GUIDES)).toHaveLength(9);
  for (const [id, guide] of Object.entries(GUIDES)) {
    expect(guide.erreurs, id).toHaveLength(3);
    expect(guide.decision.options.length, id).toBeGreaterThanOrEqual(2);
    expect(guide.decision.options.length, id).toBeLessThanOrEqual(3);
    for (const erreur of guide.erreurs) {
      expect(erreur.consequence.length, `${id} conséquence`).toBeGreaterThan(20);
      expect(erreur.correction.length, `${id} correction`).toBeGreaterThan(20);
    }
  }
});

for (const [id, page] of PAGES) {
  it(`${id} affiche le guide`, () => {
    localStorage.clear();
    const { container } = render(
      <ProgressProvider><MemoryRouter>{page}</MemoryRouter></ProgressProvider>,
    );
    expect(container.querySelector('#guide')).not.toBeNull();
    expect(container.textContent).toContain('Erreurs fréquentes');
  });
}
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npm test -- tests/module-guide.test.tsx`
Expected: FAIL, `src/modules/guides` introuvable.

- [ ] **Step 3: Créer les neuf fichiers de données**

Créer `guide.ts` dans chaque module avec ce format :

```ts
import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    { titre: '…', consequence: '…', correction: '…' },
    { titre: '…', consequence: '…', correction: '…' },
    { titre: '…', consequence: '…', correction: '…' },
  ],
  decision: {
    question: '…',
    options: [
      { nom: '…', quand: '…', limite: '…' },
      { nom: '…', quand: '…', limite: '…' },
    ],
    nonUsage: '…',
  },
};
```

Contenu exact à reprendre de l’audit :

| Module | Erreur 1 | Erreur 2 | Erreur 3 | Décision |
| --- | --- | --- | --- | --- |
| M1 | WBS confondu avec planning : lots lus comme phases ; garder le WBS sur les livrables et l’ordre dans le module 2 | paiement ajouté sans décision : périmètre et budget gonflés ; inscrire l’exclusion et demander une décision | notice oubliée : agenda impossible à mettre à jour ; l’ajouter au lot Mise en ligne et à la définition de fini | par livrables, phases ou rôles |
| M2 | tests avant intégration : dates fausses ; finir l’intégration ou ne chevaucher que la préparation | jalon transformé en tâche : plus de décision ni de responsable ; garder un point daté | barre déplacée sans dépendances : séquence impossible ; vérifier prédécesseurs et chaîne tendue | PERT, GANTT ou les deux |
| M3 | V pour besoin flou : reprise coûteuse ; maquette ou tranche avant de figer | critères après réalisation : recette négociée ; critères observables avant | non-régression oubliée : contact cassé ; test court et preuve datée | cascade, V ou tranches |
| M4 | WIP dépassé : flux engorgé ; finir avant d’ouvrir et réduire les cartes | Scrum sans backlog : rituels vides ; backlog court ou Kanban | poker comme concours : points devenus heures ; taille relative et discussion | Scrum ou Kanban |
| M5 | outil sans règle : tableau périmé ; responsable, rythme et colonnes limitées | CI rouge ignorée : régressions ; stabiliser le test et bloquer la fusion | Docker sans entretien : démo fragile ; versionner l’image et tester la cible | outil dédié, tableau ou aucun |
| M6 | urgent confondu avec important : réaction permanente ; séparer urgence et importance | registre sans propriétaire : aucune parade ; propriétaire, déclencheur et revue | rétro sans action : blocages répétés ; une action, un responsable, une échéance | réduire, transférer ou accepter |
| M7 | financeur mal informé : blocage tardif ; cartographier et consulter en amont | deux A dans le RACI : personne ne tranche ; un seul A et un R | canaux multiples : saturation ; un canal par besoin et un rituel court | RACI, journal ou accord oral |
| M8 | chiffre unique : marge absorbée ; hypothèses et fourchette à trois points | marge pour un oubli : plus de réserve ; ajouter l’oubli au périmètre | total seul : correction au mauvais poste ; comparer par lot et qualifier la cause | ascendant, analogie ou trois points |
| M9 | annonce sans pratique : ancien geste ; former sur un geste précis | consignes contradictoires : données dispersées ; consigne unique et ancienne version retirée | présents comptés : bilan vert trompeur ; observer les usages au jalon | formation, relais ou message |

Pour chaque ligne, écrire les phrases complètes dans le fichier du module. Les options de décision reprennent les critères et limites de l’audit du 24 octobre 2026.

- [ ] **Step 4: Créer l’agrégat**

`src/modules/guides.ts` :

```ts
import type { ModuleGuideData } from './guideTypes';
import { guide as m1 } from './m1-wbs/guide';
import { guide as m2 } from './m2-planif/guide';
import { guide as m3 } from './m3-methodes/guide';
import { guide as m4 } from './m4-agiles/guide';
import { guide as m5 } from './m5-outils/guide';
import { guide as m6 } from './m6-equipe/guide';
import { guide as m7 } from './m7-parties/guide';
import { guide as m8 } from './m8-budget/guide';
import { guide as m9 } from './m9-changement/guide';

export const GUIDES: Record<string, ModuleGuideData> = {
  'm1-wbs': m1, 'm2-planif': m2, 'm3-methodes': m3,
  'm4-agiles': m4, 'm5-outils': m5, 'm6-equipe': m6,
  'm7-parties': m7, 'm8-budget': m8, 'm9-changement': m9,
};
```

- [ ] **Step 5: Intégrer dans les neuf pages**

Dans `ModuleLayout.tsx`, ajouter `<a href="#guide">Erreurs et décisions</a>` entre Quiz et Fiche réflexe.

Dans chaque `src/modules/mX/index.tsx` :

```tsx
import { ModuleGuide } from '../../components/ModuleGuide';
import { guide } from './guide';
```

et, entre le quiz et la fiche réflexe :

```tsx
<Reveal><ModuleGuide data={guide} moduleNum={1} /></Reveal>
```

Remplacer `moduleNum={1}` par le numéro du module.

- [ ] **Step 6: Lancer les tests**

Run: `npm test -- tests/module-guide.test.tsx`
Expected: PASS, 9 modules couverts.

Run: `npm test -- tests/typo.test.tsx`
Expected: PASS, aucune forme défendue, aucun tiret cadratin.

- [ ] **Step 7: Commit**

```bash
git add src/modules src/components/ModuleLayout.tsx tests/module-guide.test.tsx
git commit -m "feat: ajoute erreurs et décisions aux neuf modules"
```

---

### Task 4: Bibliothèque de ressources

**Files:**
- Create: `src/lib/ressources.ts`
- Create: `src/routes/Ressources.tsx`
- Create: `tests/ressources.test.tsx`
- Modify: `src/App.tsx`, `src/components/SiteHeader.tsx`, `src/components/Footer.tsx`
- Modify: `src/styles/index.css`, `public/sitemap.xml`, `smoke/smoke.spec.ts`, `tests/typo.test.tsx`, `tests/header.test.tsx`

**Interfaces:**
- Consumes: `MODULES` pour les titres et les liens de retour.
- Produces:
  - `Ressource`, `GroupeRessources`.
  - `RESSOURCES_MODULES: readonly GroupeRessources[]` (9 groupes).
  - `RESSOURCES_PARCOURS: readonly GroupeRessources[]` (2 groupes).
  - `Ressources()`.

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ressources from '../src/routes/Ressources';
import { RESSOURCES_MODULES, RESSOURCES_PARCOURS } from '../src/lib/ressources';

afterEach(cleanup);

const rendre = () => render(<MemoryRouter><Ressources /></MemoryRouter>);

describe('bibliothèque de ressources', () => {
  it('couvre neuf modules et deux parcours', () => {
    expect(RESSOURCES_MODULES).toHaveLength(9);
    expect(RESSOURCES_PARCOURS).toHaveLength(2);
    for (const groupe of [...RESSOURCES_MODULES, ...RESSOURCES_PARCOURS]) {
      expect(groupe.ressources.length).toBeGreaterThanOrEqual(1);
      expect(groupe.ressources.length).toBeLessThanOrEqual(3);
      for (const ressource of groupe.ressources) {
        expect(ressource.url).toMatch(/^https:\/\//);
        expect(ressource.organisme.length).toBeGreaterThan(2);
        expect(ressource.usage.length).toBeGreaterThan(10);
        expect(ressource.limite.length).toBeGreaterThan(10);
        expect(ressource.verifieLe).toBe('24 octobre 2026');
      }
    }
  });

  it('rend les sections et des liens externes sûrs', () => {
    rendre();
    expect(screen.getByRole('heading', { level: 1, name: 'Ressources et outils' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Module 1/ })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Parcours Produit/ })).toBeTruthy();
    const externes = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('https://'));
    expect(externes.length).toBeGreaterThanOrEqual(24);
    for (const lien of externes) {
      expect(lien.getAttribute('target')).toBe('_blank');
      expect(lien.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npm test -- tests/ressources.test.tsx`
Expected: FAIL, `Ressources` introuvable.

- [ ] **Step 3: Créer les données**

```ts
export interface Ressource {
  organisme: string;
  titre: string;
  url: string;
  version: string;
  usage: string;
  limite: string;
  verifieLe: string;
}

export interface GroupeRessources {
  id: string;
  titre: string;
  moduleNum?: number;
  ressources: readonly Ressource[];
}
```

Groupes de modules, deux ressources chacun :

| Module | Ressource 1 | Ressource 2 |
| --- | --- | --- |
| 1 | APM, Scope management | APM, Governance |
| 2 | APM, Planning | GOV.UK, Agile delivery |
| 3 | ISTQB, Glossary | W3C WAI, WCAG 2.2 |
| 4 | Scrum Guides, The Scrum Guide | Kanban University, The Kanban Guide |
| 5 | GitHub, Actions documentation | Docker, Docker overview |
| 6 | APM, Risk management | GOV.UK, Orange Book |
| 7 | APM, Stakeholder management | APM, Communication |
| 8 | APM, Budgeting and cost management | GOV.UK, The Green Book |
| 9 | APM, Change management | ANACT, site officiel |

Groupes de parcours, trois ressources chacun :

| Parcours | Ressources |
| --- | --- |
| Produit | GOV.UK Discovery phase ; User research ; Measuring success |
| Cybersécurité | ANSSI Cyber.gouv.fr ; CNIL RGPD ; OWASP Top 10 |

URL exactes vérifiées le 24 octobre 2026 :

- `https://www.apm.org.uk/resources/find-a-resource/scope-management/`
- `https://www.apm.org.uk/resources/find-a-resource/governance/`
- `https://www.apm.org.uk/resources/find-a-resource/planning/`
- `https://www.gov.uk/service-manual/agile-delivery`
- `https://glossary.istqb.org/`
- `https://www.w3.org/WAI/standards-guidelines/wcag/`
- `https://scrumguides.org/scrum-guide.html`
- `https://kanban.university/kanban-guide/`
- `https://docs.github.com/en/actions`
- `https://docs.docker.com/get-started/overview/`
- `https://www.apm.org.uk/resources/find-a-resource/risk-management/`
- `https://www.gov.uk/government/publications/orange-book`
- `https://www.apm.org.uk/resources/find-a-resource/stakeholder-management/`
- `https://www.apm.org.uk/resources/find-a-resource/communication/`
- `https://www.apm.org.uk/resources/find-a-resource/budgeting-and-cost-management/`
- `https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government`
- `https://www.apm.org.uk/resources/find-a-resource/change-management/`
- `https://www.anact.fr/`
- `https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works`
- `https://www.gov.uk/service-manual/user-research`
- `https://www.gov.uk/service-manual/measuring-success`
- `https://cyber.gouv.fr/`
- `https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on`
- `https://owasp.org/www-project-top-ten/`

Chaque ressource doit avoir un `usage` court, une `limite` explicite et `verifieLe: '24 octobre 2026'`. Les groupes de parcours portent un titre « Parcours Produit » et « Parcours Cybersécurité », avec la mention que leurs pages restent à ouvrir.

- [ ] **Step 4: Créer la page**

```tsx
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { MODULES } from '../modules/index';
import { RESSOURCES_MODULES, RESSOURCES_PARCOURS } from '../lib/ressources';

function Groupe({ groupe }: { groupe: (typeof RESSOURCES_MODULES)[number] }) {
  return (
    <section id={groupe.id} aria-labelledby={`${groupe.id}-t`}>
      <h2 id={`${groupe.id}-t`}>{groupe.titre}</h2>
      {groupe.moduleNum && <p><Link to={`/module-${groupe.moduleNum}`}>Revenir au module {groupe.moduleNum}</Link></p>}
      <ul className="ressources-liste">
        {groupe.ressources.map((ressource) => (
          <li key={ressource.url} className="ressource card">
            <h3><a href={ressource.url} target="_blank" rel="noopener noreferrer">{ressource.titre}<span className="sr-only"> (nouvel onglet)</span></a></h3>
            <p><span className="guide-label">Organisme</span> {ressource.organisme} · <span className="guide-label">Version</span> {ressource.version}</p>
            <p><span className="guide-label">Usage</span> {ressource.usage}</p>
            <p><span className="guide-label">Limite</span> {ressource.limite}</p>
            <p className="ressource-date">Vérifié le {ressource.verifieLe}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Ressources() {
  return (
    <article className="module-page">
      <SeoHead title="Ressources et outils" description="Ressources documentaires officielles pour les neuf modules et les parcours Produit et Cybersécurité." />
      <header className="module-head">
        <p className="kicker">Ressources</p>
        <h1>Ressources et outils</h1>
        <p className="accroche">Des liens documentaires qualifiés, ouverts dans un nouvel onglet. Aucun contenu n’est chargé automatiquement.</p>
      </header>
      <nav className="sommaire" aria-label="Sommaire des ressources">
        {RESSOURCES_MODULES.map((groupe) => <a key={groupe.id} href={`#${groupe.id}`}>{groupe.titre}</a>)}
        {RESSOURCES_PARCOURS.map((groupe) => <a key={groupe.id} href={`#${groupe.id}`}>{groupe.titre}</a>)}
      </nav>
      {RESSOURCES_MODULES.map((groupe) => <Groupe key={groupe.id} groupe={groupe} />)}
      {RESSOURCES_PARCOURS.map((groupe) => <Groupe key={groupe.id} groupe={groupe} />)}
      <p className="help">Les pages des parcours Produit et Cybersécurité restent au backlog. Leurs ressources sont regroupées ici pour préparer leur ouverture.</p>
    </article>
  );
}
```

- [ ] **Step 5: Brancher la route et la navigation**

Dans `App.tsx`, importer `Ressources` et ajouter `<Route path="/ressources" element={<Ressources />} />`.

Dans `SiteHeader.tsx`, ajouter `<NavLink to="/ressources">Ressources</NavLink>` après Glossaire.

Dans `Footer.tsx`, ajouter `<Link to="/ressources">Ressources</Link>`.

- [ ] **Step 6: Ajouter les styles**

```css
.ressources-liste { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
.ressource { padding: 1rem; }
.ressource h3 { margin: 0 0 0.5rem; }
.ressource p { margin: 0.3rem 0; }
.ressource-date { color: var(--c-muted); font-size: 0.85rem; }
@media (max-width: 50rem) { .ressources-liste { grid-template-columns: 1fr; } }
```

- [ ] **Step 7: Mettre à jour sitemap, smoke et tests**

Ajouter `<url><loc>https://hylst.fr/gestion-projet-it/ressources</loc></url>` dans `public/sitemap.xml`.

Dans `smoke.spec.ts` :
- ajouter `'/ressources'` à `routes` ;
- ajouter `'/ressources': 'Ressources et outils'` à `routeTitres` ;
- renommer le test « 18 routes » en « 19 routes » ;
- ajouter un test qui vérifie sur `/ressources` au moins 24 liens externes avec `target="_blank"` et `rel="noopener noreferrer"`, puis focalise le premier lien.

Dans `typo.test.tsx`, importer `Ressources` et ajouter `['ressources', <Ressources />]` à `PAGES`.

Dans `header.test.tsx`, ajouter `['/ressources', 'Ressources']` au cas des liens courants.

Dans `README.md`, remplacer `18 routes` par `19 routes` et ajouter `/ressources` à la liste.

- [ ] **Step 8: Lancer les tests**

Run: `npm test -- tests/ressources.test.tsx tests/typo.test.tsx tests/header.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/lib/ressources.ts src/routes/Ressources.tsx src/styles/index.css src/App.tsx src/components/SiteHeader.tsx src/components/Footer.tsx public/sitemap.xml smoke/smoke.spec.ts tests/ressources.test.tsx tests/typo.test.tsx tests/header.test.tsx README.md
git commit -m "feat: ajoute la bibliothèque de ressources"
```

---

### Task 5: Politique de sources et de veille

**Files:**
- Create: `docs/sources.md`
- Modify: `agents.md`, `README.md`, `docs/README.md`, `src/lib/ressources.ts`

**Interfaces:**
- Consumes: les ressources de la Task 4.
- Produces: une règle applicable aux futurs parcours et fiches outils.

- [ ] **Step 1: Rédiger la politique**

`docs/sources.md` doit contenir :

- critères d’acceptation : organisme identifiable, URL stable, date ou version, usage, limite ;
- procédure : vérifier, dater, publier, revoir au moins une fois par an ;
- retrait : lien mort, organisme disparu, contenu remplacé, conflit d’intérêts ;
- distinction entre source officielle, norme payante, documentation d’outil et opinion ;
- règle de confidentialité : aucun chargement automatique, aucun embed, aucune API ;
- journal de vérification avec la date du 24 octobre 2026.

- [ ] **Step 2: Relier la politique**

Ajouter dans `agents.md` une section « Sources et ressources » qui renvoie à `docs/sources.md` et rappelle les cinq champs obligatoires.

Ajouter la politique à `docs/README.md` et à la section documentation de `README.md`.

- [ ] **Step 3: Vérifier les liens et la charte**

Run: `grep -n "—\|TODO\|TBD" docs/sources.md agents.md README.md`
Expected: aucune sortie.

Run: `git diff --check`
Expected: aucune erreur.

- [ ] **Step 4: Commit**

```bash
git add docs/sources.md docs/README.md agents.md README.md
git commit -m "docs: formalise la politique de sources"
```

---

### Task 6: Audit WCAG des nouvelles pages

**Files:**
- Create: `docs/accessibilite/audit-2026-10-24.md`
- Modify: `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: `/ressources`, les guides de module, la navigation et les styles.
- Produces: un rapport avec preuves et limites.

- [ ] **Step 1: Ajouter le test clavier**

Dans `smoke.spec.ts` :

```ts
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
```

- [ ] **Step 2: Construire et lancer le preview**

Run: `npm run build`
Expected: build OK.

Run: `MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4182 --strictPort`
Expected: serveur sur `http://127.0.0.1:4182/gestion-projet-it/`.

- [ ] **Step 3: Lancer le smoke et Lighthouse**

Run: `SMOKE_BASE_URL=http://127.0.0.1:4182/gestion-projet-it npm run smoke`
Expected: tous les tests passent, 19 routes.

Run: `npx lighthouse http://127.0.0.1:4182/gestion-projet-it/ressources --only-categories=accessibility,performance --chrome-flags="--headless" --output=json --output-path=./.lighthouse-ressources.json`
Expected: accessibilité et performance ≥ 90. En cas de code de sortie non nul avec un JSON valide, lire le JSON et documenter le cas.

- [ ] **Step 4: Rédiger le rapport**

Le rapport doit contenir :

- périmètre : guides des neuf modules et page Ressources ;
- méthode : tests de structure, smoke clavier, Lighthouse mobile, revue des contrastes et des labels ;
- résultats : titres, landmarks, lien d’évitement, focus, labels, liens externes, ordre de tabulation, contrastes ;
- limites : pas de test avec lecteur d’écran réel, parcours Produit et Cybersécurité non encore ouverts ;
- décision : conforme pour le périmètre du lot, à compléter à l’ouverture des parcours.

- [ ] **Step 5: Commit**

```bash
git add docs/accessibilite/audit-2026-10-24.md smoke/smoke.spec.ts
git commit -m "test: audite l accessibilité des nouvelles pages"
```

---

### Task 7: Statuts, changelog et vérification finale

**Files:**
- Modify: `BACKLOG.md`, `CHANGELOG.md`, `docs/superpowers/specs/2026-10-23-enrichissements-design.md`, `docs/README.md`

**Interfaces:**
- Consumes: les preuves des tasks 1 à 6.
- Produces: un lot traçable et publication PR.

- [ ] **Step 1: Mettre à jour le backlog**

Passer `ENR-001`, `ENR-002`, `ENR-003`, `RES-001`, `RES-004` et `QUA-001` à `Livré`. Ajouter dans chaque preuve le fichier ou le test correspondant. Pour `RES-001`, préciser « 18 ressources de modules et 6 ressources de parcours ». Pour `QUA-001`, préciser « périmètre du lot, parcours à auditer à leur ouverture ».

- [ ] **Step 2: Mettre à jour le changelog et les statuts**

Ajouter dans `CHANGELOG.md` une section « Non publié » avec l’audit, les guides, la bibliothèque, la politique et l’audit WCAG.

Mettre à jour le statut du design 2026-10-23 avec la mention « Lot P0 livré le 24 octobre 2026 ».

- [ ] **Step 3: Vérification complète**

Run: `npm test`
Expected: tous les tests passent.

Run: `npm run lint`
Expected: aucune erreur.

Run: `npm run typecheck`
Expected: aucune erreur.

Run: `npm run build`
Expected: build OK.

Run: `git diff --check`
Expected: aucune erreur.

- [ ] **Step 4: Commit et PR**

```bash
git add BACKLOG.md CHANGELOG.md docs/README.md docs/superpowers/specs/2026-10-23-enrichissements-design.md
git commit -m "docs: clôture le lot enrichissements P0"
git push -u origin feat/enrichissements-p0
gh pr create --base main --head feat/enrichissements-p0 --title "Enrichissements P0 : guides, ressources et accessibilité" --body "## Résumé
- audit éditorial des neuf modules
- erreurs fréquentes et points de décision
- bibliothèque de ressources officielles
- politique de sources
- audit WCAG des nouvelles pages

## Vérification
- tests, lint, typecheck, build
- smoke 19 routes
- Lighthouse Ressources"
```

Attendre la CI verte avant fusion.

---

## Self-Review

- Couverture : audit, erreurs, décisions, ressources, politique et accessibilité sont couverts par une task chacun.
- Pas de placeholder : les tableaux fixent le contenu, les chemins et les interfaces.
- Cohérence des types : `ModuleGuideData`, `GUIDES`, `Ressource`, `GroupeRessources` sont définis avant usage.
- Aucun XP, aucune dépendance runtime, aucun chargement externe automatique.
- Les parcours Produit et Cybersécurité restent au backlog ; seules leurs ressources préparatoires sont listées.

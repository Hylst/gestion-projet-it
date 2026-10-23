# Dossier projet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter un capstone guidé en six étapes, avec dossier écrit, sauvegarde locale, auto-évaluation, badge, export et impression, sans toucher au compteur `0/9` ni à l’XP.

**Architecture:** Une route dédiée orchestre un état local versionné et des composants spécialisés. Le domaine et le stockage restent séparés de l’interface, puis sont intégrés à la navigation, au sitemap et au service worker.

**Tech Stack:** Vite, React 18, TypeScript strict, React Router 7, Vitest, Testing Library, Playwright, CSS existant.

## Global Constraints

- Exécuter dans le worktree existant `D:\0CODE\OpenCode\gestion-projet-it\.worktrees\angles-morts`, branche `angles-morts`. Ne pas créer un nouveau worktree depuis `HEAD` : ce worktree contient le lot précédent non commité.
- Ne pas committer la source, le spec ou le plan sans demande explicite. Remplacer chaque commit du modèle par un checkpoint de tests.
- Ne pas modifier `src/lib/xp.ts`, `src/lib/progress.tsx`, le compteur `0/9` ni les clés `gestion-projet-it:xp`.
- Aucune dépendance supplémentaire, aucun backend, aucun cookie, aucune requête externe.
- Route `basename="/gestion-projet-it/"`, nouvelle route `/dossier-projet`.
- 6 étapes, 23 champs, 12 livrables, 6 critères d’auto-évaluation, 600 caractères par champ.
- Clé de stockage exacte : `gestion-projet-it:dossier-projet:v1`.
- Charte visible : accents, apostrophe `’`, NBSP avant `: ; ? !`, aucun tiret cadratin, aucun auteur ou chiffre inventé.
- Boutons et liens accessibles au clavier ; `fieldset`/`legend` pour les groupes ; focus sur le titre au changement d’étape.
- Aucun script inline ni handler inline.
- Service worker version `gestion-projet-it-v4`.
- Le dépôt Docker est un commit séparé, uniquement après smoke, Lighthouse et accord explicite.

## File Structure

- `src/lib/capstone.ts` : types, contenu des six étapes, critères, validation et calculs de complétion.
- `src/lib/capstoneStorage.ts` : clé, chargement, sauvegarde et export JSON.
- `src/components/capstone/CapstoneField.tsx` : champ court, aide et compteur.
- `src/components/capstone/CapstoneStepper.tsx` : navigation des six étapes.
- `src/components/capstone/CapstoneStep.tsx` : étape active, champs, livrables, boutons.
- `src/components/capstone/CapstoneSummary.tsx` : synthèse, auto-évaluation, badge, export, impression, reset.
- `src/routes/DossierProjet.tsx` : orchestration de l’état, sauvegarde différée et vue synthèse.
- `src/styles/capstone.css` : mise en page, responsive et impression.
- `tests/capstone.test.ts` : domaine et stockage.
- `tests/capstone.test.tsx` : composants et route.
- `tests/header.test.tsx`, `tests/hero.test.tsx`, `tests/typo.test.tsx` : intégration.
- `smoke/smoke.spec.ts` : parcours réel, persistance et impression.
- `src/App.tsx`, `src/components/SiteHeader.tsx`, `src/routes/accueil.tsx`, `src/styles/hero.css`, `public/sitemap.xml`, `public/sw.js` : intégration.

---

### Task 1: Domaine et contenu du capstone

**Files:**
- Create: `src/lib/capstone.ts`
- Create or modify: `tests/capstone.test.ts`

**Interfaces:**
- Produces: `EtapeId`, `ChampId`, `LivrableId`, `CritereId`, `NoteAutoEvaluation`, `DossierProjetState`, `ProgressionDossier`
- Produces: `ETAPES`, `CRITERES`, `CHAMPS_MAX`
- Produces: `etatInitialDossier()`, `validerDossier()`, `estEtapeComplete()`, `estDossierComplet()`, `progressionDossier()`
- Consumes: rien

- [ ] **Step 1: Écrire les tests de domaine**

Créer `tests/capstone.test.ts` avec les cas suivants :

```ts
import { describe, expect, it } from 'vitest';
import {
  CHAMPS_MAX,
  CRITERES,
  ETAPES,
  etatInitialDossier,
  estDossierComplet,
  estEtapeComplete,
  progressionDossier,
  validerDossier,
  type DossierProjetState,
} from '../src/lib/capstone';

const remplirEtape = (etat: DossierProjetState, index: number): DossierProjetState => {
  const etape = ETAPES[index];
  if (!etape) throw new Error('Étape absente');
  for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse courte.';
  for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
  return etat;
};

const dossierComplet = (): DossierProjetState => {
  const etat = etatInitialDossier();
  ETAPES.forEach((_, index) => remplirEtape(etat, index));
  for (const critere of CRITERES) etat.autoEvaluation[critere.id] = 3;
  return etat;
};

describe('contenu du capstone', () => {
  it('contient six étapes, vingt-trois champs, douze livrables et six critères', () => {
    expect(ETAPES).toHaveLength(6);
    expect(ETAPES.flatMap((e) => e.champs)).toHaveLength(23);
    expect(ETAPES.flatMap((e) => e.livrables)).toHaveLength(12);
    expect(CRITERES).toHaveLength(6);
  });

  it('utilise des identifiants uniques', () => {
    const champs = ETAPES.flatMap((e) => e.champs.map((c) => c.id));
    const livrables = ETAPES.flatMap((e) => e.livrables.map((l) => l.id));
    const criteres = CRITERES.map((c) => c.id);
    expect(new Set(champs).size).toBe(champs.length);
    expect(new Set(livrables).size).toBe(livrables.length);
    expect(new Set(criteres).size).toBe(criteres.length);
  });
});

describe('complétion', () => {
  it('part d’un état vide', () => {
    const etat = etatInitialDossier();
    expect(etat.version).toBe(1);
    expect(etat.reponses).toEqual({});
    expect(etat.livrables).toEqual({});
    expect(etat.autoEvaluation).toEqual({});
    expect(etat.etapeCourante).toBe(0);
    expect(estDossierComplet(etat)).toBe(false);
  });

  it('exige les champs et les deux livrables d’une étape', () => {
    const etat = etatInitialDossier();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
    for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse.';
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
    expect(estEtapeComplete(etat, etape.id)).toBe(true);
  });

  it('refuse les champs remplis uniquement d’espaces', () => {
    const etat = etatInitialDossier();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    for (const champ of etape.champs) etat.reponses[champ.id] = '   ';
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
  });

  it('calcule le dossier complet et la progression', () => {
    const etat = dossierComplet();
    expect(estDossierComplet(etat)).toBe(true);
    expect(progressionDossier(etat)).toEqual({
      etapes: 6,
      livrables: 12,
      criteres: 6,
      complet: true,
    });
    delete etat.autoEvaluation[CRITERES[0]?.id ?? 'auto-coherence'];
    expect(estDossierComplet(etat)).toBe(false);
    expect(progressionDossier(etat).criteres).toBe(5);
  });
});

describe('validation', () => {
  it('accepte un état valide et filtre les clés inconnues', () => {
    const brut = {
      version: 1,
      reponses: { 'cadrage-besoin': 'Besoin fictif', inconnu: 'À ignorer' },
      livrables: { 'cadrage-note': true, inconnu: true },
      autoEvaluation: { 'auto-coherence': 2, inconnu: 4 },
      etapeCourante: 3,
      updatedAt: '2026-10-21T10:00:00.000Z',
    };
    const etat = validerDossier(brut);
    expect(etat.reponses).toEqual({ 'cadrage-besoin': 'Besoin fictif' });
    expect(etat.livrables).toEqual({ 'cadrage-note': true });
    expect(etat.autoEvaluation).toEqual({ 'auto-coherence': 2 });
    expect(etat.etapeCourante).toBe(3);
  });

  it('rejette une version inconnue, un tableau, un objet nul et les mauvais types', () => {
    for (const brut of [null, [], { version: 2 }, 'texte', 42]) {
      const etat = validerDossier(brut);
      expect(etat.version).toBe(1);
      expect(etat.reponses).toEqual({});
      expect(etat.etapeCourante).toBe(0);
    }
    const etat = validerDossier({
      version: 1,
      reponses: { 'cadrage-besoin': 42 },
      livrables: { 'cadrage-note': 'oui' },
      autoEvaluation: { 'auto-coherence': 9 },
      etapeCourante: 99,
      updatedAt: 'inconnue',
    });
    expect(etat.reponses).toEqual({});
    expect(etat.livrables).toEqual({});
    expect(etat.autoEvaluation).toEqual({});
    expect(etat.etapeCourante).toBe(0);
    expect(Number.isNaN(Date.parse(etat.updatedAt))).toBe(false);
  });

  it('coupe les réponses à 600 caractères', () => {
    const etat = validerDossier({
      version: 1,
      reponses: { 'cadrage-besoin': 'a'.repeat(700) },
      livrables: {},
      autoEvaluation: {},
      etapeCourante: 0,
      updatedAt: '2026-10-21T10:00:00.000Z',
    });
    expect(etat.reponses['cadrage-besoin']).toHaveLength(CHAMPS_MAX);
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/capstone.test.ts`

Expected: FAIL avec `Cannot find module '../src/lib/capstone'`.

- [ ] **Step 3: Créer le domaine et le contenu**

Créer `src/lib/capstone.ts` dans le worktree. Utiliser exactement les identifiants, libellés, aides et introductions du spec `D:\0CODE\OpenCode\gestion-projet-it\docs\superpowers\specs\2026-10-21-dossier-projet-design.md`, section 4.2. La structure est :

```ts
export const CHAMPS_MAX = 600;

export type EtapeId =
  | 'cadrage'
  | 'planning'
  | 'qualite'
  | 'gouvernance'
  | 'risques'
  | 'changement';

export type ChampId =
  | 'cadrage-besoin'
  | 'cadrage-perimetre'
  | 'cadrage-lots'
  | 'cadrage-criteres'
  | 'planning-jalons'
  | 'planning-charges'
  | 'planning-alea'
  | 'planning-budget'
  | 'qualite-methode'
  | 'qualite-acceptation'
  | 'qualite-recette'
  | 'gouvernance-roles'
  | 'gouvernance-raci'
  | 'gouvernance-communication'
  | 'gouvernance-decisions'
  | 'risques-registre'
  | 'risques-indicateurs'
  | 'risques-rituels'
  | 'risques-verification'
  | 'changement-actions'
  | 'changement-relais'
  | 'changement-mesures'
  | 'changement-bilan';

export type LivrableId =
  | 'cadrage-note'
  | 'cadrage-wbs'
  | 'planning-plan'
  | 'planning-chiffrage'
  | 'qualite-decision'
  | 'qualite-plan-recette'
  | 'gouvernance-organisation'
  | 'gouvernance-plan-communication'
  | 'risques-tableau'
  | 'suivi-tableau'
  | 'changement-plan'
  | 'changement-bilan-note';

export type CritereId =
  | 'auto-coherence'
  | 'auto-tracabilite'
  | 'auto-realisme'
  | 'auto-qualite'
  | 'auto-gouvernance'
  | 'auto-changement';

export type NoteAutoEvaluation = 1 | 2 | 3 | 4;

export interface Champ { id: ChampId; label: string; aide: string }
export interface Livrable { id: LivrableId; label: string }
export interface Etape {
  id: EtapeId;
  titre: string;
  intro: string;
  champs: readonly Champ[];
  livrables: readonly Livrable[];
}
export interface Critere { id: CritereId; label: string }

export interface DossierProjetState {
  version: 1;
  reponses: Record<string, string>;
  livrables: Record<string, boolean>;
  autoEvaluation: Record<string, NoteAutoEvaluation>;
  etapeCourante: number;
  updatedAt: string;
}

export interface ProgressionDossier {
  etapes: number;
  livrables: number;
  criteres: number;
  complet: boolean;
}
```

Puis définir `ETAPES` avec six entrées et `CRITERES` avec six entrées. Les textes visibles doivent respecter la charte. Exemple de première étape :

```ts
export const ETAPES: readonly Etape[] = [
  {
    id: 'cadrage',
    titre: 'Cadrer et découper',
    intro: 'Reprends le besoin fictif des Amis du Square\u00A0: une page de présentation, un agenda et un formulaire de contact. Commence par délimiter ce que le projet fait et ne fait pas.',
    champs: [
      { id: 'cadrage-besoin', label: 'Besoin', aide: 'En une ou deux phrases, le problème à résoudre pour l’association.' },
      { id: 'cadrage-perimetre', label: 'Périmètre inclus et exclu', aide: 'Ce que le projet livre, ce qu’il laisse de côté.' },
      { id: 'cadrage-lots', label: 'Trois lots de travail', aide: 'Découpe le projet en trois lots livrables et nomme-les.' },
      { id: 'cadrage-criteres', label: 'Critères de réussite', aide: 'Trois signes observables qui montreront que le projet est réussi.' },
    ],
    livrables: [
      { id: 'cadrage-note', label: 'Note de cadrage' },
      { id: 'cadrage-wbs', label: 'WBS en trois lots' },
    ],
  },
];
```

Les cinq étapes restantes reprennent le tableau 4.2 du spec, avec les mêmes identifiants et libellés :

| id | titre | champs | livrables |
|---|---|---|---|
| `planning` | Planifier et chiffrer | `planning-jalons` Jalons et dépendances ; `planning-charges` Charges fictives ; `planning-alea` Marge d’aléa ; `planning-budget` Budget fictif | `planning-plan` Planning et jalons ; `planning-chiffrage` Chiffrage et marge |
| `qualite` | Choisir la méthode et la qualité | `qualite-methode` Méthode retenue et motif ; `qualite-acceptation` Critères d’acceptation ; `qualite-recette` Recette et non-régression | `qualite-decision` Décision de méthode ; `qualite-plan-recette` Plan de recette |
| `gouvernance` | Organiser l’équipe et la gouvernance | `gouvernance-roles` Rôles ; `gouvernance-raci` RACI simplifié ; `gouvernance-communication` Plan de communication ; `gouvernance-decisions` Journal de décisions | `gouvernance-organisation` Rôles et RACI ; `gouvernance-plan-communication` Plan de communication |
| `risques` | Gérer les risques et le suivi | `risques-registre` Trois risques et parades ; `risques-indicateurs` Indicateurs de suivi ; `risques-rituels` Rituels et outils ; `risques-verification` Chaîne de vérification | `risques-tableau` Registre des risques ; `suivi-tableau` Tableau de suivi |
| `changement` | Conduire le changement et conclure | `changement-actions` Actions d’adoption ; `changement-relais` Relais et formation ; `changement-mesures` Mesures de retour ; `changement-bilan` Bilan | `changement-plan` Plan de changement ; `changement-bilan-note` Note de bilan |

Chaque entrée ajoute une introduction courte et une aide par champ, dans la charte du cours. Ne pas ajouter de champ, de livrable ou de critère au-delà de ce tableau.

Fonctions à implémenter :

```ts
const CHAMP_IDS = new Set<ChampId>(ETAPES.flatMap((e) => e.champs.map((c) => c.id)));
const LIVRABLE_IDS = new Set<LivrableId>(ETAPES.flatMap((e) => e.livrables.map((l) => l.id)));
const CRITERE_IDS = new Set<CritereId>(CRITERES.map((c) => c.id));

const estObjet = (valeur: unknown): valeur is Record<string, unknown> =>
  typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur);

export function etatInitialDossier(): DossierProjetState {
  return {
    version: 1,
    reponses: {},
    livrables: {},
    autoEvaluation: {},
    etapeCourante: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function validerDossier(valeur: unknown): DossierProjetState {
  const initial = etatInitialDossier();
  if (!estObjet(valeur) || valeur.version !== 1) return initial;

  const reponses: Record<string, string> = {};
  if (estObjet(valeur.reponses)) {
    for (const [cle, contenu] of Object.entries(valeur.reponses)) {
      if (CHAMP_IDS.has(cle as ChampId) && typeof contenu === 'string') {
        reponses[cle] = contenu.slice(0, CHAMPS_MAX);
      }
    }
  }

  const livrables: Record<string, boolean> = {};
  if (estObjet(valeur.livrables)) {
    for (const [cle, contenu] of Object.entries(valeur.livrables)) {
      if (LIVRABLE_IDS.has(cle as LivrableId) && typeof contenu === 'boolean') {
        livrables[cle] = contenu;
      }
    }
  }

  const autoEvaluation: Record<string, NoteAutoEvaluation> = {};
  if (estObjet(valeur.autoEvaluation)) {
    for (const [cle, contenu] of Object.entries(valeur.autoEvaluation)) {
      if (CRITERE_IDS.has(cle as CritereId) && (contenu === 1 || contenu === 2 || contenu === 3 || contenu === 4)) {
        autoEvaluation[cle] = contenu;
      }
    }
  }

  const etapeCourante =
    typeof valeur.etapeCourante === 'number' &&
    Number.isInteger(valeur.etapeCourante) &&
    valeur.etapeCourante >= 0 &&
    valeur.etapeCourante < ETAPES.length
      ? valeur.etapeCourante
      : 0;

  const updatedAt =
    typeof valeur.updatedAt === 'string' && !Number.isNaN(Date.parse(valeur.updatedAt))
      ? valeur.updatedAt
      : initial.updatedAt;

  return { version: 1, reponses, livrables, autoEvaluation, etapeCourante, updatedAt };
}

export function estEtapeComplete(etat: DossierProjetState, etapeId: EtapeId): boolean {
  const etape = ETAPES.find((e) => e.id === etapeId);
  if (!etape) return false;
  const champsRemplis = etape.champs.every((c) => (etat.reponses[c.id] ?? '').trim().length > 0);
  const livrablesCoches = etape.livrables.every((l) => etat.livrables[l.id] === true);
  return champsRemplis && livrablesCoches;
}

export function estDossierComplet(etat: DossierProjetState): boolean {
  return (
    ETAPES.every((etape) => estEtapeComplete(etat, etape.id)) &&
    CRITERES.every((critere) => etat.autoEvaluation[critere.id] !== undefined)
  );
}

export function progressionDossier(etat: DossierProjetState): ProgressionDossier {
  const etapes = ETAPES.filter((etape) => estEtapeComplete(etat, etape.id)).length;
  const livrables = ETAPES.flatMap((etape) => etape.livrables)
    .filter((l) => etat.livrables[l.id] === true).length;
  const criteres = CRITERES.filter((critere) => etat.autoEvaluation[critere.id] !== undefined).length;
  return {
    etapes,
    livrables,
    criteres,
    complet: etapes === ETAPES.length && livrables === 12 && criteres === CRITERES.length,
  };
}
```

- [ ] **Step 4: Lancer le test pour vérifier le succès**

Run: `npx vitest run tests/capstone.test.ts`

Expected: PASS.

- [ ] **Step 5: Checkpoint typecheck**

Run: `npm run typecheck`

Expected: aucune erreur.

---

### Task 2: Stockage local et export JSON

**Files:**
- Create: `src/lib/capstoneStorage.ts`
- Modify: `tests/capstone.test.ts`

**Interfaces:**
- Consumes: `DossierProjetState`, `validerDossier` de `src/lib/capstone.ts`
- Produces: `DOSSIER_STORAGE_KEY`, `ChargementDossier`, `chargerDossier()`, `sauvegarderDossier()`, `exporterDossier()`, `stockageDisponible()`

- [ ] **Step 1: Ajouter les tests de stockage et d’export**

Ajouter les imports en tête de `tests/capstone.test.ts`, avec les imports existants, puis les tests à la fin du fichier :

```ts
import {
  DOSSIER_STORAGE_KEY,
  chargerDossier,
  exporterDossier,
  sauvegarderDossier,
  stockageDisponible,
} from '../src/lib/capstoneStorage';

class MemoireStockage {
  private donnees = new Map<string, string>();
  getItem(cle: string) { return this.donnees.get(cle) ?? null; }
  setItem(cle: string, valeur: string) { this.donnees.set(cle, valeur); }
  removeItem(cle: string) { this.donnees.delete(cle); }
  clear() { this.donnees.clear(); }
  key(index: number) { return [...this.donnees.keys()][index] ?? null; }
  get length() { return this.donnees.size; }
}

const stockageQuotaPlein = (): MemoireStockage => {
  const stockage = new MemoireStockage();
  stockage.setItem = () => { throw new Error('quota'); };
  return stockage;
};

describe('stockage du dossier', () => {
  it('retourne un état initial si la clé est absente', () => {
    const chargement = chargerDossier(new MemoireStockage());
    expect(chargement.etat.version).toBe(1);
    expect(chargement.avertissement).toBeNull();
  });

  it('sauvegarde puis recharge un état valide', () => {
    const stockage = new MemoireStockage();
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin fictif';
    etat.etapeCourante = 2;
    expect(sauvegarderDossier(etat, stockage)).toBeNull();
    expect(stockage.getItem(DOSSIER_STORAGE_KEY)).toContain('Besoin fictif');
    const chargement = chargerDossier(stockage);
    expect(chargement.etat.reponses['cadrage-besoin']).toBe('Besoin fictif');
    expect(chargement.etat.etapeCourante).toBe(2);
    expect(chargement.avertissement).toBeNull();
  });

  it('signale un JSON corrompu ou une forme inattendue et repart d’un état initial', () => {
    for (const brut of ['{', '[]', 'null', '{"version":2}', '"texte"']) {
      const stockage = new MemoireStockage();
      stockage.setItem(DOSSIER_STORAGE_KEY, brut);
      const chargement = chargerDossier(stockage);
      expect(chargement.etat.version, brut).toBe(1);
      expect(chargement.avertissement, brut).toBe('corrompu');
    }
  });

  it('détecte un stockage indisponible ou plein sans jeter', () => {
    expect(stockageDisponible(null)).toBe(false);
    expect(stockageDisponible(stockageQuotaPlein())).toBe(false);
    expect(sauvegarderDossier(etatInitialDossier(), null)).toContain('indisponible');
    expect(sauvegarderDossier(etatInitialDossier(), stockageQuotaPlein())).toContain('échoué');
  });

  it('sérialise un export versionné avec une date', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin fictif';
    const charge = JSON.parse(exporterDossier(etat)) as {
      version: number;
      exportedAt: string;
      dossier: { reponses: Record<string, string> };
    };
    expect(charge.version).toBe(1);
    expect(Number.isNaN(Date.parse(charge.exportedAt))).toBe(false);
    expect(charge.dossier.reponses['cadrage-besoin']).toBe('Besoin fictif');
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/capstone.test.ts`

Expected: FAIL avec `Cannot find module '../src/lib/capstoneStorage'`.

- [ ] **Step 3: Implémenter le stockage et l’export**

Créer `src/lib/capstoneStorage.ts` :

```ts
import { etatInitialDossier, validerDossier, type DossierProjetState } from './capstone';

export const DOSSIER_STORAGE_KEY = 'gestion-projet-it:dossier-projet:v1';

export interface ChargementDossier {
  etat: DossierProjetState;
  avertissement: 'corrompu' | null;
}

const stockageNavigateur = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function stockageDisponible(stockage: Storage | null = stockageNavigateur()): boolean {
  if (!stockage) return false;
  try {
    const cle = '__gestion_projet_it_test__';
    stockage.setItem(cle, '1');
    stockage.removeItem(cle);
    return true;
  } catch {
    return false;
  }
}

export function chargerDossier(stockage: Storage | null = stockageNavigateur()): ChargementDossier {
  if (!stockage) return { etat: etatInitialDossier(), avertissement: null };
  let brut: string | null;
  try {
    brut = stockage.getItem(DOSSIER_STORAGE_KEY);
  } catch {
    return { etat: etatInitialDossier(), avertissement: null };
  }
  if (brut === null) return { etat: etatInitialDossier(), avertissement: null };
  try {
    const valeur: unknown = JSON.parse(brut);
    if (
      typeof valeur !== 'object' ||
      valeur === null ||
      Array.isArray(valeur) ||
      (valeur as { version?: unknown }).version !== 1
    ) {
      return { etat: etatInitialDossier(), avertissement: 'corrompu' };
    }
    return { etat: validerDossier(valeur), avertissement: null };
  } catch {
    return { etat: etatInitialDossier(), avertissement: 'corrompu' };
  }
}

export function sauvegarderDossier(
  etat: DossierProjetState,
  stockage: Storage | null = stockageNavigateur(),
): string | null {
  if (!stockage) return 'Le stockage local est indisponible\u00A0: le dossier ne sera pas conservé après fermeture.';
  try {
    stockage.setItem(
      DOSSIER_STORAGE_KEY,
      JSON.stringify({ ...etat, updatedAt: new Date().toISOString() }),
    );
    return null;
  } catch {
    return 'La sauvegarde locale a échoué\u00A0: exporte le dossier pour ne pas perdre ta progression.';
  }
}

const dateISO = (): string => new Date().toISOString();

export function exporterDossier(etat: DossierProjetState): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: dateISO(),
      dossier: { ...etat, updatedAt: dateISO() },
    },
    null,
    2,
  );
}
```

- [ ] **Step 4: Lancer le test pour vérifier le succès**

Run: `npx vitest run tests/capstone.test.ts`

Expected: PASS.

---

### Task 3: Champ, navigation et étape

**Files:**
- Create: `src/components/capstone/CapstoneField.tsx`
- Create: `src/components/capstone/CapstoneStepper.tsx`
- Create: `src/components/capstone/CapstoneStep.tsx`
- Create: `tests/capstone.test.tsx`

**Interfaces:**
- Consumes: `Champ`, `Etape`, `DossierProjetState`, `estEtapeComplete` de `src/lib/capstone.ts`
- Produces: composants `CapstoneField`, `CapstoneStepper`, `CapstoneStep`

- [ ] **Step 1: Écrire les tests des composants**

Créer `tests/capstone.test.tsx` :

```tsx
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ETAPES } from '../src/lib/capstone';
import { CapstoneField } from '../src/components/capstone/CapstoneField';
import { CapstoneStepper } from '../src/components/capstone/CapstoneStepper';
import { CapstoneStep } from '../src/components/capstone/CapstoneStep';

function ChampControle({ onChange }: { onChange: (valeur: string) => void }) {
  const [valeur, setValeur] = useState('');
  return (
    <CapstoneField
      champ={{ id: 'cadrage-besoin', label: 'Besoin', aide: 'Décris le besoin.' }}
      valeur={valeur}
      onChange={(suivante) => {
        setValeur(suivante);
        onChange(suivante);
      }}
    />
  );
}

describe('CapstoneField', () => {
  it('associe le label, l’aide et le compteur au champ', async () => {
    const utilisateur = userEvent.setup();
    const onChange = vi.fn();
    render(<ChampControle onChange={onChange} />);
    const champ = screen.getByLabelText('Besoin');
    expect(champ).toHaveAccessibleDescription('Décris le besoin.');
    await utilisateur.type(champ, 'Un besoin');
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText('9/600')).toBeInTheDocument();
  });

  it('affiche une erreur explicite', () => {
    render(
      <CapstoneField
        champ={{ id: 'cadrage-besoin', label: 'Besoin', aide: 'Décris le besoin.' }}
        valeur=""
        onChange={() => undefined}
        erreur="Ce champ est obligatoire."
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Ce champ est obligatoire.');
  });
});

describe('CapstoneStepper', () => {
  it('rend six étapes et marque l’étape courante', () => {
    render(
      <CapstoneStepper
        etapes={ETAPES}
        etapeCourante={0}
        complete={(id) => id === 'cadrage'}
        onSelect={() => undefined}
      />,
    );
    expect(screen.getAllByRole('button')).toHaveLength(6);
    expect(screen.getByRole('button', { name: /Cadrer et découper/ })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('Terminée')).toBeInTheDocument();
  });
});

describe('CapstoneStep', () => {
  it('transmet les réponses et les livrables', async () => {
    const utilisateur = userEvent.setup();
    const onReponse = vi.fn();
    const onLivrable = vi.fn();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    render(
      <CapstoneStep
        etape={etape}
        index={0}
        total={6}
        state={{
          version: 1,
          reponses: {},
          livrables: {},
          autoEvaluation: {},
          etapeCourante: 0,
          updatedAt: '2026-10-21T10:00:00.000Z',
        }}
        onReponse={onReponse}
        onLivrable={onLivrable}
        onPrecedent={() => undefined}
        onSuivant={() => undefined}
        onVoirSynthese={() => undefined}
      />,
    );
    const champ = screen.getByLabelText('Besoin');
    await utilisateur.type(champ, 'x');
    expect(onReponse).toHaveBeenCalledWith('cadrage-besoin', 'x');
    await utilisateur.click(screen.getByRole('checkbox', { name: 'Note de cadrage' }));
    expect(onLivrable).toHaveBeenCalledWith('cadrage-note', true);
    expect(screen.getByRole('heading', { name: 'Cadrer et découper' })).toHaveFocus();
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/capstone.test.tsx`

Expected: FAIL avec les modules de composants introuvables.

- [ ] **Step 3: Créer `CapstoneField`**

Créer `src/components/capstone/CapstoneField.tsx` :

```tsx
import { useId } from 'react';
import type { Champ } from '../../lib/capstone';

interface CapstoneFieldProps {
  champ: Champ;
  valeur: string;
  onChange: (valeur: string) => void;
  erreur?: string;
}

export function CapstoneField({ champ, valeur, onChange, erreur }: CapstoneFieldProps) {
  const id = useId();
  const aideId = `${id}-aide`;
  const erreurId = `${id}-erreur`;
  return (
    <div className={`capstone-field${erreur ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{champ.label}</label>
      <p id={aideId} className="capstone-field__aide">{champ.aide}</p>
      <textarea
        id={id}
        value={valeur}
        maxLength={600}
        rows={6}
        aria-describedby={erreur ? `${aideId} ${erreurId}` : aideId}
        aria-invalid={erreur ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="capstone-field__meta">
        {erreur ? <p id={erreurId} role="alert">{erreur}</p> : <span />}
        <span aria-hidden="true">{valeur.length}/600</span>
        <span className="sr-only">{valeur.length} caractères sur 600.</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Créer `CapstoneStepper`**

Créer `src/components/capstone/CapstoneStepper.tsx` :

```tsx
import type { Etape, EtapeId } from '../../lib/capstone';

interface CapstoneStepperProps {
  etapes: readonly Etape[];
  etapeCourante: number;
  complete: (id: EtapeId) => boolean;
  onSelect: (index: number) => void;
}

export function CapstoneStepper({ etapes, etapeCourante, complete, onSelect }: CapstoneStepperProps) {
  return (
    <nav className="capstone-stepper" aria-label="Étapes du dossier">
      <ol>
        {etapes.map((etape, index) => {
          const estCourante = index === etapeCourante;
          const estComplete = complete(etape.id);
          return (
            <li key={etape.id}>
              <button
                type="button"
                aria-current={estCourante ? 'step' : undefined}
                className={estCourante ? 'is-current' : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="capstone-stepper__num">{index + 1}</span>
                <span>
                  <span className="capstone-stepper__titre">{etape.titre}</span>
                  <span className="capstone-stepper__statut">
                    {estComplete ? 'Terminée' : 'À compléter'}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 5: Créer `CapstoneStep`**

Créer `src/components/capstone/CapstoneStep.tsx` :

```tsx
import { useEffect, useRef } from 'react';
import type { DossierProjetState, Etape } from '../../lib/capstone';
import { CapstoneField } from './CapstoneField';

interface CapstoneStepProps {
  etape: Etape;
  index: number;
  total: number;
  state: DossierProjetState;
  onReponse: (id: string, valeur: string) => void;
  onLivrable: (id: string, coche: boolean) => void;
  onPrecedent: () => void;
  onSuivant: () => void;
  onVoirSynthese: () => void;
}

export function CapstoneStep({
  etape,
  index,
  total,
  state,
  onReponse,
  onLivrable,
  onPrecedent,
  onSuivant,
  onVoirSynthese,
}: CapstoneStepProps) {
  const titreRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    titreRef.current?.focus();
  }, [etape.id]);
  const estDerniere = index === total - 1;

  return (
    <section className="capstone-step" aria-labelledby="capstone-step-titre">
      <p className="capstone-step__compteur">Étape {index + 1} sur {total}</p>
      <h2 id="capstone-step-titre" ref={titreRef} tabIndex={-1}>
        {etape.titre}
      </h2>
      <p className="capstone-step__intro">{etape.intro}</p>
      <div className="capstone-step__champs">
        {etape.champs.map((champ) => (
          <CapstoneField
            key={champ.id}
            champ={champ}
            valeur={state.reponses[champ.id] ?? ''}
            onChange={(valeur) => onReponse(champ.id, valeur)}
          />
        ))}
      </div>
      <fieldset className="capstone-step__livrables">
        <legend>Livrables de l’étape</legend>
        {etape.livrables.map((livrable) => (
          <label key={livrable.id}>
            <input
              type="checkbox"
              checked={state.livrables[livrable.id] === true}
              onChange={(event) => onLivrable(livrable.id, event.target.checked)}
            />
            {livrable.label}
          </label>
        ))}
      </fieldset>
      <div className="capstone-step__actions">
        <button type="button" className="btn secondary" onClick={onPrecedent} disabled={index === 0}>
          Étape précédente
        </button>
        {estDerniere ? (
          <button type="button" className="btn btn-primary" onClick={onVoirSynthese}>
            Voir la synthèse
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onSuivant}>
            Étape suivante
          </button>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Lancer les tests**

Run: `npx vitest run tests/capstone.test.tsx`

Expected: PASS. Si le focus échoue, vérifier que le composant est monté avec l’étape et que `tabIndex={-1}` est présent.

- [ ] **Step 7: Checkpoint typecheck**

Run: `npm run typecheck`

Expected: aucune erreur.

---

### Task 4: Synthèse, auto-évaluation et badge

**Files:**
- Create: `src/components/capstone/CapstoneSummary.tsx`
- Modify: `tests/capstone.test.tsx`

**Interfaces:**
- Consumes: `CRITERES`, `ETAPES`, `DossierProjetState`, `NoteAutoEvaluation`, `CritereId`, `estDossierComplet`, `progressionDossier`
- Produces: composant `CapstoneSummary`

- [ ] **Step 1: Ajouter les tests de synthèse**

Ajouter les imports en tête de `tests/capstone.test.tsx`, avec les imports existants, puis les tests à la fin du fichier :

```tsx
import { CRITERES, etatInitialDossier, type DossierProjetState } from '../src/lib/capstone';
import { CapstoneSummary } from '../src/components/capstone/CapstoneSummary';

const dossierRempli = (): DossierProjetState => {
  const etat = etatInitialDossier();
  for (const etape of ETAPES) {
    for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse fictive.';
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
  }
  for (const critere of CRITERES) etat.autoEvaluation[critere.id] = 3;
  return etat;
};

describe('CapstoneSummary', () => {
  it('affiche le total indicatif et le badge quand tout est rempli', () => {
    render(
      <CapstoneSummary
        state={dossierRempli()}
        onNote={() => undefined}
        onRetour={() => undefined}
        onExport={() => undefined}
        onPrint={() => undefined}
        onReset={() => undefined}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Synthèse du dossier' })).toBeInTheDocument();
    expect(screen.getByText('18/24')).toBeInTheDocument();
    expect(screen.getByText('Dossier complet')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6);
  });

  it('n’affiche pas le badge si un champ manque', () => {
    const etat = dossierRempli();
    delete etat.reponses[ETAPES[0]?.champs[0]?.id ?? 'cadrage-besoin'];
    render(
      <CapstoneSummary
        state={etat}
        onNote={() => undefined}
        onRetour={() => undefined}
        onExport={() => undefined}
        onPrint={() => undefined}
        onReset={() => undefined}
      />,
    );
    expect(screen.queryByText('Dossier complet')).not.toBeInTheDocument();
    expect(screen.getAllByText('Non renseigné').length).toBeGreaterThan(0);
  });

  it('transmet les notes et les actions', async () => {
    const utilisateur = userEvent.setup();
    const onNote = vi.fn();
    const onExport = vi.fn();
    const onPrint = vi.fn();
    const onRetour = vi.fn();
    render(
      <CapstoneSummary
        state={dossierRempli()}
        onNote={onNote}
        onRetour={onRetour}
        onExport={onExport}
        onPrint={onPrint}
        onReset={() => undefined}
      />,
    );
    await utilisateur.click(screen.getAllByLabelText('4 Abouti')[0] as HTMLElement);
    expect(onNote).toHaveBeenCalledWith(CRITERES[0]?.id, 4);
    await utilisateur.click(screen.getByRole('button', { name: 'Exporter en JSON' }));
    expect(onExport).toHaveBeenCalledOnce();
    await utilisateur.click(screen.getByRole('button', { name: 'Imprimer' }));
    expect(onPrint).toHaveBeenCalledOnce();
    await utilisateur.click(screen.getByRole('button', { name: 'Revenir aux étapes' }));
    expect(onRetour).toHaveBeenCalledOnce();
  });

  it('demande une confirmation en deux temps pour réinitialiser', async () => {
    const utilisateur = userEvent.setup();
    const onReset = vi.fn();
    render(
      <CapstoneSummary
        state={dossierRempli()}
        onNote={() => undefined}
        onRetour={() => undefined}
        onExport={() => undefined}
        onPrint={() => undefined}
        onReset={onReset}
      />,
    );
    await utilisateur.click(screen.getByRole('button', { name: 'Réinitialiser le dossier' }));
    expect(screen.getByRole('button', { name: 'Annuler' })).toHaveFocus();
    expect(onReset).not.toHaveBeenCalled();
    await utilisateur.click(screen.getByRole('button', { name: 'Confirmer la réinitialisation' }));
    expect(onReset).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/capstone.test.tsx`

Expected: FAIL avec le module `CapstoneSummary` introuvable.

- [ ] **Step 3: Créer `CapstoneSummary`**

Créer `src/components/capstone/CapstoneSummary.tsx` :

```tsx
import { useEffect, useRef, useState } from 'react';
import {
  CRITERES,
  ETAPES,
  estDossierComplet,
  progressionDossier,
  type CritereId,
  type DossierProjetState,
  type NoteAutoEvaluation,
} from '../../lib/capstone';

interface CapstoneSummaryProps {
  state: DossierProjetState;
  onNote: (id: CritereId, note: NoteAutoEvaluation) => void;
  onRetour: () => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
}

const NIVEAUX: ReadonlyArray<{ note: NoteAutoEvaluation; label: string }> = [
  { note: 1, label: 'À reprendre' },
  { note: 2, label: 'Partiel' },
  { note: 3, label: 'Solide' },
  { note: 4, label: 'Abouti' },
];

export function CapstoneSummary({
  state,
  onNote,
  onRetour,
  onExport,
  onPrint,
  onReset,
}: CapstoneSummaryProps) {
  const [confirmerReset, setConfirmerReset] = useState(false);
  const annulerRef = useRef<HTMLButtonElement>(null);
  const complet = estDossierComplet(state);
  const progression = progressionDossier(state);
  const total = CRITERES.reduce((somme, critere) => somme + (state.autoEvaluation[critere.id] ?? 0), 0);

  useEffect(() => {
    if (confirmerReset) annulerRef.current?.focus();
  }, [confirmerReset]);

  return (
    <section className="capstone-summary" aria-labelledby="capstone-summary-titre">
      <h2 id="capstone-summary-titre">Synthèse du dossier</h2>
      <p className="capstone-summary__intro">
        Relis les réponses, vérifie les livrables et note ton dossier. L’auto-évaluation est indicative et ne remplace pas une correction.
      </p>
      {complet ? (
        <p className="capstone-badge" role="status">Dossier complet</p>
      ) : (
        <p className="capstone-summary__manque" role="status">
          {progression.etapes}/6 étapes, {progression.livrables}/12 livrables et {progression.criteres}/6 critères renseignés.
        </p>
      )}

      {ETAPES.map((etape, index) => (
        <section key={etape.id} className="capstone-summary__etape" aria-labelledby={`resume-${etape.id}`}>
          <h3 id={`resume-${etape.id}`}>{index + 1}. {etape.titre}</h3>
          <dl>
            {etape.champs.map((champ) => (
              <div key={champ.id}>
                <dt>{champ.label}</dt>
                <dd>{state.reponses[champ.id]?.trim() ? state.reponses[champ.id] : 'Non renseigné'}</dd>
              </div>
            ))}
          </dl>
          <ul className="capstone-summary__livrables">
            {etape.livrables.map((livrable) => (
              <li key={livrable.id}>
                <span aria-hidden="true">{state.livrables[livrable.id] ? '✓' : '○'}</span>{' '}
                {livrable.label}{' '}
                <span>{state.livrables[livrable.id] ? 'fait' : 'à faire'}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <fieldset className="capstone-summary__auto">
        <legend>Auto-évaluation</legend>
        <p>Total indicatif&nbsp;: <strong>{total}/24</strong>. Auto-évaluation indicative, sans valeur de certification.</p>
        {CRITERES.map((critere) => (
          <fieldset key={critere.id}>
            <legend>{critere.label}</legend>
            {NIVEAUX.map(({ note, label }) => (
              <label key={note}>
                <input
                  type="radio"
                  name={critere.id}
                  value={note}
                  checked={state.autoEvaluation[critere.id] === note}
                  onChange={() => onNote(critere.id, note)}
                />
                {note} {label}
              </label>
            ))}
          </fieldset>
        ))}
      </fieldset>

      <div className="capstone-summary__actions">
        <button type="button" className="btn secondary" onClick={onRetour}>Revenir aux étapes</button>
        <button type="button" className="btn secondary" onClick={onExport}>Exporter en JSON</button>
        <button type="button" className="btn secondary" onClick={onPrint}>Imprimer</button>
        {!confirmerReset ? (
          <button type="button" className="btn danger" onClick={() => setConfirmerReset(true)}>
            Réinitialiser le dossier
          </button>
        ) : (
          <div className="capstone-summary__confirmation" role="group" aria-label="Confirmation de réinitialisation">
            <p>Réinitialiser efface les réponses locales. Cette action est immédiate.</p>
            <button ref={annulerRef} type="button" className="btn secondary" onClick={() => setConfirmerReset(false)}>
              Annuler
            </button>
            <button type="button" className="btn danger" onClick={onReset}>
              Confirmer la réinitialisation
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Lancer les tests**

Run: `npx vitest run tests/capstone.test.tsx`

Expected: PASS.

- [ ] **Step 5: Checkpoint typecheck**

Run: `npm run typecheck`

Expected: aucune erreur.

---

### Task 5: Route, orchestration et feuille de style

**Files:**
- Create: `src/routes/DossierProjet.tsx`
- Create: `src/styles/capstone.css`
- Modify: `tests/capstone.test.tsx`

**Interfaces:**
- Consumes: `ETAPES`, `DossierProjetState`, `CritereId`, `NoteAutoEvaluation`, `etatInitialDossier`, `estEtapeComplete` ; `chargerDossier`, `sauvegarderDossier`, `exporterDossier`, `stockageDisponible` ; composants `CapstoneStepper`, `CapstoneStep`, `CapstoneSummary`
- Produces: route par défaut `DossierProjet`

- [ ] **Step 1: Ajouter les tests de route**

Ajouter les imports en tête de `tests/capstone.test.tsx`, avec les imports existants, puis les tests à la fin du fichier. Compléter l’import de `@testing-library/react` avec `act`, `cleanup` et `fireEvent`, et l’import de Vitest avec `beforeEach` et `afterEach` :

```tsx
import { act, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DossierProjet from '../src/routes/DossierProjet';
import { DOSSIER_STORAGE_KEY } from '../src/lib/capstoneStorage';

const rendreRoute = () =>
  render(
    <MemoryRouter>
      <DossierProjet />
    </MemoryRouter>,
  );

describe('route Dossier projet', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('affiche le parcours et sauvegarde après 300 ms', () => {
    rendreRoute();
    expect(screen.getByRole('heading', { name: 'Dossier projet' })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Besoin'), { target: { value: 'Besoin fictif' } });
    expect(localStorage.getItem(DOSSIER_STORAGE_KEY)).toBeNull();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(localStorage.getItem(DOSSIER_STORAGE_KEY)).toContain('Besoin fictif');
  });

  it('reprend un dossier enregistré', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin repris';
    etat.etapeCourante = 0;
    localStorage.setItem(DOSSIER_STORAGE_KEY, JSON.stringify(etat));
    rendreRoute();
    expect(screen.getByLabelText('Besoin')).toHaveValue('Besoin repris');
  });

  it('signale un dossier corrompu sans bloquer', () => {
    localStorage.setItem(DOSSIER_STORAGE_KEY, '{');
    rendreRoute();
    expect(screen.getByRole('alert')).toHaveTextContent('illisible');
    expect(screen.getByLabelText('Besoin')).toHaveValue('');
  });

  it('navigue vers la synthèse et revient aux étapes', () => {
    rendreRoute();
    fireEvent.click(screen.getByRole('button', { name: /Conduire le changement/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Voir la synthèse' }));
    expect(screen.getByRole('heading', { name: 'Synthèse du dossier' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Revenir aux étapes' }));
    expect(screen.getByRole('button', { name: 'Voir la synthèse' })).toBeInTheDocument();
  });

  it('force la sauvegarde au changement d’étape', () => {
    rendreRoute();
    fireEvent.change(screen.getByLabelText('Besoin'), { target: { value: 'Avant de changer' } });
    fireEvent.click(screen.getByRole('button', { name: 'Étape suivante' }));
    const enregistre = localStorage.getItem(DOSSIER_STORAGE_KEY) ?? '';
    expect(enregistre).toContain('Avant de changer');
    expect(enregistre).toContain('"etapeCourante":1');
  });

  it('réinitialise le dossier après confirmation', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'À effacer';
    localStorage.setItem(DOSSIER_STORAGE_KEY, JSON.stringify(etat));
    rendreRoute();
    fireEvent.click(screen.getByRole('button', { name: /Conduire le changement/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Voir la synthèse' }));
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser le dossier' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmer la réinitialisation' }));
    expect(screen.getByRole('button', { name: 'Étape suivante' })).toBeInTheDocument();
    expect(screen.getByLabelText('Besoin')).toHaveValue('');
    const enregistre = localStorage.getItem(DOSSIER_STORAGE_KEY) ?? '';
    expect(enregistre).not.toContain('À effacer');
  });
});
```

- [ ] **Step 2: Lancer le test pour vérifier l’échec**

Run: `npx vitest run tests/capstone.test.tsx`

Expected: FAIL avec le module `src/routes/DossierProjet` introuvable.

- [ ] **Step 3: Créer la route**

Créer `src/routes/DossierProjet.tsx` :

```tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { SeoHead } from '../components/SeoHead';
import { CapstoneStepper } from '../components/capstone/CapstoneStepper';
import { CapstoneStep } from '../components/capstone/CapstoneStep';
import { CapstoneSummary } from '../components/capstone/CapstoneSummary';
import {
  ETAPES,
  etatInitialDossier,
  estEtapeComplete,
  type CritereId,
  type DossierProjetState,
  type NoteAutoEvaluation,
} from '../lib/capstone';
import {
  chargerDossier,
  exporterDossier,
  sauvegarderDossier,
  stockageDisponible,
} from '../lib/capstoneStorage';
import '../styles/capstone.css';

type Vue = 'parcours' | 'synthese';

const MESSAGE_INDISPONIBLE =
  'La sauvegarde locale est indisponible. Le dossier reste utilisable dans cet onglet, mais sera perdu à la fermeture.';

export default function DossierProjet() {
  const [initial] = useState(() => chargerDossier());
  const [state, setState] = useState<DossierProjetState>(initial.etat);
  const [vue, setVue] = useState<Vue>('parcours');
  const [message, setMessage] = useState<string | null>(() => {
    if (!stockageDisponible()) return MESSAGE_INDISPONIBLE;
    if (initial.avertissement === 'corrompu') {
      return 'Le dossier enregistré est illisible. Un nouveau dossier vide a été ouvert.';
    }
    return null;
  });
  const [statut, setStatut] = useState<string | null>(null);
  const premierRendu = useRef(true);

  const enregistrer = useCallback((dossier: DossierProjetState) => {
    const erreur = sauvegarderDossier(dossier);
    setMessage(erreur);
    setStatut(erreur ? null : 'Enregistré localement');
  }, []);

  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const minuterie = window.setTimeout(() => enregistrer(state), 300);
    return () => window.clearTimeout(minuterie);
  }, [state, enregistrer]);

  const index = Math.min(Math.max(state.etapeCourante, 0), ETAPES.length - 1);
  const etape = ETAPES[index];
  if (!etape) return null;

  const allerEtape = (nouvelIndex: number) => {
    const suivant = { ...state, etapeCourante: nouvelIndex };
    setState(suivant);
    enregistrer(suivant);
  };

  const repondre = (id: string, valeur: string) => {
    setState((precedent) => ({
      ...precedent,
      reponses: { ...precedent.reponses, [id]: valeur },
    }));
  };

  const cocherLivrable = (id: string, coche: boolean) => {
    setState((precedent) => ({
      ...precedent,
      livrables: { ...precedent.livrables, [id]: coche },
    }));
  };

  const noter = (id: CritereId, note: NoteAutoEvaluation) => {
    setState((precedent) => ({
      ...precedent,
      autoEvaluation: { ...precedent.autoEvaluation, [id]: note },
    }));
  };

  const exporter = () => {
    enregistrer(state);
    const blob = new Blob([exporterDossier(state)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = 'gestion-projet-it-dossier-projet.json';
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    window.URL.revokeObjectURL(url);
  };

  const imprimer = () => {
    enregistrer(state);
    window.print();
  };

  const reinitialiser = () => {
    const vide = etatInitialDossier();
    setState(vide);
    setVue('parcours');
    enregistrer(vide);
  };

  return (
    <>
      <SeoHead
        title="Dossier projet"
        description={'Construire un dossier de projet complet sur le cas fictif Les Amis du Square\u00A0: cadrage, planning, qualité, gouvernance, risques, changement.'}
      />
      <div className="capstone-page">
        <div className="capstone-hero">
          <p className="kicker">Capstone</p>
          <h1>Dossier projet</h1>
          <p>
            Construis un dossier complet pour Les Amis du Square, une association fictive. Les six étapes suivent le cours, sans remplacer une expérience réelle.
          </p>
          <p className="capstone-hero__note">
            Progression enregistrée dans ce navigateur. Aucun compte, aucun envoi de données.
          </p>
        </div>

        {message && <p className="capstone-alerte" role="alert">{message}</p>}
        {statut && <p className="capstone-statut" role="status">{statut}</p>}

        {vue === 'parcours' ? (
          <div className="capstone-layout">
            <CapstoneStepper
              etapes={ETAPES}
              etapeCourante={index}
              complete={(id) => estEtapeComplete(state, id)}
              onSelect={allerEtape}
            />
            <CapstoneStep
              etape={etape}
              index={index}
              total={ETAPES.length}
              state={state}
              onReponse={repondre}
              onLivrable={cocherLivrable}
              onPrecedent={() => allerEtape(Math.max(index - 1, 0))}
              onSuivant={() => allerEtape(Math.min(index + 1, ETAPES.length - 1))}
              onVoirSynthese={() => {
                enregistrer(state);
                setVue('synthese');
              }}
            />
          </div>
        ) : (
          <CapstoneSummary
            state={state}
            onNote={noter}
            onRetour={() => setVue('parcours')}
            onExport={exporter}
            onPrint={imprimer}
            onReset={reinitialiser}
          />
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 4: Créer la feuille de style**

Créer `src/styles/capstone.css` avec ces règles de base, puis ajuster avec les variables existantes :

```css
.capstone-page { max-width: 1180px; margin: 0 auto; padding: 2rem 1rem 4rem; }
.btn.danger { background: var(--c-error); }
.btn:disabled { opacity: 0.55; cursor: not-allowed; }
.btn:disabled:hover { transform: none; box-shadow: none; }
.capstone-hero { max-width: 760px; margin-bottom: 1.5rem; }
.capstone-hero h1 { margin: 0.2rem 0 0.6rem; }
.capstone-hero__note { color: var(--c-muted); font-size: 0.95rem; }
.capstone-alerte { border: 1px solid var(--c-error); background: #fee2e2; padding: 0.8rem 1rem; border-radius: 0.5rem; }
.capstone-statut { color: var(--c-muted); font-size: 0.9rem; }
.capstone-layout { display: grid; grid-template-columns: minmax(220px, 280px) minmax(0, 1fr); gap: 2rem; align-items: start; }
.capstone-stepper ol { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.4rem; }
.capstone-stepper button { width: 100%; display: flex; gap: 0.7rem; text-align: left; padding: 0.7rem; border: 1px solid var(--c-line); border-radius: 0.5rem; background: var(--c-surface); color: inherit; }
.capstone-stepper button.is-current { border-color: var(--c-main); background: var(--c-soft); }
.capstone-stepper__num { font-weight: 700; }
.capstone-stepper__titre { display: block; font-weight: 600; }
.capstone-stepper__statut { display: block; font-size: 0.82rem; color: var(--c-muted); }
.capstone-step__compteur { color: var(--c-muted); font-size: 0.9rem; margin: 0; }
.capstone-step h2:focus { outline: 2px solid var(--c-main); outline-offset: 4px; }
.capstone-step__champs { display: grid; gap: 1rem; }
.capstone-field { display: grid; gap: 0.3rem; }
.capstone-field label { font-weight: 600; }
.capstone-field__aide { margin: 0; color: var(--c-muted); font-size: 0.9rem; }
.capstone-field textarea { width: 100%; resize: vertical; font: inherit; padding: 0.7rem; border: 1px solid var(--c-line); border-radius: 0.4rem; background: var(--c-bg); color: inherit; }
.capstone-field.is-invalid textarea { border-color: var(--c-error); }
.capstone-field__meta { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.85rem; color: var(--c-muted); }
.capstone-step__livrables, .capstone-summary__auto { border: 1px solid var(--c-line); border-radius: 0.5rem; padding: 0.8rem 1rem; margin: 1.2rem 0; }
.capstone-step__livrables label, .capstone-summary__auto label { display: block; margin: 0.3rem 0; }
.capstone-step__actions, .capstone-summary__actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
.capstone-summary__etape { border-top: 1px solid var(--c-line); padding-top: 1rem; margin-top: 1rem; break-inside: avoid; }
.capstone-summary__etape dl { display: grid; gap: 0.6rem; }
.capstone-summary__etape dt { font-weight: 600; }
.capstone-summary__etape dd { margin: 0.1rem 0 0; white-space: pre-wrap; }
.capstone-badge { display: inline-block; padding: 0.4rem 0.7rem; border-radius: 999px; background: var(--c-soft); color: var(--c-main); font-weight: 700; }
.capstone-summary__manque { color: var(--c-muted); }
.capstone-summary__confirmation { border: 1px solid var(--c-error); border-radius: 0.5rem; padding: 0.8rem; }
.capstone-summary__confirmation p { margin-top: 0; }
@media (max-width: 760px) {
  .capstone-layout { grid-template-columns: 1fr; gap: 1rem; }
  .capstone-stepper ol { grid-template-columns: 1fr; }
}
@media print {
  .capstone-stepper, .capstone-step, .capstone-summary__actions, .capstone-alerte, .capstone-statut, .capstone-hero__note, .site-header, footer { display: none !important; }
  .capstone-page { max-width: none; padding: 0; }
  .capstone-summary__etape { break-inside: avoid; }
  .capstone-summary__etape dd { white-space: pre-wrap; }
}
```

- [ ] **Step 5: Lancer les tests et le typecheck**

Run: `npx vitest run tests/capstone.test.tsx && npm run typecheck`

Expected: PASS et aucune erreur. Si les tests de route échouent sur `window.print` ou `URL.createObjectURL`, vérifier qu’ils ne cliquent pas ces boutons dans ce fichier ; ces chemins sont couverts par le smoke.

---

### Task 6: Navigation, accueil, SEO, PWA et smoke

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/routes/accueil.tsx`
- Modify: `tests/header.test.tsx`
- Modify: `tests/hero.test.tsx`
- Modify: `tests/typo.test.tsx`
- Modify: `public/sitemap.xml`
- Modify: `public/sw.js`
- Modify: `smoke/smoke.spec.ts`

**Interfaces:**
- Consumes: route `DossierProjet`, `ETAPES`, `CRITERES`, `etatInitialDossier`, `DOSSIER_STORAGE_KEY`
- Produces: navigation et couverture de la nouvelle route

- [ ] **Step 1: Déclarer la route**

Dans `src/App.tsx`, ajouter l’import :

```ts
import DossierProjet from './routes/DossierProjet';
```

Puis, avant `<Route path="/module-:num" ...>`, ajouter :

```tsx
<Route path="/dossier-projet" element={<DossierProjet />} />
```

- [ ] **Step 2: Ajouter le lien principal**

Dans `src/components/SiteHeader.tsx`, ajouter après le lien Glossaire :

```tsx
<NavLink to="/dossier-projet">Dossier projet</NavLink>
```

- [ ] **Step 3: Ajouter l’encart d’accueil après le fil rouge**

Dans `src/routes/accueil.tsx`, après le paragraphe du fil rouge, ajouter :

```tsx
<section className="capstone-cta card" aria-labelledby="capstone-cta-titre">
  <h2 id="capstone-cta-titre">Mettre les méthodes en pratique</h2>
  <p>
    Le dossier projet prolonge les neuf modules : six étapes pour cadrer, planifier, organiser la qualité, la gouvernance, les risques et le changement sur le cas fictif des Amis du Square.
  </p>
  <Link className="btn" to="/dossier-projet">Ouvrir le dossier projet</Link>
</section>
```

Ajouter dans `src/styles/hero.css` :

```css
.capstone-cta { margin-top: 1.5rem; }
.capstone-cta h2 { margin-top: 0; }
```

- [ ] **Step 4: Mettre à jour les tests d’intégration**

Dans `tests/header.test.tsx`, ajouter le cas :

```ts
['/dossier-projet', 'Dossier projet'],
```

Dans `tests/hero.test.tsx`, ajouter dans le test existant :

```ts
expect(container.querySelector('a[href="/dossier-projet"]')?.textContent).toBe('Ouvrir le dossier projet');
expect(container.querySelector('#capstone-cta-titre')?.textContent).toBe('Mettre les méthodes en pratique');
```

Dans `tests/typo.test.tsx`, importer la route et l’ajouter à `PAGES` :

```ts
import DossierProjet from '../src/routes/DossierProjet';
```

```ts
['dossier-projet', <DossierProjet />],
```

- [ ] **Step 5: Mettre à jour le sitemap et le service worker**

Dans `public/sitemap.xml`, ajouter avant `</urlset>` :

```xml
<url><loc>https://hylst.fr/gestion-projet-it/dossier-projet</loc></url>
```

Dans `public/sw.js`, remplacer :

```js
const version = 'gestion-projet-it-v3';
```

par :

```js
const version = 'gestion-projet-it-v4';
```

- [ ] **Step 6: Étendre le smoke**

Dans `smoke/smoke.spec.ts`, ajouter l’import et la route :

```ts
import { CRITERES, ETAPES, etatInitialDossier } from '../src/lib/capstone';
import { DOSSIER_STORAGE_KEY } from '../src/lib/capstoneStorage';
```

```ts
const routes = ['/', '/dossier-projet', '/module-1', '/module-2', '/module-3', '/module-4', '/module-5', '/module-6', '/module-7', '/module-8', '/module-9', '/a-propos', '/glossaire'];
```

Remplacer l’assertion de version :

```ts
expect(swBody).toContain("const version = 'gestion-projet-it-v4';");
```

Ajouter le test :

```ts
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
```

- [ ] **Step 7: Lancer les tests d’intégration**

Run: `npx vitest run tests/header.test.tsx tests/hero.test.tsx tests/typo.test.tsx`

Expected: PASS.

- [ ] **Step 8: Vérifier le sitemap et le service worker**

Run:

```bash
grep -c 'dossier-projet' public/sitemap.xml
grep -c "gestion-projet-it-v4" public/sw.js
```

Expected: `1` et `1`.

---

### Task 7: Validation complète et livraison conditionnelle

**Files:**
- Verify: `src/**`, `tests/**`, `smoke/smoke.spec.ts`, `public/**`
- Delivery only after approval: `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\`, `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md`

**Interfaces:**
- Consumes: toutes les tâches précédentes
- Produces: build vérifié, puis livraison Docker séparée si l’utilisateur l’autorise

- [ ] **Step 1: Lancer la suite unitaire et les contrôles statiques**

Run:

```bash
npm test
npm run lint
npm run typecheck
```

Expected: tous les tests passent, ESLint sans erreur, TypeScript sans erreur.

- [ ] **Step 2: Construire et lancer le smoke**

Run:

```bash
npm run build
npm run smoke
```

Expected: build Vite réussi, smoke Playwright entièrement vert, y compris la nouvelle route, la persistance, la synthèse, le badge, l’impression et la version `gestion-projet-it-v4`.

- [ ] **Step 3: Vérifier Lighthouse sur mobile**

Lancer le preview si nécessaire :

```bash
npm run preview
```

Puis, dans un autre terminal :

```bash
npx lighthouse http://localhost:4173/gestion-projet-it/dossier-projet --only-categories=performance,accessibility --chrome-flags="--headless" --output=json --output-path=./.lighthouse-dossier.json
```

Expected: performance et accessibilité supérieures ou égales à 90. Si Lighthouse n’est pas disponible localement, utiliser `npx --yes lighthouse` sans modifier `package.json`. Ne pas livrer si l’un des deux scores est inférieur à 90.

- [ ] **Step 4: Faire la revue manuelle accessibilité et responsive**

Vérifier dans le navigateur :

1. Au clavier, le lien « Dossier projet », les six boutons d’étape, les champs, les cases et les boutons sont atteignables dans un ordre logique.
2. Après « Étape suivante », le focus est sur le titre `h2` de la nouvelle étape.
3. Le compteur de caractères est visible et la limite de 600 est appliquée.
4. Le badge « Dossier complet » apparaît quand les 6 étapes, les 12 livrables et les 6 notes sont renseignés, puis disparaît si un élément est retiré.
5. À 390 px, le sommaire passe en une colonne et les zones de texte occupent toute la largeur.
6. En aperçu d’impression, seuls le titre, les réponses, les livrables, l’auto-évaluation et le badge restent visibles.
7. Aucun message de console, aucune requête externe et aucun cookie.

- [ ] **Step 5: Vérifier le diff source**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Expected: aucune erreur de whitespace ; seuls les fichiers prévus sont modifiés ou ajoutés ; aucune modification de `src/lib/xp.ts` ni de `src/lib/progress.tsx`.

- [ ] **Step 6: Arrêter avant la livraison Docker**

Ne pas copier le build, ne pas modifier le dépôt Docker et ne pas pousser sans accord explicite. Le dépôt Docker contient des changements non liés `explorons_l_ia` : ne jamais les stager.

Lorsque l’utilisateur autorise la livraison :

1. Vérifier la prochaine version libre dans `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md` ; la dernière version livrée est `2.17.56`, mais la version finale doit être relue au moment du dépôt.
2. Remplacer le contenu de `dist/` dans `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\` : vider l’ancien build du module, puis copier le nouveau, sans toucher au reste du dépôt.
3. Ajouter l’entrée de changelog, activer la carte hub et mettre à jour le sitemap racine ainsi que la modal « À venir » si nécessaire.
4. Vérifier `git status` dans le dépôt Docker, stager uniquement les fichiers du module et de la plateforme, puis faire un seul commit et un seul push.
5. Ne pas committer la source du cours dans le dépôt de déploiement.

## Plan Self-Review

- Couverture du spec : route, navigation, accueil, 6 étapes, 23 champs, 12 livrables, 6 critères, stockage, export, impression, badge, SEO, PWA et smoke sont couverts.
- Pas de dixième module, pas d’XP, pas d’import de dossier, pas de backend, pas de dépendance applicative.
- Les types et fonctions sont définis avant usage : `DossierProjetState`, `ChargementDossier`, `ETAPES`, `CRITERES`, `exporterDossier`, composants et route.
- Les tests suivent l’ordre TDD : domaine, stockage, composants, synthèse, route, intégration.
- Les commandes de vérification sont explicites et les critères de livraison conditionnelle sont séparés de l’implémentation.

# Schémas pédagogiques interactifs pour les modules : plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter trois schémas SVG interactifs et animés dans les fiches des modules 3 (Cycle en V), 5 (Circuit d'une demande) et 9 (Courbe d'adoption) pour expliciter visuellement les logiques de flux, de cycle et de miroir.

**Architecture:** Composants React/SVG dédiés autonomes sous `src/components/schemas/`, styles partagés dans `src/styles/schemas.css`, intégration chirurgicale dans `fiche.tsx` de chaque module, avec accessibilité clavier, région dynamique `aria-live` et respect strict de `prefers-reduced-motion`.

**Tech Stack:** React 19, TypeScript, SVG inline, CSS, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-09-schemas-pedagogiques-modules-design.md`

## Global Constraints

- 100 % front-end, zéro requête réseau, zéro dépendance npm ajoutée.
- SVG 100 % inline avec `viewBox`, adaptatif et sans débordement horizontal à 320 px (`scrollX === 0`).
- Accessibilité : conteneur `<figure>` et `<figcaption>`, contrôles clavier complets (`tabIndex={0}`, déclenchement `Enter`/`Space`), région `aria-live="polite"`.
- Mouvement réduit : `@media (prefers-reduced-motion: reduce)` désactive toute animation CSS de flux et de bille.
- Typographie française stricte : aucun tiret cadratin dans les textes rédigés.

## Review Focus

1. **Mouvement réduit** : sous `prefers-reduced-motion: reduce`, l'animation de tirets et la bille mobile doivent être immédiatement arrêtées sans casser l'affichage statique.
2. **Reflow à 320 px** : sur écran de 320 px de large, aucun des trois schémas ne doit dépasser la largeur du conteneur ni créer de défilement horizontal.
3. **Navigation clavier** : chaque étape/paire interactive doit pouvoir être activée via les touches `Enter` et `Space`, avec un anneau de focus bien visible.
4. **Encart dynamique accessible** : le changement d'étape sélectionnée doit mettre à jour l'explication sans faire sauter violemment la hauteur du composant et être vocalisé via `aria-live`.
5. **Impression** : les schémas et l'explication active doivent s'afficher lisiblement en noir et blanc ou niveaux de gris à l'impression (`@media print`).

---

### Task 1: Composant `SchemaCycleV` et styles du socle (Module 3)

**Files:**
- Create: `src/styles/schemas.css`
- Create: `src/components/schemas/SchemaCycleV.tsx`
- Modify: `src/styles/editorial.css:1-20` (import de `schemas.css`)
- Modify: `src/modules/m3-methodes/fiche.tsx:1-22`
- Test: `tests/schemas-pedagogiques.test.tsx`

**Interfaces:**
- Produces: `SchemaCycleV` exporté comme composant React sans props obligatoires.
- Consumes: variables CSS de thème (`--accent`, `--accent-soft`, `--accent-line`, `--c-surface`, `--c-ink`, `--c-muted`).

- [ ] **Step 1: Écrire le test unitaire pour `SchemaCycleV`**

Créer `tests/schemas-pedagogiques.test.tsx` :

```tsx
// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SchemaCycleV } from '../src/components/schemas/SchemaCycleV';

describe('SchemaCycleV (Module 3)', () => {
  it('rend le schéma, la légende et les quatre paires de validation', () => {
    render(<SchemaCycleV />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
    expect(screen.getByText(/Cycle en V\u00A0: les tests conçus en miroir/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('affiche le niveau 1 par défaut et met à jour au clic', () => {
    render(<SchemaCycleV />);
    expect(screen.getByText(/Besoin \u2194 Acceptation/i)).toBeInTheDocument();
    expect(screen.getByText(/La conformité avec les attentes initiales des usagers/i)).toBeInTheDocument();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[3]); // Code <-> Tests unitaires
    expect(screen.getByText(/Réalisation \(Code\) \u2194 Tests unitaires/i)).toBeInTheDocument();
    expect(screen.getByText(/Le bon fonctionnement individuel de chaque fonction/i)).toBeInTheDocument();
  });

  it('gère l activation au clavier avec Entrée et Espace', () => {
    render(<SchemaCycleV />);
    const boutons = screen.getAllByRole('button');
    fireEvent.keyDown(boutons[1], { key: 'Enter' });
    expect(screen.getByText(/Conception globale \u2194 Tests système/i)).toBeInTheDocument();

    fireEvent.keyDown(boutons[2], { key: ' ' });
    expect(screen.getByText(/Conception détaillée \u2194 Tests d’intégration/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: FAIL avec module `SchemaCycleV` introuvable.

- [ ] **Step 3: Implémenter `src/styles/schemas.css` et `SchemaCycleV.tsx`**

1. Créer `src/styles/schemas.css` avec les styles génériques pour `.schema-pedagogique`, `.schema-figure`, `.schema-node`, `.schema-explication`, l'accessibilité focus et `@media (prefers-reduced-motion: reduce)`.
2. Importer `schemas.css` dans `src/styles/editorial.css`.
3. Créer `src/components/schemas/SchemaCycleV.tsx` avec les 4 paires, l'état `selectedLevel` (0 à 3, défaut 0), les boutons SVG accessibles et l'encart d'explication avec `aria-live="polite"`.
4. Insérer `<SchemaCycleV />` dans `src/modules/m3-methodes/fiche.tsx` juste avant `<p><strong>Critères d’acceptation</strong>`.

- [ ] **Step 4: Vérifier que le test passe**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: PASS (3 tests passés).

- [ ] **Step 5: Commit**

```bash
git add src/styles/schemas.css src/styles/editorial.css src/components/schemas/SchemaCycleV.tsx src/modules/m3-methodes/fiche.tsx tests/schemas-pedagogiques.test.tsx
git commit -m "feat(pedagogie): ajoute le schéma interactif du cycle en V dans le module 3"
```

---

### Task 2: Composant `SchemaCircuitDemande` (Module 5)

**Files:**
- Create: `src/components/schemas/SchemaCircuitDemande.tsx`
- Modify: `src/styles/schemas.css`
- Modify: `src/modules/m5-outils/fiche.tsx:1-20`
- Test: `tests/schemas-pedagogiques.test.tsx`

**Interfaces:**
- Produces: `SchemaCircuitDemande` exporté comme composant React sans props obligatoires.
- Consumes: `src/styles/schemas.css`, variables de thème du module 5.

- [ ] **Step 1: Écrire le test unitaire pour `SchemaCircuitDemande`**

Ajouter dans `tests/schemas-pedagogiques.test.tsx` :

```tsx
import { SchemaCircuitDemande } from '../src/components/schemas/SchemaCircuitDemande';

describe('SchemaCircuitDemande (Module 5)', () => {
  it('rend le circuit avec ses 6 étapes et ses boucles de retour', () => {
    render(<SchemaCircuitDemande />);
    expect(screen.getByText(/Circuit d’une demande\u00A0: du besoin à la production/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(6);
  });

  it('affiche l étape Besoin par défaut et met à jour au clic sur CI', () => {
    render(<SchemaCircuitDemande />);
    expect(screen.getByText(/Étape 1\u00A0: Besoin/i)).toBeInTheDocument();
    expect(screen.getByText(/Clarifier la valeur attendue et les critères d’acceptation/i)).toBeInTheDocument();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[3]); // CI
    expect(screen.getByText(/Étape 4\u00A0: CI \(Intégration continue\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Branche bloquée tant que la CI n’est pas verte/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: FAIL avec `SchemaCircuitDemande` introuvable.

- [ ] **Step 3: Implémenter `SchemaCircuitDemande.tsx` et styles d'animation**

1. Ajouter dans `src/styles/schemas.css` les règles de flux animé (`stroke-dasharray` et `@keyframes circuit-flow`).
2. Créer `src/components/schemas/SchemaCircuitDemande.tsx` avec les 6 étapes (Besoin, Ticket, Branche, CI, Recette, Production) et les 2 boucles de retour en pointillés (Recette -> Branche, Production -> Besoin/Ticket).
3. Intégrer l'encart d'explication dynamique affichant le rôle, l'outil type et la règle de passage.
4. Insérer `<SchemaCircuitDemande />` dans `src/modules/m5-outils/fiche.tsx` avant le paragraphe des limites communes.

- [ ] **Step 4: Vérifier que les tests passent**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: PASS (5 tests passés).

- [ ] **Step 5: Commit**

```bash
git add src/styles/schemas.css src/components/schemas/SchemaCircuitDemande.tsx src/modules/m5-outils/fiche.tsx tests/schemas-pedagogiques.test.tsx
git commit -m "feat(pedagogie): ajoute le schéma interactif du circuit d'une demande dans le module 5"
```

---

### Task 3: Composant `SchemaCourbeAdoption` (Module 9)

**Files:**
- Create: `src/components/schemas/SchemaCourbeAdoption.tsx`
- Modify: `src/styles/schemas.css`
- Modify: `src/modules/m9-changement/fiche.tsx:1-21`
- Test: `tests/schemas-pedagogiques.test.tsx`

**Interfaces:**
- Produces: `SchemaCourbeAdoption` exporté comme composant React sans props obligatoires.
- Consumes: `src/styles/schemas.css`, variables de thème du module 9.

- [ ] **Step 1: Écrire le test unitaire pour `SchemaCourbeAdoption`**

Ajouter dans `tests/schemas-pedagogiques.test.tsx` :

```tsx
import { SchemaCourbeAdoption } from '../src/components/schemas/SchemaCourbeAdoption';

describe('SchemaCourbeAdoption (Module 9)', () => {
  it('rend la courbe d adoption avec les 4 phases et leurs actions', () => {
    render(<SchemaCourbeAdoption />);
    expect(screen.getByText(/Courbe d’adoption\u00A0: accompagner les quatre phases/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('affiche la phase Choc par défaut et permet de basculer vers Résistance', () => {
    render(<SchemaCourbeAdoption />);
    expect(screen.getByText(/Phase 1\u00A0: Choc/i)).toBeInTheDocument();
    expect(screen.getByText(/Accueillir les réactions sans juger/i)).toBeInTheDocument();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[1]); // Résistance
    expect(screen.getByText(/Phase 2\u00A0: Résistance/i)).toBeInTheDocument();
    expect(screen.getByText(/Réexpliquer le sens du projet/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: FAIL avec `SchemaCourbeAdoption` introuvable.

- [ ] **Step 3: Implémenter `SchemaCourbeAdoption.tsx` et styles de courbe**

1. Ajouter dans `src/styles/schemas.css` les règles de la courbe et de la bille mobile avec coupure stricte sous `prefers-reduced-motion`.
2. Créer `src/components/schemas/SchemaCourbeAdoption.tsx` avec les 4 zones (Choc: Écouter, Résistance: Expliquer, Acceptation: Former, Appropriation: Ancrer).
3. Insérer `<SchemaCourbeAdoption />` dans `src/modules/m9-changement/fiche.tsx` à la fin de la section adoption.

- [ ] **Step 4: Vérifier que tous les tests unitaires passent**

Run: `npx vitest run tests/schemas-pedagogiques.test.tsx`
Expected: PASS (7 tests passés).

- [ ] **Step 5: Commit**

```bash
git add src/styles/schemas.css src/components/schemas/SchemaCourbeAdoption.tsx src/modules/m9-changement/fiche.tsx tests/schemas-pedagogiques.test.tsx
git commit -m "feat(pedagogie): ajoute le schéma interactif de la courbe d'adoption dans le module 9"
```

---

### Task 4: Tests smoke Playwright et vérification 320 px

**Files:**
- Modify: `smoke/smoke.spec.ts`

- [ ] **Step 1: Écrire le test smoke pour les trois schémas**

Ajouter à la fin de `smoke/smoke.spec.ts` :

```ts
test('schémas pédagogiques : présents, interactifs et sans débordement à 320 px', async ({ page }) => {
  const cibles = [
    { route: '/module-3', titre: 'Cycle en V\u00A0: les tests conçus en miroir' },
    { route: '/module-5', titre: 'Circuit d’une demande\u00A0: du besoin à la production' },
    { route: '/module-9', titre: 'Courbe d’adoption\u00A0: accompagner les quatre phases' },
  ];

  for (const c of cibles) {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${base}${c.route}`);
    await fermerOnboarding(page);

    const schema = page.locator('figure.schema-pedagogique');
    await expect(schema).toBeVisible();
    await expect(schema.locator('figcaption')).toContainText(c.titre);

    // Vérifier l'interaction au clic
    const boutons = schema.locator('button.schema-btn');
    await expect(boutons.first()).toBeVisible();
    await boutons.nth(1).click();
    await expect(schema.locator('.schema-explication')).toBeVisible();

    // Vérifier à 320 px
    await page.setViewportSize({ width: 320, height: 640 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(321);
  }
});
```

- [ ] **Step 2: Lancer le build et exécuter le smoke test**

Run:
```bash
npm run build
SMOKE_BASE_URL=http://localhost:4180/gestion-projet-it npm run smoke -- --grep "schémas pédagogiques"
```
Expected: PASS (1 test passé).

- [ ] **Step 3: Commit**

```bash
git add smoke/smoke.spec.ts
git commit -m "test(smoke): valide la présence, l'interaction et le reflow des schémas pédagogiques"
```

---

### Task 5: Documentation, changelog et vérification globale

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `docs/README.md`
- Modify: `docs/superpowers/specs/2026-11-09-schemas-pedagogiques-modules-design.md` (statut)

- [ ] **Step 1: Mettre à jour la spec, l'index de documentation et le changelog**

1. Dans la spec `docs/superpowers/specs/2026-11-09-schemas-pedagogiques-modules-design.md`, passer le statut à `Livré le 9 novembre 2026.`
2. Dans `docs/README.md`, ajouter la spec et le plan dans les tables respectives.
3. Dans `CHANGELOG.md`, créer une section `## [Unreleased]` décrivant les trois schémas interactifs et animés.

- [ ] **Step 2: Exécuter toutes les vérifications locales**

Run:
```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
SMOKE_BASE_URL=http://localhost:4180/gestion-projet-it npm run smoke
```
Expected: 100 % des commandes en code retour 0, smoke 25/25.

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md docs/README.md docs/superpowers/specs/2026-11-09-schemas-pedagogiques-modules-design.md docs/superpowers/plans/2026-11-09-schemas-pedagogiques-modules.md
git commit -m "docs(schemas): documente les trois schémas pédagogiques interactifs"
```

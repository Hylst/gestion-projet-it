# Laboratoires Cybersécurité Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter trois laboratoires cyber intégrés aux pages menaces, accès et incident, sans XP, sans stockage et sans nouvelle route.

**Architecture:** Trois composants autonomes dans `src/labos/` réutilisent `LaboFrame` avec une variante `sansXp`. Chaque laboratoire garde un état local, une fonction de vérification exportée et des tests de logique et de rendu. Les pages cyber importent le laboratoire correspondant dans la section utile.

**Tech Stack:** React 19, TypeScript strict, CSS existant, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-31-labos-cybersecurite-design.md`

## Global Constraints

- Branche : `feat/labos-cybersecurite`, créée depuis `feat/parcours-cybersecurite`.
- Aucun XP, aucun `useProgress`, aucun `localStorage`, aucune clé `gestion-projet-it:*`.
- Aucune nouvelle route, aucun sitemap, aucun service worker.
- Aucune dépendance nouvelle, aucun cookie, aucune requête externe.
- Aucun glisser-déposer obligatoire : boutons, radios et listes sémantiques.
- Charte : accents, apostrophe `’`, `&nbsp;` avant `: ; ? !`, aucun tiret cadratin.
- Tests : `npm test`, `npm run lint`, `npm run typecheck`, `npm run check:liens`, `npm run build`, smoke Playwright.
- Chaque tâche se termine par un commit.

## Review Focus

- **XP affiché par erreur** : un laboratoire cyber ne doit jamais afficher `+5 XP`. Test : rendu des trois labos et smoke.
- **Ordre de la chronologie** : les boutons Monter et Descendre doivent rester dans les bornes. Test : logique et rendu.
- **Droit trop large** : la matrice doit distinguer Édition temporaire, Édition du contenu, Lecture seule et Administration. Test : vérification des quatre rôles.
- **Scénario sans choix** : le modèle de menace doit signaler chaque scénario manquant. Test : vérification à l’état initial.
- **Régression des labos existants** : `LaboFrame` sans props garde le message XP. Test : `tests/labos/frame.test.tsx`.

---

### Task 1: Variante sans XP de `LaboFrame`

**Files:**
- Modify: `src/components/LaboFrame.tsx`
- Create: `tests/labos/frame.test.tsx`

**Interfaces:**
- `LaboFrame` conserve ses props actuelles et ajoute `sansXp?: boolean` et `messageValide?: string`.
- Produces: message de succès personnalisable, comportement actuel inchangé sans props.

- [ ] **Step 1: Écrire le test**

Créer `tests/labos/frame.test.tsx` :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { LaboFrame } from '../../src/components/LaboFrame';

afterEach(cleanup);

const base = {
  titre: 'Labo de test',
  consigne: 'Consigne de test.',
  etapes: ['Une étape.'],
  etape: 1,
  etat: '',
  onVerifier: () => {},
  onReinitialiser: () => {},
};

describe('LaboFrame', () => {
  it('garde le message XP par defaut', () => {
    render(<LaboFrame {...base} valide><p>Contenu.</p></LaboFrame>);
    expect(screen.getByText('Labo validé\u00A0: +5 XP (un seul gain).')).not.toBeNull();
  });

  it('affiche un message sans XP quand demande', () => {
    render(
      <LaboFrame {...base} valide sansXp messageValide="Labo terminé : test.">
        <p>Contenu.</p>
      </LaboFrame>,
    );
    expect(screen.getByText('Labo terminé : test.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/labos/frame.test.tsx`

Expected : TypeScript ou test en échec sur les props inconnues.

- [ ] **Step 3: Modifier `LaboFrame`**

Ajouter les props optionnelles et remplacer le paragraphe de succès par :

```tsx
{props.valide && (
  <p className="ok" role="status">
    {props.messageValide ?? (props.sansXp ? 'Labo terminé.' : 'Labo validé\u00A0: +5 XP (un seul gain).')}
  </p>
)}
```

- [ ] **Step 4: Lancer le test**

Run : `npm test -- tests/labos/frame.test.tsx`

Expected : 2 tests passent.

- [ ] **Step 5: Vérifier les labos existants**

Run : `npm test -- tests/labos`

Expected : tous les tests de labos passent.

- [ ] **Step 6: Commit**

```bash
git add src/components/LaboFrame.tsx tests/labos/frame.test.tsx
git commit -m "feat: variante sans xp du gabarit de labo"
```

---

### Task 2: Laboratoire du modèle de menace

**Files:**
- Create: `src/labos/LaboModeleMenace.tsx`
- Create: `tests/labos/modele-menace.test.ts`
- Create: `tests/labos/modele-menace-render.test.tsx`
- Modify: `src/cyber/content/Menaces.tsx`
- Modify: `tests/cyber.test.tsx`

**Interfaces:**
- `SCENARIOS: readonly ScenarioMenace[]`.
- `initialiserModele(): ModeleState`.
- `choisirParade(s: ModeleState, scenario: string, parade: string): ModeleState`.
- `verifierModele(s: ModeleState): { ok: boolean; messages: string[] }`.
- `export default function LaboModeleMenace()`.

- [ ] **Step 1: Écrire les tests de logique**

Créer `tests/labos/modele-menace.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import {
  SCENARIOS,
  choisirParade,
  initialiserModele,
  verifierModele,
} from '../../src/labos/LaboModeleMenace';

describe('modele de menace', () => {
  it('valide les cinq bonnes parades', () => {
    let s = initialiserModele();
    for (const scenario of SCENARIOS) s = choisirParade(s, scenario.id, scenario.parade);
    expect(verifierModele(s).ok).toBe(true);
  });

  it('signale chaque scenario sans choix', () => {
    const r = verifierModele(initialiserModele());
    expect(r.ok).toBe(false);
    expect(r.messages).toHaveLength(SCENARIOS.length);
  });

  it('signale une parade incorrecte', () => {
    let s = initialiserModele();
    for (const scenario of SCENARIOS) {
      const mauvaise = scenario.options.find((o) => o.valeur !== scenario.parade);
      s = choisirParade(s, scenario.id, mauvaise?.valeur ?? '');
    }
    const r = verifierModele(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/parade/i);
  });

  it('propose trois options par scenario, une seule correcte', () => {
    for (const scenario of SCENARIOS) {
      expect(scenario.options).toHaveLength(3);
      expect(scenario.options.filter((o) => o.valeur === scenario.parade)).toHaveLength(1);
    }
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/labos/modele-menace.test.ts`

Expected : échec de résolution du composant.

- [ ] **Step 3: Écrire le composant**

Créer `src/labos/LaboModeleMenace.tsx` avec les cinq scénarios de la spec, les types et fonctions ci-dessus. Le composant :

- utilise `useState<ModeleState>(initialiserModele)` ;
- rend un `fieldset` par scénario, avec `legend` égal au récit, la menace rappelée et trois radios ;
- vérifie avec `verifierModele`, affiche les messages en `role="alert"` et le succès ;
- utilise `LaboFrame` avec `sansXp` et `messageValide="Les cinq scénarios ont une parade proportionnée."` ;
- n’importe ni `useProgress` ni `localStorage`.

- [ ] **Step 4: Écrire le test de rendu**

Créer `tests/labos/modele-menace-render.test.tsx` :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboModeleMenace, { SCENARIOS } from '../../src/labos/LaboModeleMenace';

afterEach(cleanup);

describe('rendu du modele de menace', () => {
  it('valide les cinq parades et n affiche pas de XP', () => {
    render(<LaboModeleMenace />);
    for (const scenario of SCENARIOS) {
      fireEvent.click(screen.getByRole('radio', { name: scenario.parade }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('Les cinq scénarios ont une parade proportionnée.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});
```

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/labos/modele-menace.test.ts tests/labos/modele-menace-render.test.tsx`

Expected : 5 tests passent.

- [ ] **Step 6: Intégrer le labo dans la page menaces**

Dans `src/cyber/content/Menaces.tsx`, importer `LaboModeleMenace` et l’insérer à la fin de la section `modele`, après le tableau.

- [ ] **Step 7: Ajouter le test de page**

Dans `tests/cyber.test.tsx`, dans le test `menaces cyber`, ajouter :

```tsx
expect(screen.getByRole('heading', { level: 3, name: /Labo : associer menaces et parades/ })).not.toBeNull();
expect(screen.queryByText(/\+5 XP/)).toBeNull();
```

- [ ] **Step 8: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx tests/labos/modele-menace.test.ts tests/labos/modele-menace-render.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 9: Commit**

```bash
git add src/labos/LaboModeleMenace.tsx src/cyber/content/Menaces.tsx tests/labos/modele-menace.test.ts tests/labos/modele-menace-render.test.tsx tests/cyber.test.tsx
git commit -m "feat: labo du modele de menace"
```

---

### Task 3: Laboratoire de la matrice des accès

**Files:**
- Create: `src/labos/LaboMatriceAcces.tsx`
- Create: `tests/labos/matrice-acces.test.ts`
- Create: `tests/labos/matrice-acces-render.test.tsx`
- Modify: `src/cyber/content/Acces.tsx`
- Modify: `tests/cyber.test.tsx`

**Interfaces:**
- `DROITS_ACCES: readonly ['Lecture seule', 'Édition du contenu', 'Édition temporaire', 'Administration']`.
- `ROLES_ACCES: readonly RoleAcces[]`.
- `initialiserAcces(): AccesState`.
- `attribuerDroit(s: AccesState, role: string, droit: DroitAcces): AccesState`.
- `verifierAcces(s: AccesState): { ok: boolean; messages: string[] }`.
- `export default function LaboMatriceAcces()`.

- [ ] **Step 1: Écrire les tests de logique**

Créer `tests/labos/matrice-acces.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import {
  ROLES_ACCES,
  attribuerDroit,
  initialiserAcces,
  verifierAcces,
} from '../../src/labos/LaboMatriceAcces';

describe('matrice des acces', () => {
  it('valide les quatre droits minimaux', () => {
    let s = initialiserAcces();
    for (const role of ROLES_ACCES) s = attribuerDroit(s, role.id, role.droit);
    expect(verifierAcces(s).ok).toBe(true);
  });

  it('signale chaque role sans droit', () => {
    const r = verifierAcces(initialiserAcces());
    expect(r.ok).toBe(false);
    expect(r.messages).toHaveLength(ROLES_ACCES.length);
  });

  it('signale un droit trop large', () => {
    let s = initialiserAcces();
    for (const role of ROLES_ACCES) s = attribuerDroit(s, role.id, role.droit);
    const bureau = ROLES_ACCES.find((r) => r.id === 'bureau');
    if (!bureau) throw new Error('Role bureau absent.');
    s = attribuerDroit(s, bureau.id, 'Administration');
    expect(verifierAcces(s).ok).toBe(false);
    expect(verifierAcces(s).messages.join(' ')).toMatch(/trop large|minimal/i);
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/labos/matrice-acces.test.ts`

Expected : échec de résolution du composant.

- [ ] **Step 3: Écrire le composant**

Créer `src/labos/LaboMatriceAcces.tsx` avec les quatre rôles de la spec :

- `benevole` : besoin « Mettre à jour les textes du site », droit « Édition du contenu ».
- `chef` : besoin « Publier et administrer le site », droit « Administration ».
- `prestataire` : besoin « Corriger une page pendant une mission », droit « Édition temporaire ».
- `bureau` : besoin « Lire les adhésions pour valider les comptes », droit « Lecture seule ».

Le composant utilise une liste `listbox` de rôles, quatre boutons de droit et `LaboFrame` avec `sansXp`. Le message de succès est « Chaque rôle a le droit minimal nécessaire. ». Aucun `useProgress`.

- [ ] **Step 4: Écrire le test de rendu**

Créer `tests/labos/matrice-acces-render.test.tsx` :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboMatriceAcces, { ROLES_ACCES } from '../../src/labos/LaboMatriceAcces';

afterEach(cleanup);

describe('rendu de la matrice des acces', () => {
  it('attribue les quatre droits minimaux sans XP', () => {
    render(<LaboMatriceAcces />);
    for (const role of ROLES_ACCES) {
      fireEvent.click(screen.getByRole('option', { name: new RegExp(role.role) }));
      fireEvent.click(screen.getByRole('button', { name: new RegExp(`Attribuer ${role.droit}`) }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('Chaque rôle a le droit minimal nécessaire.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});
```

- [ ] **Step 5: Lancer les tests**

Run : `npm test -- tests/labos/matrice-acces.test.ts tests/labos/matrice-acces-render.test.tsx`

Expected : 4 tests passent.

- [ ] **Step 6: Intégrer le labo dans la page accès**

Dans `src/cyber/content/Acces.tsx`, importer `LaboMatriceAcces` et l’insérer à la fin de la section `revue`, après le tableau.

- [ ] **Step 7: Ajouter le test de page**

Dans `tests/cyber.test.tsx`, dans le test `acces cyber`, ajouter :

```tsx
expect(screen.getByRole('heading', { level: 3, name: /Labo : attribuer le droit minimal/ })).not.toBeNull();
expect(screen.queryByText(/\+5 XP/)).toBeNull();
```

- [ ] **Step 8: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx tests/labos/matrice-acces.test.ts tests/labos/matrice-acces-render.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 9: Commit**

```bash
git add src/labos/LaboMatriceAcces.tsx src/cyber/content/Acces.tsx tests/labos/matrice-acces.test.ts tests/labos/matrice-acces-render.test.tsx tests/cyber.test.tsx
git commit -m "feat: labo de la matrice des acces"
```

---

### Task 4: Laboratoire de la chronologie d’incident

**Files:**
- Create: `src/labos/LaboTimelineIncident.tsx`
- Create: `tests/labos/timeline-incident.test.ts`
- Create: `tests/labos/timeline-incident-render.test.tsx`
- Modify: `src/cyber/content/Incident.tsx`
- Modify: `tests/cyber.test.tsx`
- Modify: `src/styles/cyber.css`

**Interfaces:**
- `ACTIONS_INCIDENT: readonly { id: string; label: string }[]`.
- `ORDRE_INCIDENT: readonly string[]`.
- `initialiserChronologie(): string[]`.
- `deplacerAction(ordre: string[], index: number, delta: -1 | 1): string[]`.
- `verifierChronologie(ordre: string[]): { ok: boolean; messages: string[] }`.
- `export default function LaboTimelineIncident()`.

- [ ] **Step 1: Écrire les tests de logique**

Créer `tests/labos/timeline-incident.test.ts` :

```ts
import { describe, expect, it } from 'vitest';
import {
  ORDRE_INCIDENT,
  deplacerAction,
  initialiserChronologie,
  verifierChronologie,
} from '../../src/labos/LaboTimelineIncident';

describe('chronologie d incident', () => {
  it('valide l ordre attendu', () => {
    expect(verifierChronologie([...ORDRE_INCIDENT]).ok).toBe(true);
  });

  it('signale le premier ecart', () => {
    const ordre = [...ORDRE_INCIDENT];
    [ordre[1], ordre[2]] = [ordre[2] as string, ordre[1] as string];
    const r = verifierChronologie(ordre);
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBeGreaterThan(0);
  });

  it('deplace une action vers le haut et le bas', () => {
    const depart = [...ORDRE_INCIDENT];
    const haut = deplacerAction(depart, 1, -1);
    expect(haut[0]).toBe(depart[1]);
    const bas = deplacerAction(haut, 0, 1);
    expect(bas).toEqual(depart);
  });

  it('ne sort pas des bornes', () => {
    const depart = [...ORDRE_INCIDENT];
    expect(deplacerAction(depart, 0, -1)).toEqual(depart);
    expect(deplacerAction(depart, depart.length - 1, 1)).toEqual(depart);
  });

  it('part d un ordre melange et contient six actions', () => {
    const initial = initialiserChronologie();
    expect(initial).toHaveLength(6);
    expect(initial).not.toEqual([...ORDRE_INCIDENT]);
  });
});
```

- [ ] **Step 2: Lancer le test pour le voir échouer**

Run : `npm test -- tests/labos/timeline-incident.test.ts`

Expected : échec de résolution du composant.

- [ ] **Step 3: Écrire le composant**

Créer `src/labos/LaboTimelineIncident.tsx` avec les six actions de la spec.

Ordre initial : `['confiner', 'detecter', 'decider', 'preserver', 'apprendre', 'restaurer']`.
Ordre attendu : `['detecter', 'confiner', 'preserver', 'decider', 'restaurer', 'apprendre']`.

Le composant rend une liste `ol.cyber-timeline` ; chaque élément affiche le rang, le libellé et deux boutons `Monter` et `Descendre` avec `aria-label`. Les boutons sont désactivés aux bornes. Le composant utilise `LaboFrame` avec `sansXp` et le message « La chronologie respecte l’ordre détecter, confiner, préserver, décider, restaurer, apprendre. ». Aucun `useProgress`.

- [ ] **Step 4: Ajouter les styles**

Dans `src/styles/cyber.css`, ajouter :

```css
.cyber-timeline { list-style: none; padding: 0; display: grid; gap: 0.6rem; }
.cyber-timeline li { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.cyber-timeline .rang { font-weight: 700; min-width: 1.5rem; }
```

- [ ] **Step 5: Écrire le test de rendu**

Créer `tests/labos/timeline-incident-render.test.tsx` :

```tsx
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboTimelineIncident from '../../src/labos/LaboTimelineIncident';

afterEach(cleanup);

describe('rendu de la chronologie', () => {
  it('reordonne les actions et valide sans XP', () => {
    render(<LaboTimelineIncident />);
    fireEvent.click(screen.getByRole('button', { name: 'Monter Détecter et qualifier l’alerte' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monter Préserver les journaux et les preuves' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monter Restaurer et tester le service' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('La chronologie respecte l’ordre détecter, confiner, préserver, décider, restaurer, apprendre.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});
```

- [ ] **Step 6: Lancer les tests**

Run : `npm test -- tests/labos/timeline-incident.test.ts tests/labos/timeline-incident-render.test.tsx`

Expected : 6 tests passent.

- [ ] **Step 7: Intégrer le labo dans la page incident**

Dans `src/cyber/content/Incident.tsx`, importer `LaboTimelineIncident` et l’insérer à la fin de la section `preparer`, après le tableau de chronologie.

- [ ] **Step 8: Ajouter le test de page**

Dans `tests/cyber.test.tsx`, dans le test `incident cyber`, ajouter :

```tsx
expect(screen.getByRole('heading', { level: 3, name: /Labo : ordonner la réponse à incident/ })).not.toBeNull();
expect(screen.queryByText(/\+5 XP/)).toBeNull();
```

- [ ] **Step 9: Lancer les tests**

Run : `npm test -- tests/cyber.test.tsx tests/typo.test.tsx tests/labos/timeline-incident.test.ts tests/labos/timeline-incident-render.test.tsx`

Expected : tous les tests passent.

- [ ] **Step 10: Commit**

```bash
git add src/labos/LaboTimelineIncident.tsx src/cyber/content/Incident.tsx src/styles/cyber.css tests/labos/timeline-incident.test.ts tests/labos/timeline-incident-render.test.tsx tests/cyber.test.tsx
git commit -m "feat: labo de la chronologie d incident"
```

---

### Task 5: Smoke, documentation et audit

**Files:**
- Modify: `smoke/smoke.spec.ts`
- Modify: `README.md`
- Modify: `BACKLOG.md`
- Modify: `CHANGELOG.md`
- Modify: `src/cyber/content/Hub.tsx`
- Modify: `src/routes/accueil.tsx`
- Modify: `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md`

**Interfaces:**
- Consumes: les trois laboratoires.
- Produces: smoke du labo chronologie, documentation et audit à jour.

- [ ] **Step 1: Étendre le smoke**

Dans `smoke/smoke.spec.ts`, ajouter au test `parcours cyber` :

```ts
await page.goto(`${base}/cybersecurite/incident`);
await page.getByRole('button', { name: 'Monter Détecter et qualifier l’alerte' }).click();
await page.getByRole('button', { name: 'Monter Préserver les journaux et les preuves' }).click();
await page.getByRole('button', { name: 'Monter Restaurer et tester le service' }).click();
await page.getByRole('button', { name: 'Vérifier' }).click();
await expect(page.getByText('La chronologie respecte l’ordre détecter, confiner, préserver, décider, restaurer, apprendre.')).toBeVisible();
await expect(page.getByText('+5 XP')).toHaveCount(0);
```

- [ ] **Step 2: Mettre à jour les textes d’accueil et de hub**

Dans `src/routes/accueil.tsx`, compléter le paragraphe de la section cyber :

```text
Trois laboratoires permettent de manipuler un modèle de menace, une matrice d’accès et une chronologie d’incident.
```

Dans `src/cyber/content/Hub.tsx`, section `suite`, ajouter une phrase sur les trois laboratoires.

- [ ] **Step 3: Mettre à jour la documentation**

- `README.md` : ajouter « 3 laboratoires cyber » à l’état actuel et une phrase dans la section confidentialité ou qualité.
- `BACKLOG.md` : passer `CYB-007` en `Livré`, avec la preuve des trois composants, tests et smoke.
- `CHANGELOG.md` : ajouter « Trois laboratoires cyber » dans la section Parcours Cybersécurité, avec le total de tests et le smoke.
- `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md` : ajouter une section « Extension du 31 octobre 2026 : laboratoires » avec clavier, messages, absence de XP, Lighthouse si remesuré.

- [ ] **Step 4: Vérifier la suite complète**

```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
```

Expected : tous les tests passent, build réussi.

- [ ] **Step 5: Lancer le smoke**

Démarrer le preview sur un port dédié, puis :

```bash
SMOKE_BASE_URL=http://127.0.0.1:4182/gestion-projet-it npm run smoke
```

Expected : 16 tests passent, zéro erreur console, zéro requête externe.

- [ ] **Step 6: Lighthouse**

Contrôler au minimum `/cybersecurite/incident` en mobile. Consigner les scores réels dans l’audit.

- [ ] **Step 7: Commit**

```bash
git add smoke/smoke.spec.ts README.md BACKLOG.md CHANGELOG.md src/cyber/content/Hub.tsx src/routes/accueil.tsx docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md
git commit -m "docs: laboratoires cyber, smoke et audit"
```

---

## Final Verification

- [ ] `npm test` : tous les tests passent.
- [ ] `npm run lint`, `npm run typecheck`, `npm run check:liens`, `npm run build`.
- [ ] Smoke : 16 tests, 31 routes, zéro erreur, zéro requête externe.
- [ ] Lighthouse mobile : `/cybersecurite/incident` au moins 90 en performance et accessibilité.
- [ ] Aucun `+5 XP` dans les laboratoires cyber.
- [ ] `git status` propre, branche prête pour la pull request.

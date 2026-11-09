# Plan d'implémentation : Refonte pédagogique (Intros de contexte, infobulles de termes techniques et fil conducteur junior)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre chaque section de Gestion de Projet IT immédiatement intelligible pour un débutant ou junior grâce à des introductions contextualisées, un composant d'infobulles interactif pour tous les termes techniques et acronymes (incluant les bases informatiques : dépôt, serveur, API, navigateur), et un fil conducteur ininterrompu entre modules.

**Architecture:** Enrichissement du glossaire avec métadonnées (`sigle`, `developpe`, `alias`), création du composant accessible `<Terme>`, ajout des métadonnées pédagogiques aux modules (`ModuleIntro`, `ModulePager`), chapeaux explicatifs sur chaque section, et intégration complète dans le sommaire sticky des modules.

**Tech Stack:** React 19, TypeScript, Vitest, Playwright, CSS vanilla natif (sans dépendance externe).

**Spec:** `docs/superpowers/specs/2026-11-09-pedagogie-intros-infobulles-design.md`

**Statut :** livré le 9 novembre 2026, avec les compléments de recherche globale et de liens du dossier projet.

## Global Constraints

- Licence AGPL-3.0-or-later, 100 % front-end, zéro requête externe, zéro cookie, zéro appel réseau runtime.
- Charte typographique stricte : apostrophes courbes `’`, aucun tiret cadratin `—`, espaces insécables avant ponctuations doubles `: ; ? ! »` et après `«`.
- Accessibilité WCAG 2.2 AA : focus visible, navigation clavier totale (Espace/Entrée/Échap), infobulles conformes `role="tooltip"`, zoom 200 % sans défilement horizontal à 320 px (`overflow-x: clip`).
- Préservation de l'intégralité des 320 tests existants et du smoke Playwright (18/18).

## Review Focus

1. **Accessibilité de l'infobulle (`Terme`) au clavier et tactile** : doit s'ouvrir au focus/clic/touche, se fermer avec Échap ou clic extérieur, sans bloquer le focus du document.
2. **Reflow à 320 px** : les infobulles flottantes ne doivent provoquer aucun débordement horizontal ni faire sortir le conteneur du viewport.
3. **Respect de la charte typographique** : aucun texte nouveau ne doit introduire d'apostrophe droite `'`, de tiret cadratin `—` ou d'espace manquante devant une ponctuation double.
4. **Intégrité des liens du sommaire** : toutes les ancres de section (#fiche, #fil-rouge, #demarche, #labo, #exercice, #quiz, #guide, #reflexe, et les sections spécifiques comme #comparateur, #pre-mortem, etc.) doivent être valides et présentes dans le DOM.
5. **Autonomie des termes** : un terme sans identifiant exact dans le glossaire ne doit pas crasher l'application (repli gracieux sur le texte nu avec avertissement de typage).

---

### Task 1: Enrichissement du glossaire (`src/lib/glossaire.ts`) et de la route Glossaire

**Files:**
- Modify: `src/lib/glossaire.ts`
- Modify: `src/routes/Glossaire.tsx`
- Modify: `tests/glossaire.test.ts`

**Interfaces:**
- Produces: `export interface Terme { terme: string; definition: string; module?: number; lien?: { to: string; label: string }; sigle?: string; developpe?: string; alias?: string[] }`
- Produces: `export function trouverTerme(idOuNom: string): Terme | undefined`

- [ ] **Step 1: Écrire le test unitaire pour les nouveaux termes et la recherche de terme**

Dans `tests/glossaire.test.ts`, ajouter les tests vérifiant la présence des bases informatiques (`Dépôt`, `Serveur`, `API`, `Navigateur`), des sigles développés (`WBS`, `PERT`, `GANTT`, `CI`, `CD`, `RACI`, `WIP`, `XP`, `RGPD`, `MFA`, `RAG`, `AI Act`) et de la fonction `trouverTerme`.

- [ ] **Step 2: Exécuter le test pour vérifier l'échec**

Run: `npm test tests/glossaire.test.ts`
Expected: FAIL (termes manquants et `trouverTerme` non définie).

- [ ] **Step 3: Enrichir `src/lib/glossaire.ts` et ajouter `trouverTerme`**

Définir l'interface `Terme` enrichie, ajouter les définitions conformes à la charte typographique, et implémenter `trouverTerme(idOuNom: string): Terme | undefined` qui normalise les accents et casse pour matcher le terme, le sigle ou ses alias.

- [ ] **Step 4: Mettre à jour `src/routes/Glossaire.tsx`**

Afficher le sigle développé (`developpe`) sous forme de sous-titre clair entre parenthèses lorsque présent, et attribuer des attributs `id` prévisibles pour l'ancrage direct depuis les infobulles.

- [ ] **Step 5: Vérifier le passage des tests**

Run: `npm test tests/glossaire.test.ts`
Expected: PASS.

- [ ] **Step 6: Commiter**

```bash
git add src/lib/glossaire.ts src/routes/Glossaire.tsx tests/glossaire.test.ts
git commit -m "feat(glossaire): enrichit les termes avec sigles, bases informatiques et alias"
```

---

### Task 2: Composant d'infobulle accessible `Terme` et styles

**Files:**
- Create: `src/components/Terme.tsx`
- Create: `src/styles/terme.css`
- Create: `tests/terme.test.tsx`
- Modify: `src/styles/index.css` (import de `terme.css`)

**Interfaces:**
- Consumes: `trouverTerme` depuis `src/lib/glossaire.ts`
- Produces: `export function Terme(props: { id?: string; children?: React.ReactNode; terme?: string; affichage?: string }): React.ReactElement`

- [ ] **Step 1: Écrire les tests unitaires du composant `Terme`**

Dans `tests/terme.test.tsx`, tester :
1. Rendu par défaut du libellé avec attributs accessibles (`aria-expanded="false"`, `aria-describedby`).
2. Ouverture de l'infobulle au clic et au clavier (Entrée/Espace).
3. Affichage du sigle développé, de la définition et du lien vers `/glossaire#slug`.
4. Fermeture par touche `Échap` et par clic extérieur.
5. Repli gracieux si le terme n'est pas trouvé dans le dictionnaire.

- [ ] **Step 2: Exécuter les tests pour vérifier l'échec**

Run: `npm test tests/terme.test.tsx`
Expected: FAIL (`Terme.tsx` introuvable).

- [ ] **Step 3: Implémenter `src/components/Terme.tsx` et `src/styles/terme.css`**

Créer le composant avec un bouton accessible `<button type="button" className="terme-trigger">`, gestion de l'état `ouvert`, fermeture par écouteur d'événements global (`Escape`, `pointerdown`), et infobulle positionnée proprement sans débordement horizontal. Importer `terme.css` dans `src/styles/index.css`.

- [ ] **Step 4: Vérifier le passage des tests unitaires**

Run: `npm test tests/terme.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commiter**

```bash
git add src/components/Terme.tsx src/styles/terme.css src/styles/index.css tests/terme.test.tsx
git commit -m "feat(components): ajoute le composant d'infobulle accessible Terme"
```

---

### Task 3: Métadonnées enrichies des modules et composants `ModuleIntro` & `ModulePager`

**Files:**
- Modify: `src/modules/index.ts`
- Create: `src/components/ModuleIntro.tsx`
- Create: `src/components/ModulePager.tsx`
- Modify: `src/components/ModuleLayout.tsx`
- Create: `tests/pedagogie.test.tsx`

**Interfaces:**
- Consumes: `MODULES`, `ModuleMeta` depuis `src/modules/index.ts`
- Produces: `export function ModuleIntro(props: { meta: ModuleMeta }): React.ReactElement`
- Produces: `export function ModulePager(props: { numCourant: number }): React.ReactElement`
- Produces: `ModuleLayout` supportant une liste complète de sections pour son sommaire sticky.

- [ ] **Step 1: Écrire les tests unitaires de structure pédagogique**

Dans `tests/pedagogie.test.tsx`, vérifier :
1. Chaque module dans `MODULES` possède `pourquoi`, `objectifs` (longueur 3), `temps` (lecture + pratique) et `filRougeContexte`.
2. `ModuleIntro` affiche le problème concret, les 3 objectifs et la mise en contexte fil rouge.
3. `ModulePager` affiche les liens vers le module précédent et le module suivant avec phrase de transition.
4. `ModuleLayout` génère un sommaire contenant toutes les sections déclarées.

- [ ] **Step 2: Exécuter les tests pour vérifier l'échec**

Run: `npm test tests/pedagogie.test.tsx`
Expected: FAIL (propriétés manquantes dans `ModuleMeta`, composants non créés).

- [ ] **Step 3: Enrichir `src/modules/index.ts`**

Compléter l'interface `ModuleMeta` et renseigner pour chacun des 9 modules :
- `pourquoi` : pourquoi ce sujet existe, quel problème d'entreprise il résout.
- `objectifs` : 3 compétences observables pour un junior.
- `temps` : `{ lecture: string, pratique: string }`.
- `filRougeContexte` : rôle et enjeu concret pour Les Amis du Square.
- `transition` : phrase reliant la fin de ce module au module suivant.

- [ ] **Step 4: Implémenter `ModuleIntro.tsx`, `ModulePager.tsx` et mettre à jour `ModuleLayout.tsx`**

1. `ModuleIntro.tsx` : carte pédagogique structurée au sommet de la page.
2. `ModulePager.tsx` : bloc de fin de page offrant la navigation fluide précédent/suivant.
3. `ModuleLayout.tsx` : accepter une prop `sections?: Array<{ id: string; label: string }>` pour alimenter le sommaire sticky avec toutes les sections du module (sans se limiter à une seule `extraNav`).

- [ ] **Step 5: Vérifier le passage des tests**

Run: `npm test tests/pedagogie.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commiter**

```bash
git add src/modules/index.ts src/components/ModuleIntro.tsx src/components/ModulePager.tsx src/components/ModuleLayout.tsx tests/pedagogie.test.tsx
git commit -m "feat(pedagogie): ajoute ModuleIntro, ModulePager et le sommaire dynamique"
```

---

### Task 4: Chapeaux pédagogiques et infobulles dans les modules 1 à 3

**Files:**
- Modify: `src/modules/m1-wbs/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m2-planif/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m3-methodes/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`

**Interfaces:**
- Consumes: `<Terme>`, `<ModuleIntro>`, `<ModulePager>`

- [ ] **Step 1: Écrire les assertions de contenu pour les modules 1 à 3**

Dans `tests/pedagogie.test.tsx`, ajouter des tests confirmant que :
1. Le module 1 intègre les infobulles sur `<Terme id="wbs">`, `<Terme id="cadrage">`, `<Terme id="jalon">`, `<Terme id="perimetre">`.
2. Le module 2 intègre les infobulles sur `<Terme id="pert">`, `<Terme id="gantt">`, `<Terme id="chemin-critique">`, `<Terme id="chaine-tendue">`.
3. Le module 3 intègre les infobulles sur `<Terme id="cycle-en-v">`, `<Terme id="waterfall">`, `<Terme id="recette">`, `<Terme id="critere-d-acceptation">`.
4. Chaque section (`#fiche`, `#demarche`, `#fil-rouge`) débute par un paragraphe introductif clair pour un junior.
5. Le sommaire du module 3 inclut `#comparateur`.

- [ ] **Step 2: Exécuter les tests pour vérifier l'échec**

Run: `npm test tests/pedagogie.test.tsx`
Expected: FAIL sur les vérifications de contenu M1-M3.

- [ ] **Step 3: Mettre à jour le module 1 (`m1-wbs`)**
  - Insérer `<ModuleIntro meta={meta} />` et `<ModulePager numCourant={1} />`.
  - Ajouter un chapeau d'introduction à `Fiche`, `Demarche` et `FilRouge`.
  - Placer les balises `<Terme>` sur les notions clés.

- [ ] **Step 4: Mettre à jour le module 2 (`m2-planif`)**
  - Remplacer la définition locale de `meta` par `moduleMetaByNum(2)`.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Ajouter les chapeaux pédagogiques et les balises `<Terme>` (PERT, GANTT, jalons, chemin critique).

- [ ] **Step 5: Mettre à jour le module 3 (`m3-methodes`)**
  - Remplacer la définition locale de `meta` par `moduleMetaByNum(3)`.
  - Inclure `#comparateur` dans la liste des sections du sommaire.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Ajouter les chapeaux pédagogiques et les balises `<Terme>` (Cycle en V, cascade, recette, non-régression).

- [ ] **Step 6: Vérifier les tests unitaires et la charte typographique**

Run: `npm test tests/pedagogie.test.tsx tests/typo.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commiter**

```bash
git add src/modules/m1-wbs/ src/modules/m2-planif/ src/modules/m3-methodes/ tests/pedagogie.test.tsx
git commit -m "feat(modules): enrichit la pédagogie, les intros et les infobulles des modules 1 à 3"
```

---

### Task 5: Chapeaux pédagogiques et infobulles dans les modules 4 à 6

**Files:**
- Modify: `src/modules/m4-agiles/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m5-outils/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m6-equipe/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`

**Interfaces:**
- Consumes: `<Terme>`, `<ModuleIntro>`, `<ModulePager>`

- [ ] **Step 1: Écrire les assertions de contenu pour les modules 4 à 6**

Dans `tests/pedagogie.test.tsx`, ajouter des tests confirmant que :
1. Le module 4 intègre les infobulles sur `<Terme id="scrum">`, `<Terme id="kanban">`, `<Terme id="wip">`, `<Terme id="lean">`, `<Terme id="xp">`, `<Terme id="backlog">` et référence `#labo-poker` dans son sommaire.
2. Le module 5 intègre les infobulles sur `<Terme id="chaine-ci">`, `<Terme id="cd">`, `<Terme id="depot">`, `<Terme id="serveur">`, `<Terme id="environnement">`, `<Terme id="api">` et référence `#labo-chaine` dans son sommaire.
3. Le module 6 intègre les infobulles sur `<Terme id="eisenhower">`, `<Terme id="pre-mortem">`, `<Terme id="registre-des-risques">`, `<Terme id="retrospective">` et référence `#labo-risques` et `#pre-mortem` dans son sommaire.
4. Chaque section possède sa phrase d'introduction claire.

- [ ] **Step 2: Exécuter les tests pour vérifier l'échec**

Run: `npm test tests/pedagogie.test.tsx`
Expected: FAIL sur M4-M6.

- [ ] **Step 3: Mettre à jour le module 4 (`m4-agiles`)**
  - Utiliser `moduleMetaByNum(4)`.
  - Sommaire complet avec `#labo` et `#labo-poker`.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Chapeaux pédagogiques et balises `<Terme>`.

- [ ] **Step 4: Mettre à jour le module 5 (`m5-outils`)**
  - Utiliser `moduleMetaByNum(5)`.
  - Sommaire complet avec `#labo` et `#labo-chaine`.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Chapeaux pédagogiques et balises `<Terme>` (développant CI/CD, dépôt, serveur, environnement reproductible).

- [ ] **Step 5: Mettre à jour le module 6 (`m6-equipe`)**
  - Utiliser `moduleMetaByNum(6)`.
  - Sommaire complet avec `#labo`, `#labo-risques` et `#pre-mortem`.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Chapeaux pédagogiques et balises `<Terme>`.

- [ ] **Step 6: Vérifier les tests unitaires et la typographie**

Run: `npm test tests/pedagogie.test.tsx tests/typo.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commiter**

```bash
git add src/modules/m4-agiles/ src/modules/m5-outils/ src/modules/m6-equipe/ tests/pedagogie.test.tsx
git commit -m "feat(modules): enrichit la pédagogie, les intros et les infobulles des modules 4 à 6"
```

---

### Task 6: Chapeaux pédagogiques et infobulles dans les modules 7 à 9 et pages transversales

**Files:**
- Modify: `src/modules/m7-parties/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m8-budget/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/modules/m9-changement/index.tsx`, `fiche.tsx`, `demarche.tsx`, `filRouge.tsx`
- Modify: `src/routes/Outils.tsx`, `Modeles.tsx`, `DossierProjet.tsx`
- Modify: `src/ia/content/Hub.tsx`, `src/cyber/content/Hub.tsx`, `src/cyber/content/Acces.tsx`, `src/cyber/content/Donnees.tsx`

**Interfaces:**
- Consumes: `<Terme>`, `<ModuleIntro>`, `<ModulePager>`

- [ ] **Step 1: Écrire les assertions pour les modules 7 à 9 et les pages transversales**

Dans `tests/pedagogie.test.tsx`, ajouter des tests confirmant que :
1. Le module 7 intègre les infobulles sur `<Terme id="partie-prenante">`, `<Terme id="raci">`, `<Terme id="gouvernance">`, `<Terme id="sponsor">`.
2. Le module 8 intègre les infobulles sur `<Terme id="estimation">`, `<Terme id="marge-d-alea">`, `<Terme id="ecart">`.
3. Le module 9 intègre les infobulles sur `<Terme id="adoption">`, `<Terme id="relais">`, `<Terme id="conduite-du-changement">`.
4. Les pages IA et cybersécurité intègrent des infobulles sur `<Terme id="rgpd">`, `<Terme id="mfa">`, `<Terme id="rag">`, `<Terme id="api">`.
5. Les pages transversales (Outils, Modèles, DossierProjet) disposent d'introductions clarifiées pour les juniors.

- [ ] **Step 2: Exécuter les tests pour vérifier l'échec**

Run: `npm test tests/pedagogie.test.tsx`
Expected: FAIL sur M7-M9 et transverses.

- [ ] **Step 3: Mettre à jour les modules 7, 8 et 9**
  - Utiliser `moduleMetaByNum` sur chaque module.
  - Insérer `<ModuleIntro>` et `<ModulePager>`.
  - Ajouter chapeaux pédagogiques et balises `<Terme>`.

- [ ] **Step 4: Mettre à jour les pages transversales et parcours IA/Cyber**
  - Enrichir les introductions pour les rendre directes et accessibles aux juniors.
  - Insérer les infobulles `<Terme>` sur RGPD, MFA, API, serveur, etc.

- [ ] **Step 5: Vérifier les tests unitaires et la typographie**

Run: `npm test tests/pedagogie.test.tsx tests/typo.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commiter**

```bash
git add src/modules/m7-parties/ src/modules/m8-budget/ src/modules/m9-changement/ src/routes/ src/ia/ src/cyber/ tests/pedagogie.test.tsx
git commit -m "feat(pedagogie): finalise les intros et infobulles sur M7-M9, IA, Cyber et transverses"
```

---

### Task 7: Validation globale, smoke Playwright, audits d'accessibilité et documentation

**Files:**
- Modify: `smoke/smoke.spec.ts`
- Modify: `structure.md`
- Modify: `features.md`
- Modify: `todo.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Ajouter un test smoke Playwright pour l'infobulle et la navigation entre modules**

Dans `smoke/smoke.spec.ts`, ajouter un test vérifiant :
1. Sur `/module-1`, le clic sur une infobulle `<Terme>` ouvre la bulle avec son contenu et sa fermeture par Échap.
2. La présence de `ModuleIntro` avec ses 3 objectifs.
3. Le clic sur le bouton « Module suivant » du `ModulePager` navigue bien vers `/module-2`.
4. Vérification que l'infobulle ouverte ne crée aucun débordement horizontal à 320 px.

- [ ] **Step 2: Exécuter la suite complète de vérification locale**

Run: `npm run lint && npm run typecheck && npm run check:liens && npm test`
Expected: Tout passe à 100 %, 0 erreur lint, 0 erreur de types, 0 lien cassé, tests unitaires tous verts.

- [ ] **Step 3: Exécuter le build et le smoke Playwright**

Run: `npm run build && npm run smoke`
Expected: Build OK sans avertissement de chunk, suite smoke passée à 19/19 (ou 18+1).

- [ ] **Step 4: Mettre à jour la documentation du projet**
  - `structure.md` : ajouter les nouveaux composants (`Terme`, `ModuleIntro`, `ModulePager`) et `terme.css`.
  - `features.md` : consigner la couche pédagogique, les infobulles et les intros.
  - `todo.md` : marquer le lot pédagogique comme réalisé.
  - `CHANGELOG.md` : documenter la nouvelle version avec le détail des améliorations pédagogiques.

- [ ] **Step 5: Commiter**

```bash
git add smoke/smoke.spec.ts structure.md features.md todo.md CHANGELOG.md
git commit -m "docs: consigne la refonte pédagogique, les infobulles et met à jour le smoke"
```

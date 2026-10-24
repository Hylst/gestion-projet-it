# Enrichissements P1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Livrer les exercices de transfert, vingt termes de glossaire, le pré-mortem, les fiches outils, la grille de comparaison et les tests clavier du lot P1.

**Architecture:** Les contenus de module restent dans `src/modules/mX`. Les fiches outils et leurs critères vivent dans `src/lib/outils.ts` et sont rendus par une route `/outils`. Le pré-mortem est une section de M6. La recherche, le sitemap, le service worker et le smoke sont mis à jour avec les nouvelles routes.

**Tech Stack:** Vite, React 18, TypeScript, React Router 7, Vitest 5, Testing Library, Playwright.

## Global Constraints

- Aucun XP, aucune clé `gestion-projet-it:xp`, aucun compteur `0/9` modifié.
- Aucun backend, cookie, analytics, requête externe au chargement ou dépendance runtime.
- Aucun tiret cadratin, apostrophe droite, espace normale avant `: ; ? !`.
- Aucune école présentée comme supérieure, aucun chiffre sans source.
- Tests avec `fireEvent` et assertions natives.
- Vérifier la charte, le clavier, les liens internes et les ancres.
- Ne pas toucher au dépôt Docker avant la validation complète du build.

---

### Task 1: Vingt termes de glossaire

**Files:** `src/lib/glossaire.ts`, `tests/glossaire.test.ts`

**Produces:** vingt termes supplémentaires, dont `Pré-mortem`, `Fiche outil`, `Modèle de menace`, `Plan de reprise`, `Propriétaire de risque`.

- [ ] Ajouter les vingt termes avant les termes IA.
- [ ] Ajouter un test qui vérifie les vingt noms et les liens des termes de parcours.
- [ ] Vérifier les définitions, les doublons et la longueur.
- [ ] Lancer `npm test -- tests/glossaire.test.ts`.

### Task 2: Neuf exercices de transfert

**Files:** `src/modules/m*/exercice.tsx` ou `exercise.tsx`, `tests/transfert.test.tsx`

**Produces:** un `ExerciseBlock` supplémentaire par module, sans XP.

- [ ] Écrire un test qui rend les neuf pages et vérifie la présence de « Exercice de transfert ».
- [ ] Ajouter un exercice par module avec énoncé, corrigé et trois gestes de méthode.
- [ ] Vérifier que les exercices existants et les XP restent inchangés.
- [ ] Lancer `npm test -- tests/transfert.test.tsx`.

### Task 3: Pré-mortem de M6

**Files:** `src/modules/m6-equipe/preMortem.tsx`, `src/modules/m6-equipe/index.tsx`, `src/components/ModuleLayout.tsx`, `tests/transfert.test.tsx`

**Produces:** une section `#pre-mortem`, un lien de sommaire optionnel et un tableau de trois risques.

- [ ] Ajouter le test de présence, du tableau et du lien de sommaire.
- [ ] Rendre la section avec un exemple fictif, des signes précoces, des parades et des décisions.
- [ ] Ajouter le lien de sommaire uniquement sur M6.
- [ ] Lancer `npm test -- tests/transfert.test.tsx`.

### Task 4: Fiches outils et grille de comparaison

**Files:** `src/lib/outils.ts`, `src/routes/Outils.tsx`, `tests/outils.test.tsx`, `src/App.tsx`, `src/components/SiteHeader.tsx`, `src/routes/Ressources.tsx`, `src/styles/index.css`

**Produces:** six fiches normalisées et six critères de comparaison.

- [ ] Écrire le test qui vérifie six fiches, six critères et les champs obligatoires.
- [ ] Créer les données : suivi, documentation, diagrammes, tests, sécurité, accessibilité.
- [ ] Rendre `/outils` avec les fiches et la grille.
- [ ] Ajouter la route, le lien de navigation et le lien depuis `/ressources`.
- [ ] Lancer `npm test -- tests/outils.test.tsx`.

### Task 5: Intégration, clavier et service worker

**Files:** `public/sitemap.xml`, `public/sw.js`, `src/lib/search.ts`, `smoke/smoke.spec.ts`, `tests/typo.test.tsx`, `tests/header.test.tsx`, `tests/ia.test.tsx`, `README.md`

**Produces:** 20 routes publiques, service worker v6, recherche de `/outils`, tests clavier.

- [ ] Ajouter `/outils` au sitemap, au smoke, à la typographie, au header et à la recherche.
- [ ] Passer le service worker en `gestion-projet-it-v6`.
- [ ] Ajouter un test Playwright de focus sur `/outils` et sur le lien `#pre-mortem`.
- [ ] Mettre à jour les compteurs de routes.
- [ ] Lancer `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, puis le smoke.

### Task 6: Changelog, backlog et Docker

**Files:** `BACKLOG.md`, `CHANGELOG.md`, `cahier_des_charges.md`, `docs/README.md`, `D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it/`, `Docker/sitemap.xml`

**Produces:** lot traçable et build synchronisé.

- [ ] Passer `ENR-004`, `ENR-005`, `ENR-007`, `RES-002`, `RES-005`, `QUA-002` à `Livré`.
- [ ] Mettre à jour le changelog et le cahier des charges.
- [ ] Construire, smoke et Lighthouse sur `/outils` et `/module-6`.
- [ ] Copier `dist/` dans `Docker/gestion-projet-it/` et vérifier les 20 routes du sitemap.
- [ ] Mettre à jour la date du sitemap racine et le hub si nécessaire.
- [ ] Ne committer que `gestion-projet-it`, `sitemap.xml` et les fichiers hub modifiés. Ne pas toucher aux autres projets Docker.

## Self-Review

- Les six items du lot ont une task dédiée.
- Aucun XP, aucune dépendance runtime, aucun chargement externe.
- Le pré-mortem est dans M6, sans nouvelle route.
- `/outils` est la seule nouvelle route et doit être audité au clavier.
- Le dépôt Docker reste sale par d’autres projets : indexation ciblée obligatoire.

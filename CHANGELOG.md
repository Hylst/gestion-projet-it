# Changelog

## [1.5.0] - 2026-10-24

### Design éditorial

- Système de couleurs par module, surfaces teintées, bordures d’accent et ombres mesurées.
- Accueil refondu : hero plus graphique, statistiques et cartes de modules avec identité propre.
- Pages module : en-tête coloré, sommaire sticky, sections en cartes, fiche découpée en blocs.
- Erreurs fréquentes en détails natifs, corrigés dépliables et survols des cartes, tableaux et ressources.
- Pages IA, outils, ressources, modèles, glossaire, À propos, légales et dossier projet alignées sur le même langage visuel.
- Thème clair uniquement, contrastes AA, focus clavier et mouvement réduit conservés.

### Vérifié

- 40 fichiers de tests, 256 tests.
- Lint, typecheck, 58 liens relatifs, 25 routes, audit npm à 0 et build.
- Smoke Playwright : 15/15 sur 25 routes, impression, hors ligne et pages légales.
- Lighthouse mobile local : accueil 100/100/100/100, `/module-1` 99/100/100/100, `/modeles` 99/100/100/100.
- Lighthouse production après déploiement : accueil 98/100/100/100, `/module-1` 100/100/100/100.
- Bundle initial : 292 kB minifiés, 92 kB gzip ; CSS 42 kB, sans avertissement Vite.

### Publication

- Build : `index-CSOg-N2L.js`, `index-PPGPK_P4.css`.
- Service worker : `gestion-projet-it-v11`.
- Docker : commit `008f33e2`, 25 routes et build identique. Smoke 15/15 sur la copie Docker et en production.
- Search Console : sitemap du module soumis le 24 octobre 2026.

## [1.4.0] - 2026-10-24

### Conformité et partage

- Source AGPL publique, fichier `LICENSE`, licence servie avec le site et en-têtes SPDX.
- Pages `/mentions-legales`, `/confidentialite`, `/transparence-ia` et `/accessibilite`.
- Documentation complète : architecture, sécurité, contribution, crédits et dossier de conformité.
- Auteur, hébergement, journaux, transfert Royaume-Uni, RGPD et AI Act documentés.
- Transparence sur l’assistance IA, les illustrations générées localement et l’absence d’IA au runtime.

### Partage, SEO et PWA

- Métadonnées sociales statiques, image Open Graph 1200 × 630 et carte Twitter.
- Canonical limité à l’origine et au chemin, sans query ni fragment.
- Icônes PNG 192/512 et icône Apple Touch.
- Service worker v10, 25 routes et sitemap de 25 URL.
- Routes de contenu chargées en différé avec un fallback accessible sans décalage.

### Vérifié

- 40 fichiers de tests, 256 tests.
- Lint, typecheck, 56 liens relatifs, 25 routes, audit npm à 0 et build.
- Smoke Playwright : 15/15 sur 25 routes, pages légales, impression et hors ligne.
- Lighthouse mobile : accueil 100/100/100/100, `/modeles` 99/100/100/100.
- Bundle initial : 292 kB minifiés, 92 kB gzip, sans avertissement de taille.
- 24 URL externes en réponse HTTP 200.

### Publication

- Build : `index-BU69uoIT.js`, `index-9eoXZOKN.css`.
- Service worker : `gestion-projet-it-v10`.
- Docker : commit `dca956e1`, 25 routes et build identique. Smoke 15/15 sur la copie Docker.

## [1.3.0] - 2026-10-24

### Outillage

- React et React DOM passent en 19.3.1, avec les types 19.3.
- Vite passe en 8.3.5 et `@vitejs/plugin-react` en 6.1.2.
- ESLint passe en 10.13, `@eslint/js` en 10.0.1, `eslint-plugin-react-hooks` en 7.1.1 et `typescript-eslint` en 8.72.
- jsdom passe en 30.1.3 ; le prérequis Node est porté à 22.22.2.

### Corrigé

- Les trois effets signalés par `react-hooks` sont simplifiés : quiz, recherche et observateur d’intersection.
- Les types des laboratoires et le namespace JSX sont alignés sur React 19.

### Vérifié

- 39 fichiers de tests, 244 tests.
- Lint, typecheck, contrôle des liens, audit npm et build production.
- Smoke Playwright : 15/15, 21 routes, journal, impression, hors ligne et clavier.
- Lighthouse mobile : accueil 99/100, `/modeles` 99/100.
- 42 liens relatifs contrôlés, 24 URL externes en HTTP 200.
- Bundle production : 563 kB minifié, 160 kB gzip, avertissement de taille Vite assumé.

### Publication

- Build : `index-KpBdzZ83.js`, `index-D02aBuyy.css`.
- Service worker : `gestion-projet-it-v9`.
- Docker : commit `86e9452e`, 21 routes et build identique. Smoke 15/15 sur la copie Docker.

## [1.2.1] - 2026-10-24

### Corrigé

- Recherche par synonymes : un OU dans chaque groupe et un ET entre les groupes. `risque` et `danger` retrouvent le module 6 sans régression.
- Journal : une écriture `localStorage` en échec ne casse plus la saisie et affiche un message explicite.
- Contrôle des liens : comparaison stricte des routes et du sitemap, détection des URL absentes ou en double.
- Lien vers `/modeles` ajouté au footer et clé `gestion-projet-it:journal:v1` documentée.

### Qualité

- Tests de non-régression sur `risque`, `danger` et `budget`, plus un test d’échec de stockage local.
- Smoke enrichi : impression du journal et fonctionnement hors ligne après première visite.
- Plan P2 et périmètre du contrôle des liens documentés.
- Service worker v8 et 21 routes publiques.

### Vérifié

- 39 fichiers de tests, 244 tests.
- Lint, typecheck, contrôle des liens, audit npm et build production.
- Smoke Playwright : 15/15, 21 routes, journal, impression, hors ligne et clavier.
- Lighthouse mobile : accueil 99/100, `/modeles` 99/100.
- 24 URL externes en réponse HTTP 200.

### Publication

- Build : `index-DPR_ZLjS.js`, `index-n7YZdwAn.css`.
- Service worker : `gestion-projet-it-v8`.
- Docker : commit `f161210c`, 21 routes et build identique. Smoke 15/15 sur la copie Docker.

## [1.2.0] - 2026-10-24

### Contenu

- Page `/modeles` : journal de projet guidé, revue par les pairs et six modèles imprimables.
- Dix entrées de journal couvrant les neuf modules et le dossier projet, avec décision, suite et sauvegarde locale.
- Grille de revue par les pairs avec critères observables, ton non défensif et aucune obligation d’outil.
- Modèles WBS, RACI, registre des risques, plan de recette, journal de décisions et guide d’entretien.
- Lien vers `/modeles` depuis `/outils`, recherche, sitemap et service worker mis à jour.

### Qualité

- Recherche étendue à six familles de synonymes métier, sans dégrader les résultats existants.
- Script `check:liens` : liens relatifs des documents, cohérence des routes et du sitemap.
- Budget Lighthouse documenté avec seuils, pages de référence et procédure en cas d’échec.
- Audit d’accessibilité étendu aux pages du lot P2.
- Service worker v7 et 21 routes publiques.

### Vérifié

- 39 fichiers de tests, 242 tests.
- Lint, typecheck, contrôle des liens et build production.
- Smoke Playwright : 14/14, 21 routes, journal local, clavier, liens internes et ressources.
- Lighthouse mobile : accueil 99/100, `/modeles` 99/100, bonnes pratiques 100, SEO 100.
- `npm audit` : 0 vulnérabilité.

### Publication

- Build : `index-CPwd5sWk.js`, `index-CdEV3cdB.css`.
- Service worker : `gestion-projet-it-v7`.
- Docker : commit `ba620a77`, 21 routes et build identique. Smoke 14/14 sur la copie Docker.

## [1.1.0] - 2026-10-24

### Documentation

- Ajout du README opérationnel, du backlog central et de l’index des specs et plans.
- Intégration des specs et plans du dossier projet et de la section IA.
- Mise à jour des règles agents et ajout d’un addendum au cahier des charges.
- Cadrage des enrichissements à venir : parcours Produit, parcours Cybersécurité, ressources, outils et qualité.
- Audit éditorial des neuf modules et politique de sources.

### Contenu et accessibilité

- Trois erreurs fréquentes et un point de décision par module, avec conséquence, correction, critères, limites et cas de non-usage.
- Page `/ressources` : 18 ressources de modules et 6 ressources de parcours, qualifiées et datées.
- Recherche étendue aux guides « erreurs et décision » et à la page Ressources.
- Neuf exercices de transfert, un par module, avec corrigé et méthode.
- Vingt termes de glossaire supplémentaires, dont pré-mortem, fiche outil et modèle de menace.
- Atelier de pré-mortem dans le module 6.
- Page `/outils` : six fiches normalisées et grille de comparaison.
- Service worker v6 et 20 routes publiques.
- Audit WCAG 2.2 AA des guides, de Ressources et des outils.

### Sécurité

- Mise à jour de Vitest vers 5.0.5 et ajout de `node` aux types TypeScript.
- Prérequis Node.js porté à 22.12, conformément à Vitest 5.
- `npm audit` ne signale plus aucune vulnérabilité.
- Audit npm ajouté à la CI et Dependabot activé pour npm et GitHub Actions.

### Vérifié

- 38 fichiers de tests, 237 tests.
- Lint, typecheck et build production.
- Smoke Playwright : 13/13, 20 routes, liens internes, clavier, ressources et outils.
- Lighthouse mobile : accueil 99/100, `/ressources` 99/100, `/module-1` 99/100, `/outils` 99/100, `/module-6` 99/100.
- 24 URL de ressources en réponse HTTP 200 le 24 octobre 2026.

### Publication

- Build : `index-D81qJG7o.js`, `index-DfEfIL14.css`.
- Service worker : `gestion-projet-it-v6`.
- Docker : commit `d617cd3c`, 20 routes et build identique. Smoke 13/13 sur la copie Docker.
- Sitemap racine : date du 24 octobre 2026.

## [1.0.0] - 2026-10-23

### Ajouté

- Dossier projet en six étapes, avec sauvegarde locale, export JSON et impression.
- Section IA en cinq pages, avec sources, recherche et glossaire associé.
- Angles morts des modules 3 et 7 : critères d’acceptation, recette, non-régression, rôles, RACI, décisions et escalade.
- Recherche globale étendue aux modules et aux pages IA.

### Vérifié

- 34 fichiers de tests, 206 tests.
- Lint, typecheck et build production.
- Smoke Playwright : 10/10, 18 routes, liens internes et H1 contrôlés.
- Lighthouse production : accueil 98/100/100/100, `/ia` 100/100/100/100.

### Publication

- Build : `index-BN9HjO3I.js`, `index-o6t1cYmb.css`.
- Commit source initial : `00d10e0`.
- Commit plateforme : `352f274e` ; documentation : `3f58a053`.

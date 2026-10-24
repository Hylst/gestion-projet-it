# Changelog

## [Non publié]

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
- Audit WCAG 2.2 AA des guides et de la page Ressources.

### Sécurité

- Mise à jour de Vitest vers 5.0.5 et ajout de `node` aux types TypeScript.
- Prérequis Node.js porté à 22.12, conformément à Vitest 5.
- `npm audit` ne signale plus aucune vulnérabilité.
- Audit npm ajouté à la CI et Dependabot activé pour npm et GitHub Actions.

### Vérifié

- 37 fichiers de tests, 233 tests.
- Lint, typecheck et build production.
- Smoke Playwright : 11/11, 19 routes, liens internes, clavier et ressources.
- Lighthouse mobile : `/ressources` 99/100 et `/module-1` 99/100.
- 24 URL de ressources en réponse HTTP 200 le 24 octobre 2026.

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

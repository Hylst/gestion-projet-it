# Plan P2 : journal, modèles et qualité

**Date :** 24 octobre 2026
**Statut :** livré
**Périmètre :** journal de projet, revue par les pairs, modèles imprimables, recherche avec synonymes, budget Lighthouse et contrôle des liens.

## Objectif

Compléter le cours avec des traces de décision utilisables, des grilles de revue et des modèles imprimables, sans compte, sans backend et sans données sortantes.

## Décisions

- Le journal et les modèles vivent sur une route dédiée `/modeles`, reliée depuis `/outils`, la recherche, le sitemap et le footer.
- Les dix entrées du journal couvrent les neuf modules et le dossier projet.
- La revue par les pairs porte sur un livrable, jamais sur une personne.
- Les modèles restent des grilles à recopier ou à imprimer, sans collecte de données.
- La recherche utilise des groupes de synonymes avec un OU dans chaque groupe et un ET entre les groupes.
- Les contrôles de qualité automatisés restent locaux : liens relatifs, routes et sitemap. Les URL externes sont vérifiées manuellement et datées.

## Tâches

1. Créer `src/lib/journal.ts` et ses dix entrées.
2. Créer `/modeles` avec journal, revue, six modèles et impression.
3. Protéger la sauvegarde locale et signaler un échec sans perdre la saisie.
4. Étendre la recherche avec six familles de synonymes et des tests de non-régression.
5. Mettre à jour la recherche, le sitemap, le service worker et le smoke.
6. Ajouter le budget Lighthouse, le contrôle des liens et les preuves d’accessibilité.
7. Documenter la clé de stockage, le footer et les limites des contrôles.

## Vérification

- `npm test`, lint, typecheck, `check:liens`, audit npm et build.
- Smoke Playwright : 21 routes, journal, impression, hors ligne et clavier.
- Lighthouse mobile sur l’accueil et `/modeles`.
- Smoke sur la copie Docker après resynchronisation.

## Livraison

- Version 1.2.0 : journal, revue, modèles et synonymes.
- Version 1.2.1 : correction de la recherche historique, robustesse du stockage, tests d’impression et hors ligne, contrôle strict du sitemap.

## Références

- [README principal](../../../README.md)
- [Backlog](../../../BACKLOG.md)
- [Changelog](../../../CHANGELOG.md)
- [Budget Lighthouse](../../qualite/lighthouse.md)
- [Contrôle des liens](../../qualite/liens.md)

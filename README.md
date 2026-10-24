# Gestion de Projet IT

Cours interactif en français pour apprendre à conduire un projet informatique : cadrage, planification, méthodes, outils, équipe, parties prenantes, budget, changement, dossier projet et usages de l’IA.

Application 100 % front, sans compte, sans cookie, sans backend et sans requête externe au chargement. La progression reste dans le navigateur.

## État actuel

- 9 modules avec fiche, démarche, laboratoire interactif, exercice corrigé, exercice de transfert, quiz, erreurs fréquentes, point de décision et fiche réflexe.
- 1 dossier projet en 6 étapes, avec sauvegarde locale, export JSON, impression et auto-évaluation.
- 5 pages IA : introduction, usages, méthodes, outils et gouvernance.
- 21 routes publiques, recherche globale avec synonymes, glossaire étendu, bibliothèque de ressources, fiches outils, journal de projet et modèles imprimables.
- Deux parcours futurs sont cadrés dans le backlog : Produit et Cybersécurité. Ils ne sont pas encore implémentés.

## Démarrage

Prérequis : Node.js 22.22.2 ou plus récent, npm.

```bash
npm ci
npm run dev
```

Le serveur de développement Vite affiche l’application avec le préfixe `/gestion-projet-it/`.

## Commandes

| Commande | Usage |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production dans `dist/` |
| `npm run preview` | Prévisualisation du build sur le port 4173 |
| `npm test` | Tests Vitest |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run check:liens` | Liens documentaires et cohérence routes/sitemap |
| `npm run smoke` | Smoke Playwright, après un preview |

Le smoke utilise le build et un serveur de prévisualisation. Pour un port différent :

```bash
MSYS_NO_PATHCONV=1 npx vite preview --host 127.0.0.1 --base=/gestion-projet-it/ --port 4182 --strictPort
SMOKE_BASE_URL=http://127.0.0.1:4182/gestion-projet-it npm run smoke
```

## Routes

| Route | Contenu |
| --- | --- |
| `/` | Accueil et fil rouge |
| `/module-1` à `/module-9` | Les neuf modules |
| `/dossier-projet` | Dossier projet guidé |
| `/ia` | Introduction à l’IA |
| `/ia/usages` | Usages par phase |
| `/ia/methodes` | Méthodes et évaluation |
| `/ia/outils-configuration` | Outils et configuration |
| `/ia/gouvernance` | Gouvernance et risques |
| `/glossaire` | Glossaire |
| `/ressources` | Bibliothèque de ressources officielles |
| `/outils` | Fiches outils et grille de comparaison |
| `/modeles` | Journal de projet, revue par les pairs et modèles imprimables |
| `/a-propos` | Paternité, licence et confidentialité |

## Architecture

```text
src/
  components/       composants partagés et capstone
  ia/               registre, gabarit et contenu IA
  labos/            laboratoires SVG interactifs
  lib/              progression, recherche, glossaire, stockage
  modules/          contenu des neuf modules
  routes/           pages de l’application
  styles/           styles globaux et styles dédiés
public/
  manifest, service worker, sitemap, offline
docs/
  specs et plans des cycles
smoke/              parcours Playwright
tests/              tests unitaires et de composants
```

Le routeur utilise `basename="/gestion-projet-it/"`. Le build utilise `--base=/gestion-projet-it/`.

## Données et confidentialité

- Aucun compte, aucun cookie, aucun analytics.
- Progression dans `localStorage` avec le préfixe `gestion-projet-it:`.
- Dossier projet dans `gestion-projet-it:dossier-projet:v1`.
- Journal et modèles dans `gestion-projet-it:journal:v1`.
- Export JSON côté navigateur.
- Aucune ressource distante, fonte distante, image distante ou requête réseau au chargement.
- Les liens de sources externes ne s’ouvrent qu’après une action de l’utilisateur.

## Qualité

Avant une publication :

1. `npm test`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run check:liens`
5. `npm run build`
6. smoke Playwright
7. Lighthouse mobile sur l’accueil et les pages de référence

Le budget Lighthouse et la procédure de contrôle sont documentés dans [`docs/qualite/lighthouse.md`](docs/qualite/lighthouse.md). Le périmètre du contrôle des liens est décrit dans [`docs/qualite/liens.md`](docs/qualite/liens.md).

La CI GitHub Actions exécute l’audit npm, lint, typecheck, contrôle des liens, tests et build sur `main` et sur les pull requests. Dependabot propose les mises à jour npm et GitHub Actions une fois par semaine.

## Contribution

Dépôt source : `https://github.com/Hylst/gestion-projet-it`, privé.

Le contrôle de branche GitHub n’est pas disponible sur l’offre gratuite pour un dépôt privé. La convention du projet reste :

1. créer une branche ;
2. ouvrir une pull request ;
3. attendre la CI verte ;
4. fusionner manuellement.

Ne jamais committer de secret, de clé, de jeton, `node_modules/`, `dist/`, `test-results/` ou `playwright-report/`.

## Documentation

- [BACKLOG.md](BACKLOG.md) : priorités et prochains lots.
- [CHANGELOG.md](CHANGELOG.md) : état publié et vérifications.
- [docs/README.md](docs/README.md) : index des specs et plans.
- [docs/sources.md](docs/sources.md) : politique de sources et de veille.
- [cahier_des_charges.md](cahier_des_charges.md) : vision et contraintes durables.
- [agents.md](agents.md) : règles de collaboration et conventions techniques.

## Licence

AGPL-3.0-or-later. Réalisé par Geoffroy avec assistance IA.

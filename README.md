# Gestion de Projet IT

Cours interactif en français pour apprendre à conduire un projet informatique : cadrage, planification, méthodes, outils, équipe, parties prenantes, budget, changement, dossier projet et usages de l’IA.

Application 100 % front, sans compte, sans cookie, sans backend et sans requête externe au chargement. La progression reste dans le navigateur.

## État actuel

- 9 modules avec fiche, démarche, laboratoire interactif, exercice corrigé, exercice de transfert, quiz, erreurs fréquentes, point de décision et fiche réflexe.
- 1 dossier projet en 6 étapes, avec sauvegarde locale, export JSON, impression et auto-évaluation.
- 5 pages IA : introduction, usages, méthodes, outils et gouvernance.
- 31 routes publiques, recherche globale avec synonymes, glossaire étendu, bibliothèque de ressources, fiches outils, journal de projet, modèles imprimables et pages légales.
- Design éditorial coloré : thèmes par module, cartes de section, sommaire sticky et contenus secondaires dépliables.
- Le parcours Cybersécurité est ouvert avec un hub et cinq pages. Le parcours Produit reste cadré dans le backlog.
- 3 laboratoires cyber intégrés : modèle de menace, matrice d’accès et chronologie d’incident, sans XP.

## Démarrage

Prérequis : Node.js 22.22.2 LTS, 24.15 ou plus, ou 26 ou plus, npm.

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
| `npm run images` | Régénère l’image de partage et les icônes PNG |
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
| `/cybersecurite` | Introduction à la cybersécurité |
| `/cybersecurite/menaces` | Menaces et modèle de menace |
| `/cybersecurite/acces` | Accès, rôles et secrets |
| `/cybersecurite/dependances` | Dépendances, fournisseurs et chaîne logicielle |
| `/cybersecurite/donnees` | Données, RGPD et AI Act |
| `/cybersecurite/incident` | Incident, sauvegarde et reprise |
| `/glossaire` | Glossaire |
| `/ressources` | Bibliothèque de ressources officielles |
| `/outils` | Fiches outils et grille de comparaison |
| `/modeles` | Journal de projet, revue par les pairs et modèles imprimables |
| `/a-propos` | Paternité, licence et confidentialité |
| `/mentions-legales` | Éditeur, hébergeur, source et licence |
| `/confidentialite` | Données, journaux, cookies et droits RGPD |
| `/transparence-ia` | Assistance IA, illustrations et AI Act |
| `/accessibilite` | Démarche WCAG 2.2 AA et contact |

## Architecture

```text
src/
  components/       composants partagés et capstone
  ia/               registre, gabarit et contenu IA
  cyber/            registre, gabarit et contenu Cybersécurité
  labos/            laboratoires SVG interactifs
  lib/              progression, recherche, glossaire, stockage
  modules/          contenu des neuf modules
  routes/           pages de l’application
  styles/           styles globaux et styles dédiés
public/
  manifest, service worker, sitemap, offline
docs/
  specs, plans, conformité et qualité
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
- Les journaux Nginx, les emails et les droits RGPD sont détaillés dans [`docs/conformite/registre-traitements.md`](docs/conformite/registre-traitements.md) et sur `/confidentialite`.
- Aucune IA n’est exécutée au chargement ; l’assistance IA porte sur la création du code, des textes et des illustrations.

## Qualité

Avant une publication :

1. `npm test`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run check:liens`
5. `npm run build`
6. smoke Playwright
7. Lighthouse mobile sur l’accueil et les pages de référence

Le dernier audit sécurité et CVE est documenté dans [`docs/securite/audit-2026-10-30.md`](docs/securite/audit-2026-10-30.md). Le budget Lighthouse et la procédure de contrôle sont documentés dans [`docs/qualite/lighthouse.md`](docs/qualite/lighthouse.md). Le périmètre du contrôle des liens est décrit dans [`docs/qualite/liens.md`](docs/qualite/liens.md). La checklist de partage est dans [`docs/qualite/partage.md`](docs/qualite/partage.md).

La CI GitHub Actions exécute l’audit npm, lint, typecheck, contrôle des liens, tests et build sur `main` et sur les pull requests. Dependabot propose les mises à jour npm et GitHub Actions une fois par semaine.

## Contribution

Dépôt source public : `https://github.com/Hylst/gestion-projet-it`.

La convention du projet reste :

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
- [ARCHITECTURE.md](ARCHITECTURE.md) : stack, routes, données locales et déploiement.
- [CREDITS.md](CREDITS.md) : auteur, assistance IA et provenance des illustrations.
- [SECURITY.md](SECURITY.md) : signalement et règles de sécurité.
- [Audit sécurité et CVE](docs/securite/audit-2026-10-30.md) : dépendances, code, build et en-têtes de production.
- [CONTRIBUTING.md](CONTRIBUTING.md) : contribution, licence et vérifications.
- [docs/conformite/](docs/conformite/) : RGPD, AI Act, transferts UK et provenance.

## Licence

AGPL-3.0-or-later. Réalisé par Geoffroy Streit avec assistance IA. Le code et les textes sont documentés dans le dépôt public. Les illustrations sont générées par IA en local et décrites dans `CREDITS.md`.

Hébergement : Hostinger International Limited, serveur au Royaume-Uni, Coolify et Nginx statique.

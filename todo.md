# Todo

État au 6 novembre 2026. Ce fichier centralise l’audit, les quick wins
traités et les lots de fond. Les identifiants `F-*` renvoient à
`features.md`.

## Légende

- **P0** : risque de dysfonctionnement, de perte de données ou
  d’incohérence publique.
- **P1** : amélioration à fort effet, à planifier dans le prochain cycle.
- **P2** : confort ou consolidation, sans urgence.
- **P3** : idée à garder, sans engagement.
- Statuts : `fait`, `à faire`, `à valider`, `écarté`.

## 1. Quick wins traités dans ce lot

| ID | Action | Statut |
| --- | --- | --- |
| QW-01 | Créer `structure.md`, `features.md` et `todo.md` | fait |
| QW-02 | Mettre à jour `agents.md`, `README.md`, `CHANGELOG.md` et `ARCHITECTURE.md` | fait |
| QW-03 | Afficher l’alias Hylst dans le footer, la page À propos, les mentions légales, la transparence IA, les crédits, `package.json` et `index.html` | fait |
| QW-04 | Compléter les métadonnées sociales : `og:site_name`, `og:locale`, dimensions, type et texte alternatif de l’image | fait |
| QW-05 | Ajouter le sitemap du module dans `robots.txt` | fait |
| QW-06 | Rafraîchir l’image de partage et ajouter un favicon PNG de repli | fait |
| QW-07 | Enrichir le manifeste PWA : description, catégories, raccourcis | fait |
| QW-08 | Rendre l’import de progression explicite : bouton, fichier, message d’état et remise à zéro du champ | fait |
| QW-09 | Annoncer le contenu de chaque écran de la visite aux lecteurs d’écran | fait |
| QW-10 | Ajouter un test qui interdit tout appel d’API externe dans `src` | fait |
| QW-11 | Corriger le compteur du hero : 16 laboratoires, pas 11 | fait |
| QW-12 | Corriger la documentation obsolète : 25 routes, 15 tests smoke, 292 kB, version 1.4.0 | fait |
| QW-13 | Compléter `.gitignore` : environnements, couverture, caches, fichiers système | fait |
| QW-14 | Vérifier tests, lint, typecheck, liens, build, smoke et Lighthouse | fait |

## 2. Écarts et incohérences trouvés

| ID | Constat | Gravité | Traitement |
| --- | --- | --- | --- |
| AUD-01 | `agents.md` annonçait 25 routes et un parcours Cybersécurité non implémenté | P0 | Corrigé |
| AUD-02 | `ARCHITECTURE.md` omettait les six routes cyber et deux clés locales | P0 | Corrigé |
| AUD-03 | `docs/qualite/partage.md` citait 25 routes, 15 tests smoke et 292 kB | P1 | Corrigé |
| AUD-04 | `docs/qualite/liens.md` citait 21 routes et 58 liens | P1 | Corrigé |
| AUD-05 | La page Transparence IA et deux documents de conformité citaient la version 1.4.0 | P1 | Corrigé |
| AUD-06 | L’alias Hylst était absent des crédits et des pages publiques | P1 | Corrigé |
| AUD-07 | Le hero annonçait 11 laboratoires alors que le dépôt en contient 16 | P1 | Corrigé |
| AUD-08 | `robots.txt` ne déclarait que le sitemap racine | P2 | Corrigé |
| AUD-09 | Les métadonnées sociales mises à jour par React perdaient le nom du site et les dimensions de l’image | P2 | Corrigé |
| AUD-10 | L’import de progression échouait sans message et laissait le champ sélectionné | P1 | Corrigé |
| AUD-11 | Le changement d’écran de la visite n’était pas annoncé, seul le numéro l’était | P2 | Corrigé |
| AUD-12 | Aucun test ne verrouillait l’absence d’API externe | P1 | Corrigé |
| AUD-13 | `.gitignore` ne couvrait pas les fichiers d’environnement, la couverture ni les caches | P2 | Corrigé |
| AUD-14 | `docs/README.md` ne référençait pas les nouveaux documents racine | P2 | Corrigé |
| AUD-15 | Le manifeste PWA n’avait ni description, ni catégories, ni raccourcis | P3 | Corrigé |
| AUD-16 | Aucune image de partage dédiée par parcours | P2 | Reporté, F-23 |

### Références Google et AI Studio

- Aucune référence à AI Studio n’a été trouvée.
- Les mentions de Google sont factuelles : Gmail dans la confidentialité,
  Google Vertex AI dans la comparaison d’outils, Search Console dans les
  documents de conformité.
- Elles sont conservées : les remplacer par Hylst fausserait le contenu.
- Aucun appel à une API Google n’est présent dans l’application.

### Absence d’API externe

- Aucun `fetch`, `XMLHttpRequest`, `axios`, `WebSocket` ou `EventSource`
  dans `src`.
- Le seul `fetch` est celui de `public/sw.js`, limité aux URL du module et
  au cache same-origin.
- Le test `tests/aucune-api-externe.test.ts` verrouille cette règle.

## 3. Lots de fond

### P1 : prochain cycle

| ID | Action | Référence | Statut |
| --- | --- | --- | --- |
| LOT-01 | Ouvrir le parcours Produit, hub et cinq pages | F-01 | à faire |
| LOT-02 | Ajouter trois laboratoires Produit | F-02 | à faire |
| LOT-03 | Ajouter un aperçu et une confirmation avant remplacement de la progression importée | F-12 | à faire |
| LOT-04 | Ajouter un test axe-core sur les routes principales | F-17 | à faire |
| LOT-05 | Ajouter les tests Playwright d’import, d’export et de persistance | F-18 | à faire |
| LOT-06 | Créer les images sociales par parcours | F-23 | à faire |
| LOT-07 | Ajouter un fil d’Ariane et les microdonnées `BreadcrumbList` | F-24 | à faire |
| LOT-08 | Précacher le shell et les routes principales hors ligne | F-31 | à faire |
| LOT-09 | Versionner un budget de bundle et le contrôler en CI | F-35 | à faire |
| LOT-10 | Ajouter un bouton « Continuer où j’en étais » | F-10 | à faire |

### P2 : consolidation

| ID | Action | Référence | Statut |
| --- | --- | --- | --- |
| LOT-11 | Étude de cas longue avec documents datés | F-03 | à faire |
| LOT-12 | Fiches de révision imprimables par module | F-04 | à faire |
| LOT-13 | Parcours de révision en sept jours | F-05 | à faire |
| LOT-14 | Banque de questions supplémentaire et tirage local | F-06 | à faire |
| LOT-15 | Notes personnelles par module | F-07 | à faire |
| LOT-16 | Liens croisés du glossaire vers les sections | F-08 | à faire |
| LOT-17 | Tableau de bord de progression | F-11 | à faire |
| LOT-18 | Export horodaté et réinitialisation sélective | F-13, F-14 | à faire |
| LOT-19 | Marque-pages locaux | F-15 | à faire |
| LOT-20 | Impression « dossier complet » | F-16 | à faire |
| LOT-21 | Microdonnées `Course` et `LearningResource` sans script inline | F-25 | à faire |
| LOT-22 | `lastmod` par URL dans le sitemap | F-26 | à faire |
| LOT-23 | Vérifications Search Console et Bing par balise meta | F-28 | à valider |
| LOT-24 | Raccourcis PWA déjà ajoutés, à contrôler sur mobile | F-29 | fait |
| LOT-25 | Page de mise à jour du service worker | F-32 | à faire |
| LOT-26 | Test du fallback SPA Nginx | F-33 | à faire |
| LOT-27 | Script de vérification des empreintes du build Docker | F-34 | à faire |
| LOT-28 | Fichier Nginx de référence dans le dépôt | F-36 | à faire |
| LOT-29 | `security.txt` à la racine du domaine | F-37 | à faire |
| LOT-30 | Page « Nouveautés » alimentée par le changelog | F-22 | à faire |

### P3 : idées sans engagement

| ID | Action | Référence | Statut |
| --- | --- | --- | --- |
| LOT-31 | Page de recherche interne indexable | F-27 | à valider |
| LOT-32 | Variante sombre de l’image de partage | F-30 | à valider |
| LOT-33 | Schéma Mermaid des données locales | F-39 | à faire |
| LOT-34 | Journal des décisions éditoriales | F-40 | à faire |
| LOT-35 | Citations de sources dans le fil de lecture | F-09 | à valider |

## 4. Décisions ouvertes

1. **Ordre de fusion** : #26, #27, #28 et #32 fusionnées sur main (4156790), puis PR d’audit #33 (76cf64a) et PR de publication #34 (4514f93).
2. **Version** : `1.6.0` publiée le 6 novembre 2026 (PR #34), puis `1.6.1` pour le correctif de reflow et les mises à jour de dépendances.
3. **JSON-LD** : la CSP `script-src 'self'` interdit le script inline.
   Privilégier les microdonnées HTML ou une politique de hachage explicite.
4. **Références Google** : conserver Gmail, Vertex AI et Search Console
   lorsqu’elles sont factuelles.
5. **Alias** : afficher « Geoffroy Streit (Hylst) » dans les crédits et les
   pages publiques, sans remplacer le nom légal.
6. **Docker** : ne pas committer ni pousser le dépôt de déploiement tant
   que les autres lots en cours n’ont pas été démêlés.

## 5. Vérifications de sortie

- [x] Tests unitaires et composants.
- [x] ESLint.
- [x] TypeScript strict.
- [x] Liens Markdown, routes et sitemap.
- [x] Build statique.
- [x] Smoke Playwright sur les 31 routes.
- [x] Lighthouse mobile sur l’accueil.
- [x] Absence d’API externe dans `src`.
- [x] Copie du build dans `Docker/gestion-projet-it/` avec empreintes
      identiques : 54 fichiers, SHA-256 concordants.
- [x] Smoke Playwright 17/17 sur la copie Docker servie avec fallback SPA.
- [x] Commit local du lot source.
- [x] Fusion des pull requests empilées (#26, #27, #28, #32), main à 4156790.
- [x] Fusion de la PR d’audit #33, main à 76cf64a, CI verte.
- [x] Fusion de la PR de publication #34, main à 4514f93, CI verte.
- [x] Publication Coolify le 6 novembre 2026 depuis `4514f93` : commit plateforme `e6875a52`, 54 fichiers, assets 200, ancien `index-CSOg-N2L.js` en 404.
- [x] Service worker v13 servi en `no-cache`, HTML en `no-cache`, assets hashés en `immutable`.
- [x] En-têtes de production conformes : CSP stricte (`style-src 'unsafe-inline'`), HSTS, `nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`.
- [x] Smoke Playwright 17/17 sur `https://hylst.fr/gestion-projet-it`.
- [x] Lighthouse production : accueil 98/100/100/100, `/module-1` 99/100/100/100.
- [x] Zéro requête externe, zéro erreur console, zéro requête échouée en production.
- [x] Sitemap du module en ligne, 31 URL ; sitemap racine à jour avec `lastmod 2026-11-06` ; `robots.txt` référence les deux sitemaps.
- [x] Correctif de reflow de l’accueil (`overflow-x: clip` sur `html` et `body`), test smoke dédié à 320 px, suite à 18/18.
- [x] Publication 1.6.1 et contrôles de production (assets 200, ancien 1.6.0 404, sw v14, smoke 18/18, Lighthouse 98/100/100/100).
- [x] Navigation clavier vérifiée sans focus trap et reflow 320 px sans débordement horizontal.
- [x] Image sociale 1200 x 630 px et métadonnées Open Graph / Twitter Card validées.
- [x] Installabilité PWA validée par CDP (0 erreur, service worker v14 actif).
- [x] Refonte pédagogique : introductions de module (`ModuleIntro`), chapeaux de section, fil conducteur (`ModulePager`), sommaires complets.
- [x] Infobulles accessibles (`Terme`) pour tous les acronymes et termes techniques, incluant les bases informatiques (dépôt, serveur, API, navigateur).
- [x] Suite smoke Playwright portée à 19/19 avec test de l’infobulle, de la continuité et du reflow.
- [ ] Soumission Search Console confirmée par Geoffroy.

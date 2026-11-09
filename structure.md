# Structure du projet

Document de lecture du dépôt source. Il décrit l’organisation réelle au
9 novembre 2026, sans remplacer le cahier des charges ni `ARCHITECTURE.md`.

## 1. Vue d’ensemble

Gestion de Projet IT est une SPA React construite par Vite. Le build est
entièrement statique : aucun serveur applicatif, aucune base de données,
aucun compte, aucun cookie et aucun appel réseau au chargement.

Le routeur utilise `basename="/gestion-projet-it/"`. Le build utilise
`--base=/gestion-projet-it/`. Le déploiement cible est un conteneur Nginx
statique géré par Coolify, avec un fallback SPA vers `index.html`.

## 2. Arborescence

```text
gestion-projet-it/
  index.html                  gabarit HTML, métadonnées sociales statiques
  package.json                scripts, dépendances, auteur, licence
  vite.config.ts              configuration Vite et Vitest
  tsconfig.json               TypeScript strict
  eslint.config.js            règles ESLint
  playwright.config.ts        smoke Playwright
  public/                     fichiers copiés tels quels dans le build
    favicon.svg               icône d’onglet vectorielle
    favicon-32.png            repli PNG pour les navigateurs sans SVG
    icon-192.svg / .png       icône PWA
    icon-512.svg / .png       icône PWA et maskable
    apple-touch-icon.png      icône iOS
    og-image.svg / .png       image de partage 1200 x 630
    manifest.webmanifest      manifeste PWA
    robots.txt                autorisation et sitemaps
    sitemap.xml               31 URL publiques
    offline.html              page hors ligne, en noindex
    sw.js                     service worker same-origin
    LICENSE.txt               licence AGPL publiée
  src/
    main.tsx                  point d’entrée, provider de progression, SW
    App.tsx                   routeur et découpage différé des pages
    components/               composants partagés (ParcoursIntro, Terme, ModuleIntro, ModulePager, Layouts)
      capstone/               étapes du dossier projet
    modules/                  contenu des neuf modules
    ia/                       registre, gabarit et cinq pages IA
    cyber/                    registre, gabarit et six pages Cybersécurité
    labos/                    16 laboratoires SVG interactifs
    lib/                      logique locale et données transverses
    routes/                   pages autonomes et pages légales
    styles/                   styles globaux, éditoriaux et dédiés
  scripts/
    check-liens.mjs           liens Markdown, routes et sitemap
    generer-images.mjs        rendu local des PNG sociaux et des icônes
  smoke/                      parcours Playwright
  tests/                      tests Vitest et Testing Library
  docs/                       specs, plans, conformité, qualité, sécurité
  dist/                       build local, non versionné
```

## 3. Routes publiques

| Route | Fichier principal | Rôle |
| --- | --- | --- |
| `/` | `src/routes/accueil.tsx` | Accueil, hero, visite, entrées des parcours |
| `/module-1` à `/module-9` | `src/modules/m*/index.tsx` | Neuf modules pédagogiques |
| `/dossier-projet` | `src/routes/DossierProjet.tsx` | Dossier projet en six étapes |
| `/ia` | `src/ia/content/Hub.tsx` | Hub de la section IA |
| `/ia/usages` | `src/ia/content/Usages.tsx` | Usages par phase |
| `/ia/methodes` | `src/ia/content/Methodes.tsx` | Méthodes et évaluation |
| `/ia/outils-configuration` | `src/ia/content/OutilsConfiguration.tsx` | Outils et configuration |
| `/ia/gouvernance` | `src/ia/content/Gouvernance.tsx` | Gouvernance et risques |
| `/cybersecurite` | `src/cyber/content/Hub.tsx` | Hub Cybersécurité |
| `/cybersecurite/menaces` | `src/cyber/content/Menaces.tsx` | Menaces et modèle de menace |
| `/cybersecurite/acces` | `src/cyber/content/Acces.tsx` | Accès, rôles et secrets |
| `/cybersecurite/dependances` | `src/cyber/content/Dependances.tsx` | Dépendances et fournisseurs |
| `/cybersecurite/donnees` | `src/cyber/content/Donnees.tsx` | Données, RGPD et AI Act |
| `/cybersecurite/incident` | `src/cyber/content/Incident.tsx` | Incident, sauvegarde et reprise |
| `/glossaire` | `src/routes/Glossaire.tsx` | Glossaire et recherche |
| `/ressources` | `src/routes/Ressources.tsx` | Bibliothèque de sources |
| `/outils` | `src/routes/Outils.tsx` | Fiches outils et comparaison |
| `/modeles` | `src/routes/Modeles.tsx` | Journal, revue et modèles |
| `/a-propos` | `src/routes/Apropos.tsx` | Paternité, licence, données |
| `/mentions-legales` | `src/routes/MentionsLegales.tsx` | Éditeur et hébergement |
| `/confidentialite` | `src/routes/Confidentialite.tsx` | Données, journaux et droits |
| `/transparence-ia` | `src/routes/TransparenceIA.tsx` | Assistance IA et AI Act |
| `/accessibilite` | `src/routes/Accessibilite.tsx` | Démarche WCAG 2.2 AA |
| `*` | `src/routes/NotFound.tsx` | Page introuvable en `noindex` |

Toutes les pages sauf l’accueil sont chargées en différé. Un fallback
accessible est affiché pendant le chargement. Chaque page de contenu
appelle `SeoHead` pour le titre, la description, le canonical et les
métadonnées sociales.

## 4. Anatomie d’un module

Un module suit toujours le même contrat de composition :

```text
index.tsx        assemblage du module et métadonnées
fiche.tsx        fiche de synthèse
filRouge.tsx     application au cas fictif
demarche.tsx     démarche pas à pas
exercise.tsx     exercice corrigé et exercice de transfert
quiz.ts          questions et corrigés
guide.ts         repères de lecture
ficheReflexe.ts  points de contrôle
```

`ModuleLayout` porte l’en-tête, le sommaire, la navigation interne et le
`SeoHead`. `ModuleEnd` clôt le parcours et propose la suite. Les
laboratoires sont importés par `index.tsx` depuis `src/labos/`.

## 5. Sections IA et Cybersécurité

Les deux parcours suivent un modèle identique :

```text
pages.ts       registre des routes, titres, résumés et sources
sources.ts     références documentaires datées
XxxLayout.tsx  gabarit, sommaire, navigation et SEO
content/       une page par route
```

Ils sont autonomes : aucun XP, aucun compteur de modules, aucune
obligation de parcours. Leurs laboratoires sont intégrés aux pages et ne
créent pas de route supplémentaire.

`ParcoursIntro` ouvre chaque page des deux parcours avec la raison de la
page, trois objectifs, le rappel du fil rouge et le temps estimé. Le
glossaire est indexé par la recherche globale, avec une ancre stable par
terme et un classement des correspondances exactes avant les modules.

## 6. Données locales

Toutes les clés commencent par `gestion-projet-it:` et restent dans le
navigateur :

| Clé | Contenu | Écriture |
| --- | --- | --- |
| `gestion-projet-it:xp` | XP, quiz, laboratoires et modules terminés | `src/lib/xp.ts` |
| `gestion-projet-it:quiz:done:*` | Quiz validé par identifiant | `src/lib/storage.ts` |
| `gestion-projet-it:laboratoire:done:*` | Laboratoire validé | `src/lib/storage.ts` |
| `gestion-projet-it:module:done:*` | Module terminé | `src/lib/storage.ts` |
| `gestion-projet-it:dossier-projet:v1` | Dossier projet | `src/lib/capstoneStorage.ts` |
| `gestion-projet-it:journal:v1` | Journal et revue par les pairs | `src/lib/journal.ts` |
| `gestion-projet-it:onboarding:v1` | Drapeau de première visite | `src/lib/onboarding.ts` |
| `gestion-projet-it:probe` | Test de disponibilité, supprimé aussitôt | `src/lib/storage.ts` |

L’export JSON est produit par le navigateur. L’import est validé avant
d’être appliqué. Aucune donnée n’est envoyée à un serveur.

## 7. Dépendances

Dépendances d’exécution, volontairement limitées :

- `react`, `react-dom` : interface.
- `react-router-dom` : routage côté client.

Dépendances de développement : Vite, TypeScript, ESLint, Vitest, jsdom,
Testing Library et Playwright. Aucune bibliothèque d’icônes, de styles,
d’analytics ou de requêtes HTTP n’est utilisée.

Le service worker `public/sw.js` est le seul code qui appelle `fetch`.
Il ne traite que les URL sous `/gestion-projet-it/` et sert le cache
same-origin. Le test `tests/aucune-api-externe.test.ts` verrouille cette
règle.

## 8. Chaîne de vérification

```text
npm test            tests unitaires et composants
npm run lint        ESLint
npm run typecheck   TypeScript strict
npm run check:liens liens Markdown, routes et sitemap
npm run build       build de production
npm run smoke       parcours Playwright sur le preview
```

Le contrôle des images est local : `npm run images` rend les PNG depuis
les SVG avec Chromium, sans service externe.

## 9. Build et déploiement

1. `npm ci`
2. `npm test`, `npm run lint`, `npm run typecheck`, `npm run check:liens`
3. `npm run build`
4. `npm run smoke` sur un preview
5. Lighthouse mobile sur l’accueil et deux pages de référence
6. copie de `dist/` vers `Docker/gestion-projet-it/`
7. vérification des empreintes SHA-256 entre `dist/` et la copie Docker
8. déploiement Coolify, puis contrôle des en-têtes et du fallback SPA

Extrait Nginx attendu :

```nginx
location /gestion-projet-it/ {
    try_files $uri $uri/ /gestion-projet-it/index.html;
}
```

Le service worker doit être servi avec `Cache-Control: no-cache` pour que
les mises à jour de version soient prises en compte.

## 10. Documentation

- `README.md` : entrée opérationnelle.
- `agents.md` : règles de travail des agents.
- `structure.md` : ce document.
- `features.md` : inventaire et propositions de fonctionnalités.
- `todo.md` : quick wins, lots de fond et décisions ouvertes.
- `ARCHITECTURE.md` : vue technique courte.
- `CHANGELOG.md` : état vérifié.
- `docs/` : specs, plans, conformité, accessibilité, qualité et sécurité.

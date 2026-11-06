# agents.md - Gestion de Projet IT (instructions pour les agents dev)

Fichier d’instructions du projet source. Priorité : cahier des charges,
puis ce fichier, puis les conventions du dépôt de déploiement.

## Projet

- Nom : Gestion de Projet IT. Source : ce dossier
  (`D:\0CODE\OpenCode\gestion-projet-it`). Build déposé dans
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/`.
- Dépôt source public : `https://github.com/Hylst/gestion-projet-it`.
- Stack : Vite + React + TypeScript, SPA, 100 % front, sans compte,
  sans cookie, sans backend. Progression en `localStorage`
  (clés `gestion-projet-it:*`), export et import JSON.
- État livré : 9 modules avec erreurs fréquentes, points de décision et
  exercices de transfert, dossier projet en 6 étapes, section IA en
  5 pages, parcours Cybersécurité en 6 routes, 16 laboratoires, recherche
  globale, glossaire, ressources, fiches outils, journal, modèles
  imprimables et pages légales. Total : 31 routes publiques.
- Le parcours Produit reste cadré dans le backlog, pas encore implémenté.
- Licence AGPL-3.0-or-later. Paternité : réalisé par Geoffroy Streit,
  alias Hylst, avec assistance IA. Illustrations générées par IA en local
  (mentions : footer, page À propos, `CREDITS.md` et page Transparence IA).

## Documentation

- `README.md` : entrée opérationnelle, commandes, routes, tests, CI et
  déploiement Coolify.
- `structure.md` : arborescence, routes, données locales, dépendances et
  chaîne de vérification.
- `features.md` : inventaire des fonctionnalités et propositions classées.
- `todo.md` : quick wins, écarts corrigés, lots de fond et décisions
  ouvertes.
- `BACKLOG.md` : priorités historiques et prochains lots.
- `docs/README.md` : index des specs, plans, audits et conformité.
- `cahier_des_charges.md` : vision et contraintes durables.
- `ARCHITECTURE.md` : vue technique courte.
- `CHANGELOG.md` : état publié et vérifications.
- Toute nouvelle décision de conception va dans une spec datée.
- Toute publication met à jour le changelog et les dates de sources.

## Sources et ressources

- La politique applicable est `docs/sources.md`.
- Chaque ressource porte un organisme identifiable, un titre, une URL
  stable, une date ou une version, un usage, une limite et une date de
  vérification.
- Les données publiques sont dans `src/lib/ressources.ts` et la page
  `/ressources`.
- Vérification initiale : 24 ressources, 24 URL en réponse 200, le
  24 octobre 2026.
- Revue annuelle au minimum, ou avant en cas de changement de version ou
  d’URL.
- Aucun lien d’affiliation, aucun embed, aucun chargement automatique.

## Méthode (anti-dispersion)

- Un changement à la fois, finir avant d’enchaîner.
- Tout contenu suit la charte éditoriale du cahier des charges
  (méthodes décrites sans dogme, aucune école présentée comme supérieure,
  français sobre, aucun tiret cadratin dans les textes rédigés).
- Avant chaque dépôt vers Docker : smoke Playwright (routes 200 au clic
  et au rechargement, zéro requête en échec, zéro erreur console,
  zéro requête externe), Lighthouse accueil >= 90 (perf et a11y mobile).
- Les parcours Produit et Cybersécurité restent autonomes : aucun XP,
  compteur `0/9` inchangé, pas de dixième ou onzième module classique.
- Le parcours Cybersécurité est livré ; le parcours Produit reste au
  backlog.

## Git et GitHub

- Branche de travail, pull request, CI verte, fusion manuelle.
- Ordre de fusion en attente : #26, #27, #28, puis #32.
- La protection de branche GitHub n’est pas disponible sur l’offre
  gratuite pour un dépôt privé. La règle PR + CI reste obligatoire par
  convention.
- Ne jamais committer de secret, de clé ou de jeton.
- Ne pas committer `dist/`, `node_modules/`, `test-results/`,
  `playwright-report/`, `coverage/` ni `.superpowers/`.

## Commandes

```bash
npm ci
npm run dev
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
npm run images
npm run smoke
```

Le smoke nécessite un preview. Si le port 4173 est occupé, utiliser un
port dédié et `SMOKE_BASE_URL`.

## Conventions techniques

- Router : `basename="/gestion-projet-it/"`. Build :
  `--base=/gestion-projet-it/`.
- Canonical et `og:url` par route depuis `origin + pathname`, sans query
  ni fragment.
- Métadonnées sociales : `SeoHead` complète `index.html`. Conserver
  `og:site_name`, `og:locale`, les dimensions de l’image et son texte
  alternatif.
- Favicon : SVG principal, PNG 32 en repli. Icônes PWA et Apple Touch
  générées localement par `npm run images`.
- Aucun script inline ni handler inline (CSP `script-src 'self'`).
  Styles : classes ou `style-src 'unsafe-inline'` toléré.
- Autonomie des assets : fontes woff2 latin locales
  (`font-display: swap`), tableaux et graphiques en SVG inline
  (zéro image externe), aucun CDN, aucun tracker.
- PWA : manifest scope `/gestion-projet-it/`, icônes locales,
  `offline.html` en `noindex`, SW limité au dossier.
- Accessibilité : clavier complet, contrastes AA, `lang="fr"`, labels
  sur chaque champ, messages d’erreur explicites, annonces des
  changements d’écran.
- Les liens de ressources externes ne s’ouvrent qu’après action de
  l’utilisateur ; aucun chargement automatique.
- Aucun appel d’API externe ni d’IA au runtime. Le test
  `tests/aucune-api-externe.test.ts` verrouille cette règle.

## Interdictions

- Aucune donnée sortante (ni analytics, ni fontes, ni images externes).
- Aucun auteur fictif, aucun témoignage inventé, aucun chiffre sans
  source.
- Aucune certification ou équivalence de diplôme suggérée.
- Aucun conseil juridique ou comptable personnalisé.
- Aucune ressource chargée automatiquement, aucun embed, aucune API
  runtime.
- Ne pas remplacer une mention factuelle de Google (Gmail, Vertex AI,
  Search Console) par Hylst : cela fausserait le contenu.
- Ne pas toucher au dépôt Docker sauf pour déposer le build vérifié
  (+ carte hub + sitemap + catalogue ensemble, un seul push).

## Intégration plateforme

- Build déposé dans `Docker/gestion-projet-it/` après smoke et
  Lighthouse valides.
- Carte hub activée (Bloc 3, retirer gris et badge Bientôt ensemble).
- Sitemap racine et `robots.txt` mis à jour (URL du module ajoutée).
- Modal À venir mise à jour (retirer l’entrée si présente).
- Location Nginx via Coolify avec `try_files` SPA vers
  `/gestion-projet-it/index.html`.
- Le service worker doit être servi en `no-cache`.
- Soumission Search Console après mise en ligne (sitemap racine et
  sitemap du module).

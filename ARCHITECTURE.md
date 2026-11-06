# Architecture

## Vue d’ensemble

Gestion de Projet IT est une SPA React entièrement statique, construite
avec Vite et TypeScript. Aucun backend, compte, cookie, analytics ou appel
réseau au chargement.

## Pile technique

- React 19, React DOM 19, React Router 7.
- Vite 8 et plugin React 6.
- TypeScript strict, ESLint 10, Vitest 5 et jsdom.
- Playwright pour le smoke et le rendu local des images.
- PWA avec service worker et manifest locaux.

## Routes

- `/` : accueil.
- `/module-1` à `/module-9` : modules.
- `/dossier-projet` : dossier projet.
- `/ia` et quatre sous-pages : usages, méthodes, outils, gouvernance.
- `/cybersecurite` et cinq sous-pages : menaces, accès, dépendances,
  données, incident.
- `/glossaire`, `/ressources`, `/outils`, `/modeles`.
- `/a-propos`.
- `/mentions-legales`, `/confidentialite`, `/transparence-ia`,
  `/accessibilite`.
- `*` : page introuvable avec `noindex`.

Total : 31 routes publiques indexables. Les routes de contenu sont
chargées en différé sauf l’accueil. Un fallback accessible est affiché
pendant le chargement. Chaque page appelle `SeoHead` pour le titre, la
description, le canonical et les métadonnées sociales.

## Données locales

Les données restent dans le navigateur avec le préfixe
`gestion-projet-it:` :

- `xp`
- `quiz:done:*`
- `laboratoire:done:*`
- `module:done:*`
- `dossier-projet:v1`
- `journal:v1`
- `onboarding:v1`
- `probe`, clé technique temporaire de test de disponibilité.

Aucune donnée locale n’est transmise au serveur. L’export JSON est
produit localement et l’import est validé avant application.

## Build et déploiement

- Build : `npm run build`, base `/gestion-projet-it/`.
- Sortie : `dist/`, copiée dans `Docker/gestion-projet-it/`.
- Serveur : Nginx statique dans un conteneur Coolify, VPS Hostinger au
  Royaume-Uni.
- Fallback SPA :

```nginx
location /gestion-projet-it/ {
    try_files $uri $uri/ /gestion-projet-it/index.html;
}
```

- Le service worker est servi en `no-cache`.
- Les assets hashés sont mis en cache par le service worker à la demande.

## SEO et partage

- 31 URL dans `public/sitemap.xml`.
- `public/robots.txt` déclare le sitemap racine et le sitemap du module.
- Image de partage `og-image.png` en 1200 x 630, générée localement.
- Favicon SVG avec repli PNG 32, icônes PWA et Apple Touch.
- Métadonnées Open Graph et Twitter dans `index.html`, complétées par
  `SeoHead` à chaque navigation.
- Pas de JSON-LD inline : la CSP `script-src 'self'` l’interdit.
- Le manifeste PWA déclare description, catégories et raccourcis.

## Sécurité

- CSP `script-src 'self'`, aucun script inline.
- HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
  et `Permissions-Policy`.
- Aucun secret dans le dépôt.
- Aucun appel d’API externe dans `src`.
- Le seul `fetch` est celui de `public/sw.js`, limité aux URL du module
  et au cache same-origin.
- Les liens externes s’ouvrent après action et utilisent
  `rel="noopener noreferrer"`.
- Les fichiers `.md`, `.env` et les dotfiles sont bloqués par Nginx.

## Tests

- `npm test` : unités et composants.
- `npm run smoke` : routes, clavier, impression, hors ligne et absence de
  requête externe.
- `npm run check:liens` : liens relatifs, routes et sitemap.
- `npm run lint`, `npm run typecheck`, `npm run build`.
- `tests/aucune-api-externe.test.ts` : garde-fou contre les API externes.
- Lighthouse mobile avant publication.

## Documentation

- `structure.md` : arborescence et flux.
- `features.md` : inventaire et propositions.
- `todo.md` : quick wins et lots de fond.
- `agents.md` : règles de travail.
- `docs/` : specs, plans, conformité, accessibilité, qualité et sécurité.

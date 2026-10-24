# Architecture

## Vue d’ensemble

Gestion de Projet IT est une SPA React entièrement statique, construite avec Vite et TypeScript. Aucun backend, compte, cookie, analytics ou appel réseau au chargement.

## Pile technique

- React 19, React DOM 19, React Router 7.
- Vite 8 et plugin React 6.
- TypeScript strict, ESLint 10, Vitest 5 et jsdom.
- Playwright pour le smoke.
- PWA avec service worker et manifest locaux.

## Routes

- `/` : accueil.
- `/module-1` à `/module-9` : modules.
- `/dossier-projet` : dossier projet.
- `/ia` et quatre sous-pages.
- `/glossaire`, `/ressources`, `/outils`, `/modeles`.
- `/a-propos`.
- `/mentions-legales`, `/confidentialite`, `/transparence-ia`, `/accessibilite`.
- `*` : page introuvable avec `noindex`.

Les routes de contenu sont chargées en différé sauf l’accueil. Un fallback accessible est affiché pendant le chargement.

## Données locales

Les données restent dans le navigateur avec le préfixe `gestion-projet-it:` :

- `xp`
- `quiz:done:*`
- `laboratoire:done:*`
- `module:done:*`
- `dossier-projet:v1`
- `journal:v1`
- `probe`, clé technique temporaire de test de disponibilité.

Aucune donnée locale n’est transmise au serveur. L’export JSON est produit localement.

## Build et déploiement

- Build : `npm run build`, base `/gestion-projet-it/`.
- Sortie : `dist/`, copiée dans `Docker/gestion-projet-it/`.
- Serveur : Nginx statique dans un conteneur Coolify, VPS Hostinger au Royaume-Uni.
- Le fallback SPA est assuré par Nginx.
- Les assets hashés sont mis en cache par le service worker à la demande.

## Sécurité

- CSP `script-src 'self'`, aucun script inline.
- HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` et `Permissions-Policy`.
- Aucun secret dans le dépôt.
- Les liens externes s’ouvrent après action et utilisent `rel="noopener noreferrer"`.
- Les fichiers `.md`, `.env` et les dotfiles sont bloqués par Nginx.

## Tests

- `npm test` : unités et composants.
- `npm run smoke` : routes, clavier, impression, hors ligne et absence de requête externe.
- `npm run check:liens` : liens relatifs, routes et sitemap.
- `npm run lint`, `npm run typecheck`, `npm run build`.
- Lighthouse mobile avant publication.

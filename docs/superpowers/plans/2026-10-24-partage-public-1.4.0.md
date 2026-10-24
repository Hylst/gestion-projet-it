# Partage public et conformité 1.4.0

**Date :** 24 octobre 2026
**Statut :** plan approuvé, en exécution.
**Périmètre :** mise en conformité RGPD et AI Act, documentation de la source publique, partage social, installation PWA et performance.

## Objectif

Rendre le site partageable publiquement avec une source AGPL documentée, des mentions légales complètes, une transparence IA vérifiable, une carte sociale et un build initial plus léger.

## Décisions

- Dépôt source public : `https://github.com/Hylst/gestion-projet-it`.
- Auteur : Geoffroy Streit.
- Code et textes assistés par IA, relus et testés.
- Illustrations SVG générées avec un assistant IA local ; Z-Image-Turbo local documenté comme outil de création graphique, licence Apache 2.0.
- Aucune IA au runtime.
- Contact public : `geoffroy.streit@gmail.com`.
- Carte sociale par défaut pour toutes les routes.
- Emails de contact conservés 12 mois.
- Aucune adresse postale publiée ; validation LCEN à faire avant publication large.
- Hébergeur : Hostinger International Limited, Chypre ; serveur au Royaume-Uni, Manchester ; Coolify et Nginx.
- Logs Nginx : 6 mois, rotation mensuelle, six archives plus le mois courant.
- Transfert UE vers Royaume-Uni : décision d’adéquation renouvelée le 19 décembre 2025.

## Tâches

### 1. Source et licence

- Ajouter `LICENSE` avec le texte AGPL-3.0-or-later.
- Ajouter `public/LICENSE.txt` pour la licence servie avec le site.
- Ajouter les en-têtes SPDX aux fichiers source, tests, scripts et service worker.
- Renseigner `author`, `license`, `repository` et `homepage` dans `package.json`.
- Mettre à jour le README, retirer la mention de dépôt privé et documenter l’auteur, la source, la licence et l’IA.

### 2. Documentation et conformité

- Créer `ARCHITECTURE.md`, `SECURITY.md`, `CONTRIBUTING.md` et `CREDITS.md`.
- Créer `docs/conformite/registre-traitements.md`.
- Créer `docs/conformite/analyse-ai-act.md`.
- Créer `docs/conformite/transferts-royaume-uni.md`.
- Créer `docs/conformite/provenance-illustrations.md`.
- Créer `docs/conformite/checklist-rgpd.md`.

### 3. Pages légales publiques

- Ajouter `/mentions-legales`.
- Ajouter `/confidentialite`.
- Ajouter `/transparence-ia`.
- Ajouter `/accessibilite`.
- Ajouter les liens dans le footer et la page À propos.
- Mettre à jour le sitemap à 25 URL.

### 4. Partage social et PWA

- Ajouter les métadonnées statiques dans `index.html` : canonical, Open Graph, Twitter et auteur.
- Créer `public/og-image.png` en 1200 × 630.
- Corriger `canonicalUrl()` pour exclure query et fragment.
- Ajouter `icon-192.png`, `icon-512.png` et `apple-touch-icon.png`.
- Mettre à jour le manifest et les tests.

### 5. Performance

- Passer les routes en `React.lazy`, sauf l’accueil.
- Ajouter un fallback `Suspense` accessible.
- Vérifier la disparition de l’avertissement Vite de 500 kB.
- Documenter le budget dans `docs/qualite/partage.md`.

### 6. Intégration

- Mettre à jour `src/App.tsx`, `src/components/Footer.tsx`, `src/routes/Apropos.tsx`, `src/lib/search.ts`, `public/sitemap.xml` et `public/sw.js`.
- Passer le service worker en v10.
- Mettre à jour smoke, tests, `check:liens` et compteurs.
- Vérifier les 25 routes et les liens légaux.

### 7. Validation et publication

- `npm test`, lint, typecheck, `check:liens`, audit, build.
- Smoke 25 routes.
- Lighthouse accueil et `/modeles`.
- Vérification des en-têtes, métadonnées sociales, image OG, manifest et service worker.
- Publication 1.4.0, tag et resynchronisation Docker.
- Soumission Search Console et aperçu social après déploiement.

## Vérification

- 25 routes en 200 au clic et au rechargement.
- Aucune requête externe au chargement.
- Aucun cookie.
- Licence et crédits accessibles.
- Pages légales liées depuis chaque page.
- Aucun secret dans le dépôt public.
- Lighthouse performance et accessibilité au moins 90.

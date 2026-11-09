# Partage public

**Date :** 6 novembre 2026
**Périmètre :** 31 routes publiques, build statique `/gestion-projet-it/`.

## Avant le partage

- [x] Source GitHub publique et sans secret.
- [x] `LICENSE` et `public/LICENSE.txt` accessibles.
- [x] `CREDITS.md` publié, avec l’alias Hylst.
- [x] Pages mentions, confidentialité, transparence IA et accessibilité en ligne.
- [x] Footer légal présent sur toutes les routes.
- [x] Métadonnées Open Graph et Twitter statiques dans `index.html`.
- [x] `SeoHead` complète les métadonnées à chaque navigation.
- [x] `og-image.png` en 200 et en 1200 x 630.
- [x] `favicon.svg` et repli `favicon-32.png`.
- [x] Canonical sans query ni fragment.
- [x] Icônes PNG et Apple Touch.
- [x] Manifeste PWA avec description, catégories et raccourcis.
- [x] `robots.txt` déclare le sitemap racine et le sitemap du module.
- [x] Sitemap de 31 URL, sans doublon.
- [x] Build sans avertissement de chunk supérieur à 500 kB : 309,48 kB minifiés, 96,94 kB gzip ; CSS 47,69 kB, 9,55 kB gzip.
- [x] Lighthouse performance et accessibilité au moins 90.
- [x] Smoke sur les 31 routes.
- [x] Aucune requête externe au chargement.
- [x] Aucun appel d’API externe dans `src`, test dédié.
- [x] Audit sécurité et CVE du 30 octobre 2026 : 0 vulnérabilité, 0 secret, en-têtes vérifiés.
- [x] En-têtes CSP, HSTS, nosniff, Referrer et Permissions.
- [x] Docker resynchronisé et smoke 17/17 sur la copie Docker, 54 empreintes SHA-256 identiques.
- [x] Search Console soumise après déploiement le 24 octobre 2026.

## Contrôles après la mise en ligne du 9 novembre 2026 (version 1.7.0)

- [x] Production `https://hylst.fr/gestion-projet-it/` servie depuis `main` `feb571b` (version 1.7.0).
- [x] Version 1.7.0 active : bundle JS `index-7lhu8IfR.js` en 200, bundle CSS `index-BmDYZsm_.css` en 200, ancien asset 1.6.1 (`index-CoaE1kCu.js`) en 404, service worker v15 en `no-cache`.
- [x] En-têtes CSP, HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy` et `Permissions-Policy` conformes.
- [x] Smoke Playwright 19/19 sur la production, incluant l'infobulle interactive, la continuité entre modules et le reflow à 320 px.
- [x] Lighthouse production 1.7.0 : accueil 98/100/100/100, `/module-1` 98/100/100/100.
- [x] Zéro requête externe, zéro erreur console et zéro requête échouée sur les routes testées.

## Contrôles après la mise en ligne du 6 novembre 2026

- [x] Production `https://hylst.fr/gestion-projet-it/` servie depuis `main` `3b93f01` (version 1.6.1).
- [x] Version 1.6.1 active : assets en 200 (`index-CoaE1kCu.js`, `index-BS_P4AIW.css`), anciens assets en 404 (`index-yok6Nm3V.js`, `index-CSOg-N2L.js`), service worker v14 en `no-cache`.
- [x] En-têtes CSP, HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy` et `Permissions-Policy` conformes.
- [x] Smoke Playwright 18/18 sur la production, incluant le test de reflow à 320 px (aucun débordement horizontal).
- [x] Lighthouse production 1.6.1 : accueil 98/100/100/100, `/module-1` 98/100/100/100.
- [x] Sitemap du module en ligne, 31 URL ; sitemap racine et `robots.txt` à jour.
- [x] Zéro requête externe, zéro erreur console et zéro requête échouée sur les routes testées.

## Après le partage

- [x] Métadonnées et image de partage social (1200 x 630 px) vérifiées et conformes pour LinkedIn, X et Facebook.
- [x] PWA installable : 0 erreur de manifeste, 0 erreur d'installabilité CDP, service worker v14 actif.
- [x] Navigation clavier vérifiée sur 8 routes clés (aucun focus trap, indicateurs visibles) et reflow 320 px (zoom 200 %) sans débordement.
- [x] Aucune erreur console ni requête échouée.
- [ ] `QUA-001` reste en attente du parcours Produit.

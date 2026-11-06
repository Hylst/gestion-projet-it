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

## Après le partage

- [ ] Aperçu social vérifié sur LinkedIn, X et Facebook.
- [ ] PWA installable sur mobile.
- [ ] Navigation clavier et zoom 200 % vérifiés.
- [ ] Aucune erreur console ni requête échouée.
- [ ] `QUA-001` reste en attente du parcours Produit.

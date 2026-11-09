# Budget Lighthouse

**Date :** 24 octobre 2026
**Périmètre :** pages publiques du cours, contrôle mobile avant publication.

## 1. Seuils

| Catégorie | Seuil requis | Usage |
| --- | --- | --- |
| Performance | 90 | Bloquant |
| Accessibilité | 90 | Bloquant |
| Bonnes pratiques | 90 | À documenter en cas d’échec |
| SEO | 90 | À documenter en cas d’échec |

Le contrôle se fait en mode mobile, sur le build de production et sur un serveur local stable.

## 2. Pages de référence

- `/`
- `/module-1`
- `/ressources`
- `/outils`
- `/modeles`

Une page peut être ajoutée si elle introduit un composant lourd, une nouvelle route ou un changement de structure majeur.

## 3. Procédure

1. `npm ci`
2. `npm run build`
3. Lancer le preview sur un port dédié, par exemple 4182.
4. Lancer Lighthouse avec sortie JSON pour chaque page de référence.
5. Lire les scores depuis le JSON, y compris si le CLI retourne le code 1 lors du nettoyage Windows (`EPERM`).
6. Comparer au seuil et consigner la date, la page, les scores et les écarts.

```bash
npx lighthouse http://127.0.0.1:4182/gestion-projet-it/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless" --output=json --output-path=./.lh-accueil.json
```

## 4. En cas d’échec

- Reproduire une fois avec un nouveau profil Lighthouse.
- Identifier l’audit en échec et corriger le code ou le contenu.
- Ne pas masquer un score par une exception locale.
- Si l’échec vient de l’environnement, consigner la preuve et relancer avant publication.
- Une baisse de performance doit être expliquée par un changement de contenu, d’asset ou de dépendance.

## 5. Journal du 24 octobre 2026

| Page | Performance | Accessibilité |
| --- | --- | --- |
| `/` | 100 | 100 |
| `/ressources` | 99 | 100 |
| `/module-1` | 99 | 100 |
| `/outils` | 99 | 100 |
| `/module-6` | 99 | 100 |
| `/modeles` | 99 | 100 |

Le CLI a retourné le code 1 lors du nettoyage du profil temporaire Windows (`EPERM`). Les rapports JSON étaient complets et les scores ont été lus depuis ces fichiers.

Mesures de production après déploiement de la version 1.5.0 : accueil 98 en performance et 100 en accessibilité ; `/module-1` 100 et 100. La variation de performance sur l’accueil dépend du réseau et du poste de mesure.

## 6. Journal du 6 novembre 2026

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| `/` avec visite de présentation ouverte | 100 | 100 | 100 | 100 |
| `/module-1` | 99 | 100 | 100 | 100 |

Mesure mobile sur le build local, premier chargement sans données locales, visite de présentation affichée par-dessus l’accueil. Un second passage après rebase sur `main` donne 98 en performance sur l’accueil et 99 sur `/module-1`, avec 100 en accessibilité, bonnes pratiques et SEO. La performance de l’accueil varie de 98 à 100 selon les runs, au-dessus du seuil de 90.

## 7. Production du 6 novembre 2026 (version 1.6.0)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| `https://hylst.fr/gestion-projet-it/` | 98 | 100 | 100 | 100 |
| `https://hylst.fr/gestion-projet-it/module-1` | 99 | 100 | 100 | 100 |

Mesure mobile sur la production déployée depuis `main` `4514f93` (commit plateforme `e6875a52`). Ces scores confirment les mesures locales : la performance de l’accueil fluctue entre 98 et 100 selon le réseau et le poste, sans passer sous le seuil de 90. `docs/qualite/partage.md` consigne les autres contrôles de production.

## 8. Production du 6 novembre 2026 (version 1.6.1)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| `https://hylst.fr/gestion-projet-it/` | 98 | 100 | 100 | 100 |
| `https://hylst.fr/gestion-projet-it/module-1` | 98 | 100 | 100 | 100 |

Mesure mobile sur la production déployée depuis `main` `3b93f01`. Les scores confirment le maintien des performances et de l’accessibilité après application du correctif de reflow et montée des dépendances.

## 9. Production du 9 novembre 2026 (version 1.7.0)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| `https://hylst.fr/gestion-projet-it/` | 98 | 100 | 100 | 100 |
| `https://hylst.fr/gestion-projet-it/module-1` | 98 | 100 | 100 | 100 |

Mesure mobile sur la production déployée depuis `main` `feb571b`. Les scores confirment le maintien des performances optimales et du score parfait d’accessibilité (100) après intégration des introductions pédagogiques, des infobulles de termes techniques et de la navigation de continuité.

## 10. Production du 9 novembre 2026 (version 1.8.0)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| `https://hylst.fr/gestion-projet-it/` | 98 | 100 | 100 | 100 |
| `https://hylst.fr/gestion-projet-it/module-1` | 98 | 100 | 100 | 100 |

Mesure mobile sur la production déployée depuis `main` `b2319ef` (commit plateforme `7a934d80`). LCP 1,2 s, CLS 0 et TBT 10 ms sur l’accueil, LCP 1,2 s, CLS 0 et TBT 100 ms sur `/module-1`. Les scores confirment le maintien des performances et de l’accessibilité après l’ajout de la recherche globale, des introductions de parcours et des liens du dossier projet vers les modules.

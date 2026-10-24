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
| `/` | 99 | 100 |
| `/ressources` | 99 | 100 |
| `/module-1` | 99 | 100 |
| `/outils` | 99 | 100 |
| `/module-6` | 99 | 100 |
| `/modeles` | 99 | 100 |

Le CLI a retourné le code 1 lors du nettoyage du profil temporaire Windows (`EPERM`). Les rapports JSON étaient complets et les scores ont été lus depuis ces fichiers.

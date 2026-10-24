# Contrôle des liens

**Date :** 24 octobre 2026
**Commande :** `npm run check:liens`
**Exécution :** locale et CI GitHub Actions.

## 1. Périmètre automatisé

Le script `scripts/check-liens.mjs` vérifie :

- les liens Markdown relatifs des documents du dépôt ;
- la présence de chaque route de `src/App.tsx` dans `public/sitemap.xml` ;
- l’absence d’URL supplémentaire ou en double dans le sitemap.

Le contrôle ne fait aucune requête réseau. Il ne dépend ni d’un compte ni d’un service externe.

## 2. Périmètre manuel

Les 24 URL de la bibliothèque de ressources ont été ouvertes le 24 octobre 2026 : 24 réponses HTTP 200. Le journal et la politique de retrait sont dans [`docs/sources.md`](../sources.md).

Une URL externe est revue lors de l’ajout, du changement de version ou de la revue annuelle. Un refus d’accès automatisé ne suffit pas à déclarer un lien mort.

## 3. Limites connues

- Les ancres internes des documents ne sont pas vérifiées par le script ; le smoke Playwright contrôle les ancres de l’application.
- Les liens externes ne sont pas testés en CI pour éviter une dépendance réseau et des faux négatifs temporaires.
- Le script ne remplace pas une lecture humaine de la ressource.

## 4. Résultat du 24 octobre 2026

| Contrôle | Résultat |
| --- | --- |
| Liens Markdown relatifs | 58 contrôlés, 0 cassé |
| Routes publiques | 21 |
| URL du sitemap | 21, aucune en double |
| URL externes | 24 sur 24 en HTTP 200 |

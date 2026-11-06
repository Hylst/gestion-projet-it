# Audit d’accessibilité de la visite de présentation

**Date :** 6 novembre 2026
**Périmètre :** dialogue d’onboarding de l’accueil, cinq écrans, ouverture à la première visite et relecture.
**Référence :** WCAG 2.2 AA, sans certification.

## 1. Structure et sémantique

- Dialogue avec `role="dialog"`, `aria-modal="true"` et `aria-labelledby` sur le titre de l’écran courant.
- Un seul titre de niveau 2 dans le dialogue, textes courts et listes de trois points.
- Illustrations SVG décoratives en `aria-hidden="true"` et `focusable="false"`.
- Numéro d’étape annoncé en `aria-live="polite"`.
- Points de navigation avec libellé « Aller à l’étape N » et `aria-current="step"`.

## 2. Clavier et focus

- Focus initial placé sur le panneau du dialogue.
- Piège de focus entre le premier et le dernier élément interactif, dans les deux sens.
- Flèche droite et flèche gauche changent d’écran, Début et Fin vont au premier ou au dernier.
- Échap, « Passer », la croix et « Terminer » ferment le dialogue.
- Retour du focus sur le bouton « Revoir la présentation » après fermeture.
- Fond de page rendu inerte pendant l’ouverture et défilement bloqué.

## 3. Lisibilité et mouvement

- Contrastes AA sur le texte, les boutons, les points d’étape et le focus visible.
- Mise en page fluide, sans largeur fixe, avec une colonne sur petit écran.
- Animations d’entrée et de glissement désactivées quand `prefers-reduced-motion` est actif.
- Dialogue masqué à l’impression.

## 4. Données et réseau

- Seul le drapeau `gestion-projet-it:onboarding:v1` est écrit, avec la valeur `{ version: 1, vu: true }`.
- Aucun XP, aucun compte, aucun cookie et aucune requête vers un service tiers.
- Aucune nouvelle route, aucun changement de sitemap et aucun changement de service worker.

## 5. Résultats

- 16 tests de logique et de rendu dédiés à la visite.
- Smoke Playwright : 17/17, dont ouverture automatique, navigation au clavier, Échap, rechargement sans réouverture, relecture et zéro requête externe.
- Lighthouse mobile sur l’accueil avec la visite ouverte : 100 en performance, 100 en accessibilité, 100 en bonnes pratiques et 100 en SEO.
- Lint, typecheck, contrôle des liens et build passés.

## 6. Écarts et limites

- Aucun écart bloquant relevé.
- L’audit combine tests automatisés, smoke et Lighthouse. Un essai manuel avec un lecteur d’écran reste à faire lors d’une prochaine revue globale d’accessibilité.

# Onboarding du cours : conception

Date : 2026-11-06
Statut : validé pour implémentation.
Périmètre : accueil public, première visite et relecture de la présentation.

## 1. Contexte

Le cours ouvre directement sur l’accueil : hero, neuf modules, fil rouge, dossier projet, puis sections IA et Cybersécurité. Aucun écran de bienvenue n’explique le fonctionnement d’ensemble, le rôle des laboratoires, l’XP, le dossier projet ou la conservation locale des données.

Le besoin exprimé : une visite de présentation en plusieurs écrans, ouverte automatiquement par-dessus l’accueil à la première visite.

## 2. Objectifs

1. Présenter le cours en cinq écrans courts.
2. Ouvrir la visite automatiquement à la première visite de l’accueil.
3. Permettre de passer, de revenir en arrière et de terminer sans créer de compte.
4. Ne plus ouvrir automatiquement la visite une fois terminée.
5. Laisser un bouton « Revoir la présentation » sur l’accueil.
6. Rester accessible au clavier, sans image externe, sans XP et sans requête sortante.

## 3. Non-objectifs

- Aucune nouvelle route, aucun sitemap, aucun service worker.
- Aucun XP, aucune progression, aucun stockage autre que le drapeau de visite.
- Aucun compte, aucun cookie, aucune analytics.
- Aucune visite guidée contextuelle sur les modules ou les laboratoires.
- Aucune modification des parcours IA et Cybersécurité.
- Aucune copie dans Docker sans accord explicite.

## 4. Approches considérées

1. **Section intégrée à l’accueil** : un carrousel dans le hero. Simple, mais il allonge l’accueil et ne marque pas clairement le moment de bienvenue.
2. **Route dédiée** : une page `/decouvrir`. Elle ajoute une route au sitemap et oblige un aller-retour.
3. **Dialogue par-dessus l’accueil** : cinq écrans, ouverture automatique unique, relecture possible. C’est l’approche retenue, car elle isole le moment de bienvenue sans ajouter de route.

## 5. Comportement

- À l’arrivée sur `/`, si le drapeau `gestion-projet-it:onboarding:v1` n’est pas `{ version: 1, vu: true }`, le dialogue s’ouvre.
- Le dialogue se ferme par « Passer », la croix, « Terminer » ou Échap. La fermeture écrit le drapeau.
- Une fois le drapeau écrit, un rechargement n’ouvre plus le dialogue.
- Le bouton « Revoir la présentation », placé sous l’appel à l’action du hero, rouvre le dialogue et repart du premier écran.
- La visite ne s’ouvre que sur l’accueil, jamais sur une autre route.
- Le dialogue ne modifie ni l’XP, ni la progression, ni le dossier projet.

## 6. Écrans

1. **Bienvenue** : cours interactif, sans compte, neuf modules et un fil rouge.
2. **Neuf modules** : lecture à son rythme, laboratoires, quiz, XP gagné une seule fois.
3. **Dossier projet** : six étapes, conservation locale, export et impression.
4. **Sections IA et Cybersécurité** : deux parcours autonomes, sans XP.
5. **Données locales** : aucun cookie, export et import JSON, effacement par le navigateur.

Chaque écran affiche un titre, un texte court, trois points et une illustration SVG décorative.

## 7. Accessibilité

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` sur le titre courant.
- Focus initial dans le dialogue, piège de focus, retour du focus sur le bouton de relecture après fermeture.
- Échap ferme, flèches gauche et droite changent d’écran, Début et Fin vont au premier ou au dernier.
- Texte « Étape 1 sur 5 » en `aria-live="polite"`.
- Points de navigation avec libellé « Aller à l’étape N », `aria-current="step"`.
- boutons de 24 px minimum, focus visible, contrastes AA.
- Mouvement réduit respecté, dialogue masqué à l’impression.
- Fond inerte pendant l’ouverture.

## 8. Stockage

- Clé : `gestion-projet-it:onboarding:v1`.
- Valeur : `{ "version": 1, "vu": true }`.
- Lecture et écriture via `src/lib/storage.ts`.
- Un drapeau invalide ou absent ouvre la visite.
- Aucune autre donnée n’est écrite.

## 9. Tests

- Logique : cinq écrans, identifiants uniques, drapeau absent, drapeau valide, drapeau invalide, charte typographique.
- Rendu : ouverture automatique, non-ouverture si déjà vu, fermeture et relecture, navigation, cinq points, absence de `+5 XP`, Échap, piège de focus.
- Pages : l’accueil contient le bouton de relecture et le dialogue à la première visite.
- Smoke : ouverture, navigation au clavier, fermeture, rechargement sans réouverture, relecture, zéro requête externe.
- Typographie : les textes du dialogue suivent les règles du site.

## 10. Critères d’acceptation

1. La visite s’ouvre automatiquement à la première visite de `/`.
2. Elle ne s’ouvre plus après fermeture ou rechargement.
3. « Revoir la présentation » la rouvre.
4. Les cinq écrans se parcourent au clavier.
5. Échap ferme et le focus revient sur le bouton de relecture.
6. Aucun XP, aucun cookie, aucune requête externe.
7. Aucune nouvelle route, aucun sitemap, aucun service worker.
8. Les tests, le lint, le typecheck, les liens, le build, le smoke et Lighthouse passent.

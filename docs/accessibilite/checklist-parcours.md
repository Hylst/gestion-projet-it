# Checklist d’accessibilité des futurs parcours

**Date :** 24 octobre 2026
**Statut :** parcours Cybersécurité et ses laboratoires audités (30 et 31 octobre 2026) ; parcours Produit en attente.
**Référence :** WCAG 2.2 AA, sans certification.

## 1. Déclencheur

Appliquer cette checklist dès qu’une page de parcours est ouverte, avant sa publication. Le parcours Cybersécurité a été audité le 30 octobre 2026 ; le parcours Produit reste à ouvrir. `QUA-001` ne peut être clos qu’après l’audit des deux parcours.

## 2. Structure

- Un seul `h1` par page, hiérarchie de titres continue.
- Points de repère `header`, `nav`, `main`, `footer` cohérents.
- Sommaire et liens d’évitement fonctionnels.
- Langue `fr` et titres de page uniques.
- Aucun contenu porteur d’information uniquement par la couleur.

## 3. Clavier et focus

- Tout parcours réalisable au clavier, sans trappe.
- Focus visible sur chaque lien, bouton, champ et carte interactive.
- Ordre de tabulation logique.
- Retour du focus après une action modale ou un changement de section.
- Aucun gestionnaire inline.

## 4. Formulaires et messages

- Label associé à chaque champ.
- Aide et exemple reliés au champ quand nécessaire.
- Erreur explicite, reliée au champ et annoncée sans dépendre uniquement de la couleur.
- Aucun champ obligatoire sans indication.
- Aucune collecte de données personnelles.

## 5. Contrastes et lisibilité

- Contrastes AA pour le texte, les boutons, les états de focus et les graphiques utiles.
- Zoom navigateur à 200 % sans perte de contenu ni chevauchement.
- Texte redimensionnable sans troncature.
- Mouvement réduit respecté.

## 6. Tests et preuves

- `npm test`, lint, typecheck, `check:liens` et build.
- Smoke Playwright : routes, clavier, focus, erreurs, impression et hors ligne si applicable.
- Lighthouse mobile : performance et accessibilité au moins 90.
- Lecture manuelle des contrastes et des messages.
- Consigner la date, les pages, les résultats et les écarts dans `docs/accessibilite/`.

## 7. Décision

Le parcours Cybersécurité et ses trois laboratoires sont audités et conformes pour leur périmètre. `QUA-001` reste ouvert pour le parcours Produit. Le présent document reste la référence d’audit à son ouverture.

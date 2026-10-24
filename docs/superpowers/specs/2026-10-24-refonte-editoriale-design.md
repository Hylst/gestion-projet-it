# Design éditorial coloré

**Date :** 24 octobre 2026
**Statut :** validé par l’utilisateur, livré.
**Périmètre :** 25 routes publiques.

## Intention

Rendre la structure du cours immédiatement lisible sans sacrifier la sobriété, l’accessibilité ou la performance. La couleur sert à distinguer les fonctions pédagogiques, pas à décorer.

## Principes

- Une couleur d’accent par module, utilisée dans l’icône, la bordure, le badge et les surfaces teintées.
- Texte toujours en encre foncée ; l’accent reste un repère, jamais le seul porteur d’information.
- Cartes de section avec bord supérieur coloré, ombre mesurée et titre repère.
- Dégradés doux réservés au hero, aux en-têtes de module et aux blocs de synthèse.
- Détails natifs pour les contenus secondaires : erreurs, corrigés et futurs compléments.
- Aucun contenu essentiel masqué par un accordéon.
- Mouvement réduit respecté ; focus visible ; contrastes AA.

## Palette

La palette de base reste claire et chaude. Neuf accents couvrent les modules : bleu, turquoise, violet, vert, cyan, ambre, rose, indigo et orange. Les surfaces utilisent une version très claire de l’accent, avec un texte en `--accent-ink`.

## Structure

### Accueil

- Hero avec dégradé radial discret, titre large, statistiques courtes et trois panneaux visuels.
- Cartes de modules avec accent propre, icône teintée, élévation au survol et lien lisible.
- Sections Fil rouge, dossier projet et IA conservées, avec hiérarchie renforcée.

### Module

- En-tête coloré avec icône, numéro, durée, résumé et titre.
- Sommaire sticky sous le header.
- Sections en cartes : fiche, fil rouge, démarche, labo, exercice, quiz, erreurs, fiche réflexe.
- Fiche découpée en blocs de lecture.
- Erreurs fréquentes en `<details>` avec titre, conséquence et correction.
- Corrigés déjà dépliables conservés.
- Fiche réflexe et fin de module mises en évidence.

### Pages transverses

- IA : hero violet, sommaire sticky, callouts et checklists en cartes.
- Outils, ressources, modèles, glossaire, À propos et pages légales : même langage de cartes, accents et survols.
- Dossier projet : hero, étapes et formulaire dans le même système.

## Interaction

- Élévation légère des cartes au survol et au focus.
- Surlignage des lignes de tableaux.
- `<details>` natifs pour les contenus secondaires.
- Chevron décoratif en `aria-hidden`.
- Aucun script inline, aucune dépendance ajoutée.

## Vérification

- `npm test`, lint, typecheck, `check:liens`, build.
- Smoke 15/15 sur 25 routes.
- Lighthouse accueil et `/modeles`.
- Vérification clavier, focus, contrastes et `prefers-reduced-motion`.
- Bundle initial sous 300 kB.

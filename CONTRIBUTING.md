# Contribuer

## Licence

Les contributions sont publiées sous AGPL-3.0-or-later. En proposant une modification, vous confirmez pouvoir la publier sous cette licence.

## Installation

```bash
npm ci
npm run dev
```

## Vérifications

```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
npm run smoke
```

Le smoke nécessite un preview du build.

## Règles de contenu

- Français sobre, sans tiret cadratin.
- Accents et apostrophes typographiques.
- Aucune école présentée comme supérieure.
- Aucune source inventée, aucun chiffre sans source.
- Aucune donnée personnelle dans les exemples.

## Sécurité

Ne jamais committer de secret, de clé, de jeton ou de fichier local d’environnement. Les liens externes doivent rester hors du chargement initial.

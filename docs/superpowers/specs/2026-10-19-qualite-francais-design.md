# Qualité du français du site : design validé

Date : 2026-10-19
Statut : design validé par l’utilisateur, en attente de relecture du spec.

## 1. Contexte et objectif

Le site publie un français majoritairement sans accents (`Equipe`,
`methodes`, `A propos`) alors que quelques textes sont déjà accentués
(`coûteux`, `réguliers`). Le plan v1 prévoyait un français correct avec
accents. Ce cycle harmonise tout le texte visible, sans changer le sens,
les routes, la progression ni les clés de stockage.

Objectifs :

1. Accentuer tout le français visible, majuscules incluses.
2. Appliquer l’apostrophe typographique et les espaces insécables
   françaises.
3. Corriger les six points éditoriaux listés en section 4.
4. Garder les gates vertes et un diff relisible, lot par lot.

## 2. Périmètre

### Inclus

- `src/routes/` : accueil, à propos, glossaire, 404.
- `src/components/` : en-tête, pied, recherche, blocs de module,
  libellés ARIA et textes d’interface.
- `src/modules/` : les 9 modules, fiches, fils rouges, démarches,
  exercices, quiz, fiches réflexes, métadonnées.
- `src/labos/` : libellés, consignes, messages d’état, légendes SVG.
- `src/lib/glossaire.ts`, `src/lib/search.ts` si des libellés changent.
- `index.html` : titre et description.
- `public/offline.html`.
- `public/manifest.webmanifest` si un libellé visible change.

### Exclu

- Identifiants de code, noms de variables, classes CSS, clés
  `localStorage`, slugs et URL.
- Le cahier des charges, les documents de travail et le dossier
  plateforme.
- Les fixtures internes des tests, sauf les chaînes attendues qui
  doivent suivre le nouveau texte.
- Les points techniques différés : doubles annonces ARIA, exports
  supplémentaires, ordre des parades.

## 3. Règles typographiques

1. Accents sur tout le français, y compris les majuscules :
   `Équipe`, `Méthodes`, `À propos`, `À quoi ça sert`, `Étape`.
2. Apostrophe typographique `’` dans le texte français :
   `l’équipe`, `d’un`, `qu’il`.
3. Espace insécable `U+00A0` avant `: ; ? !` et à l’intérieur des
   guillemets `« »`.
4. Espace insécable entre un nombre et son unité quand le cas existe
   déjà (`5 min`).
5. Aucun tiret cadratin. Les traits d’union légitimes restent.
6. Noms propres, marques et méthodes inchangés : Scrum, Kanban, Lean,
   XP, Waterfall, PERT, GANTT, Eisenhower, Docker, Jira, GitHub.
7. Convention d’implémentation :
   - texte JSX : entité `&nbsp;` ;
   - chaînes TypeScript : `\u00A0` ;
   - attributs JSX : expression avec `\u00A0` ;
   - apostrophe `’` en UTF-8 direct.

## 4. Corrections éditoriales

| Emplacement | Correction |
| --- | --- |
| `src/modules/m4-agiles/fiche.tsx` | Ajouter le lead time et la revue de flux à la fiche Kanban, conformément au CDC 11.4. |
| `src/modules/m4-agiles/filRouge.tsx` | Nommer explicitement l’association fictive Les Amis du Square. |
| `src/modules/m3-methodes/fiche.tsx` | Réécrire le fragment « Quand l’utiliser » en phrase complète. |
| `src/modules/m3-methodes/ficheReflexe.ts` | Remplacer « Valeur sure » par « Repère prudent », sans affirmation non sourcée. |
| `src/modules/*/exercise.tsx` et `exercice.tsx` | Uniformiser les titres à l’infinitif. |
| `src/modules/m5-outils/exercise.tsx` | Corriger « ou placer » en « où placer ». |

Les titres d’exercices deviennent, par exemple :

- « Exercice 2 : débloquer un tableau » (module 4).
- « Exercice 2 : placer la chaîne CI » (module 5).
- « Exercice 2 : tenir un registre des risques » (module 6).
- « Exercice 2 : préparer un plan de communication de mise en ligne »
  (module 7).
- « Exercice 2 : préparer un plan d’adoption court » (module 9).

## 5. Découpage en lots

Chaque lot suit : test rouge, correction, lint, typecheck, tests,
build, smoke. Un commit par lot seulement avec l’accord de
l’utilisateur.

- **Lot 0, pages transverses** : en-tête, pied, accueil, à propos,
  glossaire, 404, `index.html`, `offline.html`, libellés de recherche.
- **Lot 1, modules 1 à 3**.
- **Lot 2, modules 4 à 6**.
- **Lot 3, modules 7 à 9**.
- **Lot 4, corrections éditoriales** : tableau ci-dessus et garde
  globale.
- **Lot 5, vérification finale** : gates complètes, Lighthouse,
  resynchronisation du build vers le dossier plateforme, sans git.

## 6. Tests et vérification

Nouveau fichier `tests/typo.test.ts` :

- Rend l’accueil, à propos, glossaire, 404 et les 9 pages de module
  dans `ProgressProvider` et `MemoryRouter`.
- Normalise les espaces avec `replace(/\s+/g, ' ')` avant les
  assertions.
- Interdit le tiret cadratin `U+2014`.
- Interdit une liste de formes non accentuées non ambiguës, avec
  limites de mots et insensibilité à la casse :
  `equipe`, `equipes`, `methode`, `methodes`, `methodologie`,
  `methodologies`, `a propos`, `a quoi`, `a faire`, `a relire`,
  `a cote`, `cote a cote`, `meme`, `memes`, `etre`, `ete`, `tres`,
  `apres`, `deja`, `premiere`, `premieres`, `derniere`,
  `dernieres`, `generale`, `generales`, `necessaire`, `necessaires`,
  `developpement`, `reference`, `references`, `difference`,
  `differences`, `element`, `elements`, `etape`, `etapes`,
  `resultat`, `resultats`, `experience`, `experiences`, `frequente`,
  `frequentes`, `regression`, `regressions`, `reunion`, `reunions`,
  `interet`, `interets`, `cout`, `couts`, `decouper`, `decoupage`,
  `perimetre`, `dependance`, `dependances`, `chaine`, `chaines`,
  `lisibilite`, `qualite`, `qualites`, `securite`, `priorite`,
  `priorites`, `realise`, `realisee`, `realises`, `realisees`,
  `realisation`, `realisations`, `donnee`, `donnees`, `annee`,
  `annees`, `evenement`, `evenements`, `prevoir`, `prevu`, `prevue`,
  `prevus`, `prevues`, `sure`, `repere`.
- Vérifie des libellés clés accentués : titres des modules, en-tête,
  titres de pages, définitions du glossaire.
- Les formes `a`, `ou`, `cote` sont exclues car ambiguës ; `des` et
  `les` n’ont pas besoin d’accent.

Mises à jour attendues :

- `tests/labos/kanban.test.ts` : `À faire` au lieu de `A faire`.
- `tests/labos/comparateur.test.tsx` : nom accessible avec accents.
- `smoke/smoke.spec.ts` : liens et textes accentués.
- Tout autre test qui compare une chaîne exacte, détecté par la suite
  complète.

Vérification finale :

```text
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke
```

Lighthouse mobile sur l’accueil, un module et le glossaire, avec
`MSYS_NO_PATHCONV=1` et le serveur de preview au base path du site.

## 7. Critères d’acceptation

1. Tous les textes visibles listés au périmètre sont accentués et
   utilisent l’apostrophe typographique.
2. Les espaces insécables sont présentes avant `: ; ? !` et dans les
   guillemets des textes visibles.
3. Aucun tiret cadratin dans le contenu rendu.
4. Les six corrections éditoriales sont présentes et testées.
5. `tests/typo.test.ts` passe sur les 13 pages rendues.
6. La recherche reste insensible aux accents : `equipe` trouve le
   module 6 après accentuation.
7. Lint, typecheck, tests, build et smoke passent.
8. Lighthouse mobile reste supérieur ou égal à 90 sur les pages
   vérifiées.
9. Aucune route, clé de stockage, URL ou logique de score modifiée.
10. Le build plateforme est resynchronisé après validation seulement.

## 8. Risques et parades

- **Faux positifs d’accentuation** : la liste de garde ne contient que
  des formes non ambiguës ; la revue manuelle tranche les cas.
- **Espaces insécables et tests** : normalisation des espaces dans le
  test de garde ; les requêtes Testing Library normalisent déjà les
  espaces.
- **Chaînes exactes cassées** : la suite complète est lancée à chaque
  lot, les tests sont corrigés dans le même lot.
- **Recherche** : `normaliser` retire déjà les diacritiques ; un test
  dédié le confirme après accentuation.
- **Diff volumineux** : quatre lots de contenu plus un lot de
  corrections, pour garder des révisions lisibles.

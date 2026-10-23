# Angles morts du cours : gouvernance et qualité

Date : 2026-10-20
Statut : design validé par l’utilisateur le 2026-10-20, prêt pour
implémentation.

## 1. Contexte et objectif

Le cours couvre neuf modules, avec pour chacun une fiche, un fil rouge,
une démarche, un labo, des exercices corrigés, un quiz et une fiche
réflexe. Deux sujets structurants restent absents ou trop implicites :

- la gouvernance du projet : rôles, matrice RACI, journal de décisions,
  escalade ;
- la qualité et la recette : critères d’acceptation, définition de prêt,
  définition de fini, recette, non-régression.

Objectifs :

1. Ajouter ces deux angles morts sans allonger artificiellement le cours.
2. Conserver les neuf modules, les routes, la progression `0/9`, l’XP et
   les clés de stockage.
3. Ajouter neuf termes au glossaire et deux questions aux quiz des deux
   modules touchés.
4. Rendre le composant de quiz compatible avec un nombre variable de
   questions, sans changer le seuil des deux tiers.
5. Garder les gardes typographiques, l’accessibilité, le budget de
   performance et l’autonomie des assets.

## 2. Périmètre

### Inclus

- `src/modules/m7-parties/` : fiche, fil rouge, démarche, exercice,
  quiz, fiche réflexe.
- `src/modules/m3-methodes/` : fiche, fil rouge, démarche, exercice,
  quiz, fiche réflexe.
- `src/modules/index.ts` : résumés et mots-clés des modules 3 et 7.
- `src/lib/glossaire.ts` : neuf entrées.
- `src/routes/Glossaire.tsx` : description SEO enrichie.
- `src/components/QuizBlock.tsx` : nombre de questions et seuil
  dynamiques.
- `tests/blocks.test.tsx`, `tests/xp.test.ts`, `tests/glossaire.test.ts`,
  `tests/search.test.ts`, `tests/typo.test.tsx`.
- `Docker/changelog.md` et le build déposé dans
  `Docker/gestion-projet-it/`.

### Exclu

- Toute nouvelle route, tout dixième module, tout nouveau labo.
- Le capstone, la boîte à outils, le bilan final, les références et
  l’annexe IA.
- Les composants de mise en page, les styles, les polices, les images et
  les icônes PWA.
- Le service worker, le manifest, `offline.html`, les sitemaps et les
  clés de stockage.
- L’upgrade Vitest/Vite, le SW v4 et les labels Kanban à 736 px.
- Toute dépendance ou ressource externe.

## 3. Décisions validées

1. Deux modules seulement : M7 pour la gouvernance, M3 pour la qualité.
2. Aucun nouveau module : les contenus s’insèrent dans les fiches et les
   exercices existants.
3. Deux questions ajoutées à M3 et à M7 : ces modules passent de trois à
   cinq questions ; les sept autres restent à trois.
4. Le composant `QuizBlock` devient générique et conserve le seuil des
   deux tiers, aligné sur `reduireXP`.
5. Les titres des modules restent inchangés ; les résumés et mots-clés
   sont enrichis.
6. Le glossaire gagne neuf entrées, sans nouvelle route.
7. La version de livraison est `2.17.55`, car `2.17.54` est déjà utilisé
   par la revue UX/UI du dépôt plateforme.

## 4. Design détaillé

### 4.1 Module 7 : fiche

Le titre de la fiche devient
`Fiche&nbsp;: parties prenantes, rôles et communication`.

Trois sections sont ajoutées après la cartographie des parties prenantes
et avant le plan de communication.

#### Rôles et gouvernance

```tsx
<h3>Rôles et gouvernance</h3>
<p><strong>Un rôle n’est pas une personne.</strong> Le sponsor porte le projet et débloque les moyens. Le chef de projet organise, suit et alerte. Le product owner ordonne les besoins. L’équipe réalise. Le comité de pilotage arbitre aux jalons. <strong>À quoi ça sert.</strong> Chacun sait qui décide, qui propose et qui est informé. <strong>Limite.</strong> Une personne peut tenir plusieurs rôles, à condition que ce soit écrit et accepté.</p>
```

#### Matrice RACI

```tsx
<h3>Matrice RACI</h3>
<p><strong>Quatre questions par activité.</strong> R&nbsp;: qui réalise. A&nbsp;: qui rend compte et décide, une seule personne par activité. C&nbsp;: qui est consulté avant la décision. I&nbsp;: qui est informé après. <strong>Exemple fictif.</strong> Pour valider le contenu de la page agenda, le chef de projet réalise (R), le bureau rend compte et décide (A), les bénévoles donnent un avis (C), les usagers sont informés (I). <strong>Règle.</strong> Un seul A par activité, au moins un R, pas de ligne vide. <strong>Limite.</strong> Une matrice trop lourde ralentit&nbsp;; une matrice vide laisse les décisions floues.</p>
```

#### Journal de décisions et escalade

```tsx
<h3>Journal de décisions et escalade</h3>
<p><strong>Une décision se note.</strong> Date, décision, motif, responsable, suite. <strong>Escalade.</strong> Des critères écrits&nbsp;: conflit de priorités, dépassement de marge, risque majeur. <strong>À quoi ça sert.</strong> Donner au bon niveau la décision qui lui revient, sans attendre qu’un blocage grossisse. <strong>Limite.</strong> Escalader n’est pas se défausser&nbsp;; c’est décider au bon endroit, avec les faits et les options.</p>
```

Les sections existantes « Plan de communication », « Rituels et boucles
de retour » et « Limites et vigilance » restent inchangées. La dernière
phrase de la fiche rappelle que la communication ne remplace pas la
décision.

### 4.2 Module 7 : fil rouge, démarche et fiche réflexe

Le fil rouge gagne un quatrième exemple :

```tsx
<h3>Exemple 4&nbsp;: les rôles de la mise en ligne</h3>
<p>Le bureau fictif rend compte et décide (A)&nbsp;: il approuve le contenu de la page agenda. Le chef de projet fictif réalise le planning et la recette (R). Les bénévoles donnent un avis sur les contenus (C). Les usagers sont informés par l’affiche (I). Une seule personne approuve chaque activité&nbsp;; le journal note la décision et sa suite.</p>
```

La démarche conserve cinq gestes :

1. Liste les parties prenantes fictives et leurs rôles.
2. Évalue pouvoir et intérêt, sans juger les personnes.
3. Choisis un canal et un rythme pour chaque besoin.
4. Écris un plan court (qui, quoi, quand, canal) et une matrice RACI
   courte.
5. Après chaque jalon, ajuste le plan et note les décisions.

La fiche réflexe passe à sept items :

```ts
export const items = [
  'Liste les parties prenantes avant d’écrire un message.',
  'Évalue pouvoir et intérêt sans juger les personnes.',
  'Choisis un canal par besoin, pas par habitude.',
  'Nomme un responsable et un décideur par activité.',
  'Note les décisions, leur motif et leur suite.',
  'Prévois un rituel court et un compte rendu.',
  'Ajuste le plan après un retour, sans défensive.',
];
```

### 4.3 Module 7 : exercice et quiz

Un troisième exercice est ajouté :

```tsx
<ExerciseBlock
  id="m7-ex3"
  titre={'Exercice 3\u00A0: construire un RACI et noter une décision'}
  enonce={(
    <p>Pour la mise en ligne de la page agenda fictive, attribue R, A, C et I au bureau, au chef de projet, aux bénévoles, aux usagers et au financeur. Puis note une décision dans le journal avec son motif, son responsable et sa suite.</p>
  )}
  corrige={(
    <ul>
      <li><strong>Validation du contenu&nbsp;:</strong> R&nbsp;: chef de projet&nbsp;; A&nbsp;: bureau&nbsp;; C&nbsp;: bénévoles&nbsp;; I&nbsp;: usagers.</li>
      <li><strong>Publication de la page&nbsp;:</strong> R&nbsp;: bénévole formé&nbsp;; A&nbsp;: chef de projet&nbsp;; C&nbsp;: bureau&nbsp;; I&nbsp;: financeur.</li>
      <li><strong>Règle&nbsp;:</strong> un seul A par activité, au moins un R, pas de ligne vide.</li>
      <li><strong>Journal&nbsp;:</strong> date&nbsp;: jalon de recette&nbsp;; décision&nbsp;: valider le contenu de la page agenda&nbsp;; motif&nbsp;: critères d’acceptation vérifiés&nbsp;; responsable&nbsp;: bureau&nbsp;; suite&nbsp;: publication puis annonce aux usagers.</li>
    </ul>
  )}
  methode={[
    'Écris les rôles avant l’activité, pas après le conflit.',
    'Un seul A par activité.',
    'Note la décision et sa suite.',
  ]}
/>
```

Deux questions sont ajoutées au quiz, qui passe à cinq questions :

```ts
{
  question: 'Dans une matrice RACI, que signifie la lettre A\u00A0?',
  choix: [
    'La personne qui rend compte et décide',
    'La personne qui informe seulement',
    'La personne qui réalise toujours',
  ],
  bonne: 0,
  motif: 'Un seul A par activité\u00A0: il rend compte du résultat et tranche.',
},
{
  question: 'À quoi sert un journal de décisions\u00A0?',
  choix: [
    'Garder la décision, son motif, son responsable et sa suite',
    'Remplacer le planning',
    'Lister les réunions sans décision',
  ],
  bonne: 0,
  motif: 'Le journal garde la trace utile pour éviter de redécider sans contexte.',
},
```

### 4.4 Module 7 : métadonnées

Le même `resume` et les mêmes `motsCles` sont reportés dans
`src/modules/index.ts` (cartes et recherche) et dans le `meta` local de
`src/modules/m7-parties/index.tsx` (en-tête et description SEO) :

```ts
{
  id: 'm7-parties',
  num: 7,
  slug: 'module-7',
  titre: 'Parties prenantes et communication',
  resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.',
  motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'],
}
```

### 4.5 Module 3 : fiche

Trois paragraphes sont ajoutés avant la section « Limites » existante.

```tsx
<p><strong>Critères d’acceptation.</strong> Un critère est observable et testable&nbsp;: un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste&nbsp;; un champ manquant affiche un message explicite. Les critères se discutent avant la réalisation, avec les parties prenantes. <strong>Définition de prêt.</strong> Elle dit quand une tâche est assez claire pour commencer. <strong>Définition de fini.</strong> Elle dit quand elle est vraiment terminée.</p>
<p><strong>Recette et non-régression.</strong> La recette vérifie avec les parties prenantes que le résultat répond aux critères. La non-régression vérifie qu’un changement ne casse pas ce qui fonctionnait déjà. Un plan de test court suffit&nbsp;: quoi, qui, quand, quelle preuve.</p>
<p><strong>Limite qualité.</strong> Une recette découverte à la fin ne rattrape pas un besoin flou&nbsp;; les critères se discutent tôt. La qualité n’est pas un document de plus, c’est une décision sur ce qui compte.</p>
```

La section « Limites » existante reste inchangée. Le titre de la fiche
reste `Fiche&nbsp;: cycle en V, cascade (Waterfall), choisir sa méthode`.

### 4.6 Module 3 : fil rouge, démarche et fiche réflexe

Le fil rouge gagne un troisième exemple :

```tsx
<h3>Exemple 3&nbsp;: la recette de la page agenda</h3>
<p>La page agenda fictive est acceptée si un bénévole crée un événement avec un titre, une date et un lieu, si l’événement apparaît dans la liste et si un champ manquant affiche un message explicite. Le bureau et un bénévole font la recette sur un jeu fictif&nbsp;; une capture datée sert de preuve. La non-régression vérifie que la page contact fonctionne encore.</p>
```

La démarche conserve cinq gestes :

1. Décrire le besoin : stable, figé ou flou ?
2. Lister les contraintes (qualité, traces, date cible, équipe
   disponible) et les critères d’acceptation.
3. Si le besoin est flou, avancer par maquette ou lot court avant de
   figer une phase.
4. La méthode est choisie et écrite avec son motif, ses limites et son
   plan de recette.
5. Rédiger une parade si le besoin bouge (jalon de relecture ou tranche
   courte avec revue) et prévoir la non-régression.

La fiche réflexe passe à sept items :

```ts
export const items = [
  'Décris le besoin\u00A0: stable ou flou, avant de choisir.',
  'Choisis V si les traces et tests sont attendus.',
  'Choisis la cascade si le besoin est stable et petit.',
  'Repère prudent\u00A0: un lot court avant de figer une phase.',
  'Écris les critères d’acceptation avant de réaliser.',
  'Prévois la recette et la non-régression.',
  'Prévois une parade si le besoin bouge.',
];
```

### 4.7 Module 3 : exercice et quiz

Un troisième exercice est ajouté :

```tsx
<ExerciseBlock
  id="m3-ex3"
  titre={'Exercice 3\u00A0: écrire trois critères d’acceptation'}
  enonce={(
    <p>Pour la page agenda fictive, écris trois critères d’acceptation observables et testables. Indique qui fait la recette et quelle preuve est gardée.</p>
  )}
  corrige={(
    <ul>
      <li><strong>Critère 1&nbsp;:</strong> un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste.</li>
      <li><strong>Critère 2&nbsp;:</strong> un champ obligatoire manquant affiche un message explicite et l’enregistrement est refusé.</li>
      <li><strong>Critère 3&nbsp;:</strong> un événement modifié ou supprimé disparaît de la liste et de la page publique.</li>
      <li><strong>Recette&nbsp;:</strong> le bureau et un bénévole testent sur un jeu fictif&nbsp;; une capture datée ou un compte rendu sert de preuve.</li>
      <li><strong>Méthode&nbsp;:</strong> critère observable, testable et accepté avant la réalisation.</li>
    </ul>
  )}
  methode={[
    'Un critère se constate, il ne s’interprète pas.',
    'Écris le critère avant de réaliser.',
    'Garde une preuve de la recette.',
  ]}
/>
```

Deux questions sont ajoutées au quiz, qui passe à cinq questions :

```ts
{
  question: 'Quand écrit-on les critères d’acceptation\u00A0?',
  choix: [
    'Avant la réalisation, avec les parties prenantes',
    'Après la mise en ligne',
    'Seulement quand un bug apparaît',
  ],
  bonne: 0,
  motif: 'Les critères se discutent tôt\u00A0: ils guident la réalisation et la recette.',
},
{
  question: 'À quoi sert la non-régression\u00A0?',
  choix: [
    'Vérifier qu’un changement ne casse pas ce qui fonctionnait',
    'Ajouter des fonctionnalités',
    'Remplacer la recette',
  ],
  bonne: 0,
  motif: 'La non-régression protège l’existant pendant que le produit évolue.',
},
```

### 4.8 Module 3 : métadonnées

Le même `resume` et les mêmes `motsCles` sont reportés dans
`src/modules/index.ts` (cartes et recherche) et dans le `meta` local de
`src/modules/m3-methodes/index.tsx` (en-tête et description SEO) :

```ts
{
  id: 'm3-methodes',
  num: 3,
  slug: 'module-3',
  titre: 'Cycle en V, cascade et choix de méthode',
  resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.',
  motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'],
}
```

### 4.9 Glossaire

Neuf entrées sont ajoutées dans `src/lib/glossaire.ts`, en ordre
alphabétique :

| Terme | Définition | Module |
| --- | --- | --- |
| Comité de pilotage | Instance de suivi et d’arbitrage qui réunit les décideurs aux moments clés du projet. | 7 |
| Critère d’acceptation | Condition observable et testable qui permet de dire si un livrable est accepté. | 3 |
| Définition de prêt | Critères partagés qui disent quand une tâche est assez claire pour commencer. | 3 |
| Gouvernance | Répartition des rôles, des instances et des droits de décision qui rend le projet lisible. | 7 |
| Journal de décisions | Trace courte d’une décision, de son motif, de son responsable et de sa suite. | 7 |
| Non-régression | Vérification qu’un changement ne casse pas ce qui fonctionnait déjà. | 3 |
| RACI | Matrice qui précise, pour chaque activité, qui réalise, qui rend compte et décide, qui est consulté et qui est informé. | 7 |
| Recette | Vérification avec les parties prenantes que le livrable répond aux critères d’acceptation. | 3 |
| Sponsor | Personne qui porte le projet, débloque les moyens et répond au niveau décisionnel. | 7 |

`Définition de fini` reste au module 1. La description SEO de la page
glossaire devient :

```ts
'Glossaire neutre du cours Gestion de Projet IT\u00A0: cadrage, planification, méthodes, agiles, outils, équipe, gouvernance, qualité, budget et changement.'
```

### 4.10 QuizBlock

Le composant calcule le nombre de questions et le seuil des deux tiers :

```tsx
const total = props.data.questions.length;
const seuil = Math.ceil((total * 2) / 3);
```

Le verdict devient :

```tsx
const message = deja
  ? 'Gain déjà reçu pour ce quiz.'
  : bonnes >= seuil
    ? '+10 XP'
    : `Moins de ${seuil} sur ${total}\u00A0: pas de gain, tu peux recommencer.`;
const s = `${bonnes} sur ${total} bonnes réponses. ${message}`;
```

Le gain n’est accordé que si `bonnes >= seuil`, ce qui reproduit la règle
de `reduireXP` (`correctes * 3 < total * 2`). Le titre devient :

```tsx
<h2 id="quiz-t">Quiz courant ({total} questions)</h2>
```

Pour trois questions, le seuil reste deux sur trois. Pour cinq
questions, il devient quatre sur cinq. Les sept autres modules restent à
trois questions.

### 4.11 Recherche et cartes

Les résumés des modules 3 et 7 alimentent les cartes de l’accueil, les
en-têtes de module et l’index de recherche. L’ajout des mots-clés
`raci`, `gouvernance`, `decisions`, `escalade`, `qualite`, `recette`,
`acceptation` et `non regression` rend les nouveaux sujets trouvables
sans modifier le composant de recherche.

## 5. Architecture et flux

- Les contenus sont statiques : aucun état, aucun effet et aucune
  requête nouveaux.
- `QuizBlock` dérive `total` et `seuil` des données reçues. Il conserve
  son état local de réponses et son verdict.
- `reduireXP` garde la règle des deux tiers et l’unicité du gain par
  identifiant de quiz. Le composant s’aligne sur cette règle.
- Le glossaire reste statique et groupé par lettre. Les nouvelles
  entrées pointent vers les modules 3 et 7.
- Les métadonnées des modules alimentent les cartes, les en-têtes et
  l’index de recherche. Les copies locale et globale des modules 3 et 7
  restent identiques. Aucune route ni clé de stockage ne change.
- Aucun nouveau composant, aucun nouveau style, aucun asset externe.

## 6. Cas limites et erreurs

- Quiz à cinq questions : trois bonnes réponses ne donnent pas d’XP,
  quatre bonnes réponses donnent dix XP.
- Quiz déjà validé : le gain n’est pas redonné ; le message l’indique.
- Quiz à trois questions : le seuil reste deux sur trois, comportement
  inchangé.
- RACI : plusieurs R sont possibles, mais un seul A par activité. Une
  ligne vide ou deux A sont des erreurs de construction.
- Textes longs : les nouvelles sections restent en paragraphes, sans
  tableau, pour éviter tout débordement mobile.
- Typographie : apostrophes typographiques, espaces insécables avant
  `: ; ? !`, aucun tiret cadratin, accents sur tout le français.
- Recherche : `RACI` et `raci` doivent renvoyer le module 7 ; `recette`
  et `régression` doivent renvoyer le module 3.
- Service worker : version v3 inchangée ; les nouveaux assets hachés
  sont mis en cache à la première visite.
- Aucune route ajoutée : les sitemaps restent inchangés.

## 7. Tests et critères d’acceptation

### Tests unitaires

- `tests/blocks.test.tsx` : nouveau cas à cinq questions ; le titre
  affiche cinq questions ; trois bonnes réponses ne donnent pas d’XP ;
  quatre bonnes réponses donnent dix XP. Le cas existant à trois
  questions reste vert.
- `tests/xp.test.ts` : nouveau cas à cinq questions ; trois sur cinq
  sans gain, quatre sur cinq avec gain.
- `tests/glossaire.test.ts` : nouveau cas qui vérifie la présence des
  neuf entrées, dont `RACI`, `Gouvernance`, `Journal de décisions`,
  `Recette`, `Critère d’acceptation`, `Non-régression`,
  `Comité de pilotage`, `Définition de prêt` et `Sponsor`. Les
  contrôles de longueur, d’unicité, de module et de tiret cadratin
  restent verts.
- `tests/search.test.ts` : nouveau cas qui vérifie que `raci` et
  `gouvernance` renvoient le module 7, que `recette` et `regression`
  renvoient le module 3.
- `tests/typo.test.tsx` : nouveau cas qui vérifie la présence de
  `critères d’acceptation` et `non-régression` dans M3, de `RACI` et
  `Journal de décisions` dans M7. Les gardes typographiques existantes
  restent vertes.
- Total attendu : 152 tests, soit 147 existants et 5 nouveaux.

### Vérifications manuelles et E2E

- Rendu de M7 et M3 à 390, 736 et 1440 px : lisibilité, absence de
  débordement, hiérarchie des titres.
- Cartes d’accueil et en-têtes de M3 et M7 : les nouveaux résumés sont
  visibles et identiques dans les deux copies de métadonnées.
- Quiz de M3 et M7 au clavier : cinq questions, verdict, gain unique,
  bouton de reprise.
- Glossaire : neuf nouvelles entrées, liens vers les modules 3 et 7,
  sommaire alphabétique.
- Smoke existant : 7/7, 12 routes, zéro requête externe, zéro erreur
  console, `sw.js` v3.
- Lighthouse mobile accueil : performance et accessibilité supérieures
  ou égales à 90, attendu 100.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`.

### Livraison

- Construire avec `npm run build`.
- Remplacer le contenu de
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\` par le
  build, sans conserver les anciens assets hachés.
- Vérifier
  `diff -rq dist D:/0CODE/AntiGravity/Cours_Memos/Docker/gestion-projet-it` :
  aucune différence.
- Ajouter l’entrée `2.17.55` au changelog
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md` avec les résultats
  réels des tests, du smoke, de Lighthouse et les empreintes des
  fichiers.
- Le sitemap racine et le sitemap du module restent inchangés : aucune
  route nouvelle, `lastmod` racine déjà au 2026-10-20.
- Le service worker reste en v3 ; le smoke existant le vérifie.
- Vérifier que seuls le module, le changelog et le build sont modifiés
  dans le dépôt plateforme ; les autres entrées sales, notamment
  neurodivers, ne sont ni touchées ni indexées.
- Commit et push uniques après validation explicite de l’utilisateur.

## 8. Hors périmètre

- Le capstone « Dossier projet Les Amis du Square ».
- La boîte à outils et les modèles imprimables.
- Le bilan final et l’évaluation de fin de parcours.
- Les références bibliographiques et l’annexe IA.
- Un dixième module et toute nouvelle route.
- Un nouveau labo RACI ou un labo de recette.
- L’upgrade Vitest/Vite, le SW v4 et les labels Kanban à 736 px.
- Toute modification des styles, des polices, des images ou du manifest.

## 9. Risques et parades

- **Fiches trop longues** : les ajouts restent sous forme de paragraphes
  courts ; pas de nouveau titre de niveau 2 ni de nouveau labo.
- **RACI confondu avec un organigramme** : la fiche distingue rôle et
  personne, définit les quatre lettres et donne un exemple fictif.
- **Critères d’acceptation vagues** : l’exercice impose des critères
  observables et testables, avec un corrigé concret.
- **Seuil de quiz incohérent** : `QuizBlock` et `reduireXP` utilisent la
  même règle des deux tiers, vérifiée par deux tests.
- **Typographie** : la garde existante couvre les pages ; les nouvelles
  chaînes utilisent `\u00A0`, `&nbsp;` et l’apostrophe `’`.
- **Recherche** : les mots-clés sont ajoutés aux métadonnées et testés.
- **Métadonnées dupliquées** : les résumés et mots-clés des modules 3
  et 7 sont reportés à l’identique dans l’index global et dans le `meta`
  local de chaque page, puis contrôlés à l’écran.
- **Dérive de build** : comparaison `diff -rq`, copie complète du build,
  contrôle du statut Git et push unique.
- **Version dupliquée** : `2.17.54` est déjà pris ; la livraison utilise
  `2.17.55`.

## 10. Fichiers touchés

- `src/modules/m7-parties/index.tsx`
- `src/modules/m7-parties/fiche.tsx`
- `src/modules/m7-parties/filRouge.tsx`
- `src/modules/m7-parties/demarche.tsx`
- `src/modules/m7-parties/exercise.tsx`
- `src/modules/m7-parties/quiz.ts`
- `src/modules/m7-parties/ficheReflexe.ts`
- `src/modules/m3-methodes/index.tsx`
- `src/modules/m3-methodes/fiche.tsx`
- `src/modules/m3-methodes/filRouge.tsx`
- `src/modules/m3-methodes/demarche.tsx`
- `src/modules/m3-methodes/exercise.tsx`
- `src/modules/m3-methodes/quiz.ts`
- `src/modules/m3-methodes/ficheReflexe.ts`
- `src/modules/index.ts`
- `src/lib/glossaire.ts`
- `src/routes/Glossaire.tsx`
- `src/components/QuizBlock.tsx`
- `tests/blocks.test.tsx`
- `tests/xp.test.ts`
- `tests/glossaire.test.ts`
- `tests/search.test.ts`
- `tests/typo.test.tsx`
- `D:\0CODE\AntiGravity\Cours_Memos\Docker\changelog.md`
- `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it\` pour le build

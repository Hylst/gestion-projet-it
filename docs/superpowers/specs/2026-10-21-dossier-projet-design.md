# Dossier projet : capstone guidé

Date : 2026-10-21
Statut : design et spec validés par l’utilisateur le 2026-10-21, prêt
pour planification.

## 1. Contexte et objectif

Le cours couvre neuf modules, mais ne propose pas encore de travail de
synthèse. L’apprenant peut suivre les fiches, les labos et les quiz sans
jamais assembler les décisions dans un dossier cohérent. Le capstone
comble ce manque sans ajouter de dixième module.

Objectifs :

1. Proposer un parcours guidé en six étapes qui réutilise le fil rouge
   fictif des Amis du Square.
2. Faire produire un dossier écrit court, sauvegardé localement, avec
   douze livrables et une auto-évaluation.
3. Conserver les neuf modules, le compteur `0/9`, l’XP et les clés de
   stockage existantes.
4. Rester 100 % front, sans compte, sans backend, sans cookie et sans
   requête externe.
5. Livrer une page accessible, imprimable et couverte par les tests et
   le smoke Playwright.

## 2. Périmètre

### Inclus

- Une nouvelle route `/dossier-projet`, un lien dans la navigation
  principale et un encart sur l’accueil.
- Six étapes, vingt-trois champs courts, douze livrables cochables et
  six critères d’auto-évaluation.
- Une sauvegarde locale versionnée, une synthèse, un badge de fin, un
  export JSON et une impression.
- Les fichiers `src/routes/DossierProjet.tsx`, `src/lib/capstone.ts`,
  `src/lib/capstoneStorage.ts`, `src/components/capstone/*` et
  `src/styles/capstone.css`.
- Les mises à jour de `src/App.tsx`, `src/components/SiteHeader.tsx`,
  `src/routes/accueil.tsx`, `public/sitemap.xml` et `public/sw.js`.
- Les tests `tests/capstone.test.ts`, `tests/capstone.test.tsx`, les
  mises à jour de `tests/header.test.tsx`, `tests/typo.test.tsx` et de
  `smoke/smoke.spec.ts`.
- Le build déposé dans `Docker/gestion-projet-it/` et l’entrée de
  changelog, après smoke et Lighthouse validés.

### Exclu

- Tout dixième module, toute modification des cartes de modules et tout
  changement du compteur `0/9`.
- Tout gain d’XP, toute modification de `src/lib/xp.ts` et de l’export
  ou de l’import de progression existants.
- Tout backend, compte, synchronisation cloud, cookie, analytics,
  dépôt de fichiers ou génération PDF côté application.
- La correction automatique du dossier, un score certificatif, un
  tableau de bord enseignant et des modèles de documents à télécharger.
- L’import d’un dossier exporté. L’export sert à archiver ou partager,
  pas à restaurer dans ce lot.
- La boîte à outils, le bilan final, les références, l’annexe IA et
  toute nouvelle ressource externe.
- Toute dépendance supplémentaire.

## 3. Décisions validées

1. Nouvelle route dédiée, sans dixième module.
2. Six étapes et un dossier écrit guidé, pas une simulation à score.
3. Cas fictif unique : Les Amis du Square.
4. Progression séparée et badge de fin, sans XP.
5. Vingt-trois champs, douze livrables et six critères.
6. Sauvegarde locale, export JSON et impression depuis la synthèse.
7. Aucune correction automatique et aucune certification.
8. La version de livraison sera la prochaine version libre au moment du
   dépôt, après vérification du changelog plateforme.

## 4. Design détaillé

### 4.1 Route et navigation

La route est `/dossier-projet`, sous le `basename` existant
`/gestion-projet-it/`. Elle est déclarée dans `src/App.tsx` avant la
route générique `/module-:num`.

Le lien « Dossier projet » est ajouté à la navigation principale. Sur
l’accueil, un encart court après la présentation du fil rouge explique
que le dossier prolonge les neuf modules et renvoie vers la route. Le
compteur `0/9`, les cartes et les liens des modules restent inchangés.

La page utilise `SeoHead` avec :

- titre : `Dossier projet` ;
- description : `Construire un dossier de projet complet sur le cas fictif Les Amis du Square\u00A0: cadrage, planning, qualité, gouvernance, risques, changement.`
- URL canonique et `og:url` calculés par le composant existant.

### 4.2 Parcours en six étapes

Chaque étape contient un titre, une introduction courte, trois ou quatre
champs, deux livrables cochables et des boutons Précédent/Suivant. Les
champs sont des zones de texte limitées à 600 caractères, avec compteur
visible et aide contextuelle. Les identifiants d’étapes sont `cadrage`,
`planning`, `qualite`, `gouvernance`, `risques` et `changement`.

| # | Étape | Ancrage | Champs | Livrables |
|---|-------|---------|--------|-----------|
| 1 | Cadrer et découper | M1, M8 | `cadrage-besoin` Besoin ; `cadrage-perimetre` Périmètre inclus et exclu ; `cadrage-lots` Trois lots de travail ; `cadrage-criteres` Critères de réussite | `cadrage-note` Note de cadrage ; `cadrage-wbs` WBS en trois lots |
| 2 | Planifier et chiffrer | M2, M8 | `planning-jalons` Jalons et dépendances ; `planning-charges` Charges fictives ; `planning-alea` Marge d’aléa ; `planning-budget` Budget fictif | `planning-plan` Planning et jalons ; `planning-chiffrage` Chiffrage et marge |
| 3 | Choisir la méthode et la qualité | M3, M4 | `qualite-methode` Méthode retenue et motif ; `qualite-acceptation` Critères d’acceptation ; `qualite-recette` Recette et non-régression | `qualite-decision` Décision de méthode ; `qualite-plan-recette` Plan de recette |
| 4 | Organiser l’équipe et la gouvernance | M6, M7 | `gouvernance-roles` Rôles ; `gouvernance-raci` RACI simplifié ; `gouvernance-communication` Plan de communication ; `gouvernance-decisions` Journal de décisions | `gouvernance-organisation` Rôles et RACI ; `gouvernance-plan-communication` Plan de communication |
| 5 | Gérer les risques et le suivi | M5, M6 | `risques-registre` Trois risques et parades ; `risques-indicateurs` Indicateurs de suivi ; `risques-rituels` Rituels et outils ; `risques-verification` Chaîne de vérification | `risques-tableau` Registre des risques ; `suivi-tableau` Tableau de suivi |
| 6 | Conduire le changement et conclure | M9 | `changement-actions` Actions d’adoption ; `changement-relais` Relais et formation ; `changement-mesures` Mesures de retour ; `changement-bilan` Bilan | `changement-plan` Plan de changement ; `changement-bilan-note` Note de bilan |

Les champs sont facultatifs à la saisie, mais une étape est considérée
comme renseignée lorsque tous ses champs sont non vides après
suppression des espaces et que ses deux livrables sont cochés. Le
parcours ne bloque jamais la navigation : l’apprenant peut revenir,
sauter une étape et imprimer un dossier incomplet.

Les aides et libellés sont rédigés dans la charte du cours : accents,
apostrophe typographique, espace insécable avant `: ; ? !`, aucun tiret
cadratin et aucune donnée inventée. Les exemples restent fictifs.

### 4.3 Synthèse, auto-évaluation et badge

La synthèse est une vue interne à la route, pas une seconde route. Elle
est accessible par le bouton « Voir la synthèse » et par le dernier
bouton de l’étape 6.

Elle affiche, pour chaque étape :

- les réponses aux champs, ou « Non renseigné » ;
- l’état des deux livrables ;
- une indication des éléments manquants.

L’auto-évaluation contient six critères, notés de 1 à 4 :

| Identifiant | Critère |
|---|---|
| `auto-coherence` | Cohérence avec le besoin |
| `auto-tracabilite` | Traçabilité des décisions |
| `auto-realisme` | Réalisme du planning et du budget |
| `auto-qualite` | Qualité et recette |
| `auto-gouvernance` | Rôles et gouvernance |
| `auto-changement` | Adoption et bilan |

Les niveaux sont : 1 « À reprendre », 2 « Partiel », 3 « Solide »,
4 « Abouti ». La synthèse peut afficher un total indicatif sur 24, avec
la mention « Auto-évaluation indicative, sans valeur de certification ».

Le badge « Dossier complet » est dérivé de l’état, jamais stocké :
il apparaît si et seulement si les six étapes sont renseignées, les
douze livrables sont cochés et les six critères sont notés. Si un
élément est décoché ou vidé, le badge disparaît immédiatement. Aucun XP
n’est accordé.

La synthèse propose :

- « Imprimer » ;
- « Exporter en JSON » ;
- « Revenir aux étapes » ;
- « Réinitialiser le dossier », avec confirmation inline en deux temps
  et focus initial sur « Annuler ».

### 4.4 État et persistance

La clé de stockage est `gestion-projet-it:dossier-projet:v1`. Elle est
séparée de `gestion-projet-it:xp`.

```ts
export type EtapeId =
  | 'cadrage'
  | 'planning'
  | 'qualite'
  | 'gouvernance'
  | 'risques'
  | 'changement';

export type NoteAutoEvaluation = 1 | 2 | 3 | 4;

export interface DossierProjetState {
  version: 1;
  reponses: Record<string, string>;
  livrables: Record<string, boolean>;
  autoEvaluation: Record<string, NoteAutoEvaluation>;
  etapeCourante: number;
  updatedAt: string;
}

export interface ChargementDossier {
  etat: DossierProjetState;
  avertissement: 'corrompu' | null;
}

export interface ProgressionDossier {
  etapes: number;
  livrables: number;
  criteres: number;
  complet: boolean;
}
```

Le chargement passe par une fonction de validation stricte :

- `version` doit valoir `1` ;
- seules les clés connues de champs, livrables et critères sont
  conservées ;
- les réponses sont des chaînes coupées à 600 caractères ;
- les livrables sont des booléens ;
- les notes sont des entiers de 1 à 4 ;
- `etapeCourante` est un entier de 0 à 5, sinon 0 ;
- `updatedAt` est une date ISO valide, sinon la date courante ;
- un JSON invalide, un objet ou un tableau inattendu produit l’état
  initial et un avertissement non bloquant.

L’écriture utilise une sauvegarde différée de 300 ms. Elle est aussi
forcée au changement d’étape, avant l’export et avant l’impression.
La page affiche « Enregistré localement » après succès.

Si `localStorage` est indisponible ou si le quota est dépassé, la page
conserve l’état en mémoire et affiche un message `role="alert"` :
« La sauvegarde locale est indisponible. Le dossier reste utilisable
dans cet onglet, mais sera perdu à la fermeture. » L’export reste
disponible. Aucune donnée n’est envoyée ailleurs.

Les fonctions de domaine sont pures et testables :

- `etatInitialDossier(): DossierProjetState` ;
- `validerDossier(valeur: unknown): DossierProjetState` ;
- `estEtapeComplete(etat: DossierProjetState, etapeId: EtapeId): boolean` ;
- `estDossierComplet(etat: DossierProjetState): boolean` ;
- `progressionDossier(etat: DossierProjetState): ProgressionDossier` ;
- `exporterDossier(etat: DossierProjetState): string`.

### 4.5 Composants et fichiers

- `src/lib/capstone.ts` : types, constantes des étapes, champs,
  livrables et critères, fonctions pures de validation et de
  complétion.
- `src/lib/capstoneStorage.ts` : clé, chargement, sauvegarde et
  sérialisation d’export.
- `src/routes/DossierProjet.tsx` : orchestration de l’état, chargement,
  sauvegarde différée, navigation entre étapes et vue synthèse.
- `src/components/capstone/CapstoneStepper.tsx` : liste des étapes,
  état de complétion et `aria-current`.
- `src/components/capstone/CapstoneStep.tsx` : titre, champs, livrables
  et boutons de navigation.
- `src/components/capstone/CapstoneField.tsx` : label, zone de texte,
  aide et compteur de caractères.
- `src/components/capstone/CapstoneSummary.tsx` : réponses, livrables,
  auto-évaluation, badge, export, impression et réinitialisation.
- `src/styles/capstone.css` : mise en page, états, responsive et
  impression.

Chaque composant a une responsabilité unique. Les composants ne lisent
pas `localStorage` directement ; seule la route orchestre le stockage.

### 4.6 Accessibilité et responsive

- Le lien de navigation porte un libellé explicite.
- Le sommaire des étapes est un `nav` avec `aria-label`, une liste
  ordonnée et `aria-current="step"` sur l’étape active.
- Au changement d’étape, le focus va sur le titre `h2` de l’étape,
  rendu focalisable avec `tabIndex={-1}`.
- Chaque champ a un `label` associé, une aide via `aria-describedby` et
  un compteur visible. Le `placeholder` ne sert jamais de label.
- Les livrables et l’auto-évaluation sont dans des `fieldset` avec
  `legend`.
- Le statut de sauvegarde utilise `role="status"` ; les erreurs de
  stockage utilisent `role="alert"`.
- Les boutons ont des noms accessibles et un ordre de tabulation
  logique.
- Le rendu est vérifié à 390, 736 et 1440 px. Le sommaire passe en
  colonne sur petit écran et les zones de texte occupent toute la
  largeur.
- Les contrastes utilisent les variables existantes et sont vérifiés
  manuellement.

### 4.7 SEO, sitemap et PWA

- `public/sitemap.xml` ajoute
  `https://hylst.fr/gestion-projet-it/dossier-projet`.
- `public/sw.js` passe de `gestion-projet-it-v3` à
  `gestion-projet-it-v4` pour invalider l’ancien cache.
- Le smoke vérifie la nouvelle version du service worker.
- `robots.txt`, le manifest, les icônes et `offline.html` restent
  inchangés.

### 4.8 Impression et export

L’impression se lance depuis la synthèse. La feuille de style
`capstone.css` masque la navigation, les boutons, le sommaire des étapes
et les formulaires ; elle conserve le titre, les réponses, les
livrables, l’auto-évaluation et le badge. Les sections utilisent
`break-inside: avoid`.

L’export produit un fichier
`gestion-projet-it-dossier-projet.json` :

```json
{
  "version": 1,
  "exportedAt": "2026-10-21T10:00:00.000Z",
  "dossier": {
    "version": 1,
    "reponses": {},
    "livrables": {},
    "autoEvaluation": {},
    "etapeCourante": 0,
    "updatedAt": "2026-10-21T10:00:00.000Z"
  }
}
```

Le JSON est généré par une fonction pure, puis téléchargé avec un
`Blob` et un lien temporaire, sur le modèle de l’export de progression
existant. Aucun import de dossier n’est proposé dans ce lot.

## 5. Tests

### 5.1 Tests unitaires

`tests/capstone.test.ts` couvre :

- l’état initial ;
- la validation d’un état valide ;
- le rejet d’une version inconnue, d’un tableau, d’un objet nul et de
  types incorrects ;
- la suppression des clés inconnues ;
- la coupure des réponses à 600 caractères ;
- le calcul d’une étape complète, y compris les espaces vides et les
  livrables non cochés ;
- le calcul du dossier complet ;
- la progression des étapes, livrables et critères ;
- la sérialisation d’export ;
- le chargement d’un JSON absent, valide ou corrompu ;
- le succès et l’échec de sauvegarde.

### 5.2 Tests de composants

`tests/capstone.test.tsx` couvre :

- le rendu de la route et des six étapes ;
- la saisie, le compteur et la sauvegarde différée avec faux timers ;
- la reprise après rechargement avec la même clé ;
- le cochage des livrables ;
- la navigation Précédent/Suivant et le focus sur le titre ;
- la synthèse, les valeurs manquantes et le total d’auto-évaluation ;
- l’apparition et la disparition du badge ;
- le bouton d’impression ;
- l’export JSON ;
- la réinitialisation avec confirmation ;
- l’avertissement quand `localStorage` échoue ;
- l’absence de gain d’XP et le maintien de `0/9`.

### 5.3 Tests d’intégration et smoke

- `tests/header.test.tsx` ajoute `/dossier-projet` au cas « un seul lien
  courant ».
- `tests/typo.test.tsx` ajoute la page au tableau `PAGES` et vérifie la
  ponctuation, les accents et l’absence de tiret cadratin.
- `smoke/smoke.spec.ts` ajoute `/dossier-projet` aux routes rechargées,
  vérifie le clic depuis la navigation, la persistance d’un champ après
  rechargement, l’impression de la synthèse et la version
  `gestion-projet-it-v4`.
- Le smoke conserve les contrôles : zéro requête externe, zéro requête
  en échec, zéro erreur console.

### 5.4 Vérifications manuelles

- Parcours clavier complet sur les six étapes.
- Vérification des labels, du focus et des messages d’erreur.
- Rendu à 390, 736 et 1440 px.
- Impression de la synthèse en mode paysage et portrait.
- Lighthouse mobile sur `/` et `/dossier-projet`, score performance et
  accessibilité supérieur ou égal à 90.

## 6. Critères de réussite

1. La route `/dossier-projet` répond au clic et au rechargement.
2. Un apprenant peut remplir les six étapes, revenir en arrière,
   recharger la page et retrouver ses réponses.
3. Les douze livrables et les six critères sont présents.
4. Le badge n’apparaît que lorsque le dossier est complet et disparaît
   si un élément manque.
5. Le compteur `0/9` et l’XP restent inchangés.
6. L’impression et l’export produisent un dossier lisible.
7. Aucune requête externe, aucune erreur console, aucune requête en
   échec.
8. `npm test`, le lint, le typecheck et le build passent.
9. Le smoke Playwright passe sur toutes les routes.
10. Lighthouse mobile reste supérieur ou égal à 90 sur l’accueil et la
    nouvelle route.
11. Le build est déposé dans Docker après validation explicite, avec
    changelog et version libre.

## 7. Limites et risques

- Le badge est déclaratif : l’application ne vérifie pas le contenu du
  dossier et ne délivre aucune certification.
- Le stockage local peut être vidé par le navigateur ; l’export est la
  seule sauvegarde externe.
- L’absence d’import de dossier est assumée dans ce lot.
- Une nouvelle route augmente la surface de test, de SEO et de PWA ;
  elle est couverte par le smoke et le sitemap.
- Les champs sont volontairement courts pour éviter un formulaire lourd
  et un stockage excessif.
- Le capstone ne remplace pas les neuf modules : il les assemble.

## 8. Livraison

Le code source reste non commité sauf demande explicite, conformément
aux consignes du projet. Le build est déposé dans
`D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/` uniquement
après smoke et Lighthouse validés, avec une entrée de changelog et un
seul push. Les modifications non liées `explorons_l_ia` du dépôt Docker
ne sont ni touchées ni stagées.

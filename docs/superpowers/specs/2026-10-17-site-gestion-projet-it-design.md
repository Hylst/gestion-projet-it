# Design : site interactif Gestion de Projet IT (v1)

Date : 2026-10-17. Auteur du design : Geoffroy, avec assistance IA.
Source de verite : `cahier_des_charges.md` (regles de contenu, gabarit,
contenus rediges v1) et `agents.md` (stack, CSP, autonomie assets,
visa qualite). Aucun de ces deux fichiers n'est modifie par ce design ;
les corrections de texte du CDC sont listees dans la section 9.

## 1. Decisions cadre (validees par l'utilisateur)

- Perimetre du plan : v1 detaillee en 8 jalons, modules A/B/C v2 en
  feuille de route seule.
- Animations : riches partout (hero SVG anime en continu, revelation
  au scroll sur chaque section, transitions de page, micro
  interactions), sans librairie, respect obligatoire
  `prefers-reduced-motion`.
- Recherche : oui, champ simple dans l'entete, filtre cote client sur
  titres de modules et de sections.
- Charte : dediee sobre, fond clair, uniquement pile `system-ui`,
  zero fichier de police.
- Architecture : approche 1, gabarit React type, contenu en
  TypeScript, labos SVG en composants dedies.

## 2. Vision en une phrase

Un cours en 6 modules ou l'apprenant manipule un WBS, un GANTT, un
Kanban et une matrice Eisenhower, progresse avec des XP et acquiert
des reflexes de gestion de projet, dans une SPA sans compte qui
fonctionne hors ligne.

## 3. Architecture technique

- Vite + React 18 + TypeScript strict ; aucune dependance UI externe
  (pas de librairie d'animation, pas de librairie de graphiques).
- Routing : react-router-dom, `basename="/gestion-projet-it/"`.
- Build : `vite build --base=/gestion-projet-it/`.
- Interactions clavier : ecouteurs attaches dans les composants,
  aucun handler inline (CSP `script-src 'self'`).

### 3.1 Arborescence

```
src/
  main.tsx                 montage React, basename
  App.tsx                  routes, layout global, provider progression
  routes/
    accueil.tsx            hero anime, cartes modules, recherche
    modules/[1-6].tsx      enrobe ModuleLayout, contenu du module
    apropos.tsx            paternite, licence AGPL, fil rouge
    NotFound.tsx
  components/
    ModuleLayout.tsx       gabarit conforme a l'ordre CDC section 10
    LaboFrame.tsx          socle commun des labos SVG
    ProgressHeader.tsx     XP, niveau, badge, export/import JSON
    SearchBar.tsx          filtre client
    ExerciseBlock.tsx      details/summary corrige
    QuizBlock.tsx          3 questions, corrige immediat, +10 XP
    FicheReflexe.tsx       5 items, bouton imprimer
    ModuleEnd.tsx          bouton termine, +20 XP, badge
    SeoHead.tsx            canonical + og par route
    Footer.tsx             paternite, licence, lien hub
  labos/                   un composant par labo, 10 au total
    LaboWbs.tsx
    LaboGanttPert.tsx
    LaboPhases.tsx
    ComparateurMethodes.tsx   onglets a trois entrees, sans notation
    LaboKanban.tsx
    PokerPlanning.tsx
    LaboSelecteurOutil.tsx
    LaboChaineCI.tsx
    LaboEisenhower.tsx
    LaboRisques.tsx
  modules/
    index.ts               metadonnees des 6 modules et des A/B/C
    m1-wbs/                fiche.tsx, exercice.tsx, quiz.ts, ficheReflexe.ts
    m2-planif/             idem plus donnees fil rouge
    m3-methodes/           idem (integre la correction du CDC ligne 324)
    m4-agiles/             idem
    m5-outils/             idem
    m6-equipe/             idem
  lib/
    storage.ts             acces localStorage securise, cles
                           gestion-projet-it:*
    xp.ts                  XP, niveaux, badges, gain unique par quiz
    search.ts              index des titres et ancres de sections
    anim.ts                hooks useInView, useReducedMotion, rAF
    seo.ts                 canonical construit depuis location.href
  styles/
    index.css              tokens charte, base, typographie
    reveal.css             classes d'animation au scroll
    print.css              impression de la fiche reflexe
public/
  favicon.svg, icones pwa, manifest.webmanifest, offline.html,
  robots.txt, sitemap.xml
```

### 3.2 Gabarit d'un module (ordre du CDC section 10)

1. Titre, mention 5 minutes, progression du module en haut de page.
2. Fiche : definition, rubrique a quoi ca sert, rubrique quand
   l'utiliser, avantages, limites, cas d'usage. Pas de dogme, aucune
   ecole presentee comme superieure.
3. Exemple vecu du fil rouge (association fictive Les Amis du
   Square), deux exemples passes par module comme dans le CDC
   section 15.
4. Demarche en 5 gestes, liste numerotee.
5. Labo SVG (contrat commun en section 4).
6. Exercice corrige sur le fil rouge : enonce, corrige masque via
   details/summary, methode reusable.
7. Quiz 3 questions : corrige immediat par question, +10 XP des 2/3,
   un seul gain par cle de quiz, bouton recommencer sans XP.
8. Fiche reflexe imprimable : 5 items actionnables a l'imperatif.
9. Bouton termine : +20 XP et badge du module.

## 4. Labs SVG (contrat commun)

- `LaboFrame` fournit le socle : titre, consigne, compteur des 6
  etapes de chaque labo du CDC section 15, bouton verifier, bouton
  reinitialiser, zone SVG accessible (focusable, role application
  applique seulement si la spec le demande), sous-titre en aria-live
  polite qui decrit l'etat.
- Interaction : souris et clavier complets (tabulation pour prendre,
  fleches pour deplacer ou reordonner, entree pour deposer ou
  relier), focus visible sur chaque element interactif.
- Etat local en `useReducer`, types TypeScript stricts, logique de
  labo isolee du rendu (fonctions pures testables par vitest).
- Animation : transitions CSS pour les deplacements,
  `requestAnimationFrame` seulement pour glisser une barre de GANTT
  et animer des compteurs, boucles desactivees quand
  `prefers-reduced-motion: reduce`.
- Feedback d'erreur explicite et sans piege : exemple attendu,
  message de depot refuse quand la colonne En cours depasse la limite
  WIP de 2 cartes; apres plusieurs erreurs, un indice issu du CDC est
  propose sans livrer tout le corrige.
- XP : +5 la premiere fois (cle unique par labo), rejouable ensuite
  sans gain.
- SVG inline dans le JSX, viewBox fixe, palette des tokens de la
  charte, textes en francais, alternative accessible par legende
  textuelle sous le labo.

### 4.1 Liste des 10 labos

| Labo | Module | Source CDC | Interactions cle |
|---|---|---|---|
| LaboWbs | 1 | 15.1 | 8 cartes vers 3 lots, 2 hors perimetre, 1 oubliee, bouton verifier |
| LaboGanttPert | 2 | 15.2 | 5 barres deplacables, dependances en alerte, bascule vue PERT, chaine tendue surlignee |
| LaboPhases | 3 | 15.3 | 6 livrables vers leur phase, consigne cycle en V ou cascade |
| ComparateurMethodes | 3 | 15.3 | trois entrees : cycle en V, cascade, Agiles (avantages, limites, cas) |
| LaboKanban | 4 | 15.4 | 6 cartes, WIP En cours de 2, compteur de blocages |
| PokerPlanning | 4 | 15.4 | estimer 5 stories puis comparer a la correction fictive |
| LaboSelecteurOutil | 5 | 15.5 | 3 besoins, outil suggere, motif affiche, limite rappelee |
| LaboChaineCI | 5 | 15.5 | ordonner test, assemblage, relecture, deploiement |
| LaboEisenhower | 6 | 15.6 | 6 taches vers 4 quadrants, motif court par quadrant |
| LaboRisques | 6 | 15.6 | 6 risques sur probabilite x impact, priorites calculees, parade a choisir |

## 5. Charte graphique et animations

- Tokens dans `styles/index.css` : `--c-bg` #fafaf7, `--c-ink`
  #14161f, `--c-main` #1d4ed8, `--c-soft` #fef3c7, `--c-calm`
  #a7c4b5, `--c-line` #e5e7eb. Fond clair, pas de mode sombre en v1,
  contrastes AA verifies sur chaque couple texte et fond.
- Typographie : pile system-ui, aucun fichier de police.
- Hero de l'accueil : SVG anime en continu en trois tableaux du fil
  rouge (barres de GANTT qui avancent en boucle, colonnes de Kanban
  qui se remplissent, angles du cycle en V qui se tracent), boucle
  uniquement en CSS `keyframes`, aucune boucle JavaScript donc aucun
  deplacement React pendant l'animation.
- Revelation au scroll : hook `useInView` ajoute la classe `visible`
  une seule fois (option once, ratio 0.2), translation et opacite
  appliquees aux sections et cartes situees sous le pli, delaiscales
  de quelques dizaines de millisecondes entre elements soeurs.
- Transitions de route : opacite et translateY de 6 px a l'entree de
  page, 0.25 s, sortie instantanee, sans librairie.
- Micro interactions : cartes de modules en echelle 1.02 et ombre
  douce au survol, boutons en transition 0.15 s, focus visible de
  2 px dans la couleur d'accent.
- Media query `prefers-reduced-motion: reduce` : aucune animation
  d'entree, survol sans translation, labos coupent leurs boucles rAF
  et affichent les valeurs finales directement.

## 6. Recherche dans l'entete

- Champ avec label explicite (id `search-input`, label « Rechercher
  dans le cours »), index construit par `search.ts` a partir de
  `modules/index.ts` (titre de module, titre de section, quelques
  mots cles par section).
- Resultats en liste de liens ancrees vers les sections (fiche, labo,
  exercice, quiz, reflexe), aucune regeneration de page.
- Navigation clavier : fleche bas pour parcourir, entree pour
  ouvrir, echap pour fermer, annonces en aria-live polite.

## 7. Progression, XP, PWA, SEO

- Cles `localStorage` : `gestion-projet-it:xp`,
  `gestion-projet-it:quiz:done:<id>`,
  `gestion-projet-it:laboratoire:done:<id>`,
  `gestion-projet-it:module:done:<id>`.
- Export et import JSON en un clic depuis `ProgressHeader`, format
  versionne (`version: 1`).
- XP du CDC section 14 : quiz +10 des 2/3, labo +5, module termine
  +20. Niveaux : Curieux 0, Organisateur 50, Capitaine 120,
  Chef de projet 200. Badge Termine par module.
- PWA : `manifest.webmanifest` (scope `/gestion-projet-it/`, theme
  #fafaf7, icones 192 et 512 locales), `offline.html` en noindex,
  service worker limite au dossier du module.
- SEO : `SeoHead` insere title, description, canonical et og:url
  derives de `window.location.href` sur chaque route.
- Sitemap en 8 URL (accueil, 6 modules, a propos) minimum, plus
  `robots.txt` avec lien vers le sitemap.

## 8. Tests et verrou de depot

- vitest : `xp.ts` (gain des 2/3, gain unique par quiz, niveaux),
  `storage.ts` (cles, valeurs manquantes, localStorage indisponible),
  `search.ts` (filtrage sans casse et accents), reducers purs des
  labos (WIP kanban, ordre de la chaine CI, quadrants Eisenhower).
- Playwright smoke exige par agents.md : 8 routes ouvertes par clic
  depuis l'accueil puis par rechargement direct, zero erreur console,
  zero requete echouee, zero requete externe.
- Lighthouse accueil mobile : performance et accessibilite au
  minimum 90, animations concues pour rester legere.
- Verrou de depot : tous les tests au vert, build verifie, avant
  depot du build dans
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/`.

## 9. Corrections du CDC au passage des modules

- Ligne 324 du CDC (corrige de l'exercice 1 du module 3, cas 2) :
  la phrase est corrompue et devra etre reecrite proprement au sens
  attendu : besoin flou, ni le cycle en V ni la cascade ne conviennent
  seuls, cadrer d'abord par maquette ou par lot court. La reecriture
  sera appliquee au fichier CDC au moment du module 3.
- Rappels a conserver dans tout contenu : aucun chiffre sans source,
  aucune methode presentee comme superieure, francais sobre, aucun
  tiret cadratin, outils reels cites a titre informatif, exemples
  fictifs du fil rouge uniquement.

## 10. Jalons d'implementation du plan

- Jalon 0 (socle) : scaffold Vite + React + TypeScript, ESLint,
  vitest, tokens de charte, SeoHead, Footer, mise en page de base,
  aucune page de contenu.
- Jalon 1 (maquette validee) : accueil complet (hero anime, cartes
  modules, recherche), ModuleLayout complet, module 1 entier (fiche,
  fil rouge, demarche, LaboWbs, exercice corrige, quiz, fiche
  reflexe, XP et badge), smoke et Lighthouse au vert.
- Jalons 2 a 6 : un module entier par jalon, labos dedies selon la
  liste 4.1.
- Jalon 7 (finalisation) : apropos, offline.html, manifest, service
  worker, sitemap, robots, audit complet, build verifie, depot Docker
  avec carte hub et sitemap racine en un seul push.

## 11. Feuille de route v2 (hors v1, non engagee maintenant)

- Module A, parties prenantes et communication : carte des roles,
  plan de messages, rituel de point, labo : placer 6 roles fictifs.
- Module B, budget et chiffrage : lots valorises, hypothese ecrite
  par lot, marge d'alea fictive, labo : curseurs par lot avec alerte
  en cas d'oubli.
- Module C, conduite du changement : freins, messages, formation
  courte, relais, labo : frise avant apres avec 5 actions a ordonner.

Ces 3 modules restent hors du plan d'execution v1 : ils figurent
seulement dans `modules/index.ts` comme entrees marquees Bientot.

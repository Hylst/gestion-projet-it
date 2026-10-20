# Cycle graphismes : hero et pictos des modules

Date : 2026-10-20
Statut : design validé et exécuté le 2026-10-20.

## 1. Contexte et objectif

Le cycle socle design a posé la grille, la typographie et le header. Deux
manques graphiques restent, notés pendant ce cycle :

- le hero SVG est un bloc unique de 720 × 200 px : libellé Kanban qui
  chevauche le titre de colonne, texte illisible à 390 px et zone morte
  sous les panneaux ;
- les neuf modules n’ont aucun repère visuel sur l’accueil et les pages
  modules, seulement un numéro.

Objectifs :

1. Recomposer le hero en trois panneaux lisibles, sans chevauchement ni
   zone morte, avec un empilement mobile validé à 390 px.
2. Donner à chaque module un picto cohérent, présent sur sa carte et dans
   l’en-tête de sa page.
3. Conserver zéro dépendance, zéro asset externe et zéro texte de cours
   modifié.
4. Rester au-dessus de 90 en performance et accessibilité Lighthouse
   mobile.

## 2. Périmètre

### Inclus

- `src/routes/accueil.tsx` : hero en panneaux HTML, cartes avec picto et
  étiquette « Module N ».
- `src/components/ModulePicto.tsx` (nouveau) : neuf pictos SVG inline.
- `src/components/ModuleLayout.tsx` : picto dans l’en-tête de module.
- `src/styles/hero.css` : panneaux, cartes, animations adaptées.
- `src/styles/index.css` : styles du picto et de l’en-tête.
- `tests/hero.test.tsx` : assertions sur les trois panneaux.
- `tests/pictos.test.tsx` (nouveau) : rendu des neuf pictos, cartes,
  en-tête.

### Exclu

- Tous les textes de cours et résumés de modules.
- Les routes, le stockage local, la progression, les labos et les quiz.
- Le menu de recherche et son `min-width: 20rem` à 320 px.
- Les icônes PWA, `manifest.webmanifest`, `sitemap.xml`, `offline.html`.
- Le service worker : stratégie et version v3 inchangées.
- Toute image générée, tout raster, toute police ou icône externe.
- Toute nouvelle dépendance.

## 3. Décisions validées

Choix retenus dans le compagnon visuel :

1. Hero : triptyque consolidé, trois panneaux, empilement mobile.
2. Pictos : trait + un aplat doux, accents jaune et vert alternés.
3. Placement : cartes de l’accueil et en-tête de module.
4. Carte : picto et étiquette « Module N », pas de grand numéro isolé.
5. Motifs : les neuf proposés ont été validés.

## 4. Design détaillé

### 4.1 Hero

Structure JSX cible :

```tsx
<section className="hero reveal visible">
  <p className="kicker">Cours interactif gratuit, sans compte</p>
  <h1>Gérer un projet informatique, pas à pas</h1>
  <p className="accroche">…</p>
  <div className="hero-panels" role="group" aria-label="Trois vues du cours">
    <div className="hero-panel">
      <p className="hero-panel-titre">GANTT</p>
      <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">…</svg>
      <p className="hero-panel-legende">tâches, jalons, chaînes</p>
    </div>
    <div className="hero-panel">
      <p className="hero-panel-titre">Kanban</p>
      <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">…</svg>
      <p className="hero-panel-legende">limites de WIP</p>
    </div>
    <div className="hero-panel">
      <p className="hero-panel-titre">Cycle en V</p>
      <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">…</svg>
      <p className="hero-panel-legende">phases et tests en miroir</p>
    </div>
  </div>
  <p><Link className="btn" to="/module-1">Commencer par le module 1&nbsp;: cadrer et découper</Link></p>
</section>
```

Les ellipses des extraits représentent le contenu décrit juste après. Les
maquettes validées servent de référence visuelle :
`.superpowers/brainstorm/872099-1792451287/content/hero-refined.html`,
`picto-set.html` et `card-layout.html`.

Contenu des panneaux :

- GANTT : ligne « aujourd’hui » en pointillés, trois barres (bleu,
  vert calme, jaune doux), une dépendance fine, un jalon rond. Les deux
  premières barres portent les classes animées existantes.
- Kanban : trois colonnes, libellés SVG « À faire », « En cours »,
  « Fini », cartes internes avec les trois accents. Deux cartes portent
  les classes animées.
- Cycle en V : tracé en V bleu, ligne miroir en pointillés, deux ronds
  (jaune doux et vert calme). Le tracé porte la classe animée.

Styles :

- `.hero-panels` : grille `repeat(3, minmax(0, 1fr))`, écart `0.9rem`,
  marge `1.25rem 0`.
- `.hero-panel` : grille `"titre" "svg" "legende"`, fond
  `--c-surface`, bordure `--c-line`, rayon `--radius`, padding
  `0.75rem`, écart `0.35rem`.
- `.hero-panel-titre` : `0.7rem`, gras, majuscules, interlettrage
  `0.08em`, couleur `--c-muted`.
- `.hero-panel-legende` : `0.75rem`, couleur `--c-muted`.
- `.hero-panel-svg` : largeur 100 %, hauteur automatique, affichage
  bloc.
- À 680 px et moins : une colonne, grille `"titre legende" "svg svg"`,
  colonnes `auto 1fr`, écart `0.3rem 0.5rem`, panneaux plus rapprochés.
- À 480 px et moins : `.hero h1` à `2rem`, `.hero .accroche` à `1rem`.
- Supprimer `.hero-svg` et son `max-width` devenus inutiles.

Animations :

- Conserver les classes `gantt-bar`, `gantt-bar2`, `kan-1`, `kan-2`,
  `v-path`.
- Adapter les amplitudes au nouveau viewBox : translation Gantt de
  18 px maximum, `stroke-dasharray` du V à 220.
- `prefers-reduced-motion: reduce` coupe les animations et fixe l’état
  final lisible (barres visibles, cartes opaques, V tracé).

Accessibilité :

- Le groupe porte `role="group"` et
  `aria-label="Trois vues du cours"`.
- Chaque SVG est décoratif : `aria-hidden="true"` et
  `focusable="false"`.
- Les titres et légendes sont du texte HTML visible, donc lus par les
  lecteurs d’écran.
- Aucun focusable ajouté, aucun ordre de tabulation modifié.

### 4.2 Pictos

Composant :

```tsx
export function ModulePicto(props: { num: number }) {
  const contenu = PICTOGRAMMES[props.num];
  if (!contenu) return null;
  return (
    <svg className="module-picto" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {contenu}
    </svg>
  );
}
```

`PICTOGRAMMES` est un record de 1 à 9 contenant des fragments JSX. Le
composant ne prend aucun état, ne fait aucun rendu conditionnel autre
que le numéro inconnu.

Motifs et accents :

| Module | Motif | Aplat |
| --- | --- | --- |
| 1 | Arbre WBS, racine et trois enfants | jaune sur la racine |
| 2 | Trois barres Gantt sur un axe | vert sur la barre du haut |
| 3 | V avec deux ronds en miroir | jaune sur le rond gauche |
| 4 | Trois colonnes Kanban | vert sur une carte |
| 5 | Deux nœuds reliés par une flèche | jaune sur le nœud gauche |
| 6 | Matrice Eisenhower 2 × 2 | vert sur le quadrant haut gauche |
| 7 | Trois nœuds en réseau | jaune sur un nœud |
| 8 | Trois pièces empilées | vert sur la pièce du haut |
| 9 | Flèche circulaire de changement | jaune sur la pointe |

Style :

- `viewBox="0 0 24 24"`, trait `1.8`, `stroke-linecap: round`,
  `stroke-linejoin: round`, `fill: none`, `stroke: currentColor`.
- Accents par classes : `.picto-soft { fill: var(--c-soft); }` et
  `.picto-calm { fill: var(--c-calm); }`.
- Les aplats sans contour portent aussi `.picto-plat { stroke: none; }`.
- Taille par défaut 30 px, `flex: 0 0 auto`.
- Transition de couleur `0.2s ease` ; au survol d’une carte, le trait
  passe à `--c-main`.

### 4.3 Cartes de l’accueil

Structure :

```tsx
<div className="module-card">
  <div className="module-card-head">
    <ModulePicto num={m.num} />
    <span className="module-kicker">Module {m.num}</span>
  </div>
  <Link className="titre" to={`/${m.slug}`}>{m.titre}</Link>
  <p className="resume">{m.resume}</p>
</div>
```

Styles :

- `.module-card-head` : rangée, `align-items: center`, écart `0.55rem`.
- `.module-kicker` : `0.7rem`, gras, majuscules, interlettrage
  `0.08em`, couleur `--c-main`.
- Le grand `.num` et sa règle CSS sont retirés.
- La carte garde sa hauteur, son padding, son survol et son lien
  titre. Le picto ne reçoit jamais le focus.

### 4.4 En-tête de module

Structure :

```tsx
<header className="module-head">
  <div className="module-head-row">
    <ModulePicto num={meta.num} />
    <div className="module-head-texte">
      <p className="kicker">Module {meta.num} - 5&nbsp;minutes de lecture par fiche</p>
      <h1>{meta.titre}</h1>
      <p>{meta.resume}</p>
    </div>
  </div>
  <nav aria-label="Sommaire du module" className="sommaire">…</nav>
</header>
```

Styles :

- `.module-head-row` : `display: flex`, `align-items: flex-start`,
  écart `1rem`.
- `.module-head-row .module-picto` : 44 × 44 px, marge haute `0.2rem`.
- `.module-head-texte` : `min-width: 0`.
- Le sélecteur du résumé devient
  `.module-head-texte > p:not(.kicker)`.
- À 600 px et moins : écart `0.75rem`, picto 36 × 36 px.
- Le sommaire reste sous la rangée, inchangé.

## 5. Architecture et flux

- Aucun état nouveau, aucun effet, aucune requête.
- `ModulePicto` reçoit uniquement le numéro du module, déjà présent
  dans `MODULES` et `ModuleMeta`.
- Le hero est statique ; les seules animations sont CSS.
- Les neuf pictos sont du JSX inline, donc inclus dans le bundle et
  disponibles hors ligne sans requête supplémentaire.
- Aucun fichier public, aucun service worker, aucun manifest touché.

## 6. Cas limites et erreurs

- Numéro inconnu : `ModulePicto` retourne `null`, sans exception.
- Titre long : la rangée d’en-tête laisse le titre se replier
  (`min-width: 0`), le picto ne se comprime pas.
- 320 à 390 px : pas de débordement horizontal ; les panneaux et
  l’en-tête s’empilent.
- Animations : état final lisible si `prefers-reduced-motion`.
- Le menu de recherche reste hors périmètre, même à 320 px.

## 7. Tests et critères d’acceptation

### Tests unitaires

- `tests/hero.test.tsx` : la section `.hero` existe ; trois
  `.hero-panel` ; les titres GANTT, Kanban, Cycle en V ; les trois
  légendes ; chaque SVG de panneau est `aria-hidden`.
- `tests/pictos.test.tsx` : les numéros 1 à 9 rendent un
  `svg.module-picto` ; l’accueil contient neuf pictos et neuf
  étiquettes « Module N » ; `ModuleLayout` rend le picto dans
  `.module-head-row`.
- `tests/typo.test.tsx` : inchangé, doit rester vert avec le nouveau
  texte « Module N ».
- Total attendu : 144 tests (141 existants, 1 hero étendu, 3 pictos).

### Vérifications manuelles et E2E

- Captures accueil et module 1 à 1440, 736 et 390 px.
- Contrôle visuel du chevauchement Kanban, de la lisibilité mobile et
  de l’absence de zone morte.
- Smoke 7/7, 12 routes, zéro requête externe, zéro erreur console.
- Lighthouse mobile accueil et module 1 : performance et accessibilité
  supérieures ou égales à 90.
- Navigation clavier et focus visibles inchangés.
- `prefers-reduced-motion` vérifié.

### Livraison

- Lint, typecheck, tests, build.
- Synchronisation du build vers le dossier plateforme, commit et push,
  puis vérification en production selon le rituel existant.
- Le service worker reste en v3 ; les nouveaux assets hachés sont mis
  en cache à la première visite.

## 8. Hors périmètre

- Le correctif du menu de recherche à 320 px.
- Les contenus, laboratoires, quiz et exercices.
- Les images générées et les schémas internes des modules.
- Les icônes PWA, le manifest, le sitemap et la page hors ligne.
- Toute nouvelle dépendance ou police.

## 9. Risques et parades

- Hauteur du hero en mobile : validée à 390 px ; si la mesure réelle
  dépasse nettement la maquette, réduire le padding des panneaux avant
  de toucher aux SVG.
- Pictos trop chargés à 30 px : traits de 1,8 et pas plus de six
  formes par motif ; contrôle visuel à 1× et en capture retina.
- Contraste des aplats : décoratifs, jamais porteurs d’information
  seuls ; le titre et le texte restent la source.
- Typographie : toute nouvelle chaîne visible est contrôlée par la
  garde existante ; aucun tiret cadratin, aucune apostrophe droite.

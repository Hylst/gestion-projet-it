# Socle design du site : design validé

Date : 2026-10-19
Statut : design validé par l’utilisateur, en attente de relecture du spec.

## Amendements en exécution

Ces amendements consignent les écarts constatés pendant l’exécution. Le corps du spec reste l’état validé initial.

- Header : point de rupture à 70rem, et non 68rem ou 56rem. La disposition sur une rangée et le `position: sticky` ne s’appliquent qu’à partir de 70rem ; en dessous, le header reste statique et empilé. L’écart `0.75rem 1rem` et la recherche à `10rem` permettent de tenir sur une rangée.
- Ancres : `#contenu, main [id] { scroll-margin-top: 5.5rem; }` est appliqué dès la Task 2, dans le même bloc média que le header sticky. Aucun décalage n’est appliqué sous 70rem, les ancres sont donc différées sur mobile.
- Tests : le total passe à 139 après les lots, puis à 140 avec le test de non-recéation de l’observateur.
- Smoke : 7 tests avec la garde d’impression de la fiche réflexe.
- Impression : correctif `body.printing-fiche .module-page > :not(:has(#reflexe))` approuvé par l’utilisateur. Il lève la contrainte « `print.css` inchangé » pour corriger la fiche réflexe blanche, car le sélecteur précédent masquait l’enveloppe `.reveal` contenant `#reflexe`.

## 1. Contexte et objectif

Le site fonctionne, mais son habillage est incomplet :

- `SiteHeader.tsx` utilise `.site-header`, `.brand`, `.logo-mark` et
  `#header-tools` sans aucune règle CSS : marque et navigation collées,
  outils qui débordent (le bouton « Importer » passe à la ligne).
- `hero.css` cible `.hero h1` et `.hero .accroche`, mais la section
  d’accueil n’a jamais la classe `hero` : titres d’accueil en taille par
  défaut. Le bloc `.panels` est du CSS mort.
- `.kicker` et `.module-head` ne sont pas stylés.
- Les titres h1 à h3 n’ont pas d’échelle : tailles par défaut du
  navigateur.
- `Reveal` (seuil 0.2, sans fallback) laisse des blocs invisibles sur
  les captures pleine page et dépend entièrement de
  `IntersectionObserver`.
- Le pied de page est un paragraphe brut.

Objectifs :

1. Un header lisible et sticky, desktop et mobile, sans débordement.
2. Un rythme typographique homogène et des sections clairement
   séparées sur tout le site.
3. Corriger les sélecteurs morts de l’accueil.
4. Un `Reveal` robuste qui ne masque jamais durablement du contenu.
5. Zéro texte modifié : la garde typographique reste la référence.
6. Poser le socle visuel avant le cycle graphismes (SVG, images).

## 2. Périmètre

### Inclus

- `src/styles/index.css` : header, kicker, module-head, séparateurs de
  sections, footer, ancres, échelle de titres.
- `src/styles/hero.css` : fix sélecteurs accueil, suppression du bloc
  mort `.panels`.
- `src/components/SiteHeader.tsx` : conteneur `.header-inner`, marque
  cliquable vers `/`.
- `src/routes/accueil.tsx` : ajout de `className="hero"` sur la
  section d’accueil.
- `src/lib/anim.ts` et `src/components/Reveal.tsx` : fallback et
  déclenchement anticipé.
- `tests/anim.test.tsx` : nouveaux tests du hook.

### Exclu

- Tous les textes visibles (déjà validés par le cycle typographique).
- `src/styles/print.css`, `public/sw.js`, `public/manifest.webmanifest`,
  `public/sitemap.xml`, `public/offline.html` : inchangés.
- Le markup des pages glossaire et à propos : le socle CSS les couvre
  sans édition.
- Les dépendances : aucune nouvelle.
- Le dossier plateforme : resynchronisation seulement après validation
  finale, sans git.
- Le cycle graphismes (icônes, schémas, images générées) : cycle
  ultérieur.

## 3. Design détaillé

### 3.1 Header

Structure (`SiteHeader.tsx`) :

- `header.site-header` : pleine largeur, `position: sticky; top: 0`,
  fond opaque `--c-surface`, bordure basse `--c-line`, `z-index: 40`.
- Nouveau `div.header-inner` : conteneur `--maxw`, `display: flex`,
  `flex-wrap: wrap`, `align-items: center`, `gap: 0.75rem 1.5rem`,
  padding `0.75rem 1.25rem`.
- `.brand` devient une rangée : skip-link conservé en premier, hors
  lien ; pastille, nom et sous-titre regroupés dans un `Link` vers `/`
  (classe `brand-link`).

Marque :

- `.logo-mark` : pastille 2rem, rayon 8px, dégradé `--c-main` vers
  `--c-calm` ; le `span` interne devient le point clair centré.
- Nom en 1rem/600 ; `.brand-sub` en 0.75rem `--c-muted`, sous le nom.

Navigation :

- Desktop (≥ 56rem) : `nav { margin-left: auto; display: flex; }`,
  liens en pastilles : padding `0.4rem 0.7rem`, rayon 6px,
  espacement `0.25rem`, hover fond `--c-bg`.
- Page courante via `aria-current="page"` (posé par `NavLink`) : fond
  `--c-main`, texte blanc.
- `#header-tools` : `display: flex; align-items: center; gap: 0.5rem;
  flex-wrap: wrap;` après la nav.

Outils :

- Recherche : `min(18rem, 100%)` ; liste déroulante inchangée.
- Chips XP / niveau compactes, alignées à droite.
- Mobile (< 56rem) : empilement marque, nav (wrap), outils ;
  recherche pleine largeur, chips en dessous ; plus de débordement
  « Importer ».

### 3.2 Rythme et en-têtes

- Échelle : `h1 { font-size: clamp(1.9rem, 1.5rem + 2vw, 2.4rem); }`,
  `h2 { font-size: clamp(1.35rem, 1.15rem + 1vw, 1.6rem); }`,
  `h3 { font-size: 1.1rem; }`.
- `h2` : marge haute 2.2rem, basse 0.6rem. Paragraphes et listes :
  marges 0.55rem.
- `.kicker` : 0.78rem, poids 600, majuscules CSS, letter-spacing
  0.07em, couleur `--c-main`, marge `0.1rem 0 0.3rem`.
- `.module-head` : marges `2.25rem 0 1.75rem` ; h1 compact ; résumé en
  `--c-muted`, largeur max 65ch ; sommaire inchangé (chips déjà
  stylées).

### 3.3 Séparateurs de sections

Les sept blocs de chaque module sont des `section` enveloppées dans
`.reveal` (enfants directs de `.module-page`), donc :

```css
.module-page > .reveal + .reveal {
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--c-line);
}
```

Uniforme pour Fiche, Fil rouge, Démarche, Labo, Exercice, Quiz,
Fiche réflexe.

### 3.4 Accueil

- Ajout de `className="hero"` sur la section d’accueil : active les
  règles existantes (h1 2.2rem, accroche, svg plafonnée à 46rem).
- Suppression du bloc mort `.panels` dans `hero.css`.
- Cartes modules : déjà stylées, inchangées.

### 3.5 Footer

- `border-top: 1px solid var(--c-line); margin-top: 3rem;
  padding-top: 1.25rem;` ; texte 0.85rem `--c-muted` ; liens en
  `--c-main`. Structure JSX inchangée.

### 3.6 Ancres

- `main [id] { scroll-margin-top: 5rem; }` pour que le sommaire, le
  glossaire et les liens internes ne se collent pas au header sticky.

### 3.7 Comportement Reveal

`anim.ts` :

- Si `typeof IntersectionObserver === 'undefined'`, `setVisible(true)`
  immédiatement et sortie de l’effet (jamais de contenu masqué).
- Nouvelle option `rootMargin?: string` transmise à
  `new IntersectionObserver(cb, { threshold, rootMargin })`.
- Dépendances de l’effet sur les primitives (`options?.once`,
  `options?.threshold`, `options?.rootMargin`) au lieu de l’objet,
  pour ne pas recréer l’observer à chaque rendu.

`Reveal.tsx` :

- Appel `useInView(ref, { once: true, threshold: 0.1,
  rootMargin: '0px 0px 80px 0px' })` : déclenchement juste avant
  l’entrée dans le viewport.

### 3.8 Contraintes

- Aucune nouvelle dépendance, aucun commentaire de code, aucun asset.
- `print.css` masque déjà le header et force `.reveal` visible : rien
  à modifier.
- PWA : `sw.js` en stratégie runtime ; les assets hashés changent de
  nom et sont re-cachés à la volée. Aucune modification de `sw.js`.
- Contraste : blanc sur `--c-main` (`#1d4ed8`) conforme AA.

## 4. Découpage en lots

Chaque lot : tests d’abord quand du comportement change, puis lint,
typecheck, tests, build, smoke pour le lot de contenu. Commit par lot
seulement avec l’accord explicite de l’utilisateur.

- **Lot 0, Reveal robuste** : tests rouges dans
  `tests/anim.test.tsx` (fallback sans interface, `rootMargin`
  transmis, pas de recréation), puis `anim.ts` et `Reveal.tsx`.
- **Lot 1, header** : `SiteHeader.tsx` et règles CSS header dans
  `index.css`.
- **Lot 2, rythme et pages** : échelle de titres, kicker,
  module-head, séparateurs, footer, ancres, fix `hero` dans
  `accueil.tsx` et `hero.css`.
- **Lot 3, vérification finale** : gates complètes, Lighthouse
  mobile, captures avant/après, puis resynchronisation du build vers
  le dossier plateforme, avec accord, sans git.

## 5. Tests et vérification

`tests/anim.test.tsx`, nouveaux cas :

- Sans `IntersectionObserver` global : le hook rend `true`
  immédiatement (le mock de `tests/setup.ts` est retiré puis
  restauré dans le test).
- Avec un mock instrumenté : `rootMargin` et `threshold` sont bien
  reçus par le constructeur.
- Non-régression : montée en visibilité et déconnexion `once`
  conservées.

Vérification finale :

```text
npm run lint
npm run typecheck
npm test
npm run build
npm run smoke
```

Lighthouse mobile sur l’accueil et le module 6, avec
`MSYS_NO_PATHCONV=1` et le serveur de preview au base path du site.
Captures desktop et mobile (accueil, module 6) pour validation
visuelle avant commit final.

## 6. Critères d’acceptation

1. Header sticky stylé, sans débordement, desktop et mobile ; état
   courant visible sur le lien actif.
2. Le h1 et l’accroche de l’accueil reprennent les tailles du design
   (classe `hero` effective).
3. Les sept blocs de module sont séparés par un filet uniforme.
4. Les liens d’ancre ne passent pas sous le header sticky.
5. `Reveal` est visible sans `IntersectionObserver` et se déclenche
   légèrement avant l’entrée dans le viewport.
6. Aucun texte modifié : garde typographique verte sans changement.
7. Lint, typecheck, tests, build et smoke passent.
8. Lighthouse mobile reste supérieur ou égal à 90 sur les pages
   vérifiées.
9. `sw.js`, manifest et offline restent byte-identiques.
10. Le dossier plateforme n’est mis à jour qu’après validation finale,
    sans git.

## 7. Risques et parades

- **Header sticky et ancres** : parade par `scroll-margin-top` ;
  vérifié par navigation sommaire et lien glossaire.
- **Sticky et impression** : `print.css` masque déjà le header.
- **Perf et a11y** : impact CSS pur, sans image ni police ; focus et
  contrastes existants conservés ; Lighthouse re-vérifié.
- **Tests jsdom** : le fallback est testé en retirant explicitement le
  mock global ; restauration dans le même test.
- **Débordements mobiles** : captures mobile avant/après, plus smoke
  au rechargement.
- **Diff visuel étendu** : lots séparés (Reveal, header, pages) pour
  garder des révisions lisibles.

# Menu des 17 sections : conception

Date : 9 novembre 2026
Statut : livré le 9 novembre 2026.
Périmètre : en-tête du site, navigation principale, styles responsive et tests du menu.

## 1. Contexte et objectif

Le header actuel contient 8 liens : Accueil, IA, Sécurité, À propos, Glossaire,
Ressources, Outils et Dossier projet. Les 9 modules ne figurent pas dans la
navigation principale. Le total des sections visibles est donc de 17 : 8 liens
transverses et 9 modules.

Sur mobile, les 8 liens se replient sur 3 lignes. Le header occupe environ
344 px de haut. Sur desktop, il occupe environ 145 px et la recherche ainsi que
la progression passent sous les liens. Le besoin exprimé est de garder les 17
noms sur une seule ligne, avec un défilement horizontal sur ces noms.

Objectifs :

1. Afficher les 17 entrées dans l'ordre du parcours.
2. Garder le ruban sur une seule ligne, sans retour à la ligne.
3. Permettre le défilement horizontal au doigt, à la molette horizontale, au
   trackpad et au clavier.
4. Rendre l'entrée active visible automatiquement, y compris sur les routes
   profondes comme `/module-9` ou `/ia/gouvernance`.
5. Ne provoquer aucun débordement horizontal du document à 320 px.
6. Conserver la recherche, la progression et l'export dans la première ligne,
   séparés des 17 noms.

## 2. Approches considérées

### Approche A, ruban dédié sous la barre de marque

La première ligne garde la marque, la recherche et la progression. La seconde
ligne est un ruban pleine largeur avec les 17 entrées, sans retour à la ligne
et avec défilement horizontal, dégradés aux bords et lien actif ramené dans la
vue.

Avantages : les 17 noms restent lisibles, le header ne se replie plus sur trois
lignes, la navigation est séparée des outils, et le comportement est identique
sur desktop et sur mobile. Le header devrait rester autour de 115 px sur
desktop, donc plus court que les 145 px actuels.

Inconvénient : une ligne de plus sur desktop, compensée par la suppression des
replis actuels.

### Approche B, ruban dans la rangée actuelle

La marque, les 17 entrées et les outils restent dans une seule rangée. Le ruban
prend l'espace restant et défile.

Avantage : moins de hauteur sur les très grands écrans.

Inconvénients : le ruban est comprimé entre la marque et la recherche, les
outils passent encore sous les liens sur les largeurs moyennes, et le nombre
d'entrées visibles simultanément devient très faible. Le comportement est plus
fragile sur les écrans de 1280 px.

### Décision

L'approche A est retenue. Elle correspond au besoin de garder les 17 noms sur
une ligne tout en laissant la recherche et la progression utilisables.

## 3. Les 17 entrées

Ordre retenu :

1. Accueil, `/`
2. Module 1 · Cadrer et découper, `/module-1`
3. Module 2 · Planifier, `/module-2`
4. Module 3 · Méthodes, `/module-3`
5. Module 4 · Agiles, `/module-4`
6. Module 5 · Outils et CI/CD, `/module-5`
7. Module 6 · Équipe et risques, `/module-6`
8. Module 7 · Parties prenantes, `/module-7`
9. Module 8 · Budget, `/module-8`
10. Module 9 · Changement, `/module-9`
11. Dossier projet, `/dossier-projet`
12. IA, `/ia`
13. Cybersécurité, `/cybersecurite`
14. Fiches outils, `/outils`
15. Glossaire, `/glossaire`
16. Ressources, `/ressources`
17. À propos, `/a-propos`

Le libellé « Fiches outils » évite le doublon avec le module 5. Le libellé
« Cybersécurité » remplace « Sécurité » pour être explicite.

Les libellés courts des modules viennent d'un nouveau champ `navLabel` dans
`ModuleMeta`. Le titre complet reste disponible dans l'attribut `title` du
lien. Le texte visible sert de nom accessible, sans `aria-label` qui
remplacerait le libellé.

## 4. Structure et comportement

### 4.1 Structure du header

```text
<header class="site-header">
  <div class="header-inner">
    marque, recherche, progression, export et import
  </div>
  <div class="header-nav-wrap">
    <nav class="header-nav" aria-label="Navigation principale">
      <ul class="header-nav-list">
        17 liens
      </ul>
    </nav>
  </div>
</header>
```

Le ruban est un conteneur `overflow-x: auto` avec une liste `flex` et
`flex-wrap: nowrap`. La liste ne se replie jamais. Le document ne défile pas
horizontalement : seul le ruban défile.

### 4.2 État actif

Chaque lien calcule son état à partir de `useLocation`.

- Route exacte : `pathname === item.to`, avec `aria-current="page"`.
- Section IA ou Cybersécurité : `pathname === item.to` ou
  `pathname.startsWith(item.to + '/')`. Le hub exact reçoit
  `aria-current="page"`, une sous-page reçoit `aria-current="true"`.
- Le style actif s'applique à `[aria-current="page"]` et
  `[aria-current="true"]`.

### 4.3 Défilement et lien actif

Au changement de route, le ruban centre l'entrée active si elle est hors de la
zone visible. Le calcul utilise les rectangles du ruban et du lien, puis
`scrollTo` sur le ruban uniquement. La page ne doit pas défiler verticalement à
cause de cette opération.

Le comportement est `smooth` sauf si
`prefers-reduced-motion: reduce` est actif, auquel cas il est `auto`.

Les dégradés de bord indiquent qu'il reste du contenu. Ils sont masqués du côté
où le ruban est au début ou à la fin. Un `ResizeObserver` et l'événement
`scroll` mettent à jour cet état.

La barre de défilement reste fine et visible, pour conserver l'indication de
défilement. Le ruban utilise `scrollbar-width: thin` et un pouce discret.

### 4.4 Clavier et tactile

- Les 17 liens restent des liens natifs, tabulables dans l'ordre visuel.
- Le focus visible est conservé et ne doit pas être coupé par le conteneur.
- Le défilement tactile utilise `overflow-x: auto`, `overscroll-behavior-x:
  contain` et `-webkit-overflow-scrolling: touch`.
- Aucun gestionnaire de molette verticale ne détourne le défilement de la page.
- Le ruban ne reçoit pas de `tabindex` supplémentaire, car il contient déjà des
  liens focusables.

### 4.5 Responsive et sticky

- Le header reste sticky à partir de 70rem, comme aujourd'hui.
- En dessous de 70rem, le header n'est pas sticky.
- La première ligne se replie sur mobile : la recherche prend la largeur, puis
  la progression et les boutons s'organisent dessous.
- Le ruban reste sur une ligne dans tous les cas.
- La valeur de `scroll-margin-top` des ancres est réévaluée après mesure du
  nouveau header sticky. Elle doit couvrir la hauteur du header plus une marge.
- Le header est masqué à l'impression, comme aujourd'hui.

## 5. Fichiers impactés

- `src/modules/index.ts` : ajout de `navLabel` aux 9 modules.
- `src/components/SiteHeader.tsx` : structure à deux lignes, liste des 17
  entrées, état actif, défilement du lien actif, dégradés de bord.
- `src/styles/index.css` : styles du ruban, de la première ligne, du responsive,
  du sticky et de `scroll-margin-top`.
- `src/styles/editorial.css` : ajustement des arrondis, des espacements et du
  fond du ruban.
- `tests/header.test.tsx` : 17 liens, ordre, libellés, états actifs.
- `tests/typo.test.tsx` : libellés accentués si nécessaire.
- `smoke/smoke.spec.ts` : ruban sur une ligne, défilement, absence de
  débordement à 320 px, lien actif visible sur route profonde.

Aucun nouveau fichier de composant n'est nécessaire. Aucune dépendance n'est
ajoutée.

## 6. Non-objectifs

- Aucun menu déroulant, aucun burger, aucune pagination JavaScript.
- Aucune nouvelle route, aucun changement de sitemap, de service worker ou de
  stockage.
- Aucun changement du contenu des modules, des sections IA et Cybersécurité, de
  l'accueil ou du dossier projet dans ce lot.
- Aucun changement du pied de page.
- Aucun appel réseau, aucune analytics, aucun cookie.

Les trois autres chantiers demandés, accueil et mémoire secondaire, fil
conducteur explicite et audit des infobulles, feront l'objet de specs séparées.
Le menu est traité seul, conformément à la règle « un changement à la fois ».

## 7. Tests et vérification

Tests unitaires :

1. Le header contient exactement 17 liens dans l'ordre attendu.
2. Chaque module possède un `navLabel` non vide.
3. Les libellés « Fiches outils » et « Cybersécurité » sont présents.
4. `/` active Accueil, `/module-6` active Module 6, `/ia/usages` active IA avec
   `aria-current="true"`, `/cybersecurite/menaces` active Cybersécurité avec
   `aria-current="true"`.
5. Aucun doublon de destination.

Smoke Playwright :

1. À 1280 px, le ruban est sur une seule ligne et sa largeur de défilement
   dépasse sa largeur visible.
2. À 320 px, le document ne déborde pas horizontalement et le ruban défile
   seul.
3. Sur `/module-9`, le lien Module 9 est actif et visible dans le ruban.
4. Sur `/ia/gouvernance`, le lien IA est actif et visible.
5. Zéro erreur console, zéro requête externe, zéro requête en échec.
6. Les 31 routes existantes restent inchangées.

Gates :

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run check:liens`
- `npm run build`
- `npm run smoke`
- Lighthouse mobile supérieur ou égal à 90 sur l'accueil et `/module-1`

## 8. Critères d'acceptation

1. Les 17 entrées sont présentes, dans l'ordre défini.
2. Le ruban ne se replie jamais et défile horizontalement.
3. L'entrée active est stylée et ramenée dans la vue.
4. Aucun débordement horizontal du document à 320 px.
5. La navigation reste utilisable au clavier et au tactile.
6. La recherche, la progression et l'export restent dans la première ligne.
7. Le header sticky ne masque pas les ancres grâce à la marge de défilement
   ajustée.
8. Les tests, le lint, le typecheck, les liens, le build, le smoke et Lighthouse
   passent.
9. Aucune nouvelle route, aucune donnée, aucun appel réseau.

## 9. Décisions laissées au constructeur

- Largeur exacte des dégradés de bord et des espacements internes.
- Choix de `useEffect` ou `useLayoutEffect` pour la mesure initiale des
  dégradés.
- Valeur exacte de `scroll-margin-top`, mesurée après rendu.
- Ajustement visuel du séparateur entre la première ligne et le ruban.

Ces choix ne changent ni le contenu, ni le nombre d'entrées, ni le
comportement décrit.

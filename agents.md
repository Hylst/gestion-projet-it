# agents.md - Gestion de Projet IT (instructions pour les agents dev)

Fichier d instructions du projet source. Priorite : cahier des charges,
puis ce fichier, puis les conventions du depot de deploiement.

## Projet

- Nom : Gestion de Projet IT. Source : ce dossier
  (`D:\0CODE\OpenCode\gestion-projet-it`). Build depose dans
  `D:\0CODE\AntiGravity\Cours_Memos\Docker\gestion-projet-it/`.
- Stack : Vite + React + TypeScript, SPA, 100 % front, sans compte,
  sans cookie, sans backend. Progression en `localStorage`
  (cles `gestion-projet-it:*`), export et import JSON.
- Licence AGPL-3.0-or-later. Paternite : realise par Geoffroy avec
  assistance IA (mentions : footer, page A propos, modal si present).

## Methode (anti-dispersion)

- Un changement a la fois, finir avant d enchainer.
- Tout contenu suit la charte editoriale du cahier des charges
  (methodes decrites sans dogme, aucune ecole presentee comme superieure,
  francais sobre, aucun tiret cadratin dans les textes rediges).
- Avant chaque depot vers Docker : smoke Playwright (routes 200 au clic
  et au rechargement, zero requete en echec, zero erreur console,
  zero requete externe), Lighthouse accueil >= 90 (perf et a11y mobile).

## Conventions techniques

- Router : `basename="/gestion-projet-it/"`. Build : `--base=/gestion-projet-it/`.
- Canonical et `og:url` par route depuis `window.location.href`.
- Aucun script inline ni handler inline (CSP `script-src 'self'`).
  Styles : classes ou `style-src 'unsafe-inline'` tolere.
- Autonomie assets : fontes woff2 latin locales (`font-display: swap`),
  tableaux et graphiques en SVG inline (zero image externe), aucun CDN,
  aucun tracker.
- PWA : manifest scope `/gestion-projet-it/`, icones locales,
  `offline.html` en `noindex`, SW scope au dossier.
- Accessibilite : clavier complet, contrastes AA, `lang="fr"`, labels
  sur chaque champ, messages d erreur explicites.

## Interdictions

- Aucune donnee sortante (ni analytics, ni fontes, ni images externes).
- Aucun auteur fictif, aucun temoignage invente, aucun chiffre sans source.
- Aucune certification ou equivalence de diplome suggeree.
- Ne jamais committer de secret, de cle ou de jeton.
- Ne pas toucher au depot Docker sauf pour deposer le build verifie
  (+ carte hub + sitemap + catalogue ensemble, un seul push).

## Integration plateforme

- Build depose dans `Docker/gestion-projet-it/` apres smoke et
  Lighthouse valides.
- Carte hub activee (Bloc 3, retirer grise et badge Bientot ensemble).
- Sitemap racine et `robots.txt` mis a jour (URL du module ajoutee).
- Modal A venir mis a jour (retirer l entree si presente).
- Location Nginx via Coolify avec `try_files` SPA vers
  `/gestion-projet-it/index.html`.
- Soumission Search Console apres mise en ligne (sitemap racine).

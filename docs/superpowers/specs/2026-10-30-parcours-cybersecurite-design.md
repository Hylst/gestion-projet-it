# Parcours Cybersécurité : conception

Date : 2026-10-30
Statut : proposition, à valider avant planification.
Périmètre : premier lot éditorial, sans les laboratoires.

## 1. Contexte et objectif

Le cours couvre neuf modules, un dossier projet et une section IA. La cybersécurité apparaît déjà dans le module 5 (outils, secrets, sauvegarde), le module 6 (risques) et le module 7 (gouvernance), ainsi que dans les ressources. Elle n’a pas de parcours dédié.

Le backlog contient les items `CYB-001` à `CYB-008`, en priorité P1, non commencés. Ce lot ouvre le parcours avec un hub et cinq pages thématiques. Les trois laboratoires de `CYB-007` restent dans un second lot.

Objectifs :

1. Ajouter six routes autonomes, sans dixième module et sans XP.
2. Traiter la sécurité comme une qualité du projet, pas comme un catalogue d’outils.
3. Donner des repères défensifs, proportionnés et vérifiables à des étudiants et à des juniors.
4. Conserver le capstone, les neuf modules, le compteur `0/9` et les clés de stockage existantes.
5. Rester 100 % front, sans compte, sans backend, sans cookie et sans requête externe.
6. Intégrer le parcours à la navigation, à l’accueil, à la recherche, au glossaire, au sitemap et au service worker.

Public : étudiants, juniors et chefs de projet non spécialistes. Le contenu ne forme pas à l’audit offensif, ne délivre pas de certification et ne remplace pas un professionnel de la sécurité.

## 2. Périmètre

### Inclus

- Les routes `/cybersecurite`, `/cybersecurite/menaces`, `/cybersecurite/acces`, `/cybersecurite/dependances`, `/cybersecurite/donnees` et `/cybersecurite/incident`.
- Un lien « Sécurité » dans la navigation principale et une section dédiée sur l’accueil.
- Un registre de pages, un gabarit, une checklist, un encart, un fichier de sources et une feuille de style.
- Des exemples sur le fil rouge fictif des Amis du Square.
- Dix termes ajoutés au glossaire et le renvoi du terme « Modèle de menace » vers le parcours.
- L’extension de la recherche aux six pages.
- La mise à jour du sitemap, du service worker et de la documentation.
- La mise à jour des mentions « parcours non ouvert » dans les pages Accessibilité et Ressources, le README, le backlog et l’index documentaire.
- La conformité des sources de page à `docs/sources.md` : usage, limite, date de vérification et signalement d’une norme payante.
- Le journal de vérification des sources et l’audit d’accessibilité du parcours.
- Les tests unitaires, les tests de composants, le smoke Playwright et la vérification Lighthouse.

### Exclu de ce lot

- Les trois laboratoires de `CYB-007` : modèle de menace interactif, matrice d’accès et chronologie d’incident.
- Tout dixième module, tout XP, tout changement du compteur `0/9` ou des clés de stockage.
- Tout backend, compte, cookie, analytics, dépôt de fichiers ou génération de document.
- Tout scénario d’attaque opérationnel, code d’exploit, outil de scan ou conseil d’intrusion.
- Toute certification, équivalence de diplôme ou promesse d’embauche.
- Tout conseil juridique personnalisé.
- Tout classement absolu d’outils ou de fournisseurs.
- Toute dépendance supplémentaire, image distante, police distante ou ressource chargée automatiquement.
- La livraison Docker sans accord explicite.

## 3. Décisions

1. Six routes : un hub et cinq pages thématiques, dans l’ordre de lecture du backlog.
2. Aucun XP, aucun compteur, aucun bouton « Terminé ».
3. Le gabarit reprend la structure de la section IA : hero, sommaire ancré, sections, « À retenir », checklist, sources, pagination.
4. La section IA n’est pas refactorée dans ce lot. Un gabarit cyber dédié est créé. La factorisation commune sera étudiée à l’ouverture du parcours Produit, quand trois gabarits existeront. Le coût de duplication est assumé pour ne pas toucher une section livrée et testée.
5. Les composants de checklist et d’encart sont dupliqués sous `src/cyber/` avec les classes `cyber-*`, pour garder les deux sections indépendantes.
6. Libellé de navigation : « Sécurité ». Titre du hub : « Cybersécurité et gestion de projet ».
7. La recherche ajoute un type `CyberSearchHit`. Les types module, IA et page restent inchangés.
8. Dix termes de glossaire sont ajoutés. Le terme existant « Modèle de menace » est relié à `/cybersecurite/menaces` au lieu de la page de ressources.
9. Le sitemap passe de 25 à 31 URL. Le service worker passe de `gestion-projet-it-v11` à `gestion-projet-it-v12`.
10. Les sources sont officielles, datées et vérifiées à la rédaction. Aucune source sans organisme, version et URL stable.
11. Aucune nouvelle dépendance.

## 4. Architecture

### 4.1 Routes et navigation

| Route | Titre | Rôle |
| --- | --- | --- |
| `/cybersecurite` | Cybersécurité et gestion de projet | Hub, repères, limites, carte du parcours |
| `/cybersecurite/menaces` | Menaces et modèle de menace | Actifs, menaces, chemins d’attaque, parades |
| `/cybersecurite/acces` | Accès, rôles et secrets | Comptes, moindre privilège, MFA, secrets |
| `/cybersecurite/dependances` | Dépendances, fournisseurs et chaîne logicielle | Versions, fournisseurs, CI, sortie |
| `/cybersecurite/donnees` | Données, RGPD et AI Act | Classification, bases légales, droits |
| `/cybersecurite/incident` | Incident, sauvegarde et reprise | Détection, confinement, reprise, retour d’expérience |

Le lien « Sécurité » est ajouté après « IA » dans la navigation principale. Sur mobile, il se comporte comme les autres liens. Les routes sont déclarées explicitement dans `src/App.tsx`, avant `/module-:num` et avant `*`, avec le `basename` existant.

Sur l’accueil, une section « Cybersécurité et gestion de projet » est ajoutée après la section IA. Elle contient un titre de niveau 2, une introduction courte, cinq cartes et un lien principal « Ouvrir le parcours Cybersécurité ».

### 4.2 Structure des pages

Chaque page contient :

- un kicker « Parcours Cybersécurité » ;
- un titre de niveau 1 ;
- une introduction ;
- un sommaire ancré ;
- cinq ou six sections de niveau 2 ;
- un encadré « À retenir » ;
- une checklist de six à huit items ;
- trois à cinq sources ;
- une navigation précédent et suivant.

Les sections sont déclarées dans le registre pour alimenter le sommaire, la recherche et les tests. Les tableaux ont un `caption` et des `scope`. Les encadrés utilisent `aside` avec un titre accessible.

### 4.3 Fichiers

Créer :

- `src/cyber/pages.ts` : registre typé des six pages et de leurs sections.
- `src/cyber/sources.ts` : sources officielles datées.
- `src/cyber/CyberChecklist.tsx` : liste de contrôle accessible.
- `src/cyber/CyberCallout.tsx` : encart éditorial.
- `src/cyber/CyberLayout.tsx` : gabarit commun.
- `src/cyber/content/Hub.tsx`.
- `src/cyber/content/Menaces.tsx`.
- `src/cyber/content/Acces.tsx`.
- `src/cyber/content/Dependances.tsx`.
- `src/cyber/content/Donnees.tsx`.
- `src/cyber/content/Incident.tsx`.
- `src/styles/cyber.css`.
- `tests/cyber.test.tsx`.
- `tests/sitemap.test.ts`.
- `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md`.

Modifier :

- `src/App.tsx` : six routes différées.
- `src/components/SiteHeader.tsx` : lien « Sécurité ».
- `src/routes/accueil.tsx` : section d’accueil et import de `cyber.css`.
- `src/lib/search.ts` : type `CyberSearchHit`, index des six pages et union.
- `src/components/SearchBar.tsx` : clé et libellé des résultats cyber.
- `src/lib/glossaire.ts` : dix termes et renvoi du modèle de menace.
- `public/sitemap.xml` : six URL.
- `public/sw.js` : version `v12`.
- `tests/search.test.ts` : couverture cyber et non-régression.
- `tests/glossaire.test.ts` : dix termes et lien.
- `tests/header.test.tsx` : lien Sécurité et état actif.
- `tests/typo.test.tsx` : six pages dans la vérification de charte.
- `tests/ia.test.tsx` : retrait de l’assertion globale sur le nombre d’URL, conservée dans `tests/sitemap.test.ts`.
- `smoke/smoke.spec.ts` : 31 routes, version `v12`, parcours cyber.
- `src/routes/Accessibilite.tsx`, `src/routes/Ressources.tsx` : mentions du parcours ouvert.
- `docs/sources.md`, `docs/accessibilite/checklist-parcours.md` : journal et statut d’audit.
- `README.md`, `BACKLOG.md`, `CHANGELOG.md`, `docs/README.md` : état, routes et preuves.

Ne pas modifier :

- `src/modules/**`, `src/lib/xp.ts`, `src/lib/progress.tsx`, `src/lib/capstone*`, `src/routes/DossierProjet.tsx`, `src/styles/capstone.css`.
- `src/ia/**` et `src/styles/ia.css`, sauf ajout de la section d’accueil si nécessaire.
- `public/manifest.webmanifest`, les icônes, `offline.html`, `robots.txt`.
- `vite.config.ts`, `package.json`, `tsconfig.json`, `eslint.config.js`.

### 4.4 Registre

Le registre expose :

```ts
export interface CyberPageSection {
  id: string;
  label: string;
}

export interface CyberPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
  sections: readonly CyberPageSection[];
  motsCles?: readonly string[];
}

export const CYBER_PAGES: readonly CyberPageMeta[];
```

Les six pages sont ordonnées : hub, menaces, accès, dépendances, données, incident. Les slugs, chemins et identifiants de section sont uniques. Les descriptions font moins de 160 caractères.

### 4.5 Gabarit

`CyberLayout` reprend la structure de `IaLayout` avec les classes `cyber-*` :

- `article.cyber-page.theme-cyber` ;
- `header.cyber-hero` avec kicker, `h1` et introduction ;
- `nav.cyber-sommaire` avec `aria-label="Sommaire de la page"` ;
- contenu ;
- `aside.cyber-callout.cyber-callout--retenir` avec titre « À retenir » ;
- `CyberChecklist` ;
- `section.cyber-sources` avec « Sources et veille » et « Veille arrêtée en octobre 2026. » ;
- `nav.cyber-pager` avec `aria-label="Navigation dans le parcours Cybersécurité"`.

Chaque source affiche l’organisme, le titre, la version, l’usage, la limite et la date de vérification. Une norme payante est signalée. Les liens externes utilisent `target="_blank"` et `rel="noopener noreferrer"`, avec un texte `sr-only` « (nouvel onglet) ».

## 5. Contenu détaillé

### 5.1 Ligne éditoriale

Chaque notion suit le même rythme : définition courte, usage, moment, limites, exemple sur Les Amis du Square, contrôle humain. Le ton reste sobre, sans dogme, sans dramatisation et sans promesse de sécurité totale. Les textes utilisent les règles du cours : accents, apostrophe typographique, espace insécable avant `: ; ? !`, aucun tiret cadratin.

Volume cible :

- hub : 800 à 1 100 mots ;
- pages thématiques : 1 000 à 1 400 mots ;
- checklist : 6 à 8 items ;
- sources : 3 à 5 références par page.

Les pages ne recopient pas les modules 5, 6 et 7. Elles apportent l’angle sécurité et renvoient aux modules quand le sujet est déjà traité.

### 5.2 Hub `/cybersecurite`

Sections :

1. `pourquoi` Pourquoi la sécurité entre dans le projet.
2. `pas-un-produit` Ce que la sécurité n’est pas.
3. `cinq-questions` Cinq questions avant de traiter un risque.
4. `carte` Carte du parcours.
5. `humain` Ce qui reste humain.
6. `suite` La suite du parcours.

Contenu imposé :

- La sécurité est une qualité du projet, au même titre que le délai, le budget ou l’accessibilité.
- Un incident peut venir d’un compte partagé, d’une dépendance non mise à jour, d’un fichier exposé ou d’un courriel trompeur.
- Les cinq questions : que protège-t-on, contre qui, quel serait l’impact, quelle parade est proportionnée, qui décide et qui vérifie.
- Encart « Fil rouge » : sur Les Amis du Square, le site stocke des contacts d’adhérents. Le projet identifie les données, les comptes et les sauvegardes avant l’ouverture.
- « À retenir » : quatre phrases.
- Checklist : six items, dont « J’ai nommé ce que je protège. », « J’ai relié chaque risque à une parade et à un responsable. », « J’ai vérifié les accès et les sauvegardes avant la mise en ligne. ».
- Sources : ANSSI, CNIL, OWASP, NIST CSF.

### 5.3 Menaces `/cybersecurite/menaces`

Sections :

1. `actifs` Actifs et valeur.
2. `menaces` Menaces plausibles.
3. `modele` Construire un modèle de menace.
4. `surface` Surface d’attaque.
5. `proportionner` Proportionner les parades.
6. `verifier` Vérifier et mettre à jour.

Contenu :

- Actifs : données, comptes, service, réputation, personnes, sauvegardes.
- Menaces : hameçonnage, vol d’identifiants, rançongiciel, erreur humaine, insider, fournisseur compromis, dépendance vulnérable.
- Modèle en quatre temps : actifs, attaquants plausibles, chemins, parades. Tableau de cinq lignes avec colonnes `Actif`, `Menace`, `Chemin`, `Impact`, `Parade`.
- Surface d’attaque : navigateur, comptes, dépendances, fournisseurs, bâtiment, personnes.
- Parades : réduire, éviter, transférer, accepter. Critère de proportionnalité : impact, vraisemblance, coût, réversibilité.
- Encart « Limite » : un modèle de menace n’est pas une garantie. C’est une liste priorisée à revoir.
- « À retenir » : quatre phrases.
- Checklist : sept items.
- Sources : ANSSI, OWASP, NIST CSF.

### 5.4 Accès `/cybersecurite/acces`

Sections :

1. `comptes` Comptes et identités.
2. `privileges` Moindre privilège.
3. `mfa` Authentification et mots de passe.
4. `secrets` Secrets et clés.
5. `revue` Revue des accès.
6. `compromission` En cas de compromission.

Contenu :

- Comptes nominatifs, cycle de vie, arrivée, mobilité, départ.
- Séparation des rôles, administrateur distinct, accès juste à temps, revue périodique.
- MFA, gestionnaire de mots de passe, passkeys, pas de compte partagé.
- Secrets : jamais dans le code, les journaux ou un ticket. Coffre, rotation, révocation. Un secret retiré du code doit être révoqué.
- Tableau `Matrice des accès` avec colonnes `Rôle`, `Besoin`, `Accès`, `Contrôle`.
- Revue trimestrielle et preuve de retrait.
- Compromission : révoquer, tourner les secrets, isoler, enquêter, communiquer.
- Encart « Secret » : « Un secret retiré du code doit aussi être révoqué. »
- « À retenir » : quatre phrases.
- Checklist : sept items.
- Sources : ANSSI, CNIL, NIST CSF.

### 5.5 Dépendances `/cybersecurite/dependances`

Sections :

1. `cartographie` Cartographier les dépendances.
2. `versions` Versions et vulnérabilités.
3. `fournisseurs` Fournisseurs et contrats.
4. `chaine` Chaîne de build et provenance.
5. `sortie` Plan de sortie.
6. `veille` Veille et réponse.

Contenu :

- Dépendances directes, transitives, services, fournisseurs, chaîne de build.
- Fichier de verrouillage, audit des dépendances, politique de mise à jour, fin de vie.
- Fournisseurs : données, localisation, sous-traitants, sécurité, sortie. Contrat et contact incident.
- Chaîne de build : permissions minimales, secrets, artefacts, revue des actions, reproductibilité.
- Plan de sortie : export, alternative, restitution des données, délai.
- Encart « Le test de la panne » : si le fournisseur disparaît demain, que reste-t-il ?
- Tableau `Dépendances et parades` avec colonnes `Dépendance`, `Risque`, `Parade`, `Preuve`.
- « À retenir » : quatre phrases.
- Checklist : sept items.
- Sources : OWASP, NIST CSF, ANSSI, ISO/IEC 27001.

### 5.6 Données `/cybersecurite/donnees`

Sections :

1. `classer` Classer les données.
2. `rgpd` Principes RGPD.
3. `bases` Bases légales et rôles.
4. `aiact` AI Act.
5. `cycle` Cycle de vie.
6. `droits` Droits et incidents.

Contenu :

- Classification : public, interne, confidentiel, personnel, sensible.
- RGPD : finalité, minimisation, conservation, droits, sécurité, responsabilité.
- Rôles : responsable de traitement, sous-traitant, personne concernée. Bases : consentement, contrat, intérêt légitime, obligation légale. Ne pas conclure à la place d’un juriste.
- AI Act : niveaux de risque, transparence, fournisseur et déployeur. Renvoi à `/ia/gouvernance`.
- Cycle de vie : collecter, stocker, partager, archiver, supprimer. Chiffrement, accès, sauvegardes.
- Droits : accès, rectification, effacement, opposition, portabilité. Incident : notification.
- Tableau `Classification des données` avec colonnes `Niveau`, `Exemple`, `Accès`, `Conservation`.
- Encart « Pas un conseil juridique » : « Ce contenu n’est pas un conseil juridique. Pour un cas réel, consulter un juriste ou le référent données. »
- « À retenir » : quatre phrases.
- Checklist : sept items.
- Sources : CNIL, AI Act, ANSSI, NIST CSF.

### 5.7 Incident `/cybersecurite/incident`

Sections :

1. `detecter` Détecter et qualifier.
2. `confiner` Confiner et préserver.
3. `decider` Décider et communiquer.
4. `reprendre` Reprendre.
5. `apprendre` Apprendre.
6. `preparer` Préparer.

Contenu :

- Signaux : alerte, panne, comportement anormal, appel d’un tiers. Qualification : gravité, périmètre, données, service.
- Confiner : isoler, révoquer, préserver les preuves, ne pas effacer.
- Décider : cellule de crise, rôles, communication interne et externe, juriste, CNIL si données personnelles.
- Reprendre : sauvegardes, test de restauration, RTO et RPO, service prioritaire.
- Apprendre : chronologie, cause, actions, responsables, échéances.
- Préparer : playbook, contacts, exercice, test de sauvegarde.
- Tableau `Chronologie d’incident` avec colonnes `Temps`, `Événement`, `Décision`, `Responsable`, `Preuve`.
- Encart « Sauvegarde » : « Une sauvegarde non testée n’est pas une sauvegarde. »
- « À retenir » : quatre phrases.
- Checklist : sept items.
- Sources : ANSSI, CNIL, NIST CSF, ISO/IEC 27001.

## 6. Sources et dates

Chaque page se termine par « Sources et veille » avec « Veille arrêtée en octobre 2026 ». Les références proviennent d’organismes officiels ou de normalisation :

- ANSSI, guides d’hygiène et de réponse à incident, `https://cyber.gouv.fr/` ;
- CNIL, RGPD et sécurité des données, `https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on` ;
- OWASP, Top 10, `https://owasp.org/www-project-top-ten/` ;
- NIST, Cybersecurity Framework 2.0, `https://www.nist.gov/cyberframework` ;
- ISO/IEC 27001:2022, `https://www.iso.org/standard/27001` ;
- Union européenne, règlement (UE) 2024/1689, `https://eur-lex.europa.eu/eli/reg/2024/1689/oj`.

Les sources de page suivent le schéma complet de `docs/sources.md` : organisme, titre, URL stable, version ou date, usage, limite et date de vérification. Une norme payante est signalée comme telle. Le journal de `docs/sources.md` est mis à jour avec les URL des pages cyber et leur résultat HTTP. Les références servent de repères, pas de résumé exhaustif. La page Données rappelle que le contenu n’est pas un conseil juridique.

## 7. Intégration

### 7.1 Recherche

`src/lib/search.ts` ajoute :

```ts
export interface CyberSearchHit extends SearchHitBase {
  type: 'cyber';
  pageTitre: string;
}
```

L’index parcourt les six pages et leurs sections. `SearchBar` affiche le titre de page et la section, puis navigue vers le chemin et l’ancre. Les résultats module, IA et page restent inchangés.

Tests : une requête « phishing » renvoie `/cybersecurite/menaces`, « rançongiciel » renvoie `/cybersecurite/incident`, « rgpd » renvoie `/cybersecurite/donnees`, et les requêtes historiques ne régressent pas.

### 7.2 Glossaire

Dix termes ajoutés :

1. Authentification multifacteur.
2. Chiffrement.
3. Contrôle d’accès.
4. Défense en profondeur.
5. Hygiène numérique.
6. Incident de sécurité.
7. Moindre privilège.
8. Phishing.
9. Rançongiciel.
10. Surface d’attaque.

Chaque définition tient entre 30 et 240 caractères, reste neutre et ne contient pas de tiret cadratin. Chaque terme pointe vers la page cyber correspondante. Le terme existant « Modèle de menace » pointe vers `/cybersecurite/menaces`.

### 7.3 Sitemap et PWA

Le sitemap reçoit six entrées :

- `https://hylst.fr/gestion-projet-it/cybersecurite`
- `https://hylst.fr/gestion-projet-it/cybersecurite/menaces`
- `https://hylst.fr/gestion-projet-it/cybersecurite/acces`
- `https://hylst.fr/gestion-projet-it/cybersecurite/dependances`
- `https://hylst.fr/gestion-projet-it/cybersecurite/donnees`
- `https://hylst.fr/gestion-projet-it/cybersecurite/incident`

Le sitemap passe à 31 URL. Le service worker passe à `gestion-projet-it-v12`. Le précache reste limité à la racine, à `offline.html` et au manifest. Les nouvelles routes utilisent la navigation SPA. Le test global du sitemap vit dans `tests/sitemap.test.ts` ; `tests/ia.test.tsx` conserve seulement la vérification des routes IA.

### 7.4 Accueil et header

Le header ajoute `NavLink to="/cybersecurite">Sécurité</NavLink>` après « IA ». Le test vérifie l’état actif sur `/cybersecurite` et `/cybersecurite/menaces`.

L’accueil ajoute une section après la section IA, avec cinq cartes et un lien « Ouvrir le parcours Cybersécurité ». Les cartes reprennent le titre et le résumé du registre.

Les mentions « parcours non ouvert » sont corrigées dans `/accessibilite`, `/ressources`, le README, le backlog et l’index documentaire. Le parcours Produit reste annoncé comme non ouvert. La page Ressources relie le groupe Cybersécurité au nouveau hub.

## 8. Accessibilité et performance

- Un seul `h1` par page, hiérarchie de titres continue.
- Sommaire avec `aria-label`, ancres valides, focus visible.
- Tableaux avec `caption` et `scope`.
- Checkboxes et listes sémantiques.
- Contrastes AA, aucune information portée uniquement par la couleur.
- Navigation clavier complète, sans trappe.
- Liens externes explicites avec `rel="noopener noreferrer"`.
- `lang="fr"` conservé.
- Aucune image, police distante, iframe ou script externe.
- Pages statiques importées en différé.
- Lighthouse mobile supérieur ou égal à 90 sur l’accueil et `/cybersecurite`.

## 9. Tests et validation

### 9.1 Tests unitaires et composants

- Registre : six pages, slugs et chemins uniques, sections uniques, descriptions non vides et courtes.
- Rendu : chaque page affiche son `h1`, son sommaire, ses sections, son encadré « À retenir », sa checklist et ses sources.
- Ancres : chaque entrée du sommaire correspond à un `id` présent.
- Tableaux : `caption` et `scope` présents.
- Liens externes : `rel="noopener noreferrer"`.
- Recherche : les six pages sont indexées, une requête cyber renvoie le bon chemin et la bonne ancre.
- Glossaire : dix termes présents, uniques, définis et liés à la bonne page.
- Typographie : les six pages respectent la charte.
- Sources : chaque source porte organisme, titre, URL, version, usage, limite et date de vérification ; une norme payante est signalée.
- Sitemap : 31 URL, dont les six routes cyber, dans `tests/sitemap.test.ts`.
- Header : lien « Sécurité » présent et actif.
- Accueil : section et cinq liens.
- Copies : aucune mention « parcours non ouvert » pour la cybersécurité dans les pages et la documentation.

### 9.2 Smoke Playwright

Le smoke passe de 25 à 31 routes. Il vérifie :

- l’ouverture et le rechargement des six routes cyber ;
- le titre de niveau 1 de chaque page ;
- l’absence d’erreur console ;
- l’absence de requête externe ;
- la navigation depuis le header et l’accueil ;
- une recherche « phishing » qui propose un résultat cyber ;
- l’ouverture du glossaire et la présence d’un terme cyber ;
- l’impression d’une page cyber sans masquer le contenu ;
- la version `v12` du service worker.

### 9.3 Commandes

```bash
npm test
npm run lint
npm run typecheck
npm run check:liens
npm run build
npm run smoke
```

Le smoke utilise `SMOKE_BASE_URL` si le port 4173 est occupé. Lighthouse est exécuté sur l’accueil et `/cybersecurite` en mobile.

### 9.4 Vérification manuelle

- 390 px, 768 px et 1440 px : pas de débordement horizontal.
- Tableaux : défilement horizontal accessible au clavier.
- Navigation au clavier : header, sommaire, liens, précédent et suivant.
- Impression d’une page thématique : contenu, checklist et sources visibles.
- Recherche : « phishing », « rançongiciel », « rgpd ».
- Aucun cookie, aucune requête externe, aucune erreur console.

### 9.5 Audit d’accessibilité

Un audit daté est consigné dans `docs/accessibilite/audit-2026-10-30-parcours-cybersecurite.md` : structure, clavier, focus, contrastes, zoom 200 %, mouvement réduit, tableaux, impression et Lighthouse. La checklist `docs/accessibilite/checklist-parcours.md` est mise à jour : cybersécurité auditée, parcours Produit en attente. `QUA-001` reste ouvert pour le parcours Produit.

## 10. Risques et parades

- **Contenu trop long** : volume cible par page, cinq ou six sections, renvois aux modules.
- **Dérive vers le conseil offensif** : discours défensif, aucun exploit, aucun scan, aucune cible réelle.
- **Dérive juridique** : sources officielles, mention explicite, pas de conseil personnalisé.
- **Répétition avec les modules 5, 6 et 7** : la page apporte l’angle sécurité, elle ne réécrit pas les fiches.
- **Navigation surchargée** : libellé court « Sécurité », test mobile.
- **Obsolescence des sources** : date de veille, revue trimestrielle, URL stables.
- **Duplication du gabarit** : assumée jusqu’à l’ouverture du parcours Produit, puis factorisation.
- **Fausse promesse de sécurité** : aucun texte ne garantit l’absence d’incident.
- **Accessibilité des tableaux** : `caption`, `scope`, défilement clavier, test manuel.
- **Bundle** : aucune dépendance, aucune image, mesure Lighthouse.

## 11. Livraison

Le lot est livré par une branche, une pull request et une CI verte, avec fusion manuelle. Aucun fichier n’est copié dans Docker sans accord explicite.

Après validation de la spec :

1. écrire le plan d’implémentation ;
2. implémenter le registre, le gabarit et les six pages ;
3. intégrer la recherche, le glossaire, le sitemap, le service worker, le header et l’accueil ;
4. exécuter les tests, le lint, le typecheck, le contrôle des liens, le build et le smoke ;
5. réaliser l’audit d’accessibilité et vérifier les sources externes ;
6. documenter les résultats et mettre à jour le backlog et le changelog.

Les trois laboratoires de `CYB-007` restent dans un second lot, après validation de ce premier parcours.

## 12. Critères d’acceptation

1. Les six routes cyber répondent au clic et au rechargement.
2. Le header et l’accueil exposent le parcours sans modifier les neuf modules, le capstone ni la section IA.
3. Chaque page contient un `h1`, un sommaire, cinq ou six sections, un encadré « À retenir », une checklist et des sources datées.
4. Le glossaire contient les dix termes cyber et le renvoi du modèle de menace.
5. La recherche trouve les pages cyber et navigue vers la bonne ancre.
6. Le sitemap contient 31 URL et le service worker est en `v12`.
7. Aucun compteur, XP, stockage ou clé existante n’est modifié.
8. Aucune dépendance, aucun cookie, aucune requête externe et aucune ressource externe ne sont ajoutés.
9. L’affichage reste lisible à 390 px, 768 px et 1440 px.
10. Les tests, le lint, le typecheck, le contrôle des liens, le build et le smoke passent.
11. Lighthouse mobile est supérieur ou égal à 90 sur l’accueil et `/cybersecurite`.
12. Les sources de page respectent le schéma complet de `docs/sources.md` et le journal de vérification est à jour.
13. L’audit d’accessibilité du parcours est consigné et la checklist des parcours est mise à jour.
14. Aucun fichier n’est copié dans Docker sans accord explicite.

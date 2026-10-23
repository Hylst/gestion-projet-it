# Section Gestion de projet et IA : conception

Date : 2026-10-22
Statut : design validé par l’utilisateur le 2026-10-22, spec à relire
avant planification.

## 1. Contexte et objectif

Le cours couvre neuf modules et un capstone. Il ne traite pas encore
l’intelligence artificielle, alors que les pratiques de gestion de
projet intègrent désormais des assistants génératifs, des copilotes,
de la recherche documentaire, des agents et des automatisations. Le
sujet est absent des fiches, des labos et du glossaire, sauf la mention
d’attribution du site.

La section comble ce manque sans ajouter un dixième module et sans
modifier la progression existante. Elle s’adresse en priorité aux
étudiants et aux juniors. Elle traite l’IA comme un outil du chef de
projet, pas comme un produit à concevoir : la conduite d’un projet IA,
le MLOps et le cycle de vie d’un modèle restent hors périmètre.

Objectifs :

1. Ajouter une section autonome de cinq pages : un hub et quatre pages
   thématiques.
2. Couvrir les usages, les méthodes, l’environnement technique et
   organisationnel, les outils, la configuration et la gouvernance.
3. Conserver les neuf modules, le compteur `0/9`, l’XP, le capstone et
   les clés de stockage existantes.
4. Rester 100 % front, sans compte, sans backend, sans cookie et sans
   requête externe au chargement.
5. Produire un contenu accessible, imprimable, daté et sourcé, utile à
   un débutant sans être simpliste.
6. Intégrer la section à la navigation, à l’accueil, à la recherche, au
   glossaire, au sitemap et au service worker.

## 2. Périmètre

### Inclus

- Les routes `/ia`, `/ia/usages`, `/ia/methodes`,
  `/ia/outils-configuration` et `/ia/gouvernance`.
- Un lien « IA » dans la navigation principale et une section dédiée
  sur l’accueil.
- Un registre de métadonnées, un gabarit de page, des composants de
  contenu et une feuille de style dédiée.
- Des exemples sur le fil rouge fictif des Amis du Square.
- Dix termes IA ajoutés au glossaire.
- L’extension de la recherche aux pages IA.
- La mise à jour du sitemap et du service worker.
- Les tests unitaires, les tests de composants, le smoke Playwright et
  la vérification Lighthouse.
- Le build déposé dans `Docker/gestion-projet-it/` et l’entrée de
  changelog, uniquement après accord explicite de livraison.

### Exclu

- Tout dixième module, tout changement du compteur `0/9`, de l’XP ou
  des clés de stockage. Les fichiers `src/lib/xp.ts` et
  `src/lib/progress.tsx` restent inchangés, ainsi que la clé
  `gestion-projet-it:xp`.
- Tout quiz, labo interactif, tableau de bord ou parcours noté.
- Toute bibliothèque de prompts, tout tutoriel pas à pas par éditeur et
  toute capture d’interface.
- Tout volet sur l’empreinte écologique de l’IA.
- La conduite d’un projet IA comme produit : collecte et préparation
  des données d’entraînement, choix et entraînement de modèles, MLOps
  et cycle de vie d’un modèle.
- Tout conseil juridique personnalisé.
- Toute modification des neuf modules et du capstone.
- Tout backend, compte, synchronisation, cookie, analytics, dépôt de
  fichiers ou génération de document.
- Toute ressource externe chargée par la page : police, image, script,
  iframe, vidéo ou CDN.
- Toute dépendance supplémentaire.
- La livraison Docker sans accord explicite.

## 3. Décisions validées

1. Section autonome multi-pages, sans dixième module.
2. Public prioritaire : étudiants et juniors.
3. Approche éditoriale : panorama raisonné, avec exemples, limites et
   checklists.
4. Cinq routes : un hub et quatre pages thématiques.
5. Guide et checklists, sans XP ni nouveau stockage.
6. Outils présentés par catégories, avec des exemples datés, sans
   classement ni recommandation commerciale.
7. Sources officielles datées, avec une date de veille explicite.
8. « Environnement » désigne l’écosystème technique et
   organisationnel : local, cloud, hybride, données, intégrations,
   permissions et cadre d’équipe.
9. Le glossaire et la recherche sont étendus à la section.
10. La livraison reste conditionnée à un accord explicite.

## 4. Architecture

### 4.1 Routes et navigation

| Route | Titre | Rôle |
|---|---|---|
| `/ia` | Gestion de projet et IA | Hub, repères, limites, carte des usages |
| `/ia/usages` | Usages de l’IA par phase de projet | Cas concrets et contrôle humain |
| `/ia/methodes` | Méthodes et évaluation | Contexte, RAG, agents, évaluation, validation |
| `/ia/outils-configuration` | Outils, environnement et configuration | Catégories, données, réglages, checklist |
| `/ia/gouvernance` | Gouvernance, risques et qualité | Rôles, politique, droit, sécurité, fournisseurs |

Les routes sont déclarées explicitement dans `src/App.tsx`, avant la
route générique `/module-:num` et avant la route `*`. Elles utilisent
le `basename` existant `/gestion-projet-it/`.

Le lien « IA » est ajouté à la navigation principale après « Dossier
projet ». Son libellé reste court pour ne pas surcharger l’en-tête. Sur
mobile, il se comporte comme les autres liens.

Sur l’accueil, une section « Gestion de projet et IA » est ajoutée
après le capstone. Elle contient :

- un titre de niveau 2 ;
- une introduction courte ;
- quatre cartes, une par page thématique ;
- un lien principal « Ouvrir la section IA » vers le hub.

Le hub n’est pas répété dans les quatre cartes. Les cartes pointent
directement vers les pages thématiques et reprennent le titre et le
résumé du registre.

Aucun changement n’est apporté aux cartes des neuf modules, au
compteur de progression, au fil rouge ni au capstone.

### 4.2 Structure des pages

Chaque page contient une introduction, cinq ou six sections de niveau
2, un encadré « À retenir », une checklist et une liste de sources.
Les sections sont déclarées dans le registre pour alimenter le sommaire
et la recherche.

#### Hub `/ia`

1. Pourquoi l’IA entre dans le projet
2. Ce qu’elle fait bien
3. Ce qu’elle ne fait pas
4. Cinq questions avant de déléguer
5. Carte des usages
6. Un cadre, pas un dogme

Le hub explique que l’IA n’est pas une méthode de projet. Elle peut
aider à produire, comparer, reformuler, chercher et préparer des
décisions. Elle ne porte ni la responsabilité, ni le contexte implicite,
ni la relation avec les parties prenantes. Il renvoie vers les quatre
pages thématiques.

Les cinq questions avant de déléguer sont :

1. La tâche est-elle vérifiable par une personne ?
2. Les données utilisées sont-elles autorisées ?
3. Le coût d’une erreur est-il acceptable et réversible ?
4. Qui valide le résultat et en assume la responsabilité ?
5. Quelle trace garde-t-on pour expliquer la décision ?

#### Usages `/ia/usages`

1. Lire le cycle de vie
2. Cadrer et découper
3. Planifier et estimer
4. Produire, tester et documenter
5. Communiquer et conduire le changement
6. Ce qui reste humain

Un tableau relie chaque phase à un usage typique, un apport attendu,
un contrôle humain et un risque principal :

| Phase | Usage typique | Apport attendu | Contrôle humain | Risque principal |
|---|---|---|---|---|
| Cadrage | Reformuler le besoin, proposer des questions | Clarifier plus vite | Valider le besoin et le périmètre | Inventer une exigence |
| Planification | Proposer des lots, des dépendances, des hypothèses | Explorer des variantes | Vérifier les dépendances et les charges | Faux réalisme |
| Production | Rédiger un brouillon, expliquer un extrait | Réduire la page blanche | Relire, corriger, citer | Erreur factuelle |
| Qualité | Proposer des cas de test, analyser un journal | Couvrir des angles oubliés | Exécuter et juger les résultats | Faux positif |
| Risques | Lister des risques et des parades | Ouvrir la réflexion | Prioriser et arbitrer | Catalogue générique |
| Communication | Préparer un message, résumer un échange | Gagner du temps de forme | Valider le fond et le ton | Perte de nuance |

Les exemples utilisent Les Amis du Square : reformulation du besoin,
aide au découpage, préparation d’un planning, brouillon de compte rendu,
jeu de questions de recette, analyse de retours. Aucun gain chiffré
n’est affirmé sans source.

#### Méthodes `/ia/methodes`

1. Partir du problème, pas de l’outil
2. Contexte et instructions
3. Recherche documentaire et RAG
4. Agents et automatisations
5. Évaluer avant de généraliser
6. Human-in-the-loop

La page distingue l’assistant ponctuel, la recherche dans un corpus,
l’automatisation et l’agent. Elle explique le rôle du contexte, des
exemples, des contraintes et du format attendu. Elle présente le RAG
comme une recherche documentaire avec citations, pas comme une vérité
garantie. Elle insiste sur un petit jeu de test, des critères explicites
et des points de validation humaine.

Les pratiques émergentes sont traitées sans les présenter comme
obligatoires : prototypage rapide, codage assisté, revue augmentée,
préparation de tests, recherche documentaire et veille assistée. Pour
chacune, la page précise le moment utile, le contrôle humain et le
risque de faux sentiment de maîtrise.

#### Outils et configuration `/ia/outils-configuration`

1. Catégories d’outils
2. Local, cloud ou hybride
3. Données et permissions
4. Les paramètres qui comptent
5. Traçabilité, coûts et dépendance

La page se termine par une checklist de configuration rendue par le
gabarit commun.

Un tableau présente les catégories suivantes avec deux ou trois
exemples datés :

| Catégorie | Usage typique | Exemples (octobre 2026) | Limite |
|---|---|---|---|
| Assistants génératifs | Rédiger, reformuler, comparer | ChatGPT, Claude, Gemini, Mistral Le Chat | Vérification et données |
| Copilotes de code | Compléter, expliquer, tester | GitHub Copilot, Cursor | Relecture et licence |
| Recherche et RAG | Interroger un corpus | NotebookLM, Perplexity | Sources et fraîcheur |
| Agents et automatisations | Enchaîner des tâches | n8n, Make | Permissions et supervision |
| Modèles locaux | Garder la maîtrise | Ollama, LM Studio | Matériel et maintenance |
| Plateformes intégrées | Construire, tracer, évaluer | Azure AI Foundry, AWS Bedrock, Google Vertex AI | Complexité et coût |

Les exemples sont cités à titre informatif, sans classement, sans lien
d’affiliation et sans tutoriel. La page explique les notions de
classification des données, de moindre privilège, de rétention, de
journalisation, de coût et de réversibilité. Les réglages sont décrits
par leur effet, pas par leur emplacement dans une interface :

| Paramètre | Question à se poser | Garde-fou |
|---|---|---|
| Modèle | Quel niveau de qualité, de coût et de maîtrise ? | Tester sur des cas réels |
| Contexte | Quels documents et quelles consignes sont fournis ? | Limiter aux données utiles |
| Instructions | Quel format, quel ton, quelles interdictions ? | Relire les consignes |
| Outils | Quelles actions l’IA peut-elle déclencher ? | Moindre privilège et confirmation |
| Rétention | Combien de temps les échanges sont-ils conservés ? | Durée minimale et effacement |
| Température | Faut-il une réponse stable ou variée ? | Tester les extrêmes |
| Journal | Que garde-t-on pour expliquer une décision ? | Trace courte et lisible |

#### Gouvernance `/ia/gouvernance`

1. Rôles et responsabilités
2. Politique d’usage
3. Risques et qualité
4. Cadre juridique
5. Sécurité et propriété intellectuelle
6. Fournisseurs, indicateurs et dialogue social

La page traite des rôles (sponsor, chef de projet, propriétaire de
données, sécurité, juriste, utilisateurs), d’une politique courte
(usages autorisés, interdits, données, validation, incident), des
risques (hallucination, biais, fuite, dépendance, automatisation),
du cadre européen et français, de la sécurité, de la propriété
intellectuelle et de la sortie d’un fournisseur. Elle rappelle que le
contenu n’est pas un conseil juridique.

### 4.3 Registre et composants partagés

`src/ia/pages.ts` exporte :

```ts
export interface IaSection {
  id: string;
  label: string;
}

export interface IaPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  resume: string;
  description: string;
  motsCles: string[];
  sections: IaSection[];
}
```

Le registre contient les cinq pages dans l’ordre de lecture. Les
slugs, chemins et identifiants de sections sont uniques. Les métadonnées
alimentent les routes, les cartes d’accueil, le sommaire, la recherche,
les tests et le sitemap.

`src/ia/IaLayout.tsx` fournit le gabarit commun :

- un kicker « Section IA » ;
- un titre de niveau 1 ;
- une introduction ;
- un sommaire ancré, généré depuis les sections ;
- le contenu de la page ;
- un encadré « À retenir » ;
- une checklist ;
- les sources ;
- une navigation précédent/suivant.

`src/ia/IaChecklist.tsx` rend une liste de contrôle sémantique, avec un
titre et des éléments courts. Les pages utilisent du HTML sémantique
pour les tableaux, les listes et les encadrés. Aucun composant de labo
ni de progression n’est réutilisé.

Les pages vivent dans `src/ia/content/` : `Hub.tsx`, `Usages.tsx`,
`Methodes.tsx`, `OutilsConfiguration.tsx` et `Gouvernance.tsx`.
`src/styles/ia.css` contient les styles spécifiques.

### 4.4 Flux de contenu

Les pages sont statiques. Il n’y a ni état, ni chargement, ni erreur
réseau, ni donnée stockée. Le seul flux est la navigation entre les
routes et les ancres.

Les liens internes sont produits à partir du registre. Les liens
externes sont de simples liens sortants, avec un libellé explicite et
`rel="noopener noreferrer"`. Ils ne déclenchent aucune requête tant que
l’utilisateur ne clique pas.

Une ancre absente est considérée comme un défaut de contenu et doit
être détectée par les tests. La route inconnue continue d’afficher la
page 404 existante.

## 5. Contenu détaillé

### 5.1 Ligne éditoriale

Chaque notion suit le même rythme :

1. définition courte ;
2. à quoi ça sert ;
3. quand l’utiliser ;
4. limites et risques ;
5. exemple sur Les Amis du Square ;
6. contrôle humain.

Le ton reste sobre, sans dogme, sans école présentée comme supérieure
et sans promesse de gains non sourcés. Les textes utilisent les règles
du cours : accents, apostrophe typographique, espace insécable avant
`: ; ? !`, aucun tiret cadratin.

Les pages ne recopient pas les fiches des modules. Elles renvoient aux
modules quand un sujet est déjà traité : WBS, planning, qualité,
risques, gouvernance, changement. La section apporte l’angle IA, pas
une seconde version du cours.

Volume cible :

- hub : 700 à 1 000 mots ;
- pages thématiques : 1 000 à 1 400 mots ;
- checklist : 6 à 8 items ;
- sources : 3 à 5 références par page.

Les encadrés restent courts. Les tableaux ne dépassent pas cinq
colonnes.

### 5.2 Sources et dates

Chaque page se termine par un bloc « Sources et veille » avec la mention
« Veille arrêtée en octobre 2026 ». Chaque référence indique l’organisme,
le titre, la version ou l’année, et une URL stable. Les références
proviennent de sources officielles ou de normalisation :

- Règlement (UE) 2024/1689, dit AI Act, EUR-Lex ;
- CNIL, recommandations sur l’IA et le RGPD ;
- NIST, AI Risk Management Framework 1.0 et profil IA générative ;
- ISO/IEC 42001:2023, systèmes de management de l’IA ;
- OCDE, principes pour une IA responsable.

Les références servent de repères, pas de résumé juridique exhaustif.
La page de gouvernance précise : « Ce contenu n’est pas un conseil
juridique. Pour un cas réel, consulter un professionnel du droit et le
responsable protection des données. »

Aucun chiffre d’adoption, de productivité ou de coût n’est publié sans
source et année. En l’absence de source fiable, le texte reste
qualitatif.

### 5.3 Glossaire

Dix termes sont ajoutés à `src/lib/glossaire.ts` :

1. Agent
2. Contexte
3. Donnée personnelle
4. Évaluation
5. Hallucination
6. Human-in-the-loop
7. IA générative
8. Jeu de test
9. Prompt
10. RAG

Chaque définition tient entre 30 et 240 caractères, reste neutre et ne
contient pas de tiret cadratin. Les dix termes IA pointent vers la page
thématique correspondante. Le champ de lien reste optionnel dans le
type, pour ne pas modifier les termes existants. Les termes existants
gardent leur renvoi vers un module.

### 5.4 Recherche

`src/lib/search.ts` est généralisé pour indexer des pages et des
modules. Chaque résultat porte un type, un chemin, un libellé, une
section, une ancre et une chaîne de recherche normalisée.

Les pages IA sont indexées section par section. Une recherche sur
« RAG », « hallucination », « agent » ou « évaluation » doit proposer
la page et l’ancre correspondantes. Le composant `SearchBar` navigue
vers le chemin du résultat, puis fait défiler vers l’ancre.

Les tests existants sont adaptés pour filtrer les résultats de type
module. Un test vérifie qu’une requête IA renvoie un résultat de type
page et que la navigation conserve le chemin.

## 6. Intégration technique

### 6.1 Routes et SEO

Chaque page utilise `SeoHead` avec un titre, une description et les
métadonnées canoniques calculées par le composant existant. Les titres
et descriptions sont uniques et font moins de 160 caractères pour les
descriptions.

Le sitemap du module reçoit cinq entrées :

- `https://hylst.fr/gestion-projet-it/ia`
- `https://hylst.fr/gestion-projet-it/ia/usages`
- `https://hylst.fr/gestion-projet-it/ia/methodes`
- `https://hylst.fr/gestion-projet-it/ia/outils-configuration`
- `https://hylst.fr/gestion-projet-it/ia/gouvernance`

Le sitemap racine de la plateforme est mis à jour uniquement lors de la
livraison, avec l’URL du module. Le `robots.txt` existant reste
inchangé.

### 6.2 Sitemap et PWA

Le service worker passe de `gestion-projet-it-v4` à
`gestion-projet-it-v5`. Le précache existant reste limité à la racine,
à `offline.html` et au manifest. Les nouvelles routes utilisent la
navigation SPA et le cache existant. Aucun nouveau fichier HTML de route
n’est créé.

Le manifest, les icônes et `offline.html` restent inchangés.

### 6.3 Styles et responsive

`src/styles/ia.css` définit :

- `.ia-page` : largeur de lecture confortable ;
- `.ia-hero` : introduction et sommaire ;
- `.ia-grid` : cartes de pages, deux colonnes sur grand écran, une sur
  mobile ;
- `.ia-callout` : encadrés « À retenir », « Limite », « Fil rouge » ;
- `.ia-table-wrap` : défilement horizontal des tableaux ;
- `.ia-checklist` : liste de contrôle imprimable ;
- `.ia-sources` : références courtes ;
- `.ia-pager` : navigation précédent/suivant.

Les styles réutilisent les jetons existants. Aucun nouveau fichier de
police, aucune image et aucun SVG décoratif ne sont ajoutés.

### 6.4 Impression

Les pages utilisent l’impression globale existante. Le sommaire, la
navigation précédent/suivant et les liens de retour ne sont pas
imprimés. Le contenu, l’encadré « À retenir », la checklist et les
sources restent visibles.

Les encadrés et checklists utilisent `break-inside: avoid`. Un tableau
large peut passer à la page suivante sans être coupé au milieu d’une
ligne.

## 7. Accessibilité et performance

Accessibilité :

- un seul `h1` par page ;
- sommaire avec `aria-label` et ancres valides ;
- tableaux avec `caption` et `scope` ;
- checklists en listes sémantiques ;
- contrastes AA ;
- focus visible sur les liens et boutons ;
- liens externes explicites, avec `rel="noopener noreferrer"` ;
- aucune information portée uniquement par la couleur ;
- navigation clavier complète ;
- `lang="fr"` conservé.

Performance :

- aucune dépendance, image, police ou requête externe ;
- pages statiques importées comme les modules ;
- pas de découpage de bundle supplémentaire dans ce lot ;
- Lighthouse mobile supérieur ou égal à 90 pour la performance et
  l’accessibilité sur l’accueil et `/ia`.

## 8. Tests et validation

### 8.1 Tests unitaires et composants

- Registre : cinq pages, slugs et chemins uniques, sections uniques,
  descriptions non vides.
- Rendu : chaque page affiche son `h1`, son sommaire, ses sections,
  son encadré « À retenir », sa checklist et ses sources.
- Ancres : chaque entrée du sommaire correspond à un `id` présent.
- Tableaux : `caption` et `scope` présents.
- Liens externes : `rel="noopener noreferrer"` présent.
- Recherche : les pages IA sont indexées, une requête IA renvoie le bon
  chemin et la bonne ancre, les résultats modules restent corrects.
- Glossaire : les dix termes sont présents, uniques, définis et liés à
  la bonne page.
- Typographie : les nouvelles chaînes respectent les règles du cours.
- Sitemap : les cinq URL IA sont présentes.
- Header : le lien « IA » est présent et pointe vers `/ia`.

### 8.2 Smoke Playwright

Le smoke passe de 13 à 18 routes. Il vérifie :

- l’ouverture et le rechargement des cinq routes IA ;
- le titre de niveau 1 de chaque page ;
- l’absence d’erreur console ;
- l’absence de requête externe ;
- la navigation depuis le header et l’accueil ;
- une recherche « RAG » qui propose un résultat IA ;
- l’ouverture du glossaire et la présence d’un terme IA ;
- l’impression d’une page IA sans masquer le contenu.

### 8.3 Commandes

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run smoke
```

Le smoke utilise `SMOKE_BASE_URL` si le port 4173 est occupé. La valeur
par défaut reste `http://127.0.0.1:4173/gestion-projet-it`.

Lighthouse est exécuté sur l’accueil et `/ia` en mobile. Les scores
sont lus dans le JSON, même si le CLI retourne une erreur de nettoyage
de profil temporaire sous Windows.

### 8.4 Vérification manuelle

- 390 px, 768 px et 1440 px : pas de débordement horizontal.
- Tableaux : défilement horizontal accessible au clavier.
- Navigation au clavier : header, sommaire, liens, précédent/suivant.
- Impression d’une page thématique : contenu, checklist et sources
  visibles.
- Recherche : « RAG », « hallucination », « agent ».
- Aucun cookie, aucune requête externe, aucune erreur console.

## 9. Risques et parades

- **Obsolescence des outils** : catégories plutôt que classements,
  exemples datés, date de veille, révision documentée.
- **Effet de recommandation** : pas de palmarès, pas de lien
  d’affiliation, pas de tutoriel par éditeur.
- **Dérive juridique** : principes et sources officielles, mention
  explicite que le contenu n’est pas un conseil juridique.
- **Contenu trop long** : volume cible par page, cinq ou six sections,
  renvois aux modules existants.
- **Répétition avec les modules** : la section apporte l’angle IA,
  elle ne réécrit pas les fiches.
- **Navigation surchargée** : libellé court « IA », test mobile.
- **Régression de la recherche** : généralisation typée, tests des
  résultats modules et IA.
- **Accessibilité des tableaux** : `caption`, `scope`, défilement
  clavier, test manuel.
- **Bundle** : aucune dépendance, aucune image, mesure Lighthouse.
- **Sources obsolètes ou liées** : URL officielles stables, contrôle
  à la rédaction et date de veille.
- **Confusion avec un dixième module** : pas de compteur, pas d’XP,
  pas de bouton « Terminé », route et vocabulaire distincts.

## 10. Livraison

La livraison Docker n’est pas incluse dans l’implémentation tant que
l’utilisateur ne l’a pas autorisée explicitement.

Si elle est autorisée :

- remplacer le build dans `Docker/gestion-projet-it/` sans conserver
  les anciens assets hachés ;
- ajouter l’entrée de changelog avec les résultats réels des tests, du
  smoke, de Lighthouse et les empreintes ;
- vérifier que la carte hub du module reste active, sans créer de
  nouvelle carte ni retirer un badge existant ;
- ajouter les cinq URL au sitemap racine et vérifier la modal
  « À venir » sans créer de nouvelle entrée ;
- ne pas toucher aux modifications non liées du dépôt plateforme ;
- commit et push uniques après validation.

La version de livraison sera la prochaine version libre au moment du
dépôt, après vérification du changelog plateforme.

## 11. Critères d’acceptation

1. Les cinq routes IA répondent au clic et au rechargement.
2. Le header et l’accueil exposent la section sans modifier les neuf
   modules ni le capstone.
3. Chaque page contient un `h1`, un sommaire, cinq ou six sections, un
   encadré « À retenir », une checklist et des sources datées.
4. Le glossaire contient les dix termes IA.
5. La recherche trouve les pages IA et navigue vers la bonne ancre.
6. Le sitemap contient les cinq URL et le service worker est en v5.
7. Aucun compteur, XP, stockage ou clé existante n’est modifié.
8. Aucune dépendance, aucun cookie, aucune requête externe et aucune
   ressource externe ne sont ajoutés.
9. L’affichage reste lisible à 390 px, 768 px et 1440 px.
10. Les tests, le lint, le typecheck, le build et le smoke passent.
11. Lighthouse mobile est supérieur ou égal à 90 sur l’accueil et
    `/ia`.
12. Aucun fichier n’est copié dans Docker sans accord explicite.

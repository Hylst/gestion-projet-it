# Backlog Gestion de Projet IT

**Version :** 2026-10-24
**Périmètre :** contenu pédagogique, parcours, ressources, outils, qualité et documentation.
**Source de vérité :** ce backlog ne remplace pas le cahier des charges ni une spec. Il sert à choisir le prochain lot.

## Comment lire ce backlog

- **P0** : socle cohérent à planifier en premier.
- **P1** : enrichissement à fort intérêt après le socle.
- **P2** : amélioration utile mais non bloquante.
- **S** : quelques heures à une journée.
- **M** : un à trois jours.
- **L** : plus de trois jours, à découper avant planification.
- **Livré** : présent dans le dépôt.
- **En revue** : rédigé, en attente de PR et CI.
- **Prêt** : assez précis pour être planifié.
- **Candidat** : idée validée mais pas encore découpée.

Chaque item doit rester compatible avec les non-objectifs du projet. Un item qui exige un backend, un compte, un cookie, une ressource chargée automatiquement ou une dépendance runtime est écarté.

## Vue d’ensemble

| Capacité | Items | P0 | P1 | P2 |
| --- | ---: | ---: | ---: | ---: |
| Documentation et gouvernance | 7 | 6 | 0 | 1 |
| Approfondissement des modules | 8 | 3 | 5 | 0 |
| Parcours Produit | 8 | 0 | 8 | 0 |
| Parcours Cybersécurité | 8 | 0 | 8 | 0 |
| Ressources et outils | 5 | 0 | 4 | 1 |
| Qualité et plateforme | 8 | 0 | 2 | 6 |
| **Total** | **44** | **9** | **27** | **8** |

## Lot P0 livré

Le premier lot de contenu est livré au 24 octobre 2026 :

1. `ENR-001` Audit éditorial des neuf modules.
2. `ENR-002` Erreurs fréquentes dans les neuf modules.
3. `ENR-003` Points de décision dans les neuf modules.
4. `RES-001` Bibliothèque de ressources officielles.
5. `RES-004` Politique de sources et dates de vérification.
6. `QUA-001` Audit WCAG 2.2 AA des pages du lot ; parcours reportés à leur ouverture.

## Lot P1 livré

1. `ENR-004` Exercices de transfert.
2. `ENR-005` Glossaire étendu.
3. `ENR-007` Pré-mortem et revue des risques.
4. `RES-002` Fiches outils normalisées.
5. `RES-005` Grille de comparaison d’outils.
6. `QUA-002` Parcours clavier et focus.

## Lot P2 livré

1. `ENR-006` Journal de projet fictif.
2. `ENR-008` Revue par les pairs.
3. `RES-003` Modèles imprimables.
4. `QUA-003` Budget Lighthouse.
5. `QUA-004` Vérification des liens documentaires.
6. `QUA-005` Recherche avec synonymes.

`QUA-001` reste ouvert pour l’audit des parcours à leur ouverture. Le prochain lot reste à cadrer après validation du lot P2. Les parcours Produit et Cybersécurité restent P1 et ne démarrent qu’après validation du lot P0.

---

## Documentation et gouvernance

### DOC-001 README du projet
`P0` · `S` · `Livré`
**Résultat :** un README opérationnel avec état, routes, commandes, tests, CI, confidentialité et index documentaire.
**Acceptation :** une personne peut installer, lancer, tester et construire le projet sans lire une spec.
**Preuve :** `README.md` relu et liens internes valides.
**Vigilance :** ne pas dupliquer le cahier des charges.

### DOC-002 Backlog central
`P0` · `S` · `Livré`
**Résultat :** un backlog unique, priorisé et actionnable.
**Acceptation :** chaque item a un identifiant, une priorité, un effort, une dépendance, un résultat et une acceptation.
**Preuve :** ce fichier et revue de cohérence avec les specs.
**Vigilance :** ne pas transformer le backlog en catalogue de vœux.

### DOC-003 Index des specs et plans
`P0` · `S` · `Livré`
**Résultat :** `docs/README.md` indexe les specs et plans avec leur statut.
**Acceptation :** les specs et plans du dossier projet et de la section IA sont présents et liés.
**Preuve :** index, liens relatifs et `git status`.
**Vigilance :** conserver les documents historiques sans les réécrire.

### DOC-004 Mise à jour des règles agents
`P0` · `S` · `Livré`
**Résultat :** `agents.md` décrit l’état réel, les commandes, la CI et la règle PR + CI.
**Acceptation :** les consignes de source, build, tests, confidentialité et documentation sont cohérentes avec le README.
**Preuve :** relecture croisée `agents.md` et `README.md`.
**Vigilance :** ne pas affaiblir les interdictions existantes.

### DOC-005 Addendum au cahier des charges
`P0` · `S` · `Livré`
**Résultat :** un addendum daté indique les neuf modules, le dossier projet, la section IA et le backlog.
**Acceptation :** la section historique v2 est identifiée comme livrée, sans réécrire l’histoire du MVP.
**Preuve :** section 18 et note d’état.
**Vigilance :** le cahier des charges reste la source de vision, pas un journal de projet.

### DOC-006 Changelog documentaire
`P0` · `S` · `Livré`
**Résultat :** le changelog mentionne le README, le backlog, l’index et les specs intégrées.
**Acceptation :** aucune modification applicative n’est annoncée à tort.
**Preuve :** section « Non publié ».
**Vigilance :** ne pas mélanger documentation et version applicative.

### DOC-007 ADR sur les parcours autonomes
`P2` · `S` · `Candidat`
**Résultat :** une décision courte explique pourquoi les parcours Produit et Cybersécurité ne comptent ni XP ni `0/9`.
**Acceptation :** architecture, raisons, alternatives et conséquences sont explicites.
**Preuve :** `docs/adr/` ou section dédiée.
**Vigilance :** ne pas créer de débat de doctrine sur les méthodes.

---

## Approfondissement des modules

### ENR-001 Audit éditorial des neuf modules
`P0` · `M` · `Livré`
**Résultat :** une matrice des neuf modules avec sections présentes, manques, doublons et ressources.
**Acceptation :** chaque module a une liste d’actions courtes et priorisées.
**Preuve :** `docs/superpowers/specs/2026-10-24-audit-editorial-modules.md`.
**Vigilance :** corriger les manques, ne pas réécrire pour le plaisir.

### ENR-002 Erreurs fréquentes
`P0` · `M` · `Livré`
**Résultat :** trois à cinq erreurs concrètes par module, avec conséquence et correction.
**Acceptation :** chaque erreur est observable sur le fil rouge, sans jugement d’école.
**Preuve :** `src/modules/m*/guide.ts`, `tests/module-guide.test.tsx`, `tests/typo.test.tsx`.
**Vigilance :** éviter les listes génériques de type « bien communiquer ».

### ENR-003 Points de décision
`P0` · `M` · `Livré`
**Résultat :** un guide court par module pour choisir entre deux ou trois options.
**Acceptation :** critères, limites et cas de non-usage sont explicites.
**Preuve :** `src/components/ModuleGuide.tsx`, `tests/module-guide.test.tsx`.
**Vigilance :** ne pas présenter une méthode comme supérieure.

### ENR-004 Exercices de transfert
`P1` · `L` · `Livré`
**Résultat :** un exercice supplémentaire par module, proche du fil rouge, avec correction.
**Acceptation :** ne modifie ni les XP ni le compteur `0/9`; correction accessible et courte.
**Preuve :** `src/modules/m*/exercice.tsx`, `tests/transfert.test.tsx`, 233 tests.
**Vigilance :** ne pas dupliquer l’exercice existant.

### ENR-005 Glossaire étendu
`P1` · `S` · `Livré`
**Résultat :** vingt termes supplémentaires reliés aux modules et aux parcours.
**Acceptation :** définitions courtes, uniques, accentuées et liées à une page.
**Preuve :** `src/lib/glossaire.ts`, `tests/glossaire.test.ts`.
**Vigilance :** éviter les sigles sans définition.

### ENR-006 Journal de projet fictif
`P1` · `M` · `Livré`
**Résultat :** un journal guidé qui traverse les neuf modules et le dossier projet.
**Acceptation :** chaque entrée a un format court, une décision et une suite.
**Preuve :** `/modeles`, `src/lib/journal.ts`, `src/routes/Modeles.tsx`, `tests/modeles.test.tsx` et smoke de saisie locale.
**Vigilance :** ne pas créer un second capstone concurrent.

### ENR-007 Pré-mortem et revue des risques
`P1` · `S` · `Livré`
**Résultat :** un atelier court pour imaginer les échecs avant de planifier.
**Acceptation :** exemple fictif, grille de risques et décisions associées.
**Preuve :** `src/modules/m6-equipe/preMortem.tsx`, `tests/transfert.test.tsx`.
**Vigilance :** ne pas promettre de prédire les risques.

### ENR-008 Revue par les pairs
`P2` · `S` · `Livré`
**Résultat :** une grille de revue courte pour un livrable de projet.
**Acceptation :** critères observables, ton non défensif, aucune obligation d’outil.
**Preuve :** section « Revue par les pairs » de `/modeles`, test de charte et test de rendu.
**Vigilance :** ne pas transformer la revue en audit de personne.

---

## Parcours Produit

### PRO-001 Hub et routes du parcours Produit
`P1` · `M` · `Candidat`
**Résultat :** un hub et cinq routes autonomes, sans XP.
**Acceptation :** navigation, SEO, fil d’Ariane et retour au cours fonctionnent.
**Preuve :** tests de routes, smoke et sitemap.
**Vigilance :** ne pas modifier le compteur `0/9`.

### PRO-002 Découverte et problème
`P1` · `M` · `Candidat`
**Résultat :** une page pour distinguer besoin, problème, solution et hypothèse.
**Acceptation :** exemple fictif, critères de sortie et pièges.
**Preuve :** contenu et test de charte.
**Vigilance :** ne pas réduire la découverte à une réunion.

### PRO-003 Entretiens et besoins
`P1` · `M` · `Candidat`
**Résultat :** une page sur les entretiens, l’écoute et la synthèse.
**Acceptation :** guide de questions, relances, biais et consentement fictif.
**Preuve :** labo de guide d’entretien.
**Vigilance :** aucun témoignage réel inventé.

### PRO-004 Priorisation et arbitrage
`P1` · `M` · `Candidat`
**Résultat :** une page pour comparer valeur, effort, risque et dépendances.
**Acceptation :** plusieurs méthodes présentées avec limites, sans dogme.
**Preuve :** labo de matrice de priorisation.
**Vigilance :** ne pas donner de formule magique.

### PRO-005 Roadmap, tranches et MVP
`P1` · `M` · `Candidat`
**Résultat :** une page pour découper une roadmap en tranches livrables.
**Acceptation :** distinction roadmap, plan et engagement; exemple fictif.
**Preuve :** exercice corrigé.
**Vigilance :** ne pas promettre que le MVP suffit toujours.

### PRO-006 Mesure, apprentissage et arrêt
`P1` · `M` · `Candidat`
**Résultat :** une page sur les indicateurs, les expériences et la décision d’arrêter.
**Acceptation :** indicateur relié à une question, pas à une vanité.
**Preuve :** exercice de choix d’indicateur.
**Vigilance :** aucun chiffre réel sans source.

### PRO-007 Labos Produit
`P1` · `L` · `Candidat`
**Résultat :** trois labos accessibles : entretien, arbre d’opportunités, priorisation.
**Acceptation :** clavier, focus, messages d’erreur et validation.
**Preuve :** tests de composants et smoke.
**Vigilance :** ne pas créer de faux formulaire de collecte.

### PRO-008 Intégration Produit
`P1` · `M` · `Candidat`
**Résultat :** recherche, glossaire, sitemap, service worker et accueil reliés au parcours.
**Acceptation :** zéro requête externe, zéro erreur console.
**Preuve :** tests et smoke.
**Vigilance :** ne pas coupler l’ordre des pages à un tableau fragile.

---

## Parcours Cybersécurité

### CYB-001 Hub et routes du parcours Cybersécurité
`P1` · `M` · `Candidat`
**Résultat :** un hub et cinq routes autonomes, sans XP.
**Acceptation :** navigation, SEO, fil d’Ariane et retour au cours fonctionnent.
**Preuve :** tests de routes, smoke et sitemap.
**Vigilance :** ne pas modifier le compteur `0/9`.

### CYB-002 Menaces et modèle de menace
`P1` · `M` · `Candidat`
**Résultat :** une page pour identifier actifs, menaces et parades proportionnées.
**Acceptation :** exemple fictif, vocabulaire expliqué, aucune promesse de sécurité totale.
**Preuve :** labo de modèle de menace.
**Vigilance :** ne pas donner de conseil d’attaque opérationnel.

### CYB-003 Accès, rôles et secrets
`P1` · `M` · `Candidat`
**Résultat :** une page sur moindre privilège, comptes, secrets et rotation.
**Acceptation :** exemple fictif, procédure de retrait et preuve de contrôle.
**Preuve :** labo de matrice d’accès.
**Vigilance :** aucun secret réel dans les exemples.

### CYB-004 Dépendances, fournisseurs et chaîne logicielle
`P1` · `M` · `Candidat`
**Résultat :** une page sur les dépendances, versions, fournisseurs et sortie.
**Acceptation :** critères de choix, risques de verrouillage et plan de sortie.
**Preuve :** fiche outil et exercice.
**Vigilance :** ne pas cibler un éditeur.

### CYB-005 Données, RGPD et AI Act
`P1` · `M` · `Candidat`
**Résultat :** une page pour situer données personnelles, base légale, rôles et obligations.
**Acceptation :** sources officielles datées, distinction information et conseil juridique.
**Preuve :** sources et test de charte.
**Vigilance :** aucun conseil juridique personnalisé.

### CYB-006 Incident, sauvegarde et reprise
`P1` · `M` · `Candidat`
**Résultat :** une page sur la détection, la décision, la communication et le retour d’expérience.
**Acceptation :** chronologie fictive, rôles, preuves et amélioration.
**Preuve :** labo de chronologie d’incident.
**Vigilance :** ne pas dramatiser ni promettre une reprise sans test.

### CYB-007 Labos Cybersécurité
`P1` · `L` · `Candidat`
**Résultat :** trois labos accessibles : modèle de menace, matrice d’accès, chronologie.
**Acceptation :** clavier, focus, messages d’erreur et validation.
**Preuve :** tests de composants et smoke.
**Vigilance :** aucun scénario réel d’attaque.

### CYB-008 Intégration Cybersécurité
`P1` · `M` · `Candidat`
**Résultat :** recherche, glossaire, sitemap, service worker et accueil reliés au parcours.
**Acceptation :** zéro requête externe, zéro erreur console.
**Preuve :** tests et smoke.
**Vigilance :** ne pas dupliquer les sources IA.

---

## Ressources et outils

### RES-001 Bibliothèque de ressources officielles
`P1` · `M` · `Livré`
**Résultat :** une ressource à trois par module et par parcours, datée et qualifiée.
**Acceptation :** organisme, titre, usage, limite et date de vérification.
**Preuve :** `src/lib/ressources.ts`, `/ressources`, 18 ressources de modules et 6 de parcours, `tests/ressources.test.tsx`.
**Vigilance :** aucun lien d’affiliation, aucun contenu généré non relu.

### RES-002 Fiches outils normalisées
`P1` · `M` · `Livré`
**Résultat :** des fiches internes pour les familles d’outils : suivi, documentation, diagrammes, tests, sécurité, accessibilité.
**Acceptation :** utilité, moment, limites, alternatives, coût d’entrée et critères de sortie.
**Preuve :** `/outils`, `src/lib/outils.ts`, `tests/outils.test.tsx`.
**Vigilance :** ne pas classer les outils de façon absolue.

### RES-003 Modèles imprimables
`P2` · `M` · `Livré`
**Résultat :** WBS, RACI, registre des risques, plan de recette, journal de décisions et guide d’entretien.
**Acceptation :** impression lisible, aucun champ inutile, exemple fictif.
**Preuve :** six modèles sur `/modeles`, `tests/modeles.test.tsx` et smoke.
**Vigilance :** ne pas créer de formulaires qui collectent des données.

### RES-004 Politique de sources et de veille
`P1` · `S` · `Livré`
**Résultat :** une règle écrite pour accepter, dater, vérifier et retirer une ressource.
**Acceptation :** organisme identifiable, date, limite, revue périodique.
**Preuve :** `docs/sources.md`, section « Sources et ressources » dans `agents.md`.
**Vigilance :** ne pas confondre source officielle et opinion.

### RES-005 Grille de comparaison d’outils
`P1` · `S` · `Livré`
**Résultat :** une grille de critères pour choisir un outil sans dogme.
**Acceptation :** coût, données, intégration, sortie, accessibilité, dépendance.
**Preuve :** grille sur `/outils`, `CRITERES_OUTILS`, `tests/outils.test.tsx`.
**Vigilance :** ne pas transformer la grille en classement marketing.

---

## Qualité et plateforme

### QUA-001 Audit WCAG 2.2 AA
`P1` · `M` · `En cours`
**Résultat :** audit des nouvelles pages et parcours.
**Acceptation :** contrastes, structure, labels, focus, clavier et messages d’erreur.
**Preuve :** `docs/accessibilite/audit-2026-10-24.md`, smoke 14/14 et Lighthouse 100 en accessibilité sur les pages contrôlées. Les pages des lots P0, P1 et P2 sont auditées ; le volet parcours reste à faire à leur ouverture.
**Vigilance :** ne pas se limiter à Lighthouse.

### QUA-002 Parcours clavier et focus
`P1` · `S` · `Livré`
**Résultat :** tests de navigation clavier sur les nouveaux parcours et labos.
**Acceptation :** ordre logique, focus visible, aucune trappe.
**Preuve :** smoke `/outils` et lien pré-mortem de M6 ; aucun nouveau labo dans ce lot.
**Vigilance :** ne pas ajouter de gestionnaire inline.

### QUA-003 Budget Lighthouse
`P2` · `M` · `Livré`
**Résultat :** seuils explicites pour performance, accessibilité et bonnes pratiques.
**Acceptation :** seuil mobile, page de référence et procédure en cas d’échec.
**Preuve :** `docs/qualite/lighthouse.md` et mesures du 24 octobre 2026.
**Vigilance :** le CLI Lighthouse peut sortir en erreur de nettoyage sous Windows.

### QUA-004 Vérification des liens documentaires
`P2` · `M` · `Livré`
**Résultat :** un contrôle scripté des liens internes et de la cohérence des routes.
**Acceptation :** liens relatifs, routes et sitemap contrôlés ; les URL externes restent vérifiées manuellement et datées.
**Preuve :** `scripts/check-liens.mjs`, 32 liens relatifs et 21 routes contrôlés, exécution en CI.
**Vigilance :** ne pas ajouter de requête réseau au runtime de l’application.

### QUA-005 Recherche avec synonymes
`P2` · `M` · `Livré`
**Résultat :** recherche tolérante sur quelques synonymes métier.
**Acceptation :** résultats pertinents, aucun faux positif massif.
**Preuve :** `tests/search.test.ts`, six familles de synonymes.
**Vigilance :** ne pas dégrader la recherche existante.

### QUA-006 Stratégie hors ligne
`P2` · `M` · `Candidat`
**Résultat :** préciser ce qui reste disponible hors ligne et ce qui est mis en cache.
**Acceptation :** pas de mise en cache de ressources externes, version de service worker incrémentée.
**Preuve :** test de rechargement hors ligne.
**Vigilance :** ne pas cacher de données sensibles.

### QUA-007 Badge de parcours optionnel
`P2` · `M` · `Candidat`
**Résultat :** badge local de complétion pour Produit ou Cybersécurité.
**Acceptation :** aucun XP, aucun impact sur `0/9`, réinitialisable.
**Preuve :** test de stockage local.
**Vigilance :** ne pas créer une certification implicite.

### QUA-008 Mouvement réduit et contrastes
`P2` · `S` · `Candidat`
**Résultat :** respect de `prefers-reduced-motion` et vérification des contrastes.
**Acceptation :** animations désactivables, focus et textes lisibles.
**Preuve :** audit et test manuel.
**Vigilance :** ne pas casser les animations existantes.

---

## Approches et ressources à étudier

### Approches pédagogiques

- Étude de cas longitudinale sur les Amis du Square.
- Guides de décision avant les fiches de méthode.
- Diagnostic de projet en difficulté, avec indices et décisions.
- Revue par les pairs et pré-mortem.
- Répétition espacée pour les définitions et les sigles.
- Journal de projet personnel, local et exportable.
- Exercices de transfert vers un autre contexte fictif.

### Ressources cibles

- W3C et WAI pour l’accessibilité.
- ANSSI, CNIL, NIST et OWASP pour la cybersécurité.
- Documentation officielle des outils cités.
- Guides de méthode publiés par les organismes qui les portent.
- Aucune source sans organisme, date et usage recommandé.

### Outils à documenter

- Suivi : GitHub Projects, GitLab, Jira, Trello.
- Documentation : dépôt, wiki, Confluence, Notion.
- Diagrammes : diagrams.net, Excalidraw, Mermaid.
- Tests et CI : GitHub Actions, GitLab CI, Playwright, Vitest.
- Sécurité : gestionnaire de secrets, analyse de dépendances, sauvegarde.
- Accessibilité : audits clavier, contraste, lecteur d’écran.

Ces outils sont des exemples de familles, pas des recommandations absolues. Toute fiche doit inclure limites, alternatives et critères de sortie.

## Non objectifs

- Backend, comptes, cookies, analytics ou collecte de données.
- Certification, équivalence de diplôme ou promesse d’embauche.
- Dixième et onzième modules classiques.
- XP ou compteur `0/9` pour les parcours.
- Ressources chargées automatiquement ou embeds.
- Contenus générés sans relecture.
- Témoignages, auteurs ou chiffres inventés.
- Classement absolu d’outils ou d’écoles.
- Refonte graphique complète sans besoin démontré.

## Rituel de mise à jour

- À chaque cycle : relire les P0, vérifier les dépendances et retirer les items obsolètes.
- À chaque publication : mettre à jour le changelog et les dates de vérification des sources.
- Tous les trois mois : vérifier les liens, les versions et les formulations devenues ambiguës.
- Après chaque nouveau parcours : vérifier qu’il ne duplique pas un module et qu’il reste sans XP.

# Design : enrichissements du contenu et du backlog

**Date :** 2026-10-23
**Statut :** validé par l’utilisateur ; lot P0 livré le 24 octobre 2026.
**Périmètre :** documentation, backlog et cadrage des prochains enrichissements.
**Hors périmètre du cycle documentaire initial :** aucune modification de code applicatif.

## 1. Contexte

L’application compte neuf modules, un dossier projet en six étapes et une section IA en cinq pages. Les parcours sont accessibles sans compte, sans backend, sans cookie et sans requête externe au chargement.

La documentation est en retard sur le produit :

- le `cahier_des_charges.md` décrit encore un MVP à six modules et une feuille de route v2 dont les trois modules sont déjà livrés ;
- il n’existe ni `README.md` ni backlog centralisé ;
- les specs et plans du dossier projet et de la section IA ne sont pas encore intégrés au dépôt publié ;
- les prochains enrichissements ne sont pas priorisés.

Le prochain cycle doit donc remettre la documentation au niveau du produit, puis cadrer deux parcours autonomes et un ensemble d’enrichissements pédagogiques.

## 2. Décisions validées

- Priorité mixte : contenu pédagogique et qualité produit.
- Approfondir les neuf modules existants avant de multiplier les nouveaux parcours.
- Ajouter deux parcours : Produit et Cybersécurité.
- Les parcours sont autonomes : routes dédiées, aucun XP, compteur `0/9` inchangé, badge optionnel renvoyé à plus tard.
- Backlog structuré par capacités, avec priorités, efforts, dépendances et critères d’acceptation.
- Documentation complétée : README, backlog, specs manquantes, agents et addendum au cahier des charges.
- Dépôt privé, contrôle manuel : PR et CI verte avant fusion. La protection de branche GitHub n’est pas disponible sur l’offre gratuite pour un dépôt privé.

## 3. Objectifs

1. Rendre la documentation utilisable par une personne qui découvre le dépôt.
2. Distinguer clairement l’état livré, les décisions durables et le backlog des idées futures.
3. Donner un vocabulaire commun pour prioriser sans disperser le cours.
4. Préparer deux parcours cohérents avec la charte existante.
5. Définir une politique de ressources et d’outils compatible avec l’autonomie et la confidentialité de l’application.

## 4. Non-objectifs

- Ajouter un backend, un compte, un cookie ou un analytics.
- Modifier le compteur `0/9`, les clés XP ou les neuf modules existants dans ce cycle.
- Créer un dixième ou onzième module classique.
- Ajouter une certification, une équivalence de diplôme ou une promesse d’employabilité.
- Charger automatiquement une ressource, une fonte, une image ou un script externe.
- Coller des contenus générés sans relecture, des témoignages inventés ou des chiffres sans source.
- Ajouter une dépendance runtime pour les fiches outils, les ressources ou les parcours.

## 5. Architecture documentaire

### 5.1 Hiérarchie des sources

1. `cahier_des_charges.md` : vision, contraintes durables et addendum d’état.
2. `README.md` : entrée opérationnelle du dépôt.
3. `BACKLOG.md` : priorités et prochains lots.
4. `docs/superpowers/specs/` : décisions de conception par cycle.
5. `docs/superpowers/plans/` : exécution détaillée d’un cycle.
6. `CHANGELOG.md` : état publié et vérifications.

En cas de contradiction, le cahier des charges et les décisions validées priment. Le backlog ne remplace pas une spec.

### 5.2 Fichiers à créer ou compléter

- `README.md` : présentation, routes, commandes, architecture, tests, CI, déploiement, confidentialité et index documentaire.
- `BACKLOG.md` : backlog unique par capacités.
- `docs/README.md` : index des specs et plans, avec statut et ordre de lecture.
- `docs/superpowers/specs/2026-10-23-enrichissements-design.md` : ce document.
- `docs/superpowers/specs/2026-10-21-dossier-projet-design.md` : spec existante à intégrer.
- `docs/superpowers/plans/2026-10-21-dossier-projet.md` : plan existant à intégrer.
- `docs/superpowers/specs/2026-10-22-ia-gestion-projet-design.md` : spec existante à intégrer.
- `docs/superpowers/plans/2026-10-22-ia-gestion-projet.md` : plan existant à intégrer.
- `agents.md` : état réel, commandes, CI, documentation et règles de collaboration.
- `cahier_des_charges.md` : addendum daté, sans réécrire l’histoire du MVP.
- `CHANGELOG.md` : section non publiée pour la documentation.

### 5.3 Index documentaire

`docs/README.md` liste chaque spec et chaque plan avec :

- la date ;
- le statut : livré, en cours, historique ;
- le périmètre ;
- l’ordre de lecture recommandé ;
- les liens vers le backlog et le changelog.

## 6. Modèle de backlog

### 6.1 Capacités

- **Approfondissement** : qualité et densité des neuf modules.
- **Parcours Produit** : découverte, problème, priorisation, mesure.
- **Parcours Cybersécurité** : menaces, accès, dépendances, données, incident.
- **Ressources et outils** : bibliothèque, fiches, modèles et critères de choix.
- **Qualité et plateforme** : accessibilité, performance, PWA, recherche, tests.
- **Documentation et gouvernance** : README, specs, ADR, politique de sources.

### 6.2 Champs d’un item

Chaque item contient :

- un identifiant stable ;
- un titre orienté résultat ;
- la capacité ;
- la priorité P0, P1 ou P2 ;
- l’effort S, M ou L ;
- les dépendances ;
- le résultat attendu ;
- les critères d’acceptation ;
- la preuve attendue ;
- les risques ou points de vigilance.

### 6.3 Priorités

- **P0** : nécessaire pour rendre la documentation et le socle pédagogique cohérents. Peut être planifié immédiatement.
- **P1** : enrichissement à fort intérêt, après le socle. Inclut les deux parcours.
- **P2** : amélioration utile mais non bloquante, à garder pour un cycle ultérieur.

### 6.4 Règles de priorisation

Un item monte en priorité si :

- il réduit une contradiction documentaire ;
- il améliore la compréhension d’un module existant ;
- il évite une duplication de contenu ;
- il peut être vérifié par un test, un lien ou une source ;
- il reste compatible avec le mode 100 % front.

Un item descend ou sort si :

- il ajoute une dépendance runtime ;
- il duplique une section existante ;
- il transforme le cours en catalogue d’outils ;
- il promet une certification ou un résultat professionnel.

## 7. Enrichissements de contenu

### 7.1 Les neuf modules

Chaque module reçoit un modèle d’enrichissement homogène :

- **Erreurs fréquentes** : trois à cinq erreurs concrètes, avec conséquence et correction.
- **Point de décision** : un guide court pour choisir entre deux ou trois options, avec critères et limites.
- **Exercice de transfert** : un cas proche du fil rouge, corrigé, sans XP supplémentaire.
- **Ressource officielle** : une à trois références datées, liées à un usage précis.
- **Fiche outil** : utilité, moment, limites, alternatives et coût d’entrée.

Le fil rouge reste la refonte fictive des Amis du Square. Aucun exemple ne doit laisser croire à un projet réel.

### 7.2 Parcours Produit

Structure prévue : un hub et cinq pages.

1. Découverte et problème.
2. Entretiens et besoins.
3. Priorisation et arbitrage.
4. Roadmap, tranches et MVP.
5. Mesure, apprentissage et arrêt.

Trois labos prévus :

- guide d’entretien avec relances ;
- arbre d’opportunités ;
- matrice de priorisation avec critères explicites.

Le parcours décrit plusieurs approches sans école supérieure. Les outils de priorisation sont présentés avec leurs limites.

### 7.3 Parcours Cybersécurité

Structure prévue : un hub et cinq pages.

1. Menaces et modèle de menace.
2. Accès, rôles et secrets.
3. Dépendances, fournisseurs et chaîne logicielle.
4. Données, RGPD et AI Act.
5. Incident, sauvegarde et reprise.

Trois labos prévus :

- modèle de menace simple ;
- matrice des accès ;
- chronologie d’incident et décisions.

Les références visées sont officielles : ANSSI, CNIL, NIST, OWASP et W3C lorsque pertinent. Aucun conseil juridique personnalisé.

### 7.4 Ressources et outils

La bibliothèque de ressources est une liste de liens documentaires, jamais un chargement automatique.

Chaque ressource est qualifiée par :

- organisme ;
- titre ;
- date ou version ;
- usage recommandé ;
- limite ;
- date de dernière vérification.

Les fiches outils sont des pages internes, sans embed ni API : objectif, moment d’usage, limites, alternatives, coût d’entrée et critères de sortie.

### 7.5 Approches transverses

- Journal de projet fictif, réutilisable dans plusieurs modules.
- Pré-mortem et revue des risques.
- Revue par les pairs avec grille courte.
- Diagnostic d’un projet en difficulté.
- Modèles imprimables : WBS, RACI, registre des risques, plan de recette, journal de décisions.
- Parcours de révision par répétition espacée, à étudier en P2.

## 8. Politique de ressources

- Aucune ressource externe n’est chargée au runtime.
- Un lien externe s’ouvre uniquement après action de l’utilisateur.
- Les liens sont datés et vérifiés avant publication.
- Une ressource sans organisme identifiable est écartée.
- Un chiffre sans source est retiré.
- Une ressource peut devenir obsolète : le backlog prévoit une revue périodique.
- Les outils commerciaux sont cités sans classement absolu et sans lien d’affiliation.

## 9. Qualité et vérification

- Tests de typographie et de charte sur tout nouveau contenu.
- Liens internes et ancres vérifiés.
- Aucun placeholder, `TODO` ou source non datée.
- Accessibilité clavier, contrastes, labels et structure de titres.
- Smoke Playwright sur les nouvelles routes.
- Lighthouse mobile au moins 90 en performance et accessibilité.
- Aucune requête externe au chargement.
- CI verte : lint, typecheck, tests, build.
- Fusion manuelle après PR et CI verte.

## 10. Risques et parades

| Risque | Parade |
| --- | --- |
| Backlog trop large | Priorités P0/P1/P2 et section « non objectifs » |
| Duplication avec les modules | Un item doit citer le module ou la page concernée |
| Catalogue d’outils sans recul | Fiches avec limites, alternatives et critères de sortie |
| Liens morts | Date de vérification et revue périodique |
| Parcours perçus comme des modules | Routes autonomes, aucun XP, aucun compteur |
| Contenu trop dense | Format court, encarts, checklists et exemples fictifs |
| Dérive vers un backend | Non objectifs explicites et revue à chaque cycle |
| Protection GitHub indisponible | PR et CI verte obligatoires par convention |

## 11. Critères d’acceptation du cycle documentaire

- `README.md` permet de lancer, tester, construire et comprendre le dépôt.
- `BACKLOG.md` contient des items identifiés, priorisés et vérifiables.
- Les specs et plans du dossier projet et de la section IA sont dans le dépôt.
- `docs/README.md` indexe les documents et leur statut.
- `agents.md` décrit l’état réel et le workflow PR + CI.
- Le cahier des charges contient un addendum qui remplace la feuille de route obsolète.
- Le changelog mentionne la mise à jour documentaire.
- Aucun fichier de code applicatif n’est modifié.
- La CI reste verte.

## 12. Suites

Le prochain cycle de contenu est choisi dans `BACKLOG.md`, en commençant par les items P0. Les deux parcours restent P1 jusqu’à validation du socle documentaire et pédagogique.

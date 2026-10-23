# Audit éditorial des neuf modules

**Date :** 24 octobre 2026
**Statut :** livré
**Périmètre :** neuf modules de `module-1` à `module-9`.
**Objectif :** repérer les manques, les doublons et les décisions à ajouter avant d’enrichir le contenu.

## 1. Méthode

Lecture des fichiers `index.tsx`, `fiche.tsx`, `filRouge.tsx`, `demarche.tsx`, `exercice.tsx`, `quiz.ts` et `ficheReflexe.ts` de chaque module. La grille retient trois erreurs observables sur le fil rouge fictif des Amis du Square, un point de décision court et une ressource officielle ou institutionnelle.

## 2. Matrice

| Module | Sections présentes | Manques principaux | Doublons | Erreurs retenues | Décision retenue | Ressource retenue |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Cadrer et découper | Fiche, fil rouge, démarche, labo WBS, exercices, quiz, fiche réflexe | Hiérarchie du WBS, dictionnaire, maîtrise du périmètre | Lots et couple dedans dehors répétés | WBS confondu avec planning ; paiement ajouté ; notice oubliée | Par livrables, par phases ou par rôles | APM, Scope management |
| 2. Planifier | Fiche, fil rouge, démarche, labo GANTT et PERT, exercices, quiz, fiche réflexe | Marges, ressources, calendrier, avancement réel | Cinq tâches et chaîne tendue répétées | Tests avant intégration ; jalon transformé en tâche ; barre déplacée sans dépendances | PERT, GANTT ou les deux | APM, Planning |
| 3. Méthodes | Fiche, fil rouge, démarche, labo, comparateur, exercices, quiz, fiche réflexe | Traçabilité besoin-test, entrée et sortie de phase, défauts | Critères de la page agenda et recette répétés | V pour besoin flou ; critères après réalisation ; non-régression oubliée | Cascade, cycle en V ou tranches | ISTQB, Glossary |
| 4. Agiles | Fiche, fil rouge, démarche, labos Kanban et poker, exercices, quiz, fiche réflexe | Sprint goal, incrément, mesures de flux, XP détaillé | Limite de WIP et format de story répétés | WIP dépassé ; Scrum sans backlog ; poker comme concours | Scrum ou Kanban | Scrum Guides et Kanban University |
| 5. Outils | Fiche, fil rouge, démarche, labos sélecteur et chaîne CI, exercices, quiz, fiche réflexe | Git, revue de code, secrets, promotion, retour arrière | Trois besoins du fil rouge répétés | Outil sans règle de mise à jour ; CI rouge ignorée ; Docker sans entretien | Outil dédié, tableau simple ou aucun outil | GitHub Actions et Docker |
| 6. Équipe et risques | Fiche, fil rouge, démarche, labos Eisenhower et risques, exercices, quiz, fiche réflexe | Capacité, conflits, propriétaire de risque, déclencheur | Eisenhower et registre répétés | Urgent confondu avec important ; registre sans propriétaire ; rétro sans action | Réduire, transférer ou accepter | APM Risk management et Orange Book |
| 7. Parties prenantes | Fiche, fil rouge, démarche, labo communication, exercices, quiz, fiche réflexe | Engagement, seuils d’escalade, journal de décisions | Plan de communication et canaux répétés | Financeur mal informé ; deux A dans le RACI ; canaux multiples | RACI, journal de décisions ou accord oral | APM Stakeholder management et Communication |
| 8. Budget | Fiche, fil rouge, démarche, labo provision, exercices, quiz, fiche réflexe | Structure de coûts, effort et durée, référence, valeur acquise | Lots pages, agenda et formulaire répétés | Chiffre unique ; marge pour un oubli ; total seul | Ascendant, analogie ou trois points | APM Budgeting and cost management et Green Book |
| 9. Changement | Fiche, fil rouge, démarche, labo adoption, exercices, quiz, fiche réflexe | Impact, segmentation, sponsor, preuve d’usage | Bénévoles, usagers, bureau et leviers répétés | Annonce sans pratique ; consignes contradictoires ; présents comptés | Formation, relais ou message répété | APM Change management et ANACT |

## 3. Actions par module

### Module 1

- Ajouter un encart sur la différence entre WBS et planning.
- Montrer une décision d’exclusion avec un motif écrit.
- Relier la notice des bénévoles à la définition de fini.

### Module 2

- Rappeler qu’un jalon est une décision, pas une tâche.
- Ajouter une vérification des dépendances après déplacement.
- Distinguer préparation des tests et exécution des tests.

### Module 3

- Relier chaque critère d’acceptation à un test observable.
- Ajouter un cas de non-régression après changement.
- Clarifier le choix entre cascade, V et tranches.

### Module 4

- Rendre visible l’effet d’une limite de WIP dépassée.
- Relier Scrum à un backlog priorisé et à un incrément.
- Rappeler que le poker planning sert à discuter, pas à noter une personne.

### Module 5

- Ajouter une règle d’entretien du tableau de suivi.
- Traiter la CI rouge comme un blocage de fusion.
- Distinguer image Docker et entretien des dépendances.

### Module 6

- Séparer urgence et importance sur un exemple du fil rouge.
- Ajouter propriétaire, déclencheur et revue au registre.
- Terminer la rétrospective par une action attribuée.

### Module 7

- Cartographier les parties prenantes qui peuvent bloquer.
- Rappeler la règle du A unique dans un RACI.
- Limiter le nombre de canaux et fixer un rythme.

### Module 8

- Remplacer le chiffre unique par une fourchette et des hypothèses.
- Distinguer marge d’aléa et oubli de périmètre.
- Comparer budget et dépense par lot.

### Module 9

- Relier l’annonce à une pratique guidée.
- Vérifier l’unicité de la consigne.
- Mesurer l’usage réel, pas seulement la présence.

## 4. Décisions de contenu

- Trois erreurs par module, avec conséquence et correction.
- Un point de décision à deux ou trois options, avec critères, limites et cas de non-usage.
- Une ou deux ressources par module, datées et qualifiées.
- Aucun jugement d’école, aucun chiffre sans source, aucun conseil juridique personnalisé.
- Les erreurs restent observables sur la refonte fictive des Amis du Square.

## 5. Limites

- L’audit ne remplace pas une relecture pédagogique par un tiers.
- Les ressources sont datées au 24 octobre 2026 et demandent une revue périodique.
- Les parcours Produit et Cybersécurité ne sont pas encore ouverts ; leurs ressources préparatoires sont séparées.

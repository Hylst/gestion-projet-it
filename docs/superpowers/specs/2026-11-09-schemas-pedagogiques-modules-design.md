# Schémas pédagogiques interactifs pour les modules : conception

Date : 9 novembre 2026
Statut : livré le 9 novembre 2026.
Périmètre : modules 3 (méthodes), 5 (outils) et 9 (conduite du changement) de Gestion de Projet IT.

## 1. Contexte et objectif

Le site propose des fiches de synthèse textuelles denses et complètes pour chacun des 9 modules. Cependant, certains concepts clés reposent sur une dynamique temporelle, un circuit ou une structure en miroir qui se prêtent particulièrement bien à une représentation graphique :
- le **cycle en V** (module 3), souvent confondu avec une cascade linéaire alors que sa force réside dans les tests préparés en miroir de chaque niveau de conception ;
- le **circuit d'une demande** (module 5), qui relie les outils de suivi, de code, d'intégration continue et de production dans un flux continu avec boucles de rétroaction ;
- la **courbe d'adoption** (module 9), qui montre les phases humaines de la conduite du changement (choc, résistance, acceptation, appropriation) et l'action managériale concrète associée à chacune.

L'objectif est d'intégrer dans la section `Fiche` de ces trois modules un schéma vectoriel SVG interactif et sobrement animé, respectant l'autonomie totale du site (100 % front, zéro dépendance externe, zéro requête réseau, rendu net à 320 px).

Objectifs précis :
1. Représenter visuellement la logique et la structure de chaque concept.
2. Proposer une interaction simple au clic, au survol et au clavier pour explorer les étapes et afficher une explication contextuelle.
3. Prévoir une animation fluide en CSS (trajet, impulsions, flux) qui s'arrête immédiatement si `prefers-reduced-motion` est actif.
4. Assurer une accessibilité irréprochable (`figure`, `figcaption`, boutons de sélection identifiés, mise à jour annoncée aux lecteurs d'écran).
5. Ne provoquer aucun débordement horizontal à 320 px et rester parfaitement lisible sur mobile.

## 2. Approches considérées

### Approche 1 : Composants React/SVG dédiés autonomes (Retenue)

Créer trois composants React dédiés (`SchemaCycleV.tsx`, `SchemaCircuitDemande.tsx`, `SchemaCourbeAdoption.tsx`), intégrés directement dans `fiche.tsx` de leurs modules respectifs.
- Chaque composant gère son état local d'étape sélectionnée, son SVG inline adapté, ses légendes et son interaction clavier/tactile.
- Avantages : code clair, modulaire, facilement testable unitairement avec Vitest et Testing Library, lazy-loadé avec le module sans impact sur le chargement initial de l'application.
- Inconvénients : chaque schéma a son propre balisage SVG sans mutualisation de géométrie.

### Approche 2 : Moteur générique piloté par données JSON (Écartée)

Créer un composant abstrait unique qui trace des boîtes et des flèches à partir d'un graphe JSON.
- Avantages : mutualisation du code d'affichage.
- Inconvénients : abstraction prématurée. Un cycle en V symétrique, un pipeline linéaire avec retours et une courbe en S ont des topologies, des contraintes d'espace et des comportements visuels totalement différents.

### Approche 3 : SVG inline statiques sans état React (Écartée)

Insérer le SVG brut dans le JSX avec des pseudo-classes CSS `:hover` et `:focus`.
- Avantages : zéro état JavaScript.
- Inconvénients : interaction médiocre sur écrans tactiles (absence de clic persistant) et impossibilité d'afficher un pavé d'explication textuelle dynamique synchronisé avec l'élément actif.

### Décision

L'**Approche 1** est retenue : composants dédiés autonomes, interactifs, légers et maintenables.

## 3. Spécifications détaillées des schémas et contenus

### 3.1 Schéma 1 : Cycle en V (`SchemaCycleV`) dans le module 3

- **Emplacement précis :** `src/modules/m3-methodes/fiche.tsx`, immédiatement avant le paragraphe sur les critères d'acceptation (entre la fin des limites du cycle et `<p><strong>Critères d’acceptation</strong>`).
- **Topologie :**
  - Branche descendante (gauche) : Besoin, Conception globale, Conception détaillée, Réalisation (Code).
  - Branche montante (droite) : Tests unitaires, Tests d'intégration, Tests système, Acceptation / Recette.
  - 4 paires en miroir reliées par des connecteurs horizontaux.
- **Contenus textuels par niveau :**
  1. **Niveau 1 : Besoin ↔ Acceptation / Recette**
     - *Ce qu'on valide :* La conformité avec les attentes initiales des usagers ou clients (le « pourquoi » du projet).
     - *Pourquoi en amont :* Les critères d'acceptation se définissent dès le cadrage pour que la recette ne soit pas une surprise.
  2. **Niveau 2 : Conception globale ↔ Tests système**
     - *Ce qu'on valide :* L'architecture globale, les flux de données principaux et les performances d'ensemble.
     - *Pourquoi en amont :* On prévoit le protocole de test système dès que l'architecture est arrêtée.
  3. **Niveau 3 : Conception détaillée ↔ Tests d'intégration**
     - *Ce qu'on valide :* La bonne communication entre modules, composants et services techniques.
     - *Pourquoi en amont :* Les contrats d'interface (API, formats de données) dictent immédiatement les scénarios de test.
  4. **Niveau 4 : Réalisation (Code) ↔ Tests unitaires**
     - *Ce qu'on valide :* Le bon fonctionnement individuel de chaque fonction ou bloc élémentaire.
     - *Pourquoi en amont :* Écrits au plus près du développement (souvent en TDD), ils sécurisent les modifications quotidiennes.
- **Interactions et états :**
  - Par défaut : niveau 1 sélectionné.
  - Sélection au clic, survol ou clavier (`tabIndex={0}`, `Enter`/`Space`) sur une paire.
  - Surlignage de la paire et affichage de l'encart explicatif dynamique avec `aria-live="polite"`.

### 3.2 Schéma 2 : Circuit d'une demande (`SchemaCircuitDemande`) dans le module 5

- **Emplacement précis :** `src/modules/m5-outils/fiche.tsx`, entre le paragraphe sur les environnements reproductibles et celui des limites communes.
- **Topologie :**
  - Flux horizontal en 6 étapes :
    1. **Besoin** (clarification)
    2. **Ticket** (suivi & backlog)
    3. **Branche** (développement isolé)
    4. **CI** (tests automatisés)
    5. **Recette** (vérification humaine)
    6. **Production** (déploiement & usage)
  - 2 boucles de retour représentées en pointillés :
    - *Boucle 1 :* De Recette vers Branche (rejet ou anomalie détectée lors de la recette).
    - *Boucle 2 :* De Production vers Besoin / Ticket (découverte d'un bug réel ou nouvelle demande d'évolution).
- **Contenus textuels par étape :**
  1. **Besoin :** Clarifier la valeur attendue et les critères d'acceptation avant d'engager le développement. *Règle :* Pas de code sans besoin validé.
  2. **Ticket :** Enregistrer la demande dans l'outil de suivi, estimer et assigner (ex. GitHub Projects, Jira). *Règle :* Tout travail en cours a un ticket unique.
  3. **Branche :** Développer la modification sur une branche Git dédiée sans impacter la branche principale. *Règle :* Une branche courte par fonctionnalité.
  4. **CI :** Exécuter automatiquement les tests unitaires, le lint et le build à chaque commit poussé (ex. GitHub Actions). *Règle :* Branche bloquée tant que la CI n'est pas verte.
  5. **Recette :** Tester le résultat en environnement de pré-production ou de recette avec le demandeur. *Règle :* Validation formelle avant mise en production.
  6. **Production :** Déployer automatiquement ou par jalon vers les utilisateurs réels, avec surveillance. *Règle :* Déploiement reproductible et réversible.
- **Animation et interaction :**
  - Trait de liaison avec motif de tirets animés en CSS (`stroke-dasharray` et `@keyframes`).
  - Clic ou navigation clavier sur une étape pour afficher son détail sous le schéma.

### 3.3 Schéma 3 : Courbe d'adoption (`SchemaCourbeAdoption`) dans le module 9

- **Emplacement précis :** `src/modules/m9-changement/fiche.tsx`, à la fin de la section « Suivre l'adoption » (juste avant la conclusion de la fiche).
- **Topologie :**
  - Courbe continue en S traversant 4 zones verticales :
    1. **Choc** (action : *Écouter*)
    2. **Résistance** (action : *Expliquer*)
    3. **Acceptation** (action : *Former*)
    4. **Appropriation** (action : *Ancrer*)
- **Contenus textuels par phase :**
  1. **Choc :** L'annonce du changement perturbe les habitudes. *Posture du chef de projet :* Accueillir les réactions sans juger, écouter les inquiétudes du terrain.
  2. **Résistance :** Doutes sur l'utilité, comparaison nostalgique avec l'ancien outil. *Posture du chef de projet :* Réexpliquer le sens du projet, montrer les bénéfices concrets et clarifier les étapes.
  3. **Acceptation :** Premiers pas, hésitations dans l'usage. *Posture du chef de projet :* Proposer des formations courtes et pratiques, valoriser les relais et les premières réussites.
  4. **Appropriation :** Le nouvel outil devient la routine naturelle de l'équipe. *Posture du chef de projet :* Ancrer les bonnes pratiques, mettre à jour la documentation et célébrer l'aboutissement.
- **Animation et interaction :**
  - Déplacement fluide d'un point lumineux sur la courbe en boucle.
  - Arrêt complet de l'animation si `prefers-reduced-motion: reduce` (point masqué ou fixé à la fin).
  - Sélection d'une phase au clic ou au clavier pour afficher la posture détaillée.

## 4. Règles techniques, styles et accessibilité

- **Sémantique :** chaque schéma est enveloppé dans `<figure className="schema-pedagogique card">` avec `<figcaption className="schema-titre">`.
- **Accessibilité ARIA :**
  - Le schéma contient une liste de boutons ou de nœuds interactifs avec `role="button"` ou `role="tab"`, `aria-pressed` ou `aria-selected` reflétant l'état actif, et `aria-controls` pointant vers l'encart d'explication.
  - L'encart de détail porte `aria-live="polite"` pour avertir les lecteurs d'écran lors du changement d'étape sélectionnée.
  - Navigation complète au clavier : `tabIndex={0}`, déclenchement au `Enter` et `Space`.
- **Responsive et mobile :**
  - Les SVG utilisent `viewBox` avec `width: 100%` et `height: auto`.
  - Pas de texte SVG minuscule : les libellés SVG restent courts (1 à 2 mots) et les explications complètes sont rendues en HTML sous le SVG.
  - Largeur contrôlée à 320 px : aucun débordement horizontal ni scroll intempestif.
- **Mouvement réduit :**
  - Règle `@media (prefers-reduced-motion: reduce)` : désactivation stricte des animations de tirets et de la bille mobile.

## 5. Fichiers touchés et créés

- **Création de composants :**
  - `src/components/schemas/SchemaCycleV.tsx`
  - `src/components/schemas/SchemaCircuitDemande.tsx`
  - `src/components/schemas/SchemaCourbeAdoption.tsx`
  - `src/styles/schemas.css` (styles des schémas, transitions, responsive et motion-reduction)
- **Modification des fiches :**
  - `src/modules/m3-methodes/fiche.tsx`
  - `src/modules/m5-outils/fiche.tsx`
  - `src/modules/m9-changement/fiche.tsx`
- **Tests :**
  - `tests/schemas-pedagogiques.test.tsx` (tests unitaires de rendu, accessibilité et interaction)
  - `smoke/smoke.spec.ts` (test smoke sur la présence et l'absence de débordement à 320 px)
- **Documentation et changelog :**
  - `CHANGELOG.md`
  - `docs/README.md`

# Refonte pédagogique : introductions de contexte, infobulles de termes techniques et fil conducteur junior

**Date :** 9 novembre 2026  
**Statut :** livré le 9 novembre 2026 (approche A retenue).  
**Périmètre :** 9 modules du cours, glossaire, composant d’infobulles de termes techniques, bases informatiques, passerelles entre sections et pages transversales.

---

## 1. Contexte et objectif

Le cours interactif *Gestion de Projet IT* dispose d'une architecture technique et visuelle solide (9 modules, dossier projet, sections IA et cybersécurité, 16 laboratoires, 31 routes, 100 % front).

Cependant, un audit pédagogique met en évidence plusieurs manques pour un public étudiant ou junior :
1. **Absence d'introduction contextualisée** : les modules ouvrent directement sur un résumé télégraphique et une fiche théorique sans expliquer *pourquoi* ce sujet existe, quel problème concret il résout en entreprise, ni comment il s'articule avec les autres modules.
2. **Jargon et acronymes non explicités** : des termes essentiels (WBS, PERT, GANTT, CI/CD, RACI, WIP, XP, RGPD, MFA, API, serveur, dépôt...) sont utilisés sans définition contextuelle ni expansion de leurs sigles.
3. **Rupture du fil conducteur** : le cas fil rouge (*Les Amis du Square*) n'est pas réintroduit dans les modules, et les modules ne proposent pas de transition explicite vers le module suivant.
4. **Sommaires de modules partiels** : plusieurs sections et laboratoires secondaires ne figurent pas dans le sommaire sticky des modules.

### Objectifs mesurables

1. Chaque module dispose d'une introduction pédagogique structurée (problème réel résolu, 3 objectifs d'apprentissage concrets, rappel du fil rouge, temps estimé réaliste).
2. Chaque section majeure de module (fiche, fil rouge, démarche, labo, exercices, quiz, erreurs/décisions, fiche réflexe) dispose d'une phrase de mise en contexte lisible par un junior.
3. Un composant d'infobulle accessible (`Terme` / `Tooltip`) permet de survoler, cliquer ou activer au clavier n'importe quel terme ou acronyme technique pour afficher sa définition immédiate et son sigle développé, avec lien vers le glossaire.
4. Le glossaire intègre les bases informatiques requises (*dépôt*, *serveur*, *API*, *navigateur*) et enrichit les sigles et alias des termes existants.
5. Une navigation de continuité (module précédent, module suivant avec phrase de transition) relie les 9 modules pour offrir un fil conducteur ininterrompu.
6. Le sommaire de chaque module reflète l'intégralité de ses sections réelles.

---

## 2. Décisions de conception

### 2.1 Approche retenue : Approche A (couche pédagogique ciblée sans réorganisation)
- L'ordre des sections actuelles (fiche, fil rouge, démarche, labo, exercices, quiz, guide, réflexe) est conservé pour ne pas perturber les habitudes des utilisateurs ni casser les ancres existantes.
- Une couche introductive (`ModuleIntro`) est insérée au sommet de chaque module sous le bandeau titre.
- Chaque section reçoit un chapeau pédagogique d'une ou deux phrases.
- Une barre de navigation basse (`ModulePager`) assure la transition entre modules.

### 2.2 Composant d'infobulle technique (`Terme`)
- **Structure** : balise `<button type="button" className="terme-trigger" aria-expanded={...} aria-describedby={...}>` avec soulignement pointillé subtil et indicateur discret.
- **Accessibilité WCAG 2.2 AA** :
  - Clavier : activable via Entrée ou Espace ; fermeture par Échap ou perte de focus.
  - Souris : ouverture au clic ou au survol maintenu avec délai de grâce ; fermeture en sortie.
  - Tactile : tap pour basculer l'état.
  - Infobulle : conteneur avec `role="tooltip"`, `id` unique, positionné sans débordement d'écran (`overflow-x: clip`), contenant le terme complet, le sigle développé, la définition concise et un lien vers `/glossaire#slug`.
- **Règle d'apparition** : seule la première occurrence d'un terme dans une section donnée est enrichie pour ne pas saturer la lecture.

### 2.3 Enrichissement du glossaire (`src/lib/glossaire.ts`)
- Ajout des bases informatiques :
  - `Dépôt` (Repository) : espace de stockage versionné conservant l'historique complet des fichiers du projet.
  - `Serveur` : machine ou logiciel traitant les requêtes et fournissant données ou services aux clients.
  - `API` : interface logicielle permettant à deux applications de communiquer et d'échanger des données de façon standardisée.
  - `Navigateur` : logiciel client affichant les pages web et exécutant le code front-end pour l'utilisateur.
- Ajout des sigles et alias explicites : WBS, PERT, GANTT, CI, CD, RACI, WIP, XP, RGPD, MFA, RAG, AI Act, Sprint, Product Owner, Lead time, Chemin critique, Chaîne tendue, Matrice d'Eisenhower.

### 2.4 Structure de l'introduction de module (`ModuleIntro`)
Chaque module reçoit un bloc visuel clair contenant :
1. **Pourquoi ce module ?** : 2-3 phrases sur le problème concret résolu (le coût de ne pas le faire).
2. **Ce que vous saurez faire** : 3 objectifs d'apprentissage concrets à la 2e personne du pluriel.
3. **Cas fil rouge** : 1-2 phrases reliant le sujet aux *Amis du Square*.
4. **Repères** : durée indicative (lecture ~5 min, pratique ~15 min) et prérequis / continuité.

---

## 3. Architecture et fichiers impactés

### 3.1 Nouveaux fichiers
- `src/components/Terme.tsx` : composant accessible d'infobulle de terme avec gestion clavier/focus/tooltip.
- `src/components/ModuleIntro.tsx` : composant d'introduction pédagogique et d'objectifs pour les modules.
- `src/components/ModulePager.tsx` : composant de transition et de navigation entre modules consécutifs.
- `src/styles/terme.css` : styles légers pour le déclencheur d'infobulle et le panneau de définition flottant.
- `tests/terme.test.tsx` : tests unitaires d'accessibilité, d'interaction et de rendu du composant `Terme`.
- `tests/pedagogie.test.tsx` : tests vérifiant la présence des intros, des objectifs et des transitions sur les 9 modules.

### 3.2 Fichiers modifiés
- `src/lib/glossaire.ts` : ajout des termes informatiques de base, des sigles développés et des alias de recherche.
- `src/components/ModuleLayout.tsx` : intégration dynamique des sections dans le sommaire et insertion du pager.
- `src/modules/index.ts` : enrichissement des métadonnées de modules (objectifs, problème, temps pratique, transition).
- `src/modules/m1-wbs/` à `src/modules/m9-changement/` :
  - Insertion des infobulles sur les termes clés.
  - Ajout des chapeaux pédagogiques sur les sections (`Fiche`, `Démarche`, `FilRouge`, etc.).
- `src/routes/Glossaire.tsx` : affichage des sigles développés et des alias dans la page de glossaire.
- `tests/glossaire.test.ts` : actualisation des assertions sur le nombre de termes et la présence des nouveaux concepts.
- `tests/typo.test.tsx` : validation de la charte typographique sur tous les nouveaux textes.

---

## 4. Charte éditoriale et contraintes

- **Ton** : sobre, bienveillant, orienté junior, sans jargon inutile et sans condescendance.
- **Typographie stricte** :
  - Apostrophe typographique `’` (aucune apostrophe droite `'` dans les textes affichés).
  - Espaces insécables devant `: ; ? ! »` et après `«`.
  - Aucun tiret cadratin `—` (utiliser tirets demi-cadratins `–` ou virgules/parenthèses).
- **Technique** :
  - 100 % front, zéro dépendance npm ajoutée.
  - Aucune API externe, aucune IA au runtime.
  - Score Lighthouse mobile >= 90 en performance et accessibilité.
  - Smoke Playwright 18/18 validé.

---

## 5. Critères d'acceptation

1. Les 9 modules affichent une introduction pédagogique avec pourquoi, 3 objectifs, durée réaliste et rappel du fil rouge.
2. Les termes techniques et acronymes clés (WBS, PERT, GANTT, CI, CD, RACI, WIP, XP, RGPD, MFA, API, serveur, dépôt, navigateur...) disposent d'une infobulle interactive et accessible.
3. L'infobulle s'ouvre au clic/survol, est navigable au clavier (Espace/Entrée/Échap), et ne déborde pas de l'écran à 320 px.
4. Le glossaire inclut les termes informatiques de base et les sigles développés.
5. Une navigation précédent/suivant avec phrase de transition relie les 9 modules.
6. L'ensemble des tests (existants + nouveaux), le lint, le typecheck et le smoke Playwright passent à 100 %.

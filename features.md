# Fonctionnalités

Inventaire des fonctionnalités livrées au 6 novembre 2026, puis
propositions classées par identifiant. Les propositions sont reprises
dans `todo.md` avec leur priorité.

## 1. Fonctionnalités livrées

### 1.1 Parcours pédagogique

- Neuf modules courts, chacun avec fiche, fil rouge, démarche, laboratoire,
  exercices corrigés, exercice de transfert, quiz, guide de lecture et
  fiche réflexe.
- Un cas fictif unique, Les Amis du Square, qui traverse les neuf modules.
- Un dossier projet en six étapes, avec sauvegarde locale, export JSON,
  impression et auto-évaluation.
- Seize laboratoires SVG interactifs : treize dans les modules et trois
  dans le parcours Cybersécurité.
- Quiz corrigés, exercices de transfert et fiches réflexe imprimables.

### 1.2 Parcours IA

- Hub de la section IA.
- Cinq pages : usages, méthodes, outils et configuration, gouvernance.
- Tableaux de comparaison d’outils, sans recommandation dogmatique.
- Aucun appel d’IA au runtime, aucun compte, aucun envoi de données.

### 1.3 Parcours Cybersécurité

- Hub et cinq pages : menaces, accès, dépendances, données, incident.
- Trois laboratoires : modèle de menace, matrice d’accès, chronologie
  d’incident.
- Sources datées, sans XP et sans dépendance au parcours principal.

### 1.4 Recherche et références

- Recherche globale avec synonymes et navigation clavier.
- Glossaire étendu, relié aux modules et aux parcours.
- Bibliothèque de ressources officielles, avec organisme, date, usage et
  limites.
- Fiches outils et grille de comparaison.
- Journal de projet, revue par les pairs et modèles imprimables.

### 1.5 Progression et vie privée

- XP, niveaux, quiz, laboratoires et modules terminés.
- Progression stockée dans `localStorage` sous `gestion-projet-it:`.
- Export et import JSON de la progression.
- Aucun compte, aucun cookie, aucun analytics, aucune requête réseau au
  chargement.
- Visite de présentation en cinq écrans à la première arrivée, relançable.

### 1.6 Design et accessibilité

- Design éditorial, thèmes de couleur par module, cartes et sommaire
  collant.
- Thème clair uniquement, contrastes AA, focus visible, mouvement réduit.
- Navigation clavier complète, lien d’évitement, dialogues accessibles.
- Impression des fiches et du dossier projet.
- Mode hors ligne via service worker et page `offline.html`.

### 1.7 SEO, partage et PWA

- 31 routes publiques dans le sitemap.
- Canonical et `og:url` par route, sans query ni fragment.
- Métadonnées Open Graph et Twitter statiques dans `index.html`, puis
  mises à jour par `SeoHead`.
- Image de partage 1200 x 630, icônes PWA, Apple Touch et favicon SVG avec
  repli PNG.
- Manifeste PWA avec scope `/gestion-projet-it/`.
- `robots.txt` avec sitemap racine et sitemap du module.
- Licence AGPL publiée dans le build.

## 2. Propositions de fonctionnalités

Les identifiants sont stables et servent de référence dans `todo.md`.

### 2.1 Contenu

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-01 | Parcours Produit, hub et cinq pages, sur le modèle du parcours Cybersécurité | Couvre un angle mort du backlog | Élevé |
| F-02 | Trois laboratoires Produit : priorisation, discovery, métriques | Manipulation concrète | Élevé |
| F-03 | Étude de cas longue, avec documents et décisions datées | Ancrage professionnel | Moyen |
| F-04 | fiches de révision imprimables par module, une page chacune | Révision et impression | Moyen |
| F-05 | Parcours de révision en sept jours, avec rappels locaux | Mémorisation | Moyen |
| F-06 | Banque de questions supplémentaire pour chaque quiz, tirage local | Variété sans backend | Moyen |
| F-07 | Notes personnelles par module, stockées localement | Appropriation | Faible |
| F-08 | Glossaire avec liens croisés vers les sections concernées | Navigation | Faible |
| F-09 | Sources citées dans le fil de lecture, pas seulement en bibliothèque | Traçabilité | Moyen |

### 2.2 Progression et expérience

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-10 | Reprise « Continuer où j’en étais » sur l’accueil | Retour rapide | Faible |
| F-11 | Tableau de bord de progression par module et par parcours | Vision d’ensemble | Moyen |
| F-12 | Import de progression avec aperçu et confirmation avant remplacement | Sécurité des données | Faible |
| F-13 | Export de progression horodaté et nommé | Traçabilité locale | Faible |
| F-14 | Réinitialisation sélective d’un module, avec confirmation | Contrôle | Faible |
| F-15 | Marque-pages locaux dans le glossaire et les ressources | Confort | Faible |
| F-16 | Mode impression « dossier complet » avec sommaire | Usage professionnel | Moyen |

### 2.3 Accessibilité et qualité

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-17 | Audit axe-core automatisé sur les routes principales | Prévention | Faible |
| F-18 | Tests Playwright d’import, d’export et de persistance | Fiabilité | Faible |
| F-19 | Vérification Lighthouse CI avec budget versionné | Non-régression | Moyen |
| F-20 | Test automatique des tailles de cible et des contrastes | Accessibilité | Moyen |
| F-21 | Journal de navigation au clavier dans les audits | Preuve | Faible |
| F-22 | Page « Nouveautés » alimentée par le changelog | Transparence | Faible |

### 2.4 SEO et partage

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-23 | Images de partage dédiées par parcours : modules, IA, cybersécurité | Aperçu social précis | Moyen |
| F-24 | Fil d’Ariane visible et microdonnées `BreadcrumbList` | Navigation et SEO | Moyen |
| F-25 | Microdonnées `Course` et `LearningResource` sans script inline | Compréhension par les moteurs | Moyen |
| F-26 | `lastmod` daté par URL dans le sitemap | Indexation | Faible |
| F-27 | Page de recherche interne indexable, avec paramètre contrôlé | Découverte | Moyen |
| F-28 | Vérification Search Console et Bing par balise meta | Suivi | Faible |
| F-29 | Manifeste PWA avec raccourcis vers module 1, dossier et cyber | Installation | Faible |
| F-30 | Image Open Graph avec variante sombre pour les aperçus | Lisibilité | Faible |

### 2.5 Technique et exploitation

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-31 | Précache complet du shell et des routes principales | Hors ligne réel | Moyen |
| F-32 | Page de mise à jour du service worker | Mises à jour visibles | Faible |
| F-33 | Test de non-régression du fallback SPA Nginx | Déploiement | Faible |
| F-34 | Script de vérification des empreintes du build Docker | Traçabilité | Faible |
| F-35 | Analyse du bundle et budget de taille versionné | Performance | Faible |
| F-36 | En-têtes de sécurité documentés dans un fichier Nginx du dépôt | Reproductibilité | Faible |
| F-37 | `security.txt` à la racine du domaine, hors module | Sécurité | Faible |

### 2.6 Documentation

| ID | Proposition | Intérêt | Effort |
| --- | --- | --- | --- |
| F-38 | `structure.md`, `features.md` et `todo.md` maintenus à chaque lot | Lisibilité | Faible |
| F-39 | Schéma de données locales et de flux, en Mermaid | Compréhension | Faible |
| F-40 | Journal des décisions éditoriales | Traçabilité | Faible |

## 3. Ce qui n’est pas retenu

- Compte utilisateur, synchronisation serveur ou base de données.
- Analytics, cookie publicitaire, source distante ou CDN.
- Appel à une API d’IA au runtime.
- Thème sombre, tant que la charte claire reste la référence.
- Chatbot ou assistant conversationnel intégré.
- Notation sociale, certification ou équivalence de diplôme.

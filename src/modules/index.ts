// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface ModuleTemps {
  lecture: string;
  pratique: string;
}

export interface ModuleMeta {
  id: string;
  num: number;
  slug: string;
  titre: string;
  navLabel: string;
  resume: string;
  motsCles: string[];
  avenir?: boolean;
  pourquoi: string;
  objectifs: [string, string, string];
  temps: ModuleTemps;
  filRougeContexte: string;
  transition?: string;
}

export const MODULES: ModuleMeta[] = [
  {
    id: 'm1-wbs',
    num: 1,
    slug: 'module-1',
    titre: 'Cadrer et découper (WBS)',
    navLabel: 'Cadrer et découper',
    resume: 'Besoin, périmètre dedans dehors, WBS (OTP en français) en 3 lots, jalons, définition de fini.',
    motsCles: ['wbs', 'otp', 'sdp', 'cadrage', 'perimetre', 'lots', 'jalons', 'decoupage'],
    pourquoi: 'Sans cadrage explicite, un projet dérive dès les premières semaines\u00A0: chacun imagine ce qui lui plaît et personne ne s’accorde sur ce qui sera réellement livré. Le découpage en lots de livrables évite l’effet tunnel et protège l’équipe contre les ajouts imprévus.',
    objectifs: [
      'Formuler le besoin central en une phrase claire sans jargon technique.',
      'Tracer une frontière nette entre ce qui est dans le périmètre et ce qui reste dehors.',
      'Découper le travail en lots de livrables vérifiables grâce à une structure WBS (OTP en français).',
    ],
    temps: { lecture: '6\u00A0min', pratique: '15\u00A0min' },
    filRougeContexte: 'Pour l’association fictive Les Amis du Square, le bureau veut moderniser son site internet. Le cadrage fixe la présentation des activités et le formulaire de contact, tout en écartant formellement le paiement en ligne.',
    transition: 'Maintenant que les livrables sont identifiés et découpés, le module 2 montre comment les ordonner dans le temps avec PERT et GANTT.',
  },
  {
    id: 'm2-planif',
    num: 2,
    slug: 'module-2',
    titre: 'Planifier\u00A0: PERT et GANTT',
    navLabel: 'Planifier',
    resume: 'Ordonner les tâches, dépendances, chaîne tendue, barres et jalons sous les yeux.',
    motsCles: ['pert', 'gantt', 'planning', 'dependances', 'chaine tendue', 'jalons'],
    pourquoi: 'Lister les tâches ne suffit pas\u00A0: certaines ne peuvent démarrer avant d’autres et tout retard sur le chemin critique décale la fin du projet. La planification permet de visualiser les dépendances et d’anticiper les goulots d’étranglement.',
    objectifs: [
      'Identifier les dépendances techniques et logiques entre les tâches d’un projet.',
      'Tracer le réseau PERT pour faire émerger la chaîne tendue sans marge.',
      'Construire un diagramme de GANTT lisible pour partager les échéances et les jalons.',
    ],
    temps: { lecture: '6\u00A0min', pratique: '15\u00A0min' },
    filRougeContexte: 'Pour l’association fictive Les Amis du Square, les maquettes doivent être validées avant d’intégrer les pages. Le GANTT met en évidence les deux jalons clés pour les bénévoles.',
    transition: 'Le calendrier est posé. Le module 3 examine comment organiser les phases de validation avec le cycle en V et la cascade.',
  },
  {
    id: 'm3-methodes',
    num: 3,
    slug: 'module-3',
    titre: 'Cycle en V, cascade et choix de méthode',
    navLabel: 'Méthodes',
    resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.',
    motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'],
    pourquoi: 'Chaque organisation a sa culture et ses contraintes\u00A0: imposer une méthode sans comprendre son rôle conduit à l’échec. Comprendre la cascade et le cycle en V permet de choisir l’organisation adaptée au niveau de certitude du besoin.',
    objectifs: [
      'Distinguer la cascade linéaire du cycle en V avec ses vérifications en miroir.',
      'Définir des critères d’acceptation concrets pour réussir la recette avec les usagers.',
      'Comparer trois familles méthodologiques côte à côte sans parti pris dogmatique.',
    ],
    temps: { lecture: '7\u00A0min', pratique: '20\u00A0min' },
    filRougeContexte: 'Pour le site associatif, Les Amis du Square ont besoin d’une recette simple\u00A0: vérifier que chaque événement créé s’affiche correctement sur mobile.',
    transition: 'Si les besoins changent souvent ou si l’équipe préfère des boucles très courtes, les méthodes agiles du module 4 apportent une alternative.',
  },
  {
    id: 'm4-agiles',
    num: 4,
    slug: 'module-4',
    titre: 'Agiles\u00A0: Scrum, Kanban, Lean, XP',
    navLabel: 'Agiles',
    resume: 'Backlog, rituels, limites de WIP, petits lots, qualité du code.',
    motsCles: ['scrum', 'kanban', 'wip', 'lean', 'xp', 'backlog', 'poker planning', 'user stories'],
    pourquoi: 'Quand le besoin évolue vite, figer un planning sur six mois devient contre-productif. Les approches agiles permettent d’avancer par petits incréments, de limiter le travail en cours et de vérifier la qualité en continu.',
    objectifs: [
      'Comprendre le fonctionnement d’une boucle Scrum avec son backlog et ses rituels.',
      'Piloter un flux continu avec un tableau Kanban et une limite de travaux en cours (WIP).',
      'Adopter les principes Lean d’élimination du gaspillage et les pratiques de qualité XP.',
    ],
    temps: { lecture: '7\u00A0min', pratique: '20\u00A0min' },
    filRougeContexte: 'Face aux demandes répétées des bénévoles de l’association Les Amis du Square, l’équipe utilise un tableau Kanban pour traiter les fiches d’actualité sans saturer la colonne En cours.',
    transition: 'Pour soutenir ces méthodes au quotidien, le module 5 présente la boîte à outils essentielle du chef de projet moderne.',
  },
  {
    id: 'm5-outils',
    num: 5,
    slug: 'module-5',
    titre: 'Outils\u00A0: suivi, CI/CD et environnements',
    navLabel: 'Outils et CI/CD',
    resume: 'Suivi partagé, chaîne CI, environnements reproductibles, sans tutoriel opératoire.',
    motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'],
    pourquoi: 'Un outil n’est pas une méthode\u00A0: sans accord d’équipe, un logiciel de suivi devient un registre vide. Savoir choisir des outils adaptés, automatiser les tests et isoler les environnements garantit la sérénité technique.',
    objectifs: [
      'Choisir un outil de suivi partagé selon les besoins réels de collaboration de l’équipe.',
      'Comprendre l’intérêt d’une chaîne CI/CD pour détecter les régressions à chaque modification.',
      'Distinguer les environnements de développement, de test et de production reproductibles.',
    ],
    temps: { lecture: '6\u00A0min', pratique: '20\u00A0min' },
    filRougeContexte: 'Pour Les Amis du Square, une chaîne CI simple lance les tests à chaque commit et évite de casser le formulaire de contact lors de la mise en ligne.',
    transition: 'Les outils sont en place, mais la réussite repose sur les personnes\u00A0: le module 6 aborde la dynamique d’équipe et la gestion des risques.',
  },
  {
    id: 'm6-equipe',
    num: 6,
    slug: 'module-6',
    titre: 'Équipe, risques (Eisenhower) et suivi',
    navLabel: 'Équipe et risques',
    resume: 'Communication, tri urgent important, registre des risques, rétro utile.',
    motsCles: ['eisenhower', 'risques', 'retro', 'communication', 'indicateurs', 'pre-mortem'],
    pourquoi: 'Les projets échouent rarement par manque d’outils, mais souvent par manque de communication ou par surcharge face aux imprévus. Savoir prioriser ses tâches et tenir un registre de risques protège le moral de l’équipe et la livraison.',
    objectifs: [
      'Prioriser ses actions quotidiennes grâce à la matrice d’Eisenhower entre urgent et important.',
      'Identifier les risques projet et formaliser des parades concrètes avec leurs déclencheurs.',
      'Mener un atelier pré-mortem et animer une rétrospective courte orientée vers l’action.',
    ],
    temps: { lecture: '7\u00A0min', pratique: '20\u00A0min' },
    filRougeContexte: 'Sur le cas de l’association Les Amis du Square, l’indisponibilité du photographe bénévole est un risque identifié\u00A0: une parade de repli est prévue avec des visuels libres.',
    transition: 'L’équipe sait se protéger des risques. Le module 7 élargit le regard à toutes les personnes qui gravitent autour du projet\u00A0: les parties prenantes.',
  },
  {
    id: 'm7-parties',
    num: 7,
    slug: 'module-7',
    titre: 'Parties prenantes et communication',
    navLabel: 'Parties prenantes',
    resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.',
    motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'],
    pourquoi: 'Ignorer un décideur ou mal informer les utilisateurs finaux crée des blocages tardifs très coûteux. Cartographier les influences et clarifier qui décide de quoi via une matrice RACI désamorce les conflits de pouvoir.',
    objectifs: [
      'Cartographier les parties prenantes selon leur niveau d’intérêt et leur pouvoir d’influence.',
      'Attribuer les rôles sans ambiguïté sur chaque activité clé grâce à la matrice RACI.',
      'Établir un plan de communication sobre et tenir un journal de décisions traçable.',
    ],
    temps: { lecture: '7\u00A0min', pratique: '20\u00A0min' },
    filRougeContexte: 'Entre la mairie, le bureau associatif et les usagers du quartier, Les Amis du Square clarifient qui approuve les contenus de l’agenda et qui est simplement informé.',
    transition: 'Les acteurs et leurs rôles sont définis. Le module 8 aborde la dimension économique\u00A0: comment estimer et suivre un budget.',
  },
  {
    id: 'm8-budget',
    num: 8,
    slug: 'module-8',
    titre: 'Budget et chiffrage',
    navLabel: 'Budget',
    resume: 'Estimer par lots, poser des hypothèses, prévoir une marge d’aléa et suivre les écarts.',
    motsCles: ['budget', 'chiffrage', 'estimation', 'marge', 'alea', 'ecarts'],
    pourquoi: 'Un chiffrage donné au hasard engage une équipe sur des promesses impossibles à tenir. Découper en lots, poser des hypothèses écrites et prévoir une provision d’aléa explicite permet de discuter sereinement des dérives éventuelles.',
    objectifs: [
      'Estimer un budget par lots de livrables en explicitant chaque hypothèse de calcul.',
      'Utiliser une fourchette à trois points (optimiste, probable, pessimiste) pour mesurer l’incertitude.',
      'Dimensionner une marge d’aléa transparente et analyser les écarts réels à chaque jalon.',
    ],
    temps: { lecture: '6\u00A0min', pratique: '15\u00A0min' },
    filRougeContexte: 'Pour Les Amis du Square, le budget intègre le nom de domaine, l’hébergement et une réserve pour une aide technique externe en cas de blocage.',
    transition: 'Le projet peut être techniquement parfait, il ne sert à rien si personne ne l’utilise\u00A0: le module 9 traite de la conduite du changement.',
  },
  {
    id: 'm9-changement',
    num: 9,
    slug: 'module-9',
    titre: 'Conduite du changement',
    navLabel: 'Changement',
    resume: 'Lire les freins, choisir des relais, former court et ajuster les messages.',
    motsCles: ['changement', 'adoption', 'freins', 'relais', 'formation'],
    pourquoi: 'Déployer un logiciel ne suffit pas à changer les habitudes\u00A0: la résistance au changement est une réaction normale face à une perte de repères. Accompagner les personnes avec des relais et des formations courtes garantit l’adoption réelle.',
    objectifs: [
      'Identifier les freins réels à l’adoption (habitude, charge, crainte) sans juger les usagers.',
      'Mobiliser des relais de proximité et organiser des formations courtes ciblées sur un geste précis.',
      'Mesurer des indicateurs d’adoption concrets dans la durée pour ajuster l’accompagnement.',
    ],
    temps: { lecture: '6\u00A0min', pratique: '15\u00A0min' },
    filRougeContexte: 'Les bénévoles seniors de l’association Les Amis du Square hésitent à saisir les événements en ligne\u00A0: deux relais volontaires les accompagnent pas à pas sur les trois premiers formulaires.',
  },
];

export function moduleMetaByNum(num: number): ModuleMeta | undefined {
  return MODULES.find((m) => m.num === num);
}

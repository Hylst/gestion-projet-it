// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface IaPageSection {
  id: string;
  label: string;
}

export interface IaPageTemps {
  lecture: string;
  pratique: string;
  activite: string;
}

export interface IaPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
  pourquoi: string;
  objectifs: readonly [string, string, string];
  filRouge: string;
  temps: IaPageTemps;
  sections: readonly IaPageSection[];
  motsCles?: readonly string[];
}

export const IA_PAGES: readonly IaPageMeta[] = [
  {
    slug: 'ia',
    path: '/ia',
    titre: 'Gestion de projet et IA',
    titreCourt: 'Introduction',
    description: 'IA et gestion de projet\u00A0: usages par phase, méthodes, outils, configuration et gouvernance, avec des repères concrets pour étudiants et juniors.',
    resume: 'Un panorama raisonné de l’IA comme outil du chef de projet, sans dogme ni recette magique.',
    pourquoi: 'L’IA entre dans le projet par les tâches quotidiennes avant d’entrer dans les contrats. Sans repères, l’équipe gagne du temps sur un brouillon et en perd sur la vérification, ou expose des données sans l’avoir décidé.',
    objectifs: [
      'Distinguer ce que l’IA prépare de ce qui reste une décision humaine.',
      'Repérer les données qu’on ne confie pas à un outil sans cadre.',
      'Formuler un usage avec un critère de réussite vérifiable.',
    ],
    filRouge: 'Sur Les Amis du Square, l’IA peut préparer un brouillon de note de cadrage. Le bureau de l’association valide le besoin, le périmètre et les critères de réussite.',
    temps: { lecture: '5\u00A0min', pratique: '10\u00A0min', activite: 'checklist et cas réel' },
    sections: [
      { id: 'pourquoi', label: 'Pourquoi l’IA entre dans le projet' },
      { id: 'fait-bien', label: 'Ce que l’IA fait bien' },
      { id: 'ne-fait-pas', label: 'Ce qu’elle ne fait pas' },
      { id: 'cinq-questions', label: 'Cinq questions avant de l’utiliser' },
      { id: 'carte-usages', label: 'Carte des usages' },
      { id: 'suite', label: 'La suite de la section' },
    ],
    motsCles: ['intelligence artificielle', 'ia generative', 'assistant', 'prompt', 'limites', 'esprit critique'],
  },
  {
    slug: 'ia/usages',
    path: '/ia/usages',
    titre: 'Usages de l’IA par phase de projet',
    titreCourt: 'Usages',
    description: 'Usages de l’IA en gestion de projet\u00A0: cadrage, planification, exécution, qualité, communication et changement, avec les points de contrôle humains.',
    resume: 'Ce que l’IA peut préparer à chaque phase, et ce qu’il faut vérifier avant de s’en servir.',
    pourquoi: 'Un même outil peut aider au cadrage et fragiliser la production. La phase, le livrable et le point de contrôle décident de l’usage acceptable, pas la démonstration commerciale.',
    objectifs: [
      'Choisir un usage d’IA adapté à la phase et au livrable.',
      'Associer chaque usage à un point de contrôle humain.',
      'Repérer les sorties qui restent des hypothèses.',
    ],
    filRouge: 'Sur Les Amis du Square, le compte rendu de réunion est préparé par un assistant puis relu par le chef de projet avant diffusion.',
    temps: { lecture: '6\u00A0min', pratique: '10\u00A0min', activite: 'checklist et cas réel' },
    sections: [
      { id: 'cadrage', label: 'Cadrage et besoin' },
      { id: 'planification', label: 'Planification et découpage' },
      { id: 'execution', label: 'Exécution et suivi' },
      { id: 'qualite', label: 'Qualité et tests' },
      { id: 'communication', label: 'Communication et changement' },
      { id: 'humain', label: 'Ce qui reste humain' },
    ],
    motsCles: ['usages', 'cadrage', 'planification', 'qualite', 'tests', 'communication', 'changement', 'human in the loop'],
  },
  {
    slug: 'ia/methodes',
    path: '/ia/methodes',
    titre: 'Méthodes et évaluation',
    titreCourt: 'Méthodes',
    description: 'Méthodes pour utiliser l’IA en projet\u00A0: prompts, contexte, RAG, sorties structurées, évaluation, agents et rituel d’équipe.',
    resume: 'Des gestes reproductibles pour obtenir des sorties utiles, vérifiables et comparables.',
    pourquoi: 'Une sortie utile vient d’un besoin clair, d’un contexte choisi et d’un test reproductible. Sans méthode, chaque essai recommence de zéro et la qualité dépend de l’humeur du jour.',
    objectifs: [
      'Écrire un prompt qui décrit le besoin, le contexte et le format attendu.',
      'Évaluer une sortie sur un petit jeu de cas représentatifs.',
      'Encadrer un agent par des permissions limitées et une validation humaine.',
    ],
    filRouge: 'Sur Les Amis du Square, un RAG retrouve une décision passée dans les comptes rendus du bureau, avec sa source et sa date.',
    temps: { lecture: '7\u00A0min', pratique: '15\u00A0min', activite: 'checklist et cas réel' },
    sections: [
      { id: 'prompt', label: 'Du besoin au prompt' },
      { id: 'contexte', label: 'Recherche documentaire et RAG' },
      { id: 'sortie', label: 'Sorties structurées et vérifiables' },
      { id: 'evaluation', label: 'Évaluation et jeu de test' },
      { id: 'agents', label: 'Agents et automatisations' },
      { id: 'rituel', label: 'Un rituel d’équipe' },
    ],
    motsCles: ['prompt', 'contexte', 'rag', 'evaluation', 'jeu de test', 'agent', 'automatisation', 'human in the loop'],
  },
  {
    slug: 'ia/outils-configuration',
    path: '/ia/outils-configuration',
    titre: 'Outils, environnement et configuration',
    titreCourt: 'Outils',
    description: 'Outils et configuration de l’IA en projet\u00A0: catégories, environnement, paramètres, données, confidentialité et choix raisonné.',
    resume: 'Choisir un outil, régler ce qui compte et organiser un environnement de travail traçable.',
    pourquoi: 'Le nom de l’outil change plus vite que le besoin. Comprendre les catégories, l’environnement et les paramètres évite de choisir une démonstration plutôt qu’un usage tenable.',
    objectifs: [
      'Comparer les catégories d’outils selon le besoin et le niveau de contrôle.',
      'Régler le contexte, les permissions et la rétention avant le premier usage.',
      'Classer les données avant de les confier à un outil.',
    ],
    filRouge: 'Sur Les Amis du Square, le projet garde un seul outil de référence par besoin et note la version utilisée dans le journal.',
    temps: { lecture: '6\u00A0min', pratique: '12\u00A0min', activite: 'checklist et cas réel' },
    sections: [
      { id: 'categories', label: 'Catégories d’outils' },
      { id: 'environnement', label: 'Environnement de travail' },
      { id: 'parametres', label: 'Paramètres qui comptent' },
      { id: 'donnees', label: 'Données et confidentialité' },
      { id: 'choisir', label: 'Choisir sans se disperser' },
    ],
    motsCles: ['outils', 'environnement', 'configuration', 'parametres', 'donnees', 'confidentialite', 'local', 'api'],
  },
  {
    slug: 'ia/gouvernance',
    path: '/ia/gouvernance',
    titre: 'Gouvernance, risques et qualité',
    titreCourt: 'Gouvernance',
    description: 'Gouvernance de l’IA en projet\u00A0: cadre, droit, AI Act, risques, sécurité, fournisseurs, preuves et revue.',
    resume: 'Encadrer les usages, tenir les risques et garder des preuves sans alourdir le projet.',
    pourquoi: 'Un usage isolé peut sembler anodin et devenir une dépendance non suivie. Rôles, données, preuves et plan de sortie transforment un essai en pratique maîtrisée.',
    objectifs: [
      'Nommer les rôles et les usages autorisés dans un cadre court.',
      'Relier chaque risque à une parade, un responsable et une preuve.',
      'Prévoir l’export des données et la sortie d’un fournisseur.',
    ],
    filRouge: 'Sur Les Amis du Square, le registre des usages note l’outil, la donnée, le responsable et la date de revue.',
    temps: { lecture: '7\u00A0min', pratique: '12\u00A0min', activite: 'checklist et cas réel' },
    sections: [
      { id: 'cadre', label: 'Un cadre avant l’outil' },
      { id: 'droit', label: 'Droit, données et AI Act' },
      { id: 'risques', label: 'Risques et qualité' },
      { id: 'propriete', label: 'Sécurité et propriété intellectuelle' },
      { id: 'fournisseurs', label: 'Fournisseurs et dépendance' },
      { id: 'preuves', label: 'Preuves et revue' },
    ],
    motsCles: ['gouvernance', 'risques', 'qualite', 'ai act', 'rgpd', 'donnees personnelles', 'propriete intellectuelle', 'fournisseur', 'audit', 'hallucination'],
  },
];

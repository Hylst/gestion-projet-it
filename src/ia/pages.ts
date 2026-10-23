export interface IaPageSection {
  id: string;
  label: string;
}

export interface IaPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
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

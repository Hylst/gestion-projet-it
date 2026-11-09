// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Terme {
  terme: string;
  definition: string;
  module?: number;
  lien?: { to: string; label: string };
  sigle?: string;
  developpe?: string;
  alias?: string[];
}

export const TERMES: Terme[] = [
  {
    terme: 'Adoption',
    definition: 'Usage réel d’un changement par les personnes concernées, au-delà de l’annonce et de la formation.',
    module: 9,
    alias: ['adoption'],
  },
  {
    terme: 'Agent',
    definition: 'Programme qui enchaîne des étapes et peut utiliser des outils pour atteindre un objectif, avec un cadre et des permissions à définir.',
    lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' },
    alias: ['agent', 'agent ia'],
  },
  {
    terme: 'Agile',
    definition: 'Famille d’approches qui avance par petits lots et ajuste selon les retours\u00A0; elle ne se réduit pas à un seul cadre.',
    module: 3,
    alias: ['agile', 'agilite', 'methodes agiles'],
  },
  {
    terme: 'AI Act',
    sigle: 'AI Act',
    definition: 'Règlement européen classant les systèmes d’intelligence artificielle par niveau de risque avec des obligations graduées.',
    lien: { to: '/ia/gouvernance', label: 'Voir la page Gouvernance' },
    alias: ['ai act', 'reglement ia'],
  },
  {
    terme: 'API',
    sigle: 'API',
    developpe: 'Application Programming Interface',
    definition: 'Interface logicielle permettant à deux applications d’échanger des données selon des règles et formats standardisés.',
    module: 5,
    alias: ['api', 'interface de programmation'],
  },
  {
    terme: 'Arbre d’opportunités',
    definition: 'Représentation qui relie un objectif à des problèmes, puis à des solutions candidates, sans sauter à l’idée la plus visible.',
    lien: { to: '/ressources#parcours-produit', label: 'Voir les ressources Produit' },
    alias: ['arbre d’opportunites', 'opportunity solution tree'],
  },
  {
    terme: 'Atelier',
    definition: 'Temps court et cadré où un groupe produit une décision ou un livrable, avec une question et un résultat attendu.',
    module: 7,
    alias: ['atelier', 'workshop'],
  },
  {
    terme: 'Authentification multifacteur',
    sigle: 'MFA',
    developpe: 'Multi-Factor Authentication',
    definition: 'Mécanisme qui demande au moins deux preuves d’identité de nature différente, par exemple un mot de passe et un code temporaire.',
    lien: { to: '/cybersecurite/acces', label: 'Voir la page Accès' },
    alias: ['mfa', 'authentification multifacteur', '2fa', 'double facteur'],
  },
  {
    terme: 'Backlog',
    definition: 'Liste ordonnée de besoins ou de tâches à traiter, tenue à jour et discutée avec l’équipe.',
    module: 4,
    alias: ['backlog', 'carnet de produit'],
  },
  {
    terme: 'Cadrage',
    definition: 'Clarification du besoin, du périmètre et des critères de réussite avant de produire.',
    module: 1,
    alias: ['cadrage', 'cadrer'],
  },
  {
    terme: 'Capacité',
    definition: 'Charge de travail qu’une équipe peut réellement absorber sur une période, compte tenu des disponibilités et des imprévus.',
    module: 6,
    alias: ['capacite'],
  },
  {
    terme: 'CD',
    sigle: 'CD',
    developpe: 'Continuous Delivery / Continuous Deployment',
    definition: 'Déploiement ou livraison continue automatisant la mise à disposition d’une version testée vers un environnement cible.',
    module: 5,
    alias: ['cd', 'deploiement continu', 'livraison continue'],
  },
  {
    terme: 'Chaîne CI',
    sigle: 'CI',
    developpe: 'Intégration continue (Continuous Integration)',
    definition: 'Suite automatisée de vérification et de construction, déclenchée à chaque changement.',
    module: 5,
    alias: ['ci', 'chaine ci', 'integration continue', 'chaine ci/cd'],
  },
  {
    terme: 'Chaîne tendue',
    definition: 'Enchaînement de tâches dont la marge de retard est nulle, reliant le début à la fin sans temps mort.',
    module: 2,
    alias: ['chaine tendue'],
  },
  {
    terme: 'Chemin critique',
    definition: 'Suite de tâches dont le retard décale la fin du projet, à surveiller en priorité.',
    module: 2,
    alias: ['chemin critique'],
  },
  {
    terme: 'Chiffrement',
    definition: 'Transformation de données en une forme illisible sans clé, pour les protéger en transit ou au repos.',
    lien: { to: '/cybersecurite/donnees', label: 'Voir la page Données' },
    alias: ['chiffrement', 'cryptographie'],
  },
  {
    terme: 'Comité de pilotage',
    definition: 'Instance de suivi et d’arbitrage qui réunit les décideurs aux moments clés du projet.',
    module: 7,
    alias: ['comite de pilotage', 'copil'],
  },
  {
    terme: 'Conduite du changement',
    definition: 'Ensemble des gestes qui aident les personnes à adopter un nouveau fonctionnement, au-delà de l’annonce.',
    module: 9,
    alias: ['conduite du changement', 'changement'],
  },
  {
    terme: 'Contexte',
    definition: 'Ensemble des informations fournies à un modèle pour une tâche\u00A0: consignes, documents, historique et format attendu.',
    lien: { to: '/ia/usages', label: 'Voir la page Usages' },
    alias: ['contexte', 'fenetre de contexte'],
  },
  {
    terme: 'Contrôle d’accès',
    definition: 'Ensemble des règles qui décident qui peut lire, modifier ou supprimer une ressource, et dans quelles conditions.',
    lien: { to: '/cybersecurite/acces', label: 'Voir la page Accès' },
    alias: ['controle d’acces', 'gestion des acces'],
  },
  {
    terme: 'Coût d’entrée',
    definition: 'Effort et temps nécessaires pour commencer à utiliser un outil ou une pratique, avant d’en retirer un bénéfice.',
    module: 5,
    alias: ['cout d’entree'],
  },
  {
    terme: 'Critère d’acceptation',
    definition: 'Condition observable et testable qui permet de dire si un livrable est accepté.',
    module: 3,
    alias: ['critere d’acceptation', 'criteres d’acceptation', 'acceptance criteria'],
  },
  {
    terme: 'Critère de sortie',
    definition: 'Condition observable qui autorise à quitter une phase ou à clore un atelier, sans improviser la suite.',
    module: 3,
    alias: ['critere de sortie', 'criteres de sortie'],
  },
  {
    terme: 'Cycle en V',
    definition: 'Organisation en phases qui fait correspondre chaque étape de construction à une vérification.',
    module: 3,
    alias: ['cycle en v', 'modele en v'],
  },
  {
    terme: 'Débit',
    definition: 'Nombre d’éléments terminés sur une période, utile pour lire un flux sans le confondre avec la charge en cours.',
    module: 4,
    alias: ['debit', 'throughput'],
  },
  {
    terme: 'Déclencheur',
    definition: 'Signal observable qui indique qu’un risque se réalise ou qu’une parade doit être activée.',
    module: 6,
    alias: ['declencheur'],
  },
  {
    terme: 'Défense en profondeur',
    definition: 'Stratégie qui empile plusieurs parades indépendantes, pour qu’une seule erreur ne suffise pas à tout compromettre.',
    lien: { to: '/cybersecurite/menaces', label: 'Voir la page Menaces' },
    alias: ['defense en profondeur'],
  },
  {
    terme: 'Définition de fini',
    definition: 'Critères partagés qui disent quand une tâche est vraiment terminée, au-delà du code écrit.',
    module: 1,
    alias: ['definition de fini', 'definition of done', 'dod'],
  },
  {
    terme: 'Définition de prêt',
    definition: 'Critères partagés qui disent quand une tâche est assez claire pour commencer.',
    module: 3,
    alias: ['definition de pret', 'definition of ready', 'dor'],
  },
  {
    terme: 'Délai de traversée',
    definition: 'Temps écoulé entre l’entrée d’un élément dans le flux et sa sortie, aussi appelé lead time.',
    module: 4,
    alias: ['delai de traversee', 'lead time', 'lead-time'],
  },
  {
    terme: 'Dépendance',
    definition: 'Lien entre deux tâches tel que l’une ne peut pas avancer sans l’autre.',
    module: 2,
    alias: ['dependance', 'dependances'],
  },
  {
    terme: 'Dépendance fournisseur',
    definition: 'Lien avec un tiers dont la disponibilité, le prix ou la qualité conditionne une partie du projet.',
    module: 5,
    alias: ['dependance fournisseur'],
  },
  {
    terme: 'Dépôt',
    definition: 'Espace de stockage versionné conservant l’historique complet des fichiers, des branches et des modifications d’un projet.',
    module: 5,
    alias: ['depot', 'repository', 'repo', 'depot git'],
  },
  {
    terme: 'Donnée personnelle',
    definition: 'Information qui se rapporte à une personne identifiable, directement ou indirectement\u00A0; son usage demande un cadre.',
    lien: { to: '/ia/gouvernance', label: 'Voir la page Gouvernance' },
    alias: ['donnee personnelle', 'donnees personnelles'],
  },
  {
    terme: 'Écart',
    definition: 'Différence entre ce qui était prévu et ce qui est constaté\u00A0; elle s’explique avant de se corriger.',
    module: 8,
    alias: ['ecart', 'ecarts'],
  },
  {
    terme: 'Eisenhower',
    definition: 'Matrice de priorisation classant les tâches selon leur urgence et leur importance pour décider de l’action immédiate.',
    module: 6,
    alias: ['eisenhower', 'matrice eisenhower', 'matrice d’eisenhower'],
  },
  {
    terme: 'Environnement',
    definition: 'Ensemble des moyens techniques qui permettent de faire tourner et tester le produit.',
    module: 5,
    alias: ['environnement', 'environnements'],
  },
  {
    terme: 'Estimation',
    definition: 'Évaluation d’un effort, d’un délai ou d’un coût, avec ses hypothèses et son incertitude.',
    module: 8,
    alias: ['estimation', 'chiffrage', 'estimer'],
  },
  {
    terme: 'Évaluation',
    definition: 'Mesure de la qualité d’une réponse ou d’un système sur un jeu de cas choisis, avec des critères explicites.',
    lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' },
    alias: ['evaluation', 'eval'],
  },
  {
    terme: 'Fiche outil',
    definition: 'Page interne courte qui décrit l’utilité, le moment, les limites, les alternatives et le coût d’entrée d’une famille d’outils.',
    module: 5,
    lien: { to: '/outils', label: 'Voir les fiches outils' },
    alias: ['fiche outil', 'fiches outils'],
  },
  {
    terme: 'Flux',
    definition: 'Enchaînement des éléments de travail de leur entrée à leur sortie, avec ses attentes et ses goulets.',
    module: 4,
    alias: ['flux', 'flux de travail', 'workflow'],
  },
  {
    terme: 'GANTT',
    sigle: 'GANTT',
    definition: 'Planning en barres qui montre les tâches dans le temps et leurs chevauchements.',
    module: 2,
    alias: ['gantt', 'diagramme de gantt', 'planning gantt'],
  },
  {
    terme: 'Gouvernance',
    definition: 'Répartition des rôles, des instances et des droits de décision qui rend le projet lisible.',
    module: 7,
    alias: ['gouvernance'],
  },
  {
    terme: 'Hallucination',
    definition: 'Réponse plausible mais fausse ou non justifiée produite par un modèle, à vérifier avant tout usage.',
    lien: { to: '/ia/gouvernance', label: 'Voir la page Gouvernance' },
    alias: ['hallucination'],
  },
  {
    terme: 'Human-in-the-loop',
    definition: 'Principe qui garde une personne dans la boucle pour valider, corriger ou arrêter une action assistée par IA.',
    lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' },
    alias: ['human-in-the-loop', 'humain dans la boucle'],
  },
  {
    terme: 'Hygiène numérique',
    definition: 'Gestes de base qui réduisent les risques courants\u00A0: mises à jour, mots de passe uniques, sauvegardes et prudence face aux messages.',
    lien: { to: '/cybersecurite', label: 'Voir l’introduction Cybersécurité' },
    alias: ['hygiene numerique'],
  },
  {
    terme: 'Hypothèse',
    definition: 'Condition tenue pour vraie dans une estimation ou un plan, à vérifier au fil du projet.',
    module: 8,
    alias: ['hypothese', 'hypotheses'],
  },
  {
    terme: 'IA générative',
    definition: 'Famille de systèmes qui produisent du texte, des images ou du code à partir d’une demande et de données d’entraînement.',
    lien: { to: '/ia', label: 'Voir l’introduction IA' },
    alias: ['ia generative', 'genai'],
  },
  {
    terme: 'Incident de sécurité',
    definition: 'Événement qui compromet ou menace la confidentialité, l’intégrité ou la disponibilité d’un système ou d’une donnée.',
    lien: { to: '/cybersecurite/incident', label: 'Voir la page Incident' },
    alias: ['incident de securite', 'incident cyber'],
  },
  {
    terme: 'Indicateur',
    definition: 'Mesure simple choisie pour suivre un point utile, sans prétendre tout résumer.',
    module: 6,
    alias: ['indicateur', 'indicateurs', 'kpi'],
  },
  {
    terme: 'Indicateur d’adoption',
    definition: 'Mesure simple d’un usage réel, comme un geste répété ou une question qui diminue, et non le nombre de présents.',
    module: 9,
    alias: ['indicateur d’adoption'],
  },
  {
    terme: 'Jalon',
    definition: 'Point de repère daté qui marque un résultat attendu et permet de faire le point.',
    module: 2,
    alias: ['jalon', 'jalons', 'milestone'],
  },
  {
    terme: 'Jeu de test',
    definition: 'Ensemble de cas représentatifs, avec entrées et résultats attendus, utilisé pour vérifier un système.',
    lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' },
    alias: ['jeu de test', 'dataset de test'],
  },
  {
    terme: 'Journal de décisions',
    definition: 'Trace courte d’une décision, de son motif, de son responsable et de sa suite.',
    module: 7,
    alias: ['journal de decisions', 'registre de decisions'],
  },
  {
    terme: 'Kanban',
    definition: 'Tableau visuel de flux avec des colonnes et des limites de travaux en cours.',
    module: 4,
    alias: ['kanban', 'tableau kanban'],
  },
  {
    terme: 'Lean',
    definition: 'Approche qui cherche à réduire les efforts inutiles et à fluidifier le flux de travail.',
    module: 4,
    alias: ['lean'],
  },
  {
    terme: 'Lot',
    definition: 'Ensemble de travaux regroupé pour être planifié, chiffré ou livré.',
    module: 1,
    alias: ['lot', 'lots', 'lotissement'],
  },
  {
    terme: 'Marge d’aléa',
    definition: 'Provision explicite pour couvrir les inconnues reconnues d’un chiffrage, sans masquer les oublis.',
    module: 8,
    alias: ['marge d’alea', 'provision pour aleas'],
  },
  {
    terme: 'Modèle de menace',
    definition: 'Description courte des actifs à protéger, des attaquants plausibles et des chemins d’attaque à surveiller.',
    lien: { to: '/cybersecurite/menaces', label: 'Voir la page Menaces' },
    alias: ['modele de menace', 'threat model'],
  },
  {
    terme: 'Moindre privilège',
    definition: 'Principe qui donne à chaque compte uniquement les droits nécessaires à sa tâche, pour la durée nécessaire.',
    lien: { to: '/cybersecurite/acces', label: 'Voir la page Accès' },
    alias: ['moindre privilege', 'least privilege'],
  },
  {
    terme: 'Navigateur',
    definition: 'Logiciel client qui télécharge, interprète et affiche des pages web (HTML, CSS, JavaScript) pour l’utilisateur.',
    module: 5,
    alias: ['navigateur', 'browser', 'navigateur web'],
  },
  {
    terme: 'Non-régression',
    definition: 'Vérification qu’un changement ne casse pas ce qui fonctionnait déjà.',
    module: 3,
    alias: ['non-regression', 'test de non-regression'],
  },
  {
    terme: 'Partie prenante',
    definition: 'Personne ou groupe qui influence le projet ou qui est concerné par lui.',
    module: 7,
    alias: ['partie prenante', 'parties prenantes', 'stakeholder'],
  },
  {
    terme: 'Périmètre',
    definition: 'Ce qui est inclus dans le projet, et ce qui en est exclu, écrit noir sur blanc.',
    module: 1,
    alias: ['perimetre', 'scope'],
  },
  {
    terme: 'PERT',
    sigle: 'PERT',
    developpe: 'Program Evaluation and Review Technique',
    definition: 'Réseau de tâches et de dépendances qui aide à lire l’enchaînement et les marges.',
    module: 2,
    alias: ['pert', 'reseau pert'],
  },
  {
    terme: 'Phishing',
    definition: 'Message trompeur qui pousse une personne à révéler une information, ouvrir une pièce jointe ou cliquer sur un lien.',
    lien: { to: '/cybersecurite/menaces', label: 'Voir la page Menaces' },
    alias: ['phishing', 'hameconnage'],
  },
  {
    terme: 'Plan de reprise',
    definition: 'Suite d’actions prévues pour restaurer un service après un incident, avec un responsable et un délai cible.',
    module: 5,
    alias: ['plan de reprise', 'pra'],
  },
  {
    terme: 'Pré-mortem',
    definition: 'Atelier qui imagine un échec futur avant de planifier, puis en tire des risques, des signes précoces et des décisions.',
    module: 6,
    alias: ['pre-mortem', 'premortem'],
  },
  {
    terme: 'Planning poker',
    definition: 'Estimation collective par choix de valeurs, suivie d’une discussion des écarts.',
    module: 4,
    alias: ['planning poker', 'poker planning'],
  },
  {
    terme: 'Product owner',
    definition: 'Rôle responsable de porter le besoin, de clarifier la valeur attendue et d’ordonner le backlog pour l’équipe.',
    module: 4,
    alias: ['product owner', 'po'],
  },
  {
    terme: 'Prompt',
    definition: 'Consigne donnée à un modèle, avec son contexte et le format de réponse souhaité\u00A0; elle se teste et se versionne.',
    lien: { to: '/ia/outils-configuration', label: 'Voir la page Outils' },
    alias: ['prompt'],
  },
  {
    terme: 'Propriétaire de risque',
    definition: 'Personne nommée qui suit un risque, met à jour sa parade et rend compte de son évolution.',
    module: 6,
    alias: ['proprietaire de risque', 'risk owner'],
  },
  {
    terme: 'RACI',
    sigle: 'RACI',
    developpe: 'Responsible, Accountable, Consulted, Informed',
    definition: 'Matrice qui précise, pour chaque activité, qui réalise, qui rend compte et décide, qui est consulté et qui est informé.',
    module: 7,
    alias: ['raci', 'matrice raci'],
  },
  {
    terme: 'RAG',
    sigle: 'RAG',
    developpe: 'Retrieval-Augmented Generation',
    definition: 'Recherche de documents pertinents puis injection de ces extraits dans le contexte du modèle pour répondre avec des sources.',
    lien: { to: '/ia/methodes', label: 'Voir la page Méthodes' },
    alias: ['rag', 'retrieval-augmented generation'],
  },
  {
    terme: 'Rançongiciel',
    definition: 'Logiciel malveillant qui chiffre ou bloque des données et réclame un paiement pour les libérer.',
    lien: { to: '/cybersecurite/incident', label: 'Voir la page Incident' },
    alias: ['rancongiciel', 'ransomware'],
  },
  {
    terme: 'Recette',
    definition: 'Vérification avec les parties prenantes que le livrable répond aux critères d’acceptation.',
    module: 3,
    alias: ['recette', 'recettage'],
  },
  {
    terme: 'Registre des risques',
    definition: 'Liste tenue à jour des risques, de leur poids et de la parade prévue.',
    module: 6,
    alias: ['registre des risques', 'tableau des risques'],
  },
  {
    terme: 'Relais',
    definition: 'Personne de proximité qui aide ses pairs à adopter un geste ou un outil.',
    module: 9,
    alias: ['relais', 'relais utilisateur'],
  },
  {
    terme: 'Rétrospective',
    definition: 'Temps court pour tirer des leçons d’une période et choisir une action suivie.',
    module: 6,
    alias: ['retrospective', 'retro'],
  },
  {
    terme: 'Revue par les pairs',
    definition: 'Relecture courte d’un livrable par des pairs, avec des critères observables et un ton tourné vers l’amélioration.',
    module: 7,
    alias: ['revue par les pairs', 'peer review'],
  },
  {
    terme: 'RGPD',
    sigle: 'RGPD',
    developpe: 'Règlement général sur la protection des données',
    definition: 'Règlement européen fixant les principes de protection, de transparence et de droits sur les données personnelles.',
    lien: { to: '/cybersecurite/donnees', label: 'Voir la page Données' },
    alias: ['rgpd', 'gdpr'],
  },
  {
    terme: 'Rituel',
    definition: 'Rendez-vous récurrent, court et cadré, qui soutient le travail commun.',
    module: 7,
    alias: ['rituel', 'rituels'],
  },
  {
    terme: 'Sauvegarde',
    definition: 'Copie d’un état du système conservée pour pouvoir restaurer après une perte ou une erreur.',
    module: 5,
    alias: ['sauvegarde', 'backup'],
  },
  {
    terme: 'Scrum',
    definition: 'Cadre agile avec rôles, backlog et rituels courts\u00A0; il ne résout pas tout à lui seul.',
    module: 4,
    alias: ['scrum'],
  },
  {
    terme: 'Secret',
    definition: 'Information d’authentification qui ne doit pas être versionnée ni affichée, et qui se stocke dans un coffre adapté.',
    module: 5,
    alias: ['secret', 'secrets'],
  },
  {
    terme: 'Serveur',
    definition: 'Machine ou programme qui attend des requêtes sur un réseau, traite la logique métier et renvoie des réponses.',
    module: 5,
    alias: ['serveur', 'server'],
  },
  {
    terme: 'Sponsor',
    definition: 'Personne qui porte le projet, débloque les moyens et répond au niveau décisionnel.',
    module: 7,
    alias: ['sponsor'],
  },
  {
    terme: 'Sprint',
    definition: 'Période courte et fixe (souvent deux semaines) durant laquelle une équipe Scrum réalise un ensemble de tâches choisies.',
    module: 4,
    alias: ['sprint', 'iteration'],
  },
  {
    terme: 'Suivi',
    definition: 'Lecture régulière de l’avancement, des blocages et des écarts pour décider.',
    module: 5,
    alias: ['suivi'],
  },
  {
    terme: 'Surface d’attaque',
    definition: 'Ensemble des points d’entrée par lesquels un attaquant peut tenter d’atteindre un système.',
    lien: { to: '/cybersecurite/menaces', label: 'Voir la page Menaces' },
    alias: ['surface d’attaque'],
  },
  {
    terme: 'Waterfall',
    definition: 'Approche en phases successives, aussi appelée cascade\u00A0; elle convient quand le périmètre est stable.',
    module: 3,
    alias: ['waterfall', 'cascade', 'methode en cascade'],
  },
  {
    terme: 'WBS',
    sigle: 'WBS',
    developpe: 'Work Breakdown Structure',
    definition: 'Découpage hiérarchique du travail en lots et livrables, jusqu’à un niveau d’action utile.',
    module: 1,
    alias: ['wbs', 'decoupage wbs'],
  },
  {
    terme: 'WIP',
    sigle: 'WIP',
    developpe: 'Work In Progress (Travaux en cours)',
    definition: 'Travaux en cours\u00A0; une limite de WIP aide à finir avant d’ouvrir de nouvelles tâches.',
    module: 4,
    alias: ['wip', 'limite de wip'],
  },
  {
    terme: 'XP',
    sigle: 'XP',
    developpe: 'Extreme Programming',
    definition: 'Approche agile centrée sur les petits lots, les tests et la qualité du code.',
    module: 4,
    alias: ['xp', 'extreme programming'],
  },
];

const normaliser = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export function trouverTerme(idOuNom: string): Terme | undefined {
  if (!idOuNom) return undefined;
  const cible = normaliser(idOuNom);
  return TERMES.find((t) => {
    if (normaliser(t.terme) === cible) return true;
    if (t.sigle && normaliser(t.sigle) === cible) return true;
    if (t.developpe && normaliser(t.developpe) === cible) return true;
    if (t.alias && t.alias.some((a) => normaliser(a) === cible)) return true;
    return false;
  });
}

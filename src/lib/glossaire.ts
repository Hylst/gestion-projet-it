export interface Terme {
  terme: string;
  definition: string;
  module?: number;
}

export const TERMES: Terme[] = [
  { terme: 'Adoption', definition: 'Usage réel d’un changement par les personnes concernées, au-delà de l’annonce et de la formation.', module: 9 },
  { terme: 'Agile', definition: 'Famille d’approches qui avance par petits lots et ajuste selon les retours\u00A0; elle ne se réduit pas à un seul cadre.', module: 3 },
  { terme: 'Backlog', definition: 'Liste ordonnée de besoins ou de tâches à traiter, tenue à jour et discutée avec l’équipe.', module: 4 },
  { terme: 'Cadrage', definition: 'Clarification du besoin, du périmètre et des critères de réussite avant de produire.', module: 1 },
  { terme: 'Chaîne CI', definition: 'Suite automatisée de vérification et de construction, déclenchée à chaque changement.', module: 5 },
  { terme: 'Conduite du changement', definition: 'Ensemble des gestes qui aident les personnes à adopter un nouveau fonctionnement, au-delà de l’annonce.', module: 9 },
  { terme: 'Cycle en V', definition: 'Organisation en phases qui fait correspondre chaque étape de construction à une vérification.', module: 3 },
  { terme: 'Définition de fini', definition: 'Critères partagés qui disent quand une tâche est vraiment terminée, au-delà du code écrit.', module: 1 },
  { terme: 'Dépendance', definition: 'Lien entre deux tâches tel que l’une ne peut pas avancer sans l’autre.', module: 2 },
  { terme: 'Écart', definition: 'Différence entre ce qui était prévu et ce qui est constaté\u00A0; elle s’explique avant de se corriger.', module: 8 },
  { terme: 'Environnement', definition: 'Ensemble des moyens techniques qui permettent de faire tourner et tester le produit.', module: 5 },
  { terme: 'Estimation', definition: 'Évaluation d’un effort, d’un délai ou d’un coût, avec ses hypothèses et son incertitude.', module: 8 },
  { terme: 'GANTT', definition: 'Planning en barres qui montre les tâches dans le temps et leurs chevauchements.', module: 2 },
  { terme: 'Hypothèse', definition: 'Condition tenue pour vraie dans une estimation ou un plan, à vérifier au fil du projet.', module: 8 },
  { terme: 'Indicateur', definition: 'Mesure simple choisie pour suivre un point utile, sans prétendre tout résumer.', module: 6 },
  { terme: 'Jalon', definition: 'Point de repère daté qui marque un résultat attendu et permet de faire le point.', module: 2 },
  { terme: 'Kanban', definition: 'Tableau visuel de flux avec des colonnes et des limites de travaux en cours.', module: 4 },
  { terme: 'Lean', definition: 'Approche qui cherche à réduire les efforts inutiles et à fluidifier le flux de travail.', module: 4 },
  { terme: 'Lot', definition: 'Ensemble de travaux regroupé pour être planifié, chiffré ou livré.', module: 1 },
  { terme: 'Marge d’aléa', definition: 'Provision explicite pour couvrir les inconnues reconnues d’un chiffrage, sans masquer les oublis.', module: 8 },
  { terme: 'Partie prenante', definition: 'Personne ou groupe qui influence le projet ou qui est concerné par lui.', module: 7 },
  { terme: 'Périmètre', definition: 'Ce qui est inclus dans le projet, et ce qui en est exclu, écrit noir sur blanc.', module: 1 },
  { terme: 'PERT', definition: 'Réseau de tâches et de dépendances qui aide à lire l’enchaînement et les marges.', module: 2 },
  { terme: 'Planning poker', definition: 'Estimation collective par choix de valeurs, suivie d’une discussion des écarts.', module: 4 },
  { terme: 'Registre des risques', definition: 'Liste tenue à jour des risques, de leur poids et de la parade prévue.', module: 6 },
  { terme: 'Relais', definition: 'Personne de proximité qui aide ses pairs à adopter un geste ou un outil.', module: 9 },
  { terme: 'Rétrospective', definition: 'Temps court pour tirer des leçons d’une période et choisir une action suivie.', module: 6 },
  { terme: 'Rituel', definition: 'Rendez-vous récurrent, court et cadré, qui soutient le travail commun.', module: 7 },
  { terme: 'Scrum', definition: 'Cadre agile avec rôles, backlog et rituels courts\u00A0; il ne résout pas tout à lui seul.', module: 4 },
  { terme: 'Suivi', definition: 'Lecture régulière de l’avancement, des blocages et des écarts pour décider.', module: 5 },
  { terme: 'WBS', definition: 'Découpage hiérarchique du travail en lots et tâches, jusqu’à un niveau utile.', module: 1 },
  { terme: 'WIP', definition: 'Travaux en cours\u00A0; une limite de WIP aide à finir avant d’ouvrir de nouvelles tâches.', module: 4 },
  { terme: 'Waterfall', definition: 'Approche en phases successives, aussi appelée cascade\u00A0; elle convient quand le périmètre est stable.', module: 3 },
  { terme: 'XP', definition: 'Approche agile centrée sur les petits lots, les tests et la qualité du code.', module: 4 },
];

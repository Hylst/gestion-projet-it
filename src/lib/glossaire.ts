export interface Terme {
  terme: string;
  definition: string;
  module?: number;
}

export const TERMES: Terme[] = [
  { terme: 'Adoption', definition: 'Usage reel d un changement par les personnes concernees, au dela de l annonce et de la formation.', module: 9 },
  { terme: 'Agile', definition: 'Famille d approches qui avance par petits lots et ajuste selon les retours; elle ne se reduit pas a un seul cadre.', module: 3 },
  { terme: 'Backlog', definition: 'Liste ordonnee de besoins ou de taches a traiter, tenue a jour et discutee avec l equipe.', module: 4 },
  { terme: 'Cadrage', definition: 'Clarification du besoin, du perimetre et des criteres de reussite avant de produire.', module: 1 },
  { terme: 'Chaine CI', definition: 'Suite automatisee de verification et de construction, declenchee a chaque changement.', module: 5 },
  { terme: 'Conduite du changement', definition: 'Ensemble des gestes qui aident les personnes a adopter un nouveau fonctionnement, au dela de l annonce.', module: 9 },
  { terme: 'Cycle en V', definition: 'Organisation en phases qui fait correspondre chaque etape de construction a une verification.', module: 3 },
  { terme: 'Definition de fini', definition: 'Criteres partages qui disent quand une tache est vraiment terminee, au dela du code ecrit.', module: 1 },
  { terme: 'Dependance', definition: 'Lien entre deux taches tel que l une ne peut pas avancer sans l autre.', module: 2 },
  { terme: 'Ecart', definition: 'Difference entre ce qui etait prevu et ce qui est constate; elle s explique avant de se corriger.', module: 8 },
  { terme: 'Environnement', definition: 'Ensemble des moyens techniques qui permettent de faire tourner et tester le produit.', module: 5 },
  { terme: 'Estimation', definition: 'Evaluation d un effort, d un delai ou d un cout, avec ses hypotheses et son incertitude.', module: 8 },
  { terme: 'GANTT', definition: 'Planning en barres qui montre les taches dans le temps et leurs chevauchements.', module: 2 },
  { terme: 'Hypothese', definition: 'Condition tenue pour vraie dans une estimation ou un plan, a verifier au fil du projet.', module: 8 },
  { terme: 'Indicateur', definition: 'Mesure simple choisie pour suivre un point utile, sans pretendre tout resumer.', module: 6 },
  { terme: 'Jalon', definition: 'Point de repere date qui marque un resultat attendu et permet de faire le point.', module: 2 },
  { terme: 'Kanban', definition: 'Tableau visuel de flux avec des colonnes et des limites de travaux en cours.', module: 4 },
  { terme: 'Lean', definition: 'Approche qui cherche a reduire les efforts inutiles et a fluidifier le flux de travail.', module: 4 },
  { terme: 'Lot', definition: 'Ensemble de travaux regroupe pour etre planifie, chiffre ou livre.', module: 1 },
  { terme: 'Marge d alea', definition: 'Provision explicite pour couvrir les inconnues reconnues d un chiffrage, sans masquer les oublis.', module: 8 },
  { terme: 'Partie prenante', definition: 'Personne ou groupe qui influence le projet ou qui est concerne par lui.', module: 7 },
  { terme: 'Perimetre', definition: 'Ce qui est inclus dans le projet, et ce qui en est exclu, ecrit noir sur blanc.', module: 1 },
  { terme: 'PERT', definition: 'Reseau de taches et de dependances qui aide a lire l enchainement et les marges.', module: 2 },
  { terme: 'Planning poker', definition: 'Estimation collective par choix de valeurs, suivie d une discussion des ecarts.', module: 4 },
  { terme: 'Registre des risques', definition: 'Liste tenue a jour des risques, de leur poids et de la parade prevue.', module: 6 },
  { terme: 'Relais', definition: 'Personne de proximite qui aide ses pairs a adopter un geste ou un outil.', module: 9 },
  { terme: 'Retrospective', definition: 'Temps court pour tirer des lecons d une periode et choisir une action suivie.', module: 6 },
  { terme: 'Rituel', definition: 'Rendez-vous recurrent, court et cadre, qui soutient le travail commun.', module: 7 },
  { terme: 'Scrum', definition: 'Cadre agile avec roles, backlog et rituels courts; il ne resout pas tout a lui seul.', module: 4 },
  { terme: 'Suivi', definition: 'Lecture reguliere de l avancement, des blocages et des ecarts pour decider.', module: 5 },
  { terme: 'WBS', definition: 'Decoupage hierarchique du travail en lots et taches, jusqu a un niveau utile.', module: 1 },
  { terme: 'WIP', definition: 'Travaux en cours; une limite de WIP aide a finir avant d ouvrir de nouvelles taches.', module: 4 },
  { terme: 'Waterfall', definition: 'Approche en phases successives, aussi appelee cascade; elle convient quand le perimetre est stable.', module: 3 },
  { terme: 'XP', definition: 'Approche agile centree sur les petits lots, les tests et la qualite du code.', module: 4 },
];

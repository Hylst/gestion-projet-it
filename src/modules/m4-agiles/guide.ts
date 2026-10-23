import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Dépasser la limite de WIP',
      consequence: 'Le flux s’engorge, les cartes vieillissent et la relecture devient le goulot.',
      correction: 'Finir une carte avant d’en ouvrir une autre, réduire la taille des cartes et rendre le blocage visible.',
    },
    {
      titre: 'Lancer Scrum sans backlog priorisé',
      consequence: 'Les rituels tournent à vide et aucun incrément utilisable n’arrive.',
      correction: 'Partir d’un backlog court et d’une revue avec le bureau, ou choisir Kanban si les demandes arrivent au fil de l’eau.',
    },
    {
      titre: 'Prendre le poker planning pour un concours de chiffre',
      consequence: 'Les points deviennent des heures et l’estimation perd son rôle de discussion.',
      correction: 'Estimer en taille relative, discuter les écarts et ne pas utiliser les points pour juger une personne.',
    },
  ],
  decision: {
    question: 'Scrum ou Kanban ?',
    options: [
      {
        nom: 'Scrum',
        quand: 'Les demandes arrivent par tranches et le bureau peut participer aux rituels.',
        limite: 'La coordination et les rôles ajoutent de la charge.',
      },
      {
        nom: 'Kanban',
        quand: 'Les demandes arrivent au fil de l’eau et le flux doit rester visible.',
        limite: 'Le flux priorise moins sans cadence ni engagement de tranche.',
      },
    ],
    nonUsage: 'Un projet unique et court, ou un support d’urgence qui tient sur un simple tableau.',
  },
};

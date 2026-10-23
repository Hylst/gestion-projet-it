import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Confondre le WBS et le planning',
      consequence: 'Les lots sont lus comme des phases et les dépendances deviennent implicites.',
      correction: 'Garder le WBS sur les livrables et traiter l’ordre des travaux dans le module 2.',
    },
    {
      titre: 'Laisser entrer le paiement en ligne',
      consequence: 'Le périmètre, le budget et le planning incluent un travail que le bureau avait exclu.',
      correction: 'Inscrire l’exclusion avec son motif et demander une décision explicite avant tout ajout.',
    },
    {
      titre: 'Oublier la notice des bénévoles',
      consequence: 'Le site est livré sans support et l’agenda ne peut pas être mis à jour.',
      correction: 'Ajouter la notice au lot Mise en ligne et l’inscrire dans la définition de fini.',
    },
  ],
  decision: {
    question: 'Comment découper le WBS ?',
    options: [
      {
        nom: 'Par livrables',
        quand: 'Le bureau doit voir ce qui sera livré et le découpage doit rester stable.',
        limite: 'Le WBS ne montre pas l’ordre des travaux.',
      },
      {
        nom: 'Par phases',
        quand: 'Le projet suit un enchaînement connu et les jalons sont déjà fixés.',
        limite: 'Le découpage recopie le planning et vieillit avec lui.',
      },
      {
        nom: 'Par rôles',
        quand: 'Les responsabilités sont stables et le travail se répartit par métier.',
        limite: 'Le découpage devient instable dès que l’équipe change.',
      },
    ],
    nonUsage: 'Un projet de trois tâches, ou un besoin encore trop flou pour nommer des livrables.',
  },
};

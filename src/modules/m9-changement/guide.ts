import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Annoncer sans formation ni pratique',
      consequence: 'Les bénévoles continuent l’ancien geste, les saisies manquent et l’adoption recule.',
      correction: 'Former sur un geste précis, faire pratiquer et laisser un relais disponible.',
    },
    {
      titre: 'Laisser deux consignes contradictoires',
      consequence: 'Les bénévoles choisissent chacun une version et les données se dispersent.',
      correction: 'Une consigne unique, le même mot partout, retrait de l’ancienne version et vérification de la compréhension.',
    },
    {
      titre: 'Compter les présents comme preuve d’adoption',
      consequence: 'Le bilan est vert alors que l’usage réel reste faible.',
      correction: 'Observer les usages, les questions et les gestes transmis au jalon, puis ajuster.',
    },
  ],
  decision: {
    question: 'Formation courte, relais de proximité ou message répété ?',
    options: [
      {
        nom: 'Formation courte',
        quand: 'Le frein est une compétence et un geste précis doit être appris.',
        limite: 'La formation n’apprend pas la motivation.',
      },
      {
        nom: 'Relais de proximité',
        quand: 'Un pair disponible peut montrer le geste au bon moment.',
        limite: 'Le relais peut s’épuiser ou devenir un goulot.',
      },
      {
        nom: 'Message répété',
        quand: 'Le frein est l’information et le message doit être compris partout.',
        limite: 'Le message n’apprend pas le geste et peut saturer.',
      },
    ],
    nonUsage: 'Si le problème vient de l’outil ou du processus, aucun de ces leviers ne le corrige.',
  },
};

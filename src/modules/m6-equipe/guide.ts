import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Confondre urgent et important',
      consequence: 'Les sujets de fond sont repoussés et l’équipe vit en réaction.',
      correction: 'Séparer urgence et importance, planifier l’important non urgent, déléguer ou simplifier le reste.',
    },
    {
      titre: 'Tenir un registre sans propriétaire',
      consequence: 'Le risque arrive et personne n’a préparé de parade ou de solution de rechange.',
      correction: 'Nommer un propriétaire, écrire une parade concrète, un déclencheur et une revue au jalon.',
    },
    {
      titre: 'Terminer la rétrospective sans action',
      consequence: 'Les mêmes blocages reviennent et les bénévoles concluent que la rétro ne sert à rien.',
      correction: 'Une action, un responsable nommé, une échéance et une revue à la rétro suivante.',
    },
  ],
  decision: {
    question: 'Réduire, transférer ou accepter un risque ?',
    options: [
      {
        nom: 'Réduire',
        quand: 'L’équipe maîtrise la cause et une parade concrète est possible.',
        limite: 'La parade coûte du temps et peut créer un nouveau risque.',
      },
      {
        nom: 'Transférer',
        quand: 'Un contrat ou un tiers peut porter une partie du risque.',
        limite: 'Le transfert ne supprime ni la responsabilité ni l’effet sur la réputation.',
      },
      {
        nom: 'Accepter',
        quand: 'Le risque est faible et une réserve explicite suffit.',
        limite: 'L’acceptation exige un suivi et une décision tracée.',
      },
    ],
    nonUsage: 'Un risque hors périmètre se remonte au bon niveau au lieu d’être accepté par défaut.',
  },
};

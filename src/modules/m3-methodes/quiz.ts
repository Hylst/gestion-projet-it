import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm3-quiz',
  questions: [
    {
      question: 'Quelle est la specificite du cycle en V ?',
      choix: [
        'Tests prepares en face de chaque conception',
        'Aucune documentation',
        'Livraison sans tests',
      ],
      bonne: 0,
      motif: 'La forme en V relie chaque niveau de conception a son niveau de test.',
    },
    {
      question: 'Quelle est la specificite de Waterfall (cascade) ?',
      choix: [
        'Phases en suite avec validation par phase',
        'Phases toutes en parallele sans ordre',
        'Absence de jalons',
      ],
      bonne: 0,
      motif: 'On valide une phase fictive avant de passer a la suivante.',
    },
    {
      question: 'Quel est le bon usage de la cascade ?',
      choix: [
        'Besoin stable et jalons clairs',
        'Besoin flou qui change chaque semaine',
        'Aucune contrainte de qualite',
      ],
      bonne: 0,
      motif: 'La cascade supporte mal les allers retours tardifs, elle convient quand le besoin bouge peu.',
    },
  ],
};

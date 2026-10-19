import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm3-quiz',
  questions: [
    {
      question: 'Quelle est la spécificité du cycle en V\u00A0?',
      choix: [
        'Tests préparés en face de chaque conception',
        'Aucune documentation',
        'Livraison sans tests',
      ],
      bonne: 0,
      motif: 'La forme en V relie chaque niveau de conception à son niveau de test.',
    },
    {
      question: 'Quelle est la spécificité de Waterfall (cascade)\u00A0?',
      choix: [
        'Phases en suite avec validation par phase',
        'Phases toutes en parallèle sans ordre',
        'Absence de jalons',
      ],
      bonne: 0,
      motif: 'On valide une phase fictive avant de passer à la suivante.',
    },
    {
      question: 'Quel est le bon usage de la cascade\u00A0?',
      choix: [
        'Besoin stable et jalons clairs',
        'Besoin flou qui change chaque semaine',
        'Aucune contrainte de qualité',
      ],
      bonne: 0,
      motif: 'La cascade supporte mal les allers retours tardifs, elle convient quand le besoin bouge peu.',
    },
  ],
};

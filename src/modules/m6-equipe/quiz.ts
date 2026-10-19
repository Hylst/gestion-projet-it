import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm6-quiz',
  questions: [
    {
      question: 'Qu’est-ce que Eisenhower sert à faire\u00A0?',
      choix: [
        'Trier urgent et important pour décider',
        'Tout faire en même temps',
        'Trier par ordre alphabétique',
      ],
      bonne: 0,
      motif: 'L’arbitrage vient de la distinction entre urgence et importance.',
    },
    {
      question: 'Que contient un registre des risques\u00A0?',
      choix: [
        'Risque fictif, probabilité, impact, parade',
        'Prénoms sans action',
        'Dates seules',
      ],
      bonne: 0,
      motif: 'Sans parade ni priorité, le registre ne sert pas au pilotage.',
    },
    {
      question: 'À quoi ressemble une bonne rétro\u00A0?',
      choix: [
        '4 points courts avec 1 action attribuée',
        'Un bilan sans action',
        'Des reproches sans suite',
      ],
      bonne: 0,
      motif: 'La rétro fictive vise une amélioration concrète et suivie.',
    },
  ],
};

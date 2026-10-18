import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm6-quiz',
  questions: [
    {
      question: 'Qu est ce que Eisenhower sert a faire ?',
      choix: [
        'Trier urgent et important pour decider',
        'Tout faire en meme temps',
        'Trier par ordre alphabetique',
      ],
      bonne: 0,
      motif: 'L arbitrage vient de la distinction entre urgence et importance.',
    },
    {
      question: 'Que contient un registre des risques ?',
      choix: [
        'Risque fictif, probabilite, impact, parade',
        'Prenoms sans action',
        'Dates seules',
      ],
      bonne: 0,
      motif: 'Sans parade ni priorite, le registre ne sert pas au pilotage.',
    },
    {
      question: 'A quoi ressemble une bonne retro ?',
      choix: [
        '4 points courts avec 1 action attribuee',
        'Un bilan sans action',
        'Des reproches sans suite',
      ],
      bonne: 0,
      motif: 'La retro fictive vise une amelioration concrete et suivie.',
    },
  ],
};

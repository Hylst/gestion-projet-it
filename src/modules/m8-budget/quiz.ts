import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm8-quiz',
  questions: [
    {
      question: 'A quoi sert une marge d alea ?',
      choix: [
        'Rendre explicite une incertitude de chiffrage',
        'Cacher un oubli dans le budget',
        'Eviter de suivre les depenses',
      ],
      bonne: 0,
      motif: 'La marge est une provision discutee, pas un masque sur les oublis.',
    },
    {
      question: 'Que faire devant un ecart budgetaire defavorable ?',
      choix: [
        'Comprendre la cause avant de corriger',
        'Augmenter le budget sans explication',
        'Ignorer l ecart jusqu a la fin',
      ],
      bonne: 0,
      motif: 'Sans cause identifiee, la correction risque de se repeter.',
    },
    {
      question: 'Pourquoi decouper le chiffrage par lots ?',
      choix: [
        'Rendre les hypotheses lisibles et ajustables',
        'Rendre le budget impossible a suivre',
        'Supprimer les hypotheses',
      ],
      bonne: 0,
      motif: 'Un lot chiffrable se discute et se revise plus facilement.',
    },
  ],
};

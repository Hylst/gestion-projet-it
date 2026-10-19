import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm8-quiz',
  questions: [
    {
      question: 'À quoi sert une marge d’aléa\u00A0?',
      choix: [
        'Rendre explicite une incertitude de chiffrage',
        'Cacher un oubli dans le budget',
        'Éviter de suivre les dépenses',
      ],
      bonne: 0,
      motif: 'La marge est une provision discutée, pas un masque sur les oublis.',
    },
    {
      question: 'Que faire devant un écart budgétaire défavorable\u00A0?',
      choix: [
        'Comprendre la cause avant de corriger',
        'Augmenter le budget sans explication',
        'Ignorer l’écart jusqu’à la fin',
      ],
      bonne: 0,
      motif: 'Sans cause identifiée, la correction risque de se répéter.',
    },
    {
      question: 'Pourquoi découper le chiffrage par lots\u00A0?',
      choix: [
        'Rendre les hypothèses lisibles et ajustables',
        'Rendre le budget impossible à suivre',
        'Supprimer les hypothèses',
      ],
      bonne: 0,
      motif: 'Un lot chiffrable se discute et se révise plus facilement.',
    },
  ],
};

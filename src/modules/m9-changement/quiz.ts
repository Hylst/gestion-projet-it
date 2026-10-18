import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm9-quiz',
  questions: [
    {
      question: 'Que faire face a un frein exprime ?',
      choix: [
        'Ecouter et comprendre avant de repondre',
        'Nier le frein et continuer',
        'Reporter le projet sans limite',
      ],
      bonne: 0,
      motif: 'Un frein compris peut devenir une information utile pour ajuster.',
    },
    {
      question: 'A quoi sert un relais de proximite ?',
      choix: [
        'Faciliter l adoption par les pairs',
        'Remplacer toute decision',
        'Eviter les questions',
      ],
      bonne: 0,
      motif: 'Un pair disponible rassure et montre le geste au quotidien.',
    },
    {
      question: 'Pourquoi une formation courte ?',
      choix: [
        'Ancrer un geste utile sans surcharger',
        'Tout apprendre en une fois',
        'Eviter la pratique',
      ],
      bonne: 0,
      motif: 'Un geste precis et pratique s ancre mieux qu un cours complet.',
    },
  ],
};

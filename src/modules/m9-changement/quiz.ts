import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm9-quiz',
  questions: [
    {
      question: 'Que faire face à un frein exprimé\u00A0?',
      choix: [
        'Écouter et comprendre avant de répondre',
        'Nier le frein et continuer',
        'Reporter le projet sans limite',
      ],
      bonne: 0,
      motif: 'Un frein compris peut devenir une information utile pour ajuster.',
    },
    {
      question: 'À quoi sert un relais de proximité\u00A0?',
      choix: [
        'Faciliter l’adoption par les pairs',
        'Remplacer toute décision',
        'Éviter les questions',
      ],
      bonne: 0,
      motif: 'Un pair disponible rassure et montre le geste au quotidien.',
    },
    {
      question: 'Pourquoi une formation courte\u00A0?',
      choix: [
        'Ancrer un geste utile sans surcharger',
        'Tout apprendre en une fois',
        'Éviter la pratique',
      ],
      bonne: 0,
      motif: 'Un geste précis et pratique s’ancre mieux qu’un cours complet.',
    },
  ],
};

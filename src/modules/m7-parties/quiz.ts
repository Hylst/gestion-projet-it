import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm7-quiz',
  questions: [
    {
      question: 'A quoi sert une cartographie des parties prenantes ?',
      choix: [
        'Reperer qui influence le projet et qui est concerne',
        'Classer les personnes par anciennete',
        'Remplacer le planning',
      ],
      bonne: 0,
      motif: 'La carte aide a adapter la communication, elle ne decide pas a la place du projet.',
    },
    {
      question: 'Que contient un plan de communication simple ?',
      choix: [
        'Qui, quoi, quand et par quel canal',
        'Un budget detaille sans destinataire',
        'Une liste de reunions sans objet',
      ],
      bonne: 0,
      motif: 'Sans destinataire, objet ou rythme, le plan reste inutilisable.',
    },
    {
      question: 'Que faire quand un retour contredit le plan ?',
      choix: [
        'Verifier le besoin puis ajuster le canal ou le rythme',
        'Ignorer le retour pour tenir le plan',
        'Arreter toute communication',
      ],
      bonne: 0,
      motif: 'Un plan vivant s ajuste apres un retour, sans defensive.',
    },
  ],
};

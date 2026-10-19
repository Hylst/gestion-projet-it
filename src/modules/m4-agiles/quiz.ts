import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm4-quiz',
  questions: [
    {
      question: 'Quel est le rôle du backlog en Scrum\u00A0?',
      choix: [
        'Une liste priorisée qui pilote les tranches',
        'Une liste figée pour toujours',
        'Un planning détaillé des heures',
      ],
      bonne: 0,
      motif: 'Le backlog évolue avec les retours, il n’est pas figé.',
    },
    {
      question: 'À quoi sert la limite de WIP en Kanban\u00A0?',
      choix: [
        'Finir avant de commencer, pour révéler les blocages',
        'Commencer le plus possible à la fois',
        'Supprimer la colonne Fini',
      ],
      bonne: 0,
      motif: 'La limite fictive rend visible l’encombrement et aide à débloquer.',
    },
    {
      question: 'Quel apport des méthodes Lean et XP\u00A0?',
      choix: [
        'Petits lots et qualité fréquente',
        'Un gros lot unique sans relecture',
        'Des tests seulement à la fin',
      ],
      bonne: 0,
      motif: 'Lean réduit les gaspillages par petits lots, XP soigne le code par tests et relectures fréquents.',
    },
  ],
};

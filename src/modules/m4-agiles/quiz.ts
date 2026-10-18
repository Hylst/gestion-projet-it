import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm4-quiz',
  questions: [
    {
      question: 'Quel est le role du backlog en Scrum ?',
      choix: [
        'Une liste priorisee qui pilote les tranches',
        'Une liste figee pour toujours',
        'Un planning detaille des heures',
      ],
      bonne: 0,
      motif: 'Le backlog evolue avec les retours, il n est pas fige.',
    },
    {
      question: 'A quoi sert la limite de WIP en Kanban ?',
      choix: [
        'Finir avant de commencer, pour reveler les blocages',
        'Commencer le plus possible a la fois',
        'Supprimer la colonne Fini',
      ],
      bonne: 0,
      motif: 'La limite fictive rend visible l encombrement et aide a debloquer.',
    },
    {
      question: 'Quel apport des methodes Lean et XP ?',
      choix: [
        'Petits lots et qualite frequente',
        'Un gros lot unique sans relecture',
        'Des tests seulement a la fin',
      ],
      bonne: 0,
      motif: 'Lean reduit les gaspillages par petits lots, XP soigne le code par tests et relectures frequents.',
    },
  ],
};

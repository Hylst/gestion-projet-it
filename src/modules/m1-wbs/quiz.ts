// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm1-quiz',
  questions: [
    {
      question: 'À quoi sert un WBS\u00A0?',
      choix: [
        'Visualiser les livrables et les lots pour partager le périmètre',
        'Coder plus vite',
        'Remplacer le planning',
      ],
      bonne: 0,
      motif: 'Le WBS montre ce qui est à livrer, pas comment coder ni quand livrer.',
    },
    {
      question: 'Où mettre le paiement en ligne dans le cas fictif\u00A0?',
      choix: ['Dans le lot Réalisation', 'Dehors, car hors cadrage fictif', 'En jalon'],
      bonne: 1,
      motif: 'Le cadrage fictif l’exclut, donc il reste dehors avec motif écrit.',
    },
    {
      question: 'Qu’est-ce qu’une bonne définition de fini\u00A0?',
      choix: ['Une formule vague', 'Un critère vérifiable par lot', 'Une date'],
      bonne: 1,
      motif: 'On peut constater que c’est fini\u00A0; la date seule ne le prouve pas.',
    },
  ],
};

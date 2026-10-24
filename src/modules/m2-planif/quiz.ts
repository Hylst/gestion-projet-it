// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm2-quiz',
  questions: [
    {
      question: 'À quoi sert un PERT\u00A0?',
      choix: [
        'Ordonner tâches et dépendances et lire la chaîne tendue',
        'Lister les outils',
        'Animer une réunion',
      ],
      bonne: 0,
      motif: 'Le PERT montre l’ordre et ce qui commande la date cible fictive.',
    },
    {
      question: 'À quoi sert un GANTT\u00A0?',
      choix: [
        'Voir qui fait quoi et quand et suivre l’avancement',
        'Écrire le code',
        'Chiffrer sans hypothèse',
      ],
      bonne: 0,
      motif: 'Barres, jalons et avancement partagés, sans lien direct avec le code.',
    },
    {
      question: 'Que faire si une tâche de la chaîne tendue glisse\u00A0?',
      choix: ['Ne rien changer', 'Ajouter des tâches', 'Replanifier et protéger la chaîne'],
      bonne: 2,
      motif: 'La chaîne tendue commande la fin, il faut agir dessus en priorité.',
    },
  ],
};

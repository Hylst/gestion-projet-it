// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm5-quiz',
  questions: [
    {
      question: 'À quoi sert un outil de suivi\u00A0?',
      choix: [
        'Centraliser backlog, colonnes et assignation',
        'Écrire à la place de l’équipe',
        'Garantir le délai seul',
      ],
      bonne: 0,
      motif: 'Il rend visible le travail partagé, il ne remplace ni l’arbitrage ni le travail.',
    },
    {
      question: 'À quoi sert une chaîne CI\u00A0?',
      choix: [
        'Tester et assembler à chaque changement fictif',
        'Publier sans aucun contrôle',
        'Remplacer la relecture',
      ],
      bonne: 0,
      motif: 'Détection tôt des régressions fictives, relecture gardée.',
    },
    {
      question: 'À quoi sert un environnement reproductible\u00A0?',
      choix: [
        'Même poste partout pour démo simple',
        'Accélérer le réseau',
        'Supprimer les tests',
      ],
      bonne: 0,
      motif: 'Écarts entre postes réduits, onboarding fictif plus simple.',
    },
  ],
};

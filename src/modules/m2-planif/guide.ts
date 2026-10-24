// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Lancer les tests avant la fin de l’intégration',
      consequence: 'Les pages changent encore, les défauts se mélangent et la date de fin devient fausse.',
      correction: 'Finir l’intégration avant les tests, ou ne chevaucher que la préparation des tests.',
    },
    {
      titre: 'Transformer un jalon en tâche',
      consequence: 'Le jalon n’a plus de décision ni de responsable et glisse avec les barres.',
      correction: 'Garder le jalon comme point de décision daté et le distinguer des tâches.',
    },
    {
      titre: 'Déplacer une barre sans relire les dépendances',
      consequence: 'La maquette avance avant la relecture du contenu et la séquence devient impossible.',
      correction: 'Déplacer une barre à la fois, vérifier les prédécesseurs et recalculer la chaîne tendue.',
    },
  ],
  decision: {
    question: 'PERT, GANTT ou les deux ?',
    options: [
      {
        nom: 'PERT',
        quand: 'Il faut expliquer la logique des dépendances et la chaîne tendue.',
        limite: 'Le graphe reste abstrait pour un bénévole.',
      },
      {
        nom: 'GANTT',
        quand: 'Il faut partager des dates, des barres et des jalons.',
        limite: 'Les dépendances sont moins visibles.',
      },
      {
        nom: 'PERT et GANTT',
        quand: 'Il faut à la fois expliquer la logique et suivre les dates.',
        limite: 'Les deux vues demandent un entretien régulier.',
      },
    ],
    nonUsage: 'Un projet sans dépendances, ou un planning détaillé alors que le besoin est encore instable.',
  },
};

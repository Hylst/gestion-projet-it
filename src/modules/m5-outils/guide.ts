// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Ouvrir un outil de suivi sans règle de mise à jour',
      consequence: 'Le tableau reste vide ou faux et le bureau décide sur une photo périmée.',
      correction: 'Nommer un responsable, fixer un rythme court, limiter les colonnes et relire au jalon.',
    },
    {
      titre: 'Ignorer une chaîne CI rouge',
      consequence: 'Les régressions passent, l’équipe contourne la chaîne et la confiance dans les tests disparaît.',
      correction: 'Stabiliser ou supprimer le test instable, bloquer la fusion tant que la chaîne échoue et garder la relecture humaine.',
    },
    {
      titre: 'Croire que l’image Docker dispense d’entretenir l’environnement',
      consequence: 'La démo fonctionne sur un poste et échoue chez l’hébergeur, les dépendances divergent.',
      correction: 'Versionner l’image, épingler les dépendances et tester le déploiement dans l’environnement cible.',
    },
  ],
  decision: {
    question: 'Outil dédié, tableau simple ou aucun outil ?',
    options: [
      {
        nom: 'Outil dédié',
        quand: 'L’équipe est dispersée et les traces doivent être partagées.',
        limite: 'L’outil ajoute de l’administration et un coût d’entrée.',
      },
      {
        nom: 'Tableau simple',
        quand: 'Le besoin est proche et l’équipe tient dans une salle ou un canal.',
        limite: 'L’historique et les décisions se perdent vite.',
      },
      {
        nom: 'Aucun outil',
        quand: 'Une personne suit trois tâches et peut tenir la liste elle-même.',
        limite: 'La mémoire ne suffit plus dès que plusieurs personnes décident.',
      },
    ],
    nonUsage: 'Des données qui ne doivent pas sortir de l’organisation, ou une équipe qui n’a pas de temps pour entretenir l’outil.',
  },
};

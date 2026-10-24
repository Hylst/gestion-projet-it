// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Choisir le cycle en V pour un besoin flou',
      consequence: 'Les désaccords sur l’agenda apparaissent en recette et la reprise coûte une phase.',
      correction: 'Éclaircir le besoin par une maquette ou une tranche courte avant de figer le V.',
    },
    {
      titre: 'Écrire les critères après la réalisation',
      consequence: 'La recette devient une négociation et chaque partie défend son interprétation.',
      correction: 'Écrire des critères observables et testables avant la réalisation, avec le bureau et un bénévole.',
    },
    {
      titre: 'Oublier la non-régression',
      consequence: 'La page contact ne répond plus après une mise à jour et les usagers perdent le formulaire.',
      correction: 'Rejouer un test court de la page contact à chaque changement et garder une preuve datée.',
    },
  ],
  decision: {
    question: 'Cascade, cycle en V ou tranches itératives ?',
    options: [
      {
        nom: 'Cascade',
        quand: 'Le besoin est stable, petit et les phases sont faciles à valider.',
        limite: 'Les retards et les retours coûtent cher.',
      },
      {
        nom: 'Cycle en V',
        quand: 'Les traces et les tests en miroir sont exigés dès la conception.',
        limite: 'La documentation alourdit un besoin encore mouvant.',
      },
      {
        nom: 'Tranches itératives',
        quand: 'Le besoin doit être précisé par des retours réguliers.',
        limite: 'Il faut des parties prenantes disponibles à chaque tranche.',
      },
    ],
    nonUsage: 'Un besoin réglementé avec des traces fortes ne se traite pas comme une tranche improvisée.',
  },
};

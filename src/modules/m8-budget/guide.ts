// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Donner un chiffre unique',
      consequence: 'La première surprise consomme la marge et le bureau perd confiance.',
      correction: 'Écrire les hypothèses, donner une fourchette à trois points et expliquer les bornes.',
    },
    {
      titre: 'Utiliser la marge d’aléa pour un oubli de périmètre',
      consequence: 'La marge disparaît sur un travail déjà connu et il ne reste rien pour l’inconnu réel.',
      correction: 'Ajouter l’oubli au périmètre et au chiffrage, garder la marge pour les inconnues reconnues.',
    },
    {
      titre: 'Suivre seulement le total dépensé',
      consequence: 'L’écart est vu trop tard et la correction touche le mauvais poste.',
      correction: 'Comparer budget et dépense par lot à chaque jalon, qualifier la cause et décider avec le bureau.',
    },
  ],
  decision: {
    question: 'Chiffrage ascendant, analogie ou trois points ?',
    options: [
      {
        nom: 'Ascendant',
        quand: 'Les lots sont assez détaillés pour estimer le temps et le matériel.',
        limite: 'Le calcul est coûteux et donne une fausse impression de précision.',
      },
      {
        nom: 'Analogie',
        quand: 'Un projet comparable existe et les écarts sont explicables.',
        limite: 'La comparaison devient trompeuse si le contexte diffère.',
      },
      {
        nom: 'Trois points',
        quand: 'L’incertitude est réelle et les bornes peuvent être discutées.',
        limite: 'La fourchette ne vaut que si les hypothèses sont honnêtes.',
      },
    ],
    nonUsage: 'Une phase très amont où un ordre de grandeur suffit, ou un projet minuscule où le jugement d’expert suffit.',
  },
};

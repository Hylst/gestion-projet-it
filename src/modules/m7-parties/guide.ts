// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from '../guideTypes';

export const guide: ModuleGuideData = {
  erreurs: [
    {
      titre: 'Traiter le financeur et la mairie comme de simples informés',
      consequence: 'Une condition de subvention ou une étape officielle arrive tard et le projet se bloque.',
      correction: 'Cartographier leur influence, les consulter en amont et prévoir un canal formel aux étapes clés.',
    },
    {
      titre: 'Construire un RACI avec deux A',
      consequence: 'Personne ne tranche, ou la décision est prise deux fois, et les bénévoles attendent.',
      correction: 'Un seul A par activité, au moins un R, pas de ligne vide, matrice validée avec les personnes concernées.',
    },
    {
      titre: 'Multiplier les canaux',
      consequence: 'Les bénévoles saturent et les usagers ne voient pas la nouvelle page.',
      correction: 'Un canal par besoin, un rythme tenable, un rituel court avec compte rendu et suite.',
    },
  ],
  decision: {
    question: 'RACI, journal de décisions ou accord oral ?',
    options: [
      {
        nom: 'RACI',
        quand: 'Plusieurs organisations ou équipes doivent savoir qui décide et qui réalise.',
        limite: 'La matrice est lourde à tenir et peut figer les rôles.',
      },
      {
        nom: 'Journal de décisions',
        quand: 'Les décisions sont peu nombreuses mais doivent rester traçables.',
        limite: 'Le journal ne répartit pas le travail.',
      },
      {
        nom: 'Accord oral',
        quand: 'L’équipe est petite, stable et les rôles sont évidents.',
        limite: 'L’accord se perd dès qu’une personne part ou qu’un conflit apparaît.',
      },
    ],
    nonUsage: 'Une activité sans décision partagée n’a pas besoin d’un RACI complet.',
  },
};

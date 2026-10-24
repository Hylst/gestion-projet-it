// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { reductions, verifierPhases } from '../../src/labos/LaboPhases';
import type { PhasesState } from '../../src/labos/LaboPhases';

const CASCADE_COMPLET: PhasesState['place'] = {
  Besoin: 'Besoin',
  Maquette: 'Conception',
  Code: 'Realisation',
  'Jeu de tests': 'Test',
  Recette: 'Acceptation',
  'Mise en ligne': 'Deploiement',
};

describe('reductions', () => {
  it('mode cascade : un placement est enregistre', () => {
    const s = reductions(
      { mode: 'cascade', place: {} },
      { type: 'assign', livrable: 'Besoin', cible: 'Besoin' },
    );
    expect(s.place.Besoin).toBe('Besoin');
  });
});

describe('verifierPhases', () => {
  it('mode cascade complet : verifierPhases ok', () => {
    const s: PhasesState = { mode: 'cascade', place: { ...CASCADE_COMPLET } };
    expect(verifierPhases(s).ok).toBe(true);
  });

  it('mauvaise cible produit un message clair', () => {
    const s: PhasesState = { mode: 'cascade', place: { 'Jeu de tests': 'Test', Recette: 'Test' } };
    const r = verifierPhases(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/Acceptation/);
  });

  it('mode v : la maquette attend Tests systeme', () => {
    const s = reductions(
      { mode: 'cascade', place: { Maquette: 'Conception' } },
      { type: 'mode', m: 'v' },
    );
    const r = verifierPhases(s);
    expect(r.messages.join(' ')).toMatch(/Tests système/);
  });
});

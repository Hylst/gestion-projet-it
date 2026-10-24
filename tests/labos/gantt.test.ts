// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { reduireGantt, initialState, verifierGantt, verifierPERT, BARRES_INIT } from '../../src/labos/LaboGanttPert';

describe('reduireGantt', () => {
  it('deplace une barre +1 et borne a 10', () => {
    let s = initialState('gantt');
    s = reduireGantt(s, { type: 'deplace', tache: 'Contenu relu', delta: 1 });
    expect(s.barres['Contenu relu']).toEqual({ debut: 2, fin: 3 });
    for (let i = 0; i < 20; i++) s = reduireGantt(s, { type: 'deplace', tache: 'Contenu relu', delta: 1 });
    expect(s.barres['Contenu relu']?.fin).toBeLessThanOrEqual(10);
  });
  it('deplace la barre Tests pour lever le chevauchement initial', () => {
    let s = initialState('gantt');
    s = reduireGantt(s, { type: 'deplace', tache: 'Tests', delta: 2 });
    expect(s.barres['Tests']?.debut).toBe(7);
    expect(verifierGantt(s.barres).ok).toBe(true);
  });
  it("liaison PERT enregistre puis retire", () => {
    let s = initialState('pert');
    s = reduireGantt(s, { type: 'liaison', de: 'Contenu relu', vers: 'Maquette' });
    expect(s.liaisons).toContainEqual(['Contenu relu', 'Maquette']);
    s = reduireGantt(s, { type: 'retire-liaison', de: 'Contenu relu', vers: 'Maquette' });
    expect(s.liaisons).toEqual([]);
  });
});

describe('verifierPERT', () => {
  it('pas de liaisons : pas ok', () => {
    const r = verifierPERT([]);
    expect(r.ok).toBe(false);
  });
  it('liaisons stockees dans l ordre : ok avec chaine tendue surlignee', () => {
    const r = verifierPERT([['Contenu relu', 'Maquette'], ['Maquette', 'Integration'], ['Integration', 'Tests'], ['Tests', 'Mise en ligne']]);
    expect(r.ok).toBe(true);
    expect(r.chaineTendue).toEqual(['Contenu relu', 'Maquette', 'Integration', 'Tests']);
  });
});

describe('BARRES_INIT', () => {
  it('presentation initiale contient le chevauchement Integration/Tests', () => {
    expect(BARRES_INIT['Tests']?.debut).toBe(BARRES_INIT['Integration']?.debut);
    expect(verifierGantt(BARRES_INIT).ok).toBe(false);
  });
});

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { reduceChaine, verifierChaine, initialState, ORDRE_ATTENDU, ETAPES } from '../../src/labos/LaboChaineCI';

describe('reduceChaine', () => {
  it('depLace une etape vers le haut via swap voisins', () => {
    const s0 = initialState();
    const idx = s0.ordre.indexOf('Test');
    const s = reduceChaine(s0, { type: 'monte', etape: s0.ordre[idx] as string });
    expect(s.ordre[idx - 1]).toBe(s0.ordre[idx]);
  });
  it('borne du swap 0 et fin', () => {
    const s0 = initialState();
    const prem = s0.ordre[0] as string;
    expect(reduceChaine(s0, { type: 'monte', etape: prem }).ordre).toEqual(s0.ordre);
  });
});

describe('verifierChaine', () => {
  it('bye au depart', () => {
    expect(verifierChaine(initialState()).ok).toBe(false);
  });
  it('ok quand ordre == attendu', () => {
    const s = { ordre: [...ORDRE_ATTENDU] };
    expect(verifierChaine(s).ok).toBe(true);
  });
  it('message explicite quand Déploiement passe avant Test', () => {
    const s = { ordre: ['Déploiement', 'Test', 'Assemblage', 'Relecture'] };
    const r = verifierChaine(s);
    expect(r.messages.some((m) => m.includes('déploiement ne peut pas commencer avant les tests'))).toBe(true);
  });
});

describe('ETAPES', () => {
  it('contient les quatre etapes de la chaine', () => {
    expect(ETAPES).toEqual(['Test', 'Assemblage', 'Relecture', 'Déploiement']);
  });
});

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import {
  LOTS,
  NIVEAUX,
  reduceAlea,
  verifierAlea,
  initialState as initA,
} from '../../src/labos/LaboAlea';

const choisirTout = () => {
  let s = initA();
  for (const l of LOTS) s = reduceAlea(s, { type: 'choisir', lot: l.nom, niveau: l.provision });
  return s;
};

describe('reduceAlea', () => {
  it('enregistre une provision par lot', () => {
    const l = LOTS[0]!;
    const s = reduceAlea(initA(), { type: 'choisir', lot: l.nom, niveau: l.provision });
    expect(s.choix[l.nom]).toBe(l.provision);
  });

  it('reinitialise les provisions', () => {
    expect(reduceAlea(choisirTout(), { type: 'reset' })).toEqual(initA());
  });
});

describe('verifierAlea', () => {
  it('valide quand chaque lot a la provision adaptee', () => {
    expect(verifierAlea(choisirTout()).ok).toBe(true);
  });

  it('signale un lot sans provision', () => {
    const r = verifierAlea(initA());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(LOTS.length);
    expect(r.messages.join(' ')).toMatch(/provision attendue/i);
  });

  it('signale une provision inadaptee sans juger', () => {
    let s = choisirTout();
    const l = LOTS[0]!;
    const autre = NIVEAUX.find((n) => n !== l.provision)!;
    s = reduceAlea(s, { type: 'choisir', lot: l.nom, niveau: autre });
    const r = verifierAlea(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/provision attendue/i);
    expect(r.messages.join(' ')).not.toMatch(/erreur|faute|mauvais/i);
  });
});

describe('donnees du labo alea', () => {
  it('cinq lots fictifs avec une provision attendue', () => {
    expect(LOTS.length).toBe(5);
    expect(NIVEAUX.length).toBe(3);
    for (const l of LOTS) {
      expect(NIVEAUX).toContain(l.provision);
      expect(l.incertitude.length).toBeGreaterThan(10);
    }
  });
});

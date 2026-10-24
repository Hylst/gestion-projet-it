// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import {
  SITUATIONS,
  OPTIONS_LEVIERS,
  reduceAdoption,
  verifierAdoption,
  initialState as initAd,
} from '../../src/labos/LaboAdoption';

const choisirTout = () => {
  let s = initAd();
  for (const sit of SITUATIONS) {
    s = reduceAdoption(s, { type: 'choisir', situation: sit.nom, levier: sit.levier });
  }
  return s;
};

describe('reduceAdoption', () => {
  it('enregistre un levier par situation', () => {
    const sit = SITUATIONS[0]!;
    const s = reduceAdoption(initAd(), { type: 'choisir', situation: sit.nom, levier: sit.levier });
    expect(s.choix[sit.nom]).toBe(sit.levier);
  });

  it('reinitialise les choix', () => {
    expect(reduceAdoption(choisirTout(), { type: 'reset' })).toEqual(initAd());
  });
});

describe('verifierAdoption', () => {
  it('valide quand chaque situation a le levier adapte', () => {
    expect(verifierAdoption(choisirTout()).ok).toBe(true);
  });

  it('signale une situation sans levier', () => {
    const r = verifierAdoption(initAd());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(SITUATIONS.length);
    expect(r.messages.join(' ')).toMatch(/levier attendu/i);
  });

  it('signale un levier inadapte sans juger', () => {
    let s = choisirTout();
    const sit = SITUATIONS[0]!;
    const autre = OPTIONS_LEVIERS[sit.nom]?.find((o) => o.valeur !== sit.levier);
    s = reduceAdoption(s, { type: 'choisir', situation: sit.nom, levier: autre?.valeur ?? '' });
    const r = verifierAdoption(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/levier attendu/i);
    expect(r.messages.join(' ')).not.toMatch(/erreur|faute|mauvais/i);
  });
});

describe('donnees du labo adoption', () => {
  it('cinq situations fictives avec un levier attendu', () => {
    expect(SITUATIONS.length).toBe(5);
    for (const sit of SITUATIONS) {
      expect(sit.signe.length).toBeGreaterThan(10);
      expect(sit.levier.length).toBeGreaterThan(3);
    }
  });

  it('trois options par situation, une seule adaptee', () => {
    for (const sit of SITUATIONS) {
      const options = OPTIONS_LEVIERS[sit.nom] ?? [];
      expect(options.length).toBe(3);
      expect(options.filter((o) => o.valeur === sit.levier).length).toBe(1);
    }
  });
});

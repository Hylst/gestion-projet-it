import { describe, it, expect } from 'vitest';
import {
  PARTIES,
  OPTIONS_COMMUNICATION,
  reduceComm,
  verifierComm,
  initialState as initC,
} from '../../src/labos/LaboCommunication';

const choisirTout = () => {
  let s = initC();
  for (const p of PARTIES) {
    s = reduceComm(s, { type: 'choisir', partie: p.nom, valeur: p.canal });
  }
  return s;
};

describe('reduceComm', () => {
  it('enregistre un choix de canal', () => {
    const p = PARTIES[0]!;
    const s = reduceComm(initC(), { type: 'choisir', partie: p.nom, valeur: p.canal });
    expect(s.choix[p.nom]).toBe(p.canal);
  });

  it('reinitialise tous les choix', () => {
    const s = reduceComm(choisirTout(), { type: 'reset' });
    expect(s).toEqual(initC());
  });
});

describe('verifierComm', () => {
  it('valide quand chaque partie a le canal adapte', () => {
    expect(verifierComm(choisirTout()).ok).toBe(true);
  });

  it('signale une partie sans choix', () => {
    const r = verifierComm(initC());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(PARTIES.length);
    expect(r.messages.join(' ')).toMatch(/canal attendu/i);
  });

  it('signale un canal inadapte sans juger', () => {
    let s = choisirTout();
    const p = PARTIES[0]!;
    const autre = OPTIONS_COMMUNICATION[p.nom]?.find((o) => o.valeur !== p.canal);
    s = reduceComm(s, { type: 'choisir', partie: p.nom, valeur: autre?.valeur ?? '' });
    const r = verifierComm(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/canal attendu/i);
    expect(r.messages.join(' ')).not.toMatch(/erreur|faute|mauvais/i);
  });
});

describe('donnees du labo communication', () => {
  it('six parties prenantes fictives avec un canal attendu', () => {
    expect(PARTIES.length).toBe(6);
    for (const p of PARTIES) {
      expect(p.nom.length).toBeGreaterThan(3);
      expect(p.canal.length).toBeGreaterThan(3);
    }
  });

  it('trois options par partie, une seule adaptee', () => {
    for (const p of PARTIES) {
      const options = OPTIONS_COMMUNICATION[p.nom] ?? [];
      expect(options.length).toBe(3);
      expect(options.filter((o) => o.valeur === p.canal).length).toBe(1);
    }
  });
});

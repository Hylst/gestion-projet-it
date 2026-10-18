import { describe, it, expect } from 'vitest';
import {
  reduceR,
  priorites,
  verifierRisques,
  RISQUES,
  OPTIONS_PARADES,
  initialState as initR,
} from '../../src/labos/LaboRisques';

const placerTout = () => {
  let s = initR();
  for (const r of RISQUES) {
    s = reduceR(s, { type: 'place', risque: r.nom, cell: `p${r.proba}-i${r.impact}` });
  }
  return s;
};

describe('reduceR', () => {
  it('place un risque dans la bonne cellule', () => {
    const s = reduceR(initR(), { type: 'place', risque: RISQUES[0]!.nom, cell: 'p2-i3' });
    expect(s.place[RISQUES[0]!.nom]).toBe('p2-i3');
  });

  it('enregistre puis retire une parade', () => {
    let s = reduceR(initR(), { type: 'parade', risque: RISQUES[0]!.nom, valeur: 'Choix fictif' });
    expect(s.parades[RISQUES[0]!.nom]).toBe('Choix fictif');
    s = reduceR(s, { type: 'parade', risque: RISQUES[0]!.nom, valeur: null });
    expect(s.parades[RISQUES[0]!.nom]).toBeNull();
  });

  it('reinitialise placements et parades', () => {
    let s = placerTout();
    s = reduceR(s, { type: 'parade', risque: RISQUES[0]!.nom, valeur: 'Choix fictif' });
    s = reduceR(s, { type: 'reset' });
    expect(s).toEqual(initR());
  });
});

describe('priorites', () => {
  it('calcule proba x impact et trie en descendant', () => {
    const py = priorites(placerTout());
    expect(py.length).toBe(RISQUES.length);
    expect(py[0]!.score).toBeGreaterThanOrEqual(py[py.length - 1]!.score);
    expect(py[0]!.nom).toBe('Notice des benevoles non ecrite');
    expect(py[0]!.score).toBe(9);
  });

  it('ne liste que les risques deja places', () => {
    expect(priorites(initR())).toEqual([]);
    const s = reduceR(initR(), { type: 'place', risque: RISQUES[0]!.nom, cell: 'p2-i3' });
    expect(priorites(s)).toEqual([{ nom: RISQUES[0]!.nom, score: 6 }]);
  });
});

describe('verifierRisques', () => {
  it('valide quand tout est bien place avec parades majeures', () => {
    let s = placerTout();
    for (const r of RISQUES) {
      if (r.proba * r.impact >= 6) s = reduceR(s, { type: 'parade', risque: r.nom, valeur: r.parade });
    }
    expect(verifierRisques(s).ok).toBe(true);
  });

  it('majeur sans parade produit un message', () => {
    const r = verifierRisques(placerTout());
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/parade/i);
  });

  it('parade incorrecte pour un majeur produit un message', () => {
    let s = placerTout();
    for (const r of RISQUES) {
      if (r.proba * r.impact >= 6) {
        const option = OPTIONS_PARADES[r.nom]?.find((o) => o.valeur !== r.parade);
        s = reduceR(s, { type: 'parade', risque: r.nom, valeur: option?.valeur ?? null });
      }
    }
    const r = verifierRisques(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/parade/i);
  });

  it('cellule incorrecte produit un message avec la cellule attendue', () => {
    let s = placerTout();
    s = reduceR(s, { type: 'place', risque: RISQUES[0]!.nom, cell: 'p1-i1' });
    const r = verifierRisques(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/probabilite 2, impact 3/i);
  });
});

describe('donnees du labo', () => {
  it('six risques fictifs', () => {
    expect(RISQUES.length).toBe(6);
  });

  it('trois parades proposees par risque majeur, une seule correcte', () => {
    for (const r of RISQUES.filter((x) => x.proba * x.impact >= 6)) {
      const options = OPTIONS_PARADES[r.nom] ?? [];
      expect(options.length).toBe(3);
      expect(options.filter((o) => o.valeur === r.parade).length).toBe(1);
    }
  });
});

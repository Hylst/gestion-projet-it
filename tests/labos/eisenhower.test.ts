import { describe, it, expect } from 'vitest';
import { reduceQ, verifierQ, ATTENDU_Q, TACHES, QUADRANTS, initialState as initE } from '../../src/labos/LaboEisenhower';

describe('reduceQ', () => {
  it('met une tache dans un quadrant', () => {
    const s = reduceQ(initE(), { type: 'place', tache: TACHES[0], q: 'urgent-important' });
    expect(s.place[TACHES[0]]).toBe('urgent-important');
  });
});

describe('verifierQ', () => {
  it('ok quand tout est bien place', () => {
    let s = initE();
    for (const t of TACHES) s = reduceQ(s, { type: 'place', tache: t, q: ATTENDU_Q[t] });
    expect(verifierQ(s).ok).toBe(true);
  });
  it('pas ok au depart et messages par tache', () => {
    const r = verifierQ(initE());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(TACHES.length);
  });
  it('QUADRANTS a 4 cles', () => expect(QUADRANTS.length).toBe(4));
});

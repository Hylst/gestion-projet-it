// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { rejouer, verifierPoker, STORIES, CORRECTIONS, initialState as initPoker } from '../../src/labos/PokerPlanning';

describe('rejouer', () => {
  it('estime une story', () => {
    const s = rejouer(initPoker(), { type: 'estime', story: 'Page accueil', valeur: 2 });
    expect(s.estimations['Page accueil']).toBe(2);
  });
  it('reveal garde les estimations et marque revele', () => {
    let s = initPoker();
    s = rejouer(s, { type: 'estime', story: 'Page accueil', valeur: 3 });
    s = rejouer(s, { type: 'reveal' });
    expect(s.revele).toBe(true);
    expect(verifierPoker(s).messages.length).toBe(STORIES.length);
  });
});

describe('verifierPoker', () => {
  it('ok quand toutes les estimations collent aux corrections', () => {
    let s = initPoker();
    for (const story of STORIES) s = rejouer(s, { type: 'estime', story, valeur: CORRECTIONS[story] });
    const r = verifierPoker(s);
    expect(r.ok).toBe(true);
    expect(r.messages.length).toBe(0);
  });
  it('attend toutes les estimations avant verdict', () => {
    expect(verifierPoker(initPoker()).ok).toBe(false);
  });
});

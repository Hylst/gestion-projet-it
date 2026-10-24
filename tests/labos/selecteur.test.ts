// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { reduceSelecteur, verifierSelecteur, SUGGESTIONS, BESOINS, initialState } from '../../src/labos/LaboSelecteurOutil';

describe('LaboSelecteurOutil', () => {
  it('choisit un outil par besoin', () => {
    const s = reduceSelecteur(initialState(), { type: 'choisit', besoin: 'Équipe dispersée', outil: 'Chaîne CI' });
    expect(s.choix['Équipe dispersée']).toBe('Chaîne CI');
  });
  it('ok quand les 3 besoins sont corrects', () => {
    let s = initialState();
    for (const b of BESOINS) s = reduceSelecteur(s, { type: 'choisit', besoin: b, outil: SUGGESTIONS[b] ?? '' });
    expect(verifierSelecteur(s).ok).toBe(true);
  });
  it('messages clair si pas fait', () => {
    const r = verifierSelecteur(initialState());
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBe(3);
  });
});

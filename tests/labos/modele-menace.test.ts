// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, expect, it } from 'vitest';
import {
  SCENARIOS,
  choisirParade,
  initialiserModele,
  verifierModele,
} from '../../src/labos/LaboModeleMenace';

describe('modele de menace', () => {
  it('valide les cinq bonnes parades', () => {
    let s = initialiserModele();
    for (const scenario of SCENARIOS) s = choisirParade(s, scenario.id, scenario.parade);
    expect(verifierModele(s).ok).toBe(true);
  });

  it('signale chaque scenario sans choix', () => {
    const r = verifierModele(initialiserModele());
    expect(r.ok).toBe(false);
    expect(r.messages).toHaveLength(SCENARIOS.length);
  });

  it('signale une parade incorrecte', () => {
    let s = initialiserModele();
    for (const scenario of SCENARIOS) {
      const mauvaise = scenario.options.find((o) => o.valeur !== scenario.parade);
      s = choisirParade(s, scenario.id, mauvaise?.valeur ?? '');
    }
    const r = verifierModele(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/parade/i);
  });

  it('propose trois options par scenario, une seule correcte', () => {
    for (const scenario of SCENARIOS) {
      expect(scenario.options).toHaveLength(3);
      expect(scenario.options.filter((o) => o.valeur === scenario.parade)).toHaveLength(1);
    }
  });
});

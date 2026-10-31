// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, expect, it } from 'vitest';
import {
  ORDRE_INCIDENT,
  deplacerAction,
  initialiserChronologie,
  verifierChronologie,
} from '../../src/labos/LaboTimelineIncident';

describe('chronologie d incident', () => {
  it('valide l ordre attendu', () => {
    expect(verifierChronologie([...ORDRE_INCIDENT]).ok).toBe(true);
  });

  it('signale le premier ecart', () => {
    const ordre = [...ORDRE_INCIDENT];
    [ordre[1], ordre[2]] = [ordre[2] as string, ordre[1] as string];
    const r = verifierChronologie(ordre);
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBeGreaterThan(0);
  });

  it('deplace une action vers le haut et le bas', () => {
    const depart = [...ORDRE_INCIDENT];
    const haut = deplacerAction(depart, 1, -1);
    expect(haut[0]).toBe(depart[1]);
    const bas = deplacerAction(haut, 0, 1);
    expect(bas).toEqual(depart);
  });

  it('ne sort pas des bornes', () => {
    const depart = [...ORDRE_INCIDENT];
    expect(deplacerAction(depart, 0, -1)).toEqual(depart);
    expect(deplacerAction(depart, depart.length - 1, 1)).toEqual(depart);
  });

  it('part d un ordre melange et contient six actions', () => {
    const initial = initialiserChronologie();
    expect(initial).toHaveLength(6);
    expect(initial).not.toEqual([...ORDRE_INCIDENT]);
  });
});

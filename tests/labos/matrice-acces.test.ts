// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, expect, it } from 'vitest';
import {
  DROITS_ACCES,
  ROLES_ACCES,
  attribuerDroit,
  initialiserAcces,
  verifierAcces,
} from '../../src/labos/LaboMatriceAcces';

describe('matrice des acces', () => {
  it('valide les quatre droits minimaux', () => {
    let s = initialiserAcces();
    for (const role of ROLES_ACCES) s = attribuerDroit(s, role.id, role.droit);
    expect(verifierAcces(s).ok).toBe(true);
  });

  it('signale chaque role sans droit', () => {
    const r = verifierAcces(initialiserAcces());
    expect(r.ok).toBe(false);
    expect(r.messages).toHaveLength(ROLES_ACCES.length);
  });

  it('signale un droit trop large', () => {
    let s = initialiserAcces();
    for (const role of ROLES_ACCES) s = attribuerDroit(s, role.id, role.droit);
    const bureau = ROLES_ACCES.find((r) => r.id === 'bureau');
    if (!bureau) throw new Error('Role bureau absent.');
    s = attribuerDroit(s, bureau.id, 'Administration');
    expect(verifierAcces(s).ok).toBe(false);
    expect(verifierAcces(s).messages.join(' ')).toMatch(/trop large|minimal/i);
  });

  it('propose quatre roles et quatre droits', () => {
    expect(ROLES_ACCES).toHaveLength(4);
    expect(DROITS_ACCES).toHaveLength(4);
  });
});

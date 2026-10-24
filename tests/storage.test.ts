// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect, beforeEach } from 'vitest';
import { readJSON, writeJSON, removeKey, storageAvailable, quizKey } from '../src/lib/storage';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('readJSON rend le fallback quand la cle manque', () => {
    expect(readJSON('cle-inexistante', { a: 1 })).toEqual({ a: 1 });
  });

  it('readJSON lit une valeur JSON valide', () => {
    writeJSON('k', { v: 42 });
    expect(readJSON<{ v: number }>('k', { v: 0 })).toEqual({ v: 42 });
  });

  it('readJSON rend le fallback si le JSON est corrompu', () => {
    localStorage.setItem('k', 'not-json');
    expect(readJSON('k', 'fallback')).toBe('fallback');
  });

  it('removeKey supprime', () => {
    writeJSON('k', 1);
    removeKey('k');
    expect(readJSON('k', 0)).toBe(0);
  });

  it('storageAvailable est vrai en jsdom', () => {
    expect(storageAvailable()).toBe(true);
  });

  it('cles nommeaux suivant la convention gestion-projet-it:*', () => {
    expect(quizKey('q1')).toBe('gestion-projet-it:quiz:done:q1');
  });
});

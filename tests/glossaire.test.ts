import { describe, it, expect } from 'vitest';
import { TERMES } from '../src/lib/glossaire';

describe('glossaire', () => {
  it('contient au moins 25 termes', () => {
    expect(TERMES.length).toBeGreaterThanOrEqual(25);
  });

  it('les termes sont uniques', () => {
    const noms = TERMES.map((t) => t.terme.toLowerCase());
    expect(new Set(noms).size).toBe(noms.length);
  });

  it('chaque definition est courte et renseignee', () => {
    for (const t of TERMES) {
      expect(t.definition.length).toBeGreaterThanOrEqual(30);
      expect(t.definition.length).toBeLessThanOrEqual(240);
    }
  });

  it('les renvois de module restent dans le parcours', () => {
    for (const t of TERMES) {
      if (t.module !== undefined) {
        expect(t.module).toBeGreaterThanOrEqual(1);
        expect(t.module).toBeLessThanOrEqual(9);
      }
    }
  });

  it('aucun tiret cadratin dans les definitions', () => {
    expect(TERMES.every((t) => !t.definition.includes('—'))).toBe(true);
  });
});

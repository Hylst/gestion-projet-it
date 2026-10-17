import { describe, it, expect } from 'vitest';
import { buildIndex, searchIndex } from '../src/lib/search';

describe('search', () => {
  const index = buildIndex();
  it('l index couvre les 6 modules et leurs sections', () => {
    const modules = new Set(index.map((h) => h.moduleNum));
    expect([...modules].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(index.some((h) => h.ancre === 'labo')).toBe(true);
    expect(index.some((h) => h.ancre === 'quiz')).toBe(true);
  });
  it('cherche sans casse ni accents sur titres et mots cles', () => {
    const hits = searchIndex(index, 'KANBAN');
    expect(hits.some((h) => h.moduleNum === 4)).toBe(true);
    const hits2 = searchIndex(index, 'eisenhower');
    expect(hits2.every((h) => h.moduleNum === 6)).toBe(true);
  });
  it('requête vide rend vide', () => {
    expect(searchIndex(index, '')).toEqual([]);
  });
  it('exclut les modules futurs', () => {
    expect(buildIndex().every((h) => h.moduleNum < 7)).toBe(true);
  });
});

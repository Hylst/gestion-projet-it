import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProgressProvider, useProgress } from '../src/lib/progress';

describe('progress provider', () => {
  beforeEach(() => localStorage.clear());

  it('dispatch quiz complet accorde +10 XP une seule fois', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'quiz', id: 'q1', correctes: 2, total: 3 }));
    expect(result.current.xp).toBe(10);
    act(() => result.current.dispatch({ type: 'quiz', id: 'q1', correctes: 3, total: 3 }));
    expect(result.current.xp).toBe(10);
  });

  it('persiste dans localStorage apres dispatch', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'labo', id: 'l1' }));
    expect(JSON.parse(localStorage.getItem('gestion-projet-it:xp') as string).xp).toBe(5);
  });

  it('exportJSON puis importJSON retablissent l etat', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => result.current.dispatch({ type: 'module', id: 'm1-wbs' }));
    const json = result.current.exportJSON();
    act(() => result.current.dispatch({ type: 'reset' }));
    expect(result.current.xp).toBe(0);
    act(() => {
      expect(result.current.importJSON(json)).toBe(true);
    });
    expect(result.current.moduleDone).toEqual(['m1-wbs']);
  });

  it('importJSON rejette un JSON invalide en retournant false', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    expect(result.current.importJSON('not-json')).toBe(false);
  });

  it('niveau suit l XP', () => {
    const { result } = renderHook(() => useProgress(), { wrapper: ProgressProvider });
    act(() => { for (let i = 0; i < 5; i++) result.current.dispatch({ type: 'quiz', id: `q${i}`, correctes: 3, total: 3 }); });
    expect(result.current.niveau.nom).toBe('Organisateur');
  });
});

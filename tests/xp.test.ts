// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { XPQuiz, XPLabo, XPModule, NIVEAUX, niveauPour, reduireXP, loadXPState, saveXPState } from '../src/lib/xp';

describe('xp', () => {
  it('constantes XP', () => {
    expect(XPQuiz).toBe(10); expect(XPLabo).toBe(5); expect(XPModule).toBe(20);
  });

  it('niveauPour demarre Curieux et couvre tous les seuils', () => {
    expect(niveauPour(0).nom).toBe('Curieux');
    expect(niveauPour(49).nom).toBe('Curieux');
    expect(niveauPour(50).nom).toBe('Organisateur');
    expect(niveauPour(120).nom).toBe('Capitaine');
    expect(niveauPour(200).nom).toBe('Chef de projet');
    expect(NIVEAUX[NIVEAUX.length - 1]?.min).toBe(200);
  });

  it('quiz: gain seulement des 2/3 et une seule fois', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'quiz', id: 'q', correctes: 1, total: 3 });
    expect(s.xp).toBe(0);
    s = reduireXP(s, { type: 'quiz', id: 'q', correctes: 2, total: 3 });
    expect(s.xp).toBe(10);
    s = reduireXP(s, { type: 'quiz', id: 'q', correctes: 3, total: 3 });
    expect(s.xp).toBe(10);
    s = reduireXP(s, { type: 'quiz', id: 'r', correctes: 3, total: 3 });
    expect(s.xp).toBe(20);
  });

  it('quiz à cinq questions: gain des 4/5 seulement', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'quiz', id: 'q5', correctes: 3, total: 5 });
    expect(s.xp).toBe(0);
    s = reduireXP(s, { type: 'quiz', id: 'q5', correctes: 4, total: 5 });
    expect(s.xp).toBe(10);
  });

  it('labo: +5 une seule fois', () => {
    let s = reduireXP({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] }, { type: 'labo', id: 'l' });
    expect(s.xp).toBe(5);
    s = reduireXP(s, { type: 'labo', id: 'l' });
    expect(s.xp).toBe(5);
  });

  it('module: +20 une seule fois', () => {
    const s0 = { xp: 0, quizDone: [], laboDone: [], moduleDone: [] };
    let s = reduireXP(s0, { type: 'module', id: 'm1' });
    expect(s.xp).toBe(20);
    s = reduireXP(s, { type: 'module', id: 'm1' });
    expect(s.xp).toBe(20);
  });

  it('import fusionne sans doublons et borne les XP au recalcul', () => {
    const s0 = { xp: 0, quizDone: [], laboDone: [], moduleDone: [] };
    const s = reduireXP(s0, { type: 'import', state: { xp: 999, quizDone: ['q'], laboDone: ['l', 'l'], moduleDone: [] } });
    expect(s.quizDone).toEqual(['q']);
    expect(s.laboDone).toEqual(['l']);
    expect(s.xp).toBe(15); // recalcul: 10 + 5 au lieu de 999 (pas de compteur falsifiable)
  });

  it('loadXPState au froid part de 0', () => {
    localStorage.clear();
    expect(loadXPState().xp).toBe(0);
  });

  it('saveXPState puis loadXPState rebind la state', () => {
    saveXPState({ xp: 35, quizDone: ['q1'], laboDone: [], moduleDone: ['m1'] });
    expect(loadXPState()).toEqual({ xp: 35, quizDone: ['q1'], laboDone: [], moduleDone: ['m1'] });
  });

  it('loadXPState retombe sur l etat initial sur forme invalide', () => {
    localStorage.clear();
    localStorage.setItem('gestion-projet-it:xp', JSON.stringify({ xp: -5, quizDone: 'q', laboDone: [], moduleDone: [] }));
    expect(loadXPState()).toEqual({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] });
  });
});

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readJSON, writeJSON, X_KEY } from './storage';

export const XPQuiz = 10, XPLabo = 5, XPModule = 20;

export type Niveau = { nom: string; min: number };

export const NIVEAUX: Niveau[] = [
  { nom: 'Curieux', min: 0 },
  { nom: 'Organisateur', min: 50 },
  { nom: 'Capitaine', min: 120 },
  { nom: 'Chef de projet', min: 200 },
];

export function niveauPour(xp: number): Niveau {
  let out = NIVEAUX[0] as Niveau;
  for (const n of NIVEAUX) if (xp >= n.min) out = n;
  return out;
}

export interface XPState {
  xp: number;
  quizDone: string[];
  laboDone: string[];
  moduleDone: string[];
}

export type XPAction =
  | { type: 'quiz'; id: string; correctes: number; total: number }
  | { type: 'labo'; id: string }
  | { type: 'module'; id: string }
  | { type: 'reset' }
  | { type: 'import'; state: Partial<XPState> };

const initialXPState = (): XPState => ({ xp: 0, quizDone: [], laboDone: [], moduleDone: [] });

const uniq = (arr: string[]): string[] => Array.from(new Set(arr));

const listeFiable = (v: unknown, defaut: string[]): string[] =>
  Array.isArray(v) && v.every((x) => typeof x === 'string') ? uniq(v) : defaut;

export function reduireXP(s: XPState, a: XPAction): XPState {
  switch (a.type) {
    case 'quiz': {
      if (a.correctes * 3 < a.total * 2) return s;
      if (s.quizDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPQuiz, quizDone: [...s.quizDone, a.id] };
    }
    case 'labo': {
      if (s.laboDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPLabo, laboDone: [...s.laboDone, a.id] };
    }
    case 'module': {
      if (s.moduleDone.includes(a.id)) return s;
      return { ...s, xp: s.xp + XPModule, moduleDone: [...s.moduleDone, a.id] };
    }
    case 'reset':
      return initialXPState();
    case 'import': {
      const quizDone = listeFiable(a.state.quizDone, s.quizDone);
      const laboDone = listeFiable(a.state.laboDone, s.laboDone);
      const moduleDone = listeFiable(a.state.moduleDone, s.moduleDone);
      const xp = quizDone.length * XPQuiz + laboDone.length * XPLabo + moduleDone.length * XPModule;
      return { xp, quizDone, laboDone, moduleDone };
    }
  }
}

const estXPState = (v: unknown): v is XPState => {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  const o = v as Partial<XPState>;
  const listeOK = (a: unknown): a is string[] => Array.isArray(a) && a.every((x) => typeof x === 'string');
  return (
    typeof o.xp === 'number' && Number.isFinite(o.xp) && o.xp >= 0 &&
    listeOK(o.quizDone) && listeOK(o.laboDone) && listeOK(o.moduleDone)
  );
};

export function loadXPState(): XPState {
  const brut: unknown = readJSON<unknown>(X_KEY, null);
  if (!estXPState(brut)) return initialXPState();
  return { xp: brut.xp, quizDone: brut.quizDone, laboDone: brut.laboDone, moduleDone: brut.moduleDone };
}

export function saveXPState(s: XPState): void {
  writeJSON(X_KEY, s);
}

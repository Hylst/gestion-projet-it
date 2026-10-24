// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { reduireXP, loadXPState, saveXPState, niveauPour, XPAction, XPState } from './xp';

export interface ProgressContextValue extends XPState {
  niveau: ReturnType<typeof niveauPour>;
  dispatch: (a: XPAction) => void;
  exportJSON: () => string;
  importJSON: (json: string) => boolean;
}

const Ctx = React.createContext<ProgressContextValue | null>(null);

export function ProgressProvider(props: { children: React.ReactNode }) {
  const [state, setState] = React.useState<XPState>(() => loadXPState());
  React.useEffect(() => { saveXPState(state); }, [state]);
  const value: ProgressContextValue = {
    ...state,
    niveau: niveauPour(state.xp),
    dispatch: (a) => setState((s) => reduireXP(s, a)),
    exportJSON: () => JSON.stringify({ version: 1, ...state }),
    importJSON: (json) => {
      try {
        const parsed = JSON.parse(json) as Partial<XPState> & { version?: number };
        if (parsed.version !== 1) return false;
        setState((s) => reduireXP(s, { type: 'import', state: parsed }));
        return true;
      } catch {
        return false;
      }
    },
  };
  return <Ctx.Provider value={value}>{props.children}</Ctx.Provider>;
}

export function useProgress(): ProgressContextValue {
  const v = React.useContext(Ctx);
  if (!v) throw new Error('useProgress hors ProgressProvider');
  return v;
}

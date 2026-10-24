import { useReducer, useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const LIVRABLES = ['Besoin', 'Maquette', 'Code', 'Jeu de tests', 'Recette', 'Mise en ligne'];
export const PHASES = [
  'Besoin', 'Conception', 'Realisation', 'Test', 'Deploiement',
  'Acceptation', 'Tests systeme', 'Tests unitaires',
];
export type Mode = 'cascade' | 'v';

const LIBELLE_PHASE: Record<string, string> = {
  Besoin: 'Besoin',
  Conception: 'Conception',
  Realisation: 'Réalisation',
  Test: 'Test',
  Deploiement: 'Déploiement',
  Acceptation: 'Acceptation',
  'Tests systeme': 'Tests système',
  'Tests unitaires': 'Tests unitaires',
};

const libellePhase = (p: string): string => LIBELLE_PHASE[p] ?? p;

export const ATTENDU: Record<Mode, Record<string, string>> = {
  cascade: {
    Besoin: 'Besoin', Maquette: 'Conception', Code: 'Realisation',
    'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement',
  },
  v: {
    Besoin: 'Acceptation', Maquette: 'Tests systeme', Code: 'Tests unitaires',
    'Jeu de tests': 'Test', Recette: 'Acceptation', 'Mise en ligne': 'Deploiement',
  },
};

export interface PhasesState {
  mode: Mode;
  place: Record<string, string>;
}

export type PhasesAction =
  | { type: 'assign'; livrable: string; cible: string }
  | { type: 'mode'; m: Mode }
  | { type: 'reset' };

export function reductions(s: PhasesState, a: PhasesAction): PhasesState {
  switch (a.type) {
    case 'assign':
      return { ...s, place: { ...s.place, [a.livrable]: a.cible } };
    case 'mode':
      return { ...s, mode: a.m };
    case 'reset':
      return { mode: 'cascade', place: {} };
  }
}

export function nomMode(m: Mode): string {
  return m === 'cascade' ? 'cascade' : 'cycle en V';
}

export function verifierPhases(s: PhasesState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const livrable of LIVRABLES) {
    const attendu = ATTENDU[s.mode][livrable];
    const place = s.place[livrable];
    if (attendu === undefined) continue;
    if (place === undefined) {
      messages.push(
        `«\u00A0${livrable}\u00A0» n’est pas encore placé. En mode ${nomMode(s.mode)}, sa cible est «\u00A0${libellePhase(attendu)}\u00A0».`,
      );
    } else if (place !== attendu) {
      messages.push(
        `«\u00A0${livrable}\u00A0» est placé en «\u00A0${libellePhase(place)}\u00A0», alors qu’en mode ${nomMode(s.mode)} sa cible est «\u00A0${libellePhase(attendu)}\u00A0».`,
      );
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboPhases(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reductions, undefined, (): PhasesState => ({ mode: 'cascade', place: {} }));
  const [messages, setMessages] = useState<string[]>([]);
  const [selection, setSelection] = useState<string | null>(null);
  const [valideLocal, setValideLocal] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const nb = LIVRABLES.length;
  const focus = Math.min(focusIdx, nb - 1);
  const nbPlaces = Object.keys(s.place).length;

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + nb) % nb;
    setFocusIdx(suivant);
    refs.current[suivant]?.focus();
  };

  const choisir = (livrable: string) => {
    setSelection(livrable);
    setMessages([]);
  };

  const changerMode = (m: Mode) => {
    if (m === s.mode) return;
    dispatch({ type: 'mode', m });
    setMessages([]);
    setValideLocal(false);
  };

  const placer = (cible: string) => {
    if (!selection) return;
    const idx = LIVRABLES.indexOf(selection);
    dispatch({ type: 'assign', livrable: selection, cible });
    setSelection(null);
    setMessages([]);
    setValideLocal(false);
    refs.current[idx]?.focus();
  };

  const verifier = () => {
    const r = verifierPhases(s);
    setMessages(r.messages);
    if (r.ok) {
      setValideLocal(true);
      if (!p.laboDone.includes('m3-phases')) props.onValide();
    } else {
      setValideLocal(false);
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessages([]);
    setSelection(null);
    setValideLocal(false);
    setFocusIdx(0);
  };

  const etapes = [
    'Six livrables fictifs affichés, huit phases cibles.',
    'Choisir un livrable puis une phase cible.',
    'Clavier\u00A0: flèches dans la liste, entrée pour choisir, tabulation vers les phases.',
    'Vérifier\u00A0: chaque erreur indique la cible attendue et la phase choisie.',
    'Le comparateur de méthodes reste disponible en rappel, sans dogme.',
    'Validation des six livrables corrects (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 4 : nbPlaces > 0 ? 3 : selection ? 2 : 1;
  const dernierMessage = messages[messages.length - 1];

  return (
    <LaboFrame
      titre={'Labo\u00A0: associer livrables et phases'}
      consigne={`Mode courant\u00A0: ${nomMode(s.mode)}. Place chaque livrable dans la phase attendue, puis vérifie.`}
      etapes={etapes}
      etape={etape}
      etat={dernierMessage ?? (selection ? `Livrable «\u00A0${selection}\u00A0» sélectionné.` : '')}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <div className="mode-switch" role="group" aria-label="Mode de méthode">
        <button
          type="button"
          className="btn"
          aria-pressed={s.mode === 'cascade'}
          onClick={() => changerMode('cascade')}
        >
          Mode cascade
        </button>
        <button
          type="button"
          className="btn"
          aria-pressed={s.mode === 'v'}
          onClick={() => changerMode('v')}
        >
          Mode cycle en V
        </button>
      </div>
      <p className="help">
        {s.mode === 'cascade'
          ? 'En cascade, chaque livrable rejoint la phase qui le produit, les tests venant après la réalisation.'
          : 'En cycle en V, les tests se préparent en miroir\u00A0: la maquette répond aux tests système, le code aux tests unitaires.'}
      </p>
      <h4 id="phases-livrables-t">Livrables à placer</h4>
      <div
        className="wbs-cards"
        role="listbox"
        aria-labelledby="phases-livrables-t"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); deplacerFocus(1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); deplacerFocus(-1); }
        }}
      >
        {LIVRABLES.map((l, i) => (
          <button
            key={l}
            type="button"
            role="option"
            aria-selected={selection === l}
            className={`wbs-card${selection === l ? ' tiree' : ''}`}
            ref={(el) => { refs.current[i] = el; }}
            tabIndex={i === focus ? 0 : -1}
            onFocus={() => setFocusIdx(i)}
            onClick={() => choisir(l)}
          >
            {l}{s.place[l] ? ` (${libellePhase(s.place[l] as string)})` : ''}
          </button>
        ))}
      </div>
      <p className="help">
        {selection
          ? `«\u00A0${selection}\u00A0» sélectionné. Choisissez une phase puis «\u00A0Placer ici\u00A0».`
          : 'Sélectionnez un livrable, puis une phase cible.'}
      </p>
      <div className="phases-grid">
        {PHASES.map((c) => (
          <div key={c} className={`wbs-lot${selection ? ' cible' : ''}`}>
            <h4>{libellePhase(c)}</h4>
            <ul>
              {LIVRABLES.filter((l) => s.place[l] === c).map((l) => (
                <li key={l}>
                  <button type="button" className="wbs-card" onClick={() => choisir(l)}>{l}</button>
                </li>
              ))}
            </ul>
            {selection && (
              <button
                type="button"
                className="btn mini"
                aria-label={`Placer ${selection} en ${libellePhase(c)}`}
                onClick={() => placer(c)}
              >
                Placer ici
              </button>
            )}
          </div>
        ))}
      </div>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les six livrables sont aux phases attendues du mode {nomMode(s.mode)}.
        </p>
      )}
    </LaboFrame>
  );
}

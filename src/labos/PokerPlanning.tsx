// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useReducer, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const STORIES = ['Page accueil', 'Agenda des activités', 'Formulaire contact', 'Version mobile', 'Galerie photos'] as const;
export type Story = (typeof STORIES)[number];
export const VALEURS = [1, 2, 3, 5, 8, 13] as const;
export const CORRECTIONS: Record<Story, number> = {
  'Page accueil': 2,
  'Agenda des activités': 5,
  'Formulaire contact': 2,
  'Version mobile': 3,
  'Galerie photos': 5,
};

export interface PokerState {
  estimations: Record<string, number | null>;
  revele: boolean;
}

export type PokerAction =
  | { type: 'estime'; story: string; valeur: number }
  | { type: 'reveal' }
  | { type: 'reset' };

export function initialState(): PokerState {
  const estimations: Record<string, number | null> = {};
  for (const st of STORIES) estimations[st] = null;
  return { estimations, revele: false };
}

export function rejouer(s: PokerState, a: PokerAction): PokerState {
  switch (a.type) {
    case 'estime':
      return { ...s, estimations: { ...s.estimations, [a.story]: a.valeur } };
    case 'reveal':
      return { ...s, revele: true };
    case 'reset':
      return initialState();
  }
}

export function verifierPoker(s: PokerState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const st of STORIES) {
    const estimation = s.estimations[st];
    if (estimation == null) {
      messages.push(`${st}\u00A0: pas encore estimée.`);
      continue;
    }
    const correction = CORRECTIONS[st];
    if (estimation !== correction) {
      messages.push(`${st}\u00A0: ton estimation ${estimation}, correction fictive ${correction}.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function PokerPlanning(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(rejouer, undefined, initialState);
  const [messages, setMessages] = useState<string[]>([]);
  const [valideLocal, setValideLocal] = useState(false);
  const [selection, setSelection] = useState<Story | null>(null);
  const [focus, setFocus] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const nbEstimees = STORIES.filter((st) => s.estimations[st] != null).length;

  const choisirStory = (story: Story, index: number) => {
    setSelection(story);
    setFocus(index);
    setMessages([]);
  };

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + STORIES.length) % STORIES.length;
    setFocus(suivant);
    refs.current[suivant]?.focus();
  };

  const estimer = (valeur: number) => {
    if (!selection) return;
    dispatch({ type: 'estime', story: selection, valeur });
    setMessages([]);
  };

  const verifier = () => {
    const r = verifierPoker(s);
    setMessages(r.messages);
    dispatch({ type: 'reveal' });
    if (r.ok) {
      setValideLocal(true);
      if (!p.laboDone.includes('m4-poker')) props.onValide();
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessages([]);
    setValideLocal(false);
    setSelection(null);
    setFocus(0);
  };

  const surTouches = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      deplacerFocus(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      deplacerFocus(-1);
    }
  };

  const etapes = [
    '5 stories fictives issues du fil rouge.',
    'Sélectionne une story dans la liste.',
    'Choisis une valeur de la suite 1, 2, 3, 5, 8, 13.',
    'Vérifie\u00A0: la correction fictive apparaît story par story.',
    'Rejoue sans nouveau gain d’XP.',
    'Validation quand les 5 estimations collent (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 4 : nbEstimees > 0 ? 3 : 2;
  const etat = messages[messages.length - 1] ?? (selection ? `«\u00A0${selection}\u00A0» sélectionnée.` : '');

  return (
    <LaboFrame
      titre={'Labo\u00A0: poker planning'}
      consigne="Estime les 5 stories fictives, puis vérifie pour comparer à la correction fictive."
      etapes={etapes}
      etape={etape}
      etat={etat}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="poker-stories-t">Stories à estimer</h4>
      <div className="wbs-cards" role="listbox" aria-labelledby="poker-stories-t" onKeyDown={surTouches}>
        {STORIES.map((st, i) => {
          const estimation = s.estimations[st];
          return (
            <button
              key={st}
              type="button"
              role="option"
              aria-selected={selection === st}
              className={`wbs-card${selection === st ? ' tiree' : ''}`}
              ref={(el) => { refs.current[i] = el; }}
              tabIndex={i === focus ? 0 : -1}
              onFocus={() => setFocus(i)}
              onClick={() => choisirStory(st, i)}
            >
              {st}{estimation != null ? `\u00A0: ${estimation}` : ''}{s.revele ? ` (correction ${CORRECTIONS[st]})` : ''}
            </button>
          );
        })}
      </div>
      <p className="help">
        {selection
          ? `«\u00A0${selection}\u00A0» sélectionnée. Choisis une valeur, puis vérifie.`
          : 'Sélectionne une story, puis choisis une valeur.'}
      </p>
      {selection && (
        <div className="mode-switch" role="group" aria-label={`Valeurs pour ${selection}`}>
          {VALEURS.map((v) => (
            <button
              key={v}
              type="button"
              className="btn"
              aria-pressed={s.estimations[selection] === v}
              aria-label={`Estimer ${selection} à ${v}`}
              onClick={() => estimer(v)}
            >
              {v}
            </button>
          ))}
        </div>
      )}
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
    </LaboFrame>
  );
}

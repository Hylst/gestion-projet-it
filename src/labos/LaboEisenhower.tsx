import { useReducer, useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const TACHES = ['Corriger le formulaire cassé', 'Préparer la notice bénévole', 'Répondre à la demande d’horaire', 'Refaire un logo non demandé', 'Relire l’agenda des activités', 'Répondre au sondage du bureau'] as const;
export type Tache = (typeof TACHES)[number];

export const QUADRANTS = ['urgent-important', 'important-non-urgent', 'urgent-non-important', 'ni-ni'] as const;
export type Quadrant = (typeof QUADRANTS)[number];

export const ATTENDU_Q: Record<Tache, Quadrant> = {
  'Corriger le formulaire cassé': 'urgent-important',
  'Préparer la notice bénévole': 'important-non-urgent',
  'Répondre à la demande d’horaire': 'urgent-non-important',
  'Refaire un logo non demandé': 'ni-ni',
  'Relire l’agenda des activités': 'important-non-urgent',
  'Répondre au sondage du bureau': 'urgent-non-important',
};

export const NOMS_QUADRANTS: Record<Quadrant, string> = {
  'urgent-important': 'Urgent et important',
  'important-non-urgent': 'Important, peu urgent',
  'urgent-non-important': 'Urgent, peu important',
  'ni-ni': 'Ni urgent ni important',
};

export const MOTIFS_QUADRANTS: Record<Quadrant, string> = {
  'urgent-important': 'Fais maintenant\u00A0: échéance proche et impact fort.',
  'important-non-urgent': 'Planifie\u00A0: impact fort, sans urgence immédiate.',
  'urgent-non-important': 'Délègue ou simplifie\u00A0: urgence sans impact fort.',
  'ni-ni': 'Laisse de côté et rediscute\u00A0: ni urgence ni impact fort.',
};

export const MOTIFS: Record<Tache, string> = {
  'Corriger le formulaire cassé': 'il bloque les inscriptions et doit être traité tout de suite.',
  'Préparer la notice bénévole': 'utile pour l’autonomie, sans urgence immédiate.',
  'Répondre à la demande d’horaire': 'demande simple, à déléguer ou traiter vite.',
  'Refaire un logo non demandé': 'aucune demande ni impact, à laisser de côté.',
  'Relire l’agenda des activités': 'préparation de fond, à planifier sans précipitation.',
  'Répondre au sondage du bureau': 'réponse rapide, sans enjeu majeur.',
};

export type QState = { place: Record<string, Quadrant> };

export type QAction = { type: 'place'; tache: string; q: Quadrant } | { type: 'reset' };

export function initialState(): QState {
  return { place: {} };
}

export function reduceQ(s: QState, a: QAction): QState {
  switch (a.type) {
    case 'place':
      return { ...s, place: { ...s.place, [a.tache]: a.q } };
    case 'reset':
      return initialState();
  }
}

export function verifierQ(s: QState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const tache of TACHES) {
    const attendu = ATTENDU_Q[tache];
    const place = s.place[tache];
    if (place === undefined) {
      messages.push(`«\u00A0${tache}\u00A0» n’est pas encore placée. Quadrant attendu\u00A0: ${NOMS_QUADRANTS[attendu]} (${MOTIFS[tache]}).`);
    } else if (place !== attendu) {
      messages.push(`«\u00A0${tache}\u00A0» est placée en ${NOMS_QUADRANTS[place]}, alors que le quadrant attendu est ${NOMS_QUADRANTS[attendu]} (${MOTIFS[tache]}).`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboEisenhower(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceQ, undefined, initialState);
  const [selection, setSelection] = useState<Tache | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [derniere, setDerniere] = useState<{ tache: Tache; q: Quadrant } | null>(null);
  const [valideLocal, setValideLocal] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const nb = TACHES.length;
  const focus = Math.min(focusIdx, nb - 1);
  const nbPlaces = Object.keys(s.place).length;

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + nb) % nb;
    setFocusIdx(suivant);
    refs.current[suivant]?.focus();
  };

  const choisir = (tache: Tache) => {
    setSelection(tache);
    setMessages([]);
  };

  const placer = (q: Quadrant) => {
    if (!selection) return;
    const idx = TACHES.indexOf(selection);
    dispatch({ type: 'place', tache: selection, q });
    setDerniere({ tache: selection, q });
    setSelection(null);
    setMessages([]);
    setValideLocal(false);
    refs.current[idx]?.focus();
  };

  const verifier = () => {
    const r = verifierQ(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      if (!p.laboDone.includes('m6-eisenhower')) props.onValide();
    } else {
      setMessages(r.messages);
      setValideLocal(false);
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setSelection(null);
    setMessages([]);
    setDerniere(null);
    setValideLocal(false);
    setFocusIdx(0);
  };

  const etapes = [
    'Six tâches fictives à placer dans les quatre quadrants.',
    'Choisir une tâche puis un quadrant, à la souris ou au clavier.',
    'Le quadrant et un motif court s’affichent après chaque dépôt.',
    'Vérifier\u00A0: chaque tâche mal placée indique le quadrant attendu et le motif.',
    'Le labo des risques est séparé\u00A0: il garde ses propres priorités et parades.',
    'Validation des six tâches correctes (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 4 : nbPlaces > 0 ? 3 : selection ? 2 : 1;
  const etat = derniere
    ? `«\u00A0${derniere.tache}\u00A0» placée en ${NOMS_QUADRANTS[derniere.q]}\u00A0: ${MOTIFS[derniere.tache]}`
    : selection
      ? `«\u00A0${selection}\u00A0» sélectionnée. Choisissez un quadrant puis «\u00A0Placer ici\u00A0».`
      : '';

  return (
    <LaboFrame
      titre={'Labo\u00A0: matrice d’Eisenhower plaçable'}
      consigne="Classe les six tâches fictives dans le bon quadrant, puis vérifie. Un motif court accompagne chaque dépôt."
      etapes={etapes}
      etape={etape}
      etat={etat}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="eisenhower-taches-t">Tâches à classer</h4>
      <div
        className="wbs-cards"
        role="listbox"
        aria-labelledby="eisenhower-taches-t"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); deplacerFocus(1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); deplacerFocus(-1); }
        }}
      >
        {TACHES.map((t, i) => (
          <button
            key={t}
            type="button"
            role="option"
            aria-selected={selection === t}
            className={`wbs-card${selection === t ? ' tiree' : ''}`}
            ref={(el) => { refs.current[i] = el; }}
            tabIndex={i === focus ? 0 : -1}
            onFocus={() => setFocusIdx(i)}
            onClick={() => choisir(t)}
          >
            {t}{s.place[t] ? ` (${NOMS_QUADRANTS[s.place[t]]})` : ''}
          </button>
        ))}
      </div>
      <p className="help">
        {selection
          ? `«\u00A0${selection}\u00A0» sélectionnée. Choisissez un quadrant puis «\u00A0Placer ici\u00A0».`
          : 'Sélectionnez une tâche, puis le quadrant qui lui correspond.'}
      </p>
      <div className="eisenhower-grid">
        {QUADRANTS.map((q) => {
          const placees = TACHES.filter((t) => s.place[t] === q);
          return (
            <div
              key={q}
              className={`eisenhower-q${selection ? ' cible' : ''}`}
              role="group"
              aria-labelledby={`quadrant-${q}`}
            >
              <h4 id={`quadrant-${q}`}>{NOMS_QUADRANTS[q]}</h4>
              <p className="motif-q">{MOTIFS_QUADRANTS[q]}</p>
              <ul>
                {placees.map((t) => (
                  <li key={t}>
                    <button type="button" className="wbs-card" onClick={() => choisir(t)}>{t}</button>
                    <p className="motif">{MOTIFS[t]}</p>
                  </li>
                ))}
                {placees.length === 0 && <li className="compteur">Aucune tâche placée.</li>}
              </ul>
              {selection && (
                <button
                  type="button"
                  className="btn mini"
                  aria-label={`Placer ${selection} en ${NOMS_QUADRANTS[q]}`}
                  onClick={() => placer(q)}
                >
                  Placer ici
                </button>
              )}
            </div>
          );
        })}
      </div>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les six tâches sont dans les quadrants attendus. Le tri rend l’arbitrage visible.
        </p>
      )}
    </LaboFrame>
  );
}

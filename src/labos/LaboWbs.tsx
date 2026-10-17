import { useReducer, useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export type Lot = 'contenu' | 'realisation' | 'mise-en-ligne' | 'hors';
export const LOT_ATTENDU: Record<string, Lot> = {
  inventaire: 'contenu', textes: 'contenu', photos: 'contenu',
  maquette: 'realisation', integration: 'realisation', tests: 'realisation',
  sauvegarde: 'mise-en-ligne', notice: 'mise-en-ligne',
  paiement: 'hors', application: 'hors',
};
export const CARDS_INITIALES: string[] = ['inventaire', 'textes', 'photos', 'maquette', 'integration', 'tests', 'sauvegarde', 'paiement', 'application'];
export const NOTICE_CACHEE = 'notice';
export const LIBELLE: Record<string, string> = {
  inventaire: 'Inventaire des pages', textes: 'Reecrire les textes', photos: 'Choisir les photos locales',
  maquette: 'Realiser la maquette', integration: 'Integrer les pages', tests: 'Tester sur mobile',
  sauvegarde: 'Sauvegarde du site', notice: 'Notice pour les benevoles',
  paiement: 'Paiement des cotisations en ligne', application: 'Application mobile dediee',
};
export type WbsState = { place: Record<string, Lot>; noticeTrouvee: boolean };
export type WbsAction = { type: 'assign'; carte: string; lot: Lot } | { type: 'devine-notice' } | { type: 'reset' };

export function reducerWBS(s: WbsState, a: WbsAction): WbsState {
  switch (a.type) {
    case 'assign': return { ...s, place: { ...s.place, [a.carte]: a.lot } };
    case 'devine-notice': return { ...s, noticeTrouvee: true, place: { ...s.place, [NOTICE_CACHEE]: 'mise-en-ligne' } };
    case 'reset': return { place: {}, noticeTrouvee: false };
  }
}

export function lotLisible(l: Lot): string {
  return l === 'contenu' ? 'Contenu' : l === 'realisation' ? 'Realisation' : l === 'mise-en-ligne' ? 'Mise en ligne' : 'Hors perimetre';
}

export function verifierWBS(s: WbsState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const [carte, attendu] of Object.entries(LOT_ATTENDU)) {
    const place = s.place[carte];
    if (attendu === 'hors') {
      if (place && place !== 'hors') {
        messages.push(`« ${LIBELLE[carte]} » doit rester hors perimetre, pas dans un lot.`);
      }
    } else if (place !== attendu) {
      if (place === undefined) {
        messages.push(carte === NOTICE_CACHEE
          ? 'Oubli possible : il manque la notice pour les benevoles (lot Mise en ligne).'
          : `« ${LIBELLE[carte]} » n est pas encore placee (lot attendu : ${lotLisible(attendu)}).`);
      } else {
        messages.push(`« ${LIBELLE[carte]} » attendue dans ${lotLisible(attendu)}, placee dans ${lotLisible(place)}.`);
      }
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboWbs(props: Props) {
  const p = useProgress();
  const [state, dispatch] = useReducer(reducerWBS, undefined, () => ({ place: {}, noticeTrouvee: false }));
  const [tiree, setTiree] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [etape, setEtape] = useState(1);
  const [focusIdx, setFocusIdx] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const cartes = [...CARDS_INITIALES, ...(state.noticeTrouvee ? [NOTICE_CACHEE] : [])];
  const nb = cartes.length;
  const focus = Math.min(focusIdx, nb - 1);
  const lotIds = ['contenu', 'realisation', 'mise-en-ligne'] as const;

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + nb) % nb;
    setFocusIdx(suivant);
    refs.current[suivant]?.focus();
  };

  const verifier = () => {
    const r = verifierWBS(state);
    setMessages(r.messages);
    const indice = r.messages.some((m) => /notice/i.test(m));
    if (!state.noticeTrouvee && indice) dispatch({ type: 'devine-notice' });
    if (r.ok) {
      setEtape(6);
      if (!p.laboDone.includes('m1-wbs-labo')) props.onValide();
    } else {
      setEtape(indice ? 5 : 4);
    }
  };

  const etapes = [
    '9 cartes fictives (dont 2 hors perimetre) et 3 lots vides sont affichees.',
    'Glisser ou deplacer au clavier une carte vers un lot.',
    'Les compteurs par lot se mettent a jour et signalent les lots vides.',
    'Verifier : les hors perimetre attendus restent hors lots.',
    'Aide proposee si oubli (indice : il manque la notice).',
    'Validation quand les 3 lots sont coherents, +5 XP.',
  ];

  return (
    <LaboFrame
      titre="Labo : decoupage WBS interactif"
      consigne="Place les 7 taches dedans dans les 3 lots, laisse les 2 hors perimetre dehors, puis verifie."
      etapes={etapes}
      etape={etape}
      etat={messages[messages.length - 1] ?? (tiree ? `Carte ${LIBELLE[tiree]} selectionnee.` : '')}
      onVerifier={verifier}
      onReinitialiser={() => { dispatch({ type: 'reset' }); setMessages([]); setEtape(1); setTiree(null); }}
      valide={props.valide || (messages.length === 0 && verifierWBS(state).ok)}
    >
      <div className="wbs-grid">
        <div>
          <h4>Cartes a placer</h4>
          <div
            className="wbs-cards"
            role="listbox"
            aria-label="Cartes du WBS"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); deplacerFocus(1); }
              else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); deplacerFocus(-1); }
            }}
          >
            {cartes.map((c, i) => (
              <button
                key={c}
                type="button"
                role="option"
                aria-selected={tiree === c}
                className={`wbs-card${tiree === c ? ' tiree' : ''}`}
                ref={(el) => { refs.current[i] = el; }}
                tabIndex={i === focusIdx ? 0 : -1}
                onFocus={() => setFocusIdx(i)}
                onClick={() => { setTiree(tiree === c ? null : c); setFocusIdx(i); }}
              >
                {LIBELLE[c]}{state.place[c] ? ` (${lotLisible(state.place[c] as Lot)})` : ''}
              </button>
            ))}
          </div>
          {tiree && (
            <div className="hors-zone">
              <button
                type="button"
                className="btn secondary"
                onClick={() => { dispatch({ type: 'assign', carte: tiree, lot: 'hors' }); setTiree(null); }}
              >
                Deposer « {LIBELLE[tiree]} » hors perimetre
              </button>
            </div>
          )}
        </div>
        <div className="wbs-lots">
          {lotIds.map((lot) => {
            const n = cartes.filter((c) => state.place[c] === lot).length;
            return (
              <div key={lot} className="wbs-lot">
                <h4>{lotLisible(lot)}</h4>
                <p className="compteur">{n > 0 ? `${n} carte(s)` : 'Lot vide'}</p>
                <svg className="wbs-decor" width="48" height="14" viewBox="0 0 48 14" aria-hidden="true" focusable="false">
                  <path
                    d="M24 14 L24 4 M24 6 L14 1 M24 6 L34 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <ul>
                  {cartes.filter((c) => state.place[c] === lot).map((c) => (
                    <li key={c}>
                      <button type="button" className="wbs-card" onClick={() => setTiree(c)}>{LIBELLE[c]}</button>
                    </li>
                  ))}
                </ul>
                {tiree && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => { dispatch({ type: 'assign', carte: tiree, lot }); setTiree(null); }}
                  >
                    Deposer ici
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {messages.length > 0 && (
        <ul className="messages">{messages.map((m, i) => <li key={i} className="err">{m}</li>)}</ul>
      )}
    </LaboFrame>
  );
}

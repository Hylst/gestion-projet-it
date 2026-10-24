// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useReducer, useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const CARTES = ['Page accueil', 'Agenda des activités', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice bénévole'];
export const COLONNES = ['À faire', 'En cours', 'À relire', 'Fini'] as const;
export type Colonne = (typeof COLONNES)[number];
export const WIP_MAX = 2;

export interface KanbanState {
  cartes: Record<string, Colonne>;
  blocages: number;
}

export type KanbanAction =
  | { type: 'deplace'; carte: string; sens: -1 | 1 }
  | { type: 'reset' };

export function initialState(): KanbanState {
  const cartes: Record<string, Colonne> = {};
  for (const c of CARTES) cartes[c] = 'À faire';
  return { cartes, blocages: 0 };
}

function compteEnCours(s: KanbanState): number {
  return CARTES.filter((c) => s.cartes[c] === 'En cours').length;
}

export function reducKanban(s: KanbanState, a: KanbanAction): KanbanState {
  switch (a.type) {
    case 'deplace': {
      const courante = s.cartes[a.carte];
      if (!courante) return s;
      const idx = COLONNES.indexOf(courante);
      const cible = COLONNES[idx + a.sens];
      if (!cible) return s;
      if (cible === 'En cours' && compteEnCours(s) >= WIP_MAX) {
        return { ...s, blocages: s.blocages + 1 };
      }
      return { ...s, cartes: { ...s.cartes, [a.carte]: cible } };
    }
    case 'reset':
      return initialState();
  }
}

export function verifierKanban(s: KanbanState): { ok: boolean; messages: string[] } {
  const pasFini = CARTES.filter((c) => s.cartes[c] !== 'Fini');
  if (pasFini.length > 0) return { ok: false, messages: [`Reste ${pasFini.length} carte(s) à finir.`] };
  return { ok: true, messages: [] };
}

type Props = { valide: boolean; onValide: () => void };

const cleRef = (carte: string, sens: -1 | 1): string => `${carte}|${sens}`;

export default function LaboKanban(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reducKanban, undefined, initialState);
  const [message, setMessage] = useState('');
  const [valideLocal, setValideLocal] = useState(false);
  const [derniere, setDerniere] = useState<{ carte: string; sens: -1 | 1 } | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const ok = verifierKanban(s).ok;

  useEffect(() => {
    if (!derniere) return;
    const el =
      refs.current[cleRef(derniere.carte, derniere.sens)] ??
      refs.current[cleRef(derniere.carte, -1)] ??
      refs.current[cleRef(derniere.carte, 1)];
    el?.focus();
  }, [derniere]);

  const deplacer = (carte: string, sens: -1 | 1) => {
    const courante = s.cartes[carte];
    if (!courante) return;
    const cible = COLONNES[COLONNES.indexOf(courante) + sens];
    if (!cible) {
      setMessage(`La carte «\u00A0${carte}\u00A0» est déjà en ${courante}, impossible d’aller plus loin.`);
      return;
    }
    if (cible === 'En cours' && compteEnCours(s) >= WIP_MAX) {
      setMessage(`Blocage\u00A0: la colonne En cours est déjà à ${WIP_MAX} cartes (limite de WIP). Finis-en une avant d’en commencer une autre.`);
      dispatch({ type: 'deplace', carte, sens });
      return;
    }
    dispatch({ type: 'deplace', carte, sens });
    setDerniere({ carte, sens });
    setMessage(`${carte} passe en ${cible}.`);
  };

  const verifier = () => {
    const r = verifierKanban(s);
    if (r.ok) {
      setValideLocal(true);
      setMessage('Toutes les cartes sont en Fini\u00A0: le tableau est validé.');
      if (!p.laboDone.includes('m4-kanban')) props.onValide();
    } else {
      setMessage(r.messages.join(' '));
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessage('');
    setValideLocal(false);
    setDerniere(null);
  };

  const etapes = [
    '6 cartes fictives et 4 colonnes\u00A0: À faire, En cours, À relire, Fini.',
    'Fais avancer une carte avec les boutons ou au clavier.',
    'Au-delà de 2 cartes en En cours, le dépôt est bloqué avec un message.',
    'Le compteur de blocages se met à jour.',
    'Le poker planning est un second labo ci-dessous.',
    'Validation du tableau complet (+5 XP la première fois).',
  ];

  const etape = ok ? 6 : s.blocages > 0 ? 4 : Object.values(s.cartes).some((c) => c !== 'À faire') ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: tableau Kanban jouable'}
      consigne="Fais avancer les 6 cartes jusqu’à Fini en respectant la limite de WIP de 2 cartes en En cours."
      etapes={etapes}
      etape={etape}
      etat={message}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <div className="kanban-board" role="group" aria-label="Tableau Kanban à 4 colonnes">
        {COLONNES.map((c) => (
          <div key={c} className="kanban-col">
            <h4>{c}{c === 'En cours' ? ` (${WIP_MAX} max)` : ''}</h4>
            {CARTES.filter((k) => s.cartes[k] === c).map((k) => (
              <div key={k} className="kanban-card" role="group" aria-label={`Carte ${k}`}>
                <span>{k}</span>
                <span className="kanban-actions">
                  <button
                    type="button"
                    className="btn mini"
                    aria-label={`Reculer ${k}`}
                    ref={(el) => { if (el) refs.current[cleRef(k, -1)] = el; }}
                    onClick={() => deplacer(k, -1)}
                  >
                    {'<-'}
                  </button>
                  <button
                    type="button"
                    className="btn mini"
                    aria-label={`Avancer ${k}`}
                    ref={(el) => { if (el) refs.current[cleRef(k, 1)] = el; }}
                    onClick={() => deplacer(k, 1)}
                  >
                    {'->'}
                  </button>
                </span>
              </div>
            ))}
            {c === 'En cours' && <p className="compteur">En cours&nbsp;: {compteEnCours(s)} sur {WIP_MAX}</p>}
          </div>
        ))}
      </div>
      <p className="compteur">Blocages rencontrés&nbsp;: {s.blocages}</p>
      {message && <p role="alert" className={ok ? 'ok' : 'err'}>{message}</p>}
    </LaboFrame>
  );
}

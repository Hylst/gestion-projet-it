import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const CARTES = ['Page accueil', 'Agenda des activites', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice benevole'];
export const COLONNES = ['A faire', 'En cours', 'A relire', 'Fini'] as const;
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
  for (const c of CARTES) cartes[c] = 'A faire';
  return { cartes, blocages: 0 };
}

export function compteEnCours(s: KanbanState): number {
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
  if (pasFini.length > 0) return { ok: false, messages: [`Reste ${pasFini.length} carte(s) a finir.`] };
  return { ok: true, messages: [] };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboKanban(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reducKanban, undefined, initialState);
  const [message, setMessage] = useState('');
  const ok = verifierKanban(s).ok;

  const deplacer = (carte: string, sens: -1 | 1) => {
    const courante = s.cartes[carte];
    if (!courante) return;
    const cible = COLONNES[COLONNES.indexOf(courante) + sens];
    if (!cible) {
      setMessage(`La carte « ${carte} » est deja en ${courante}, impossible d aller plus loin.`);
      return;
    }
    if (cible === 'En cours' && compteEnCours(s) >= WIP_MAX) {
      setMessage(`Blocage : la colonne En cours est deja a ${WIP_MAX} cartes (limite de WIP). Finis-en une avant d en commencer une autre.`);
      dispatch({ type: 'deplace', carte, sens });
      return;
    }
    dispatch({ type: 'deplace', carte, sens });
    setMessage(`${carte} passe en ${cible}.`);
  };

  const verifier = () => {
    const r = verifierKanban(s);
    setMessage(r.ok ? 'Toutes les cartes sont en Fini : le tableau est valide.' : r.messages.join(' '));
    if (r.ok && !p.laboDone.includes('m4-kanban')) props.onValide();
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessage('');
  };

  const etapes = [
    '6 cartes fictives et 4 colonnes : A faire, En cours, A relire, Fini.',
    'Fais avancer une carte avec les boutons ou au clavier.',
    'Au dela de 2 cartes en En cours, le depot est bloque avec un message.',
    'Le compteur de blocages se met a jour.',
    'Le poker planning est un second labo ci dessous.',
    'Validation du tableau complet (+5 XP la premiere fois).',
  ];

  const etape = ok ? 6 : s.blocages > 0 ? 4 : Object.values(s.cartes).some((c) => c !== 'A faire') ? 3 : 2;

  return (
    <LaboFrame
      titre="Labo : tableau Kanban jouable"
      consigne="Fais avancer les 6 cartes jusqu a Fini en respectant la limite de WIP de 2 cartes en En cours."
      etapes={etapes}
      etape={etape}
      etat={message}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || ok}
    >
      <div className="kanban-board" role="group" aria-label="Tableau Kanban a 4 colonnes">
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
                    onClick={() => deplacer(k, -1)}
                  >
                    {'<-'}
                  </button>
                  <button
                    type="button"
                    className="btn mini"
                    aria-label={`Avancer ${k}`}
                    onClick={() => deplacer(k, 1)}
                  >
                    {'->'}
                  </button>
                </span>
              </div>
            ))}
            {c === 'En cours' && <p className="compteur">En cours : {compteEnCours(s)} sur {WIP_MAX}</p>}
          </div>
        ))}
      </div>
      <p className="compteur">Blocages rencontres : {s.blocages}</p>
      {message && <p role="alert" className={ok ? 'ok' : 'err'}>{message}</p>}
    </LaboFrame>
  );
}

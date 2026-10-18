import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const BESOINS = ['Equipe dispersee', 'Regressions frequentes', 'Demo fragile sur postes differents'];
export const OUTILS = ['Outil de suivi partage', 'Chaine CI', 'Environnement reproductible'];
export const MOTIFS: Record<string, { motif: string; limite: string }> = {
  'Outil de suivi partage': { motif: 'Trace et assignation visibles', limite: 'A renseigner regulierement sinon inutile' },
  'Chaine CI': { motif: 'Tests courts a chaque changement', limite: 'Tests a entretenir' },
  'Environnement reproductible': { motif: 'Meme poste partout', limite: 'Image a maintenir' },
};
export const SUGGESTIONS: Record<string, string> = {
  'Equipe dispersee': 'Outil de suivi partage',
  'Regressions frequentes': 'Chaine CI',
  'Demo fragile sur postes differents': 'Environnement reproductible',
};

export type SelecteurState = { choix: Record<string, string | null> };
export type SelecteurAction = { type: 'choisit'; besoin: string; outil: string } | { type: 'reset' };

export function initialState(): SelecteurState {
  const choix: Record<string, string | null> = {};
  for (const besoin of BESOINS) choix[besoin] = null;
  return { choix };
}

export function reduceSelecteur(s: SelecteurState, a: SelecteurAction): SelecteurState {
  switch (a.type) {
    case 'choisit': {
      if (!BESOINS.includes(a.besoin) || !OUTILS.includes(a.outil)) return s;
      return { ...s, choix: { ...s.choix, [a.besoin]: a.outil } };
    }
    case 'reset':
      return initialState();
  }
}

export function verifierSelecteur(s: SelecteurState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const besoin of BESOINS) {
    const choisi = s.choix[besoin];
    if (choisi === SUGGESTIONS[besoin]) continue;
    if (!choisi) {
      messages.push(`« ${besoin} » : aucun outil choisi pour ce besoin.`);
    } else {
      messages.push(`« ${besoin} » : ${SUGGESTIONS[besoin]} est souvent retenu pour ce besoin (choix actuel : ${choisi}), a confronter au motif et a la limite.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboSelecteurOutil(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceSelecteur, undefined, initialState);
  const [message, setMessage] = useState('');
  const [valideLocal, setValideLocal] = useState(false);
  const nbChoix = BESOINS.filter((b) => s.choix[b]).length;
  const ok = verifierSelecteur(s).ok;

  const choisir = (besoin: string, outil: string) => {
    dispatch({ type: 'choisit', besoin, outil });
    setMessage(`${outil} retenu pour « ${besoin} ». Motif et limite affiches, sans verdict definitif.`);
  };

  const verifier = () => {
    const r = verifierSelecteur(s);
    if (r.ok) {
      setValideLocal(true);
      setMessage('Les 3 besoins ont un outil avec motif et limite : selecteur valide. Aucun choix n est definitif.');
      if (!p.laboDone.includes('m5-selecteur')) props.onValide();
    } else {
      setMessage(r.messages.join(' '));
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessage('');
    setValideLocal(false);
  };

  const etapes = [
    '3 besoins fictifs affiches : equipe dispersee, regressions frequentes, demo fragile sur postes differents.',
    'Choisis un type d outil par besoin, au clic ou au clavier.',
    'Chaque choix affiche un motif et une limite, sans verdict definitif.',
    'Le labo chaine CI, separe, ordonne ensuite 4 etapes.',
    'L ordre de la chaine est verifie dans ce labo separe.',
    'Validation du selecteur quand les 3 choix sont coherents, +5 XP.',
  ];

  const etape = ok ? 6 : nbChoix === 3 ? 5 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre="Labo : selecteur d outil"
      consigne="Pour chaque besoin fictif, choisis un type d outil. Le motif et la limite s affichent, sans verdict definitif."
      etapes={etapes}
      etape={etape}
      etat={message}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <div className="selecteur-grid">
        {BESOINS.map((besoin) => {
          const choisi = s.choix[besoin];
          const detail = choisi ? MOTIFS[choisi] : undefined;
          return (
            <div key={besoin} className="selecteur-besoin">
              <h4>{besoin}</h4>
              <div className="selecteur-outils" role="group" aria-label={`Type d outil pour ${besoin}`}>
                {OUTILS.map((outil) => (
                  <button
                    key={outil}
                    type="button"
                    className={`btn mini${choisi === outil ? '' : ' secondary'}`}
                    aria-pressed={choisi === outil}
                    onClick={() => choisir(besoin, outil)}
                  >
                    {outil}
                  </button>
                ))}
              </div>
              {detail && (
                <div className="selecteur-detail" role="status">
                  <p><strong>Motif :</strong> {detail.motif}.</p>
                  <p><strong>Limite :</strong> {detail.limite}.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="help">Rappel sans dogme : aucun outil n est meilleur par principe, le contexte et l entretien dans la duree comptent.</p>
      {message && <p role="alert" className={ok ? 'ok' : 'err'}>{message}</p>}
    </LaboFrame>
  );
}

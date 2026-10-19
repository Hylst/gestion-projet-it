import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const BESOINS = ['Équipe dispersée', 'Régressions fréquentes', 'Démo fragile sur postes différents'];
export const OUTILS = ['Outil de suivi partagé', 'Chaîne CI', 'Environnement reproductible'];
export const MOTIFS: Record<string, { motif: string; limite: string }> = {
  'Outil de suivi partagé': { motif: 'Trace et assignation visibles', limite: 'À renseigner régulièrement sinon inutile' },
  'Chaîne CI': { motif: 'Tests courts à chaque changement', limite: 'Tests à entretenir' },
  'Environnement reproductible': { motif: 'Même poste partout', limite: 'Image à maintenir' },
};
export const SUGGESTIONS: Record<string, string> = {
  'Équipe dispersée': 'Outil de suivi partagé',
  'Régressions fréquentes': 'Chaîne CI',
  'Démo fragile sur postes différents': 'Environnement reproductible',
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
      messages.push(`«\u00A0${besoin}\u00A0»\u00A0: aucun outil choisi pour ce besoin.`);
    } else {
      messages.push(`«\u00A0${besoin}\u00A0»\u00A0: ${SUGGESTIONS[besoin]} est souvent retenu pour ce besoin (choix actuel\u00A0: ${choisi}), à confronter au motif et à la limite.`);
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
    setMessage(`${outil} retenu pour «\u00A0${besoin}\u00A0». Motif et limite affichés, sans verdict définitif.`);
  };

  const verifier = () => {
    const r = verifierSelecteur(s);
    if (r.ok) {
      setValideLocal(true);
      setMessage('Les 3 besoins ont un outil avec motif et limite\u00A0: sélecteur validé. Aucun choix n’est définitif.');
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
    '3 besoins fictifs affichés\u00A0: équipe dispersée, régressions fréquentes, démo fragile sur postes différents.',
    'Choisis un type d’outil par besoin, au clic ou au clavier.',
    'Chaque choix affiche un motif et une limite, sans verdict définitif.',
    'Le labo chaîne CI, séparé, ordonne ensuite 4 étapes.',
    'L’ordre de la chaîne est vérifié dans ce labo séparé.',
    'Validation du sélecteur quand les 3 choix sont cohérents, +5 XP.',
  ];

  const etape = ok ? 6 : nbChoix === 3 ? 5 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: sélecteur d’outil'}
      consigne="Pour chaque besoin fictif, choisis un type d’outil. Le motif et la limite s’affichent, sans verdict définitif."
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
              <div className="selecteur-outils" role="group" aria-label={`Type d’outil pour ${besoin}`}>
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
                  <p><strong>Motif&nbsp;:</strong> {detail.motif}.</p>
                  <p><strong>Limite&nbsp;:</strong> {detail.limite}.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="help">Rappel sans dogme&nbsp;: aucun outil n’est meilleur par principe, le contexte et l’entretien dans la durée comptent.</p>
      {message && <p role="alert" className={ok ? 'ok' : 'err'}>{message}</p>}
    </LaboFrame>
  );
}

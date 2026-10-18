import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const ETAPES = ['Test', 'Assemblage', 'Relecture', 'Deploiement'];
export const ORDRE_ATTENDU = ['Test', 'Assemblage', 'Relecture', 'Deploiement'];
const ORDRE_INITIAL = ['Relecture', 'Test', 'Deploiement', 'Assemblage'];

export type ChaineState = { ordre: string[] };
export type ChaineAction =
  | { type: 'monte'; etape: string }
  | { type: 'descend'; etape: string }
  | { type: 'reset' };

export function initialState(): ChaineState {
  return { ordre: [...ORDRE_INITIAL] };
}

export function reduceChaine(s: ChaineState, a: ChaineAction): ChaineState {
  switch (a.type) {
    case 'monte':
    case 'descend': {
      const idx = s.ordre.indexOf(a.etape);
      if (idx === -1) return s;
      const cible = a.type === 'monte' ? idx - 1 : idx + 1;
      if (cible < 0 || cible >= s.ordre.length) return s;
      const ordre = [...s.ordre];
      const valeur = ordre[idx] as string;
      ordre[idx] = ordre[cible] as string;
      ordre[cible] = valeur;
      return { ordre };
    }
    case 'reset':
      return initialState();
  }
}

export function verifierChaine(s: ChaineState): { ok: boolean; messages: string[] } {
  const ok =
    s.ordre.length === ORDRE_ATTENDU.length &&
    ORDRE_ATTENDU.every((etape, i) => s.ordre[i] === etape);
  if (ok) return { ok: true, messages: [] };

  const messages: string[] = [];
  const test = s.ordre.indexOf('Test');
  const assemblage = s.ordre.indexOf('Assemblage');
  const relecture = s.ordre.indexOf('Relecture');
  const deploiement = s.ordre.indexOf('Deploiement');

  if (deploiement !== -1 && deploiement < test) {
    messages.push('Le deploiement ne peut pas commencer avant les tests.');
  }
  if (relecture !== -1 && (relecture < test || relecture < assemblage)) {
    messages.push('La relecture vient apres le test et l assemblage.');
  }
  if (deploiement !== -1 && deploiement >= test && deploiement < relecture) {
    messages.push(
      deploiement < assemblage
        ? 'Le deploiement vient apres l assemblage.'
        : 'Le deploiement vient apres la relecture.',
    );
  }
  if (messages.length === 0) {
    messages.push(
      'L ordre propose ne correspond pas a la chaine attendue : test, assemblage, relecture, deploiement.',
    );
  }
  return { ok: false, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboChaineCI(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceChaine, undefined, initialState);
  const [messages, setMessages] = useState<string[]>([]);
  const [aBouge, setABouge] = useState(false);
  const [valideLocal, setValideLocal] = useState(false);

  const deplacer = (etape: string, type: 'monte' | 'descend') => {
    dispatch({ type, etape });
    setMessages([]);
    setValideLocal(false);
    setABouge(true);
  };

  const verifier = () => {
    const r = verifierChaine(s);
    setMessages(r.messages);
    setValideLocal(r.ok);
    if (r.ok && !p.laboDone.includes('m5-chaine')) props.onValide();
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessages([]);
    setValideLocal(false);
    setABouge(false);
  };

  const etapes = [
    'Quatre etapes fictives de chaine CI affichees dans un ordre melange.',
    'Deplacer chaque etape avec les boutons Monter et Descendre, au clic ou au clavier.',
    'Les deplacements sont bornes : la premiere etape ne monte pas, la derniere ne descend pas.',
    'Verifier : un message explicite signale chaque inversion, sans piege.',
    'L ordre attendu reste celui du cahier des charges : test, assemblage, relecture, deploiement.',
    'Validation quand l ordre est correct (+5 XP la premiere fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 4 : aBouge ? 3 : 2;

  return (
    <LaboFrame
      titre="Labo : chaine CI a ordonner"
      consigne="Ordonne les quatre etapes de la chaine CI simplifiee, puis verifie. Chaque inversion est expliquee."
      etapes={etapes}
      etape={etape}
      etat={
        messages[messages.length - 1] ??
        (valideLocal
          ? 'Ordre correct : test, assemblage, relecture, deploiement.'
          : `Ordre courant : ${s.ordre.join(', ')}.`)
      }
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <ol className="chaine-liste">
        {s.ordre.map((e, i) => (
          <li key={e} className="chaine-etape">
            <strong>{e}</strong>
            <span className="chaine-actions">
              <button
                type="button"
                className="btn mini secondary"
                aria-label={`Monter ${e}`}
                disabled={i === 0}
                onClick={() => deplacer(e, 'monte')}
              >
                Monter
              </button>
              <button
                type="button"
                className="btn mini secondary"
                aria-label={`Descendre ${e}`}
                disabled={i === s.ordre.length - 1}
                onClick={() => deplacer(e, 'descend')}
              >
                Descendre
              </button>
            </span>
          </li>
        ))}
      </ol>
      <p className="help" role="status" aria-live="polite">
        Ordre courant : {s.ordre.join(', ')}.
      </p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok" role="status">
          Ordre correct : tests, assemblage, relecture, puis deploiement.
        </p>
      )}
    </LaboFrame>
  );
}

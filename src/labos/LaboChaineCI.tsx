import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const ETAPES = ['Test', 'Assemblage', 'Relecture', 'Déploiement'];
export const ORDRE_ATTENDU = ['Test', 'Assemblage', 'Relecture', 'Déploiement'];
const ORDRE_INITIAL = ['Relecture', 'Test', 'Déploiement', 'Assemblage'];

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
  const deploiement = s.ordre.indexOf('Déploiement');

  if (deploiement !== -1 && deploiement < test) {
    messages.push('Le déploiement ne peut pas commencer avant les tests.');
  }
  if (relecture !== -1 && (relecture < test || relecture < assemblage)) {
    messages.push('La relecture vient après le test et l’assemblage.');
  }
  if (deploiement !== -1 && deploiement >= test && deploiement < relecture) {
    messages.push(
      deploiement < assemblage
        ? 'Le déploiement vient après l’assemblage.'
        : 'Le déploiement vient après la relecture.',
    );
  }
  if (messages.length === 0) {
    messages.push(
      'L’ordre proposé ne correspond pas à la chaîne attendue\u00A0: test, assemblage, relecture, déploiement.',
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
    'Quatre étapes fictives de chaîne CI affichées dans un ordre mélangé.',
    'Déplacer chaque étape avec les boutons Monter et Descendre, au clic ou au clavier.',
    'Les déplacements sont bornés\u00A0: la première étape ne monte pas, la dernière ne descend pas.',
    'Vérifier\u00A0: un message explicite indique chaque inversion, sans piège.',
    'L’ordre attendu reste celui du cahier des charges\u00A0: test, assemblage, relecture, déploiement.',
    'Validation quand l’ordre est correct (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 4 : aBouge ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: chaîne CI à ordonner'}
      consigne="Ordonne les quatre étapes de la chaîne CI simplifiée, puis vérifie. Chaque inversion est expliquée."
      etapes={etapes}
      etape={etape}
      etat={
        messages[messages.length - 1] ??
        (valideLocal
          ? 'Ordre correct\u00A0: test, assemblage, relecture, déploiement.'
          : `Ordre courant\u00A0: ${s.ordre.join(', ')}.`)
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
      <p className="help">
        Ordre courant&nbsp;: {s.ordre.join(', ')}.
      </p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Ordre correct&nbsp;: tests, assemblage, relecture, puis déploiement.
        </p>
      )}
    </LaboFrame>
  );
}

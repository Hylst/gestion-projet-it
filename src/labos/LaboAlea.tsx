import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const NIVEAUX = ['faible', 'moyenne', 'forte'] as const;
export type Niveau = (typeof NIVEAUX)[number];

export interface Lot {
  nom: string;
  incertitude: string;
  provision: Niveau;
}

export const LOTS: Lot[] = [
  { nom: 'Pages de présentation', incertitude: 'Contenu proche de l’existant, relecture maîtrisée.', provision: 'faible' },
  { nom: 'Agenda des activités', incertitude: 'Le bureau fictif doit encore valider les catégories.', provision: 'moyenne' },
  { nom: 'Formulaire de contact', incertitude: 'Le prestataire fictif change d’outil, intégration non testée.', provision: 'forte' },
  { nom: 'Photos et textes', incertitude: 'Les bénévoles fournissent les contenus, disponibilité incertaine.', provision: 'moyenne' },
  { nom: 'Mise en ligne', incertitude: 'Premier déploiement sur l’hébergement fictif.', provision: 'forte' },
];

const MOTIFS: Record<Niveau, string> = {
  faible: 'Peu d’inconnues\u00A0: le périmètre et les moyens sont stables.',
  moyenne: 'Quelques inconnues\u00A0: un ajustement reste probable.',
  forte: 'Inconnues fortes\u00A0: le périmètre ou les moyens peuvent bouger.',
};

export type AleaState = { choix: Record<string, Niveau> };

export type AleaAction =
  | { type: 'choisir'; lot: string; niveau: Niveau }
  | { type: 'reset' };

export function initialState(): AleaState {
  return { choix: {} };
}

export function reduceAlea(s: AleaState, a: AleaAction): AleaState {
  switch (a.type) {
    case 'choisir':
      return { ...s, choix: { ...s.choix, [a.lot]: a.niveau } };
    case 'reset':
      return initialState();
  }
}

export function verifierAlea(s: AleaState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const l of LOTS) {
    const choisi = s.choix[l.nom];
    if (choisi === undefined) {
      messages.push(`«\u00A0${l.nom}\u00A0» n’a pas encore de provision. Provision attendue\u00A0: ${l.provision} (${l.incertitude})`);
    } else if (choisi !== l.provision) {
      messages.push(`«\u00A0${l.nom}\u00A0»\u00A0: la provision choisie ne correspond pas au niveau d’incertitude. Provision attendue\u00A0: ${l.provision} (${l.incertitude})`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboAlea(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceAlea, undefined, initialState);
  const [retour, setRetour] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [valideLocal, setValideLocal] = useState(false);
  const nbChoix = Object.keys(s.choix).length;

  const choisir = (lot: string, niveau: Niveau) => {
    dispatch({ type: 'choisir', lot, niveau });
    setMessages([]);
    setValideLocal(false);
    setRetour(`«\u00A0${lot}\u00A0»\u00A0: provision ${niveau}.`);
  };

  const verifier = () => {
    const r = verifierAlea(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      setRetour('');
      if (!p.laboDone.includes('m8-alea')) props.onValide();
    } else {
      setMessages(r.messages);
      setValideLocal(false);
      setRetour('La vérification indique des points à revoir, sans jugement.');
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessages([]);
    setRetour('');
    setValideLocal(false);
  };

  const etapes = [
    'Cinq lots fictifs du fil rouge, avec leur niveau d’incertitude.',
    'Pour chaque lot, choisir une provision parmi trois niveaux.',
    'Le motif du niveau retenu s’affiche sous l’option.',
    'Vérifier\u00A0: chaque provision inadaptée est signalée avec le niveau attendu.',
    'Validation quand les cinq provisions correspondent (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 5 : messages.length > 0 ? 4 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: provision d’aléa par lot'}
      consigne="Choisis une provision faible, moyenne ou forte pour chaque lot fictif, selon l’incertitude décrite."
      etapes={etapes}
      etape={etape}
      etat={retour}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="alea-lots-t">Lots fictifs et incertitudes</h4>
      <div className="alea" role="group" aria-labelledby="alea-lots-t">
        {LOTS.map((lot, idx) => {
          const choix = s.choix[lot.nom] ?? null;
          return (
            <fieldset key={lot.nom} className="risques-parade">
              <legend>{lot.nom}</legend>
              <p className="compteur">{lot.incertitude}</p>
              <div className="risques-options">
                {NIVEAUX.map((niveau) => (
                  <label key={niveau}>
                    <input
                      type="radio"
                      name={`provision-${idx}`}
                      value={niveau}
                      checked={choix === niveau}
                      onChange={() => choisir(lot.nom, niveau)}
                    />
                    <span>
                      {`Provision ${niveau}`}
                      {choix === niveau && <span className="motif"> {MOTIFS[niveau]}</span>}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
      <p className="help">{retour || 'Choisis une provision par lot, puis vérifie.'}</p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les cinq provisions suivent l’incertitude. Une marge explicite reste discutable.
        </p>
      )}
    </LaboFrame>
  );
}

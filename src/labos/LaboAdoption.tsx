import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export interface Situation {
  nom: string;
  signe: string;
  levier: string;
}

export const SITUATIONS: Situation[] = [
  { nom: 'Benevoles peu a l aise avec le nouvel agenda', signe: 'Les premieres saisies sont hesitantes et les questions se repetent.', levier: 'Formation courte' },
  { nom: 'Deux benevoles motives peuvent accompagner', signe: 'Ils ont teste l outil et proposent de montrer aux autres.', levier: 'Relais de proximite' },
  { nom: 'Les usagers ignorent la nouvelle page', signe: 'Peu de visites et des questions sur l ancienne adresse.', levier: 'Message repete et simple' },
  { nom: 'Le bureau melange ancien et nouveau processus', signe: 'Deux consignes differentes circulent en reunion.', levier: 'Message repete et simple' },
  { nom: 'Une equipe teste le formulaire et peut montrer le geste', signe: 'Elle repere les raccourcis et veut les partager.', levier: 'Relais de proximite' },
];

export interface OptionLevier {
  valeur: string;
  motif: string;
}

export const OPTIONS_LEVIERS: Record<string, OptionLevier[]> = {
  'Benevoles peu a l aise avec le nouvel agenda': [
    { valeur: 'Formation courte', motif: 'Un geste court et pratique repond aux questions repetees.' },
    { valeur: 'Message repete et simple', motif: 'Le message rappelle l objectif mais n apprend pas le geste.' },
    { valeur: 'Ignorer les questions', motif: 'Les hesitations de depart risquent de se figer.' },
  ],
  'Deux benevoles motives peuvent accompagner': [
    { valeur: 'Message repete et simple', motif: 'Le message informe, il n accompagne pas le geste.' },
    { valeur: 'Relais de proximite', motif: 'Un pair disponible rassure et montre par l exemple.' },
    { valeur: 'Attendre sans rien faire', motif: 'L elan des volontaires peut retomber.' },
  ],
  'Les usagers ignorent la nouvelle page': [
    { valeur: 'Formation courte', motif: 'La formation vise un geste metier, pas une annonce publique.' },
    { valeur: 'Relais de proximite', motif: 'Un relais interne ne touche pas les usagers.' },
    { valeur: 'Message repete et simple', motif: 'Une annonce claire et repetee rejoint le public concerne.' },
  ],
  'Le bureau melange ancien et nouveau processus': [
    { valeur: 'Message repete et simple', motif: 'Une consigne unique et repetee leve la confusion.' },
    { valeur: 'Formation courte', motif: 'Une formation ne remplace pas une consigne claire.' },
    { valeur: 'Changer de sujet', motif: 'La confusion continuerait de circuler.' },
  ],
  'Une equipe teste le formulaire et peut montrer le geste': [
    { valeur: 'Ignorer l equipe', motif: 'Une competence utile resterait inutilisee.' },
    { valeur: 'Formation longue et generale', motif: 'Le besoin est un geste precis, pas un cours complet.' },
    { valeur: 'Relais de proximite', motif: 'L equipe peut montrer le geste a ses pairs.' },
  ],
};

export type AdoptionState = { choix: Record<string, string> };

export type AdoptionAction =
  | { type: 'choisir'; situation: string; levier: string }
  | { type: 'reset' };

export function initialState(): AdoptionState {
  return { choix: {} };
}

export function reduceAdoption(s: AdoptionState, a: AdoptionAction): AdoptionState {
  switch (a.type) {
    case 'choisir':
      return { ...s, choix: { ...s.choix, [a.situation]: a.levier } };
    case 'reset':
      return initialState();
  }
}

export function verifierAdoption(s: AdoptionState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const sit of SITUATIONS) {
    const choisi = s.choix[sit.nom];
    if (choisi === undefined) {
      messages.push(`« ${sit.nom} » n a pas encore de levier. Levier attendu : ${sit.levier}.`);
    } else if (choisi !== sit.levier) {
      messages.push(`« ${sit.nom} » : le levier choisi ne correspond pas au signe observe. Levier attendu : ${sit.levier}.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboAdoption(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceAdoption, undefined, initialState);
  const [retour, setRetour] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [valideLocal, setValideLocal] = useState(false);
  const nbChoix = Object.keys(s.choix).length;

  const choisir = (situation: string, levier: string) => {
    dispatch({ type: 'choisir', situation, levier });
    setMessages([]);
    setValideLocal(false);
    setRetour(`« ${situation} » : ${levier}.`);
  };

  const verifier = () => {
    const r = verifierAdoption(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      setRetour('');
      if (!p.laboDone.includes('m9-adoption')) props.onValide();
    } else {
      setMessages(r.messages);
      setValideLocal(false);
      setRetour('La verification signale des points a revoir, sans jugement.');
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setMessages([]);
    setRetour('');
    setValideLocal(false);
  };

  const etapes = [
    'Cinq situations fictives du fil rouge, avec leur signe observe.',
    'Choisir un levier parmi trois propositions pour chaque situation.',
    'Le motif du levier retenu s affiche sous l option.',
    'Verifier : chaque situation mal servie est signalee avec le levier attendu.',
    'Validation quand les cinq leviers correspondent (+5 XP la premiere fois).',
  ];

  const etape = valideLocal ? 5 : messages.length > 0 ? 4 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre="Labo : plan d adoption"
      consigne="Choisis un levier adapte pour chaque situation fictive, puis verifie."
      etapes={etapes}
      etape={etape}
      etat={retour}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="adoption-situations-t">Situations d adoption fictives</h4>
      <div className="alea" role="group" aria-labelledby="adoption-situations-t">
        {SITUATIONS.map((sit, idx) => {
          const choix = s.choix[sit.nom] ?? null;
          const options = OPTIONS_LEVIERS[sit.nom] ?? [];
          return (
            <fieldset key={sit.nom} className="risques-parade">
              <legend>{sit.nom}</legend>
              <p className="compteur">{sit.signe}</p>
              <div className="risques-options">
                {options.map((o) => (
                  <label key={o.valeur}>
                    <input
                      type="radio"
                      name={`levier-${idx}`}
                      value={o.valeur}
                      checked={choix === o.valeur}
                      onChange={() => choisir(sit.nom, o.valeur)}
                    />
                    <span>
                      {o.valeur}
                      {choix === o.valeur && <span className="motif"> {o.motif}</span>}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      </div>
      <p className="help">{retour || 'Choisis un levier par situation, puis verifie.'}</p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les cinq leviers correspondent aux signes observes. L adoption se suit, elle ne se decrete pas.
        </p>
      )}
    </LaboFrame>
  );
}

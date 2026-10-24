// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export interface Situation {
  nom: string;
  signe: string;
  levier: string;
}

export const SITUATIONS: Situation[] = [
  { nom: 'Bénévoles peu à l’aise avec le nouvel agenda', signe: 'Les premières saisies sont hésitantes et les questions se répètent.', levier: 'Formation courte' },
  { nom: 'Deux bénévoles motivés peuvent accompagner', signe: 'Ils ont testé l’outil et proposent de montrer aux autres.', levier: 'Relais de proximité' },
  { nom: 'Les usagers ignorent la nouvelle page', signe: 'Peu de visites et des questions sur l’ancienne adresse.', levier: 'Message répété et simple' },
  { nom: 'Le bureau mélange ancien et nouveau processus', signe: 'Deux consignes différentes circulent en réunion.', levier: 'Message répété et simple' },
  { nom: 'Une équipe teste le formulaire et peut montrer le geste', signe: 'Elle repère les raccourcis et veut les partager.', levier: 'Relais de proximité' },
];

export interface OptionLevier {
  valeur: string;
  motif: string;
}

export const OPTIONS_LEVIERS: Record<string, OptionLevier[]> = {
  'Bénévoles peu à l’aise avec le nouvel agenda': [
    { valeur: 'Formation courte', motif: 'Un geste court et pratique répond aux questions répétées.' },
    { valeur: 'Message répété et simple', motif: 'Le message rappelle l’objectif mais n’apprend pas le geste.' },
    { valeur: 'Ignorer les questions', motif: 'Les hésitations de départ risquent de se figer.' },
  ],
  'Deux bénévoles motivés peuvent accompagner': [
    { valeur: 'Message répété et simple', motif: 'Le message informe, il n’accompagne pas le geste.' },
    { valeur: 'Relais de proximité', motif: 'Un pair disponible rassure et montre par l’exemple.' },
    { valeur: 'Attendre sans rien faire', motif: 'L’élan des volontaires peut retomber.' },
  ],
  'Les usagers ignorent la nouvelle page': [
    { valeur: 'Formation courte', motif: 'La formation vise un geste métier, pas une annonce publique.' },
    { valeur: 'Relais de proximité', motif: 'Un relais interne ne touche pas les usagers.' },
    { valeur: 'Message répété et simple', motif: 'Une annonce claire et répétée rejoint le public concerné.' },
  ],
  'Le bureau mélange ancien et nouveau processus': [
    { valeur: 'Message répété et simple', motif: 'Une consigne unique et répétée lève la confusion.' },
    { valeur: 'Formation courte', motif: 'Une formation ne remplace pas une consigne claire.' },
    { valeur: 'Changer de sujet', motif: 'La confusion continuerait de circuler.' },
  ],
  'Une équipe teste le formulaire et peut montrer le geste': [
    { valeur: 'Ignorer l’équipe', motif: 'Une compétence utile resterait inutilisée.' },
    { valeur: 'Formation longue et générale', motif: 'Le besoin est un geste précis, pas un cours complet.' },
    { valeur: 'Relais de proximité', motif: 'L’équipe peut montrer le geste à ses pairs.' },
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
      messages.push(`«\u00A0${sit.nom}\u00A0» n’a pas encore de levier. Levier attendu\u00A0: ${sit.levier}.`);
    } else if (choisi !== sit.levier) {
      messages.push(`«\u00A0${sit.nom}\u00A0»\u00A0: le levier choisi ne correspond pas au signe observé. Levier attendu\u00A0: ${sit.levier}.`);
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
    setRetour(`«\u00A0${situation}\u00A0»\u00A0: ${levier}.`);
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
    'Cinq situations fictives du fil rouge, avec leur signe observé.',
    'Choisir un levier parmi trois propositions pour chaque situation.',
    'Le motif du levier retenu s’affiche sous l’option.',
    'Vérifier\u00A0: chaque situation mal servie est signalée avec le levier attendu.',
    'Validation quand les cinq leviers correspondent (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 5 : messages.length > 0 ? 4 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: plan d’adoption'}
      consigne="Choisis un levier adapté pour chaque situation fictive, puis vérifie."
      etapes={etapes}
      etape={etape}
      etat={retour}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="adoption-situations-t">Situations d’adoption fictives</h4>
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
      <p className="help">{retour || 'Choisis un levier par situation, puis vérifie.'}</p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les cinq leviers correspondent aux signes observés. L’adoption se suit, elle ne se décrète pas.
        </p>
      )}
    </LaboFrame>
  );
}

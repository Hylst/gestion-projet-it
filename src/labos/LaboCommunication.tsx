// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export interface PartiePrenante {
  nom: string;
  role: string;
  canal: string;
}

export const PARTIES: PartiePrenante[] = [
  { nom: 'Bureau de l’association', role: 'Valide les jalons et arbitre les priorités.', canal: 'Point court mensuel et compte rendu' },
  { nom: 'Bénévoles', role: 'Portent les activités et ont besoin de consignes claires.', canal: 'Message court et tableau des tâches' },
  { nom: 'Financeur fictif', role: 'Suit l’usage des moyens et attend des preuves d’avancement.', canal: 'Note d’avancement trimestrielle' },
  { nom: 'Usagers du quartier', role: 'Utilisent le site et les activités au quotidien.', canal: 'Affiche et page d’actualités' },
  { nom: 'Mairie fictive', role: 'Suit le cadre local et les étapes officielles.', canal: 'Courriel formel aux étapes clés' },
  { nom: 'Hébergeur fictif', role: 'Assure la disponibilité du site et traite les incidents.', canal: 'Fiche technique et contact incident' },
];

export interface OptionCommunication {
  valeur: string;
  motif: string;
}

export const OPTIONS_COMMUNICATION: Record<string, OptionCommunication[]> = {
  'Bureau de l’association': [
    { valeur: 'Point court mensuel et compte rendu', motif: 'Un rythme court garde les arbitrages visibles.' },
    { valeur: 'Courriel une fois par an', motif: 'Trop rare pour suivre les décisions.' },
    { valeur: 'Aucune communication', motif: 'Le bureau découvre les écarts trop tard.' },
  ],
  Bénévoles: [
    { valeur: 'Note trimestrielle formelle', motif: 'Le format est trop lourd pour des consignes de semaine.' },
    { valeur: 'Message court et tableau des tâches', motif: 'Des consignes simples et à jour évitent les doublons.' },
    { valeur: 'Affiche publique seulement', motif: 'L’affiche ne remplace pas une consigne de travail.' },
  ],
  'Financeur fictif': [
    { valeur: 'Aucune information', motif: 'Sans preuve d’avancement, le suivi devient aveugle.' },
    { valeur: 'Note d’avancement trimestrielle', motif: 'Une note régulière relie moyens et avancement.' },
    { valeur: 'Message quotidien', motif: 'Le rythme est disproportionné pour ce besoin.' },
  ],
  'Usagers du quartier': [
    { valeur: 'Réunion fermée', motif: 'Les usagers ne sont pas associés.' },
    { valeur: 'Courriel technique', motif: 'Le format ne touche pas le public concerné.' },
    { valeur: 'Affiche et page d’actualités', motif: 'Des formats accessibles rejoignent les usagers.' },
  ],
  'Mairie fictive': [
    { valeur: 'Courriel formel aux étapes clés', motif: 'Un format formel et daté correspond au cadre local.' },
    { valeur: 'Affiche de quartier', motif: 'Le canal ne garantit pas le suivi officiel.' },
    { valeur: 'Message quotidien', motif: 'Le rythme est excessif pour ce besoin.' },
  ],
  'Hébergeur fictif': [
    { valeur: 'Affiche publique', motif: 'Le canal ne joint pas l’interlocuteur technique.' },
    { valeur: 'Réunion mensuelle', motif: 'Le rythme est inutile hors incident.' },
    { valeur: 'Fiche technique et contact incident', motif: 'Un contact précis permet de traiter les incidents.' },
  ],
};

export type CommunicationState = { choix: Record<string, string> };

export type CommunicationAction =
  | { type: 'choisir'; partie: string; valeur: string }
  | { type: 'reset' };

export function initialState(): CommunicationState {
  return { choix: {} };
}

export function reduceComm(s: CommunicationState, a: CommunicationAction): CommunicationState {
  switch (a.type) {
    case 'choisir':
      return { ...s, choix: { ...s.choix, [a.partie]: a.valeur } };
    case 'reset':
      return initialState();
  }
}

export function verifierComm(s: CommunicationState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const p of PARTIES) {
    const choisi = s.choix[p.nom];
    if (choisi === undefined) {
      messages.push(`«\u00A0${p.nom}\u00A0» n’a pas encore de canal. Canal attendu\u00A0: ${p.canal}.`);
    } else if (choisi !== p.canal) {
      const motif = OPTIONS_COMMUNICATION[p.nom]?.find((o) => o.valeur === p.canal)?.motif ?? '';
      messages.push(`«\u00A0${p.nom}\u00A0»\u00A0: le canal choisi ne correspond pas au besoin. Canal attendu\u00A0: ${p.canal} (${motif})`);
    }
  }
  return { ok: messages.length === 0, messages };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboCommunication(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceComm, undefined, initialState);
  const [retour, setRetour] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [valideLocal, setValideLocal] = useState(false);
  const nbChoix = Object.keys(s.choix).length;

  const choisir = (partie: string, valeur: string) => {
    dispatch({ type: 'choisir', partie, valeur });
    setMessages([]);
    setValideLocal(false);
    setRetour(`«\u00A0${partie}\u00A0»\u00A0: ${valeur}.`);
  };

  const verifier = () => {
    const r = verifierComm(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      setRetour('');
      if (!p.laboDone.includes('m7-communication')) props.onValide();
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
    'Six parties prenantes fictives du fil rouge.',
    'Pour chacune, choisir un canal ou un rituel parmi trois propositions.',
    'Le motif du choix retenu s’affiche sous l’option.',
    'Vérifier\u00A0: chaque partie absente ou mal servie est signalée avec le canal attendu.',
    'Validation quand les six canaux correspondent (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 5 : messages.length > 0 ? 4 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre={'Labo\u00A0: plan de communication'}
      consigne="Choisis un canal ou un rituel adapté pour chaque partie prenante fictive, puis vérifie."
      etapes={etapes}
      etape={etape}
      etat={retour}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="communication-parties-t">Parties prenantes fictives</h4>
      <div className="communication" role="group" aria-labelledby="communication-parties-t">
        {PARTIES.map((partie, idx) => {
          const choix = s.choix[partie.nom] ?? null;
          const options = OPTIONS_COMMUNICATION[partie.nom] ?? [];
          return (
            <fieldset key={partie.nom} className="risques-parade">
              <legend>{partie.nom}</legend>
              <p className="compteur">{partie.role}</p>
              <div className="risques-options">
                {options.map((o) => (
                  <label key={o.valeur}>
                    <input
                      type="radio"
                      name={`canal-${idx}`}
                      value={o.valeur}
                      checked={choix === o.valeur}
                      onChange={() => choisir(partie.nom, o.valeur)}
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
      <p className="help">
        {retour || 'Choisis un canal par partie, puis vérifie.'}
      </p>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok">
          Les six canaux correspondent aux besoins. Un plan court se tient plus facilement.
        </p>
      )}
    </LaboFrame>
  );
}

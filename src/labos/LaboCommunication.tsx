import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export interface PartiePrenante {
  nom: string;
  role: string;
  canal: string;
}

export const PARTIES: PartiePrenante[] = [
  { nom: 'Bureau de l association', role: 'Valide les jalons et arbitre les priorites.', canal: 'Point court mensuel et compte rendu' },
  { nom: 'Benevoles', role: 'Portent les activites et ont besoin de consignes claires.', canal: 'Message court et tableau des taches' },
  { nom: 'Financeur fictif', role: 'Suit l usage des moyens et attend des preuves d avancement.', canal: 'Note d avancement trimestrielle' },
  { nom: 'Usagers du quartier', role: 'Utilisent le site et les activites au quotidien.', canal: 'Affiche et page d actualites' },
  { nom: 'Mairie fictive', role: 'Suit le cadre local et les etapes officielles.', canal: 'Courriel formel aux etapes cles' },
  { nom: 'Hebergeur fictif', role: 'Assure la disponibilite du site et traite les incidents.', canal: 'Fiche technique et contact incident' },
];

export interface OptionCommunication {
  valeur: string;
  motif: string;
}

export const OPTIONS_COMMUNICATION: Record<string, OptionCommunication[]> = {
  'Bureau de l association': [
    { valeur: 'Point court mensuel et compte rendu', motif: 'Un rythme court garde les arbitrages visibles.' },
    { valeur: 'Courriel une fois par an', motif: 'Trop rare pour suivre les decisions.' },
    { valeur: 'Aucune communication', motif: 'Le bureau decouvre les ecarts trop tard.' },
  ],
  Benevoles: [
    { valeur: 'Note trimestrielle formelle', motif: 'Le format est trop lourd pour des consignes de semaine.' },
    { valeur: 'Message court et tableau des taches', motif: 'Des consignes simples et a jour evitent les doublons.' },
    { valeur: 'Affiche publique seulement', motif: 'L affiche ne remplace pas une consigne de travail.' },
  ],
  'Financeur fictif': [
    { valeur: 'Aucune information', motif: 'Sans preuve d avancement, le suivi devient aveugle.' },
    { valeur: 'Note d avancement trimestrielle', motif: 'Une note reguliere relie moyens et avancement.' },
    { valeur: 'Message quotidien', motif: 'Le rythme est disproportionne pour ce besoin.' },
  ],
  'Usagers du quartier': [
    { valeur: 'Reunion fermee', motif: 'Les usagers ne sont pas associes.' },
    { valeur: 'Courriel technique', motif: 'Le format ne touche pas le public concerne.' },
    { valeur: 'Affiche et page d actualites', motif: 'Des formats accessibles rejoignent les usagers.' },
  ],
  'Mairie fictive': [
    { valeur: 'Courriel formel aux etapes cles', motif: 'Un format formel et date correspond au cadre local.' },
    { valeur: 'Affiche de quartier', motif: 'Le canal ne garantit pas le suivi officiel.' },
    { valeur: 'Message quotidien', motif: 'Le rythme est excessif pour ce besoin.' },
  ],
  'Hebergeur fictif': [
    { valeur: 'Affiche publique', motif: 'Le canal ne joint pas l interlocuteur technique.' },
    { valeur: 'Reunion mensuelle', motif: 'Le rythme est inutile hors incident.' },
    { valeur: 'Fiche technique et contact incident', motif: 'Un contact precis permet de traiter les incidents.' },
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
      messages.push(`« ${p.nom} » n a pas encore de canal. Canal attendu : ${p.canal}.`);
    } else if (choisi !== p.canal) {
      const motif = OPTIONS_COMMUNICATION[p.nom]?.find((o) => o.valeur === p.canal)?.motif ?? '';
      messages.push(`« ${p.nom} » : le canal choisi ne correspond pas au besoin. Canal attendu : ${p.canal} (${motif})`);
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
    setRetour(`« ${partie} » : ${valeur}.`);
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
    'Six parties prenantes fictives du fil rouge.',
    'Pour chacune, choisir un canal ou un rituel parmi trois propositions.',
    'Le motif du choix retenu s affiche sous l option.',
    'Verifier : chaque partie absente ou mal servie est signalee avec le canal attendu.',
    'Validation quand les six canaux correspondent (+5 XP la premiere fois).',
  ];

  const etape = valideLocal ? 5 : messages.length > 0 ? 4 : nbChoix > 0 ? 3 : 2;

  return (
    <LaboFrame
      titre="Labo : plan de communication"
      consigne="Choisis un canal ou un rituel adapte pour chaque partie prenante fictive, puis verifie."
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
        {retour || 'Choisis un canal par partie, puis verifie.'}
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

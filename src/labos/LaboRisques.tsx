import { useReducer, useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export interface RISQUE_D {
  nom: string;
  proba: 1 | 2 | 3;
  impact: 1 | 2 | 3;
  parade: string;
}

export const RISQUES: RISQUE_D[] = [
  { nom: 'Benevole indisponible avant la mise en ligne', proba: 2, impact: 3, parade: 'Benevole de rechange fictif' },
  { nom: 'Photos non recues', proba: 3, impact: 2, parade: 'Jeu de photos locales de rechange' },
  { nom: 'Agenda du site vide au tournant', proba: 2, impact: 2, parade: 'Relancer le bureau fictif avant le jalon' },
  { nom: 'Domaine du site expire', proba: 1, impact: 3, parade: 'Renouveler des maintenant et le noter' },
  { nom: 'Notice des benevoles non ecrite', proba: 3, impact: 3, parade: 'Temps dedie en retro prevue' },
  { nom: 'Formulaire non teste', proba: 2, impact: 1, parade: 'Passer par la chaine CI du module 5' },
];

export interface OptionParade {
  valeur: string;
  motif: string;
}

export const OPTIONS_PARADES: Record<string, OptionParade[]> = {
  'Benevole indisponible avant la mise en ligne': [
    { valeur: 'Attendre le jour J sans plan', motif: 'Aucun remplacant n est identifie : le risque reste entier.' },
    { valeur: 'Benevole de rechange fictif', motif: 'Un remplacant fictif est prevu avant la mise en ligne.' },
    { valeur: 'Retirer la mise en ligne', motif: 'Le risque disparait avec l objectif : ce n est pas une parade.' },
  ],
  'Photos non recues': [
    { valeur: 'Publier la page sans photos', motif: 'La page reste vide : l impact n est pas reduit.' },
    { valeur: 'Demander les photos le jour J', motif: 'La demande arrive au plus pres du besoin, sans marge.' },
    { valeur: 'Jeu de photos locales de rechange', motif: 'Un jeu de secours permet de tenir la date du jalon.' },
  ],
  'Notice des benevoles non ecrite': [
    { valeur: 'Temps dedie en retro prevue', motif: 'Un creneau est reserve pour ecrire la notice.' },
    { valeur: 'Compter sur la memoire des benevoles', motif: 'La transmission repose sur l improvisation.' },
    { valeur: 'Ecrire la notice apres la mise en ligne', motif: 'L information manque au moment ou elle sert.' },
  ],
};

export type RisquesState = {
  place: Record<string, string>;
  parades: Record<string, string | null>;
};

export type RisquesAction =
  | { type: 'place'; risque: string; cell: string }
  | { type: 'parade'; risque: string; valeur: string | null }
  | { type: 'reset' };

export function initialState(): RisquesState {
  return { place: {}, parades: {} };
}

export function reduceR(s: RisquesState, a: RisquesAction): RisquesState {
  switch (a.type) {
    case 'place':
      return { ...s, place: { ...s.place, [a.risque]: a.cell } };
    case 'parade':
      return { ...s, parades: { ...s.parades, [a.risque]: a.valeur } };
    case 'reset':
      return initialState();
  }
}

const LIGNE_IMPACT = [3, 2, 1] as const;
const COLONNE_PROBA = [1, 2, 3] as const;

const cellule = (proba: number, impact: number): string => `p${proba}-i${impact}`;

const analyserCellule = (value: string): { proba: number; impact: number } | null => {
  const m = /^p([1-3])-i([1-3])$/.exec(value);
  if (!m) return null;
  return { proba: Number(m[1]), impact: Number(m[2]) };
};

const decrireCellule = (value: string): string => {
  const c = analyserCellule(value);
  if (!c) return `la cellule « ${value} »`;
  return `probabilite ${c.proba}, impact ${c.impact}`;
};

const raccourciCellule = (value: string): string => {
  const c = analyserCellule(value);
  if (!c) return value;
  return `P${c.proba} x I${c.impact}`;
};

export function priorites(s: RisquesState): Array<{ nom: string; score: number }> {
  const liste: Array<{ nom: string; score: number }> = [];
  for (const r of RISQUES) {
    const place = s.place[r.nom];
    if (place === undefined) continue;
    const c = analyserCellule(place);
    if (!c) continue;
    liste.push({ nom: r.nom, score: c.proba * c.impact });
  }
  liste.sort((a, b) => b.score - a.score);
  return liste;
}

export function verifierRisques(s: RisquesState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const r of RISQUES) {
    const attendue = cellule(r.proba, r.impact);
    const place = s.place[r.nom];
    if (place === undefined) {
      messages.push(
        `« ${r.nom} » n est pas encore place. Cellule attendue : probabilite ${r.proba}, impact ${r.impact}.`,
      );
    } else if (place !== attendue) {
      messages.push(
        `« ${r.nom} » est place en ${decrireCellule(place)}, alors que la cellule attendue est probabilite ${r.proba}, impact ${r.impact}.`,
      );
    }
    if (r.proba * r.impact >= 6) {
      const parade = s.parades[r.nom];
      if (parade === undefined || parade === null) {
        messages.push(`Une parade reste a choisir pour le risque majeur « ${r.nom} ».`);
      } else if (parade !== r.parade) {
        messages.push(
          `La parade choisie pour « ${r.nom} » ne couvre pas ce risque : relis le motif et choisis une autre option.`,
        );
      }
    }
  }
  return { ok: messages.length === 0, messages };
}

const MAJEURS = RISQUES.filter((r) => r.proba * r.impact >= 6);

type Props = { valide: boolean; onValide: () => void };

export default function LaboRisques(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduceR, undefined, initialState);
  const [selection, setSelection] = useState<string | null>(null);
  const [retour, setRetour] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [valideLocal, setValideLocal] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const nb = RISQUES.length;
  const focus = Math.min(focusIdx, nb - 1);
  const nbPlaces = Object.keys(s.place).length;
  const nbParades = MAJEURS.filter((r) => typeof s.parades[r.nom] === 'string').length;
  const py = priorites(s);

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + nb) % nb;
    setFocusIdx(suivant);
    refs.current[suivant]?.focus();
  };

  const choisir = (nom: string) => {
    setSelection(nom);
    setMessages([]);
    setRetour(`« ${nom} » selectionne. Choisis une cellule dans la matrice.`);
  };

  const placer = (cell: string) => {
    if (!selection) {
      setRetour('Choisis d abord un risque dans la liste, puis une cellule de la matrice.');
      return;
    }
    const risque = selection;
    dispatch({ type: 'place', risque, cell });
    setSelection(null);
    setMessages([]);
    setValideLocal(false);
    setRetour(`« ${risque} » place en ${decrireCellule(cell)}.`);
  };

  const choisirParade = (risque: string, valeur: string) => {
    dispatch({ type: 'parade', risque, valeur });
    setMessages([]);
    setValideLocal(false);
    setRetour(`Parade retenue pour « ${risque} » : ${valeur}.`);
  };

  const verifier = () => {
    const r = verifierRisques(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      setRetour('Matrice correcte et parades majeures choisies.');
      if (!p.laboDone.includes('m6-risques')) props.onValide();
    } else {
      setMessages(r.messages);
      setValideLocal(false);
      setRetour('La verification signale des points a revoir, sans jugement.');
    }
  };

  const reinitialiser = () => {
    dispatch({ type: 'reset' });
    setSelection(null);
    setMessages([]);
    setRetour('');
    setValideLocal(false);
    setFocusIdx(0);
  };

  const etapes = [
    'Six risques fictifs a placer dans la matrice probabilite x impact.',
    'Choisir un risque puis une cellule : probabilite en colonne, impact en ligne.',
    'Les priorites se calculent localement, de probabilite x impact la plus haute a la plus basse.',
    'Pour chaque risque majeur (score 6 ou plus), choisir une parade parmi trois propositions.',
    'Verifier : les messages indiquent la cellule attendue ou la parade a revoir, sans jugement.',
    'Validation quand la matrice et les parades majeures sont completes (+5 XP la premiere fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 5 : nbParades > 0 ? 4 : nbPlaces > 0 ? 3 : selection ? 2 : 1;

  return (
    <LaboFrame
      titre="Labo : matrice des risques et parades"
      consigne="Place les six risques fictifs sur la matrice probabilite x impact, choisis une parade pour chaque risque majeur, puis verifie."
      etapes={etapes}
      etape={etape}
      etat=""
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="risques-liste-t">Risques fictifs a placer</h4>
      <div
        className="wbs-cards"
        role="listbox"
        aria-labelledby="risques-liste-t"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); deplacerFocus(1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); deplacerFocus(-1); }
        }}
      >
        {RISQUES.map((r, i) => {
          const place = s.place[r.nom];
          return (
            <button
              key={r.nom}
              type="button"
              role="option"
              aria-selected={selection === r.nom}
              aria-label={
                place === undefined
                  ? r.nom
                  : `${r.nom}, place en ${decrireCellule(place)}`
              }
              className={`wbs-card${selection === r.nom ? ' tiree' : ''}`}
              ref={(el) => { refs.current[i] = el; }}
              tabIndex={i === focus ? 0 : -1}
              onFocus={() => setFocusIdx(i)}
              onClick={() => choisir(r.nom)}
            >
              {r.nom}
              {place !== undefined && <span className="risques-cell-indic">{raccourciCellule(place)}</span>}
            </button>
          );
        })}
      </div>
      <p className="help" role="status" aria-live="polite">
        {retour ||
          (selection
            ? `« ${selection} » selectionne. Choisis une cellule puis clique dessus.`
            : 'Selectionne un risque, puis la cellule qui correspond a sa probabilite et a son impact.')}
      </p>
      <h4 id="risques-matrice-t">Matrice probabilite x impact</h4>
      <p className="help">Colonnes : probabilite de 1 a 3. Lignes : impact de 3 a 1.</p>
      <div className="risques-matrice-wrap">
        <table className="risques-matrice" aria-labelledby="risques-matrice-t">
          <thead>
            <tr>
              <th scope="col">Impact / Probabilite</th>
              {COLONNE_PROBA.map((proba) => (
                <th key={proba} scope="col">Probabilite {proba}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LIGNE_IMPACT.map((impact) => (
              <tr key={impact}>
                <th scope="row">Impact {impact}</th>
                {COLONNE_PROBA.map((proba) => {
                  const cell = cellule(proba, impact);
                  const places = RISQUES.filter((r) => s.place[r.nom] === cell);
                  return (
                    <td key={cell}>
                      <button
                        type="button"
                        className={`risques-cell${selection ? ' cible' : ''}`}
                        onClick={() => placer(cell)}
                      >
                        <span className="sr-only">Cellule probabilite {proba}, impact {impact}.</span>
                        <span className="risques-cell-lab" aria-hidden="true">{raccourciCellule(cell)}</span>
                        {places.map((r) => (
                          <span key={r.nom} className="risques-puce">{r.nom}</span>
                        ))}
                        {places.length === 0 && <span className="risques-vide" aria-hidden="true">libre</span>}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>Priorites calculees</h4>
      {py.length === 0 ? (
        <p className="help">Place des risques pour voir leurs priorites (probabilite x impact).</p>
      ) : (
        <ol className="risques-priorites">
          {py.map(({ nom, score }) => (
            <li key={nom}>
              {nom} <span className="risques-score">score {score}</span>
              {score >= 6 ? ' (majeur)' : ''}
            </li>
          ))}
        </ol>
      )}
      <h4 id="risques-parades-t">Parades des risques majeurs</h4>
      <p className="help">
        Un risque est majeur quand probabilite x impact atteint 6. Choisis une parade pour chacun, puis verifie.
      </p>
      <div className="risques-parades" role="group" aria-labelledby="risques-parades-t">
        {MAJEURS.map((r, idx) => {
          const choix = s.parades[r.nom] ?? null;
          const options = OPTIONS_PARADES[r.nom] ?? [];
          return (
            <fieldset key={r.nom} className="risques-parade">
              <legend>{r.nom}</legend>
              <p className="compteur">Score {r.proba * r.impact} : risque majeur.</p>
              <div className="risques-options">
                {options.map((o) => (
                  <label key={o.valeur}>
                    <input
                      type="radio"
                      name={`parade-${idx}`}
                      value={o.valeur}
                      checked={choix === o.valeur}
                      onChange={() => choisirParade(r.nom, o.valeur)}
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
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((m, i) => <li key={i} className="err">{m}</li>)}
        </ul>
      )}
      {valideLocal && (
        <p className="ok" role="status">
          Matrice correcte et parades majeures choisies. Les priorites se lisent de la plus haute a la plus basse.
        </p>
      )}
    </LaboFrame>
  );
}

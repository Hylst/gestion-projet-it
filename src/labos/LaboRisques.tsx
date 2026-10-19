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
  { nom: 'Bénévole indisponible avant la mise en ligne', proba: 2, impact: 3, parade: 'Bénévole de rechange fictif' },
  { nom: 'Photos non reçues', proba: 3, impact: 2, parade: 'Jeu de photos locales de rechange' },
  { nom: 'Agenda du site vide au tournant', proba: 2, impact: 2, parade: 'Relancer le bureau fictif avant le jalon' },
  { nom: 'Domaine du site expiré', proba: 1, impact: 3, parade: 'Renouveler dès maintenant et le noter' },
  { nom: 'Notice des bénévoles non écrite', proba: 3, impact: 3, parade: 'Temps dédié en rétro prévue' },
  { nom: 'Formulaire non testé', proba: 2, impact: 1, parade: 'Passer par la chaîne CI du module 5' },
];

export interface OptionParade {
  valeur: string;
  motif: string;
}

export const OPTIONS_PARADES: Record<string, OptionParade[]> = {
  'Bénévole indisponible avant la mise en ligne': [
    { valeur: 'Attendre le jour J sans plan', motif: 'Aucun remplaçant n’est identifié\u00A0: le risque reste entier.' },
    { valeur: 'Bénévole de rechange fictif', motif: 'Un remplaçant fictif est prévu avant la mise en ligne.' },
    { valeur: 'Retirer la mise en ligne', motif: 'Le risque disparaît avec l’objectif\u00A0: ce n’est pas une parade.' },
  ],
  'Photos non reçues': [
    { valeur: 'Publier la page sans photos', motif: 'La page reste vide\u00A0: l’impact n’est pas réduit.' },
    { valeur: 'Demander les photos le jour J', motif: 'La demande arrive au plus près du besoin, sans marge.' },
    { valeur: 'Jeu de photos locales de rechange', motif: 'Un jeu de secours permet de tenir la date du jalon.' },
  ],
  'Notice des bénévoles non écrite': [
    { valeur: 'Temps dédié en rétro prévue', motif: 'Un créneau est réservé pour écrire la notice.' },
    { valeur: 'Compter sur la mémoire des bénévoles', motif: 'La transmission repose sur l’improvisation.' },
    { valeur: 'Écrire la notice après la mise en ligne', motif: 'L’information manque au moment où elle sert.' },
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
  if (!c) return `la cellule «\u00A0${value}\u00A0»`;
  return `probabilité ${c.proba}, impact ${c.impact}`;
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
        `«\u00A0${r.nom}\u00A0» n’est pas encore placé. Cellule attendue\u00A0: probabilité ${r.proba}, impact ${r.impact}.`,
      );
    } else if (place !== attendue) {
      messages.push(
        `«\u00A0${r.nom}\u00A0» est placé en ${decrireCellule(place)}, alors que la cellule attendue est probabilité ${r.proba}, impact ${r.impact}.`,
      );
    }
    if (r.proba * r.impact >= 6) {
      const parade = s.parades[r.nom];
      if (parade === undefined || parade === null) {
        messages.push(`Une parade reste à choisir pour le risque majeur «\u00A0${r.nom}\u00A0».`);
      } else if (parade !== r.parade) {
        messages.push(
          `La parade choisie pour «\u00A0${r.nom}\u00A0» ne couvre pas ce risque\u00A0: relis le motif et choisis une autre option.`,
        );
      }
    }
  }
  return { ok: messages.length === 0, messages };
}

const MAJEURS = RISQUES.filter((r) => r.proba * r.impact >= 6);
const NOMS_MAJEURS = new Set(MAJEURS.map((r) => r.nom));

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
    setRetour(`«\u00A0${nom}\u00A0» sélectionné. Choisis une cellule dans la matrice.`);
  };

  const placer = (cell: string) => {
    if (!selection) {
      setRetour('Choisis d’abord un risque dans la liste, puis une cellule de la matrice.');
      return;
    }
    const risque = selection;
    const idx = RISQUES.findIndex((r) => r.nom === risque);
    dispatch({ type: 'place', risque, cell });
    setSelection(null);
    setMessages([]);
    setValideLocal(false);
    setRetour(`«\u00A0${risque}\u00A0» placé en ${decrireCellule(cell)}.`);
    refs.current[idx]?.focus();
  };

  const choisirParade = (risque: string, valeur: string) => {
    dispatch({ type: 'parade', risque, valeur });
    setMessages([]);
    setValideLocal(false);
    setRetour(`Parade retenue pour «\u00A0${risque}\u00A0»\u00A0: ${valeur}.`);
  };

  const verifier = () => {
    const r = verifierRisques(s);
    if (r.ok) {
      setMessages([]);
      setValideLocal(true);
      setRetour('');
      if (!p.laboDone.includes('m6-risques')) props.onValide();
    } else {
      setMessages(r.messages);
      setValideLocal(false);
      setRetour('La vérification signale des points à revoir, sans jugement.');
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
    'Six risques fictifs à placer dans la matrice probabilité x impact.',
    'Choisir un risque puis une cellule\u00A0: probabilité en colonne, impact en ligne.',
    'Les priorités se calculent localement, de probabilité x impact la plus haute à la plus basse.',
    'Pour chaque risque majeur (score 6 ou plus), choisir une parade parmi trois propositions.',
    'Vérifier\u00A0: les messages indiquent la cellule attendue ou la parade à revoir, sans jugement.',
    'Validation quand la matrice et les parades majeures sont complètes (+5 XP la première fois).',
  ];

  const etape = valideLocal ? 6 : messages.length > 0 ? 5 : nbParades > 0 ? 4 : nbPlaces > 0 ? 3 : selection ? 2 : 1;

  return (
    <LaboFrame
      titre={'Labo\u00A0: matrice des risques et parades'}
      consigne="Place les six risques fictifs sur la matrice probabilité x impact, choisis une parade pour chaque risque majeur, puis vérifie."
      etapes={etapes}
      etape={etape}
      etat={retour}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={props.valide || valideLocal}
    >
      <h4 id="risques-liste-t">Risques fictifs à placer</h4>
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
                  : `${r.nom}, placé en ${decrireCellule(place)}`
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
      <p className="help">
        {retour ||
          (selection
            ? `«\u00A0${selection}\u00A0» sélectionné. Choisis une cellule puis clique dessus.`
            : 'Sélectionne un risque, puis la cellule qui correspond à sa probabilité et à son impact.')}
      </p>
      <h4 id="risques-matrice-t">Matrice probabilité x impact</h4>
      <p className="help">Colonnes&nbsp;: probabilité de 1 à 3. Lignes&nbsp;: impact de 3 à 1.</p>
      <div className="risques-matrice-wrap">
        <table className="risques-matrice" aria-labelledby="risques-matrice-t">
          <thead>
            <tr>
              <th scope="col">Impact / Probabilité</th>
              {COLONNE_PROBA.map((proba) => (
                <th key={proba} scope="col">Probabilité {proba}</th>
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
                        <span className="sr-only">Cellule probabilité {proba}, impact {impact}.</span>
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
      <h4>Priorités calculées</h4>
      {py.length === 0 ? (
        <p className="help">Place des risques pour voir leurs priorités (probabilité x impact).</p>
      ) : (
        <ol className="risques-priorites">
          {py.map(({ nom, score }) => (
            <li key={nom}>
              {nom} <span className="risques-score">score {score}</span>
              {NOMS_MAJEURS.has(nom) ? ' (majeur)' : ''}
            </li>
          ))}
        </ol>
      )}
      <h4 id="risques-parades-t">Parades des risques majeurs</h4>
      <p className="help">
        Un risque est majeur quand probabilité x impact atteint 6. Choisis une parade pour chacun, puis vérifie.
      </p>
      <div className="risques-parades" role="group" aria-labelledby="risques-parades-t">
        {MAJEURS.map((r, idx) => {
          const choix = s.parades[r.nom] ?? null;
          const options = OPTIONS_PARADES[r.nom] ?? [];
          return (
            <fieldset key={r.nom} className="risques-parade">
              <legend>{r.nom}</legend>
              <p className="compteur">Score {r.proba * r.impact}&nbsp;: risque majeur.</p>
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
        <p className="ok">
          Matrice correcte et parades majeures choisies. Les priorités se lisent de la plus haute à la plus basse.
        </p>
      )}
    </LaboFrame>
  );
}

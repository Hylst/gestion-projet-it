import { useReducer, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';
import { useProgress } from '../lib/progress';

export const TACHES = ['Contenu relu', 'Maquette', 'Integration', 'Tests', 'Mise en ligne'];
export const DEPENDANCES: Array<[string, string]> = [
  ['Contenu relu', 'Maquette'],
  ['Maquette', 'Integration'],
  ['Integration', 'Tests'],
  ['Tests', 'Mise en ligne'],
];

export type Barre = { debut: number; fin: number };

export const BARRES_INIT: Record<string, Barre> = {
  'Contenu relu': { debut: 1, fin: 2 },
  Maquette: { debut: 3, fin: 4 },
  Integration: { debut: 5, fin: 6 },
  Tests: { debut: 5, fin: 6 },
  'Mise en ligne': { debut: 9, fin: 9 },
};

export type Vue = 'gantt' | 'pert';
export interface GanttState {
  barres: Record<string, Barre>;
  vue: Vue;
  liaisons: Array<[string, string]>;
  selection?: string;
}
export type GanttAction =
  | { type: 'deplace'; tache: string; delta: number }
  | { type: 'liaison'; de: string; vers: string }
  | { type: 'retire-liaison'; de: string; vers: string }
  | { type: 'vue'; v: Vue }
  | { type: 'reset' };

export function initialState(vue: Vue = 'gantt'): GanttState {
  return { barres: structuredClone(BARRES_INIT), vue, liaisons: [] };
}

export function reduireGantt(s: GanttState, a: GanttAction): GanttState {
  switch (a.type) {
    case 'deplace': {
      const barre = s.barres[a.tache];
      if (!barre) return s;
      const debut = barre.debut + a.delta;
      const fin = barre.fin + a.delta;
      if (debut < 1 || fin > 10) return s;
      return { ...s, barres: { ...s.barres, [a.tache]: { debut, fin } } };
    }
    case 'liaison':
      if (a.de === a.vers) return s;
      if (s.liaisons.some(([x, y]) => x === a.de && y === a.vers)) return s;
      return { ...s, liaisons: [...s.liaisons, [a.de, a.vers]] };
    case 'retire-liaison':
      return { ...s, liaisons: s.liaisons.filter(([x, y]) => !(x === a.de && y === a.vers)) };
    case 'vue':
      return { ...s, vue: a.v };
    case 'reset':
      return initialState(s.vue);
  }
}

export function verifierGantt(barres: Record<string, Barre>): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const [avant, apres] of DEPENDANCES) {
    const precedente = barres[avant];
    const suivante = barres[apres];
    if (!precedente || !suivante) {
      messages.push(`Barre manquante pour « ${suivante ? avant : apres} ».`);
    } else if (suivante.debut <= precedente.fin) {
      messages.push(`« ${apres} » ne doit pas commencer avant la fin de « ${avant} ».`);
    }
  }
  return { ok: messages.length === 0, messages };
}

const CHAINE_TENDUE = ['Contenu relu', 'Maquette', 'Integration', 'Tests'];

export function verifierPERT(liaisons: Array<[string, string]>): { ok: boolean; chaineTendue?: string[]; messages: string[] } {
  const manquantes = DEPENDANCES.filter(([a, b]) => !liaisons.some(([x, y]) => x === a && y === b));
  if (manquantes.length) {
    return { ok: false, messages: manquantes.map(([a, b]) => `Liaison manquante : « ${a} » vers « ${b} ».`) };
  }
  return { ok: true, chaineTendue: CHAINE_TENDUE, messages: [] };
}

type Props = { valide: boolean; onValide: () => void };

export default function LaboGanttPert(props: Props) {
  const p = useProgress();
  const [s, dispatch] = useReducer(reduireGantt, undefined, () => initialState('gantt'));
  const [message, setMessage] = useState('');
  const [aBouge, setABouge] = useState(false);
  const [aVerifie, setAVerifie] = useState(false);
  const [valideLocal, setValideLocal] = useState(false);

  const gantt = verifierGantt(s.barres);
  const pert = verifierPERT(s.liaisons);

  const verifier = () => {
    setAVerifie(true);
    if (s.vue === 'gantt') {
      setMessage(gantt.ok ? 'Le planning respecte les dependances.' : gantt.messages.join(' '));
      if (gantt.ok) {
        setValideLocal(true);
        if (!p.laboDone.includes('m2-gantt')) props.onValide();
      }
    } else {
      setMessage(pert.ok ? 'La chaine tendue est surlignee.' : pert.messages.join(' '));
      if (pert.ok) {
        setValideLocal(true);
        if (!p.laboDone.includes('m2-gantt')) props.onValide();
      }
    }
  };

  const deplacer = (tache: string, delta: number) => {
    dispatch({ type: 'deplace', tache, delta });
    setABouge(true);
    setMessage('');
  };

  const lier = (de: string, vers: string) => {
    dispatch({ type: 'liaison', de, vers });
    setMessage('');
  };

  const retirerDerniere = () => {
    const derniere = s.liaisons[s.liaisons.length - 1];
    if (!derniere) return;
    const [de, vers] = derniere;
    dispatch({ type: 'retire-liaison', de, vers });
    setMessage('');
  };

  const etapes = [
    'GANTT a 5 barres affiche.',
    'Deplacement d une barre avec les fleches.',
    'Dependances non respectees affichees en alerte.',
    'Barre replacee apres la precedente.',
    'Vue PERT : relier les noeuds dans l ordre.',
    'Chaine tendue surlignee, valider pour +5 XP.',
  ];
  const etape = s.vue === 'pert' ? (pert.ok ? 6 : 5) : gantt.ok ? 4 : aVerifie ? 3 : aBouge ? 2 : 1;

  return (
    <LaboFrame
      titre="Labo : mini GANTT et chaine PERT"
      consigne="Ordonne les barres puis relie la chaine PERT."
      etapes={etapes}
      etape={etape}
      etat={message}
      onVerifier={verifier}
      onReinitialiser={() => { dispatch({ type: 'reset' }); setMessage(''); setABouge(false); setAVerifie(false); setValideLocal(false); }}
      valide={props.valide || valideLocal}
    >
      {s.vue === 'gantt' ? (
        <div className="gantt">
          {TACHES.map((t) => {
            const barre = s.barres[t];
            if (!barre) return null;
            return (
              <div className="gantt-row" key={t}>
                <span>{t}</span>
                <div className="gantt-grid">
                  <button
                    type="button"
                    className="btn mini"
                    aria-label={`Deplacer ${t} a gauche`}
                    onClick={() => deplacer(t, -1)}
                  >
                    {'<-'}
                  </button>
                  <div
                    className="gantt-track"
                    role="img"
                    aria-label={`${t} : jours ${barre.debut} a ${barre.fin}`}
                    style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}
                  >
                    <div
                      className="gantt-bar"
                      style={{
                        gridColumnStart: barre.debut,
                        gridColumnEnd: barre.fin + 1,
                        background: t === 'Tests' ? 'var(--c-soft)' : 'var(--c-main)',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn mini"
                    aria-label={`Deplacer ${t} a droite`}
                    onClick={() => deplacer(t, 1)}
                  >
                    {'->'}
                  </button>
                </div>
              </div>
            );
          })}
          <p className="help">Une barre deplacee repond aux dependances via les fleches gauche et droite (accessibilite clavier).</p>
        </div>
      ) : (
        <div className="pert">
          <ul>
            {TACHES.map((t) => (
              <li key={t} className={pert.ok ? 'tendue' : undefined}><strong>{t}</strong></li>
            ))}
          </ul>
          <p className="help">Reliez les taches dans l ordre ; le bouton retire annule la derniere liaison.</p>
          <div className="pert-actions">
            {TACHES.slice(0, -1).map((t, i) => {
              const vers = TACHES[i + 1];
              if (!vers) return null;
              return (
                <button
                  key={t}
                  type="button"
                  className="btn mini"
                  onClick={() => lier(t, vers)}
                >
                  Relier {t} vers {vers}
                </button>
              );
            })}
            {s.liaisons.length > 0 && (
              <button type="button" className="btn secondary mini" onClick={retirerDerniere}>
                Retirer la derniere liaison
              </button>
            )}
          </div>
        </div>
      )}
      <div>
        <button
          type="button"
          className="btn secondary"
          onClick={() => { dispatch({ type: 'vue', v: s.vue === 'gantt' ? 'pert' : 'gantt' }); setMessage(''); }}
        >
          Passer a la vue {s.vue === 'gantt' ? 'PERT' : 'GANTT'}
        </button>
      </div>
      {message && <p role="alert">{message}</p>}
    </LaboFrame>
  );
}

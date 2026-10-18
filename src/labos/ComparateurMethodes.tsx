import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export const METHODS: Array<{ nom: string; avantages: string[]; limites: string[]; cas: string[] }> = [
  { nom: 'Cycle en V', avantages: ['Tests prepares pour chaque phase'], limites: ['Documentation lourde requise'], cas: ['Travaux fictifs reglementes avec besoin de traces'] },
  { nom: 'Waterfall (cascade)', avantages: ['Phases simples et jalons clairs'], limites: ['Retards coûteux si le besoin bouge'], cas: ['Site vitrine figé fictif'] },
  { nom: 'Agiles (Scrum/Kanban...)', avantages: ['Retours réguliers'], limites: ['Necessite des parties prenantes disponibles'], cas: ['Produit fictif évolutif comme l agenda du site'] },
];

export default function ComparateurMethodes(): JSX.Element {
  const [actif, setActif] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const deplacer = (delta: number) => {
    const suivant = (actif + delta + METHODS.length) % METHODS.length;
    setActif(suivant);
    refs.current[suivant]?.focus();
  };

  const surTouches = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      deplacer(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      deplacer(-1);
    }
  };

  return (
    <div className="labo card">
      <h2 id="comparateur-titre">Comparateur de methodes</h2>
      <p className="consigne">
        Trois familles, trois contextes. Chacune a des avantages et des limites : aucune n est superieure
        dans l absolu, le besoin et le cadre de decision guident le choix.
      </p>
      <div
        role="tablist"
        aria-label="Comparer les methodes"
        className="mode-switch comparateur-tabs"
        onKeyDown={surTouches}
      >
        {METHODS.map((m, i) => (
          <button
            key={m.nom}
            type="button"
            role="tab"
            id={`comparateur-tab-${i}`}
            aria-selected={i === actif}
            aria-controls={`comparateur-panel-${i}`}
            tabIndex={i === actif ? 0 : -1}
            className={`btn${i === actif ? '' : ' secondary'}`}
            ref={(el) => { refs.current[i] = el; }}
            onClick={() => setActif(i)}
          >
            {m.nom}
          </button>
        ))}
      </div>
      {METHODS.map((m, i) => (
        <div
          key={m.nom}
          role="tabpanel"
          id={`comparateur-panel-${i}`}
          aria-labelledby={`comparateur-tab-${i}`}
          hidden={i !== actif}
          tabIndex={0}
        >
          <div className="comparateur-grid">
            <section>
              <h3>Avantages</h3>
              <ul>
                {m.avantages.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </section>
            <section>
              <h3>Limites</h3>
              <ul>
                {m.limites.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </section>
            <section>
              <h3>Cas typiques</h3>
              <ul>
                {m.cas.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </section>
          </div>
        </div>
      ))}
      <p className="help">
        Exemples fictifs pour raisonner : aucune methode ne gagne par principe, le contexte tranche.
      </p>
    </div>
  );
}

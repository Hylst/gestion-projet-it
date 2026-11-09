// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useId, useState } from 'react';

type Phase = {
  nom: string;
  action: string;
  titre: string;
  posture: string;
};

const PHASES: Phase[] = [
  {
    nom: 'Choc',
    action: 'écouter',
    titre: 'Phase 1\u00A0: Choc',
    posture:
      'Accueillir les réactions sans juger, écouter les inquiétudes du terrain.',
  },
  {
    nom: 'Résistance',
    action: 'expliquer',
    titre: 'Phase 2\u00A0: Résistance',
    posture:
      'Réexpliquer le sens du projet, montrer les bénéfices concrets et clarifier les étapes.',
  },
  {
    nom: 'Acceptation',
    action: 'former',
    titre: 'Phase 3\u00A0: Acceptation',
    posture:
      'Proposer des formations courtes et pratiques, valoriser les relais et les premières réussites.',
  },
  {
    nom: 'Appropriation',
    action: 'ancrer',
    titre: 'Phase 4\u00A0: Appropriation',
    posture:
      'Ancrer les bonnes pratiques, mettre à jour la documentation et célébrer l’aboutissement.',
  },
];

const CENTRES = [80, 240, 400, 560];
const COURBE = 'M30 196 C120 240 180 230 240 180 S380 75 610 55';

export const SchemaCourbeAdoption = () => {
  const uid = useId().replace(/:/g, '');
  const [selection, setSelection] = useState(0);
  const [survol, setSurvol] = useState<number | null>(null);
  const phase = PHASES[selection];

  const activer = (index: number) => setSelection(index);

  const surTouche = (event: React.KeyboardEvent<SVGGElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activer(index);
    }
  };

  return (
    <figure className="schema-pedagogique" role="figure" aria-labelledby={`${uid}-legende`}>
      <figcaption className="schema-legende" id={`${uid}-legende`}>
        <p className="schema-titre">Courbe d’adoption&nbsp;: accompagner les quatre phases</p>
        <p className="schema-aide">
          Sélectionnez une phase pour voir la posture attendue du chef de projet&nbsp;: écouter, expliquer, former, ancrer.
        </p>
      </figcaption>

      <svg
        className="schema-svg"
        viewBox="0 0 640 280"
        role="group"
        aria-labelledby={`${uid}-svg-titre`}
      >
        <title id={`${uid}-svg-titre`}>
          Courbe d’adoption en quatre phases, du choc à l’appropriation
        </title>

        {PHASES.map((p, index) => {
          const actif = selection === index;
          const chaud = survol === index;

          return (
            <g
              key={p.nom}
              className={`schema-pair${actif ? ' is-active' : ''}${chaud ? ' is-hot' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={actif}
              aria-label={`Phase ${index + 1}, ${p.nom}, action ${p.action}`}
              onClick={() => activer(index)}
              onKeyDown={(event) => surTouche(event, index)}
              onMouseEnter={() => setSurvol(index)}
              onMouseLeave={() => setSurvol(null)}
              onFocus={() => setSurvol(index)}
              onBlur={() => setSurvol(null)}
            >
              <rect
                className="schema-zone"
                x={index * 160}
                y={24}
                width={160}
                height={200}
              />
              <text className="schema-phase" x={CENTRES[index]} y={46} textAnchor="middle">
                {p.nom}
              </text>
              <text className="schema-action" x={CENTRES[index]} y={64} textAnchor="middle">
                {p.action}
              </text>
            </g>
          );
        })}

        {[160, 320, 480].map((x) => (
          <line
            key={x}
            className="schema-guide schema-decor"
            x1={x}
            y1={30}
            x2={x}
            y2={224}
          />
        ))}

        <path className="schema-curve schema-decor" d={COURBE} />
        <circle className="schema-dot" r="6" aria-hidden="true">
          <animateMotion dur="9s" repeatCount="indefinite" path={COURBE} />
        </circle>

        <text className="schema-aide" x="320" y="252" textAnchor="middle">
          Chaque phase appelle une action différente. Le point montre le parcours.
        </text>
      </svg>

      <div className="schema-explication" aria-live="polite">
        <p className="schema-explication-titre">{phase.titre}</p>
        <p>
          <strong>Posture du chef de projet.</strong> {phase.posture}
        </p>
        <p>
          <strong>Action clé.</strong> {phase.action.charAt(0).toUpperCase() + phase.action.slice(1)}.
        </p>
      </div>
    </figure>
  );
};

export default SchemaCourbeAdoption;

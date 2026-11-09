// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useId, useState } from 'react';

type Paire = {
  niveau: number;
  gauche: string;
  gaucheComplet: string;
  droite: string;
  valide: string;
  pourquoi: string;
};

const PAIRES: Paire[] = [
  {
    niveau: 1,
    gauche: 'Besoin',
    gaucheComplet: 'Besoin',
    droite: 'Acceptation',
    valide:
      'La conformité avec les attentes initiales des usagers ou clients, autrement dit le pourquoi du projet.',
    pourquoi:
      'Les critères d’acceptation se définissent dès le cadrage pour que la recette ne soit pas une surprise.',
  },
  {
    niveau: 2,
    gauche: 'Conception globale',
    gaucheComplet: 'Conception globale',
    droite: 'Tests système',
    valide:
      'L’architecture globale, les flux de données principaux et les performances d’ensemble.',
    pourquoi:
      'Le protocole de test système se prépare dès que l’architecture est arrêtée.',
  },
  {
    niveau: 3,
    gauche: 'Conception détaillée',
    gaucheComplet: 'Conception détaillée',
    droite: 'Tests d’intégration',
    valide:
      'La bonne communication entre modules, composants et services techniques.',
    pourquoi:
      'Les contrats d’interface, API et formats de données, dictent immédiatement les scénarios de test.',
  },
  {
    niveau: 4,
    gauche: 'Code',
    gaucheComplet: 'Réalisation (Code)',
    droite: 'Tests unitaires',
    valide:
      'Le bon fonctionnement individuel de chaque fonction ou bloc élémentaire.',
    pourquoi:
      'Écrits au plus près du développement, souvent en TDD, ils sécurisent les modifications quotidiennes.',
  },
];

const NIVEAUX = [
  { y: 16, gaucheX: 20, gaucheLargeur: 115, droiteX: 345, droiteLargeur: 115 },
  { y: 80, gaucheX: 35, gaucheLargeur: 140, droiteX: 305, droiteLargeur: 140 },
  { y: 144, gaucheX: 50, gaucheLargeur: 155, droiteX: 275, droiteLargeur: 155 },
  { y: 208, gaucheX: 120, gaucheLargeur: 105, droiteX: 255, droiteLargeur: 105 },
];

const HAUTEUR = 36;

export const SchemaCycleV = () => {
  const uid = useId().replace(/:/g, '');
  const [selection, setSelection] = useState(0);
  const [survol, setSurvol] = useState<number | null>(null);
  const paire = PAIRES[selection];

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
        <p className="schema-titre">Cycle en V&nbsp;: les tests conçus en miroir</p>
        <p className="schema-aide">
          Sélectionnez un niveau pour voir ce qu’il valide et pourquoi son test se prépare dès la conception.
        </p>
      </figcaption>

      <svg
        className="schema-svg"
        viewBox="0 0 480 280"
        role="group"
        aria-labelledby={`${uid}-svg-titre`}
      >
        <title id={`${uid}-svg-titre`}>
          Cycle en V, quatre paires de conception et de test reliées en miroir
        </title>

        {PAIRES.map((p, index) => {
          const geo = NIVEAUX[index];
          const centreGauche = geo.gaucheX + geo.gaucheLargeur / 2;
          const centreDroite = geo.droiteX + geo.droiteLargeur / 2;
          const centreY = geo.y + HAUTEUR / 2;
          const actif = selection === index;
          const chaud = survol === index;

          return (
            <g
              key={p.niveau}
              className={`schema-pair${actif ? ' is-active' : ''}${chaud ? ' is-hot' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={actif}
              aria-label={`Niveau ${p.niveau}, ${p.gaucheComplet} et ${p.droite}`}
              onClick={() => activer(index)}
              onKeyDown={(event) => surTouche(event, index)}
              onMouseEnter={() => setSurvol(index)}
              onMouseLeave={() => setSurvol(null)}
              onFocus={() => setSurvol(index)}
              onBlur={() => setSurvol(null)}
            >
              <line
                className="schema-link"
                x1={geo.gaucheX + geo.gaucheLargeur}
                y1={centreY}
                x2={geo.droiteX}
                y2={centreY}
              />
              <rect
                className="schema-node"
                x={geo.gaucheX}
                y={geo.y}
                width={geo.gaucheLargeur}
                height={HAUTEUR}
                rx={8}
              />
              <text className="schema-node-label" x={centreGauche} y={centreY} textAnchor="middle" dominantBaseline="central">
                {p.gauche}
              </text>
              <rect
                className="schema-node"
                x={geo.droiteX}
                y={geo.y}
                width={geo.droiteLargeur}
                height={HAUTEUR}
                rx={8}
              />
              <text className="schema-node-label" x={centreDroite} y={centreY} textAnchor="middle" dominantBaseline="central">
                {p.droite}
              </text>
            </g>
          );
        })}

        <text className="schema-aide" x="240" y="272" textAnchor="middle">
          Chaque niveau de conception répond à un test en miroir.
        </text>
      </svg>

      <div className="schema-explication" aria-live="polite">
        <p className="schema-explication-titre">
          Niveau {paire.niveau}&nbsp;: {paire.gaucheComplet} ↔ {paire.droite}
        </p>
        <p>
          <strong>Ce qu’on valide.</strong> {paire.valide}
        </p>
        <p>
          <strong>Pourquoi le test se prépare dès la conception.</strong> {paire.pourquoi}
        </p>
      </div>
    </figure>
  );
};

export default SchemaCycleV;

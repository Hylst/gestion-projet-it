// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useId, useState } from 'react';

type Etape = {
  nom: string;
  sousTitre: string;
  titre: string;
  role: string;
  outil: string;
  regle: string;
  x: number;
};

const ETAPES: Etape[] = [
  {
    nom: 'Besoin',
    sousTitre: 'clarifier',
    titre: 'Étape 1\u00A0: Besoin',
    role:
      'Clarifier la valeur attendue et les critères d’acceptation avant d’engager le développement.',
    outil:
      'Aucun outil dédié\u00A0: une conversation avec le demandeur suffit souvent.',
    regle: 'Pas de code sans besoin validé.',
    x: 12,
  },
  {
    nom: 'Ticket',
    sousTitre: 'suivre',
    titre: 'Étape 2\u00A0: Ticket',
    role:
      'Enregistrer la demande dans l’outil de suivi, l’estimer et l’assigner à une personne.',
    outil:
      'GitHub Projects ou Jira, cités comme exemples informatifs.',
    regle: 'Tout travail en cours a un ticket unique.',
    x: 116,
  },
  {
    nom: 'Branche',
    sousTitre: 'isoler',
    titre: 'Étape 3\u00A0: Branche',
    role:
      'Développer la modification sur une branche Git dédiée, sans impacter la branche principale.',
    outil: 'Git.',
    regle: 'Une branche courte par fonctionnalité.',
    x: 220,
  },
  {
    nom: 'CI',
    sousTitre: 'tester',
    titre: 'Étape 4\u00A0: CI (Intégration continue)',
    role:
      'Exécuter automatiquement les tests unitaires, le lint et le build à chaque commit poussé.',
    outil:
      'GitHub Actions, cité comme exemple informatif.',
    regle: 'Branche bloquée tant que la CI n’est pas verte.',
    x: 324,
  },
  {
    nom: 'Recette',
    sousTitre: 'valider',
    titre: 'Étape 5\u00A0: Recette',
    role:
      'Tester le résultat en environnement de pré-production ou de recette avec le demandeur.',
    outil: 'Environnement de recette isolé.',
    regle: 'Validation formelle avant mise en production.',
    x: 428,
  },
  {
    nom: 'Production',
    sousTitre: 'déployer',
    titre: 'Étape 6\u00A0: Production',
    role:
      'Déployer vers les utilisateurs réels, avec une surveillance après la mise en ligne.',
    outil: 'Chaîne CD et supervision.',
    regle: 'Déploiement reproductible et réversible.',
    x: 532,
  },
];

const LARGEUR = 92;
const HAUTEUR = 56;
const Y = 58;
const CENTRE_Y = Y + HAUTEUR / 2;

export const SchemaCircuitDemande = () => {
  const uid = useId().replace(/:/g, '');
  const [selection, setSelection] = useState<Etape>(ETAPES[0]!);
  const [survol, setSurvol] = useState<Etape | null>(null);

  const surTouche = (event: React.KeyboardEvent<SVGGElement>, etape: Etape) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelection(etape);
    }
  };

  return (
    <figure className="schema-pedagogique" role="figure" aria-labelledby={`${uid}-legende`}>
      <figcaption className="schema-legende" id={`${uid}-legende`}>
        <p className="schema-titre">Circuit d’une demande&nbsp;: du besoin à la production</p>
        <p className="schema-aide">
          Sélectionnez une étape pour voir son rôle, l’outil type et la règle de passage à l’étape suivante.
        </p>
      </figcaption>

      <svg
        className="schema-svg"
        viewBox="0 0 640 300"
        role="group"
        aria-labelledby={`${uid}-svg-titre`}
      >
        <title id={`${uid}-svg-titre`}>
          Circuit d’une demande en six étapes, avec deux boucles de retour
        </title>
        <defs>
          <marker
            id={`${uid}-fleche`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path className="schema-fleche" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <line className="schema-flux" x1="58" y1={CENTRE_Y} x2="578" y2={CENTRE_Y} />
        <path
          className="schema-retour"
          d="M474 114 C474 170 266 170 266 114"
          markerEnd={`url(#${uid}-fleche)`}
        />
        <path
          className="schema-retour"
          d="M578 114 C578 210 58 210 58 114"
          markerEnd={`url(#${uid}-fleche)`}
        />
        <text className="schema-retour-label" x="370" y="166" textAnchor="middle">
          correction
        </text>
        <text className="schema-retour-label" x="318" y="202" textAnchor="middle">
          retour d’usage
        </text>

        {ETAPES.map((e, index) => {
          const centreX = e.x + LARGEUR / 2;
          const actif = selection === e;
          const chaud = survol === e;

          return (
            <g
              key={e.nom}
              className={`schema-pair${actif ? ' is-active' : ''}${chaud ? ' is-hot' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={actif}
              aria-controls={`${uid}-explication`}
              aria-label={`Étape ${index + 1}, ${e.nom}`}
              onClick={() => setSelection(e)}
              onKeyDown={(event) => surTouche(event, e)}
              onMouseEnter={() => setSurvol(e)}
              onMouseLeave={() => setSurvol(null)}
              onFocus={() => setSurvol(e)}
              onBlur={() => setSurvol(null)}
            >
              <rect className="schema-node" x={e.x} y={Y} width={LARGEUR} height={HAUTEUR} rx={8} />
              <text className="schema-node-label" x={centreX} y={79} textAnchor="middle" dominantBaseline="central">
                {e.nom}
              </text>
              <text className="schema-node-sub" x={centreX} y={97} textAnchor="middle" dominantBaseline="central">
                {e.sousTitre}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="schema-explication" id={`${uid}-explication`} aria-live="polite">
        <p className="schema-explication-titre">{selection.titre}</p>
        <p>
          <strong>Rôle.</strong> {selection.role}
        </p>
        <p>
          <strong>Outil type.</strong> {selection.outil}
        </p>
        <p>
          <strong>Règle de passage.</strong> {selection.regle}
        </p>
      </div>
    </figure>
  );
};

export default SchemaCircuitDemande;

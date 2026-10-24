// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef } from 'react';
import type { DossierProjetState, Etape } from '../../lib/capstone';
import { CapstoneField } from './CapstoneField';

interface CapstoneStepProps {
  etape: Etape;
  index: number;
  total: number;
  state: DossierProjetState;
  onReponse: (id: string, valeur: string) => void;
  onLivrable: (id: string, coche: boolean) => void;
  onPrecedent: () => void;
  onSuivant: () => void;
  onVoirSynthese: () => void;
}

export function CapstoneStep({
  etape,
  index,
  total,
  state,
  onReponse,
  onLivrable,
  onPrecedent,
  onSuivant,
  onVoirSynthese,
}: CapstoneStepProps) {
  const titreRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    titreRef.current?.focus();
  }, [etape.id]);
  const estDerniere = index === total - 1;

  return (
    <section className="capstone-step" aria-labelledby="capstone-step-titre">
      <p className="capstone-step__compteur">Étape {index + 1} sur {total}</p>
      <h2 id="capstone-step-titre" ref={titreRef} tabIndex={-1}>
        {etape.titre}
      </h2>
      <p className="capstone-step__intro">{etape.intro}</p>
      <div className="capstone-step__champs">
        {etape.champs.map((champ) => (
          <CapstoneField
            key={champ.id}
            champ={champ}
            valeur={state.reponses[champ.id] ?? ''}
            onChange={(valeur) => onReponse(champ.id, valeur)}
          />
        ))}
      </div>
      <fieldset className="capstone-step__livrables">
        <legend>Livrables de l’étape</legend>
        {etape.livrables.map((livrable) => (
          <label key={livrable.id}>
            <input
              type="checkbox"
              checked={state.livrables[livrable.id] === true}
              onChange={(event) => onLivrable(livrable.id, event.target.checked)}
            />
            {livrable.label}
          </label>
        ))}
      </fieldset>
      <div className="capstone-step__actions">
        <button type="button" className="btn secondary" onClick={onPrecedent} disabled={index === 0}>
          Étape précédente
        </button>
        {estDerniere ? (
          <button type="button" className="btn btn-primary" onClick={onVoirSynthese}>
            Voir la synthèse
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onSuivant}>
            Étape suivante
          </button>
        )}
      </div>
    </section>
  );
}

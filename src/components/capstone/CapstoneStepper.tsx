// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Etape, EtapeId } from '../../lib/capstone';

interface CapstoneStepperProps {
  etapes: readonly Etape[];
  etapeCourante: number;
  complete: (id: EtapeId) => boolean;
  onSelect: (index: number) => void;
}

export function CapstoneStepper({ etapes, etapeCourante, complete, onSelect }: CapstoneStepperProps) {
  return (
    <nav className="capstone-stepper" aria-label="Étapes du dossier">
      <ol>
        {etapes.map((etape, index) => {
          const estCourante = index === etapeCourante;
          const estComplete = complete(etape.id);
          return (
            <li key={etape.id}>
              <button
                type="button"
                aria-current={estCourante ? 'step' : undefined}
                className={estCourante ? 'is-current' : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="capstone-stepper__num">{index + 1}</span>
                <span>
                  <span className="capstone-stepper__titre">{etape.titre}</span>
                  <span className="capstone-stepper__statut">
                    {estComplete ? 'Terminée' : 'À compléter'}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useId } from 'react';
import type { Champ } from '../../lib/capstone';

interface CapstoneFieldProps {
  champ: Champ;
  valeur: string;
  onChange: (valeur: string) => void;
  erreur?: string;
}

export function CapstoneField({ champ, valeur, onChange, erreur }: CapstoneFieldProps) {
  const id = useId();
  const aideId = `${id}-aide`;
  const erreurId = `${id}-erreur`;
  return (
    <div className={`capstone-field${erreur ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{champ.label}</label>
      <p id={aideId} className="capstone-field__aide">{champ.aide}</p>
      <textarea
        id={id}
        value={valeur}
        maxLength={600}
        rows={6}
        aria-describedby={erreur ? `${aideId} ${erreurId}` : aideId}
        aria-invalid={erreur ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="capstone-field__meta">
        {erreur ? <p id={erreurId} role="alert">{erreur}</p> : <span />}
        <span aria-hidden="true">{valeur.length}/600</span>
        <span className="sr-only">{valeur.length} caractères sur 600.</span>
      </div>
    </div>
  );
}

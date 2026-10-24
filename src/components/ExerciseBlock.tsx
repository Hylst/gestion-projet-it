// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';

export function ExerciseBlock(props: { id: string; titre: string; enonce: React.ReactNode; corrige: React.ReactNode; methode: string[] }) {
  return (
    <section id={props.id} className="exercise" aria-labelledby={`${props.id}-t`}>
      <h2 id={`${props.id}-t`} className={props.id === 'exercice' ? 'sr-anchor' : undefined}>{props.titre}</h2>
      {props.enonce}
      <details className="corrige">
        <summary>Voir le corrigé<span className="detail-chevron" aria-hidden="true">⌄</span></summary>
        <div className="corrige-body">{props.corrige}</div>
      </details>
      <h3>Méthode réutilisable</h3>
      <ol>{props.methode.map((m, i) => <li key={i}>{m}</li>)}</ol>
    </section>
  );
}

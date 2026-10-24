// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import type { ModuleGuideData } from '../modules/guideTypes';

export function ModuleGuide({ data, moduleNum }: { data: ModuleGuideData; moduleNum: number }) {
  return (
    <section id="guide" aria-labelledby="guide-t">
      <h2 id="guide-t">Erreurs fréquentes et point de décision</h2>
      <p className="accroche">Des erreurs observables sur le fil rouge, avec leur conséquence et une correction courte.</p>
      <h3>Erreurs fréquentes</h3>
      <ul className="guide-erreurs">
        {data.erreurs.map((erreur) => (
          <li key={erreur.titre} className="guide-erreur card">
            <strong>{erreur.titre}</strong>
            <p><span className="guide-label">Conséquence</span> {erreur.consequence}</p>
            <p><span className="guide-label">Correction</span> {erreur.correction}</p>
          </li>
        ))}
      </ul>
      <h3>Point de décision&nbsp;: {data.decision.question}</h3>
      <div className="guide-options">
        {data.decision.options.map((option) => (
          <article key={option.nom} className="guide-option card">
            <h4>{option.nom}</h4>
            <p><span className="guide-label">Choisir si</span> {option.quand}</p>
            <p><span className="guide-label">Limite</span> {option.limite}</p>
          </article>
        ))}
      </div>
      <p className="guide-non-usage"><strong>Quand s’en passer&nbsp;:</strong> {data.decision.nonUsage}</p>
      <p><Link to={`/ressources#module-${moduleNum}`}>Ressources du module {moduleNum}</Link></p>
    </section>
  );
}

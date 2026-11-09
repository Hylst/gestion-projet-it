// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleMeta } from '../modules/index';

export function ModuleIntro({ meta }: { meta: ModuleMeta }) {
  return (
    <section className="module-intro card" aria-labelledby="module-intro-t">
      <div className="module-intro-head">
        <h2 id="module-intro-t">Pourquoi {meta.titre.toLowerCase()}&nbsp;?</h2>
        <p className="module-intro-pourquoi">{meta.pourquoi}</p>
      </div>

      <div className="module-intro-grid">
        <div className="module-intro-col">
          <h3>Ce que vous saurez faire</h3>
          <ul className="module-intro-objectifs">
            {meta.objectifs.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>

        <div className="module-intro-col">
          <h3>Sur le fil rouge</h3>
          <p className="module-intro-filrouge">{meta.filRougeContexte}</p>
          <div className="module-intro-temps" role="note">
            <strong>Temps estimé&nbsp;:</strong> {meta.temps.lecture} de lecture, environ {meta.temps.pratique} de pratique (labo et quiz).
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModuleIntro;

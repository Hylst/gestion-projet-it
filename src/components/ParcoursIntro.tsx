// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface ParcoursIntroTemps {
  lecture: string;
  pratique: string;
  activite: string;
}

export interface ParcoursIntroProps {
  pourquoi: string;
  objectifs: readonly string[];
  filRouge: string;
  temps: ParcoursIntroTemps;
}

export function ParcoursIntro({ pourquoi, objectifs, filRouge, temps }: ParcoursIntroProps) {
  return (
    <section className="module-intro parcours-intro card" aria-labelledby="parcours-intro-titre">
      <div className="module-intro-head">
        <h2 id="parcours-intro-titre">Pourquoi cette page&nbsp;?</h2>
        <p className="module-intro-pourquoi">{pourquoi}</p>
      </div>

      <div className="module-intro-grid">
        <div className="module-intro-col">
          <h3>Ce que vous saurez faire</h3>
          <ul className="module-intro-objectifs">
            {objectifs.map((objectif) => (
              <li key={objectif}>{objectif}</li>
            ))}
          </ul>
        </div>

        <div className="module-intro-col">
          <h3>Sur le fil rouge</h3>
          <p className="module-intro-filrouge">{filRouge}</p>
          <div className="module-intro-temps" role="note">
            <strong>Temps estimé&nbsp;:</strong> {temps.lecture} de lecture, environ {temps.pratique} de pratique ({temps.activite}).
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParcoursIntro;

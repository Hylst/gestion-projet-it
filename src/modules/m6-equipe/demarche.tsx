// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Ces cinq gestes vous permettent d’installer un climat de travail serein, d’objectiver les priorités et de désamorcer les risques ensemble.</p>
    <ol>
      <li>Écris le plan de communication en 3 colonnes&nbsp;: qui, quoi, quand.</li>
      <li>Trie chaque tâche&nbsp;: <Terme id="eisenhower">Eisenhower</Terme> rend l’arbitrage visible.</li>
      <li>Liste 6 risques fictifs, note probabilité et impact, puis prévois une parade.</li>
      <li>Choisis 3 indicateurs simples (tâches finies, blocages, date tenue).</li>
      <li>En <Terme id="retrospective">rétro</Terme>, 4 points courts dont 1 action attribuée avec une échéance fictive.</li>
    </ol>
  </section>
);

export default Demarche;

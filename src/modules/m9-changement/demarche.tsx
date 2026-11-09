// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Ces cinq gestes progressifs vous permettent d’ancrer les nouvelles pratiques sans braquer les équipes.</p>
    <ol>
      <li>Nomme le changement attendu en une phrase claire.</li>
      <li>Écoute les freins sans les nier.</li>
      <li>Choisis un <Terme id="relais">relais</Terme> de proximité disponible.</li>
      <li>Prévois une formation courte sur un geste précis.</li>
      <li>Suis les signes <Terme id="adoption">d’adoption</Terme> et ajuste le message.</li>
    </ol>
  </section>
);

export default Demarche;

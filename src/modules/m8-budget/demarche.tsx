// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Suivez ces cinq gestes pour construire un budget défendable et piloter les dépenses sans mauvaise surprise.</p>
    <ol>
      <li>Découpe le projet en lots chiffrables.</li>
      <li>Écris les <Terme id="hypothese">hypothèses</Terme> fictives de chaque lot.</li>
      <li>Donne une fourchette optimiste, probable et pessimiste.</li>
      <li>Prévois une <Terme id="marge-d-alea">marge d’aléa</Terme> explicite et justifiée.</li>
      <li>Compare budget et dépense à chaque <Terme id="jalon">jalon</Terme>, puis ajuste.</li>
    </ol>
  </section>
);

export default Demarche;

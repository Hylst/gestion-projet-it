// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Ces cinq gestes vous aident à outiller un projet avec sobriété, en partant toujours du problème réel avant d’installer un logiciel.</p>
    <ol>
      <li>Exprime le besoin en une phrase (équipe dispersée, régressions, démo fragile).</li>
      <li>Choisis une famille d’outils qui répond au besoin, pas une marque.</li>
      <li>Pose des tests courts à chaque changement.</li>
      <li>Reproduis le même <Terme id="environnement">environnement</Terme> pour la démo.</li>
      <li>Entretiens chaîne et tests, sinon la chaîne devient une promesse vide.</li>
    </ol>
  </section>
);

export default Demarche;

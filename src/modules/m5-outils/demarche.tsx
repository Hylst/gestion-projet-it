// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <ol>
      <li>Exprime le besoin en une phrase (équipe dispersée, régressions, démo fragile).</li>
      <li>Choisis une famille d’outils qui répond au besoin, pas une marque.</li>
      <li>Pose des tests courts à chaque changement.</li>
      <li>Reproduis le même environnement pour la démo.</li>
      <li>Entretiens chaîne et tests, sinon la chaîne devient une promesse vide.</li>
    </ol>
  </section>
);

export default Demarche;

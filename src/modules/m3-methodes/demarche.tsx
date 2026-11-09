// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Ces cinq gestes vous guident pour évaluer les contraintes et choisir la méthode la plus sûre sans tomber dans le dogmatisme.</p>
    <ol>
      <li>Décrire le besoin&nbsp;: stable, figé ou flou&nbsp;?</li>
      <li>Lister les contraintes (qualité, traces, date cible, équipe disponible) et les <Terme id="critere-d-acceptation">critères d’acceptation</Terme>.</li>
      <li>Si le besoin est flou, avancer par maquette ou lot court avant de figer une phase.</li>
      <li>La méthode est choisie et écrite avec son motif, ses limites et son <Terme id="recette">plan de recette</Terme>.</li>
      <li>Rédiger une parade si le besoin bouge (jalon de relecture ou tranche courte avec revue) et prévoir <Terme id="non-regression">la non-régression</Terme>.</li>
    </ol>
  </section>
);

export default Demarche;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Mettez en place une démarche agile pragmatique en formulant les besoins sous forme d’histoires utilisateurs et en limitant l’encombrement du tableau.</p>
    <ol>
      <li>Écris 3 user stories au format&nbsp;: en tant que ..., je veux ..., pour ... .</li>
      <li>Classe le <Terme id="backlog">backlog</Terme> fictif par priorité, de bout en bout.</li>
      <li>Choisis <Terme id="scrum">Scrum</Terme> (tranches) ou <Terme id="kanban">Kanban</Terme> (flux) selon comment les demandes arrivent, avec motif et limites.</li>
      <li>Pose une limite de <Terme id="wip">WIP</Terme> et un compteur de blocages après quelques semaines fictives.</li>
      <li>Lie la qualité du code (tests et relectures, esprit <Terme id="xp">XP</Terme>) à la <Terme id="chaine-ci">chaîne CI</Terme> du module 5.</li>
    </ol>
  </section>
);

export default Demarche;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Suivez ces cinq gestes pour organiser les relations avec vos partenaires et vous assurer que chaque information arrive au bon moment.</p>
    <ol>
      <li>Liste les <Terme id="partie-prenante">parties prenantes</Terme> fictives et leurs rôles.</li>
      <li>Évalue pouvoir et intérêt, sans juger les personnes.</li>
      <li>Choisis un canal et un rythme pour chaque besoin.</li>
      <li>Écris un plan court (qui, quoi, quand, canal) et une matrice <Terme id="raci">RACI</Terme> courte.</li>
      <li>Après chaque <Terme id="jalon">jalon</Terme>, ajuste le plan et note les décisions.</li>
    </ol>
  </section>
);

export default Demarche;

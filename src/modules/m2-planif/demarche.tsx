// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <p className="section-chapeau">Construisez votre planning étape par étape, des livrables bruts jusqu’au suivi visuel de la chaîne tendue.</p>
    <ol>
      <li>Récupérer les lots du <Terme id="wbs">WBS</Terme> et les transformer en tâches.</li>
      <li>Relier chaque tâche à sa tâche prédécesseur (vue <Terme id="pert">PERT</Terme>).</li>
      <li>Repérer <Terme id="chaine-tendue">la chaîne tendue</Terme> qui commande la fin.</li>
      <li>Poser les barres <Terme id="gantt">GANTT</Terme> et les 2 <Terme id="jalon">jalons</Terme>.</li>
      <li>Après tout déplacement, relire les dépendances et replanifier si besoin.</li>
    </ol>
  </section>
);

export default Demarche;

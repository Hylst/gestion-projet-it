// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: planifier avec PERT et GANTT</h2>
    <p className="section-chapeau">Planifier consiste à ordonner les tâches dans le temps. PERT éclaire la logique des dépendances, tandis que GANTT donne la visibilité opérationnelle au calendrier.</p>
    <p><strong>Définition.</strong> <Terme id="pert">PERT</Terme>&nbsp;: représente les tâches et leurs <Terme id="dependance">dépendances</Terme> pour lire l’ordre et <Terme id="chaine-tendue">la chaîne tendue</Terme>. <Terme id="gantt">GANTT</Terme>&nbsp;: barres posées dans le temps pour voir qui fait quoi, quand, et suivre l’avancement.</p>
    <p><strong>PERT, à quoi ça sert.</strong> Ordonner tâches et dépendances, lire la chaîne tendue. <strong>Quand l’utiliser.</strong> Projet avec dépendances, besoin d’une date cible.</p>
    <p><strong>GANTT, à quoi ça sert.</strong> Voir qui fait quoi et quand, suivre l’avancement. <strong>Quand l’utiliser.</strong> Suivi partagé, <Terme id="jalon">jalons</Terme>.</p>
    <p><strong>Avantages.</strong> PERT explique pourquoi la date finit où elle finit&nbsp;; GANTT rend le planning lisible et partageable.</p>
    <p><strong>Limites.</strong> Les deux demandent un entretien constant&nbsp;; un planning n’est pas une promesse, c’est une hypothèse à revoir.</p>
  </section>
);

export default Fiche;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: planifier avec PERT et GANTT</h2>
    <p><strong>Définition.</strong> PERT&nbsp;: représente les tâches et leurs dépendances pour lire l’ordre et la chaîne tendue. GANTT&nbsp;: barres posées dans le temps pour voir qui fait quoi, quand, et suivre l’avancement.</p>
    <p><strong>PERT, à quoi ça sert.</strong> Ordonner tâches et dépendances, lire la chaîne tendue. <strong>Quand l’utiliser.</strong> Projet avec dépendances, besoin d’une date cible.</p>
    <p><strong>GANTT, à quoi ça sert.</strong> Voir qui fait quoi et quand, suivre l’avancement. <strong>Quand l’utiliser.</strong> Suivi partagé, jalons.</p>
    <p><strong>Avantages.</strong> PERT explique pourquoi la date finit où elle finit&nbsp;; GANTT rend le planning lisible et partageable.</p>
    <p><strong>Limites.</strong> Les deux demandent un entretien constant&nbsp;; un planning n’est pas une promesse, c’est une hypothèse à revoir.</p>
  </section>
);

export default Fiche;

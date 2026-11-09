// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <p className="section-chapeau">Voyons comment l’enchaînement des tâches s’organise sur le cas des Amis du Square pour éviter que le retard d’un bénévole ne bloque tout le projet.</p>
    <h3>Exemple 1&nbsp;: <Terme id="chaine-tendue">la chaîne tendue</Terme></h3>
    <p>Contenu relu, puis maquette, puis intégration, puis tests, puis mise en ligne. Si la relecture fictive glisse, tout glisse&nbsp;: la chaîne tendue est visible du premier coup.</p>
    <h3>Exemple 2&nbsp;: le <Terme id="gantt">GANTT</Terme> partagé</h3>
    <p>5 barres fictives avec responsables fictifs (bénévole Contenu, bénévole Technique, relecteur fictif), 1 jalon maquette validée, 1 jalon site publié. La barre tests ne commence qu’après la fin de l’intégration fictive.</p>
  </section>
);

export default FilRouge;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <p className="section-chapeau">Comparons concrètement comment le site des Amis du Square se déroulerait en cascade ou en cycle en V, et comment la recette de l’agenda est organisée.</p>
    <h3>Exemple 1&nbsp;: le site en <Terme id="waterfall">cascade</Terme></h3>
    <p>Site des Amis du Square en cascade fictive&nbsp;: besoin figé (3 gabarits fictifs), conception, réalisation, tests par vague, déploiement. Chaque fin de phase fictive donne un document relu avant la suivante.</p>
    <h3>Exemple 2&nbsp;: le site en <Terme id="cycle-en-v">cycle en V</Terme></h3>
    <p>En face de chaque conception, un test préparé à l’avance&nbsp;: acceptation face au besoin fictif, système face à la conception globale, intégration face au détail, unitaire face au code. La <Terme id="recette">recette</Terme> fictive vérifie chaque niveau.</p>
    <h3>Exemple 3&nbsp;: la recette de la page agenda</h3>
    <p>La page agenda fictive est acceptée si un bénévole crée un événement avec un titre, une date et un lieu, si l’événement apparaît dans la liste et si un champ manquant affiche un message explicite. Le bureau et un bénévole font la recette sur un jeu fictif&nbsp;; une capture datée sert de preuve. La <Terme id="non-regression">non-régression</Terme> vérifie que la page contact fonctionne encore.</p>
  </section>
);

export default FilRouge;

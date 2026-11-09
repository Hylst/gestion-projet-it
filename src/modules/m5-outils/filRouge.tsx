// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <p className="section-chapeau">Découvrez comment Les Amis du Square évitent les pertes de code et les erreurs de mise en ligne grâce à un suivi centralisé et une chaîne automatisée.</p>
    <h3>Exemple 1&nbsp;: le suivi partagé</h3>
    <p><Terme id="backlog">Backlog</Terme> fictif centralisé, colonnes, assignation à un bénévole fictif, trace des décisions fictives. Besoin couvert&nbsp;: une équipe dispersée qui doit voir le reste à faire.</p>
    <h3>Exemple 2&nbsp;: la chaîne fictive simple</h3>
    <p>À chaque changement fictif&nbsp;: tests courts, assemblage, relecture, mise en ligne fictive. <Terme id="environnement">Environnement</Terme> reproductible fictif pour la démo devant le bureau fictif.</p>
  </section>
);

export default FilRouge;

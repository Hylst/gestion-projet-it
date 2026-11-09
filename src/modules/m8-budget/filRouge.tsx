// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const FilRouge = () => (
  <section id="fil-rouge" aria-labelledby="fr-t">
    <h2 id="fr-t">Exemples vécus du fil rouge</h2>
    <p className="section-chapeau">Voyons comment Les Amis du Square chiffrent leurs trois lots et anticipent les coûts imprévus de l’hébergement et du formulaire.</p>
    <h3>Exemple 1&nbsp;: chiffrer par lots</h3>
    <p>Le site fictif se découpe en trois lots&nbsp;: pages de présentation, agenda des activités, formulaire de contact. Chaque lot porte ses <Terme id="hypothese">hypothèses</Terme> de contenu, de relecture et de test.</p>
    <h3>Exemple 2&nbsp;: fourchette et aléa</h3>
    <p>Le lot formulaire reste incertain&nbsp;: le prestataire fictif change d’outil. Une fourchette et une provision plus forte rendent ce risque lisible, sans le cacher.</p>
    <h3>Exemple 3&nbsp;: suivre les écarts</h3>
    <p>Au <Terme id="jalon">jalon</Terme>, le bureau fictif compare le budget et la dépense par lot. Un <Terme id="ecart">écart</Terme> sur les photos est expliqué avant de décider d’un ajustement.</p>
  </section>
);

export default FilRouge;

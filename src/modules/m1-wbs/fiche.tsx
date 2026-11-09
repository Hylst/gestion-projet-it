// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: cadrer et découper</h2>
    <p className="section-chapeau">Cette fiche résume les repères essentiels du cadrage. Prenez le temps de bien distinguer ce qui relève du périmètre, des jalons et du découpage en livrables.</p>
    <p><strong>Définition.</strong> <Terme id="cadrage">Le cadrage</Terme> énonce le besoin, <Terme id="perimetre">le périmètre</Terme> et <Terme id="jalon">les jalons</Terme>&nbsp;; <Terme id="wbs">le WBS</Terme> découpe le travail en <Terme id="lot">lots</Terme> de livrables.</p>
    <p><strong>À quoi ça sert.</strong> Visualiser les livrables et les lots, partager le périmètre avec tous, éviter les malentendus sur ce qui est dedans ou dehors.</p>
    <p><strong>Quand l’utiliser.</strong> Au cadrage, au lotissement, et avant toute planification&nbsp;; dès qu’un projet sort de trois tâches simples.</p>
    <p><strong>Avantages.</strong> Vue partagée, découpage qui parle à tous, base du planning et des estimations.</p>
    <p><strong>Limites.</strong> Le WBS dit ce qui est à livrer, ni l’ordre ni la charge&nbsp;; un découpage trop fin se maintient difficilement.</p>
    <p><strong>Cas d’usage fictif.</strong> La refonte du site de l’association fictive est découpée en trois lots (contenu, réalisation, mise en ligne) pour expliquer le périmètre aux bénévoles fictifs.</p>
  </section>
);

export default Fiche;

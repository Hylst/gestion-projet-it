// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: Scrum, Kanban, Lean, XP</h2>
    <p className="section-chapeau">Les méthodes agiles partagent le même objectif&nbsp;: livrer de la valeur régulièrement et ajuster selon les retours. Découvrez les quatre approches majeures et leurs cas d’application.</p>
    <h3><Terme id="scrum">Scrum</Terme></h3>
    <p><strong>À quoi ça sert.</strong> Faire un produit évolutif par tranches courtes, avec un <Terme id="backlog">backlog</Terme> priorisé, des <Terme id="rituel">rituels courts</Terme> (planning, quotidienne, revue, rétro) et trois rôles (porteur de besoin, animateur, réalisateurs). <strong>Quand.</strong> Le contenu évolue et des retours réguliers sont possibles. <strong>Limites.</strong> Demande de la disponibilité des personnes et de la stabilité des rôles.</p>
    <h3><Terme id="kanban">Kanban</Terme></h3>
    <p><strong>À quoi ça sert.</strong> Gérer un flux continu sans grosse phase de planification, avec des colonnes, une limite de <Terme id="wip">WIP</Terme> et des indicateurs simples. <strong>Quand.</strong> Les demandes arrivent au fil de l’eau. <strong>Limites.</strong> Sans limite de WIP respectée, la colonne En cours s’encombre. <strong>Indicateurs.</strong> Suivre le <Terme id="delai-de-traversee">délai de traversée</Terme> (lead time) et tenir une courte revue de flux pour agir sur les blocages.</p>
    <h3><Terme id="lean">Lean</Terme></h3>
    <p><strong>À quoi ça sert.</strong> Éliminer les gaspillages, découper en <Terme id="lot">petits lots</Terme>, boucler court. <strong>Quand.</strong> On cherche à réduire l’encombrement et les travaux sans suite. <strong>Limites.</strong> Demande un suivi des blocages réel&nbsp;: petit lot ne veut pas dire publication continue sans contrôle.</p>
    <h3><Terme id="xp">XP</Terme></h3>
    <p><strong>À quoi ça sert.</strong> Soigner la qualité du code&nbsp;: relectures croisées, tests fréquents, petits pas. <strong>Quand.</strong> Dès que des tests et des relectures régulières sont possibles. <strong>Limites.</strong> Suppose une équipe qui programme ensemble, ce qui n’est pas toujours le cas.</p>
    <h3>Agile sans dogme</h3>
    <p>Quatre méthodes citées avec leur cas d’usage et leurs limites&nbsp;; aucune n’est supérieure aux autres&nbsp;: le choix dépend du flux des demandes, de la disponibilité des personnes et de la culture technique locale.</p>
  </section>
);

export default Fiche;

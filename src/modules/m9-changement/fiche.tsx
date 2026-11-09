// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';
import { SchemaCourbeAdoption } from '../../components/schemas/SchemaCourbeAdoption';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: conduite du changement</h2>
    <p className="section-chapeau">Un outil n’a de valeur que s’il est réellement utilisé. Découvrez comment comprendre les résistances, former court et accompagner l’adoption dans la durée.</p>
    <h3>Lire les freins</h3>
    <p><strong>Intérêt, habitude, compétence, charge.</strong> Un frein exprimé dit souvent quelque chose du quotidien. <strong>À quoi ça sert.</strong> Comprendre avant de répondre dans une démarche de <Terme id="conduite-du-changement">conduite du changement</Terme>. <strong>Avantage.</strong> Les résistances deviennent des informations. <strong>Limite.</strong> Tout expliquer par la résistance cache parfois un problème réel.</p>
    <h3><Terme id="relais">Relais</Terme> et formation courte</h3>
    <p><strong>Un pair qui montre le geste.</strong> Une formation courte cible un usage précis, pas un cours complet. <strong>Avantage.</strong> L’adoption passe par la pratique et la proximité. <strong>Limite.</strong> Sans relais disponible ni temps, la formation reste lettre morte.</p>
    <h3>Messages et rythme</h3>
    <p><strong>Un message simple, répété et cohérent.</strong> Le même cap, dit par les mêmes personnes, sur un rythme tenable. <strong>Avantage.</strong> Les consignes se stabilisent. <strong>Limite.</strong> Trop de messages fatigue et brouille le cap.</p>
    <h3>Suivre <Terme id="adoption">l’adoption</Terme></h3>
    <p><strong>Des signes simples.</strong> Usages réels, questions qui diminuent, gestes qui se transmettent. <strong>Avantage.</strong> Les ajustements arrivent avant le blocage. <strong>Limite.</strong> Un <Terme id="indicateur-d-adoption">indicateur d’adoption</Terme> seul ne raconte pas toute l’histoire.</p>
    <SchemaCourbeAdoption />
  </section>
);

export default Fiche;

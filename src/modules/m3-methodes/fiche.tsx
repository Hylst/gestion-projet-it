// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: cycle en V, cascade (Waterfall), choisir sa méthode</h2>
    <p><strong>Définition cascade (Waterfall).</strong> Phases en suite&nbsp;: besoin, conception, réalisation, test, déploiement. Un document de fin de phase est relu avant la suivante&nbsp;; l’avancement se lit par jalons.</p>
    <p><strong>Définition cycle en V.</strong> Mêmes phases, avec des tests préparés en face de chaque niveau de conception&nbsp;: tests unitaires face au code, tests d’intégration face à la conception détaillée, tests système face à la conception globale, acceptation face au besoin.</p>
    <p><strong>À quoi ça sert.</strong> Ordonner un travail en phases simples avec jalons, quand le besoin est stable et les contraintes connues. Le cycle en V prévoit des tests préparés à l’avance en face de chaque conception.</p>
    <p><strong>Quand l’utiliser.</strong> La cascade convient quand le besoin est stable, le périmètre petit et les contraintes connues. Le cycle en V convient quand des traces et des tests sont attendus à chaque niveau.</p>
    <p><strong>Avantages.</strong> Lisibilité, jalons clairs, documents de référence par phase.</p>
    <p><strong>Critères d’acceptation.</strong> Un critère est observable et testable&nbsp;: un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste&nbsp;; un champ manquant affiche un message explicite. Les critères se discutent avant la réalisation, avec les parties prenantes. <strong>Définition de prêt.</strong> Elle dit quand une tâche est assez claire pour commencer. <strong>Définition de fini.</strong> Elle dit quand elle est vraiment terminée.</p>
    <p><strong>Recette et non-régression.</strong> La recette vérifie avec les parties prenantes que le résultat répond aux critères. La non-régression vérifie qu’un changement ne casse pas ce qui fonctionnait déjà. Un plan de test court suffit&nbsp;: quoi, qui, quand, quelle preuve.</p>
    <p><strong>Limite qualité.</strong> Une recette découverte à la fin ne rattrape pas un besoin flou&nbsp;; les critères se discutent tôt. La qualité n’est pas un document de plus, c’est une décision sur ce qui compte.</p>
    <p><strong>Limites.</strong> Retours tardifs coûteux, besoin flou mal porté, découverte d’usage faible. Aucune école supérieure à l’autre&nbsp;: le comparateur ci-dessous montre les trois familles côte à côte.</p>
  </section>
);

export default Fiche;

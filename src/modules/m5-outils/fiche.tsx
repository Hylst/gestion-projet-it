// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Terme } from '../../components/Terme';

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: suivi, CI/CD et environnements</h2>
    <p className="section-chapeau">Les outils soutiennent le travail commun sans s’y substituer. Découvrez comment organiser le suivi des tâches, automatiser les tests avec la chaîne CI/CD et isoler vos environnements techniques.</p>
    <h3>Outil de suivi</h3>
    <p><strong>À quoi ça sert.</strong> Centraliser le <Terme id="backlog">backlog</Terme>, les colonnes et l’assignation dans un <Terme id="depot">dépôt</Terme> ou un espace partagé. <strong>Quand l’utiliser.</strong> Équipe dispersée, besoin de trace. Des outils réels existent (Jira, GitHub Projects), cités à titre informatif, toujours avec l’usage fictif du fil rouge.</p>
    <h3><Terme id="chaine-ci">Chaîne CI</Terme> / <Terme id="cd">CD</Terme></h3>
    <p><strong>À quoi ça sert.</strong> Tester et livrer automatiquement à chaque changement poussé vers le <Terme id="serveur">serveur</Terme>. <strong>Quand.</strong> Base de code partagée, régressions fréquentes. GitHub Actions cité comme exemple informatif.</p>
    <h3><Terme id="environnement">Environnements</Terme> reproductibles</h3>
    <p><strong>À quoi ça sert.</strong> Garantir le même comportement sur chaque poste et en production grâce à la conteneurisation. <strong>Quand.</strong> Écarts entre postes, démonstration fragile. Docker cité comme exemple informatif.</p>
    <p><strong>Limites communes.</strong> Un outil n’est pas une méthode&nbsp;: sans entretien et sans usage collectif, il devient un registre vide&nbsp;; l’outil choisi doit rester une décision d’équipe avec motif et limite écrite.</p>
  </section>
);

export default Fiche;

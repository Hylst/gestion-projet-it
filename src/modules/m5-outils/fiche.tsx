export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche&nbsp;: suivi, CI/CD et environnements</h2>
    <h3>Outil de suivi</h3>
    <p><strong>À quoi ça sert.</strong> Centraliser backlog, colonnes et assignation. <strong>Quand l’utiliser.</strong> Équipe partagée, besoin de trace. Des outils réels existent (Jira, GitHub Projects), cités à titre informatif, toujours avec l’usage fictif du fil rouge.</p>
    <h3>Chaîne CI/CD</h3>
    <p><strong>À quoi ça sert.</strong> Tester et livrer à chaque changement. <strong>Quand.</strong> Base partagée, régressions fréquentes. GitHub Actions cité comme exemple informatif.</p>
    <h3>Environnements reproductibles</h3>
    <p><strong>À quoi ça sert.</strong> Même poste partout, onboarding simple. <strong>Quand.</strong> Écarts entre postes, démo fragile. Docker cité comme exemple informatif.</p>
    <p><strong>Limites communes.</strong> Un outil n’est pas une méthode&nbsp;: sans entretien et sans usage collectif, il devient un registre vide&nbsp;; l’outil choisi doit rester une décision d’équipe avec motif et limite écrite.</p>
  </section>
);

export default Fiche;

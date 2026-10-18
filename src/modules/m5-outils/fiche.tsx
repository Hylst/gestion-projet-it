export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : suivi, CI/CD et environnements</h2>
    <h3>Outil de suivi</h3>
    <p><strong>A quoi ca sert.</strong> Centraliser backlog, colonnes et assignation. <strong>Quand l utiliser.</strong> Equipe partagee, besoin de trace. Des outils reels existent (Jira, GitHub Projects), cites a titre informatif, toujours avec l usage fictif du fil rouge.</p>
    <h3>Chaine CI/CD</h3>
    <p><strong>A quoi ca sert.</strong> Tester et livrer a chaque changement. <strong>Quand.</strong> Base partagee, regressions frequentes. GitHub Actions cite comme exemple informatif.</p>
    <h3>Environnements reproductibles</h3>
    <p><strong>A quoi ca sert.</strong> Meme poste partout, onboarding simple. <strong>Quand.</strong> Ecarts entre postes, demo fragile. Docker cite comme exemple informatif.</p>
    <p><strong>Limites communes.</strong> Un outil n est pas une methode : sans entretien et sans usage collectif, il devient un registre vide ; l outil choisi doit rester une decision d equipe avec motif et limite ecrite.</p>
  </section>
);

export default Fiche;

export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : planifier avec PERT et GANTT</h2>
    <p><strong>Definition.</strong> PERT : represente les taches et leurs dependances pour lire l ordre et la chaine tendue. GANTT : barres posees dans le temps pour voir qui fait quoi, quand, et suivre l avancement.</p>
    <p><strong>PERT, a quoi ca sert.</strong> Ordonner taches et dependances, lire la chaine tendue. <strong>Quand l utiliser.</strong> Projet avec dependances, besoin d une date cible.</p>
    <p><strong>GANTT, a quoi ca sert.</strong> Voir qui fait quoi et quand, suivre l avancement. <strong>Quand l utiliser.</strong> Suivi partage, jalons.</p>
    <p><strong>Avantages.</strong> PERT explique pourquoi la date finit ou elle finit ; GANTT rend le planning lisible et partageable.</p>
    <p><strong>Limites.</strong> Les deux demandent un entretien constant ; un planning n est pas une promesse, c est une hypothese a revoir.</p>
  </section>
);

export default Fiche;

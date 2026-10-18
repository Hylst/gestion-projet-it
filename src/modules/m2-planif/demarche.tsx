export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Demarche en 5 gestes</h2>
    <ol>
      <li>Recuperer les lots du WBS et les transformer en taches.</li>
      <li>Relier chaque tache a sa tache predecesseur (vue PERT).</li>
      <li>Reperer la chaine tendue qui commande la fin.</li>
      <li>Poser les barres GANTT et les 2 jalons.</li>
      <li>Apres tout deplacement, relire les dependances et replanifier si besoin.</li>
    </ol>
  </section>
);

export default Demarche;

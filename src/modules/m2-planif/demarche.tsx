export const Demarche = () => (
  <section id="demarche" aria-labelledby="demarche-t">
    <h2 id="demarche-t">Démarche en 5 gestes</h2>
    <ol>
      <li>Récupérer les lots du WBS et les transformer en tâches.</li>
      <li>Relier chaque tâche à sa tâche prédécesseur (vue PERT).</li>
      <li>Repérer la chaîne tendue qui commande la fin.</li>
      <li>Poser les barres GANTT et les 2 jalons.</li>
      <li>Après tout déplacement, relire les dépendances et replanifier si besoin.</li>
    </ol>
  </section>
);

export default Demarche;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export function PreMortem() {
  return (
    <section id="pre-mortem" aria-labelledby="pre-mortem-t">
      <h2 id="pre-mortem-t">Atelier&nbsp;: pré-mortem de la mise en ligne</h2>
      <p>Un pré-mortem se tient avant de planifier. Le groupe imagine que la mise en ligne fictive a échoué, puis cherche les causes possibles, les signes précoces et les décisions à prendre.</p>
      <ol>
        <li>Poser la question&nbsp;: «&nbsp;la mise en ligne a échoué, pourquoi&nbsp;?&nbsp;»</li>
        <li>Écrire les échecs plausibles sans chercher un coupable.</li>
        <li>Associer un signe observable, une parade et un propriétaire.</li>
        <li>Choisir les décisions à prendre avant le jalon.</li>
      </ol>
      <h3>Trois échecs possibles</h3>
      <div className="pre-mortem-wrap">
        <table className="pre-mortem-table">
          <caption>Exemple fictif pour la refonte des Amis du Square.</caption>
          <thead>
            <tr>
              <th scope="col">Échec imaginé</th>
              <th scope="col">Signe précoce</th>
              <th scope="col">Parade</th>
              <th scope="col">Décision</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photos absentes à la mise en ligne</td>
              <td>Photos non reçues à J-5</td>
              <td>Jeu local de rechange et relance écrite</td>
              <td>Reporter la page agenda</td>
            </tr>
            <tr>
              <td>Notice des bénévoles absente</td>
              <td>Relecture non faite à J-2</td>
              <td>Atelier court et modèle de notice</td>
              <td>Bloquer la mise en ligne</td>
            </tr>
            <tr>
              <td>Hébergeur indisponible</td>
              <td>Alerte de disponibilité</td>
              <td>Sauvegarde récente et contact incident</td>
              <td>Activer le plan de reprise</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Décisions à prendre</h3>
      <ul>
        <li>Nommer un propriétaire pour chaque risque majeur.</li>
        <li>Fixer un déclencheur observable, pas une inquiétude vague.</li>
        <li>Décider à l’avance qui peut reporter la mise en ligne.</li>
      </ul>
      <p><a href="#exercice">Mettre le pré-mortem en pratique</a></p>
    </section>
  );
}

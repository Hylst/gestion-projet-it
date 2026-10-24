// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m3-ex1"
      titre={'Exercice 1\u00A0: choisir entre V et cascade sur trois cas fictifs'}
      enonce={(
        <p>Pour 3 cas fictifs (site vitrine figé, demande peu détaillée, besoin médical fictif à contraintes fortes), dis si V ou cascade convient, avec motif et limite.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Cas 1&nbsp;:</strong> cascade possible (besoin stable, petit périmètre)&nbsp;; limite&nbsp;: tout changement tardif coûte une reprise de phase.</li>
          <li><strong>Cas 2&nbsp;:</strong> ni V ni cascade adaptés seuls (besoin flou)&nbsp;; limite&nbsp;: ni l’une ni l’autre seules, cadrer d’abord par maquette ou par lot court.</li>
          <li><strong>Cas 3&nbsp;:</strong> cycle en V pertinent (traces et tests attendus)&nbsp;; limite&nbsp;: lourdeur documentaire à calibrer.</li>
        </ul>
      )}
      methode={[
        'Le besoin contrôle la méthode, pas l’inverse.',
        'Limite écrite, jamais cachée.',
        'Pas de dogme, motif écrit à chaque cas.',
      ]}
    />
    <ExerciseBlock
      id="m3-ex2"
      titre={'Exercice 2\u00A0: choisir entre cascade et agile sur un cas dédié'}
      enonce={(
        <p>L’association fictive hésite entre cascade (tout figer puis livrer) et agile (livrer par tranches avec retours). Tranche avec motif et propose 1 parade si le besoin bouge.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Tranche possible&nbsp;:</strong> agile si le contenu fictif hésite encore (agenda, galerie)&nbsp;; cascade si le contenu est figé et la date contrainte.</li>
          <li><strong>Parade&nbsp;:</strong> jalon de relecture figé en cascade, ou tranche 1 courte en agile avec revue.</li>
          <li><strong>Motif attendu&nbsp;:</strong> la stabilité du besoin et la capacité à accueillir des retours, pas de dogme.</li>
        </ul>
      )}
      methode={[
        'Écris le motif avant le verdict.',
        'Prévois la parade du besoin qui bouge.',
        'Aucun dogme, on compare sur le fil rouge.',
      ]}
    />
    <ExerciseBlock
      id="m3-ex3"
      titre={'Exercice 3\u00A0: écrire trois critères d’acceptation'}
      enonce={(
        <p>Pour la page agenda fictive, écris trois critères d’acceptation observables et testables. Indique qui fait la recette et quelle preuve est gardée.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Critère 1&nbsp;:</strong> un bénévole crée un événement avec un titre, une date et un lieu&nbsp;; l’événement apparaît dans la liste.</li>
          <li><strong>Critère 2&nbsp;:</strong> un champ obligatoire manquant affiche un message explicite et l’enregistrement est refusé.</li>
          <li><strong>Critère 3&nbsp;:</strong> un événement modifié ou supprimé disparaît de la liste et de la page publique.</li>
          <li><strong>Recette&nbsp;:</strong> le bureau et un bénévole testent sur un jeu fictif&nbsp;; une capture datée ou un compte rendu sert de preuve.</li>
          <li><strong>Méthode&nbsp;:</strong> critère observable, testable et accepté avant la réalisation.</li>
        </ul>
      )}
      methode={[
        'Un critère se constate, il ne s’interprète pas.',
        'Écris le critère avant de réaliser.',
        'Garde une preuve de la recette.',
      ]}
    />
    <ExerciseBlock
      id="m3-transfert"
      titre={'Exercice de transfert\u00A0: choisir une méthode pour une obligation de traçabilité'}
      enonce={(
        <div>
          <p>La mairie fictive exige des preuves de recette. Choisis entre cascade, cycle en V et tranches, puis écris deux critères de sortie.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Choix&nbsp;:</strong> cycle en V si le besoin est stable et les preuves sont exigées&nbsp;; cascade si le périmètre reste simple&nbsp;; tranches avec preuves datées si le besoin bouge encore.</p>
          <p><strong>Critères de sortie&nbsp;:</strong> chaque exigence a un test associé&nbsp;; la recette est signée par le bureau et la mairie.</p>
        </div>
      )}
      methode={[
        'Choisir selon la stabilité du besoin.',
        'Écrire les preuves avant la réalisation.',
        'Faire signer la recette au bon niveau.',
      ]}
    />
  </div>
);

export default Exercices;

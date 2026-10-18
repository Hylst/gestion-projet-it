import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m3-ex1"
      titre="Exercice 1 : 3 cas fictifs, V ou cascade ?"
      enonce={(
        <p>Pour 3 cas fictifs (site vitrine fige, demande peu detaillee, besoin medical fictif a contraintes fortes), dis si V ou cascade convient, avec motif et limite.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Cas 1 :</strong> cascade possible (besoin stable, petit perimetre) ; limite : tout changement tardif coute une reprise de phase.</li>
          <li><strong>Cas 2 :</strong> ni V ni cascade adaptes seuls (besoin flou) ; limite : ni l une ni l autre seules, cadrer d abord par maquette ou par lot court.</li>
          <li><strong>Cas 3 :</strong> cycle en V pertinent (traces et tests attendus) ; limite : lourdeur documentaire a calibrer.</li>
        </ul>
      )}
      methode={[
        'Le besoin controle la methode, pas l inverse.',
        'Limite ecrite, jamais cachee.',
        'Pas de dogme, motif ecrit a chaque cas.',
      ]}
    />
    <ExerciseBlock
      id="m3-ex2"
      titre="Exercice 2 dedie demande : cascade ou agile ?"
      enonce={(
        <p>L association fictive hesite entre cascade (tout figer puis livrer) et agile (livrer par tranches avec retours). Tranche avec motif et propose 1 parade si le besoin bouge.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Tranche possible :</strong> agile si le contenu fictif hesite encore (agenda, galerie) ; cascade si le contenu est fige et la date contrainte.</li>
          <li><strong>Parade :</strong> jalon de relecture fige en cascade, ou tranche 1 courte en agile avec revue.</li>
          <li><strong>Motif attendu :</strong> la stabilite du besoin et la capacite a accueillir des retours, pas de dogme.</li>
        </ul>
      )}
      methode={[
        'Ecris le motif avant le verdict.',
        'Prevois la parade du besoin qui bouge.',
        'Aucun dogme, on compare sur le fil rouge.',
      ]}
    />
  </div>
);

export default Exercices;

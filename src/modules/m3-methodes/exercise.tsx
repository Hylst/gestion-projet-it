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
  </div>
);

export default Exercices;

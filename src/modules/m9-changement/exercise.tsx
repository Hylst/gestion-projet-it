import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m9-ex1"
      titre={'Exercice 1\u00A0: lire trois freins'}
      enonce={(
        <p>Pour les bénévoles, les usagers et le bureau fictifs, identifie un frein probable et une réponse courte.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Bénévoles&nbsp;:</strong> geste inconnu&nbsp;; formation courte et relais de proximité.</li>
          <li><strong>Usagers&nbsp;:</strong> information manquante&nbsp;; message simple et répété.</li>
          <li><strong>Bureau&nbsp;:</strong> consignes contradictoires&nbsp;; message unique et clarification en réunion courte.</li>
          <li><strong>Méthode&nbsp;:</strong> écouter le signe avant de choisir le levier.</li>
        </ul>
      )}
      methode={[
        'Un frein, un signe observable',
        'Choisir le levier après le signe',
        'Répondre sans nier',
      ]}
    />
    <ExerciseBlock
      id="m9-ex2"
      titre={'Exercice 2\u00A0: préparer un plan d’adoption court'}
      enonce={(
        <p>Rédige un plan d’adoption pour la mise en ligne du site fictif&nbsp;: relais, formation, message, suivi.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Relais&nbsp;:</strong> deux bénévoles volontaires, avec un temps dédié fictif.</li>
          <li><strong>Formation&nbsp;:</strong> une courte séance sur la mise à jour de l’agenda.</li>
          <li><strong>Message&nbsp;:</strong> une phrase simple, répétée sur deux supports.</li>
          <li><strong>Suivi&nbsp;:</strong> questions en réunion courte et usages observés au jalon.</li>
        </ul>
      )}
      methode={[
        'Un plan court et daté',
        'Un relais disponible',
        'Un suivi observable',
      ]}
    />
    <ExerciseBlock
      id="m9-transfert"
      titre={'Exercice de transfert\u00A0: relancer une adoption qui stagne'}
      enonce={(
        <div>
          <p>Deux semaines après la formation, les bénévoles fictifs reviennent à l’ancien agenda. Identifie un signe, un frein et deux leviers.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Signe&nbsp;:</strong> saisies anciennes et questions répétées.</p>
          <p><strong>Frein&nbsp;:</strong> habitude et geste peu pratiqué.</p>
          <p><strong>Leviers&nbsp;:</strong> relais de proximité et formation courte sur un geste précis, avec un message unique. Mesure&nbsp;: usages observés au jalon.</p>
        </div>
      )}
      methode={[
        'Lire le signe avant le levier.',
        'Choisir un geste précis.',
        'Mesurer l’usage réel, pas la présence.',
      ]}
    />
  </div>
);

export default Exercices;

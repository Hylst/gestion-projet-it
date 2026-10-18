import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m9-ex1"
      titre="Exercice 1 : lire trois freins"
      enonce={(
        <p>Pour les benevoles, les usagers et le bureau fictifs, identifie un frein probable et une reponse courte.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Benevoles :</strong> geste inconnu ; formation courte et relais de proximite.</li>
          <li><strong>Usagers :</strong> information manquante ; message simple et repete.</li>
          <li><strong>Bureau :</strong> consignes contradictoires ; message unique et clarification en reunion courte.</li>
          <li><strong>Methode :</strong> ecouter le signe avant de choisir le levier.</li>
        </ul>
      )}
      methode={[
        'Un frein, un signe observable',
        'Choisir le levier apres le signe',
        'Repondre sans nier',
      ]}
    />
    <ExerciseBlock
      id="m9-ex2"
      titre="Exercice 2 : plan d adoption court"
      enonce={(
        <p>Redige un plan d adoption pour la mise en ligne du site fictif : relais, formation, message, suivi.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Relais :</strong> deux benevoles volontaires, avec un temps dedie fictif.</li>
          <li><strong>Formation :</strong> une courte seance sur la mise a jour de l agenda.</li>
          <li><strong>Message :</strong> une phrase simple, repetee sur deux supports.</li>
          <li><strong>Suivi :</strong> questions en reunion courte et usages observes au jalon.</li>
        </ul>
      )}
      methode={[
        'Un plan court et date',
        'Un relais disponible',
        'Un suivi observable',
      ]}
    />
  </div>
);

export default Exercices;

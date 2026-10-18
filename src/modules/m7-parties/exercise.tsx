import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m7-ex1"
      titre="Exercice 1 : qualifier trois parties prenantes"
      enonce={(
        <p>Pour le bureau fictif, les benevoles et les usagers du quartier, indique pouvoir et interet, puis un canal adapte avec son rythme.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Bureau :</strong> pouvoir fort, interet fort ; point court mensuel et compte rendu.</li>
          <li><strong>Benevoles :</strong> pouvoir moyen, interet fort ; message court et tableau des taches.</li>
          <li><strong>Usagers :</strong> pouvoir faible, interet fort ; affiche et page d actualites.</li>
          <li><strong>Methode :</strong> choisir le canal apres le besoin, pas avant.</li>
        </ul>
      )}
      methode={[
        'Qualifier avant de choisir',
        'Un canal par besoin',
        'Un rythme realiste',
      ]}
    />
    <ExerciseBlock
      id="m7-ex2"
      titre="Exercice 2 : plan de communication de mise en ligne"
      enonce={(
        <p>Redige un plan court pour la mise en ligne du site fictif : destinataires, messages, moments, canaux.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Bureau :</strong> point de validation avant la mise en ligne, par reunion courte.</li>
          <li><strong>Benevoles :</strong> consignes de publication, par message et tableau des taches.</li>
          <li><strong>Usagers :</strong> annonce de la nouvelle page, par affiche et page d actualites.</li>
          <li><strong>Financeur et mairie :</strong> courriel formel apres la mise en ligne, avec date et bilan court.</li>
        </ul>
      )}
      methode={[
        'Qui, quoi, quand, canal',
        'Un message par besoin',
        'Prevoir la suite apres le jalon',
      ]}
    />
  </div>
);

export default Exercices;

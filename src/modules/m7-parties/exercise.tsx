import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m7-ex1"
      titre={'Exercice 1\u00A0: qualifier trois parties prenantes'}
      enonce={(
        <p>Pour le bureau fictif, les bénévoles et les usagers du quartier, indique pouvoir et intérêt, puis un canal adapté avec son rythme.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Bureau&nbsp;:</strong> pouvoir fort, intérêt fort&nbsp;; point court mensuel et compte rendu.</li>
          <li><strong>Bénévoles&nbsp;:</strong> pouvoir moyen, intérêt fort&nbsp;; message court et tableau des tâches.</li>
          <li><strong>Usagers&nbsp;:</strong> pouvoir faible, intérêt fort&nbsp;; affiche et page d’actualités.</li>
          <li><strong>Méthode&nbsp;:</strong> choisir le canal après le besoin, pas avant.</li>
        </ul>
      )}
      methode={[
        'Qualifier avant de choisir',
        'Un canal par besoin',
        'Un rythme réaliste',
      ]}
    />
    <ExerciseBlock
      id="m7-ex2"
      titre={'Exercice 2\u00A0: plan de communication de mise en ligne'}
      enonce={(
        <p>Rédige un plan court pour la mise en ligne du site fictif&nbsp;: destinataires, messages, moments, canaux.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Bureau&nbsp;:</strong> point de validation avant la mise en ligne, par réunion courte.</li>
          <li><strong>Bénévoles&nbsp;:</strong> consignes de publication, par message et tableau des tâches.</li>
          <li><strong>Usagers&nbsp;:</strong> annonce de la nouvelle page, par affiche et page d’actualités.</li>
          <li><strong>Financeur et mairie&nbsp;:</strong> courriel formel après la mise en ligne, avec date et bilan court.</li>
        </ul>
      )}
      methode={[
        'Qui, quoi, quand, canal',
        'Un message par besoin',
        'Prévoir la suite après le jalon',
      ]}
    />
  </div>
);

export default Exercices;

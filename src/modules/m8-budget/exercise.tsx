import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m8-ex1"
      titre={'Exercice 1\u00A0: chiffrer trois lots'}
      enonce={(
        <p>Pour les pages, l’agenda et le formulaire fictifs, écris les hypothèses puis une fourchette par lot.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Pages&nbsp;:</strong> contenu proche de l’existant, fourchette resserrée.</li>
          <li><strong>Agenda&nbsp;:</strong> catégories à valider, fourchette moyenne avec provision.</li>
          <li><strong>Formulaire&nbsp;:</strong> outil du prestataire fictif à tester, fourchette large et provision forte.</li>
          <li><strong>Méthode&nbsp;:</strong> hypothèses d’abord, montants ensuite.</li>
        </ul>
      )}
      methode={[
        'Une hypothèse par lot',
        'Trois points par fourchette',
        'Provision explicite',
      ]}
    />
    <ExerciseBlock
      id="m8-ex2"
      titre={'Exercice 2\u00A0: lire un écart'}
      enonce={(
        <p>Un lot fictif dépasse le budget prévu. Écris trois causes possibles et une action pour chacune.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Cause 1&nbsp;:</strong> hypothèse de temps trop basse&nbsp;; action&nbsp;: revoir le reste à faire.</li>
          <li><strong>Cause 2&nbsp;:</strong> contenu ajouté&nbsp;; action&nbsp;: arbitrer le périmètre avec le bureau fictif.</li>
          <li><strong>Cause 3&nbsp;:</strong> prestataire fictif plus cher&nbsp;; action&nbsp;: comparer une option ou renégocier le lot.</li>
        </ul>
      )}
      methode={[
        'Chercher la cause avant l’action',
        'Distinguer périmètre et prix',
        'Décider avec le commanditaire',
      ]}
    />
    <ExerciseBlock
      id="m8-transfert"
      titre={'Exercice de transfert\u00A0: chiffrer un lot incertain'}
      enonce={(
        <div>
          <p>Le formulaire de contact fictif dépend d’un prestataire qui change d’outil. Écris deux hypothèses, une fourchette et une provision.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Hypothèses&nbsp;:</strong> intégration testée, disponibilité du prestataire, relecture du formulaire.</p>
          <p><strong>Fourchette&nbsp;:</strong> optimiste, probable, pessimiste, avec les bornes expliquées.</p>
          <p><strong>Provision&nbsp;:</strong> forte pour l’inconnue reconnue&nbsp;; l’oubli de notice reste hors provision et entre dans le périmètre.</p>
        </div>
      )}
      methode={[
        'Écrire les hypothèses avant le montant.',
        'Donner trois points, pas un chiffre seul.',
        'Garder la provision pour l’inconnu reconnu.',
      ]}
    />
  </div>
);

export default Exercices;

import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m8-ex1"
      titre="Exercice 1 : chiffrer trois lots"
      enonce={(
        <p>Pour les pages, l agenda et le formulaire fictifs, ecris les hypotheses puis une fourchette par lot.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Pages :</strong> contenu proche de l existant, fourchette resserree.</li>
          <li><strong>Agenda :</strong> categories a valider, fourchette moyenne avec provision.</li>
          <li><strong>Formulaire :</strong> outil du prestataire fictif a tester, fourchette large et provision forte.</li>
          <li><strong>Methode :</strong> hypotheses d abord, montants ensuite.</li>
        </ul>
      )}
      methode={[
        'Une hypothese par lot',
        'Trois points par fourchette',
        'Provision explicite',
      ]}
    />
    <ExerciseBlock
      id="m8-ex2"
      titre="Exercice 2 : lire un ecart"
      enonce={(
        <p>Un lot fictif depasse le budget prevu. Ecris trois causes possibles et une action pour chacune.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Cause 1 :</strong> hypothese de temps trop basse ; action : revoir le reste a faire.</li>
          <li><strong>Cause 2 :</strong> contenu ajoute ; action : arbitrer le perimetre avec le bureau fictif.</li>
          <li><strong>Cause 3 :</strong> prestataire fictif plus cher ; action : comparer une option ou renegocier le lot.</li>
        </ul>
      )}
      methode={[
        'Chercher la cause avant l action',
        'Distinguer perimetre et prix',
        'Decider avec le commanditaire',
      ]}
    />
  </div>
);

export default Exercices;

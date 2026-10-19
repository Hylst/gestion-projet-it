import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m6-ex1"
      titre={'Exercice 1\u00A0: trier et préparer un ordre du jour'}
      enonce={(
        <p>Classe 2 tâches fictives avec Eisenhower avec motif et écris l’ordre du jour de rétro en 4 points pour le site fictif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Classement attendu avec motif, urgent et important séparés.</strong></li>
          <li><strong>Ordre du jour fictif&nbsp;:</strong> ce qui a aidé, ce qui a gêné, 1 action concrète, qui la porte avec échéance fictive.</li>
          <li><strong>Méthode&nbsp;:</strong> 1 action à la fois, responsable nommé parmi les rôles fictifs.</li>
        </ul>
      )}
      methode={[
        'Urgent différent d’important',
        'Rétro = 1 action attribuée',
        'Cherche des indicateurs simples',
      ]}
    />
    <ExerciseBlock
      id="m6-ex2"
      titre={'Exercice 2\u00A0: tenir un registre des risques'}
      enonce={(
        <p>Pour 3 risques fictifs fournis, place-les sur la matrice probabilité x impact fictive et propose 1 parade par risque majeur.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Priorités lues sur la matrice fictive</strong> (impact fort et probabilité forte en premier).</li>
          <li><strong>Parades simples&nbsp;:</strong> rechange, délai tampon fictif, simplification du périmètre fictif.</li>
          <li><strong>Suivi par indicateurs simples&nbsp;:</strong> tâches finies, blocages, date fictive tenue.</li>
        </ul>
      )}
      methode={[
        'Poids\u00A0: probabilité x impact',
        'Parade pour chaque risque majeur',
        'Indicateurs simples pour entretenir la vigilance',
      ]}
    />
  </div>
);

export default Exercices;

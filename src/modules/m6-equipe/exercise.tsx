import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m6-ex1"
      titre="Exercice 1 : tri et ordre du jour"
      enonce={(
        <p>Classe 2 taches fictives avec Eisenhower avec motif et ecris l ordre du jour de retro en 4 points pour le site fictif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Classement attendu avec motif, urgent et important separes.</strong></li>
          <li><strong>Ordre du jour fictif :</strong> ce qui a aide, ce qui a gene, 1 action concrete, qui la porte avec echeance fictive.</li>
          <li><strong>Methode :</strong> 1 action a la fois, responsable nomme parmi les roles fictifs.</li>
        </ul>
      )}
      methode={[
        'Urgent different d important',
        'Retro = 1 action attribuee',
        'Cherche des indicateurs simples',
      ]}
    />
    <ExerciseBlock
      id="m6-ex2"
      titre="Exercice 2 : registre des risques"
      enonce={(
        <p>Pour 3 risques fictifs fournis, place-les sur la matrice probabilite x impact fictive et propose 1 parade par risque majeur.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Priorites lues sur la matrice fictive</strong> (impact fort et probabilite forte en premier).</li>
          <li><strong>Parades simples :</strong> rechange, delai tampon fictif, simplification du perimetre fictif.</li>
          <li><strong>Suivi par indicateurs simples :</strong> taches finies, blocages, date fictive tenue.</li>
        </ul>
      )}
      methode={[
        'Poids : probabilite x impact',
        'Parade pour chaque risque majeur',
        'Indicateurs simples pour entretenir la vigilance',
      ]}
    />
  </div>
);

export default Exercices;

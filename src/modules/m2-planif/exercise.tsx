import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m2-ex1"
      titre="Exercice 1 : lire la chaine tendue"
      enonce={(
        <p>Avec 5 taches fictives et leurs dependances fournies dans l enonce (durees fictives fixees pour l exercice), cite la chaine tendue, 2 risques de delai et 1 action.</p>
      )}
      corrige={(
        <div>
          <p><strong>Chaine tendue :</strong> relecture, maquette, integration, tests (suite sans marge fictive).</p>
          <p><strong>2 risques :</strong> relecture tardive ; tests repousses par manque de benevole fictif.</p>
          <p><strong>1 action :</strong> figer la relecture a une date fictive et preparer un benevole de rechange fictif.</p>
        </div>
      )}
      methode={[
        'Suivre les fleches des dependances.',
        'Reperer la suite de taches sans marge.',
        'Imaginer 2 retards probables.',
        'Choisir 1 action qui protege la chaine.',
      ]}
    />
    <ExerciseBlock
      id="m2-ex2"
      titre="Exercice 2 : lever un conflit dans un GANTT"
      enonce={(
        <p>Lis le GANTT fictif fourni (5 barres, 1 chevauchement interdit entre integration et tests). Propose 1 deplacement qui leve le conflit sans toucher aux jalons fictifs.</p>
      )}
      corrige={(
        <div>
          <p><strong>Deplacement :</strong> decaler les tests apres la fin de l integration fictive, garder les jalons, noter le nouveau flottement de la tache deplacee.</p>
        </div>
      )}
      methode={[
        'Reperer le chevauchement interdit.',
        'Ne deplacer qu une barre a la fois.',
        'Relire les dependances apres chaque deplacement.',
        'Noter le nouveau flottement de la tache deplacee.',
      ]}
    />
  </div>
);

export default Exercices;

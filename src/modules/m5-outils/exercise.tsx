import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m5-ex1"
      titre="Exercice 1 : 3 situations, quel type d outil ?"
      enonce={(
        <p>Pour 3 situations fictives (equipe dispersee, regressions frequentes, demo fragile sur postes differents), choisis un type d outil avec motif et limite, sans verdict definitif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Situation 1 :</strong> outil de suivi partage, motif : trace et assignation, limite : a renseigner sinon inutile.</li>
          <li><strong>Situation 2 :</strong> chaine CI avec tests a chaque changement fictif, motif : detecter tot, limite : tests a entretenir.</li>
          <li><strong>Situation 3 :</strong> environnement reproductible fictif, motif : meme poste partout, limite : image a maintenir.</li>
        </ul>
      )}
      methode={[
        'Phrase de besoin avant l outil',
        'Motif et limite a chaque choix',
        'Aucun verdict definitif, jamais',
      ]}
    />
    <ExerciseBlock
      id="m5-ex2"
      titre="Exercice 2 : ou placer la chaine CI"
      enonce={(
        <p>Ordonner 4 etapes fictives (test, assemblage, relecture, deploiement fictif) et dis ou placer un controle qualite simple.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Ordre attendu :</strong> test, assemblage, relecture, deploiement fictif.</li>
          <li><strong>Controle :</strong> place avant deploiement, avec critere simple (tests au vert et relecture faite).</li>
          <li><strong>Methode :</strong> si la relecture echoue, retour avant deploiement.</li>
        </ul>
      )}
      methode={[
        'Ordre avant depot',
        'Reperer le critere de controle avant le deploiement',
      ]}
    />
  </div>
);

export default Exercices;

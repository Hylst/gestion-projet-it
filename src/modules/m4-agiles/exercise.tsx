import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m4-ex1"
      titre="Exercice 1 : user stories et choix de methode"
      enonce={(
        <p>Ecris 3 user stories correctes pour le site fictif (qui, quoi, pourquoi) puis choisis Scrum ou Kanban pour 2 cas fictifs avec motif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Stories :</strong> au format qui, quoi, pourquoi, avec critere simple (exemple fictif : en tant que visiteur fictif, je veux voir l agenda fictif pour connaitre les dates).</li>
          <li><strong>Cas A (contenu evolutif, priorites) :</strong> Scrum pertinent, limites rappelees (besoin de disponibilite).</li>
          <li><strong>Cas B (demandes au fil de l eau) :</strong> Kanban pertinent, limites rappelees (WIP a tenir).</li>
        </ul>
      )}
      methode={[
        'Format qui/quoi/pourquoi',
        'Un critere de fini par story',
        'Motif et limite pour chaque choix de methode',
      ]}
    />
    <ExerciseBlock
      id="m4-ex2"
      titre="Exercice 2 : tableau bloque"
      enonce={(
        <p>Sur un tableau fictif bloque (3 cartes en En cours pour une limite fictive de 2), propose 2 actions Lean et 1 pratique XP liee a la qualite, sans changer l outil de suivi.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Premiere action :</strong> finir une carte avant d en commencer une nouvelle.</li>
          <li><strong>Deuxieme action :</strong> reduire la taille des cartes.</li>
          <li><strong>XP (qualite) :</strong> relecture croisee et tests frequents avant de passer en A relire.</li>
          <li>Lien vers module 5 : ces tests alimentent la chaine CI simplifiee.</li>
        </ul>
      )}
      methode={[
        'Observe la colonne qui depasse et pourquoi',
        'Cherche 2 actions de flux (Lean)',
        'Ajoute 1 pratique de qualite (XP)',
      ]}
    />
  </div>
);

export default Exercices;

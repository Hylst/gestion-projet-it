import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m4-ex1"
      titre={'Exercice 1\u00A0: écrire des user stories et choisir une méthode'}
      enonce={(
        <p>Écris 3 user stories correctes pour le site fictif (qui, quoi, pourquoi) puis choisis Scrum ou Kanban pour 2 cas fictifs avec motif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Stories&nbsp;:</strong> au format qui, quoi, pourquoi, avec critère simple (exemple fictif&nbsp;: en tant que visiteur fictif, je veux voir l’agenda fictif pour connaître les dates).</li>
          <li><strong>Cas A (contenu évolutif, priorités)&nbsp;:</strong> Scrum pertinent, limites rappelées (besoin de disponibilité).</li>
          <li><strong>Cas B (demandes au fil de l’eau)&nbsp;:</strong> Kanban pertinent, limites rappelées (WIP à tenir).</li>
        </ul>
      )}
      methode={[
        'Format qui/quoi/pourquoi',
        'Un critère de fini par story',
        'Motif et limite pour chaque choix de méthode',
      ]}
    />
    <ExerciseBlock
      id="m4-ex2"
      titre={'Exercice 2\u00A0: débloquer un tableau'}
      enonce={(
        <p>Sur un tableau fictif bloqué (3 cartes en En cours pour une limite fictive de 2), propose 2 actions Lean et 1 pratique XP liée à la qualité, sans changer l’outil de suivi.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Première action&nbsp;:</strong> finir une carte avant d’en commencer une nouvelle.</li>
          <li><strong>Deuxième action&nbsp;:</strong> réduire la taille des cartes.</li>
          <li><strong>XP (qualité)&nbsp;:</strong> relecture croisée et tests fréquents avant de passer en À relire.</li>
          <li>Lien vers module 5&nbsp;: ces tests alimentent la chaîne CI simplifiée.</li>
        </ul>
      )}
      methode={[
        'Observe la colonne qui dépasse et pourquoi',
        'Cherche 2 actions de flux (Lean)',
        'Intègre 1 pratique de qualité (XP)',
      ]}
    />
    <ExerciseBlock
      id="m4-transfert"
      titre={'Exercice de transfert\u00A0: débloquer un flux Kanban'}
      enonce={(
        <div>
          <p>Quatre cartes sont en revue pour une limite de deux. Décris deux actions sans augmenter la limite.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Actions&nbsp;:</strong> finir deux cartes avant d’en ouvrir d’autres, réduire la taille des cartes et organiser une revue courte à deux.</p>
          <p><strong>Vigilance&nbsp;:</strong> augmenter la limite masque le goulet au lieu de le traiter.</p>
        </div>
      )}
      methode={[
        'Finir avant d’ouvrir.',
        'Réduire la taille des cartes.',
        'Rendre le goulet visible et discutable.',
      ]}
    />
  </div>
);

export default Exercices;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m2-ex1"
      titre={'Exercice 1\u00A0: lire la chaîne tendue'}
      enonce={(
        <p>Avec 5 tâches fictives et leurs dépendances fournies dans l’énoncé (durées fictives fixées pour l’exercice), cite la chaîne tendue, 2 risques de délai et 1 action.</p>
      )}
      corrige={(
        <div>
          <p><strong>Chaîne tendue&nbsp;:</strong> relecture, maquette, intégration, tests (suite sans marge fictive).</p>
          <p><strong>2 risques&nbsp;:</strong> relecture tardive&nbsp;; tests repoussés par manque de bénévole fictif.</p>
          <p><strong>1 action&nbsp;:</strong> figer la relecture à une date fictive et préparer un bénévole de rechange fictif.</p>
        </div>
      )}
      methode={[
        'Suivre les flèches des dépendances.',
        'Repérer la suite de tâches sans marge.',
        'Imaginer 2 retards probables.',
        'Choisir 1 action qui protège la chaîne.',
      ]}
    />
    <ExerciseBlock
      id="m2-ex2"
      titre={'Exercice 2\u00A0: lever un conflit dans un GANTT'}
      enonce={(
        <p>Lis le GANTT fictif fourni (5 barres, 1 chevauchement interdit entre intégration et tests). Propose 1 déplacement qui lève le conflit sans toucher aux jalons fictifs.</p>
      )}
      corrige={(
        <div>
          <p><strong>Déplacement&nbsp;:</strong> décaler les tests après la fin de l’intégration fictive, garder les jalons, noter le nouveau flottement de la tâche déplacée.</p>
        </div>
      )}
      methode={[
        'Repérer le chevauchement interdit.',
        'Ne déplacer qu’une barre à la fois.',
        'Relire les dépendances après chaque déplacement.',
        'Noter le nouveau flottement de la tâche déplacée.',
      ]}
    />
    <ExerciseBlock
      id="m2-transfert"
      titre={'Exercice de transfert\u00A0: replanifier après un retard de photos'}
      enonce={(
        <div>
          <p>Les photos fictives arrivent avec cinq jours de retard. Déplace une seule barre, relis les dépendances et indique la nouvelle chaîne tendue.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Déplacement&nbsp;:</strong> décaler la relecture des contenus, puis l’intégration si elle dépend encore des textes.</p>
          <p><strong>Chaîne tendue&nbsp;:</strong> contenu, relecture, intégration, recette. Les tests ne bougent pas sans vérifier leur prédécesseur.</p>
          <p><strong>Message au bureau&nbsp;:</strong> date de mise en ligne décalée de cinq jours, avec la décision de prioriser l’agenda.</p>
        </div>
      )}
      methode={[
        'Déplacer une barre à la fois.',
        'Relire prédécesseurs et successeurs.',
        'Annoncer la nouvelle date avec sa cause.',
      ]}
    />
  </div>
);

export default Exercices;

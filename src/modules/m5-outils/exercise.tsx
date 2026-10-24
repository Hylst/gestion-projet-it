// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ExerciseBlock } from '../../components/ExerciseBlock';

export const Exercices = () => (
  <div id="exercice">
    <ExerciseBlock
      id="m5-ex1"
      titre={'Exercice 1\u00A0: choisir un type d’outil pour trois situations'}
      enonce={(
        <p>Pour 3 situations fictives (équipe dispersée, régressions fréquentes, démo fragile sur postes différents), choisis un type d’outil avec motif et limite, sans verdict définitif.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Situation 1&nbsp;:</strong> outil de suivi partagé, motif&nbsp;: trace et assignation, limite&nbsp;: à renseigner sinon inutile.</li>
          <li><strong>Situation 2&nbsp;:</strong> chaîne CI avec tests à chaque changement fictif, motif&nbsp;: détecter tôt, limite&nbsp;: tests à entretenir.</li>
          <li><strong>Situation 3&nbsp;:</strong> environnement reproductible fictif, motif&nbsp;: même poste partout, limite&nbsp;: image à maintenir.</li>
        </ul>
      )}
      methode={[
        'Phrase de besoin avant l’outil',
        'Motif et limite à chaque choix',
        'Aucun verdict définitif, jamais',
      ]}
    />
    <ExerciseBlock
      id="m5-ex2"
      titre={'Exercice 2\u00A0: placer la chaîne CI'}
      enonce={(
        <p>Ordonner 4 étapes fictives (test, assemblage, relecture, déploiement fictif) et dis où placer un contrôle qualité simple.</p>
      )}
      corrige={(
        <ul>
          <li><strong>Ordre attendu&nbsp;:</strong> test, assemblage, relecture, déploiement fictif.</li>
          <li><strong>Contrôle&nbsp;:</strong> placé avant déploiement, avec critère simple (tests au vert et relecture faite).</li>
          <li><strong>Méthode&nbsp;:</strong> si la relecture échoue, retour avant déploiement.</li>
        </ul>
      )}
      methode={[
        'Ordre avant dépôt',
        'Repérer le critère de contrôle avant le déploiement',
      ]}
    />
    <ExerciseBlock
      id="m5-transfert"
      titre={'Exercice de transfert\u00A0: réparer une chaîne CI rouge'}
      enonce={(
        <div>
          <p>Un test fictif échoue une fois sur trois et un secret apparaît dans les logs. Décide quoi retirer, quoi stabiliser et quoi bloquer.</p>
        </div>
      )}
      corrige={(
        <div>
          <p><strong>Retirer&nbsp;:</strong> le secret des logs, puis le révoquer et le placer dans un coffre adapté.</p>
          <p><strong>Stabiliser&nbsp;:</strong> le test instable, ou le supprimer avec une date de retour.</p>
          <p><strong>Bloquer&nbsp;:</strong> la fusion tant que la chaîne échoue, en gardant la relecture humaine.</p>
        </div>
      )}
      methode={[
        'Traiter le secret avant le reste.',
        'Ne pas tolérer une CI rouge.',
        'Garder une relecture humaine.',
      ]}
    />
  </div>
);

export default Exercices;

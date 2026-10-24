// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

export function IaMethodesPage() {
  const meta = IA_PAGES[2];
  if (!meta) throw new Error('Page méthodes IA absente.');
  return (
    <IaLayout
      meta={meta}
      intro="Une sortie utile ne tombe pas d’un prompt miracle. Elle vient d’un besoin clair, d’un contexte choisi, d’un format vérifiable et d’une évaluation honnête."
      retenir={[
        'Un prompt se teste et se versionne comme un mode d’emploi.',
        'Le contexte et la source comptent avant la longueur du prompt.',
        'Un jeu de test vaut mieux qu’une impression générale.',
        'Un agent doit avoir des permissions limitées et un contrôle humain.',
      ]}
      checklist={[
        'J’ai écrit le besoin, le format et le critère de réussite.',
        'J’ai choisi les extraits et vérifié leur source.',
        'J’ai testé au moins cinq cas, dont un cas limite.',
        'J’ai prévu une validation humaine avant toute action.',
        'J’ai affiché la source et la date de chaque extrait.',
        'J’ai validé le schéma et le format de la sortie.',
        'J’ai limité les permissions de l’agent au strict nécessaire.',
        'J’ai consigné les corrections dans le journal du projet.',
      ]}
      sources={[SOURCES.nist, SOURCES.iso42001, SOURCES.oecd, SOURCES.cnil]}
    >
      <section id="prompt">
        <h2>Du besoin au prompt</h2>
        <p>Un prompt utile ne commence pas par une formule magique. Il décrit un besoin que l’équipe peut vérifier.</p>
        <ol>
          <li>
            <strong>Rôle.</strong> Le rôle attendu de l’assistant&nbsp;: relire, résumer, proposer des tests ou préparer une trame.
          </li>
          <li>
            <strong>Objectif.</strong> Le résultat à produire, en une phrase. Un objectif flou produit une sortie floue.
          </li>
          <li>
            <strong>Contexte.</strong> Les faits, les contraintes et les documents utiles, sans données sensibles inutiles.
          </li>
          <li>
            <strong>Contraintes.</strong> Le périmètre, les règles à respecter et ce que la réponse ne doit pas faire.
          </li>
          <li>
            <strong>Format.</strong> La forme attendue&nbsp;: tableau, liste, JSON, longueur et niveau de détail.
          </li>
          <li>
            <strong>Exemples.</strong> Un ou deux exemples de sortie attendue valent souvent mieux qu’une longue consigne.
          </li>
          <li>
            <strong>Critère de réussite.</strong> Ce qui permettra de dire que la réponse est utilisable&nbsp;: faits vérifiés, format respecté, points couverts.
          </li>
        </ol>
        <p>Itérez court&nbsp;: changez un élément à la fois et relisez la sortie avant d’ajouter de nouvelles consignes.</p>
        <p>Conservez les prompts utiles dans le journal du projet, avec leur date, la version de l’outil et le résultat obtenu.</p>
        <p>Un prompt de 2&nbsp;000 mots n’est pas plus précis qu’un exemple réussi. Quand un cas de référence suffit, montrez-le plutôt que de tout décrire.</p>
      </section>

      <section id="contexte">
        <h2>Recherche documentaire et RAG</h2>
        <p>La recherche documentaire, ou RAG, commence par une recherche d’extraits dans un corpus, puis injecte les passages retenus dans le contexte envoyé au modèle. Le modèle ne consulte pas le corpus&nbsp;: il lit ce que la recherche lui donne.</p>
        <p>Un corpus projet peut réunir des comptes rendus de réunion, des notes de cadrage et des normes internes. La qualité de la recherche compte avant la qualité de la génération&nbsp;: un extrait pertinent manquant ne se rattrape pas avec une belle formulation.</p>
        <p>Affichez toujours la source et la date de l’extrait. Une réponse sans référence se traite comme une hypothèse. <strong>Un RAG n’est pas une garantie de vérité.</strong></p>
        <IaCallout titre="Fil rouge" variante="fil">
          <p>Sur Les Amis du Square, un RAG sur les comptes rendus du bureau peut retrouver une décision passée&nbsp;; la source et la date restent visibles.</p>
        </IaCallout>
      </section>

      <section id="sortie">
        <h2>Sorties structurées et vérifiables</h2>
        <p>Une sortie vérifiable a une forme définie à l’avance. Un tableau, un JSON ou une checklist se contrôlent plus vite qu’un texte libre, à condition de fixer le schéma avant la génération.</p>
        <ul>
          <li>
            <strong>Tableau.</strong> Colonnes attendues, une ligne par élément, pas de cellule vide sans explication.
          </li>
          <li>
            <strong>JSON.</strong> Champs nommés, types stables, validation automatique quand c’est possible.
          </li>
          <li>
            <strong>Checklist.</strong> Points à cocher et critères d’acceptation explicites.
          </li>
          <li>
            <strong>Critères d’acceptation.</strong> Ce qui doit être vrai pour accepter la sortie, écrit avant l’essai.
          </li>
        </ul>
        <p>Séparez les faits, les hypothèses et les propositions. Un fait cite sa source, une hypothèse s’énonce comme telle, une proposition reste soumise à décision. Validez le schéma avant de lire le contenu, puis gardez une trace de la source utilisée.</p>
      </section>

      <section id="evaluation">
        <h2>Évaluation et jeu de test</h2>
        <p>Évaluez sur un jeu de 10 à 30 cas représentatifs du travail réel, pas sur une démonstration choisie. Le jeu inclut des cas simples, des cas limites et au moins un cas où l’outil devrait refuser ou demander une précision.</p>
        <p>Les critères restent séparés&nbsp;: exactitude, complétude, format, ton, sécurité. Une relecture à l’aveugle, sans savoir quelle version a produit quelle sortie, limite les biais. Tenez un journal des corrections et mesurez le temps gagné comme le temps de reprise.</p>
        <p>Ne résumez pas la qualité à une note unique. Un score global masque les écarts&nbsp;: une sortie rapide mais fausse n’est pas un progrès.</p>
        <div className="ia-table-wrap">
          <table>
            <caption>Grille d’évaluation</caption>
            <thead>
              <tr>
                <th scope="col">Critère</th>
                <th scope="col">Question</th>
                <th scope="col">Trace attendue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Exactitude</th>
                <td>Le fait est-il vrai et sourcé&nbsp;?</td>
                <td>Lien ou extrait vérifiable</td>
              </tr>
              <tr>
                <th scope="row">Complétude</th>
                <td>La réponse couvre-t-elle la demande&nbsp;?</td>
                <td>Liste des points demandés</td>
              </tr>
              <tr>
                <th scope="row">Format</th>
                <td>La sortie respecte-t-elle le schéma&nbsp;?</td>
                <td>Validation du format</td>
              </tr>
              <tr>
                <th scope="row">Ton</th>
                <td>Le message est-il adapté au public&nbsp;?</td>
                <td>Relecture humaine</td>
              </tr>
              <tr>
                <th scope="row">Sécurité</th>
                <td>Aucune donnée sensible n’est exposée&nbsp;?</td>
                <td>Contrôle des entrées et sorties</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="agents">
        <h2>Agents et automatisations</h2>
        <p>Un agent est un système qui enchaîne des étapes&nbsp;: lire des documents, appeler un outil, préparer une action, parfois écrire dans un service. Cette autonomie change le niveau de contrôle nécessaire.</p>
        <ul>
          <li>
            <strong>Lecture et écriture.</strong> Lire un fichier ou interroger une base n’a pas le même risque qu’envoyer un message, modifier un ticket ou supprimer un document.
          </li>
          <li>
            <strong>Permissions minimales.</strong> L’agent ne reçoit que les accès nécessaires à la tâche.
          </li>
          <li>
            <strong>Environnement isolé.</strong> Les essais se font hors des données et des services de production.
          </li>
          <li>
            <strong>Journal.</strong> Chaque appel, chaque décision et chaque résultat restent traçables.
          </li>
          <li>
            <strong>Validation humaine.</strong> Une action irréversible attend un accord explicite.
          </li>
        </ul>
        <p><strong>Un agent sans permission ni supervision est un risque.</strong></p>
      </section>

      <section id="rituel">
        <h2>Un rituel d’équipe</h2>
        <p>Une revue de 30 minutes, sur un cas réel, suffit pour garder le cap. L’équipe regarde ce qui a été produit, ce qui a été vérifié et ce qui a été décidé.</p>
        <ol>
          <li>
            <strong>Quel usage avons-nous fait de l’outil&nbsp;?</strong> La réponse décrit une tâche réelle, pas une intention.
          </li>
          <li>
            <strong>Quel contexte et quelles sources avons-nous donnés&nbsp;?</strong> Les extraits et leur date sont nommés.
          </li>
          <li>
            <strong>Quelle sortie a été produite et sous quel format&nbsp;?</strong> Le schéma ou la trame sont comparés à l’attendu.
          </li>
          <li>
            <strong>Comment l’avons-nous vérifiée&nbsp;?</strong> La relecture, les tests et les corrections sont cités.
          </li>
          <li>
            <strong>Garde-t-on cet usage ou l’arrête-t-on&nbsp;?</strong> La décision est prise en réunion, avec un responsable.
          </li>
        </ol>
        <p>Consignez la décision dans le journal du projet, partagez les prompts utiles et arrêtez un usage qui ne tient pas ses promesses. Un rituel court et régulier vaut mieux qu’une revue annuelle.</p>
      </section>
    </IaLayout>
  );
}

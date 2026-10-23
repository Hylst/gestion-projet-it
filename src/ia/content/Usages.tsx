import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

export function IaUsagesPage() {
  const meta = IA_PAGES[1];
  if (!meta) throw new Error('Page usages IA absente.');
  return (
    <IaLayout
      meta={meta}
      intro="L’IA n’a pas le même intérêt à toutes les étapes. Un brouillon utile au cadrage peut devenir un risque en production. Cette page propose des usages par phase, toujours accompagnés d’un point de contrôle."
      retenir={[
        'L’IA prépare des matières à décider, elle ne décide pas.',
        'Chaque phase a un livrable et un point de contrôle.',
        'Une sortie sans source reste une hypothèse.',
        'Le chef de projet garde la responsabilité du périmètre et des engagements.',
      ]}
      checklist={[
        'J’ai nommé la phase et le livrable concernés.',
        'J’ai vérifié les noms, les dates et les chiffres.',
        'J’ai relié la sortie à une source ou à un cas réel.',
        'J’ai défini le point de contrôle et la personne qui le réalise.',
        'J’ai comparé la proposition aux critères d’acceptation.',
        'J’ai noté ce qui relève de la décision et ce qui reste une hypothèse.',
        'J’ai gardé une trace de la sortie, de sa relecture et de sa validation.',
      ]}
      sources={[SOURCES.cnil, SOURCES.nist, SOURCES.oecd]}
    >
      <section id="cadrage">
        <h2>Cadrage et besoin</h2>
        <p>Le cadrage fixe le besoin et le périmètre. L’IA peut aider à poser les bonnes questions, à condition que le commanditaire confirme ce qui est retenu.</p>
        <h3>Usages utiles</h3>
        <ul>
          <li>Préparer les questions à poser aux parties prenantes.</li>
          <li>Reformuler le besoin dans vos propres mots pour vérifier la compréhension.</li>
          <li>Proposer une trame d’entretien pour recueillir les attentes.</li>
        </ul>
        <h3>Points de contrôle</h3>
        <ul>
          <li>Faire valider le besoin par le commanditaire.</li>
          <li>Confronter la reformulation aux parties prenantes.</li>
          <li>Vérifier que le périmètre est écrit et partagé.</li>
        </ul>
      </section>

      <section id="planification">
        <h2>Planification et découpage</h2>
        <p>La planification traduit le besoin en tâches, en charges et en dépendances. L’IA propose une matière à corriger, pas un planning validé.</p>
        <h3>Usages utiles</h3>
        <ul>
          <li>Proposer un découpage WBS à partir du périmètre validé.</li>
          <li>Chercher des oublis dans les lots et les dépendances.</li>
          <li>Explorer des scénarios de planning sous contraintes.</li>
        </ul>
        <h3>Points de contrôle</h3>
        <ul>
          <li>Vérifier les dépendances entre les tâches.</li>
          <li>Contrôler les charges avec l’équipe qui réalisera le travail.</li>
          <li>Expliciter les hypothèses de durée et de disponibilité.</li>
        </ul>
      </section>

      <section id="execution">
        <h2>Exécution et suivi</h2>
        <p>Pendant l’exécution, l’IA aide à mettre en forme les échanges et à suivre les actions. Les noms, les dates et les décisions se relisent sur les sources du projet.</p>
        <h3>Usages utiles</h3>
        <ul>
          <li>Résumer une réunion à partir de notes brutes.</li>
          <li>Préparer un ordre du jour à partir des sujets ouverts.</li>
          <li>Transformer des notes en actions datées et attribuées.</li>
        </ul>
        <h3>Points de contrôle</h3>
        <ul>
          <li>Relire les noms et les rôles cités.</li>
          <li>Vérifier les dates et les échéances.</li>
          <li>Confirmer les décisions auprès des personnes présentes.</li>
        </ul>
      </section>

      <section id="qualite">
        <h2>Qualité et tests</h2>
        <p>Les tests se définissent à partir des critères d’acceptation. L’IA peut proposer des cas, mais seule l’exécution réelle confirme le comportement.</p>
        <h3>Usages utiles</h3>
        <ul>
          <li>Générer des cas de test à partir des critères d’acceptation.</li>
          <li>Chercher des cas limites et des scénarios de défaillance.</li>
          <li>Relire une spécification pour repérer les ambiguïtés.</li>
        </ul>
        <h3>Points de contrôle</h3>
        <ul>
          <li>Exécuter les tests sur l’application réelle.</li>
          <li>Comparer les résultats aux critères d’acceptation.</li>
          <li>Faire confirmer les cas limites par une personne qui connaît le métier.</li>
        </ul>
      </section>

      <section id="communication">
        <h2>Communication et changement</h2>
        <p>La communication demande d’adapter un message sans trahir les faits. L’IA prépare une version, le responsable valide le ton et les engagements.</p>
        <h3>Usages utiles</h3>
        <ul>
          <li>Adapter un message au public visé.</li>
          <li>Préparer une FAQ à partir des questions déjà posées.</li>
          <li>Rédiger un message de changement à partir des faits du projet.</li>
        </ul>
        <h3>Points de contrôle</h3>
        <ul>
          <li>Valider le ton avec le responsable de la communication.</li>
          <li>Vérifier les faits et les chiffres cités.</li>
          <li>Confirmer les engagements et les dates annoncés.</li>
        </ul>
      </section>

      <section aria-label="Usages par phase">
        <div className="ia-table-wrap">
          <table>
            <caption>Usages de l’IA par phase de projet</caption>
            <thead>
              <tr>
                <th scope="col">Phase</th>
                <th scope="col">Usage utile</th>
                <th scope="col">Livrable</th>
                <th scope="col">Point de contrôle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Cadrage</th>
                <td>Clarifier les questions, reformuler le besoin</td>
                <td>Note de cadrage</td>
                <td>Valider avec le commanditaire</td>
              </tr>
              <tr>
                <th scope="row">Planification</th>
                <td>Proposer un découpage, repérer des oublis</td>
                <td>WBS, planning</td>
                <td>Vérifier dépendances et charges</td>
              </tr>
              <tr>
                <th scope="row">Exécution</th>
                <td>Résumer, préparer un ordre du jour</td>
                <td>Compte rendu, plan d’action</td>
                <td>Relire noms, dates, décisions</td>
              </tr>
              <tr>
                <th scope="row">Qualité</th>
                <td>Générer des cas de test, chercher des cas limites</td>
                <td>Jeu de test</td>
                <td>Exécuter les tests, comparer</td>
              </tr>
              <tr>
                <th scope="row">Communication</th>
                <td>Adapter un message au public</td>
                <td>Message, FAQ</td>
                <td>Valider le ton et les faits</td>
              </tr>
              <tr>
                <th scope="row">Changement</th>
                <td>Anticiper les questions, préparer une FAQ</td>
                <td>Plan de communication</td>
                <td>Rencontrer les personnes clés</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <IaCallout titre="Faux réalisme" variante="limite">
        <p>Une réponse fluide peut sembler vraie&nbsp;; elle ne devient fiable qu’après vérification d’une source, d’un chiffre ou d’un cas réel.</p>
      </IaCallout>

      <section id="humain">
        <h2>Ce qui reste humain</h2>
        <p>Quel que soit l’outil, quatre responsabilités restent du côté humain.</p>
        <ul>
          <li>
            <strong>Décider.</strong> Choisir ce qui est retenu, ce qui est reporté et ce qui est abandonné.
          </li>
          <li>
            <strong>Arbitrer.</strong> Trancher entre des options concurrentes quand les critères ne suffisent pas.
          </li>
          <li>
            <strong>Vérifier.</strong> Contrôler les faits, les chiffres, les sources et la conformité au besoin.
          </li>
          <li>
            <strong>Porter la relation.</strong> Écouter, expliquer et tenir les engagements auprès des parties prenantes.
          </li>
        </ul>
        <IaCallout titre="Le point de contrôle" variante="fil">
          <p>Une sortie d’IA sans relecture est un brouillon. Une sortie relue, datée et reliée à une source devient un document de travail.</p>
        </IaCallout>
      </section>
    </IaLayout>
  );
}

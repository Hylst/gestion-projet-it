import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

export function IaGouvernancePage() {
  const meta = IA_PAGES[4];
  if (!meta) throw new Error('Page gouvernance IA absente.');
  return (
    <IaLayout
      meta={meta}
      intro="Un usage d’IA tient moins à l’outil qu’au cadre qui l’entoure. Rôles, données, vérifications et preuves doivent être décidés avant que l’outil ne devienne une habitude."
      retenir={[
        'Un cadre court et appliqué vaut mieux qu’une charte longue.',
        'Les données personnelles et les secrets ne se donnent pas sans base et sans contrôle.',
        'Chaque usage a un risque, une parade et un responsable.',
        'La sortie d’un fournisseur doit rester exportable.',
      ]}
      checklist={[
        'Les rôles et le référent données sont nommés.',
        'Les usages autorisés et interdits sont écrits.',
        'Chaque usage a une base légale et une durée de conservation.',
        'Les fournisseurs et leurs conditions sont revus.',
        'Un registre des usages et des incidents existe.',
        'Les sorties sensibles sont relues et tracées.',
        'Un plan de sortie ou d’export est prévu.',
      ]}
      sources={[SOURCES.aiAct, SOURCES.cnil, SOURCES.nist, SOURCES.iso42001]}
    >
      <section id="cadre">
        <h2>Un cadre avant l’outil</h2>
        <p>Un usage d’IA engage le projet avant d’engager la technique. Le commanditaire fixe le besoin et les limites, le chef de projet organise l’usage et les preuves, les utilisateurs appliquent les règles au quotidien. Le référent données et sécurité vérifie les traitements, les accès et les incidents&nbsp;; le juriste intervient sur les contrats, les droits et les cas douteux.</p>
        <ul>
          <li>
            <strong>Commanditaire.</strong> Décide du besoin, du budget et des usages acceptés.
          </li>
          <li>
            <strong>Chef de projet.</strong> Tient le registre, organise la vérification et arbitre les écarts.
          </li>
          <li>
            <strong>Utilisateurs.</strong> Respectent les usages autorisés et signalent une sortie douteuse.
          </li>
          <li>
            <strong>Référent données et sécurité.</strong> Vérifie les données, les accès, la rétention et les incidents.
          </li>
          <li>
            <strong>Juriste.</strong> Éclaire les contrats, les droits et les obligations applicables.
          </li>
        </ul>
        <p>Une politique courte tient en quelques pages. Elle nomme les usages autorisés et interdits, les données qu’on peut confier à un outil, la validation avant diffusion et la procédure en cas d’incident. Une liste d’outils approuvés et un modèle de prompt suffisent souvent à rendre la règle applicable.</p>
        <p>Le registre des usages recense chaque cas&nbsp;: la tâche, le responsable, l’outil, les données et la date de revue. Il évite les usages invisibles et permet de répondre vite à une question du client ou d’un auditeur.</p>
        <p>La formation ne se limite pas à la prise en main. Elle couvre les limites du modèle, la vérification des sources, la classification des données et les bons réflexes en cas de doute. Une démonstration sur un cas réel apprend plus qu’un catalogue de fonctionnalités.</p>
        <p><strong>Un cadre court et appliqué vaut mieux qu’une charte longue.</strong></p>
      </section>

      <section id="droit">
        <h2>Droit, données et AI Act</h2>
        <p>Un traitement de données personnelles suppose une finalité définie avant la collecte, la minimisation des données, une durée de conservation fixée et le respect des droits des personnes. Ces principes du RGPD s’appliquent aussi quand un outil d’IA intervient&nbsp;: l’outil ne crée pas une exception.</p>
        <p>Le règlement européen sur l’intelligence artificielle, ou AI Act, se lit par niveaux de risque. Les pratiques interdites sont écartées sans discussion. Les systèmes à haut risque imposent une documentation, une surveillance et des contrôles renforcés. Les obligations de transparence concernent notamment les contenus générés et les interactions avec une machine. Les usages à risque limité ou minimal demandent surtout de l’information et de la vigilance.</p>
        <p>Les rôles se distinguent. Le fournisseur met le système sur le marché et répond de sa conception, de sa documentation et de ses performances annoncées. Le déployeur, souvent l’organisation qui utilise l’outil, répond de son usage&nbsp;: finalité, données, information des personnes et surveillance. Un même acteur peut cumuler les deux rôles.</p>
        <p>Les textes évoluent et les situations particulières demandent une analyse. Ce contenu n’est pas un conseil juridique. Pour un cas réel, consulter un juriste ou le référent données.</p>
      </section>

      <section id="risques">
        <h2>Risques et qualité</h2>
        <p>Un usage se juge aussi à ses échecs prévisibles. Le tableau ci-dessous nomme les cinq risques les plus fréquents en projet, avec un exemple et une parade simple.</p>
        <div className="ia-table-wrap">
          <table>
            <caption>Risques et parades</caption>
            <thead>
              <tr>
                <th scope="col">Risque</th>
                <th scope="col">Exemple</th>
                <th scope="col">Parade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Hallucination</th>
                <td>Fait inventé</td>
                <td>Source obligatoire, relecture</td>
              </tr>
              <tr>
                <th scope="row">Donnée exposée</th>
                <td>Note interne dans un prompt</td>
                <td>Classification, anonymisation</td>
              </tr>
              <tr>
                <th scope="row">Biais</th>
                <td>Réponse qui reproduit un stéréotype</td>
                <td>Jeu de test varié, revue</td>
              </tr>
              <tr>
                <th scope="row">Dépendance</th>
                <td>Fournisseur qui change</td>
                <td>Export, plan de sortie</td>
              </tr>
              <tr>
                <th scope="row">Automatisation excessive</th>
                <td>Agent qui agit sans contrôle</td>
                <td>Permissions, validation humaine</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Chaque risque reçoit un responsable et une parade vérifiable. La qualité ne se décrète pas&nbsp;: elle se mesure sur des cas réels, avec un critère de sortie écrit avant l’essai.</p>
      </section>

      <section id="propriete">
        <h2>Sécurité et propriété intellectuelle</h2>
        <p>Les conditions du fournisseur déterminent ce que devient le contenu envoyé&nbsp;: conservation, réutilisation pour l’entraînement, accès des sous-traitants et localisation. Ces clauses se lisent avant l’essai, pas après l’incident.</p>
        <p>Les droits sur les sorties varient selon le service et le pays. Une sortie peut être réutilisable, discutable ou proche d’une œuvre existante. Vérifiez les droits et la licence avant de publier un texte, une image ou un extrait de code généré.</p>
        <p>Les licences de code méritent la même attention. Un assistant peut proposer un extrait soumis à une licence incompatible avec le projet, ou reprendre un fragment protégé. La revue de code reste obligatoire, avec la provenance et la licence quand elles sont connues.</p>
        <p>L’information confidentielle ne se confie pas à un outil sans cadre. Une note interne, un contrat ou une donnée client peuvent ressortir dans une réponse ou dans les journaux du service. Classez le contenu avant de l’utiliser.</p>
        <p>L’injection de prompt consiste à glisser une instruction dans un document ou une page lue par l’assistant, pour détourner sa consigne. Une fuite de données peut suivre&nbsp;: l’outil révèle un extrait, un chemin ou une information d’un autre contexte. Traitez toute source externe comme non fiable et limitez les accès de l’outil.</p>
        <p><strong>Ne pas coller de secret.</strong></p>
        <p>Clé d’API, mot de passe, jeton et extrait de base clients restent hors des prompts et des pièces jointes. Si un secret a été exposé, révoquez-le et consignez l’incident.</p>
      </section>

      <section id="fournisseurs">
        <h2>Fournisseurs et dépendance</h2>
        <p>La due diligence d’un fournisseur tient en six questions&nbsp;: usage des données, durée de rétention, localisation, sous-traitants, mesures de sécurité et conditions de sortie. Une réponse orale ne suffit pas&nbsp;; demandez la documentation et gardez-la avec le dossier du projet.</p>
        <p>Le contrat fixe les responsabilités, les niveaux de service, la notification des incidents et la restitution des données. Nommez un administrateur, imposez une authentification forte et vérifiez les journaux d’accès. Un compte partagé efface la trace des actions.</p>
        <p>Évitez le fournisseur unique pour une fonction critique. Un second outil, un export régulier ou une solution locale offrent une porte de sortie quand le service change de conditions, augmente ses prix ou s’interrompt.</p>
        <p>Comparez local et cloud sur les mêmes critères&nbsp;: données, coût total, compétences, disponibilité et traçabilité. Un modèle local réduit les appels sortants mais demande du matériel, des mises à jour et une surveillance des fichiers. Un service cloud simplifie l’accès mais déplace la confiance vers un tiers.</p>
        <IaCallout titre="Le test de la panne" variante="limite">
          <p>Si l’outil disparaît demain, que reste-t-il&nbsp;? Les sources, les décisions et les compétences de l’équipe.</p>
        </IaCallout>
      </section>

      <section id="preuves">
        <h2>Preuves et revue</h2>
        <p>Un journal d’usage note, pour chaque cas, le cas d’usage, le modèle et sa version, la date, les données utilisées, la sortie produite, la vérification faite et la décision prise. Cette trace permet de reprendre un dossier, de comparer deux versions et de répondre à une question sans reconstituer l’histoire de mémoire.</p>
        <p>Une revue trimestrielle examine les usages actifs, les incidents, les corrections récurrentes et les coûts. Elle décide de poursuivre, d’ajuster ou d’arrêter. Le registre des incidents consigne la date, l’effet, les personnes concernées, les mesures prises et le responsable du suivi.</p>
        <p>Quatre indicateurs suffisent souvent&nbsp;: le temps gagné, le nombre de corrections, les incidents et l’adoption réelle par l’équipe. Un gain de temps qui s’accompagne de nombreuses reprises n’est pas un gain.</p>
        <p>Une revue sans preuve devient une conversation d’impression. <strong>Ce qui n’est pas tracé n’est pas gouverné.</strong></p>
      </section>
    </IaLayout>
  );
}

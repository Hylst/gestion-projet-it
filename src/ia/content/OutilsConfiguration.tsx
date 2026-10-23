import { IaCallout } from '../IaCallout';
import { IaLayout } from '../IaLayout';
import { IA_PAGES } from '../pages';
import { SOURCES } from '../sources';

export function IaOutilsPage() {
  const meta = IA_PAGES[3];
  if (!meta) throw new Error('Page outils IA absente.');
  return (
    <IaLayout
      meta={meta}
      intro="Le marché change vite et les noms changent. Les catégories, elles, restent utiles pour choisir un outil selon le besoin, les données et le niveau de contrôle attendu."
      retenir={[
        'La catégorie d’outil compte plus que le nom du fournisseur.',
        'Le contexte, les permissions et la rétention se règlent avant l’usage.',
        'Un modèle local n’est pas anonyme par nature.',
        'Un outil se choisit avec un cas de test et un critère de sortie.',
      ]}
      checklistTitre="Checklist de configuration"
      checklist={[
        'Le cas d’usage et le livrable sont écrits.',
        'Le niveau de confidentialité des données est connu.',
        'Le modèle et la version sont notés.',
        'Le contexte et les instructions sont versionnés.',
        'Les outils et permissions sont limités au nécessaire.',
        'La rétention et le partage sont vérifiés.',
        'Un jeu de test de cinq cas existe.',
        'Une personne relit et valide avant diffusion.',
      ]}
      sources={[SOURCES.cnil, SOURCES.nist, SOURCES.iso42001, SOURCES.aiAct]}
    >
      <section id="categories">
        <h2>Catégories d’outils</h2>
        <p>Un outil se comprend par ce qu’il permet de faire, pas par sa popularité. Les catégories ci-dessous aident à comparer des solutions qui ne rendent pas le même service.</p>
        <div className="ia-table-wrap">
          <table>
            <caption>Catégories d’outils</caption>
            <thead>
              <tr>
                <th scope="col">Catégorie</th>
                <th scope="col">À quoi cela sert</th>
                <th scope="col">Exemples datés</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Assistants génératifs</th>
                <td>Rédiger, résumer, expliquer, explorer</td>
                <td>ChatGPT, Claude, Gemini, Mistral Le Chat</td>
              </tr>
              <tr>
                <th scope="row">Copilotes de code</th>
                <td>Compléter, expliquer et relire du code dans l’éditeur</td>
                <td>GitHub Copilot, Cursor</td>
              </tr>
              <tr>
                <th scope="row">Recherche et synthèse</th>
                <td>Lire des sources, comparer des documents, préparer une revue</td>
                <td>NotebookLM, Perplexity</td>
              </tr>
              <tr>
                <th scope="row">Automatisation</th>
                <td>Enchaîner des étapes et connecter des outils</td>
                <td>n8n, Make</td>
              </tr>
              <tr>
                <th scope="row">Modèles locaux</th>
                <td>Faire tourner un modèle sur sa machine, hors ligne</td>
                <td>Ollama, LM Studio</td>
              </tr>
              <tr>
                <th scope="row">Plateformes d’entreprise</th>
                <td>Industrialiser l’accès, les droits et la journalisation</td>
                <td>Azure AI Foundry, AWS Bedrock, Google Vertex AI</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Exemples cités à titre indicatif, octobre 2026.</p>
      </section>

      <section id="environnement">
        <h2>Environnement de travail</h2>
        <p>L’environnement compte autant que le modèle. Il détermine ce que l’outil voit, ce qu’il peut faire et ce qu’il reste comme trace.</p>
        <h3>Local, navigateur, API</h3>
        <p>Un modèle local tourne sur la machine, sans appel sortant, mais consomme des ressources et demande un suivi des mises à jour. Un outil dans le navigateur est immédiat à utiliser et dépend d’un compte et d’une connexion. Une API s’intègre dans un script ou un service&nbsp;; elle exige une clé, un quota et une gestion des erreurs. Ces trois modes ne présentent pas les mêmes garanties de confidentialité ni de disponibilité.</p>
        <h3>Un espace de travail séparé</h3>
        <p>Un dossier de projet dédié évite de mélanger les essais et les livrables&nbsp;: les prompts, les sources, les sorties et le journal s’y rangent par date et par version. Le journal note ce qui a été demandé, ce qui a été obtenu et ce qui a été validé, pour permettre une reprise par une autre personne.</p>
        <h3>Compte, siège et données</h3>
        <p>Un compte personnel, un compte d’équipe et un siège payant n’offrent pas les mêmes droits. Vérifiez qui administre le compte, quelles données sont conservées, si les échanges servent à l’entraînement et comment les exports se suppriment. Une licence individuelle ne couvre pas toujours un usage professionnel.</p>
        <h3>Intégration à l’outil de projet</h3>
        <p>Un copilote dans l’IDE, un assistant dans la documentation ou un agent dans l’outil de tickets réduit les allers-retours. L’intégration utile reste celle qui évite la dispersion&nbsp;: un point d’entrée par besoin, des droits limités et une trace dans le projet.</p>
      </section>

      <section id="parametres">
        <h2>Paramètres qui comptent</h2>
        <p>Un réglage se choisit pour un usage précis, pas par défaut. Sept paramètres expliquent l’essentiel des écarts entre deux configurations.</p>
        <div className="ia-table-wrap">
          <table>
            <caption>Paramètres qui comptent</caption>
            <thead>
              <tr>
                <th scope="col">Paramètre</th>
                <th scope="col">Ce qu’il change</th>
                <th scope="col">Réglage de départ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Modèle</th>
                <td>Capacité, coût, latence</td>
                <td>Choisir le plus simple qui suffit</td>
              </tr>
              <tr>
                <th scope="row">Contexte</th>
                <td>Documents visibles en une fois</td>
                <td>Fournir les extraits utiles, pas tout</td>
              </tr>
              <tr>
                <th scope="row">Instructions</th>
                <td>Comportement durable</td>
                <td>Écrire des règles courtes et testées</td>
              </tr>
              <tr>
                <th scope="row">Outils</th>
                <td>Actions autorisées</td>
                <td>Donner le minimum, révoquer ensuite</td>
              </tr>
              <tr>
                <th scope="row">Rétention</th>
                <td>Durée de conservation</td>
                <td>Réduire pour les données sensibles</td>
              </tr>
              <tr>
                <th scope="row">Température</th>
                <td>Variabilité de la sortie</td>
                <td>Basse pour extraire, plus haute pour explorer</td>
              </tr>
              <tr>
                <th scope="row">Journal</th>
                <td>Traçabilité</td>
                <td>Conserver version, date, source et validation</td>
              </tr>
            </tbody>
          </table>
        </div>
        <IaCallout titre="Le bon réglage" variante="note">
          <p>Le bon réglage n’est pas le plus puissant. C’est celui qui rend la sortie vérifiable dans le temps imparti.</p>
        </IaCallout>
      </section>

      <section id="donnees">
        <h2>Données et confidentialité</h2>
        <p>Avant de coller un document, classez son contenu. Le niveau de confidentialité détermine l’outil, les permissions et la relecture nécessaires.</p>
        <ul>
          <li>
            <strong>Public.</strong> Le contenu peut être diffusé sans restriction.
          </li>
          <li>
            <strong>Interne.</strong> Le contenu reste réservé à l’organisation.
          </li>
          <li>
            <strong>Confidentiel.</strong> L’accès est restreint à quelques personnes, pour un contrat ou un projet sensible.
          </li>
          <li>
            <strong>Personnel.</strong> Le contenu identifie une personne, directement ou par recoupement.
          </li>
        </ul>
        <p>Ne jamais coller de secret&nbsp;: clé d’API, mot de passe, jeton ou extrait de base clients. Anonymisez ou pseudonymisez les données personnelles avant de les confier à un outil, et vérifiez que le résultat ne permet pas de retrouver une personne.</p>
        <p>Vérifiez la rétention et le partage&nbsp;: durée de conservation, destinataires, réutilisation éventuelle pour l’entraînement et procédure de suppression. Ces réponses figurent dans le contrat ou la documentation du fournisseur, pas dans une promesse orale.</p>
        <p><strong>Un modèle local n’est pas anonyme par nature.</strong> Il déplace le traitement sur la machine, sans supprimer les données ni les traces. Les fichiers d’essai, les journaux et les sauvegardes demandent le même soin.</p>
        <p>Vérifiez qui administre le compte et où sont les données. Un compte personnel utilisé pour un projet professionnel laisse à l’organisation une visibilité limitée sur les accès, les exports et les départs.</p>
      </section>

      <section id="choisir">
        <h2>Choisir sans se disperser</h2>
        <p>Un choix se justifie par cinq critères, examinés dans cet ordre avant toute démonstration commerciale.</p>
        <ol>
          <li>
            <strong>Usage.</strong> La tâche réelle, le livrable et la fréquence.
          </li>
          <li>
            <strong>Données.</strong> La nature des informations confiées, leur durée de vie et le cadre qui autorise leur usage.
          </li>
          <li>
            <strong>Intégration.</strong> Le temps d’installation, les formats acceptés et la place dans l’outil de projet.
          </li>
          <li>
            <strong>Coût.</strong> L’abonnement, les quotas, les sièges et le temps de reprise.
          </li>
          <li>
            <strong>Sortie.</strong> La qualité vérifiable, le format et la facilité de relecture.
          </li>
        </ol>
        <p>Testez l’outil sur un cas réel pendant deux semaines. Mesurez le temps gagné, les corrections nécessaires et les incidents, puis comparez le résultat au critère de sortie fixé au départ.</p>
        <p>Gardez un outil de référence par besoin et évitez d’empiler les abonnements. Un outil de plus n’ajoute pas une compétence&nbsp;: il ajoute un compte, des droits et une dépendance à suivre.</p>
      </section>
    </IaLayout>
  );
}

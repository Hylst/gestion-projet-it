// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberDependancesPage() {
  const meta = CYBER_PAGES[3];
  if (!meta) throw new Error('Page dependances cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="Un projet est une chaîne de dépendances. Certaines sont du code, d’autres des services, des fournisseurs ou des personnes. Ce qui n’est pas cartographié ne peut pas être surveillé."
      retenir={[
        'Une dépendance non cartographiée ne peut pas être surveillée.',
        'Le fichier de verrouillage et l’audit donnent une base, pas une garantie.',
        'Un fournisseur se choisit aussi sur sa sortie.',
        'Une chaîne de build compromise peut annuler les contrôles du code.',
      ]}
      checklist={[
        'J’ai listé les dépendances directes et transitives.',
        'J’ai vérifié les versions et les avis de sécurité.',
        'J’ai nommé les fournisseurs et leurs accès.',
        'J’ai limité les permissions de la chaîne de build.',
        'J’ai prévu un export et un plan de sortie.',
        'J’ai une fenêtre de correctif et un contact incident.',
        'J’ai daté la prochaine revue.',
      ]}
      sources={[CYBER_SOURCES.owasp, CYBER_SOURCES.nist, CYBER_SOURCES.anssi, CYBER_SOURCES.iso27001]}
    >
      <section id="cartographie">
        <h2>Cartographier les dépendances</h2>
        <p>Une dépendance est tout ce dont le projet a besoin pour fonctionner&nbsp;: bibliothèque, service, hébergeur, prestataire, outil de build. La carte distingue ce qui est direct de ce qui arrive par transitivité.</p>
        <ul>
          <li>Dépendances directes&nbsp;: ce que le projet déclare et utilise.</li>
          <li>Dépendances transitives&nbsp;: ce que les dépendances embarquent à leur tour.</li>
          <li>Services&nbsp;: hébergement, messagerie, stockage, paiement.</li>
          <li>Fournisseurs&nbsp;: prestataires, agences, plateformes.</li>
          <li>Chaîne de build&nbsp;: intégration continue, registre, artefacts.</li>
        </ul>
      </section>

      <section id="versions">
        <h2>Versions et vulnérabilités</h2>
        <p>Un fichier de verrouillage fige les versions installées. L’audit des dépendances signale les avis connus. Les deux se complètent&nbsp;: le verrouillage rend le build reproductible, l’audit déclenche la mise à jour.</p>
        <p>Une politique de mise à jour précise qui décide, dans quel délai et avec quels tests. Une dépendance en fin de vie se remplace avant de devenir un risque non suivi.</p>
      </section>

      <section id="fournisseurs">
        <h2>Fournisseurs et contrats</h2>
        <p>Un fournisseur ne se résume pas à son prix. Le projet vérifie l’usage des données, la rétention, la localisation, les sous-traitants, la sécurité et la sortie.</p>
        <ul>
          <li>Quelles données sont confiées et pour quelle finalité&nbsp;?</li>
          <li>Combien de temps sont-elles conservées&nbsp;?</li>
          <li>Qui peut y accéder et depuis où&nbsp;?</li>
          <li>Que se passe-t-il en cas de panne ou de résiliation&nbsp;?</li>
          <li>Qui contacter en cas d’incident&nbsp;?</li>
        </ul>
      </section>

      <section id="chaine">
        <h2>Chaîne de build et provenance</h2>
        <p>La chaîne de build transforme le code en artefact livré. Si elle est compromise, les contrôles du code ne suffisent plus. Les permissions, les secrets et les actions tierces se limitent au nécessaire.</p>
        <ul>
          <li>Permissions minimales pour le jeton de build.</li>
          <li>Actions tierces épinglées et relues.</li>
          <li>Secrets disponibles seulement au moment utile.</li>
          <li>Artefacts conservés avec leur origine et leur empreinte.</li>
          <li>Journal de build lisible en cas d’incident.</li>
        </ul>
      </section>

      <section id="sortie">
        <h2>Plan de sortie</h2>
        <p>Un plan de sortie décrit comment récupérer les données, remplacer le service et tenir le délai. Il se prépare avant la signature, pas le jour de la résiliation.</p>
        <CyberCallout titre="Le test de la panne" variante="limite">
          <p>Si le fournisseur disparaît demain, que reste-t-il&nbsp;? Les sources, les décisions et les compétences de l’équipe.</p>
        </CyberCallout>
        <div className="cyber-table-wrap">
          <table>
            <caption>Dépendances et parades</caption>
            <thead>
              <tr><th scope="col">Dépendance</th><th scope="col">Risque</th><th scope="col">Parade</th><th scope="col">Preuve</th></tr>
            </thead>
            <tbody>
              <tr><td>Bibliothèque</td><td>Faille connue</td><td>Audit et mise à jour</td><td>Version corrigée</td></tr>
              <tr><td>Service tiers</td><td>Fuite de données</td><td>Contrat et moindre accès</td><td>Revue fournisseur</td></tr>
              <tr><td>Chaîne CI</td><td>Jeton exposé</td><td>Permissions minimales</td><td>Journal de build</td></tr>
              <tr><td>Hébergeur</td><td>Panne prolongée</td><td>Sauvegarde et plan de reprise</td><td>Test de restauration</td></tr>
              <tr><td>Prestataire</td><td>Départ non préparé</td><td>Plan de sortie</td><td>Export vérifié</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="veille">
        <h2>Veille et réponse</h2>
        <p>La veille suit les avis de sécurité, les versions et les changements de fournisseur. Elle ne consiste pas à lire tous les flux&nbsp;: elle définit une fenêtre de correctif et un responsable pour chaque dépendance critique.</p>
        <p>Quand un avis paraît, la question n’est pas seulement «&nbsp;faut-il mettre à jour&nbsp;?&nbsp;» mais «&nbsp;que faut-il vérifier, tester et communiquer&nbsp;?&nbsp;». La réponse se prépare avec le contact incident du fournisseur.</p>
      </section>
    </CyberLayout>
  );
}

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberDonneesPage() {
  const meta = CYBER_PAGES[4];
  if (!meta) throw new Error('Page donnees cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="Une donnée personnelle n’est pas un fichier comme un autre. Sa finalité, sa durée et ses accès se décident avant la mise en ligne."
      retenir={[
        'Une donnée personnelle se rattache à une finalité et à une durée.',
        'La minimisation réduit le risque et la charge.',
        'Le responsable de traitement et le sous-traitant n’ont pas les mêmes obligations.',
        'Ce qui n’est pas classé finit souvent au mauvais endroit.',
      ]}
      checklist={[
        'J’ai classé les données du projet.',
        'J’ai écrit la finalité et la durée de conservation.',
        'J’ai vérifié la base légale avec le référent.',
        'J’ai limité les accès aux personnes habilitées.',
        'J’ai prévu l’effacement ou l’archivage.',
        'J’ai documenté les sous-traitants.',
        'J’ai un contact pour les droits et les incidents.',
      ]}
      sources={[CYBER_SOURCES.cnil, CYBER_SOURCES.aiAct, CYBER_SOURCES.anssi, CYBER_SOURCES.nist]}
    >
      <section id="classer">
        <h2>Classer les données</h2>
        <p>Classer consiste à nommer le niveau de sensibilité et les règles qui vont avec. Un document public et une liste de contacts ne se stockent pas, ne se partagent pas et ne se conservent pas de la même façon.</p>
        <div className="cyber-table-wrap">
          <table>
            <caption>Classification des données</caption>
            <thead>
              <tr><th scope="col">Niveau</th><th scope="col">Exemple</th><th scope="col">Accès</th><th scope="col">Conservation</th></tr>
            </thead>
            <tbody>
              <tr><td>Public</td><td>Page de présentation</td><td>Tous</td><td>Jusqu’au retrait</td></tr>
              <tr><td>Interne</td><td>Notes de réunion</td><td>Équipe projet</td><td>Durée du projet</td></tr>
              <tr><td>Confidentiel</td><td>Contrat fournisseur</td><td>Direction et juriste</td><td>Durée contractuelle</td></tr>
              <tr><td>Personnel</td><td>Contacts d’adhérents</td><td>Bureau et référent</td><td>Durée de la finalité</td></tr>
              <tr><td>Sensible</td><td>Donnée de santé</td><td>Personnes habilitées</td><td>Durée légale</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="rgpd">
        <h2>Principes RGPD</h2>
        <p>Le RGPD repose sur quelques principes simples à retenir&nbsp;: finalité, minimisation, conservation limitée, exactitude, sécurité et responsabilité. Chaque principe se traduit par une décision de projet.</p>
        <ul>
          <li>Finalité&nbsp;: pourquoi la donnée est collectée et quel usage est prévu.</li>
          <li>Minimisation&nbsp;: seulement les données utiles, pas celles qui pourraient servir un jour.</li>
          <li>Conservation&nbsp;: une durée écrite, avec une échéance de suppression ou d’archivage.</li>
          <li>Droits&nbsp;: accès, rectification, effacement, opposition et portabilité.</li>
          <li>Sécurité&nbsp;: accès limités, chiffrement quand il est pertinent, sauvegardes testées.</li>
          <li>Responsabilité&nbsp;: pouvoir démontrer ce qui a été décidé et vérifié.</li>
        </ul>
      </section>

      <section id="bases">
        <h2>Bases légales et rôles</h2>
        <p>Le responsable de traitement décide de la finalité et des moyens. Le sous-traitant agit pour son compte, avec un contrat et des instructions. La personne concernée doit pouvoir exercer ses droits.</p>
        <p>Une base légale peut être le consentement, l’exécution d’un contrat, une obligation légale ou un intérêt légitime. Le choix ne se devine pas&nbsp;: il se documente avec le référent données ou un juriste.</p>
      </section>

      <section id="aiact">
        <h2>AI Act</h2>
        <p>Le règlement européen sur l’intelligence artificielle ajoute des obligations selon le niveau de risque du système. Il distingue les pratiques interdites, les systèmes à haut risque, les obligations de transparence et les usages à risque limité ou minimal.</p>
        <p>Le fournisseur et le déployeur n’ont pas les mêmes responsabilités. Un projet qui utilise un assistant doit savoir qui fournit le modèle, pour quel usage et avec quelles limites. La section IA du cours détaille ce cadre dans la page Gouvernance.</p>
      </section>

      <section id="cycle">
        <h2>Cycle de vie</h2>
        <p>Une donnée se collecte, se stocke, se partage, s’archive puis s’efface. Chaque étape a un responsable et un contrôle. Le chiffrement protège le transport et le stockage, mais ne remplace pas une limitation d’accès.</p>
        <p>Les sauvegardes contiennent souvent les mêmes données que la production. Elles suivent la même classification et la même durée de conservation.</p>
      </section>

      <section id="droits">
        <h2>Droits et incidents</h2>
        <p>Une demande d’accès, de rectification ou d’effacement se traite dans un délai connu, avec une trace. En cas d’incident, la notification ne se décide pas seul&nbsp;: elle associe le référent données, le juriste et la direction.</p>
        <p>Le registre des traitements et le journal des incidents permettent de répondre sans reconstituer l’histoire de mémoire.</p>
        <CyberCallout titre="Pas un conseil juridique" variante="limite">
          <p>Ce contenu n’est pas un conseil juridique. Pour un cas réel, consulter un juriste ou le référent données.</p>
        </CyberCallout>
      </section>
    </CyberLayout>
  );
}

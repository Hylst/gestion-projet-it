// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberIncidentPage() {
  const meta = CYBER_PAGES[5];
  if (!meta) throw new Error('Page incident cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="Un incident se prépare avant d’arriver. Les premières minutes servent à qualifier, confiner et préserver les preuves, pas à improviser une communication."
      retenir={[
        'Une sauvegarde non testée n’est pas une sauvegarde.',
        'Confiner avant de chercher à comprendre toute l’histoire.',
        'La communication fait partie de la réponse.',
        'Un incident se clôt par des décisions, pas seulement par un rapport.',
      ]}
      checklist={[
        'J’ai un playbook et des contacts à jour.',
        'J’ai testé une restauration.',
        'Je sais qui qualifie et qui décide.',
        'Je sais comment préserver les preuves.',
        'Je sais qui communique en interne et en externe.',
        'Je connais les obligations de notification.',
        'J’ai prévu un retour d’expérience daté.',
      ]}
      sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.cnil, CYBER_SOURCES.nist, CYBER_SOURCES.iso27001]}
    >
      <section id="detecter">
        <h2>Détecter et qualifier</h2>
        <p>Un incident peut se signaler par une alerte, une panne, un comportement anormal ou l’appel d’un tiers. La première étape consiste à ouvrir une trace et à qualifier la gravité, le périmètre et les données concernées.</p>
        <p>La qualification n’attend pas la certitude. Elle note ce qui est connu, ce qui reste à vérifier et qui pilote. Une alerte mal comprise vaut mieux qu’une alerte ignorée.</p>
      </section>

      <section id="confiner">
        <h2>Confiner et préserver</h2>
        <p>Confiner signifie réduire la propagation sans détruire les preuves. On isole une machine, on révoque un compte, on coupe un accès. On évite d’effacer les journaux ou de réinstaller avant d’avoir compris ce qui s’est passé.</p>
        <ul>
          <li>Révoquer les comptes et les secrets concernés.</li>
          <li>Isoler les machines ou les services atteints.</li>
          <li>Conserver les journaux, captures et horodatages.</li>
          <li>Noter chaque décision et son auteur.</li>
        </ul>
      </section>

      <section id="decider">
        <h2>Décider et communiquer</h2>
        <p>Une cellule de crise courte réunit les rôles utiles&nbsp;: direction, chef de projet, technique, référent données et juriste. Elle décide du confinement, de la reprise et de la communication.</p>
        <p>La communication interne et externe se prépare avec les mêmes faits. Elle indique ce qui est confirmé, ce qui reste incertain et quand la prochaine information sera donnée. Les obligations de notification, notamment pour les données personnelles, se vérifient avec le référent.</p>
      </section>

      <section id="reprendre">
        <h2>Reprendre</h2>
        <p>La reprise s’appuie sur des sauvegardes testées, pas sur une copie supposée bonne. Elle définit un objectif de délai et un objectif de perte de données, puis restaure le service le plus important en premier.</p>
        <p>Une restauration se valide par des tests fonctionnels et par un contrôle des accès. Le retour à la normale se documente, même s’il est partiel.</p>
        <CyberCallout titre="Sauvegarde" variante="limite">
          <p>Une sauvegarde non testée n’est pas une sauvegarde.</p>
        </CyberCallout>
      </section>

      <section id="apprendre">
        <h2>Apprendre</h2>
        <p>Le retour d’expérience reconstruit une chronologie courte&nbsp;: ce qui s’est passé, ce qui a été décidé, ce qui a manqué et ce qui a fonctionné. Il produit des actions avec un responsable et une échéance.</p>
        <p>Le but n’est pas de désigner un coupable. C’est de corriger une condition qui pourrait reproduire l’incident.</p>
      </section>

      <section id="preparer">
        <h2>Préparer</h2>
        <p>Un playbook tient en quelques pages&nbsp;: contacts, rôles, premiers gestes, obligations et modèle de communication. Il se teste par un exercice court, au moins une fois par an.</p>
        <p>La préparation inclut les sauvegardes, les accès de secours et les fournisseurs. Un plan non testé reste une intention.</p>
        <p>Le <Link to="/module-6">module 6</Link> relie la sauvegarde au registre des risques et à leurs déclencheurs.</p>
        <div className="cyber-table-wrap">
          <table>
            <caption>Chronologie d’incident</caption>
            <thead>
              <tr><th scope="col">Temps</th><th scope="col">Événement</th><th scope="col">Décision</th><th scope="col">Responsable</th><th scope="col">Preuve</th></tr>
            </thead>
            <tbody>
              <tr><td>H+0</td><td>Alerte de connexion anormale</td><td>Qualifier et ouvrir le journal</td><td>Astreinte</td><td>Journal et horodatage</td></tr>
              <tr><td>H+1</td><td>Compte compromis identifié</td><td>Révoquer le compte et tourner les secrets</td><td>Administration</td><td>Capture et ticket</td></tr>
              <tr><td>H+3</td><td>Périmètre des données précisé</td><td>Informer la direction et le référent</td><td>Chef de projet</td><td>Note de décision</td></tr>
              <tr><td>H+1 j</td><td>Service restauré</td><td>Valider les tests et la sauvegarde</td><td>Technique</td><td>Rapport de restauration</td></tr>
              <tr><td>H+7 j</td><td>Retour d’expérience</td><td>Décider des actions et des échéances</td><td>Direction</td><td>Plan d’action</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </CyberLayout>
  );
}

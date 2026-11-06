// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import LaboMatriceAcces from '../../labos/LaboMatriceAcces';
import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberAccesPage() {
  const meta = CYBER_PAGES[2];
  if (!meta) throw new Error('Page acces cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="Les accès sont la première couche pratique. Un compte partagé, un droit trop large ou un secret dans un dépôt suffisent à ouvrir une brèche."
      retenir={[
        'Un compte partagé efface la responsabilité.',
        'Le moindre privilège réduit l’impact d’un compte compromis.',
        'Un secret retiré du code doit aussi être révoqué.',
        'Une revue d’accès sans preuve n’est qu’une intention.',
      ]}
      checklist={[
        'Chaque personne a un compte nominatif.',
        'Les droits sont limités au besoin.',
        'La MFA protège les comptes sensibles.',
        'Les secrets sont dans un coffre, pas dans le code.',
        'Les départs et les changements de rôle sont traités.',
        'Une revue des accès a une date et un responsable.',
        'Une procédure de révocation existe.',
      ]}
      sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.cnil, CYBER_SOURCES.nist]}
    >
      <section id="comptes">
        <h2>Comptes et identités</h2>
        <p>Chaque personne qui agit sur le projet doit avoir un compte nominatif. Un compte partagé empêche de savoir qui a fait quoi et rend la révocation imprécise.</p>
        <p>Le cycle de vie se décrit simplement&nbsp;: arrivée, changement de rôle, départ. Un accès créé pour un besoin ponctuel se retire à la fin du besoin, pas au prochain audit.</p>
      </section>

      <section id="privileges">
        <h2>Moindre privilège</h2>
        <p>Le moindre privilège consiste à donner uniquement les droits nécessaires à la tâche, pour la durée nécessaire. Un rédacteur n’a pas besoin d’administrer l’hébergement.</p>
        <ul>
          <li>Séparer les comptes d’administration des comptes d’usage courant.</li>
          <li>Accorder un droit temporaire plutôt qu’un droit permanent.</li>
          <li>Retirer les droits à la fin de la mission.</li>
          <li>Relire les droits à intervalle régulier.</li>
        </ul>
      </section>

      <section id="mfa">
        <h2>Authentification et mots de passe</h2>
        <p>Une authentification multifacteur demande au moins deux preuves de nature différente. Elle réduit fortement l’effet d’un mot de passe volé.</p>
        <ul>
          <li>Utiliser un gestionnaire de mots de passe pour les comptes du projet.</li>
          <li>Préférer une clé d’authentification ou une application de code quand elle est disponible.</li>
          <li>Ne jamais partager un mot de passe par courriel ou dans un ticket.</li>
          <li>Supprimer les comptes inutilisés plutôt que de les laisser dormir.</li>
        </ul>
      </section>

      <section id="secrets">
        <h2>Secrets et clés</h2>
        <p>Un secret est une information d’authentification&nbsp;: clé d’API, mot de passe de base de données, jeton de déploiement. Il ne se versionne pas, ne se colle pas dans un journal et ne s’envoie pas par message.</p>
        <p>Le secret vit dans un coffre adapté, avec un propriétaire, une date de rotation et une procédure de révocation. Le retrait du dépôt ne suffit pas si la valeur a déjà circulé.</p>
        <CyberCallout titre="Secret" variante="limite">
          <p>Un secret retiré du code doit aussi être révoqué.</p>
        </CyberCallout>
      </section>

      <section id="revue">
        <h2>Revue des accès</h2>
        <p>Une revue vérifie que chaque compte existe encore, que son rôle correspond au besoin et que les droits anciens ont été retirés. Elle produit une trace datée, pas seulement une conversation.</p>
        <div className="cyber-table-wrap">
          <table>
            <caption>Matrice des accès</caption>
            <thead>
              <tr><th scope="col">Rôle</th><th scope="col">Besoin</th><th scope="col">Accès</th><th scope="col">Contrôle</th></tr>
            </thead>
            <tbody>
              <tr><td>Bénévole</td><td>Mettre à jour les textes</td><td>Édition du contenu</td><td>Compte nominatif et revue</td></tr>
              <tr><td>Chef de projet</td><td>Coordonner et publier</td><td>Administration du site</td><td>MFA et journal</td></tr>
              <tr><td>Prestataire</td><td>Corriger une page</td><td>Accès limité et daté</td><td>Compte temporaire, retrait</td></tr>
              <tr><td>Bureau</td><td>Valider les comptes</td><td>Lecture des adhésions</td><td>Moindre privilège et revue</td></tr>
            </tbody>
          </table>
        </div>
        <LaboMatriceAcces />
      </section>

      <section id="compromission">
        <h2>En cas de compromission</h2>
        <p>Le premier réflexe est de réduire l’accès, pas de comprendre toute l’histoire. Révoquer le compte, tourner les secrets concernés, isoler la machine et préserver les traces permet ensuite d’enquêter sans aggraver.</p>
        <p>La communication arrive après la décision de confinement. Elle indique ce qui est connu, ce qui reste à vérifier et qui pilote la suite.</p>
        <p>Le <Link to="/module-5">module 5</Link> montre, sur le fil rouge, comment un secret exposé se retire et se révoque.</p>
      </section>
    </CyberLayout>
  );
}

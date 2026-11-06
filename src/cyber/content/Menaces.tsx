// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CyberCallout } from '../CyberCallout';
import { CyberLayout } from '../CyberLayout';
import { CYBER_PAGES } from '../pages';
import { CYBER_SOURCES } from '../sources';

export function CyberMenacesPage() {
  const meta = CYBER_PAGES[1];
  if (!meta) throw new Error('Page menaces cyber absente.');
  return (
    <CyberLayout
      meta={meta}
      intro="Une menace n’est pas une abstraction. Elle se décrit par un actif, un attaquant plausible, un chemin et un impact. Le modèle de menace sert à choisir les parades qui comptent, pas à tout prévoir."
      retenir={[
        'Un modèle de menace commence par les actifs, pas par les outils.',
        'Toutes les menaces ne se valent pas\u00A0: la vraisemblance et l’impact orientent la parade.',
        'Une parade se vérifie et se relie à un responsable.',
        'Un modèle se révise à chaque jalon et après chaque incident.',
      ]}
      checklist={[
        'J’ai listé les actifs et leur valeur.',
        'J’ai nommé les attaquants plausibles.',
        'J’ai décrit les chemins d’attaque.',
        'J’ai estimé l’impact et la vraisemblance.',
        'J’ai choisi une parade proportionnée.',
        'J’ai nommé un responsable et un déclencheur.',
        'J’ai prévu une date de revue.',
      ]}
      sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.owasp, CYBER_SOURCES.nist]}
    >
      <section id="actifs">
        <h2>Actifs et valeur</h2>
        <p>Un actif est ce qui a de la valeur pour l’organisation ou pour les personnes. Il peut être technique ou non. Le projet commence par les nommer, sans jargon.</p>
        <ul>
          <li>Les données&nbsp;: contacts, adresses, pièces jointes, décisions, sauvegardes.</li>
          <li>Les comptes&nbsp;: administrateur, messagerie, hébergement, outils de suivi.</li>
          <li>Le service&nbsp;: site, formulaire, espace de travail, disponibilité.</li>
          <li>La réputation&nbsp;: confiance des adhérents, image de l’association, parole publique.</li>
          <li>Les personnes&nbsp;: sécurité, vie privée, charge de travail.</li>
          <li>Les preuves&nbsp;: journaux, décisions, sauvegardes, contrats.</li>
        </ul>
      </section>

      <section id="menaces">
        <h2>Menaces plausibles</h2>
        <p>Une menace plausible n’est pas une hypothèse spectaculaire. C’est un scénario qui peut arriver avec les moyens, les accès et le contexte du projet.</p>
        <ul>
          <li>Hameçonnage&nbsp;: un message trompeur pousse à livrer un mot de passe ou à ouvrir une pièce jointe.</li>
          <li>Vol d’identifiants&nbsp;: un mot de passe réutilisé ou mal conservé ouvre un compte.</li>
          <li>Rançongiciel&nbsp;: un logiciel malveillant chiffre des fichiers et bloque le service.</li>
          <li>Erreur humaine&nbsp;: un fichier envoyé au mauvais destinataire, un droit accordé trop largement.</li>
          <li>Menace interne&nbsp;: un ancien bénévole ou un prestataire garde un accès oublié.</li>
          <li>Fournisseur compromis&nbsp;: un service tiers expose les données ou tombe en panne.</li>
          <li>Dépendance vulnérable&nbsp;: une bibliothèque non mise à jour contient une faille connue.</li>
        </ul>
      </section>

      <section id="modele">
        <h2>Construire un modèle de menace</h2>
        <p>Un modèle de menace tient en quatre temps&nbsp;: choisir les actifs, nommer les attaquants plausibles, décrire les chemins, puis choisir une parade et un responsable. Le tableau se remplit en atelier court, avec les personnes qui connaissent le terrain.</p>
        <div className="cyber-table-wrap">
          <table>
            <caption>Modèle de menace</caption>
            <thead>
              <tr><th scope="col">Actif</th><th scope="col">Menace</th><th scope="col">Chemin</th><th scope="col">Impact</th><th scope="col">Parade</th></tr>
            </thead>
            <tbody>
              <tr><td>Contacts d’adhérents</td><td>Hameçonnage</td><td>Courriel au bureau</td><td>Perte de données</td><td>MFA et sensibilisation</td></tr>
              <tr><td>Compte administrateur</td><td>Vol d’identifiants</td><td>Mot de passe réutilisé</td><td>Prise de contrôle</td><td>Coffre et MFA</td></tr>
              <tr><td>Site public</td><td>Défiguration</td><td>Dépendance vulnérable</td><td>Atteinte à l’image</td><td>Mises à jour et sauvegarde</td></tr>
              <tr><td>Sauvegardes</td><td>Rançongiciel</td><td>Poste compromis</td><td>Perte de service</td><td>Copie hors ligne testée</td></tr>
              <tr><td>Prestataire</td><td>Accès trop large</td><td>Compte partagé</td><td>Fuite de données</td><td>Moindre privilège et revue</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="surface">
        <h2>Surface d’attaque</h2>
        <p>La surface d’attaque est l’ensemble des points d’entrée par lesquels une menace peut atteindre un actif. Elle se regarde par couches, pas seulement dans le code.</p>
        <ul>
          <li>Le navigateur et les pages publiques.</li>
          <li>Les comptes et les mots de passe.</li>
          <li>Les dépendances et les mises à jour.</li>
          <li>Les fournisseurs et leurs accès.</li>
          <li>Le bâtiment, les postes et les supports amovibles.</li>
          <li>Les personnes, leurs habitudes et leurs échanges.</li>
        </ul>
      </section>

      <section id="proportionner">
        <h2>Proportionner les parades</h2>
        <p>Quatre familles de réponses existent&nbsp;: réduire le risque, l’éviter, le transférer ou l’accepter. Le choix dépend de l’impact, de la vraisemblance, du coût et de la réversibilité.</p>
        <ul>
          <li><strong>Réduire.</strong> Ajouter une MFA, limiter un droit, tester une sauvegarde.</li>
          <li><strong>Éviter.</strong> Renoncer à une fonction ou à un fournisseur qui crée trop de risque.</li>
          <li><strong>Transférer.</strong> Passer par un contrat, une assurance ou un service spécialisé.</li>
          <li><strong>Accepter.</strong> Documenter le risque, son propriétaire et la date de revue.</li>
        </ul>
        <p>Une parade proportionnée n’est pas la plus puissante. C’est celle qui rend le risque lisible et tenable dans le temps imparti.</p>
      </section>

      <CyberCallout titre="Limite" variante="limite">
        <p>Un modèle de menace n’est pas une garantie. C’est une liste priorisée à revoir à chaque jalon.</p>
      </CyberCallout>

      <section id="verifier">
        <h2>Vérifier et mettre à jour</h2>
        <p>Le modèle se relit au cadrage, avant la mise en ligne et après chaque incident. Un changement de fournisseur, une nouvelle fonction ou un départ peuvent modifier la surface d’attaque.</p>
        <p>Chaque ligne garde un responsable et un déclencheur. Une parade sans preuve reste une intention.</p>
      </section>
    </CyberLayout>
  );
}

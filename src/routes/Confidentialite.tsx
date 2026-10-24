// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function Confidentialite() {
  return (
    <article className="module-page">
      <SeoHead
        title="Confidentialité"
        description={'Politique de confidentialité de Gestion de Projet IT\u00A0: données, journaux, emails, stockage local et droits RGPD.'}
      />
      <header className="module-head">
        <p className="kicker">Vie privée</p>
        <h1>Politique de confidentialité</h1>
        <p>Ce site fonctionne sans compte, sans cookie et sans mesure d’audience. Cette page décrit les données techniques et les droits des personnes.</p>
      </header>

      <section aria-labelledby="responsable">
        <h2 id="responsable">Responsable de traitement</h2>
        <p><strong>Geoffroy Streit</strong>, particulier.</p>
        <p>Contact&nbsp;: <a href="mailto:geoffroy.streit@gmail.com">geoffroy.streit@gmail.com</a></p>
      </section>

      <section aria-labelledby="donnees">
        <h2 id="donnees">Données traitées</h2>
        <h3>Journaux du serveur</h3>
        <p>Le serveur Nginx enregistre l’adresse IP, le user-agent, la date, l’URL demandée, le code de réponse et les erreurs techniques. Ces données servent à la sécurité, au diagnostic et à la prévention des abus, sur la base de l’intérêt légitime.</p>
        <p>La conservation est de six mois, avec une rotation mensuelle et six archives conservées en plus du mois en cours.</p>
        <h3>Emails de contact</h3>
        <p>Si vous écrivez à l’adresse de contact, votre adresse email et le contenu du message servent uniquement à répondre à votre demande. Les messages sont conservés douze mois après le dernier échange, puis supprimés.</p>
        <p>La messagerie est fournie par Google. Le mécanisme de transfert applicable est celui prévu par Google pour Gmail.</p>
        <h3>Stockage local</h3>
        <p>Les fonctionnalités de progression, de quiz, de laboratoires, de dossier projet et de journal conservent des données dans le navigateur, sous le préfixe <code>gestion-projet-it:</code>.</p>
        <p>Les entrées comprennent la progression, les réponses de quiz, les laboratoires terminés, les modules terminés, le dossier projet et le journal. Ces données ne sont jamais transmises au serveur. Vous pouvez les effacer en supprimant les données du site dans votre navigateur.</p>
      </section>

      <section aria-labelledby="cookies">
        <h2 id="cookies">Cookies et traceurs</h2>
        <p>Le site n’utilise aucun cookie, aucun analytics, aucun pixel et aucun traceur publicitaire.</p>
        <p>Le stockage local est strictement nécessaire aux fonctionnalités demandées. Il ne sert ni à la publicité ni au profilage.</p>
      </section>

      <section aria-labelledby="destinataires">
        <h2 id="destinataires">Destinataires et transferts</h2>
        <p>Les journaux sont hébergés par <strong>Hostinger International Limited</strong>, 61 Lordou Vironos Street, 6023 Larnaca, Chypre. Le serveur du site est situé au Royaume-Uni, à Manchester. Le contrat de sous-traitance Hostinger est référencé à l’adresse <a href="https://www.hostinger.com/legal/dpa" target="_blank" rel="noopener noreferrer">hostinger.com/legal/dpa</a>.</p>
        <p>La Commission européenne a renouvelé la décision d’adéquation pour le Royaume-Uni le 19 décembre 2025. Les transferts vers le Royaume-Uni reposent sur cette décision tant qu’elle reste en vigueur.</p>
        <p>Les emails sont traités par Google. Le dépôt public est hébergé par GitHub. Ces services disposent de leurs propres politiques de confidentialité.</p>
      </section>

      <section aria-labelledby="droits">
        <h2 id="droits">Vos droits</h2>
        <p>Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité prévus par le RGPD.</p>
        <p>Pour les données locales, l’effacement et la modification se font directement dans votre navigateur. Pour les journaux ou les emails, écrivez à <a href="mailto:geoffroy.streit@gmail.com">geoffroy.streit@gmail.com</a>.</p>
        <p>Vous pouvez adresser une réclamation à la <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">CNIL</a>.</p>
      </section>

      <section aria-labelledby="securite">
        <h2 id="securite">Sécurité et gouvernance</h2>
        <p>Le site ne pratique ni profilage, ni décision automatisée, ni cession de données. Aucun DPO n’est désigné et aucune analyse d’impact n’est requise pour les traitements actuels.</p>
        <p>Une procédure de signalement est décrite dans le fichier <code>SECURITY.md</code> du dépôt public.</p>
      </section>

      <p className="help">Dernière mise à jour&nbsp;: 24 octobre 2026. <Link to="/mentions-legales">Mentions légales</Link></p>
    </article>
  );
}


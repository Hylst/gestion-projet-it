// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function Accessibilite() {
  return (
    <article className="module-page">
      <SeoHead
        title="Accessibilité"
        description={'Accessibilité de Gestion de Projet IT\u00A0: démarche WCAG 2.2 AA, contrôles clavier, contrastes, limites et contact.'}
      />
      <header className="module-head">
        <p className="kicker">Accessibilité</p>
        <h1>Accessibilité</h1>
        <p>Le site vise une expérience lisible, navigable au clavier et compréhensible sans dépendre d’un seul sens.</p>
      </header>

      <section aria-labelledby="demarche">
        <h2 id="demarche">Démarche</h2>
        <p>Les pages ont été contrôlées selon les critères WCAG 2.2 AA&nbsp;: structure, contrastes, labels, focus, navigation au clavier, messages d’erreur et respect du mouvement réduit.</p>
        <p>Les tests automatisés couvrent les routes, le clavier, l’impression, le mode hors ligne et l’absence de requête externe. Un audit manuel complète les mesures Lighthouse.</p>
      </section>

      <section aria-labelledby="points">
        <h2 id="points">Points vérifiés</h2>
        <ul>
          <li>Un seul titre principal par page et une hiérarchie de titres continue.</li>
          <li>Lien d’évitement, focus visible et retour du focus après les actions.</li>
          <li>Labels associés aux champs et messages d’erreur explicites.</li>
          <li>Contrastes AA et zoom navigateur à 200&nbsp;%.</li>
          <li>Respect de <code>prefers-reduced-motion</code>.</li>
          <li>Impression lisible et mode hors ligne.</li>
        </ul>
      </section>

      <section aria-labelledby="limites">
        <h2 id="limites">Limites</h2>
        <p>Le parcours Cybersécurité a été audité le 30 octobre 2026. Le parcours Produit n’est pas encore ouvert&nbsp;; son audit sera réalisé à sa livraison, selon la checklist interne.</p>
        <p>Les sites externes cités dans les ressources ne sont pas contrôlés par l’auteur. Les scores Lighthouse dépendent du poste et du réseau local.</p>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Signaler un problème</h2>
        <p>Si une page reste difficile à utiliser, écrivez à <a href="mailto:geoffroy.streit@gmail.com">geoffroy.streit@gmail.com</a> avec la page concernée et le blocage rencontré.</p>
        <p>Les demandes sont traitées dans un délai raisonnable, sans promesse de délai contractuel.</p>
      </section>

      <p className="help">Dernière mise à jour&nbsp;: 30 octobre 2026. <Link to="/mentions-legales">Mentions légales</Link></p>
    </article>
  );
}

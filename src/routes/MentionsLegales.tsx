// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function MentionsLegales() {
  return (
    <article className="module-page">
      <SeoHead
        title="Mentions légales"
        description={'Mentions légales de Gestion de Projet IT\u00A0: éditeur, hébergeur, licence, source et informations de contact.'}
      />
      <header className="module-head">
        <p className="kicker">Informations légales</p>
        <h1>Mentions légales</h1>
        <p>Éditeur, hébergement, licence et informations de contact du site Gestion de Projet IT.</p>
      </header>

      <section aria-labelledby="editeur">
        <h2 id="editeur">Éditeur</h2>
        <p><strong>Geoffroy Streit</strong>, particulier.</p>
        <p>Contact&nbsp;: <a href="mailto:geoffroy.streit@gmail.com">geoffroy.streit@gmail.com</a></p>
        <p>Directeur de la publication&nbsp;: Geoffroy Streit.</p>
        <p>Le site est un projet personnel à caractère éducatif, sans activité commerciale.</p>
      </section>

      <section aria-labelledby="hebergement">
        <h2 id="hebergement">Hébergement</h2>
        <p>Le site est hébergé par <strong>Hostinger International Limited</strong>, 61 Lordou Vironos Street, 6023 Larnaca, Chypre.</p>
        <p>Le serveur est situé au Royaume-Uni, à Manchester. Il est administré via Coolify et un conteneur Nginx statique.</p>
      </section>

      <section aria-labelledby="source">
        <h2 id="source">Source et licence</h2>
        <p>Le code source est publié sur <a href="https://github.com/Hylst/gestion-projet-it" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <p>Le code et les contenus rédigés sont distribués sous licence <strong>AGPL-3.0-or-later</strong>. Le texte de la licence est disponible dans le dépôt et dans <a href="/gestion-projet-it/LICENSE.txt">le fichier de licence du site</a>.</p>
      </section>

      <section aria-labelledby="propriete">
        <h2 id="propriete">Propriété intellectuelle et IA</h2>
        <p>Les textes et le code ont été produits par Geoffroy Streit avec une assistance par IA, puis relus et testés. Les illustrations SVG et les éléments graphiques ont été créés avec un assistant IA local et Z-Image-Turbo local.</p>
        <p>Les contenus tiers, les marques et les ressources citées restent soumis à leurs licences et à leurs conditions d’utilisation.</p>
        <p>La <Link to="/transparence-ia">page de transparence IA</Link> détaille les outils, les limites et l’absence d’IA au runtime.</p>
      </section>

      <section aria-labelledby="donnees">
        <h2 id="donnees">Données personnelles</h2>
        <p>Le site ne crée aucun compte, ne pose aucun cookie et ne transmet aucune donnée de progression. Les journaux techniques du serveur sont décrits dans la <Link to="/confidentialite">politique de confidentialité</Link>.</p>
      </section>

      <section aria-labelledby="accessibilite">
        <h2 id="accessibilite">Accessibilité</h2>
        <p>Une démarche WCAG 2.2 AA et un point de contact sont décrits sur la <Link to="/accessibilite">page Accessibilité</Link>.</p>
      </section>

      <p className="help">Dernière mise à jour&nbsp;: 24 octobre 2026.</p>
    </article>
  );
}

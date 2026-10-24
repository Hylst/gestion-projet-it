// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function Apropos() {
  return (
    <article className="module-page module-theme-4">
      <SeoHead title="À propos" description={'Gestion de Projet IT\u00A0: cours interactif réalisé par Geoffroy Streit avec assistance IA, licence AGPL-3.0-or-later, sans compte ni cookie.'} />
      <header className="module-head">
        <p className="kicker">Le projet</p>
        <h1>À propos du projet</h1>
        <p className="accroche"><strong>Gestion de Projet IT, Méthodologies et Équipes.</strong> Un cours interactif en 9 modules&nbsp;: cadrer et découper, planifier, choisir sa méthode, agiles, outils CI/CD, équipe et risques, parties prenantes et communication, budget et chiffrage, conduite du changement.</p>
      </header>
      <section>
        <h2>Paternité</h2>
        <p>Réalisé par <strong>Geoffroy Streit</strong> avec assistance IA. Le code, les tests et les textes ont été relus et corrigés avant publication. Les illustrations ont été générées par IA en local.</p>
        <p>La <Link to="/transparence-ia">page de transparence IA</Link> détaille les outils, les modèles, les limites et l’absence d’IA au runtime.</p>
      </section>
      <section>
        <h2>Source et licence</h2>
        <p>Le code source est public sur <a href="https://github.com/Hylst/gestion-projet-it" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <p>Licence <strong>AGPL-3.0-or-later</strong>. Le texte complet est disponible dans le dépôt et dans <a href="/gestion-projet-it/LICENSE.txt">le fichier de licence du site</a>.</p>
        <p>Les crédits et la provenance des illustrations sont documentés dans <a href="https://github.com/Hylst/gestion-projet-it/blob/main/CREDITS.md" target="_blank" rel="noopener noreferrer">CREDITS.md</a>.</p>
      </section>
      <section>
        <h2>Données et vie privée</h2>
        <p>L’application fonctionne 100&nbsp;% côté navigateur&nbsp;: aucun compte, aucun cookie, aucune donnée sortante. La progression est stockée localement (entrées gestion-projet-it:*), exportable et importable en JSON.</p>
        <p>Les journaux techniques du serveur et les droits RGPD sont décrits dans la <Link to="/confidentialite">politique de confidentialité</Link>.</p>
      </section>
      <section>
        <h2>Le fil rouge</h2>
        <p>Un seul cas fictif soutient les 9 modules&nbsp;: la refonte du site de l’association fictive Les Amis du Square (pages de présentation, agenda des activités, formulaire de contact fictif). Tous les exemples restent fictifs.</p>
        <p className="help"><Link to="/mentions-legales">Mentions légales</Link> · <Link to="/accessibilite">Accessibilité</Link></p>
      </section>
    </article>
  );
}

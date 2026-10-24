// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export default function NotFound() {
  return (
    <article className="module-page module-theme-6">
      <SeoHead title="Page introuvable" description="Cette route n’existe pas dans le cours." noindex />
      <header className="module-head">
        <p className="kicker">Erreur 404</p>
        <h1>Page introuvable</h1>
        <p className="accroche">Cette route n’existe pas dans le cours.</p>
      </header>
      <section>
        <p>Retour vers <Link to="/">l’accueil du cours</Link>.</p>
      </section>
    </article>
  );
}

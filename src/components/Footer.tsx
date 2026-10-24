// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <p>
        Gestion de Projet IT. Réalisé par <strong>Geoffroy Streit</strong> avec assistance IA.
        Code et textes assistés par IA. Illustrations générées par IA en local.
        Licence AGPL-3.0-or-later. Aucun compte, aucun cookie, aucune donnée sortante.
      </p>
      <nav className="footer-liens" aria-label="Liens légaux et documentation">
        <Link to="/a-propos">À propos</Link>
        <Link to="/glossaire">Glossaire</Link>
        <Link to="/ressources">Ressources</Link>
        <Link to="/modeles">Journal et modèles</Link>
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/confidentialite">Confidentialité</Link>
        <Link to="/transparence-ia">Transparence IA</Link>
        <Link to="/accessibilite">Accessibilité</Link>
        <a href="https://github.com/Hylst/gestion-projet-it" target="_blank" rel="noopener noreferrer">Source</a>
        <a href="/gestion-projet-it/LICENSE.txt">Licence</a>
      </nav>
    </footer>
  );
}

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <p>
        Gestion de Projet IT. Réalisé par Geoffroy avec assistance IA.
        Licence AGPL-3.0-or-later. Aucun compte, aucun cookie, aucune donnée sortante.{" "}
        <Link to="/a-propos">À propos du projet</Link>{" "}<Link to="/glossaire">Glossaire</Link>{" "}<Link to="/ressources">Ressources</Link>{" "}<Link to="/modeles">Journal et modèles</Link>
      </p>
    </footer>
  );
}

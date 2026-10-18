import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <p>
        Gestion de Projet IT. Realise par Geoffroy avec assistance IA.
        Licence AGPL-3.0-or-later. Aucun compte, aucun cookie, aucune donnee sortante.{" "}
        <Link to="/a-propos">A propos du projet</Link>
      </p>
    </footer>
  );
}

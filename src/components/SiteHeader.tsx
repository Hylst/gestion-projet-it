import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProgressHeader from './ProgressHeader';

export default function SiteHeader() {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <div className="brand">
          <a className="skip-link" href="#contenu" data-testid="skip">Aller au contenu</a>
          <Link className="brand-link" to="/">
            <span className="logo-mark" aria-hidden="true"><span /></span>
            <strong>Gestion de Projet IT</strong>
            <span className="brand-sub">Méthodologies et Équipes</span>
          </Link>
        </div>
        <nav aria-label="Navigation principale">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/ia">IA</NavLink>
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/glossaire">Glossaire</NavLink>
          <NavLink to="/dossier-projet">Dossier projet</NavLink>
        </nav>
        <div id="header-tools"><SearchBar /> <ProgressHeader /></div>
      </div>
    </header>
  );
}

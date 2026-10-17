import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProgressHeader from './ProgressHeader';

export default function SiteHeader() {
  return (
    <header className="site-header" role="banner">
      <div className="brand">
        <a className="skip-link" href="#contenu" data-testid="skip">Aller au contenu</a>
        <span className="logo-mark" aria-hidden="true"><span /></span>
        <strong>Gestion de Projet IT</strong>
        <span className="brand-sub">Methodologies et Equipes</span>
      </div>
      <nav aria-label="Navigation principale">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/a-propos">A propos</NavLink>
      </nav>
      <div id="header-tools"><SearchBar /> <ProgressHeader /></div>
    </header>
  );
}

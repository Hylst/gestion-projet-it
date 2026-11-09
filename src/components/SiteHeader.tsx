// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProgressHeader from './ProgressHeader';
import { MODULES } from '../modules/index';

interface NavItem {
  to: string;
  label: string;
  titre?: string;
  section?: boolean;
}

const LIENS: NavItem[] = [
  { to: '/', label: 'Accueil' },
  ...MODULES.map((m) => ({
    to: `/${m.slug}`,
    label: `Module ${m.num} · ${m.navLabel}`,
    titre: m.titre,
  })),
  { to: '/dossier-projet', label: 'Dossier projet' },
  { to: '/ia', label: 'IA', section: true },
  { to: '/cybersecurite', label: 'Cybersécurité', section: true },
  { to: '/outils', label: 'Fiches outils' },
  { to: '/glossaire', label: 'Glossaire' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/a-propos', label: 'À propos' },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const railRef = useRef<HTMLElement>(null);
  const [debut, setDebut] = useState(true);
  const [fin, setFin] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maj = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setDebut(rail.scrollLeft <= 1);
      setFin(rail.scrollLeft >= max - 1);
    };

    maj();
    rail.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    return () => {
      rail.removeEventListener('scroll', maj);
      window.removeEventListener('resize', maj);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !rail.clientWidth) return;

    const actif = rail.querySelector<HTMLElement>('[aria-current]');
    if (!actif) return;

    const railRect = rail.getBoundingClientRect();
    const actifRect = actif.getBoundingClientRect();
    const marge = 24;
    if (actifRect.left >= railRect.left + marge && actifRect.right <= railRect.right - marge) return;

    const cible = Math.max(
      0,
      rail.scrollLeft + (actifRect.left - railRect.left) - (rail.clientWidth - actif.offsetWidth) / 2,
    );
    const reduire = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const options: ScrollToOptions = { left: cible, behavior: reduire ? 'auto' : 'smooth' };

    if (typeof rail.scrollTo === 'function') rail.scrollTo(options);
    else rail.scrollLeft = cible;
  }, [pathname]);

  function estActif(item: NavItem): boolean {
    return item.section
      ? pathname === item.to || pathname.startsWith(`${item.to}/`)
      : pathname === item.to;
  }

  function courant(item: NavItem): 'page' | 'true' | undefined {
    if (pathname === item.to) return 'page';
    return estActif(item) ? 'true' : undefined;
  }

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
        <div id="header-tools"><SearchBar /> <ProgressHeader /></div>
      </div>
      <div className={`header-nav-wrap${debut ? ' is-debut' : ''}${fin ? ' is-fin' : ''}`}>
        <nav className="header-nav" aria-label="Navigation principale" ref={railRef}>
          <ul className="header-nav-list">
            {LIENS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} aria-current={courant(item)} title={item.titre}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

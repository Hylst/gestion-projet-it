// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from '../src/components/SiteHeader';
import { MODULES } from '../src/modules/index';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

function rendu(route = '/'): ReturnType<typeof render> {
  return render(
    <ProgressProvider>
      <MemoryRouter initialEntries={[route]}>
        <SiteHeader />
      </MemoryRouter>
    </ProgressProvider>,
  );
}

const LIBELLES = [
  'Accueil',
  ...MODULES.map((m) => `Module ${m.num} · ${m.navLabel}`),
  'Dossier projet',
  'IA',
  'Cybersécurité',
  'Fiches outils',
  'Glossaire',
  'Ressources',
  'À propos',
];

describe('en-tete', () => {
  it('header-inner, marque cliquable et skip-link hors lien', () => {
    const { container } = rendu();
    const header = container.querySelector('header.site-header');
    expect(header).not.toBeNull();
    const inner = header?.querySelector(':scope > .header-inner');
    expect(inner).not.toBeNull();
    const brand = inner?.querySelector(':scope > .brand');
    expect(brand).not.toBeNull();
    const skip = brand?.querySelector('a.skip-link');
    expect(skip?.getAttribute('href')).toBe('#contenu');
    const marque = brand?.querySelector('a.brand-link');
    expect(marque?.getAttribute('href')).toBe('/');
    expect(marque?.textContent).toContain('Gestion de Projet IT');
    expect(marque?.textContent).toContain('Méthodologies et Équipes');
    expect(marque?.querySelector('.skip-link')).toBeNull();
    expect(inner?.querySelector(':scope > #header-tools')).not.toBeNull();
  });

  it('un seul lien courant selon la route', () => {
    const cas: Array<[string, string]> = [
      ['/', 'Accueil'],
      ['/a-propos', 'À propos'],
      ['/glossaire', 'Glossaire'],
      ['/dossier-projet', 'Dossier projet'],
      ['/ressources', 'Ressources'],
      ['/outils', 'Fiches outils'],
      ['/ia', 'IA'],
      ['/ia/usages', 'IA'],
      ['/cybersecurite', 'Cybersécurité'],
      ['/cybersecurite/menaces', 'Cybersécurité'],
      ['/module-6', 'Module 6 · Équipe et risques'],
    ];
    for (const [route, attendu] of cas) {
      const { container, unmount } = rendu(route);
      const courants = Array.from(container.querySelectorAll('.header-nav a[aria-current]')).map((a) => a.textContent);
      expect(courants).toEqual([attendu]);
      unmount();
    }
  });

  it('expose le lien IA dans la navigation principale', () => {
    const { container } = rendu();
    const lien = container.querySelector('nav[aria-label="Navigation principale"] a[href="/ia"]');
    expect(lien?.textContent).toBe('IA');
  });

  it('expose le lien Cybersecurite dans la navigation principale', () => {
    const { container } = rendu();
    const lien = container.querySelector('nav[aria-label="Navigation principale"] a[href="/cybersecurite"]');
    expect(lien?.textContent).toBe('Cybersécurité');
  });

  it('chaque module expose un libellé court pour le menu', () => {
    expect(MODULES.map((m) => m.navLabel)).toEqual([
      'Cadrer et découper',
      'Planifier',
      'Méthodes',
      'Agiles',
      'Outils et CI/CD',
      'Équipe et risques',
      'Parties prenantes',
      'Budget',
      'Changement',
    ]);
  });

  it('affiche les 17 entrées dans l ordre', () => {
    const { container } = rendu();
    const liens = Array.from(container.querySelectorAll('.header-nav a'));
    expect(liens).toHaveLength(17);
    expect(liens.map((a) => a.textContent)).toEqual(LIBELLES);
    expect(new Set(liens.map((a) => a.getAttribute('href'))).size).toBe(17);
  });

  it('place le ruban hors de la première ligne', () => {
    const { container } = rendu();
    const header = container.querySelector('header.site-header');
    expect(header?.querySelector('.header-inner nav')).toBeNull();
    expect(header?.querySelector('.header-nav-wrap nav[aria-label="Navigation principale"]')).not.toBeNull();
    expect(header?.querySelector('.header-inner #header-tools')).not.toBeNull();
  });

  it('marque l entrée active selon la route', () => {
    const cas: Array<[string, string, string]> = [
      ['/', 'Accueil', 'page'],
      ['/module-6', 'Module 6 · Équipe et risques', 'page'],
      ['/ia', 'IA', 'page'],
      ['/ia/usages', 'IA', 'true'],
      ['/cybersecurite', 'Cybersécurité', 'page'],
      ['/cybersecurite/menaces', 'Cybersécurité', 'true'],
      ['/outils', 'Fiches outils', 'page'],
    ];
    for (const [route, libelle, courant] of cas) {
      const { container, unmount } = rendu(route);
      const lien = Array.from(container.querySelectorAll('.header-nav a'))
        .find((a) => a.textContent === libelle);
      expect(lien?.getAttribute('aria-current')).toBe(courant);
      unmount();
    }
  });

  it('conserve le titre complet des modules en attribut title', () => {
    const { container } = rendu('/module-1');
    const lien = container.querySelector('.header-nav a[href="/module-1"]');
    expect(lien?.getAttribute('title')).toBe('Cadrer et découper (WBS)');
  });
});

import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from '../src/components/SiteHeader';
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
    expect(inner?.querySelector('nav[aria-label="Navigation principale"]')).not.toBeNull();
    expect(inner?.querySelector(':scope > #header-tools')).not.toBeNull();
  });

  it('un seul lien courant selon la route', () => {
    const cas: Array<[string, string | null]> = [
      ['/', 'Accueil'],
      ['/a-propos', 'À propos'],
      ['/glossaire', 'Glossaire'],
      ['/module-6', null],
    ];
    for (const [route, attendu] of cas) {
      const { container, unmount } = rendu(route);
      const courants = Array.from(container.querySelectorAll('nav a[aria-current="page"]')).map((a) => a.textContent);
      expect(courants).toEqual(attendu ? [attendu] : []);
      unmount();
    }
  });
});

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ressources from '../src/routes/Ressources';
import { RESSOURCES_MODULES, RESSOURCES_PARCOURS } from '../src/lib/ressources';

afterEach(cleanup);

const rendre = () => render(<MemoryRouter><Ressources /></MemoryRouter>);

describe('bibliothèque de ressources', () => {
  it('couvre neuf modules et deux parcours', () => {
    expect(RESSOURCES_MODULES).toHaveLength(9);
    expect(RESSOURCES_PARCOURS).toHaveLength(2);
    for (const groupe of [...RESSOURCES_MODULES, ...RESSOURCES_PARCOURS]) {
      expect(groupe.ressources.length).toBeGreaterThanOrEqual(1);
      expect(groupe.ressources.length).toBeLessThanOrEqual(3);
      for (const ressource of groupe.ressources) {
        expect(ressource.url).toMatch(/^https:\/\//);
        expect(ressource.organisme.length).toBeGreaterThan(2);
        expect(ressource.usage.length).toBeGreaterThan(10);
        expect(ressource.limite.length).toBeGreaterThan(10);
        expect(ressource.verifieLe).toBe('24 octobre 2026');
      }
    }
  });

  it('rend les sections et des liens externes sûrs', () => {
    rendre();
    expect(screen.getByRole('heading', { level: 1, name: 'Ressources et outils' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Module 1/ })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Parcours Produit/ })).toBeTruthy();
    const externes = screen.getAllByRole('link').filter((a) => a.getAttribute('href')?.startsWith('https://'));
    expect(externes.length).toBeGreaterThanOrEqual(24);
    for (const lien of externes) {
      expect(lien.getAttribute('target')).toBe('_blank');
      expect(lien.getAttribute('rel')).toBe('noopener noreferrer');
    }
  });
});

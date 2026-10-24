import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Outils from '../src/routes/Outils';
import { CRITERES_OUTILS, FICHES_OUTILS } from '../src/lib/outils';

afterEach(cleanup);

describe('fiches outils', () => {
  it('contient six fiches complètes', () => {
    expect(FICHES_OUTILS).toHaveLength(6);
    for (const fiche of FICHES_OUTILS) {
      expect(fiche.id.length).toBeGreaterThan(2);
      for (const champ of [fiche.titre, fiche.objectif, fiche.moment, fiche.limites, fiche.alternatives, fiche.cout, fiche.sortie]) {
        expect(champ.length, fiche.id).toBeGreaterThan(15);
      }
    }
  });

  it('contient six critères de comparaison', () => {
    expect(CRITERES_OUTILS).toHaveLength(6);
    for (const critere of CRITERES_OUTILS) {
      expect(critere.question.length).toBeGreaterThan(15);
      expect(critere.signal.length).toBeGreaterThan(15);
    }
  });

  it('rend les fiches, la grille et les liens internes', () => {
    render(<MemoryRouter><Outils /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Fiches outils' })).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(7);
    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.getAllByRole('row')).toHaveLength(7);
    expect(screen.getByRole('link', { name: /Ressources et outils/ }).getAttribute('href')).toBe('/ressources');
    expect(screen.getByRole('link', { name: /Module 5/ }).getAttribute('href')).toBe('/module-5');
  });
});

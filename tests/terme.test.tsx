// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Terme } from '../src/components/Terme';

afterEach(cleanup);

describe('Terme (composant infobulle accessible)', () => {
  it('affiche le déclencheur avec les attributs d’accessibilité fermés', () => {
    render(
      <MemoryRouter>
        <p>Le <Terme id="wbs">WBS</Terme> découpe les livrables.</p>
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: /WBS/i });
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    const describedby = trigger.getAttribute('aria-describedby');
    expect(describedby).toBeTruthy();
    expect(document.getElementById(describedby as string)).toBeNull();
  });

  it('ouvre l’infobulle au clic et affiche la définition, le sigle et le lien glossaire', () => {
    render(
      <MemoryRouter>
        <p>Le <Terme id="wbs">WBS</Terme> découpe les livrables.</p>
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: /WBS/i });
    fireEvent.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toContain('Work Breakdown Structure');
    expect(tooltip.textContent).toContain('Découpage hiérarchique');

    const lien = screen.getByRole('link', { name: /Voir dans le glossaire/i });
    expect(lien.getAttribute('href')).toContain('/glossaire#wbs');
  });

  it('se ferme lors de l’appui sur la touche Échap', () => {
    render(
      <MemoryRouter>
        <p>Le <Terme id="wbs">WBS</Terme> découpe les livrables.</p>
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: /WBS/i });
    fireEvent.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeNull();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('se ferme lors d’un clic en dehors', () => {
    render(
      <MemoryRouter>
        <div>
          <button type="button">Autre élément</button>
          <p>Le <Terme id="pert">PERT</Terme> ordonne.</p>
        </div>
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: /PERT/i });
    fireEvent.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeNull();

    fireEvent.pointerDown(screen.getByRole('button', { name: /Autre élément/i }));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('gère les bases informatiques comme API ou Serveur', () => {
    render(
      <MemoryRouter>
        <p>Une <Terme id="api">API</Terme> relie les services.</p>
      </MemoryRouter>,
    );

    const trigger = screen.getByRole('button', { name: /API/i });
    fireEvent.click(trigger);

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.textContent).toContain('Application Programming Interface');
    expect(tooltip.textContent).toContain('Interface logicielle');
  });

  it('affiche le texte brut si le terme est inconnu', () => {
    render(
      <MemoryRouter>
        <p>Un <Terme id="inconnu-x99">Terme Inconnu</Terme>.</p>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Terme Inconnu')).toBeDefined();
  });
});

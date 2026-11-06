// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Accueil from '../src/routes/accueil';
import Onboarding from '../src/components/Onboarding';
import { ProgressProvider } from '../src/lib/progress';
import { ONBOARDING_KEY, ONBOARDING_SLIDES } from '../src/lib/onboarding';

beforeEach(() => localStorage.clear());
afterEach(cleanup);

const rendreAccueil = () =>
  render(
    <ProgressProvider>
      <MemoryRouter>
        <Accueil />
      </MemoryRouter>
    </ProgressProvider>,
  );

const dialogue = () => screen.getByRole('dialog');

describe('onboarding', () => {
  it('ouvre la visite a la premiere visite', () => {
    rendreAccueil();
    expect(dialogue()).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: ONBOARDING_SLIDES[0]?.titre })).not.toBeNull();
    expect(screen.getByText('Étape 1 sur 5')).not.toBeNull();
    expect(dialogue().getAttribute('aria-modal')).toBe('true');
  });

  it('ne rouvre pas la visite si elle a deja ete vue', () => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ version: 1, vu: true }));
    rendreAccueil();
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Revoir la présentation' })).not.toBeNull();
  });

  it('ferme, marque la visite et rend le focus au bouton de relecture', async () => {
    rendreAccueil();
    fireEvent.click(screen.getByRole('button', { name: 'Passer' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? '{}')).toEqual({ version: 1, vu: true });
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Revoir la présentation' }));
    });
  });

  it('rouvre la visite depuis le bouton de relecture', () => {
    rendreAccueil();
    fireEvent.click(screen.getByRole('button', { name: 'Passer' }));
    fireEvent.click(screen.getByRole('button', { name: 'Revoir la présentation' }));
    expect(dialogue()).not.toBeNull();
    expect(screen.getByText('Étape 1 sur 5')).not.toBeNull();
  });

  it('parcourt les cinq etapes et termine', () => {
    rendreAccueil();
    for (let i = 1; i < ONBOARDING_SLIDES.length; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: 'Suivant' }));
      expect(screen.getByText(`Étape ${i + 1} sur 5`)).not.toBeNull();
    }
    expect(screen.queryByRole('button', { name: 'Suivant' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Terminer' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('revient a l etape precedente', () => {
    rendreAccueil();
    fireEvent.click(screen.getByRole('button', { name: 'Suivant' }));
    fireEvent.click(screen.getByRole('button', { name: 'Précédent' }));
    expect(screen.getByText('Étape 1 sur 5')).not.toBeNull();
  });

  it('affiche cinq points de navigation et permet d aller a une etape', () => {
    rendreAccueil();
    expect(screen.getAllByRole('button', { name: /Aller à l’étape/ })).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: 'Aller à l’étape 4' }));
    expect(screen.getByText('Étape 4 sur 5')).not.toBeNull();
  });

  it('n affiche aucun XP', () => {
    rendreAccueil();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });

  it('ferme avec Echap', () => {
    const onFermer = vi.fn();
    render(<Onboarding onFermer={onFermer} />);
    fireEvent.keyDown(dialogue(), { key: 'Escape' });
    expect(onFermer).toHaveBeenCalledTimes(1);
  });

  it('change d etape avec les fleches, Debut et Fin', () => {
    render(<Onboarding onFermer={() => {}} />);
    fireEvent.keyDown(dialogue(), { key: 'ArrowRight' });
    expect(screen.getByText('Étape 2 sur 5')).not.toBeNull();
    fireEvent.keyDown(dialogue(), { key: 'Home' });
    expect(screen.getByText('Étape 1 sur 5')).not.toBeNull();
    fireEvent.keyDown(dialogue(), { key: 'End' });
    expect(screen.getByText('Étape 5 sur 5')).not.toBeNull();
  });

  it('piege le focus dans le dialogue', () => {
    render(<Onboarding onFermer={() => {}} />);
    const d = dialogue();
    expect(document.activeElement).toBe(d);
    const fermer = screen.getByRole('button', { name: 'Fermer la présentation' });
    const suivant = screen.getByRole('button', { name: 'Suivant' });
    suivant.focus();
    expect(document.activeElement).toBe(suivant);
    fireEvent.keyDown(d, { key: 'Tab' });
    expect(document.activeElement).toBe(fermer);
    fireEvent.keyDown(d, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(suivant);
  });
});

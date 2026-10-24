import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Modeles from '../src/routes/Modeles';
import { ENTREES_JOURNAL, JOURNAL_STORAGE_KEY } from '../src/lib/journal';

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});

const rendre = () => render(<MemoryRouter><Modeles /></MemoryRouter>);

describe('journal et modèles', () => {
  it('couvre les neuf modules et le dossier projet', () => {
    expect(ENTREES_JOURNAL).toHaveLength(10);
    expect(ENTREES_JOURNAL.map((entree) => entree.id)).toEqual([
      'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'dossier',
    ]);
  });

  it('enregistre localement une décision et sa suite', () => {
    rendre();
    const champs = screen.getAllByRole('textbox');
    expect(champs).toHaveLength(20);
    fireEvent.change(champs[0] as HTMLElement, { target: { value: 'Décision fictive' } });
    fireEvent.change(champs[1] as HTMLElement, { target: { value: 'Suite fictive' } });
    const sauvegarde = JSON.parse(localStorage.getItem(JOURNAL_STORAGE_KEY) ?? '{}');
    expect(sauvegarde.m1).toEqual({ decision: 'Décision fictive', suite: 'Suite fictive' });
    expect(screen.getByText('Enregistré localement')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Imprimer le journal' })).toBeTruthy();
  });

  it('signale un échec de sauvegarde locale', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    rendre();
    const champ = screen.getAllByRole('textbox')[0] as HTMLTextAreaElement;
    fireEvent.change(champ, { target: { value: 'Décision non enregistrée' } });
    expect(champ.value).toBe('Décision non enregistrée');
    expect(screen.getByText(/Sauvegarde impossible/)).toBeTruthy();
  });

  it('affiche la revue par les pairs et les six modèles', () => {
    rendre();
    expect(screen.getByRole('heading', { level: 2, name: /Revue par les pairs/ })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: /Modèles imprimables/ })).toBeTruthy();
    for (const titre of [
      'WBS', 'RACI', 'Registre des risques', 'Plan de recette', 'Journal de décisions', 'Guide d’entretien',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name: titre })).toBeTruthy();
    }
    expect(screen.getAllByRole('table').length).toBeGreaterThanOrEqual(6);
  });
});

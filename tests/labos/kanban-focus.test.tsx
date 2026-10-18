import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboKanban from '../../src/labos/LaboKanban';
import { ProgressProvider } from '../../src/lib/progress';

afterEach(cleanup);

describe('LaboKanban focus', () => {
  it('conserve le focus sur la carte deplacee dans sa nouvelle colonne', () => {
    render(
      <ProgressProvider>
        <LaboKanban valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    const bouton = screen.getByRole('button', { name: 'Avancer Page accueil' });
    bouton.focus();
    fireEvent.click(bouton);
    const apres = screen.getByRole('button', { name: 'Avancer Page accueil' });
    expect(apres).not.toBe(bouton);
    expect(document.activeElement).toBe(apres);
  });
});

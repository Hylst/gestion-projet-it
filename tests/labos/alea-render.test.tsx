import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import LaboAlea, { LOTS } from '../../src/labos/LaboAlea';
import { ProgressProvider } from '../../src/lib/progress';

afterEach(cleanup);

describe('LaboAlea libellés', () => {
  it('utilise apostrophes et espaces insécables dans le retour de choix', () => {
    render(
      <ProgressProvider>
        <LaboAlea valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    const lot = LOTS[0]!;
    const groupe = screen.getByRole('group', { name: lot.nom });
    fireEvent.click(within(groupe).getByRole('radio', { name: `Provision ${lot.provision}` }));
    expect(document.querySelector('.help')?.textContent).toBe(`«\u00A0${lot.nom}\u00A0»\u00A0: provision ${lot.provision}.`);
  });

  it('utilise apostrophes et espaces insécables dans les messages de vérification', () => {
    render(
      <ProgressProvider>
        <LaboAlea valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    const lot = LOTS[0]!;
    expect(document.querySelector('.messages .err')?.textContent).toBe(`«\u00A0${lot.nom}\u00A0» n’a pas encore de provision. Provision attendue\u00A0: ${lot.provision} (${lot.incertitude})`);
  });
});

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import LaboAdoption, { SITUATIONS } from '../../src/labos/LaboAdoption';
import { ProgressProvider } from '../../src/lib/progress';

afterEach(cleanup);

describe('LaboAdoption libellés', () => {
  it('utilise apostrophes et espaces insécables dans le retour de choix', () => {
    render(
      <ProgressProvider>
        <LaboAdoption valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    const situation = SITUATIONS[0]!;
    const groupe = screen.getByRole('group', { name: situation.nom });
    fireEvent.click(within(groupe).getByRole('radio', { name: situation.levier }));
    expect(document.querySelector('.help')?.textContent).toBe(`«\u00A0${situation.nom}\u00A0»\u00A0: ${situation.levier}.`);
  });

  it('utilise apostrophes et espaces insécables dans les messages de vérification', () => {
    render(
      <ProgressProvider>
        <LaboAdoption valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    const situation = SITUATIONS[0]!;
    expect(document.querySelector('.messages .err')?.textContent).toBe(`«\u00A0${situation.nom}\u00A0» n’a pas encore de levier. Levier attendu\u00A0: ${situation.levier}.`);
  });
});

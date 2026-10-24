// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import LaboCommunication, { PARTIES } from '../../src/labos/LaboCommunication';
import { ProgressProvider } from '../../src/lib/progress';

afterEach(cleanup);

describe('LaboCommunication libellés', () => {
  it('utilise apostrophes et espaces insécables dans le retour de choix', () => {
    render(
      <ProgressProvider>
        <LaboCommunication valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    const partie = PARTIES[0]!;
    const groupe = screen.getByRole('group', { name: partie.nom });
    fireEvent.click(within(groupe).getByRole('radio', { name: partie.canal }));
    expect(document.querySelector('.help')?.textContent).toBe(`«\u00A0${partie.nom}\u00A0»\u00A0: ${partie.canal}.`);
  });

  it('utilise apostrophes et espaces insécables dans les messages de vérification', () => {
    render(
      <ProgressProvider>
        <LaboCommunication valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    const partie = PARTIES[0]!;
    expect(document.querySelector('.messages .err')?.textContent).toBe(`«\u00A0${partie.nom}\u00A0» n’a pas encore de canal. Canal attendu\u00A0: ${partie.canal}.`);
  });
});

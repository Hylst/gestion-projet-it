// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboModeleMenace, { SCENARIOS } from '../../src/labos/LaboModeleMenace';

afterEach(cleanup);

describe('rendu du modele de menace', () => {
  it('valide les cinq parades et n affiche pas de XP', () => {
    render(<LaboModeleMenace />);
    for (const scenario of SCENARIOS) {
      fireEvent.click(screen.getByRole('radio', { name: scenario.parade }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('Les cinq scénarios ont une parade proportionnée.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});

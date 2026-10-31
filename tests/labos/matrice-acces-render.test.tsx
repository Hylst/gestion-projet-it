// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboMatriceAcces, { ROLES_ACCES } from '../../src/labos/LaboMatriceAcces';

afterEach(cleanup);

describe('rendu de la matrice des acces', () => {
  it('attribue les quatre droits minimaux sans XP', () => {
    render(<LaboMatriceAcces />);
    for (const role of ROLES_ACCES) {
      fireEvent.click(screen.getByRole('option', { name: new RegExp(role.role) }));
      fireEvent.click(screen.getByRole('button', { name: new RegExp(`Attribuer ${role.droit}`) }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('Chaque rôle a le droit minimal nécessaire.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});

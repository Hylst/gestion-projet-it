// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import LaboTimelineIncident from '../../src/labos/LaboTimelineIncident';

afterEach(cleanup);

describe('rendu de la chronologie', () => {
  it('reordonne les actions et valide sans XP', () => {
    render(<LaboTimelineIncident />);
    fireEvent.click(screen.getByRole('button', { name: 'Monter Détecter et qualifier l’alerte' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monter Préserver les journaux et les preuves' }));
    fireEvent.click(screen.getByRole('button', { name: 'Monter Restaurer et tester le service' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vérifier' }));
    expect(screen.getByText('La chronologie respecte l’ordre détecter, confiner, préserver, décider, restaurer, apprendre.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});

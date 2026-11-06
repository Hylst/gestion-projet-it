// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { LaboFrame } from '../../src/components/LaboFrame';

afterEach(cleanup);

const base = {
  titre: 'Labo de test',
  consigne: 'Consigne de test.',
  etapes: ['Une étape.'],
  etape: 1,
  etat: '',
  onVerifier: () => {},
  onReinitialiser: () => {},
};

describe('LaboFrame', () => {
  it('garde le message XP par defaut', () => {
    render(<LaboFrame {...base} valide><p>Contenu.</p></LaboFrame>);
    expect(screen.getByText(/Labo validé.*\+5 XP \(un seul gain\)\./)).not.toBeNull();
  });

  it('affiche un message sans XP quand demande', () => {
    render(
      <LaboFrame {...base} valide sansXp messageValide="Labo terminé : test.">
        <p>Contenu.</p>
      </LaboFrame>,
    );
    expect(screen.getByText('Labo terminé : test.')).not.toBeNull();
    expect(screen.queryByText(/\+5 XP/)).toBeNull();
  });
});

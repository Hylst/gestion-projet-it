import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PokerPlanning from '../../src/labos/PokerPlanning';
import { ProgressProvider } from '../../src/lib/progress';

afterEach(cleanup);

describe('PokerPlanning libellé', () => {
  it('utilise une espace insécable avant le deux-points de l estimation', () => {
    render(
      <ProgressProvider>
        <PokerPlanning valide={false} onValide={() => {}} />
      </ProgressProvider>,
    );
    fireEvent.click(screen.getByRole('option', { name: 'Agenda des activités' }));
    fireEvent.click(screen.getByRole('button', { name: 'Estimer Agenda des activités à 5' }));
    const story = screen.getByRole('option', { name: /Agenda des activités/ });
    expect(story.textContent).toBe('Agenda des activités\u00A0: 5');
  });
});

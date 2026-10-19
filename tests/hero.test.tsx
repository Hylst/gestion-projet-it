import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Accueil from '../src/routes/accueil';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

describe('accueil', () => {
  it('la section hero utilise la classe hero et trois panneaux', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <Accueil />
        </MemoryRouter>
      </ProgressProvider>,
    );
    const section = container.querySelector('section.hero');
    expect(section).not.toBeNull();
    expect(section?.querySelector('h1')?.textContent).toContain('Gérer un projet informatique');
    const panneaux = container.querySelectorAll('.hero-panel');
    expect(panneaux).toHaveLength(3);
    expect(
      Array.from(panneaux).map((p) => p.querySelector('.hero-panel-titre')?.textContent),
    ).toEqual(['GANTT', 'Kanban', 'Cycle en V']);
    expect(container.querySelectorAll('.hero-panel-legende')).toHaveLength(3);
    expect(container.querySelectorAll('.hero-panel svg[aria-hidden="true"]')).toHaveLength(3);
  });
});

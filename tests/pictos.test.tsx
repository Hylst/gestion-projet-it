import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModulePicto } from '../src/components/ModulePicto';
import Accueil from '../src/routes/accueil';
import { M1Page } from '../src/modules/m1-wbs';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

describe('pictos de module', () => {
  it('les neuf numéros rendent un picto décoratif', () => {
    for (let num = 1; num <= 9; num += 1) {
      const { container, unmount } = render(<ModulePicto num={num} />);
      const svg = container.querySelector('svg.module-picto');
      expect(svg, `module ${num}`).not.toBeNull();
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
      unmount();
    }
  });

  it('l’en-tête d’un module affiche son picto', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M1Page />
        </MemoryRouter>
      </ProgressProvider>,
    );
    const entete = container.querySelector('.module-head-row');
    expect(entete).not.toBeNull();
    expect(entete?.querySelector('svg.module-picto')).not.toBeNull();
    expect(entete?.querySelector('h1')?.textContent).toContain('Cadrer et découper');
  });

  it('l’accueil affiche neuf pictos et les étiquettes de module', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <Accueil />
        </MemoryRouter>
      </ProgressProvider>,
    );
    expect(container.querySelectorAll('.module-card .module-picto')).toHaveLength(9);
    const etiquettes = Array.from(
      container.querySelectorAll('.module-card .module-kicker'),
    ).map((el) => el.textContent);
    expect(etiquettes).toEqual(
      Array.from({ length: 9 }, (_, i) => `Module ${i + 1}`),
    );
  });
});

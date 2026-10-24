import { afterEach, describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';
import { cleanup, render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressProvider } from '../src/lib/progress';
import { M1Page } from '../src/modules/m1-wbs';
import { M2Page } from '../src/modules/m2-planif';
import { M3Page } from '../src/modules/m3-methodes';
import { M4Page } from '../src/modules/m4-agiles';
import { M5Page } from '../src/modules/m5-outils';
import { M6Page } from '../src/modules/m6-equipe';
import { M7Page } from '../src/modules/m7-parties';
import { M8Page } from '../src/modules/m8-budget';
import { M9Page } from '../src/modules/m9-changement';

afterEach(cleanup);

const PAGES = [
  ['m1-wbs', <M1Page />], ['m2-planif', <M2Page />], ['m3-methodes', <M3Page />],
  ['m4-agiles', <M4Page />], ['m5-outils', <M5Page />], ['m6-equipe', <M6Page />],
  ['m7-parties', <M7Page />], ['m8-budget', <M8Page />], ['m9-changement', <M9Page />],
] as const;

const rendre = (page: ReactElement) =>
  render(<ProgressProvider><MemoryRouter>{page}</MemoryRouter></ProgressProvider>);

describe('exercices de transfert', () => {
  for (const [id, page] of PAGES) {
    it(`${id} contient un exercice de transfert`, () => {
      localStorage.clear();
      const { container } = rendre(page);
      expect(container.textContent).toContain('Exercice de transfert');
    });
  }

  it('le module 6 contient le pré-mortem et son lien de sommaire', () => {
    localStorage.clear();
    const { container } = rendre(<M6Page />);
    const section = container.querySelector('#pre-mortem') as HTMLElement;
    expect(section).not.toBeNull();
    expect(within(section).getByRole('heading', { level: 2, name: /pré-mortem/i })).toBeTruthy();
    expect(within(section).getByRole('table')).toBeTruthy();
    expect(within(section).getAllByRole('row')).toHaveLength(4);
    const sommaire = container.querySelector('.sommaire') as HTMLElement;
    expect(within(sommaire).getByRole('link', { name: 'Pré-mortem' }).getAttribute('href')).toBe('#pre-mortem');
  });
});

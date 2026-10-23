import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModuleGuide } from '../src/components/ModuleGuide';
import type { ModuleGuideData } from '../src/modules/guideTypes';
import { GUIDES } from '../src/modules/guides';
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

const fixture: ModuleGuideData = {
  erreurs: [
    { titre: 'Erreur A', consequence: 'Conséquence observable A.', correction: 'Correction concrète A.' },
    { titre: 'Erreur B', consequence: 'Conséquence observable B.', correction: 'Correction concrète B.' },
    { titre: 'Erreur C', consequence: 'Conséquence observable C.', correction: 'Correction concrète C.' },
  ],
  decision: {
    question: 'Quelle option choisir ?',
    options: [
      { nom: 'Option A', quand: 'Quand le besoin est stable.', limite: 'Ne couvre pas les retours.' },
      { nom: 'Option B', quand: 'Quand le besoin change.', limite: 'Demande du temps.' },
    ],
    nonUsage: 'Un projet de trois tâches sans décision partagée.',
  },
};

const PAGES = [
  ['m1-wbs', <M1Page />], ['m2-planif', <M2Page />], ['m3-methodes', <M3Page />],
  ['m4-agiles', <M4Page />], ['m5-outils', <M5Page />], ['m6-equipe', <M6Page />],
  ['m7-parties', <M7Page />], ['m8-budget', <M8Page />], ['m9-changement', <M9Page />],
] as const;

describe('ModuleGuide', () => {
  it('rend trois erreurs, les options et le cas de non-usage', () => {
    const { container } = render(
      <MemoryRouter><ModuleGuide data={fixture} moduleNum={1} /></MemoryRouter>,
    );
    const guide = container.querySelector('#guide') as HTMLElement;
    expect(guide).not.toBeNull();
    expect(within(guide).getAllByRole('listitem')).toHaveLength(3);
    expect(within(guide).getByRole('heading', { level: 2, name: /Erreurs fréquentes/ })).toBeTruthy();
    expect(within(guide).getByRole('heading', { level: 3, name: /Point de décision/ })).toBeTruthy();
    expect(within(guide).getByText('Option A')).toBeTruthy();
    expect(within(guide).getByText(/Un projet de trois tâches/)).toBeTruthy();
    expect(within(guide).getByRole('link', { name: /Ressources du module 1/ }).getAttribute('href')).toBe('/ressources#module-1');
  });

  it('couvre les neuf modules avec trois erreurs et deux ou trois options', () => {
    expect(Object.keys(GUIDES)).toHaveLength(9);
    for (const [id, guide] of Object.entries(GUIDES)) {
      expect(guide.erreurs, id).toHaveLength(3);
      expect(guide.decision.options.length, id).toBeGreaterThanOrEqual(2);
      expect(guide.decision.options.length, id).toBeLessThanOrEqual(3);
      for (const erreur of guide.erreurs) {
        expect(erreur.consequence.length, `${id} conséquence`).toBeGreaterThan(20);
        expect(erreur.correction.length, `${id} correction`).toBeGreaterThan(20);
      }
    }
  });

  for (const [id, page] of PAGES) {
    it(`${id} affiche le guide`, () => {
      localStorage.clear();
      const { container } = render(
        <ProgressProvider><MemoryRouter>{page}</MemoryRouter></ProgressProvider>,
      );
      expect(container.querySelector('#guide'), id).not.toBeNull();
      expect(screen.getByText('Erreurs fréquentes', { selector: 'h3' })).toBeTruthy();
    });
  }
});

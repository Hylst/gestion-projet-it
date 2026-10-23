import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ModuleGuide } from '../src/components/ModuleGuide';
import type { ModuleGuideData } from '../src/modules/guideTypes';

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
});

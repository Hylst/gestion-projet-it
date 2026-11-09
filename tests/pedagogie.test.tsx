// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MODULES, moduleMetaByNum } from '../src/modules/index';
import { ModuleIntro } from '../src/components/ModuleIntro';
import { ModulePager } from '../src/components/ModulePager';
import { ModuleLayout } from '../src/components/ModuleLayout';
import { ProgressProvider } from '../src/lib/progress';

afterEach(cleanup);

describe('Métadonnées pédagogiques des modules', () => {
  it('les 9 modules possèdent des métadonnées pédagogiques complètes', () => {
    expect(MODULES).toHaveLength(9);

    for (const m of MODULES) {
      expect(m.pourquoi, `module ${m.num} pourquoi`).toBeTruthy();
      expect(m.pourquoi.length, `module ${m.num} pourquoi length`).toBeGreaterThanOrEqual(40);

      expect(m.objectifs, `module ${m.num} objectifs`).toHaveLength(3);
      for (const obj of m.objectifs) {
        expect(obj.length, `module ${m.num} obj length`).toBeGreaterThanOrEqual(15);
      }

      expect(m.temps, `module ${m.num} temps`).toBeDefined();
      expect(m.temps.lecture, `module ${m.num} temps lecture`).toBeTruthy();
      expect(m.temps.pratique, `module ${m.num} temps pratique`).toBeTruthy();

      expect(m.filRougeContexte, `module ${m.num} fil rouge`).toBeTruthy();
      expect(m.filRougeContexte).toContain('Les Amis du Square');

      if (m.num < 9) {
        expect(m.transition, `module ${m.num} transition`).toBeTruthy();
      }
    }
  });
});

describe('ModuleIntro (composant d’introduction pédagogique)', () => {
  it('affiche le problème résolu, les 3 objectifs et le rappel du fil rouge', () => {
    const meta = moduleMetaByNum(1);
    expect(meta).toBeDefined();

    render(
      <MemoryRouter>
        <ModuleIntro meta={meta!} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi cadrer et découper/i })).toBeDefined();
    expect(screen.getByText(/Ce que vous saurez faire/i)).toBeDefined();
    const listeObj = screen.getAllByRole('listitem');
    expect(listeObj.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByText(/Les Amis du Square/i)).toBeDefined();
    expect(screen.getByText(/Temps estimé/i)).toBeDefined();
  });
});

describe('ModulePager (navigation et transition entre modules)', () => {
  it('module 1 : propose le passage au module 2 avec phrase de transition', () => {
    render(
      <MemoryRouter>
        <ModulePager numCourant={1} />
      </MemoryRouter>,
    );

    const suivant = screen.getByRole('link', { name: /Module 2/i });
    expect(suivant.getAttribute('href')).toBe('/module-2');
    expect(screen.queryByRole('link', { name: /Module précédent/i })).toBeNull();
  });

  it('module 5 : propose le module 4 (précédent) et le module 6 (suivant)', () => {
    render(
      <MemoryRouter>
        <ModulePager numCourant={5} />
      </MemoryRouter>,
    );

    const precedent = screen.getByRole('link', { name: /Module 4/i });
    expect(precedent.getAttribute('href')).toBe('/module-4');

    const suivant = screen.getByRole('link', { name: /Module 6/i });
    expect(suivant.getAttribute('href')).toBe('/module-6');
  });

  it('module 9 : propose le module 8 et la suite naturelle vers le dossier projet', () => {
    render(
      <MemoryRouter>
        <ModulePager numCourant={9} />
      </MemoryRouter>,
    );

    const precedent = screen.getByRole('link', { name: /Module 8/i });
    expect(precedent.getAttribute('href')).toBe('/module-8');

    const capstone = screen.getByRole('link', { name: /Dossier projet/i });
    expect(capstone.getAttribute('href')).toBe('/dossier-projet');
  });
});

describe('ModuleLayout (sommaire dynamique et pager)', () => {
  it('rend le sommaire complet avec toutes les sections déclarées', () => {
    const meta = moduleMetaByNum(3)!;
    const sections = [
      { id: 'fiche', label: 'Fiche' },
      { id: 'fil-rouge', label: 'Fil rouge' },
      { id: 'demarche', label: 'Démarche' },
      { id: 'labo', label: 'Labo' },
      { id: 'comparateur', label: 'Comparateur' },
      { id: 'exercice', label: 'Exercice' },
      { id: 'quiz', label: 'Quiz' },
      { id: 'guide', label: 'Guide' },
      { id: 'reflexe', label: 'Réflexe' },
    ];

    render(
      <ProgressProvider>
        <MemoryRouter>
          <ModuleLayout meta={meta} sections={sections}>
            <div id="fiche">Contenu</div>
          </ModuleLayout>
        </MemoryRouter>
      </ProgressProvider>,
    );

    const nav = screen.getByRole('navigation', { name: /Sommaire du module/i });
    expect(nav).toBeDefined();
    expect(nav.querySelector('a[href="#comparateur"]')).not.toBeNull();
    expect(nav.querySelector('a[href="#labo"]')).not.toBeNull();
  });
});

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

describe('Intros pédagogiques et infobulles des modules 1 à 3', () => {
  it('module 1 : intègre ModuleIntro, chapeaux de sections et infobulles', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M1Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi cadrer et découper/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();
    expect(container.querySelector('#demarche .section-chapeau')).not.toBeNull();
    expect(container.querySelector('#fil-rouge .section-chapeau')).not.toBeNull();

    // Infobulles présentes sur le module 1 (WBS et équivalents français OTP / SDP)
    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(5);
    const textes = Array.from(triggers).map((t) => t.textContent);
    expect(textes.some((t) => t?.includes('WBS'))).toBe(true);
    expect(textes.some((t) => t?.includes('OTP'))).toBe(true);
    expect(textes.some((t) => t?.includes('SDP'))).toBe(true);
  });

  it('module 2 : intègre ModuleIntro, chapeaux de sections et infobulles PERT/GANTT', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M2Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi planifier/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();
    expect(container.querySelector('#demarche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);
    const textes = Array.from(triggers).map((t) => t.textContent);
    expect(textes.some((t) => t?.includes('PERT') || t?.includes('GANTT'))).toBe(true);
  });

  it('module 3 : intègre ModuleIntro, chapeaux de sections et infobulles Cycle en V', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M3Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi cycle en v/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);
  });
});

describe('Intros pédagogiques et infobulles des modules 4 à 6', () => {
  it('module 4 : intègre ModuleIntro, chapeaux et infobulles Agiles', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M4Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi agiles/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();
    expect(container.querySelector('#demarche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(4);
    const textes = Array.from(triggers).map((t) => t.textContent);
    expect(textes.some((t) => t?.includes('Scrum') || t?.includes('Kanban'))).toBe(true);

    const nav = screen.getByRole('navigation', { name: /Sommaire du module/i });
    expect(nav.querySelector('a[href="#labo"]')).not.toBeNull();
    expect(nav.querySelector('a[href="#labo-poker"]')).not.toBeNull();
  });

  it('module 5 : intègre ModuleIntro, chapeaux et infobulles Outils / CI / CD', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M5Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi outils/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);

    const nav = screen.getByRole('navigation', { name: /Sommaire du module/i });
    expect(nav.querySelector('a[href="#labo"]')).not.toBeNull();
    expect(nav.querySelector('a[href="#labo-chaine"]')).not.toBeNull();
  });

  it('module 6 : intègre ModuleIntro, chapeaux et infobulles Équipe / Risques / Eisenhower', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M6Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi équipe, risques/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);

    const nav = screen.getByRole('navigation', { name: /Sommaire du module/i });
    expect(nav.querySelector('a[href="#labo"]')).not.toBeNull();
    expect(nav.querySelector('a[href="#labo-risques"]')).not.toBeNull();
    expect(nav.querySelector('a[href="#pre-mortem"]')).not.toBeNull();
  });
});

describe('Intros pédagogiques et infobulles des modules 7 à 9', () => {
  it('module 7 : intègre ModuleIntro, chapeaux et infobulles Parties prenantes / RACI', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M7Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi parties prenantes/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();
    expect(container.querySelector('#demarche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);
    const textes = Array.from(triggers).map((t) => t.textContent);
    expect(textes.some((t) => t?.includes('RACI') || t?.includes('partie prenante') || t?.includes('parties prenantes'))).toBe(true);
  });

  it('module 8 : intègre ModuleIntro, chapeaux et infobulles Budget / Estimation', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M8Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi budget/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);
  });

  it('module 9 : intègre ModuleIntro, chapeaux et infobulles Conduite du changement', () => {
    const { container } = render(
      <ProgressProvider>
        <MemoryRouter>
          <M9Page />
        </MemoryRouter>
      </ProgressProvider>,
    );

    expect(screen.getByRole('heading', { level: 2, name: /Pourquoi conduite du changement/i })).toBeDefined();
    expect(container.querySelector('#fiche .section-chapeau')).not.toBeNull();

    const triggers = container.querySelectorAll('.terme-trigger');
    expect(triggers.length).toBeGreaterThanOrEqual(3);
  });
});

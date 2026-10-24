// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { buildIndex, isIaHit, isModuleHit, isPageHit, searchIndex } from '../src/lib/search';
import { MODULES } from '../src/modules/index';
import { IA_PAGES } from '../src/ia/pages';

describe('search', () => {
  const index = buildIndex();

  it('l index couvre les 9 modules et leurs sections', () => {
    const modules = new Set(index.filter(isModuleHit).map((h) => h.moduleNum));
    expect([...modules].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(index.some((h) => h.ancre === 'labo')).toBe(true);
    expect(index.some((h) => h.ancre === 'quiz')).toBe(true);
  });

  it('cherche sans casse ni accents sur titres et mots cles', () => {
    const hits = searchIndex(index, 'KANBAN');
    expect(hits.some((h) => isModuleHit(h) && h.moduleNum === 4)).toBe(true);
    const hits2 = searchIndex(index, 'eisenhower');
    expect(hits2.length).toBeGreaterThan(0);
    expect(hits2.every((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
  });

  it('trouve le module 6 avec une requête sans accent', () => {
    const hits = searchIndex(index, 'equipe');
    expect(hits.some((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
  });

  it('requête vide rend vide', () => {
    expect(searchIndex(index, '')).toEqual([]);
  });

  it('n indexe que les modules en ligne', () => {
    expect(index.filter(isModuleHit).every((h) => h.moduleNum >= 1 && h.moduleNum <= 9)).toBe(true);
  });

  it('trouve les angles morts des modules 3 et 7', () => {
    const m3 = MODULES.find((m) => m.num === 3);
    const m7 = MODULES.find((m) => m.num === 7);
    expect(m3?.resume).toContain('critères d’acceptation');
    expect(m3?.motsCles).toContain('non regression');
    expect(m7?.resume).toContain('clarifier les rôles');
    expect(m7?.motsCles).toContain('raci');
    const m3Hits = searchIndex(index, 'recette');
    expect(m3Hits.some((h) => isModuleHit(h) && h.moduleNum === 3)).toBe(true);
    const m3Regression = searchIndex(index, 'regression');
    expect(m3Regression.some((h) => isModuleHit(h) && h.moduleNum === 3)).toBe(true);
    const m7Hits = searchIndex(index, 'raci');
    expect(m7Hits.some((h) => isModuleHit(h) && h.moduleNum === 7)).toBe(true);
    const m7Gouvernance = searchIndex(index, 'gouvernance');
    expect(m7Gouvernance.some((h) => isModuleHit(h) && h.moduleNum === 7)).toBe(true);
  });

  it('indexe les cinq pages IA et leurs sections', () => {
    const ia = index.filter(isIaHit);
    expect(new Set(ia.map((h) => h.path))).toEqual(new Set(IA_PAGES.map((p) => p.path)));
    for (const page of IA_PAGES) {
      for (const section of page.sections) {
        expect(ia.some((h) => h.path === page.path && h.ancre === section.id)).toBe(true);
      }
    }
  });

  it('trouve un usage IA par un mot de son corpus', () => {
    const hits = searchIndex(index, 'hallucination');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every(isIaHit)).toBe(true);
    expect(hits.some((h) => h.path === '/ia/gouvernance')).toBe(true);
  });

  it('tolère quelques synonymes métier', () => {
    const planification = searchIndex(index, 'delai');
    expect(planification.some((h) => isModuleHit(h) && h.moduleNum === 2)).toBe(true);
    const budget = searchIndex(index, 'prix');
    expect(budget.some((h) => isModuleHit(h) && h.moduleNum === 8)).toBe(true);
    const equipe = searchIndex(index, 'team');
    expect(equipe.some((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
  });

  it('ne régresse pas sur les termes historiques', () => {
    for (const requete of ['risque', 'danger']) {
      expect(searchIndex(index, requete).some((h) => isModuleHit(h) && h.moduleNum === 6)).toBe(true);
    }
    expect(searchIndex(index, 'budget').some((h) => isModuleHit(h) && h.moduleNum === 8)).toBe(true);
  });

  it('indexe les guides et la page de ressources', () => {
    expect(index.some((h) => h.ancre === 'guide')).toBe(true);
    const guides = searchIndex(index, 'erreurs');
    expect(guides.some((h) => isModuleHit(h) && h.moduleNum === 1 && h.ancre === 'guide')).toBe(true);
    const ressources = searchIndex(index, 'bibliotheque');
    expect(ressources.some(isPageHit)).toBe(true);
    expect(ressources.find(isPageHit)?.path).toBe('/ressources');
    const outils = searchIndex(index, 'fiches');
    expect(outils.find(isPageHit)?.path).toBe('/outils');
    const modeles = searchIndex(index, 'journal');
    expect(modeles.find(isPageHit)?.path).toBe('/modeles');
    const confidentialite = searchIndex(index, 'confidentialite');
    expect(confidentialite.find(isPageHit)?.path).toBe('/confidentialite');
    const transparence = searchIndex(index, 'transparence');
    expect(transparence.find(isPageHit)?.path).toBe('/transparence-ia');
    const accessibilite = searchIndex(index, 'wcag');
    expect(accessibilite.find(isPageHit)?.path).toBe('/accessibilite');
  });
});

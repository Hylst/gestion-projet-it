// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MODULES } from '../modules/index';
import { IA_PAGES } from '../ia/pages';

interface SearchHitBase {
  path: string;
  section: string;
  ancre: string;
  label: string;
  needles: string;
}

export interface ModuleSearchHit extends SearchHitBase {
  type: 'module';
  moduleNum: number;
  moduleTitre: string;
}

export interface IaSearchHit extends SearchHitBase {
  type: 'ia';
  pageTitre: string;
}

export interface PageSearchHit extends SearchHitBase {
  type: 'page';
  pageTitre: string;
}

export type SearchHit = ModuleSearchHit | IaSearchHit | PageSearchHit;

export function isModuleHit(hit: SearchHit): hit is ModuleSearchHit {
  return hit.type === 'module';
}

export function isIaHit(hit: SearchHit): hit is IaSearchHit {
  return hit.type === 'ia';
}

export function isPageHit(hit: SearchHit): hit is PageSearchHit {
  return hit.type === 'page';
}

const SECTIONS: Array<{ section: string; ancre: string }> = [
  { section: 'Fiche', ancre: 'fiche' },
  { section: 'Fil rouge', ancre: 'fil-rouge' },
  { section: 'Démarche', ancre: 'demarche' },
  { section: 'Labo', ancre: 'labo' },
  { section: 'Exercice corrigé', ancre: 'exercice' },
  { section: 'Quiz', ancre: 'quiz' },
  { section: 'Erreurs et décisions', ancre: 'guide' },
  { section: 'Fiche réflexe', ancre: 'reflexe' },
];

export function normaliser(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const SYNONYMES: ReadonlyArray<readonly string[]> = [
  ['retard', 'delai', 'planning'],
  ['budget', 'cout', 'prix', 'chiffrage'],
  ['equipe', 'team', 'groupe'],
  ['risque', 'danger', 'alea'],
  ['changement', 'adoption', 'transformation'],
  ['ressources', 'sources', 'documents'],
];

function groupesRecherche(q: string): string[][] {
  const mots = normaliser(q).split(/[^a-z0-9]+/).filter(Boolean);
  return mots.map((mot) => {
    const groupe = SYNONYMES.find((synonymes) => synonymes.includes(mot));
    return groupe ? [...groupe] : [mot];
  });
}

export function buildIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  for (const m of MODULES) {
    for (const s of SECTIONS) {
      out.push({
        type: 'module',
        path: `/module-${m.num}`,
        moduleNum: m.num,
        moduleTitre: m.titre,
        section: s.section,
        ancre: s.ancre,
        label: `${s.section}\u00A0: ${m.titre}`,
        needles: normaliser(`${m.num} ${m.titre} ${m.resume} ${m.motsCles.join(' ')} ${s.section}`),
      });
    }
  }
  for (const page of IA_PAGES) {
    for (const section of page.sections) {
      out.push({
        type: 'ia',
        path: page.path,
        pageTitre: page.titreCourt,
        section: section.label,
        ancre: section.id,
        label: `${page.titre}\u00A0: ${section.label}`,
        needles: normaliser(`${page.titre} ${page.resume} ${(page.motsCles ?? []).join(' ')} ${section.label}`),
      });
    }
  }
  out.push({
    type: 'page',
    path: '/ressources',
    pageTitre: 'Ressources et outils',
    section: 'Bibliothèque',
    ancre: '',
    label: 'Ressources et outils',
    needles: normaliser('ressources outils bibliotheque sources documents liens'),
  });
  out.push({
    type: 'page',
    path: '/outils',
    pageTitre: 'Fiches outils',
    section: 'Grille de comparaison',
    ancre: '',
    label: 'Fiches outils',
    needles: normaliser('fiches outils criteres comparaison suivi documentation diagrammes tests securite accessibilite'),
  });
  out.push({
    type: 'page',
    path: '/modeles',
    pageTitre: 'Journal et modèles',
    section: 'Journal, revue et modèles',
    ancre: '',
    label: 'Journal et modèles',
    needles: normaliser('journal modeles revue pairs imprimable wbs raci risques recette decisions entretien'),
  });
  out.push({
    type: 'page',
    path: '/mentions-legales',
    pageTitre: 'Mentions légales',
    section: 'Informations légales',
    ancre: '',
    label: 'Mentions légales',
    needles: normaliser('mentions legales editeur hebergeur hostinger source licence contact'),
  });
  out.push({
    type: 'page',
    path: '/confidentialite',
    pageTitre: 'Confidentialité',
    section: 'Données personnelles',
    ancre: '',
    label: 'Confidentialité',
    needles: normaliser('confidentialite rgpd donnees personnelles journaux cookies stockage local droits cnil'),
  });
  out.push({
    type: 'page',
    path: '/transparence-ia',
    pageTitre: 'Transparence IA',
    section: 'IA et contenus',
    ancre: '',
    label: 'Transparence IA',
    needles: normaliser('transparence ia intelligence artificielle illustrations z-image assistant code textes ai act'),
  });
  out.push({
    type: 'page',
    path: '/accessibilite',
    pageTitre: 'Accessibilité',
    section: 'WCAG',
    ancre: '',
    label: 'Accessibilité',
    needles: normaliser('accessibilite wcag clavier contraste focus labels'),
  });
  return out;
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const groupes = groupesRecherche(q.trim());
  if (groupes.length === 0) return [];
  return index.filter((h) => groupes.every((groupe) => groupe.some((mot) => h.needles.includes(mot))));
}

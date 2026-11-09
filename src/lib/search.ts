// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MODULES } from '../modules/index';
import { IA_PAGES } from '../ia/pages';
import { CYBER_PAGES } from '../cyber/pages';
import { TERMES, slugTerme } from './glossaire';

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

export interface CyberSearchHit extends SearchHitBase {
  type: 'cyber';
  pageTitre: string;
}

export interface PageSearchHit extends SearchHitBase {
  type: 'page';
  pageTitre: string;
}

export interface TermeSearchHit extends SearchHitBase {
  type: 'terme';
  pageTitre: 'Glossaire';
  terme: string;
  cibles: readonly string[];
}

export type SearchHit = ModuleSearchHit | IaSearchHit | CyberSearchHit | PageSearchHit | TermeSearchHit;

export function isModuleHit(hit: SearchHit): hit is ModuleSearchHit {
  return hit.type === 'module';
}

export function isIaHit(hit: SearchHit): hit is IaSearchHit {
  return hit.type === 'ia';
}

export function isCyberHit(hit: SearchHit): hit is CyberSearchHit {
  return hit.type === 'cyber';
}

export function isPageHit(hit: SearchHit): hit is PageSearchHit {
  return hit.type === 'page';
}

export function isTermeHit(hit: SearchHit): hit is TermeSearchHit {
  return hit.type === 'terme';
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
  for (const page of CYBER_PAGES) {
    for (const section of page.sections) {
      out.push({
        type: 'cyber',
        path: page.path,
        pageTitre: page.titreCourt,
        section: section.label,
        ancre: section.id,
        label: `${page.titre}\u00A0: ${section.label}`,
        needles: normaliser(`${page.titre} ${page.resume} ${(page.motsCles ?? []).join(' ')} ${section.label}`),
      });
    }
  }
  for (const t of TERMES) {
    const cibles = [t.terme, t.sigle, t.developpe, ...(t.alias ?? [])].filter(
      (v): v is string => Boolean(v),
    );
    out.push({
      type: 'terme',
      path: '/glossaire',
      pageTitre: 'Glossaire',
      terme: t.terme,
      cibles,
      section: 'Définition',
      ancre: slugTerme(t),
      label: `Glossaire\u00A0: ${t.terme}`,
      needles: normaliser(`${cibles.join(' ')} ${t.definition}`),
    });
  }
  out.push({
    type: 'page',
    path: '/glossaire',
    pageTitre: 'Glossaire',
    section: 'Définitions',
    ancre: '',
    label: 'Glossaire',
    needles: normaliser('glossaire definitions termes vocabulaire sigles acronymes'),
  });
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

function rangRecherche(hit: SearchHit, qNormalise: string): number {
  if (hit.type !== 'terme') return 2;
  const cibles = hit.cibles.map(normaliser);
  if (cibles.includes(qNormalise)) return 0;
  if (qNormalise.length >= 2 && cibles.some((cible) => cible.startsWith(qNormalise))) return 1;
  return 3;
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const groupes = groupesRecherche(q.trim());
  if (groupes.length === 0) return [];
  const qNormalise = normaliser(q.trim()).replace(/\s+/g, ' ').trim();
  return index
    .filter((h) => groupes.every((groupe) => groupe.some((mot) => h.needles.includes(mot))))
    .sort((a, b) => rangRecherche(a, qNormalise) - rangRecherche(b, qNormalise));
}

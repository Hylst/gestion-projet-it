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
  return out;
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const n = normaliser(q.trim());
  if (!n) return [];
  const mots = n.split(/\s+/);
  return index.filter((h) => mots.every((mot) => h.needles.includes(mot)));
}

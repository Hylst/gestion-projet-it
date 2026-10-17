import { MODULES } from '../modules/index';

export interface SearchHit { moduleNum: number; moduleTitre: string; section: string; ancre: string; label: string; needles: string }

const SECTIONS: Array<{ section: string; ancre: string }> = [
  { section: 'Fiche', ancre: 'fiche' },
  { section: 'Fil rouge', ancre: 'fil-rouge' },
  { section: 'Demarche', ancre: 'demarche' },
  { section: 'Labo', ancre: 'labo' },
  { section: 'Exercice corrige', ancre: 'exercice' },
  { section: 'Quiz', ancre: 'quiz' },
  { section: 'Fiche reflexe', ancre: 'reflexe' },
];

export function normaliser(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function buildIndex(): SearchHit[] {
  const out: SearchHit[] = [];
  for (const m of MODULES) {
    for (const s of SECTIONS) {
      out.push({
        moduleNum: m.num, moduleTitre: m.titre, section: s.section, ancre: s.ancre,
        label: `${s.section} : ${m.titre}`,
        needles: normaliser(`${m.num} ${m.titre} ${m.resume} ${m.motsCles.join(' ')} ${s.section}`),
      });
    }
  }
  return out;
}

export function searchIndex(index: SearchHit[], q: string): SearchHit[] {
  const n = normaliser(q.trim());
  if (!n) return [];
  const mots = n.split(/\s+/);
  return index.filter((h) => mots.every((mot) => h.needles.includes(mot)));
}

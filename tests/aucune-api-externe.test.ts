// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const RACINE = process.cwd();

function fichiersSource(dossier: string): string[] {
  const sortie: string[] = [];
  for (const entree of readdirSync(path.join(RACINE, dossier), { withFileTypes: true })) {
    const relatif = path.join(dossier, entree.name);
    if (entree.isDirectory()) sortie.push(...fichiersSource(relatif));
    else if (/\.(ts|tsx|css)$/.test(entree.name)) sortie.push(relatif);
  }
  return sortie;
}

const source = fichiersSource('src');

const interdits: Array<{ nom: string; motif: RegExp }> = [
  { nom: 'fetch', motif: /\bfetch\s*\(/ },
  { nom: 'XMLHttpRequest', motif: /\bXMLHttpRequest\b/ },
  { nom: 'axios', motif: /\baxios\b/i },
  { nom: 'WebSocket', motif: /\bWebSocket\b/ },
  { nom: 'EventSource', motif: /\bEventSource\b/ },
  { nom: 'sendBeacon', motif: /\bsendBeacon\b/ },
  { nom: 'API OpenAI', motif: /api\.openai\.com/i },
  { nom: 'API Anthropic', motif: /api\.anthropic\.com/i },
  { nom: 'API Gemini', motif: /generativelanguage\.googleapis\.com/i },
  { nom: 'API Hugging Face', motif: /api-inference\.huggingface\.co/i },
];

describe('absence d’API externe', () => {
  it('ne contient aucun appel réseau dans src', () => {
    const trouvailles: string[] = [];
    for (const fichier of source) {
      const texte = readFileSync(path.join(RACINE, fichier), 'utf8');
      for (const interdit of interdits) {
        if (interdit.motif.test(texte)) trouvailles.push(`${fichier} : ${interdit.nom}`);
      }
    }
    expect(trouvailles).toEqual([]);
  });

  it('ne charge aucune ressource distante dans index.html', () => {
    const html = readFileSync(path.join(RACINE, 'index.html'), 'utf8');
    expect(html).not.toMatch(/<script[^>]+src=["']https?:/i);
    expect(html).not.toMatch(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:/i);
    expect(html).not.toMatch(/<link[^>]+href=["']https?:[^>]+rel=["']stylesheet["']/i);
  });

  it('ne charge aucune fonte ou image distante dans les styles', () => {
    const styles = source.filter((fichier) => fichier.endsWith('.css'));
    const trouvailles = styles.filter((fichier) => {
      const texte = readFileSync(path.join(RACINE, fichier), 'utf8');
      return /@import\s+url\(\s*["']?https?:/i.test(texte) || /url\(\s*["']?https?:/i.test(texte);
    });
    expect(trouvailles).toEqual([]);
  });

  it('limite le service worker au cache same-origin du module', () => {
    const sw = readFileSync(path.join(RACINE, 'public', 'sw.js'), 'utf8');
    expect(sw).toContain("const BASE = '/gestion-projet-it/'");
    expect(sw).toContain('url.pathname.startsWith(BASE)');
    expect(sw).not.toMatch(/https?:\/\//);
  });
});

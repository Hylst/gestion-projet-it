// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { CYBER_PAGES } from '../src/cyber/pages';
import { IA_PAGES } from '../src/ia/pages';

const xml = readFileSync('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe('sitemap', () => {
  it('contient 31 URL uniques', () => {
    expect(urls).toHaveLength(31);
    expect(new Set(urls).size).toBe(31);
  });

  it('contient les routes IA et cyber', () => {
    for (const page of [...IA_PAGES, ...CYBER_PAGES]) {
      expect(urls).toContain(`https://hylst.fr/gestion-projet-it${page.path}`);
    }
  });
});

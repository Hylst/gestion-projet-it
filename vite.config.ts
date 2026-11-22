// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

import fsSite from 'node:fs';
import pathSite from 'node:path';
import type { Plugin as PluginSite } from 'vite';

// Domaine du site, lu au build : SITE_URL (https://it.hylst.fr par defaut). Il remplace %SITE_URL% dans index.html
// et dans les fichiers publics listes, et __SITE_URL__ dans le code, pour que l'app change de domaine sans toucher au code.
const SITE_URL = (process.env.SITE_URL || 'https://it.hylst.fr').replace(/\/+$/, '');
const siteUrl = (fichiersPublics: string[]): PluginSite => {
  let outDir = '';
  return {
    name: 'site-url',
    // __SITE_URL__ : le meme domaine pour le code de l'app (declare dans vite-env.d.ts)
    config: () => ({ define: { __SITE_URL__: JSON.stringify(SITE_URL) } }),
    configResolved(config) {
      outDir = pathSite.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL) },
    writeBundle: {
      order: 'pre',
      sequential: true,
      handler() {
        for (const f of fichiersPublics) {
          const p = pathSite.join(outDir, f);
          fsSite.writeFileSync(p, fsSite.readFileSync(p, 'utf8').replaceAll('%SITE_URL%', SITE_URL));
        }
      },
    },
  };
};

export default defineConfig({
  plugins: [siteUrl(['sitemap.xml', 'robots.txt']), react()],
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: false,
    setupFiles: ['./tests/setup.ts'],
    exclude: [...configDefaults.exclude, '.worktrees/**', 'smoke/**', 'playwright-report/**', 'test-results/**'],
  },
} as import('vitest/config').UserConfig);

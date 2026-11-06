// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from '@playwright/test';

const baseURL = (process.env.SMOKE_BASE_URL ?? 'http://localhost:4173/gestion-projet-it/').replace(/\/+$/, '') + '/';
const serveurExterne = Boolean(process.env.SMOKE_BASE_URL);

export default defineConfig({
  testDir: './smoke',
  use: { baseURL },
  webServer: serveurExterne
    ? undefined
    : {
        command: 'npm run preview',
        port: 4173,
        reuseExistingServer: true,
      },
});

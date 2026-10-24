// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    globals: false,
    setupFiles: ['./tests/setup.ts'],
    exclude: [...configDefaults.exclude, 'smoke/**', 'playwright-report/**', 'test-results/**'],
  },
} as import('vitest/config').UserConfig);

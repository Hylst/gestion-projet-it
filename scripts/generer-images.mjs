// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import console from 'node:console';
import { chromium } from '@playwright/test';

const root = process.cwd();
const browser = await chromium.launch();

async function rendre(svg, largeur, hauteur, sortie) {
  const contenu = fs.readFileSync(path.join(root, svg), 'utf8');
  const page = await browser.newPage({ viewport: { width: largeur, height: hauteur } });
  await page.setContent(
    `<html><body style="margin:0;background:#fafaf7"><img alt="" src="data:image/svg+xml,${encodeURIComponent(contenu)}" style="display:block;width:${largeur}px;height:${hauteur}px" /></body></html>`,
  );
  await page.screenshot({ path: path.join(root, sortie), omitBackground: false });
  await page.close();
}

await rendre('public/og-image.svg', 1200, 630, 'public/og-image.png');
await rendre('public/icon-192.svg', 192, 192, 'public/icon-192.png');
await rendre('public/icon-512.svg', 512, 512, 'public/icon-512.png');
await rendre('public/icon-512.svg', 180, 180, 'public/apple-touch-icon.png');
await browser.close();
console.log('Images générées.');

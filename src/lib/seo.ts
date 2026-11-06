// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const SITE_NAME = 'Gestion de Projet IT';
export const SITE_URL = 'https://hylst.fr';
export const SITE_PATH = '/gestion-projet-it/';
export const OG_IMAGE_URL = `${SITE_URL}${SITE_PATH}og-image.png`;

export function canonicalUrl(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

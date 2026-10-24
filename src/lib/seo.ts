// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export function canonicalUrl(): string {
  return `${window.location.origin}${window.location.pathname}`;
}

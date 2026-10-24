// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

const PREFIX = 'gestion-projet-it:';
export const X_KEY = `${PREFIX}xp`;
export const quizKey = (id: string) => `${PREFIX}quiz:done:${id}`;
export const laboKey = (id: string) => `${PREFIX}laboratoire:done:${id}`;
export const moduleKey = (id: string) => `${PREFIX}module:done:${id}`;

export function storageAvailable(): boolean {
  try {
    const probe = `${PREFIX}probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota ou indisponible : no-op silencieux
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
}

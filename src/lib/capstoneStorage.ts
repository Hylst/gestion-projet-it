// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { etatInitialDossier, validerDossier, type DossierProjetState } from './capstone';

export const DOSSIER_STORAGE_KEY = 'gestion-projet-it:dossier-projet:v1';

export interface ChargementDossier {
  etat: DossierProjetState;
  avertissement: 'corrompu' | null;
}

const stockageNavigateur = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export function stockageDisponible(stockage: Storage | null = stockageNavigateur()): boolean {
  if (!stockage) return false;
  try {
    const cle = '__gestion_projet_it_test__';
    stockage.setItem(cle, '1');
    stockage.removeItem(cle);
    return true;
  } catch {
    return false;
  }
}

export function chargerDossier(stockage: Storage | null = stockageNavigateur()): ChargementDossier {
  if (!stockage) return { etat: etatInitialDossier(), avertissement: null };
  let brut: string | null;
  try {
    brut = stockage.getItem(DOSSIER_STORAGE_KEY);
  } catch {
    return { etat: etatInitialDossier(), avertissement: null };
  }
  if (brut === null) return { etat: etatInitialDossier(), avertissement: null };
  try {
    const valeur: unknown = JSON.parse(brut);
    if (
      typeof valeur !== 'object' ||
      valeur === null ||
      Array.isArray(valeur) ||
      (valeur as { version?: unknown }).version !== 1
    ) {
      return { etat: etatInitialDossier(), avertissement: 'corrompu' };
    }
    return { etat: validerDossier(valeur), avertissement: null };
  } catch {
    return { etat: etatInitialDossier(), avertissement: 'corrompu' };
  }
}

export function sauvegarderDossier(
  etat: DossierProjetState,
  stockage: Storage | null = stockageNavigateur(),
): string | null {
  if (!stockage) return 'Le stockage local est indisponible\u00A0: le dossier ne sera pas conservé après fermeture.';
  try {
    stockage.setItem(
      DOSSIER_STORAGE_KEY,
      JSON.stringify({ ...etat, updatedAt: new Date().toISOString() }),
    );
    return null;
  } catch {
    return 'La sauvegarde locale a échoué\u00A0: exporte le dossier pour ne pas perdre ta progression.';
  }
}

const dateISO = (): string => new Date().toISOString();

export function exporterDossier(etat: DossierProjetState): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: dateISO(),
      dossier: { ...etat, updatedAt: dateISO() },
    },
    null,
    2,
  );
}

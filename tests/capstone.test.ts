// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, expect, it } from 'vitest';
import {
  CHAMPS_MAX,
  CRITERES,
  ETAPES,
  etatInitialDossier,
  estDossierComplet,
  estEtapeComplete,
  progressionDossier,
  validerDossier,
  type DossierProjetState,
} from '../src/lib/capstone';
import {
  DOSSIER_STORAGE_KEY,
  chargerDossier,
  exporterDossier,
  sauvegarderDossier,
  stockageDisponible,
} from '../src/lib/capstoneStorage';

const remplirEtape = (etat: DossierProjetState, index: number): DossierProjetState => {
  const etape = ETAPES[index];
  if (!etape) throw new Error('Étape absente');
  for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse courte.';
  for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
  return etat;
};

const dossierComplet = (): DossierProjetState => {
  const etat = etatInitialDossier();
  ETAPES.forEach((_, index) => remplirEtape(etat, index));
  for (const critere of CRITERES) etat.autoEvaluation[critere.id] = 3;
  return etat;
};

describe('contenu du capstone', () => {
  it('contient six étapes, vingt-trois champs, douze livrables et six critères', () => {
    expect(ETAPES).toHaveLength(6);
    expect(ETAPES.flatMap((e) => e.champs)).toHaveLength(23);
    expect(ETAPES.flatMap((e) => e.livrables)).toHaveLength(12);
    expect(CRITERES).toHaveLength(6);
  });

  it('utilise des identifiants uniques', () => {
    const champs = ETAPES.flatMap((e) => e.champs.map((c) => c.id));
    const livrables = ETAPES.flatMap((e) => e.livrables.map((l) => l.id));
    const criteres = CRITERES.map((c) => c.id);
    expect(new Set(champs).size).toBe(champs.length);
    expect(new Set(livrables).size).toBe(livrables.length);
    expect(new Set(criteres).size).toBe(criteres.length);
  });
});

describe('complétion', () => {
  it('part d’un état vide', () => {
    const etat = etatInitialDossier();
    expect(etat.version).toBe(1);
    expect(etat.reponses).toEqual({});
    expect(etat.livrables).toEqual({});
    expect(etat.autoEvaluation).toEqual({});
    expect(etat.etapeCourante).toBe(0);
    expect(estDossierComplet(etat)).toBe(false);
  });

  it('exige les champs et les deux livrables d’une étape', () => {
    const etat = etatInitialDossier();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
    for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse.';
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
    expect(estEtapeComplete(etat, etape.id)).toBe(true);
  });

  it('refuse les champs remplis uniquement d’espaces', () => {
    const etat = etatInitialDossier();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    for (const champ of etape.champs) etat.reponses[champ.id] = '   ';
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
    expect(estEtapeComplete(etat, etape.id)).toBe(false);
  });

  it('calcule le dossier complet et la progression', () => {
    const etat = dossierComplet();
    expect(estDossierComplet(etat)).toBe(true);
    expect(progressionDossier(etat)).toEqual({
      etapes: 6,
      livrables: 12,
      criteres: 6,
      complet: true,
    });
    delete etat.autoEvaluation[CRITERES[0]?.id ?? 'auto-coherence'];
    expect(estDossierComplet(etat)).toBe(false);
    expect(progressionDossier(etat).criteres).toBe(5);
  });
});

describe('validation', () => {
  it('accepte un état valide et filtre les clés inconnues', () => {
    const brut = {
      version: 1,
      reponses: { 'cadrage-besoin': 'Besoin fictif', inconnu: 'À ignorer' },
      livrables: { 'cadrage-note': true, inconnu: true },
      autoEvaluation: { 'auto-coherence': 2, inconnu: 4 },
      etapeCourante: 3,
      updatedAt: '2026-10-21T10:00:00.000Z',
    };
    const etat = validerDossier(brut);
    expect(etat.reponses).toEqual({ 'cadrage-besoin': 'Besoin fictif' });
    expect(etat.livrables).toEqual({ 'cadrage-note': true });
    expect(etat.autoEvaluation).toEqual({ 'auto-coherence': 2 });
    expect(etat.etapeCourante).toBe(3);
  });

  it('rejette une version inconnue, un tableau, un objet nul et les mauvais types', () => {
    for (const brut of [null, [], { version: 2 }, 'texte', 42]) {
      const etat = validerDossier(brut);
      expect(etat.version).toBe(1);
      expect(etat.reponses).toEqual({});
      expect(etat.etapeCourante).toBe(0);
    }
    const etat = validerDossier({
      version: 1,
      reponses: { 'cadrage-besoin': 42 },
      livrables: { 'cadrage-note': 'oui' },
      autoEvaluation: { 'auto-coherence': 9 },
      etapeCourante: 99,
      updatedAt: 'inconnue',
    });
    expect(etat.reponses).toEqual({});
    expect(etat.livrables).toEqual({});
    expect(etat.autoEvaluation).toEqual({});
    expect(etat.etapeCourante).toBe(0);
    expect(Number.isNaN(Date.parse(etat.updatedAt))).toBe(false);
  });

  it('coupe les réponses à 600 caractères', () => {
    const etat = validerDossier({
      version: 1,
      reponses: { 'cadrage-besoin': 'a'.repeat(700) },
      livrables: {},
      autoEvaluation: {},
      etapeCourante: 0,
      updatedAt: '2026-10-21T10:00:00.000Z',
    });
    expect(etat.reponses['cadrage-besoin']).toHaveLength(CHAMPS_MAX);
  });
});

class MemoireStockage {
  private donnees = new Map<string, string>();
  getItem(cle: string) { return this.donnees.get(cle) ?? null; }
  setItem(cle: string, valeur: string) { this.donnees.set(cle, valeur); }
  removeItem(cle: string) { this.donnees.delete(cle); }
  clear() { this.donnees.clear(); }
  key(index: number) { return [...this.donnees.keys()][index] ?? null; }
  get length() { return this.donnees.size; }
}

const stockageQuotaPlein = (): MemoireStockage => {
  const stockage = new MemoireStockage();
  stockage.setItem = () => { throw new Error('quota'); };
  return stockage;
};

describe('stockage du dossier', () => {
  it('retourne un état initial si la clé est absente', () => {
    const chargement = chargerDossier(new MemoireStockage());
    expect(chargement.etat.version).toBe(1);
    expect(chargement.avertissement).toBeNull();
  });

  it('sauvegarde puis recharge un état valide', () => {
    const stockage = new MemoireStockage();
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin fictif';
    etat.etapeCourante = 2;
    expect(sauvegarderDossier(etat, stockage)).toBeNull();
    expect(stockage.getItem(DOSSIER_STORAGE_KEY)).toContain('Besoin fictif');
    const chargement = chargerDossier(stockage);
    expect(chargement.etat.reponses['cadrage-besoin']).toBe('Besoin fictif');
    expect(chargement.etat.etapeCourante).toBe(2);
    expect(chargement.avertissement).toBeNull();
  });

  it('signale un JSON corrompu ou une forme inattendue et repart d’un état initial', () => {
    for (const brut of ['{', '[]', 'null', '{"version":2}', '"texte"']) {
      const stockage = new MemoireStockage();
      stockage.setItem(DOSSIER_STORAGE_KEY, brut);
      const chargement = chargerDossier(stockage);
      expect(chargement.etat.version, brut).toBe(1);
      expect(chargement.avertissement, brut).toBe('corrompu');
    }
  });

  it('détecte un stockage indisponible ou plein sans jeter', () => {
    expect(stockageDisponible(null)).toBe(false);
    expect(stockageDisponible(stockageQuotaPlein())).toBe(false);
    expect(sauvegarderDossier(etatInitialDossier(), null)).toContain('indisponible');
    expect(sauvegarderDossier(etatInitialDossier(), stockageQuotaPlein())).toContain('échoué');
  });

  it('sérialise un export versionné avec une date', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin fictif';
    const charge = JSON.parse(exporterDossier(etat)) as {
      version: number;
      exportedAt: string;
      dossier: { reponses: Record<string, string> };
    };
    expect(charge.version).toBe(1);
    expect(Number.isNaN(Date.parse(charge.exportedAt))).toBe(false);
    expect(charge.dossier.reponses['cadrage-besoin']).toBe('Besoin fictif');
  });
});

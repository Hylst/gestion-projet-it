// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { TERMES } from '../src/lib/glossaire';

describe('glossaire', () => {
  it('contient au moins 25 termes', () => {
    expect(TERMES.length).toBeGreaterThanOrEqual(25);
  });

  it('contient les neuf termes des angles morts', () => {
    const noms = TERMES.map((t) => t.terme);
    for (const terme of [
      'Comité de pilotage',
      'Critère d’acceptation',
      'Définition de prêt',
      'Gouvernance',
      'Journal de décisions',
      'Non-régression',
      'RACI',
      'Recette',
      'Sponsor',
    ]) {
      expect(noms).toContain(terme);
    }
  });

  it('les termes sont uniques', () => {
    const noms = TERMES.map((t) => t.terme.toLowerCase());
    expect(new Set(noms).size).toBe(noms.length);
  });

  it('chaque definition est courte et renseignee', () => {
    for (const t of TERMES) {
      expect(t.definition.length).toBeGreaterThanOrEqual(30);
      expect(t.definition.length).toBeLessThanOrEqual(240);
    }
  });

  it('les renvois de module restent dans le parcours', () => {
    for (const t of TERMES) {
      if (t.module !== undefined) {
        expect(t.module).toBeGreaterThanOrEqual(1);
        expect(t.module).toBeLessThanOrEqual(9);
      }
    }
  });

  it('aucun tiret cadratin dans les definitions', () => {
    expect(TERMES.every((t) => !t.definition.includes('—'))).toBe(true);
  });

  it('contient les vingt termes du lot P1', () => {
    const attendus = [
      'Atelier',
      'Arbre d’opportunités',
      'Capacité',
      'Chemin critique',
      'Coût d’entrée',
      'Critère de sortie',
      'Débit',
      'Déclencheur',
      'Délai de traversée',
      'Dépendance fournisseur',
      'Fiche outil',
      'Flux',
      'Indicateur d’adoption',
      'Modèle de menace',
      'Plan de reprise',
      'Pré-mortem',
      'Propriétaire de risque',
      'Revue par les pairs',
      'Sauvegarde',
      'Secret',
    ];
    const noms = TERMES.map((t) => t.terme);
    for (const terme of attendus) expect(noms, terme).toContain(terme);
    expect(TERMES.find((t) => t.terme === 'Modèle de menace')?.lien?.to).toBe('/ressources#parcours-cybersecurite');
    expect(TERMES.find((t) => t.terme === 'Arbre d’opportunités')?.lien?.to).toBe('/ressources#parcours-produit');
  });

  it('contient les dix termes IA et leurs liens', () => {
    const attendus = [
      'Agent',
      'Contexte',
      'Donnée personnelle',
      'Évaluation',
      'Hallucination',
      'Human-in-the-loop',
      'IA générative',
      'Jeu de test',
      'Prompt',
      'RAG',
    ];
    for (const terme of attendus) {
      const entree = TERMES.find((t) => t.terme === terme);
      expect(entree, terme).toBeDefined();
      expect(entree?.lien?.to.startsWith('/ia')).toBe(true);
      expect(entree?.lien?.label.length).toBeGreaterThan(5);
    }
  });
});

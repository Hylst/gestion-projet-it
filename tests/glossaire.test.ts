// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { TERMES, slugTexte, slugTerme, trouverTerme } from '../src/lib/glossaire';

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
    expect(TERMES.find((t) => t.terme === 'Modèle de menace')?.lien?.to).toBe('/cybersecurite/menaces');
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

  it('contient les dix termes cyber et leurs liens', () => {
    const attendus = [
      'Authentification multifacteur',
      'Chiffrement',
      'Contrôle d’accès',
      'Défense en profondeur',
      'Hygiène numérique',
      'Incident de sécurité',
      'Moindre privilège',
      'Phishing',
      'Rançongiciel',
      'Surface d’attaque',
    ];
    for (const terme of attendus) {
      const entree = TERMES.find((t) => t.terme === terme);
      expect(entree, terme).toBeDefined();
      expect(entree?.lien?.to.startsWith('/cybersecurite')).toBe(true);
      expect(entree?.lien?.label.length).toBeGreaterThan(5);
    }
    expect(TERMES.find((t) => t.terme === 'Modèle de menace')?.lien?.to).toBe('/cybersecurite/menaces');
  });

  it('contient les bases informatiques essentielles pour les juniors', () => {
    const bases = ['Dépôt', 'Serveur', 'API', 'Navigateur'];
    const noms = TERMES.map((t) => t.terme);
    for (const b of bases) {
      expect(noms, `manque la base : ${b}`).toContain(b);
    }
  });

  it('contient les sigles enrichis et développés', () => {
    const wbs = trouverTerme('WBS');
    expect(wbs).toBeDefined();
    expect(wbs?.sigle).toBe('WBS');
    expect(wbs?.developpe).toBe('Work Breakdown Structure');
    expect(wbs?.definition).toContain('OTP');

    const otp = trouverTerme('OTP');
    expect(otp).toBeDefined();
    expect(otp?.sigle).toBe('OTP');
    expect(otp?.developpe).toContain('Organigramme des Tâches');

    const sdp = trouverTerme('SDP');
    expect(sdp).toBeDefined();
    expect(sdp?.sigle).toBe('SDP');
    expect(sdp?.developpe).toContain('Structure de Découpage');

    const pert = trouverTerme('PERT');
    expect(pert).toBeDefined();
    expect(pert?.sigle).toBe('PERT');

    const raci = trouverTerme('RACI');
    expect(raci).toBeDefined();
    expect(raci?.developpe).toContain('Responsible');

    const ci = trouverTerme('CI');
    expect(ci).toBeDefined();
    expect(ci?.developpe).toContain('Intégration continue');

    const rgpd = trouverTerme('RGPD');
    expect(rgpd).toBeDefined();
    expect(rgpd?.developpe).toContain('Règlement général');
  });

  it('trouverTerme retrouve par identifiant, terme ou alias insensible à la casse', () => {
    expect(trouverTerme('wbs')?.terme).toBe('WBS');
    expect(trouverTerme('cadrage')?.terme).toBe('Cadrage');
    expect(trouverTerme('dépôt')?.terme).toBe('Dépôt');
    expect(trouverTerme('depot')?.terme).toBe('Dépôt');
    expect(trouverTerme('repository')?.terme).toBe('Dépôt');
    expect(trouverTerme('mfa')?.terme).toBe('Authentification multifacteur');
    expect(trouverTerme('terme-inconnu')).toBeUndefined();
  });

  it('slugTerme produit une ancre stable, sans accent et sans ponctuation', () => {
    expect(slugTexte('Arbre d’opportunités')).toBe('arbre-d-opportunites');
    expect(slugTerme(trouverTerme('WBS')!)).toBe('wbs');
    expect(slugTerme(trouverTerme('MFA')!)).toBe('mfa');
    expect(slugTerme(trouverTerme('Chaîne CI')!)).toBe('ci');
  });

  it('les ancres des termes sont uniques', () => {
    const ancres = TERMES.map((t) => slugTerme(t));
    expect(new Set(ancres).size).toBe(ancres.length);
  });

  it('chaque infobulle Terme pointe vers un terme connu', () => {
    const ids = new Set<string>();
    const parcourir = (dossier: string) => {
      for (const entree of readdirSync(dossier, { withFileTypes: true })) {
        const chemin = join(dossier, entree.name);
        if (entree.isDirectory()) {
          parcourir(chemin);
        } else if (entree.name.endsWith('.tsx')) {
          const contenu = readFileSync(chemin, 'utf8');
          for (const correspondance of contenu.matchAll(/<Terme\s+id="([^"]+)"/g)) {
            if (correspondance[1]) ids.add(correspondance[1]);
          }
        }
      }
    };
    parcourir('src');
    expect(ids.size).toBeGreaterThan(20);
    for (const id of ids) {
      expect(trouverTerme(id), `Terme inconnu\u00A0: ${id}`).toBeDefined();
    }
  });
});

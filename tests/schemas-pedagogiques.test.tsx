// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { SchemaCycleV } from '../src/components/schemas/SchemaCycleV';
import { SchemaCircuitDemande } from '../src/components/schemas/SchemaCircuitDemande';
import { SchemaCourbeAdoption } from '../src/components/schemas/SchemaCourbeAdoption';

afterEach(cleanup);

describe('SchemaCycleV (Module 3)', () => {
  it('rend le schéma, la légende et les quatre paires de validation', () => {
    render(<SchemaCycleV />);
    expect(screen.getByRole('figure')).toBeTruthy();
    expect(screen.getByText(/Cycle en V\s*: les tests conçus en miroir/i)).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('affiche le niveau 1 par défaut et met à jour au clic', () => {
    render(<SchemaCycleV />);
    expect(screen.getByText(/Besoin \u2194 Acceptation/i)).toBeTruthy();
    expect(screen.getByText(/La conformité avec les attentes initiales des usagers/i)).toBeTruthy();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[3]); // Code <-> Tests unitaires
    expect(screen.getByText(/Réalisation \(Code\) \u2194 Tests unitaires/i)).toBeTruthy();
    expect(screen.getByText(/Le bon fonctionnement individuel de chaque fonction/i)).toBeTruthy();
  });

  it('gère l activation au clavier avec Entrée et Espace', () => {
    render(<SchemaCycleV />);
    const boutons = screen.getAllByRole('button');
    fireEvent.keyDown(boutons[1], { key: 'Enter' });
    expect(screen.getByText(/Conception globale \u2194 Tests système/i)).toBeTruthy();

    fireEvent.keyDown(boutons[2], { key: ' ' });
    expect(screen.getByText(/Conception détaillée \u2194 Tests d’intégration/i)).toBeTruthy();
  });
});

describe('SchemaCircuitDemande (Module 5)', () => {
  it('rend le circuit avec ses 6 étapes et ses boucles de retour', () => {
    render(<SchemaCircuitDemande />);
    expect(screen.getByText(/Circuit d’une demande\s*: du besoin à la production/i)).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(6);
  });

  it('affiche l étape Besoin par défaut et met à jour au clic sur CI', () => {
    render(<SchemaCircuitDemande />);
    expect(screen.getByText(/Étape 1\s*: Besoin/i)).toBeTruthy();
    expect(screen.getByText(/Clarifier la valeur attendue et les critères d’acceptation/i)).toBeTruthy();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[3]); // CI
    expect(screen.getByText(/Étape 4\s*: CI \(Intégration continue\)/i)).toBeTruthy();
    expect(screen.getByText(/Branche bloquée tant que la CI n’est pas verte/i)).toBeTruthy();
  });
});

describe('SchemaCourbeAdoption (Module 9)', () => {
  it('rend la courbe d adoption avec les 4 phases et leurs actions', () => {
    render(<SchemaCourbeAdoption />);
    expect(screen.getByText(/Courbe d’adoption\s*: accompagner les quatre phases/i)).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('affiche la phase Choc par défaut et permet de basculer vers Résistance', () => {
    render(<SchemaCourbeAdoption />);
    expect(screen.getByText(/Phase 1\s*: Choc/i)).toBeTruthy();
    expect(screen.getByText(/Accueillir les réactions sans juger/i)).toBeTruthy();

    const boutons = screen.getAllByRole('button');
    fireEvent.click(boutons[1]); // Résistance
    expect(screen.getByText(/Phase 2\s*: Résistance/i)).toBeTruthy();
    expect(screen.getByText(/Réexpliquer le sens du projet/i)).toBeTruthy();
  });
});

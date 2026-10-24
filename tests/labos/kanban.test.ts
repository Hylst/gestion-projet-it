// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import { reducKanban, verifierKanban, COLONNES, WIP_MAX, initialState, KanbanState } from '../../src/labos/LaboKanban';

const avance = (s: KanbanState, carte: string) => reducKanban(s, { type: 'deplace', carte, sens: 1 });
const recule = (s: KanbanState, carte: string) => reducKanban(s, { type: 'deplace', carte, sens: -1 });

describe('reducKanban', () => {
  it('avance une carte d une colonne', () => {
    const s = reducKanban(initialState(), { type: 'deplace', carte: 'Page accueil', sens: 1 });
    expect(s.cartes['Page accueil']).toBe('En cours');
  });
  it('refuse d entrer en En cours si WIP atteint et compte un blocage', () => {
    let s = initialState();
    s = avance(s, 'Page accueil');          // En cours: 1
    s = avance(s, 'Agenda des activités');  // En cours: 2
    const avant = s.blocages;
    s = avance(s, 'Formulaire contact');    // refusé
    expect(s.cartes['Formulaire contact']).toBe('À faire');
    expect(s.blocages).toBe(avant + 1);
    expect(COLONNES.length).toBe(4);
    expect(WIP_MAX).toBe(2);
  });
  it('bloque la sortie au dela de Fini', () => {
    let s = initialState();
    for (let i = 0; i < 5; i++) s = avance(s, 'Page accueil');
    expect(s.cartes['Page accueil']).toBe('Fini');
    const s2 = avance(s, 'Page accueil');
    expect(s2.cartes['Page accueil']).toBe('Fini');
  });
  it('recule une carte sans creer de blocage', () => {
    let s = initialState();
    s = avance(s, 'Page accueil');
    s = recule(s, 'Page accueil');
    expect(s.cartes['Page accueil']).toBe('À faire');
    expect(s.blocages).toBe(0);
  });
});

describe('verifierKanban', () => {
  it('ok quand toutes les cartes sont en Fini', () => {
    let s = initialState();
    for (const carte of ['Page accueil', 'Agenda des activités', 'Formulaire contact', 'Version mobile', 'Galerie photos', 'Notice bénévole']) {
      for (let i = 0; i < 5; i++) s = avance(s, carte);
    }
    expect(verifierKanban(s).ok).toBe(true);
  });
  it('pas ok au depart', () => {
    expect(verifierKanban(initialState()).ok).toBe(false);
  });
});

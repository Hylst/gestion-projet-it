// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect } from 'vitest';
import {
  reducerWBS, verifierWBS, LOT_ATTENDU, NOTICE_CACHEE, WbsState,
} from '../../src/labos/LaboWbs';
import type { Lot } from '../../src/labos/LaboWbs';

const S0: WbsState = { place: {}, noticeTrouvee: false };

describe('reducerWBS', () => {
  it('assign place une carte dans un lot', () => {
    const s = reducerWBS(S0, { type: 'assign', carte: 'inventaire', lot: 'contenu' });
    expect(s.place.inventaire).toBe('contenu');
  });
  it('assign deplace une carte', () => {
    let s = reducerWBS(S0, { type: 'assign', carte: 'textes', lot: 'realisation' });
    s = reducerWBS(s, { type: 'assign', carte: 'textes', lot: 'contenu' });
    expect(s.place.textes).toBe('contenu');
  });
  it('devine-notice ajoute la carte cachee et la place en mise-en-ligne', () => {
    const s = reducerWBS(S0, { type: 'devine-notice' });
    expect(s.noticeTrouvee).toBe(true);
    expect(s.place[NOTICE_CACHEE]).toBe('mise-en-ligne');
  });
  it('reset remet a vide', () => {
    let s = reducerWBS(S0, { type: 'assign', carte: 'photos', lot: 'contenu' });
    s = reducerWBS(s, { type: 'reset' });
    expect(s.place).toEqual({});
  });
});

describe('verifierWBS', () => {
  it('echoue au depart avec messages clairs', () => {
    const r = verifierWBS(S0);
    expect(r.ok).toBe(false);
    expect(r.messages.length).toBeGreaterThan(3);
  });
  it('ok quand tout est au bon lot, notice incluse et hors exclus', () => {
    let s: WbsState = S0;
    for (const [c, l] of Object.entries(LOT_ATTENDU)) s = reducerWBS(s, { type: 'assign', carte: c, lot: l as Lot });
    expect(verifierWBS(s).ok).toBe(true);
  });
  it('echoue si une carte hors perimetre est placee dans un lot', () => {
    let s: WbsState = S0;
    for (const [c, l] of Object.entries(LOT_ATTENDU)) s = reducerWBS(s, { type: 'assign', carte: c, lot: l as Lot });
    s = reducerWBS(s, { type: 'assign', carte: 'paiement', lot: 'realisation' });
    const r = verifierWBS(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/paiement/i);
  });
  it('indice notice : verifier sans notice signale l oubli', () => {
    let s: WbsState = S0;
    for (const [c, l] of Object.entries(LOT_ATTENDU)) if (c !== 'notice' && c !== 'paiement' && c !== 'application') s = reducerWBS(s, { type: 'assign', carte: c, lot: l as Lot });
    const r = verifierWBS(s);
    expect(r.ok).toBe(false);
    expect(r.messages.join(' ')).toMatch(/notice/i);
  });
});

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { beforeEach, describe, expect, it } from 'vitest';
import {
  ONBOARDING_KEY,
  ONBOARDING_SLIDES,
  aDejaVuOnboarding,
  marquerOnboardingVu,
} from '../src/lib/onboarding';

beforeEach(() => localStorage.clear());

describe('onboarding', () => {
  it('propose cinq etapes avec des identifiants uniques', () => {
    expect(ONBOARDING_SLIDES).toHaveLength(5);
    expect(new Set(ONBOARDING_SLIDES.map((slide) => slide.id)).size).toBe(5);
  });

  it('ne marque pas la visite comme vue au depart', () => {
    expect(aDejaVuOnboarding()).toBe(false);
  });

  it('marque la visite comme vue et relit le drapeau', () => {
    marquerOnboardingVu();
    expect(aDejaVuOnboarding()).toBe(true);
    expect(JSON.parse(localStorage.getItem(ONBOARDING_KEY) ?? '{}')).toEqual({ version: 1, vu: true });
  });

  it('ignore un drapeau invalide ou une autre version', () => {
    localStorage.setItem(ONBOARDING_KEY, '{"version":2,"vu":true}');
    expect(aDejaVuOnboarding()).toBe(false);
    localStorage.setItem(ONBOARDING_KEY, 'pas du json');
    expect(aDejaVuOnboarding()).toBe(false);
  });

  it('respecte la charte typographique et ne promet aucun XP', () => {
    for (const slide of ONBOARDING_SLIDES) {
      for (const texte of [slide.titre, slide.texte, ...slide.points]) {
        expect(texte, `${slide.id} tiret cadratin`).not.toContain('—');
        expect(texte, `${slide.id} apostrophe droite`).not.toContain("'");
        expect(texte, `${slide.id} espace avant ponctuation`).not.toMatch(/ [;:?!]/);
        expect(texte, `${slide.id} guillemets`).not.toMatch(/« | »/);
      }
    }
    expect(JSON.stringify(ONBOARDING_SLIDES)).not.toContain('+5 XP');
  });
});

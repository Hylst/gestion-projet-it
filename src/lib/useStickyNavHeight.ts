// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useLayoutEffect, type RefObject } from 'react';

/**
 * Mesure la hauteur du sommaire sticky et l’expose en variable CSS sur la page.
 * Les ancres utilisent cette hauteur pour ne pas se retrouver sous le sommaire
 * lorsque celui-ci passe sur plusieurs lignes sur les petits écrans.
 */
export function useStickyNavHeight(
  ref: RefObject<HTMLElement | null>,
  selecteur: string,
  variable = '--sommaire-h',
): void {
  useLayoutEffect(() => {
    const racine = ref.current;
    const nav = racine?.querySelector<HTMLElement>(selecteur);
    if (!racine || !nav) return;

    const appliquer = () => {
      racine.style.setProperty(variable, `${nav.getBoundingClientRect().height}px`);
    };

    appliquer();
    if (typeof ResizeObserver === 'undefined') return;

    const observateur = new ResizeObserver(appliquer);
    observateur.observe(nav);
    return () => observateur.disconnect();
  }, [ref, selecteur, variable]);
}

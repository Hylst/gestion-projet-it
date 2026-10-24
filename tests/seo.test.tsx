// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SeoHead, canonicalUrl } from '../src/components/SeoHead';
import NotFound from '../src/routes/NotFound';

afterEach(() => {
  document.title = '';
  document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[name^="twitter:"], meta[property^="og:"], link[rel="canonical"]').forEach((el) => el.remove());
});

describe('seo', () => {
  it('canonicalUrl garde origin et path complet', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/module-1');
    expect(canonicalUrl()).toBe('http://localhost/gestion-projet-it/module-1');
  });
  it('canonicalUrl exclut query et fragment', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/module-1?x=1#fiche');
    expect(canonicalUrl()).toBe('http://localhost/gestion-projet-it/module-1');
  });
  it('SeoHead met title, description, canonical et og:url', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/');
    render(<SeoHead title="Accueil" description="Cours interactif" />);
    expect(document.title).toBe('Accueil\u00A0: Gestion de Projet IT');
    const sel = (n: string, a: string) => document.querySelector(`meta[${n}="${a}"]`);
    expect(sel('name', 'description')?.getAttribute('content')).toBe('Cours interactif');
    expect(sel('property', 'og:url')?.getAttribute('content')).toBe('http://localhost/gestion-projet-it/');
    expect((document.querySelector('link[rel="canonical"]') as HTMLLinkElement).href).toBe('http://localhost/gestion-projet-it/');
    expect(sel('property', 'og:image')?.getAttribute('content')).toBe('https://hylst.fr/gestion-projet-it/og-image.png');
    expect(sel('name', 'twitter:image')?.getAttribute('content')).toBe('https://hylst.fr/gestion-projet-it/og-image.png');
  });
  it('SeoHead ne duplique pas la marque quand le titre la contient deja', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/');
    render(<SeoHead title={'Gestion de Projet IT\u00A0: Méthodologies et Équipes'} description="Cours interactif" />);
    expect(document.title).toBe('Gestion de Projet IT\u00A0: Méthodologies et Équipes');
  });
  it('SeoHead applique noindex puis retablit index, follow', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/inconnue');
    const robots = () => document.querySelector('meta[name="robots"]')?.getAttribute('content');
    const { rerender } = render(<SeoHead title="Page introuvable" description="Route inconnue" noindex />);
    expect(robots()).toBe('noindex');
    rerender(<SeoHead title="Page introuvable" description="Route inconnue" />);
    expect(robots()).toBe('index, follow');
  });
  it('NotFound demande noindex', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/inconnue');
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(document.title).toBe('Page introuvable\u00A0: Gestion de Projet IT');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
  });
});

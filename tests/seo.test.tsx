import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SeoHead, canonicalUrl } from '../src/components/SeoHead';

describe('seo', () => {
  it('canonicalUrl garde origin et path complet', () => {
    window.history.replaceState({}, '', '/gestion-projet-it/module-1');
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
  });
});

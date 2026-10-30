// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { CYBER_PAGES, type CyberPageMeta } from '../src/cyber/pages';
import { CYBER_SOURCES } from '../src/cyber/sources';
import { CyberLayout } from '../src/cyber/CyberLayout';

afterEach(() => {
  cleanup();
  document.title = '';
  document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], link[rel="canonical"]').forEach((el) => el.remove());
});

const rendre = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const page = (slug: string): CyberPageMeta => {
  const meta = CYBER_PAGES.find((candidate) => candidate.slug === slug);
  if (!meta) throw new Error(`Page cyber absente\u00A0: ${slug}`);
  return meta;
};

describe('registre cyber', () => {
  it('contient six pages uniques et completes', () => {
    expect(CYBER_PAGES).toHaveLength(6);
    expect(new Set(CYBER_PAGES.map((p) => p.slug)).size).toBe(6);
    expect(new Set(CYBER_PAGES.map((p) => p.path)).size).toBe(6);
    for (const p of CYBER_PAGES) {
      expect(p.path.startsWith('/cybersecurite')).toBe(true);
      expect(p.description.length).toBeLessThan(160);
      expect(p.sections.length).toBeGreaterThanOrEqual(5);
      expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    }
  });

  it('fournit des sources completes et conformes a la politique', () => {
    for (const source of Object.values(CYBER_SOURCES)) {
      expect(source.organisme.length).toBeGreaterThan(2);
      expect(source.titre.length).toBeGreaterThan(3);
      expect(source.version.length).toBeGreaterThan(2);
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.usage.length).toBeGreaterThan(10);
      expect(source.limite.length).toBeGreaterThan(10);
      expect(source.verifieLe).toBe('30 octobre 2026');
    }
    expect(CYBER_SOURCES.iso27001.payant).toBe(true);
  });
});

describe('gabarit cyber', () => {
  const meta = page('cybersecurite');

  it('rend le titre, le sommaire, les ancres, les sources et les reperes', () => {
    const { container } = rendre(
      <CyberLayout
        meta={meta}
        intro="Introduction de test."
        retenir={['Point un.']}
        checklist={['Item un.']}
        sources={[CYBER_SOURCES.anssi, CYBER_SOURCES.iso27001]}
      >
        {meta.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.label}</h2>
            <p>Contenu.</p>
          </section>
        ))}
      </CyberLayout>,
    );
    expect(screen.getByRole('heading', { level: 1, name: meta.titre })).not.toBeNull();
    const nav = screen.getByRole('navigation', { name: 'Sommaire de la page' });
    for (const section of meta.sections) {
      expect(nav.querySelector(`a[href="#${section.id}"]`)?.textContent).toBe(section.label);
      expect(document.getElementById(section.id)).not.toBeNull();
    }
    expect(screen.getByRole('heading', { level: 2, name: 'À retenir' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Checklist' })).not.toBeNull();
    expect(screen.getByText('Veille arrêtée en octobre 2026.')).not.toBeNull();
    expect(screen.getByText(/Usage\s*:\s*Trouver les guides d’hygiène et de réponse à incident\./)).not.toBeNull();
    expect(screen.getByText(/Limite\s*:\s*Pas de diagnostic d’infrastructure\./)).not.toBeNull();
    expect(screen.getAllByText('Vérifié le 30 octobre 2026.')).toHaveLength(2);
    expect(screen.getByText('Norme payante.')).not.toBeNull();
    const sources = Array.from(container.querySelectorAll('.cyber-sources a'));
    expect(sources).toHaveLength(2);
    for (const source of sources) {
      expect(source.getAttribute('target')).toBe('_blank');
      expect(source.getAttribute('rel')).toBe('noopener noreferrer');
    }
    expect(container.querySelectorAll('img, iframe, script, video')).toHaveLength(0);
  });

  it('propose le lien suivant et aucun precedent sur le hub', () => {
    rendre(
      <CyberLayout meta={meta} intro="Intro." retenir={['Un.']} checklist={['Un.']} sources={[CYBER_SOURCES.anssi]}>
        <section id="pourquoi"><h2>Pourquoi</h2></section>
      </CyberLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Navigation dans le parcours Cybersécurité' });
    expect(nav.querySelector('a[href="/cybersecurite"]')).toBeNull();
    expect(nav.querySelector('a[href="/cybersecurite/menaces"]')).not.toBeNull();
  });
});

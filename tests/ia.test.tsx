import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { IA_PAGES, type IaPageMeta } from '../src/ia/pages';
import { SOURCES } from '../src/ia/sources';
import { IaLayout } from '../src/ia/IaLayout';
import { IaHubPage } from '../src/ia/content/Hub';
import { IaUsagesPage } from '../src/ia/content/Usages';
import { IaMethodesPage } from '../src/ia/content/Methodes';
import { IaOutilsPage } from '../src/ia/content/OutilsConfiguration';
import { IaGouvernancePage } from '../src/ia/content/Gouvernance';
import Accueil from '../src/routes/accueil';
import Glossaire from '../src/routes/Glossaire';
import { ProgressProvider } from '../src/lib/progress';

afterEach(() => {
  cleanup();
  document.title = '';
  document.head.querySelectorAll('meta[name="description"], meta[name="robots"], meta[property^="og:"], link[rel="canonical"]').forEach((el) => el.remove());
});

const rendre = (ui: ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

const page = (slug: string): IaPageMeta => {
  const meta = IA_PAGES.find((candidate) => candidate.slug === slug);
  if (!meta) throw new Error(`Page IA absente\u00A0: ${slug}`);
  return meta;
};

describe('registre IA', () => {
  it('contient cinq pages uniques et completes', () => {
    expect(IA_PAGES).toHaveLength(5);
    expect(new Set(IA_PAGES.map((p) => p.slug)).size).toBe(5);
    expect(new Set(IA_PAGES.map((p) => p.path)).size).toBe(5);
    for (const p of IA_PAGES) {
      expect(p.path.startsWith('/ia')).toBe(true);
      expect(p.description.length).toBeLessThan(160);
      expect(p.sections.length).toBeGreaterThanOrEqual(5);
      expect(new Set(p.sections.map((s) => s.id)).size).toBe(p.sections.length);
    }
  });
});

describe('gabarit IA', () => {
  const meta = page('ia');

  it('rend le titre, le sommaire, les ancres et les reperes', () => {
    const { container } = rendre(
      <IaLayout
        meta={meta}
        intro="Introduction de test."
        retenir={['Point un.']}
        checklist={['Item un.']}
        sources={[SOURCES.aiAct, SOURCES.cnil, SOURCES.nist]}
      >
        {meta.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.label}</h2>
            <p>Contenu.</p>
          </section>
        ))}
      </IaLayout>,
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
    const sources = Array.from(container.querySelectorAll('.ia-sources a'));
    expect(sources).toHaveLength(3);
    for (const source of sources) {
      expect(source.getAttribute('target')).toBe('_blank');
      expect(source.getAttribute('rel')).toBe('noopener noreferrer');
    }
    expect(container.querySelectorAll('img, iframe, script, video')).toHaveLength(0);
  });

  it('propose le lien suivant et aucun precedent sur le hub', () => {
    rendre(
      <IaLayout meta={meta} intro="Intro." retenir={['Un.']} checklist={['Un.']} sources={[SOURCES.aiAct]}>
        <section id="pourquoi"><h2>Pourquoi</h2></section>
      </IaLayout>,
    );
    const nav = screen.getByRole('navigation', { name: 'Navigation dans la section IA' });
    expect(nav.querySelector('a[href="/ia"]')).toBeNull();
    expect(nav.querySelector('a[href="/ia/usages"]')).not.toBeNull();
  });
});

describe('hub IA', () => {
  it('expose les cinq questions et les liens vers les pages', () => {
    rendre(<IaHubPage />);
    expect(document.querySelectorAll('#cinq-questions li')).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Usages de l’IA par phase de projet' })).not.toBeNull();
    expect(screen.getByText('Sur Les Amis du Square, l’IA peut préparer un brouillon de note de cadrage. Le bureau de l’association valide le besoin, le périmètre et les critères de réussite.')).not.toBeNull();
  });
});

describe('usages IA', () => {
  it('couvre six phases et le controle humain', () => {
    rendre(<IaUsagesPage />);
    const table = screen.getByRole('table', { name: 'Usages de l’IA par phase de projet' });
    expect(table.querySelectorAll('tbody tr')).toHaveLength(6);
    expect(screen.getByText('Faux réalisme')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Ce qui reste humain' })).not.toBeNull();
  });
});

describe('methodes IA', () => {
  it('distingue le corpus, l agent et la validation', () => {
    rendre(<IaMethodesPage />);
    expect(screen.getByRole('heading', { level: 2, name: 'Recherche documentaire et RAG' })).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Agents et automatisations' })).not.toBeNull();
    expect(screen.getByText(/Un agent sans permission ni supervision est un risque\./)).not.toBeNull();
  });
});

describe('outils IA', () => {
  it('expose les categories, les parametres et la checklist de configuration', () => {
    rendre(<IaOutilsPage />);
    const categories = screen.getByRole('table', { name: 'Catégories d’outils' });
    expect(categories.querySelectorAll('tbody tr')).toHaveLength(6);
    const parametres = screen.getByRole('table', { name: 'Paramètres qui comptent' });
    expect(parametres.querySelectorAll('tbody tr')).toHaveLength(7);
    expect(screen.getByRole('heading', { level: 2, name: 'Checklist de configuration' })).not.toBeNull();
    expect(within(categories).getByText(/Ollama/)).not.toBeNull();
  });
});

describe('gouvernance IA', () => {
  it('couvre le droit, la securite et les fournisseurs', () => {
    rendre(<IaGouvernancePage />);
    expect(screen.getByText(/Ce contenu n’est pas un conseil juridique/)).not.toBeNull();
    expect(screen.getAllByText(/AI Act/).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { level: 2, name: 'Sécurité et propriété intellectuelle' })).not.toBeNull();
  });
});

describe('accueil IA', () => {
  it('expose la section et les quatre pages', () => {
    render(
      <ProgressProvider>
        <MemoryRouter>
          <Accueil />
        </MemoryRouter>
      </ProgressProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Gestion de projet et IA' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Ouvrir la section IA' })).not.toBeNull();
    for (const page of IA_PAGES.slice(1)) {
      expect(screen.getByRole('link', { name: page.titre })).not.toBeNull();
    }
  });
});

describe('glossaire IA', () => {
  it('relie les termes IA a la section', () => {
    rendre(<Glossaire />);
    const rag = screen.getByText('RAG');
    expect(rag.nextElementSibling?.querySelector('a[href="/ia/methodes"]')).not.toBeNull();
  });
});

describe('sitemap IA', () => {
  it('contient les cinq routes IA et 18 URL uniques', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toHaveLength(18);
    expect(new Set(urls).size).toBe(18);
    for (const page of IA_PAGES) {
      expect(xml).toContain(`https://hylst.fr/gestion-projet-it${page.path}`);
    }
  });
});

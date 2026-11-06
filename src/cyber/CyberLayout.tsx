// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { CyberChecklist } from './CyberChecklist';
import { CYBER_PAGES, type CyberPageMeta } from './pages';
import type { CyberSource } from './sources';

export interface CyberLayoutProps {
  meta: CyberPageMeta;
  intro: string;
  retenir: readonly string[];
  checklist: readonly string[];
  checklistTitre?: string;
  sources: readonly CyberSource[];
  children: ReactNode;
}

export function CyberLayout({ meta, intro, retenir, checklist, checklistTitre, sources, children }: CyberLayoutProps) {
  const index = CYBER_PAGES.findIndex((page) => page.slug === meta.slug);
  const precedent = index > 0 ? CYBER_PAGES[index - 1] : undefined;
  const suivant = index >= 0 && index < CYBER_PAGES.length - 1 ? CYBER_PAGES[index + 1] : undefined;
  return (
    <article className="cyber-page theme-cyber">
      <SeoHead title={meta.titre} description={meta.description} />
      <header className="cyber-hero">
        <p className="kicker">Parcours Cybersécurité</p>
        <h1>{meta.titre}</h1>
        <p className="accroche">{intro}</p>
      </header>
      <nav className="cyber-sommaire" aria-label="Sommaire de la page">
        {meta.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>{section.label}</a>
        ))}
      </nav>
      {children}
      <aside className="cyber-callout cyber-callout--retenir" aria-labelledby="cyber-retenir-titre">
        <h2 id="cyber-retenir-titre">À retenir</h2>
        <ul>
          {retenir.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </aside>
      <CyberChecklist titre={checklistTitre} items={checklist} />
      <section className="cyber-sources" aria-labelledby="cyber-sources-titre">
        <h2 id="cyber-sources-titre">Sources et veille</h2>
        <p>Veille arrêtée en octobre 2026.</p>
        <ul>
          {sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.organisme}&nbsp;: {source.titre}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>{' '}
              <span>({source.version})</span>
              {source.payant && <span className="cyber-source-payant"> Norme payante.</span>}
              <p className="cyber-source-usage">Usage&nbsp;: {source.usage}</p>
              <p className="cyber-source-limite">Limite&nbsp;: {source.limite}</p>
              <p className="cyber-source-date">Vérifié le {source.verifieLe}.</p>
            </li>
          ))}
        </ul>
      </section>
      <nav className="cyber-pager" aria-label="Navigation dans le parcours Cybersécurité">
        {precedent ? <Link to={precedent.path}>Précédent&nbsp;: {precedent.titreCourt}</Link> : <span aria-hidden="true" />}
        {suivant ? <Link to={suivant.path}>Suivant&nbsp;: {suivant.titreCourt}</Link> : <span aria-hidden="true" />}
      </nav>
    </article>
  );
}

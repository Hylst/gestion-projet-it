// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { IaChecklist } from './IaChecklist';
import { IA_PAGES, type IaPageMeta } from './pages';
import type { IaSource } from './sources';

export interface IaLayoutProps {
  meta: IaPageMeta;
  intro: string;
  retenir: readonly string[];
  checklist: readonly string[];
  checklistTitre?: string;
  sources: readonly IaSource[];
  children: ReactNode;
}

export function IaLayout({ meta, intro, retenir, checklist, checklistTitre, sources, children }: IaLayoutProps) {
  const index = IA_PAGES.findIndex((page) => page.slug === meta.slug);
  const precedent = index > 0 ? IA_PAGES[index - 1] : undefined;
  const suivant = index >= 0 && index < IA_PAGES.length - 1 ? IA_PAGES[index + 1] : undefined;
  return (
    <article className="ia-page theme-ia">
      <SeoHead title={meta.titre} description={meta.description} />
      <header className="ia-hero">
        <p className="kicker">Section IA</p>
        <h1>{meta.titre}</h1>
        <p className="accroche">{intro}</p>
      </header>
      <nav className="ia-sommaire" aria-label="Sommaire de la page">
        {meta.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>{section.label}</a>
        ))}
      </nav>
      {children}
      <aside className="ia-callout ia-callout--retenir" aria-labelledby="ia-retenir-titre">
        <h2 id="ia-retenir-titre">À retenir</h2>
        <ul>
          {retenir.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </aside>
      <IaChecklist titre={checklistTitre} items={checklist} />
      <section className="ia-sources" aria-labelledby="ia-sources-titre">
        <h2 id="ia-sources-titre">Sources et veille</h2>
        <p>Veille arrêtée en octobre 2026.</p>
        <ul>
          {sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.organisme}&nbsp;: {source.titre}
                <span className="sr-only"> (nouvel onglet)</span>
              </a>{' '}
              <span>({source.version})</span>
            </li>
          ))}
        </ul>
      </section>
      <nav className="ia-pager" aria-label="Navigation dans la section IA">
        {precedent ? <Link to={precedent.path}>Précédent&nbsp;: {precedent.titreCourt}</Link> : <span aria-hidden="true" />}
        {suivant ? <Link to={suivant.path}>Suivant&nbsp;: {suivant.titreCourt}</Link> : <span aria-hidden="true" />}
      </nav>
    </article>
  );
}

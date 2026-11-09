// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { SeoHead } from './SeoHead';
import { ModuleEnd } from './ModuleEnd';
import { ModulePicto } from './ModulePicto';
import { ModulePager } from './ModulePager';
import type { ModuleMeta } from '../modules/index';

export interface ModuleSectionNav {
  id: string;
  label: string;
}

export function ModuleLayout(props: {
  meta: ModuleMeta;
  children: React.ReactNode;
  extraNav?: { href: string; label: string };
  sections?: ModuleSectionNav[];
}) {
  const sectionsParDefaut: ModuleSectionNav[] = [
    { id: 'fiche', label: 'Fiche' },
    { id: 'fil-rouge', label: 'Fil rouge' },
    { id: 'demarche', label: 'Démarche' },
    { id: 'labo', label: 'Labo' },
    ...(props.extraNav
      ? [{ id: props.extraNav.href.replace('#', ''), label: props.extraNav.label }]
      : []),
    { id: 'exercice', label: 'Exercice corrigé' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'guide', label: 'Erreurs et décisions' },
    { id: 'reflexe', label: 'Fiche réflexe' },
  ];

  const sommaireSections = props.sections ?? sectionsParDefaut;
  const tempsLibelle = props.meta.temps
    ? `Module ${props.meta.num} · ${props.meta.temps.lecture} de lecture, ${props.meta.temps.pratique} de pratique`
    : `Module ${props.meta.num}`;

  return (
    <article className={`module-page module-theme-${props.meta.num}`}>
      <SeoHead title={props.meta.titre} description={props.meta.resume} />
      <header className="module-head">
        <div className="module-head-row">
          <ModulePicto num={props.meta.num} />
          <div className="module-head-texte">
            <p className="kicker">{tempsLibelle}</p>
            <h1>{props.meta.titre}</h1>
            <p>{props.meta.resume}</p>
          </div>
        </div>
      </header>
      <nav aria-label="Sommaire du module" className="sommaire sommaire-module">
        {sommaireSections.map((sec) => (
          <a key={sec.id} href={`#${sec.id}`}>
            {sec.label}
          </a>
        ))}
      </nav>
      {props.children}
      <ModuleEnd id={props.meta.id} />
      <ModulePager numCourant={props.meta.num} />
    </article>
  );
}

export default ModuleLayout;

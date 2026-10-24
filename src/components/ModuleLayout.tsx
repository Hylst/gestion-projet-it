// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { SeoHead } from './SeoHead';
import { ModuleEnd } from './ModuleEnd';
import { ModulePicto } from './ModulePicto';
import type { ModuleMeta } from '../modules/index';

export function ModuleLayout(props: { meta: ModuleMeta; children: React.ReactNode; extraNav?: { href: string; label: string } }) {
  return (
    <article className={`module-page module-theme-${props.meta.num}`}>
      <SeoHead title={props.meta.titre} description={props.meta.resume} />
      <header className="module-head">
        <div className="module-head-row">
          <ModulePicto num={props.meta.num} />
          <div className="module-head-texte">
            <p className="kicker">Module {props.meta.num} - 5&nbsp;minutes de lecture par fiche</p>
            <h1>{props.meta.titre}</h1>
            <p>{props.meta.resume}</p>
          </div>
        </div>
      </header>
      <nav aria-label="Sommaire du module" className="sommaire sommaire-module">
        <a href="#fiche">Fiche</a>
        <a href="#fil-rouge">Fil rouge</a>
        <a href="#demarche">Démarche</a>
        <a href="#labo">Labo</a>
        {props.extraNav && <a href={props.extraNav.href}>{props.extraNav.label}</a>}
        <a href="#exercice">Exercice corrigé</a>
        <a href="#quiz">Quiz</a>
        <a href="#guide">Erreurs et décisions</a>
        <a href="#reflexe">Fiche réflexe</a>
      </nav>
      {props.children}
      <ModuleEnd id={props.meta.id} />
    </article>
  );
}

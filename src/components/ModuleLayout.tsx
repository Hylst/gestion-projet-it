import React from 'react';
import { SeoHead } from './SeoHead';
import { ModuleEnd } from './ModuleEnd';
import { ModulePicto } from './ModulePicto';
import type { ModuleMeta } from '../modules/index';

export function ModuleLayout(props: { meta: ModuleMeta; children: React.ReactNode }) {
  return (
    <article className="module-page">
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
        <nav aria-label="Sommaire du module" className="sommaire">
          <a href="#fiche">Fiche</a>
          <a href="#fil-rouge">Fil rouge</a>
          <a href="#demarche">Démarche</a>
          <a href="#labo">Labo</a>
          <a href="#exercice">Exercice corrigé</a>
          <a href="#quiz">Quiz</a>
          <a href="#guide">Erreurs et décisions</a>
          <a href="#reflexe">Fiche réflexe</a>
        </nav>
      </header>
      {props.children}
      <ModuleEnd id={props.meta.id} />
    </article>
  );
}

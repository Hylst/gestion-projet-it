import React from 'react';
import { SeoHead } from './SeoHead';
import { ModuleEnd } from './ModuleEnd';
import type { ModuleMeta } from '../modules/index';

export function ModuleLayout(props: { meta: ModuleMeta; children: React.ReactNode }) {
  return (
    <article className="module-page">
      <SeoHead title={props.meta.titre} description={props.meta.resume} />
      <header className="module-head">
        <p className="kicker">Module {props.meta.num} - 5 minutes de lecture par fiche</p>
        <h1>{props.meta.titre}</h1>
        <p>{props.meta.resume}</p>
        <nav aria-label="Sommaire du module" className="sommaire">
          <a href="#fiche">Fiche</a>
          <a href="#fil-rouge">Fil rouge</a>
          <a href="#demarche">Demarche</a>
          <a href="#labo">Labo</a>
          <a href="#exercice">Exercice corrige</a>
          <a href="#quiz">Quiz</a>
          <a href="#reflexe">Fiche reflexe</a>
        </nav>
      </header>
      {props.children}
      <ModuleEnd id={props.meta.id} />
    </article>
  );
}

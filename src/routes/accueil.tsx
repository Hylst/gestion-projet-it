// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { MODULES } from '../modules/index';
import { IA_PAGES } from '../ia/pages';
import { ModulePicto } from '../components/ModulePicto';
import { SeoHead } from '../components/SeoHead';
import Reveal from '../components/Reveal';
import { useProgress } from '../lib/progress';
import '../styles/hero.css';
import '../styles/ia.css';

function Hero() {
  return (
    <section className="hero reveal visible">
      <p className="kicker">Cours interactif gratuit, sans compte</p>
      <h1>Gérer un projet informatique, pas à pas</h1>
      <p className="accroche">Cadrer, découper, planifier, choisir sa méthode, outiller et animer l’équipe&nbsp;: 9 modules courts avec labos manipulables, exercices corrigés et quiz, sur un fil rouge fictif.</p>
      <ul className="hero-stats" aria-label="Le cours en bref">
        <li><strong>9</strong> modules</li>
        <li><strong>11</strong> laboratoires</li>
        <li><strong>6</strong> étapes de dossier projet</li>
        <li><strong>0</strong> compte ou cookie</li>
      </ul>
      <div className="hero-panels" role="group" aria-label="Trois vues du cours">
        <div className="hero-panel">
          <p className="hero-panel-titre">GANTT</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <line x1="180" y1="4" x2="180" y2="56" className="hero-today" />
            <g className="gantt-bar"><rect x="10" y="8" width="86" height="8" rx="4" fill="var(--c-main)" /></g>
            <g className="gantt-bar2"><rect x="26" y="22" width="112" height="8" rx="4" fill="var(--c-calm)" /></g>
            <rect x="10" y="36" width="146" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
            <path d="M96 12h10v14h10" fill="none" stroke="var(--c-muted)" strokeWidth="1.2" />
            <circle cx="200" cy="12" r="5" fill="var(--c-main)" />
          </svg>
          <p className="hero-panel-legende">tâches, jalons, chaînes</p>
        </div>
        <div className="hero-panel">
          <p className="hero-panel-titre">Kanban</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <text x="10" y="9" fontSize="8" fill="var(--c-muted)">À faire</text>
            <text x="82" y="9" fontSize="8" fill="var(--c-muted)">En cours</text>
            <text x="154" y="9" fontSize="8" fill="var(--c-muted)">Fini</text>
            <rect x="8" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="80" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="152" y="14" width="64" height="38" rx="5" fill="var(--c-bg)" stroke="var(--c-line)" />
            <rect x="14" y="20" width="52" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
            <g className="kan-1"><rect x="86" y="20" width="52" height="8" rx="4" fill="var(--c-main)" /></g>
            <g className="kan-2"><rect x="86" y="32" width="52" height="8" rx="4" fill="var(--c-calm)" /></g>
            <rect x="158" y="20" width="52" height="8" rx="4" fill="var(--c-soft)" stroke="var(--c-line)" />
          </svg>
          <p className="hero-panel-legende">limites de WIP</p>
        </div>
        <div className="hero-panel">
          <p className="hero-panel-titre">Cycle en V</p>
          <svg className="hero-panel-svg" viewBox="0 0 220 60" aria-hidden="true" focusable="false">
            <path className="v-path" d="M24 48 L110 12 L196 48" fill="none" stroke="var(--c-main)" strokeWidth="3" strokeLinecap="round" />
            <line x1="67" y1="30" x2="153" y2="30" className="hero-mirror" />
            <circle cx="67" cy="30" r="4.5" fill="var(--c-soft)" stroke="var(--c-ink)" />
            <circle cx="153" cy="30" r="4.5" fill="var(--c-calm)" stroke="var(--c-ink)" />
          </svg>
          <p className="hero-panel-legende">phases et tests en miroir</p>
        </div>
      </div>
      <p><Link className="btn" to="/module-1">Commencer par le module 1&nbsp;: cadrer et découper</Link></p>
    </section>
  );
}

export default function Accueil() {
  const p = useProgress();
  return (
    <div data-testid="page-accueil">
      <SeoHead title={'Gestion de Projet IT\u00A0: Méthodologies et Équipes'} description={'Cours interactif en 9 modules\u00A0: cadrage, WBS, PERT, GANTT, méthodes, agiles, outils CI, risques, communication, budget, changement. Labos manipulables, quiz corrigés, XP.'} />
      <Hero />
      {p.xp > 0 && (
        <div className="progression-accueil card" role="status">
          {p.xp}&nbsp;XP, niveau {p.niveau.nom}, {p.moduleDone.length}/{MODULES.length} modules terminés.
        </div>
      )}
      <h2>Les neuf modules</h2>
      <div className="modules-grid">
        {MODULES.map((m, i) => (
          <Reveal key={m.id} delay={i * 60}>
            <div className={`module-card module-theme-${m.num}`}>
              <div className="module-card-head">
                <ModulePicto num={m.num} />
                <span className="module-kicker">Module {m.num}</span>
              </div>
              <Link className="titre" to={`/${m.slug}`}>{m.titre}</Link>
              <p className="resume">{m.resume}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <h2>Le fil rouge du cours</h2>
      <p>Un seul cas fictif traverse les 9 modules&nbsp;: la refonte du site de l’association fictive <strong>Les Amis du Square</strong> (pages de présentation, agenda des activités, formulaire de contact fictif). Toutes les données restent fictives, stockées uniquement dans le navigateur.</p>
      <section className="capstone-cta card" aria-labelledby="capstone-cta-titre">
        <h2 id="capstone-cta-titre">Mettre les méthodes en pratique</h2>
        <p>
          Le dossier projet prolonge les neuf modules&nbsp;: six étapes pour cadrer, planifier, organiser la qualité, la gouvernance, les risques et le changement sur le cas fictif des Amis du Square.
        </p>
        <Link className="btn" to="/dossier-projet">Ouvrir le dossier projet</Link>
      </section>
      <section className="ia-accueil theme-ia" aria-labelledby="ia-accueil-titre">
        <h2 id="ia-accueil-titre">Gestion de projet et IA</h2>
        <p>
          Une section autonome pour situer l’IA dans le travail du chef de projet&nbsp;: usages par phase, méthodes, outils, configuration et gouvernance. Aucun XP, aucune obligation de parcours.
        </p>
        <p><Link className="btn" to="/ia">Ouvrir la section IA</Link></p>
        <div className="ia-carte">
          {IA_PAGES.slice(1).map((page) => (
            <div className="module-card" key={page.slug}>
              <span className="module-kicker">Section IA</span>
              <Link className="titre" to={page.path}>{page.titre}</Link>
              <p className="resume">{page.resume}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

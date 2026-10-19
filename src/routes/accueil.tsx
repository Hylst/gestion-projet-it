import { Link } from 'react-router-dom';
import { MODULES } from '../modules/index';
import { SeoHead } from '../components/SeoHead';
import Reveal from '../components/Reveal';
import { useProgress } from '../lib/progress';
import '../styles/hero.css';

function Hero() {
  return (
    <section className="hero reveal visible">
      <p className="kicker">Cours interactif gratuit, sans compte</p>
      <h1>Gérer un projet informatique, pas à pas</h1>
      <p className="accroche">Cadrer, découper, planifier, choisir sa méthode, outiller et animer l’équipe&nbsp;: 9 modules courts avec labos manipulables, exercices corrigés et quiz, sur un fil rouge fictif.</p>
      <svg className="hero-svg" viewBox="0 0 720 200" role="img" aria-label={'Trois vues du cours\u00A0: un GANTT qui avance, un Kanban qui se remplit et une courbe en V qui se dessine'}>
        {/* panneau 1 : GANTT animé */}
        <g aria-hidden="true" transform="translate(10,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">GANTT</text>
          <g className="gantt-bar"><rect x="10" y="34" width="90" height="12" rx="6" fill="var(--c-main)" /></g>
          <g className="gantt-bar2"><rect x="20" y="56" width="120" height="12" rx="6" fill="var(--c-calm)" /></g>
          <rect x="10" y="78" width="150" height="12" rx="6" fill="var(--c-soft)" stroke="var(--c-line)" />
          <circle cx="182" cy="40" r="6" fill="var(--c-main)" />
          <text x="12" y="108" fontSize="10" fill="var(--c-muted)">tâches, jalons, chaînes</text>
        </g>
        {/* panneau 2 : Kanban */}
        <g aria-hidden="true" transform="translate(250,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">Kanban</text>
          {['À faire', 'En cours', 'Fini'].map((c, i) => (
            <g key={c}>
              <rect x={12 + i * 70} y={30} width={60} height={74} rx="8" fill="var(--c-bg)" stroke="var(--c-line)" />
              <text x={16 + i * 70} y={24} fontSize="9" fill="var(--c-muted)">{c}</text>
            </g>
          ))}
          <g className="kan-1"><rect x="82" y="40" width="54" height="14" rx="7" fill="var(--c-main)" /></g>
          <g className="kan-2"><rect x="82" y="60" width="54" height="14" rx="7" fill="var(--c-calm)" /></g>
          <rect x="152" y="40" width="54" height="14" rx="7" fill="var(--c-soft)" stroke="var(--c-line)" />
          <text x="12" y="110" fontSize="10" fill="var(--c-muted)">limites de WIP</text>
        </g>
        {/* panneau 3 : cycle en V */}
        <g aria-hidden="true" transform="translate(490,10)">
          <rect x="0" y="0" width="220" height="120" rx="10" fill="var(--c-surface)" stroke="var(--c-line)" />
          <text x="12" y="20" fontSize="11" fill="var(--c-muted)">Cycle en V</text>
          <path className="v-path" d="M30 100 L70 40 L110 100 L150 40 L190 100" fill="none" stroke="var(--c-main)" strokeWidth="3" strokeLinecap="round" />
          <text x="12" y="112" fontSize="10" fill="var(--c-muted)">phases et tests en miroir</text>
        </g>
      </svg>
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
            <div className="module-card">
              <span className="num" aria-hidden="true">{m.num}</span>
              <Link className="titre" to={`/${m.slug}`}>{m.titre}</Link>
              <p className="resume">{m.resume}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <h2>Le fil rouge du cours</h2>
      <p>Un seul cas fictif traverse les 9 modules&nbsp;: la refonte du site de l’association fictive <strong>Les Amis du Square</strong> (pages de présentation, agenda des activités, formulaire de contact fictif). Toutes les données restent fictives, stockées uniquement dans le navigateur.</p>
    </div>
  );
}

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboKanban from '../../labos/LaboKanban';
import PokerPlanning from '../../labos/PokerPlanning';
import { useProgress } from '../../lib/progress';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercise';
import { quiz } from './quiz';
import { guide } from './guide';
import { items } from './ficheReflexe';

const Labo = () => {
  const p = useProgress();
  return (
    <>
      <section id="labo" aria-label={'Labo\u00A0: tableau Kanban jouable'}>
        <LaboKanban
          valide={p.laboDone.includes('m4-kanban')}
          onValide={() => p.dispatch({ type: 'labo', id: 'm4-kanban' })}
        />
      </section>
      <section id="labo-poker" aria-label={'Labo\u00A0: poker planning'}>
        <PokerPlanning
          valide={p.laboDone.includes('m4-poker')}
          onValide={() => p.dispatch({ type: 'labo', id: 'm4-poker' })}
        />
      </section>
    </>
  );
};

export const M4Page = () => (
  <ModuleLayout
    meta={{
      id: 'm4-agiles',
      num: 4,
      slug: 'module-4',
      titre: 'Agiles\u00A0: Scrum, Kanban, Lean, XP',
      resume: 'Backlog, rituels, limites de WIP, petits lots, qualité du code.',
      motsCles: ['scrum', 'kanban', 'wip', 'lean', 'xp', 'backlog', 'poker planning', 'user stories'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={4} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: travailler en agile'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M4Page;

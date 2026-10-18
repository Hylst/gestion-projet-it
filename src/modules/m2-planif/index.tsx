import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import LaboGanttPert from '../../labos/LaboGanttPert';
import { useProgress } from '../../lib/progress';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercise';
import { quiz } from './quiz';
import { items } from './ficheReflexe';

const Labo = () => {
  const p = useProgress();
  return (
    <section id="labo" aria-label="Labo : mini GANTT et chaine PERT">
      <LaboGanttPert
        valide={p.laboDone.includes('m2-gantt')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm2-gantt' })}
      />
    </section>
  );
};

export const M2Page = () => (
  <ModuleLayout
    meta={{
      id: 'm2-planif',
      num: 2,
      slug: 'module-2',
      titre: 'Planifier : PERT et GANTT',
      resume: 'Ordonner les taches, dependances, chaine tendue, barres et jalons sous les yeux.',
      motsCles: ['pert', 'gantt', 'planning', 'dependances', 'chaine tendue', 'jalons'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : planifier avec PERT et GANTT" items={items} /></Reveal>
  </ModuleLayout>
);

export default M2Page;

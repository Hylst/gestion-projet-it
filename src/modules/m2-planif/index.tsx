import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercise';
import { quiz } from './quiz';
import { items } from './ficheReflexe';

const Labo = () => (
  <section id="labo" aria-label="Labo : planification PERT et GANTT">
    <div className="labo card">
      <h2>Labo : planification PERT et GANTT</h2>
      <p>Le labo interactif est en preparation. Il permettra de deplacer des barres GANTT, de verifier les dependances et de relier les noeuds PERT au clavier.</p>
    </div>
  </section>
);

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

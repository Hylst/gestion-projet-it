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
  <section id="labo" aria-label="Labo : phases et comparateur de methodes">
    <h2>Labo</h2>
    <p>Labo en preparation : association des livrables aux phases et comparateur de methodes.</p>
  </section>
);

export const M3Page = () => (
  <ModuleLayout
    meta={{
      id: 'm3-methodes',
      num: 3,
      slug: 'module-3',
      titre: 'Cycle en V, cascade et choix de methode',
      resume: 'Phases, tests en miroir du V, cascade simple, comparateur sans dogme.',
      motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : choisir sa methode" items={items} /></Reveal>
  </ModuleLayout>
);

export default M3Page;

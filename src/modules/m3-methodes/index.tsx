import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import LaboPhases from '../../labos/LaboPhases';
import ComparateurMethodes from '../../labos/ComparateurMethodes';
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
    <section id="labo" aria-label={'Labo\u00A0: associer livrables et phases'}>
      <LaboPhases
        valide={p.laboDone.includes('m3-phases')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm3-phases' })}
      />
    </section>
  );
};

export const M3Page = () => (
  <ModuleLayout
    meta={{
      id: 'm3-methodes',
      num: 3,
      slug: 'module-3',
      titre: 'Cycle en V, cascade et choix de méthode',
      resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.',
      motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal>
      <section id="comparateur" aria-labelledby="comparateur-titre">
        <ComparateurMethodes />
      </section>
    </Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: choisir sa méthode'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M3Page;

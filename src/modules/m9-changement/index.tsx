import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboAdoption from '../../labos/LaboAdoption';
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
    <section id="labo" aria-label={'Labo\u00A0: plan d’adoption'}>
      <LaboAdoption
        valide={p.laboDone.includes('m9-adoption')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm9-adoption' })}
      />
    </section>
  );
};

export const M9Page = () => (
  <ModuleLayout
    meta={{
      id: 'm9-changement',
      num: 9,
      slug: 'module-9',
      titre: 'Conduite du changement',
      resume: 'Lire les freins, choisir des relais, former court et ajuster les messages.',
      motsCles: ['changement', 'adoption', 'freins', 'relais', 'formation'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={9} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: conduite du changement'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M9Page;

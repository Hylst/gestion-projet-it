import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboAlea from '../../labos/LaboAlea';
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
    <section id="labo" aria-label={'Labo\u00A0: provision d’aléa par lot'}>
      <LaboAlea
        valide={p.laboDone.includes('m8-alea')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm8-alea' })}
      />
    </section>
  );
};

export const M8Page = () => (
  <ModuleLayout
    meta={{
      id: 'm8-budget',
      num: 8,
      slug: 'module-8',
      titre: 'Budget et chiffrage',
      resume: 'Estimer par lots, poser des hypothèses, prévoir une marge d’aléa et suivre les écarts.',
      motsCles: ['budget', 'chiffrage', 'estimation', 'marge', 'alea', 'ecarts'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={8} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: budget et chiffrage'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M8Page;

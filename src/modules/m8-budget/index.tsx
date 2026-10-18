import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import LaboAlea from '../../labos/LaboAlea';
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
    <section id="labo" aria-label="Labo : provision d alea par lot">
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
      resume: 'Estimer par lots, poser des hypotheses, prevoir une marge d alea et suivre les ecarts.',
      motsCles: ['budget', 'chiffrage', 'estimation', 'marge', 'alea', 'ecarts'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : budget et chiffrage" items={items} /></Reveal>
  </ModuleLayout>
);

export default M8Page;

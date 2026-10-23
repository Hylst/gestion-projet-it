import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import LaboCommunication from '../../labos/LaboCommunication';
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
    <section id="labo" aria-label={'Labo\u00A0: plan de communication'}>
      <LaboCommunication
        valide={p.laboDone.includes('m7-communication')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm7-communication' })}
      />
    </section>
  );
};

export const M7Page = () => (
  <ModuleLayout
    meta={{
      id: 'm7-parties',
      num: 7,
      slug: 'module-7',
      titre: 'Parties prenantes et communication',
      resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.',
      motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: parties prenantes et communication'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M7Page;

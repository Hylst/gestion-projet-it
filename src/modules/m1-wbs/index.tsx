import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import LaboWbs from '../../labos/LaboWbs';
import { useProgress } from '../../lib/progress';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercice';
import { quiz } from './quiz';
import { items } from './ficheReflexe';

const Labo = () => {
  const p = useProgress();
  return (
    <section id="labo" aria-label="Labo : decoupage WBS interactif">
      <LaboWbs
        valide={p.laboDone.includes('m1-wbs-labo')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm1-wbs-labo' })}
      />
    </section>
  );
};

export const M1Page = () => (
  <ModuleLayout meta={{ titre: 'Cadrer et decouper (WBS)', resume: 'Besoin, perimetre dedans dehors, WBS en 3 lots, jalons, definition de fini.', num: 1, id: 'm1-wbs' }}>
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : cadrer et decouper" items={items} /></Reveal>
  </ModuleLayout>
);

export default M1Page;

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
  <section id="labo" aria-label="Labo : matrice d Eisenhower et matrice des risques">
    <p>Labo en preparation.</p>
  </section>
);

export const M6Page = () => (
  <ModuleLayout
    meta={{
      id: 'm6-equipe',
      num: 6,
      slug: 'module-6',
      titre: 'Equipe, risques (Eisenhower) et suivi',
      resume: 'Communication, tri urgent important, registre des risques, retro utile.',
      motsCles: ['eisenhower', 'risques', 'retro', 'communication', 'indicateurs'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : equipe, risques et suivi" items={items} /></Reveal>
  </ModuleLayout>
);

export default M6Page;

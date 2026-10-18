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
  <section id="labo" aria-label="Labo : selecteur d outil et chaine CI">
    <p>Labo en preparation.</p>
  </section>
);

export const M5Page = () => (
  <ModuleLayout
    meta={{
      id: 'm5-outils',
      num: 5,
      slug: 'module-5',
      titre: 'Outils : suivi, CI/CD et environnements',
      resume: 'Suivi partage, chaine CI, environnements reproductibles, sans tutoriel operatoire.',
      motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><FicheReflexe titre="Fiche reflexe : outiller sans dogme" items={items} /></Reveal>
  </ModuleLayout>
);

export default M5Page;

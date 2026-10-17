import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import Reveal from '../../components/Reveal';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercice';
import { quiz } from './quiz';
import { items } from './ficheReflexe';

const Labo = () => (
  <section id="labo" aria-labelledby="labo-t">
    <h2 id="labo-t">Labo : decoupage WBS interactif</h2>
    <p>Cet espace accueillera le laboratoire manipulable du module : repartir 8 taches fictives en 3 lots, avec controle des oublis.</p>
  </section>
);

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

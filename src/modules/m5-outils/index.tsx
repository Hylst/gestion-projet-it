// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboSelecteurOutil from '../../labos/LaboSelecteurOutil';
import LaboChaineCI from '../../labos/LaboChaineCI';
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
    <section id="labo" aria-label={'Labo\u00A0: sélecteur d’outil'}>
      <LaboSelecteurOutil
        valide={p.laboDone.includes('m5-selecteur')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm5-selecteur' })}
      />
    </section>
  );
};

const LaboChaine = () => {
  const p = useProgress();
  return (
    <section id="labo-chaine" aria-label={'Labo\u00A0: chaîne CI à ordonner'}>
      <LaboChaineCI
        valide={p.laboDone.includes('m5-chaine')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm5-chaine' })}
      />
    </section>
  );
};

export const M5Page = () => (
  <ModuleLayout
    meta={{
      id: 'm5-outils',
      num: 5,
      slug: 'module-5',
      titre: 'Outils\u00A0: suivi, CI/CD et environnements',
      resume: 'Suivi partagé, chaîne CI, environnements reproductibles, sans tutoriel opératoire.',
      motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'],
    }}
  >
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><LaboChaine /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={5} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: outiller sans dogme'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M5Page;

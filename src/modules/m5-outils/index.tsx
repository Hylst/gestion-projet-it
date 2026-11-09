// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleIntro } from '../../components/ModuleIntro';
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
import { moduleMetaByNum } from '../../modules/index';

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

const meta = moduleMetaByNum(5)!;
const sections = [
  { id: 'fiche', label: 'Fiche' },
  { id: 'fil-rouge', label: 'Fil rouge' },
  { id: 'demarche', label: 'Démarche' },
  { id: 'labo', label: 'Sélecteur d’outil' },
  { id: 'labo-chaine', label: 'Chaîne CI' },
  { id: 'exercice', label: 'Exercice corrigé' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'guide', label: 'Erreurs et décisions' },
  { id: 'reflexe', label: 'Fiche réflexe' },
];

export const M5Page = () => (
  <ModuleLayout meta={meta} sections={sections}>
    <Reveal><ModuleIntro meta={meta} /></Reveal>
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

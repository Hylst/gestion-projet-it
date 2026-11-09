// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleIntro } from '../../components/ModuleIntro';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboEisenhower from '../../labos/LaboEisenhower';
import LaboRisques from '../../labos/LaboRisques';
import { useProgress } from '../../lib/progress';
import Fiche from './fiche';
import { PreMortem } from './preMortem';
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
    <section id="labo" aria-label={'Labo\u00A0: matrice d’Eisenhower plaçable'}>
      <LaboEisenhower
        valide={p.laboDone.includes('m6-eisenhower')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm6-eisenhower' })}
      />
    </section>
  );
};

const LaboRisquesBloc = () => {
  const p = useProgress();
  return (
    <section id="labo-risques" aria-label={'Labo\u00A0: matrice des risques et parades'}>
      <LaboRisques
        valide={p.laboDone.includes('m6-risques')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm6-risques' })}
      />
    </section>
  );
};

const meta = moduleMetaByNum(6)!;
const sections = [
  { id: 'fiche', label: 'Fiche' },
  { id: 'fil-rouge', label: 'Fil rouge' },
  { id: 'demarche', label: 'Démarche' },
  { id: 'labo', label: 'Eisenhower' },
  { id: 'labo-risques', label: 'Risques' },
  { id: 'pre-mortem', label: 'Pré-mortem' },
  { id: 'exercice', label: 'Exercice corrigé' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'guide', label: 'Erreurs et décisions' },
  { id: 'reflexe', label: 'Fiche réflexe' },
];

export const M6Page = () => (
  <ModuleLayout meta={meta} sections={sections}>
    <Reveal><ModuleIntro meta={meta} /></Reveal>
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal><LaboRisquesBloc /></Reveal>
    <Reveal><PreMortem /></Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={6} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: équipe, risques et suivi'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M6Page;

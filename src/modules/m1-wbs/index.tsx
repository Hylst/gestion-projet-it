// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboWbs from '../../labos/LaboWbs';
import { useProgress } from '../../lib/progress';
import Fiche from './fiche';
import FilRouge from './filRouge';
import Demarche from './demarche';
import Exercices from './exercice';
import { quiz } from './quiz';
import { guide } from './guide';
import { items } from './ficheReflexe';
import { moduleMetaByNum } from '../../modules/index';

const Labo = () => {
  const p = useProgress();
  return (
    <section id="labo" aria-label={'Labo\u00A0: découpage WBS interactif'}>
      <LaboWbs
        valide={p.laboDone.includes('m1-wbs-labo')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm1-wbs-labo' })}
      />
    </section>
  );
};

const meta = moduleMetaByNum(1);

export const M1Page = () => {
  if (!meta) return null;
  return (
    <ModuleLayout meta={meta}>
      <Reveal><Fiche /></Reveal>
      <Reveal><FilRouge /></Reveal>
      <Reveal><Demarche /></Reveal>
      <Reveal><Labo /></Reveal>
      <Reveal><Exercices /></Reveal>
      <Reveal><QuizBlock data={quiz} /></Reveal>
      <Reveal><ModuleGuide data={guide} moduleNum={1} /></Reveal>
      <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: cadrer et découper'} items={items} /></Reveal>
    </ModuleLayout>
  );
};

export default M1Page;

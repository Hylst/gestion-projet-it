// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ModuleLayout } from '../../components/ModuleLayout';
import { QuizBlock } from '../../components/QuizBlock';
import { FicheReflexe } from '../../components/FicheReflexe';
import { ModuleIntro } from '../../components/ModuleIntro';
import { ModuleGuide } from '../../components/ModuleGuide';
import Reveal from '../../components/Reveal';
import LaboPhases from '../../labos/LaboPhases';
import ComparateurMethodes from '../../labos/ComparateurMethodes';
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
    <section id="labo" aria-label={'Labo\u00A0: associer livrables et phases'}>
      <LaboPhases
        valide={p.laboDone.includes('m3-phases')}
        onValide={() => p.dispatch({ type: 'labo', id: 'm3-phases' })}
      />
    </section>
  );
};

const meta = moduleMetaByNum(3)!;
const sections = [
  { id: 'fiche', label: 'Fiche' },
  { id: 'fil-rouge', label: 'Fil rouge' },
  { id: 'demarche', label: 'Démarche' },
  { id: 'labo', label: 'Labo' },
  { id: 'comparateur', label: 'Comparateur' },
  { id: 'exercice', label: 'Exercice corrigé' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'guide', label: 'Erreurs et décisions' },
  { id: 'reflexe', label: 'Fiche réflexe' },
];

export const M3Page = () => (
  <ModuleLayout meta={meta} sections={sections}>
    <Reveal><ModuleIntro meta={meta} /></Reveal>
    <Reveal><Fiche /></Reveal>
    <Reveal><FilRouge /></Reveal>
    <Reveal><Demarche /></Reveal>
    <Reveal><Labo /></Reveal>
    <Reveal>
      <section id="comparateur" aria-labelledby="comparateur-titre">
        <ComparateurMethodes />
      </section>
    </Reveal>
    <Reveal><Exercices /></Reveal>
    <Reveal><QuizBlock data={quiz} /></Reveal>
    <Reveal><ModuleGuide data={guide} moduleNum={3} /></Reveal>
    <Reveal><FicheReflexe titre={'Fiche réflexe\u00A0: choisir sa méthode'} items={items} /></Reveal>
  </ModuleLayout>
);

export default M3Page;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ModuleGuideData } from './guideTypes';
import { guide as m1 } from './m1-wbs/guide';
import { guide as m2 } from './m2-planif/guide';
import { guide as m3 } from './m3-methodes/guide';
import { guide as m4 } from './m4-agiles/guide';
import { guide as m5 } from './m5-outils/guide';
import { guide as m6 } from './m6-equipe/guide';
import { guide as m7 } from './m7-parties/guide';
import { guide as m8 } from './m8-budget/guide';
import { guide as m9 } from './m9-changement/guide';

export const GUIDES: Record<string, ModuleGuideData> = {
  'm1-wbs': m1,
  'm2-planif': m2,
  'm3-methodes': m3,
  'm4-agiles': m4,
  'm5-outils': m5,
  'm6-equipe': m6,
  'm7-parties': m7,
  'm8-budget': m8,
  'm9-changement': m9,
};

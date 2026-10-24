// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface GuideErreur {
  titre: string;
  consequence: string;
  correction: string;
}

export interface GuideOption {
  nom: string;
  quand: string;
  limite: string;
}

export interface GuideDecision {
  question: string;
  options: readonly GuideOption[];
  nonUsage: string;
}

export interface ModuleGuideData {
  erreurs: readonly GuideErreur[];
  decision: GuideDecision;
}

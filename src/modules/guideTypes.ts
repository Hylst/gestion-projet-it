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

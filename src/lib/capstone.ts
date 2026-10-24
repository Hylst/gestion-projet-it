// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export const CHAMPS_MAX = 600;

export type EtapeId =
  | 'cadrage'
  | 'planning'
  | 'qualite'
  | 'gouvernance'
  | 'risques'
  | 'changement';

export type ChampId =
  | 'cadrage-besoin'
  | 'cadrage-perimetre'
  | 'cadrage-lots'
  | 'cadrage-criteres'
  | 'planning-jalons'
  | 'planning-charges'
  | 'planning-alea'
  | 'planning-budget'
  | 'qualite-methode'
  | 'qualite-acceptation'
  | 'qualite-recette'
  | 'gouvernance-roles'
  | 'gouvernance-raci'
  | 'gouvernance-communication'
  | 'gouvernance-decisions'
  | 'risques-registre'
  | 'risques-indicateurs'
  | 'risques-rituels'
  | 'risques-verification'
  | 'changement-actions'
  | 'changement-relais'
  | 'changement-mesures'
  | 'changement-bilan';

export type LivrableId =
  | 'cadrage-note'
  | 'cadrage-wbs'
  | 'planning-plan'
  | 'planning-chiffrage'
  | 'qualite-decision'
  | 'qualite-plan-recette'
  | 'gouvernance-organisation'
  | 'gouvernance-plan-communication'
  | 'risques-tableau'
  | 'suivi-tableau'
  | 'changement-plan'
  | 'changement-bilan-note';

export type CritereId =
  | 'auto-coherence'
  | 'auto-tracabilite'
  | 'auto-realisme'
  | 'auto-qualite'
  | 'auto-gouvernance'
  | 'auto-changement';

export type NoteAutoEvaluation = 1 | 2 | 3 | 4;

export interface Champ { id: ChampId; label: string; aide: string }
export interface Livrable { id: LivrableId; label: string }
export interface Etape {
  id: EtapeId;
  titre: string;
  intro: string;
  champs: readonly Champ[];
  livrables: readonly Livrable[];
}
export interface Critere { id: CritereId; label: string }

export interface DossierProjetState {
  version: 1;
  reponses: Record<string, string>;
  livrables: Record<string, boolean>;
  autoEvaluation: Record<string, NoteAutoEvaluation>;
  etapeCourante: number;
  updatedAt: string;
}

export interface ProgressionDossier {
  etapes: number;
  livrables: number;
  criteres: number;
  complet: boolean;
}

export const ETAPES: readonly Etape[] = [
  {
    id: 'cadrage',
    titre: 'Cadrer et découper',
    intro: 'Reprends le besoin fictif des Amis du Square\u00A0: une page de présentation, un agenda et un formulaire de contact. Commence par délimiter ce que le projet fait et ne fait pas.',
    champs: [
      { id: 'cadrage-besoin', label: 'Besoin', aide: 'En une ou deux phrases, le problème à résoudre pour l’association.' },
      { id: 'cadrage-perimetre', label: 'Périmètre inclus et exclu', aide: 'Ce que le projet livre, ce qu’il laisse de côté.' },
      { id: 'cadrage-lots', label: 'Trois lots de travail', aide: 'Découpe le projet en trois lots livrables et nomme-les.' },
      { id: 'cadrage-criteres', label: 'Critères de réussite', aide: 'Trois signes observables qui montreront que le projet est réussi.' },
    ],
    livrables: [
      { id: 'cadrage-note', label: 'Note de cadrage' },
      { id: 'cadrage-wbs', label: 'WBS en trois lots' },
    ],
  },
  {
    id: 'planning',
    titre: 'Planifier et chiffrer',
    intro: 'Le besoin est cadré. Pose maintenant des jalons fictifs, des charges et une marge, puis vérifie que le budget tient debout.',
    champs: [
      { id: 'planning-jalons', label: 'Jalons et dépendances', aide: 'Trois ou quatre jalons datés, avec les dépendances qui conditionnent leur tenue.' },
      { id: 'planning-charges', label: 'Charges fictives', aide: 'Estime la charge par lot en jours, avec une hypothèse simple et assumée.' },
      { id: 'planning-alea', label: 'Marge d’aléa', aide: 'Ajoute une provision explicite pour les inconnues reconnues du chiffrage.' },
      { id: 'planning-budget', label: 'Budget fictif', aide: 'Totalise charges, marge et coûts fictifs, puis compare au budget disponible.' },
    ],
    livrables: [
      { id: 'planning-plan', label: 'Planning et jalons' },
      { id: 'planning-chiffrage', label: 'Chiffrage et marge' },
    ],
  },
  {
    id: 'qualite',
    titre: 'Choisir la méthode et la qualité',
    intro: 'Choisis une méthode sans dogme, puis rends la qualité vérifiable\u00A0: critères d’acceptation et recette.',
    champs: [
      { id: 'qualite-methode', label: 'Méthode retenue et motif', aide: 'Nomme l’approche choisie et le motif lié au contexte, sans prétendre qu’elle vaut partout.' },
      { id: 'qualite-acceptation', label: 'Critères d’acceptation', aide: 'Écris des conditions observables et testables pour accepter chaque livrable.' },
      { id: 'qualite-recette', label: 'Recette et non-régression', aide: 'Précise qui recette, sur quoi, et ce qui est rejoué pour éviter de casser l’existant.' },
    ],
    livrables: [
      { id: 'qualite-decision', label: 'Décision de méthode' },
      { id: 'qualite-plan-recette', label: 'Plan de recette' },
    ],
  },
  {
    id: 'gouvernance',
    titre: 'Organiser l’équipe et la gouvernance',
    intro: 'Le projet tient aussi à ses rôles et à ses instances. Rends les décisions traçables et la communication prévisible.',
    champs: [
      { id: 'gouvernance-roles', label: 'Rôles', aide: 'Qui porte le projet, qui décide, qui réalise, qui est consulté\u00A0?' },
      { id: 'gouvernance-raci', label: 'RACI simplifié', aide: 'Pour trois activités clés, indique qui réalise, rend compte, est consulté et informé.' },
      { id: 'gouvernance-communication', label: 'Plan de communication', aide: 'Quel message, à qui, quand et par quel canal\u00A0?' },
      { id: 'gouvernance-decisions', label: 'Journal de décisions', aide: 'Note une décision, son motif, son responsable et sa suite.' },
    ],
    livrables: [
      { id: 'gouvernance-organisation', label: 'Rôles et RACI' },
      { id: 'gouvernance-plan-communication', label: 'Plan de communication' },
    ],
  },
  {
    id: 'risques',
    titre: 'Gérer les risques et le suivi',
    intro: 'Un dossier solide regarde aussi ce qui peut mal tourner. Tiens un registre court et des indicateurs utiles.',
    champs: [
      { id: 'risques-registre', label: 'Trois risques et parades', aide: 'Pour chaque risque\u00A0: cause, effet probable et parade proportionnée.' },
      { id: 'risques-indicateurs', label: 'Indicateurs de suivi', aide: 'Deux ou trois mesures simples qui signalent tôt une dérive.' },
      { id: 'risques-rituels', label: 'Rituels et outils', aide: 'Quels points réguliers et quels outils gardent le suivi vivant\u00A0?' },
      { id: 'risques-verification', label: 'Chaîne de vérification', aide: 'Décris qui vérifie quoi, avant quelle échéance, et comment c’est tracé.' },
    ],
    livrables: [
      { id: 'risques-tableau', label: 'Registre des risques' },
      { id: 'suivi-tableau', label: 'Tableau de suivi' },
    ],
  },
  {
    id: 'changement',
    titre: 'Conduire le changement et conclure',
    intro: 'Reste l’adoption. Prépare les gestes qui aideront les personnes à utiliser le livrable, puis conclus le dossier.',
    champs: [
      { id: 'changement-actions', label: 'Actions d’adoption', aide: 'Trois actions concrètes pour faciliter l’usage, au-delà de l’annonce.' },
      { id: 'changement-relais', label: 'Relais et formation', aide: 'Qui relaie sur le terrain et quelle formation courte est prévue\u00A0?' },
      { id: 'changement-mesures', label: 'Mesures de retour', aide: 'Comment sauras-tu que le changement est réellement adopté\u00A0?' },
      { id: 'changement-bilan', label: 'Bilan', aide: 'Ce qui a marché, ce qui reste à ajuster, et ce que tu ferais autrement.' },
    ],
    livrables: [
      { id: 'changement-plan', label: 'Plan de changement' },
      { id: 'changement-bilan-note', label: 'Note de bilan' },
    ],
  },
];

export const CRITERES: readonly Critere[] = [
  { id: 'auto-coherence', label: 'Cohérence avec le besoin' },
  { id: 'auto-tracabilite', label: 'Traçabilité des décisions' },
  { id: 'auto-realisme', label: 'Réalisme du planning et du budget' },
  { id: 'auto-qualite', label: 'Qualité et recette' },
  { id: 'auto-gouvernance', label: 'Rôles et gouvernance' },
  { id: 'auto-changement', label: 'Adoption et bilan' },
];

const CHAMP_IDS = new Set<ChampId>(ETAPES.flatMap((e) => e.champs.map((c) => c.id)));
const LIVRABLE_IDS = new Set<LivrableId>(ETAPES.flatMap((e) => e.livrables.map((l) => l.id)));
const CRITERE_IDS = new Set<CritereId>(CRITERES.map((c) => c.id));

const estObjet = (valeur: unknown): valeur is Record<string, unknown> =>
  typeof valeur === 'object' && valeur !== null && !Array.isArray(valeur);

export function etatInitialDossier(): DossierProjetState {
  return {
    version: 1,
    reponses: {},
    livrables: {},
    autoEvaluation: {},
    etapeCourante: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function validerDossier(valeur: unknown): DossierProjetState {
  const initial = etatInitialDossier();
  if (!estObjet(valeur) || valeur.version !== 1) return initial;

  const reponses: Record<string, string> = {};
  if (estObjet(valeur.reponses)) {
    for (const [cle, contenu] of Object.entries(valeur.reponses)) {
      if (CHAMP_IDS.has(cle as ChampId) && typeof contenu === 'string') {
        reponses[cle] = contenu.slice(0, CHAMPS_MAX);
      }
    }
  }

  const livrables: Record<string, boolean> = {};
  if (estObjet(valeur.livrables)) {
    for (const [cle, contenu] of Object.entries(valeur.livrables)) {
      if (LIVRABLE_IDS.has(cle as LivrableId) && typeof contenu === 'boolean') {
        livrables[cle] = contenu;
      }
    }
  }

  const autoEvaluation: Record<string, NoteAutoEvaluation> = {};
  if (estObjet(valeur.autoEvaluation)) {
    for (const [cle, contenu] of Object.entries(valeur.autoEvaluation)) {
      if (CRITERE_IDS.has(cle as CritereId) && (contenu === 1 || contenu === 2 || contenu === 3 || contenu === 4)) {
        autoEvaluation[cle] = contenu;
      }
    }
  }

  const etapeCourante =
    typeof valeur.etapeCourante === 'number' &&
    Number.isInteger(valeur.etapeCourante) &&
    valeur.etapeCourante >= 0 &&
    valeur.etapeCourante < ETAPES.length
      ? valeur.etapeCourante
      : 0;

  const updatedAt =
    typeof valeur.updatedAt === 'string' && !Number.isNaN(Date.parse(valeur.updatedAt))
      ? valeur.updatedAt
      : initial.updatedAt;

  return { version: 1, reponses, livrables, autoEvaluation, etapeCourante, updatedAt };
}

export function estEtapeComplete(etat: DossierProjetState, etapeId: EtapeId): boolean {
  const etape = ETAPES.find((e) => e.id === etapeId);
  if (!etape) return false;
  const champsRemplis = etape.champs.every((c) => (etat.reponses[c.id] ?? '').trim().length > 0);
  const livrablesCoches = etape.livrables.every((l) => etat.livrables[l.id] === true);
  return champsRemplis && livrablesCoches;
}

export function estDossierComplet(etat: DossierProjetState): boolean {
  return (
    ETAPES.every((etape) => estEtapeComplete(etat, etape.id)) &&
    CRITERES.every((critere) => etat.autoEvaluation[critere.id] !== undefined)
  );
}

export function progressionDossier(etat: DossierProjetState): ProgressionDossier {
  const etapes = ETAPES.filter((etape) => estEtapeComplete(etat, etape.id)).length;
  const livrables = ETAPES.flatMap((etape) => etape.livrables)
    .filter((l) => etat.livrables[l.id] === true).length;
  const criteres = CRITERES.filter((critere) => etat.autoEvaluation[critere.id] !== undefined).length;
  return {
    etapes,
    livrables,
    criteres,
    complet: etapes === ETAPES.length && livrables === 12 && criteres === CRITERES.length,
  };
}

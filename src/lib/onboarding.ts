// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { readJSON, writeJSON } from './storage';

export const ONBOARDING_KEY = 'gestion-projet-it:onboarding:v1';

export type OnboardingIcone = 'parcours' | 'atelier' | 'dossier' | 'sections' | 'donnees';

export interface OnboardingSlide {
  id: string;
  titre: string;
  texte: string;
  points: readonly string[];
  icone: OnboardingIcone;
}

interface OnboardingFlag {
  version: 1;
  vu: boolean;
}

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  {
    id: 'bienvenue',
    titre: 'Bienvenue dans le cours',
    texte:
      'Gestion de Projet IT est un cours interactif pour cadrer, planifier et conduire un projet informatique, sans compte et sans installation.',
    points: [
      'Neuf modules courts, du cadrage à la conduite du changement.',
      'Des laboratoires manipulables, des quiz corrigés et un dossier projet.',
      'Tout se passe dans votre navigateur.',
    ],
    icone: 'parcours',
  },
  {
    id: 'modules',
    titre: 'Neuf modules, à votre rythme',
    texte:
      'Chaque module part d’un besoin concret et se termine par un quiz et un laboratoire. Vous avancez dans l’ordre que vous voulez.',
    points: [
      'Les laboratoires se refont autant de fois que nécessaire.',
      'Les quiz et les laboratoires rapportent de l’XP, une seule fois.',
      'Le compteur 0/9 suit les modules terminés, sans obligation.',
    ],
    icone: 'atelier',
  },
  {
    id: 'dossier',
    titre: 'Un dossier projet pour pratiquer',
    texte:
      'Le fil rouge fictif des Amis du Square traverse les modules. Le dossier projet le transforme en six étapes concrètes.',
    points: [
      'Cadrer, planifier, organiser la qualité, la gouvernance, les risques et le changement.',
      'Chaque étape garde vos réponses dans le navigateur.',
      'Le dossier s’exporte et s’imprime pour travailler hors ligne.',
    ],
    icone: 'dossier',
  },
  {
    id: 'sections',
    titre: 'Deux parcours en complément',
    texte:
      'La section IA et le parcours Cybersécurité complètent le cours sans ajouter de module noté.',
    points: [
      'IA\u00A0: usages, méthodes, outils, configuration et gouvernance.',
      'Cybersécurité\u00A0: menaces, accès, dépendances, données et incident.',
      'Les deux parcours sont autonomes, sans XP.',
    ],
    icone: 'sections',
  },
  {
    id: 'donnees',
    titre: 'Vos données restent locales',
    texte:
      'Aucun compte, aucun cookie, aucune requête vers un service tiers. La progression est stockée dans votre navigateur.',
    points: [
      'Vous pouvez exporter et réimporter votre progression en JSON.',
      'L’effacement se fait en supprimant les données du site dans le navigateur.',
      'Cette présentation ne s’affichera plus automatiquement.',
    ],
    icone: 'donnees',
  },
];

export function aDejaVuOnboarding(): boolean {
  const drapeau = readJSON<Partial<OnboardingFlag> | null>(ONBOARDING_KEY, null);
  return drapeau?.version === 1 && drapeau.vu === true;
}

export function marquerOnboardingVu(): void {
  const drapeau: OnboardingFlag = { version: 1, vu: true };
  writeJSON(ONBOARDING_KEY, drapeau);
}

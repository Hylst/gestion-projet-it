// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Ressource {
  organisme: string;
  titre: string;
  url: string;
  version: string;
  usage: string;
  limite: string;
  verifieLe: string;
}

export interface GroupeRessources {
  id: string;
  titre: string;
  moduleNum?: number;
  ressources: readonly Ressource[];
}

const verifieLe = '24 octobre 2026';

export const RESSOURCES_MODULES: readonly GroupeRessources[] = [
  {
    id: 'module-1',
    titre: 'Module 1\u00A0: Cadrer et découper (WBS)',
    moduleNum: 1,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Scope management',
        url: 'https://www.apm.org.uk/resources/find-a-resource/scope-management/',
        version: 'Fiche en ligne',
        usage: 'Situer le périmètre, les livrables et les exclusions.',
        limite: 'Cadre général, sans modèle de WBS détaillé.',
        verifieLe,
      },
      {
        organisme: 'APM',
        titre: 'Governance',
        url: 'https://www.apm.org.uk/resources/find-a-resource/governance/',
        version: 'Fiche en ligne',
        usage: 'Relier le périmètre aux décisions et aux instances.',
        limite: 'Ne détaille pas le découpage en lots.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-2',
    titre: 'Module 2\u00A0: Planifier, PERT et GANTT',
    moduleNum: 2,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Planning',
        url: 'https://www.apm.org.uk/resources/find-a-resource/planning/',
        version: 'Fiche en ligne',
        usage: 'Relier tâches, dépendances, jalons et suivi.',
        limite: 'Pas de tutoriel PERT ni GANTT.',
        verifieLe,
      },
      {
        organisme: 'GOV.UK Service Manual',
        titre: 'Agile delivery',
        url: 'https://www.gov.uk/service-manual/agile-delivery',
        version: 'Édition en ligne',
        usage: 'Planifier par tranches et revoir le périmètre.',
        limite: 'Contexte de service public britannique.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-3',
    titre: 'Module 3\u00A0: Cycle en V, cascade et choix de méthode',
    moduleNum: 3,
    ressources: [
      {
        organisme: 'ISTQB',
        titre: 'Glossary',
        url: 'https://glossary.istqb.org/',
        version: 'Version en ligne',
        usage: 'Définir recette, vérification et niveaux de test.',
        limite: 'Vocabulaire de test, pas de choix de méthode.',
        verifieLe,
      },
      {
        organisme: 'W3C WAI',
        titre: 'WCAG 2.2',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
        version: 'WCAG 2.2',
        usage: 'Relier qualité et accessibilité aux critères de recette.',
        limite: 'Ne remplace pas un audit d’accessibilité.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-4',
    titre: 'Module 4\u00A0: Agiles, Scrum, Kanban, Lean, XP',
    moduleNum: 4,
    ressources: [
      {
        organisme: 'Scrum Guides',
        titre: 'The Scrum Guide',
        url: 'https://scrumguides.org/scrum-guide.html',
        version: 'Édition 2020',
        usage: 'Comprendre rôles, événements et artefacts.',
        limite: 'Ne couvre ni Kanban ni XP.',
        verifieLe,
      },
      {
        organisme: 'Kanban University',
        titre: 'The Kanban Guide',
        url: 'https://kanban.university/kanban-guide/',
        version: 'Version en ligne',
        usage: 'Comprendre flux, WIP et mesures.',
        limite: 'Guide court, sans plan de déploiement.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-5',
    titre: 'Module 5\u00A0: Outils, suivi, CI/CD et environnements',
    moduleNum: 5,
    ressources: [
      {
        organisme: 'GitHub',
        titre: 'GitHub Actions documentation',
        url: 'https://docs.github.com/en/actions',
        version: 'Documentation en ligne',
        usage: 'Comprendre les étapes d’une chaîne CI.',
        limite: 'Spécifique à GitHub Actions.',
        verifieLe,
      },
      {
        organisme: 'Docker',
        titre: 'Docker overview',
        url: 'https://docs.docker.com/get-started/overview/',
        version: 'Documentation en ligne',
        usage: 'Comprendre images, conteneurs et environnements.',
        limite: 'Ne traite pas la gestion des secrets.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-6',
    titre: 'Module 6\u00A0: Équipe, risques et suivi',
    moduleNum: 6,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Risk management',
        url: 'https://www.apm.org.uk/resources/find-a-resource/risk-management/',
        version: 'Fiche en ligne',
        usage: 'Comprendre le vocabulaire et le processus de gestion des risques.',
        limite: 'Pas de registre prêt à l’emploi.',
        verifieLe,
      },
      {
        organisme: 'GOV.UK',
        titre: 'Orange Book',
        url: 'https://www.gov.uk/government/publications/orange-book',
        version: 'Édition en ligne',
        usage: 'Situer un cadre public de gestion des risques.',
        limite: 'Contexte britannique, sans conseil juridique.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-7',
    titre: 'Module 7\u00A0: Parties prenantes et communication',
    moduleNum: 7,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Stakeholder management',
        url: 'https://www.apm.org.uk/resources/find-a-resource/stakeholder-management/',
        version: 'Fiche en ligne',
        usage: 'Cartographier et engager les parties prenantes.',
        limite: 'Pas de matrice RACI détaillée.',
        verifieLe,
      },
      {
        organisme: 'APM',
        titre: 'Communication',
        url: 'https://www.apm.org.uk/resources/find-a-resource/communication/',
        version: 'Fiche en ligne',
        usage: 'Construire un plan de communication court.',
        limite: 'Pas de rituel clé en main.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-8',
    titre: 'Module 8\u00A0: Budget et chiffrage',
    moduleNum: 8,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Budgeting and cost management',
        url: 'https://www.apm.org.uk/resources/find-a-resource/budgeting-and-cost-management/',
        version: 'Fiche en ligne',
        usage: 'Poser hypothèses, fourchettes et suivi.',
        limite: 'Pas de taux ni de formule de calcul.',
        verifieLe,
      },
      {
        organisme: 'GOV.UK',
        titre: 'The Green Book',
        url: 'https://www.gov.uk/government/publications/the-green-book-appraisal-and-evaluation-in-central-government',
        version: 'Édition en ligne',
        usage: 'Apprécier coûts et bénéfices d’une option.',
        limite: 'Contexte public britannique, pas un chiffrage informatique.',
        verifieLe,
      },
    ],
  },
  {
    id: 'module-9',
    titre: 'Module 9\u00A0: Conduite du changement',
    moduleNum: 9,
    ressources: [
      {
        organisme: 'APM',
        titre: 'Change management',
        url: 'https://www.apm.org.uk/resources/find-a-resource/change-management/',
        version: 'Fiche en ligne',
        usage: 'Relier changement, adoption et parties prenantes.',
        limite: 'Pas de plan de formation détaillé.',
        verifieLe,
      },
      {
        organisme: 'ANACT',
        titre: 'Site de l’ANACT',
        url: 'https://www.anact.fr/',
        version: 'Site en ligne',
        usage: 'Comprendre les facteurs humains et organisationnels.',
        limite: 'Ressource généraliste, sans méthode de projet.',
        verifieLe,
      },
    ],
  },
];

export const RESSOURCES_PARCOURS: readonly GroupeRessources[] = [
  {
    id: 'parcours-produit',
    titre: 'Parcours Produit',
    ressources: [
      {
        organisme: 'GOV.UK Service Manual',
        titre: 'Discovery phase',
        url: 'https://www.gov.uk/service-manual/agile-delivery/how-the-discovery-phase-works',
        version: 'Édition en ligne',
        usage: 'Cadrer le problème et les usagers avant de construire.',
        limite: 'Contexte de service public britannique.',
        verifieLe,
      },
      {
        organisme: 'GOV.UK Service Manual',
        titre: 'User research',
        url: 'https://www.gov.uk/service-manual/user-research',
        version: 'Édition en ligne',
        usage: 'Préparer entretiens, besoins et synthèse.',
        limite: 'Pas de guide d’entretien prêt à l’emploi.',
        verifieLe,
      },
      {
        organisme: 'GOV.UK Service Manual',
        titre: 'Measuring success',
        url: 'https://www.gov.uk/service-manual/measuring-success',
        version: 'Édition en ligne',
        usage: 'Choisir indicateurs, mesures et apprentissage.',
        limite: 'Pas de tableau de bord prêt.',
        verifieLe,
      },
    ],
  },
  {
    id: 'parcours-cybersecurite',
    titre: 'Parcours Cybersécurité',
    ressources: [
      {
        organisme: 'ANSSI',
        titre: 'Cyber.gouv.fr',
        url: 'https://cyber.gouv.fr/',
        version: 'Site en ligne',
        usage: 'Trouver les guides d’hygiène et de réponse à incident.',
        limite: 'Pas de diagnostic d’infrastructure.',
        verifieLe,
      },
      {
        organisme: 'CNIL',
        titre: 'RGPD',
        url: 'https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on',
        version: 'Version en ligne',
        usage: 'Comprendre les principes de données personnelles.',
        limite: 'Pas de conseil juridique personnalisé.',
        verifieLe,
      },
      {
        organisme: 'OWASP',
        titre: 'Top 10',
        url: 'https://owasp.org/www-project-top-ten/',
        version: 'Édition 2021',
        usage: 'Identifier les risques web courants.',
        limite: 'Liste de sensibilisation, pas un audit complet.',
        verifieLe,
      },
    ],
  },
];

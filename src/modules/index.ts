export interface ModuleMeta { id: string; num: number; slug: string; titre: string; resume: string; motsCles: string[]; avenir?: boolean }
export const MODULES: ModuleMeta[] = [
  { id: 'm1-wbs', num: 1, slug: 'module-1', titre: 'Cadrer et découper (WBS)', resume: 'Besoin, périmètre dedans dehors, WBS en 3 lots, jalons, définition de fini.', motsCles: ['wbs', 'cadrage', 'perimetre', 'lots', 'jalons', 'decoupage'] },
  { id: 'm2-planif', num: 2, slug: 'module-2', titre: 'Planifier\u00A0: PERT et GANTT', resume: 'Ordonner les tâches, dépendances, chaîne tendue, barres et jalons sous les yeux.', motsCles: ['pert', 'gantt', 'planning', 'dependances', 'chaine tendue', 'jalons'] },
  { id: 'm3-methodes', num: 3, slug: 'module-3', titre: 'Cycle en V, cascade et choix de méthode', resume: 'Phases, tests en miroir du V, cascade simple, critères d’acceptation, recette, comparateur sans dogme.', motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases', 'qualite', 'recette', 'acceptation', 'non regression'] },
  { id: 'm4-agiles', num: 4, slug: 'module-4', titre: 'Agiles\u00A0: Scrum, Kanban, Lean, XP', resume: 'Backlog, rituels, limites de WIP, petits lots, qualité du code.', motsCles: ['scrum', 'kanban', 'wip', 'lean', 'xp', 'backlog', 'poker planning', 'user stories'] },
  { id: 'm5-outils', num: 5, slug: 'module-5', titre: 'Outils\u00A0: suivi, CI/CD et environnements', resume: 'Suivi partagé, chaîne CI, environnements reproductibles, sans tutoriel opératoire.', motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'] },
  { id: 'm6-equipe', num: 6, slug: 'module-6', titre: 'Équipe, risques (Eisenhower) et suivi', resume: 'Communication, tri urgent important, registre des risques, rétro utile.', motsCles: ['eisenhower', 'risques', 'retro', 'communication', 'indicateurs'] },
  { id: 'm7-parties', num: 7, slug: 'module-7', titre: 'Parties prenantes et communication', resume: 'Cartographier, clarifier les rôles et les décisions, choisir les canaux, animer un rituel court et ajuster après les retours.', motsCles: ['parties prenantes', 'communication', 'cartographie', 'canaux', 'rituels', 'raci', 'gouvernance', 'decisions', 'escalade'] },
  { id: 'm8-budget', num: 8, slug: 'module-8', titre: 'Budget et chiffrage', resume: 'Estimer par lots, poser des hypothèses, prévoir une marge d’aléa et suivre les écarts.', motsCles: ['budget', 'chiffrage', 'estimation', 'marge', 'alea', 'ecarts'] },
  { id: 'm9-changement', num: 9, slug: 'module-9', titre: 'Conduite du changement', resume: 'Lire les freins, choisir des relais, former court et ajuster les messages.', motsCles: ['changement', 'adoption', 'freins', 'relais', 'formation'] },
];
export function moduleMetaByNum(num: number): ModuleMeta | undefined {
  return MODULES.find((m) => m.num === num);
}

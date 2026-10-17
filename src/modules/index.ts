export interface ModuleMeta { id: string; num: number; slug: string; titre: string; resume: string; motsCles: string[]; avenir?: boolean }
export const MODULES: ModuleMeta[] = [
  { id: 'm1-wbs', num: 1, slug: 'module-1', titre: 'Cadrer et decouper (WBS)', resume: 'Besoin, perimetre dedans dehors, WBS en 3 lots, jalons, definition de fini.', motsCles: ['wbs', 'cadrage', 'perimetre', 'lots', 'jalons', 'decoupage'] },
  { id: 'm2-planif', num: 2, slug: 'module-2', titre: 'Planifier : PERT et GANTT', resume: 'Ordonner les taches, dependances, chaine tendue, barres et jalons sous les yeux.', motsCles: ['pert', 'gantt', 'planning', 'dependances', 'chaine tendue', 'jalons'] },
  { id: 'm3-methodes', num: 3, slug: 'module-3', titre: 'Cycle en V, cascade et choix de methode', resume: 'Phases, tests en miroir du V, cascade simple, comparateur sans dogme.', motsCles: ['cycle en v', 'waterfall', 'cascade', 'methodes', 'comparateur', 'phases'] },
  { id: 'm4-agiles', num: 4, slug: 'module-4', titre: 'Agiles : Scrum, Kanban, Lean, XP', resume: 'Backlog, rituels, limites de WIP, petits lots, qualite du code.', motsCles: ['scrum', 'kanban', 'wip', 'lean', 'xp', 'backlog', 'poker planning', 'user stories'] },
  { id: 'm5-outils', num: 5, slug: 'module-5', titre: 'Outils : suivi, CI/CD et environnements', resume: 'Suivi partage, chaine CI, environnements reproductibles, sans tutoriel operatoire.', motsCles: ['suivi', 'ci', 'cd', 'docker', 'jira', 'github projects', 'environnement'] },
  { id: 'm6-equipe', num: 6, slug: 'module-6', titre: 'Equipe, risques (Eisenhower) et suivi', resume: 'Communication, tri urgent important, registre des risques, retro utile.', motsCles: ['eisenhower', 'risques', 'retro', 'communication', 'indicateurs'] },
];
export const FUTURE_MODULES: ModuleMeta[] = [
  { id: 'futur-A', num: 7, slug: '', titre: 'Parties prenantes et communication', resume: 'Roles fictifs, plan de messages, rituel de point.', motsCles: ['parties prenantes'], avenir: true },
  { id: 'futur-B', num: 8, slug: '', titre: 'Budget et chiffrage', resume: 'Lots valorises, hypotheses, marge d alea fictive.', motsCles: ['budget'], avenir: true },
  { id: 'futur-C', num: 9, slug: '', titre: 'Conduite du changement', resume: 'Freins, messages, formation courte, relais.', motsCles: ['changement'], avenir: true },
];
export function moduleMetaByNum(num: number): ModuleMeta | undefined {
  return MODULES.find((m) => m.num === num);
}

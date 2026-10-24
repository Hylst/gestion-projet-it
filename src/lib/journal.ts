export const JOURNAL_STORAGE_KEY = 'gestion-projet-it:journal:v1';

export interface JournalEntree {
  id: string;
  titre: string;
  question: string;
}

export interface JournalValeur {
  decision: string;
  suite: string;
}

export type JournalEtat = Record<string, JournalValeur>;

export const ENTREES_JOURNAL: readonly JournalEntree[] = [
  { id: 'm1', titre: 'M1 Cadrer et découper', question: 'Quel besoin et quel hors périmètre as-tu écrit ?' },
  { id: 'm2', titre: 'M2 Planifier', question: 'Quelle dépendance ou quel jalon as-tu clarifié ?' },
  { id: 'm3', titre: 'M3 Choisir une méthode', question: 'Quel critère d’acceptation as-tu rendu testable ?' },
  { id: 'm4', titre: 'M4 Travailler en agile', question: 'Quelle limite de WIP ou quel petit lot as-tu tenu ?' },
  { id: 'm5', titre: 'M5 Outiller', question: 'Quel outil ou quelle chaîne as-tu décidé d’entretenir ?' },
  { id: 'm6', titre: 'M6 Gérer l’équipe et les risques', question: 'Quel risque a désormais un propriétaire et un déclencheur ?' },
  { id: 'm7', titre: 'M7 Communiquer', question: 'Quelle décision a un A unique et une suite ?' },
  { id: 'm8', titre: 'M8 Chiffrer', question: 'Quelle hypothèse ou quelle fourchette as-tu écrite ?' },
  { id: 'm9', titre: 'M9 Conduire le changement', question: 'Quel signe d’adoption as-tu observé ?' },
  { id: 'dossier', titre: 'Dossier projet', question: 'Quelle décision du dossier projet as-tu prise ?' },
];

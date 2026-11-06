// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface CyberPageSection {
  id: string;
  label: string;
}

export interface CyberPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
  sections: readonly CyberPageSection[];
  motsCles?: readonly string[];
}

export const CYBER_PAGES: readonly CyberPageMeta[] = [
  {
    slug: 'cybersecurite',
    path: '/cybersecurite',
    titre: 'Cybersécurité et gestion de projet',
    titreCourt: 'Introduction',
    description: 'Cybersécurité et gestion de projet\u00A0: menaces, accès, dépendances, données et incidents, avec des repères défensifs pour étudiants et juniors.',
    resume: 'Un parcours pour traiter la sécurité comme une qualité du projet, sans dogme ni promesse de sécurité totale.',
    sections: [
      { id: 'pourquoi', label: 'Pourquoi la sécurité entre dans le projet' },
      { id: 'pas-un-produit', label: 'Ce que la sécurité n’est pas' },
      { id: 'cinq-questions', label: 'Cinq questions avant de traiter un risque' },
      { id: 'carte', label: 'Carte du parcours' },
      { id: 'humain', label: 'Ce qui reste humain' },
      { id: 'suite', label: 'La suite du parcours' },
    ],
    motsCles: ['cybersecurite', 'securite', 'risque', 'hygiene numerique', 'projet'],
  },
  {
    slug: 'cybersecurite/menaces',
    path: '/cybersecurite/menaces',
    titre: 'Menaces et modèle de menace',
    titreCourt: 'Menaces',
    description: 'Menaces et modèle de menace\u00A0: actifs, attaquants, chemins d’attaque, surface et parades proportionnées pour un projet informatique.',
    resume: 'Identifier ce qui compte, contre quoi le protéger et par où un incident peut arriver.',
    sections: [
      { id: 'actifs', label: 'Actifs et valeur' },
      { id: 'menaces', label: 'Menaces plausibles' },
      { id: 'modele', label: 'Construire un modèle de menace' },
      { id: 'surface', label: 'Surface d’attaque' },
      { id: 'proportionner', label: 'Proportionner les parades' },
      { id: 'verifier', label: 'Vérifier et mettre à jour' },
    ],
    motsCles: ['menace', 'modele de menace', 'actif', 'surface attaque', 'phishing', 'ransomware'],
  },
  {
    slug: 'cybersecurite/acces',
    path: '/cybersecurite/acces',
    titre: 'Accès, rôles et secrets',
    titreCourt: 'Accès',
    description: 'Accès, rôles et secrets\u00A0: comptes nominatifs, moindre privilège, authentification multifacteur, coffre et révocation.',
    resume: 'Réduire les droits, protéger les comptes et traiter les secrets comme des données sensibles.',
    sections: [
      { id: 'comptes', label: 'Comptes et identités' },
      { id: 'privileges', label: 'Moindre privilège' },
      { id: 'mfa', label: 'Authentification et mots de passe' },
      { id: 'secrets', label: 'Secrets et clés' },
      { id: 'revue', label: 'Revue des accès' },
      { id: 'compromission', label: 'En cas de compromission' },
    ],
    motsCles: ['acces', 'role', 'moindre privilege', 'mfa', 'mot de passe', 'secret', 'revocation'],
  },
  {
    slug: 'cybersecurite/dependances',
    path: '/cybersecurite/dependances',
    titre: 'Dépendances, fournisseurs et chaîne logicielle',
    titreCourt: 'Dépendances',
    description: 'Dépendances, fournisseurs et chaîne logicielle\u00A0: versions, vulnérabilités, build, contrat, sortie et veille.',
    resume: 'Savoir ce qui entre dans le projet, qui le fournit et comment sortir sans perdre les données.',
    sections: [
      { id: 'cartographie', label: 'Cartographier les dépendances' },
      { id: 'versions', label: 'Versions et vulnérabilités' },
      { id: 'fournisseurs', label: 'Fournisseurs et contrats' },
      { id: 'chaine', label: 'Chaîne de build et provenance' },
      { id: 'sortie', label: 'Plan de sortie' },
      { id: 'veille', label: 'Veille et réponse' },
    ],
    motsCles: ['dependance', 'fournisseur', 'chaine logicielle', 'vulnerabilite', 'build', 'sortie'],
  },
  {
    slug: 'cybersecurite/donnees',
    path: '/cybersecurite/donnees',
    titre: 'Données, RGPD et AI Act',
    titreCourt: 'Données',
    description: 'Données, RGPD et AI Act\u00A0: classification, bases légales, rôles, cycle de vie, droits et incidents.',
    resume: 'Classer les données, limiter leur usage et connaître les obligations sans se substituer à un juriste.',
    sections: [
      { id: 'classer', label: 'Classer les données' },
      { id: 'rgpd', label: 'Principes RGPD' },
      { id: 'bases', label: 'Bases légales et rôles' },
      { id: 'aiact', label: 'AI Act' },
      { id: 'cycle', label: 'Cycle de vie' },
      { id: 'droits', label: 'Droits et incidents' },
    ],
    motsCles: ['donnees', 'rgpd', 'ai act', 'donnee personnelle', 'base legale', 'conservation'],
  },
  {
    slug: 'cybersecurite/incident',
    path: '/cybersecurite/incident',
    titre: 'Incident, sauvegarde et reprise',
    titreCourt: 'Incident',
    description: 'Incident, sauvegarde et reprise\u00A0: détection, confinement, communication, restauration, retour d’expérience et préparation.',
    resume: 'Réagir sans improviser, préserver les preuves et restaurer un service testé.',
    sections: [
      { id: 'detecter', label: 'Détecter et qualifier' },
      { id: 'confiner', label: 'Confiner et préserver' },
      { id: 'decider', label: 'Décider et communiquer' },
      { id: 'reprendre', label: 'Reprendre' },
      { id: 'apprendre', label: 'Apprendre' },
      { id: 'preparer', label: 'Préparer' },
    ],
    motsCles: ['incident', 'sauvegarde', 'reprise', 'confinement', 'restauration', 'retour experience', 'rancongiciel', 'ransomware'],
  },
];

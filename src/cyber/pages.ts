// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface CyberPageSection {
  id: string;
  label: string;
}

export interface CyberPageTemps {
  lecture: string;
  pratique: string;
  activite: string;
}

export interface CyberPageMeta {
  slug: string;
  path: string;
  titre: string;
  titreCourt: string;
  description: string;
  resume: string;
  pourquoi: string;
  objectifs: readonly [string, string, string];
  filRouge: string;
  temps: CyberPageTemps;
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
    pourquoi: 'Un projet livre un service, des données et une réputation. La sécurité traite ces biens avec des critères et des preuves, au même titre que le délai ou le budget.',
    objectifs: [
      'Décrire un risque par un actif, une menace, un impact et une parade.',
      'Distinguer une mesure proportionnée d’une promesse de sécurité totale.',
      'Prévoir une réaction et un contact avant l’incident.',
    ],
    filRouge: 'Sur Les Amis du Square, le site stocke des contacts d’adhérents. Le projet identifie les données, les comptes et les sauvegardes avant l’ouverture.',
    temps: { lecture: '4\u00A0min', pratique: '10\u00A0min', activite: 'checklist et cas réel' },
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
    pourquoi: 'Toutes les menaces ne se valent pas. Un modèle de menace aide à choisir les parades qui protègent réellement les actifs du projet, sans empiler des mesures au hasard.',
    objectifs: [
      'Lister les actifs et la valeur qui les rend sensibles.',
      'Décrire des menaces plausibles et leurs chemins d’attaque.',
      'Choisir une parade proportionnée avec un responsable et une date de revue.',
    ],
    filRouge: 'Sur Les Amis du Square, le modèle de menace relie les contacts d’adhérents à l’hameçonnage et à une parade vérifiable.',
    temps: { lecture: '5\u00A0min', pratique: '15\u00A0min', activite: 'laboratoire intégré et checklist' },
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
    pourquoi: 'Un compte partagé ou un droit trop large suffit à ouvrir une brèche. Les accès se réduisent, se nomment et se retirent avant qu’un incident ne révèle les oublis.',
    objectifs: [
      'Attribuer un compte nominatif et le droit minimal à chaque rôle.',
      'Protéger les comptes sensibles par une authentification multifacteur.',
      'Traiter un secret exposé par le retrait et la révocation.',
    ],
    filRouge: 'Sur Les Amis du Square, le compte du prestataire est temporaire, limité à la page à corriger et retiré à la fin de la mission.',
    temps: { lecture: '5\u00A0min', pratique: '15\u00A0min', activite: 'laboratoire intégré et checklist' },
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
    pourquoi: 'Une bibliothèque, un service ou un fournisseur peut tomber ou changer sans prévenir. Ce qui n’est pas cartographié ne peut être ni surveillé ni remplacé.',
    objectifs: [
      'Cartographier les dépendances directes, transitives et fournisseurs.',
      'Relier une version vulnérable à une fenêtre de correctif et un responsable.',
      'Préparer un export et un plan de sortie avant la signature.',
    ],
    filRouge: 'Sur Les Amis du Square, l’hébergeur et la messagerie figurent dans la carte des dépendances, avec un contact incident.',
    temps: { lecture: '5\u00A0min', pratique: '12\u00A0min', activite: 'checklist et cas réel' },
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
    pourquoi: 'Une donnée personnelle se rattache à une finalité, une durée et des droits. La classer avant la mise en ligne évite de découvrir trop tard qu’elle n’aurait pas dû être collectée.',
    objectifs: [
      'Classer les données du projet par sensibilité et par usage.',
      'Relier chaque traitement à une base légale et à une durée de conservation.',
      'Distinguer les obligations du fournisseur et celles du déployeur.',
    ],
    filRouge: 'Sur Les Amis du Square, la liste des adhérents est classée personnelle, accessible au bureau et conservée pour une durée écrite.',
    temps: { lecture: '5\u00A0min', pratique: '12\u00A0min', activite: 'checklist et cas réel' },
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
    pourquoi: 'Les premières minutes d’un incident décident de l’ampleur des dégâts. Confiner, préserver les preuves et restaurer un service testé valent mieux qu’une communication improvisée.',
    objectifs: [
      'Qualifier un incident et ouvrir une trace sans attendre la certitude.',
      'Confiner les accès et les machines tout en conservant les preuves.',
      'Restaurer à partir d’une sauvegarde testée et décider des actions du retour d’expérience.',
    ],
    filRouge: 'Sur Les Amis du Square, un compte compromis est révoqué dans l’heure, puis le service est restauré et testé.',
    temps: { lecture: '5\u00A0min', pratique: '15\u00A0min', activite: 'laboratoire intégré et checklist' },
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

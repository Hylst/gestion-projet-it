export interface FicheOutil {
  id: string;
  titre: string;
  objectif: string;
  moment: string;
  limites: string;
  alternatives: string;
  cout: string;
  sortie: string;
}

export interface CritereOutil {
  id: string;
  critere: string;
  question: string;
  signal: string;
}

export const FICHES_OUTILS: readonly FicheOutil[] = [
  {
    id: 'suivi',
    titre: 'Suivi des tâches et des décisions',
    objectif: 'Rendre visibles le reste à faire, les blocages et les décisions qui engagent la suite.',
    moment: 'Dès le cadrage, puis à chaque point de suivi et avant chaque jalon.',
    limites: 'Un tableau vide ou trop détaillé ne sert pas. Il demande un responsable, un rythme court et des colonnes limitées.',
    alternatives: 'Tableau simple, billet partagé, outil dédié, ou combinaison d’un tableau et d’un journal de décisions.',
    cout: 'Faible à moyen pour démarrer, puis un entretien régulier pour éviter un registre périmé.',
    sortie: 'Quand le tableau ne permet plus de décider ou coûte plus de temps qu’il n’en fait gagner.',
  },
  {
    id: 'documentation',
    titre: 'Documentation partagée',
    objectif: 'Garder les décisions, les modes d’emploi et les liens utiles à un endroit que l’équipe sait retrouver.',
    moment: 'Quand une décision ou un geste doit survivre au départ d’une personne, sans attendre la fin du projet.',
    limites: 'Une documentation sans relecture ni date vieillit vite. Trop de pages dispersées recréent le problème.',
    alternatives: 'Page unique, dossier partagé, journal de décisions, ou documentation intégrée au dépôt.',
    cout: 'Faible pour créer une page, moyen pour tenir la relecture et les mises à jour.',
    sortie: 'Quand la documentation n’est plus lue, contredit le produit ou duplique une source plus fiable.',
  },
  {
    id: 'diagrammes',
    titre: 'Diagrammes et schémas',
    objectif: 'Montrer un périmètre, un flux ou une dépendance que les mots seuls rendent difficiles à discuter.',
    moment: 'Au cadrage, lors d’un arbitrage ou quand deux personnes décrivent le même flux de façon différente.',
    limites: 'Un schéma trop détaillé devient un livrable à maintenir. Il ne remplace pas la décision écrite.',
    alternatives: 'Croquis au tableau, schéma SVG versionné, diagramme simple intégré à la documentation.',
    cout: 'Faible pour un croquis, moyen pour un schéma tenu à jour avec ses légendes.',
    sortie: 'Quand le schéma n’est plus compris sans son auteur ou contredit le fonctionnement réel.',
  },
  {
    id: 'tests',
    titre: 'Tests et automatisation',
    objectif: 'Vérifier de façon répétable les critères d’acceptation et les parcours qui ne doivent pas régresser.',
    moment: 'Dès qu’un critère est observable, avant de figer une recette ou une livraison.',
    limites: 'Un test instable ou trop couplé à l’interface use la confiance. Tous les gestes ne méritent pas une automatisation.',
    alternatives: 'Test manuel guidé, test de composant, test de bout en bout, ou vérification courte avant livraison.',
    cout: 'Moyen pour écrire et maintenir, plus faible à mesure que les régressions évitées augmentent.',
    sortie: 'Quand le test ne protège plus un comportement utile ou demande plus d’entretien que le risque couvert.',
  },
  {
    id: 'securite',
    titre: 'Sécurité et secrets',
    objectif: 'Protéger les accès, les dépendances et les données sans transformer le projet en audit permanent.',
    moment: 'Dès qu’un secret, un fournisseur, une donnée personnelle ou une mise en ligne entre dans le périmètre.',
    limites: 'Une checklist ne remplace pas une analyse du contexte. Un secret retiré du code doit aussi être révoqué.',
    alternatives: 'Coffre de secrets, revue ciblée, dépendances épinglées, sauvegarde testée et contact incident.',
    cout: 'Moyen pour mettre en place les gestes de base, variable selon l’exposition et les obligations.',
    sortie: 'Quand le contrôle est automatisé, documenté et vérifié à chaque changement sensible.',
  },
  {
    id: 'accessibilite',
    titre: 'Accessibilité et qualité',
    objectif: 'Rendre les pages utilisables au clavier, lisibles et compréhensibles par des publics variés.',
    moment: 'Dès la conception des parcours, puis avant chaque mise en ligne et lors d’une revue annuelle.',
    limites: 'Lighthouse ne remplace pas un parcours clavier ni un test avec un lecteur d’écran. Un score ne décrit pas toute l’expérience.',
    alternatives: 'Revue manuelle, test Playwright au clavier, audit WCAG, retour d’utilisateurs concernés.',
    cout: 'Faible pour les gestes de base, moyen pour un audit complet et les corrections qui suivent.',
    sortie: 'Quand les critères retenus sont vérifiés, les limites documentées et les défauts suivis.',
  },
];

export const CRITERES_OUTILS: readonly CritereOutil[] = [
  {
    id: 'cout',
    critere: 'Coût d’entrée',
    question: 'Quel effort faut-il pour démarrer et entretenir l’outil ?',
    signal: 'Temps de mise en route, formation, administration et coût récurrent.',
  },
  {
    id: 'donnees',
    critere: 'Données',
    question: 'Quelles données sont stockées, où et par qui ?',
    signal: 'Hébergement, exports, droits, durée de conservation et sous-traitants.',
  },
  {
    id: 'integration',
    critere: 'Intégration',
    question: 'L’outil s’insère-t-il dans les gestes existants ?',
    signal: 'Formats, imports, doublons, dépendances et travail manuel restant.',
  },
  {
    id: 'sortie',
    critere: 'Sortie',
    question: 'Peut-on récupérer les données et quitter l’outil ?',
    signal: 'Export ouvert, suppression, reprise et conditions de fin de contrat.',
  },
  {
    id: 'accessibilite',
    critere: 'Accessibilité',
    question: 'L’outil reste-t-il utilisable au clavier et avec un lecteur d’écran ?',
    signal: 'Navigation, contrastes, libellés, aide et compatibilité des parcours.',
  },
  {
    id: 'dependance',
    critere: 'Dépendance',
    question: 'Que se passe-t-il si l’éditeur change ou disparaît ?',
    signal: 'Coût de migration, alternatives, contrat, disponibilité et verrouillage.',
  },
];

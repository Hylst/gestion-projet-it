import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm7-quiz',
  questions: [
    {
      question: 'À quoi sert une cartographie des parties prenantes\u00A0?',
      choix: [
        'Repérer qui influence le projet et qui est concerné',
        'Classer les personnes par ancienneté',
        'Remplacer le planning',
      ],
      bonne: 0,
      motif: 'La carte aide à adapter la communication, elle ne décide pas à la place du projet.',
    },
    {
      question: 'Que contient un plan de communication simple\u00A0?',
      choix: [
        'Qui, quoi, quand et par quel canal',
        'Un budget détaillé sans destinataire',
        'Une liste de réunions sans objet',
      ],
      bonne: 0,
      motif: 'Sans destinataire, objet ou rythme, le plan reste inutilisable.',
    },
    {
      question: 'Que faire quand un retour contredit le plan\u00A0?',
      choix: [
        'Vérifier le besoin puis ajuster le canal ou le rythme',
        'Ignorer le retour pour tenir le plan',
        'Arrêter toute communication',
      ],
      bonne: 0,
      motif: 'Un plan vivant s’ajuste après un retour, sans défensive.',
    },
    {
      question: 'Dans une matrice RACI, que signifie la lettre A\u00A0?',
      choix: [
        'La personne qui rend compte et décide',
        'La personne qui informe seulement',
        'La personne qui réalise toujours',
      ],
      bonne: 0,
      motif: 'Un seul A par activité\u00A0: il rend compte du résultat et tranche.',
    },
    {
      question: 'À quoi sert un journal de décisions\u00A0?',
      choix: [
        'Garder la décision, son motif, son responsable et sa suite',
        'Remplacer le planning',
        'Lister les réunions sans décision',
      ],
      bonne: 0,
      motif: 'Le journal garde la trace utile pour éviter de redécider sans contexte.',
    },
  ],
};

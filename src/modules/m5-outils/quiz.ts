import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm5-quiz',
  questions: [
    {
      question: 'A quoi sert un outil de suivi ?',
      choix: [
        'Centraliser backlog, colonnes et assignation',
        'Ecrire a la place de l equipe',
        'Garantir le delai seul',
      ],
      bonne: 0,
      motif: 'Il rend visible le travail partage, il ne remplace ni arbitrage ni travail.',
    },
    {
      question: 'A quoi sert une chaine CI ?',
      choix: [
        'Tester et assembler a chaque changement fictif',
        'Publier sans aucun controle',
        'Remplacer la relecture',
      ],
      bonne: 0,
      motif: 'Detection tot des regressions fictives, relecture gardee.',
    },
    {
      question: 'A quoi sert un environnement reproductible ?',
      choix: [
        'Meme poste partout pour demo simple',
        'Accelerer le reseau',
        'Supprimer les tests',
      ],
      bonne: 0,
      motif: 'Ecarts entre postes reduits, onboarding fictif plus simple.',
    },
  ],
};

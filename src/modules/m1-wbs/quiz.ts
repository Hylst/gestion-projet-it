import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm1-quiz',
  questions: [
    {
      question: 'A quoi sert un WBS ?',
      choix: [
        'Visualiser les livrables et les lots pour partager le perimetre',
        'Coder plus vite',
        'Remplacer le planning',
      ],
      bonne: 0,
      motif: 'Le WBS montre ce qui est a livrer, pas comment coder ni quand livrer.',
    },
    {
      question: 'Ou mettre le paiement en ligne dans le cas fictif ?',
      choix: ['Dans le lot Realisation', 'Dehors, car hors cadrage fictif', 'En jalon'],
      bonne: 1,
      motif: 'Le cadrage fictif l exclut, donc il reste dehors avec motif ecrit.',
    },
    {
      question: 'Qu est ce qu une bonne definition de fini ?',
      choix: ['Une formule vague', 'Un critere verifiable par lot', 'Une date'],
      bonne: 1,
      motif: 'On peut constater que c est fini ; la date seule ne le prouve pas.',
    },
  ],
};

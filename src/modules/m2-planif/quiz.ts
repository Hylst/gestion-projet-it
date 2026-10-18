import type { QuizData } from '../../components/QuizBlock';

export const quiz: QuizData = {
  id: 'm2-quiz',
  questions: [
    {
      question: 'A quoi sert un PERT ?',
      choix: [
        'Ordonner taches et dependances et lire la chaine tendue',
        'Lister les outils',
        'Animer une reunion',
      ],
      bonne: 0,
      motif: 'Le PERT montre l ordre et ce qui commande la date cible fictive.',
    },
    {
      question: 'A quoi sert un GANTT ?',
      choix: [
        'Voir qui fait quoi et quand et suivre l avancement',
        'Ecrire le code',
        'Chiffrer sans hypothese',
      ],
      bonne: 0,
      motif: 'Barres, jalons et avancement partages, sans lien direct avec le code.',
    },
    {
      question: 'Que faire si une tache de la chaine tendue glisse ?',
      choix: ['Ne rien changer', 'Ajouter des taches', 'Replanifier et proteger la chaine'],
      bonne: 2,
      motif: 'La chaine tendue commande la fin, il faut agir dessus en priorite.',
    },
  ],
};

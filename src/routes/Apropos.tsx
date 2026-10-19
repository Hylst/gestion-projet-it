import { SeoHead } from '../components/SeoHead';

export default function Apropos() {
  return (
    <>
      <SeoHead title="À propos" description={'Gestion de Projet IT\u00A0: cours interactif réalisé par Geoffroy avec assistance IA, licence AGPL-3.0-or-later, sans compte ni cookie.'} />
      <h1>À propos du projet</h1>
      <p><strong>Gestion de Projet IT, Méthodologies et Équipes.</strong> Un cours interactif en 9 modules&nbsp;: cadrer et découper, planifier, choisir sa méthode, agiles, outils CI/CD, équipe et risques, parties prenantes et communication, budget et chiffrage, conduite du changement.</p>
      <h2>Paternité</h2>
      <p>Réalisé par Geoffroy avec assistance IA.</p>
      <h2>Liens et licences</h2>
      <p>Licence AGPL-3.0-or-later. Le code source est disponible dans le dépôt du projet.</p>
      <h2>Données et vie privée</h2>
      <p>L’application fonctionne 100&nbsp;% côté navigateur&nbsp;: aucun compte, aucun cookie, aucune donnée sortante. La progression est stockée localement (clés gestion-projet-it:*), exportable et importable en JSON.</p>
      <h2>Le fil rouge</h2>
      <p>Un seul cas fictif soutient les 9 modules&nbsp;: la refonte du site de l’association fictive Les Amis du Square (pages de présentation, agenda des activités, formulaire de contact fictif). Tous les exemples restent fictifs.</p>
    </>
  );
}

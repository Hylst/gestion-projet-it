import { SeoHead } from '../components/SeoHead';

export default function Apropos() {
  return (
    <>
      <SeoHead title="A propos" description="Gestion de Projet IT : cours interactif realise par Geoffroy avec assistance IA, licence AGPL-3.0-or-later, sans compte ni cookie." />
      <h1>A propos du projet</h1>
      <p><strong>Gestion de Projet IT, Methodologies et Equipes.</strong> Un cours interactif en 7 modules : cadrer et decouper, planifier, choisir sa methode, agiles, outils CI/CD, equipe et risques, parties prenantes et communication.</p>
      <h2>Paternite</h2>
      <p>Realise par Geoffroy avec assistance IA.</p>
      <h2>Liens et licences</h2>
      <p>Licence AGPL-3.0-or-later. Le code source est disponible dans le depot du projet.</p>
      <h2>Donnees et vie privee</h2>
      <p>L'application fonctionne 100 % cote navigateur : aucun compte, aucun cookie, aucune donnee sortante. La progression est stockee localement (cles gestion-projet-it:*), exportable et importable en JSON.</p>
      <h2>Le fil rouge</h2>
      <p>Un seul cas fictif soutient les 7 modules : la refonte du site de l'association fictive Les Amis du Square (pages de presentation, agenda des activites, formulaire de contact fictif). Tous les exemples restent fictifs.</p>
      <h2>A venir</h2>
      <p>Deux modules prolongent le cours plus tard : budget et chiffrage, conduite du changement.</p>
    </>
  );
}

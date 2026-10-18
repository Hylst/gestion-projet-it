export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : Scrum, Kanban, Lean, XP</h2>
    <h3>Scrum</h3>
    <p><strong>A quoi ca sert.</strong> Faire un produit evolutif par tranches courtes, avec un backlog priorise et des rituels courts (planning, quotidienne, revue, retro) et trois roles (porteur de besoin, animateur, realisateurs). <strong>Quand.</strong> Le contenu evolue et des retours reguliers sont possibles. <strong>Limites.</strong> Demande de la disponibilite des personnes et de la stabilite des roles.</p>
    <h3>Kanban</h3>
    <p><strong>A quoi ca sert.</strong> Gerer un flux continu sans grosse phase de planification, avec des colonnes, une limite de WIP et des indicateurs simples. <strong>Quand.</strong> Les demandes arrivent au fil de l eau. <strong>Limites.</strong> Sans limite de WIP respectee, la colonne En cours s encombre.</p>
    <h3>Lean</h3>
    <p><strong>A quoi ca sert.</strong> Eliminer les gaspillages, decouper en petits lots, boucler court. <strong>Quand.</strong> On cherche a reduire l encombrement et les travaux sans suite. <strong>Limites.</strong> Demande un suivi des blocages reel : petit lot ne veut pas dire publication continue sans controle.</p>
    <h3>XP</h3>
    <p><strong>A quoi ca sert.</strong> Soigner la qualite du code : relectures croisees, tests frequents, petits pas. <strong>Quand.</strong> Des que des tests et des relectures regulieres sont possibles. <strong>Limites.</strong> Suppose une equipe qui programme ensemble, ce qui n est pas toujours le cas.</p>
    <h3>Agile sans dogme</h3>
    <p>Quatre methodes citees avec leur cas d usage et leurs limites ; aucune n est superieure aux autres : le choix depend du flux des demandes, de la disponibilite des personnes et de la culture technique locale.</p>
  </section>
);

export default Fiche;

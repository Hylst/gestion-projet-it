export const Fiche = () => (
  <section id="fiche" aria-labelledby="fiche-t">
    <h2 id="fiche-t">Fiche : cycle en V, cascade (Waterfall), choisir sa methode</h2>
    <p><strong>Definition cascade (Waterfall).</strong> Phases en suite : besoin, conception, realisation, test, deploiement. Un document de fin de phase est relu avant la suivante ; l avancement se lit par jalons.</p>
    <p><strong>Definition cycle en V.</strong> Memes phases, avec des tests prepares en face de chaque niveau de conception : tests unitaires face au code, tests d integration face a la conception detaillee, tests systeme face a la conception globale, acceptation face au besoin.</p>
    <p><strong>A quoi ca sert.</strong> Ordonner un travail en phases simples avec jalons, quand le besoin est stable et les contraintes connues. Le cycle en V ajoute des tests prepares a l avance en face de chaque conception.</p>
    <p><strong>Quand l utiliser.</strong> Cascade : besoin stable, petit perimetre, jalons simples et contraintes connues. Cycle en V : quand les traces et les tests sont attendus a chaque niveau.</p>
    <p><strong>Avantages.</strong> Lisibilite, jalons clairs, documents de reference par phase.</p>
    <p><strong>Limites.</strong> Retours tardifs couteux, besoin flou mal porte, decouverte d usage faible. Aucune ecole superieure a l autre : le comparateur ci dessous montre les trois familles cote a cote.</p>
  </section>
);

export default Fiche;

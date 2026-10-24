import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { CRITERES_OUTILS, FICHES_OUTILS } from '../lib/outils';

export default function Outils() {
  return (
    <article className="module-page">
      <SeoHead
        title="Fiches outils"
        description="Fiches internes pour choisir une famille d’outils sans classement absolu, avec une grille de comparaison."
      />
      <header className="module-head">
        <p className="kicker">Outils</p>
        <h1>Fiches outils</h1>
        <p className="accroche">Six familles d’outils, avec leur utilité, leur moment, leurs limites et leurs alternatives. Aucun outil n’est meilleur par principe.</p>
        <p><Link to="/ressources">Ressources et outils</Link> · <Link to="/module-5">Module 5</Link> · <Link to="/modeles">Journal et modèles imprimables</Link></p>
      </header>
      <nav className="sommaire" aria-label="Sommaire des fiches outils">
        {FICHES_OUTILS.map((fiche) => <a key={fiche.id} href={`#outil-${fiche.id}`}>{fiche.titre}</a>)}
        <a href="#grille">Grille de comparaison</a>
      </nav>
      {FICHES_OUTILS.map((fiche) => (
        <section key={fiche.id} id={`outil-${fiche.id}`} aria-labelledby={`outil-${fiche.id}-t`} className="outil-fiche card">
          <h2 id={`outil-${fiche.id}-t`}>{fiche.titre}</h2>
          <dl className="outil-champs">
            <div><dt>Objectif</dt><dd>{fiche.objectif}</dd></div>
            <div><dt>Moment</dt><dd>{fiche.moment}</dd></div>
            <div><dt>Limites</dt><dd>{fiche.limites}</dd></div>
            <div><dt>Alternatives</dt><dd>{fiche.alternatives}</dd></div>
            <div><dt>Coût d’entrée</dt><dd>{fiche.cout}</dd></div>
            <div><dt>Critère de sortie</dt><dd>{fiche.sortie}</dd></div>
          </dl>
        </section>
      ))}
      <section id="grille" aria-labelledby="grille-t">
        <h2 id="grille-t">Grille de comparaison</h2>
        <p>Utiliser la grille avant de choisir un outil. Le but n’est pas de classer les produits, mais de rendre les compromis discutables.</p>
        <div className="outils-grille-wrap">
          <table className="outils-grille">
            <caption>Six critères à renseigner pour chaque option étudiée.</caption>
            <thead>
              <tr><th scope="col">Critère</th><th scope="col">Question</th><th scope="col">Signal à noter</th></tr>
            </thead>
            <tbody>
              {CRITERES_OUTILS.map((critere) => (
                <tr key={critere.id}>
                  <th scope="row">{critere.critere}</th>
                  <td>{critere.question}</td>
                  <td>{critere.signal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

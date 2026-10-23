import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { RESSOURCES_MODULES, RESSOURCES_PARCOURS, type GroupeRessources } from '../lib/ressources';

function Groupe({ groupe }: { groupe: GroupeRessources }) {
  return (
    <section id={groupe.id} aria-labelledby={`${groupe.id}-t`}>
      <h2 id={`${groupe.id}-t`}>{groupe.titre}</h2>
      {groupe.moduleNum !== undefined && (
        <p><Link to={`/module-${groupe.moduleNum}`}>Revenir au module {groupe.moduleNum}</Link></p>
      )}
      <ul className="ressources-liste">
        {groupe.ressources.map((ressource) => (
          <li key={ressource.url} className="ressource card">
            <h3>
              <a href={ressource.url} target="_blank" rel="noopener noreferrer">
                {ressource.titre}<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </h3>
            <p><span className="guide-label">Organisme</span> {ressource.organisme} · <span className="guide-label">Version</span> {ressource.version}</p>
            <p><span className="guide-label">Usage</span> {ressource.usage}</p>
            <p><span className="guide-label">Limite</span> {ressource.limite}</p>
            <p className="ressource-date">Vérifié le {ressource.verifieLe}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Ressources() {
  return (
    <article className="module-page">
      <SeoHead
        title="Ressources et outils"
        description="Ressources documentaires officielles pour les neuf modules et les parcours Produit et Cybersécurité."
      />
      <header className="module-head">
        <p className="kicker">Ressources</p>
        <h1>Ressources et outils</h1>
        <p className="accroche">Des liens documentaires qualifiés, ouverts dans un nouvel onglet. Aucun contenu n’est chargé automatiquement.</p>
      </header>
      <nav className="sommaire" aria-label="Sommaire des ressources">
        {RESSOURCES_MODULES.map((groupe) => <a key={groupe.id} href={`#${groupe.id}`}>{groupe.titre}</a>)}
        {RESSOURCES_PARCOURS.map((groupe) => <a key={groupe.id} href={`#${groupe.id}`}>{groupe.titre}</a>)}
      </nav>
      {RESSOURCES_MODULES.map((groupe) => <Groupe key={groupe.id} groupe={groupe} />)}
      {RESSOURCES_PARCOURS.map((groupe) => <Groupe key={groupe.id} groupe={groupe} />)}
      <p className="help">Les pages des parcours Produit et Cybersécurité restent au backlog. Leurs ressources sont regroupées ici pour préparer leur ouverture.</p>
    </article>
  );
}

import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { TERMES, type Terme } from '../lib/glossaire';
import { normaliser } from '../lib/search';

const slug = (s: string): string =>
  normaliser(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const groupes = new Map<string, Terme[]>();
for (const t of [...TERMES].sort((a, b) => a.terme.localeCompare(b.terme, 'fr'))) {
  const lettre = normaliser(t.terme).charAt(0).toUpperCase();
  const liste = groupes.get(lettre) ?? [];
  liste.push(t);
  groupes.set(lettre, liste);
}
const lettres = [...groupes.keys()].sort();

export default function Glossaire() {
  return (
    <>
      <SeoHead title="Glossaire" description={'Glossaire neutre du cours Gestion de Projet IT\u00A0: cadrage, planification, méthodes, agiles, outils, équipe, gouvernance, qualité, budget et changement.'} />
      <h1>Glossaire</h1>
      <p className="accroche">Définitions courtes et neutres des termes du cours. Chaque entrée renvoie au module qui la développe, sans dogme d’école.</p>
      <nav className="glossaire-sommaire" aria-label="Sommaire du glossaire">
        {lettres.map((l) => <a key={l} href={`#lettre-${l}`}>{l}</a>)}
      </nav>
      {lettres.map((l) => (
        <section key={l} id={`lettre-${l}`} aria-labelledby={`lettre-${l}-t`}>
          <h2 id={`lettre-${l}-t`}>{l}</h2>
          <dl className="glossaire">
            {(groupes.get(l) ?? []).map((t) => (
              <div key={t.terme} className="glossaire-item">
                <dt id={slug(t.terme)}>{t.terme}</dt>
                <dd>
                  {t.definition}
                  {t.module !== undefined && (
                    <span> <Link to={`/module-${t.module}`}>Voir le module {t.module}</Link></span>
                  )}
                  {t.lien && (
                    <span> <Link to={t.lien.to}>{t.lien.label}</Link></span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}

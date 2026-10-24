import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildIndex, searchIndex, type SearchHit } from '../lib/search';

export default function SearchBar() {
  const [q, setQ] = React.useState('');
  const [ouverte, setOuverte] = React.useState(false);
  const [actif, setActif] = React.useState(-1);
  const cible = React.useRef<{ path: string; ancre: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const index = React.useMemo(() => buildIndex(), []);
  const hits = React.useMemo(() => searchIndex(index, q), [index, q]);
  const visibles = hits.slice(0, 10);

  React.useEffect(() => {
    const c = cible.current;
    if (!c || location.pathname !== c.path) return;
    document.getElementById(c.ancre)?.scrollIntoView();
    cible.current = null;
  }, [location.pathname]);

  const aller = (hit: SearchHit) => {
    setOuverte(false);
    setActif(-1);
    setQ('');
    if (hit.path === location.pathname) {
      document.getElementById(hit.ancre)?.scrollIntoView();
      return;
    }
    cible.current = { path: hit.path, ancre: hit.ancre };
    navigate(hit.path);
  };

  return (
    <div className="search" role="search">
      <label htmlFor="search-input">Rechercher dans le cours</label>
      <input
        id="search-input" type="search" value={q} autoComplete="off"
        role="combobox" aria-expanded={ouverte} aria-controls="search-results"
        aria-haspopup="listbox" aria-autocomplete="list"
        aria-activedescendant={actif >= 0 ? `search-opt-${actif}` : undefined}
        onChange={(e) => { setQ(e.target.value); setOuverte(e.target.value.trim().length > 0); setActif(-1); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && visibles.length > 0) {
            e.preventDefault();
            setOuverte(true);
            setActif(Math.min(actif + 1, visibles.length - 1));
          } else if (e.key === 'ArrowUp' && visibles.length > 0) {
            e.preventDefault();
            setActif(Math.max(actif - 1, 0));
          } else if (e.key === 'Escape') {
            setOuverte(false);
            setActif(-1);
            setQ('');
          } else if (e.key === 'Enter' && ouverte && visibles.length > 0) {
            e.preventDefault();
            const h = visibles[actif >= 0 ? actif : 0];
            if (!h) return;
            aller(h);
          }
        }}
      />
      {ouverte && (
        <ul id="search-results" role="listbox" aria-label="Résultats de recherche">
          {visibles.map((h, i) => (
            <li key={h.type === 'module' ? `m-${h.moduleNum}-${h.ancre}` : h.type === 'ia' ? `ia-${h.path}-${h.ancre}` : `page-${h.path}`} id={`search-opt-${i}`} role="option" aria-selected={i === actif}>
              <button type="button" onClick={() => aller(h)}>
                {h.type === 'module' ? <>Module {h.moduleNum}&nbsp;: {h.moduleTitre}</> : <>{h.pageTitre}</>} <span>{h.section}</span>
              </button>
            </li>
          ))}
          {hits.length === 0 && <li role="option" aria-selected={false}>Aucun résultat</li>}
        </ul>
      )}
      <p className="sr-only" aria-live="polite">{ouverte ? `${hits.length} résultat(s)` : ''}</p>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { buildIndex, searchIndex } from '../lib/search';

export default function SearchBar() {
  const [q, setQ] = React.useState('');
  const [ouverte, setOuverte] = React.useState(false);
  const [actif, setActif] = React.useState(-1);
  const navigate = useNavigate();
  const index = React.useMemo(() => buildIndex(), []);
  const hits = React.useMemo(() => searchIndex(index, q), [index, q]);
  const visibles = hits.slice(0, 10);

  const aller = (moduleNum: number, ancre: string) => {
    setOuverte(false);
    setActif(-1);
    setQ('');
    navigate(`/module-${moduleNum}`);
    window.setTimeout(() => {
      document.getElementById(ancre)?.scrollIntoView();
    }, 0);
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
            aller(h.moduleNum, h.ancre);
          }
        }}
      />
      {ouverte && (
        <ul id="search-results" role="listbox" aria-label="Résultats de recherche">
          {visibles.map((h, i) => (
            <li key={`${h.moduleNum}-${h.ancre}`} id={`search-opt-${i}`} role="option" aria-selected={i === actif}>
              <button type="button" onClick={() => aller(h.moduleNum, h.ancre)}>
                Module {h.moduleNum}&nbsp;: {h.moduleTitre} <span>{h.section}</span>
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

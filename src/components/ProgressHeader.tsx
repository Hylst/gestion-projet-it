import React from 'react';
import { useProgress } from '../lib/progress';
import { MODULES } from '../modules/index';

export default function ProgressHeader() {
  const p = useProgress();
  return (
    <div className="progress-header" aria-label="Progression">
      <span className="xp-chip">{p.xp} XP</span>
      <span className="niveau-chip">{p.niveau.nom}</span>
      <span className="badge-chip">{p.moduleDone.length}/{MODULES.length} modules</span>
      <button type="button" className="btn secondary mini" onClick={exportJson}>Exporter</button>
      <label className="mini btn secondary" style={{ cursor: 'pointer' }}>
        Importer
        <input type="file" accept="application/json" className="sr-only" onChange={importJson} aria-label="Importer une progression JSON" />
      </label>
      <p className="sr-only" aria-live="polite">{`${p.xp} XP, niveau ${p.niveau.nom}`}</p>
    </div>
  );

  function exportJson() {
    const blob = new Blob([p.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gestion-projet-it-progression.json';
    a.click(); URL.revokeObjectURL(url);
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    f.text().then((txt) => p.importJSON(txt));
  }
}

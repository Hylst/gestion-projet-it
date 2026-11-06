// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { useProgress } from '../lib/progress';
import { MODULES } from '../modules/index';

export default function ProgressHeader() {
  const p = useProgress();
  const fichierRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState('');

  return (
    <div className="progress-header" aria-label="Progression">
      <span className="xp-chip">{p.xp}&nbsp;XP</span>
      <span className="niveau-chip">{p.niveau.nom}</span>
      <span className="badge-chip">{p.moduleDone.length}/{MODULES.length} modules</span>
      <button type="button" className="btn secondary mini" onClick={exportJson}>Exporter</button>
      <button
        type="button"
        className="btn secondary mini"
        onClick={() => fichierRef.current?.click()}
        title="Remplace la progression actuelle par le fichier choisi"
      >
        Importer
      </button>
      <input
        ref={fichierRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={importJson}
        aria-label="Importer une progression JSON"
      />
      <p className="sr-only" role="status" aria-live="polite">{message}</p>
      <p className="sr-only" aria-live="polite">{`${p.xp}\u00A0XP, niveau ${p.niveau.nom}`}</p>
    </div>
  );

  function exportJson() {
    const blob = new Blob([p.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gestion-projet-it-progression.json';
    a.click(); URL.revokeObjectURL(url);
    setMessage('Progression exportée.');
  }

  function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    setMessage('Lecture du fichier en cours.');
    f.text()
      .then((txt) => {
        const ok = p.importJSON(txt);
        setMessage(ok ? 'Progression importée.' : 'Import impossible : fichier illisible ou version incompatible.');
      })
      .catch(() => setMessage('Import impossible : fichier illisible.'));
  }
}

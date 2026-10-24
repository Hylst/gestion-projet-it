// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useProgress } from '../lib/progress';
import { MODULES } from '../modules/index';

export function ModuleEnd(props: { id: string }) {
  const p = useProgress();
  const fait = p.moduleDone.includes(props.id);
  return (
    <section id="fin" className="module-end">
      {fait
        ? <p className="ok" role="status">Module terminé. Badge ajouté ({p.moduleDone.length}/{MODULES.length}).</p>
        : <button type="button" className="btn" onClick={() => p.dispatch({ type: 'module', id: props.id })}>Marquer le module comme terminé (+20 XP)</button>}
    </section>
  );
}

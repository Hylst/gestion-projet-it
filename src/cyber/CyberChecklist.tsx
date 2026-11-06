// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export function CyberChecklist({ titre = 'Checklist', items }: { titre?: string; items: readonly string[] }) {
  return (
    <section className="cyber-checklist" aria-labelledby="cyber-checklist-titre">
      <h2 id="cyber-checklist-titre">{titre}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

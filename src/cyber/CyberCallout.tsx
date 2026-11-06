// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from 'react';

export function CyberCallout({ titre, variante = 'note', children }: { titre: string; variante?: 'note' | 'fil' | 'limite'; children: ReactNode }) {
  return (
    <aside className={`cyber-callout cyber-callout--${variante}`} aria-label={titre}>
      <p className="cyber-callout-titre">{titre}</p>
      {children}
    </aside>
  );
}

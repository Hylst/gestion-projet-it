// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from 'react';

export function IaCallout({ titre, variante = 'note', children }: { titre: string; variante?: 'note' | 'fil' | 'limite'; children: ReactNode }) {
  return (
    <aside className={`ia-callout ia-callout--${variante}`} aria-label={titre}>
      <p className="ia-callout-titre">{titre}</p>
      {children}
    </aside>
  );
}

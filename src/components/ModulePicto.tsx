// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from 'react';

const PICTOGRAMMES: Record<number, ReactNode> = {
  1: (
    <>
      <path d="M12 6v4M6 10h12M6 10v6M12 10v6M18 10v6" />
      <rect x="9" y="2" width="6" height="4" rx="1" className="picto-soft" />
      <rect x="3" y="16" width="6" height="4" rx="1" />
      <rect x="9" y="16" width="6" height="4" rx="1" />
      <rect x="15" y="16" width="6" height="4" rx="1" />
    </>
  ),
  2: (
    <>
      <path d="M4 3v18" />
      <rect x="7" y="5" width="12" height="3.4" rx="1.7" className="picto-calm picto-plat" />
      <rect x="10" y="10.3" width="9" height="3.4" rx="1.7" />
      <rect x="7" y="15.6" width="7" height="3.4" rx="1.7" />
    </>
  ),
  3: (
    <>
      <path d="M3 4l9 15 9-15" />
      <circle cx="7" cy="8" r="2" className="picto-soft" />
      <circle cx="17" cy="8" r="2" />
    </>
  ),
  4: (
    <>
      <rect x="3" y="3" width="5" height="18" rx="1.5" />
      <rect x="9.5" y="3" width="5" height="18" rx="1.5" />
      <rect x="16" y="3" width="5" height="18" rx="1.5" />
      <rect x="10.5" y="6" width="3" height="4" rx="1" className="picto-calm picto-plat" />
      <path d="M4.5 6h2M17.5 6h2M4.5 10h2M11 10h2M17.5 10h2" />
    </>
  ),
  5: (
    <>
      <rect x="2.5" y="9" width="5.5" height="6" rx="1" className="picto-soft" />
      <rect x="16" y="9" width="5.5" height="6" rx="1" />
      <path d="M8 12h7m-3-3 3 3-3 3" />
    </>
  ),
  6: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 3v18M3 12h18" />
      <rect x="3" y="3" width="9" height="9" rx="2" className="picto-calm picto-plat" />
    </>
  ),
  7: (
    <>
      <circle cx="6" cy="6" r="2.5" className="picto-soft" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 7.3l7 0M7.4 8.4l3.2 7.2M16.6 8.4l-3.2 7.2" />
    </>
  ),
  8: (
    <>
      <ellipse cx="12" cy="6" rx="6" ry="2.5" className="picto-calm" />
      <path d="M6 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" />
      <path d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
      <path d="M6 14v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
    </>
  ),
  9: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 3v5h-5z" className="picto-soft" />
    </>
  ),
};

export function ModulePicto(props: { num: number }) {
  const contenu = PICTOGRAMMES[props.num];
  if (!contenu) return null;
  return (
    <svg className="module-picto" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {contenu}
    </svg>
  );
}

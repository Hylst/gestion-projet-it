// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Rétablit le défilement au sommet de la page à chaque changement d'URL,
 * ou fait défiler jusqu'à l'élément ciblé si un fragment (#hash) est présent.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
        return;
      }
      // Si la page ou le composant charge de manière asynchrone (Suspense)
      const timer = window.setTimeout(() => {
        const elApres = document.getElementById(id);
        if (elApres) {
          elApres.scrollIntoView();
        }
      }, 100);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;

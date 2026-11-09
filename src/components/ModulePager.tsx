// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Link } from 'react-router-dom';
import { moduleMetaByNum } from '../modules/index';

export function ModulePager({ numCourant }: { numCourant: number }) {
  const metaCourant = moduleMetaByNum(numCourant);
  const metaPrecedent = numCourant > 1 ? moduleMetaByNum(numCourant - 1) : undefined;
  const metaSuivant = numCourant < 9 ? moduleMetaByNum(numCourant + 1) : undefined;

  return (
    <nav className="module-pager" aria-label="Continuité du parcours">
      {metaCourant?.transition && (
        <aside className="module-pager-transition" aria-label="Lien logique avec la suite">
          <p><strong>Étape suivante&nbsp;:</strong> {metaCourant.transition}</p>
        </aside>
      )}

      <div className="module-pager-liens">
        {metaPrecedent ? (
          <Link to={`/${metaPrecedent.slug}`} className="btn secondary mini">
            ← Module {metaPrecedent.num}&nbsp;: {metaPrecedent.titre}
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        {metaSuivant ? (
          <Link to={`/${metaSuivant.slug}`} className="btn mini">
            Module {metaSuivant.num}&nbsp;: {metaSuivant.titre} →
          </Link>
        ) : (
          <Link to="/dossier-projet" className="btn mini">
            Passer à la pratique&nbsp;: Dossier projet →
          </Link>
        )}
      </div>
    </nav>
  );
}

export default ModulePager;

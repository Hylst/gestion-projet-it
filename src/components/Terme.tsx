// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { slugTerme, trouverTerme } from '../lib/glossaire';
import '../styles/terme.css';

export interface TermeProps {
  id?: string;
  terme?: string;
  children?: React.ReactNode;
}

export function Terme({ id, terme, children }: TermeProps) {
  const [ouvert, setOuvert] = useState(false);
  const rawId = useId();
  const tooltipId = 'terme-' + rawId.replace(/[:]/g, '');
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const query = id ?? terme ?? (typeof children === 'string' ? children : '');
  const donnees = trouverTerme(query);

  useEffect(() => {
    if (!ouvert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOuvert(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOuvert(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ouvert]);

  if (!donnees) {
    return <span className="terme-brut">{children ?? terme ?? id}</span>;
  }

  const ancre = slugTerme(donnees);
  const cibleGlossaire = `/glossaire#${ancre}`;

  return (
    <span className="terme-wrapper" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className="terme-trigger"
        aria-expanded={ouvert}
        aria-describedby={ouvert ? tooltipId : undefined}
        onClick={() => setOuvert((v) => !v)}
      >
        {children ?? donnees.sigle ?? donnees.terme}
      </button>
      {ouvert && (
        <span id={tooltipId} role="tooltip" className="terme-tooltip">
          <strong className="terme-titre">
            {donnees.terme}
            {donnees.developpe && (
              <span className="terme-developpe">&nbsp;({donnees.developpe})</span>
            )}
          </strong>
          <span className="terme-def">{donnees.definition}</span>
          <Link
            to={cibleGlossaire}
            className="terme-lien"
            onClick={() => setOuvert(false)}
          >
            Voir dans le glossaire
          </Link>
        </span>
      )}
    </span>
  );
}

export default Terme;

// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { ONBOARDING_SLIDES, type OnboardingIcone } from '../lib/onboarding';
import '../styles/onboarding.css';

export interface OnboardingProps {
  onFermer: () => void;
}

const FOCUSABLES =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Picto({ icone }: { icone: OnboardingIcone }) {
  const commun = {
    className: 'onboarding-picto',
    viewBox: '0 0 120 90',
    'aria-hidden': true,
    focusable: 'false',
  } as const;

  if (icone === 'parcours') {
    return (
      <svg {...commun}>
        <path d="M12 70 C 30 70, 32 28, 52 28 S 78 62, 104 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="12" cy="70" r="6" fill="var(--c-soft)" stroke="currentColor" strokeWidth="2" />
        <circle cx="52" cy="28" r="6" fill="var(--c-calm)" stroke="currentColor" strokeWidth="2" />
        <circle cx="104" cy="24" r="6" fill="var(--c-soft)" stroke="currentColor" strokeWidth="2" />
        <path d="M96 14 h14 v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icone === 'atelier') {
    return (
      <svg {...commun}>
        <rect x="16" y="14" width="88" height="62" rx="8" fill="var(--c-surface)" stroke="currentColor" strokeWidth="2" />
        <path d="M28 30 h34 M28 42 h48 M28 54 h26" stroke="var(--c-line)" strokeWidth="4" strokeLinecap="round" />
        <path d="M70 52 l8 8 l16 -20" fill="none" stroke="var(--c-ok)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icone === 'dossier') {
    return (
      <svg {...commun}>
        <path d="M14 22 h34 l8 10 h50 v44 a4 4 0 0 1 -4 4 h-88 a4 4 0 0 1 -4 -4 z" fill="var(--c-soft)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 48 h72 M24 60 h56 M24 72 h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <circle cx="90" cy="66" r="10" fill="var(--c-calm)" stroke="currentColor" strokeWidth="2" />
        <path d="M86 66 l3 3 l6 -7" fill="none" stroke="var(--c-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icone === 'sections') {
    return (
      <svg {...commun}>
        <rect x="10" y="18" width="46" height="56" rx="8" fill="var(--c-soft)" stroke="currentColor" strokeWidth="2" />
        <rect x="64" y="18" width="46" height="56" rx="8" fill="var(--c-calm)" stroke="currentColor" strokeWidth="2" />
        <path d="M33 32 v6 M33 46 v6 M33 60 v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M77 34 h20 M77 44 h20 M77 54 h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M87 26 l4 8 l8 2 l-8 3 l-4 8 l-3 -8 l-8 -3 l8 -2 z" fill="var(--c-surface)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...commun}>
      <rect x="14" y="16" width="92" height="60" rx="8" fill="var(--c-surface)" stroke="currentColor" strokeWidth="2" />
      <path d="M14 30 h92" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="23" r="2" fill="currentColor" />
      <circle cx="32" cy="23" r="2" fill="currentColor" />
      <rect x="38" y="42" width="44" height="22" rx="5" fill="var(--c-soft)" stroke="currentColor" strokeWidth="2" />
      <path d="M52 48 v-4 a8 8 0 0 1 16 0 v4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="60" cy="55" r="3" fill="currentColor" />
    </svg>
  );
}

export default function Onboarding({ onFermer }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const total = ONBOARDING_SLIDES.length;
  const slide = ONBOARDING_SLIDES[index] ?? ONBOARDING_SLIDES[0];

  useEffect(() => {
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');
    document.body.classList.add('onboarding-ouvert');
    panelRef.current?.focus();
    return () => {
      root?.removeAttribute('inert');
      document.body.classList.remove('onboarding-ouvert');
    };
  }, []);

  if (!slide) return null;

  const aller = (cible: number) => setIndex(Math.max(0, Math.min(total - 1, cible)));
  const suivant = () => aller(index + 1);
  const precedent = () => aller(index - 1);

  const surTouche = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onFermer();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      suivant();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      precedent();
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      aller(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      aller(total - 1);
      return;
    }
    if (e.key !== 'Tab') return;
    const elements = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLES) ?? []);
    const premier = elements[0];
    const dernier = elements[elements.length - 1];
    if (!premier || !dernier) {
      e.preventDefault();
      return;
    }
    if (e.shiftKey && (document.activeElement === premier || document.activeElement === panelRef.current)) {
      e.preventDefault();
      dernier.focus();
    } else if (!e.shiftKey && document.activeElement === dernier) {
      e.preventDefault();
      premier.focus();
    }
  };

  return createPortal(
    <div
      className="onboarding"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFermer();
      }}
    >
      <div
        className="onboarding-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-titre"
        ref={panelRef}
        tabIndex={-1}
        onKeyDown={surTouche}
      >
        <button type="button" className="onboarding-close" onClick={onFermer} aria-label="Fermer la présentation">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M6 6 l12 12 M18 6 l-12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="onboarding-body">
          <p className="onboarding-progress" aria-live="polite">Étape {index + 1} sur {total}</p>
          <div className="onboarding-slide" key={slide.id}>
            <Picto icone={slide.icone} />
            <div>
              <p className="onboarding-kicker">Visite du cours</p>
              <h2 id="onboarding-titre">{slide.titre}</h2>
              <p className="onboarding-texte">{slide.texte}</p>
              <ul className="onboarding-points">
                {slide.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="onboarding-footer">
          <button type="button" className="btn secondary mini" onClick={onFermer}>Passer</button>
          <div className="onboarding-dots" role="group" aria-label="Étapes de la présentation">
            {ONBOARDING_SLIDES.map((candidat, i) => (
              <button
                key={candidat.id}
                type="button"
                className="onboarding-dot"
                aria-label={`Aller à l’étape ${i + 1}`}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => aller(i)}
              />
            ))}
          </div>
          <div className="onboarding-actions">
            <button type="button" className="btn secondary mini" onClick={precedent} disabled={index === 0}>Précédent</button>
            {index < total - 1 ? (
              <button type="button" className="btn mini" onClick={suivant}>Suivant</button>
            ) : (
              <button type="button" className="btn mini" onClick={onFermer}>Terminer</button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

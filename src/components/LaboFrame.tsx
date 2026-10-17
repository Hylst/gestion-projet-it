import React from 'react';

const slug = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function LaboFrame(props: {
  titre: string;
  consigne: string;
  etapes: string[];
  etape: number;
  etat: string;
  onVerifier: () => void;
  onReinitialiser: () => void;
  valide: boolean;
  children: React.ReactNode;
}) {
  const id = `labo-${slug(props.titre)}`;
  return (
    <div className="labo card" aria-labelledby={id}>
      <div className="labo-head">
        <h3 id={id}>{props.titre}</h3>
        <p className="consigne">{props.consigne}</p>
      </div>
      <ol className="etapes">
        {props.etapes.map((e, i) => (
          <li
            key={i}
            aria-current={i + 1 === props.etape ? 'step' : undefined}
            className={i + 1 === props.etape ? 'courante' : ''}
          >
            {e}
          </li>
        ))}
      </ol>
      <div className="labo-body">{props.children}</div>
      <div className="labo-actions">
        <button type="button" className="btn" onClick={props.onVerifier}>
          {props.valide ? 'Reverifier' : 'Verifier'}
        </button>
        <button type="button" className="btn secondary" onClick={props.onReinitialiser}>Reinitialiser</button>
        <p className="sr-only" role="status" aria-live="polite">{props.etat}</p>
        {props.valide && <p className="ok" role="status">Labo valide : +5 XP (un seul gain).</p>}
      </div>
    </div>
  );
}

export default LaboFrame;

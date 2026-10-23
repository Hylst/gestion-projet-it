import { useEffect, useRef, useState } from 'react';
import {
  CRITERES,
  ETAPES,
  estDossierComplet,
  progressionDossier,
  type CritereId,
  type DossierProjetState,
  type NoteAutoEvaluation,
} from '../../lib/capstone';

interface CapstoneSummaryProps {
  state: DossierProjetState;
  onNote: (id: CritereId, note: NoteAutoEvaluation) => void;
  onRetour: () => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
}

const NIVEAUX: ReadonlyArray<{ note: NoteAutoEvaluation; label: string }> = [
  { note: 1, label: 'À reprendre' },
  { note: 2, label: 'Partiel' },
  { note: 3, label: 'Solide' },
  { note: 4, label: 'Abouti' },
];

export function CapstoneSummary({
  state,
  onNote,
  onRetour,
  onExport,
  onPrint,
  onReset,
}: CapstoneSummaryProps) {
  const [confirmerReset, setConfirmerReset] = useState(false);
  const annulerRef = useRef<HTMLButtonElement>(null);
  const complet = estDossierComplet(state);
  const progression = progressionDossier(state);
  const total = CRITERES.reduce((somme, critere) => somme + (state.autoEvaluation[critere.id] ?? 0), 0);

  useEffect(() => {
    if (confirmerReset) annulerRef.current?.focus();
  }, [confirmerReset]);

  return (
    <section className="capstone-summary" aria-labelledby="capstone-summary-titre">
      <h2 id="capstone-summary-titre">Synthèse du dossier</h2>
      <p className="capstone-summary__intro">
        Relis les réponses, vérifie les livrables et note ton dossier. L’auto-évaluation est indicative et ne remplace pas une correction.
      </p>
      {complet ? (
        <p className="capstone-badge" role="status">Dossier complet</p>
      ) : (
        <p className="capstone-summary__manque" role="status">
          {progression.etapes}/6 étapes, {progression.livrables}/12 livrables et {progression.criteres}/6 critères renseignés.
        </p>
      )}

      {ETAPES.map((etape, index) => (
        <section key={etape.id} className="capstone-summary__etape" aria-labelledby={`resume-${etape.id}`}>
          <h3 id={`resume-${etape.id}`}>{index + 1}. {etape.titre}</h3>
          <dl>
            {etape.champs.map((champ) => (
              <div key={champ.id}>
                <dt>{champ.label}</dt>
                <dd>{state.reponses[champ.id]?.trim() ? state.reponses[champ.id] : 'Non renseigné'}</dd>
              </div>
            ))}
          </dl>
          <ul className="capstone-summary__livrables">
            {etape.livrables.map((livrable) => (
              <li key={livrable.id}>
                <span aria-hidden="true">{state.livrables[livrable.id] ? '✓' : '○'}</span>{' '}
                {livrable.label}{' '}
                <span>{state.livrables[livrable.id] ? 'fait' : 'à faire'}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <fieldset className="capstone-summary__auto">
        <legend>Auto-évaluation</legend>
        <p>Total indicatif&nbsp;: <strong>{total}/24</strong>. Auto-évaluation indicative, sans valeur de certification.</p>
        {CRITERES.map((critere) => (
          <fieldset key={critere.id}>
            <legend>{critere.label}</legend>
            {NIVEAUX.map(({ note, label }) => (
              <label key={note}>
                <input
                  type="radio"
                  name={critere.id}
                  value={note}
                  checked={state.autoEvaluation[critere.id] === note}
                  onChange={() => onNote(critere.id, note)}
                />
                {note} {label}
              </label>
            ))}
          </fieldset>
        ))}
      </fieldset>

      <div className="capstone-summary__actions">
        <button type="button" className="btn secondary" onClick={onRetour}>Revenir aux étapes</button>
        <button type="button" className="btn secondary" onClick={onExport}>Exporter en JSON</button>
        <button type="button" className="btn secondary" onClick={onPrint}>Imprimer</button>
        {!confirmerReset ? (
          <button type="button" className="btn danger" onClick={() => setConfirmerReset(true)}>
            Réinitialiser le dossier
          </button>
        ) : (
          <div className="capstone-summary__confirmation" role="group" aria-label="Confirmation de réinitialisation">
            <p>Réinitialiser efface les réponses locales. Cette action est immédiate.</p>
            <button ref={annulerRef} type="button" className="btn secondary" onClick={() => setConfirmerReset(false)}>
              Annuler
            </button>
            <button type="button" className="btn danger" onClick={onReset}>
              Confirmer la réinitialisation
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

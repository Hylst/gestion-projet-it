// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';

export const ACTIONS_INCIDENT = [
  { id: 'detecter', label: 'Détecter et qualifier l’alerte' },
  { id: 'confiner', label: 'Confiner et révoquer les accès' },
  { id: 'preserver', label: 'Préserver les journaux et les preuves' },
  { id: 'decider', label: 'Décider et communiquer' },
  { id: 'restaurer', label: 'Restaurer et tester le service' },
  { id: 'apprendre', label: 'Tirer les leçons et planifier les actions' },
] as const;

export const ORDRE_INCIDENT: readonly string[] = ['detecter', 'confiner', 'preserver', 'decider', 'restaurer', 'apprendre'];

const LIBELLES = new Map<string, string>(ACTIONS_INCIDENT.map((action) => [action.id, action.label]));

const libelle = (id: string): string => LIBELLES.get(id) ?? id;

export const initialiserChronologie = (): string[] => ['confiner', 'detecter', 'decider', 'preserver', 'apprendre', 'restaurer'];

export function deplacerAction(ordre: string[], index: number, delta: -1 | 1): string[] {
  const cible = index + delta;
  if (index < 0 || index >= ordre.length || cible < 0 || cible >= ordre.length) return ordre;
  const copie = [...ordre];
  [copie[index], copie[cible]] = [copie[cible] as string, copie[index] as string];
  return copie;
}

export function verifierChronologie(ordre: string[]): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (let i = 0; i < ORDRE_INCIDENT.length; i += 1) {
    const attendu = ORDRE_INCIDENT[i] as string;
    const present = ordre[i];
    if (present !== attendu) {
      messages.push(`La position ${i + 1} devrait être «\u00A0${libelle(attendu)}\u00A0», pas «\u00A0${present ? libelle(present) : 'aucune action'}\u00A0».`);
      break;
    }
  }
  return { ok: messages.length === 0, messages };
}

export default function LaboTimelineIncident() {
  const [ordre, setOrdre] = useState<string[]>(initialiserChronologie);
  const [messages, setMessages] = useState<string[]>([]);
  const [valide, setValide] = useState(false);
  const [dernier, setDernier] = useState<string | null>(null);

  const deplacer = (index: number, delta: -1 | 1) => {
    const suivant = deplacerAction(ordre, index, delta);
    if (suivant === ordre) return;
    setOrdre(suivant);
    setMessages([]);
    setValide(false);
    const action = ordre[index];
    setDernier(action ? `«\u00A0${libelle(action)}\u00A0» déplacé.` : null);
  };

  const verifier = () => {
    const r = verifierChronologie(ordre);
    setMessages(r.messages);
    setValide(r.ok);
  };

  const reinitialiser = () => {
    setOrdre(initialiserChronologie());
    setMessages([]);
    setValide(false);
    setDernier(null);
  };

  const etape = valide ? 3 : dernier ? 2 : 1;
  const etat = dernier ?? 'Déplace les actions avec les boutons Monter et Descendre.';

  return (
    <LaboFrame
      titre={'Labo\u00A0: ordonner la réponse à incident'}
      consigne="Replace les six actions dans l’ordre de réponse, avec les boutons Monter et Descendre, puis vérifie."
      etapes={[
        'Six actions de réponse à incident, affichées dans un ordre mélangé.',
        'Déplacer une action avec Monter ou Descendre, au clavier ou à la souris.',
        'Vérifier\u00A0: la première position divergente est signalée.',
        'Validation quand l’ordre détecter, confiner, préserver, décider, restaurer, apprendre est respecté.',
      ]}
      etape={etape}
      etat={etat}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={valide}
      sansXp
      messageValide="La chronologie respecte l’ordre détecter, confiner, préserver, décider, restaurer, apprendre."
    >
      <ol className="cyber-timeline">
        {ordre.map((id, i) => {
          const action = ACTIONS_INCIDENT.find((candidat) => candidat.id === id);
          if (!action) return null;
          return (
            <li key={id}>
              <span className="rang" aria-hidden="true">{i + 1}.</span>
              <span>{action.label}</span>
              <button
                type="button"
                className="btn mini"
                aria-label={`Monter ${action.label}`}
                disabled={i === 0}
                onClick={() => deplacer(i, -1)}
              >
                Monter
              </button>
              <button
                type="button"
                className="btn mini"
                aria-label={`Descendre ${action.label}`}
                disabled={i === ordre.length - 1}
                onClick={() => deplacer(i, 1)}
              >
                Descendre
              </button>
            </li>
          );
        })}
      </ol>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((message) => <li key={message} className="err">{message}</li>)}
        </ul>
      )}
    </LaboFrame>
  );
}

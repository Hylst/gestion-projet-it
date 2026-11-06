// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRef, useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';

export const DROITS_ACCES = ['Lecture seule', 'Édition du contenu', 'Édition temporaire', 'Administration'] as const;
export type DroitAcces = (typeof DROITS_ACCES)[number];

export interface RoleAcces {
  id: string;
  role: string;
  besoin: string;
  droit: DroitAcces;
}

export const ROLES_ACCES: readonly RoleAcces[] = [
  { id: 'benevole', role: 'Bénévole', besoin: 'Mettre à jour les textes du site', droit: 'Édition du contenu' },
  { id: 'chef', role: 'Chef de projet', besoin: 'Publier et administrer le site', droit: 'Administration' },
  { id: 'prestataire', role: 'Prestataire', besoin: 'Corriger une page pendant une mission', droit: 'Édition temporaire' },
  { id: 'bureau', role: 'Bureau', besoin: 'Lire les adhésions pour valider les comptes', droit: 'Lecture seule' },
];

export type AccesState = Record<string, DroitAcces>;

export const initialiserAcces = (): AccesState => ({});

export function attribuerDroit(s: AccesState, role: string, droit: DroitAcces): AccesState {
  return { ...s, [role]: droit };
}

export function verifierAcces(s: AccesState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const role of ROLES_ACCES) {
    const droit = s[role.id];
    if (droit === undefined) {
      messages.push(`«\u00A0${role.role}\u00A0» n’a pas encore de droit. Besoin\u00A0: ${role.besoin}.`);
    } else if (droit !== role.droit) {
      messages.push(`Le droit «\u00A0${droit}\u00A0» attribué à «\u00A0${role.role}\u00A0» n’est pas le droit minimal. Besoin\u00A0: ${role.besoin}. Droit attendu\u00A0: ${role.droit}.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

export default function LaboMatriceAcces() {
  const [s, setS] = useState<AccesState>(initialiserAcces);
  const [selection, setSelection] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [valide, setValide] = useState(false);
  const [dernier, setDernier] = useState<{ role: string; droit: DroitAcces } | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const nb = ROLES_ACCES.length;
  const focus = Math.min(focusIdx, nb - 1);
  const nbAttribues = Object.keys(s).length;
  const roleSelectionne = ROLES_ACCES.find((role) => role.id === selection);

  const deplacerFocus = (delta: number) => {
    const suivant = (focus + delta + nb) % nb;
    setFocusIdx(suivant);
    refs.current[suivant]?.focus();
  };

  const choisir = (role: string) => {
    setSelection(role);
    setMessages([]);
  };

  const attribuer = (droit: DroitAcces) => {
    if (!selection) return;
    const role = ROLES_ACCES.find((candidat) => candidat.id === selection);
    if (!role) return;
    const idx = ROLES_ACCES.findIndex((candidat) => candidat.id === selection);
    setS((precedent) => attribuerDroit(precedent, selection, droit));
    setDernier({ role: role.role, droit });
    setSelection(null);
    setMessages([]);
    setValide(false);
    refs.current[idx]?.focus();
  };

  const verifier = () => {
    const r = verifierAcces(s);
    setMessages(r.messages);
    setValide(r.ok);
  };

  const reinitialiser = () => {
    setS(initialiserAcces());
    setSelection(null);
    setMessages([]);
    setValide(false);
    setDernier(null);
    setFocusIdx(0);
  };

  const etape = valide ? 4 : nbAttribues > 0 ? 3 : selection ? 2 : 1;
  const etat = dernier
    ? `«\u00A0${dernier.role}\u00A0» reçoit le droit «\u00A0${dernier.droit}\u00A0».`
    : roleSelectionne
      ? `«\u00A0${roleSelectionne.role}\u00A0» sélectionné. Choisis un droit.`
      : `${nbAttribues} rôle(s) sur ${ROLES_ACCES.length} avec un droit attribué.`;

  return (
    <LaboFrame
      titre={'Labo\u00A0: attribuer le droit minimal'}
      consigne="Sélectionne un rôle, choisis le droit minimal qui lui suffit, puis vérifie."
      etapes={[
        'Quatre rôles fictifs et quatre niveaux de droit.',
        'Sélectionner un rôle dans la liste, puis un droit.',
        'Vérifier\u00A0: chaque rôle sans droit ou trop large reçoit un message.',
        'Validation quand les quatre droits minimaux sont attribués.',
      ]}
      etape={etape}
      etat={etat}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={valide}
      sansXp
      messageValide="Chaque rôle a le droit minimal nécessaire."
    >
      <h4 id="acces-roles-t">Rôles à équiper</h4>
      <div
        className="wbs-cards"
        role="listbox"
        aria-labelledby="acces-roles-t"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); deplacerFocus(1); }
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); deplacerFocus(-1); }
        }}
      >
        {ROLES_ACCES.map((role, i) => (
          <button
            key={role.id}
            type="button"
            role="option"
            aria-selected={selection === role.id}
            className={`wbs-card${selection === role.id ? ' tiree' : ''}`}
            ref={(el) => { refs.current[i] = el; }}
            tabIndex={i === focus ? 0 : -1}
            onFocus={() => setFocusIdx(i)}
            onClick={() => choisir(role.id)}
          >
            {role.role}{s[role.id] ? ` (${s[role.id]})` : ''}
            <span className="motif"> {role.besoin}</span>
          </button>
        ))}
      </div>
      <p className="help">
        {roleSelectionne
          ? `«\u00A0${roleSelectionne.role}\u00A0» sélectionné. Choisis un droit parmi les quatre propositions.`
          : 'Sélectionne un rôle, puis le droit qui lui suffit.'}
      </p>
      <h4 id="acces-droits-t">Droits disponibles</h4>
      <div className="risques-options" role="group" aria-labelledby="acces-droits-t">
        {DROITS_ACCES.map((droit) => (
          <button
            key={droit}
            type="button"
            className="btn secondary"
            disabled={!roleSelectionne}
            aria-label={roleSelectionne ? `Attribuer ${droit} à ${roleSelectionne.role}` : `Attribuer ${droit}`}
            onClick={() => attribuer(droit)}
          >
            {droit}
          </button>
        ))}
      </div>
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((message) => <li key={message} className="err">{message}</li>)}
        </ul>
      )}
    </LaboFrame>
  );
}

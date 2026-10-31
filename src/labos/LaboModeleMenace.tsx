// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useState } from 'react';
import { LaboFrame } from '../components/LaboFrame';

export interface OptionMenace {
  valeur: string;
  motif: string;
}

export interface ScenarioMenace {
  id: string;
  recit: string;
  menace: string;
  parade: string;
  options: readonly OptionMenace[];
}

export const SCENARIOS: readonly ScenarioMenace[] = [
  {
    id: 'phishing',
    recit: 'Un courriel demande au bureau de saisir son mot de passe pour consulter une facture.',
    menace: 'Hameçonnage',
    parade: 'MFA et signalement du message',
    options: [
      { valeur: 'Répondre au courriel pour vérifier', motif: 'La réponse confirme l’adresse et prolonge l’échange avec l’attaquant.' },
      { valeur: 'MFA et signalement du message', motif: 'La MFA limite l’effet d’un mot de passe volé et le signalement prévient les autres.' },
      { valeur: 'Désactiver la MFA pour aller plus vite', motif: 'Le confort immédiat augmente fortement le risque de prise de contrôle.' },
    ],
  },
  {
    id: 'ancien-acces',
    recit: 'Un ancien prestataire garde un accès au site après la fin de sa mission.',
    menace: 'Accès oublié',
    parade: 'Révoquer le compte et revoir les accès',
    options: [
      { valeur: 'Changer seulement le mot de passe du bureau', motif: 'Le compte de l’ancien prestataire reste actif avec ses droits.' },
      { valeur: 'Attendre la prochaine revue annuelle', motif: 'L’accès reste ouvert plusieurs mois sans justification.' },
      { valeur: 'Révoquer le compte et revoir les accès', motif: 'Le compte disparaît et la revue vérifie les autres accès de la même période.' },
    ],
  },
  {
    id: 'dependance',
    recit: 'Une bibliothèque du site n’est plus mise à jour depuis un an.',
    menace: 'Dépendance vulnérable',
    parade: 'Auditer et mettre à jour la bibliothèque',
    options: [
      { valeur: 'Cacher la version dans le code', motif: 'Masquer la version ne corrige pas la faille et complique le diagnostic.' },
      { valeur: 'Auditer et mettre à jour la bibliothèque', motif: 'L’audit identifie les avis connus et la mise à jour ferme le chemin d’attaque.' },
      { valeur: 'Désactiver les mises à jour', motif: 'La bibliothèque reste figée sur une version potentiellement vulnérable.' },
    ],
  },
  {
    id: 'sauvegarde',
    recit: 'La seule sauvegarde du site est stockée sur le même serveur.',
    menace: 'Perte de service',
    parade: 'Copie hors ligne et restauration testée',
    options: [
      { valeur: 'Ajouter une seconde copie sur le même serveur', motif: 'Les deux copies disparaissent avec le même serveur.' },
      { valeur: 'Compter sur le fournisseur', motif: 'Le fournisseur ne garantit pas la restitution de vos données dans votre délai.' },
      { valeur: 'Copie hors ligne et restauration testée', motif: 'La copie survit à la panne et le test prouve qu’elle est utilisable.' },
    ],
  },
  {
    id: 'fichier',
    recit: 'Un bénévole envoie un fichier d’adhérents à la mauvaise adresse.',
    menace: 'Erreur humaine',
    parade: 'Minimiser les données et vérifier le destinataire',
    options: [
      { valeur: 'Renvoyer le fichier pour corriger', motif: 'Le fichier circule à nouveau et expose les données une seconde fois.' },
      { valeur: 'Minimiser les données et vérifier le destinataire', motif: 'Le fichier contient moins de données et le contrôle du destinataire réduit l’erreur.' },
      { valeur: 'Supprimer la boîte du bénévole', motif: 'La suppression ne récupère pas le fichier déjà envoyé.' },
    ],
  },
];

export type ModeleState = Record<string, string>;

export const initialiserModele = (): ModeleState => ({});

export function choisirParade(s: ModeleState, scenario: string, parade: string): ModeleState {
  return { ...s, [scenario]: parade };
}

export function verifierModele(s: ModeleState): { ok: boolean; messages: string[] } {
  const messages: string[] = [];
  for (const scenario of SCENARIOS) {
    const choix = s[scenario.id];
    if (choix === undefined) {
      messages.push(`«\u00A0${scenario.recit}\u00A0» n’a pas encore de parade. Menace\u00A0: ${scenario.menace}.`);
    } else if (choix !== scenario.parade) {
      messages.push(`La parade choisie pour «\u00A0${scenario.recit}\u00A0» ne couvre pas la menace «\u00A0${scenario.menace}\u00A0». Relis les options.`);
    }
  }
  return { ok: messages.length === 0, messages };
}

export default function LaboModeleMenace() {
  const [s, setS] = useState<ModeleState>(initialiserModele);
  const [messages, setMessages] = useState<string[]>([]);
  const [valide, setValide] = useState(false);
  const nbChoisis = Object.keys(s).length;

  const choisir = (scenario: string, parade: string) => {
    setS((precedent) => choisirParade(precedent, scenario, parade));
    setMessages([]);
    setValide(false);
  };

  const verifier = () => {
    const r = verifierModele(s);
    setMessages(r.messages);
    setValide(r.ok);
  };

  const reinitialiser = () => {
    setS(initialiserModele());
    setMessages([]);
    setValide(false);
  };

  const etape = valide ? 4 : nbChoisis === SCENARIOS.length ? 3 : nbChoisis > 0 ? 2 : 1;
  const etat = `${nbChoisis === 1 ? '1 scénario' : `${nbChoisis} scénarios`} sur ${SCENARIOS.length} avec une parade choisie.`;

  return (
    <LaboFrame
      titre={'Labo\u00A0: associer menaces et parades'}
      consigne="Choisis une parade proportionnée pour chacun des cinq scénarios fictifs, puis vérifie."
      etapes={[
        'Cinq scénarios fictifs, chacun avec une menace et trois parades possibles.',
        'Choisir une seule parade par scénario, à la souris ou au clavier.',
        'Vérifier\u00A0: chaque scénario sans choix ou mal couvert reçoit un message.',
        'Validation quand les cinq parades sont proportionnées.',
      ]}
      etape={etape}
      etat={etat}
      onVerifier={verifier}
      onReinitialiser={reinitialiser}
      valide={valide}
      sansXp
      messageValide="Les cinq scénarios ont une parade proportionnée."
    >
      {SCENARIOS.map((scenario) => (
        <fieldset key={scenario.id} className="risques-parade">
          <legend>{scenario.recit}</legend>
          <p className="compteur">Menace&nbsp;: {scenario.menace}</p>
          <div className="risques-options">
            {scenario.options.map((option) => (
              <label key={option.valeur}>
                <input
                  type="radio"
                  name={`scenario-${scenario.id}`}
                  value={option.valeur}
                  checked={s[scenario.id] === option.valeur}
                  onChange={() => choisir(scenario.id, option.valeur)}
                />
                <span>
                  {option.valeur}
                  {s[scenario.id] === option.valeur && <span className="motif"> {option.motif}</span>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      {messages.length > 0 && (
        <ul className="messages" role="alert">
          {messages.map((message) => <li key={message} className="err">{message}</li>)}
        </ul>
      )}
    </LaboFrame>
  );
}

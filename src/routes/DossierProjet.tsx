// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useCallback, useEffect, useRef, useState } from 'react';
import { SeoHead } from '../components/SeoHead';
import { CapstoneStepper } from '../components/capstone/CapstoneStepper';
import { CapstoneStep } from '../components/capstone/CapstoneStep';
import { CapstoneSummary } from '../components/capstone/CapstoneSummary';
import {
  ETAPES,
  etatInitialDossier,
  estEtapeComplete,
  type CritereId,
  type DossierProjetState,
  type NoteAutoEvaluation,
} from '../lib/capstone';
import {
  chargerDossier,
  exporterDossier,
  sauvegarderDossier,
  stockageDisponible,
} from '../lib/capstoneStorage';
import '../styles/capstone.css';

type Vue = 'parcours' | 'synthese';

const MESSAGE_INDISPONIBLE =
  'La sauvegarde locale est indisponible. Le dossier reste utilisable dans cet onglet, mais sera perdu à la fermeture.';

export default function DossierProjet() {
  const [initial] = useState(() => chargerDossier());
  const [state, setState] = useState<DossierProjetState>(initial.etat);
  const [vue, setVue] = useState<Vue>('parcours');
  const [message, setMessage] = useState<string | null>(() => {
    if (!stockageDisponible()) return MESSAGE_INDISPONIBLE;
    if (initial.avertissement === 'corrompu') {
      return 'Le dossier enregistré est illisible. Un nouveau dossier vide a été ouvert.';
    }
    return null;
  });
  const [statut, setStatut] = useState<string | null>(null);
  const premierRendu = useRef(true);

  const enregistrer = useCallback((dossier: DossierProjetState) => {
    const erreur = sauvegarderDossier(dossier);
    setMessage(erreur);
    setStatut(erreur ? null : 'Enregistré localement');
  }, []);

  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false;
      return;
    }
    const minuterie = window.setTimeout(() => enregistrer(state), 300);
    return () => window.clearTimeout(minuterie);
  }, [state, enregistrer]);

  const index = Math.min(Math.max(state.etapeCourante, 0), ETAPES.length - 1);
  const etape = ETAPES[index];
  if (!etape) return null;

  const allerEtape = (nouvelIndex: number) => {
    const suivant = { ...state, etapeCourante: nouvelIndex };
    setState(suivant);
    enregistrer(suivant);
  };

  const repondre = (id: string, valeur: string) => {
    setState((precedent) => ({
      ...precedent,
      reponses: { ...precedent.reponses, [id]: valeur },
    }));
  };

  const cocherLivrable = (id: string, coche: boolean) => {
    setState((precedent) => ({
      ...precedent,
      livrables: { ...precedent.livrables, [id]: coche },
    }));
  };

  const noter = (id: CritereId, note: NoteAutoEvaluation) => {
    setState((precedent) => ({
      ...precedent,
      autoEvaluation: { ...precedent.autoEvaluation, [id]: note },
    }));
  };

  const exporter = () => {
    enregistrer(state);
    const blob = new Blob([exporterDossier(state)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = 'gestion-projet-it-dossier-projet.json';
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    window.URL.revokeObjectURL(url);
  };

  const imprimer = () => {
    enregistrer(state);
    window.print();
  };

  const reinitialiser = () => {
    const vide = etatInitialDossier();
    setState(vide);
    setVue('parcours');
    enregistrer(vide);
  };

  return (
    <>
      <SeoHead
        title="Dossier projet"
        description={'Construire un dossier de projet complet sur le cas fictif Les Amis du Square\u00A0: cadrage, planning, qualité, gouvernance, risques, changement.'}
      />
      <div className="capstone-page">
        <div className="capstone-hero">
          <p className="kicker">Capstone</p>
          <h1>Dossier projet</h1>
          <p>
            Construis un dossier complet pour Les Amis du Square, une association fictive. Les six étapes suivent le cours, sans remplacer une expérience réelle.
          </p>
          <p className="capstone-hero__note">
            Progression enregistrée dans ce navigateur. Aucun compte, aucun envoi de données.
          </p>
        </div>

        {message && <p className="capstone-alerte" role="alert">{message}</p>}
        {statut && <p className="capstone-statut" role="status">{statut}</p>}

        {vue === 'parcours' ? (
          <div className="capstone-layout">
            <CapstoneStepper
              etapes={ETAPES}
              etapeCourante={index}
              complete={(id) => estEtapeComplete(state, id)}
              onSelect={allerEtape}
            />
            <CapstoneStep
              etape={etape}
              index={index}
              total={ETAPES.length}
              state={state}
              onReponse={repondre}
              onLivrable={cocherLivrable}
              onPrecedent={() => allerEtape(Math.max(index - 1, 0))}
              onSuivant={() => allerEtape(Math.min(index + 1, ETAPES.length - 1))}
              onVoirSynthese={() => {
                enregistrer(state);
                setVue('synthese');
              }}
            />
          </div>
        ) : (
          <CapstoneSummary
            state={state}
            onNote={noter}
            onRetour={() => setVue('parcours')}
            onExport={exporter}
            onPrint={imprimer}
            onReset={reinitialiser}
          />
        )}
      </div>
    </>
  );
}

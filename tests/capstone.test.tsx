// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DossierProjet from '../src/routes/DossierProjet';
import { DOSSIER_STORAGE_KEY } from '../src/lib/capstoneStorage';
import {
  CRITERES,
  ETAPES,
  etatInitialDossier,
  type CritereId,
  type DossierProjetState,
  type NoteAutoEvaluation,
} from '../src/lib/capstone';
import { CapstoneField } from '../src/components/capstone/CapstoneField';
import { CapstoneStepper } from '../src/components/capstone/CapstoneStepper';
import { CapstoneStep } from '../src/components/capstone/CapstoneStep';
import { CapstoneSummary } from '../src/components/capstone/CapstoneSummary';

afterEach(cleanup);

function ChampControle({ onChange }: { onChange: (valeur: string) => void }) {
  const [valeur, setValeur] = useState('');
  return (
    <CapstoneField
      champ={{ id: 'cadrage-besoin', label: 'Besoin', aide: 'Décris le besoin.' }}
      valeur={valeur}
      onChange={(suivante) => {
        setValeur(suivante);
        onChange(suivante);
      }}
    />
  );
}

const etatVide: DossierProjetState = {
  version: 1,
  reponses: {},
  livrables: {},
  autoEvaluation: {},
  etapeCourante: 0,
  updatedAt: '2026-10-21T10:00:00.000Z',
};

function EtapeControlee() {
  const [index, setIndex] = useState(0);
  const etape = ETAPES[index];
  if (!etape) throw new Error('Étape absente');
  return (
    <CapstoneStep
      etape={etape}
      index={index}
      total={ETAPES.length}
      state={etatVide}
      onReponse={() => undefined}
      onLivrable={() => undefined}
      onPrecedent={() => setIndex((courant) => Math.max(0, courant - 1))}
      onSuivant={() => setIndex((courant) => Math.min(ETAPES.length - 1, courant + 1))}
      onVoirSynthese={() => undefined}
    />
  );
}

describe('CapstoneField', () => {
  it('associe le label, l’aide et le compteur au champ', () => {
    const onChange = vi.fn();
    render(<ChampControle onChange={onChange} />);
    const champ = screen.getByRole('textbox', { name: 'Besoin', description: 'Décris le besoin.' });
    fireEvent.change(champ, { target: { value: 'Un besoin' } });
    expect(onChange).toHaveBeenCalledWith('Un besoin');
    const compteur = screen.getByText('9/600');
    expect(compteur).toBeTruthy();
  });

  it('affiche une erreur explicite et l’associe au champ', () => {
    render(
      <CapstoneField
        champ={{ id: 'cadrage-besoin', label: 'Besoin', aide: 'Décris le besoin.' }}
        valeur=""
        onChange={() => undefined}
        erreur="Ce champ est obligatoire."
      />,
    );
    const alerte = screen.getByRole('alert');
    expect(alerte.textContent).toContain('Ce champ est obligatoire.');
    const champ = screen.getByRole('textbox', { name: 'Besoin' });
    expect(champ.getAttribute('aria-invalid')).toBe('true');
    expect(champ.getAttribute('aria-describedby')).toContain(alerte.id);
  });
});

describe('CapstoneStepper', () => {
  it('rend six étapes et marque l’étape courante', () => {
    const onSelect = vi.fn();
    render(
      <CapstoneStepper
        etapes={ETAPES}
        etapeCourante={0}
        complete={(id) => id === 'cadrage'}
        onSelect={onSelect}
      />,
    );
    expect(screen.getAllByRole('button')).toHaveLength(6);
    const courante = screen.getByRole('button', { name: /Cadrer et découper/ });
    expect(courante.getAttribute('aria-current')).toBe('step');
    expect(screen.getByText('Terminée')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Planifier et chiffrer/ }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});

describe('CapstoneStep', () => {
  it('transmet les réponses et les livrables', () => {
    const onReponse = vi.fn();
    const onLivrable = vi.fn();
    const etape = ETAPES[0];
    if (!etape) throw new Error('Étape absente');
    render(
      <CapstoneStep
        etape={etape}
        index={0}
        total={6}
        state={{
          version: 1,
          reponses: {},
          livrables: {},
          autoEvaluation: {},
          etapeCourante: 0,
          updatedAt: '2026-10-21T10:00:00.000Z',
        }}
        onReponse={onReponse}
        onLivrable={onLivrable}
        onPrecedent={() => undefined}
        onSuivant={() => undefined}
        onVoirSynthese={() => undefined}
      />,
    );
    const champ = screen.getByRole('textbox', { name: 'Besoin' });
    fireEvent.change(champ, { target: { value: 'x' } });
    expect(onReponse).toHaveBeenCalledWith('cadrage-besoin', 'x');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Note de cadrage' }));
    expect(onLivrable).toHaveBeenCalledWith('cadrage-note', true);
  });

  it('place le focus sur le titre de l’étape affichée puis après un changement', () => {
    render(<EtapeControlee />);
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { name: 'Cadrer et découper' }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Étape suivante' }));
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { name: 'Planifier et chiffrer' }),
    );
  });
});

const dossierRempli = (): DossierProjetState => {
  const etat = etatInitialDossier();
  for (const etape of ETAPES) {
    for (const champ of etape.champs) etat.reponses[champ.id] = 'Réponse fictive.';
    for (const livrable of etape.livrables) etat.livrables[livrable.id] = true;
  }
  for (const critere of CRITERES) etat.autoEvaluation[critere.id] = 3;
  return etat;
};

function Synthese({
  etat,
  onNote = () => undefined,
  onRetour = () => undefined,
  onExport = () => undefined,
  onPrint = () => undefined,
  onReset = () => undefined,
}: {
  etat: DossierProjetState;
  onNote?: (id: CritereId, note: NoteAutoEvaluation) => void;
  onRetour?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onReset?: () => void;
}) {
  return (
    <CapstoneSummary
      state={etat}
      onNote={onNote}
      onRetour={onRetour}
      onExport={onExport}
      onPrint={onPrint}
      onReset={onReset}
    />
  );
}

describe('CapstoneSummary', () => {
  it('affiche le total indicatif et le badge quand tout est rempli', () => {
    render(<Synthese etat={dossierRempli()} />);
    expect(screen.getByRole('heading', { name: 'Synthèse du dossier' })).toBeTruthy();
    expect(screen.getByText('18/24')).toBeTruthy();
    expect(screen.getByText('Dossier complet')).toBeTruthy();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(6);
  });

  it('n’affiche pas le badge si un champ manque', () => {
    const etat = dossierRempli();
    delete etat.reponses[ETAPES[0]?.champs[0]?.id ?? 'cadrage-besoin'];
    render(<Synthese etat={etat} />);
    expect(screen.queryByText('Dossier complet')).toBeNull();
    expect(screen.getAllByText('Non renseigné').length).toBeGreaterThan(0);
  });

  it('n’affiche pas le badge si un livrable manque', () => {
    const etat = dossierRempli();
    const livrable = ETAPES[0]?.livrables[0];
    if (!livrable) throw new Error('Livrable absent');
    etat.livrables[livrable.id] = false;
    render(<Synthese etat={etat} />);
    expect(screen.queryByText('Dossier complet')).toBeNull();
  });

  it('ne compte que les critères notés dans le total', () => {
    const etat = dossierRempli();
    const premier = CRITERES[0];
    if (!premier) throw new Error('Critère absent');
    for (const critere of CRITERES) delete etat.autoEvaluation[critere.id];
    etat.autoEvaluation[premier.id] = 4;
    render(<Synthese etat={etat} />);
    expect(screen.getByText('4/24')).toBeTruthy();
    expect(screen.queryByText('Dossier complet')).toBeNull();
  });

  it('transmet les notes et les actions', () => {
    const onNote = vi.fn();
    const onExport = vi.fn();
    const onPrint = vi.fn();
    const onRetour = vi.fn();
    render(
      <Synthese
        etat={dossierRempli()}
        onNote={onNote}
        onRetour={onRetour}
        onExport={onExport}
        onPrint={onPrint}
      />,
    );
    fireEvent.click(screen.getAllByLabelText('4 Abouti')[0] as HTMLElement);
    expect(onNote).toHaveBeenCalledWith(CRITERES[0]?.id, 4);
    fireEvent.click(screen.getByRole('button', { name: 'Exporter en JSON' }));
    expect(onExport).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Imprimer' }));
    expect(onPrint).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole('button', { name: 'Revenir aux étapes' }));
    expect(onRetour).toHaveBeenCalledOnce();
  });

  it('demande une confirmation en deux temps pour réinitialiser', () => {
    const onReset = vi.fn();
    render(<Synthese etat={dossierRempli()} onReset={onReset} />);
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser le dossier' }));
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Annuler' }));
    expect(onReset).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Confirmer la réinitialisation' }));
    expect(onReset).toHaveBeenCalledOnce();
  });
});

const rendreRoute = () =>
  render(
    <MemoryRouter>
      <DossierProjet />
    </MemoryRouter>,
  );

const champBesoin = () => screen.getByLabelText('Besoin') as HTMLTextAreaElement;

describe('route Dossier projet', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('affiche le parcours et sauvegarde après 300 ms', () => {
    rendreRoute();
    expect(screen.getByRole('heading', { name: 'Dossier projet' })).toBeTruthy();
    fireEvent.change(champBesoin(), { target: { value: 'Besoin fictif' } });
    expect(localStorage.getItem(DOSSIER_STORAGE_KEY)).toBeNull();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(localStorage.getItem(DOSSIER_STORAGE_KEY)).toContain('Besoin fictif');
  });

  it('reprend un dossier enregistré', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'Besoin repris';
    etat.etapeCourante = 0;
    localStorage.setItem(DOSSIER_STORAGE_KEY, JSON.stringify(etat));
    rendreRoute();
    expect(champBesoin().value).toBe('Besoin repris');
  });

  it('signale un dossier corrompu sans bloquer', () => {
    localStorage.setItem(DOSSIER_STORAGE_KEY, '{');
    rendreRoute();
    expect(screen.getByRole('alert').textContent).toContain('illisible');
    expect(champBesoin().value).toBe('');
  });

  it('conserve la saisie et affiche le message prévu si la sauvegarde échoue', () => {
    rendreRoute();
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota dépassé', 'QuotaExceededError');
    });
    try {
      fireEvent.change(champBesoin(), { target: { value: 'À conserver' } });
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByRole('alert').textContent).toBe(
        'La sauvegarde locale a échoué\u00A0: exporte le dossier pour ne pas perdre ta progression.',
      );
      expect(champBesoin().value).toBe('À conserver');
    } finally {
      setItem.mockRestore();
    }
  });

  it('navigue vers la synthèse et revient aux étapes', () => {
    rendreRoute();
    fireEvent.click(screen.getByRole('button', { name: /Conduire le changement/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Voir la synthèse' }));
    expect(screen.getByRole('heading', { name: 'Synthèse du dossier' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Revenir aux étapes' }));
    expect(screen.getByRole('button', { name: 'Voir la synthèse' })).toBeTruthy();
  });

  it('force la sauvegarde au changement d’étape', () => {
    rendreRoute();
    fireEvent.change(champBesoin(), { target: { value: 'Avant de changer' } });
    fireEvent.click(screen.getByRole('button', { name: 'Étape suivante' }));
    const enregistre = localStorage.getItem(DOSSIER_STORAGE_KEY) ?? '';
    expect(enregistre).toContain('Avant de changer');
    expect(enregistre).toContain('"etapeCourante":1');
  });

  it('réinitialise le dossier après confirmation', () => {
    const etat = etatInitialDossier();
    etat.reponses['cadrage-besoin'] = 'À effacer';
    localStorage.setItem(DOSSIER_STORAGE_KEY, JSON.stringify(etat));
    rendreRoute();
    fireEvent.click(screen.getByRole('button', { name: /Conduire le changement/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Voir la synthèse' }));
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser le dossier' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmer la réinitialisation' }));
    expect(screen.getByRole('button', { name: 'Étape suivante' })).toBeTruthy();
    expect(champBesoin().value).toBe('');
    const enregistre = localStorage.getItem(DOSSIER_STORAGE_KEY) ?? '';
    expect(enregistre).not.toContain('À effacer');
  });
});

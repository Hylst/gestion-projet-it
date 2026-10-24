// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProgressProvider } from '../src/lib/progress';
import { QuizBlock } from '../src/components/QuizBlock';
import type { QuizData } from '../src/components/QuizBlock';
import { ExerciseBlock } from '../src/components/ExerciseBlock';
import { FicheReflexe } from '../src/components/FicheReflexe';
import { ModuleEnd } from '../src/components/ModuleEnd';

afterEach(cleanup);

const quizData: QuizData = {
  id: 'q-unit',
  questions: [1, 2, 3].map((n) => ({
    question: `Qu ${n}`,
    choix: ['Bonne', 'Fausse a', 'Fausse b'] as [string, string, string],
    bonne: 0 as 0 | 1 | 2,
    motif: `M ${n}`,
  })),
};

const quiz5: QuizData = {
  id: 'q-unit-5',
  questions: [1, 2, 3, 4, 5].map((n) => ({
    question: `Qu ${n}`,
    choix: ['Bonne', 'Fausse a', 'Fausse b'] as [string, string, string],
    bonne: 0 as 0 | 1 | 2,
    motif: `M ${n}`,
  })),
};

describe('QuizBlock', () => {
  it('accorde XP quand 2 sur 3, pas deux fois', () => {
    localStorage.clear();
    render(<ProgressProvider><MemoryRouter><QuizBlock data={quizData} /></MemoryRouter></ProgressProvider>);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[0] as HTMLElement);
    expect(screen.getByText(/Correct/)).toBeTruthy();
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[1] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[2] as HTMLElement);
    const res = screen.getByRole('status');
    expect(res.textContent).toMatch(/2 sur 3/);
    expect(res.textContent).toMatch(/10 XP/);
    fireEvent.click(screen.getByRole('button', { name: /Recommencer sans XP/ }));
    expect((screen.getAllByRole('radio', { name: 'Fausse a' })[0] as HTMLInputElement).disabled).toBe(false);
  });

  it('accorde XP des 4 sur 5, pas 3 sur 5', () => {
    localStorage.clear();
    render(<ProgressProvider><MemoryRouter><QuizBlock data={quiz5} /></MemoryRouter></ProgressProvider>);
    expect(screen.getByRole('heading', { name: /Quiz courant \(5 questions\)/ })).toBeTruthy();
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[0] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[1] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[2] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[3] as HTMLElement);
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[4] as HTMLElement);
    const sansGain = screen.getByRole('status');
    expect(sansGain.textContent).toMatch(/3 sur 5/);
    expect(sansGain.textContent).not.toMatch(/10 XP/);
    fireEvent.click(screen.getByRole('button', { name: /Recommencer sans XP/ }));
    for (const i of [0, 1, 2, 3]) {
      fireEvent.click(screen.getAllByRole('radio', { name: 'Bonne' })[i] as HTMLElement);
    }
    fireEvent.click(screen.getAllByRole('radio', { name: 'Fausse a' })[4] as HTMLElement);
    const avecGain = screen.getByRole('status');
    expect(avecGain.textContent).toMatch(/4 sur 5/);
    expect(avecGain.textContent).toMatch(/10 XP/);
  });
});

describe('FicheReflexe', () => {
  it('rend 5 items et un bouton imprimer accessible', () => {
    render(<FicheReflexe titre="Fiche M1" items={['a', 'b', 'c', 'd', 'e']} />);
    expect(within(screen.getByTestId('fiche-reflexe')).getAllByRole('listitem').length).toBe(5);
    expect(screen.getByRole('button', { name: /Imprimer/ })).toBeTruthy();
  });
});

describe('ExerciseBlock', () => {
  it('corrige masque puis visible via details', () => {
    const { container } = render(
      <ExerciseBlock id="ex1" titre="T1" enonce={<p>Enonce</p>} corrige={<p>Corrige de l enonce</p>} methode={['etape 1']} />,
    );
    const det = container.querySelector('details') as HTMLDetailsElement;
    expect(det.hasAttribute('open')).toBe(false);
    fireEvent.click(det.querySelector('summary') as HTMLElement);
    expect(screen.getByText(/Corrige de l enonce/)).toBeTruthy();
  });
});

describe('ModuleEnd', () => {
  it('bouton termine accorde une fois le badge', () => {
    localStorage.clear();
    render(<ProgressProvider><MemoryRouter><ModuleEnd id="m1-wbs" /></MemoryRouter></ProgressProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Marquer le module/ }));
    expect(screen.getByText(/Badge/)).toBeTruthy();
  });
});

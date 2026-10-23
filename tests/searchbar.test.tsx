import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchBar from '../src/components/SearchBar';

const scrollIntoView = vi.fn();

beforeEach(() => {
  scrollIntoView.mockClear();
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: scrollIntoView,
  });
});

afterEach(cleanup);

function Cible({ num }: { num: number }) {
  return (
    <section id="fiche" data-page={`m${num}`}>
      <h1>Module {num}</h1>
    </section>
  );
}

function App() {
  return (
    <MemoryRouter initialEntries={['/module-1']}>
      <SearchBar />
      <Routes>
        <Route path="/module-1" element={<Cible num={1} />} />
        <Route path="/module-6" element={<Cible num={6} />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('recherche globale', () => {
  it('navigue d’un module vers un autre et scrolle la section cible', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Rechercher dans le cours'), {
      target: { value: 'eisenhower' },
    });
    fireEvent.click(screen.getAllByRole('button', { name: /Module 6/ })[0] as HTMLElement);

    await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('heading', { level: 1, name: 'Module 6' })).not.toBeNull();
    const cible = scrollIntoView.mock.instances[0] as HTMLElement;
    expect(cible.id).toBe('fiche');
    expect(cible.dataset.page).toBe('m6');
  });
});

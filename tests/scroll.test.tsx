// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Link, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '../src/components/ScrollToTop';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('ScrollToTop (restauration du défilement lors des navigations)', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('appelle window.scrollTo(0, 0) lors d’une navigation sans hash', () => {
    function AppTest() {
      return (
        <MemoryRouter initialEntries={['/']}>
          <ScrollToTop />
          <nav>
            <Link to="/module-1">Aller au module 1</Link>
          </nav>
          <Routes>
            <Route path="/" element={<h1>Accueil</h1>} />
            <Route path="/module-1" element={<h1>Module 1</h1>} />
          </Routes>
        </MemoryRouter>
      );
    }

    render(<AppTest />);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });

    vi.clearAllMocks();
    const lien = screen.getByRole('link', { name: 'Aller au module 1' });
    fireEvent.click(lien);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  it('fait défiler jusqu’à l’élément cible lorsqu’un hash est présent', () => {
    const scrollIntoViewMock = vi.fn();
    const div = document.createElement('div');
    div.id = 'section-cible';
    div.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(div);

    function AppTest() {
      return (
        <MemoryRouter initialEntries={['/']}>
          <ScrollToTop />
          <nav>
            <Link to="/page#section-cible">Aller à l’ancre</Link>
          </nav>
          <Routes>
            <Route path="/" element={<h1>Accueil</h1>} />
            <Route path="/page" element={<h1>Page avec ancre</h1>} />
          </Routes>
        </MemoryRouter>
      );
    }

    render(<AppTest />);
    vi.clearAllMocks();

    const lien = screen.getByRole('link', { name: 'Aller à l’ancre' });
    fireEvent.click(lien);

    expect(scrollIntoViewMock).toHaveBeenCalled();
    document.body.removeChild(div);
  });
});

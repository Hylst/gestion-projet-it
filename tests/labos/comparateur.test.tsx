import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ComparateurMethodes, { METHODS } from '../../src/labos/ComparateurMethodes';

afterEach(cleanup);

describe('ComparateurMethodes', () => {
  it('rend trois onglets de methode', () => {
    render(<ComparateurMethodes />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs.map((t) => t.textContent)).toEqual(METHODS.map((m) => m.nom));
    expect(screen.getByRole('tablist', { name: /methodes/i })).toBeTruthy();
  });

  it('expose un panel actif accessible et suit les fleches', () => {
    render(<ComparateurMethodes />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0]?.getAttribute('tabindex')).toBe('0');
    expect(tabs[1]?.getAttribute('tabindex')).toBe('-1');

    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(1);
    expect(panels[0]?.getAttribute('aria-labelledby')).toBe(tabs[0]?.id);
    expect(panels[0]?.textContent).toMatch(/Tests prepares pour chaque phase/);

    fireEvent.keyDown(tabs[0] as HTMLElement, { key: 'ArrowRight' });
    const tabsSuivants = screen.getAllByRole('tab');
    expect(tabsSuivants[1]?.getAttribute('aria-selected')).toBe('true');
    const panelsSuivants = screen.getAllByRole('tabpanel');
    expect(panelsSuivants).toHaveLength(1);
    expect(panelsSuivants[0]?.getAttribute('aria-labelledby')).toBe(tabsSuivants[1]?.id);
    expect(panelsSuivants[0]?.textContent).toMatch(/Phases simples et jalons clairs/);

    fireEvent.keyDown(tabsSuivants[1] as HTMLElement, { key: 'ArrowLeft' });
    expect(screen.getAllByRole('tab')[0]?.getAttribute('aria-selected')).toBe('true');
  });
});

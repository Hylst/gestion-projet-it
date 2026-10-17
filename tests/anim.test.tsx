import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { intersect } from './setup';
import { useInView, useReducedMotion } from '../src/lib/anim';

function Probe() {
  const ref = React.useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.2 });
  return <div ref={ref} data-testid="probe" data-seen={String(seen)} />;
}

describe('useInView', () => {
  it('devient visible a l intersection et reste visibles (once)', () => {
    const { getByTestId } = render(<Probe />);
    const el = getByTestId('probe');
    expect(el.dataset.seen).toBe('false');
    act(() => { intersect(el); });
    expect(el.dataset.seen).toBe('true');
  });
});

describe('useReducedMotion', () => {
  it('reflete matchMedia', () => {
    window.matchMedia = (q: string) => ({ matches: q.includes('reduce'), media: q, onchange: null, addEventListener: () => {}, removeEventListener: () => {}, addListener: () => {}, removeListener: () => {}, dispatchEvent: () => false }) as MediaQueryList;
    const out: boolean[] = [];
    const P = () => { out.push(useReducedMotion()); return null; };
    render(<P />);
    expect(out[0]).toBe(true);
  });
});

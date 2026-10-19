import { describe, it, expect, afterEach } from 'vitest';
import { render, act, cleanup } from '@testing-library/react';
import React from 'react';
import { intersect } from './setup';
import { useInView, useReducedMotion } from '../src/lib/anim';

afterEach(cleanup);

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

  it('devient visible sans IntersectionObserver', () => {
    const original = globalThis.IntersectionObserver;
    Object.defineProperty(globalThis, 'IntersectionObserver', { value: undefined, writable: true });
    try {
      const { getByTestId } = render(<Probe />);
      expect(getByTestId('probe').dataset.seen).toBe('true');
    } finally {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: original, writable: true });
    }
  });

  it('ne recree pas l observateur lors d un rendu local', () => {
    const original = globalThis.IntersectionObserver;
    let constructions = 0;
    class CountIO implements IntersectionObserver {
      root = null; rootMargin = ''; scrollMargin = ''; thresholds: number[] = [0];
      constructor() { constructions += 1; }
      observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
    }
    Object.defineProperty(globalThis, 'IntersectionObserver', { value: CountIO, writable: true });
    try {
      function ProbeStable() {
        const ref = React.useRef<HTMLDivElement>(null);
        useInView(ref, { once: true, threshold: 0.2 });
        const [count, setCount] = React.useState(0);
        return (
          <>
            <div ref={ref} data-testid="probe-stable" data-count={count} />
            <button type="button" onClick={() => setCount((n) => n + 1)}>Relancer</button>
          </>
        );
      }
      const { getByTestId, getByRole } = render(<ProbeStable />);
      expect(constructions).toBe(1);
      act(() => { getByRole('button', { name: 'Relancer' }).click(); });
      expect(getByTestId('probe-stable').dataset.count).toBe('1');
      expect(constructions).toBe(1);
    } finally {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: original, writable: true });
    }
  });

  it('transmet threshold et rootMargin a l observateur', () => {
    const original = globalThis.IntersectionObserver;
    let init: IntersectionObserverInit | undefined;
    class CaptureIO implements IntersectionObserver {
      root = null; rootMargin = ''; scrollMargin = ''; thresholds: number[] = [0];
      constructor(_cb: IntersectionObserverCallback, options?: IntersectionObserverInit) { init = options; }
      observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
    }
    Object.defineProperty(globalThis, 'IntersectionObserver', { value: CaptureIO, writable: true });
    try {
      function ProbeRelance() {
        const ref = React.useRef<HTMLDivElement>(null);
        const seen = useInView(ref, { threshold: 0.1, rootMargin: '0px 0px 80px 0px' });
        return <div ref={ref} data-testid="probe-relance" data-seen={String(seen)} />;
      }
      render(<ProbeRelance />);
      expect(init?.threshold).toBe(0.1);
      expect(init?.rootMargin).toBe('0px 0px 80px 0px');
    } finally {
      Object.defineProperty(globalThis, 'IntersectionObserver', { value: original, writable: true });
    }
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

import { beforeAll, afterEach } from 'vitest';

interface Obs { cb: (entries: Array<IntersectionObserverEntry>) => void; els: Set<Element> }
const map = new Map<Element, Obs>();

class MockIntersectionObserver implements IntersectionObserver {
  root = null; rootMargin = ''; scrollMargin = '';
  thresholds: number[] = [0];
  private obs: Obs;
  constructor(cb: (entries: Array<IntersectionObserverEntry>) => void) { this.obs = { cb, els: new Set() }; }
  observe(el: Element) { map.set(el, this.obs); this.obs.els.add(el); }
  unobserve(el: Element) { map.delete(el); this.obs.els.delete(el); }
  disconnect() { for (const key of Array.from(map.keys())) if (map.get(key) === this.obs) map.delete(key); this.obs.els.clear(); }
  takeRecords() { return []; }
}

beforeAll(() => {
  Object.defineProperty(globalThis, 'IntersectionObserver', { value: MockIntersectionObserver, writable: true });
});

afterEach(() => map.clear());

export function intersect(el: Element, isIntersecting = true) {
  const obs = map.get(el);
  if (obs) obs.cb([{ isIntersecting, target: el, intersectionRatio: 1, boundingClientRect: {} as DOMRect, intersectionRect: {} as DOMRect, rootBounds: null, time: Date.now() } as unknown as IntersectionObserverEntry]);
}

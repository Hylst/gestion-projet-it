import { beforeAll, afterAll } from 'vitest';

let io: MockIntersectionObserver | undefined;

class MockIntersectionObserver {
  callback: (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;
  elements = new Set<Element>();
  constructor(cb: MockIntersectionObserver['callback']) { this.callback = cb; }
  observe(el: Element) { io?.elements.add(el); }
  unobserve(el: Element) { io?.elements.delete(el); }
  disconnect() { io?.elements.clear(); }
}

beforeAll(() => {
  io = new MockIntersectionObserver(() => {}) as never;
  Object.defineProperty(globalThis, 'IntersectionObserver', { value: MockIntersectionObserver, writable: true });
});

afterAll(() => { io = undefined; });

export { io, MockIntersectionObserver };

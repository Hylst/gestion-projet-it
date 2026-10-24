import React from 'react';

export type InViewRef = React.RefObject<HTMLElement | null>;
export type InViewOptions = { once?: boolean; threshold?: number; rootMargin?: string };

export function useInView(ref: InViewRef, options?: InViewOptions): boolean {
  const [visible, setVisible] = React.useState(() => typeof IntersectionObserver === 'undefined');
  const once = options?.once !== false;
  const threshold = options?.threshold ?? 0.2;
  const rootMargin = options?.rootMargin;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) setVisible(false);
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, threshold, rootMargin]);
  return visible;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

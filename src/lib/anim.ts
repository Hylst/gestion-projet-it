import React from 'react';

export type InViewRef = React.RefObject<HTMLElement | null>;
export function useInView(ref: InViewRef, options?: { once?: boolean; threshold?: number }): boolean {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (options?.once !== false) obs.disconnect();
          } else if (options?.once === false) setVisible(false);
        }
      },
      { threshold: options?.threshold ?? 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);
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

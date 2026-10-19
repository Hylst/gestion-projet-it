import React from 'react';
import { useInView } from '../lib/anim';

export default function Reveal(props: { children: React.ReactNode; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, threshold: 0.1, rootMargin: '0px 0px 80px 0px' });
  return (
    <div className={`reveal${inView ? ' visible' : ''}`} style={props.delay ? { transitionDelay: `${props.delay}ms` } : undefined} ref={ref}>
      {props.children}
    </div>
  );
}

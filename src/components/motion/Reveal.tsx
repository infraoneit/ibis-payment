'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Blendet Elemente beim Scrollen ein. Nur Elemente unterhalb des ersten Bildschirms werden
 *  anfangs ausgeblendet; bei prefers-reduced-motion passiert nichts (CSS). */
export function Reveal({ children, delay = 0, className, as: Tag = 'div' }: { children: ReactNode; delay?: 0 | 1 | 2 | 3; className?: string; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      el.classList.remove('rv');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in');
            io.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as 'div';
  return (
    <Comp ref={ref as React.RefObject<HTMLDivElement>} className={['rv', delay ? `d${delay}` : '', className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </Comp>
  );
}

/** Ruft einen Callback auf, sobald das Element sichtbar ist (für Zähler, Linien, Balken). */
export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const seen = useRef(false);
  const subs = useRef<(() => void)[]>([]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fire = () => {
      if (seen.current) return;
      seen.current = true;
      subs.current.forEach((f) => f());
    };
    if (!('IntersectionObserver' in window)) {
      fire();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fire();
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, onEnter: (f: () => void) => (seen.current ? f() : subs.current.push(f)) };
}

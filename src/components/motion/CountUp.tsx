'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from './Reveal';
import { fmtInt } from '@/lib/format';

/** Zahl zählt hoch, wenn sie ins Bild kommt. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1400 }: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }) {
  const { ref, onEnter } = useInView<HTMLSpanElement>(0.5);
  const [v, setV] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    onEnter(() => {
      if (started.current) return; // Animation nur einmal starten
      started.current = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setV(to);
        return;
      }
      let t0: number | null = null;
      const step = (ts: number) => {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / duration);
        const e = 1 - Math.pow(1 - p, 3);
        setV(to * e);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, [onEnter, to, duration]);
  return (
    <span ref={ref} className="num">
      {prefix}
      {decimals ? v.toFixed(decimals) : fmtInt(v)}
      {suffix}
    </span>
  );
}

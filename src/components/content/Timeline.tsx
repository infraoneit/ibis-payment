'use client';

import { useEffect, type ReactNode } from 'react';
import { useInView } from '@/components/motion/Reveal';
import { Reveal } from '@/components/motion/Reveal';

export type TimelineItem = { icon: ReactNode; title: string; text: string; meta?: string };

/** Timeline mit Icons auf der Linie; die Linie zeichnet sich beim Scrollen. Vertikal (Versprechen) oder horizontal (Ablauf). */
export function Timeline({ items, horizontal, headingLevel = 'h3' }: { items: TimelineItem[]; horizontal?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const { ref, onEnter } = useInView<HTMLOListElement>(0.2);
  useEffect(() => {
    onEnter(() => ref.current?.classList.add('in'));
  }, [onEnter, ref]);
  const H = headingLevel;
  return (
    <ol ref={ref} className={`timeline${horizontal ? ' h' : ''}`} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <div className="progress" aria-hidden="true" />
      {items.map((it, i) => (
        <Reveal key={it.title} as="li" className="tl-item" delay={(i % 3) as 0 | 1 | 2}>
          <div className="tl-icon" aria-hidden="true">
            {it.icon}
          </div>
          <div className="tl-body">
            <span className="tl-num">{String(i + 1).padStart(2, '0')}</span>
            <H>{it.title}</H>
            <p>
              {it.text}
              {it.meta && <em>{it.meta}</em>}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

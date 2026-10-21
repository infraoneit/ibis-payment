'use client';

import { useRef, type ReactNode } from 'react';

export type MiniKind = 'mobile' | 'mobile-printer' | 'desk' | 'desk-keys' | 'auto' | 'small';

/** Stilisierte 3D-Miniatur eines Terminals, neigt sich zur Maus. */
export function DeviceMini({ kind }: { kind: MiniKind }) {
  const cls =
    kind === 'mobile' ? 'mini mobile' : kind === 'mobile-printer' ? 'mini mobile printer' : kind === 'desk' ? 'mini desk' : kind === 'desk-keys' ? 'mini desk keys' : kind === 'small' ? 'mini small' : 'mini auto';
  return (
    <div className={cls} data-mini>
      <div className="m-body">
        <div className="m-screen">
          {kind === 'mobile' || kind === 'mobile-printer' ? (
            <>
              <b>CHF 48.50</b>
              <span className="dot" />
            </>
          ) : kind === 'small' ? (
            <span className="dot" />
          ) : (
            <i />
          )}
        </div>
        {(kind === 'auto' || kind === 'desk-keys') && (
          <div className="keys">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <i key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Karte mit Maus-Neigung für die Miniatur. */
export function TiltCard({ children, href, className }: { children: ReactNode; href?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (ev: React.MouseEvent) => {
    if (!window.matchMedia('(hover:hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = ref.current;
    const mini = card?.querySelector<HTMLElement>('[data-mini]');
    if (!card || !mini) return;
    const r = card.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    mini.style.transform = `rotateY(${(x * 26).toFixed(1)}deg) rotateX(${(-y * 18).toFixed(1)}deg)`;
  };
  const onLeave = () => {
    const mini = ref.current?.querySelector<HTMLElement>('[data-mini]');
    if (mini) mini.style.transform = '';
  };
  const cls = ['devcard', className ?? ''].join(' ');
  if (href)
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} className={cls} href={href} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </a>
    );
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

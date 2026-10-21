import type { ReactNode } from 'react';

type Tone = 'white' | 'grey' | 'dark';

/** Schweizer Raster: Label links (3 Spalten), Inhalt rechts (9 Spalten). */
export function Section({
  id,
  label,
  sub,
  tone = 'white',
  tight,
  plainLabel,
  children,
  className,
}: {
  id?: string;
  label?: string;
  sub?: string;
  tone?: Tone;
  tight?: boolean;
  /** Label nur visuell (kein h2), z. B. für Nummerierungen */
  plainLabel?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = ['section', tone === 'grey' ? 'grey' : tone === 'dark' ? 'dark' : '', tight ? 'tight' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <section id={id} className={cls}>
      <div className="wrap row">
        {label && !plainLabel ? (
          <h2 className="lbl">
            {label}
            {sub && <span>{sub}</span>}
          </h2>
        ) : (
          <div className="lbl">
            {label}
            {sub && <span>{sub}</span>}
          </div>
        )}
        <div className="content">{children}</div>
      </div>
    </section>
  );
}

export function Intro({ title, text, as = 'h2' }: { title: string; text?: ReactNode; as?: 'h1' | 'h2' | 'h3' }) {
  const Tag = as;
  return (
    <div className="intro">
      <Tag>{title}</Tag>
      {text && <p>{text}</p>}
    </div>
  );
}

export const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

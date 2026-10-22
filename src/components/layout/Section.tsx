import type { ReactNode } from 'react';

type Tone = 'white' | 'grey' | 'dark';

/** Sektion mit Kopfzeile oben (Überzeile mit Akzentstrich, optionaler Untertitel) und Inhalt in voller Breite. */
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
  /** Überzeile nur visuell (kein h2), wenn der Inhalt selbst mit einer Überschrift beginnt */
  plainLabel?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = ['section', tone === 'grey' ? 'grey' : tone === 'dark' ? 'dark' : '', tight ? 'tight' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <section id={id} className={cls}>
      <div className="wrap">
        {label && (
          <div className="sec-head">
            {plainLabel ? <p className="overline">{label}</p> : <h2 className="overline">{label}</h2>}
            {sub && <p className="sec-sub">{sub}</p>}
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

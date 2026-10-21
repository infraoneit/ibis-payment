import { MARK, WORDMARK } from './logo-paths';

/* Bild- und Wortmarke inline (currentColor), funktionieren auf Weiss und Schwarz. Dateien in public/brand. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox={MARK.viewBox} className={className} fill="currentColor" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={MARK.d} />
    </svg>
  );
}

export function LogoWordmark({ className, title = 'ibis payment' }: { className?: string; title?: string }) {
  return (
    <svg viewBox={WORDMARK.viewBox} className={className} fill="currentColor" role="img" aria-label={title}>
      {WORDMARK.paths.map((p, i) => (
        <path key={i} transform={p.transform ?? undefined} d={p.d} />
      ))}
    </svg>
  );
}

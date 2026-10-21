'use client';

import { useEffect } from 'react';
import { useInView } from '@/components/motion/Reveal';
import { pct } from '@/lib/format';

/** Gebühren-Zerlegung am Beispiel einer Debitkarte: Interchange, Netzwerk, Marge. Liest die Konditionen. */
export function FeeBreakdown({ debit, interchange, netzwerk, txFix, quelle }: { debit: number; interchange: number; netzwerk: number; txFix: number; quelle?: string }) {
  const margin = Math.max(0, debit - interchange - netzwerk);
  const w = (v: number) => `${((v / debit) * 100).toFixed(1)}%`;
  const { ref, onEnter } = useInView<HTMLDivElement>(0.4);
  useEffect(() => {
    onEnter(() => ref.current?.classList.add('in'));
  }, [onEnter, ref]);
  return (
    <div className="feebar" ref={ref}>
      <div className="bar" role="img" aria-label={`Aufteilung ${pct(debit)}: Interchange ${pct(interchange)}, Netzwerkgebühr ${pct(netzwerk)}, ibis payment ${pct(margin)}`}>
        <div className="seg ic" style={{ ['--w' as string]: w(interchange) }}>
          {pct(interchange)}
        </div>
        <div className="seg sc" style={{ ['--w' as string]: w(netzwerk) }}>
          {pct(netzwerk)}
        </div>
        <div className="seg mg" style={{ ['--w' as string]: w(margin) }}>
          {pct(margin)}
        </div>
      </div>
      <div className="feelegend">
        <div>
          <b className="num">{pct(interchange)}</b>
          <span>Interchange</span>
          <small>an die Bank des Karteninhabers, in der Schweiz von der WEKO geregelt</small>
        </div>
        <div>
          <b className="num">{pct(netzwerk)}</b>
          <span>Netzwerkgebühr</span>
          <small>an Visa oder Mastercard</small>
        </div>
        <div>
          <b className="num">{pct(margin)}</b>
          <span>ibis payment</span>
          <small>Abwicklung, Terminal-Service, Support vor Ort</small>
        </div>
      </div>
      <div className="sum">
        <b className="num">{pct(debit)}</b>
        <span>
          pro Debitzahlung, plus CHF {txFix.toFixed(2)} fix. Keine weiteren Positionen.
        </span>
      </div>
      {quelle && <p className="note" style={{ color: 'var(--on-dark-2)', maxWidth: '72ch' }}>{quelle}</p>}
    </div>
  );
}

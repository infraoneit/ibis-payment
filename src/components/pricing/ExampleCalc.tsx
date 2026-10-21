import Link from 'next/link';
import type { Konditionen } from '@/lib/content';
import { compare } from '@/lib/calc';
import { chf, fmtInt, pct, dateDE } from '@/lib/format';

/** Beispielrechnung für Branchen-Seiten: liest die Konditionen, rechnet serverseitig. */
export function ExampleCalc({ k, titel, umsatz, bon, kreditanteil, vergleich, erklaerung }: { k: Konditionen; titel: string; umsatz: number; bon: number; kreditanteil: number; vergleich: string; erklaerung?: string }) {
  const v = k.vergleiche.find((x) => x.id === vergleich) ?? k.vergleiche[0];
  if (!v) return null;
  const ours = { debit: k.debit, kredit: k.kredit, tx: k.txFix, fix: k.miete };
  const theirs = { debit: v.debit ?? 0, kredit: v.kredit ?? 0, tx: v.tx ?? 0, fix: v.fix ?? 0 };
  const r = compare(ours, theirs, { umsatz, bon, kreditanteil });
  return (
    <div className="example">
      <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
        <h3>{titel}</h3>
        <div className="inputs">
          <div>
            <span>Kartenumsatz pro Monat</span>
            <span className="num">{chf(umsatz)}</span>
          </div>
          <div>
            <span>Durchschnittsbetrag</span>
            <span className="num">{chf(bon)}</span>
          </div>
          <div>
            <span>Anteil Kreditkarten</span>
            <span className="num">{kreditanteil} %</span>
          </div>
          <div>
            <span>Zahlungen pro Monat</span>
            <span className="num">{fmtInt(r.tx)}</span>
          </div>
          <div>
            <span>Vergleich</span>
            <span>
              {v.label} ({pct(v.debit ?? 0)} / {pct(v.kredit ?? 0)}, {chf(v.tx ?? 0, 2)} pro Zahlung, {chf(v.fix ?? 0)} pro Monat)
            </span>
          </div>
        </div>
        {erklaerung && <p className="note" style={{ maxWidth: '60ch' }}>{erklaerung}</p>}
      </div>
      <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
        <div className="big">
          <span className="l">{r.diffMonth >= 0 ? 'Ersparnis pro Jahr gegenüber dem Vergleich' : 'Mehrkosten pro Jahr gegenüber dem Vergleich'}</span>
          <span className="v num" style={{ fontSize: 'clamp(2.6rem,5vw,4.4rem)' }}>
            {chf(Math.abs(r.diffYear))}
          </span>
          <span className="s">{chf(Math.abs(r.diffMonth))} pro Monat bei gleichem Umsatz</span>
        </div>
        <div className="cmp">
          <div className="r them">
            <b>Vergleich</b>
            <span className="num">
              {chf(r.feeThem)} pro Monat, effektiv {pct(r.effThem)}
            </span>
          </div>
          <div className="t them">
            <i style={{ width: `${(r.feeThem / Math.max(r.feeThem, r.feeUs, 1)) * 100}%` }} />
          </div>
          <div className="r">
            <b>Bei ibis payment</b>
            <span className="num">
              {chf(r.feeUs)} pro Monat, effektiv {pct(r.effUs)}
            </span>
          </div>
          <div className="t">
            <i style={{ width: `${(r.feeUs / Math.max(r.feeThem, r.feeUs, 1)) * 100}%` }} />
          </div>
        </div>
        <p className="note">
          Richtwerte exkl. MwSt., Stand {dateDE(k.stand)}. Vergleichswert: {v.quelle}, Stand {v.stand}. Mit Ihren eigenen Zahlen:{' '}
          <Link href="/konditionen#rechner">zum Rechner</Link>.
        </p>
      </div>
    </div>
  );
}

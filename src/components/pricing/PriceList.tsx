import type { Konditionen } from '@/lib/content';
import { chf, dateDE, pct } from '@/lib/format';

type Row = { label: string; beschreibung: string; wert: string; unit?: string };

export function priceRows(k: Konditionen, variant: 'full' | 'short' = 'full'): Row[] {
  const rows: Row[] = [
    { label: 'Debitkarten Inland', beschreibung: k.debitKarten, wert: pct(k.debit) },
    { label: 'Kreditkarten Inland', beschreibung: k.kreditKarten, wert: pct(k.kredit) },
  ];
  if (k.twint != null) rows.push({ label: 'TWINT', beschreibung: 'Direkt auf dem Terminal, ohne QR-Aufsteller', wert: pct(k.twint) });
  if (variant === 'full') {
    if (k.amex != null) rows.push({ label: 'American Express', beschreibung: 'Optional, auf Wunsch freigeschaltet', wert: pct(k.amex) });
    if (k.auslandZuschlag != null) rows.push({ label: 'Ausländische und Firmenkarten', beschreibung: 'Zuschlag auf den jeweiligen Satz', wert: `+${pct(k.auslandZuschlag)}` });
  }
  rows.push({ label: 'Pro Zahlung', beschreibung: 'Fixbetrag je Transaktion, alle Kartenarten', wert: chf(k.txFix, 2) });
  rows.push({ label: 'Terminal-Miete', beschreibung: 'Inklusive Wartung, Updates und Ersatzgerät', wert: chf(k.miete, 2), unit: '/ Monat' });
  if (variant === 'full') {
    if (k.kauf != null) rows.push({ label: 'Terminal-Kauf', beschreibung: 'Mobil oder stationär, inklusive Einrichtung und Herstellergarantie [Dauer bestätigen]', wert: `ab ${chf(k.kauf, 2)}` });
    k.weitere.forEach((w) => rows.push({ label: w.label, beschreibung: w.beschreibung, wert: w.wert }));
  } else {
    const w = k.weitere[0];
    if (w) rows.push({ label: w.label, beschreibung: w.beschreibung, wert: w.wert });
  }
  return rows;
}

/** Preisliste als echte Tabelle, liest ausschliesslich aus content/konditionen.yaml. */
export function PriceList({ k, variant = 'full', caption }: { k: Konditionen; variant?: 'full' | 'short'; caption?: string }) {
  const rows = priceRows(k, variant);
  return (
    <table className="pricelist">
      <caption>
        {caption ?? `${k.hinweis} Gültig für Betriebe in der Schweiz, Stand ${dateDE(k.stand)}.`}
        {variant === 'full' && k.walletHinweis ? ` ${k.walletHinweis}` : ''}
      </caption>
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Was dazugehört</th>
          <th scope="col" style={{ textAlign: 'right' }}>
            Preis
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className="k">
              {r.label}
            </th>
            <td className="d">{r.beschreibung}</td>
            <td className="v num">
              {r.wert}
              {r.unit && <small>{r.unit}</small>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SimplePriceList({ rows, caption }: { rows: readonly { label: string; beschreibung: string; wert: string }[]; caption?: string }) {
  return (
    <table className="pricelist">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">Position</th>
          <th scope="col">Was dazugehört</th>
          <th scope="col" style={{ textAlign: 'right' }}>
            Preis
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className="k">
              {r.label}
            </th>
            <td className="d">{r.beschreibung}</td>
            <td className="v num" style={{ fontSize: '1.25rem' }}>
              {r.wert}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

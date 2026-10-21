'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { compare, type Tarif } from '@/lib/calc';
import { chf, fmtInt, pct } from '@/lib/format';

export type Vergleich = Tarif & { id: string; label: string; quelle: string; stand: string };

type Props = {
  ours: Tarif;
  vergleiche: Vergleich[];
  defaults: { umsatz: number; bon: number; kreditanteil: number };
  stand: string;
};

const SESSION_KEY = 'ibis_calc';

/** Rechner mit Vergleich. Formel in lib/calc.ts. Übergibt seine Werte an das Kontaktformular (sessionStorage). */
export function Calculator({ ours, vergleiche, defaults, stand }: Props) {
  const [umsatz, setUmsatz] = useState(defaults.umsatz);
  const [bon, setBon] = useState(defaults.bon);
  const [kredit, setKredit] = useState(defaults.kreditanteil);
  const [mode, setMode] = useState<string>(vergleiche[0]?.id ?? 'eigen');
  const [custom, setCustom] = useState<Tarif>({ debit: vergleiche[0]?.debit ?? 1.29, kredit: vergleiche[0]?.kredit ?? 1.29, tx: vergleiche[0]?.tx ?? 0.15, fix: vergleiche[0]?.fix ?? 35 });
  const firstCustom = useRef<HTMLInputElement>(null);

  const theirs: Tarif = mode === 'eigen' ? custom : (vergleiche.find((v) => v.id === mode) ?? custom);
  const r = useMemo(() => compare(ours, theirs, { umsatz, bon, kreditanteil: kredit }), [ours, theirs, umsatz, bon, kredit]);

  // Ersparnis zählt beim Ändern weich hoch
  const [shown, setShown] = useState(Math.abs(r.diffYear));
  useEffect(() => {
    const target = Math.abs(r.diffYear);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(target);
      return;
    }
    const from = shown;
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / 420);
      const e = 1 - Math.pow(1 - p, 3);
      setShown(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.diffYear]);

  const saving = r.diffMonth >= 0;
  const mx = Math.max(r.feeThem, r.feeUs, 1);
  const selected = vergleiche.find((v) => v.id === mode);

  const remember = () => {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        `Kartenumsatz ca. ${chf(umsatz)} pro Monat, Durchschnittsbetrag ${chf(bon)}, Kreditkartenanteil ${kredit} %. Heutige Gebühren ca. ${chf(r.feeThem)} pro Monat (${mode === 'eigen' ? 'eigene Konditionen' : theirs && selected ? selected.label : ''}). Rechner-Ersparnis ca. ${chf(r.diffYear)} pro Jahr.`
      );
    } catch {}
  };

  return (
    <div className="calc" id="rechner">
      <div className="in">
        <div>
          <h3>Rechnen Sie nach.</h3>
          <p className="muted">Drei Angaben aus Ihrer letzten Abrechnung genügen.</p>
        </div>
        <div className="field">
          <label htmlFor="umsatz">
            <span>Kartenumsatz pro Monat</span>
            <output htmlFor="umsatz" className="num">
              {chf(umsatz)}
            </output>
          </label>
          <input id="umsatz" type="range" min={1000} max={150000} step={500} value={umsatz} onChange={(e) => setUmsatz(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="bon">
            <span>Durchschnittlicher Betrag pro Zahlung</span>
            <output htmlFor="bon" className="num">
              {chf(bon)}
            </output>
          </label>
          <input id="bon" type="range" min={5} max={500} step={1} value={bon} onChange={(e) => setBon(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="kredit">
            <span>Anteil Kreditkarten</span>
            <output htmlFor="kredit" className="num">
              {kredit} %
            </output>
          </label>
          <input id="kredit" type="range" min={0} max={100} step={5} value={kredit} onChange={(e) => setKredit(+e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="vergleich">
            <span>Vergleich mit</span>
          </label>
          <select
            id="vergleich"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              if (e.target.value === 'eigen') setTimeout(() => firstCustom.current?.focus(), 0);
            }}
          >
            {vergleiche.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label} ({pct(v.debit)} Debit, {pct(v.kredit)} Kredit, {chf(v.tx, 2)} pro Zahlung, {chf(v.fix)} pro Monat)
              </option>
            ))}
            <option value="eigen">Meine heutigen Konditionen</option>
          </select>
          <div className={`custom${mode === 'eigen' ? ' show' : ''}`}>
            <label>
              Debit %
              <input ref={firstCustom} type="number" step="0.01" min="0" value={custom.debit} onChange={(e) => setCustom({ ...custom, debit: +e.target.value || 0 })} />
            </label>
            <label>
              Kredit %
              <input type="number" step="0.01" min="0" value={custom.kredit} onChange={(e) => setCustom({ ...custom, kredit: +e.target.value || 0 })} />
            </label>
            <label>
              CHF / Zahlung
              <input type="number" step="0.01" min="0" value={custom.tx} onChange={(e) => setCustom({ ...custom, tx: +e.target.value || 0 })} />
            </label>
            <label>
              CHF / Monat
              <input type="number" step="1" min="0" value={custom.fix} onChange={(e) => setCustom({ ...custom, fix: +e.target.value || 0 })} />
            </label>
          </div>
        </div>
      </div>
      <div className="out" aria-live="polite">
        <div className="big">
          <span className="l">{saving ? 'Ihre Ersparnis pro Jahr' : 'Mehrkosten pro Jahr'}</span>
          <span className="v num">{chf(shown)}</span>
          <span className="s">{saving ? `${chf(r.diffMonth)} pro Monat bei gleichem Umsatz, gegenüber dem gewählten Vergleich` : 'Mit diesen Werten wären Sie heute günstiger. Schicken Sie uns Ihre Abrechnung, wir prüfen das.'}</span>
        </div>
        <div className="cmp">
          <div className="r them">
            <b>Heute</b>
            <span className="num">{chf(r.feeThem)} pro Monat</span>
          </div>
          <div className="t them">
            <i style={{ width: `${(r.feeThem / mx) * 100}%` }} />
          </div>
          <div className="r">
            <b>Bei ibis payment</b>
            <span className="num">{chf(r.feeUs)} pro Monat</span>
          </div>
          <div className="t">
            <i style={{ width: `${(r.feeUs / mx) * 100}%` }} />
          </div>
        </div>
        <div className="cmp">
          <div className="r">
            <span className="muted">Zahlungen pro Monat</span>
            <span className="num">{fmtInt(r.tx)}</span>
          </div>
          <div className="r">
            <span className="muted">Effektive Gebühr heute</span>
            <span className="num">{pct(r.effThem)}</span>
          </div>
          <div className="r">
            <span className="muted">Effektive Gebühr bei ibis</span>
            <span className="num">{pct(r.effUs)}</span>
          </div>
        </div>
        <div>
          <Link className="btn btn-ink" href="/kontakt?rechner=1" onClick={remember}>
            Offerte mit diesen Zahlen anfordern
          </Link>
        </div>
        <p className="note">
          Richtwerte, exkl. MwSt. Verbindlich sind die Konditionen in Ihrer Offerte (Stand {stand}).
          {selected ? ` Vergleichswert: ${selected.quelle}, Stand ${selected.stand}.` : ''}
        </p>
      </div>
    </div>
  );
}

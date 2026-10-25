'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CLUSTERS, calcSavings, marketCost, type ClusterKey } from '@/lib/swipay-calc';
import { chf, fmtInt } from '@/lib/format';

type Props = { stand: string; defaultCluster?: ClusterKey; defaultUmsatzJahr?: number; defaultBon?: number };

const SESSION_KEY = 'ibis_calc';
const fmt = (n: number) => `CHF ${fmtInt(n)}`;

/** Ersparnis-Rechner nach dem SwiPay-Partnerrechner: Branche, Jahresumsatz, Durchschnittsbon,
 *  optional heutige Kondition. Ergebnis als Spanne pro Monat und Jahr (Modell in lib/swipay-calc.ts). */
export function Calculator({ stand, defaultCluster = 'gastro', defaultUmsatzJahr = 300000, defaultBon }: Props) {
  const [cluster, setCluster] = useState<ClusterKey>(defaultCluster);
  const clusterDef = CLUSTERS.find((c) => c.key === cluster) ?? CLUSTERS[0];
  const [umsatz, setUmsatz] = useState<string>(String(defaultUmsatzJahr));
  const [bon, setBon] = useState<string>(String(defaultBon ?? clusterDef.bon));
  const [bonAuto, setBonAuto] = useState(defaultBon == null);
  const [istTyp, setIstTyp] = useState<'none' | 'prozent' | 'monat'>('none');
  const [istProzent, setIstProzent] = useState('');
  const [istMonat, setIstMonat] = useState('');
  const [shown, setShown] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const num = (s: string) => parseFloat(s.replace(/['’\s]/g, '').replace(',', '.')) || 0;
  const input = useMemo(
    () => ({
      cluster,
      umsatzJahr: num(umsatz),
      bon: num(bon),
      istProzent: istTyp === 'prozent' ? num(istProzent) : null,
      istMonat: istTyp === 'monat' ? num(istMonat) : null,
    }),
    [cluster, umsatz, bon, istTyp, istProzent, istMonat]
  );
  const r = useMemo(() => calcSavings(input), [input]);
  const valid = input.umsatzJahr > 0 && input.bon > 0;

  const onCluster = (key: ClusterKey) => {
    setCluster(key);
    const def = CLUSTERS.find((c) => c.key === key)?.bon;
    if (def && (bonAuto || !bon)) setBon(String(def));
  };

  // Zähler für die Ersparnis
  const [anim, setAnim] = useState({ low: 0, high: 0 });
  useEffect(() => {
    if (!shown) return;
    const target = r.monthly;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnim(target);
      return;
    }
    const from = { ...anim };
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min(1, (ts - t0) / 500);
      const e = 1 - Math.pow(1 - p, 3);
      setAnim({ low: from.low + (target.low - from.low) * e, high: from.high + (target.high - from.high) * e });
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r.monthly.low, r.monthly.high, shown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setShown(true);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  };

  const remember = () => {
    try {
      const ist = r.istMonthly != null ? `, heutige Kosten ca. ${chf(r.istMonthly)} pro Monat` : '';
      sessionStorage.setItem(
        SESSION_KEY,
        `Branche ${clusterDef.label}, Kartenumsatz ca. ${chf(input.umsatzJahr)} pro Jahr, Durchschnittsbon ${chf(input.bon)}${ist}. Geschätzte Ersparnis ${fmt(r.monthly.low)} bis ${fmt(r.monthly.high)} pro Monat.`
      );
    } catch {}
  };

  return (
    <form className="calc" id="rechner" onSubmit={submit} noValidate>
      <div className="in">
        <div>
          <h3>Zahlen Sie zu viel? In 60 Sekunden wissen Sie es.</h3>
          <p className="muted">Drei Angaben genügen. Wer seine heutige Kondition kennt, bekommt eine genauere Spanne.</p>
        </div>
        <div className="field">
          <label htmlFor="k-cluster">
            <span>Was beschreibt Ihren Betrieb am besten?</span>
          </label>
          <select id="k-cluster" value={cluster} onChange={(e) => onCluster(e.target.value as ClusterKey)}>
            {CLUSTERS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="k-umsatz">
            <span>Jahresumsatz Kartenzahlungen (CHF)</span>
          </label>
          <input id="k-umsatz" type="text" inputMode="numeric" value={umsatz} onChange={(e) => setUmsatz(e.target.value)} placeholder="z. B. 300'000" className="k-input" />
        </div>
        <div className="field">
          <label htmlFor="k-bon">
            <span>Durchschnittsbon (CHF)</span>
            <output className="num">{bonAuto ? 'Branchenwert' : ''}</output>
          </label>
          <input
            id="k-bon"
            type="text"
            inputMode="decimal"
            value={bon}
            onChange={(e) => {
              setBon(e.target.value);
              setBonAuto(false);
            }}
            className="k-input"
          />
          {num(bon) > 0 && num(bon) < 25 && <p className="note">Bei Ihrem Bon zählt vor allem die Gebühr pro Zahlung, nicht der Prozentsatz.</p>}
        </div>
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="flabel" style={{ marginBottom: 8 }}>
            Kennen Sie Ihre heutige Kondition? (optional, macht die Rechnung genauer)
          </legend>
          <div className="seg">
            {(['none', 'prozent', 'monat'] as const).map((t) => (
              <label key={t} className={istTyp === t ? 'on' : ''}>
                <input type="radio" name="ist_typ" value={t} checked={istTyp === t} onChange={() => setIstTyp(t)} />
                {t === 'none' ? 'Weiss ich nicht' : t === 'prozent' ? 'In Prozent' : 'In CHF pro Monat'}
              </label>
            ))}
          </div>
          {istTyp === 'prozent' && (
            <input type="text" inputMode="decimal" aria-label="Heutige Gebühr in Prozent" placeholder="z. B. 1.5" value={istProzent} onChange={(e) => setIstProzent(e.target.value)} className="k-input" style={{ marginTop: 10 }} />
          )}
          {istTyp === 'monat' && (
            <input type="text" inputMode="numeric" aria-label="Heutige Gebühren in CHF pro Monat" placeholder="z. B. 450" value={istMonat} onChange={(e) => setIstMonat(e.target.value)} className="k-input" style={{ marginTop: 10 }} />
          )}
        </fieldset>
        <div>
          <button type="submit" className="btn btn-primary" disabled={!valid}>
            Ersparnis berechnen
          </button>
        </div>
      </div>
      <div className="out" aria-live="polite" ref={resultRef}>
        {!shown ? (
          <div className="big" style={{ borderBottom: 0 }}>
            <span className="l">Ihre geschätzte Ersparnis</span>
            <span className="v" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-2)', letterSpacing: '-0.02em' }}>
              Erscheint hier nach dem Klick.
            </span>
            <span className="s">Basis: Branchendurchschnitte und Ihre Angaben.</span>
          </div>
        ) : !r.hasSavings ? (
          <div className="big">
            <span className="l">Ergebnis</span>
            <span className="v" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.02em' }}>
              Ihre heutigen Konditionen sehen schon gut aus.
            </span>
            <span className="s">Wir prüfen persönlich anhand Ihrer Abrechnung, ob trotzdem etwas für Sie drin ist.</span>
          </div>
        ) : (
          <div className="big">
            <span className="l">Sie sparen schätzungsweise</span>
            <span className="v num" style={{ fontSize: 'clamp(2.2rem,4.6vw,3.8rem)' }}>
              {fmt(anim.low)} – {fmt(anim.high)}
            </span>
            <span className="s">
              pro Monat ({fmt(r.yearly.low)} – {fmt(r.yearly.high)} pro Jahr)
            </span>
          </div>
        )}
        {shown && (
          <div className="cmp">
            <div className="r">
              <span className="muted">Zahlungen pro Monat</span>
              <span className="num">{fmtInt(r.tx)}</span>
            </div>
            <div className="r">
              <span className="muted">Geschätzte Kosten bei ibis payment</span>
              <span className="num">{chf(r.swipayMonthly)} pro Monat</span>
            </div>
            <div className="r">
              <span className="muted">{r.basis === 'ist' ? 'Ihre heutigen Kosten' : 'Heutige Kosten, Branchendurchschnitt'}</span>
              <span className="num">{r.basis === 'ist' && r.istMonthly != null ? `${chf(r.istMonthly)} pro Monat` : `${chf(marketCost(input.umsatzJahr / 12, input.bon).low)} – ${chf(marketCost(input.umsatzJahr / 12, input.bon).high)} pro Monat`}</span>
            </div>
          </div>
        )}
        {shown && r.micropayment && <p className="note">Bei Ihrem Bon zählt vor allem die Gebühr pro Zahlung, nicht der Prozentsatz. Genau das rechnen wir in der Offerte nach.</p>}
        <div>
          <Link className="btn btn-ink" href="/kontakt?rechner=1" onClick={remember}>
            Offerte mit diesen Zahlen anfordern
          </Link>
        </div>
        <p className="note">
          Diese Berechnung basiert auf Branchendurchschnitten und Ihren Angaben; sie entspricht dem Rechner unseres Acquiring-Partners SwiPay. Für eine transaktionsgenaue Analyse Ihrer Abrechnung melden wir uns persönlich.
          Richtwerte exkl. MwSt., Stand {stand}.
        </p>
      </div>
    </form>
  );
}

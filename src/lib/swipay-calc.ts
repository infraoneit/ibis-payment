/**
 * Ersparnis-Rechner nach dem Modell des SwiPay-Partnerrechners (swipay.ch/partner-lead/?partner=ibis).
 *
 * Das Modell wurde am 25. Oktober 2026 aus den Ergebnissen des SwiPay-Endpunkts abgeleitet
 * (92 von 92 Messwerten der Ist-Basis exakt reproduziert, siehe IBIS_Payment/_work/fit_swipay.py):
 *
 *   Monatsumsatz U = Jahresumsatz / 12, Zahlungen tx = U / Durchschnittsbon
 *   SwiPay-Kosten  = r(Branche) × U + 0.025 × tx, mindestens 0.077 pro Zahlung (Kleinstbeträge)
 *   Ist-Basis      (heutige Kondition bekannt): mid = Ist-Kosten − SwiPay-Kosten
 *                  Spanne = 0.9 × mid … 1.1 × mid
 *   Markt-Basis    (keine Angabe): Marktkosten heutiger Anbieter als Branchendurchschnitt
 *                  untere Annahme 1.49 % × U + 0.0025 × tx, obere Annahme 1.938 % × U
 *                  Spanne = Markt − SwiPay (25 von 26 Messwerten exakt, einmal 10 Franken Abweichung)
 *   Rundung: Monat auf 10 Franken, Jahr auf 50 Franken, jeweils kaufmännisch.
 *   Kleinstbetrag-Hinweis bei Durchschnittsbon unter CHF 25.
 */
export type ClusterKey = 'gastro' | 'retail' | 'beauty' | 'hotel' | 'kiosk' | 'ecom' | 'dienstleistung' | 'verein' | 'sonstige';

export const CLUSTERS: { key: ClusterKey; label: string; bon: number; rate: number }[] = [
  { key: 'gastro', label: 'Gastronomie (Restaurant, Café, Bar)', bon: 34, rate: 0.00674 },
  { key: 'retail', label: 'Detailhandel / Ladengeschäft', bon: 85, rate: 0.00718 },
  { key: 'beauty', label: 'Beauty & Wellness (Coiffeur, Kosmetik, Spa)', bon: 120, rate: 0.00674 },
  { key: 'hotel', label: 'Hotellerie & Beherbergung', bon: 188, rate: 0.00774 },
  { key: 'kiosk', label: 'Kiosk, Take-away & Tankstelle', bon: 12, rate: 0.00659 },
  { key: 'ecom', label: 'Online-Shop / E-Commerce', bon: 60, rate: 0.00774 },
  { key: 'dienstleistung', label: 'Dienstleistung & Beratung', bon: 250, rate: 0.00744 },
  { key: 'verein', label: 'Verein & Verband', bon: 100, rate: 0.00718 },
  { key: 'sonstige', label: 'Sonstige / weiss nicht', bon: 50, rate: 0.00774 },
];

export const MODEL = {
  txFee: 0.025, // CHF pro Zahlung
  minPerTx: 0.077, // Untergrenze pro Zahlung bei Kleinstbeträgen
  marketLow: 0.0149, // Branchendurchschnitt heutiger Anbieter, untere Annahme (Anteil vom Umsatz)
  marketLowTx: 0.0025, // zusätzlich pro Zahlung, untere Annahme
  marketHigh: 0.01938, // obere Annahme (Anteil vom Umsatz)
  bandLow: 0.9,
  bandHigh: 1.1,
  microBon: 25,
};

export type CalcInput = { cluster: ClusterKey; umsatzJahr: number; bon: number; istProzent?: number | null; istMonat?: number | null };
export type CalcResult = {
  ok: boolean;
  hasSavings: boolean;
  micropayment: boolean;
  basis: 'ist' | 'markt';
  monthly: { low: number; high: number };
  yearly: { low: number; high: number };
  swipayMonthly: number;
  istMonthly: number | null;
  tx: number;
};

const r10 = (x: number) => Math.round(x / 10) * 10;
const r50 = (x: number) => Math.round(x / 50) * 50;

export function swipayCost(cluster: ClusterKey, umsatzMonat: number, bon: number) {
  const c = CLUSTERS.find((x) => x.key === cluster) ?? CLUSTERS[CLUSTERS.length - 1];
  const tx = bon > 0 ? umsatzMonat / bon : 0;
  return Math.max(c.rate * umsatzMonat + MODEL.txFee * tx, MODEL.minPerTx * tx);
}

/** Heutige Kosten nach Branchendurchschnitt, pro Monat (untere und obere Annahme) */
export function marketCost(umsatzMonat: number, bon: number) {
  const tx = bon > 0 ? umsatzMonat / bon : 0;
  return { low: MODEL.marketLow * umsatzMonat + MODEL.marketLowTx * tx, high: MODEL.marketHigh * umsatzMonat };
}

export function calcSavings(input: CalcInput): CalcResult {
  const U = input.umsatzJahr / 12;
  const bon = input.bon;
  if (!(U > 0) || !(bon > 0)) {
    return { ok: false, hasSavings: false, micropayment: false, basis: 'markt', monthly: { low: 0, high: 0 }, yearly: { low: 0, high: 0 }, swipayMonthly: 0, istMonthly: null, tx: 0 };
  }
  const tx = U / bon;
  const swipay = swipayCost(input.cluster, U, bon);
  const micropayment = bon < MODEL.microBon;
  let lowM: number, highM: number, basis: 'ist' | 'markt', ist: number | null = null;
  if (input.istProzent && input.istProzent > 0) ist = (input.istProzent / 100) * U;
  else if (input.istMonat && input.istMonat > 0) ist = input.istMonat;
  if (ist !== null) {
    basis = 'ist';
    const mid = ist - swipay;
    lowM = Math.max(0, MODEL.bandLow * mid);
    highM = Math.max(0, MODEL.bandHigh * mid);
  } else {
    basis = 'markt';
    const m = marketCost(U, bon);
    lowM = Math.max(0, m.low - swipay);
    highM = Math.max(0, m.high - swipay);
  }
  const monthly = { low: r10(lowM), high: r10(highM) };
  const yearly = { low: r50(12 * lowM), high: r50(12 * highM) };
  const hasSavings = highM > 0 && monthly.high > 0;
  return { ok: true, hasSavings, micropayment, basis, monthly, yearly, swipayMonthly: swipay, istMonthly: ist, tx };
}

/** Branchenseite → Rechner-Cluster */
export function clusterForPath(pfad: string): ClusterKey {
  if (/restaurant|gastro|cafe|café|bar/.test(pfad)) return 'gastro';
  if (/coiffeur|beauty|kosmetik/.test(pfad)) return 'beauty';
  if (/detailhandel|laden|retail/.test(pfad)) return 'retail';
  if (/praxis|dienstleistung/.test(pfad)) return 'dienstleistung';
  if (/markt|kiosk|take/.test(pfad)) return 'kiosk';
  if (/hotel/.test(pfad)) return 'hotel';
  if (/online|shop|webshop/.test(pfad)) return 'ecom';
  if (/verein/.test(pfad)) return 'verein';
  return 'sonstige';
}

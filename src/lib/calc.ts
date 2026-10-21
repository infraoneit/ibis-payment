/** Rechnerlogik. Formel:
 *  Gebühren/Monat = Umsatz × (1 − Kreditanteil) × Debitsatz + Umsatz × Kreditanteil × Kreditsatz
 *                 + Anzahl Zahlungen × Fixbetrag + Monatsgebühr
 *  Anzahl Zahlungen = round(Umsatz / Durchschnittsbetrag), mindestens 1.
 */
export type Tarif = { debit: number; kredit: number; tx: number; fix: number };
export type CalcInput = { umsatz: number; bon: number; kreditanteil: number };

export function transactions(umsatz: number, bon: number) {
  return Math.max(1, Math.round(umsatz / Math.max(1, bon)));
}

export function monthlyFees(t: Tarif, umsatz: number, tx: number, kreditanteil: number) {
  const k = kreditanteil / 100;
  return (umsatz * (1 - k) * t.debit) / 100 + (umsatz * k * t.kredit) / 100 + tx * t.tx + t.fix;
}

export function compare(ours: Tarif, theirs: Tarif, input: CalcInput) {
  const tx = transactions(input.umsatz, input.bon);
  const feeUs = monthlyFees(ours, input.umsatz, tx, input.kreditanteil);
  const feeThem = monthlyFees(theirs, input.umsatz, tx, input.kreditanteil);
  const diffMonth = feeThem - feeUs;
  return {
    tx,
    feeUs,
    feeThem,
    diffMonth,
    diffYear: diffMonth * 12,
    effUs: input.umsatz > 0 ? (feeUs / input.umsatz) * 100 : 0,
    effThem: input.umsatz > 0 ? (feeThem / input.umsatz) * 100 : 0,
  };
}

/** Kosten über n Monate: Miete vs. Kauf (nur Gerätekosten). */
export function deviceCost(months: number, miete: number, kauf: number) {
  return { miete: miete * months, kauf };
}

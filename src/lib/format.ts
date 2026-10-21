/** Schweizer Zahlenformat: CHF 25'000, 0.75 % */
export function fmtInt(n: number) {
  return Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export function chf(n: number, decimals = 0) {
  const sign = n < 0 ? '−' : '';
  if (decimals === 0) return `${sign}CHF ${fmtInt(n)}`;
  const abs = Math.abs(n);
  const int = Math.floor(abs);
  const frac = Math.round((abs - int) * 10 ** decimals)
    .toString()
    .padStart(decimals, '0');
  return `${sign}CHF ${fmtInt(int)}.${frac}`;
}

export function pct(n: number, decimals = 2) {
  return `${n.toFixed(decimals)} %`;
}

export function dateDE(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('de-CH', { month: 'long', year: 'numeric' });
}

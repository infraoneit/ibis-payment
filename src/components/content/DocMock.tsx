import { Icon } from '@/components/ui/Icons';

export type DocRow = { label: string; value: string; strong?: boolean; check?: boolean };
export type DocSpec = { title: string; subtitle?: string; rows: DocRow[]; total?: { label: string; value: string }; stamp?: string };

/** Dokument-Mockup (Abrechnung, Checkliste, Police, Kontoauszug) als Hero-Visual: ruhig, markenkonform, kein Stockbild. */
export function DocMock({ spec }: { spec: DocSpec }) {
  return (
    <div className="docmock" aria-hidden="true">
      <div className="doc-head">
        <div>
          <div className="doc-title">{spec.title}</div>
          {spec.subtitle && <div className="doc-sub">{spec.subtitle}</div>}
        </div>
        {spec.stamp && <span className="doc-stamp">{spec.stamp}</span>}
      </div>
      <div className="doc-rows">
        {spec.rows.map((r) => (
          <div key={r.label} className={`doc-row${r.strong ? ' strong' : ''}`}>
            <span className="doc-label">
              {r.check && (
                <span className="doc-check">
                  <Icon.check />
                </span>
              )}
              {r.label}
            </span>
            <span className="doc-value num">{r.value}</span>
          </div>
        ))}
      </div>
      {spec.total && (
        <div className="doc-total">
          <span>{spec.total.label}</span>
          <span className="num">{spec.total.value}</span>
        </div>
      )}
    </div>
  );
}

/** Vorlagen je Seite (Inhalte entsprechen den Konditionen und Fakten der Seite; Beträge sind Beispiele). */
export const DOC_SPECS: Record<string, DocSpec> = {
  '/wissen/kartenzahlung-gebuehren-schweiz': {
    title: 'Debitzahlung CHF 100.00',
    subtitle: 'So teilt sich die Gebühr auf',
    rows: [
      { label: 'Interchange, an die Bank des Kunden', value: '0.12 %' },
      { label: 'Netzwerkgebühr, an Visa oder Mastercard', value: '0.09 %' },
      { label: 'Marge ibis payment', value: '0.54 %', strong: true },
      { label: 'Fixbetrag pro Zahlung', value: 'CHF 0.05' },
    ],
    total: { label: 'Gebühr auf dieser Zahlung', value: 'CHF 0.80' },
    stamp: 'Beispiel',
  },
  '/wissen/rollen-im-payment': {
    title: 'Eine Zahlung, fünf Beteiligte',
    subtitle: 'Wer was tut, in der Reihenfolge der Zahlung',
    rows: [
      { label: 'Terminal (PayTec)', value: 'liest die Karte' },
      { label: 'Acquirer (TeleCash/Fiserv)', value: 'holt die Freigabe' },
      { label: 'Kartennetzwerk', value: 'leitet weiter' },
      { label: 'Issuer, Bank des Kunden', value: 'gibt frei' },
      { label: 'Händler', value: 'erhält die Gutschrift', strong: true },
    ],
    stamp: 'Ablauf',
  },
  '/wissen/psp-oder-broker': {
    title: 'PSP oder Broker',
    subtitle: 'Zwei Rollen, zwei Aufgaben',
    rows: [
      { label: 'Betreibt die Technik', value: 'PSP' },
      { label: 'Wickelt Zahlungen ab', value: 'PSP' },
      { label: 'Ordnet Kosten und Zuständigkeiten ein', value: 'Broker' },
      { label: 'Vermittelt den passenden Vertrag', value: 'Broker' },
      { label: 'Weist die Marge in der Offerte aus', value: 'ibis payment', strong: true },
    ],
  },
  '/wissen/typische-fehler': {
    title: 'Abrechnung prüfen',
    subtitle: 'Einmal im Jahr, zehn Minuten',
    rows: [
      { label: 'Effektiver Satz berechnet', value: 'Gebühren / Umsatz', check: true },
      { label: 'Fixbetrag pro Zahlung bekannt', value: 'CHF 0.05', check: true },
      { label: 'Kündigungsfrist notiert', value: 'monatlich', check: true },
      { label: 'Mindestgebühr geprüft', value: 'keine', check: true },
      { label: 'Vergleich mit gleichen Umsätzen', value: 'offen' },
    ],
  },
  '/wissen/mieten-oder-kaufen': {
    title: 'Miete oder Kauf, PayTec N62',
    subtitle: 'Gerätekosten über die Laufzeit, exkl. MwSt.',
    rows: [
      { label: 'Miete, 12 Monate', value: 'CHF 228' },
      { label: 'Miete, 24 Monate', value: 'CHF 456' },
      { label: 'Miete, 36 Monate', value: 'CHF 684' },
      { label: 'Kauf, einmalig', value: 'CHF 390', strong: true },
    ],
    total: { label: 'Miete und Kauf gleichauf nach', value: 'rund 21 Monaten' },
    stamp: 'Richtwerte',
  },
  '/dienstleistungen/telefonie': {
    title: 'Telefonie und Internet',
    subtitle: 'Beispiel für einen Betrieb mit 5 Benutzern',
    rows: [
      { label: 'peoplefone vPBX BASIC, 1 bis 5 Benutzer', value: 'CHF 15.00 / Mt.' },
      { label: 'Geschäftsnummer', value: 'CHF 5.00 / Mt.' },
      { label: 'iway Business Internet 1 Gbit/s', value: 'CHF 49.00 / Mt.' },
      { label: 'Einrichtung durch InfraOne', value: 'nach Aufwand' },
    ],
    total: { label: 'Fix pro Monat, inkl. MwSt.', value: 'CHF 69.00' },
    stamp: 'Listenpreise',
  },
  '/dienstleistungen/versicherungen': {
    title: 'Prämien-Check',
    subtitle: 'Was der Broker für Ihren Betrieb prüft',
    rows: [
      { label: 'Betriebshaftpflicht', value: 'Deckung, Prämie', check: true },
      { label: 'Sachversicherung', value: 'Inventar, Waren', check: true },
      { label: 'Betriebsunterbruch', value: 'Ertragsausfall', check: true },
      { label: 'Cyber', value: 'Daten, Systeme', check: true },
      { label: 'UVG und KTG', value: 'Personal', check: true },
    ],
    stamp: 'Kostenlos',
  },
  '/dienstleistungen/treuhand': {
    title: 'Monatsabschluss',
    subtitle: 'Was aus Kasse und Terminal in die Buchhaltung fliesst',
    rows: [
      { label: 'Kassenabschluss', value: 'täglich' },
      { label: 'Kartenabrechnung ibis payment', value: 'eine Seite' },
      { label: 'MwSt.-Abrechnung', value: 'nach Periode' },
      { label: 'Lohn', value: 'monatlich' },
      { label: 'Jahresabschluss', value: 'jährlich', strong: true },
    ],
  },
};

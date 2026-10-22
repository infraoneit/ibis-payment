import { SimplePriceList } from '@/components/pricing/PriceList';
import { Intro } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';

/** Telefonie (peoplefone) und Internet (iway), eingerichtet und betreut von InfraOne IT Solutions.
 *  Listenpreise der Anbieter, Stand Oktober 2026, von deren öffentlichen Preisseiten. */
export const TELEFONIE_ROWS = [
  { label: 'vPBX BASIC, 1 bis 5 Benutzer', beschreibung: 'Virtuelle Telefonanlage: Verteilgruppen, 1 Sprachmenü, 1 Warteschlange, App für Handy und PC. 24 Monate Laufzeit; 12 Monate CHF 20.00', wert: 'CHF 15.00 / Monat' },
  { label: 'vPBX BASIC, 6 bis 10 Benutzer', beschreibung: 'Dieselben Funktionen für bis zu zehn Benutzer. 24 Monate Laufzeit; 12 Monate CHF 30.00', wert: 'CHF 25.00 / Monat' },
  { label: 'vPBX PLUS, 1 bis 5 Benutzer', beschreibung: 'Zusätzlich 5 Sprachmenüs, 5 Warteschlangen, Softphones und Auswertungen. 24 Monate; 12 Monate CHF 30.00', wert: 'CHF 25.00 / Monat' },
  { label: 'vPBX PLUS, 6 bis 10 Benutzer', beschreibung: '24 Monate Laufzeit; 12 Monate CHF 40.00', wert: 'CHF 35.00 / Monat' },
  { label: 'Geschäftsnummer', beschreibung: 'Eine Schweizer Festnetznummer, sofort aktiv. Block mit 10 Nummern CHF 15.00', wert: 'CHF 5.00 / Monat' },
  { label: 'Nummer mitnehmen (Portierung)', beschreibung: 'Einmalig, analoge Einzelnummer. ISDN-Block CHF 69.00', wert: 'CHF 39.00' },
  { label: 'Gespräche', beschreibung: 'Schweizer Festnetz pro Minute CHF 0.03, Mobilnetz CHF 0.25; alternativ FLAT CH ab CHF 19.00 pro Monat (1000 Minuten Festnetz, 200 Mobil, ab 2 Benutzern)', wert: 'nach Verbrauch' },
];

export const INTERNET_ROWS = [
  { label: 'Business Internet 20 Mbit/s', beschreibung: 'Symmetrisch, Router leihweise inbegriffen', wert: 'CHF 29.00 / Monat' },
  { label: 'Business Internet 100 Mbit/s', beschreibung: 'Symmetrisch, reicht für Kasse, Terminal, Office und Gäste-WLAN', wert: 'CHF 39.00 / Monat' },
  { label: 'Business Internet 1 Gbit/s', beschreibung: 'Symmetrisch, Glasfaser, für mehrere Kassenplätze, Kameras und Backup', wert: 'CHF 49.00 / Monat' },
  { label: 'Aufschaltung', beschreibung: 'Einmalig auf das erste Produkt. Mindestlaufzeit 12 Monate, danach monatlich kündbar', wert: 'CHF 50.00' },
  { label: 'SLA KMU Access', beschreibung: 'Support Montag bis Samstag 7 bis 20 Uhr, Störungsbehebung rund 10 Stunden', wert: 'CHF 35.00 / Monat' },
  { label: 'SLA KMU Business Access', beschreibung: 'Rund um die Uhr, Störungsbehebung unter 8 Stunden, proaktive Überwachung', wert: 'CHF 145.00 / Monat' },
];

export const INFRAONE_ROWS = [
  { label: 'Einrichtung Telefonanlage', beschreibung: 'Benutzer, Rufverteilung, Öffnungszeiten-Ansage, App auf dem Handy, Tischtelefone', wert: 'nach Aufwand' },
  { label: 'Tischtelefon', beschreibung: 'Yealink, eingerichtet und beschriftet', wert: 'ab CHF [120.00]' },
  { label: 'Netzwerk und WLAN', beschreibung: 'Router, Kassennetz getrennt vom Gäste-WLAN, Terminal und Kasse priorisiert', wert: 'nach Aufwand' },
  { label: 'Support', beschreibung: 'Fernwartung und vor Ort, ein Ansprechpartner für Telefon, Internet, Kasse und Terminal', wert: 'nach Aufwand' },
];

export function TelefonieInternet() {
  return (
    <>
      <Reveal>
        <Intro title="Telefonie: peoplefone vPBX" text="Virtuelle Telefonanlage aus der Schweiz, ohne Anlage im Keller. Preise inkl. MwSt. laut Preisliste peoplefone.com, Stand Oktober 2026. Für Betriebe mit mehr als 10 Benutzern offerieren wir separat." />
      </Reveal>
      <Reveal delay={1}>
        <SimplePriceList rows={TELEFONIE_ROWS} caption="Listenpreise peoplefone AG, inkl. MwSt., Stand Oktober 2026. Mindestlaufzeit gemäss gewähltem Tarif. Verbindlich ist die Offerte." />
      </Reveal>
      <Reveal>
        <Intro title="Internet: iway Business" text="Symmetrische Glasfaser- und DSL-Anschlüsse für Geschäftskunden, Router inbegriffen. Preise exkl. MwSt. laut iway.ch/business, Stand Oktober 2026. Verfügbarkeit hängt von der Adresse ab, das prüfen wir für Sie." />
      </Reveal>
      <Reveal delay={1}>
        <SimplePriceList rows={INTERNET_ROWS} caption="Listenpreise iWay AG, exkl. MwSt., Stand Oktober 2026. Geschwindigkeit je nach Anschluss am Standort." />
      </Reveal>
      <Reveal>
        <Intro title="Einrichtung und Betreuung: InfraOne IT Solutions" text="InfraOne aus Winterthur richtet Telefonanlage, Internet und Netzwerk bei Ihnen ein, betreut beides und ist dieselbe Firma, die Kasse und Terminal ans Netz hängt. Ein Ansprechpartner statt drei Hotlines." />
      </Reveal>
      <Reveal delay={1}>
        <SimplePriceList rows={INFRAONE_ROWS} caption="InfraOne IT Solutions GmbH, Winterthur. Preise exkl. MwSt., verbindlich ist die Offerte." />
      </Reveal>
    </>
  );
}

# ibis-payment.ch

Website der IBIS Management GmbH (Marke ibis payment): Zahlterminals, Kassensysteme und Online-Zahlungen für Schweizer Betriebe. Umsetzung: InfraOne IT Solutions GmbH, Winterthur.

Stack: Next.js 15.5 (App Router, TypeScript), Tailwind 4 mit eigenen Design-Tokens, Keystatic als CMS, Netlify (Next.js Runtime, Forms, Image CDN), Hanken Grotesk selbst gehostet.

## Setup

```bash
npm install
npm run dev
```

Website: http://localhost:3000. CMS: http://localhost:3000/keystatic (Modus `local`, schreibt direkt in `content/`).

Build und Produktionsserver lokal:

```bash
npm run build
npm run start
```

## Ordner

| Pfad | Inhalt |
|---|---|
| `content/site.yaml` | Firma, Kontakt, Berater, Servicezusagen, Partner, Vertragspartner |
| `content/konditionen.yaml` | **Einzige Datenquelle für Preise.** Preisliste, Rechner, Gebühren-Zerlegung und Beispielrechnungen lesen hier |
| `content/geraete/*.yaml` | Terminals mit technischen Daten, Miete, Kauf, Datenblatt |
| `content/faq/*.yaml` | FAQ nach Bereich (konditionen, support, geraete, kassen, online, softpos) |
| `content/referenzen/*.yaml` | Kundenstimmen; erscheinen nur mit `aktiv: true` |
| `content/team/*.yaml` | Team |
| `content/landingpages/*.yaml` | SEO-, Branchen-, Webdesign-, Wissens- und Dienstleistungsseiten (Pfad im Feld `pfad`) |
| `keystatic.config.ts` | CMS-Schema |
| `src/app/(site)` | Seiten mit Header und Footer |
| `src/app/(site)/[...slug]` | Template für alle Landingpages |
| `src/components` | Komponenten (Hero-Terminal, Rechner, Preisliste, Formulare, Mega-Menü) |
| `src/lib/swipay-calc.ts` | Rechnermodell (nach dem SwiPay-Partnerrechner), Branchen-Cluster und Rundung |
| `src/lib/nav.ts` | Menüstruktur (Header, Footer) |
| `public/brand` | Logo-Assets (SVG), `public/` Favicons und OG-Bild |
| `public/__forms.html` | Formulardefinitionen für Netlify Forms |
| `netlify.toml` | Build, Redirects, Security-Headers, Caching |

## Preise pflegen

1. `/keystatic` aufrufen, «Konditionen (Preisliste und Rechner)» öffnen.
2. Sätze ändern, **Stand der Preise** auf das aktuelle Datum setzen, speichern.
3. Rechner, Preisliste, Gebühren-Zerlegung, Beispielrechnungen auf den Branchenseiten und der Geräteseite aktualisieren sich beim nächsten Deploy automatisch.

Gerätepreise stehen pro Modell in «Terminals und Geräte». Der Ersparnis-Rechner liest **nicht** aus `konditionen.yaml`, sondern rechnet mit dem Modell des SwiPay-Partnerrechners (siehe unten); die Vergleichswerte in `konditionen.yaml` bleiben für die Gebühren-Zerlegung erhalten.

Platzhalter sind in eckigen Klammern geschrieben, z. B. `[052 000 00 00]`. Vollständige Liste: `docs/07-platzhalter.md` im Projektordner darüber.

## Dark Mode

Die Website folgt der Systemeinstellung (`prefers-color-scheme`) und bietet im Header einen Umschalter. Die Wahl liegt im `localStorage` (Schlüssel `theme`), kein Cookie. Farben sind ausschliesslich Tokens in `src/app/globals.css` (`:root` hell, `:root[data-theme="dark"]` dunkel).

## Rechnermodell

Der Ersparnis-Rechner liefert dieselben Ergebnisse wie der Partnerrechner von SwiPay (`swipay.ch/partner-lead/?partner=ibis`). Das Modell steht in `src/lib/swipay-calc.ts` und wurde am 25. Oktober 2026 aus dessen Resultaten abgeleitet:

```
U   = Jahresumsatz / 12                      tx = U / Durchschnittsbon
SwiPay-Kosten  = r(Branche) × U + 0.025 × tx, mindestens 0.077 × tx
Ist-Basis      (heutige Kondition angegeben): mid = Ist − SwiPay; Spanne 0.9 × mid … 1.1 × mid
Markt-Basis    (keine Angabe): Markt = 1.49 % × U + 0.0025 × tx … 1.938 % × U; Spanne Markt − SwiPay
Rundung: Monat auf 10 Franken, Jahr auf 50 Franken (kaufmännisch); Kleinstbetrag-Hinweis bei Bon < 25
```

Branchensätze r: Gastronomie und Beauty 0.674 %, Kiosk 0.659 %, Detailhandel und Verein 0.718 %, Dienstleistung 0.744 %, Hotel, Online-Shop und Sonstige 0.774 %. Standardbon je Branche wie bei SwiPay (Gastronomie 34, Detailhandel 85, Beauty 120, Hotel 188, Kiosk 12, Online 60, Dienstleistung 250, Verein 100, Sonstige 50).

Prüfwerte (Gastronomie, 120'000 pro Jahr, Bon 50): ohne Angabe CHF 80–120 pro Monat und 950–1'450 pro Jahr; mit heutiger Gebühr 1.5 % CHF 70–90 pro Monat und 850–1'000 pro Jahr. Von 118 gemessenen SwiPay-Werten trifft das Modell 117 exakt (eine Abweichung von 10 Franken bei Bon 100 ohne Angabe). SwiPays Endpunkt selbst ist auf die Herkunft swipay.ch beschränkt und kann von ibis-payment.ch aus nicht aufgerufen werden.

## Deploy auf Netlify

1. Repository auf GitHub, Site in Netlify anlegen («Import from Git»). `netlify.toml` setzt Build-Befehl und Plugin.
2. Domain `ibis-payment.ch` als Primary Domain, `www.ibis-payment.ch` und `ibis-mgmt.ch` als Alias hinzufügen (Redirects stehen in `netlify.toml`). HTTPS wird von Netlify ausgestellt.
3. **Forms:** Nach dem ersten Deploy unter Site → Forms die vier Formulare prüfen (`kontakt`, `abrechnung`, `webdesign`, `praemiencheck`). Unter Forms → Notifications je eine E-Mail-Benachrichtigung anlegen: `kontakt`, `abrechnung`, `praemiencheck` an info@ibis-payment.ch, `webdesign` an die Adresse von InfraOne. Spam-Filter (Akismet) ist standardmässig aktiv, zusätzlich Honeypot-Feld `bot-field`.
4. **Keystatic im GitHub-Modus** (damit der Kunde Preise selbst pflegt):
   - Lokal `npm run dev` starten, `/keystatic` öffnen und dem Assistenten «Set up GitHub» folgen; er erstellt eine GitHub App und schreibt `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` in `.env.local`.
   - Diese drei Werte plus `KEYSTATIC_GITHUB_REPO=owner/repo` als Environment Variables in Netlify setzen und neu deployen.
   - Der Kunde braucht einen GitHub-Account mit Schreibrecht auf das Repository und meldet sich unter https://ibis-payment.ch/keystatic an. Jede Änderung ist ein Commit; Netlify deployt automatisch.
5. Nach dem Go-live: Google Search Console, Bing Webmaster und Google Business Profile gemäss `docs/05-seo.md` einrichten.

## Qualität

- `npm run lint` und `npx tsc --noEmit` vor jedem Deploy.
- Alle Inhaltsdateien müssen gültiges YAML sein (Werte mit Doppelpunkt in Anführungszeichen).
- Lighthouse-Ziel mobil: Performance, Accessibility, Best Practices, SEO je ≥ 95 (gemessen gegen `npm run start`).

## Lizenz der Schrift

Hanken Grotesk, SIL Open Font License 1.1 (`src/fonts/OFL.txt`).

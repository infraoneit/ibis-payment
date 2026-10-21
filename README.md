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
| `src/lib/calc.ts` | Rechnerformel |
| `src/lib/nav.ts` | Menüstruktur (Header, Footer) |
| `public/brand` | Logo-Assets (SVG), `public/` Favicons und OG-Bild |
| `public/__forms.html` | Formulardefinitionen für Netlify Forms |
| `netlify.toml` | Build, Redirects, Security-Headers, Caching |

## Preise pflegen

1. `/keystatic` aufrufen, «Konditionen (Preisliste und Rechner)» öffnen.
2. Sätze ändern, **Stand der Preise** auf das aktuelle Datum setzen, speichern.
3. Rechner, Preisliste, Gebühren-Zerlegung, Beispielrechnungen auf den Branchenseiten und der Geräteseite aktualisieren sich beim nächsten Deploy automatisch.

Gerätepreise stehen pro Modell in «Terminals und Geräte». Die Vergleichswerte im Rechner (Grossanbieter, App-Anbieter) brauchen eine **Quelle und ein Datum**; ohne Quelle wird die Option im Rechner nicht angezeigt.

Platzhalter sind in eckigen Klammern geschrieben, z. B. `[052 000 00 00]`. Vollständige Liste: `docs/07-platzhalter.md` im Projektordner darüber.

## Rechnerformel

```
Gebühren pro Monat = Umsatz × (1 − Kreditanteil) × Debitsatz
                   + Umsatz × Kreditanteil × Kreditsatz
                   + Anzahl Zahlungen × Fixbetrag
                   + Terminal-Miete
Anzahl Zahlungen   = Umsatz / Durchschnittsbetrag (gerundet, mindestens 1)
```

Prüfwert: Umsatz 25'000, Durchschnittsbetrag 45, Kreditanteil 35 %, Vergleich Grossanbieter (1.29 % / 1.29 % / 0.15 / 35) ergibt eine Ersparnis von CHF 1'954 pro Jahr.

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

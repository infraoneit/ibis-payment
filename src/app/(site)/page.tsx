import Link from 'next/link';
import type { Metadata } from 'next';
import { getKonditionen, getReferenzen, getSite } from '@/lib/content';
import { pageMeta, SITE_URL } from '@/lib/seo';
import { HeroTerminal } from '@/components/home/HeroTerminal';
import { PaymentMarquee } from '@/components/home/PaymentMarquee';
import { Promises } from '@/components/home/Promises';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { FeeBreakdown } from '@/components/pricing/FeeBreakdown';
import { PriceList } from '@/components/pricing/PriceList';
import { Calculator } from '@/components/pricing/Calculator';
import { BauformGrid } from '@/components/devices/DeviceGrid';
import { Flow } from '@/components/content/Flow';
import { BeraterCard, SupportStats } from '@/components/content/SupportCard';
import { CtaBand } from '@/components/content/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { Icon } from '@/components/ui/Icons';
import { chf, dateDE, pct } from '@/lib/format';

export const metadata: Metadata = pageMeta({
  title: 'Zahlterminal Schweiz: Gebühren, die Sie verstehen',
  description:
    'Zahlterminals, Kassen und Online-Zahlungen für Schweizer Betriebe. Preisliste öffentlich, Rechner mit Vergleich, ein Berater mit Direktwahl, Installation vor Ort.',
  path: '/',
});

const PAKET = [
  { icon: <Icon.terminal />, t: 'Zahlterminal', p: 'Mobil, stationär oder im Automaten. ep2-zertifiziert, TWINT direkt auf dem Display.', href: '/geraete' },
  { icon: <Icon.register />, t: 'Kassensystem', p: 'Kasse und Terminal reden miteinander. Kein Abtippen, Abschluss stimmt mit der Abrechnung.', href: '/kassensysteme' },
  { icon: <Icon.globe />, t: 'Online-Zahlungen', p: 'Webshop, Zahllink, über 40 Methoden. Laden und Online auf einer Abrechnung.', href: '/online-zahlungen' },
  { icon: <Icon.monitor />, t: 'Website und IT', p: 'Website, E-Mail, WLAN, Backup und Support mit InfraOne IT Solutions, Winterthur.', href: '/webdesign' },
  { icon: <Icon.phone />, t: 'Telefonie und Internet', p: 'Geschäftsnummer und Telefonanlage in der Cloud, Business-Internet bis 1 Gbit/s, Netzwerk im Betrieb. Mit InfraOne, peoplefone und iway.', href: '/dienstleistungen/telefonie' },
  { icon: <Icon.umbrella />, t: 'Versicherungen', p: 'Unabhängiger Prämien-Check für Haftpflicht, Sach, Cyber und Personal.', href: '/dienstleistungen/versicherungen' },
  { icon: <Icon.book />, t: 'Treuhand', p: 'Buchhaltung, MwSt., Lohn und Abschluss, angebunden an Kasse und Kartenabrechnung.', href: '/dienstleistungen/treuhand' },
];

export default async function Home() {
  const [site, k, refs] = await Promise.all([getSite(), getKonditionen(), getReferenzen()]);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#localbusiness`,
          name: site.legalName,
          alternateName: 'ibis payment',
          url: SITE_URL,
          image: `${SITE_URL}/og-image.png`,
          telephone: site.phoneHref,
          email: site.email,
          priceRange: 'CHF',
          address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: 'CH' },
          areaServed: 'CH',
          openingHours: site.openingHoursSchema,
          parentOrganization: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <section className="hero section no-line">
        <div className="wrap">
          <div className="hero-copy">
            <h1>
              Kartenzahlung mit Gebühren, die Sie <span className="ul-draw">verstehen</span>.
            </h1>
            <p className="sub">Terminals, Kassen und Online-Zahlungen für Schweizer Betriebe. Jede Gebühr steht in der Offerte. Und wenn etwas nicht läuft, nimmt jemand ab.</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href="/konditionen#rechner">
                <Icon.calculator style={{ width: 18, height: 18 }} /> Ersparnis berechnen
              </Link>
              <Link className="btn btn-outline" href="/konditionen">
                Preisliste
              </Link>
              <Link className="link" href="/kontakt">
                Beratung vor Ort <Arrow />
              </Link>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <PaymentMarquee />

      <section className="section no-line tight">
        <div className="wrap">
          <div className="facts-strip" aria-label="Unsere Zusagen">
            <div>
              <span className="icon-ring"><Icon.receipt /></span>
              <div><b>Jede Gebühr in der Offerte</b><span>Interchange, Netzwerk, Marge getrennt</span></div>
            </div>
            <div>
              <span className="icon-ring"><Icon.clock /></span>
              <div><b>Offerte innert 24 Stunden</b><span>nach Erhalt Ihrer Abrechnung</span></div>
            </div>
            <div>
              <span className="icon-ring"><Icon.calculator /></span>
              <div><b>Bestpreis-Zusage</b><span>Wir unterbieten oder sagen, dass es nicht geht</span></div>
            </div>
            <div>
              <span className="icon-ring"><Icon.swap /></span>
              <div><b>Monatlich kündbar</b><span>keine Aufschaltung, keine Mindestgebühr</span></div>
            </div>
          </div>
        </div>
      </section>

      <Promises />

      <Section tone="dark" label="Transparenz" sub="So setzt sich eine Gebühr zusammen, am Beispiel einer Schweizer Debitkarte.">
        <Reveal>
          <Intro
            title={`Von ${pct(k.debit)} gehen ${pct((k.zerlegung.interchange ?? 0) + (k.zerlegung.netzwerk ?? 0))} an Bank und Kartennetzwerk. Der Rest ist unsere Arbeit.`}
            text="Die ersten zwei Anteile sind für alle Anbieter gleich und in der Schweiz geregelt. Unterschiede entstehen nur in der Marge. Darum zeigen wir sie."
          />
        </Reveal>
        <Reveal delay={1}>
          <FeeBreakdown debit={k.debit} interchange={k.zerlegung.interchange ?? 0} netzwerk={k.zerlegung.netzwerk ?? 0} txFix={k.txFix} />
        </Reveal>
        <Reveal delay={2}>
          <div className="hero-ctas">
            <Link className="btn btn-white" href="/konditionen#rechner">
              Jetzt mit Ihren Zahlen rechnen
            </Link>
            <Link className="link" href="/wissen/kartenzahlung-gebuehren-schweiz">
              Gebühren im Detail verstehen <Arrow />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section tone="grey" id="konditionen" label="Konditionen" sub={`Auszug, Stand ${dateDE(k.stand)}. Die vollständige Liste finden Sie auf der Seite Konditionen.`}>
        <Reveal>
          <Intro title="Die Preisliste steht hier. Nicht «ab», nicht «auf Anfrage»." />
        </Reveal>
        <Reveal delay={1}>
          <PriceList k={k} variant="short" caption={`${k.hinweis} Stand ${dateDE(k.stand)}.`} />
        </Reveal>
        <Reveal>
          <Link className="link" href="/konditionen">
            Vollständige Preisliste <Arrow />
          </Link>
        </Reveal>
        <Reveal>
          <Calculator stand={dateDE(k.stand)} />
        </Reveal>
      </Section>

      <Section id="geraete" label="Terminals" sub={`Terminals von PayTec, für den Schweizer Markt zertifiziert. Miete ab ${chf(k.miete)} pro Monat, Kauf ab ${chf(k.kauf ?? 0)}.`}>
        <Reveal>
          <Intro title="Drei Bauformen. Wir sagen Ihnen vor Ort, welche zu Ihrem Ablauf passt." />
        </Reveal>
        <BauformGrid />
        <Reveal>
          <Link className="link" href="/geraete">
            Alle Terminals mit Daten und Preisen <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section tone="dark" id="gesamtpaket" label="Gesamtpaket" sub="Alles, was Ihr Betrieb braucht, aus einer Hand und mit einer Nummer.">
        <Reveal>
          <Intro title="Terminal, Kasse, Website, Telefon, Versicherung, Treuhand. Ein Ansprechpartner." text="Unsere Berater sehen Ihren Betrieb von innen. Darum liefern und vermitteln wir auch alles rundherum, mit Partnern, die wir persönlich kennen, und zu Konditionen, die wir selbst geprüft haben." />
        </Reveal>
        <div className="svcs" style={{ borderTopColor: 'var(--on-dark-line)' }}>
          {PAKET.map((s, i) => (
            <Reveal key={s.href} delay={(i % 3) as 0 | 1 | 2}>
              <Link className="svc" href={s.href} style={{ borderBottomColor: 'var(--on-dark-line)' }}>
                <span className="icon-ring ink" aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{s.t}</h3>
                <p className="muted">{s.p}</p>
                <div className="arrow" style={{ borderColor: 'var(--on-dark-line)', color: '#fff' }}>
                  <Arrow />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="hero-ctas">
            <Link className="btn btn-white" href="/kontakt?thema=Mehreres+davon">
              Gesamtpaket anfragen
            </Link>
            <Link className="link" href="/webdesign">
              Website für Ihren Betrieb <Arrow />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section id="ablauf" label="Ablauf" sub="Vom ersten Gespräch bis zur ersten Zahlung, in fünf Schritten.">
        <Reveal>
          <Intro title="In einer Woche von der Abrechnung zum laufenden Terminal." />
        </Reveal>
        <Flow />
      </Section>

      <Section tone="grey" id="support" label="Support" sub="Persönlich, nicht per Ticket.">
        <div className="support">
          <Reveal>
            <div className="intro">
              <h2>Ein Anruf. Ein Mensch, der Ihren Betrieb kennt.</h2>
              <p>Ihr Berater hat Ihr Terminal selbst eingerichtet. Er weiss, welche Kasse Sie haben, wie Ihr WLAN heisst und wann bei Ihnen am meisten los ist.</p>
              <BeraterCard site={site} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <SupportStats />
          </Reveal>
        </div>
        <Reveal>
          <Link className="link" href="/support">
            So arbeitet unser Support <Arrow />
          </Link>
        </Reveal>
      </Section>

      {refs.length > 0 && (
        <Section id="referenzen" label="Referenzen" sub="Stimmen aus Betrieben, die gewechselt haben.">
          <div className="quotes">
            {refs.slice(0, 3).map((r) => (
              <Reveal key={r.slug} className="qq">
                <p>«{r.zitat}»</p>
                <div className="who">
                  <b>{r.name}</b>
                  {r.betrieb}, {r.ort}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Offerte innert 24 Stunden. Verbindlich." text="Schicken Sie uns Ihre letzte Abrechnung oder rufen Sie an. Sie erhalten dieselben Umsätze mit unseren Sätzen gerechnet, Zahl für Zahl. Auf Wunsch kommen wir direkt vorbei." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

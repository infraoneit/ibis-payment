import Link from 'next/link';
import type { Metadata } from 'next';
import { getGeraete, getKonditionen, getReferenzen, getSite } from '@/lib/content';
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
import { dateDE, pct } from '@/lib/format';

export const metadata: Metadata = pageMeta({
  title: 'Zahlterminal Schweiz: Gebühren, die Sie verstehen',
  description:
    'Zahlterminals, Kassen und Online-Zahlungen für Schweizer Betriebe. Preisliste öffentlich, Rechner mit Vergleich, ein Berater mit Direktwahl, Installation vor Ort.',
  path: '/',
});

const SERVICES = [
  { href: '/webdesign', t: 'Website und IT', p: 'Website, E-Mail auf Microsoft 365, WLAN und Netzwerk im Betrieb, Backup und Support. Mit InfraOne IT Solutions, Winterthur.' },
  { href: '/dienstleistungen/telefonie', t: 'Telefonie', p: 'Geschäftsnummer, Telefonanlage in der Cloud, Tischtelefone und Handy-App. Monatlich kündbar.' },
  { href: '/dienstleistungen/versicherungen', t: 'Versicherungen', p: 'Betriebshaftpflicht, Sachversicherung, Cyber und Personal. Unabhängiger Prämienvergleich, kostenlos.' },
  { href: '/dienstleistungen/treuhand', t: 'Treuhand', p: 'Buchhaltung, Mehrwertsteuer, Lohn und Jahresabschluss, angebunden an Kasse und Kartenabrechnung.' },
];

export default async function Home() {
  const [site, k, geraete, refs] = await Promise.all([getSite(), getKonditionen(), getGeraete(), getReferenzen()]);
  const vergleiche = k.vergleiche.filter((v) => v.quelle).map((v) => ({ id: v.id, label: v.label, debit: v.debit ?? 0, kredit: v.kredit ?? 0, tx: v.tx ?? 0, fix: v.fix ?? 0, quelle: v.quelle, stand: v.stand }));
  const margin = k.debit - (k.zerlegung.interchange ?? 0) - (k.zerlegung.netzwerk ?? 0);
  void geraete;

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
              <Link className="btn btn-primary" href="/konditionen">
                Konditionen ansehen
              </Link>
              <Link className="link" href="/kontakt">
                Beratung vor Ort anfragen <Arrow />
              </Link>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <PaymentMarquee />

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
          <Link className="link" href="/wissen/kartenzahlung-gebuehren-schweiz">
            Gebühren im Detail verstehen <Arrow />
          </Link>
        </Reveal>
        <span className="sr-only">{`Marge ${pct(margin)}`}</span>
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
          <Calculator ours={{ debit: k.debit, kredit: k.kredit, tx: k.txFix, fix: k.miete }} vergleiche={vergleiche} defaults={{ umsatz: k.rechner.umsatz ?? 25000, bon: k.rechner.bon ?? 45, kreditanteil: k.rechner.kreditanteil ?? 35 }} stand={dateDE(k.stand)} />
        </Reveal>
      </Section>

      <Section id="geraete" label="Terminals" sub="Terminals von PayTec, für den Schweizer Markt zertifiziert.">
        <Reveal>
          <Intro title="Drei Bauformen. Wir sagen Ihnen vor Ort, welche zu Ihrem Ablauf passt." />
        </Reveal>
        <BauformGrid />
        <Reveal>
          <Link className="link" href="/geraete">
            Alle Terminals, Kassen und Online-Zahlungen <Arrow />
          </Link>
        </Reveal>
      </Section>

      <Section id="ablauf" label="Ablauf" sub="Vom ersten Gespräch bis zur ersten Zahlung.">
        <Reveal>
          <Intro title="In einer Woche von der Abrechnung zum laufenden Terminal." />
        </Reveal>
        <Reveal delay={1}>
          <Flow />
        </Reveal>
      </Section>

      <Section id="support" label="Support" sub="Persönlich, nicht per Ticket.">
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

      <Section id="dienstleistungen" label="Dienstleistungen" sub="Was Ihr Betrieb sonst noch braucht, mit Partnern, die wir persönlich kennen.">
        <Reveal>
          <Intro title="Wenn wir schon bei Ihnen sind." text="Unsere Berater sehen Ihren Betrieb von innen. Darum vermitteln wir auch die Dienstleistungen rundherum, zu Konditionen, die wir selbst geprüft haben." />
        </Reveal>
        <div className="svcs">
          {SERVICES.map((s, i) => (
            <Reveal key={s.href} delay={(i % 3) as 0 | 1 | 2}>
              <Link className="svc" href={s.href}>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
                <div className="arrow">
                  <Arrow />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

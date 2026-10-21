import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGeraete, getKonditionen, getLandingpageByPath, getLandingpages, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { dateDE, pct } from '@/lib/format';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Markdown } from '@/components/content/Markdown';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';
import { ExampleCalc } from '@/components/pricing/ExampleCalc';
import { Calculator } from '@/components/pricing/Calculator';
import { PriceList, SimplePriceList } from '@/components/pricing/PriceList';
import { FeeBreakdown } from '@/components/pricing/FeeBreakdown';
import { DeviceGrid } from '@/components/devices/DeviceGrid';
import { ContactForm } from '@/components/forms/ContactForm';
import { WebdesignForm } from '@/components/forms/WebdesignForm';
import { PraemienCheck } from '@/components/forms/PraemienCheck';
import { AbrechnungForm } from '@/components/forms/AbrechnungForm';
import { Suspense } from 'react';

/** Landingpages aus Keystatic: Payment, Regional, Branchen, Webdesign, Wissen, Dienstleistungen. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getLandingpages();
  return pages.map((p) => ({ slug: p.pfad.replace(/^\//, '').split('/') }));
}

const CLUSTER_PARENT: Record<string, { name: string; href: string } | null> = {
  payment: null,
  regional: null,
  branche: { name: 'Branchen', href: '/branchen/restaurant' },
  webdesign: { name: 'Webdesign', href: '/webdesign' },
  wissen: { name: 'Wissen', href: '/wissen/kartenzahlung-gebuehren-schweiz' },
  dienstleistung: { name: 'Dienstleistungen', href: '/dienstleistungen' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getLandingpageByPath('/' + slug.join('/'));
  if (!p) return {};
  return pageMeta({ title: p.metaTitle.replace(/\s*\|\s*ibis payment\s*$/i, ''), description: p.metaDescription, path: p.pfad });
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pfad = '/' + slug.join('/');
  const [p, site, k, geraete, all] = await Promise.all([getLandingpageByPath(pfad), getSite(), getKonditionen(), getGeraete(), getLandingpages()]);
  if (!p) notFound();
  const parent = CLUSTER_PARENT[p.cluster];
  const crumbs = [...(parent && parent.href !== p.pfad ? [parent] : []), { name: p.navTitle || p.title, href: p.pfad }];
  const vergleiche = k.vergleiche.filter((v) => v.quelle).map((v) => ({ id: v.id, label: v.label, debit: v.debit ?? 0, kredit: v.kredit ?? 0, tx: v.tx ?? 0, fix: v.fix ?? 0, quelle: v.quelle, stand: v.stand }));
  const related = p.verwandt.map((href) => ({ href, name: all.find((x) => x.pfad === href)?.navTitle ?? labelFor(href) })).filter((r) => r.href !== p.pfad);
  const featured = geraete.filter((g) => g.featured).slice(0, 3);
  const isWeb = p.cluster === 'webdesign';

  return (
    <>
      <PageHero label={p.kicker || p.navTitle || 'ibis payment'} title={p.title} lead={p.lead} crumbs={crumbs} />

      <Section label="Überblick" sub={isWeb ? 'Website und IT mit InfraOne IT Solutions, Winterthur.' : `Preise exkl. MwSt., Stand ${dateDE(k.stand)}.`}>
        <Reveal>
          <Markdown text={p.intro} />
        </Reveal>
      </Section>

      {p.beispiel.aktiv && p.beispiel.umsatz && p.beispiel.bon && (
        <Section tone="grey" label="Beispielrechnung" sub="Gerechnet mit den aktuellen Konditionen.">
          <Reveal>
            <ExampleCalc k={k} titel={p.beispiel.titel || 'Beispiel'} umsatz={p.beispiel.umsatz} bon={p.beispiel.bon} kreditanteil={p.beispiel.kreditanteil ?? 30} vergleich={p.beispiel.vergleich || 'gross'} erklaerung={p.beispiel.erklaerung} />
          </Reveal>
        </Section>
      )}

      {p.sections.map((s, i) => (
        <Section key={i} label={String(i + 1).padStart(2, '0')} plainLabel tight>
          <Reveal>
            <div style={{ display: 'grid', gap: 22 }}>
              <h2 style={{ fontSize: 'clamp(1.7rem,3.2vw,2.6rem)', maxWidth: '26ch' }}>{s.heading}</h2>
              <Markdown text={s.body} />
            </div>
          </Reveal>
        </Section>
      ))}

      {p.bausteine.zerlegung && (
        <Section tone="dark" label="Transparenz" sub="So setzt sich eine Gebühr zusammen, am Beispiel einer Schweizer Debitkarte.">
          <Reveal>
            <Intro title={`Von ${pct(k.debit)} gehen ${pct((k.zerlegung.interchange ?? 0) + (k.zerlegung.netzwerk ?? 0))} an Bank und Kartennetzwerk. Der Rest ist unsere Arbeit.`} />
          </Reveal>
          <Reveal delay={1}>
            <FeeBreakdown debit={k.debit} interchange={k.zerlegung.interchange ?? 0} netzwerk={k.zerlegung.netzwerk ?? 0} txFix={k.txFix} quelle={k.zerlegung.quelle} />
          </Reveal>
        </Section>
      )}

      {p.bausteine.preisliste && (
        <Section label="Konditionen" sub={`Auszug, Stand ${dateDE(k.stand)}.`}>
          <Reveal>
            <PriceList k={k} />
          </Reveal>
          <Link className="link" href="/konditionen">
            Vollständige Preisliste <Arrow />
          </Link>
        </Section>
      )}

      {p.preisliste.length > 0 && (
        <Section label="Preise" sub="Richtwerte, verbindlich ist die Offerte.">
          <Reveal>
            <SimplePriceList rows={p.preisliste} caption="Preise exkl. MwSt." />
          </Reveal>
        </Section>
      )}

      {p.bausteine.rechner && (
        <Section tone="grey" label="Rechner" sub="Mit Ihren Zahlen, nicht mit unseren.">
          <Reveal>
            <Calculator ours={{ debit: k.debit, kredit: k.kredit, tx: k.txFix, fix: k.miete }} vergleiche={vergleiche} defaults={{ umsatz: p.beispiel.umsatz ?? k.rechner.umsatz ?? 25000, bon: p.beispiel.bon ?? k.rechner.bon ?? 45, kreditanteil: p.beispiel.kreditanteil ?? k.rechner.kreditanteil ?? 35 }} stand={dateDE(k.stand)} />
          </Reveal>
        </Section>
      )}

      {p.bausteine.geraete && (
        <Section label="Terminals" sub="Terminals von PayTec, ep2-zertifiziert.">
          <DeviceGrid geraete={featured} />
          <Link className="link" href="/geraete">
            Alle Terminals mit Daten und Preisen <Arrow />
          </Link>
        </Section>
      )}

      {p.faq.length > 0 && (
        <Section label="Fragen" sub="Kurz beantwortet.">
          <Faq items={p.faq} />
        </Section>
      )}

      {p.formular === 'kontakt' && (
        <Section tone="grey" label="Anfrage" sub={`Oder direkt anrufen: ${site.phone}`}>
          <div className="panel">
            <h3>Anfrage senden</h3>
            <Suspense fallback={null}>
              <ContactForm phone={site.phone} phoneHref={site.phoneHref} defaultThema={p.cluster === 'dienstleistung' ? (p.navTitle.includes('Telefon') ? 'Telefonie' : p.navTitle.includes('Treuhand') ? 'Treuhand' : 'Mehreres davon') : undefined} />
            </Suspense>
          </div>
        </Section>
      )}
      {p.formular === 'webdesign' && (
        <Section tone="grey" id="anfrage" label="Webdesign-Anfrage" sub="Geht direkt an InfraOne IT Solutions GmbH, Winterthur.">
          <div className="panel">
            <h3>Website anfragen</h3>
            <p>Beschreiben Sie Ihren Betrieb und was die Website können soll. InfraOne meldet sich am nächsten Werktag mit einer Einschätzung und einer Offerte.</p>
            <WebdesignForm />
          </div>
        </Section>
      )}
      {p.formular === 'praemiencheck' && (
        <Section tone="grey" label="Prämien-Check" sub="Drei Angaben, Rückmeldung innert zwei Werktagen.">
          <PraemienCheck />
        </Section>
      )}
      {p.formular === 'abrechnung' && (
        <Section tone="grey" id="abrechnung" label="Nachrechnen lassen" sub="Genauer als jeder Rechner: Ihre echte Abrechnung.">
          <div className="panel">
            <h3>Abrechnung einreichen</h3>
            <AbrechnungForm />
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section label="Weiterlesen" tight>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
            {related.map((r) => (
              <li key={r.href}>
                <Link className="link" href={r.href}>
                  {r.name} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand title={p.cta.titel || 'Offerte innert 24 Stunden.'} text={p.cta.text || 'Schicken Sie uns Ihre letzte Abrechnung oder rufen Sie an.'} label={p.cta.label || 'Offerte anfordern'} href={p.cta.href || '/kontakt'} phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

function labelFor(href: string) {
  const map: Record<string, string> = {
    '/konditionen': 'Konditionen',
    '/konditionen#rechner': 'Rechner',
    '/konditionen#abrechnung': 'Abrechnung einreichen',
    '/kontakt': 'Kontakt',
    '/geraete': 'Terminals',
    '/kassensysteme': 'Kassensysteme',
    '/online-zahlungen': 'Online-Zahlungen',
    '/handy-als-terminal': 'Handy als Terminal',
    '/support': 'Support',
    '/dienstleistungen': 'Dienstleistungen',
    '/ueber-uns': 'Über uns',
  };
  if (map[href]) return map[href];
  if (href.startsWith('/geraete/')) return href.replace('/geraete/paytec-', 'PayTec ').toUpperCase().replace('PAYTEC', 'PayTec');
  return href.replace(/^\//, '').replace(/[-/]/g, ' ');
}

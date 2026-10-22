import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getGeraete, getKonditionen, getLandingpageByPath, getLandingpages, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { chf, dateDE, pct } from '@/lib/format';
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
import { ClusterVisual } from '@/components/content/ClusterVisual';
import { uniqueIcons } from '@/lib/icons-for';
import { TelefonieInternet } from '@/components/content/TelefonieInternet';
import { Icon, type IconName } from '@/components/ui/Icons';
import type { Konditionen } from '@/lib/content';

/** Landingpages aus Keystatic: Payment, Regional, Branchen, Webdesign, Wissen, Dienstleistungen. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getLandingpages();
  return pages.map((p) => ({ slug: p.pfad.replace(/^\//, '').split('/') }));
}

const CLUSTER_PARENT: Record<string, { name: string; href: string } | null> = {
  payment: null,
  regional: { name: 'Branchen und Regionen', href: '/branchen' },
  branche: { name: 'Branchen', href: '/branchen' },
  webdesign: { name: 'Webdesign', href: '/webdesign' },
  wissen: { name: 'Wissen', href: '/wissen' },
  dienstleistung: { name: 'Dienstleistungen', href: '/dienstleistungen' },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getLandingpageByPath('/' + slug.join('/'));
  if (!p) return {};
  return pageMeta({ title: p.metaTitle.replace(/\s*\|\s*ibis payment\s*$/i, ''), description: p.metaDescription, path: p.pfad });
}

/** Fakten-Leiste je Cluster, aus der Datenquelle. */
function facts(cluster: string, k: Konditionen, pfad: string): { icon: IconName; b: string; s: string }[] {
  const F = (icon: IconName, b: string, s: string) => ({ icon, b, s });
  if (cluster === 'webdesign')
    return [F('mobile', 'Mobile zuerst', 'Ein grosser Teil der Besuche kommt vom Handy'), F('search', 'Für Google gebaut', 'Struktur, Ladezeit, Business-Profil'), F('shield', 'DSG-konform', 'Impressum, Datenschutz, kein Cookie-Banner'), F('handshake', 'Ein Ansprechpartner', 'Kasse, Terminal, WLAN und Website')];
  if (cluster === 'dienstleistung' && pfad.includes('telefonie'))
    return [F('phone', 'ab CHF 15.00 / Monat', 'peoplefone vPBX, 1 bis 5 Benutzer, inkl. MwSt.'), F('wifi', 'ab CHF 39.00 / Monat', 'iway Business Internet 100 Mbit/s, exkl. MwSt.'), F('handshake', 'InfraOne richtet ein', 'Telefon, Internet, Netzwerk, Kasse, Terminal'), F('headset', 'Ein Ansprechpartner', 'für alles, was im Betrieb am Netz hängt')];
  if (cluster === 'dienstleistung')
    return [F('handshake', 'Ein Ansprechpartner', 'Wir koordinieren den Partner'), F('badge', 'Persönlich geprüft', 'Partner, die wir selbst kennen'), F('repeat', 'Monatlich kündbar', 'wo immer möglich'), F('clock', 'Rückmeldung', 'innert zwei Werktagen [bestätigen]')];
  if (cluster === 'wissen')
    return [F('percent', pct(k.debit), 'Debitkarten Inland bei ibis payment'), F('card', pct(k.kredit), 'Kreditkarten Inland'), F('coins', chf(k.txFix, 2), 'pro Zahlung, alle Kartenarten'), F('receipt', 'Eine Seite', 'Monatsabrechnung, jede Kartenart einzeln')];
  return [F('percent', pct(k.debit), 'Debitkarten Inland'), F('card', pct(k.kredit), 'Kreditkarten Inland'), F('terminal', `${chf(k.miete)} / Monat`, 'Terminal-Miete inkl. Ersatzgerät'), F('repeat', 'Monatlich kündbar', 'keine Aufschaltung, keine Mindestgebühr')];
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
  const anchor = (t: string) => t.toLowerCase().replace(/[äöü]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue' })[c] ?? c).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const strip = facts(p.cluster, k, p.pfad);
  const sectionIcons = uniqueIcons(p.sections.map((x) => x.heading), strip.map((f) => f.icon));
  const isTelefonie = p.pfad === '/dienstleistungen/telefonie';

  return (
    <>
      <PageHero label={p.kicker || p.navTitle || 'ibis payment'} title={p.title} lead={p.lead} crumbs={crumbs} visual={<ClusterVisual cluster={p.cluster} pfad={p.pfad} />}>
        <div className="hero-ctas">
          {isWeb ? (
            <>
              <a className="btn btn-primary" href="#anfrage">
                Website anfragen
              </a>
              <a className="link" href="https://infraone.ch" target="_blank" rel="noopener noreferrer">
                Webdesign-Angebot von InfraOne <Arrow />
              </a>
            </>
          ) : (
            <>
              <Link className="btn btn-primary" href="/konditionen#rechner">
                Ersparnis berechnen
              </Link>
              <Link className="link" href="/kontakt">
                Offerte anfordern <Arrow />
              </Link>
            </>
          )}
        </div>
      </PageHero>

      <section className="section no-line tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="facts-strip">
            {strip.map((f) => {
              const FI = Icon[f.icon];
              return (
                <div key={f.b}>
                  <span className="icon-ring" aria-hidden="true">
                    <FI />
                  </span>
                  <div>
                    <b>{f.b}</b>
                    <span>{f.s}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Section label="Überblick" sub={isWeb ? 'Website und IT mit InfraOne IT Solutions, Winterthur.' : `Preise exkl. MwSt., Stand ${dateDE(k.stand)}.`} tight>
        <div className="overview">
          <Reveal>
            <Markdown text={p.intro} />
          </Reveal>
          <Reveal delay={1}>
            <nav className="toc" aria-label="Auf dieser Seite">
              <div className="h">Auf dieser Seite</div>
              {p.sections.map((s, i) => (
                <a key={i} href={`#${anchor(s.heading)}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.heading}</span>
                </a>
              ))}
              {p.faq.length > 0 && (
                <a href="#fragen">
                  <span>{String(p.sections.length + 1).padStart(2, '0')}</span>
                  <span>Fragen und Antworten</span>
                </a>
              )}
            </nav>
          </Reveal>
        </div>
      </Section>

      {p.beispiel.aktiv && p.beispiel.umsatz && p.beispiel.bon && (
        <Section tone="dark" label="Beispielrechnung" sub="Gerechnet mit den aktuellen Konditionen; mit Ihren eigenen Zahlen im Rechner.">
          <Reveal>
            <div style={{ color: 'var(--text)' }}>
              <ExampleCalc k={k} titel={p.beispiel.titel || 'Beispiel'} umsatz={p.beispiel.umsatz} bon={p.beispiel.bon} kreditanteil={p.beispiel.kreditanteil ?? 30} vergleich={p.beispiel.vergleich || 'gross'} erklaerung={p.beispiel.erklaerung} />
            </div>
          </Reveal>
        </Section>
      )}

      <Section tone={p.beispiel.aktiv ? 'white' : 'grey'} label="Im Detail" sub={`${p.sections.length} Punkte, die für Ihren Entscheid zählen.`} plainLabel>
        <div>
          {p.sections.map((s, i) => {
            const I = Icon[sectionIcons[i]];
            return (
              <Reveal key={i}>
                <article className="editorial" id={anchor(s.heading)}>
                  <div className="ed-head">
                    <span className="icon-ring" aria-hidden="true">
                      <I />
                    </span>
                    <h2>{s.heading}</h2>
                  </div>
                  <Markdown text={s.body} />
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

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

      {isTelefonie && (
        <Section tone="grey" id="preise" label="Preise" sub="Telefonie von peoplefone, Internet von iway, eingerichtet und betreut von InfraOne. Drei Tabellen, eine Offerte.">
          <TelefonieInternet />
        </Section>
      )}

      {p.preisliste.length > 0 && !isTelefonie && (
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
        <Section id="fragen" label="Fragen" sub="Kurz beantwortet.">
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
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '12px 28px' }}>
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

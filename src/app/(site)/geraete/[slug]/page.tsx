import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGeraet, getGeraete, getKonditionen, getSite } from '@/lib/content';
import { pageMeta, SITE_URL } from '@/lib/seo';
import { chf, dateDE } from '@/lib/format';
import { Breadcrumbs } from '@/components/content/PageHero';
import { Section, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { ProductImage } from '@/components/devices/ProductImage';
import { DeviceGrid, miniKind, KATEGORIE_LABEL } from '@/components/devices/DeviceGrid';
import { Markdown } from '@/components/content/Markdown';
import { CtaBand } from '@/components/content/CtaBand';
import { JsonLd } from '@/components/seo/JsonLd';
import { PriceList } from '@/components/pricing/PriceList';

export async function generateStaticParams() {
  const all = await getGeraete();
  return all.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGeraet(slug);
  if (!g) return {};
  return pageMeta({ title: `${g.name} ${g.mieteMonat != null ? 'mieten oder kaufen' : 'für Automaten'}: ${KATEGORIE_LABEL[g.kategorie]}`, description: g.metaDescription || g.kurz, path: `/geraete/${slug}` });
}

export default async function GeraetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [g, all, k, site] = await Promise.all([getGeraet(slug), getGeraete(), getKonditionen(), getSite()]);
  if (!g) notFound();
  const others = all.filter((o) => o.slug !== g.slug && o.kategorie === g.kategorie).concat(all.filter((o) => o.slug !== g.slug && o.kategorie !== g.kategorie)).slice(0, 3);
  const offers = [
    g.mieteMonat != null && { '@type': 'Offer', name: 'Miete', price: g.mieteMonat.toFixed(2), priceCurrency: 'CHF', priceValidUntil: undefined, availability: 'https://schema.org/InStock', url: `${SITE_URL}/geraete/${g.slug}`, priceSpecification: { '@type': 'UnitPriceSpecification', price: g.mieteMonat.toFixed(2), priceCurrency: 'CHF', unitText: 'Monat', valueAddedTaxIncluded: false } },
    g.kauf != null && { '@type': 'Offer', name: 'Kauf', price: g.kauf.toFixed(2), priceCurrency: 'CHF', availability: 'https://schema.org/InStock', url: `${SITE_URL}/geraete/${g.slug}`, priceSpecification: { '@type': 'PriceSpecification', price: g.kauf.toFixed(2), priceCurrency: 'CHF', valueAddedTaxIncluded: false } },
  ].filter(Boolean);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: g.name,
          brand: { '@type': 'Brand', name: g.hersteller },
          description: g.kurz,
          category: KATEGORIE_LABEL[g.kategorie],
          image: g.bild ? `${SITE_URL}${g.bild}` : `${SITE_URL}/og-image.png`,
          url: `${SITE_URL}/geraete/${g.slug}`,
          ...(offers.length ? { offers } : {}),
          additionalProperty: g.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.wert })),
        }}
      />
      <section className="page-hero section no-line" style={{ paddingBottom: 0 }}>
        <div className="wrap single" style={{ display: 'grid', gap: 24 }}>
          <Breadcrumbs crumbs={[{ name: 'Terminals', href: '/geraete' }, { name: g.name, href: `/geraete/${g.slug}` }]} />
          <div className="product">
            <div className="sticky">
              <ProductImage src={g.bild} alt={g.bildAlt || g.name} name={g.name} kind={miniKind(g)} />
            </div>
            <div style={{ display: 'grid', gap: 28 }}>
              <div className="overline">
                {KATEGORIE_LABEL[g.kategorie]} · {g.hersteller}
              </div>
              <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.4rem)' }}>{g.name}</h1>
              <p className="lead" style={{ marginTop: 0 }}>
                {g.kurz}
              </p>
              <div className="big" style={{ borderBottom: 0, paddingBottom: 0 }}>
                {g.mieteMonat != null ? (
                  <>
                    <span className="l">Miete pro Monat, inklusive Wartung, Updates und Ersatzgerät</span>
                    <span className="v num" style={{ fontSize: 'clamp(2.6rem,5vw,4.2rem)' }}>
                      {chf(g.mieteMonat, 2)}
                    </span>
                    <span className="s">
                      {g.kauf != null ? `Kauf ${chf(g.kauf, 2)}, inklusive Einrichtung und Herstellergarantie [Dauer bestätigen]. ` : ''}
                      {k.hinweis} Stand {dateDE(k.stand)}.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="l">Preis</span>
                    <span className="v" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
                      Offerte pro Projekt
                    </span>
                    <span className="s">{g.preisHinweis}</span>
                  </>
                )}
              </div>
              <div className="hero-ctas">
                <Link className="btn btn-primary" href={`/kontakt?thema=Zahlterminal`}>
                  Offerte für {g.name}
                </Link>
                <Link className="link" href="/konditionen">
                  Transaktionsgebühren ansehen <Arrow />
                </Link>
              </div>
              <div className="tags" aria-label="Typische Einsätze">
                {g.einsatz.map((e) => (
                  <span className="tag" key={e}>
                    {e}
                  </span>
                ))}
              </div>
              <Markdown text={g.beschreibung} />
            </div>
          </div>
        </div>
      </section>

      <Section label="Technische Daten" sub="Aus dem Datenblatt des Herstellers.">
        <Reveal>
          <table className="spec">
            <caption className="sr-only">Technische Daten {g.name}</caption>
            <tbody>
              {g.specs.map((s) => (
                <tr key={s.label}>
                  <th scope="row">{s.label}</th>
                  <td>{s.wert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        {g.datenblatt && (
          <a className="link" href={g.datenblatt} target="_blank" rel="noopener noreferrer">
            Datenblatt des Herstellers (PDF) <Arrow />
          </a>
        )}
      </Section>

      <Section tone="grey" label="Gebühren" sub="Gleich für alle Modelle.">
        <Reveal>
          <PriceList k={k} variant="short" />
        </Reveal>
        <Link className="link" href="/konditionen#rechner">
          Mit Ihren Zahlen rechnen <Arrow />
        </Link>
      </Section>

      <Section label="Weitere Modelle" sub="Alle laufen über dasselbe Acquiring und erscheinen auf derselben Abrechnung.">
        <DeviceGrid geraete={others} />
      </Section>

      <CtaBand title={`${g.name} ansehen? Wir bringen es vorbei.`} text="Beratung vor Ort ist kostenlos. Bringen Sie Ihre letzte Abrechnung mit, dann rechnen wir gleich nach." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

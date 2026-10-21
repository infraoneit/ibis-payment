import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaq, getKonditionen, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { dateDE, pct } from '@/lib/format';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PriceList } from '@/components/pricing/PriceList';
import { FeeBreakdown } from '@/components/pricing/FeeBreakdown';
import { Calculator } from '@/components/pricing/Calculator';
import { AbrechnungForm } from '@/components/forms/AbrechnungForm';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Konditionen: Preisliste und Rechner',
  description:
    'Preisliste für Kartenzahlung in der Schweiz: Debit, Kredit, TWINT, Fixbetrag, Terminal-Miete und -Kauf. Mit Rechner und Vergleich. Preise exkl. MwSt.',
  path: '/konditionen',
});

export default async function KonditionenPage() {
  const [site, k, faq] = await Promise.all([getSite(), getKonditionen(), getFaq('konditionen')]);
  const vergleiche = k.vergleiche.filter((v) => v.quelle).map((v) => ({ id: v.id, label: v.label, debit: v.debit ?? 0, kredit: v.kredit ?? 0, tx: v.tx ?? 0, fix: v.fix ?? 0, quelle: v.quelle, stand: v.stand }));
  return (
    <>
      <PageHero label="Konditionen" title="Die vollständige Preisliste." lead={`Jede Position, die auf Ihrer Abrechnung erscheinen kann, steht hier. Was hier nicht steht, wird nicht verrechnet. ${k.hinweis} Stand ${dateDE(k.stand)}.`} crumbs={[{ name: 'Konditionen', href: '/konditionen' }]}>
        <div className="hero-ctas" style={{ marginTop: 28 }}>
          <a className="btn btn-ink" href="#rechner">
            Zum Rechner
          </a>
          <a className="link" href="#abrechnung">
            Abrechnung nachrechnen lassen <Arrow />
          </a>
        </div>
      </PageHero>

      <Section id="preisliste" label="Preisliste" sub={`Gültig für Betriebe in der Schweiz. Stand ${dateDE(k.stand)}.`}>
        <Reveal>
          <PriceList k={k} />
        </Reveal>
        <p className="pl-note">
          Die Sätze setzen sich aus der Interchange-Gebühr an die kartenausgebende Bank (in der Schweiz durch Einigungen der WEKO geregelt), der Gebühr an das Kartennetzwerk und unserer Marge zusammen. Alle drei Anteile weisen wir in Ihrer Offerte aus.{' '}
          <Link href="/wissen/kartenzahlung-gebuehren-schweiz">Mehr zu Gebühren</Link>.
        </p>
      </Section>

      <Section tone="dark" label="Transparenz" sub="So setzt sich eine Gebühr zusammen, am Beispiel einer Schweizer Debitkarte.">
        <Reveal>
          <Intro
            title={`Von ${pct(k.debit)} gehen ${pct((k.zerlegung.interchange ?? 0) + (k.zerlegung.netzwerk ?? 0))} an Bank und Kartennetzwerk. Der Rest ist unsere Arbeit.`}
            text="Die ersten zwei Anteile sind für alle Anbieter gleich und in der Schweiz geregelt. Unterschiede entstehen nur in der Marge. Darum zeigen wir sie."
          />
        </Reveal>
        <Reveal delay={1}>
          <FeeBreakdown debit={k.debit} interchange={k.zerlegung.interchange ?? 0} netzwerk={k.zerlegung.netzwerk ?? 0} txFix={k.txFix} quelle={k.zerlegung.quelle} />
        </Reveal>
      </Section>

      <Section tone="grey" label="Rechner" sub="Mit Ihren Zahlen, nicht mit unseren.">
        <Reveal>
          <Calculator ours={{ debit: k.debit, kredit: k.kredit, tx: k.txFix, fix: k.miete }} vergleiche={vergleiche} defaults={{ umsatz: k.rechner.umsatz ?? 25000, bon: k.rechner.bon ?? 45, kreditanteil: k.rechner.kreditanteil ?? 35 }} stand={dateDE(k.stand)} />
        </Reveal>
      </Section>

      <Section id="abrechnung" label="Nachrechnen lassen" sub="Genauer als jeder Rechner: Ihre echte Abrechnung.">
        <Reveal>
          <Intro title="Schicken Sie uns Ihre letzte Abrechnung. Wir rechnen innert 24 Stunden nach." text={`${site.bestpreis} Sie erhalten dieselben Umsätze mit unseren Sätzen gerechnet, Position für Position.`} />
        </Reveal>
        <Reveal delay={1}>
          <div className="panel">
            <h3>Abrechnung einreichen</h3>
            <AbrechnungForm />
          </div>
        </Reveal>
      </Section>

      <Section label="Fragen" sub="Zu Gebühren und Vertrag.">
        <Faq items={faq} />
      </Section>

      <CtaBand phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

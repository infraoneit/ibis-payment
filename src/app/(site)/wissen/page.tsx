import type { Metadata } from 'next';
import { getLandingpages, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { HubGrid } from '@/components/content/HubGrid';
import { CtaBand } from '@/components/content/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Wissen: Kartenzahlung verstehen',
  description: 'Wie Kartenzahlung in der Schweiz funktioniert: Gebühren und Interchange, Rollen von Issuer bis Acquirer, PSP oder Broker, typische Fehler, mieten oder kaufen.',
  path: '/wissen',
});

export default async function WissenPage() {
  const [site, all] = await Promise.all([getSite(), getLandingpages()]);
  const worder = ['/wissen/kartenzahlung-gebuehren-schweiz', '/wissen/rollen-im-payment', '/wissen/psp-oder-broker', '/wissen/typische-fehler', '/wissen/mieten-oder-kaufen'];
  const wissen = all.filter((p) => p.cluster === 'wissen').sort((a, b) => worder.indexOf(a.pfad) - worder.indexOf(b.pfad));
  const vergleich = all.filter((p) => ['/zahlterminal-vergleich', '/worldline-alternative', '/sumup-alternative', '/zahlterminal-mieten', '/zahlterminal-kaufen', '/twint-terminal'].includes(p.pfad));
  return (
    <>
      <PageHero label="Wissen" title="Kartenzahlung verstehen, bevor Sie unterschreiben." lead="Was eine Gebühr enthält, wer im Hintergrund beteiligt ist, welche Fehler Betriebe beim Anbieterwechsel machen. Geschrieben für Inhaber, nicht für Fachleute." crumbs={[{ name: 'Wissen', href: '/wissen' }]} />
      <Section label="Grundlagen" sub="Fünf Artikel, die den Markt erklären.">
        <HubGrid pages={wissen} />
      </Section>
      <Section tone="grey" label="Entscheiden" sub="Mieten, kaufen, vergleichen, wechseln.">
        <Reveal>
          <Intro title="Vom Wissen zur Entscheidung." text="Diese Seiten helfen beim konkreten Entscheid: Welche Bauform, Miete oder Kauf, und wie sich die Konditionen mit dem heutigen Anbieter vergleichen lassen." />
        </Reveal>
        <HubGrid pages={vergleich} />
      </Section>
      <CtaBand title="Lieber nachrechnen lassen als nachlesen?" text="Schicken Sie uns Ihre letzte Abrechnung. Sie erhalten dieselben Umsätze mit unseren Sätzen gerechnet, innert 24 Stunden." label="Abrechnung einreichen" href="/konditionen#abrechnung" phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

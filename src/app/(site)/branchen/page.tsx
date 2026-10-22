import type { Metadata } from 'next';
import { getLandingpages, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { HubGrid } from '@/components/content/HubGrid';
import { CtaBand } from '@/components/content/CtaBand';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = pageMeta({
  title: 'Branchen: welches Terminal zu welchem Betrieb passt',
  description: 'Zahlterminal für Restaurant, Coiffeur, Detailhandel, Praxis und Marktstand, mit Beispielrechnung pro Branche. Beratung vor Ort in Winterthur, Zürich und Ostschweiz.',
  path: '/branchen',
});

export default async function BranchenPage() {
  const [site, all] = await Promise.all([getSite(), getLandingpages()]);
  const order = ['/branchen/restaurant', '/branchen/detailhandel', '/branchen/coiffeur', '/branchen/praxis', '/branchen/marktstand'];
  const branchen = all.filter((p) => p.cluster === 'branche').sort((a, b) => order.indexOf(a.pfad) - order.indexOf(b.pfad));
  const rorder = ['/zahlterminal-winterthur', '/zahlterminal-zuerich', '/zahlterminal-ostschweiz'];
  const regionen = all.filter((p) => p.cluster === 'regional').sort((a, b) => rorder.indexOf(a.pfad) - rorder.indexOf(b.pfad));
  return (
    <>
      <PageHero label="Branchen" title="Jeder Betrieb kassiert anders." lead="Am Tisch, am Tresen, am Marktstand oder am Empfang: Wir zeigen pro Branche, welches Terminal passt, was die Kasse können muss und was eine typische Abrechnung kostet." crumbs={[{ name: 'Branchen', href: '/branchen' }]} />
      <Section label="Branchen" sub="Mit Beispielrechnung aus den aktuellen Konditionen.">
        <HubGrid pages={branchen} />
      </Section>
      <Section tone="grey" label="Regionen" sub="Beratung und Installation vor Ort.">
        <Reveal>
          <Intro title="Wir kommen vorbei, nicht nur das Paket." text="Beratung, Installation und Support vor Ort in Winterthur, Zürich und der Ostschweiz. In der übrigen Schweiz über unsere Vertriebspartner." />
        </Reveal>
        <HubGrid pages={regionen} />
      </Section>
      <CtaBand title="Ihre Branche fehlt? Fragen Sie trotzdem." text="Bäckerei, Fitnessstudio, Kiosk, Verein oder Hofladen: Die Terminals und Konditionen sind dieselben, der Ablauf vor Ort unterscheidet sich. Ein Gespräch kostet nichts." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

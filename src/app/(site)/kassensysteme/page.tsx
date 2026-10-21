import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaq, getGeraete, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { DeviceGrid } from '@/components/devices/DeviceGrid';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Kassensystem mit Terminal aus einer Hand',
  description: 'Kassensystem und Zahlterminal für Gastronomie und Detailhandel: Der Betrag geht automatisch von der Kasse ans Terminal (OPI, ZVT, KIT). Einrichtung vor Ort.',
  path: '/kassensysteme',
});

export default async function KassenPage() {
  const [site, geraete, faq] = await Promise.all([getSite(), getGeraete(), getFaq('kassen')]);
  const integrated = geraete.filter((g) => ['paytec-ct20p', 'paytec-n96', 'paytec-v3ct3'].includes(g.slug));
  return (
    <>
      <PageHero label="Kassensysteme" title="Kasse und Terminal, die miteinander reden." lead="Der Betrag geht automatisch von der Kasse ans Terminal. Niemand tippt ab, niemand vertippt sich, und am Abend stimmt der Abschluss mit der Kartenabrechnung überein." crumbs={[{ name: 'Terminals', href: '/geraete' }, { name: 'Kassensysteme', href: '/kassensysteme' }]} />

      <Section label="Was Sie bekommen" sub="Kasse, Terminal, Einrichtung und Schulung.">
        <Reveal>
          <Intro title="Eine Kasse, die zu Ihrem Betrieb passt, nicht umgekehrt." text="Wir arbeiten mit Kassensystemen, die in der Schweiz verbreitet sind und die Standardprotokolle OPI, ZVT oder KIT sprechen. Haben Sie bereits eine Kasse, binden wir das Terminal an. Haben Sie keine, liefern wir beides und richten es vor Ort ein." />
        </Reveal>
        <div className="facts">
          <div>
            <span>Gastronomie</span>
            <span>Tische und Gänge, Splitting der Rechnung am Tisch, Trinkgeld auf dem Terminal, Tagesabschluss mit Kartenumsatz pro Kellner, Anbindung an Küchenbons.</span>
          </div>
          <div>
            <span>Detailhandel</span>
            <span>Artikel mit Barcode, Lager, Aktionen, Rabatte, Gutscheine, Retouren mit Kartenrückerstattung, Self-Checkout mit dem CT20P.</span>
          </div>
          <div>
            <span>Praxis und Dienstleistung</span>
            <span>Leistungen statt Artikel, Anbindung an Praxissoftware oder Terminkalender, Beträge aus der Software ans Terminal, keine Patientendaten auf dem Terminal.</span>
          </div>
          <div>
            <span>Buchhaltung</span>
            <span>Tagesabschluss und Kartenabrechnung als Export für Ihren Treuhänder. Kartenumsatz und Gutschrift stimmen überein, weil beides aus demselben System kommt.</span>
          </div>
          <div>
            <span>Einrichtung</span>
            <span>Artikel oder Speisekarte erfassen wir mit Ihnen, Drucker und WLAN richten wir ein, Ihr Team schulen wir vor Ort. {site.installation}</span>
          </div>
          <div>
            <span>Preis</span>
            <span>Kassensysteme werden nach Umfang offeriert (Anzahl Kassenplätze, Drucker, Lizenz). Die Transaktionsgebühren bleiben dieselben wie ohne Kasse: <Link href="/konditionen">Konditionen</Link>.</span>
          </div>
        </div>
      </Section>

      <Section tone="grey" label="Terminals" sub="Mit Kassenanbindung.">
        <Reveal>
          <Intro title="Diese Terminals sprechen mit Ihrer Kasse." />
        </Reveal>
        <DeviceGrid geraete={integrated} />
        <Link className="link" href="/geraete">
          Alle Terminals <Arrow />
        </Link>
      </Section>

      <Section label="Fragen" sub="Zu Kasse und Anbindung.">
        <Faq items={faq} />
      </Section>

      <CtaBand title="Welche Kasse passt? Wir schauen uns Ihren Ablauf an." text="Beratung vor Ort ist kostenlos. Bringen Sie Ihre heutige Kasse und Ihre letzte Kartenabrechnung mit." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

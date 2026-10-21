import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaq, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Handy als Terminal (SoftPOS): Kartenzahlung ohne Gerät',
  description: 'Mit dem Smartphone Karten annehmen: Visa, Mastercard, Amex, Apple Pay, Google Pay, ohne Gerät und Fixkosten. Für Marktstand, Lieferdienst und als Reserve.',
  path: '/handy-als-terminal',
});

export default async function SoftposPage() {
  const [site, faq] = await Promise.all([getSite(), getFaq('softpos')]);
  return (
    <>
      <PageHero label="Handy als Terminal" title="Das Smartphone wird zum Terminal." lead="Kartenzahlung direkt auf Ihrem Android- oder iOS-Handy, ohne Gerät und ohne Fixkosten. Für den Start, für den Marktstand oder als Reserve, wenn das Terminal ausfällt." crumbs={[{ name: 'Terminals', href: '/geraete' }, { name: 'Handy als Terminal', href: '/handy-als-terminal' }]} />

      <Section label="Für wen" sub="Und für wen nicht.">
        <Reveal>
          <Intro title="Gut für wenig Zahlungen an wechselnden Orten. Schlecht für die Kasse." text="Die App ist nach dem Standard MPoC zertifiziert und rechnet über dasselbe Acquiring ab wie unsere Terminals. Sie ersetzt aber kein Terminal, wenn Sie TWINT, PostFinance Card oder eine Kassenanbindung brauchen." />
        </Reveal>
        <div className="facts">
          <div>
            <span>Voraussetzung</span>
            <span>Android- oder iOS-Smartphone mit NFC, die App, ein Vertrag. Start innert weniger Stunden, keine Lieferung.</span>
          </div>
          <div>
            <span>Akzeptiert</span>
            <span>Visa, Mastercard, American Express (Debit und Kredit), Apple Pay, Google Pay. Trinkgeld, Storno und Rückerstattung sind integriert.</span>
          </div>
          <div>
            <span>Nicht akzeptiert</span>
            <span>TWINT und ep2-Karten wie die PostFinance Card. Dafür braucht es ein Terminal, zum Beispiel den <Link href="/geraete/paytec-n62">PayTec N62</Link>.</span>
          </div>
          <div>
            <span>Passt für</span>
            <span>Marktstand, Event, Lieferdienst, mobile Dienstleister, Vereine, den Start eines Betriebs, Reserve bei Terminalausfall.</span>
          </div>
          <div>
            <span>Passt nicht für</span>
            <span>Hohe Volumen am Kassenplatz, Kassenanbindung (OPI, ZVT), Betriebe mit vielen PostFinance- oder TWINT-Kunden.</span>
          </div>
          <div>
            <span>Preis</span>
            <span>Keine Miete, keine Fixkosten. Transaktionsgebühren nach <Link href="/konditionen">Konditionen</Link> [SoftPOS-Satz bestätigen].</span>
          </div>
        </div>
      </Section>

      <Section label="Fragen" sub="Zum Handy als Terminal.">
        <Faq items={faq} />
      </Section>

      <CtaBand title="Heute starten? Ein Anruf genügt." text="Wir richten die App mit Ihnen ein und prüfen, ob ein Terminal für Ihren Betrieb nicht doch die bessere Wahl ist." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

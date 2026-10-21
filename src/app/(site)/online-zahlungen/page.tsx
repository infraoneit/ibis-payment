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
  title: 'Online-Zahlungen: Webshop, Zahllink, TWINT',
  description: 'Online-Zahlungen über ein Schweizer Gateway: über 40 Methoden inklusive TWINT und PostFinance, 14 Shop-Plugins, PCI-DSS. Laden und Webshop auf einer Abrechnung.',
  path: '/online-zahlungen',
});

export default async function OnlinePage() {
  const [site, faq] = await Promise.all([getSite(), getFaq('online')]);
  return (
    <>
      <PageHero label="Online-Zahlungen" title="Laden und Webshop auf einer Abrechnung." lead="Für Webshop, Buchungssystem oder Rechnung mit Zahllink. Über 40 Zahlungsmethoden inklusive TWINT und PostFinance, abgewickelt über dasselbe Schweizer Acquiring wie Ihr Terminal." crumbs={[{ name: 'Terminals', href: '/geraete' }, { name: 'Online-Zahlungen', href: '/online-zahlungen' }]} />

      <Section label="So funktioniert es" sub="Gateway und Acquiring aus einer Hand.">
        <Reveal>
          <Intro title="Ein Vertrag, eine Abrechnung, ein Ansprechpartner." text="Das Zahlungs-Gateway (Planet/Datatrans, einer der grossen Schweizer Anbieter) nimmt die Zahlung im Shop entgegen, der Acquirer rechnet sie ab. Beides läuft über Ihren Vertrag bei uns. Sie sehen Laden- und Online-Umsatz in derselben Monatsabrechnung." />
        </Reveal>
        <div className="facts">
          <div>
            <span>Zahlungsmethoden</span>
            <span>Über 40, darunter TWINT, PostFinance Card und PostFinance Pay, Visa, Mastercard, Debitkarten, Apple Pay, Google Pay, Samsung Pay, Rechnung, Reka.</span>
          </div>
          <div>
            <span>Shop-Systeme</span>
            <span>14 fertige Plugins für die gängigen Shop-Systeme. Für eigene Entwicklungen gibt es eine Schnittstelle. Die Integration übernimmt auf Wunsch unser Partner InfraOne.</span>
          </div>
          <div>
            <span>Zahllink und Rechnung</span>
            <span>Ohne Shop: Sie schicken einen Zahllink per E-Mail oder SMS, der Kunde zahlt mit Karte oder TWINT. Geeignet für Anzahlungen, Gutscheine, Rechnungen.</span>
          </div>
          <div>
            <span>Sicherheit</span>
            <span>PCI-DSS-zertifizierte Infrastruktur, Kartendaten bleiben beim Gateway (PCI Proxy), 3-D Secure für Kartenzahlungen.</span>
          </div>
          <div>
            <span>Wiederkehrende Zahlungen</span>
            <span>Abonnemente, Mitgliedschaften und Ratenzahlung mit gespeichertem Zahlungsmittel, Rückerstattungen aus dem Händlerportal.</span>
          </div>
          <div>
            <span>Preis</span>
            <span>Online-Gebühren werden pro Zahlungsmethode offeriert [Online-Konditionen eintragen]. Terminal-Konditionen: <Link href="/konditionen">Konditionen</Link>.</span>
          </div>
        </div>
      </Section>

      <Section label="Fragen" sub="Zu Webshop und Zahllink.">
        <Faq items={faq} />
      </Section>

      <CtaBand title="Webshop anbinden? Wir klären die Integration." text="Sagen Sie uns, welches Shop-System Sie nutzen oder planen. Die Offerte erhalten Sie innert 24 Stunden." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

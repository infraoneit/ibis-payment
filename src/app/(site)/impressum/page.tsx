import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = pageMeta({ title: 'Impressum', description: 'Betreiberin der Website ibis-payment.ch, Vertragspartner für Acquiring und Terminals, Haftung und Urheberrecht.', path: '/impressum' });

export default async function ImpressumPage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Rechtliches" title="Impressum." lead="Betreiberin dieser Website und Ihre Ansprechpartnerin für Zahlungssysteme." crumbs={[{ name: 'Impressum', href: '/impressum' }]} />
      <Section label="Betreiberin" tight>
        <div className="cinfo">
          <div>
            <span>Firma</span>
            <b>{site.legalName}</b>
          </div>
          <div>
            <span>Adresse</span>
            <b>
              {site.street}, {site.zip} {site.city}, Schweiz
            </b>
          </div>
          <div>
            <span>UID</span>
            <b>{site.uid}</b>
          </div>
          <div>
            <span>Kontakt</span>
            <b>
              <a href={`mailto:${site.email}`}>{site.email}</a>, <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            </b>
          </div>
          <div>
            <span>Vertretungsberechtigt</span>
            <b>{site.vertretung}</b>
          </div>
          <div>
            <span>Handelsregister</span>
            <b>[Handelsregisteramt und Nummer]</b>
          </div>
        </div>
      </Section>
      <Section label="Vertragspartner" sub="Pflichtangabe für Händler." tight>
        <div className="prose">
          <p>
            <strong>Acquiring (Abwicklung und Auszahlung der Kartenzahlungen):</strong> {site.vertragspartner}
          </p>
          <p>
            <strong>Terminals (Miete und Kauf):</strong> [Vertragspartner für Terminal-Miete und -Kauf eintragen: {site.legalName} oder SwiPay AG.]
          </p>
          <p>
            {site.legalName} ist exklusiver Vertriebspartner der SwiPay AG, Oberneuhofstrasse 3, 6340 Baar. Das Acquiring erfolgt über das SwiPay-Bezahlnetzwerk mit TeleCash/Fiserv als Acquirer. Terminals stammen von der PayTec AG, Vogelsangstrasse 15, 8307 Effretikon. Die für den
            Händler geltenden Vertragsbedingungen finden Sie in den <Link href="/agb">AGB</Link> und in den <a href="https://swipay.ch/vertragsunterlagen/" target="_blank" rel="noopener noreferrer">Vertragsunterlagen der SwiPay AG</a>.
          </p>
        </div>
      </Section>
      <Section label="Haftung und Urheberrecht" tight>
        <div className="prose prose-sm">
          <p>
            Alle Preise auf dieser Website verstehen sich exkl. MwSt. und mit dem jeweils angegebenen Stand. Verbindlich sind die Konditionen in der schriftlichen Offerte. Der Rechner liefert Richtwerte auf Basis Ihrer Eingaben und der genannten Vergleichswerte; für Abweichungen zu Ihrer tatsächlichen Abrechnung
            übernehmen wir keine Haftung.
          </p>
          <p>Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung der Inhalte entstehen, sind ausgeschlossen, soweit gesetzlich zulässig.</p>
          <p>Verlinkte Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich.</p>
          <p>Texte, Grafiken und das Logo auf dieser Website sind urheberrechtlich geschützt. Marken wie Visa, Mastercard, TWINT, Apple Pay, Google Pay, PayTec und SwiPay gehören den jeweiligen Inhabern und werden nur zur Beschreibung der akzeptierten Zahlungsmittel und der eingesetzten Produkte genannt.</p>
          <p>
            Umsetzung der Website: <a href="https://infraone.ch" target="_blank" rel="noopener noreferrer">InfraOne IT Solutions GmbH</a>, Winterthur.
          </p>
        </div>
      </Section>
    </>
  );
}

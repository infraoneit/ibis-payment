import type { Metadata } from 'next';
import Link from 'next/link';
import { getKonditionen, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { dateDE } from '@/lib/format';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = pageMeta({ title: 'Allgemeine Geschäftsbedingungen', description: 'AGB von ibis payment für Terminal-Miete, Terminal-Kauf, Installation und Vermittlung von Acquiring-Verträgen.', path: '/agb' });

export default async function AgbPage() {
  const [site, k] = await Promise.all([getSite(), getKonditionen()]);
  return (
    <>
      <PageHero label="Rechtliches" title="Allgemeine Geschäftsbedingungen." lead="Gerüst zur Prüfung durch den Kunden und dessen Rechtsberatung. Die Punkte in eckigen Klammern sind vor Go-live zu ergänzen." crumbs={[{ name: 'AGB', href: '/agb' }]} />
      <Section label="1. Geltung und Vertragspartner" tight>
        <div className="prose prose-sm">
          <p>Diese AGB gelten für alle Verträge zwischen {site.legalName} («ibis payment») und Betrieben («Händler») über Terminal-Miete, Terminal-Kauf, Installation, Kassensysteme und die Vermittlung von Dienstleistungen. Sie gelten nur gegenüber Unternehmen, nicht gegenüber Konsumenten.</p>
          <p>
            <strong>Acquiring:</strong> {site.vertragspartner} Die Abwicklung der Kartenzahlungen, die Gutschrift und die Transaktionsgebühren richten sich nach diesem Acquiring-Vertrag und den dort genannten Bedingungen.
          </p>
          <p>
            <strong>Terminals:</strong> [Vertragspartner für Miete und Kauf eintragen.] Die auf ibis-payment.ch publizierten Preise (Stand {dateDE(k.stand)}, exkl. MwSt.) sind Richtwerte; verbindlich ist die schriftliche Offerte.
          </p>
        </div>
      </Section>
      <Section label="2. Miete" tight>
        <div className="prose prose-sm">
          <p>Die Miete umfasst das Terminal, Software-Updates, Wartung und den Austausch bei Defekt, der nicht auf unsachgemässe Behandlung zurückgeht. Der Mietvertrag ist monatlich kündbar [Kündigungsfrist eintragen]. Bei Vertragsende ist das Terminal in ordnungsgemässem Zustand zurückzugeben. [Regelung zu Verlust, Beschädigung und Saisonpausen eintragen.]</p>
        </div>
      </Section>
      <Section label="3. Kauf" tight>
        <div className="prose prose-sm">
          <p>Beim Kauf geht das Eigentum nach vollständiger Zahlung auf den Händler über. Es gilt eine Garantie von [2 Jahren] ab Lieferung auf Material und Verarbeitung. Software-Updates [Regelung eintragen]. Ein Wartungsvertrag kann separat abgeschlossen werden [Preis eintragen oder Position streichen].</p>
        </div>
      </Section>
      <Section label="4. Installation und Support" tight>
        <div className="prose prose-sm">
          <p>Installation, Kassenanbindung und Schulung erfolgen vor Ort [durch wen: siehe Angabe «Installation» in den Firmendaten]. Supportzeiten: {site.openingHours}. Servicezusagen (Ersatzgerät, Rückruf, Wochenende) gemäss Offerte [bestätigen].</p>
        </div>
      </Section>
      <Section label="5. Preise und Zahlung" tight>
        <div className="prose prose-sm">
          <p>Alle Preise verstehen sich in Schweizer Franken exkl. MwSt. Rechnungen sind innert [30] Tagen zahlbar. Transaktionsgebühren werden gemäss Acquiring-Vertrag direkt mit der Gutschrift verrechnet und monatlich auf einer Abrechnung ausgewiesen.</p>
        </div>
      </Section>
      <Section label="6. Bestpreis-Zusage" tight>
        <div className="prose prose-sm">
          <p>{site.bestpreis} Die Zusage bezieht sich auf den Vergleich derselben Umsätze, Kartenarten und Transaktionszahlen gemäss der eingereichten Monatsabrechnung. [Ausnahmen und Fristen eintragen.]</p>
        </div>
      </Section>
      <Section label="7. Haftung, Datenschutz, Gerichtsstand" tight>
        <div className="prose prose-sm">
          <p>Die Haftung für leichte Fahrlässigkeit und für indirekte Schäden ist ausgeschlossen, soweit gesetzlich zulässig. Für die Datenbearbeitung gilt die <Link href="/datenschutz">Datenschutzerklärung</Link>. Es gilt Schweizer Recht. Gerichtsstand ist [Sitz der Gesellschaft].</p>
          <p>Stand: [Datum eintragen].</p>
        </div>
      </Section>
    </>
  );
}

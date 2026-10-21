import type { Metadata } from 'next';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';

export const metadata: Metadata = pageMeta({ title: 'Datenschutzerklärung', description: 'Datenschutzerklärung von ibis-payment.ch nach Schweizer Datenschutzgesetz (DSG): Formulare, Hosting bei Netlify, keine Tracking-Cookies, Ihre Rechte.', path: '/datenschutz' });

export default async function DatenschutzPage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Rechtliches" title="Datenschutzerklärung." lead="Diese Website setzt keine Tracking-Cookies und braucht deshalb keinen Cookie-Banner. Wir erheben nur, was Sie uns über die Formulare senden." crumbs={[{ name: 'Datenschutz', href: '/datenschutz' }]} />
      <Section label="1. Verantwortliche" tight>
        <div className="prose prose-sm">
          <p>
            Verantwortlich für die Datenbearbeitung auf dieser Website ist {site.legalName}, {site.street}, {site.zip} {site.city}, Schweiz, <a href={`mailto:${site.email}`}>{site.email}</a>, {site.phone}. Massgebend ist das Schweizer Bundesgesetz über den Datenschutz (DSG) in der Fassung vom 1. September 2023. Soweit Personen im EWR betroffen sind, gilt ergänzend die DSGVO.
          </p>
        </div>
      </Section>
      <Section label="2. Hosting" tight>
        <div className="prose prose-sm">
          <p>
            Die Website wird bei Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, USA, gehostet und über deren weltweites Content Delivery Network ausgeliefert, mit Standorten unter anderem in Europa und den USA. Beim Aufruf verarbeitet Netlify technische Zugriffsdaten (IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser), um die Seite auszuliefern und Angriffe abzuwehren. Server-Logdateien werden von Netlify für
            einen begrenzten Zeitraum aufbewahrt. Mit Netlify besteht ein Vertrag zur Auftragsbearbeitung; die Übermittlung in die USA ist durch die Standardvertragsklauseln der EU und das Data Privacy Framework abgesichert. Datenschutzerklärung von Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">netlify.com/privacy</a>.
          </p>
        </div>
      </Section>
      <Section label="3. Formulare" tight>
        <div className="prose prose-sm">
          <p>
            <strong>Kontaktformular und Rechner:</strong> Name, Betrieb, Telefon, E-Mail, Thema, Nachricht und, falls Sie den Rechner genutzt haben, die dort eingegebenen Richtwerte. Zweck: Beantwortung Ihrer Anfrage und Erstellung einer Offerte. Rechtsgrundlage: Vertragsanbahnung. Aufbewahrung: bis zum Abschluss der Anfrage, bei Vertragsabschluss gemäss gesetzlichen Aufbewahrungspflichten (10 Jahre), sonst Löschung spätestens nach 12 Monaten.
          </p>
          <p>
            <strong>Abrechnung einreichen:</strong> zusätzlich die hochgeladene Monatsabrechnung Ihres heutigen Anbieters (PDF oder Foto, max. 10 MB). Zweck: Vergleichsrechnung. Die Datei wird ausschliesslich dafür verwendet und nach Erstellung des Vergleichs, spätestens nach 90 Tagen, gelöscht.
          </p>
          <p>
            <strong>Webdesign-Anfrage:</strong> Name, Betrieb, Telefon, E-Mail, bestehende Website, Branche, Nachricht. Diese Anfrage wird direkt an unseren Partner InfraOne IT Solutions GmbH, Winterthur, weitergeleitet, der sie als eigenständig Verantwortlicher bearbeitet. Datenschutzerklärung von InfraOne: <a href="https://infraone.ch" target="_blank" rel="noopener noreferrer">infraone.ch</a>.
          </p>
          <p>
            <strong>Prämien-Check:</strong> Branche, Anzahl Mitarbeitende, E-Mail oder Telefon. Weitergabe an unseren Versicherungspartner [Name und Adresse des Brokers] zur Prüfung Ihrer Prämien. Keine weitere Nutzung.
          </p>
          <p>
            Die Formulare werden technisch von Netlify Forms entgegengenommen und gespeichert (Netlify, Inc., siehe oben) und per E-Mail an uns bzw. den genannten Partner zugestellt. Ein unsichtbares Feld dient der Spam-Abwehr. Eine Weitergabe an andere Dritte findet nicht statt, ausser wir sind gesetzlich dazu verpflichtet.
          </p>
        </div>
      </Section>
      <Section label="4. Cookies und Tracking" tight>
        <div className="prose prose-sm">
          <p>Diese Website setzt keine Tracking-Cookies, keine Analyse-Tools und keine Werbe-Pixel ein. Es werden keine Daten an Google, Meta oder andere Werbenetzwerke übermittelt. Schriften werden von unserem eigenen Server geladen. Der Rechner speichert Ihre Eingaben nur vorübergehend im Sitzungsspeicher Ihres Browsers, damit sie ins Kontaktformular übernommen werden können; dieser wird beim Schliessen des Browsers gelöscht.</p>
        </div>
      </Section>
      <Section label="5. Externe Links" tight>
        <div className="prose prose-sm">
          <p>Links auf swipay.ch, paytec.ch und infraone.ch führen auf Websites Dritter mit eigenen Datenschutzbestimmungen. Beim Anklicken verlassen Sie unsere Website.</p>
        </div>
      </Section>
      <Section label="6. Ihre Rechte" tight>
        <div className="prose prose-sm">
          <p>
            Sie haben das Recht auf Auskunft über Ihre bei uns gespeicherten Personendaten, auf Berichtigung, Löschung, Einschränkung der Bearbeitung und Datenherausgabe. Anfragen richten Sie an <a href={`mailto:${site.email}`}>{site.email}</a>. Zuständige Aufsichtsbehörde ist der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB).
          </p>
          <p>Stand: [Datum vor Go-live eintragen]. Wir passen diese Erklärung an, wenn sich die Datenbearbeitung ändert.</p>
        </div>
      </Section>
    </>
  );
}

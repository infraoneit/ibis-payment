import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = pageMeta({
  title: 'Kontakt: Offerte innert 24 Stunden',
  description: 'Offerte für Zahlterminal, Kasse oder Online-Zahlungen anfordern. Rückmeldung am nächsten Werktag, auf Wunsch Beratung vor Ort. Telefon, E-Mail und Formular.',
  path: '/kontakt',
});

export default async function KontaktPage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Kontakt" title="Offerte innert 24 Stunden." lead="Sagen Sie uns, was Sie brauchen. Wir melden uns am nächsten Werktag; die Offerte erhalten Sie innert 24 Stunden, nachdem wir Ihre Abrechnung haben. Auf Wunsch kommen wir direkt vorbei." crumbs={[{ name: 'Kontakt', href: '/kontakt' }]} />
      <Section label="Anfrage" sub={`Oder direkt anrufen: ${site.phone}`}>
        <div className="contact">
          <div className="intro">
            <div className="cinfo">
              <div>
                <span>Telefon</span>
                <a className="num" href={`tel:${site.phoneHref}`}>
                  {site.phone}
                </a>
              </div>
              <div>
                <span>E-Mail</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div>
                <span>Adresse</span>
                <b>
                  {site.legalName}, {site.street}, {site.zip} {site.city}
                </b>
              </div>
              <div>
                <span>Erreichbar</span>
                <b>{site.openingHours}</b>
              </div>
              <div>
                <span>Einsatzgebiet</span>
                <b>{site.region}</b>
              </div>
            </div>
            <p className="pl-note">Beratung vor Ort ist kostenlos und unverbindlich. Wenn Sie Ihre letzte Abrechnung gleich mitschicken wollen: <Link href="/konditionen#abrechnung">Abrechnung einreichen</Link>.</p>
          </div>
          <Suspense fallback={null}>
            <ContactForm phone={site.phone} phoneHref={site.phoneHref} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro, Arrow } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Dienstleistungen für Ihren Betrieb',
  description: 'Website und IT, Telefonie und Internet mit InfraOne, Prämien-Check für Versicherungen und Treuhand mit Anbindung an Kasse und Kartenabrechnung. Ein Ansprechpartner.',
  path: '/dienstleistungen',
});

const ITEMS = [
  { href: '/webdesign', t: 'Website und IT', p: 'Website, E-Mail auf Microsoft 365, WLAN und Netzwerk im Betrieb, Backup und Support. Mit InfraOne IT Solutions, Winterthur.', by: 'InfraOne IT Solutions GmbH' },
  { href: '/dienstleistungen/telefonie', t: 'Telefonie und Internet', p: 'Geschäftsnummer und Telefonanlage in der Cloud (peoplefone), Business-Internet bis 1 Gbit/s (iway), Netzwerk und WLAN im Betrieb. Eingerichtet und betreut von InfraOne.', by: 'InfraOne IT Solutions GmbH mit peoplefone und iway' },
  { href: '/dienstleistungen/versicherungen', t: 'Versicherungen', p: 'Betriebshaftpflicht, Sachversicherung, Cyber und Personal. Unabhängiger Prämienvergleich, kostenlos.', by: '[Versicherungsbroker]' },
  { href: '/dienstleistungen/treuhand', t: 'Treuhand', p: 'Buchhaltung, Mehrwertsteuer, Lohn und Jahresabschluss, angebunden an Kasse und Kartenabrechnung.', by: '[Treuhandpartner]' },
];

export default async function DienstleistungenPage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Dienstleistungen" title="Wenn wir schon bei Ihnen sind." lead="Unsere Berater sehen Ihren Betrieb von innen. Darum vermitteln wir auch die Dienstleistungen rundherum, mit Partnern, die wir persönlich kennen, und zu Konditionen, die wir selbst geprüft haben." crumbs={[{ name: 'Dienstleistungen', href: '/dienstleistungen' }]} />
      <Section label="Übersicht" sub="Ein Ansprechpartner, vier Themen.">
        <Reveal>
          <Intro title="Sie haben eine Nummer. Wir koordinieren die Partner." />
        </Reveal>
        <div className="svcs">
          {ITEMS.map((s, i) => (
            <Reveal key={s.href} delay={(i % 3) as 0 | 1 | 2}>
              <Link className="svc" href={s.href}>
                <h3>{s.t}</h3>
                <div>
                  <p>{s.p}</p>
                  <p className="muted" style={{ fontSize: '.9rem', marginTop: 6 }}>
                    Partner: {s.by}
                  </p>
                </div>
                <div className="arrow">
                  <Arrow />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand title="Alles aus einer Hand. Ein Ansprechpartner." text="Sagen Sie uns, was Ihr Betrieb braucht. Wir koordinieren die Partner, Sie haben eine Nummer." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

import type { Metadata } from 'next';
import { getFaq, getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { BeraterCard, SupportStats } from '@/components/content/SupportCard';
import { Flow } from '@/components/content/Flow';
import { Faq } from '@/components/content/Faq';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Support: ein Anruf, ein Mensch, der Ihren Betrieb kennt',
  description: 'Zahlterminal-Support ohne Hotline: Sie rufen den Berater an, der Ihr Terminal eingerichtet hat. Ersatzgerät, Handy als Überbrückung, Hilfe bei Störungen.',
  path: '/support',
});

export default async function SupportPage() {
  const [site, faq] = await Promise.all([getSite(), getFaq('support')]);
  const s = site.service;
  return (
    <>
      <PageHero label="Support" title="Ein Anruf. Ein Mensch." lead="Bei uns landen Sie nicht in einer Warteschlaufe. Sie rufen die Person an, die Ihr Terminal eingerichtet hat, und die kennt Ihren Betrieb." crumbs={[{ name: 'Support', href: '/support' }]} />

      <Section label="Ihr Berater" sub="Mit Direktwahl, nicht mit Durchwahl.">
        <div className="support">
          <Reveal>
            <div className="intro">
              <BeraterCard site={site} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="facts">
              <div>
                <span>Erreichbar</span>
                <span>{site.openingHours}</span>
              </div>
              <div>
                <span>Rückruf</span>
                <span>{s.rueckruf}</span>
              </div>
              <div>
                <span>Ersatzgerät</span>
                <span>{s.ersatzgeraet}. Überbrückung mit dem Handy als Terminal.</span>
              </div>
              <div>
                <span>Wochenende</span>
                <span>{s.wochenende}</span>
              </div>
              <div>
                <span>Abrechnung</span>
                <span>{s.abrechnung}</span>
              </div>
              <div>
                <span>Wechsel</span>
                <span>{s.wechsel}</span>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <SupportStats />
        </Reveal>
      </Section>

      <Section tone="grey" label="Ablauf" sub="Vom ersten Gespräch bis zur ersten Zahlung.">
        <Reveal>
          <Intro title="In einer Woche von der Abrechnung zum laufenden Terminal." />
        </Reveal>
        <Reveal delay={1}>
          <Flow />
        </Reveal>
      </Section>

      <Section label="Störung" sub="Was Sie selbst prüfen können, bevor Sie anrufen.">
        <Reveal>
          <Intro title="Drei Dinge, die in neun von zehn Fällen helfen." />
        </Reveal>
        <div className="facts">
          <div>
            <span>Keine Verbindung</span>
            <span>Mobile Terminals: WLAN aus- und einschalten, das Terminal wechselt dann auf 4G. Stationäre Terminals: Netzwerkkabel und Router prüfen. Läuft das Gäste-WLAN, aber nicht das Terminal, ist meist das Kassennetz betroffen.</span>
          </div>
          <div>
            <span>Karte wird abgelehnt</span>
            <span>Eine Ablehnung kommt in der Regel von der Bank des Kunden, nicht vom Terminal. Kontaktlos nochmals versuchen, sonst Chip stecken. Lehnt das Terminal alle Karten ab, rufen Sie an.</span>
          </div>
          <div>
            <span>Terminal startet nicht</span>
            <span>Akku laden oder Netzteil prüfen, zehn Sekunden Einschalttaste. Bleibt das Display dunkel, organisieren wir ein Ersatzgerät und richten zur Überbrückung das Handy als Terminal ein.</span>
          </div>
        </div>
      </Section>

      <Section label="Fragen" sub="Zu Betrieb und Störungen.">
        <Faq items={faq} />
      </Section>

      <CtaBand title="Etwas läuft nicht? Rufen Sie an." text={`${site.openingHours}. ${s.wochenende}`} phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

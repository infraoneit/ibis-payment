import type { Metadata } from 'next';
import Image from 'next/image';
import { getReferenzen, getSite, getTeam } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section, Intro } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { CtaBand } from '@/components/content/CtaBand';

export const metadata: Metadata = pageMeta({
  title: 'Über uns: wer hinter ibis payment steht',
  description: 'IBIS Management GmbH, exklusiver Vertriebspartner der SwiPay AG: Zahlterminals, Kassen und Online-Zahlungen für Schweizer Betriebe. Offene Zahlen, Technik vor Ort.',
  path: '/ueber-uns',
});

export default async function UeberUnsPage() {
  const [site, team, refs] = await Promise.all([getSite(), getTeam(), getReferenzen()]);
  return (
    <>
      <PageHero label="Über uns" title="Wer hinter ibis payment steht." lead="Ein Schweizer Unternehmen, das Zahlungssysteme verkauft, wie es sie selbst kaufen möchte: mit offenen Zahlen, einem Ansprechpartner und Technik, die vor Ort eingerichtet wird." crumbs={[{ name: 'Über uns', href: '/ueber-uns' }]} />

      <Section label="Warum" sub="Weshalb es ibis payment gibt.">
        <Reveal>
          <Intro title="Wir haben zu oft gesehen, was Betriebe für ihr Terminal zahlen." text="Hohe Gebühren, lange Verträge und niemand, der abnimmt. Das Produkt selbst ist nicht kompliziert. Kompliziert wird es nur, wenn man die Preise versteckt. Also tun wir das nicht." />
        </Reveal>
        <div className="claims">
          <Reveal>
            <div className="claim">
              <h3>Exklusiver Vertriebspartner der SwiPay AG</h3>
              <p>{site.legalName} vertreibt die Bezahllösungen der SwiPay AG in Baar exklusiv, über rund 30 Vertriebspartner in der ganzen Schweiz. Acquiring über das SwiPay-Bezahlnetzwerk mit TeleCash/Fiserv, Terminals von PayTec aus Effretikon. Alle Partner mit Support in Landessprachen.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="claim">
              <h3>Technik vor Ort</h3>
              <p>Installation, Kassenanbindung und WLAN richten wir in Ihrem Betrieb ein. {site.installation} Für Website, E-Mail und Netzwerk arbeiten wir mit InfraOne IT Solutions aus Winterthur.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="claim">
              <h3>Ein Ansprechpartner</h3>
              <p>Der Berater, der Ihnen die Offerte macht, richtet das Terminal ein und nimmt ab, wenn Sie anrufen. Das ist das ganze Konzept.</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="grey" label="Team" sub="Beratung, Verkauf und Technik.">
        <div className="devgrid">
          {team.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) as 0 | 1 | 2}>
              <div className="devcard">
                <div className="photo" style={{ width: '100%', height: 280 }}>
                  {t.foto ? <Image src={t.foto} alt={t.name} width={400} height={280} /> : <span>Foto [Platzhalter]</span>}
                </div>
                <h3>{t.name}</h3>
                <p>{t.rolle}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section label="Partner" sub="Mit wem wir arbeiten.">
        <div className="facts">
          <div>
            <span>Acquiring</span>
            <span>{site.partner.acquiring}</span>
          </div>
          <div>
            <span>Terminals</span>
            <span>{site.partner.terminals}</span>
          </div>
          <div>
            <span>Website und IT</span>
            <span>{site.partner.it}</span>
          </div>
          <div>
            <span>Telefonie</span>
            <span>{site.partner.telefonie}</span>
          </div>
          <div>
            <span>Versicherungen</span>
            <span>{site.partner.versicherung}</span>
          </div>
          <div>
            <span>Treuhand</span>
            <span>{site.partner.treuhand}</span>
          </div>
        </div>
      </Section>

      {refs.length > 0 && (
        <Section label="Referenzen" sub="Stimmen aus Betrieben, die gewechselt haben.">
          <div className="quotes">
            {refs.map((r) => (
              <div className="qq" key={r.slug}>
                <p>«{r.zitat}»</p>
                <div className="who">
                  <b>{r.name}</b>
                  {r.betrieb}, {r.ort}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title="Lernen wir uns kennen." text="Ein Gespräch vor Ort kostet nichts. Danach wissen Sie, was Sie heute zahlen und was Sie bei uns zahlen würden." phone={site.phone} phoneHref={site.phoneHref} />
    </>
  );
}

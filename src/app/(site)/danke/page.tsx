import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getSite } from '@/lib/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';
import { DankeText } from './DankeText';

export const metadata: Metadata = pageMeta({ title: 'Danke, Ihre Anfrage ist angekommen', description: 'Bestätigung Ihrer Anfrage an ibis payment.', path: '/danke', noIndex: true });

export default async function DankePage() {
  const site = await getSite();
  return (
    <>
      <PageHero label="Danke" title="Angekommen.">
        <Suspense fallback={<p className="lead">Ihre Anfrage ist angekommen. Wir melden uns am nächsten Werktag.</p>}>
          <DankeText />
        </Suspense>
      </PageHero>
      <Section label="Weiter" tight>
        <div className="hero-ctas">
          <Link className="btn btn-ink" href="/konditionen">
            Konditionen ansehen
          </Link>
          <a className="tel num" href={`tel:${site.phoneHref}`}>
            Dringend? {site.phone}
          </a>
        </div>
      </Section>
    </>
  );
}

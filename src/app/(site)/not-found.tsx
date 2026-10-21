import Link from 'next/link';
import { PageHero } from '@/components/content/PageHero';
import { Section } from '@/components/layout/Section';

export default function NotFound() {
  return (
    <>
      <PageHero label="Fehler 404" title="Diese Seite gibt es nicht." lead="Vielleicht ist die Adresse veraltet oder vertippt. Die wichtigsten Seiten finden Sie hier." />
      <Section label="Weiter" tight>
        <div className="hero-ctas">
          <Link className="btn btn-ink" href="/">
            Zur Startseite
          </Link>
          <Link className="btn btn-outline" href="/konditionen">
            Konditionen
          </Link>
          <Link className="btn btn-outline" href="/kontakt">
            Kontakt
          </Link>
        </div>
      </Section>
    </>
  );
}

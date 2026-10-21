import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';

export function CtaBand({
  title = 'Offerte innert 24 Stunden.',
  text = 'Schicken Sie uns Ihre letzte Abrechnung oder rufen Sie an. Auf Wunsch kommen wir direkt vorbei.',
  label = 'Offerte anfordern',
  href = '/kontakt',
  phone,
  phoneHref,
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
  phone: string;
  phoneHref: string;
}) {
  const external = /^https?:/.test(href);
  return (
    <section className="cta-band dark">
      <div className="wrap">
        <Reveal>
          <h2>{title}</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="muted">{text}</p>
        </Reveal>
        <Reveal delay={2}>
          <div className="actions">
            {external ? (
              <a className="btn btn-white" href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link className="btn btn-white" href={href}>
                {label}
              </Link>
            )}
            <a className="tel num" href={`tel:${phoneHref}`}>
              {phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

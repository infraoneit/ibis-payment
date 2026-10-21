import Link from 'next/link';
import { FOOTER_COLUMNS } from '@/lib/nav';
import { LogoWordmark } from '@/components/brand/Logo';
import type { Site } from '@/lib/content';

export function Footer({ site }: { site: Site }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot">
          <div className="about">
            <Link className="logo" href="/" aria-label="ibis payment, zur Startseite">
              <LogoWordmark />
            </Link>
            <p>Zahlterminals, Kassensysteme und Online-Zahlungen für Schweizer Betriebe. Jede Gebühr steht in der Offerte.</p>
            <p>
              {site.legalName}
              <br />
              {site.street}, {site.zip} {site.city}
              <br />
              <a href={`tel:${site.phoneHref}`} className="num">
                {site.phone}
              </a>
              {' · '}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <div className="badges" aria-label="Merkmale">
              <span className="badge">ep2-zertifizierte Terminals</span>
              <span className="badge">Schweizer Acquiring</span>
              <span className="badge">Keine Tracking-Cookies</span>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="h">{col.title}</div>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>
            © {year} {site.legalName}. {site.region}. Preise exkl. MwSt.
          </span>
          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
            <li>
              <Link href="/agb">AGB</Link>
            </li>
            <li>
              Umsetzung:{' '}
              <a href="https://infraone.ch" target="_blank" rel="noopener noreferrer">
                InfraOne IT Solutions GmbH
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

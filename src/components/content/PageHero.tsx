import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, type Crumb } from '@/lib/seo';
import type { ReactNode } from 'react';

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, ...crumbs])} />
      <nav aria-label="Brotkrumen">
        <ol className="crumbs">
          <li>
            <Link href="/">Startseite</Link>
          </li>
          {crumbs.map((c, i) => (
            <li key={c.href} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
              {i === crumbs.length - 1 ? <span>{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({ label, title, lead, crumbs, children }: { label: string; title: string; lead?: string; crumbs?: Crumb[]; children?: ReactNode }) {
  return (
    <section className="page-hero section no-line">
      <div className="wrap row">
        <div className="lbl">{label}</div>
        <div>
          {crumbs && <Breadcrumbs crumbs={crumbs} />}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

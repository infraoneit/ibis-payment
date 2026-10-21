import type { Metadata } from 'next';

export const SITE_URL = 'https://ibis-payment.ch';
export const SITE_NAME = 'ibis payment';

/** Metadaten mit Canonical und hreflang-Vorbereitung (FR und IT folgen später). */
export function pageMeta(input: { title: string; description: string; path: string; image?: string; noIndex?: boolean }): Metadata {
  const url = `${SITE_URL}${input.path === '/' ? '' : input.path}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        'de-CH': url,
        'x-default': url,
        // 'fr-CH': `${SITE_URL}/fr${input.path}`,
        // 'it-CH': `${SITE_URL}/it${input.path}`,
      },
    },
    openGraph: { title: input.title, description: input.description, url, images: [{ url: input.image ?? '/og-image.png', width: 1200, height: 630 }] },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.href === '/' ? '' : c.href}` })),
  };
}

export function faqJsonLd(items: { frage: string; antwort: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.frage, acceptedAnswer: { '@type': 'Answer', text: f.antwort.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') } })),
  };
}

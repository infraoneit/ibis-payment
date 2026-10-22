import type { MetadataRoute } from 'next';
import { getGeraete, getLandingpages } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/konditionen', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/geraete', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/kassensysteme', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/online-zahlungen', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/handy-als-terminal', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/support', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/ueber-uns', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/kontakt', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/dienstleistungen', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/branchen', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/wissen', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/impressum', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/datenschutz', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/agb', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [geraete, pages] = await Promise.all([getGeraete(), getLandingpages()]);
  const now = new Date();
  const alt = (path: string) => ({ languages: { 'de-CH': `${SITE_URL}${path === '/' ? '' : path}` } });
  return [
    ...STATIC.map((s) => ({ url: `${SITE_URL}${s.path === '/' ? '' : s.path}`, lastModified: now, priority: s.priority, changeFrequency: s.changeFrequency, alternates: alt(s.path) })),
    ...geraete.map((g) => ({ url: `${SITE_URL}/geraete/${g.slug}`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' as const, alternates: alt(`/geraete/${g.slug}`) })),
    ...pages.map((p) => ({ url: `${SITE_URL}${p.pfad}`, lastModified: now, priority: p.cluster === 'wissen' ? 0.6 : 0.7, changeFrequency: 'monthly' as const, alternates: alt(p.pfad) })),
  ];
}

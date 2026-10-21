import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSite } from '@/lib/content';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const site = await getSite();
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: site.legalName,
          alternateName: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/icon-512.png`,
          email: site.email,
          telephone: site.phoneHref,
          address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: 'CH' },
        }}
      />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-md">
        Zum Inhalt springen
      </a>
      <Header phone={site.phone} phoneHref={site.phoneHref} />
      <main id="main">{children}</main>
      <Footer site={site} />
    </>
  );
}

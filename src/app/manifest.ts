import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ibis payment',
    short_name: 'ibis payment',
    description: 'Zahlterminals, Kassensysteme und Online-Zahlungen für Schweizer Betriebe.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'de-CH',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

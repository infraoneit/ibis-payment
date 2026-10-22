import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { THEME_INIT_SCRIPT } from '@/components/ui/ThemeToggle';

const hanken = localFont({
  src: [
    { path: '../fonts/HankenGrotesk-Variable.ttf', weight: '100 900', style: 'normal' },
    { path: '../fonts/HankenGrotesk-Italic-Variable.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-hanken',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: Zahlterminals mit Gebühren, die Sie verstehen`, template: `%s | ${SITE_NAME}` },
  description:
    'Zahlterminals, Kassensysteme und Online-Zahlungen für Schweizer Betriebe. Jede Gebühr steht in der Offerte, ein Berater mit Direktwahl, Installation vor Ort.',
  applicationName: SITE_NAME,
  openGraph: { type: 'website', locale: 'de_CH', siteName: SITE_NAME, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ibis payment' }] },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }, { media: '(prefers-color-scheme: dark)', color: '#0f0d0b' }], width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH" className={hanken.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

/** Menüstruktur nach dem Vorbild fonio.ai: drei Dropdowns, direkte Links, rechts Sprache und zwei CTAs. */
import type { IconName } from '@/components/ui/Icons';

export type NavLink = { label: string; href: string; description?: string; badge?: string; external?: boolean; icon?: IconName };
export type NavGroup = { title: string; links: NavLink[] };
export type NavItem =
  | { label: string; href: string }
  | { label: string; groups: NavGroup[] };

export const NAV: NavItem[] = [
  {
    label: 'Produkte',
    groups: [
      {
        title: 'Zahlungssysteme',
        links: [
          { label: 'Zahlterminals', href: '/geraete', icon: 'terminal', description: 'Mobil, stationär, kassenintegriert, Automat' },
          { label: 'Kassensysteme', href: '/kassensysteme', icon: 'register', description: 'Kasse und Terminal aus einer Hand' },
          { label: 'Online-Zahlungen', href: '/online-zahlungen', icon: 'globe', description: 'Webshop, Zahllink, über 40 Methoden' },
          { label: 'Handy als Terminal', href: '/handy-als-terminal', icon: 'mobile', description: 'Kartenzahlung ohne Gerät' },
          { label: 'TWINT am Terminal', href: '/twint-terminal', icon: 'contactless', description: 'Direkt auf dem Display, ohne Aufsteller' },
        ],
      },
      {
        title: 'Modelle',
        links: [
          { label: 'PayTec N62', href: '/geraete/paytec-n62', description: 'Kompakt, mobil, ohne Drucker' },
          { label: 'PayTec N96', href: '/geraete/paytec-n96', description: 'Mobil mit Drucker, 6.5 Zoll' },
          { label: 'PayTec CT20P', href: '/geraete/paytec-ct20p', description: 'Kassenplatz, PIN-Pad' },
          { label: 'PayTec V3CT3', href: '/geraete/paytec-v3ct3', description: 'Tischterminal mit Drucker' },
          { label: 'PayTec UN20', href: '/geraete/paytec-un20', description: 'Einbau in Automaten' },
        ],
      },
    ],
  },
  {
    label: 'Lösungen',
    groups: [
      {
        title: 'Anwendungen',
        links: [
          { label: 'Terminal mieten', href: '/zahlterminal-mieten', icon: 'clock' },
          { label: 'Terminal kaufen', href: '/zahlterminal-kaufen', icon: 'coins' },
          { label: 'Anbieter vergleichen', href: '/zahlterminal-vergleich', icon: 'chart' },
          { label: 'Worldline-Alternative', href: '/worldline-alternative', icon: 'swap' },
          { label: 'SumUp-Alternative', href: '/sumup-alternative', icon: 'swap' },
        ],
      },
      {
        title: 'Branchen',
        links: [
          { icon: 'cup', label: 'Restaurant und Café', href: '/branchen/restaurant' },
          { icon: 'scissors', label: 'Coiffeur und Kosmetik', href: '/branchen/coiffeur' },
          { icon: 'cart', label: 'Detailhandel', href: '/branchen/detailhandel' },
          { icon: 'stethoscope', label: 'Praxis', href: '/branchen/praxis' },
          { icon: 'tent', label: 'Marktstand und Event', href: '/branchen/marktstand' },
          { icon: 'layers', label: 'Alle Branchen', href: '/branchen' },
        ],
      },
      {
        title: 'Regionen',
        links: [
          { icon: 'mapPin', label: 'Winterthur', href: '/zahlterminal-winterthur' },
          { icon: 'mapPin', label: 'Zürich', href: '/zahlterminal-zuerich' },
          { icon: 'mapPin', label: 'Ostschweiz', href: '/zahlterminal-ostschweiz' },
        ],
      },
    ],
  },
  {
    label: 'Ressourcen',
    groups: [
      {
        title: 'Wissen',
        links: [
          { icon: 'percent', label: 'Gebühren verstehen', href: '/wissen/kartenzahlung-gebuehren-schweiz' },
          { icon: 'layers', label: 'Rollen im Payment', href: '/wissen/rollen-im-payment' },
          { icon: 'swap', label: 'PSP oder Broker', href: '/wissen/psp-oder-broker' },
          { icon: 'search', label: 'Typische Fehler', href: '/wissen/typische-fehler' },
          { icon: 'coins', label: 'Mieten oder kaufen', href: '/wissen/mieten-oder-kaufen' },
          { icon: 'book', label: 'Alle Artikel', href: '/wissen' },
        ],
      },
      {
        title: 'Hilfe',
        links: [
          { icon: 'phone', label: 'Support und Störungen', href: '/support' },
          { icon: 'book', label: 'Hilfecenter SwiPay', href: 'https://swipay.ch/hilfecenter/', external: true },
          { icon: 'folder', label: 'Downloads SwiPay', href: 'https://swipay.ch/downloads/', external: true },
          { icon: 'receipt', label: 'Vertragsunterlagen', href: 'https://swipay.ch/vertragsunterlagen/', external: true },
        ],
      },
      {
        title: 'Unternehmen',
        links: [
          { icon: 'building', label: 'Über uns', href: '/ueber-uns' },
          { icon: 'layers', label: 'Dienstleistungen', href: '/dienstleistungen' },
          { icon: 'phone', label: 'Telefonie und Internet', href: '/dienstleistungen/telefonie' },
          { icon: 'monitor', label: 'Webdesign', href: '/webdesign' },
          { icon: 'chat', label: 'Kontakt', href: '/kontakt' },
        ],
      },
    ],
  },
  { label: 'Support', href: '/support' },
  { label: 'Konditionen', href: '/konditionen' },
];

export const FOOTER_COLUMNS: NavGroup[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Zahlterminals', href: '/geraete' },
      { label: 'Kassensysteme', href: '/kassensysteme' },
      { label: 'Online-Zahlungen', href: '/online-zahlungen' },
      { label: 'Konditionen', href: '/konditionen' },
      { label: 'Rechner', href: '/konditionen#rechner' },
      { label: 'Abrechnung einreichen', href: '/konditionen#abrechnung' },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Support', href: '/support' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Dienstleistungen', href: '/dienstleistungen' },
      { label: 'Webdesign', href: '/webdesign' },
    ],
  },
  {
    title: 'Ressourcen',
    links: [
      { label: 'Gebühren verstehen', href: '/wissen/kartenzahlung-gebuehren-schweiz' },
      { label: 'Zahlterminal-Vergleich', href: '/zahlterminal-vergleich' },
      { label: 'Branchen', href: '/branchen' },
      { label: 'Wissen', href: '/wissen' },
      { label: 'Hilfecenter SwiPay', href: 'https://swipay.ch/hilfecenter/', external: true },
      { label: 'Glossar SwiPay', href: 'https://swipay.ch/glossar/', external: true },
    ],
  },
];

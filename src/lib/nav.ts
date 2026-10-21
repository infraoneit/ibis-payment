/** Menüstruktur nach dem Vorbild fonio.ai: drei Dropdowns, direkte Links, rechts Sprache und zwei CTAs. */
export type NavLink = { label: string; href: string; description?: string; badge?: string; external?: boolean };
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
          { label: 'Zahlterminals', href: '/geraete', description: 'Mobil, stationär, kassenintegriert, Automat' },
          { label: 'Kassensysteme', href: '/kassensysteme', description: 'Kasse und Terminal aus einer Hand' },
          { label: 'Online-Zahlungen', href: '/online-zahlungen', description: 'Webshop, Zahllink, über 40 Methoden' },
          { label: 'Handy als Terminal', href: '/handy-als-terminal', description: 'Kartenzahlung ohne Gerät' },
          { label: 'TWINT am Terminal', href: '/twint-terminal', description: 'Direkt auf dem Display, ohne Aufsteller' },
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
          { label: 'Terminal mieten', href: '/zahlterminal-mieten' },
          { label: 'Terminal kaufen', href: '/zahlterminal-kaufen' },
          { label: 'Anbieter vergleichen', href: '/zahlterminal-vergleich' },
          { label: 'Worldline-Alternative', href: '/worldline-alternative' },
          { label: 'SumUp-Alternative', href: '/sumup-alternative' },
        ],
      },
      {
        title: 'Branchen',
        links: [
          { label: 'Restaurant und Café', href: '/branchen/restaurant' },
          { label: 'Coiffeur und Kosmetik', href: '/branchen/coiffeur' },
          { label: 'Detailhandel', href: '/branchen/detailhandel' },
          { label: 'Praxis', href: '/branchen/praxis' },
          { label: 'Marktstand und Event', href: '/branchen/marktstand' },
        ],
      },
      {
        title: 'Regionen',
        links: [
          { label: 'Winterthur', href: '/zahlterminal-winterthur' },
          { label: 'Zürich', href: '/zahlterminal-zuerich' },
          { label: 'Ostschweiz', href: '/zahlterminal-ostschweiz' },
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
          { label: 'Gebühren verstehen', href: '/wissen/kartenzahlung-gebuehren-schweiz' },
          { label: 'Rollen im Payment', href: '/wissen/rollen-im-payment' },
          { label: 'PSP oder Broker', href: '/wissen/psp-oder-broker' },
          { label: 'Typische Fehler', href: '/wissen/typische-fehler' },
          { label: 'Mieten oder kaufen', href: '/wissen/mieten-oder-kaufen' },
        ],
      },
      {
        title: 'Hilfe',
        links: [
          { label: 'Support und Störungen', href: '/support' },
          { label: 'Hilfecenter SwiPay', href: 'https://swipay.ch/hilfecenter/', external: true },
          { label: 'Downloads SwiPay', href: 'https://swipay.ch/downloads/', external: true },
          { label: 'Vertragsunterlagen', href: 'https://swipay.ch/vertragsunterlagen/', external: true },
        ],
      },
      {
        title: 'Unternehmen',
        links: [
          { label: 'Über uns', href: '/ueber-uns' },
          { label: 'Dienstleistungen', href: '/dienstleistungen' },
          { label: 'Webdesign', href: '/webdesign' },
          { label: 'Kontakt', href: '/kontakt' },
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
      { label: 'Branchen', href: '/branchen/restaurant' },
      { label: 'Hilfecenter SwiPay', href: 'https://swipay.ch/hilfecenter/', external: true },
      { label: 'Glossar SwiPay', href: 'https://swipay.ch/glossar/', external: true },
    ],
  },
];

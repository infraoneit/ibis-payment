import { Timeline } from './Timeline';
import { Icon } from '@/components/ui/Icons';

const STEPS = [
  { icon: <Icon.chat />, title: 'Gespräch vor Ort', text: 'Wir sehen uns Ablauf, Kasse und Netzwerk an. Bringen Sie Ihre letzte Abrechnung mit.', meta: 'Tag 1' },
  { icon: <Icon.receipt />, title: 'Offerte', text: 'Alle Gebühren pro Kartenart, Terminal und Monat auf einer Seite. Ohne Fussnoten.', meta: 'innert 24 Stunden' },
  { icon: <Icon.tools />, title: 'Installation', text: 'Terminal, Kassenanbindung und WLAN richten wir bei Ihnen ein und testen jede Zahlungsart.', meta: 'Tag 3 bis 7' },
  { icon: <Icon.user />, title: 'Schulung', text: 'Ihr Team lernt Trinkgeld, Storno, Tagesabschluss und was bei einer Störung zu tun ist.', meta: 'am Installationstag' },
  { icon: <Icon.phone />, title: 'Betrieb', text: 'Ein Anruf bei Ihrem Berater genügt. Ersatzgerät statt Ticket.', meta: 'laufend' },
];

/** Ablauf in fünf Schritten als horizontale Timeline (mobil vertikal). */
export function Flow() {
  return <Timeline items={STEPS} horizontal />;
}

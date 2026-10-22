import { Section, Intro } from '@/components/layout/Section';
import { Timeline } from '@/components/content/Timeline';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';

const CLAIMS = [
  { icon: <Icon.receipt />, title: 'Jede Gebühr steht in der Offerte. Pro Kartenart, auf einer Seite.', text: 'Interchange, Netzwerkgebühr und unsere Marge sind getrennt ausgewiesen. Was nicht in der Offerte steht, wird nicht verrechnet.' },
  { icon: <Icon.calculator />, title: 'Wir unterbieten Ihre heutige Abrechnung. Oder sagen Ihnen, dass es nicht geht.', text: 'Schicken Sie uns Ihre letzte Monatsabrechnung. Innert 24 Stunden erhalten Sie den Vergleich mit denselben Umsätzen, Zahl für Zahl.' },
  { icon: <Icon.phone />, title: 'Sie rufen die Person an, die Ihr Terminal eingerichtet hat.', text: 'Keine Hotline, keine Ticketnummer. Ihr Berater kennt Ihren Betrieb, Ihre Kasse und Ihr Netzwerk, weil er alles selbst installiert hat.' },
  { icon: <Icon.tools />, title: 'Installation vor Ort, inklusive Kasse, WLAN und Netzwerk.', text: 'Wir richten das Terminal in Ihrem Betrieb ein, binden es an die Kasse an und schulen Ihr Team. Das Terminal kommt nicht per Post.' },
  { icon: <Icon.swap />, title: 'Monatlich kündbar. Keine Aufschaltgebühr, keine Mindestgebühr.', text: 'Sie bleiben, weil es passt, nicht weil ein Vertrag Sie hält. Wer wenig Umsatz hat, zahlt wenig; wer wechselt, zahlt nichts für den Wechsel.' },
];

/** Fünf Versprechen als Timeline mit Icons. */
export function Promises() {
  return (
    <Section id="versprechen" label="Versprechen" sub="Fünf Sätze, an denen Sie uns messen können.">
      <Reveal>
        <Intro title="Was wir zusagen, steht hier. Nicht im Kleingedruckten." />
      </Reveal>
      <Timeline items={CLAIMS} />
    </Section>
  );
}

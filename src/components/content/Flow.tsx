'use client';

import { useEffect } from 'react';
import { useInView } from '@/components/motion/Reveal';

const STEPS = [
  { b: 'Gespräch vor Ort', p: 'Wir sehen uns Ablauf, Kasse und Netzwerk an. Bringen Sie Ihre letzte Abrechnung mit.', em: 'Tag 1' },
  { b: 'Offerte', p: 'Alle Gebühren pro Kartenart, Terminal und Monat auf einer Seite. Ohne Fussnoten.', em: 'innert 24 Stunden' },
  { b: 'Installation', p: 'Terminal, Kassenanbindung und WLAN richten wir ein und schulen Ihr Team.', em: 'Tag 3 bis 7' },
  { b: 'Betrieb', p: 'Ein Anruf bei Ihrem Berater genügt. Ersatzgerät statt Ticket.', em: 'laufend' },
];

/** Ablauf in vier Schritten; die Linie zeichnet sich beim Scrollen. */
export function Flow() {
  const { ref, onEnter } = useInView<HTMLOListElement>(0.3);
  useEffect(() => {
    onEnter(() => ref.current?.classList.add('in'));
  }, [onEnter, ref]);
  return (
    <ol className="flow" ref={ref} style={{ listStyle: 'none', margin: 0, padding: 0, paddingTop: 36 }}>
      <div className="line" aria-hidden="true" />
      {STEPS.map((s) => (
        <li className="st" key={s.b}>
          <b>{s.b}</b>
          <p>{s.p}</p>
          <em>{s.em}</em>
        </li>
      ))}
    </ol>
  );
}

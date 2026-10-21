'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';

const CLAIMS = [
  { n: '01', h: 'Jede Gebühr steht in der Offerte. Pro Kartenart, auf einer Seite.', p: 'Interchange, Netzwerkgebühr und unsere Marge sind getrennt ausgewiesen. Was nicht in der Offerte steht, wird nicht verrechnet.' },
  { n: '02', h: 'Wir unterbieten Ihre heutige Abrechnung. Oder sagen Ihnen, dass es nicht geht.', p: 'Schicken Sie uns Ihre letzte Monatsabrechnung. Innert 24 Stunden erhalten Sie den Vergleich mit denselben Umsätzen, Zahl für Zahl.' },
  { n: '03', h: 'Sie rufen die Person an, die Ihr Terminal eingerichtet hat.', p: 'Keine Hotline, keine Ticketnummer. Ihr Berater kennt Ihren Betrieb, Ihre Kasse und Ihr Netzwerk, weil er alles selbst installiert hat.' },
  { n: '04', h: 'Installation vor Ort, inklusive Kasse, WLAN und Netzwerk.', p: 'Wir richten das Terminal in Ihrem Betrieb ein, binden es an die Kasse an und schulen Ihr Team. Das Terminal kommt nicht per Post.' },
];

/** Vier Versprechen mit mitlaufender Kapitelnummer (sticky links). */
export function Promises() {
  const [cur, setCur] = useState('01');
  const [swap, setSwap] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const n = (e.target as HTMLElement).dataset.n!;
          setCur((c) => {
            if (c === n) return c;
            if (!reduce) {
              setSwap(true);
              setTimeout(() => setSwap(false), 180);
            }
            return n;
          });
        });
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className="section" id="versprechen">
      <div className="wrap promises">
        <div className="sticky">
          <div className={`bignum${swap ? ' swap' : ''}`} aria-hidden="true">
            {cur}
          </div>
          <h2 className="lbl">
            Versprechen<span>Vier Sätze, an denen Sie uns messen können.</span>
          </h2>
        </div>
        <div className="claims">
          {CLAIMS.map((c, i) => (
            <Reveal key={c.n}>
              <div
                className="claim"
                data-n={c.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <h3>
                  <span className="sr-only">{c.n}. </span>
                  {c.h}
                </h3>
                <p>{c.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

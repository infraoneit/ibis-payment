'use client';

import { useEffect, useRef } from 'react';
import { LogoMark, LogoWordmark } from '@/components/brand/Logo';

/** 3D-Terminal: leichte Dauerbewegung plus Scroll-Rotation (begrenzt auf -26 bis +26 Grad),
 *  Karte bezahlt kontaktlos, Haken wird bei Erfolg grün (CSS-Keyframes, 7-Sekunden-Takt). */
export function HeroTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const device = ref.current;
    if (!device) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      device.style.transform = 'rotateY(-20deg) rotateX(6deg)';
      return;
    }
    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = Math.min(window.scrollY, 700) / 700; // Scroll-Anteil 0..1 innerhalb des Hero
      const idle = Math.sin((now - start) / 2400) * 18; // deutliche Dauerbewegung ±18°
      const a = -28 + t * 56 + idle; // gesamt -46 bis +46 Grad, nie die Kante
      const x = 8 - t * 8 + Math.cos((now - start) / 3300) * 3;
      const ox = Math.sin(t * Math.PI) * 18;
      const oy = -t * 14;
      device.style.transform = `translate3d(${ox.toFixed(1)}px,${oy.toFixed(1)}px,0) rotateY(${a.toFixed(2)}deg) rotateX(${x.toFixed(2)}deg)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(render);
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="stage-wrap">
    <div className="stage" role="img" aria-label="Animiertes Zahlterminal: eine Karte bezahlt kontaktlos CHF 48.50, das Terminal bestätigt die Zahlung mit einem grünen Haken.">
      <div className="floaty" aria-hidden="true">
        <div className="device" ref={ref}>
          <div className="layer back">
            <LogoMark />
          </div>
          {[8, 7, 6, 5, 4, 3, 2, 1].map((i) => (
            <div key={i} className="layer" style={{ ['--i' as string]: i }} />
          ))}
          <div className="front">
            <div className="slot" />
            <div className="camera" />
            <div className="screen">
              <div className="status">
                <b>ibis</b>
                <span>4G · 100 %</span>
              </div>
              <div className="scr pay">
                <div className="amt-label">Betrag</div>
                <div className="amt num">CHF 48.50</div>
                <div className="nfc">
                  <span />
                  <span />
                  <span />
                  <i />
                </div>
                <div className="hint">Karte oder Handy vorhalten</div>
              </div>
              <div className="scr ok">
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <div className="amt num">CHF 48.50</div>
                <div className="hint">Zahlung erfolgreich</div>
              </div>
              <div className="brandline">
                <LogoWordmark />
              </div>
            </div>
          </div>
        </div>
        <div className="card3d">
          <div className="chip" />
          <svg className="wifi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h0" />
          </svg>
          <div>•••• 4821</div>
          <div className="name">M. MUSTER</div>
          <div className="brand">debit</div>
        </div>
      </div>
    </div>
      <p className="caption" aria-hidden="true">
        Smart-Terminal mit Touchscreen, 4G und WLAN. ep2-zertifiziert für die Schweiz.
      </p>
    </div>
  );
}

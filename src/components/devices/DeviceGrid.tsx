import { DeviceMini, TiltCard, type MiniKind } from './DeviceMini';
import { Reveal } from '@/components/motion/Reveal';
import { chf } from '@/lib/format';
import type { Geraet } from '@/lib/content';

export function miniKind(g: Pick<Geraet, 'kategorie' | 'slug'>): MiniKind {
  if (g.kategorie === 'mobil') return g.slug === 'paytec-n62' ? 'mobile' : 'mobile-printer';
  if (g.kategorie === 'kassenintegriert') return 'desk-keys';
  if (g.kategorie === 'stationaer') return 'desk';
  if (g.slug === 'paytec-n62-vending') return 'small';
  return 'auto';
}

export const KATEGORIE_LABEL: Record<string, string> = { mobil: 'Mobil', stationaer: 'Stationär', kassenintegriert: 'Kassenintegriert', automat: 'Automat' };

/** Geräte-Karten mit 3D-Miniatur, Preis aus der Datenquelle. */
export function DeviceGrid({ geraete, cols = 3 }: { geraete: Geraet[]; cols?: 3 | 4 }) {
  return (
    <div className={`devgrid${cols === 4 ? ' cols-4' : ''}`}>
      {geraete.map((g, i) => (
        <Reveal key={g.slug} delay={(i % 3) as 0 | 1 | 2}>
          <TiltCard href={`/geraete/${g.slug}`}>
            <div className="viz">
              <DeviceMini kind={miniKind(g)} />
            </div>
            <div>
              <div className="lbl" style={{ paddingTop: 0, marginBottom: 8 }}>
                {KATEGORIE_LABEL[g.kategorie]}
              </div>
              <h3>{g.name}</h3>
            </div>
            <p>{g.kurz}</p>
            <div className="pr num">
              {g.mieteMonat != null ? (
                <>
                  {chf(g.mieteMonat, 2)} <small>/ Monat</small>
                  {g.kauf != null && <small> · Kauf {chf(g.kauf)}</small>}
                </>
              ) : (
                'Offerte pro Projekt'
              )}
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

/** Drei Bauformen für die Startseite. */
export function BauformGrid() {
  const items: { kind: MiniKind; title: string; text: string; href: string }[] = [
    { kind: 'mobile', title: 'Mobil', text: 'Service am Tisch, Lieferdienst, Markt. 4G und WLAN, Akku für den ganzen Tag.', href: '/geraete#mobil' },
    { kind: 'desk-keys', title: 'Stationär', text: 'Kassenplatz im Laden, in der Praxis, am Empfang. Mit Kassenanbindung und PIN-Pad.', href: '/geraete#stationaer' },
    { kind: 'auto', title: 'Automat', text: 'Verkaufs- und Waschautomaten, Parking, Ladestationen. Unbeaufsichtigt, rund um die Uhr.', href: '/geraete#automat' },
  ];
  return (
    <div className="devgrid">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i as 0 | 1 | 2}>
          <TiltCard href={it.href}>
            <div className="viz">
              <DeviceMini kind={it.kind} />
            </div>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

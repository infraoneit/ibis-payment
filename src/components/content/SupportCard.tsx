import Image from 'next/image';
import type { Site } from '@/lib/content';
import { CountUp } from '@/components/motion/CountUp';

/** Berater mit Foto und Direktwahl. */
export function BeraterCard({ site }: { site: Site }) {
  const b = site.berater;
  return (
    <div className="person">
      <div className="photo">
        {b.photo ? <Image src={b.photo} alt={`${b.name}, ${b.role}`} width={132} height={166} /> : <span>Foto Berater [Platzhalter]</span>}
      </div>
      <div className="who">
        <b>{b.name}</b>
        <span>
          {b.role}, {b.region}
        </span>
        <a className="t num" href={`tel:${b.phoneHref}`}>
          <span className="ring" aria-hidden="true">
            <i />
            <i />
          </span>
          {b.phone}
        </a>
      </div>
    </div>
  );
}

export function SupportStats() {
  return (
    <div className="stats">
      <div className="stat">
        <b>
          <CountUp to={24} />
          <small>h</small>
        </b>
        <span>Ersatzgerät bei Ihnen [Servicezusage bestätigen]</span>
      </div>
      <div className="stat">
        <b>
          <CountUp to={1} />
          <small>Seite</small>
        </b>
        <span>Monatsabrechnung, jede Kartenart einzeln</span>
      </div>
      <div className="stat">
        <b>
          <CountUp to={0} />
          <small>Tickets</small>
        </b>
        <span>Sie rufen direkt Ihren Berater an</span>
      </div>
    </div>
  );
}

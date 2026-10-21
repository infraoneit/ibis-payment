import Image from 'next/image';
import { DeviceMini, type MiniKind } from './DeviceMini';

/** Produktfoto über next/image, bis dahin Platzhalter mit korrektem Seitenverhältnis und 3D-Miniatur.
 *  Fotos nur mit Freigabe von SwiPay oder PayTec (Presse-Kit anfragen). */
export function ProductImage({ src, alt, name, kind, wide }: { src?: string | null; alt: string; name: string; kind: MiniKind; wide?: boolean }) {
  return (
    <div className={`placeholder-img${wide ? ' wide' : ''}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 1080px) 100vw, 480px" style={{ objectFit: 'contain', padding: '8%' }} priority={false} />
      ) : (
        <div className="ph" style={{ perspective: 900 }}>
          <div style={{ display: 'grid', placeItems: 'center', height: 260 }}>
            <DeviceMini kind={kind} />
          </div>
          <b>{name}</b>
          <span>Produktfoto folgt [Presse-Kit PayTec/SwiPay]</span>
        </div>
      )}
    </div>
  );
}

import { DeviceMini, TiltCard } from '@/components/devices/DeviceMini';
import { Icon } from '@/components/ui/Icons';
import { DocMock, DOC_SPECS } from './DocMock';

/** Browser- und Handy-Mockup für Webdesign-Seiten (CSS, kein Bild nötig). */
export function BrowserMock() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, paddingBottom: 20 }} aria-hidden="true">
      <div className="browser">
        <div className="bar">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="page">
          <div className="ph-h" />
          <div className="ph-t" />
          <div className="ph-t s" />
          <div className="ph-img">
            <Icon.globe />
          </div>
          <div className="ph-btn" />
          <div className="cols">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="phone-mock">
        <div className="ps">
          <i />
          <i />
          <i />
          <b />
        </div>
      </div>
    </div>
  );
}


/** Visual nach Cluster: Terminal (Payment, Regional, Branchen), Browser (Webdesign), Icon (Wissen, Dienstleistungen). */
export function ClusterVisual({ cluster, pfad }: { cluster: string; pfad: string }) {
  if (cluster === 'webdesign') return <BrowserMock />;
  if (cluster === 'dienstleistung' || cluster === 'wissen') {
    const spec = DOC_SPECS[pfad];
    if (spec) return <DocMock spec={spec} />;
  }
  const kind = pfad.includes('marktstand') || pfad.includes('coiffeur') || pfad.includes('ostschweiz') ? 'mobile' : pfad.includes('praxis') || pfad.includes('detailhandel') || pfad.includes('kaufen') ? 'desk-keys' : 'mobile-printer';
  return (
    <TiltCard className="devcard" >
      <div className="viz" style={{ height: 300 }}>
        <DeviceMini kind={kind} />
      </div>
    </TiltCard>
  );
}


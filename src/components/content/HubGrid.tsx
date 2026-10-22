import Link from 'next/link';
import { Icon } from '@/components/ui/Icons';
import { Arrow } from '@/components/layout/Section';
import { iconForPage } from '@/lib/icons-for';
import { Reveal } from '@/components/motion/Reveal';
import type { Landingpage } from '@/lib/content';

/** Kartenraster für Hub-Seiten (Branchen, Wissen): Icon, Titel, Lead, Link. */
export function HubGrid({ pages }: { pages: Landingpage[] }) {
  return (
    <div className="hub">
      {pages.map((p, i) => {
        const I = Icon[iconForPage(p.pfad, `${p.navTitle} ${p.title}`)];
        return (
          <Reveal key={p.pfad} delay={(i % 3) as 0 | 1 | 2}>
            <Link href={p.pfad}>
              <span className="icon-ring" aria-hidden="true">
                <I />
              </span>
              <h3>{p.navTitle || p.title}</h3>
              <p>{p.lead}</p>
              <span className="more">
                Weiterlesen <Arrow />
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

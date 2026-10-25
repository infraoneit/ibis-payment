'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { NAV, type NavGroup } from '@/lib/nav';
import { LogoWordmark } from '@/components/brand/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Icon, type IconName } from '@/components/ui/Icons';

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const Ext = () => (
  <svg className="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

function MenuIcon({ name }: { name?: IconName }) {
  if (!name) return <span className="mi" />;
  const I = Icon[name];
  return (
    <span className="mi">
      <I />
    </span>
  );
}

function GroupLinks({ group, onNavigate }: { group: NavGroup; onNavigate?: () => void }) {
  return (
    <div className="mega-group">
      <div className="mega-title">{group.title}</div>
      {group.links.map((l) =>
        l.external ? (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
            <MenuIcon name={l.icon} />
            <span>
              {l.label}
              <Ext />
            </span>
            {l.description && <small>{l.description}</small>}
          </a>
        ) : (
          <Link key={l.href} href={l.href} onClick={onNavigate}>
            <MenuIcon name={l.icon} />
            <span>{l.label}</span>
            {l.description && <small>{l.description}</small>}
          </Link>
        )
      )}
    </div>
  );
}

/** Dropdown: öffnet bei Hover oder Klick, schliesst mit kurzer Verzögerung, damit die Maus ins Panel wechseln kann. */
function Dropdown({ label, groups, open, onOpen, onClose }: { label: string; groups: NavGroup[]; open: boolean; onOpen: () => void; onClose: () => void }) {
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
  const timer = useRef<number | null>(null);
  const cancel = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };
  const closeSoon = () => {
    cancel();
    timer.current = window.setTimeout(onClose, 180);
  };
  const openNow = () => {
    cancel();
    onOpen();
  };
  useEffect(() => cancel, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && onClose();
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open, onClose]);
  return (
    <li ref={ref} onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button type="button" className="menu-btn" aria-expanded={open} aria-controls={id} onClick={() => (open ? onClose() : openNow())}>
        {label}
        <Chevron />
      </button>
      {open && (
        <div className="mega-wrap" onMouseEnter={cancel}>
          <div id={id} className={`mega cols-${groups.length}`} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && closeSoon()}>
            {groups.map((g) => (
              <GroupLinks key={g.title} group={g} onNavigate={onClose} />
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export function Header({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const mobileId = useId();

  useEffect(() => {
    setOpenIdx(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    if (!mobile) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobile(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobile]);

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));
  const closeIdx = useCallback((i: number) => setOpenIdx((c) => (c === i ? null : c)), []);

  return (
    <header className="header">
      <div className="wrap">
        <nav className="nav" aria-label="Hauptnavigation">
          <Link className="logo" href="/" aria-label="ibis payment, zur Startseite">
            <LogoWordmark />
          </Link>
          <ul className="menu">
            {NAV.map((item, i) =>
              'groups' in item ? (
                <Dropdown key={item.label} label={item.label} groups={item.groups} open={openIdx === i} onOpen={() => setOpenIdx(i)} onClose={() => closeIdx(i)} />
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="nav-right">
            <ThemeToggle />
            <a className="tel num" href={`tel:${phoneHref}`}>
              {phone}
            </a>
            <Link className="btn btn-ink btn-sm" href="/kontakt">
              Offerte anfordern
            </Link>
            <button type="button" className="burger" aria-expanded={mobile} aria-controls={mobileId} aria-label={mobile ? 'Menü schliessen' : 'Menü öffnen'} onClick={() => setMobile((m) => !m)}>
              {mobile ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l14 14M19 5 5 19" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      <div id={mobileId} className={`mobile-nav${mobile ? ' open' : ''}`} aria-label="Mobile Navigation">
        {NAV.map((item) =>
          'groups' in item ? (
            <details key={item.label}>
              <summary>
                {item.label}
                <Chevron />
              </summary>
              {item.groups.map((g) => (
                <div className="mgroup" key={g.title}>
                  <div className="mtitle">{g.title}</div>
                  {g.links.map((l) =>
                    l.external ? (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href}>
                        {l.label}
                      </Link>
                    )
                  )}
                </div>
              ))}
            </details>
          ) : (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          )
        )}
        <div className="mcta">
          <a className="btn btn-outline" href={`tel:${phoneHref}`}>
            Anrufen: {phone}
          </a>
          <Link className="btn btn-ink" href="/kontakt">
            Offerte anfordern
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle />
            <span className="muted" style={{ fontSize: '.9rem' }}>
              Hell oder dunkel.
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

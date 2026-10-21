'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { NAV, type NavGroup } from '@/lib/nav';
import { LogoWordmark } from '@/components/brand/Logo';

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

function GroupLinks({ group, onNavigate }: { group: NavGroup; onNavigate?: () => void }) {
  return (
    <div className="mega-group">
      <div className="mega-title">{group.title}</div>
      {group.links.map((l) =>
        l.external ? (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
            <span>
              {l.label}
              <Ext />
            </span>
            {l.description && <small>{l.description}</small>}
          </a>
        ) : (
          <Link key={l.href} href={l.href} onClick={onNavigate}>
            <span>{l.label}</span>
            {l.description && <small>{l.description}</small>}
          </Link>
        )
      )}
    </div>
  );
}

function Dropdown({ label, groups, open, onOpen, onClose }: { label: string; groups: NavGroup[]; open: boolean; onOpen: () => void; onClose: () => void }) {
  const id = useId();
  const ref = useRef<HTMLLIElement>(null);
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
    <li ref={ref} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button type="button" className="menu-btn" aria-expanded={open} aria-controls={id} onClick={() => (open ? onClose() : onOpen())}>
        {label}
        <Chevron />
      </button>
      {open && (
        <div id={id} className={`mega cols-${groups.length}`} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && onClose()}>
          {groups.map((g) => (
            <GroupLinks key={g.title} group={g} onNavigate={onClose} />
          ))}
        </div>
      )}
    </li>
  );
}

function LangSwitch() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return (
    <div className="lang" ref={ref}>
      <button type="button" className="lang-btn" aria-expanded={open} aria-label="Sprache wählen, aktuell Deutsch" onClick={() => setOpen((o) => !o)}>
        DE
        <Chevron />
      </button>
      {open && (
        <div className="lang-menu" role="list">
          <Link href="/" lang="de" aria-current="true" role="listitem">
            Deutsch <small>aktiv</small>
          </Link>
          <span lang="fr" role="listitem">
            Français <small>folgt</small>
          </span>
          <span lang="it" role="listitem">
            Italiano <small>folgt</small>
          </span>
        </div>
      )}
    </div>
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
                <Dropdown key={item.label} label={item.label} groups={item.groups} open={openIdx === i} onOpen={() => setOpenIdx(i)} onClose={() => setOpenIdx((c) => (c === i ? null : c))} />
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
            <LangSwitch />
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
          <p className="muted" style={{ fontSize: '.9rem' }}>
            Sprache: Deutsch. Französisch und Italienisch folgen.
          </p>
        </div>
      </div>
    </header>
  );
}


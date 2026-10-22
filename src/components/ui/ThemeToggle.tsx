'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';

type Theme = 'light' | 'dark';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Hell/Dunkel-Umschalter. Ohne Auswahl gilt die Systemeinstellung; die Wahl wird im Browser gespeichert (kein Cookie). */
export function ThemeToggle({ className = 'icon-btn' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme') as Theme | null;
    setTheme(attr ?? systemTheme());
  }, []);
  const toggle = () => {
    const next: Theme = (theme ?? systemTheme()) === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
  };
  const isDark = theme === 'dark';
  return (
    <button type="button" className={className} onClick={toggle} aria-label={isDark ? 'Helles Design einschalten' : 'Dunkles Design einschalten'} title={isDark ? 'Hell' : 'Dunkel'}>
      {isDark ? <Icon.sun /> : <Icon.moon />}
    </button>
  );
}

/** Setzt data-theme vor dem ersten Rendern, damit es nicht flackert. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

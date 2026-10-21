'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitForm, isEmail } from '@/lib/forms';

const THEMEN = ['Zahlterminal', 'Kassensystem', 'Online-Zahlungen', 'Handy als Terminal', 'Website und IT', 'Telefonie', 'Versicherungen', 'Treuhand', 'Mehreres davon'];

export function ContactForm({ phone, phoneHref, defaultThema }: { phone: string; phoneHref: string; defaultThema?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [msg, setMsg] = useState('');
  const [rechner, setRechner] = useState('');
  const [thema, setThema] = useState(defaultThema ?? (params.get('thema') && THEMEN.includes(params.get('thema')!) ? params.get('thema')! : THEMEN[0]));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');

  // Werte aus dem Rechner übernehmen
  useEffect(() => {
    try {
      const pre = sessionStorage.getItem('ibis_calc');
      if (pre) {
        setRechner(pre);
        setMsg((m) => (m ? m : `Angaben aus dem Rechner: ${pre}\n\n`));
        sessionStorage.removeItem('ibis_calc');
      }
    } catch {}
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(fd.get('name') ?? '').trim()) errs.name = 'Bitte Namen angeben.';
    if (!isEmail(String(fd.get('email') ?? ''))) errs.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('sending');
    try {
      await submitForm('kontakt', form);
      router.push('/danke?f=kontakt');
    } catch {
      setState('error');
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate name="kontakt" data-netlify="true">
      <input type="hidden" name="form-name" value="kontakt" />
      <input type="hidden" name="rechner" value={rechner} />
      <input type="hidden" name="seite" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
      <p className="hp" aria-hidden="true">
        <label>
          Bitte leer lassen <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="r2">
        <label>
          Name *
          <input name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && (
            <span className="err" id="err-name">
              {errors.name}
            </span>
          )}
        </label>
        <label>
          Betrieb
          <input name="betrieb" type="text" autoComplete="organization" />
        </label>
      </div>
      <div className="r2">
        <label>
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" />
        </label>
        <label>
          E-Mail *
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && (
            <span className="err" id="err-email">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <label>
        Es geht um
        <select name="thema" value={thema} onChange={(e) => setThema(e.target.value)}>
          {THEMEN.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Nachricht
        <textarea name="nachricht" rows={6} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Branche, Anzahl Kassenplätze, heutiger Anbieter" />
      </label>
      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
        </button>
        <span className="meta">Keine Weitergabe Ihrer Daten, kein Newsletter. Dringend? Rufen Sie an: <a href={`tel:${phoneHref}`}>{phone}</a></span>
      </div>
      {state === 'error' && (
        <p className="err" role="alert">
          Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie an info@ibis-payment.ch.
        </p>
      )}
    </form>
  );
}

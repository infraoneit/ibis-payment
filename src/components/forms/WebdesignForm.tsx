'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitForm, isEmail } from '@/lib/forms';

const BRANCHEN = ['Restaurant, Café, Bar', 'Coiffeur, Kosmetik', 'Praxis, Gesundheit', 'Detailhandel, Laden', 'Handwerk, Bau', 'Dienstleistung, Büro', 'Andere'];

/** Webdesign-Anfrage: geht an InfraOne IT Solutions (Benachrichtigung im Netlify-Dashboard auf InfraOne-Adresse). */
export function WebdesignForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
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
      await submitForm('webdesign', form);
      router.push('/danke?f=webdesign');
    } catch {
      setState('error');
    }
  };
  return (
    <form className="form" onSubmit={onSubmit} noValidate name="webdesign" data-netlify="true">
      <input type="hidden" name="form-name" value="webdesign" />
      <input type="hidden" name="seite" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
      <p className="hp" aria-hidden="true">
        <label>
          Bitte leer lassen <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="r2">
        <label>
          Name *
          <input name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} />
          {errors.name && <span className="err">{errors.name}</span>}
        </label>
        <label>
          Betrieb
          <input name="betrieb" type="text" autoComplete="organization" />
        </label>
      </div>
      <div className="r2">
        <label>
          E-Mail *
          <input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} />
          {errors.email && <span className="err">{errors.email}</span>}
        </label>
        <label>
          Telefon
          <input name="telefon" type="tel" autoComplete="tel" />
        </label>
      </div>
      <div className="r2">
        <label>
          Bestehende Website (falls vorhanden)
          <input name="website" type="text" inputMode="url" placeholder="www.ihrbetrieb.ch" />
        </label>
        <label>
          Branche
          <select name="branche" defaultValue={BRANCHEN[0]}>
            {BRANCHEN.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Was soll die Website können?
        <textarea name="nachricht" rows={5} placeholder="Reservation, Terminbuchung, Speisekarte, Shop, mehrsprachig …" />
      </label>
      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Wird gesendet …' : 'Webdesign-Anfrage senden'}
        </button>
        <span className="meta">
          Diese Anfrage geht direkt an unseren Partner InfraOne IT Solutions GmbH, Winterthur. Siehe{' '}
          <Link href="/datenschutz">Datenschutz</Link>.
        </span>
      </div>
      {state === 'error' && (
        <p className="err" role="alert">
          Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie direkt an InfraOne über infraone.ch.
        </p>
      )}
    </form>
  );
}

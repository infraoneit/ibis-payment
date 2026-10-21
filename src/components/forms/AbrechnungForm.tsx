'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitForm, isEmail, MAX_UPLOAD_BYTES, UPLOAD_TYPES } from '@/lib/forms';

/** Abrechnungs-Upload: Letzte Monatsabrechnung als PDF oder Foto, Vergleich innert 24 Stunden. */
export function AbrechnungForm() {
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
    const file = fd.get('abrechnung');
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_UPLOAD_BYTES) errs.abrechnung = 'Die Datei ist grösser als 10 MB.';
      else if (file.type && !UPLOAD_TYPES.includes(file.type)) errs.abrechnung = 'Bitte PDF, JPG, PNG oder HEIC hochladen.';
    } else {
      errs.abrechnung = 'Bitte Ihre letzte Abrechnung anhängen (PDF oder Foto).';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('sending');
    try {
      await submitForm('abrechnung', form);
      router.push('/danke?f=abrechnung');
    } catch {
      setState('error');
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate name="abrechnung" data-netlify="true" encType="multipart/form-data">
      <input type="hidden" name="form-name" value="abrechnung" />
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
      <label>
        Letzte Monatsabrechnung (PDF oder Foto, max. 10 MB) *
        <input name="abrechnung" type="file" accept=".pdf,image/*" required aria-invalid={!!errors.abrechnung} />
        {errors.abrechnung && <span className="err">{errors.abrechnung}</span>}
      </label>
      <label>
        Nachricht
        <textarea name="nachricht" rows={3} placeholder="Heutiger Anbieter, Branche, Anzahl Terminals" />
      </label>
      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Wird gesendet …' : 'Nachrechnen lassen'}
        </button>
        <span className="meta">Ihre Abrechnung wird nur für den Vergleich verwendet und danach gelöscht.</span>
      </div>
      {state === 'error' && (
        <p className="err" role="alert">
          Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder schicken Sie die Abrechnung an info@ibis-payment.ch.
        </p>
      )}
    </form>
  );
}

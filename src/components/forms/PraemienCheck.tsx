'use client';

import { useState } from 'react';
import { submitForm, isEmail } from '@/lib/forms';

const BRANCHEN = ['Restaurant, Café, Bar', 'Detailhandel, Laden', 'Coiffeur, Kosmetik', 'Praxis, Gesundheit', 'Handwerk, Bau', 'Dienstleistung, Büro', 'Andere'];
const MA = ['Nur ich', '2 bis 5', '6 bis 15', '16 bis 50', 'mehr als 50'];

/** Prämien-Check: drei Angaben, Rückmeldung des Versicherungspartners innert zwei Werktagen. */
export function PraemienCheck() {
  const [branche, setBranche] = useState(BRANCHEN[0]);
  const [ma, setMa] = useState(MA[0]);
  const [result, setResult] = useState('');
  const [err, setErr] = useState('');
  const [state, setState] = useState<'idle' | 'sending'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get('email') ?? '');
    const tel = String(fd.get('telefon') ?? '');
    if (!isEmail(email) && !tel.trim()) {
      setErr('Bitte E-Mail oder Telefonnummer angeben.');
      return;
    }
    setErr('');
    setState('sending');
    const items = ['Betriebshaftpflicht', 'Sachversicherung'];
    if (ma !== 'Nur ich') items.push('Unfall- und Krankentaggeld (UVG, KTG)');
    if (/Restaurant|Detailhandel|Coiffeur/.test(branche)) items.push('Betriebsunterbruch');
    items.push('Cyber');
    try {
      await submitForm('praemiencheck', form);
      setResult(`Danke. Unser Versicherungspartner meldet sich innert zwei Werktagen und prüft: ${items.join(', ')}.`);
    } catch {
      setErr('Das Senden hat nicht geklappt. Bitte versuchen Sie es erneut.');
    }
    setState('idle');
  };

  return (
    <div className="panel" id="praemiencheck">
      <h3>Prämien-Check</h3>
      <p>Die meisten Betriebe haben ihre Policen seit Jahren nicht angeschaut. Drei Angaben, und unser Partner prüft Ihre Prämien innert zwei Werktagen.</p>
      {result ? (
        <p className="sent" role="status">
          {result}
        </p>
      ) : (
        <form className="form" onSubmit={onSubmit} noValidate name="praemiencheck" data-netlify="true">
          <input type="hidden" name="form-name" value="praemiencheck" />
          <input type="hidden" name="seite" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
          <p className="hp" aria-hidden="true">
            <label>
              Bitte leer lassen <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <div className="r3">
            <label>
              Branche
              <select name="branche" value={branche} onChange={(e) => setBranche(e.target.value)}>
                {BRANCHEN.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Mitarbeitende
              <select name="mitarbeitende" value={ma} onChange={(e) => setMa(e.target.value)}>
                {MA.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label>
              E-Mail
              <input name="email" type="email" autoComplete="email" placeholder="info@ihrbetrieb.ch" />
            </label>
            <button className="btn btn-ink" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sendet …' : 'Prüfen lassen'}
            </button>
          </div>
          <label style={{ maxWidth: 320 }}>
            Oder Telefon
            <input name="telefon" type="tel" autoComplete="tel" />
          </label>
          {err && (
            <p className="err" role="alert">
              {err}
            </p>
          )}
          <span className="meta">Ihre Angaben gehen an unseren Versicherungspartner [Name] und werden nur für den Prämien-Check verwendet.</span>
        </form>
      )}
    </div>
  );
}

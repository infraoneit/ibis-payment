/** Netlify Forms: Die Formulardefinitionen liegen in public/__forms.html (dort erkennt Netlify sie beim Deploy).
 *  Die React-Formulare senden ihre Daten per fetch an diese statische Datei. Datei-Uploads als multipart. */
export const FORM_ENDPOINT = '/__forms.html';
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // Netlify-Limit für Formular-Uploads
export const UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic', 'image/webp'];

export async function submitForm(formName: string, form: HTMLFormElement) {
  const data = new FormData(form);
  data.set('form-name', formName);
  const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data });
  if (!res.ok) throw new Error(`Formular konnte nicht gesendet werden (${res.status}).`);
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim());

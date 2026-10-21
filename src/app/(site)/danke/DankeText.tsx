'use client';

import { useSearchParams } from 'next/navigation';

export function DankeText() {
  const f = useSearchParams().get('f') ?? 'kontakt';
  const text =
    f === 'abrechnung'
      ? 'Ihre Abrechnung ist angekommen. Den Vergleich mit denselben Umsätzen erhalten Sie innert 24 Stunden an Werktagen.'
      : f === 'webdesign'
        ? 'Ihre Webdesign-Anfrage ist bei unserem Partner InfraOne IT Solutions in Winterthur angekommen. InfraOne meldet sich am nächsten Werktag.'
        : 'Ihre Anfrage ist angekommen. Wir melden uns am nächsten Werktag.';
  return <p className="lead">{text}</p>;
}

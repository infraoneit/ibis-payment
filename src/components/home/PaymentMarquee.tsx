/** Akzeptierte Zahlungsmittel. Als Wortmarken gesetzt, bis die offiziellen Logos aus den Brand-Portalen
 *  der Kartenorganisationen vorliegen (siehe Platzhalterliste). Bei reduzierter Bewegung statisch. */
export const PAYMENT_METHODS = [
  'TWINT',
  'Visa',
  'Mastercard',
  'Maestro',
  'V Pay',
  'PostFinance Card',
  'Apple Pay',
  'Google Pay',
  'Samsung Pay',
  'American Express',
  'Diners Club',
  'JCB',
  'UnionPay',
  'Discover',
  'Reka',
  'Lunch-Check',
  'boncard',
  'Bonus Card',
  'Swisscard',
];

export function PaymentMarquee() {
  const items = [...PAYMENT_METHODS, ...PAYMENT_METHODS];
  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {items.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
      <ul className="marquee-static wrap" aria-label="Akzeptierte Zahlungsmittel">
        {PAYMENT_METHODS.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p className="sr-only">Akzeptierte Zahlungsmittel: {PAYMENT_METHODS.join(', ')}.</p>
    </>
  );
}

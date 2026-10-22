import type { IconName } from '@/components/ui/Icons';

/** Icon-Zuordnung nach Stichworten. Jede Regel liefert mehrere Kandidaten in Rangfolge;
 *  `uniqueIcons` sorgt dafür, dass auf einer Seite kein Icon doppelt erscheint. */
const RULES: [RegExp, IconName[]][] = [
  // Spezifische Begriffe zuerst, generische Nomen zuletzt. Wortgrenzen, damit «Terminal» nicht «Termin» trifft.
  [/geschäftsnummer|tischtelefon|rufnummer|telefonanlage|voip|\bnummer\b|anruf\b|anrufe\b/i, ['phone', 'headset', 'cloud']],
  [/ansage|anrufbeantworter|öffnungszeiten-ansage|benachricht/i, ['bell', 'megaphone', 'mail']],
  [/warteschlange|vertretung|weiterleit|rufverteil/i, ['users', 'headset', 'route']],
  [/umzug|portier|mitnehmen|wechsel|umstieg|migration|übernahme|alternative/i, ['swap', 'repeat', 'milestone']],
  [/monatlich kündbar|kündbar|keine anlage|laufzeit|kündig|saison/i, ['repeat', 'calendar', 'hourglass']],
  [/was kostet|kostet|preis|kosten|budget|investition|amortis|lohnt|vollkosten|günstiger/i, ['calculator', 'coins', 'piggy', 'banknote']],
  [/so läuft|ablauf|schritt|so geht|\bstart\b|einstieg|installation|einrichtung|projekt|gespräch/i, ['route', 'milestone', 'listChecks', 'tools']],
  [/ansprechpartner|ein partner|aus einer hand|koordin/i, ['handshake', 'headset', 'user']],
  [/pflege|wartung|update|unterhalt|nach dem start/i, ['settings', 'lifebuoy', 'repeat', 'tools']],
  [/berater|support|hotline|störung|erreichbar|hilfe|rückruf|notfall|ausfall/i, ['headset', 'lifebuoy', 'phone', 'chat']],
  [/typische betriebe|betriebe in|branchen/i, ['building', 'users', 'register']],
  [/rolle|issuer|acquirer|kartennetzwerk|\bpsp\b|broker|orchestrator|beteiligt|zuständig|kette|anteile|vermittler/i, ['layers', 'route', 'network', 'bank']],
  [/fehler|falle|irrtum|warnung|vorsicht|typische|risiko|vermeiden/i, ['warning', 'eye', 'search']],
  [/prüf|checkliste|\bcheck\b|kontrolle|vergleich|vergleichen|worauf|drei wege/i, ['listChecks', 'clipboard', 'scale', 'chart']],
  [/entscheid|wahl|\bpasst\b|für wen|geeignet|fazit|empfehl|welche[sr]? (terminal|modell|bauform)/i, ['checkCircle', 'target', 'flag']],
  [/\bfrage|antwort|faq|\berklär|verstehen|wissen|grundlagen|begriff|glossar|bedeutet|was ein|was eine|was der|was die|ist ein/i, ['help', 'book', 'bulb']],
  [/garantie|ersatz\b|ersatzgerät/i, ['award', 'badge', 'lifebuoy']],
  // Geld
  [/interchange|netzwerkgebühr|\bmarge|gebühr|prozent|\bsatz\b|sätze|effektiv|weko/i, ['percent', 'receiptText', 'chart']],
  [/trinkgeld|kleinbetr|fixbetrag|rappen|münzen|geteilte rechnung/i, ['coins', 'handCoins', 'banknote', 'wallet']],
  [/\bkauf\b|kaufen|eigentum/i, ['wallet', 'banknote', 'award']],
  [/\bmiete\b|mieten/i, ['calendar', 'repeat', 'hourglass']],
  [/lohn|sozialversicherung|ahv/i, ['banknote', 'users', 'book']],
  [/mwst|steuer|jahresabschluss|buchhaltung|treuhand/i, ['percent', 'book', 'bank', 'folder']],
  [/abrechnung|rechnung|beleg|quittung|gutschrift|auszahl|kassenabschluss/i, ['receipt', 'receiptText', 'fileCheck', 'file']],
  [/vertrag|agb|offerte|unterschr|bedingung|liefern muss/i, ['scroll', 'fileCheck', 'clipboard', 'handshake']],
  // Branchen und Orte
  [/versicher|police|prämie|schaden|deckung/i, ['umbrella', 'shield', 'fileCheck']],
  [/coiffeur|salon|kosmetik|stuhl/i, ['scissors', 'calendar', 'user']],
  [/praxis|arzt|physio|zahnarzt|gesundheit|therapie|patient|krankenkasse|behandlung/i, ['stethoscope', 'shield', 'calendar']],
  [/restaurant|café|cafe|gastro|\bbar\b|am tisch|tischservice|küche|gäste|terrasse|speisekarte/i, ['cup', 'utensils', 'users']],
  [/laden|detailhandel|verkauf|retoure|boutique|kiosk|regal|self-checkout/i, ['cart', 'register', 'box']],
  [/markt|event|festival|\bstand\b/i, ['tent', 'mapPin', 'bolt']],
  [/automat|einbau|parking|waschanlage|ladestation/i, ['box', 'parking', 'plug']],
  [/liefer(dienst|ung)|kurier|transport|fahrzeug/i, ['truck', 'car', 'route']],
  [/standort|region|winterthur|zürich|ostschweiz|vor ort|anfahrt|einzug|adresse/i, ['mapPin', 'route', 'building']],
  [/partner|infraone|swipay|zusammenarbeit|vermittl|bezahlt wird/i, ['handshake', 'building', 'puzzle']],
  [/\bteam\b|mitarbeit|personal|schulung|lernen|leistungen/i, ['users', 'user', 'book']],
  [/kunde|besucher|zielgruppe|\bwer\b|kundenseite|zuschauer/i, ['users', 'eye', 'handshake']],
  // Technik
  [/datenschutz|dsg|pci|sicher|schutz|haftung|barrierefrei|gesundheitsdaten/i, ['shield', 'lock', 'fingerprint']],
  [/google|suche|seo|gefunden|ranking|sichtbar|lokale/i, ['search', 'eye', 'target']],
  [/\btermine?\b|terminbuchung|terminsoftware|terminanfrage|reservation|buchung|öffnungszeit|kalender/i, ['calendar', 'clock', 'timer']],
  [/stosszeit|samstag|montag|mittag|dezember|\bzeit\b|stunde|\btag\b|tage\b|woche|frist|schnell|dauer|\bwann\b|sofort|2027/i, ['clock', 'timer', 'hourglass']],
  [/\bkasse\b|kassen|tagesabschluss|artikel|lager|sortiment|betrag aus der kasse|eintippen/i, ['register', 'cart', 'box']],
  [/wlan|\bnetz\b|netzwerk|verbindung|\b4g\b|\blan\b|funk|router|glasfaser|internet|anschluss|mbit|gbit|empfang schlecht|kein empfang/i, ['wifi', 'signal', 'network', 'cable']],
  [/akku|strom|lade\b|energie|batterie|schicht/i, ['bolt', 'plug', 'zap']],
  [/kontaktlos|nfc|twint|\bqr\b|vorhalten|apple pay|google pay/i, ['contactless', 'qr', 'card']],
  [/handy|smartphone|softpos|\bapp\b|mobil|unterwegs/i, ['mobile', 'tablet', 'contactless']],
  [/\bkarte\b|karten|kredit|debit|maestro|visa|mastercard|auslandkarten|amex|american express/i, ['card', 'wallet', 'banknote']],
  [/online|webshop|\bshop\b|zahllink|e-commerce|gutschein/i, ['globe', 'cart', 'monitor']],
  [/foto|bild|instagram|design|gestalt/i, ['image', 'pen', 'layers']],
  [/\btext\b|inhalt|aufbau|struktur|preisliste|mehrsprachig|sprache/i, ['pen', 'file', 'languages', 'layers']],
  [/\bterminal|gerät|modell|bauform|n62|n86|n96|ct20p|v3ct3|un20|paytec|hardware|drucker/i, ['terminal', 'tablet', 'printer']],
  [/website|\bweb\b|homepage|\bseite\b|domain|hosting|baukasten|agentur/i, ['monitor', 'globe', 'image']],
  [/\bcloud\b|anlage/i, ['cloud', 'server', 'phone']],
  [/empfang\b/i, ['card', 'building', 'user']],
  [/idee|tipp|vorteil|nutzen|lösung|zählt|warum/i, ['bulb', 'checkCircle', 'award']],
];

const FALLBACK: IconName[] = ['bulb', 'flag', 'milestone', 'target', 'puzzle', 'layers', 'file', 'badge', 'eye', 'settings'];

/** Kandidatenliste für einen Titel, in Rangfolge, ohne Doppelte. */
export function iconCandidates(title: string): IconName[] {
  const out: IconName[] = [];
  for (const [re, names] of RULES) if (re.test(title)) for (const n of names) if (!out.includes(n)) out.push(n);
  return out;
}

export function iconFor(title: string, fallback: IconName = 'checkCircle'): IconName {
  return iconCandidates(title)[0] ?? fallback;
}

/** Ein Icon pro Titel, auf der ganzen Seite eindeutig. `reserved` sind bereits vergebene Icons (z. B. Fakten-Leiste). */
export function uniqueIcons(titles: string[], reserved: IconName[] = []): IconName[] {
  const used = new Set<IconName>(reserved);
  return titles.map((t) => {
    const pick = [...iconCandidates(t), ...FALLBACK].find((n) => !used.has(n)) ?? 'checkCircle';
    used.add(pick);
    return pick;
  });
}

/** Icon für eine ganze Seite: zuerst nach Pfad (Branche, Region, Thema), sonst nach Titel. */
const PATH_RULES: [RegExp, IconName][] = [
  [/coiffeur/, 'scissors'],
  [/restaurant/, 'cup'],
  [/detailhandel/, 'cart'],
  [/praxis/, 'stethoscope'],
  [/marktstand/, 'tent'],
  [/winterthur|zuerich|ostschweiz/, 'mapPin'],
  [/gebuehren/, 'percent'],
  [/rollen/, 'layers'],
  [/psp/, 'swap'],
  [/fehler/, 'warning'],
  [/mieten-oder-kaufen/, 'scale'],
  [/zahlterminal-kaufen/, 'wallet'],
  [/zahlterminal-mieten/, 'calendar'],
  [/vergleich/, 'chart'],
  [/worldline/, 'swap'],
  [/sumup/, 'repeat'],
  [/twint/, 'contactless'],
  [/webdesign\/homepage-restaurant/, 'utensils'],
  [/webdesign\/homepage-coiffeur/, 'scissors'],
  [/webdesign\/homepage-praxis/, 'stethoscope'],
  [/website-erstellen/, 'pen'],
  [/webdesign/, 'monitor'],
  [/telefonie/, 'phone'],
  [/versicherung/, 'umbrella'],
  [/treuhand/, 'book'],
  [/^\/zahlterminal$/, 'terminal'],
];
export function iconForPage(pfad: string, title: string): IconName {
  for (const [re, name] of PATH_RULES) if (re.test(pfad)) return name;
  return iconFor(title, 'terminal');
}

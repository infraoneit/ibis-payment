import type { SVGProps } from 'react';
import {
  Receipt, ReceiptText, Percent, CreditCard, Nfc, Phone, Wrench, Wifi, BatteryCharging, Store, Globe, Smartphone, PenLine, Users, User, MapPin, Coins, Package, Truck, Tent,
  Stethoscope, Scissors, Coffee, ShoppingCart, Search, Layers, CircleCheck, BookOpen, Umbrella, Folder, CalendarDays, Clock, ShieldCheck, ChartColumn, ArrowLeftRight, Building2,
  Monitor, Zap, Calculator, MessageSquare, Landmark, Scale, ClipboardCheck, FileText, Banknote, Printer, Headset, HandCoins, Award, Timer, Route, ListChecks, Lightbulb, TriangleAlert,
  Lock, Mail, Image, Repeat, Gauge, Network, Cable, Signal, Tablet, QrCode, Wallet, PiggyBank, Settings, LifeBuoy, Handshake, Hourglass, Eye, Flag, Milestone, Target, Puzzle, Sun, Moon,
  Check, Server, Cloud, Bell, Megaphone, Briefcase, Utensils, Car, ParkingCircle, Plug, KeyRound, BadgeCheck, FileCheck, ScrollText, CircleHelp, Languages, Fingerprint,
} from 'lucide-react';

/* Icon-Bibliothek: Lucide (ISC-Lizenz), 24er-Raster, 1.75 px Strich, currentColor. Die semantischen Namen bleiben
   stabil, damit Inhalte und Regeln (icons-for.ts) nicht an Bibliotheksnamen hängen. */
type P = SVGProps<SVGSVGElement>;
const w = (C: React.ComponentType<{ strokeWidth?: number; absoluteStrokeWidth?: boolean; 'aria-hidden'?: boolean; className?: string; style?: React.CSSProperties }>) =>
  function LucideIcon(p: P) {
    return <C strokeWidth={1.75} aria-hidden className={p.className} style={p.style} />;
  };

/** Eigenes Terminal-Icon (Lucide hat keines), gleicher Strich. */
const Terminal = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={p.className} style={p.style}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <rect x="9.5" y="5.5" width="5" height="6" rx="1" />
    <path d="M10 15h4M10 18h4" />
  </svg>
);

export const Icon = {
  terminal: Terminal,
  card: w(CreditCard),
  contactless: w(Nfc),
  receipt: w(Receipt),
  receiptText: w(ReceiptText),
  percent: w(Percent),
  phone: w(Phone),
  user: w(User),
  users: w(Users),
  tools: w(Wrench),
  wifi: w(Wifi),
  bolt: w(BatteryCharging),
  register: w(Store),
  globe: w(Globe),
  mobile: w(Smartphone),
  pen: w(PenLine),
  mapPin: w(MapPin),
  coins: w(Coins),
  box: w(Package),
  truck: w(Truck),
  tent: w(Tent),
  stethoscope: w(Stethoscope),
  scissors: w(Scissors),
  cup: w(Coffee),
  cart: w(ShoppingCart),
  search: w(Search),
  layers: w(Layers),
  check: w(Check),
  checkCircle: w(CircleCheck),
  book: w(BookOpen),
  umbrella: w(Umbrella),
  folder: w(Folder),
  calendar: w(CalendarDays),
  clock: w(Clock),
  shield: w(ShieldCheck),
  chart: w(ChartColumn),
  swap: w(ArrowLeftRight),
  building: w(Building2),
  monitor: w(Monitor),
  zap: w(Zap),
  calculator: w(Calculator),
  chat: w(MessageSquare),
  bank: w(Landmark),
  scale: w(Scale),
  clipboard: w(ClipboardCheck),
  file: w(FileText),
  banknote: w(Banknote),
  printer: w(Printer),
  headset: w(Headset),
  handCoins: w(HandCoins),
  award: w(Award),
  timer: w(Timer),
  route: w(Route),
  listChecks: w(ListChecks),
  bulb: w(Lightbulb),
  warning: w(TriangleAlert),
  lock: w(Lock),
  mail: w(Mail),
  image: w(Image),
  repeat: w(Repeat),
  gauge: w(Gauge),
  network: w(Network),
  cable: w(Cable),
  signal: w(Signal),
  tablet: w(Tablet),
  qr: w(QrCode),
  wallet: w(Wallet),
  piggy: w(PiggyBank),
  settings: w(Settings),
  lifebuoy: w(LifeBuoy),
  handshake: w(Handshake),
  hourglass: w(Hourglass),
  eye: w(Eye),
  flag: w(Flag),
  milestone: w(Milestone),
  target: w(Target),
  puzzle: w(Puzzle),
  sun: w(Sun),
  moon: w(Moon),
  server: w(Server),
  cloud: w(Cloud),
  bell: w(Bell),
  megaphone: w(Megaphone),
  briefcase: w(Briefcase),
  utensils: w(Utensils),
  car: w(Car),
  parking: w(ParkingCircle),
  plug: w(Plug),
  key: w(KeyRound),
  badge: w(BadgeCheck),
  fileCheck: w(FileCheck),
  scroll: w(ScrollText),
  help: w(CircleHelp),
  languages: w(Languages),
  fingerprint: w(Fingerprint),
};

export type IconName = keyof typeof Icon;

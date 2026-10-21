import { createReader } from '@keystatic/core/reader';
import { cache } from 'react';
import keystaticConfig from '../../keystatic.config';

/** Einzige Datenquelle: Keystatic liest die YAML-Dateien in /content. */
export const reader = createReader(process.cwd(), keystaticConfig);

export const getSite = cache(async () => {
  const site = await reader.singletons.site.read();
  if (!site) throw new Error('content/site.yaml fehlt');
  return site;
});

export const getKonditionen = cache(async () => {
  const k = await reader.singletons.konditionen.read();
  if (!k) throw new Error('content/konditionen.yaml fehlt');
  return k;
});

export const getGeraete = cache(async () => {
  const all = await reader.collections.geraete.all();
  return all
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .sort((a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99));
});

export const getGeraet = cache(async (slug: string) => {
  const entry = await reader.collections.geraete.read(slug);
  return entry ? { slug, ...entry } : null;
});

export const getFaq = cache(async (bereich?: string) => {
  const all = await reader.collections.faq.all();
  return all
    .map((e) => ({ slug: e.slug, ...e.entry }))
    .filter((f) => !bereich || f.bereich === bereich)
    .sort((a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99));
});

export const getReferenzen = cache(async () => {
  const all = await reader.collections.referenzen.all();
  return all.map((e) => ({ slug: e.slug, ...e.entry })).filter((r) => r.aktiv);
});

export const getTeam = cache(async () => {
  const all = await reader.collections.team.all();
  return all.map((e) => ({ slug: e.slug, ...e.entry })).sort((a, b) => (a.reihenfolge ?? 99) - (b.reihenfolge ?? 99));
});

export const getLandingpages = cache(async () => {
  const all = await reader.collections.landingpages.all();
  return all.map((e) => ({ slug: e.slug, ...e.entry }));
});

export const getLandingpageByPath = cache(async (pfad: string) => {
  const all = await getLandingpages();
  return all.find((p) => p.pfad === pfad) ?? null;
});

export type Site = Awaited<ReturnType<typeof getSite>>;
export type Konditionen = Awaited<ReturnType<typeof getKonditionen>>;
export type Geraet = Awaited<ReturnType<typeof getGeraete>>[number];
export type FaqItem = Awaited<ReturnType<typeof getFaq>>[number];
export type Landingpage = Awaited<ReturnType<typeof getLandingpages>>[number];

/** Platzhalter erkennen: Texte in eckigen Klammern sind noch vom Kunden zu ersetzen. */
export const isPlaceholder = (s: string | null | undefined) => !!s && /\[[^\]]+\]/.test(s);

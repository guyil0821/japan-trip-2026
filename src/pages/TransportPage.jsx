import React from "react";
import { ExternalLink } from "lucide-react";
import { transport } from "../data/transport";

export default function TransportPage() {
  return <section className="space-y-4">{transport.map(t => <article key={t.date} className="rounded-2xl border bg-white p-4"><div className="flex gap-3"><b className="h-fit rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">{t.date}</b><div><h3 className="font-semibold">{t.route}</h3><p className="mt-1 text-sm text-slate-500">{t.note}</p></div></div><div className="mt-4 grid gap-2">{t.links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="flex justify-between rounded-xl border bg-slate-50 px-3 py-3 text-sm text-sky-700">{l.label}<ExternalLink className="h-4 w-4" /></a>)}</div></article>)}</section>;
}

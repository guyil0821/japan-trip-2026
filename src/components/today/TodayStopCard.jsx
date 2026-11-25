import React from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { annotatePlaces } from "../../utils/japanesePlaces";

export default function TodayStopCard({ stop }) {
  return <article className="rounded-xl border bg-white p-3"><div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" /><div className="min-w-0 flex-1"><h3 className="font-medium">{annotatePlaces(stop.name)}</h3><p className="mt-1 text-xs text-slate-500">营业时间：{stop.openingHours || "请当天确认"}</p>{stop.note && <p className="mt-1 text-xs leading-5 text-slate-600">{annotatePlaces(stop.note)}</p>}{stop.mapUrl && <a href={stop.mapUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700">打开 Google Maps<ExternalLink className="h-3.5 w-3.5" /></a>}</div></div></article>;
}

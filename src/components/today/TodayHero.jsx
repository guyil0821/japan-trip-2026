import React from "react";
import { CalendarDays, MapPin, Snowflake } from "lucide-react";
import { annotatePlaces } from "../../utils/japanesePlaces";

export default function TodayHero({ day }) {
  return <section className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5"><div className="flex items-start gap-3"><div className="rounded-xl bg-white p-2 text-sky-700"><Snowflake className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-1 text-xs uppercase tracking-wide text-sky-700"><CalendarDays className="h-3.5 w-3.5" />DEC {day.date.split("/")[1]}</div><div className="mt-2 flex items-center gap-1 text-sm text-slate-600"><MapPin className="h-4 w-4 text-sky-600" />{annotatePlaces(day.city)}</div><h1 className="mt-1 text-xl font-semibold text-slate-900">{annotatePlaces(day.title)}</h1></div></div></section>;
}

import React from "react";
import TodayStopCard from "./TodayStopCard";
import { annotatePlaces } from "../../utils/japanesePlaces";

export default function TodayRoute({ day, guide }) {
  return <section className="space-y-3"><div className="rounded-2xl border bg-white p-4"><h2 className="font-semibold">今日最佳路线</h2><ol className="mt-3 space-y-2">{day.items.map((item, index) => <li key={`${day.date}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-xs font-semibold text-sky-700">{index + 1}</span><span>{annotatePlaces(item)}</span></li>)}</ol></div>{guide.stops?.length > 0 && <div className="space-y-2">{guide.stops.map((stop, index) => <TodayStopCard key={`${stop.name}-${index}`} stop={stop} />)}</div>}</section>;
}

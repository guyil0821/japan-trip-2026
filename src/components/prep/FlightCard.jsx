import React from "react";
import { Plane } from "lucide-react";
import { flights } from "../../data/flights";

const known = value => value && value !== "待填写" ? value : "待确认";

export default function FlightCard() {
  return <section className="space-y-3"><h2 className="px-1 font-semibold">航班信息</h2>{flights.map((flight, index) => <article key={`${flight.date}-${index}`} className="rounded-2xl border bg-white p-4"><div className="flex items-start gap-3"><div className="rounded-xl bg-sky-50 p-2 text-sky-700"><Plane className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">{known(flight.flightNumber)}</h3><span className="text-sm text-slate-500">{known(flight.date)}</span></div><div className="mt-3 grid grid-cols-2 gap-3 text-sm"><div><div className="text-xs text-slate-400">出发</div><div className="mt-1">{known(flight.origin)}（{known(flight.originAirport)}）</div><div className="text-xs text-slate-500">航站楼：{known(flight.originTerminal)}</div><div className="text-xs text-slate-500">时间：{known(flight.departureTime)}</div></div><div><div className="text-xs text-slate-400">到达</div><div className="mt-1">{known(flight.destination)}（{known(flight.destinationAirport)}）</div><div className="text-xs text-slate-500">航站楼：{known(flight.destinationTerminal)}</div><div className="text-xs text-slate-500">时间：{known(flight.arrivalTime)}</div></div></div></div></div></article>)}</section>;
}

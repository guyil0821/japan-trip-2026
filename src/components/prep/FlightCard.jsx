import React from "react";
import { Plane } from "lucide-react";
import { flights } from "../../data/flights";

const known = value => value && value !== "待填写" ? value : "待确认";

export default function FlightCard() {
  return <section className="space-y-3"><h2 className="px-1 font-semibold">航班信息</h2>{flights.map((flight, index) => <article key={`${flight.date}-${index}`} className="rounded-2xl border bg-white p-4"><div className="mb-4 flex items-center justify-between gap-2"><h3 className="font-semibold">{flight.airline || "日本航空"}</h3><span className="text-sm text-slate-500">{known(flight.date)} · {known(flight.flightNumber)}</span></div><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><div className="text-center"><div className="text-3xl font-medium tabular-nums sm:text-4xl">{known(flight.departureTime)}</div><div className="mt-1 text-slate-500">{known(flight.originAirport)}</div></div><div className="min-w-16 text-center text-xs text-slate-500"><div>{known(flight.duration)}</div><div className="my-1 flex items-center gap-1 text-slate-400"><span className="h-px flex-1 bg-slate-300" /><Plane className="h-4 w-4" /></div><div className="text-sky-700">{flight.direct ? "直飞" : "待确认"}</div></div><div className="text-center"><div className="text-3xl font-medium tabular-nums sm:text-4xl">{known(flight.arrivalTime)}</div><div className="mt-1 text-slate-500">{known(flight.destinationAirport)}</div></div></div><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500"><div>{known(flight.origin)} · 航站楼 {known(flight.originTerminal)}</div><div className="text-right">{known(flight.destination)} · 航站楼 {known(flight.destinationTerminal)}</div></div></article>)}</section>;
}

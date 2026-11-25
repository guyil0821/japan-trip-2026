import React from "react";
import { BedDouble, MapPin, CalendarDays, Clock, ExternalLink, CheckCircle2 } from "lucide-react";

const isConfirmed = value => Boolean(value && value !== "待确认" && value !== "待填写");
const toLocalDate = value => {
  if (!isConfirmed(value)) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
};

export default function StayCard({ stay, today, checklist, onToggle, setTab }) {
  const checkIn = toLocalDate(stay.checkInDate);
  const checkOut = toLocalDate(stay.checkOutDate);
  const tonight = checkIn && checkOut && checkIn <= today && today < checkOut;
  const hasMap = isConfirmed(stay.mapUrl);
  const hasTransport = checkIn && stay.transportDate && stay.transportDate === stay.checkInDate;

  return <article className={`overflow-hidden rounded-2xl border bg-white ${tonight ? "border-sky-300 ring-2 ring-sky-100" : "border-black/5"}`}>
    {tonight && <div className="bg-sky-600 px-4 py-2 text-sm font-semibold text-white">今晚住这里</div>}
    <div className="p-4 sm:p-5"><div className="flex items-start gap-3"><div className="rounded-xl bg-sky-50 p-2 text-sky-700"><BedDouble className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="text-sm text-sky-700">{stay.city}</div><h2 className="mt-1 break-words text-lg font-semibold">{stay.hotel}</h2></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2"><div className="flex gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><div><div className="text-xs text-slate-500">入住</div><div>{stay.checkInDate} · {stay.checkInTime}</div></div></div><div className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><div><div className="text-xs text-slate-500">退房</div><div>{stay.checkOutDate} · {stay.checkOutTime}</div></div></div></div>
      <div className="mt-4 flex gap-2 text-sm"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" /><div className="min-w-0"><span className="text-xs text-slate-500">地址</span><p className="break-words">{stay.address}</p></div></div>
      <div className="mt-3 text-sm"><span className="text-xs text-slate-500">预订编号</span><p className="break-all">{stay.reservationNumber}</p></div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{stay.note}</p>
      <div className="mt-4 space-y-2"><button type="button" onClick={() => onToggle(`${stay.id}-confirmed`)} className="flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm"><CheckCircle2 className={`h-4 w-4 ${checklist[`${stay.id}-confirmed`] ? "text-sky-600" : "text-slate-300"}`} />预订已确认</button><button type="button" onClick={() => onToggle(`${stay.id}-address`)} className="flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm"><CheckCircle2 className={`h-4 w-4 ${checklist[`${stay.id}-address`] ? "text-sky-600" : "text-slate-300"}`} />地址已保存</button></div>
      {(hasMap || hasTransport) && <div className="mt-4 flex flex-wrap gap-2">{hasMap && <a href={stay.mapUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700">打开 Google Maps<ExternalLink className="h-4 w-4" /></a>}{hasTransport && <button type="button" onClick={() => setTab("transport")} className="min-h-11 rounded-xl border px-3 py-2 text-sm text-slate-700">查看当天交通</button>}</div>}
    </div>
  </article>;
}

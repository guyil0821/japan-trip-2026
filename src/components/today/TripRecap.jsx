import React from "react";
import { CalendarDays, MapPinned, WalletCards } from "lucide-react";
import { cny } from "../../utils/currency";

export default function TripRecap({ days, grandTotal }) {
  const summaries = [
    { label: "旅行天数", value: "8 天", Icon: CalendarDays },
    { label: "行程记录", value: `${days.length} 天`, Icon: MapPinned },
    { label: "实际花费", value: cny(grandTotal), Icon: WalletCards },
  ];
  return <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">{summaries.map(({ label, value, Icon }) => <article key={label} className="rounded-2xl border bg-white p-4"><div className="flex items-center gap-2 text-sm text-slate-500"><Icon className="h-4 w-4 text-sky-600" />{label}</div><div className="mt-3 text-xl font-semibold text-slate-900">{value}</div></article>)}</section>;
}

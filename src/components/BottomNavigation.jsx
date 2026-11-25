import React from "react";
import { CalendarDays, ShoppingBag, ReceiptText, Train, MapPin, ClipboardCheck } from "lucide-react";

const items = [["trip", "行程", CalendarDays], ["budget", "预算", ShoppingBag], ["ledger", "记账", ReceiptText], ["transport", "交通", Train], ["run", "跑步", MapPin], ["prep", "准备", ClipboardCheck]];

export default function BottomNavigation({ tab, setTab }) {
  return <nav className="fixed bottom-3 left-1/2 z-20 w-[calc(100%-24px)] max-w-lg -translate-x-1/2 overflow-x-auto whitespace-nowrap rounded-2xl border bg-white/90 p-2 text-[10px] shadow-xl backdrop-blur sm:text-[11px]"><div className="flex min-w-max">{items.map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`min-w-[64px] shrink-0 px-2 py-1 ${tab === key ? "text-sky-700" : "text-slate-500"}`}><Icon className="mx-auto mb-1 h-5 w-5" />{label}</button>)}</div></nav>;
}

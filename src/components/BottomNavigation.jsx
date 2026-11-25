import React from "react";
import { CalendarDays, ClipboardCheck, Footprints, House, ReceiptText, ShoppingBag, Sparkles, Train } from "lucide-react";

const items = [
  ["today", "今日", Sparkles],
  ["prep", "准备", ClipboardCheck],
  ["trip", "行程", CalendarDays],
  ["transport", "交通", Train],
  ["stay", "住宿", House],
  ["run", "跑步", Footprints],
  ["budget", "预算", ShoppingBag],
  ["ledger", "记账", ReceiptText],
];

export default function BottomNavigation({ tab, setTab }) {
  return <nav className="ios-bottom-nav" aria-label="旅行页面导航">
    {items.map(([key, label, Icon]) => <button key={key} type="button" onClick={() => setTab(key)} className={tab === key ? "is-active" : ""} aria-current={tab === key ? "page" : undefined}>
      <Icon size={19} strokeWidth={tab === key ? 2.2 : 1.7} /><span>{label}</span>
    </button>)}
  </nav>;
}

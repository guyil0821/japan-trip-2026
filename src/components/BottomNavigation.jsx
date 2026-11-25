import React from "react";
import { CalendarDays, ClipboardCheck, Sparkles, Train, WalletCards } from "lucide-react";

const items = [["today", "今日", Sparkles], ["prep", "准备", ClipboardCheck], ["trip", "行程", CalendarDays], ["transport", "交通", Train], ["budget", "预算", WalletCards]];

export default function BottomNavigation({ tab, setTab }) {
  return <nav className="mobile-navigation" aria-label="常用导航">
    {items.map(([key, label, Icon]) => <button type="button" key={key} onClick={() => setTab(key)} className={tab === key ? "is-active" : ""} aria-current={tab === key ? "page" : undefined}>
      <Icon size={18} strokeWidth={tab === key ? 2 : 1.6} /><span>{label}</span>
    </button>)}
  </nav>;
}

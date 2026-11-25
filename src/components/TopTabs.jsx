import React from "react";

const tabs = [["trip", "行程"], ["budget", "预算"], ["ledger", "实际花费"], ["transport", "交通"], ["run", "跑步路线"], ["prep", "准备"], ["today", "今日"]];

export default function TopTabs({ tab, setTab }) {
  return <div className="my-5 overflow-x-auto whitespace-nowrap rounded-xl border bg-white p-1"><div className="flex min-w-max gap-1">{tabs.map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`shrink-0 rounded-lg px-3 py-2 text-[10px] sm:text-xs ${tab === key ? "bg-slate-900 text-white" : "text-slate-500"}`}>{label}</button>)}</div></div>;
}

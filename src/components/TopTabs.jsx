import React from "react";

const tabs = [["trip", "行程"], ["budget", "预算"], ["ledger", "实际花费"], ["transport", "交通"], ["run", "跑步路线"]];

export default function TopTabs({ tab, setTab }) {
  return <div className="my-5 grid grid-cols-5 gap-1 rounded-xl border bg-white p-1 text-[10px] sm:text-xs">{tabs.map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-lg px-1 py-2 ${tab === key ? "bg-slate-900 text-white" : "text-slate-500"}`}>{label}</button>)}</div>;
}

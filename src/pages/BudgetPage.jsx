import React from "react";
import { initialShop } from "../data/shopping";
import { cny } from "../utils/currency";

export default function BudgetPage({ grandTotal }) {
  const total = 20000, planned = initialShop.reduce((s, x) => s + x.budget, 0);
  return <section className="space-y-4"><div className="grid grid-cols-2 gap-2"><div className="rounded-2xl bg-slate-950 p-4 text-white"><div className="text-xs text-slate-300">购物总预算</div><div className="mt-2 text-2xl font-bold">{cny(total)}</div></div><div className="rounded-2xl border bg-white p-4"><div className="text-xs text-slate-500">计划购物金额</div><div className="mt-2 text-2xl font-bold">{cny(planned)}</div></div></div><div className="rounded-2xl bg-slate-950 p-5 text-white"><div className="text-xs text-slate-300">实际花费（含人民币）</div><div className="mt-2 text-2xl font-bold">{cny(grandTotal)}</div></div><div className="overflow-hidden rounded-2xl border bg-white">{initialShop.map((r, i) => <div key={r.name} className={`flex justify-between p-4 ${i ? "border-t" : ""}`}><div><div className="text-sm font-medium">{r.name}</div><div className="mt-1 text-xs text-slate-500">{r.tag}</div></div><b className="text-sm">{cny(r.budget)}</b></div>)}</div></section>;
}

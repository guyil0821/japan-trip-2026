import React from "react";
import { initialShop } from "../data/shopping";
import { cny } from "../utils/currency";

const totalBudget = 20000;

export default function BudgetPage({ grandTotal = 0, shoppingActual = 0 }) {
  const planned = initialShop.reduce((sum, item) => sum + (Number(item.budget) || 0), 0);
  const spent = Number(shoppingActual) || 0;
  const remaining = Math.max(0, totalBudget - spent);
  const progress = totalBudget > 0 ? Math.min(100, Math.max(0, (spent / totalBudget) * 100)) : 0;

  return <section className="space-y-4">
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-2xl bg-slate-950 p-4 text-white"><div className="text-xs text-slate-300">购物总预算</div><div className="mt-2 text-2xl font-bold">{cny(totalBudget)}</div><p className="mt-1 text-xs text-slate-300">旅行预算上限</p></div>
      <div className="rounded-2xl border bg-white p-4"><div className="text-xs text-slate-500">已记录花费</div><div className="mt-2 text-2xl font-bold">{cny(spent)}</div><p className="mt-1 text-xs text-slate-500">旅行中花费 · 购物 / 伴手礼</p></div>
    </div>
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">预算使用情况</p><p className="mt-1 text-xs text-slate-500">剩余 {cny(remaining)} · 已使用 {Math.round(progress)}%</p></div><strong className="text-lg">{cny(planned)}</strong></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e2cf]"><div className="h-full rounded-full bg-[#71866e]" style={{ width: `${progress}%` }} /></div>
      <p className="mt-2 text-[11px] text-slate-500">购物计划合计（来自行程购物清单）</p>
    </div>
    <div className="space-y-2">{initialShop.map(item => <article key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4"><div className="min-w-0"><p className="font-medium">{item.name}</p><p className="mt-1 text-xs text-slate-500">{item.tag}</p></div><strong className="shrink-0">{cny(item.budget)}</strong></article>)}</div>
  </section>;
}

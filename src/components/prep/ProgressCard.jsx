import React from "react";

export default function ProgressCard({ title, completed, total }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return <section className="rounded-2xl border bg-white p-4"><div className="flex items-center justify-between gap-2"><h2 className="font-semibold">{title}</h2><span className="text-sm text-slate-500">{completed} / {total} · {percent}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${percent}%` }} /></div>{total > 0 && completed === total && <p className="mt-3 text-sm font-medium text-sky-700">行前准备完成 ✓</p>}</section>;
}

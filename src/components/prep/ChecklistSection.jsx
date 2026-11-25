import React from "react";

export default function ChecklistSection({ section, checked, onToggle, externalLink }) {
  return <section className="rounded-2xl border bg-white p-4"><div className="mb-3 flex items-center justify-between gap-2"><h3 className="font-semibold">{section.title}</h3>{externalLink && <a href={externalLink} target="_blank" rel="noreferrer" className="shrink-0 rounded-lg bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700">Visit Japan Web 官方网站</a>}</div><div className="space-y-1">{section.items.map(item => <label key={item.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm text-slate-700"><input type="checkbox" checked={Boolean(checked[item.id])} onChange={() => onToggle(item.id)} className="h-4 w-4 shrink-0 accent-sky-600" /><span className={checked[item.id] ? "text-slate-400 line-through" : ""}>{item.text}</span></label>)}</div></section>;
}

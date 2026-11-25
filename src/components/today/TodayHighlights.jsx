import React from "react";
import { Sparkles } from "lucide-react";

export default function TodayHighlights({ highlights = [] }) {
  if (!highlights.length) return null;
  return <section className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4"><h2 className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-sky-600" />今日亮点</h2><ul className="mt-3 space-y-2">{highlights.slice(0, 3).map((highlight, index) => <li key={`${index}-${highlight}`} className="text-sm leading-6 text-slate-700">• {highlight}</li>)}</ul></section>;
}

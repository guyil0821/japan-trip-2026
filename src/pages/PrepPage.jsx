import React, { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Clock3, Plane, RotateCcw } from "lucide-react";
import { flights } from "../data/flights";
import { packingChecklist } from "../data/packingChecklist";
import { preTripChecklist } from "../data/preTripChecklist";

const shanghaiTimeZone = "+08:00";
const checklistStorageKey = "sybil-japan-pretrip-checklist";
const packingStorageKey = "sybil-japan-packing-checklist";
const visitJapanWebUrl = "https://services.digital.go.jp/zh-cmn-hans/visit-japan-web/";

function getDepartureDateTime(flight) {
  if (!flight.departureTime) return null;
  const match = flight.departureTime.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const [, hours, minutes] = match;
  return new Date(`${flight.date.replaceAll("/", "-")}T${hours.padStart(2, "0")}:${minutes}:00${shanghaiTimeZone}`);
}

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!target) return null;
  const remaining = target.getTime() - now;
  if (remaining <= 0) return { started: true };

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    started: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function readChecklistState(storageKey) {
  try {
    const saved = window.localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function FlightCard({ flight, direction }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{direction}</span>
        <span className="text-sm font-semibold text-slate-500">{flight.date}</span>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xl font-semibold">{flight.originAirport === "待填写" ? flight.origin : flight.originAirport}</p>
          <p className="mt-1 text-sm text-slate-500">{flight.originAirport}{flight.originTerminal !== "待填写" ? ` · ${flight.originTerminal}` : ""}</p>
        </div>
        <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-slate-400" />
        <div className="min-w-0 text-right">
          <p className="text-xl font-semibold">{flight.destinationAirport === "待填写" ? flight.destination : flight.destinationAirport}</p>
          <p className="mt-1 text-sm text-slate-500">{flight.destinationAirport}{flight.destinationTerminal !== "待填写" ? ` · ${flight.destinationTerminal}` : ""}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
        <div><p className="text-xs text-slate-400">航班</p><p className="mt-1 font-semibold">{flight.flightNumber}</p></div>
        <div className="text-right"><p className="text-xs text-slate-400">起飞 / 到达</p><p className="mt-1 font-medium">{flight.departureTime || "待填写"} / {flight.arrivalTime || "待填写"}</p></div>
      </div>
    </article>
  );
}

function ChecklistSection({ category, checkedItems, onToggle, collapsed, onToggleCollapse }) {
  const completed = category.items.filter((item) => checkedItems[item.id]).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <button type="button" onClick={onToggleCollapse} aria-expanded={!collapsed} className="flex w-full items-center justify-between gap-3 p-4 text-left">
        <span className="font-semibold">{category.title}</span>
        <span className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-slate-500">{completed}/{category.items.length}</span>
          <ChevronDown aria-hidden="true" className={`h-4 w-4 text-slate-400 transition-transform ${collapsed ? "-rotate-90" : ""}`} />
        </span>
      </button>
      {!collapsed && (
        <div className="space-y-1 border-t border-slate-100 px-4 py-2">
          {category.items.map((item) => {
            const checked = Boolean(checkedItems[item.id]);
            return (
              <label key={item.id} className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50">
                <input type="checkbox" checked={checked} onChange={() => onToggle(item.id)} className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600" />
                <span className={`flex-1 text-sm leading-5 ${checked ? "text-slate-400 line-through" : "text-slate-700"}`}>{item.text}</span>
                {checked && <Check aria-label="已完成" className="h-4 w-4 shrink-0 text-emerald-600" />}
              </label>
            );
          })}
          {category.id === "entry" && (
            <div className="pb-2 pt-1">
              <a href={visitJapanWebUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">🇯🇵 Visit Japan Web</a>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function ChecklistBlock({ title, resetMessage, categories, storageKey }) {
  const [checkedItems, setCheckedItems] = useState(() => readChecklistState(storageKey));
  const [collapsedCategories, setCollapsedCategories] = useState(() => new Set());

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify(checkedItems)); } catch { /* Keep the checklist usable if storage is unavailable. */ }
  }, [checkedItems, storageKey]);

  const totalItems = categories.reduce((total, category) => total + category.items.length, 0);
  const completedItems = categories.reduce((total, category) => total + category.items.filter((item) => checkedItems[item.id]).length, 0);
  const progress = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;
  const toggleItem = (itemId) => setCheckedItems((current) => ({ ...current, [itemId]: !current[itemId] }));
  const toggleCategory = (categoryId) => setCollapsedCategories((current) => {
    const next = new Set(current);
    if (next.has(categoryId)) next.delete(categoryId); else next.add(categoryId);
    return next;
  });
  const resetChecklist = () => {
    if (window.confirm(resetMessage)) setCheckedItems({});
  };

  return (
    <section className="space-y-3 pt-2">
      <div className="flex items-center justify-between gap-3 px-1">
        <div><h2 className="text-lg font-semibold">{title}</h2><p className="mt-1 text-xs text-slate-500">{completedItems}/{totalItems} 项已完成 · {progress}%</p></div>
        <button type="button" onClick={resetChecklist} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"><RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />Reset Checklist</button>
      </div>
      <div role="progressbar" aria-label={`${title} 完成进度`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="space-y-3">
        {categories.map((category) => <ChecklistSection key={category.id} category={category} checkedItems={checkedItems} onToggle={toggleItem} collapsed={collapsedCategories.has(category.id)} onToggleCollapse={() => toggleCategory(category.id)} />)}
      </div>
    </section>
  );
}

export default function PrepPage() {
  const outboundFlight = flights.find((flight) => flight.flightNumber === "JL876");
  const departureDateTime = outboundFlight ? getDepartureDateTime(outboundFlight) : null;
  const countdown = useCountdown(departureDateTime);

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm text-slate-300"><Clock3 aria-hidden="true" className="h-4 w-4" />距离日本出发还有</div>
        {countdown?.started ? <p className="mt-4 text-2xl font-semibold">Japan Trip Started 🇯🇵</p> : countdown ? <div className="mt-4 grid grid-cols-4 gap-2 text-center">{[[countdown.days, "天"], [countdown.hours, "小时"], [countdown.minutes, "分钟"], [countdown.seconds, "秒"]].map(([value, unit]) => <div key={unit} className="rounded-xl bg-white/10 px-2 py-3"><p className="text-2xl font-semibold tabular-nums sm:text-3xl">{String(value).padStart(2, "0")}</p><p className="mt-1 text-xs text-slate-300">{unit}</p></div>)}</div> : <p className="mt-4 text-lg font-semibold">待填写去程航班时间</p>}
        <p className="mt-4 text-xs text-slate-400">倒计时按 Asia/Shanghai 时区计算</p>
      </div>
      <div className="flex items-center gap-2 px-1"><Plane aria-hidden="true" className="h-5 w-5 text-sky-700" /><h2 className="text-lg font-semibold">航班</h2></div>
      <div className="space-y-3"><FlightCard flight={flights[0]} direction="去程" /><FlightCard flight={flights[1]} direction="回程" /></div>
      <ChecklistBlock title="出发前 Checklist" resetMessage="确定要重置所有出发前 Checklist 吗？此操作会清除已完成状态。" categories={preTripChecklist} storageKey={checklistStorageKey} />
      <ChecklistBlock title="🧳 Packing Checklist" resetMessage="确定要重置所有 Packing Checklist 吗？此操作会清除已完成状态。" categories={packingChecklist} storageKey={packingStorageKey} />
    </section>
  );
}

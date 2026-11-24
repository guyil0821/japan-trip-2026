import React, { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronRight, MapPin, WalletCards } from "lucide-react";
import { days } from "../data/itinerary";
import { money } from "../utils/currency";

const tripStart = { year: 2026, month: 12, day: 16 };
const tripEnd = { year: 2026, month: 12, day: 23 };
const ledgerKey = "sybil-japan-ledger";

function getTokyoDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  return Object.fromEntries(parts.filter(({ type }) => type !== "literal").map(({ type, value }) => [type, Number(value)]));
}

function compareDate(a, b) {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

function getTripDayForDate({ month, day }) {
  return days.find((tripDay) => {
    const [dayMonth, dayNumber] = tripDay.date.split("/").map(Number);
    return dayMonth === month && dayNumber === day;
  });
}

function getLedgerStats() {
  try {
    const entries = JSON.parse(window.localStorage.getItem(ledgerKey) || "[]");
    if (!Array.isArray(entries)) return { spending: 0, count: 0 };
    const spending = entries.reduce((total, entry) => {
      if (entry.currency === "JPY") return total + (Number(entry.cnyAmount) || 0);
      return total + (Number(entry.cnyAmount ?? entry.amount) || 0);
    }, 0);
    return { spending, count: entries.length };
  } catch {
    return { spending: 0, count: 0 };
  }
}

function getVisitedCityCount() {
  const cities = days.flatMap(({ city }) => city.split(/\s*(?:→|↔|\/|、|·)\s*/));
  return new Set(cities.map((city) => city.trim()).filter((city) => city && city !== "上海")).size;
}

function ActionButton({ children, onClick, secondary = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${secondary ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50" : "bg-slate-950 text-white hover:bg-slate-800"}`}
    >
      {children}
      <ChevronRight aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}

function BeforeTrip({ onNavigate }) {
  return (
    <section className="space-y-5">
      <article className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10">
        <div aria-hidden="true" className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute -right-2 -top-4 h-32 w-32 rounded-full border border-white/10" />
        <p className="relative text-sm font-medium tracking-wide text-sky-200">期待 · Japan is Calling</p>
        <p className="relative mt-8 text-xs font-semibold tracking-[0.25em] text-slate-300">JAPAN · WINTER 2026</p>
        <h1 className="relative mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">12.16 <span className="text-sky-300">→</span> 12.23</h1>
        <p className="relative mt-5 text-sm leading-7 text-slate-200">成田 · 青森 · 函馆 · 川崎 · 横滨 · 东京</p>
        <div aria-hidden="true" className="absolute bottom-0 right-5 text-7xl opacity-10">富士</div>
      </article>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ActionButton onClick={() => onNavigate?.("trip")}>查看完整行程</ActionButton>
        <ActionButton secondary onClick={() => onNavigate?.("prep")}>行前准备</ActionButton>
      </div>
      <p className="rounded-2xl border border-slate-200/70 bg-white px-4 py-4 text-center text-sm tracking-wide text-slate-600">❄️ Snow · 🚄 Rail · 🏃 Run · 🛍 Tokyo</p>
    </section>
  );
}

function DuringTrip({ today }) {
  const tripDay = getTripDayForDate(today);
  const items = tripDay?.items || [];
  const nextStop = items[0] || "今日行程即将开启";
  const completed = 0;

  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex items-center gap-2 text-sm text-slate-300"><CalendarDays aria-hidden="true" className="h-4 w-4" />日本当地日期</div>
        <p className="mt-3 text-3xl font-semibold tabular-nums">{today.year}/{String(today.month).padStart(2, "0")}/{String(today.day).padStart(2, "0")}</p>
      </div>
      {tripDay ? (
        <article className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-sm text-sky-700"><MapPin aria-hidden="true" className="h-4 w-4" />今日主要城市 · {tripDay.city}</div>
            <h1 className="mt-2 text-xl font-semibold">{tripDay.title}</h1>
            <p className="mt-1 text-sm text-slate-500">今日打卡点数量：{items.length}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Next Stop</p>
            <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-slate-800"><ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-sky-700" />{nextStop}</p>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-xs text-slate-500"><span>今日完成进度（占位）</span><span>{completed}/{items.length}</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label="今日完成进度" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={completed}>
              <div className="h-full rounded-full bg-emerald-500" style={{ width: items.length ? `${(completed / items.length) * 100}%` : "0%" }} />
            </div>
          </div>
        </article>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">今天暂无行程数据。</p>
      )}
    </section>
  );
}

function AfterTrip({ onNavigate }) {
  const [ledger, setLedger] = useState(getLedgerStats);
  const tripDays = Math.round((Date.UTC(tripEnd.year, tripEnd.month - 1, tripEnd.day) - Date.UTC(tripStart.year, tripStart.month - 1, tripStart.day)) / 86400000) + 1;
  const visitedCities = getVisitedCityCount();
  const completedStops = days.reduce((total, tripDay) => total + (tripDay.items?.length || 0), 0);

  useEffect(() => {
    const refreshLedger = () => setLedger(getLedgerStats());
    window.addEventListener("storage", refreshLedger);
    window.addEventListener("focus", refreshLedger);
    return () => {
      window.removeEventListener("storage", refreshLedger);
      window.removeEventListener("focus", refreshLedger);
    };
  }, []);

  return (
    <section className="space-y-5">
      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-medium text-sky-200">回味 · Japan Winter Memories</p>
        <h1 className="mt-3 text-2xl font-semibold">Japan Trip Completed <Check aria-label="完成" className="inline h-5 w-5 text-emerald-300" /></h1>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="旅行天数" value={`${tripDays} 天`} />
        <StatCard label="到访城市数" value={`${visitedCities} 座`} />
        <StatCard label="旅行累计支出 CNY" value={`¥${money(ledger.spending)}`} icon={<WalletCards aria-hidden="true" className="h-4 w-4" />} />
        <StatCard label="消费记录笔数" value={`${ledger.count} 笔`} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ActionButton onClick={() => onNavigate?.("trip")}>回看完整行程</ActionButton>
        <ActionButton secondary onClick={() => onNavigate?.("ledger")}>查看旅行账单</ActionButton>
      </div>
      <button type="button" onClick={() => onNavigate?.("trip")} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">重温打卡记录 · {completedStops} 个行程点</button>
    </section>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <p className="flex items-center gap-2 text-xs text-slate-500">{icon}{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums text-slate-900">{value}</p>
    </article>
  );
}

export default function TodayPage({ onNavigate }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const tokyoToday = getTokyoDate(now);
  const beforeTrip = compareDate(tokyoToday, tripStart) < 0;
  const afterTrip = compareDate(tokyoToday, tripEnd) > 0;

  return (
    <div className="space-y-5">
      {beforeTrip ? <BeforeTrip onNavigate={onNavigate} /> : afterTrip ? <AfterTrip onNavigate={onNavigate} /> : <DuringTrip today={tokyoToday} />}
    </div>
  );
}

import React from "react";
import { CalendarDays, CheckSquare, Footprints, Map, ReceiptText, ShoppingBag, Sparkles, Train, WalletCards } from "lucide-react";
import { daysUntilTrip, getTripStatus } from "../utils/tripStatus";
import { days } from "../data/itinerary";
import { dailyGuide } from "../data/dailyGuide";
import { initialShop } from "../data/shopping";
import { cny } from "../utils/currency";
import useWeather from "../hooks/useWeather";

const totalBudget = 20000;
const pageActions = [
  ["prep", "Checklist", CheckSquare],
  ["transport", "Transit", Train],
  ["run", "Morning Run", Footprints],
  ["trip", "Trip Map", Map],
  ["budget", "预算", ShoppingBag],
  ["ledger", "记账", ReceiptText],
];

function uniqueCities() {
  const cities = days.flatMap(day => String(day.city || "").split(/[→·]/).map(city => city.trim()).filter(Boolean));
  return cities.filter((city, index) => city !== cities[index - 1]);
}

function ScenicHeader({ day, date }) {
  const colors = ["#b9d7dc", "#d9c9aa", "#cbd6c0", "#acc8c6", "#c9bda8"];
  const index = Math.max(0, days.findIndex(item => item.date === day?.date));
  const sky = colors[index % colors.length];
  return <section className="today-scene" style={{ background: `linear-gradient(180deg, ${sky} 0%, #eadfca 80%)` }} aria-label={`${day?.city || "日本"}旅行场景`}>
    <div className="today-scene-copy story-text-shadow">
      <p className="text-[9px] font-bold tracking-[.12em] text-[#40554c]/70">{day ? `${day.city} · ${day.date}` : "A WINTER JOURNEY · 2026"}</p>
      <h2 className="today-story mt-1 text-[23px] font-medium leading-tight text-[#30443b]">{day?.title || "冬日旅程"}</h2>
      {day && <p className="mt-1 text-[10px] font-medium text-[#40554c]/75">{day.items?.[0]}</p>}
    </div>
    <div className="absolute right-8 top-5 h-9 w-9 rounded-full bg-[#e4bc69]/80 shadow-[0_0_30px_rgba(228,188,105,.28)]" />
    <div className="absolute bottom-8 left-[12%] h-10 w-10 rounded-full bg-[#77936b]/65" />
    <div className="absolute bottom-7 right-[14%] h-14 w-14 rounded-full bg-[#718c88]/55" />
    <div className="today-scene-land" />
    {day && <div className="absolute right-3 top-14 z-10 rounded-full border border-white/40 bg-white/25 px-2.5 py-1 text-[9px] text-[#40554c] shadow-sm backdrop-blur-sm"><MapPin className="mr-1 inline h-3 w-3" />{day.city}</div>}
    <span className="absolute bottom-2 right-3 z-10 text-[8px] font-medium text-white/85">{date}</span>
  </section>;
}

function CountdownCard({ status, countdown, tripLength }) {
  const label = status === "before" ? "DAYS UNTIL ADVENTURE" : status === "during" ? "YOUR JOURNEY" : "JOURNEY COMPLETE";
  const figure = status === "before" ? countdown : status === "during" ? `${tripLength} 天` : "✓";
  return <article className="today-countdown">
    <div className="relative z-10 flex items-center justify-between text-[9px] font-bold tracking-[.15em] text-white/65"><span>{label}</span><CalendarDays className="h-4 w-4 text-[#e8d8a7]" /></div>
    <div className="relative z-10 mt-2 flex items-end gap-2"><strong className="text-[36px] font-black leading-none">{figure}</strong>{status === "before" && <span className="pb-1 text-[10px] text-white/65">天后出发</span>}</div>
    <p className="relative z-10 mt-2 text-[9px] text-white/65">日本 · {days[0]?.date}—{days[days.length - 1]?.date}</p>
  </article>;
}

function NextStopCard({ day }) {
  return <article className="today-next-stop">
    <div className="flex items-center justify-between"><MapPin className="h-4 w-4 text-[#7d7657]" /><span className="text-[9px] font-bold text-[#9a9274]">{day?.date || "—"}</span></div>
    <p className="mt-2 text-[8px] font-bold tracking-[.12em] text-[#8f8768]">{day ? "NEXT STOP" : "ITINERARY"}</p>
    <strong className="today-story mt-0.5 block text-[17px] font-medium text-[#42534b]">{day?.city || "旅程安排"}</strong>
    <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#887f63]">{day?.title || "查看行程，发现旅途细节。"}</p>
  </article>;
}

function RouteCard({ day }) {
  const items = day?.items || [];
  return <article className="today-route-card">
    <div className="flex items-center justify-between"><div><p className="text-[8px] font-bold tracking-[.14em] text-[#92927d]">ITINERARY NOTES</p><h2 className="today-story text-[14px] font-medium">{day ? `${day.date} · ${day.city}` : "旅程安排"}</h2></div><Sparkles className="h-4 w-4 text-[#758d77]" /></div>
    {items.length ? <div className="mt-1">{items.map((item, index) => <div className="today-route-item" key={`${day.date}-${index}`}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dfe7d8] text-[8px] font-bold text-[#668063]">{String(index + 1).padStart(2, "0")}</span><p className="min-w-0 flex-1 text-[10px] leading-4 text-[#40554c]">{item}</p></div>)}</div> : <p className="mt-3 text-xs text-slate-500">行程详情尚未配置。</p>}
  </article>;
}

function JourneyLine({ progress }) {
  const cities = uniqueCities();
  return <section className="today-journey">
    <div className="flex items-center justify-between"><div><p className="text-[8px] font-bold tracking-[.14em] text-[#999683]">JOURNEY LINE</p><h2 className="today-story text-[13px] font-medium">从雪国一路向南</h2></div><Map className="h-4 w-4 text-[#768b73]" /></div>
    <div className="today-journey-line">{cities.map((city, index) => <div className={`today-journey-stop ${index < progress ? "is-complete" : ""}`} key={`${city}-${index}`}><div className="today-journey-dot" /><p className="mt-1 max-w-[72px] truncate">{city}</p></div>)}</div>
  </section>;
}

export default function TodayPage({ setTab, grandTotal = 0, entryCount = 0 }) {
  const trip = getTripStatus();
  const dayIndex = trip.status === "during" ? days.findIndex(item => item.date === trip.itineraryDate) : -1;
  const day = dayIndex >= 0 ? days[dayIndex] : null;
  const guide = day ? dailyGuide[day.date] : null;
  const weather = useWeather(guide, Boolean(guide));
  const nextDay = dayIndex >= 0 ? days[dayIndex + 1] || day : trip.status === "after" ? days[days.length - 1] : days[0];
  const spent = Number(grandTotal) || 0;
  const remaining = Math.max(0, totalBudget - spent);
  const budgetProgress = totalBudget > 0 ? Math.min(100, Math.max(0, (spent / totalBudget) * 100)) : 0;
  const progress = trip.status === "before" ? 0 : trip.status === "after" ? days.length : dayIndex + 1;
  const cities = uniqueCities();

  return <section className="today-dashboard" aria-label="旅行总览">
    <div className="today-top-grid">
      <CountdownCard status={trip.status} countdown={daysUntilTrip()} tripLength={dayIndex + 1} />
      <NextStopCard day={nextDay} />
    </div>

    <ScenicHeader day={day || nextDay} date={day?.date || (trip.status === "after" ? "旅程回顾" : "即将启程")} />

    <section className="today-date-strip" aria-label="行程日期">
      <div className="flex min-w-max gap-1">{days.map((item, index) => <button type="button" key={item.date} aria-label={`${item.date} ${item.city}`} aria-pressed={day?.date === item.date} onClick={() => setTab("trip")} className={`today-date-button ${day?.date === item.date ? "is-selected" : ""}`}>
        <span className="block text-[7px] font-bold opacity-60">DAY {String(index + 1).padStart(2, "0")}</span><span className="block text-[14px] font-black">{item.date.split("/")[1]}</span><span className="block max-w-[58px] truncate text-[8px]">{item.city}</span>
      </button>)}</div>
    </section>

    {weather.data && <div className="flex flex-wrap items-center gap-2 px-1 text-xs text-[#61786c]" aria-live="polite"><span className="rounded-full border border-white/50 bg-white/30 px-3 py-1 backdrop-blur-sm">{guide?.weatherLocation} · {weather.data.description} · {Math.round(weather.data.temperature)}°</span><span className="text-[10px]">实况天气</span></div>}
    {weather.loading && <p className="px-1 text-[10px] text-[#718078]">正在获取 {guide?.weatherLocation} 天气…</p>}

    <div className="today-finance-grid">
      <RouteCard day={day || nextDay} />
      <div className="space-y-2">
        <button type="button" onClick={() => setTab("ledger")} className="today-spend-card w-full rounded-[17px] text-left shadow-[0_4px_14px_rgba(78,88,69,.08)]">
          <div className="flex items-center justify-between"><ReceiptText className="h-4 w-4 text-[#e6d99f]" /><span className="text-[8px] text-white/60">ACTUAL SPEND</span></div>
          <p className="mt-2 text-[17px] font-black">{cny(spent)}</p><p className="mt-1 text-[8px] text-white/65">{entryCount} 笔记录 · 人民币折算</p>
        </button>
        <button type="button" onClick={() => setTab("budget")} className="today-budget-card w-full rounded-[17px] text-left">
          <div className="flex items-center justify-between"><WalletCards className="h-4 w-4 text-[#71866e]" /><span className="text-[8px] text-[#999683]">BUDGET LEFT</span></div>
          <p className="mt-1 text-[8px] font-bold text-[#999683]">购物预算余额</p><strong className="text-[15px] font-black">{cny(remaining)}</strong><div className="mt-2 h-1 overflow-hidden rounded-full bg-[#e5e2cf]"><div className="h-full rounded-full bg-[#718d69]" style={{ width: `${budgetProgress}%` }} /></div>
        </button>
      </div>
    </div>

    <JourneyLine progress={progress} />

    <section className="today-quick-grid" aria-label="快捷导航">{pageActions.map(([key, label, Icon]) => {
      const value = key === "trip" ? `${days.length} days` : key === "transport" ? `${days.length} days` : key === "ledger" ? `${entryCount} entries` : key === "budget" ? cny(remaining) : key === "prep" ? "准备清单" : "路线详情";
      return <button type="button" key={key} onClick={() => setTab(key)} className="today-quick-action rounded-[15px] border border-[#ded8c0]">
        <div className="flex items-center justify-between"><Icon className="h-4 w-4 text-[#71866e]" /><span className="text-[10px] text-[#bbb59d]">↗</span></div><p className="mt-2 truncate text-[8px] text-[#999683]">{label}</p><strong className="block truncate text-[10px] font-black">{value}</strong>
      </button>;
    })}</section>

    {trip.status === "after" && <div className="pt-2"><p className="text-center text-xs text-[#718078]">旅程已结束 · 共 {days.length} 天 · {cities.length} 个目的地</p></div>}
  </section>;
}

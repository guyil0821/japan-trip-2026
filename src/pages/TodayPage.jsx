import React from "react";
import { daysUntilTrip, getTripStatus } from "../utils/tripStatus";
import { days } from "../data/itinerary";
import { dailyGuide } from "../data/dailyGuide";
import TodayHero from "../components/today/TodayHero";
import WeatherCard from "../components/today/WeatherCard";
import TodayHighlights from "../components/today/TodayHighlights";
import TodayRoute from "../components/today/TodayRoute";
import useWeather from "../hooks/useWeather";

export default function TodayPage({ setTab }) {
  const trip = getTripStatus();
  const day = trip.status === "during" ? days.find(item => item.date === trip.itineraryDate) : null;
  const guide = trip.status === "during" ? dailyGuide[trip.itineraryDate] : null;
  const weather = useWeather(guide, trip.status === "during");

  if (trip.status === "before") {
    return <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="text-xs uppercase tracking-widest text-sky-200">Japan · Winter 2026</div><h1 className="mt-3 text-2xl font-semibold">日本 · 冬日将至</h1><p className="mt-3 text-lg text-sky-100">距离出发还有 {daysUntilTrip()} 天</p><p className="mt-3 text-sm leading-6 text-slate-300">青森、函馆、八甲田、横滨、东京<br />冬日旅程正在靠近。</p><button onClick={() => setTab("prep")} className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900">查看行前准备</button></section>;
  }

  if (trip.status === "after") {
    return <section className="rounded-2xl bg-slate-950 p-6 text-white"><div className="text-xs uppercase tracking-widest text-sky-200">Japan · Winter 2026</div><h1 className="mt-3 text-2xl font-semibold">日本 · 冬日回味</h1><p className="mt-3 text-sm leading-6 text-slate-300">旅程已经结束，但路线、花费和那些冬日瞬间都还在这里。</p><button onClick={() => setTab("trip")} className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900">查看完整行程</button></section>;
  }

  if (!day || !guide) return null;

  return <section className="space-y-4"><TodayHero day={day} /><WeatherCard weather={weather} location={guide.weatherLocation} /><TodayHighlights highlights={guide.highlights} /><div className="rounded-2xl border bg-white p-4"><h2 className="font-semibold">今日行程</h2><div className="mt-3 space-y-2">{day.items.map((item, index) => <div key={`${day.date}-${index}`} className="text-sm leading-6 text-slate-700">• {item}</div>)}</div></div><TodayRoute day={day} guide={guide} /></section>;
}

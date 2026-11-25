import React from "react";
import { daysUntilTrip, getTripStatus } from "../utils/tripStatus";
import { days } from "../data/itinerary";
import { dailyGuide } from "../data/dailyGuide";
import TodayHero from "../components/today/TodayHero";
import WeatherCard from "../components/today/WeatherCard";
import TodayHighlights from "../components/today/TodayHighlights";
import TodayRoute from "../components/today/TodayRoute";
import TripPoster from "../components/today/TripPoster";
import TripRecap from "../components/today/TripRecap";
import useWeather from "../hooks/useWeather";

export default function TodayPage({ setTab, grandTotal }) {
  const trip = getTripStatus();
  const day = trip.status === "during" ? days.find(item => item.date === trip.itineraryDate) : null;
  const guide = trip.status === "during" ? dailyGuide[trip.itineraryDate] : null;
  const weather = useWeather(guide, trip.status === "during");

  if (trip.status === "before") {
    return <TripPoster mode="before" countdownDays={daysUntilTrip()} setTab={setTab} />;
  }

  if (trip.status === "after") {
    return <section className="space-y-4"><TripPoster mode="after" setTab={setTab} /><TripRecap days={days} grandTotal={grandTotal} /></section>;
  }

  if (!day || !guide) {
    return <section className="rounded-2xl border bg-white p-5"><h1 className="font-semibold">今日行程暂未配置</h1><button onClick={() => setTab("trip")} className="mt-4 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">查看完整行程</button></section>;
  }

  return <section className="space-y-4"><TodayHero day={day} /><WeatherCard weather={weather} location={guide.weatherLocation} /><TodayHighlights highlights={guide.highlights} /><div className="rounded-2xl border bg-white p-4"><h2 className="font-semibold">今日行程</h2><div className="mt-3 space-y-2">{day.items.map((item, index) => <div key={`${day.date}-${index}`} className="text-sm leading-6 text-slate-700">• {item}</div>)}</div></div><TodayRoute day={day} guide={guide} /></section>;
}

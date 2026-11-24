import React, { useEffect, useState } from "react";
import { ArrowRight, Clock3, Plane } from "lucide-react";
import { flights } from "../data/flights";

const shanghaiTimeZone = "+08:00";

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

function FlightCard({ flight, direction }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {direction}
        </span>
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
        <div>
          <p className="text-xs text-slate-400">航班</p>
          <p className="mt-1 font-semibold">{flight.flightNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">起飞 / 到达</p>
          <p className="mt-1 font-medium">{flight.departureTime || "待填写"} / {flight.arrivalTime || "待填写"}</p>
        </div>
      </div>
    </article>
  );
}

export default function PrepPage() {
  const outboundFlight = flights.find((flight) => flight.flightNumber === "JL876");
  const departureDateTime = outboundFlight ? getDepartureDateTime(outboundFlight) : null;
  const countdown = useCountdown(departureDateTime);

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-6">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Clock3 aria-hidden="true" className="h-4 w-4" />
          距离日本出发还有
        </div>
        {countdown?.started ? (
          <p className="mt-4 text-2xl font-semibold">Japan Trip Started 🇯🇵</p>
        ) : countdown ? (
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {[[countdown.days, "天"], [countdown.hours, "小时"], [countdown.minutes, "分钟"], [countdown.seconds, "秒"]].map(([value, unit]) => (
              <div key={unit} className="rounded-xl bg-white/10 px-2 py-3">
                <p className="text-2xl font-semibold tabular-nums sm:text-3xl">{String(value).padStart(2, "0")}</p>
                <p className="mt-1 text-xs text-slate-300">{unit}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-lg font-semibold">待填写去程航班时间</p>
        )}
        <p className="mt-4 text-xs text-slate-400">倒计时按 Asia/Shanghai 时区计算</p>
      </div>

      <div className="flex items-center gap-2 px-1">
        <Plane aria-hidden="true" className="h-5 w-5 text-sky-700" />
        <h2 className="text-lg font-semibold">航班</h2>
      </div>
      <div className="space-y-3">
        <FlightCard flight={flights[0]} direction="去程" />
        <FlightCard flight={flights[1]} direction="回程" />
      </div>
    </section>
  );
}

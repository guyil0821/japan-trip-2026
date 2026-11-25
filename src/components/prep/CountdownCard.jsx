import React from "react";
import useCountdown from "../../hooks/useCountdown";

export default function CountdownCard() {
  const countdown = useCountdown();
  const title = countdown.status === "before" ? "距离日本旅行还有" : countdown.status === "during" ? "日本旅行进行中 ❄️" : "日本旅行已结束";
  return <section className="rounded-2xl bg-slate-950 p-5 text-white"><div className="text-sm text-slate-300">日本旅行倒计时</div><h2 className="mt-2 text-lg font-semibold">{title}</h2>{countdown.status === "before" && <div className="mt-4 grid grid-cols-4 gap-2 text-center">{[[countdown.days, "天"], [countdown.hours, "小时"], [countdown.minutes, "分钟"], [countdown.seconds, "秒"]].map(([value, unit]) => <div key={unit} className="rounded-xl bg-white/10 p-2"><div className="text-2xl font-bold tabular-nums">{value}</div><div className="mt-1 text-xs text-slate-300">{unit}</div></div>)}</div>}<div className="mt-3 text-xs text-slate-400">2026-12-16 — 2026-12-23</div></section>;
}

import React, { useState } from "react";
import { ArrowDownRight, Compass, Snowflake } from "lucide-react";
import RunningRoute from "./pages/RunningRoute";
import TripPage from "./pages/TripPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import StayPage from "./pages/StayPage";
import LedgerPage from "./pages/LedgerPage";
import PrepPage from "./pages/PrepPage";
import TodayPage from "./pages/TodayPage";
import TopTabs from "./components/TopTabs";
import BottomNavigation from "./components/BottomNavigation";
import useLocalStorage from "./hooks/useLocalStorage";
import { entryCny } from "./utils/currency";

const pageCopy = {
  today: ["TRAVEL NOTES / 01", "旅のはじまり。", "天气、灵感与当日安排，都在这里。"],
  prep: ["BEFORE DEPARTURE", "旅支度を、少しずつ。", "出发前的准备清单，一项项轻松搞定。"],
  trip: ["THE WINTER ISSUE · 2026", "冬の日本を、めぐる。", "从成田到东京，八天行程与沿途风景。"],
  transport: ["ON THE MOVE", "列車に乗って、北へ。", "车次、换乘与移动计划，随时查看。"],
  stay: ["GOOD NIGHT, JAPAN", "今夜の宿。", "酒店信息和入住安排，触手可及。"],
  run: ["CITY RUN / TOKYO", "朝の東京を走る。", "东京晨跑路线与沿途的小小发现。"],
  budget: ["THE TRIP, IN NUMBERS", "旅の予算。", "预算一目了然，把余裕留给惊喜。"],
  ledger: ["A LITTLE TRAVEL LEDGER", "旅の記録。", "随手记下旅途花费，回头看也清清楚楚。"],
};

export default function App() {
  const [open, setOpen] = useState("12/20");
  const [tab, setTab] = useState("trip");
  const [entries] = useLocalStorage("sybil-japan-ledger", []);
  const grandTotal = entries.reduce((sum, entry) => sum + entryCny(entry), 0);
  const [eyebrow, title, subtitle] = pageCopy[tab] || pageCopy.trip;

  return (
    <div className="app-shell min-h-screen pb-28 text-slate-900">
      <header className="site-header sticky top-0 z-30">
        <div className="site-header-inner">
          <a className="brand-lockup" href="#top" aria-label="Sybil Japan Trip 首页" onClick={() => setTab("today")}>
            <span className="brand-mark"><Compass size={19} strokeWidth={1.7} /></span>
            <span className="brand-name">旅のしおり<small>SYBIL'S JAPAN JOURNAL</small></span>
          </a>
          <div className="header-note"><Snowflake size={14} /> 16 — 23 DECEMBER <span>／</span> 2026</div>
        </div>
        <div className="desktop-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
      </header>

      <main id="top" className="page-wrap">
        <section className="page-intro" aria-label="当前页面介绍">
          <div className="cover-photo" role="img" aria-label="日本冬日街景" />
          <div className="cover-shade" />
          <div className="cover-meta"><span>VOL. 01</span><span>WINTER / 2026</span><span>日本 · 8 DAYS</span></div>
          <div className="intro-copy">
            <div className="eyebrow"><span />{eyebrow}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="intro-route"><span>成田</span><i /><span>青森</span><i /><span>東京</span><ArrowDownRight size={14} /></div>
          <div className="cover-caption">A WINTER JOURNEY THROUGH JAPAN <b>↗</b></div>
        </section>

        <div className="mobile-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
        <div className="content-panel">
          {tab === "trip" && <TripPage open={open} setOpen={setOpen} />}
          {tab === "run" && <RunningRoute />}
          {tab === "budget" && <BudgetPage grandTotal={grandTotal} />}
          {tab === "ledger" && <LedgerPage />}
          {tab === "transport" && <TransportPage />}
          {tab === "stay" && <StayPage setTab={setTab} />}
          {tab === "prep" && <PrepPage />}
          {tab === "today" && <TodayPage setTab={setTab} grandTotal={grandTotal} />}
        </div>
        <footer className="page-footer"><span>SYBIL'S JAPAN JOURNAL <i>—</i> VOL. 01</span><span>東京で、また会いましょう。</span></footer>
      </main>
      <BottomNavigation tab={tab} setTab={setTab} />
    </div>
  );
}

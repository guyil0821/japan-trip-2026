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
  today: ["TRAVEL JOURNAL · 2026", "旅途，从今天开始。", "天气、灵感与当日安排，都在这里。"],
  prep: ["BEFORE YOU GO", "把期待，装进行李。", "出发前的准备清单，一项项轻松搞定。"],
  trip: ["THE ITINERARY", "一路向北，慢慢抵达。", "从成田到东京，把八天的冬日旅程收进一页。"],
  transport: ["GETTING AROUND", "下一站，准时出发。", "车次、换乘与移动计划，随时查看。"],
  stay: ["PLACES TO STAY", "今晚，住进旅途里。", "酒店信息和入住安排，触手可及。"],
  run: ["RUNNING ROUTE", "用脚步，认识一座城。", "东京晨跑路线与沿途的小小发现。"],
  budget: ["TRIP BUDGET", "好好旅行，也好好计划。", "预算一目了然，把余裕留给惊喜。"],
  ledger: ["TRAVEL LEDGER", "每一笔，都有它的故事。", "随手记下旅途花费，回头看也清清楚楚。"],
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
            <span className="brand-mark"><Compass size={21} strokeWidth={1.8} /></span>
            <span className="brand-name">旅のしおり<small>SYBIL · JAPAN 2026</small></span>
          </a>
          <div className="header-note"><Snowflake size={15} /> WINTER EDITION <span>·</span> 12.16 — 12.23</div>
        </div>
        <div className="desktop-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
      </header>

      <main id="top" className="page-wrap">
        <section className="page-intro" aria-label="当前页面介绍">
          <div className="intro-copy">
            <div className="eyebrow"><span />{eyebrow}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="intro-stamp" aria-hidden="true"><span>冬</span><small>JAPAN<br />2026</small></div>
          <div className="intro-route"><span>成田</span><i /><span>青森</span><i /><span>东京</span><ArrowDownRight size={14} /></div>
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
        <footer className="page-footer"><span>SYBIL'S TRAVEL JOURNAL</span><span>東京で、また会いましょう。</span></footer>
      </main>
      <BottomNavigation tab={tab} setTab={setTab} />
    </div>
  );
}

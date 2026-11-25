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
  today: ["TODAY'S LITTLE ADVENTURE", "今天也要元气满满！", "天气、灵感与当日安排，都在这里。"],
  prep: ["PACKING PARTY", "出发前，准备好啦！", "出发前的准备清单，一项项轻松搞定。"],
  trip: ["WINTER TRIP · 2026", "冬の日本、ふわっと旅。", "成田出发，一路收集可爱的冬日小确幸。"],
  transport: ["CHOO-CHOO JOURNAL", "下一站，坐好咯！", "车次、换乘与移动计划，随时查看。"],
  stay: ["GOOD NIGHT, SWEET DREAMS", "今晚睡得甜甜的。", "酒店信息和入住安排，触手可及。"],
  run: ["GOOD MORNING, TOKYO", "晨跑也要开心跑！", "东京晨跑路线与沿途的小小发现。"],
  budget: ["MONEY CHECK", "预算别哭，要乖乖！", "预算一目了然，把余裕留给惊喜。"],
  ledger: ["TINY TRAVEL LEDGER", "每笔花费都有回忆。", "随手记下旅途花费，回头看也清清楚楚。"],
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
            <span className="brand-mark"><Compass size={18} strokeWidth={2.2} /></span>
            <span className="brand-name">旅のしおり<small>SYBIL'S HAPPY JOURNEY</small></span>
          </a>
          <div className="header-note"><Snowflake size={14} /> 12.16 — 12.23 <span>·</span> 2026</div>
        </div>
        <div className="desktop-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
      </header>

      <main id="top" className="page-wrap">
        <section className="page-intro" aria-label="当前页面介绍">
          <div className="cover-meta"><span>TRIP MEMO</span><span>VOL. 01</span><span>✿ JAPAN</span></div>
          <div className="intro-copy">
            <div className="eyebrow"><span />{eyebrow}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="intro-route"><span>成田</span><i /><span>青森</span><i /><span>東京</span><ArrowDownRight size={14} /></div>
          <div className="cover-caption">LET'S GO! <b>♥</b></div>
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
        <footer className="page-footer"><span>SYBIL'S HAPPY JOURNEY <i>·</i> WINTER 2026</span><span>楽しく行こうね ♡</span></footer>
      </main>
      <BottomNavigation tab={tab} setTab={setTab} />
    </div>
  );
}

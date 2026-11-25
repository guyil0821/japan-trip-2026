import React, { useState } from "react";
import { CalendarDays, Snowflake } from "lucide-react";
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

const pageLabels = {
  today: ["今日", "旅途的每一天，都值得好好记录。"],
  prep: ["出发准备", "收拾好心情，也收拾好行李。"],
  trip: ["行程", "八天冬日旅程，从这里开始。"],
  transport: ["交通", "下一程，轻松抵达。"],
  stay: ["住宿", "旅途中的安心落脚处。"],
  run: ["晨跑路线", "用自己的步调认识东京。"],
  budget: ["旅行预算", "计划开销，也留一点空间给惊喜。"],
  ledger: ["花费记录", "旅途中每一笔，都清清楚楚。"],
};

export default function App() {
  const [open, setOpen] = useState("12/20");
  const [tab, setTab] = useState("trip");
  const [entries] = useLocalStorage("sybil-japan-ledger", []);
  const grandTotal = entries.reduce((sum, entry) => sum + entryCny(entry), 0);
  const [title, subtitle] = pageLabels[tab] || pageLabels.trip;

  return <div className="ios-app min-h-screen pb-28 text-slate-900">
    <header className="ios-header sticky top-0 z-30">
      <div className="ios-header-inner">
        <a className="ios-brand" href="#top" onClick={() => setTab("today")} aria-label="返回旅程首页">
          <span className="ios-brand-icon"><Snowflake size={17} /></span>
          <span><strong>Sybil 的日本之旅</strong><small>JAPAN · DEC 16—23, 2026</small></span>
        </a>
        <span className="ios-date-pill"><CalendarDays size={14} /> 8 天</span>
      </div>
      <div className="ios-desktop-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
    </header>

    <main id="top" className="ios-main">
      <section className="ios-page-heading">
        <div className="ios-eyebrow">冬日旅行 <span>·</span> 2026</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
      <div className="ios-mobile-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
      <div className="ios-content">
        {tab === "trip" && <TripPage open={open} setOpen={setOpen} />}
        {tab === "run" && <RunningRoute />}
        {tab === "budget" && <BudgetPage grandTotal={grandTotal} />}
        {tab === "ledger" && <LedgerPage />}
        {tab === "transport" && <TransportPage />}
        {tab === "stay" && <StayPage setTab={setTab} />}
        {tab === "prep" && <PrepPage />}
        {tab === "today" && <TodayPage setTab={setTab} grandTotal={grandTotal} />}
      </div>
      <footer className="ios-footer">Made for a little winter journey <span>✳</span></footer>
    </main>
    <BottomNavigation tab={tab} setTab={setTab} />
  </div>;
}

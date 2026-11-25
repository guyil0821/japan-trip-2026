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
  today: ["TODAY'S JOURNEY", "今日の旅。", "天气、灵感与当天安排，井然有序。"],
  prep: ["BEFORE DEPARTURE", "出发之前。", "按步骤整理准备事项，轻松踏上旅程。"],
  trip: ["WINTER JOURNEY · 2026", "冬の日本を、ゆるりと。", "成田出发，沿着雪与温泉，收集旅途中的小确幸。"],
  transport: ["ON THE MOVE", "下一站，继续前行。", "车次、换乘与移动安排，一处查看。"],
  stay: ["STAY TONIGHT", "今夜の宿。", "酒店位置与入住信息，整理得清清楚楚。"],
  run: ["TOKYO MORNING RUN", "朝の東京を走る。", "晨跑路线与沿途可看的风景。"],
  budget: ["TRIP BUDGET", "旅の予算。", "预算与支出保持清醒，也给惊喜留一点余地。"],
  ledger: ["TRAVEL LEDGER", "旅の記録。", "记下旅途花费，也记下每一笔来过的痕迹。"],
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
            <span className="brand-mark"><Compass size={18} strokeWidth={1.8} /></span>
            <span className="brand-name">旅のしおり<small>SYBIL'S JAPAN JOURNAL</small></span>
          </a>
          <div className="header-note"><Snowflake size={14} /> 12.16 — 12.23 <span>·</span> 2026</div>
        </div>
        <div className="desktop-tabs"><TopTabs tab={tab} setTab={setTab} /></div>
      </header>

      <main id="top" className="page-wrap">
        <section className="page-intro" aria-label="当前页面介绍">
          <div className="cover-meta"><span>TRIP NOTE</span><span>VOL. 01</span><span>冬 · JAPAN</span></div>
          <div className="intro-copy">
            <div className="eyebrow"><span />{eyebrow}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="intro-route"><span>成田</span><i /><span>青森</span><i /><span>東京</span><ArrowDownRight size={14} /></div>
          <div className="cover-caption">WINTER IN JAPAN <b>✿</b></div>
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
        <footer className="page-footer"><span>SYBIL'S JAPAN JOURNAL <i>·</i> WINTER 2026</span><span>気をつけて、楽しんで。✿</span></footer>
      </main>
      <BottomNavigation tab={tab} setTab={setTab} />
    </div>
  );
}

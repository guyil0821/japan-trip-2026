import React from "react";

const tabs = [["today", "今日"], ["prep", "准备"], ["trip", "行程"], ["transport", "交通"], ["stay", "住宿"], ["run", "跑步"], ["budget", "预算"], ["ledger", "记账"]];

export default function TopTabs({ tab, setTab }) {
  return <nav className="ios-tabs" aria-label="旅行页面导航">
    {tabs.map(([key, label]) => <button key={key} type="button" onClick={() => setTab(key)} className={tab === key ? "is-active" : ""} aria-current={tab === key ? "page" : undefined}>{label}</button>)}
  </nav>;
}

import React, { useEffect, useState } from "react";
import { CalendarDays, MapPin, WalletCards, Trash2, RefreshCw, Plane, Hotel, Train, ShieldCheck, Wifi, Ticket, ShoppingBag, Utensils, Coffee, Bus, Gift, CircleEllipsis } from "lucide-react";
import { motion } from "framer-motion";

const days = [
  { date: "12/16", city: "成田", title: "上海 → 成田", items: ["抵达日本，入住成田区域酒店", "准备次日启用 JR EAST–SOUTH HOKKAIDO RAIL PASS"] },
  { date: "12/17", city: "青森", title: "成田 → 东京 → 青森", items: ["成田机场 → 东京：N'EX", "东京 → 新青森：东北新干线 Hayabusa", "入住青森 ReLabo"] },
  { date: "12/18", city: "函馆", title: "函馆一日往返", items: ["青森 → 新青森 → 新函馆北斗", "函馆一日游", "当天返回青森"] },
  { date: "12/19", city: "青森 → 川崎", title: "八甲田雪景 + 南下关东", items: ["八甲田 / 酸汤方向，按天气决定", "下午回酒店取行李，乘新干线前往川崎"] },
  { date: "12/20", city: "横滨 → 两国", title: "横滨：先观光，后购物", items: ["港未来、红砖仓库、山下公园", "傍晚返回东京"] },
  { date: "12/21", city: "东京", title: "晨跑 + 东京主购物日", items: ["上野公园晨跑", "原宿、表参道、涩谷购物"] },
  { date: "12/22", city: "东京 → 成田", title: "运动户外补漏 + 成田", items: ["新宿购物收尾", "前往成田入住"] },
  { date: "12/23", city: "上海", title: "成田 → 上海", items: ["酒店接驳前往成田机场", "返程上海"] },
];
const categories = {
  pre: [{ n: "机票", Icon: Plane }, { n: "酒店", Icon: Hotel }, { n: "JR Pass / 车票", Icon: Train }, { n: "签证 / 保险", Icon: ShieldCheck }, { n: "电话卡 / eSIM", Icon: Wifi }, { n: "门票 / 预约", Icon: Ticket }, { n: "购物", Icon: ShoppingBag }, { n: "其他", Icon: CircleEllipsis }],
  trip: [{ n: "餐饮", Icon: Utensils }, { n: "咖啡 / 小吃", Icon: Coffee }, { n: "交通", Icon: Bus }, { n: "购物", Icon: ShoppingBag }, { n: "伴手礼", Icon: Gift }, { n: "门票 / 体验", Icon: Ticket }, { n: "其他", Icon: CircleEllipsis }],
};
const rateApi = (date) => `https://api.frankfurter.app/${date}?from=JPY&to=CNY`;
const money = (value, currency = "CNY") => new Intl.NumberFormat("zh-CN", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number(value) || 0);
const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [tab, setTab] = useState("trip");
  const [phase, setPhase] = useState("pre");
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateMessage, setRateMessage] = useState("");
  const [openDay, setOpenDay] = useState("12/20");

  useEffect(() => {
    try { const saved = localStorage.getItem("sybil-japan-ledger"); if (saved) setEntries(JSON.parse(saved)); } catch { /* Ignore malformed local data. */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("sybil-japan-ledger", JSON.stringify(entries)); } catch { /* Storage may be unavailable. */ }
  }, [entries]);

  const visible = entries.filter((entry) => entry.phase === phase);
  const totalCny = (list) => list.reduce((sum, entry) => sum + (entry.currency === "JPY" ? Number(entry.amount) * Number(entry.rate || 0) : Number(entry.amount)), 0);
  const phaseTotal = totalCny(visible);
  const grandTotal = totalCny(entries);
  const formatCny = (value) => money(value, "CNY");

  const fetchRate = async (date) => {
    if (!date) return;
    setRateLoading(true);
    setRateMessage("正在查询该日期的日元兑人民币参考汇率…");
    try {
      const response = await fetch(rateApi(date));
      if (!response.ok) throw new Error("该日期的汇率暂不可用");
      const data = await response.json();
      const rate = data?.rates?.CNY;
      if (!Number.isFinite(rate) || rate <= 0) throw new Error("未获得有效汇率");
      setDraft((current) => current ? { ...current, rate: String(rate), rateDate: data.date || date } : current);
      setRateMessage(`已填入 ${data.date || date} 的参考汇率；保存后将固定使用此汇率。`);
    } catch (error) {
      setRateMessage(`${error.message}。可以稍后重试，或手动填写消费当天的中间价。`);
    } finally { setRateLoading(false); }
  };

  const startDraft = (category) => {
    const date = today();
    setDraft({ phase, category, amount: "", currency: "CNY", date, rate: "", rateDate: date, note: "" });
    setRateMessage("");
  };
  const updateCurrency = (currency) => {
    setDraft((current) => ({ ...current, currency, rate: "", rateDate: current.date }));
    setRateMessage(currency === "JPY" ? "请选择消费日期后查询当日汇率，或手动填写。" : "");
  };
  const updateDate = (date) => {
    setDraft((current) => ({ ...current, date, rateDate: date, ...(current.currency === "JPY" ? { rate: "" } : {}) }));
    if (draft?.currency === "JPY") setRateMessage("日期已更改，请重新查询该日汇率或手动填写。");
  };
  const addEntry = () => {
    const amount = Number(draft?.amount);
    const rate = draft?.currency === "JPY" ? Number(draft.rate) : null;
    if (!draft || !Number.isFinite(amount) || amount <= 0 || (draft.currency === "JPY" && (!Number.isFinite(rate) || rate <= 0))) return;
    setEntries((current) => [{ ...draft, amount, rate, id: `${Date.now()}-${Math.random()}` }, ...current]);
    setDraft(null);
    setRateMessage("");
  };

  return <div className="min-h-screen bg-[#f7f5f1] text-slate-900 pb-28">
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f5f1]/90 backdrop-blur-xl"><div className="mx-auto max-w-3xl px-4 py-3 flex justify-between items-center"><div><div className="text-[11px] uppercase tracking-widest text-slate-500">Japan · Dec 2026</div><h1 className="font-semibold">Sybil 的日本旅行</h1></div><span className="text-xs text-slate-500">12/16 — 12/23</span></div></header>
    <main className="mx-auto max-w-3xl px-4 pt-5">
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-white p-1 border text-xs">{[["trip", "行程"], ["budget", "预算"], ["ledger", "实际花费"], ["transport", "交通"]].map(([key, label]) => <button key={key} onClick={() => setTab(key)} className={`rounded-lg py-2 ${tab === key ? "bg-slate-900 text-white" : "text-slate-500"}`}>{label}</button>)}</div>
      {tab === "trip" && <section className="space-y-3 mt-4">{days.map((day) => <article key={day.date} className="rounded-2xl border border-black/5 bg-white overflow-hidden"><button onClick={() => setOpenDay(openDay === day.date ? "" : day.date)} className="w-full p-4 text-left flex gap-3 items-center"><span className="w-12 text-center"><span className="block text-[10px] text-slate-400">DEC</span><b>{day.date.split("/")[1]}</b></span><span className="flex-1"><span className="text-xs text-sky-700 flex gap-1"><MapPin className="w-3 h-3" />{day.city}</span><b className="block mt-1">{day.title}</b></span><span className="text-slate-400">{openDay === day.date ? "−" : "+"}</span></button>{openDay === day.date && <div className="px-4 pb-4 pl-[4.75rem] text-sm text-slate-600 space-y-1">{day.items.map((item) => <p key={item}>• {item}</p>)}</div>}</article>)}</section>}
      {tab === "budget" && <section className="mt-4 space-y-4"><div className="rounded-2xl bg-slate-950 text-white p-5"><p className="text-sm text-slate-300">实际花费（折合人民币）</p><p className="text-3xl font-semibold mt-2">{formatCny(grandTotal)}</p><p className="text-xs text-slate-400 mt-2">日元消费按每笔记录保存的消费日汇率折算</p></div><div className="grid grid-cols-2 gap-3">{[["行前花费", totalCny(entries.filter((e) => e.phase === "pre"))], ["旅行花费", totalCny(entries.filter((e) => e.phase === "trip"))]].map(([label, amount]) => <div key={label} className="rounded-2xl bg-white border p-4"><p className="text-xs text-slate-500">{label}</p><b className="block mt-2 text-xl">{formatCny(amount)}</b></div>)}</div></section>}
      {tab === "ledger" && <section className="mt-4 space-y-4">
        <div className="rounded-2xl bg-slate-950 text-white p-5"><div className="flex items-center gap-2 text-sm text-slate-300"><WalletCards className="w-4 h-4" />实际花费累计（人民币）</div><div className="text-3xl font-semibold mt-2">{formatCny(grandTotal)}</div><p className="text-xs text-slate-400 mt-2">日元账目按消费日期的参考汇率折算</p></div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white border p-1">{[["pre", "行前花费"], ["trip", "旅行花费"]].map(([key, label]) => <button key={key} onClick={() => { setPhase(key); setDraft(null); }} className={`rounded-xl py-2.5 text-sm ${phase === key ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>{label}</button>)}</div>
        <div className="flex justify-between items-end"><div><h2 className="font-semibold">{phase === "pre" ? "行前花费记录" : "旅行花费记录"}</h2><p className="text-xs text-slate-500 mt-1">本组折合 {formatCny(phaseTotal)}</p></div><span className="text-xs text-slate-400">{visible.length} 笔</span></div>
        <div className="grid grid-cols-4 gap-2">{categories[phase].map(({ n, Icon }) => <button key={n} onClick={() => startDraft(n)} className="min-h-20 rounded-2xl border bg-white p-2 flex flex-col items-center justify-center gap-2 text-[11px] text-slate-600"><Icon className="w-5 h-5" />{n}</button>)}</div>
        {draft && <div className="rounded-2xl bg-white border p-4"><div className="font-semibold">新增：{draft.category}</div>
          <fieldset className="mt-3"><legend className="text-xs text-slate-500 mb-2">选择记账币种</legend><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={draft.currency === "CNY"} onClick={() => updateCurrency("CNY")} className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold ${draft.currency === "CNY" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}>人民币 CNY</button><button type="button" aria-pressed={draft.currency === "JPY"} onClick={() => updateCurrency("JPY")} className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold ${draft.currency === "JPY" ? "border-sky-600 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600"}`}>日元 JPY</button></div></fieldset>
          <div className="grid grid-cols-2 gap-2 mt-3"><label className="text-xs text-slate-500">消费金额（{draft.currency === "JPY" ? "日元 JPY" : "人民币 CNY"}）<input inputMode="decimal" placeholder={draft.currency === "JPY" ? "请输入日元金额" : "请输入人民币金额"} value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value.replace(/[^0-9.]/g, "") })} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label><label className="text-xs text-slate-500">消费日期<input type="date" value={draft.date} onChange={(e) => updateDate(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label>
          {draft.currency === "JPY" && <label className="text-xs text-slate-500">消费日汇率（1 JPY = ? CNY）<input inputMode="decimal" placeholder="例如 0.048" value={draft.rate} onChange={(e) => { setDraft({ ...draft, rate: e.target.value.replace(/[^0-9.]/g, ""), rateDate: draft.date }); setRateMessage("手动汇率将作为本笔账目的固定汇率保存。"); }} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label>}
          </div>
          {draft.currency === "JPY" && <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900"><p>日元金额按消费当天的 JPY/CNY 参考中间价折算，汇率会固定保存在这笔记录中。</p><button disabled={rateLoading || !draft.date} onClick={() => fetchRate(draft.date)} className="mt-2 inline-flex items-center gap-1 rounded-lg bg-white border px-3 py-2 disabled:opacity-50"><RefreshCw className={`w-3 h-3 ${rateLoading ? "animate-spin" : ""}`} />{rateLoading ? "查询中…" : "查询消费日汇率"}</button>{rateMessage && <p className="mt-2">{rateMessage}</p>}</div>}
          <input placeholder="备注（可选）" value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} className="mt-3 w-full rounded-xl border px-3 py-2 text-sm" />
          {draft.currency === "JPY" && Number(draft.amount) > 0 && Number(draft.rate) > 0 && <p className="mt-2 text-sm text-slate-600">折合人民币：<b>{formatCny(Number(draft.amount) * Number(draft.rate))}</b></p>}
          <div className="flex gap-2 mt-3"><button onClick={() => setDraft(null)} className="flex-1 rounded-xl bg-slate-100 py-2 text-sm">取消</button><button onClick={addEntry} disabled={!Number(draft.amount) || (draft.currency === "JPY" && !Number(draft.rate))} className="flex-1 rounded-xl bg-slate-900 text-white py-2 text-sm disabled:opacity-40">保存记录</button></div></div>}
        <div className="space-y-2">{visible.length === 0 ? <div className="rounded-2xl border border-dashed p-7 text-center text-sm text-slate-400">还没有记录，选择上方类别添加一笔</div> : visible.map((entry) => <motion.div layout key={entry.id} className="rounded-2xl bg-white border p-3 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-slate-500" /></div><div className="flex-1 min-w-0"><div className="font-medium text-sm">{entry.category}</div><div className="text-xs text-slate-500 mt-1">{entry.date}{entry.note ? ` · ${entry.note}` : ""}</div>{entry.currency === "JPY" && <div className="text-xs text-slate-400 mt-1">{money(entry.amount, "JPY")} · 1 JPY = {Number(entry.rate).toFixed(6)} CNY（{entry.rateDate || entry.date}）</div>}</div><div className="text-right"><b className="text-sm">{formatCny(entry.currency === "JPY" ? entry.amount * entry.rate : entry.amount)}</b>{entry.currency === "JPY" && <div className="text-[10px] text-slate-400">{money(entry.amount, "JPY")}</div>}</div><button aria-label="删除记录" onClick={() => setEntries((current) => current.filter((item) => item.id !== entry.id))} className="p-2 text-slate-400"><Trash2 className="w-4 h-4" /></button></motion.div>)}</div>
      </section>}
      {tab === "transport" && <section className="mt-4 space-y-3"><div className="rounded-2xl bg-sky-50 border border-sky-200 p-4"><b>交通安排</b><p className="text-sm text-slate-600 mt-1">出发前请查询 JR 东日本及当地交通的实时运行信息。</p></div>{days.filter((day) => ["12/17", "12/18", "12/19", "12/20", "12/22"].includes(day.date)).map((day) => <div key={day.date} className="rounded-2xl bg-white border p-4"><b className="text-xs bg-slate-900 text-white rounded-lg px-2 py-1">{day.date}</b><h3 className="font-medium mt-3">{day.title}</h3><p className="text-sm text-slate-500 mt-1">{day.items[0]}</p></div>)}</section>}
    </main>
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-md rounded-2xl bg-white/95 backdrop-blur border shadow-lg p-2 grid grid-cols-4 text-[11px]">{[["trip", "行程", CalendarDays], ["budget", "预算", ShoppingBag], ["ledger", "实际花费", WalletCards], ["transport", "交通", Train]].map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className={`py-1 ${tab === key ? "text-sky-700" : "text-slate-500"}`}><Icon className="w-5 h-5 mx-auto mb-1" />{label}</button>)}</nav>
  </div>;
}

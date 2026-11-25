import React, { useState } from "react";
import { CalendarDays, ReceiptText, Plus, Trash2, RefreshCw } from "lucide-react";
import { categories } from "../data/categories";
import { RATE_API } from "../data/constants";
import useLocalStorage from "../hooks/useLocalStorage";
import { today } from "../utils/dates";
import { money, cny, entryCny } from "../utils/currency";
import LedgerSummary from "../components/ledger/LedgerSummary";

export default function LedgerPage() {
  const [bookTab, setBookTab] = useState("pre");
  const [entries, setEntries] = useLocalStorage("sybil-japan-ledger", []);
  const [draft, setDraft] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateMessage, setRateMessage] = useState("");

  const visible = entries.filter(entry => (entry.phase || "pre") === bookTab);
  const phaseTotal = visible.reduce((sum, entry) => sum + entryCny(entry), 0);
  const grandTotal = entries.reduce((sum, entry) => sum + entryCny(entry), 0);

  const startDraft = category => {
    const date = today();
    setDraft({ phase: bookTab, category, amount: "", currency: "CNY", date, rate: "", rateDate: date, note: "" });
    setRateMessage("");
  };

  const changeCurrency = currency => {
    setDraft(current => ({ ...current, currency, rate: "", rateDate: current.date }));
    setRateMessage(currency === "JPY" ? "请查询消费当天的参考汇率，或手动输入中间价" : "");
  };

  const changeDate = date => {
    setDraft(current => ({ ...current, date, rateDate: date, rate: current.currency === "JPY" ? "" : current.rate }));
    if (draft?.currency === "JPY") setRateMessage("消费日期已变更，请重新查询汇率");
  };

  const getRate = async () => {
    if (!draft?.date) return;
    setRateLoading(true);
    setRateMessage("正在查询消费日汇率…");
    try {
      const response = await fetch(RATE_API(draft.date));
      if (!response.ok) throw Error("汇率查询失败");
      const data = await response.json();
      const rate = data?.rates?.CNY;
      if (!Number.isFinite(rate) || rate <= 0) throw Error("未获得有效汇率");
      setDraft(current => ({ ...current, rate: String(rate), rateDate: data.date || current.date }));
      setRateMessage(`已按 ${data.date || draft.date} 的人民币汇率换算`);
    } catch (error) {
      setRateMessage(`${error.message}，请检查网络或手动输入汇率`);
    } finally {
      setRateLoading(false);
    }
  };

  const addEntry = () => {
    const amount = Number(draft?.amount);
    const rate = draft?.currency === "JPY" ? Number(draft.rate) : null;
    if (!draft || !Number.isFinite(amount) || amount <= 0 || (draft.currency === "JPY" && (!Number.isFinite(rate) || rate <= 0))) return;
    setEntries(current => [{ ...draft, amount, rate, id: Date.now() + Math.random() }, ...current]);
    setDraft(null);
    setRateMessage("");
  };

  return <section className="space-y-4"><LedgerSummary grandTotal={grandTotal} /><div className="grid grid-cols-2 rounded-2xl border bg-white p-1">{[["pre", "出发前花费"], ["trip", "旅行中花费"]].map(([key, label]) => <button key={key} onClick={() => { setBookTab(key); setDraft(null); }} className={`rounded-xl py-2.5 text-sm ${bookTab === key ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>{label}</button>)}</div><div className="flex items-end justify-between"><div><h2 className="font-semibold">{bookTab === "pre" ? "出发前花费" : "旅行中花费"}</h2><p className="mt-1 text-xs text-slate-500">本阶段累计：{cny(phaseTotal)}</p></div><span className="text-xs text-slate-400">{visible.length} 笔</span></div><div className="grid grid-cols-4 gap-2">{categories[bookTab].map(({ n, Icon }) => <button key={n} onClick={() => startDraft(n)} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-2 text-[11px]"><Icon className="h-5 w-5" />{n}</button>)}</div>
    {draft && <div className="rounded-2xl border bg-white p-4"><div className="flex items-center gap-2 font-semibold"><ReceiptText className="h-4 w-4" />新增：{draft.category}</div><div className="mt-3"><div className="mb-2 text-xs text-slate-500">币种</div><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={draft.currency === "CNY"} onClick={() => changeCurrency("CNY")} className={`rounded-xl border-2 py-3 text-sm font-semibold ${draft.currency === "CNY" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}>人民币 CNY</button><button type="button" aria-pressed={draft.currency === "JPY"} onClick={() => changeCurrency("JPY")} className={`rounded-xl border-2 py-3 text-sm font-semibold ${draft.currency === "JPY" ? "border-sky-600 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600"}`}>日元 JPY</button></div></div><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs text-slate-500">金额（{draft.currency}）<input inputMode="decimal" placeholder={draft.currency === "JPY" ? "例如 1200" : "请输入人民币金额"} value={draft.amount} onChange={event => setDraft(current => ({ ...current, amount: event.target.value.replace(/[^0-9.]/g, "") }))} className="mt-1 w-full rounded-xl border px-3 py-2 text-base text-slate-900" /></label><label className="text-xs text-slate-500">消费日期<input type="date" value={draft.date} onChange={event => changeDate(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label></div>{draft.currency === "JPY" && <div className="mt-3 rounded-xl bg-amber-50 p-3"><p className="text-xs text-amber-900">请按消费日期查询参考汇率，或手动输入中间价。汇率为 1 JPY = ? CNY（人民币/日元）。</p><label className="mt-3 block text-xs text-slate-600">人民币汇率<input inputMode="decimal" placeholder="例如 0.048" value={draft.rate} onChange={event => { setDraft(current => ({ ...current, rate: event.target.value.replace(/[^0-9.]/g, ""), rateDate: current.date })); setRateMessage("已手动输入汇率"); }} className="mt-1 w-full rounded-xl border px-3 py-2 text-sm text-slate-900" /></label><button type="button" disabled={rateLoading || !draft.date} onClick={getRate} className="mt-2 inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs disabled:opacity-50"><RefreshCw className={`h-3 w-3 ${rateLoading ? "animate-spin" : ""}`} />{rateLoading ? "查询中…" : "查询消费日汇率"}</button>{rateMessage && <p className="mt-2 text-xs text-amber-900">{rateMessage}</p>}{Number(draft.amount) > 0 && Number(draft.rate) > 0 && <p className="mt-2 text-sm">折合人民币：<b>¥{money(Number(draft.amount) * Number(draft.rate))}</b></p>}</div>}<input placeholder="备注（可选）" value={draft.note} onChange={event => setDraft(current => ({ ...current, note: event.target.value }))} className="mt-3 w-full rounded-xl border px-3 py-2 text-sm" /><div className="mt-3 flex gap-2"><button onClick={() => setDraft(null)} className="flex-1 rounded-xl bg-slate-100 py-2">取消</button><button onClick={addEntry} disabled={!Number(draft.amount) || (draft.currency === "JPY" && !Number(draft.rate))} className="flex-1 rounded-xl bg-slate-900 py-2 text-white disabled:opacity-40"><Plus className="mr-1 inline h-4 w-4" />保存</button></div></div>}
    <div className="space-y-2">{visible.length === 0 ? <div className="rounded-2xl border border-dashed p-7 text-center text-sm text-slate-400">还没有记录，选择上方类别添加一笔</div> : visible.map(entry => <div key={entry.id} className="flex items-center gap-3 rounded-2xl border bg-white p-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100"><CalendarDays className="h-5 w-5 text-slate-500" /></div><div className="min-w-0 flex-1"><div className="text-sm font-medium">{entry.category}</div><div className="mt-1 text-xs text-slate-500">{entry.date}{entry.note ? ` · ${entry.note}` : ""}</div>{entry.currency === "JPY" && <div className="mt-1 text-xs text-slate-400">¥{money(entry.amount)} JPY · 1 JPY = {Number(entry.rate).toFixed(6)} CNY（{entry.rateDate || entry.date}）</div>}</div><div className="text-right"><b className="text-sm">¥{money(entry.currency === "JPY" ? Number(entry.amount) * Number(entry.rate) : entry.amount)}</b>{entry.currency === "JPY" && <div className="text-[10px] text-slate-400">¥{money(entry.amount)} JPY</div>}</div><button aria-label="删除记录" onClick={() => setEntries(current => current.filter(item => item.id !== entry.id))} className="p-2 text-slate-400"><Trash2 className="h-4 w-4" /></button></div>)}</div></section>;
}

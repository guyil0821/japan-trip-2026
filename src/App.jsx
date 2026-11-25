import React, { useState } from "react";
import { Snowflake } from "lucide-react";
import { RATE_API } from "./data/constants";
import RunningRoute from "./pages/RunningRoute";
import TripPage from "./pages/TripPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import LedgerPage from "./pages/LedgerPage";
import TopTabs from "./components/TopTabs";
import BottomNavigation from "./components/BottomNavigation";
import useLocalStorage from "./hooks/useLocalStorage";
import { today } from "./utils/dates";
import { cny, entryCny } from "./utils/currency";

export default function App() {
  const [open, setOpen] = useState("12/20"), [tab, setTab] = useState("trip"), [bookTab, setBookTab] = useState("pre"), [entries, setEntries] = useLocalStorage("sybil-japan-ledger", []), [draft, setDraft] = useState(null), [updated, setUpdated] = useState(new Date()), [rateLoading, setRateLoading] = useState(false), [rateMessage, setRateMessage] = useState("");
  const visible = entries.filter(e => (e.phase || "pre") === bookTab), phaseTotal = visible.reduce((s, e) => s + entryCny(e), 0), grandTotal = entries.reduce((s, e) => s + entryCny(e), 0);
  const startDraft = category => { const date = today(); setDraft({ phase: bookTab, category, amount: "", currency: "CNY", date, rate: "", rateDate: date, note: "" }); setRateMessage(""); };
  const changeCurrency = currency => { setDraft(d => ({ ...d, currency, rate: "", rateDate: d.date })); setRateMessage(currency === "JPY" ? "请查询消费当天的参考汇率，或手动输入中间价" : ""); };
  const changeDate = date => { setDraft(d => ({ ...d, date, rateDate: date, rate: d.currency === "JPY" ? "" : d.rate })); if (draft?.currency === "JPY") setRateMessage("消费日期已变更，请重新查询汇率"); };
  const getRate = async () => { if (!draft?.date) return; setRateLoading(true); setRateMessage("正在查询消费日汇率…"); try { const response = await fetch(RATE_API(draft.date)); if (!response.ok) throw Error("汇率查询失败"); const data = await response.json(); const rate = data?.rates?.CNY; if (!Number.isFinite(rate) || rate <= 0) throw Error("未获得有效汇率"); setDraft(d => ({ ...d, rate: String(rate), rateDate: data.date || d.date })); setRateMessage(`已按 ${data.date || draft.date} 的人民币汇率换算`); } catch (error) { setRateMessage(`${error.message}，请检查网络或手动输入汇率`); } finally { setRateLoading(false); } };
  const addEntry = () => { const amount = Number(draft?.amount), rate = draft?.currency === "JPY" ? Number(draft.rate) : null; if (!draft || !Number.isFinite(amount) || amount <= 0 || (draft.currency === "JPY" && (!Number.isFinite(rate) || rate <= 0))) return; setEntries(es => [{ ...draft, amount, rate, id: Date.now() + Math.random() }, ...es]); setDraft(null); setRateMessage(""); };

  return <div className="min-h-screen bg-[#f7f5f1] pb-28 text-slate-900"><header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f5f1]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-3xl justify-between px-4 py-3"><div><div className="text-[11px] uppercase tracking-widest text-slate-500">Japan · Dec 2026</div><h1 className="font-semibold">Sybil 的日本旅行</h1></div><Snowflake className="h-5 w-5 text-sky-600" /></div></header>
    <main className="mx-auto max-w-3xl px-4 pt-5"><TopTabs tab={tab} setTab={setTab} />
      {tab === "trip" && <TripPage open={open} setOpen={setOpen} />}
      {tab === "run" && <RunningRoute />}
      {tab === "budget" && <BudgetPage grandTotal={grandTotal} />}
      {tab === "ledger" && <LedgerPage bookTab={bookTab} setBookTab={setBookTab} entries={entries} setEntries={setEntries} visible={visible} phaseTotal={phaseTotal} grandTotal={grandTotal} draft={draft} setDraft={setDraft} rateLoading={rateLoading} rateMessage={rateMessage} startDraft={startDraft} changeCurrency={changeCurrency} changeDate={changeDate} getRate={getRate} addEntry={addEntry} />}
      {tab === "transport" && <TransportPage />}
    </main><BottomNavigation tab={tab} setTab={setTab} />
  </div>;
}

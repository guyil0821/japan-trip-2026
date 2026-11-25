import React, { useState } from "react";
import { Snowflake } from "lucide-react";
import RunningRoute from "./pages/RunningRoute";
import TripPage from "./pages/TripPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import LedgerPage from "./pages/LedgerPage";
import TopTabs from "./components/TopTabs";
import BottomNavigation from "./components/BottomNavigation";
import useExpenseLedger from "./hooks/useExpenseLedger";

export default function App() {
  const [open, setOpen] = useState("12/20"), [tab, setTab] = useState("trip");
  const {
    bookTab,
    setBookTab,
    entries,
    setEntries,
    visible,
    phaseTotal,
    grandTotal,
    draft,
    setDraft,
    rateLoading,
    rateMessage,
    startDraft,
    changeCurrency,
    changeDate,
    getRate,
    addEntry,
  } = useExpenseLedger();

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

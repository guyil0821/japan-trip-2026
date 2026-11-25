import React, { useState } from "react";
import { Snowflake } from "lucide-react";
import RunningRoute from "./pages/RunningRoute";
import TripPage from "./pages/TripPage";
import BudgetPage from "./pages/BudgetPage";
import TransportPage from "./pages/TransportPage";
import LedgerPage from "./pages/LedgerPage";
import PrepPage from "./pages/PrepPage";
import TopTabs from "./components/TopTabs";
import BottomNavigation from "./components/BottomNavigation";
import useExpenseLedger from "./hooks/useExpenseLedger";

export default function App() {
  const [open, setOpen] = useState("12/20"), [tab, setTab] = useState("trip");
  const ledger = useExpenseLedger();

  return <div className="min-h-screen bg-[#f7f5f1] pb-28 text-slate-900"><header className="sticky top-0 z-30 border-b border-black/5 bg-[#f7f5f1]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-3xl justify-between px-4 py-3"><div><div className="text-[11px] uppercase tracking-widest text-slate-500">Japan · Dec 2026</div><h1 className="font-semibold">Sybil 的日本旅行</h1></div><Snowflake className="h-5 w-5 text-sky-600" /></div></header>
    <main className="mx-auto max-w-3xl px-4 pt-5"><TopTabs tab={tab} setTab={setTab} />
      {tab === "trip" && <TripPage open={open} setOpen={setOpen} />}
      {tab === "run" && <RunningRoute />}
      {tab === "budget" && <BudgetPage grandTotal={ledger.grandTotal} />}
      {tab === "ledger" && <LedgerPage {...ledger} />}
      {tab === "transport" && <TransportPage />}
      {tab === "prep" && <PrepPage />}
    </main><BottomNavigation tab={tab} setTab={setTab} />
  </div>;
}

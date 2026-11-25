import { useState } from "react";
import { RATE_API } from "../data/constants";
import useLocalStorage from "./useLocalStorage";
import { today } from "../utils/dates";
import { entryCny } from "../utils/currency";

export default function useExpenseLedger() {
  const [bookTab, setBookTab] = useState("pre");
  const [entries, setEntries] = useLocalStorage("sybil-japan-ledger", []);
  const [draft, setDraft] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateMessage, setRateMessage] = useState("");

  const visible = entries.filter(e => (e.phase || "pre") === bookTab);
  const phaseTotal = visible.reduce((s, e) => s + entryCny(e), 0);
  const grandTotal = entries.reduce((s, e) => s + entryCny(e), 0);

  const startDraft = category => {
    const date = today();
    setDraft({ phase: bookTab, category, amount: "", currency: "CNY", date, rate: "", rateDate: date, note: "" });
    setRateMessage("");
  };

  const changeCurrency = currency => {
    setDraft(d => ({ ...d, currency, rate: "", rateDate: d.date }));
    setRateMessage(currency === "JPY" ? "请查询消费当天的参考汇率，或手动输入中间价" : "");
  };

  const changeDate = date => {
    setDraft(d => ({ ...d, date, rateDate: date, rate: d.currency === "JPY" ? "" : d.rate }));
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
      setDraft(d => ({ ...d, rate: String(rate), rateDate: data.date || d.date }));
      setRateMessage(`已按 ${data.date || draft.date} 的人民币汇率换算`);
    } catch (error) {
      setRateMessage(`${error.message}，请检查网络或手动输入汇率`);
    } finally {
      setRateLoading(false);
    }
  };

  const addEntry = () => {
    const amount = Number(draft?.amount), rate = draft?.currency === "JPY" ? Number(draft.rate) : null;
    if (!draft || !Number.isFinite(amount) || amount <= 0 || (draft.currency === "JPY" && (!Number.isFinite(rate) || rate <= 0))) return;
    setEntries(es => [{ ...draft, amount, rate, id: Date.now() + Math.random() }, ...es]);
    setDraft(null);
    setRateMessage("");
  };

  return {
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
  };
}

import React from "react";
import { WalletCards } from "lucide-react";
import { cny } from "../../utils/currency";

export default function LedgerSummary({ grandTotal }) {
  return <div className="rounded-2xl bg-slate-950 p-5 text-white"><div className="flex items-center gap-2 text-sm text-slate-300"><WalletCards className="h-4 w-4" />实际花费</div><div className="mt-2 text-3xl font-bold">{cny(grandTotal)}</div><div className="mt-2 text-xs text-slate-400">按消费日期汇率折算成人民币</div></div>;
}

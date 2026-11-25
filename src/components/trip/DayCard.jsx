import React from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TripDayDetails from "./TripDayDetails";
import { annotatePlaces } from "../../utils/japanesePlaces";

const dateAccents = [
  { badge: "bg-sky-50 text-sky-800", label: "text-sky-700" },
  { badge: "bg-orange-50 text-orange-800", label: "text-orange-700" },
  { badge: "bg-emerald-50 text-emerald-800", label: "text-emerald-700" },
];

export default function DayCard({ day, isOpen, onToggle }) {
  const dayNumber = Number(day.date.split("/")[1]) || 0;
  const accent = dateAccents[dayNumber % dateAccents.length];

  return <motion.article layout className={`overflow-hidden rounded-2xl border ${day.featured ? "border-sky-200 bg-sky-50/70" : "border-black/5 bg-white"}`}><button onClick={onToggle} className="flex w-full items-center gap-3 p-4 text-left"><div className={`w-14 shrink-0 rounded-2xl px-2 py-2 text-center ${accent.badge}`}><div className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-75">DEC</div><div className="text-xl font-bold leading-tight tracking-tight">{dayNumber}</div></div><div className="min-w-0 flex-1"><div className={`flex items-center gap-1 text-xs font-medium ${accent.label}`}><MapPin className="h-3 w-3" />{annotatePlaces(day.city)}</div><h3 className="mt-1 font-semibold">{annotatePlaces(day.title)}</h3></div><span className="shrink-0 text-slate-400">{isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}</span></button><AnimatePresence>{isOpen && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><TripDayDetails day={day} /></motion.div>}</AnimatePresence></motion.article>;
}

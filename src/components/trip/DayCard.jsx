import React from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TripDayDetails from "./TripDayDetails";

export default function DayCard({ day, isOpen, onToggle }) {
  return <motion.article layout className={`overflow-hidden rounded-2xl border ${day.featured ? "border-sky-200 bg-sky-50/70" : "border-black/5 bg-white"}`}><button onClick={onToggle} className="flex w-full gap-3 p-4 text-left"><div className="w-14"><div className="text-xs text-slate-500">DEC</div><div className="text-lg font-bold">{day.date.split("/")[1]}</div></div><div className="flex-1"><div className="flex gap-1 text-xs text-sky-700"><MapPin className="h-3 w-3" />{day.city}</div><h3 className="mt-1 font-semibold">{day.title}</h3></div>{isOpen ? <ChevronUp /> : <ChevronDown />}</button><AnimatePresence>{isOpen && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><TripDayDetails day={day} /></motion.div>}</AnimatePresence></motion.article>;
}

import React from "react";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { days } from "../data/itinerary";
import { SightseeingStops, ShoppingStops } from "../components/StopSections";

export default function TripPage({ open, setOpen }) {
  return <div className="space-y-3">{days.map(d => <motion.article layout key={d.date} className={`overflow-hidden rounded-2xl border ${d.featured ? "border-sky-200 bg-sky-50/70" : "border-black/5 bg-white"}`}><button onClick={() => setOpen(open === d.date ? null : d.date)} className="flex w-full gap-3 p-4 text-left"><div className="w-14"><div className="text-xs text-slate-500">DEC</div><div className="text-lg font-bold">{d.date.split("/")[1]}</div></div><div className="flex-1"><div className="flex gap-1 text-xs text-sky-700"><MapPin className="h-3 w-3" />{d.city}</div><h3 className="mt-1 font-semibold">{d.title}</h3></div>{open === d.date ? <ChevronUp /> : <ChevronDown />}</button><AnimatePresence>{open === d.date && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div className="space-y-2 px-4 pb-4 pl-[5.25rem]">{d.items.map(x => <div key={x} className="text-sm leading-6">· {x}</div>)}</div><SightseeingStops date={d.date} /><ShoppingStops date={d.date} /></motion.div>}</AnimatePresence></motion.article>)}</div>;
}

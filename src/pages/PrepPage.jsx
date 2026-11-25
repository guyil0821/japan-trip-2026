import React from "react";
import { useState } from "react";
import CountdownCard from "../components/prep/CountdownCard";
import ProgressCard from "../components/prep/ProgressCard";
import ChecklistSection from "../components/prep/ChecklistSection";
import PackingChecklist from "../components/prep/PackingChecklist";
import FlightCard from "../components/prep/FlightCard";
import { prepChecklist } from "../data/prepChecklist";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PrepPage() {
  const [checklist, setChecklist] = useLocalStorage("sybil-japan-prep-checklist", {});
  const [packing, setPacking] = useLocalStorage("sybil-japan-packing-checklist", {});
  const [activeSection, setActiveSection] = useState("checklist");
  const total = prepChecklist.reduce((sum, section) => sum + section.items.length, 0);
  const completed = prepChecklist.reduce((sum, section) => sum + section.items.filter(item => checklist[item.id]).length, 0);
  const toggle = (setter, id) => setter(current => ({ ...current, [id]: !current[id] }));

  return <section className="space-y-4"><CountdownCard /><FlightCard /><ProgressCard title="准备完成度" completed={completed} total={total} /><div className="grid grid-cols-2 rounded-2xl border bg-white p-1"><button onClick={() => setActiveSection("checklist")} className={`rounded-xl py-2.5 text-sm ${activeSection === "checklist" ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>行前 Checklist</button><button onClick={() => setActiveSection("packing")} className={`rounded-xl py-2.5 text-sm ${activeSection === "packing" ? "bg-sky-100 text-sky-800" : "text-slate-500"}`}>行李 Checklist</button></div>{activeSection === "checklist" ? <div className="space-y-3">{prepChecklist.map(section => <ChecklistSection key={section.id} section={section} checked={checklist} onToggle={id => toggle(setChecklist, id)} externalLink={section.id === "entry" ? "https://www.vjw.digital.go.jp/" : undefined} />)}</div> : <PackingChecklist checked={packing} onToggle={id => toggle(setPacking, id)} />}</section>;
}

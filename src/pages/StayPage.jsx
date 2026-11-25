import React from "react";
import { useState } from "react";
import { stays } from "../data/stays";
import { getTripStatus } from "../utils/tripStatus";
import useLocalStorage from "../hooks/useLocalStorage";
import StayCard from "../components/stay/StayCard";

function localToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function upcomingDate(stay) {
  if (!stay.checkInDate || stay.checkInDate === "待确认") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(stay.checkInDate);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
}

export default function StayPage({ setTab }) {
  const [checklist, setChecklist] = useLocalStorage("sybil-japan-stay-checklist", {});
  const tripStatus = getTripStatus();
  const today = localToday();
  const heading = tripStatus.status === "before" ? "下一站住宿" : tripStatus.status === "during" ? "今晚住宿" : "本次住宿";
  const upcoming = tripStatus.status === "before"
    ? [...stays].filter(stay => upcomingDate(stay) >= today).sort((a, b) => upcomingDate(a) - upcomingDate(b))
    : stays;
  const toggle = id => setChecklist(current => ({ ...current, [id]: !current[id] }));

  return <section className="space-y-4"><h1 className="px-1 text-lg font-semibold text-slate-900">{heading}</h1>{upcoming.length ? <div className="space-y-3">{upcoming.map(stay => <StayCard key={stay.id} stay={stay} today={today} checklist={checklist} onToggle={toggle} setTab={setTab} />)}</div> : <div className="rounded-2xl border border-dashed bg-white p-6 text-center text-sm text-slate-500">住宿信息待确认</div>}</section>;
}

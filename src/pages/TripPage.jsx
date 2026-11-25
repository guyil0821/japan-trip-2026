import React from "react";
import { days } from "../data/itinerary";
import DayCard from "../components/trip/DayCard";

export default function TripPage({ open, setOpen }) {
  return <section className="trip-editorial">
    <div className="trip-section-heading">
      <div><span className="section-kicker">CONTENTS <i>／</i> 旅程</span><h2>八日間の旅。</h2></div>
      <div className="trip-count"><strong>08</strong><span>DAYS<br />2026.12</span></div>
    </div>
    <div className="trip-route-line"><span>NARITA</span><i /><span>AOMORI</span><i /><span>HAKODATE</span><i /><span>TOKYO</span></div>
    <div className="trip-day-list">{days.map((day, index) => <div className="trip-day-row" key={day.date}>
      <span className="day-index">{String(index + 1).padStart(2, "0")}</span>
      <DayCard day={day} isOpen={open === day.date} onToggle={() => setOpen(open === day.date ? null : day.date)} />
    </div>)}</div>
  </section>;
}

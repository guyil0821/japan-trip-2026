import React from "react";
import { days } from "../data/itinerary";
import DayCard from "../components/trip/DayCard";

export default function TripPage({ open, setOpen }) {
  return <div className="space-y-3">{days.map(day => <DayCard key={day.date} day={day} isOpen={open === day.date} onToggle={() => setOpen(open === day.date ? null : day.date)} />)}</div>;
}

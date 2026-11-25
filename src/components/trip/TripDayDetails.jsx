import React from "react";
import { SightseeingStops, ShoppingStops } from "../StopSections";

export default function TripDayDetails({ day }) {
  return <><div className="space-y-2 px-4 pb-4 pl-[5.25rem]">{day.items.map(x => <div key={x} className="text-sm leading-6">· {x}</div>)}</div><SightseeingStops date={day.date} /><ShoppingStops date={day.date} /></>;
}

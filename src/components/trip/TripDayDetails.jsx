import React from "react";
import { SightseeingStops, ShoppingStops } from "../StopSections";
import { annotatePlaces } from "../../utils/japanesePlaces";

export default function TripDayDetails({ day }) {
  return <><div className="space-y-2 px-4 pb-4 pl-[5.25rem]">{day.items.map((item, index) => <div key={`${day.date}-${index}`} className="text-sm leading-6">· {annotatePlaces(item)}</div>)}</div><SightseeingStops date={day.date} /><ShoppingStops date={day.date} /></>;
}

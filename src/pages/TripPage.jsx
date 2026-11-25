import React from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { days } from "../data/itinerary";

const cardSizes = ["wide", "tall", "compact", "wide", "tall", "compact", "wide", "compact"];

export default function TripPage({ open, setOpen }) {
  return <section className="bento-trip" aria-label="八天日本行程">
    <header className="bento-heading">
      <div>
        <span className="bento-kicker">WINTER JOURNAL <i>·</i> 2026</span>
        <h2>八天，慢慢去旅行。</h2>
        <p>每天一张小行程卡，想看细节时再展开。</p>
      </div>
      <span className="bento-total"><strong>08</strong><small>DAYS</small></span>
    </header>

    <div className="bento-route" aria-label="路线：成田、青森、函馆、东京">
      <span>成田</span><i /><span>青森</span><i /><span>函馆</span><i /><span>东京</span>
    </div>

    <div className="bento-grid">
      {days.map((day, index) => {
        const isOpen = open === day.date;
        return <article
          key={day.date}
          className={`bento-day bento-day--${cardSizes[index % cardSizes.length]} ${day.featured ? "bento-day--featured" : ""} ${isOpen ? "is-open" : ""}`}
        >
          <button
            type="button"
            className="bento-day-button"
            onClick={() => setOpen(isOpen ? null : day.date)}
            aria-expanded={isOpen}
          >
            <span className="bento-day-date"><span>DAY {String(index + 1).padStart(2, "0")}</span><b>{day.date}</b></span>
            <span className="bento-day-city"><MapPin size={13} />{day.city}</span>
            <span className="bento-day-title">{day.title}</span>
            {!isOpen && <span className="bento-day-teaser">{day.items[0]}</span>}
            <span className="bento-day-toggle">{isOpen ? "收起" : "看当天安排"}<ChevronDown size={15} /></span>
          </button>
          {isOpen && <div className="bento-day-details">
            {day.items.map((item, itemIndex) => <p key={`${day.date}-${itemIndex}`}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</p>)}
          </div>}
        </article>;
      })}
    </div>
  </section>;
}

import React from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { days } from "../data/itinerary";

const cardCopy = [
  { route: "上海 → 成田", summary: "抵达日本，入住成田区域酒店" },
  { route: "成田 → 东京 → 青森", summary: "成田机场 → 东京，乘东北新干线前往青森" },
  { route: "青森 ⇄ 函馆", summary: "函馆一日往返" },
  { route: "青森 → 八甲田 / 酸汤", summary: "八甲田雪景 + 酸汤温泉" },
  { route: "青森 → 横滨", summary: "川崎出发，横滨先观光、后购物" },
  { route: "东京", summary: "晨跑 + 东京主要购物日" },
  { route: "东京 → 成田", summary: "新宿最后购物，之后前往成田" },
  { route: "成田 → 上海", summary: "前往成田机场，搭乘航班返回上海" },
];

function routeCities() {
  const cities = days.flatMap(day => String(day.city || "").split(/[→·]/).map(city => city.trim()).filter(Boolean));
  return cities.filter((city, index) => city !== cities[index - 1]);
}

export default function TripPage({ open, setOpen }) {
  const cities = routeCities();
  return <section className="bento-trip itineraryPageContent" aria-label={`${days.length}天日本行程`}>
    <header className="bento-heading">
      <div>
        <span className="bento-kicker">WINTER JOURNAL <i>·</i> 2026</span>
        <h2>{days.length} 天，慢慢去旅行。</h2>
        <p>每天一张小行程卡，想看细节时再展开。</p>
      </div>
      <span className="bento-total"><strong>{String(days.length).padStart(2, "0")}</strong><small>DAYS</small></span>
    </header>

    <div className="bento-route" aria-label={`路线：${cities.join("、")}`}>
      {cities.map((city, index) => <React.Fragment key={`${city}-${index}`}>
        {index > 0 && <i aria-hidden="true" />}
        <span>{city}</span>
      </React.Fragment>)}
    </div>

    <div className="bento-grid itineraryCardList">
      {days.map((day, index) => {
        const isOpen = open === day.date;
        const copy = cardCopy[index] || { route: day.city, summary: day.title };
        return <article
          key={day.date}
          className={`bento-day itineraryMiniCard ${day.featured ? "bento-day--featured" : ""} ${isOpen ? "is-open" : ""}`}
        >
          <div className="itineraryCardHeader">
            <div className="itineraryDateGroup">
              <span className="dayBadge">DAY {String(index + 1).padStart(2, "0")}</span>
              <span className="itineraryDate">{day.date}</span>
            </div>
            <button
              type="button"
              className="scheduleToggle"
              onClick={() => setOpen(isOpen ? null : day.date)}
              aria-expanded={isOpen}
              aria-label={isOpen ? `收起 ${day.date} 当天安排` : `看 ${day.date} 当天安排`}
            >
              <span>{isOpen ? "收起" : "看当天安排"}</span>
              <ChevronDown className={`toggleChevron ${isOpen ? "expanded" : ""}`} size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="itineraryCardBody">
            <div className="itineraryRoute">
              <MapPin className="routeIcon" size={14} aria-hidden="true" />
              <span className="routeText">{copy.route}</span>
            </div>
            {copy.summary && <div className="itinerarySummary">{copy.summary}</div>}
          </div>

          {isOpen && <div className="bento-day-details itineraryExpandedContent">
            {(day.items || []).map((item, itemIndex) => <p key={`${day.date}-${itemIndex}`}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</p>)}
          </div>}
        </article>;
      })}
    </div>
  </section>;
}
